import { useAgentChat } from "@cloudflare/ai-chat/react";
import { useAgent } from "agents/react";

export const useShaderBuddy = () => {
  const agent = useAgent({
    agent: "shader-buddy-agent",
    host: import.meta.env.VITE_AGENT_HOST,
  });

  const {
    messages,
    sendMessage,
    clearHistory,
    addToolApprovalResponse,
    status,
  } = useAgentChat({
    agent,
  });

  return {
    agent,
    messages,
    sendMessage,
    clearHistory,
    addToolApprovalResponse,
    status,
  };
};
