import walk from './walk'
import move from './move'

const _action = {walk,move};

export const action = (state)=>{
    return _action[state]
};

export const ACTION_STATE = {
    WALK: 'walk',
    MOVE: 'move',
    ATTACK: 'attack',
    DEAD: 'dead',
    STAND: 'stand'
};