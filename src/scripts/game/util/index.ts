import type { GameState } from "../state";

export function getElementSpeed(gs: GameState) {
    const base = gs.config.speed;

    const points = gs.points;

    if (points < 5) return base;

    if (points < 15) return base * 1.25;

    if (points < 25) return base * 1.5;

    if (points < 40) return base * 1.75;

    if (points < 50) return base * 2;

    return base * 2.5;
}

export function getElementInterval(gs: GameState) {
    const base = gs.config.elementInterval;

    const points = gs.points;

    if (points < 5) return base;

    if (points < 15) return base * 0.425;

    if (points < 25) return base * 0.375;

    if (points < 40) return base * 0.325;

    if (points < 50) return base * 0.25;

    return base * 0.15;
}
