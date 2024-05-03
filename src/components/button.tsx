import { Slot } from "@radix-ui/react-slot";
import { ComponentProps, forwardRef } from "react";
import { cn } from "src/lib/utils";

interface ButtonProps extends ComponentProps<"button"> {
  asChild?: boolean;
  variant?: "text" | "icon" | "outline";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ asChild, className, variant = "text", ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  const variantStyles = {
    text: "rounded inline-flex gap-2 bg-blue-500 px-4 py-2 transition-colors hover:bg-blue-600 focus-visible:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
    icon: "rounded-full p-2 hover:bg-gray-800 focus-visible:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
    outline:
      "rounded -outline-offset-2 inline-flex px-4 py-2 outline-2 outline outline-blue-500 hover:bg-gray-800/50 focus-visible:bg-gray-800",
  };
  return <Comp ref={ref} className={cn("text-white", variantStyles[variant], className)} {...props} />;
});

Button.displayName = "Button";

export default Button;
