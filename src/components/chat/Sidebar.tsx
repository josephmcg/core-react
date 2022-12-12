import { useState } from "react";
import { ChatList } from "~/components/chat/List";
import { Input } from "~/components/controls/Input";
import { Sidebar } from "~/components/layout/Sidebar";

const ChatSidebar = () => {
  const [search, setSearch] = useState<string>("");

  return (
    <Sidebar
      topElement={
        <Input
          className="p-4"
          type="search"
          label="find a conversation"
          placeholder="Search"
          onChange={setSearch}
        />
      }
    >
      <ChatList search={search} />
    </Sidebar>
  );
};

export { ChatSidebar };
