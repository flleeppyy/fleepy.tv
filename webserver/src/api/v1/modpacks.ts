import type { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";
import semver, { SemVer } from "semver";
import type { ModpackInfo } from "../../types/ModpackInfo";
import type { ModpackVersionSpec } from "../../types/ModpackVersionSpec";
import { asyncFilter } from "../../utils/array";

const modpackFolder = path.join(__dirname, "../../../src/public/other_stuff/modpacks");
export const packFormatRegex = /(.*)-(?:(v\d{1,3}\.\d{1,2}\.\d{1,2}(?:-(?:[a-z]{1,12}\d{0,6})?)?)).(zip|tar\.gz)/;
// Usual pack formatting: "modpack-v1.2.3-beta1.zip", "modpack-v1.2.3-rc1.zip", "modpack-v1.2.3.zip", "modpack-v1.2.3-alpha1.zip"
// All packs should contain an info.js file

export default (app: FastifyInstance) => {
  app.get("/api/v1/modpacks", async (req, res) => {
    const packs = await asyncFilter(await fs.promises.readdir(modpackFolder), async item => {
      const file = await fs.promises.stat(path.join(modpackFolder, item));
      return file.isDirectory();
    });

    return res.send(packs);
  });

  app.get("/api/v1/modpacks/:pack", async (req, res) => {
    const requestedPack = req.params["pack"];
    try {
      const files = await fs.promises.readdir(path.join(modpackFolder, requestedPack));
      const processedPacks = await getPacks(requestedPack, false);

      const packInfo = {};
      if (files.includes("pack.json")) {
        Object.assign(
          packInfo,
          JSON.parse(fs.readFileSync(path.join(modpackFolder, requestedPack, "pack.json"), "utf8")),
        );
      }

      return res.send({
        ...(packInfo as ModpackInfo),
        versions: processedPacks.filter(pack => pack !== null).map(e => e.version),
      } as ModpackInfo);
    } catch (error) {
      //@ts-ignore
      if (error.code === "ENOENT") {
        res.status(404).send({
          error: "Not found",
        });
      } else {
        res.status(500).send({
          error: "Internal server error",
          // @ts-ignore
          stack: error.stack,
        });
      }
    }
  });

  /**
   * This endpoint returns the latest version of a pack, based on the prerelease query.
   * @param pack The pack
   * @queryparam prerelease The prerelease type to return the latest version of. Defaults to stable, meaning no prerelease
   */
  app.get("/api/v1/modpacks/:pack/latest", async (req, res) => {
    const requestedPack = req.params["pack"];
    const releaseType: "alpha" | "beta" | "rc" | "any" | "stable" = req.query["prerelease"] || "stable";

    if (releaseType.length > 32) {
      res.status(400).send({
        error: "prerelease query too long",
      });
      return;
    }

    try {
      const processedPacks = await getPacks(requestedPack, true);

      const selectedPackVersion = semver
        .rsort<SemVer>(processedPacks.map(e => e.version))
        .filter(v => {
          if (releaseType === "stable") {
            return v.prerelease.length === 0;
          } else if (releaseType === "any") {
            return true;
          } else {
            return v.prerelease[0] === releaseType;
          }
        })
        .map(e => e.version)[0];

      if (!selectedPackVersion) {
        return res.status(404).send({
          error: releaseType !== "stable" ? "No versions found for the specified prerelease type" : "No version found",
        });
      }

      const pack = processedPacks.find(uh => uh.version.version === selectedPackVersion);
      Object.assign(pack, { version: pack.version.version });
      return res.send(pack as unknown as ModpackVersionSpec<String>);
    } catch (error) {
      //@ts-ignore
      if (error.code === "ENOENT") {
        res.status(404).send({
          error: "Modpack not found",
        });
      } else {
        res.status(500).send({
          error: "Internal server error",
          // @ts-ignore
          stack: error.stack,
        });
      }
    }
  });

  /**
   * @param pack The pack requested
   * @param version This can be a valid semver spec, or a keyword that represents a prerelease.
   */
  app.get("/api/v1/modpacks/:pack/:version", async (req, res) => {
    const requestedPack = req.params["pack"];
    const requestedVersion = req.params["version"];
    const processedPacks = await getPacks(requestedPack, true);

    if (semver.valid(requestedVersion)) {
      const foundVersion = processedPacks.find(pack => pack.version.version === semver.parse(requestedVersion).version);
      Object.assign(foundVersion, { version: foundVersion.version.version });
      return res.send(foundVersion as unknown as ModpackVersionSpec<String>);
    } else {
      const foundVersions = processedPacks
        .filter(pack => {
          return pack.version.prerelease[0] === requestedVersion;
        })
        .map<ModpackVersionSpec<SemVer>>(pack => {
          Object.assign(pack, { version: pack.version.version });
          return pack;
        });
      return res.send(foundVersions as unknown as ModpackVersionSpec<String>[]);
    }
  });
};

// TODO: USE A FUCKING REGEX FOR THIS WHOLE THING YOU IDIOT
/**
 * Basically converting to valid semver
 * @param brokenversion invalid semver version but good enough to fix with this function
 */
export function processVersion(brokenversion: string, returnSemver?: false): string | null;
export function processVersion(brokenversion: string, returnSemver?: true): semver.SemVer | null;
export function processVersion(brokenversion: string): string | null;
export function processVersion(brokenversion: string, returnSemver: boolean): string | semver.SemVer | null;
export function processVersion(brokenversion: string, returnSemver: boolean = false): string | semver.SemVer | null {
  const regex = /v(\d{1,3}\.\d{1,2}\.\d{1,2}-?(?:[a-z]{1,12}\d{0,6})?)/;
  const match = regex.exec(brokenversion);
  if (!match) {
    return null;
  }
  const [, semiValidSemVer] = match;

  let prerelease: string;
  let prereleaseVersion: number | null;
  if (semiValidSemVer.indexOf("-") !== -1) {
    prerelease = semiValidSemVer.split("-")[1];
    // Basically go over every index of the string to see if there's a number
    for (let i = 0; i < prerelease.length; i++) {
      if (!isNaN(Number(prerelease[i]))) {
        prereleaseVersion = Number(prerelease.slice(prerelease.indexOf(prerelease[i])));
        break;
      }
    }

    let versionString = semiValidSemVer.split("-")[0];
    versionString +=
      "-" + (prereleaseVersion ? prerelease.split(prereleaseVersion + "")[0] + "." + prereleaseVersion : prerelease);

    return returnSemver ? semver.parse(versionString) : semver.parse(versionString).version;
  } else {
    return returnSemver ? semver.parse(semiValidSemVer) : semiValidSemVer;
  }
}

async function getPacks(packFolderName: string, giveSemver?: false): Promise<ModpackVersionSpec<string>[]>;
async function getPacks(packFolderName: string, giveSemver: true): Promise<ModpackVersionSpec<SemVer>[]>;
async function getPacks(
  packFolderName: string,
  giveSemver: boolean = false,
): Promise<ModpackVersionSpec<SemVer | string>[]> {
  const packs = await fs.promises.readdir(path.join(modpackFolder, packFolderName));
  const processedPacks = packs
    .map(pack => {
      const match = packFormatRegex.exec(pack);
      if (!match) {
        return;
      }
      const [filename, name, version, filetype] = match;
      return {
        filename,
        name,
        version: processVersion(version, giveSemver),
        filetype,
        url: `/other_stuff/modpacks/${packFolderName}/${filename}`,
      };
    })
    .filter(e => e != undefined);
  return processedPacks as ModpackVersionSpec[];
}
