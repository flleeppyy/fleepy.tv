export type ModpackVersionSpec<T = string> = {
  filename: string;
  name: string;
  version: T;
  filetype: string;
  url: string;
};
