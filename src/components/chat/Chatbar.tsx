import { Portal } from "@headlessui/react";
import { PaperClipIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Prism, { Token } from "prismjs";
import {
  KeyboardEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  BaseEditor,
  createEditor,
  Descendant,
  Editor,
  NodeEntry,
  Range,
  Text,
  Transforms,
} from "slate";
import { withHistory } from "slate-history";
import {
  Editable,
  ReactEditor,
  RenderElementProps,
  RenderLeafProps,
  Slate,
  useSelected,
  withReact,
} from "slate-react";
import { Avatar } from "~/components/Avatar";
import { EmojiPicker } from "~/components/chat/EmojiPicker";

type CustomElement = {
  type: "paragraph" | "mention";
  character?: string;
  children: CustomText[];
};

type CustomText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  code?: boolean;
  url?: boolean;
};

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor;
    Element: CustomElement;
    Text: CustomText;
  }
}

Prism.languages.markdown = Prism.languages.extend("markup", {});
Prism.languages.insertBefore("markdown", "prolog", {
  code: [
    { pattern: /^(?: {4}|\t).+/m, alias: "keyword" },
    { pattern: /`[^`\n]+`/, alias: "keyword" },
  ],
  bold: {
    pattern: /(^|[^\\])(\*\*)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^\*\*|^\*\*$/ },
  },
  underline: {
    pattern: /(^|[^\\])(_)(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^_|_$/ },
  },
  italic: {
    pattern: /(^|[^\\])([*_])(?:(?:\r?\n|\r)(?!\r?\n|\r)|.)+?\2/,
    lookbehind: !0,
    inside: { punctuation: /^[*_]|[*_]$/ },
  },
  url: {
    pattern:
      /!?\[[^\]]+\](?:\([^\s)]+(?:[\t ]+"(?:\\.|[^"\\])*")?\)| ?\[[^\]\n]*\])/,
    inside: {
      variable: { pattern: /(!?\[)[^\]]+(?=\]$)/, lookbehind: !0 },
      string: { pattern: /"(?:\\.|[^"\\])*"(?=\)$)/ },
    },
  },
});
Prism.languages.markdown.bold.inside.url = Prism.util.clone(
  Prism.languages.markdown.url
);
Prism.languages.markdown.italic.inside.url = Prism.util.clone(
  Prism.languages.markdown.url
);
Prism.languages.markdown.bold.inside.italic = Prism.util.clone(
  Prism.languages.markdown.italic
);
Prism.languages.markdown.italic.inside.bold = Prism.util.clone(
  Prism.languages.markdown.bold
);

export const Chatbar = () => {
  const portalRef = useRef<HTMLDivElement | null>(null);
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [target, setTarget] = useState<Range | null>();
  const [index, setIndex] = useState(0);
  const [search, setSearch] = useState("");

  const editor = useMemo(
    () => withMentions(withHistory(withReact(createEditor()))),
    []
  );

  const chars = CHARACTERS.filter((c) =>
    c.toLowerCase().startsWith(search.toLowerCase())
  ).slice(0, 10);

  useEffect(() => {
    if (target && chars.length > 0) {
      setTimeout(() => {
        const portal = portalRef.current;
        const chatbarContainer = outerRef.current;
        if (!portal || !chatbarContainer) {
          return;
        }
        portal.style.bottom = `${chatbarContainer.offsetHeight}px`;
        portal.style.left = `${chatbarContainer.offsetLeft}px`;
        portal.style.width = `calc(100% - var(--scrollbar-size) - ${chatbarContainer.offsetLeft}px`;
      });
    }
  }, [chars.length, editor, index, search, target, portalRef]);

  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );

  const decorate = useCallback<(val: NodeEntry) => Range[]>(([node, path]) => {
    const ranges: Range[] = [];

    if (!Text.isText(node)) {
      return ranges;
    }

    const getLength = (token: Token | string): number => {
      if (typeof token === "string") {
        return token.length;
      } else if (typeof token.content === "string") {
        return token.content.length;
      } else {
        if (Array.isArray(token.content)) {
          return token.content.reduce((l, t) => l + getLength(t), 0);
        }
        return 0;
      }
    };

    const tokens = Prism.tokenize(node.text, Prism.languages.markdown);
    let start = 0;

    for (const token of tokens) {
      const length = getLength(token);
      const end = start + length;

      if (typeof token !== "string") {
        ranges.push({
          [token.type]: true,
          anchor: { path, offset: start },
          focus: { path, offset: end },
        });
      }

      start = end;
    }

    return ranges;
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (target) {
        switch (event.key) {
          case "ArrowDown":
            event.preventDefault();
            const prevIndex = index >= chars.length - 1 ? 0 : index + 1;
            setIndex(prevIndex);
            break;
          case "ArrowUp":
            event.preventDefault();
            const nextIndex = index <= 0 ? chars.length - 1 : index - 1;
            setIndex(nextIndex);
            break;
          case "Tab":
          case "Enter":
            event.preventDefault();
            Transforms.select(editor, target);
            insertMention(editor, chars[index]);
            setTarget(null);
            break;
          case "Escape":
            event.preventDefault();
            setTarget(null);
            break;
        }
      }
    },
    [index, target, editor, chars]
  );

  const insertMention = (editor: Editor, character: string) => {
    const mention: CustomElement = {
      type: "mention",
      character,
      children: [{ text: "" }],
    };
    Transforms.insertNodes(editor, mention);
    Transforms.move(editor);
  };

  return (
    <div ref={outerRef} className="flex items-end border-t">
      <button className="flex-shrink-0 p-4 ring-inset">
        <PaperClipIcon className="h-7 w-7" />
      </button>
      <Slate
        editor={editor}
        value={initialValue}
        onChange={() => {
          const { selection } = editor;

          if (selection && Range.isCollapsed(selection)) {
            const [start] = Range.edges(selection);
            const wordBefore = Editor.before(editor, start, { unit: "word" });
            const before = wordBefore && Editor.before(editor, wordBefore);
            const beforeRange = before && Editor.range(editor, before, start);
            const beforeText =
              beforeRange && Editor.string(editor, beforeRange);
            const beforeMatch = beforeText && beforeText.match(/^@(\w+)$/);
            const after = Editor.after(editor, start);
            const afterRange = Editor.range(editor, start, after);
            const afterText = Editor.string(editor, afterRange);
            const afterMatch = afterText.match(/^(\s|$)/);

            if (beforeMatch && afterMatch) {
              setTarget(beforeRange);
              setSearch(beforeMatch[1]);
              setIndex(0);
              return;
            }
          }

          setTarget(null);
        }}
      >
        <Editable
          className="thin-scroll max-h-half flex-grow self-center overflow-auto py-4 focus:ring-0 focus:ring-offset-0"
          decorate={decorate}
          renderLeaf={renderLeaf}
          renderElement={renderElement}
          placeholder="Speak Freely..."
          spellCheck={false}
          onKeyDown={onKeyDown}
          autoFocus={true}
        />
        <EmojiPicker />
        {target && chars.length > 0 && (
          <Portal>
            <div
              ref={portalRef}
              className="absolute z-10 rounded border bg-secondary-900 p-1 shadow-lg"
              style={{ bottom: "-9999px", left: "-9999px" }}
              data-cy="mentions-portal"
            >
              {chars.map((char, i) => (
                <div
                  key={char}
                  className={clsx(
                    "flex items-center gap-2 rounded-sm p-2",
                    i === index
                      ? "bg-primary-500 text-light"
                      : "bg-transparent text-medium"
                  )}
                >
                  <Avatar size="xs" />
                  {char}
                </div>
              ))}
            </div>
          </Portal>
        )}
      </Slate>
    </div>
  );
};

const Element = (props: RenderElementProps) => {
  const { attributes, children, element } = props;
  switch (element.type) {
    case "mention":
      return <Mention {...props} />;
    default:
      return <p {...attributes}>{children}</p>;
  }
};

const Mention = ({ attributes, children, element }: RenderElementProps) => {
  const selected = useSelected();
  // See if our empty text child has any styling marks applied and apply those
  // if (element.children[0].bold) {
  //   style.fontWeight = "bold";
  // }
  // if (element.children[0].italic) {
  //   style.fontStyle = "italic";
  // }
  return (
    <span
      {...attributes}
      contentEditable={false}
      data-cy={`mention-${element?.character?.replace(" ", "-")}`}
      className={clsx(
        "mx-1 rounded-md bg-primary-500 p-0.5 align-baseline text-light",
        selected && "bg-primary-600"
      )}
    >
      {children}@{element.character}
    </span>
  );
};

const Leaf = ({ attributes, children, leaf }: RenderLeafProps) => {
  return (
    <span
      {...attributes}
      className={clsx({
        "font-bold": leaf.bold,
        italic: leaf.italic,
        underline: leaf.underline,
        "rounded-sm bg-slate-600 p-0.5 font-mono": leaf.code,
        "text-primary-400 underline": leaf.url,
      })}
    >
      {children}
    </span>
  );
};

const withMentions = (editor: Editor) => {
  const { isInline, isVoid, markableVoid } = editor;

  editor.isInline = (element) => {
    return element.type === "mention" ? true : isInline(element);
  };

  editor.isVoid = (element) => {
    return element.type === "mention" ? true : isVoid(element);
  };

  editor.markableVoid = (element) => {
    return element.type === "mention" || markableVoid(element);
  };

  return editor;
};

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [
      {
        text: "",
      },
    ],
  },
];

const CHARACTERS = [
  "Aayla Secura",
  "Adi Gallia",
  "Admiral Dodd Rancit",
  "Admiral Firmus Piett",
  "Admiral Gial Ackbar",
  "Admiral Ozzel",
  "Admiral Raddus",
  "Admiral Terrinald Screed",
  "Admiral Trench",
  "Admiral U.O. Statura",
  "Agen Kolar",
  "Agent Kallus",
  "Aiolin and Morit Astarte",
  "Aks Moe",
  "Almec",
  "Alton Kastle",
  "Amee",
  "AP-5",
  "Armitage Hux",
  "Artoo",
  "Arvel Crynyd",
  "Asajj Ventress",
  "Aurra Sing",
  "AZI-3",
];
