import walk from './walk'

const _action = {walk};

export const action = (state)=>{
    return _action[state]
}

const objects = {};

const set = (key, x, y, state, direction = 0)=> {
    objects[key] = {
        name: key,
        pos: {x,y,direction},
        state
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
}

export const ACTION_STATE = {
    WALK: 'walk'
};

export const ACTION_DIRECTION = {
    UP: 0,
    LEFT: 1,
    RIGHT: 2,
    DOWN: 3
};

export const items = {
    set, forEach
}
