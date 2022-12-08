import { FC } from "react";
import { Message } from "~/components/chat/Message";

export const Conversation: FC = () => {
  const rows = Array(100)
    .fill(null)
    .map(() => Math.round(Math.random()) % 2 === 0);
  const items = rows.map((isMe, index) => (
    <Message
      key={index}
      showAvatar={isMe !== rows[index + 1]}
      sent={isMe}
      first={isMe !== rows[index - 1]}
      mid={isMe === rows[index - 1] && isMe === rows[index + 1]}
      last={isMe !== rows[index + 1]}
    />
  ));

  return (
    <div className="flex flex-grow select-text flex-col gap-1 overflow-auto px-4">
      {items}
    </div>
  );
};
