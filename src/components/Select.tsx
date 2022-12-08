import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { forwardRef, Fragment } from "react";
import { Text } from "~/components/Text";

const DEFAULT_PLACEHOLDER = "—";

export type SelectOption = {
  id: string;
  label: string;
  value: string;
  disabled?: boolean;
};

type Props = {
  options: SelectOption[];
  label: string;
  setSelected: (value: string) => void;
  selected?: string | null;
  placeholder?: string;
  optional?: boolean;
  className?: string;
  showLabel?: boolean;
  bgTransparent?: boolean;
};

export const Select = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const selected = props.options.find((o) => o.value === props.selected);
  const placeholder = props.placeholder ?? DEFAULT_PLACEHOLDER;

  return (
    <div className={clsx(props.className)}>
      <Listbox value={selected?.value} onChange={props.setSelected}>
        <Listbox.Label
          className={clsx("block text-sm font-medium", {
            "sr-only": !props.showLabel,
          })}
        >
          {props.label}
        </Listbox.Label>
        <div className="relative">
          <Listbox.Button
            ref={ref}
            className={clsx(
              "relative flex w-full cursor-default items-center gap-2 rounded-lg border-none text-left shadow-sm",
              props.bgTransparent
                ? "bg-transparent"
                : "bg-secondary-800 py-2 pl-3 pr-10 "
            )}
          >
            {selected ? (
              <Text className="block truncate">{selected?.label}</Text>
            ) : (
              <span className="block truncate">{placeholder}</span>
            )}
            <span className="pointer-events-none inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="thin-scroll absolute right-0 z-10 mt-1 max-h-60 overflow-auto rounded-md bg-secondary-800 py-1 text-base shadow-lg sm:text-sm">
              {props.options.map((option) => (
                <Listbox.Option
                  key={option.id}
                  className={({ active, disabled }) =>
                    clsx(
                      "relative cursor-default py-2 pl-10 pr-4",
                      disabled && "text-dark",
                      active ? "bg-primary-500 text-light" : "text-medium"
                    )
                  }
                  value={option.value}
                  disabled={option.disabled}
                >
                  {({ selected }) => (
                    <>
                      <Text
                        className={clsx(
                          "block truncate",
                          selected && "text-light"
                        )}
                      >
                        {option.label}
                      </Text>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-light">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
});

Select.displayName = "Select";
