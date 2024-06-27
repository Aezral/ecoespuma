import gameOverScreen from "./screens/gameOver";
import noStartedScreen from "./screens/noStarted";
import pausedScreen from "./screens/paused";
import playingScreen from "./screens/playing";
import winScreen from "./screens/win";
import type { GameState } from "./state";

const perfectFrameTime = 1000 / 60;

const renderFrame = (gs: GameState) => (timestamp: number) => {
    if (gs.lastGameLoopTimestamp === undefined)
        gs.lastGameLoopTimestamp = timestamp;

    gs.ctx.font = `${gs.config.fontSize / 1}px Arial`;

    let deltaTime = (timestamp - gs.lastGameLoopTimestamp) / perfectFrameTime;

    if (deltaTime > 2) deltaTime = 2;

    gs.lastGameLoopTimestamp = timestamp;

    gs.ctx.clearRect(
        0,
        0,
        gs.DOMElements.canvas.width,
        gs.DOMElements.canvas.height
    );
    switch (gs.player.state) {
        // No ha iniciado
        case 0: {
            noStartedScreen(gs);
            break;
        }

        // Pausó
        case 2: {
            pausedScreen(gs);
            break;
        }

        // Ganó
        case 3: {
            winScreen(gs);
            break;
        }

        // Perdió
        case 4: {
            gameOverScreen(gs);

            break;
        }

        // Estaba jugando
        case 1: {
            playingScreen(gs, deltaTime);
            break;
        }
    }
};

export default renderFrame;
