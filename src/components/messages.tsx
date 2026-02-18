import { cn } from "@/lib/utils";
import type { UIMessage } from "ai";
import { cva } from "class-variance-authority";

const messageClasses = cva("rounded-md py-1.5 px-3 relative w-fit", {
  variants: {
    role: {
      assistant: "bg-accent text-accent-foreground",
      user: "ml-auto bg-primary text-primary-foreground",
    },
  },
});

export default function Messages({ messages }: { messages: UIMessage[] }) {
  return (
    <div className="flex-1 overflow-y-auto flex flex-col gap-3">
      {messages.map((message) => (
        <div
          className={cn(
            messageClasses({ role: message.role as "user" | "assistant" }),
          )}
          key={message.id}
        >
          {message.parts.map((part, i) => {
            if (part.type === "text") {
              return <span key={i}>{part.text}</span>;
            }
          })}
        </div>
      ))}
    </div>
  );
}
