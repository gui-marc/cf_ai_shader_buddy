import type { UIMessage } from "ai";
import AgentInput from "./agent-input";
import Messages from "./messages";

type ChatProps = {
  onSubmit?: (input: string) => void;
  messages: UIMessage[];
};

export default function Chat({ onSubmit, messages }: ChatProps) {
  return (
    <div className="flex-1 border rounded-lg flex flex-col">
      <div className="border-b px-3 py-1.5 text-muted-foreground text-sm">
        Shader buddy
      </div>

      <div className="flex-1 p-3 overflow-y-auto flex flex-col-reverse">
        <AgentInput onSubmit={onSubmit} />
        <Messages messages={messages} />
      </div>
    </div>
  );
}
