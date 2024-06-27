import type { GameConfig } from "../config";

export function generateRandomX(config: GameConfig, canvas: HTMLCanvasElement) {
    return Math.random() * (canvas.width - config.trashElementWidth);
}
