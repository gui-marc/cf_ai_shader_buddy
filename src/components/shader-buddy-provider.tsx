import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";

import { ShaderBuddyContext } from "@/contexts/shader-buddy-context";
import { useState } from "react";
import { INITIAL_FRAGMENT_SHADER, INITIAL_VERTEX_SHADER } from "@/lib/consts";
import { parseShaders } from "@/lib/utils";

type ShaderBuddyProviderProps = {
  children: React.ReactNode;
};

export function ShaderBuddyProvider({ children }: ShaderBuddyProviderProps) {
  const [fragment, setFragment] = useState(INITIAL_FRAGMENT_SHADER);
  const [vertex, setVertex] = useState(INITIAL_VERTEX_SHADER);

  const agent = useAgent({
    agent: "shader-buddy-agent",
    host: import.meta.env.VITE_AGENT_HOST,
  });

  const {
    messages,
    sendMessage: _sendMessage,
    clearHistory,
    status,
  } = useAgentChat({
    agent,
    onFinish: ({ message }) => {
      const text = message.parts.reduce((acc, part) => {
        if (part.type === "text") return acc + part.text;
        return acc;
      }, "");

      const shader = parseShaders(text);

      if (!shader.fragment || !shader.vertex) return;

      setFragment(shader.fragment);
      setVertex(shader.vertex);
    },
  });

  const sendMessage = (message: string) => {
    _sendMessage({ text: message });
  };

  const setShaderToMessage = (messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;
    if (message.role === "user") return;

    const text = message.parts.reduce((acc, part) => {
      if (part.type === "text") return acc + part.text;
      return acc;
    }, "");

    const { fragment, vertex } = parseShaders(text);

    if (fragment) setFragment(fragment);
    if (vertex) setVertex(vertex);
  };

  const clearShaderHistoryAndReset = () => {
    setFragment(INITIAL_FRAGMENT_SHADER);
    setVertex(INITIAL_VERTEX_SHADER);
    clearHistory();
  };

  return (
    <ShaderBuddyContext.Provider
      value={{
        messages,
        clearHistory: clearShaderHistoryAndReset,
        sendMessage,
        status,
        fragmentShader: fragment,
        vertexShader: vertex,
        setFragmentShader: setFragment,
        setVertexShader: setVertex,
        setShaderToMessage,
      }}
    >
      {children}
    </ShaderBuddyContext.Provider>
  );
}
