import { useAgent } from "agents/react";
import { useAgentChat } from "@cloudflare/ai-chat/react";

import { ShaderBuddyContext } from "@/contexts/shader-buddy-context";
import { useState } from "react";
import { INITIAL_FRAGMENT_SHADER, INITIAL_VERTEX_SHADER } from "@/lib/consts";

type ShaderBuddyProviderProps = {
  children: React.ReactNode;
};

const parseShaders = (rawText: string) => {
  // Regex para capturar o conteúdo entre [vertex] e [/vertex] ou <vertex> e </vertex>
  // O sinalizador 'i' torna a busca case-insensitive
  const vertexMatch = rawText.match(/<vertex>([\s\S]*?)<\/vertex>/i);
  const fragmentMatch = rawText.match(/<fragment>([\s\S]*?)<\/fragment>/i);

  return {
    vertex: vertexMatch ? vertexMatch[1].trim() : null,
    fragment: fragmentMatch ? fragmentMatch[1].trim() : null,
  };
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

  return (
    <ShaderBuddyContext.Provider
      value={{
        messages,
        clearHistory,
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
