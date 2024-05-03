import Button from "./button";
import * as SelectPrimitive from "@radix-ui/react-select";
import { ChevronDown } from "lucide-react";
import { cn } from "src/lib/utils";

const Select = SelectPrimitive.Root;

function SelectTrigger({ className, title, placeholder }: { className?: string; title: string; placeholder: string }) {
  return (
    <SelectPrimitive.Trigger aria-label={title} asChild>
      <Button className={cn("group min-w-40 justify-between !bg-gray-800 text-inherit hover:text-white", className)}>
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon className="group-data-[state=open]:rotate-x-180 transition-transform">
          <ChevronDown />
        </SelectPrimitive.Icon>
      </Button>
    </SelectPrimitive.Trigger>
  );
}

function SelectContent({ children }: { children: React.ReactNode }) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className="relative w-[--radix-select-trigger-width] translate-y-1 overflow-hidden rounded bg-gray-800 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-top-2 data-[state=open]:slide-in-from-top-2"
        position="popper">
        <SelectPrimitive.Viewport className="p-1">{children}</SelectPrimitive.Viewport>
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

function SelectItem({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <SelectPrimitive.Item
      className="w-full cursor-pointer select-none rounded p-2 transition-colors data-[highlighted]:bg-blue-500 data-[highlighted]:text-white data-[highlighted]:outline-none"
      value={value}>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { Select, SelectTrigger, SelectContent, SelectItem };
