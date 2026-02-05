import ShaderCodeTab from "@/components/shader/shader-code-tab";
import ShaderTool from "@/components/shader/shader-tool";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useShaderBuddy } from "@/hooks/use-shader-buddy";
import { ThirdBracketSquareIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Chat from "./components/chat";

export function App() {
  const { vertexShader, fragmentShader } = useShaderBuddy();

  return (
    <main className="grid grid-cols-2 gap-4 p-4 min-h-svh">
      <div className="grid grid-rows-2 gap-4">
        <div className="overflow-hidden rounded-md border">
          <ShaderTool
            fragmentShader={fragmentShader}
            vertexShader={vertexShader}
          />
        </div>

        <div className="rounded-md border ">
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
      <Chat />
    </main>
  );
}

export default App;
