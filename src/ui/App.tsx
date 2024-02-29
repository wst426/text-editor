import { useState } from "react";

export const App = () => {
  const [nodeVersion, setNodeVersion] = useState("");
  return (
    <div className="w-screen h-screen overflow-hidden p-2">
      <button
        className="rounded-md border p-1"
        onClick={async () => {
          const nodeVersion = await window.api.nodeVersion();
          setNodeVersion(nodeVersion);
        }}
      >
        Get Node Version
      </button>
      {nodeVersion !== "" && <div>node version: {nodeVersion}</div>}
    </div>
  );
};
