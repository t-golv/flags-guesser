import type { Component } from "solid-js";
import { createSignal, onMount, createEffect } from "solid-js";
import Button from "../components/Button";
import { useNavigate } from "@solidjs/router";

type EndMode = "infinite" | "streak";

type SettingsState = {
  timeMs: number;
  lives: number;
  endMode: EndMode;
  streakGoal: number;
};

const LOCAL_KEY = "flag-guess-settings";

const Settings: Component<{}> = () => {
  const [settings, setSettings] = createSignal<SettingsState>({
    timeMs: 5000,
    lives: 3,
    endMode: "infinite",
    streakGoal: 10,
  });

  // load from localStorage
  onMount(() => {
    const stored = localStorage.getItem(LOCAL_KEY);
    if (stored) setSettings(JSON.parse(stored));
  });

  // persist to localStorage whenever settings change
  createEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(settings()));
  });
  const navigate = useNavigate();

  return (
    <div class="h-screen w-screen flex flex-col items-center justify-center gap-8 text-white">
      <h1 class="text-5xl font-bold mb-6">Settings</h1>

      <div class="flex flex-col gap-6 w-96">
        {/* Timer */}
        <p class="text-xl font-bold mt-2">⏰ Timer</p>
        <input
          type="number"
          placeholder="Timer (ms)"
          value={settings().timeMs}
          onInput={(e) =>
            setSettings((prev) => ({
              ...prev,
              timeMs: Math.max(
                200,
                Number((e.target as HTMLInputElement).value)
              ),
            }))
          }
          class="px-10 py-4 text-2xl rounded-4xl bg-gray-700 text-white outline-none text-center"
        />
        <p class="text-xl font-bold mt-2">❤ Lives</p>
        {/* Lives */}
        <input
          type="number"
          placeholder="Lives"
          value={settings().lives}
          onInput={(e) =>
            setSettings((prev) => ({
              ...prev,
              lives: Math.min(
                10,
                Math.max(1, Number((e.target as HTMLInputElement).value))
              ),
            }))
          }
          class="px-10 py-4 text-2xl rounded-4xl bg-gray-700 text-white outline-none text-center"
        />

        {/* End Mode */}
        <div class="flex flex-col gap-4">
          <div class="text-xl font-semibold mb-2">Game End Mode</div>
          <div class="flex gap-4 items-center">
            <label class="flex items-center gap-2 text-xl">
              <input
                type="radio"
                name="endMode"
                checked={settings().endMode === "infinite"}
                onInput={() =>
                  setSettings((prev) => ({ ...prev, endMode: "infinite" }))
                }
              />
              Infinite
            </label>

            <label class="flex items-center gap-2 text-xl">
              <input
                type="radio"
                name="endMode"
                checked={settings().endMode === "streak"}
                onInput={() =>
                  setSettings((prev) => ({ ...prev, endMode: "streak" }))
                }
              />
              Streak
            </label>

            <input
              type="number"
              placeholder="Goal"
              value={settings().streakGoal}
              onInput={(e) =>
                setSettings((prev) => ({
                  ...prev,
                  streakGoal: Math.max(
                    1,
                    Number((e.target as HTMLInputElement).value)
                  ),
                }))
              }
              disabled={settings().endMode !== "streak"}
              class="px-8 py-4 text-xl rounded-4xl bg-gray-700 text-white outline-none text-center disabled:opacity-50"
            />
          </div>
        </div>
        <div class="flex gap-4">
          <Button
            onClick={() => alert("Settings saved!")}
            class="bg-indigo-600 hover:bg-indigo-500 text-2xl px-12 py-4"
          >
            Save
          </Button>
          <Button
            onClick={() => navigate("/")}
            class="hover:bg-slate-500 text-2xl px-12 py-4"
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
