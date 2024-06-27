import { continueGame, pauseGame } from "./gameFlow";
import { Direction, Mode, PlayerState, type GameState } from "./state";
import adjustCanvasSize from "./util/adjustCanvasSize";

export default function startListeners(gs: GameState) {
    // Window listeners
    window.addEventListener("resize", () => {
        adjustCanvasSize(gs);
    });

    window.addEventListener("blur", () => {
        gs.isFocused = false;
    });

    window.addEventListener("focus", () => {
        gs.isFocused = true;
    });

    window.addEventListener("keydown", event => {
        if (event.key === "d" || event.key === "D") {
            gs.direction = Direction.Right;
        } else if (event.key === "a" || event.key === "A") {
            gs.direction = Direction.Left;
        } else if (event.key === " ") {
            event.preventDefault();
            if (gs.player.state !== PlayerState.Playing) {
                continueGame(gs);

                return;
            } else {
                gs.mode =
                    gs.mode === Mode.Organic ? Mode.Inorganic : Mode.Organic;
            }
        } else if (event.key === "Escape") {
            pauseGame(gs);
        }
    });

    window.addEventListener("keyup", e => {
        if (
            (e.key === "a" && gs.direction === Direction.Left) ||
            (e.key === "d" && gs.direction === Direction.Right)
        ) {
            gs.direction = Direction.None;
        }
    });

    // Mobile listeners
    if (!gs.isMobile) {
        return;
    }

    const { canvas, leftButton, rightButton, trashButton, pauseButton } =
        gs.DOMElements;

    canvas.addEventListener("touchstart", () => {
        if (gs.player.state !== PlayerState.Playing) {
            continueGame(gs);
            return;
        }
    });

    leftButton.addEventListener("touchstart", () => {
        gs.direction = Direction.Left;
    });

    leftButton.addEventListener("touchend", () => {
        gs.direction = Direction.None;
    });

    rightButton.addEventListener("touchstart", () => {
        gs.direction = Direction.Right;
    });

    rightButton.addEventListener("touchend", () => {
        gs.direction = Direction.None;
    });

    trashButton.addEventListener("touchstart", () => {
        gs.mode = gs.mode === Mode.Organic ? Mode.Inorganic : Mode.Organic;
    });

    pauseButton.addEventListener("touchstart", () => {
        pauseGame(gs);
    });
}
