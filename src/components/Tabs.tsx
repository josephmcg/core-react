import { Tab } from "@headlessui/react";
import clsx from "clsx";
import { FC, Fragment, ReactNode } from "react";
import { Top } from "~/components/layout/Top";

export type Tab = {
  id: number;
  label: string;
  count?: number;
  content: () => ReactNode;
};

type Props = {
  tabs: Tab[];
  hasMainWrappers?: boolean;
};

export const Tabs: FC<Props> = (props) => {
  const ListWrapper = props.hasMainWrappers ? Top : Fragment;

  return (
    <Tab.Group as={Fragment}>
      <ListWrapper>
        <Tab.List className="flex w-full max-w-md gap-2">
          {props.tabs.map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                clsx([
                  selected ? "bg-white/[0.12]" : "",
                  "w-full rounded-lg py-2.5 text-sm font-medium",
                  "text-blue-100 hover:bg-white/[0.12] hover:text-white",
                ])
              }
            >
              {tab.label}
              {tab.count ? (
                <span className="ml-3 hidden rounded-full bg-indigo-100 py-0.5 px-2.5 text-xs font-medium text-indigo-600 md:inline-block">
                  {tab.count}
                </span>
              ) : null}
            </Tab>
          ))}
        </Tab.List>
      </ListWrapper>
      <Tab.Panels as={Fragment}>
        {props.tabs.map((tab) => (
          <Tab.Panel key={tab.id} as={Fragment}>
            {/* Tab.Panel tries to reference inner element, so we need to wrap it in a Fragment */}
            <Fragment>{tab.content()}</Fragment>
          </Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
};

export default Tabs;
