import type { GameState } from "../state";

export default function pausedScreen(gs:GameState) {

    const ctx = gs.ctx;
    const canvas = gs.DOMElements.canvas;

    ctx.fillStyle = "white";

    const text0 = `Pausado`;
    const text =
        gs.isMobile ? `Presiona para continuar` : `Presiona espacio para continuar`;

    ctx.font = `${gs.config.fontSize * 1.75}px Arial `;
    ctx.fillText(
        text0,
        canvas.width / 2 - ctx.measureText(text0).width / 2,
        canvas.height / 2 - 275
    );

    ctx.font = `${gs.config.fontSize}px Arial `;

    ctx.fillText(
        text,
        canvas.width / 2 - ctx.measureText(text).width / 2,
        canvas.height / 2 - 200
    );


}
