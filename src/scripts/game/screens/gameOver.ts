import type { GameState } from "../state";

export default function gameOverScreen(gs:GameState){

    const {
        ctx,
        config,
        isMobile,
        DOMElements: { canvas }
    } = gs;

            ctx.fillStyle = "red";

            const text0 = `¡Has perdido!`;

            ctx.fillStyle = "white";
            const text = `El mundo explotó`;
            const text2 =
                isMobile ?
                    `Presiona para jugar de nuevo`
                :   `Presiona espacio para jugar de nuevo`;

            ctx.font = `${config.fontSize * 1.74}px Arial`;
            ctx.fillText(
                text0,
                canvas.width / 2 - ctx.measureText(text0).width / 2,
                canvas.height / 2 - 275
            );

            ctx.font = `${config.fontSize}px Arial`;
            ctx.fillText(
                text,

                canvas.width / 2 - ctx.measureText(text).width / 2,

                canvas.height / 2 - 200
            );

            ctx.font = `${config.fontSize * 0.8}px Arial `;
            ctx.fillText(
                text2,
                canvas.width / 2 - ctx.measureText(text2).width / 2,
                canvas.height / 2 - 150
            );

            ctx.drawImage(
                gs.images.espumacostado,
                canvas.width / 2 - (config.fontSize * 20) / 2,
                canvas.height / 2 + 50,
                config.fontSize * 20,
                config.fontSize * 10
            );

}
