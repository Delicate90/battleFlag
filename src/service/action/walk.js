import config from "../../config";
import Source from "../source";

export default function(ctx, item, name) {
    const {pic, walk} = Source.get(name, item.state);
    if (item.frame !== undefined) {
        item.frame++;
        if (item.frame === walk.frequency * pic.pages) {
            item.frame = 0;
        }
    } else {
        item.frame = walk.init * walk.frequency
    }
    let {pos} = item;
    ctx.drawImage(pic.source, pic.width*(~~(item.frame/walk.frequency)), pic.height*pos.direction,
        pic.width, pic.height,
        config.DEFAULT_SECTION*pos.sX + config.DEFAULT_SECTION/2 - pic.width/2, config.DEFAULT_SECTION*pos.sY,
        pic.width, pic.height);
}