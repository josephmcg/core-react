import fuzzysort from "fuzzysort";
import { FC } from "react";
import { MOCK_USERS } from "~/assets/mock";
import { ChatListItem } from "~/components/chat/ListItem";

type Props = {
  search: string;
};

export const ChatList: FC<Props> = (props) => {
  const filteredUsers = props.search
    ? fuzzysort
        .go(props.search, MOCK_USERS, { key: "name" })
        .map((result) => result.obj)
    : MOCK_USERS;

  return (
    <div className="thin-scroll flex min-w-0 flex-grow flex-col gap-1 overflow-auto px-2 py-1">
      {filteredUsers.length ? (
        filteredUsers.map((user, i) => (
          <ChatListItem
            key={user.did}
            user={user}
            link="/chat"
            isSelected={i === 1}
            isUnread={(i <= 5 && i >= 2) || i === 8}
          />
        ))
      ) : (
        <div className="text-center">No search results</div>
      )}
    </div>
  );
};
