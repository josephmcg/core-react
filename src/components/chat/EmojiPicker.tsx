import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Portal } from "@headlessui/react";
import { FaceSmileIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

// https://github.com/missive/emoji-mart#options--props
export const EmojiPicker = () => {
  const [visibility, setVisibility] = useState(false);

  const toggleVisiblity = () => {
    setVisibility((v) => !v);
  };

  // const { locale } = useRouter();

  return (
    <>
      <button
        className="flex flex-shrink-0 p-4 ring-inset"
        onClick={toggleVisiblity}
      >
        <FaceSmileIcon className=" h-7 w-7" />
      </button>
      {visibility && (
        <Portal>
          <div className="absolute bottom-10 right-0">
            <Picker
              data={data}
              onEmojiSelect={console.log}
              theme="dark"
              // locale={locale}
              autoFocus={true}
            />
            )
          </div>
        </Portal>
      )}
    </>
  );
};
