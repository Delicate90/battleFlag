import walk from './walk'
import move from './move'
import stand from './stand'
import attack from './attack'

const _action = {walk,move,stand,attack};

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