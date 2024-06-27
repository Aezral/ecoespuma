export const BASE_CONFIG = {
    trashElementWidth: 100,
    trashElementHeight: 100,
    espumaWidth: 120,
    espumaHeight: 180,
    trashcanWidth: 120,
    trashcanHeight: 150,
    elementInterval: 3000,
    speed: 4,
    espumaSpeed: 8,
    maxAmountOfFrames: 400,
    initialPoints: 0,
    initialMisses: 0,
    volume: 0.25,
    drawHitboxes: false,
    missesForLose: 3,
    baseFontSize: 30,
    initialState: 0,
} as const;

export const getConfig = () => {
    const dpr = window.devicePixelRatio;
    const scale = dpr * 0.75;

    return {
        ...BASE_CONFIG,
        espumaWidth: BASE_CONFIG.espumaWidth * scale,
        espumaHeight: BASE_CONFIG.espumaHeight * scale,
        trashElementWidth: BASE_CONFIG.trashElementWidth * scale,
        trashElementHeight: BASE_CONFIG.trashElementHeight * scale,
        trashcanWidth: BASE_CONFIG.trashcanWidth * scale,
        trashcanHeight: BASE_CONFIG.trashcanHeight * scale,
        espumaSpeed: BASE_CONFIG.espumaSpeed * scale,
        speed: BASE_CONFIG.speed * scale,
        fontSize: BASE_CONFIG.baseFontSize * scale,
        scale,
    };
};

export type GameConfig = ReturnType<typeof getConfig>;
