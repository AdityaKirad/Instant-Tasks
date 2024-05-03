import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { type ElementRef, forwardRef, type ComponentPropsWithoutRef } from "react";
import { cn } from "src/lib/utils";

type DialogOverlayType = typeof DialogPrimitive.Overlay;

type DilaogTitleType = typeof DialogPrimitive.Title;

type DialogContentType = typeof DialogPrimitive.Content;

type DialogContentProps = ComponentPropsWithoutRef<DialogContentType> & { type?: "modal" | "slider" };

const Dialog = DialogPrimitive.Root;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

const DialogOverlay = forwardRef<ElementRef<DialogOverlayType>, ComponentPropsWithoutRef<DialogOverlayType>>(
  ({ className, ...props }, ref) => <DialogPrimitive.Overlay ref={ref} className={cn(className)} {...props} />,
);

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<ElementRef<DialogContentType>, DialogContentProps>(
  ({ className, children, type = "modal", ...props }, ref) => (
    <DialogPortal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
      <DialogPrimitive.Content
        ref={ref}
        className={cn(
          "fixed",
          type === "modal"
            ? "left-1/2 top-1/2 mx-2 w-full max-w-lg -translate-x-1/2 -translate-y-1/2 rounded bg-gray-900 p-2 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-[48%] data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-1/2"
            : "inset-y-0 data-[side=left]:left-0 data-[side=right]:right-0 data-[state=closed]:data-[side=left]:slide-out-to-left data-[state=closed]:data-[side=right]:slide-out-to-right data-[state=open]:data-[side=left]:slide-in-from-left data-[state=open]:data-[side=right]:slide-in-from-right",
          className,
        )}
        {...props}>
        {children}
        <DialogPrimitive.Close className="absolute right-2 top-2 rounded p-1 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500">
          <X />
          <span className="sr-only">close</span>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPortal>
  ),
);

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogTitle = forwardRef<ElementRef<DilaogTitleType>, ComponentPropsWithoutRef<DilaogTitleType>>(
  ({ className, ...props }, ref) => (
    <DialogPrimitive.Title ref={ref} className={cn("text-lg font-bold text-white", className)} {...props} />
  ),
);

DialogTitle.displayName = DialogPrimitive.Title.displayName;

export { Dialog, DialogClose, DialogContent, DialogTitle };
