import { Portal, Transition } from "@headlessui/react";
import {
  FC,
  MouseEventHandler,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useClickAway } from "react-use";
import { Text } from "./Text";

type ContextMenuItem = {
  id: string;
  icon: ReactNode;
  label: string;
};

type Props = {
  items: ContextMenuItem[];
  children: ReactNode;
};

type Coords = [number, number];

export const ContextMenu: FC<Props> = (props) => {
  const [coords, setCoords] = useState<Coords>([0, 0]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleWindowResize = (_e: Event) => {
      setIsVisible(false);
    };

    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  const handleContextMenu = useCallback<MouseEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      setTimeout(() => {
        setIsVisible(true);
        setCoords([event.clientX, event.clientY]);
      }, 100);
      setIsVisible(false);
    },
    []
  );

  return (
    <div onContextMenu={handleContextMenu}>
      {props.children}
      <Portal>
        <Transition
          show={isVisible}
          enter="transition-[opacity] duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-[opacity transform] duration-100"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Menu
            key={`${coords[0]}-${coords[1]}`}
            coords={coords}
            onClickAway={() => setIsVisible(false)}
            items={props.items}
          />
        </Transition>
      </Portal>
    </div>
  );
};

type MenuProps = {
  onClickAway: () => void;
  coords: Coords;
  items: ContextMenuItem[];
};

const Menu: FC<MenuProps> = (props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState<Coords>([0, 0]);
  useClickAway(ref, props.onClickAway);

  useEffect(() => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const offset: Coords = [0, 0];
    if (rect.right > window.innerWidth) {
      offset[0] = Math.min(rect.width, props.coords[0]);
    }
    if (rect.bottom > window.innerHeight) {
      offset[1] = rect.bottom - window.innerHeight;
    }
    setOffset(offset);
  }, [props.coords]);

  return (
    <div
      className="thin-scroll fixed flex max-h-[100vh] w-[250px] max-w-[100vw] flex-col overflow-y-auto rounded-lg bg-secondary-800 p-1.5 text-secondary-100 drop-shadow-2xl"
      ref={ref}
      style={{
        left: props.coords[0] - offset[0],
        top: props.coords[1] - offset[1],
      }}
    >
      {props.items.map((item) => (
        <Item key={item.id} item={item} />
      ))}
    </div>
  );
};

type ItemProps = {
  item: ContextMenuItem;
};
const Item: FC<ItemProps> = (props) => {
  return (
    <div className="align-center flex cursor-pointer gap-1.5 rounded-md py-1.5 px-2 hover:bg-secondary-700">
      <div className="align-center w-5 text-secondary-300">
        {props.item.icon}
      </div>
      <Text className="self-center truncate text-sm font-medium text-secondary-100">
        {props.item.label}
      </Text>
    </div>
  );
};
