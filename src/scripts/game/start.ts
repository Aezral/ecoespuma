import { getConfig } from "./config";
import startElementCreationInterval from "./elementCreationInterval";
import { showMobileControls } from "./gameFlow";
import startListeners from "./listeners";
import renderFrame from "./renderFrame";
import { createGameState } from "./state";
import adjustCanvasSize from "./util/adjustCanvasSize";

export async function start() {
    const state = createGameState({
        config: getConfig(),
        DOMElements: {
            canvas: document.getElementById("game") as HTMLCanvasElement,
            mobileControls: document.getElementById(
                "mobile-controls"
            ) as HTMLDivElement,
            leftButton: document.getElementById("left") as HTMLButtonElement,
            rightButton: document.getElementById("right") as HTMLButtonElement,
            pauseButton: document.getElementById("pause") as HTMLButtonElement,
            trashButton: document.getElementById("switch") as HTMLButtonElement,
        },
        imageURLs: {
            espuma: "/assets/espuma.webp",
            espuma2: "/assets/espuma2.webp",
            espumacostado: "/assets/acostado2.webp",
            org: "/assets/org.webp",
            inorg: "/assets/inorg.webp",
            acostado: "/assets/acostado.webp",

            bandeja: "/assets/bandeja.webp",
            bolsa: "/assets/bolsa.webp",
            botella: "/assets/botella.webp",
            botella2: "/assets/botella2.webp",
            lata: "/assets/lata.webp",
            manzana: "/assets/manzana.webp",
            platano: "/assets/platano.webp",
        },
    });

    adjustCanvasSize(state);
    startListeners(state);
    startElementCreationInterval(state);

    requestAnimationFrame(renderFrame(state));
}
