import createElement from "./createElement";
import { PlayerState, type GameState } from "./state";
import { getElementInterval } from "./util";

export default function startElementCreationInterval(gs: GameState) {
    function interval() {
        console.log(getElementInterval(gs));
        if (!gs.isFocused || gs.player.state !== PlayerState.Playing)
            return setTimeout(interval, getElementInterval(gs));

        const newElement = createElement(gs);
        gs.trashElements.push(newElement);

        return setTimeout(interval, getElementInterval(gs));
    }

    interval();
}
