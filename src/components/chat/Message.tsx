import {
  ChatBubbleLeftRightIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/20/solid";
import clsx from "clsx";
import { FC, useRef, useState } from "react";
import { useClickAway, useLongPress } from "react-use";
import { Avatar } from "~/components/Avatar";
import { ContextMenu } from "~/components/ContextMenu";

type Props = {
  sent: boolean;
  showAvatar?: boolean;
  first: boolean;
  mid: boolean;
  last: boolean;
};

export const Message: FC<Props> = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const ref = useRef(null);
  const longPressEvent = useLongPress(() => {
    setIsSelected(true);
  });

  useClickAway(ref, () => {
    setIsSelected(false);
  });

  const text = "the quick brown fox ".repeat(Math.floor(Math.random() * 5 + 1));

  return (
    <ContextMenu
      items={[
        {
          id: "copy",
          icon: <DocumentDuplicateIcon />,
          label: "Copy",
        },
        {
          id: "reply",
          icon: <ChatBubbleLeftRightIcon />,
          label: "Reply",
        },
      ]}
    >
      <div
        ref={ref}
        {...longPressEvent}
        className={clsx(
          "flex items-end gap-2 transition-transform",
          props.sent ? "flex-row" : "flex-row-reverse",
          props.last && "mb-4",
          isSelected && "scale-[0.98] opacity-75"
        )}
      >
        <div className="w-5">{props.showAvatar && <Avatar size="xs" />}</div>
        <div
          className={clsx(
            "max-w-[75%] rounded-xl border border-[#ffffff10] px-3 py-2 text-sm",
            props.sent
              ? "self-end bg-secondary-700 text-light"
              : "self-start bg-primary-800 text-light",
            props.first &&
              !props.last &&
              (props.sent ? "rounded-bl-sm" : "rounded-br-sm"),
            props.mid &&
              !props.first &&
              !props.last &&
              (props.sent ? "rounded-l-sm" : "rounded-r-sm"),
            props.last &&
              !props.first &&
              (props.sent ? "rounded-tl-sm" : "rounded-tr-sm")
          )}
        >
          {text}
        </div>
      </div>
    </ContextMenu>
  );
};
