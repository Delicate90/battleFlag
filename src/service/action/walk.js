import config from "../../config";
import Source from "../source";

export default function(ctx, item, name) {
    const {pic, walk} = Source.get(name, item.state);
    if (item.frame !== undefined) {
        item.frame++;
        if (item.frame === walk.frequency * walk.pages) {
            item.frame = 0;
        }
    } else {
        item.frame = walk.init * walk.frequency
    }
    let {pos} = item;
    ctx.drawImage(pic, config.DEFAULT_ITEM_WIDTH*(~~(item.frame/walk.frequency)), config.DEFAULT_ITEM_HEIGHT*pos.direction,
        config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT,
        config.DEFAULT_SECTION*pos.sX + config.DEFAULT_SECTION/2 - config.DEFAULT_ITEM_WIDTH/2, config.DEFAULT_SECTION*pos.sY,
        config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT);
}