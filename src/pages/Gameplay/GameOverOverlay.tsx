import { useNavigate } from "@solidjs/router";
import Button from "../../components/Button";
import type { RecentItem } from "./types";

export default function GameOverOverlay(props: {
  lastStreak: number;
  recent: RecentItem[];
  onRestart: () => void;
}) {
  const avgSpeed = () => {
    const correct = props.recent.filter((r) => !r.wrong);
    if (!correct.length) return "—";
    return (
      (correct.reduce((a, r) => a + r.time, 0) / correct.length).toFixed(2) +
      "s"
    );
  };
  const navigate = useNavigate();

  return (
    <div class="absolute bg-black/50 inset-0 z-50 flex items-center justify-center">
      <div class="p-8  text-center w-[min(620px,92vw)]">
        <h1 class="text-6xl font-bold mb-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text">
          GAME OVER
        </h1>
        <p class="mb-4 text-xl">
          <span class="text-gray-400">Final streak:</span> 🔥{" "}
          <b>{props.lastStreak}</b>
        </p>
        <p class="mb-8 text-xl">
          <span class="text-gray-400">Average speed:</span> <b>{avgSpeed()}</b>
        </p>
        <div class="flex flex-col gap-4">
          <Button
            class="bg-purple-600 hover:bg-purple-500"
            onClick={props.onRestart}
          >
            Play Again
          </Button>
          <Button
            onClick={() => {
              navigate("/");
            }}
          >
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
