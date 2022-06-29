import type { ModpackInfo } from "./ModpackInfo";
import type { ModpackVersionSpec } from "./ModpackVersionSpec";

export type ModpackInfoVersions = ModpackInfo & {
  versions: ModpackVersionSpec[];
};
