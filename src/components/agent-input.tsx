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

export default function AgentInput() {
  return (
    <InputGroup>
      <InputGroupTextarea placeholder="Ask, Search or Chat…" />
      <InputGroupAddon align="block-end">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
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
  );
}
