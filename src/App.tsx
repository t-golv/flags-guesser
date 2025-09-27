import type { RouteSectionProps } from "@solidjs/router";
import type { Component } from "solid-js";

const App: Component<RouteSectionProps> = (props) => {
  return (
    <main class="h-[100vh] overflow-x-hidden w-[100vw]  bg-gradient-to-b from-slate-950 to-slate-900">
      {props.children}
    </main>
  );
};

export default App;
