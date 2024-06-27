import { INORGANIC, ORGANIC, type TrashElementName } from "./createElement";

const baseImages = [
    "espuma",
    "espuma2",
    "espumacostado",
    "org",
    "inorg",
    "acostado",
] as const;

export type ImageIndex = TrashElementName | (typeof baseImages)[number];

export function createImages(urls: {
    [key in ImageIndex]: string;
}): {
    [key in ImageIndex]: HTMLImageElement;
} {
    const elementImages = {} as {
        [key in ImageIndex]: HTMLImageElement;
    };

    for (const name in urls) {
        const img = new Image();
        img.src = urls[name as ImageIndex];

        elementImages[name as ImageIndex] = img;
    }

    return elementImages;
}

export type Images = ReturnType<typeof createImages>;
