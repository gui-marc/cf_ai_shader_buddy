import ShaderTool from "@/components/shader/shader-tool";
import { useShaderBuddy } from "@/hooks/use-shader-buddy";
import Chat from "./components/chat";
import ShaderCodeVisualizer from "./components/shader/shader-code-visualizer";

export function App() {
  const { sendMessage, messages, clearHistory, vertexShader, fragmentShader } =
    useShaderBuddy();

  return (
    <main className="flex gap-4 p-4 h-svh">
      <div className="flex flex-1 flex-col gap-4">
        <div className="overflow-hidden rounded-md border flex-1">
          <ShaderTool
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
          />
        </div>

        <div className="rounded-md border flex-1">
          <ShaderCodeVisualizer
            fragment={fragmentShader}
            vertex={vertexShader}
          />
        </div>
      </div>
      <Chat
        messages={messages}
        onSubmit={sendMessage}
        onClearHistory={clearHistory}
      />
    </main>
  );
}

export default App;
