declare module "@emoji-mart/react";

declare interface Window {
  __TAURI__?: {
    transformCallback: () => void;
  };
}
