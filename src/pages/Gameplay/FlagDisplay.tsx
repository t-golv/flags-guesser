import { onCleanup, onMount, Show } from "solid-js";
import type { Flag } from "./types";

export default function FlagDisplay(props: {
  current: Flag | null;
  revealed: string | null;
  input: string;
  onInput: (e: InputEvent) => void;
  inputRef: (el: HTMLInputElement | undefined) => void;
}) {
  let inputEl: HTMLInputElement | undefined;

  onMount(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === ";") {
        e.preventDefault();
        inputEl?.focus();
      }
    };
    window.addEventListener("keydown", handler);
    onCleanup(() => window.removeEventListener("keydown", handler));
  });

  return (
    <Show when={props.current}>
      <div class="flex flex-col items-center gap-6">
        <div class="relative w-[1000px] flex flex-col items-center justify-center">
          {/* Flag with border */}
          <div
            classList={{
              "scale-90 ": !!props.revealed,
            }}
            class="inline-block bg-black shadow-xl rounded-lg overflow-hidden z-1"
          >
            <img
              src={props.current!.flag}
              alt={props.current!.name}
              class="unselectable transition-opacity w-full h-auto max-h-[500px] object-contain"
              classList={{
                "opacity-50": !!props.revealed,
              }}
            />
          </div>

          {/* Blurred background */}
          <img
            src={props.current!.flag}
            class="absolute unselectable blur-[7rem] rounded-[100%] min-w-[105%] min-h-[105%]  object-contain opacity-25  z-0"
          />

          {/* Correct answer reveal */}
          <Show when={props.revealed}>
            <p class="absolute translate-y-[-50%] translate-x-[-50%] top-[50%] left-[50%] z-2 text-2xl font-bold text-white px-4 py-2 rounded-lg">
              {props.revealed}
            </p>
          </Show>
        </div>

        <input
          ref={inputEl}
          type="text"
          value={props.input}
          onInput={props.onInput}
          placeholder="Flag name..."
          disabled={props.revealed !== null} // disable while showing answer
          class="w-[480px] z-1 px-6 py-4 rounded-4xl bg-slate-800/50 border border-slate-600 text-white text-center text-xl focus:outline-none focus:border-purple-500 disabled:opacity-0"
          autocomplete="off"
        />
      </div>
    </Show>
  );
}
