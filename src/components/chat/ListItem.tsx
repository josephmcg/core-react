import clsx from "clsx";
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { Avatar } from "~/components/Avatar";
import { Text } from "~/components/Text";
import { Timestamp } from "~/components/Timestamp";
import { User } from "~/types/global";

type Props = {
  user: User;
  link: string;
  isSelected?: boolean;
  isUnread?: boolean;
};

export const ChatListItem: FC<Props> = (props) => {
  const { user } = props;

  const lastMessageAt = useMemo(() => {
    return new Date(user.lastMessageAt);
  }, [user.lastMessageAt]);

  return (
    <Link
      to={props.link}
      className={clsx(
        "rounded-lg px-2 py-2",
        props.isSelected ? "bg-secondary-700" : "hover:bg-secondary-800"
      )}
    >
      <div className="flex items-center gap-3">
        <div className="flex-shrink-0">
          <Avatar src={user.avatar} size="lg" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="align-center flex justify-between gap-2">
            <Text
              className={clsx(
                "truncate",
                props.isUnread
                  ? "font-bold text-secondary-200"
                  : "font-regular text-secondary-300"
              )}
            >
              {user.name}
            </Text>
            <Text className="self-center whitespace-nowrap text-sm text-secondary-500">
              <Timestamp date={lastMessageAt} shorthand roundSeconds={30} />
            </Text>
          </div>
          <Text
            className={clsx(
              "truncate text-sm",
              props.isUnread
                ? "font-medium text-secondary-200"
                : "text-secondary-300"
            )}
          >
            {user.lastMessage}
          </Text>
        </div>
      </div>
    </Link>
  );
};
