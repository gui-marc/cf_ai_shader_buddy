import { ArrowRightIcon } from "@hugeicons/core-free-icons";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { HugeiconsIcon } from "@hugeicons/react";

type AgentInputProps = {
  onSubmit?: (input: string) => void;
};

export default function AgentInput({ onSubmit }: AgentInputProps) {
  function onFormSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const input = formData.get("agent-input") as string;
    if (input && onSubmit) {
      onSubmit(input);
    }
    e.target.reset();
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      (e.currentTarget as HTMLTextAreaElement).form?.requestSubmit();
    }
  }

  return (
    <form onSubmit={onFormSubmit}>
      <p className="text-center mb-2 text-muted-foreground text-xs">
        Powered by{" "}
        <a
          href="https://agents.cloudflare.com/"
          target="_blank"
          className="underline text-foreground hover:text-primary"
        >
          Cloudflare Agents
        </a>
      </p>
      <InputGroup>
        <InputGroupTextarea
          name="agent-input"
          placeholder="Ask, Search or Chat…"
          onKeyDown={onKeyDown}
        />
        <InputGroupAddon align="block-end">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="submit"
                aria-label="Send"
                className="rounded-full ml-auto"
                size="icon-sm"
                variant="default"
              >
                <HugeiconsIcon icon={ArrowRightIcon} />
              </Button>
            </TooltipTrigger>
            <TooltipContent>send</TooltipContent>
          </Tooltip>
        </InputGroupAddon>
      </InputGroup>
    </form>
  );
}
