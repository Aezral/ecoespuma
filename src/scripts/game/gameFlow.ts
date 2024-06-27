import { playVictoryAudio } from "./audio";
import gameLoop from "./renderFrame";
import { PlayerState, type GameState } from "./state";

export function hideMobileControls(gs: GameState) {
    gs.DOMElements.mobileControls.classList.add("hidden");
}

export function showMobileControls(gs: GameState) {
    gs.DOMElements.mobileControls.classList.remove("hidden");
}

export function pauseGame(gs: GameState) {
    hideMobileControls(gs);

    gs.player.state = PlayerState.Paused;

    gs.lastStopped = Date.now();
}

export function winGame(gs: GameState) {
    hideMobileControls(gs);

    gs.lastStopped = Date.now();

    gs.player.state = PlayerState.Won;

    playVictoryAudio(gs);
}

export function loseGame(gs: GameState) {
    hideMobileControls(gs);

    gs.lastStopped = Date.now();

    gs.player.state = PlayerState.Lost;
}

export function continueGame(gs: GameState) {
    if (
        gs.player.state != PlayerState.Paused &&
        gs.lastStopped + 2000 > Date.now()
    )
        return;

    switch (gs.player.state) {
        // Si aún no iniciaba, ganó o perdió
        case PlayerState.Start:
        case PlayerState.Won:
        case PlayerState.Lost: {
            gs.player.state = PlayerState.Playing;

            gs.points = gs.config.initialPoints;

            gs.player.x =
                gs.DOMElements.canvas.width / 2 - gs.config.espumaWidth / 2;

            gs.trashElements.splice(0, gs.trashElements.length);

            gs.misses = gs.config.initialMisses;

            if (gs.isMobile) {
                showMobileControls(gs);
            }
            break;
        }

        // Si estaba pausado
        case PlayerState.Paused: {
            gs.player.state = PlayerState.Playing;

            if (gs.isMobile) {
                showMobileControls(gs);
            }

            break;
        }
    }

    requestAnimationFrame(gameLoop(gs));
}
