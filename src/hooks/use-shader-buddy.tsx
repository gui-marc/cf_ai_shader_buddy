import type { ShaderBuddy, ShaderBuddyState } from "@/agents/shader-buddy";
import { INITIAL_FRAGMENT_SHADER, INITIAL_VERTEX_SHADER } from "@/lib/consts";
import { useAgent } from "agents/react";
import { useState } from "react";

function getUserID() {
  let userID = localStorage.getItem("userID");

  if (!userID) {
    userID =
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15);
    localStorage.setItem("userID", userID);
  }

  return userID;
}

export const useShaderBuddy = () => {
  const userID = getUserID();

  const [vertexShader, setVertexShader] = useState(INITIAL_VERTEX_SHADER);
  const [fragmentShader, setFragmentShader] = useState(INITIAL_FRAGMENT_SHADER);

  const agent = useAgent<ShaderBuddy, ShaderBuddyState>({
    id: userID, // Session persistence using localStorage
    agent: "ShaderBuddy",
    basePath: import.meta.env.VITE_AGENT_BASE_PATH,
    onStateUpdate: (state) => {
      setVertexShader(state.vertexShader);
      setFragmentShader(state.fragmentShader);
    },
  });

  return { agent, vertexShader, fragmentShader };
};
