import { useRef, useState } from "react";
import { Button } from "./components/Button";

export const App = () => {
  const file = useRef("");
  const [content, setContent] = useState("");
  return (
    <div className="w-screen h-screen overflow-hidden p-2 flex flex-col space-y-1">
      <div className="flex space-x-1">
        <Button
          key="open"
          text="open"
          onClick={async () => {
            const result = await window.api.openFile();
            if (result !== null) {
              const content = await window.api.readFile(result);
              file.current = result;
              setContent(content);
            }
          }}
        />
        <Button
          key="save"
          text="save"
          onClick={async () => {
            if (file.current === "") {
              const result = await window.api.saveFile();
              if (result === null) return;
              file.current = result;
            }
            window.api.writeFile(file.current, content);
          }}
        />
      </div>
      <div>
        <textarea
          autoFocus
          cols={90}
          rows={20}
          className="p-1 resize-none outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
};
