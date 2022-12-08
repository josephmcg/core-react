export type Size = "2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl";
export type Color = "primary" | "secondary" | "success" | "warning" | "danger";

export type User = {
  did: string;
  avatar: string;
  name: string;
  lastMessage: string;
  lastMessageAt: number;
  tagLine?: string;
};
