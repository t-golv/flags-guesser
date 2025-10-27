import { A } from "@solidjs/router";

export default function Sidebar(props: {
  lives: number;
  streak: number;
  timeLeft: number;
}) {
  return (
    <aside class="flex lg:flex-col p-4 gap-4 w-56">
      <A
        href="/"
        class="bg-slate-900 rounded-lg p-4 text-center font-bold cursor-pointer"
      >
        🏛 HOME
      </A>

      <div class="bg-slate-900 rounded-lg p-4 text-center">
        <p class="text-red-500 font-bold">❤️ LIVES</p>
        <p class="text-2xl font-bold">{props.lives}</p>
      </div>

      <div class="bg-slate-900 rounded-lg p-4 text-center">
        <p class="text-yellow-400 font-bold">🔥 STREAK</p>
        <p class="text-2xl font-bold">{props.streak}</p>
      </div>

      <div class="bg-slate-900 rounded-lg p-4 text-center">
        <p class="text-purple-300 font-bold">⏱ TIMER</p>
        <p class="text-2xl font-bold">{(props.timeLeft / 1000).toFixed(2)}</p>
      </div>
    </aside>
  );
}
