import AgentInput from "./agent-input";

export default function Chat() {
  return (
    <div className="flex-1 border rounded-lg flex flex-col">
      <div className="border-b px-3 py-1.5 text-muted-foreground text-sm">
        Shader buddy
      </div>
      <div className="flex-1 p-3 overflow-y-auto flex flex-col-reverse">
        <AgentInput />
      </div>
    </div>
  );
}
