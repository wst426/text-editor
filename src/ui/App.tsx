import { useEffect, useRef, useState } from "react";

export const App = () => {
  const file = useRef("");
  const el = useRef<HTMLTextAreaElement>(null);
  const [content, setContent] = useState("");
  useEffect(() => {
    window.api.onOpenFile(async () => {
      const result = await window.api.openFile();
      if (result !== null) {
        const content = await window.api.readFile(result);
        file.current = result;
        setContent(content);
      }
    });
    window.api.onSaveFile(async () => {
      if (file.current === "") {
        const result = await window.api.saveFile();
        if (result === null) return;
        file.current = result;
      }
      window.api.writeFile(file.current, el.current.value);
    });
  }, []);
  return (
    <div className="w-screen h-screen overflow-hidden">
      <textarea
        ref={el}
        className="p-2 resize-none outline-none font-mono"
        autoFocus={true}
        spellCheck={false}
        cols={90}
        rows={20}
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
};
