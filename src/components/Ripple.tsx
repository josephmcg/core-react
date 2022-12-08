import clsx from "clsx";
import { FC, MouseEvent, ReactNode, useCallback, useRef } from "react";

// Duration found in tailwind.config.js
const RIPPLE_DURATION = 300;

type Props = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
};

export const Ripple: FC<Props> = (props) => {
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    applyRipple(e);
    if (props.onClick) props.onClick();
  };

  const applyRipple = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!overlayRef.current) return;
    const x = e.clientX - e.currentTarget.offsetLeft;
    const y = e.clientY - e.currentTarget.offsetTop;
    const ripples = document.createElement("span");

    ripples.className =
      " absolute h-full w-full bg-white bg-opacity-5 -translate-x-1/2 -translate-y-1/2 rounded-full animate-ripple";

    ripples.style.left = `${x}px`;
    ripples.style.top = `${y}px`;

    overlayRef.current?.appendChild(ripples);
    setTimeout(() => ripples.remove(), RIPPLE_DURATION);
  }, []);

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div onClick={handleClick} className={clsx(props.className, "relative")}>
      {props.children}
      {props.onClick && (
        <div
          ref={overlayRef}
          className={clsx(
            "pointer-events-none absolute inset-0 overflow-hidden tracking-wider text-gray-50"
          )}
        />
      )}
    </div>
  );
};
