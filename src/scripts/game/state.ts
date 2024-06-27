import type { GameConfig } from "./config";
import type { TrashElement } from "./createElement";
import { createImages, type ImageIndex, type Images } from "./images";
import isMobile from "./util/isMobile";

export enum Direction {
    Left = 0,
    Right = 1,
    None = -1,
}

export enum Mode {
    Organic = 0,
    Inorganic = 1,
}

export enum PlayerState {
    Start = 0,
    Playing = 1,
    Paused = 2,
    Won = 3,
    Lost = 4,
}

export type GameState = {
    direction: Direction;
    mode: Mode;

    player: {
        x: number;
        y: number;
        state: PlayerState;
    };

    ctx: CanvasRenderingContext2D;

    points: number;
    misses: number;

    images: Images;
    config: GameConfig;

    trashElements: TrashElement[];

    DOMElements: {
        canvas: HTMLCanvasElement;
        mobileControls: HTMLDivElement;
        leftButton: HTMLButtonElement;
        rightButton: HTMLButtonElement;
        pauseButton: HTMLButtonElement;
        trashButton: HTMLButtonElement;
    };

    isFocused: boolean;

    isMobile: boolean;
    lastStopped: number;
    lastGameLoopTimestamp: number | undefined;
};

export function createGameState({
    config,
    DOMElements,
    imageURLs,
}: {
    config: GameConfig;
    DOMElements: GameState["DOMElements"];
    imageURLs: {
        [key in ImageIndex]: string;
    };
}) {
    const gameState: GameState = {
        direction: Direction.None,
        mode: Mode.Organic,

        player: {
            x: 0,
            y: 0,

            state: PlayerState.Start,
        },

        ctx: DOMElements.canvas.getContext("2d")!,

        images: createImages(imageURLs),

        config,
        points: config.initialPoints,
        misses: config.initialMisses,
        trashElements: [],
        DOMElements,

        isFocused: true,

        isMobile: isMobile(),
        lastStopped: 0,
        lastGameLoopTimestamp: undefined,
    };
    return gameState;
}
