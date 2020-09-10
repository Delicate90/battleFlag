import config from "../../config";
import Source from "../source";

export default function(ctx, item, name) {
    const now = Date.now();
    const pic = Source.get(name);
    const {walk, pos} = item;
    if (walk.last) {
        if (now - walk.last > walk.step*50) {
            walk.current = walk.current === (walk.total - 1) ? 0 : walk.current + 1;
            walk.last = now;
        }
    } else {
        walk.last = now
    }
    ctx.drawImage(pic, config.DEFAULT_ITEM_WIDTH*walk.current, config.DEFAULT_ITEM_HEIGHT*pos.direction,
        config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT,
        config.DEFAULT_SECTION*pos.x + config.DEFAULT_SECTION/2 - config.DEFAULT_ITEM_WIDTH/2, config.DEFAULT_SECTION*pos.y,
        config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT);
}