import Source from "../source";
import config from "../../config";

export default function(ctx, item, name) {
    const {pic, stand} = Source.get(name, item.state);
    let {pos} = item;
    ctx.drawImage(pic.source, pic.width*(~~(item.frame/stand.frequency)), pic.height*pos.direction,
        pic.width, pic.height,
        config.DEFAULT_SECTION*pos.sX + config.DEFAULT_SECTION/2 - pic.width/2, config.DEFAULT_SECTION*pos.sY,
        pic.width, pic.height);
}