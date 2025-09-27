import type { RouteDefinition } from "@solidjs/router";
import App from "./App";
import { lazy } from "solid-js";

export const routes: RouteDefinition[] = [
  {
    path: "/",
    component: App,
    children: [
      { path: "/", component: lazy(() => import("./pages/Menu")) },
      { path: "/settings", component: lazy(() => import("./pages/Settings")) },
      {
        path: "/play",
        component: lazy(() => import("./pages/Gameplay/Index")),
      },
      {
        path: "/all-flags",
        component: lazy(() => import("./pages/AllFlags")),
      },
    ],
  },
];
