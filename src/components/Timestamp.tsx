import { FC, useEffect, useState } from "react";
import { secondsUntilNextValue, timeSince } from "~/utils/time";

const TIMEOUT_MAX_DELAY = Math.pow(2, 31) - 1; // max 32-bit signed integer value

type Props = {
  date: Date;
  shorthand?: boolean;
  roundSeconds?: number;
};

export const Timestamp: FC<Props> = (props) => {
  const config = {
    shorthand: props.shorthand,
    roundSeconds: props.roundSeconds,
  };
  const [since, setSince] = useState(timeSince(props.date, config));

  const [timer, setTimer] = useState<NodeJS.Timeout | undefined>();

  useEffect(() => {
    const tick = () => {
      setSince(timeSince(props.date, config));
      const delay = secondsUntilNextValue(props.date, config) * 1000;
      setTimer(setTimeout(tick, Math.min(delay, TIMEOUT_MAX_DELAY)));
    };

    tick();
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(timer);
    };
  }, [timer]);

  return <>{since}</>;
};
