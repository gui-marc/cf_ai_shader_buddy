import AgentInput from "./agent-input";

type ChatProps = {
  onSubmit?: (input: string) => void;
};

export default function Chat({ onSubmit }: ChatProps) {
  return (
    <div className="flex-1 border rounded-lg flex flex-col">
      <div className="border-b px-3 py-1.5 text-muted-foreground text-sm">
        Shader buddy
      </div>
      <div className="flex-1 p-3 overflow-y-auto flex flex-col-reverse">
        <AgentInput onSubmit={onSubmit} />
      </div>
    </div>
  );
}
