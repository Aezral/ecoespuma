import type { GameState } from "./state";

const correctAudio = new Audio("/assets/bell.mp3");
const incorrectAudio = new Audio("/assets/wrong.mp3");
const victoryAudio = new Audio("/assets/victory.mp3");

export async function playCorrectAudio(gs: GameState) {
    correctAudio.volume = gs.config.volume;
    const audioClone = correctAudio.cloneNode(true) as HTMLAudioElement;
    await audioClone.play();
}

export async function playIncorrectAudio(gs: GameState) {
    incorrectAudio.volume = gs.config.volume * 1.5;
    const audioClone = incorrectAudio.cloneNode(true) as HTMLAudioElement;
    await audioClone.play();
}

export async function playVictoryAudio(gs: GameState) {
    victoryAudio.volume = gs.config.volume;
    const audioClone = victoryAudio.cloneNode(true) as HTMLAudioElement;
    await audioClone.play();

}
