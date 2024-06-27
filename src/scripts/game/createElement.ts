import type { GameConfig } from "./config";
import type { GameState } from "./state";
import { generateRandomX } from "./util/generateRandomX";
export const INORGANIC = [
    "botella",
    "bolsa",
    "lata",
    "botella2",
    "bandeja",
] as const;
export const ORGANIC = ["manzana", "platano"] as const;

export enum TrashElementType {
    INORGANIC = 0,
    ORGANIC = 1,
}

export type TrashElementName =
    | (typeof INORGANIC)[number]
    | (typeof ORGANIC)[number];

    export type TrashElement = {
        name: TrashElementName;
        x: number;
        y: number;
        type: TrashElementType;
    }

export default function createElement(
    gs: GameState
):TrashElement{
    //const type =
    //   INORGANIC_TRASH[Math.floor(Math.random() * INORGANIC_TRASH.length)];

    const type = Math.random() > 0.5 ? 0 : 1;

    const { config, DOMElements:{canvas} } = gs;

    let name;

    if (type === 0) {
        name = INORGANIC[Math.floor(Math.random() * INORGANIC.length)];
    } else {
        name = ORGANIC[Math.floor(Math.random() * ORGANIC.length)];
    }

    let randomX = generateRandomX(config, canvas);

    while (
        randomX < config.espumaWidth ||
        randomX > canvas.width - config.trashcanWidth
    ) {
        randomX = generateRandomX(config, canvas);
    }

    return {
        name,
        x: randomX,
        y: 10,
        type,
    };
}
