import { createSignal, onMount, onCleanup, createEffect } from "solid-js";
import CountdownOverlay from "./CountdownOverlay";
import GameOverOverlay from "./GameOverOverlay";
import Sidebar from "./Sidebar";
import FlagDisplay from "./FlagDisplay";
import RecentList from "./RecentList";
import { randomFlag } from "./constants";
import type { Flag } from "./types";
import { loadSound, playSound } from "./sounds";
import { useLocation } from "@solidjs/router";

function loadSettings() {
  try {
    return {
      timeMs: 5000,
      lives: 3,
      endMode: "infinite",
      streakGoal: 10,
      ...JSON.parse(localStorage.getItem("flag-guess-settings") || "{}"),
    };
  } catch {
    return { timeMs: 5000, lives: 3, endMode: "infinite", streakGoal: 10 };
  }
}

export default function Gameplay() {
  const settings = loadSettings();
  const location = useLocation();

  let inputRef: HTMLInputElement | undefined;
  let rafId = 0;
  let countdownTimer: ReturnType<typeof setInterval>;
  let goTimeout: ReturnType<typeof setTimeout>;
  let nextFlagTimeout: ReturnType<typeof setTimeout>;
  let startTime = 0;
  let endTime = 0;
  let isActive = true;

  const [phase, setPhase] = createSignal<"countdown" | "playing" | "gameover">(
    "countdown"
  );
  const [lastStreak, setLastStreak] = createSignal(0);
  const [countdown, setCountdown] = createSignal(3);
  const [showGo, setShowGo] = createSignal(false);
  const [lives, setLives] = createSignal(settings.lives);
  const [streak, setStreak] = createSignal(0);
  const [recent, setRecent] = createSignal<
    { name: string; flag: string; time: number; wrong?: boolean }[]
  >([]);
  const [current, setCurrent] = createSignal<Flag | null>(null);
  const [nextFlag, setNextFlag] = createSignal<Flag | null>(null);
  const [input, setInput] = createSignal("");
  const [timeLeft, setTimeLeft] = createSignal(settings.timeMs);
  const [revealed, setRevealed] = createSignal<string | null>(null);

  const pushRecent = (item: {
    name: string;
    flag: string;
    time: number;
    wrong?: boolean;
  }) => setRecent((r) => [item, ...r].slice(0, 8));

  // --- Pick a new flag avoiding recent ---
  const pickNextFlag = () => {
    const recentNames = recent().map((r) => r.name);
    let candidate: Flag | null = null;
    let tries = 0;
    do {
      candidate = randomFlag();
      tries++;
      if (tries > 50) break; // fallback
    } while (recentNames.includes(candidate.name));
    return candidate;
  };

  // --- Countdown before game starts ---
  const startCountdown = () => {
    if (!isActive) return;
    setPhase("countdown");
    setCountdown(3);
    setShowGo(false);
    let c = 3;
    countdownTimer = setInterval(() => {
      if (!isActive) return clearInterval(countdownTimer);
      c--;
      if (c > 0) setCountdown(c);
      else {
        clearInterval(countdownTimer);
        setCountdown(0);
        setShowGo(true);
        goTimeout = setTimeout(() => {
          setShowGo(false);
          startRound();
          playSound("notification");
        }, 600);
      }
    }, 1000);
  };

  // --- Start a round ---
  const startRound = () => {
    if (!isActive) return;
    setPhase("playing");
    setCurrent(nextFlag() ?? randomFlag());
    setNextFlag(null);
    setInput("");
    setRevealed(null);
    startTime = performance.now();
    endTime = startTime + settings.timeMs;
    setTimeLeft(settings.timeMs);
    inputRef?.focus();
    rafId = requestAnimationFrame(tick);
  };

  // --- Timer tick ---
  const tick = (now: number) => {
    if (!isActive || phase() !== "playing") return;
    const remaining = Math.max(0, endTime - now);
    setTimeLeft(remaining);
    if (remaining <= 0) handleTimeout();
    else rafId = requestAnimationFrame(tick);
  };

  // --- Reveal answer and optionally end game ---
  const revealAnswerAndNext = (endGame = false, finalStreak?: number) => {
    setRevealed(current()!.name);
    setInput("");
    cancelAnimationFrame(rafId);

    // Pre-select next flag if not endGame
    if (!endGame) setNextFlag(pickNextFlag());

    nextFlagTimeout = setTimeout(() => {
      if (endGame) {
        setLastStreak(finalStreak ?? streak());
        setPhase("gameover");
      } else {
        const flagToUse = nextFlag() ?? pickNextFlag();
        setCurrent(flagToUse);
        startRound();
        setNextFlag(null);
      }
    }, 3000);
  };

  // --- Timeout handler ---
  const handleTimeout = () => {
    if (!isActive) return;
    const currentStreak = streak();

    pushRecent({
      name: current()!.name,
      flag: current()!.flag,
      time: 0,
      wrong: true,
    });
    setStreak(0);

    if (lives() - 1 <= 0) {
      playSound("notification");
      setLives(0);
      revealAnswerAndNext(true, currentStreak);
    } else {
      setLives((l) => l - 1);
      playSound("wrong");
      revealAnswerAndNext();
    }
  };

  // --- Enter key handler ---
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isActive || phase() !== "playing") return;
    if (revealed()) return; // prevent spamming while answer is revealed
    if (e.key !== "Enter") return;

    const val = input().trim().toLowerCase();
    const correctName = current()!.name.toLowerCase();
    const currentStreak = streak();

    if (val === correctName) {
      playSound("correct");
      const guessTime = (performance.now() - startTime) / 1000;
      pushRecent({
        name: current()!.name,
        flag: current()!.flag,
        time: guessTime,
      });
      const nextStreak = currentStreak + 1;
      setStreak(nextStreak);

      if (settings.endMode === "streak" && nextStreak >= settings.streakGoal) {
        revealAnswerAndNext(true, nextStreak);
      } else {
        revealAnswerAndNext();
      }
    } else {
      playSound("wrong");
      pushRecent({
        name: current()!.name,
        flag: current()!.flag,
        time: 0,
        wrong: true,
      });
      setStreak(0);

      if (lives() - 1 <= 0) {
        setLives(0);
        revealAnswerAndNext(true, currentStreak);
      } else {
        setLives((l) => l - 1);
        revealAnswerAndNext();
      }
    }
  };

  const restartGame = () => {
    setLives(settings.lives);
    setStreak(0);
    setRecent([]);
    startCountdown();
  };

  // --- Stop everything on route change ---
  createEffect(() => {
    if (location.pathname !== "/flags-guesser/play") {
      isActive = false;
      cancelAnimationFrame(rafId);
      clearInterval(countdownTimer);
      clearTimeout(goTimeout);
      clearTimeout(nextFlagTimeout);
    }
  });

  onMount(() => {
    loadSound("correct", "flags-guesser//sounds/correct.mp3");
    loadSound("wrong", "/flags-guesser/sounds/wrong.mp3");
    loadSound("notification", "/flags-guesser/sounds/notification.mp3");
    window.addEventListener("keydown", handleKeyDown);
    startCountdown();
  });

  onCleanup(() => {
    isActive = false;
    cancelAnimationFrame(rafId);
    clearInterval(countdownTimer);
    clearTimeout(goTimeout);
    clearTimeout(nextFlagTimeout);
    window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div class="flex h-screen flex-col lg:flex-row text-white">
      <CountdownOverlay countdown={countdown()} showGo={showGo()} />
      {phase() === "gameover" && (
        <GameOverOverlay
          lastStreak={lastStreak()}
          recent={recent()}
          onRestart={restartGame}
        />
      )}
      <Sidebar lives={lives()} streak={streak()} timeLeft={timeLeft()} />
      <main class="flex-1 flex flex-col items-center justify-center gap-6 px-6">
        {phase() === "playing" && (
          <FlagDisplay
            current={current()}
            revealed={revealed()}
            input={input()}
            onInput={(e) => setInput((e.target as HTMLInputElement).value)}
            inputRef={(el) => (inputRef = el)}
          />
        )}
      </main>
      <RecentList recent={recent()} />
    </div>
  );
}
