import Searchbar from "./components/header";
import SortAndLayout from "./components/sort-layout";
import { useMediaQuery } from "./lib/useMediaQuery";
import { Outlet } from "@tanstack/react-router";
import { Suspense, lazy } from "react";
import Navbar from "src/components/navbar";
import Taskbar from "src/components/taskbar";

const TanStackRouterDevtools = import.meta.env.PROD
  ? () => null
  : lazy(() =>
      import("@tanstack/router-devtools").then((res) => ({
        default: res.TanStackRouterDevtools,
      })),
    );

function App() {
  return (
    <>
      <TaskAndNav />
      <div className="mx-auto xl:w-3/5">
        <div className="sticky top-0 bg-gray-900 p-2">
          <Searchbar />
          <SortAndLayout />
        </div>
        <Outlet />
      </div>
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  );
}

function TaskAndNav() {
  const isMobile = useMediaQuery("(min-width: 80em)");
  if (isMobile)
    return (
      <>
        <Navbar />
        <Taskbar />
      </>
    );
}

export default App;
