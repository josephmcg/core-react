import { FC } from "react";
import welcomeImage from "~/assets/uplink_muted_gray.svg";
import { Button } from "~/components/controls/Button";
import { ButtonStyle } from "~/types/button";

type Props = {
  displayImage?: boolean;
};

export const Welcome: FC<Props> = (props) => {
  return (
    <div className="mx-auto flex h-full w-96 flex-col items-center justify-center gap-6 align-middle">
      {props.displayImage && (
        <img src={welcomeImage} alt="" draggable={false} sizes="100%" />
      )}
      <div className="text-center">No active chats, wanna make one?</div>
      <Button style={ButtonStyle.Primary} className="w-1/3">
        Start one
      </Button>
    </div>
  );
};
