import Button from "./button";
import * as Collapsible from "@radix-ui/react-collapsible";
import { Link } from "@tanstack/react-router";
import { ChevronDown, Edit, Plus, Trash } from "lucide-react";
import { forwardRef, memo, useState } from "react";
import { DirectoryModal } from "src/components/modal";
import { cn } from "src/lib/utils";
import { useDirectories, useModalActions } from "src/store";

const Navbar = forwardRef<HTMLDivElement, React.ComponentProps<"div">>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 bg-gray-800 py-4 xl:w-1/5 [&_a]:py-2 [&_a]:outline-none hover:[&_a]:text-white focus-visible:[&_a]:text-white data-[status=active]:[&_a]:border-r-2 data-[status=active]:[&_a]:border-white data-[status=active]:[&_a]:bg-gray-700 data-[status=active]:[&_a]:text-white",
        className,
      )}
      ref={ref}
      {...props}>
      <h1 className="text-center text-2xl font-bold text-white">Instant Tasks</h1>

      <nav className="mt-4 [&>a]:block [&>a]:px-2">
        <Link to="/today" target="">
          Today&apos;s Tasks
        </Link>
        <Link to="/">All Tasks</Link>
        <Link to="/important">Important Tasks</Link>
        <Link to="/completed">Completed Tasks</Link>
        <Link to="/incomplete">Incomplete Tasks</Link>
      </nav>

      <Directories />
    </div>
  );
});

Navbar.displayName = "Navbar";

function Directories() {
  const [open, openSet] = useState(true);
  return (
    <>
      <Collapsible.Root className="mt-4" open={open} onOpenChange={openSet}>
        <Collapsible.Trigger asChild>
          <button
            className="flex w-full items-center justify-between p-2 outline-none transition-colors hover:bg-gray-700 hover:text-white focus-visible:bg-gray-700 focus-visible:text-white"
            type="button">
            Directories{" "}
            <ChevronDown
              className={cn("transition-transform", {
                "rotate-x-180": open,
              })}
            />
          </button>
        </Collapsible.Trigger>
        <Collapsible.Content className="overflow-y-hidden py-2 data-[state=closed]:animate-collapsible-close data-[state=open]:animate-collapsible-open">
          <DirectoriesList />
          <DirectoryAddButton />
        </Collapsible.Content>
      </Collapsible.Root>
      <DirectoryModal />
    </>
  );
}

function DirectoriesList() {
  const directories = useDirectories();
  return directories.map((directory) => <DirectoryLink directory={directory} key={`${directory} anchor`} />);
}

const DirectoryLink = memo(({ directory }: { directory: string }) => {
  const { directoryModalSet } = useModalActions();
  return (
    <Link className="group flex items-center justify-between px-4" to="/directory/$directory" params={{ directory }}>
      <span>{directory}</span>
      {directory !== "Main" ? (
        <div className="opacity-0 transition-opacity group-focus-within:opacity-100 group-hover:opacity-100">
          <Button variant="icon" onClick={() => directoryModalSet({ open: true, action: "edit", directory })}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="icon" onClick={() => directoryModalSet({ open: true, action: "delete", directory })}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      ) : null}
    </Link>
  );
});

DirectoryLink.displayName = "DirectoryLink";

function DirectoryAddButton() {
  const { directoryModalSet } = useModalActions();
  return (
    <Button
      className="ml-4 mt-2 border-2 border-dashed border-gray-700 !bg-transparent text-inherit hover:text-white focus-visible:text-white"
      onClick={() => directoryModalSet({ open: true, action: "add", directory: "" })}>
      <Plus /> New
    </Button>
  );
}

export default Navbar;
