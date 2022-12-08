import { Chatbar } from "~/components/chat/Chatbar";
import { Conversation } from "~/components/chat/Conversation";
import { ChatList } from "~/components/chat/List";
import { Toolbar } from "~/components/chat/Toolbar";
import { AuthLayout } from "~/components/layout/Auth";
import { Main } from "~/components/layout/Main";
import { Sidebar } from "~/components/layout/Sidebar";
import { Top } from "~/components/layout/Top";

const ChatPage = () => {
  return (
    <AuthLayout>
      <Sidebar>
        <ChatList />
      </Sidebar>
      <Main>
        <Top>
          <Toolbar />
        </Top>
        <Conversation />
        <Chatbar />
      </Main>
    </AuthLayout>
  );
};

export { ChatPage };
