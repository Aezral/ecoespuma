import { playCorrectAudio, playIncorrectAudio } from "../audio";
import { TrashElementType } from "../createElement";
import { loseGame, winGame } from "../gameFlow";
import renderFrame from "../renderFrame";
import { Direction, Mode, type GameState } from "../state";
import { getElementSpeed } from "../util";

export default function playingScreen(gs: GameState, deltaTime: number) {
    const {
        ctx,
        config,
        trashElements,
        images,
        mode,
        DOMElements: { canvas },
    } = gs;

    // Dibujar contadores
    ctx.fillStyle = "lightgray";
    ctx.font = `${config.fontSize * 2.5}px Arial`;
    const pointsText = `${gs.points.toString().padStart(2, "0")} / ${50}`;
    ctx.fillText(
        pointsText,
        canvas.width / 2 - ctx.measureText(pointsText).width / 2,
        canvas.height * 0.35
    );

    ctx.fillStyle = "red";
    let missesText = "";
    for (let i = 0; i < config.missesForLose - gs.misses; i++) {
        missesText += "❤️ ";
    }

    missesText = missesText.trim();

    ctx.font = `${config.fontSize * 1.5}px Arial`;
    ctx.fillText(
        missesText,
        config.fontSize * 2,
        config.fontSize * 3
        //                canvas.width / 2 - ctx.measureText(missesText).width / 2,
        //               canvas.height * 0.35 + config.fontSize * 3
    );

    for (let i = 0; i < trashElements.length; i++) {
        let element = trashElements[i];

        // Dibujar imagen
        ctx.drawImage(
            gs.images[element.name],
            element.x,
            element.y,
            config.trashElementWidth,
            config.trashElementHeight
        );

        if (config.drawHitboxes) {
            ctx.strokeRect(
                element.x,
                element.y,
                config.trashElementWidth,
                config.trashElementHeight
            );
        }

        // Verificar si el elemento se salió de la pantalla y eliminarlo
        if (element.y + config.trashElementHeight > canvas.height) {
            trashElements.splice(i, 1);

            i--;

            gs.misses++;

            if (gs.misses === config.missesForLose) {
                loseGame(gs);
            }

            playIncorrectAudio(gs);
        } else {
            element.y += getElementSpeed(gs) * deltaTime;

            // Verificar si el elemento colisionó con espuma

            const inX =
                element.y + config.trashElementHeight >
                    canvas.height - config.trashcanHeight &&
                element.y < canvas.height;

            const inY =
                element.x >
                    gs.player.x +
                        config.espumaWidth -
                        config.trashcanWidth / 1.25 &&
                element.x <
                    gs.player.x +
                        config.espumaWidth +
                        config.trashcanWidth / 1.25;

            if (inX && inY) {
                trashElements.splice(i, 1);

                i--;
                if (
                    (mode === Mode.Organic &&
                        element.type === TrashElementType.ORGANIC) ||
                    (mode === Mode.Inorganic &&
                        element.type === TrashElementType.INORGANIC)
                ) {
                    gs.points++;

                    if (gs.points === 50) {
                        winGame(gs);
                    } else {
                        playCorrectAudio(gs);
                    }
                } else {
                    gs.misses++;

                    if (gs.misses == config.missesForLose) {
                        loseGame(gs);
                    }

                    playIncorrectAudio(gs);
                }
            }
        }
    }

    //Dibujar basurero
    ctx.drawImage(
        mode === Mode.Inorganic ? images["inorg"] : images["org"],
        gs.player.x + config.espumaWidth / 1.25,
        canvas.height - config.trashcanHeight,
        config.trashcanWidth,
        config.trashcanHeight
    );

    if (config.drawHitboxes) {
        ctx.strokeRect(
            gs.player.x + config.espumaWidth / 1.25,
            canvas.height - config.trashcanHeight,
            config.trashcanWidth,
            config.trashcanHeight
        );
    }

    //Dibujar espuma
    ctx.drawImage(
        images["espuma"],
        gs.player.x,
        canvas.height - config.espumaHeight,
        config.espumaWidth,
        config.espumaHeight
    );

    if (config.drawHitboxes) {
        ctx.strokeRect(
            gs.player.x,
            canvas.height - config.espumaHeight,
            config.espumaWidth,
            config.espumaHeight
        );
    }

    // Añadir movimiento dependiendo de la dirección
    if (gs.direction === Direction.Right) {
        if (
            !(
                gs.player.x + config.espumaWidth + config.trashcanWidth / 1.25 >
                canvas.width
            )
        ) {
            gs.player.x += config.espumaSpeed * deltaTime;
        }
    } else if (gs.direction === Direction.Left) {
        if (!(gs.player.x <= 0)) {
            gs.player.x -= config.espumaSpeed * deltaTime;
        }
    }

    requestAnimationFrame(renderFrame(gs));
}
