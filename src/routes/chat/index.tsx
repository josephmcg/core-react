import { Chatbar } from "~/components/chat/Chatbar";
import { Conversation } from "~/components/chat/Conversation";
import { ChatSidebar } from "~/components/chat/Sidebar";
import { Toolbar } from "~/components/chat/Toolbar";
import { AuthLayout } from "~/components/layout/Auth";
import { Main } from "~/components/layout/Main";
import { Top } from "~/components/layout/Top";

const ChatPage = () => {
  return (
    <AuthLayout>
      <ChatSidebar />
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
