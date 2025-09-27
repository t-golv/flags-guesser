import { For } from "solid-js";
import type { RecentItem } from "./types";

export default function RecentList(props: { recent: RecentItem[] }) {
  return (
    <aside class="min-w-75 p-4">
      <h3 class="text-lg font-bold mb-2">Recent</h3>
      <div class="flex px-10 lg:px-2 flex-col max-w-[90%] gap-2">
        <For each={props.recent}>
          {(r) => (
            <div class="flex relative  bg-gradient-to-r from-slate-700 to-transparent gap-4 items-center pl-9 py-4 pr-4 rounded-lg text-sm">
              <div class="absolute  -left-8">
                <img
                  loading="lazy"
                  class="w-14 unselectable border-2 border-slate-700 rounded-sm object-cover h-9"
                  src={r.flag}
                />
              </div>
              <p class="flex-1 text-sm">{r.name}</p>
              <div class={`${r.wrong ? "text-red-400" : "text-green-400"}`}>
                {r.wrong ? "Lost" : `${r.time.toFixed(2)}s`}
              </div>
            </div>
          )}
        </For>
      </div>
    </aside>
  );
}
