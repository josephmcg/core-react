import { Switch as HeadlessSwitch } from "@headlessui/react";
import clsx from "clsx";
import { forwardRef, useState } from "react";
import { Size } from "~/types/global";

type Props = {
  size?: Size;
  label: string;
};

export const Switch = forwardRef<HTMLButtonElement, Props>((props, ref) => {
  const [enabled, setEnabled] = useState(false);

  return (
    <HeadlessSwitch
      ref={ref}
      checked={enabled}
      onChange={setEnabled}
      className={clsx(
        enabled ? "bg-primary" : "bg-secondary-700",
        "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out"
      )}
    >
      <span className="sr-only">{props.label}</span>
      <span
        aria-hidden="true"
        className={clsx(
          enabled ? "translate-x-5 bg-white" : "translate-x-0 bg-secondary-100",
          "pointer-events-none inline-block h-5 w-5 transform rounded-full shadow ring-0 transition duration-200 ease-in-out"
        )}
      />
    </HeadlessSwitch>
  );
});

Switch.displayName = "Switch";
