import Source from "../source";
import config from "../../config";
import {items, OBJECT_DIRECTION} from "../object";

const getDirection = ({sX,sY,eX,eY})=> {
    if (sX - eX > 0) {
        return {
            sX: sX - config.DEFAULT_MOVE_SECTION_TIMES < eX ? eX : sX - config.DEFAULT_MOVE_SECTION_TIMES,
            sY,
            eX, eY,
            direction: OBJECT_DIRECTION.LEFT
        }
    }
    if (sX - eX < 0) {
        return {
            sX: sX + config.DEFAULT_MOVE_SECTION_TIMES > eX ? eX : sX + config.DEFAULT_MOVE_SECTION_TIMES,
            sY,
            eX, eY,
            direction: OBJECT_DIRECTION.RIGHT
        }
    }
    if (sY - eY > 0) {
        return {
            sX,
            sY: sY - config.DEFAULT_MOVE_SECTION_TIMES < eY ? eY : sY - config.DEFAULT_MOVE_SECTION_TIMES,
            eX, eY,
            direction: OBJECT_DIRECTION.UP
        }
    }
    if (sY - eY < 0) {
        return {
            sX,
            sY: sY + config.DEFAULT_MOVE_SECTION_TIMES > eY ? eY : sY + config.DEFAULT_MOVE_SECTION_TIMES,
            eX, eY,
            direction: OBJECT_DIRECTION.DOWN
        }
    }
};


export default function(ctx, item, name) {
    const {pic, move} = Source.get(name, item.state);
    if (item.pos.sX !== undefined && (item.pos.sX !== item.pos.eX || item.pos.sY !== item.pos.eY)) {
        item.pos = {plan:item.pos.plan, ...getDirection(item.pos)};
    } else {
        const _plan = item.pos.plan.shift();
        if (_plan) {
            item.pos = {plan:item.pos.plan, ...getDirection(_plan)};
        } else {
            items.walk(name, item.pos.sX, item.pos.sY, item.pos.direction);
        }
    }
    if (item.frame !== undefined) {
        item.frame++;
        if (item.frame === move.frequency * move.pages) {
            item.frame = 0;
        }
    } else {
        item.frame = move.init * move.frequency
    }
    const {pos} = item;
    ctx.drawImage(pic, config.DEFAULT_ITEM_WIDTH*(~~(item.frame/move.frequency)), config.DEFAULT_ITEM_HEIGHT*pos.direction,
        config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT,
        config.DEFAULT_SECTION*pos.sX + config.DEFAULT_SECTION/2 - config.DEFAULT_ITEM_WIDTH/2, config.DEFAULT_SECTION*pos.sY,
        config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT);
}