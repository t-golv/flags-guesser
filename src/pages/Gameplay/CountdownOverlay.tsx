import { Show } from "solid-js";

export default function CountdownOverlay(props: {
  countdown: number;
  showGo: boolean;
}) {
  return (
    <>
      <Show when={props.countdown > 0}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div class="text-8xl font-extrabold">{props.countdown}</div>
        </div>
      </Show>
      <Show when={props.showGo}>
        <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div class="text-8xl font-extrabold text-green-400">GO!</div>
        </div>
      </Show>
    </>
  );
}
