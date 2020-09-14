import config from "../../config";
import Source from "../source";
import {items, OBJECT_DIRECTION} from "../object";

const getOffset = (item, last)=> {
    if (!last)
    switch (item.pos.direction) {
        case OBJECT_DIRECTION.LEFT:
            item.pos.sX = item.pos.sX - 0.05
            break;
        case OBJECT_DIRECTION.RIGHT:
            item.pos.sX = item.pos.sX + 0.05
            break;
        case OBJECT_DIRECTION.UP:
            item.pos.sY = item.pos.sY - 0.05
            break;
        case OBJECT_DIRECTION.DOWN:
            item.pos.sY = item.pos.sY + 0.05
            break;
    } else {
        item.pos.sX = item.baseX;
        item.pos.sY = item.baseY;
    }
};

export default function(ctx, item, name) {
    const {pic, attack} = Source.get(name, item.state);
    if (item.frame === undefined) {
        item.baseX = item.pos.sX;
        item.baseY = item.pos.sY;
        item.frame = attack.init * attack.frequency
    }
    getOffset(item, (~~(item.frame/attack.frequency) === (pic.pages - 1)));
    let {pos} = item;
    ctx.drawImage(pic.source, pic.width*(~~(item.frame/attack.frequency)), pic.height*pos.direction,
        pic.width, pic.height,
        config.DEFAULT_SECTION*pos.sX + config.DEFAULT_SECTION/2 - pic.width/2, config.DEFAULT_SECTION*pos.sY,
        pic.width, pic.height);
    item.frame++;
    if (item.frame === attack.frequency * pic.pages) {
        items.stand(name, pos.sX, pos.sY, pos.direction)
    }
}