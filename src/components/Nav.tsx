import {
  ChatBubbleOvalLeftIcon,
  Cog6ToothIcon,
  FolderIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import {
  ChatBubbleOvalLeftIcon as ChatBubbleOvalLeftIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  FolderIcon as FolderIconSolid,
  UserIcon as UserIconSolid,
} from "@heroicons/react/24/solid";
import { Link, useRouter } from "@tanstack/react-router";
import clsx from "clsx";
import { ReactNode } from "react";

interface NavLink {
  href: string;
  icon(active: boolean): ReactNode;
}

const links: NavLink[] = [
  {
    href: "/chat",
    icon: (active) =>
      active ? <ChatBubbleOvalLeftIconSolid /> : <ChatBubbleOvalLeftIcon />,
  },
  {
    href: "/files",
    icon: (active) => (active ? <FolderIconSolid /> : <FolderIcon />),
  },
  {
    href: "/friends",
    icon: (active) => (active ? <UserIconSolid /> : <UserIcon />),
  },
  {
    href: "/settings",
    icon: (active) => (active ? <Cog6ToothIconSolid /> : <Cog6ToothIcon />),
  },
];

export const Nav = () => {
  const { state } = useRouter();

  return (
    <div className="flex border-t">
      {links.map((link) => (
        <Link
          key={link.href}
          to={link.href}
          className={clsx(
            "flex flex-1 justify-center p-4 ring-inset",
            state.latestLocation.href === link.href
              ? "text-primary-500"
              : "text-medium"
          )}
        >
          <div className="flex h-7 w-7">
            {link.icon(state.latestLocation.href === link.href)}
          </div>
        </Link>
      ))}
    </div>
  );
};
