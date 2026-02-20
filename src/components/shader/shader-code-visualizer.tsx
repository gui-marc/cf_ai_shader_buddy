import { HugeiconsIcon } from "@hugeicons/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { ThirdBracketSquareIcon } from "@hugeicons/core-free-icons";
import ShaderCodeTab from "./shader-code-tab";

export default function ShaderCodeVisualizer({
  vertex,
  fragment,
}: {
  vertex: string;
  fragment: string;
}) {
  return (
    <Tabs defaultValue="fragment-code">
      <div className="p-2 border-b">
        <TabsList>
          <TabsTrigger value="fragment-code">
            <HugeiconsIcon icon={ThirdBracketSquareIcon} />
            Fragment Shader
          </TabsTrigger>
          <TabsTrigger value="vertex-code">
            <HugeiconsIcon icon={ThirdBracketSquareIcon} />
            Vertex Shader
          </TabsTrigger>
        </TabsList>
      </div>

      <div className="flex-1 overflow-hidden flex">
        <TabsContent value="fragment-code">
          <ShaderCodeTab shaderCode={fragment} />
        </TabsContent>
        <TabsContent value="vertex-code">
          <ShaderCodeTab shaderCode={vertex} />
        </TabsContent>
      </div>
    </Tabs>
  );
}
