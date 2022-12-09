import { FC } from "react";
import { MOCK_USERS } from "~/assets/mock";
import { ChatListItem } from "~/components/chat/ListItem";

export const ChatList: FC = () => {
  return (
    <div className="thin-scroll flex min-w-0 flex-grow flex-col gap-1 overflow-auto px-2 py-1">
      {MOCK_USERS.map((user, i) => (
        <ChatListItem
          key={user.did}
          user={user}
          link="/chat"
          isSelected={i === 1}
          isUnread={(i <= 5 && i >= 2) || i === 8}
        />
      ))}
    </div>
  );
};
