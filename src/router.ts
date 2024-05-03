import { createRouter, createRootRoute, createRoute } from "@tanstack/react-router";
import App from "src/App";
import {
  CompletedRoute,
  DirectoriesRoute,
  DynamicDirectoriesRoute,
  DynamicTasks,
  HomeRoute,
  ImportantRoute,
  IncompleteRoute,
  Tasks,
  TodayRoute,
} from "src/routes";

const rootRoute = createRootRoute({
  component: App,
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: HomeRoute,
  path: "/",
});

const todayRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: TodayRoute,
  path: "/today",
});

const importantRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: ImportantRoute,
  path: "/important",
});

const completedRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: CompletedRoute,
  path: "/completed",
});

const inCompleteRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: IncompleteRoute,
  path: "/incomplete",
});

const directoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: DirectoriesRoute,
  path: "/directory",
});

const dynamicDirectoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: DynamicDirectoriesRoute,
  path: "/directory/$directory",
});

const tasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: Tasks,
  path: "/tasks",
  validateSearch: (search: Record<string, unknown>) => ({ query: (search.query as string) || "" }),
});

const dynamicTasksRoute = createRoute({
  getParentRoute: () => rootRoute,
  component: DynamicTasks,
  path: "/tasks/$taskId",
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  todayRoute,
  importantRoute,
  completedRoute,
  inCompleteRoute,
  directoriesRoute,
  dynamicDirectoriesRoute,
  tasksRoute,
  dynamicTasksRoute,
]);

export const router = createRouter({ routeTree, defaultPreload: "intent" });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
