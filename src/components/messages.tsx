import { useShaderBuddy } from "@/hooks/use-shader-buddy";
import { cn, parseAssistantMessage, parseUserMessage } from "@/lib/utils";
import { AlertIcon, Loading03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { UIMessage } from "ai";
import { cva } from "class-variance-authority";
import { useEffect, useRef } from "react";
import ShaderCodeVisualizer from "./shader/shader-code-visualizer";
import { Button } from "./ui/button";

const messageClasses = cva("rounded-md py-1.5 px-3 relative w-fit", {
  variants: {
    role: {
      assistant: "bg-accent text-accent-foreground",
      user: "ml-auto bg-primary text-primary-foreground",
    },
  },
});

function UserMessage({ message }: { message: UIMessage }) {
  const text = message.parts.reduce((acc, part) => {
    if (part.type === "text") {
      return acc + part.text;
    }
    return acc;
  }, "");

  const parsedMessage = parseUserMessage(text);

  return (
    <div className={cn(messageClasses({ role: "user" }))}>
      {parsedMessage.user}
    </div>
  );
}

function AssistantMessage({
  message,
  isLastMessage,
}: {
  message: UIMessage;
  isLastMessage: boolean;
}) {
  const { status, setShaderToMessage } = useShaderBuddy();

  if (isLastMessage && status === "streaming") {
    return (
      <div className={cn(messageClasses({ role: "assistant" }))}>
        <div className="flex items-center gap-2">
          <HugeiconsIcon
            className="animate-spin size-4 text-foreground"
            icon={Loading03Icon}
          />
          <span className="text-sm text-accent-foreground">Generating...</span>
        </div>
      </div>
    );
  }

  const text = message.parts.reduce((acc, part) => {
    if (part.type === "text") {
      return acc + part.text;
    }
    return acc;
  }, "");

  const response = parseAssistantMessage(text);

  if (!response.vertex || !response.fragment) {
    return (
      <div className={cn(messageClasses({ role: "assistant" }))}>
        <div className="flex items-center gap-2">
          <HugeiconsIcon className="size-4 text-foreground" icon={AlertIcon} />
          <span className="text-sm text-accent-foreground">
            Failed to parse shaders
          </span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={cn(messageClasses({ role: "assistant" }))}>
        <p>{response.assistant}</p>
      </div>
      <div className={cn(messageClasses({ role: "assistant" }), "w-auto")}>
        <ShaderCodeVisualizer
          fragment={response.fragment}
          vertex={response.vertex}
        />
        <div className="w-full pt-3 pb-1.5">
          <Button
            variant="outline"
            className="ml-auto block"
            onClick={() => setShaderToMessage(message.id)}
          >
            Use this shader
          </Button>
        </div>
      </div>
    </>
  );
}

function Message({
  message,
  isLastMessage,
}: {
  message: UIMessage;
  isLastMessage: boolean;
}) {
  if (message.role === "user") {
    return <UserMessage message={message} />;
  } else if (message.role === "assistant") {
    return <AssistantMessage message={message} isLastMessage={isLastMessage} />;
  }
}

export default function Messages({ messages }: { messages: UIMessage[] }) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container.current) {
      // Scroll to the bottom when new messages are added
      container.current.scrollTop = container.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={container}
      className="flex-1 overflow-y-auto flex flex-col gap-3 p-4"
    >
      {messages.map((message, index) => (
        <Message
          key={message.id}
          message={message}
          isLastMessage={index === messages.length - 1}
        />
      ))}
    </div>
  );
}
