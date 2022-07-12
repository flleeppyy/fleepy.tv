import type { FastifyInstance } from "fastify";
import fs from "fs";
import path from "path";
import semver, { SemVer } from "semver";
import type { ModpackInfo } from "../types/ModpackInfo";
import type { ModpackVersionSpec } from "../types/ModpackVersionSpec";
import { asyncFilter } from "../utils/array";
import { packFormatRegex, processVersion } from "./modpacks";

/**
 * Modpack folder Specification
 *
 * 1. Folder structure
 * The structure of the modpack folder should follow these rules
 * 1.1. Each modpack folder should be named after the modpack's name, no spaces or special characters, only lowercase letters, numbers and dashes
 * 1.2. The modpack folder should contain a info.json file
 * 1.3. The modpack folder can contain an icon, but must be in PNG format
 * 1.4.
 *
 * 2. Modpack version naming convention
 * The naming convention of a modpack version is based on the SemVer standard, with slight modifications to allow for prereleases
 * The version file name should follow these rules
 * 2.1. The modpack name should be the same as the folder name
 * 2.2. The version following the packname should be prefixed up with a dash
 * 2.3. The version should be in the format v1.2.3-beta1
 * 2.3.3 If applicable, there should be no character separating the prerelease version from the prerelease identifier
 * 2.4. The file must be stored in a tar.gz or zip file (Must end with tar.gz or zip)
 *
 * Regular expression for the version naming convention
 * /(.*)-(?:(v\d{1,3}\.\d{1,2}\.\d{1,2}(?:-(?:[a-z]{1,12}\d{0,6})?)?)).(zip|tar\.gz)/
 */

type InternalModpack = {
  // Folder location of the pack on the drive
  location: string;
  // The folder name of the pack
  locationName: string;
  // The modpack itself
  pack: ModpackInfo;
  // Versions contained in the pack
  versions: ModpackVersionSpec<SemVer>[];
}

class ModpackHandler {
  modpacks: InternalModpack[];
  refreshInterval = 1 * 60 * 1000;
  modpackFolder: string;

  /**
   * @param {string} folder  The folder where the modpacks are located
   */
  constructor(folder: string) {
    this.modpackFolder = folder;
    this.modpacks = [];
    this.ProcessPacks();
    setInterval(() => this.ProcessPacks(), this.refreshInterval);
  }

  /**
   * This function rebuilds the Modpack list, and should not be called often
   */
  private async ProcessPacks() {
    const packs: InternalModpack[] = []
    const folders = await fs.promises.readdir(this.modpackFolder);
    for (const folder of folders) {
      try {
        const packDir = await fs.promises.readdir(path.join(this.modpackFolder, folder));
        const packLocation = path.join(this.modpackFolder, folder);
        let packInfo;
        try {
          packInfo = JSON.parse(
            await fs.promises.readFile(path.join(packLocation, "pack.json"), "utf-8")
          ) as ModpackInfo;
        } catch (error) {
          if (error instanceof SyntaxError) {
            console.error(`Could not parse pack.json for ${folder}.`, error);
            // @ts-ignore
          } else if (error.code == "ENOENT") {
            console.error(`Pack.json does not exist for ${folder}.`, error);
          } else {
            console.error(`Error reading pack.json for ${folder}.`, error);
          }
          continue;
        }

        // Map version for internal use
        const versions = packDir
          .map((versionFile: string) => {
            const match = packFormatRegex.exec(versionFile);
            if (!match) {
              return;
            }
            const [filename, name, version, filetype] = match;
            return {
              filename,
              name,
              version: processVersion(version, true),
              filetype,
              // TODO: Get path based on modpack folder
              url: `/other_stuff/modpacks/${folder}/${filename}`,
            };
          })
          .filter(e => e != undefined);

        // Map versions for external use
        const externalVersions = versions.map(e => {
          return e.version.version;
        });

        packInfo.versions = externalVersions;

        packs.push({
          location: packLocation,
          locationName: folder,
          pack: packInfo,
          versions: versions,
        });
      } catch (ignored) {
        continue;
      }
    }
    console.log(packs);
    this.modpacks = packs;
  }

  public GetPackByID(id: string) {
    const pack = this.modpacks.find(e => e.pack.id == id);
    if (!pack) {
      return;
    }
    return pack;
  }

  /**
   * @param name The name of the modpack
   * @returns The modpack with the given name
   * @deprecated Use GetPackByID instead
   */
  public GetPackByFolderName(name: string) {
    const pack = this.modpacks.find(e => e.locationName == name);
    if (!pack) {
      return;
    }
    return pack;
  }

  public GetModpacksBasic() {
    let _ = this.modpacks.map(e => {
      return {
        id: e.pack.id,
        name: e.pack.name,
        folderName: e.locationName,
      }
    });
    return _;
  }

  public GetLatestPackVersion(id: string) {
    const pack = this.modpacks.find(e => e.pack.id == id);
    if (!pack) {
      return;
    }
    const latest = pack.versions.sort((a, b) => {
      return semver.compare(b.version, a.version);
    }).shift();
    if (!latest) {
      return;
    }
    return latest;
  }

  public GetPackVersion(id: string, version: string) {
    const pack = this.modpacks.find(e => e.pack.id == id);
    if (!pack) {
      return;
    }
    const packVersion = pack.versions.find(e => semver.compare(e.version, version) == 0);
    if (!packVersion) {
      return;
    }
    return packVersion;
  }

}

const uuidRegex = /\b[0-9a-f]{8}\b-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-\b[0-9a-f]{12}\b/;

export default (app: FastifyInstance) => {
  const modpackHandler: ModpackHandler = new ModpackHandler(path.join(__dirname, "../../src/public/other_stuff/modpacks"));

  app.get("/api/v2/modpacks", async (req, res) => {
    const packs = modpackHandler.GetModpacksBasic();
    return res.send(packs);
  });

  app.get("/api/v2/modpacks/:id", async (req, res) => {
      // return res.send({
      //   error: "Invalid ID",
      //   note: "If you're using a regular name string such as 'minecraft-modpack-name', please use the ID instead",
      // });

      const id = req.params["id"];
      const {pack} = modpackHandler.GetPackByID(id) || modpackHandler.GetPackByFolderName(req.params["id"]);
      if (!pack) {
        return res.status(404).send({
          error: "Pack not found",
        });
      }
      return res.send(pack);
  });

  app.get("/api/v2/modpacks/:id/latest", async (req, res) => {
    const id = req.params["id"];
    const releaseType: "alpha" | "beta" | "rc" | "any" | "stable" = req.query["prerelease"] || "stable";

    if (releaseType.length > 32) {
      res.status(400).send({
        error: "prerelease query too long",
      });
      return;
    }

    const pack = modpackHandler.GetPackByID(id) || modpackHandler.GetPackByFolderName(id);

    if (!pack) {
      return res.send({
        error: "Pack not found",
      });
    }

    const selectedPackVersion = semver
      .rsort<SemVer>(pack.versions.map(e => e.version))
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

    const packVersion = modpackHandler.GetPackVersion(id, selectedPackVersion);

    if (!packVersion) {
      return res.status(404).send({
        error: "Pack version not found",
      });
    }

    return res.send(packVersion);
  });

  app.get("/api/v2/modpacks/:id/:version", async (req, res) => {
    const id = req.params["id"];
    const version = req.params["version"];
    const pack = modpackHandler.GetPackVersion(id, version);
    if (!pack) {
      return res.status(404).send({
        error: "Pack version not found",
      });
    }

    return res.send(pack);
  });

};