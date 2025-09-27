const audioMap: Record<string, HTMLAudioElement> = {};

export function loadSound(name: string, url: string) {
  const audio = new Audio(url);
  audioMap[name] = audio;
}

export function playSound(name: string) {
  const audio = audioMap[name];
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
}
