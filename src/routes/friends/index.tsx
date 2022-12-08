import { Welcome } from "~/components/friends/Welcome";
import { AuthLayout } from "~/components/layout/Auth";
import { Main } from "~/components/layout/Main";
import { Sidebar } from "~/components/layout/Sidebar";
import { Tab, Tabs } from "~/components/Tabs";
import { FriendsTabs } from "~/types/friends";

const tabs: Tab[] = [
  {
    id: FriendsTabs.Friends,
    label: "Friends",
    content: () => {
      return <Welcome displayImage />;
    },
    count: 5,
  },
  {
    id: FriendsTabs.Add,
    label: "Add Friends",
    content: () => {
      return <div>Add</div>;
    },
  },
  {
    id: FriendsTabs.Requests,
    label: "Pending",
    content: () => {
      return <div>Requests</div>;
    },
  },
];

const FriendsPage = () => {
  return (
    <AuthLayout>
      <Sidebar>ayooo</Sidebar>
      <Main>
        <Tabs tabs={tabs} hasMainWrappers />
      </Main>
    </AuthLayout>
  );
};

export { FriendsPage };
