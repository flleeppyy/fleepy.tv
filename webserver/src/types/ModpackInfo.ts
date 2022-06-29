export type ModpackInfo = {
  // Name of the modpack
  name: string;
  // Description of the modpack
  description: string;
  // Authors
  authors?: string[];
  // Modpack's Minecraft version
  minecraftVersion: string;
  // Modpack's Forge version
  forgeVersion: string;
  // Base directory inside the zip folder where the minecraft folder is located.
  baseMinecraftFolder: string | ".";
  // A note or list of notes
  notes?: string | string[];
  // The launcher preferred for the modpack. Preferred launcher usually provides better integration with instance options
  preferredLauncher: "polymc";
  // Type of modpack, usually "polymc", "multimc", "curseforge", "ftb"
  type?: string;
  // A link to the icon of the pack
  icon?: string;
  // Information for the server installer
  server?: {
    ignoredMods?: string[];
  };
};
