export enum SettingsPageIds {
  Profile = "profile",
  Personalize = "personalize",
  AudioVideo = "audio-video",
  AppInfo = "app-info",
  Storage = "storage",
  Keybinds = "keybinds",
  AccountsDevices = "accounts-devices",
  PrivacyPermissions = "privacy-permissions",
}

export enum ThemeKeys {
  DEFAULT = "default",
  MOONLESS_NIGHT = "moonlessNight",
}

export const themes: Record<ThemeKeys, string> = {
  default: "Default",
  moonlessNight: "Moonless Night",
};

export enum FlairKeys {
  SATELLITE = "satellite",
  PEACH = "peach",
  PINK = "pink",
  LIME = "lime",
  PURPLE = "purple",
  LAVENDER = "lavender",
  SUNFLOWER = "sunflower",
  DEEPBLUE = "deepBlue",
  VOID = "void",
}

export type Flair = {
  name: string;
  primary: string;
  secondary: string;
  primaryRGB: string;
};

export enum LanguageKeys {
  "EN_US" = "en_US",
}

export const languages: Record<LanguageKeys, string> = {
  en_US: "English (USA)",
};

export enum KeybindKeys {
  TOGGLE_MUTE = "toggleMute",
  TOGGLE_DEAFEN = "toggleDeafen",
  OPEN_SETTINGS = "openSettings",
  CALL_ACTIVE_CHAT = "callActiveChat",
}

export const defaultKeybinds: Record<KeybindKeys, string> = {
  [KeybindKeys.TOGGLE_MUTE]: "alt+m",
  [KeybindKeys.TOGGLE_DEAFEN]: "alt+d",
  [KeybindKeys.OPEN_SETTINGS]: "alt+s",
  [KeybindKeys.CALL_ACTIVE_CHAT]: "alt+c",
};

export type Settings = {
  theme: ThemeKeys;
  flair: FlairKeys;
  language: LanguageKeys;
  keybinds: Record<KeybindKeys, string>;
  privacy: {
    embeddedLinks: boolean;
    displayCurrentActivity: boolean;
    consentToScan: boolean;
    blockNsfw: boolean;
  };
};
