import type { Component } from "solid-js";
import Button from "../components/Button";
import { useNavigate } from "@solidjs/router";

const Menu: Component<{}> = () => {
  const navigate = useNavigate();
  return (
    <div class="h-screen w-screen flex flex-col items-center justify-center gap-6">
      <h1 class="text-4xl font-bold text-white mb-6">Flags Guesser</h1>
      <Button
        onClick={() => {
          navigate("play");
        }}
        class="bg-indigo-600 hover:bg-indigo-500"
      >
        Play
      </Button>
      <Button
        onClick={() => {
          navigate("settings");
        }}
      >
        Settings
      </Button>
    </div>
  );
};

export default Menu;
