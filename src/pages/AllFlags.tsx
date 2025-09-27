import { For } from "solid-js";
import flags from "../assets/flags.json"; // adjust if path differs

export default function AllFlags() {
  return (
    <div class="h-screen w-full overflow-y-auto p-4 bg-neutral-950 text-white">
      <div class="grid gap-4 grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        <For each={flags}>
          {(flag) => (
            <div class="flex flex-col items-center text-center p-2 bg-neutral-800 rounded-md ">
              <img
                src={flag.flag}
                alt={flag.name}
                class="w-full aspect-video object-contain rounded "
                loading="lazy"
              />
              <span class="mt-2 text-sm truncate w-full">{flag.name}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  );
}
