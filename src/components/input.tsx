import { type InputHTMLAttributes, forwardRef } from "react";
import { cn } from "src/lib/utils";

const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(({ className, ...props }, ref) => (
  <input
    className={cn(
      "inline-block w-full rounded bg-gray-800 p-2 text-white outline-none focus-visible:outline-blue-500",
      className,
    )}
    ref={ref}
    {...props}
  />
));

Input.displayName = "Input";

export default Input;
