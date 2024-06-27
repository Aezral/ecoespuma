import type { GameState } from "../state";

export default function adjustCanvasSize(state: GameState) {
    const canvas = state.DOMElements.canvas;
    const dpr = window.devicePixelRatio;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
}
