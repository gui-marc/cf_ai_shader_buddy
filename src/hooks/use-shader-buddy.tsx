import type { ShaderBuddy, ShaderBuddyState } from "@/agents/shader-buddy";
import { INITIAL_FRAGMENT_SHADER, INITIAL_VERTEX_SHADER } from "@/lib/consts";
import { useAgent } from "agents/react";
import { useState } from "react";

export const useShaderBuddy = () => {
  const [vertexShader, setVertexShader] = useState(INITIAL_VERTEX_SHADER);
  const [fragmentShader, setFragmentShader] = useState(INITIAL_FRAGMENT_SHADER);

  const agent = useAgent<ShaderBuddy, ShaderBuddyState>({
    agent: "ShaderBuddy",
    onStateUpdate: (state) => {
      setVertexShader(state.vertexShader);
      setFragmentShader(state.fragmentShader);
    },
  });

  return { agent, vertexShader, fragmentShader };
};
