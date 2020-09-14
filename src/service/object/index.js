import {ACTION_STATE} from "../action";
import {map} from "../map";

const objects = {};

const walk = (key, sX, sY, direction = 0)=> {
    const {state = ACTION_STATE.STAND, pos = {}} = objects[key] || {};
    switch (state) {
        case ACTION_STATE.STAND:
            objects[key] = {
                name: key,
                pos: {sX,sY,direction},
                state: ACTION_STATE.WALK
            };
            map.set(key,sX,sY);
            break;
        case ACTION_STATE.MOVE:
            objects[key] = {
                name: key,
                pos: {sX,sY,direction},
                state: ACTION_STATE.WALK
            };
            map.set(key,sX,sY);
            break;
        default:
            break;
    }
};

const move = (key, eX, eY)=> {
    const {state, pos = {}} = objects[key] || {};
    switch (state) {
        case ACTION_STATE.WALK:
            objects[key] = {
                name: key,
                pos: {plan: map.planing(pos.sX,pos.sY,eX,eY)},
                state: ACTION_STATE.MOVE
            };
            map.remove(pos.sX,pos.sY);
            break;
        default:
            break;
    }
};

const stand = (key, sX, sY, direction)=> {
    const {state, pos} = objects[key];
    switch (state) {
        case ACTION_STATE.MOVE:
            objects[key] = {
                name: key,
                pos: {sX: sX||pos.sX,sY: sY||pos.sY,direction: direction||pos.direction},
                state: ACTION_STATE.STAND
            };
            map.set(key,sX||pos.sX,sY||pos.sY);
            break;
        case ACTION_STATE.ATTACK:
            objects[key] = {
                name: key,
                pos: {sX: sX||pos.sX,sY: sY||pos.sY,direction: direction||pos.direction},
                state: ACTION_STATE.STAND
            };
            map.set(key,sX||pos.sX,sY||pos.sY);
            break;
        case ACTION_STATE.WALK:
            break;
        default:
            break;
    }
};

const attack = (key, direction, sX, sY)=> {
    const {state, pos} = objects[key];
    switch (state) {
        case ACTION_STATE.WALK:
            objects[key] = {
                name: key,
                pos: {sX: sX||pos.sX,sY: sY||pos.sY,direction: direction||pos.direction},
                state: ACTION_STATE.ATTACK
            };
            map.set(key,sX||pos.sX,sY||pos.sY);
            break;
        case ACTION_STATE.STAND:
            objects[key] = {
                name: key,
                pos: {sX: sX||pos.sX,sY: sY||pos.sY,direction: direction||pos.direction},
                state: ACTION_STATE.ATTACK
            };
            map.set(key,sX||pos.sX,sY||pos.sY);
            break;
        case ACTION_STATE.ATTACK:
            break;
        default:
            break;
    }
};

const dead = (key)=> {
    const {state} = objects[key];
    switch (state) {
        case ACTION_STATE.MOVE:
            break;
        case ACTION_STATE.STAND:
            break;
        case ACTION_STATE.ATTACK:
            break;
        case ACTION_STATE.DEAD:
            break;
        case ACTION_STATE.WALK:
            break;
        default:
            break;
    }
};

const get = ()=> {

};

const update = ()=> {

};

const forEach = (func = (value, key, index)=>{})=> {
    const itemsKeys = Object.keys(objects);
    for(let index=0,len=itemsKeys.length;index<len;index++){
        func(objects[itemsKeys[index]], itemsKeys[index], index)
    }
};

export const OBJECT_DIRECTION = {
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    UP: 3
};

export const items = {
    walk, move, stand, attack, forEach
};
