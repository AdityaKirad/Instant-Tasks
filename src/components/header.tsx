import Avatar from "./avatar";
import Button from "./button";
import { TaskModal } from "./modal";
import Navbar from "./navbar";
import TaskSearch from "./task-search";
import Taskbar from "./taskbar";
import * as Slider from "@radix-ui/react-dialog";
import dayjs from "dayjs";
import { Menu } from "lucide-react";
import { useEffect } from "react";
import { useMediaQuery } from "src/lib/useMediaQuery";
import { useModalActions, useNavSlider, useSliderActions, useTaskSlider } from "src/store";

export default function Header() {
  return (
    <div className="grid grid-cols-3 items-center justify-between gap-2 sm:flex">
      <OpenNavbar />
      <TaskSearch />

      <div className="mx-auto">{dayjs().format("MMM DD, YYYY")}</div>

      <AddTask />
      <OpenTaskbar />
    </div>
  );
}

function OpenNavbar() {
  const navSlider = useNavSlider();
  const { navSliderSet } = useSliderActions();
  const isMobile = useMediaQuery("(min-width: 80em)");

  useEffect(() => {
    if (isMobile) navSliderSet(false);
  }, [isMobile, navSliderSet]);
  return (
    <>
      <Button className="mr-2 xl:hidden" variant="icon" onClick={() => navSliderSet(true)}>
        <Menu />
        <span className="sr-only">Menu</span>
      </Button>
      {!isMobile && (
        <Slider.Root open={navSlider} onOpenChange={navSliderSet}>
          <Slider.Portal>
            <Slider.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
            <Slider.Content
              className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left"
              asChild>
              <Navbar />
            </Slider.Content>
          </Slider.Portal>
        </Slider.Root>
      )}
    </>
  );
}

function AddTask() {
  const { taskModalSet } = useModalActions();
  return (
    <>
      <Button
        className="bottom-4 right-4 max-sm:fixed"
        onClick={() => taskModalSet({ open: true, action: "add", taskId: "" })}>
        Add task
      </Button>
      <TaskModal />
    </>
  );
}

function OpenTaskbar() {
  const taskSlider = useTaskSlider();
  const { taskSliderSet } = useSliderActions();
  const isMobile = useMediaQuery("(min-width: 80em)");

  useEffect(() => {
    if (isMobile) taskSliderSet(false);
  }, [isMobile, taskSliderSet]);
  return (
    <>
      <Button className="ml-2 justify-self-end p-0 xl:hidden" variant="icon" onClick={() => taskSliderSet(true)}>
        <Avatar />
        <span className="sr-only">Taskbar</span>
      </Button>
      {!isMobile && (
        <Slider.Root open={taskSlider} onOpenChange={taskSliderSet}>
          <Slider.Portal>
            <Slider.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
            <Slider.Content
              className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right"
              asChild>
              <Taskbar />
            </Slider.Content>
          </Slider.Portal>
        </Slider.Root>
      )}
    </>
  );
}
