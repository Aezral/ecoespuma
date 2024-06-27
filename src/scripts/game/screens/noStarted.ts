import gameLoop from "../renderFrame";
import type { GameState } from "../state";

export default function noStartedScreen(gs: GameState) {

    const ctx = gs.ctx;
    const canvas = gs.DOMElements.canvas;

    ctx.fillStyle = "lime";
    ctx.font = `${gs.config.fontSize * 1.75}px Arial `;
    const titleText = "EcoEspuma";
    ctx.fillText(
        titleText,
        canvas.width / 2 - ctx.measureText(titleText).width / 2,
        canvas.height / 2 - 150
    );
    ctx.fillStyle = "white";
    ctx.font = `${gs.config.fontSize}px Arial `;

    const text = "Presiona" + (gs.isMobile ? "" : " espacio") + " para iniciar";

    ctx.fillText(
        text,
        canvas.width / 2 - ctx.measureText(text).width / 2,
        canvas.height / 2 - 100
    );

    const espumaImageWidth = 450;

    ctx.drawImage(
        gs.images.espuma2,
        canvas.width / 2 - (espumaImageWidth * 0.6) / 2,
        canvas.height / 2,
        espumaImageWidth * 0.6,
        espumaImageWidth * 1 * 0.6
    );

    requestAnimationFrame(gameLoop(gs))
}
