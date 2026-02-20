import ShaderCodeTab from "@/components/shader/shader-code-tab";
import ShaderTool from "@/components/shader/shader-tool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShaderBuddy } from "@/hooks/use-shader-buddy";
import { ThirdBracketSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Chat from "./components/chat";
import { INITIAL_FRAGMENT_SHADER, INITIAL_VERTEX_SHADER } from "./lib/consts";

export function App() {
  const { sendMessage, messages, clearHistory } = useShaderBuddy();

  const vertexShader = INITIAL_VERTEX_SHADER;
  const fragmentShader = INITIAL_FRAGMENT_SHADER;

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
          <Tabs defaultValue="vertex-code">
            <div className="p-2 border-b">
              <TabsList>
                <TabsTrigger value="vertex-code">
                  <HugeiconsIcon icon={ThirdBracketSquareIcon} />
                  Vertex Shader
                </TabsTrigger>
                <TabsTrigger value="fragment-code">
                  <HugeiconsIcon icon={ThirdBracketSquareIcon} />
                  Fragment Shader
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden flex">
              <TabsContent value="vertex-code">
                <ShaderCodeTab shaderCode={vertexShader} />
              </TabsContent>
              <TabsContent value="fragment-code">
                <ShaderCodeTab shaderCode={fragmentShader} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </div>
      <Chat
        messages={messages}
        onSubmit={(input) =>
          sendMessage({
            text: input,
          })
        }
        onClearHistory={clearHistory}
      />
    </main>
  );
}

export default App;
