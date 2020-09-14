import {pic} from "../../source";

export default {
    'zyun': {
        walk: {
            pic: pic.zyun,
            frequency: 4,//运动频率
            init: 0,//初始画
        },
        move: {
            pic: pic.zyun,
            frequency: 4,//运动频率
            init: 0,//初始画
        },
        stand: {
            pic: pic.zyun,
            frequency: 0,//运动频率
            init: 0,//初始画
        },
        attack: {
            pic: pic.zyun_atk,
            frequency: 3,//运动频率
            init: 0,//初始画
        },
    },
    'zyun_m': {
        walk: {
            pic: pic.zyun_m,
            frequency: 4,//运动频率
            init: 1,//初始画
        }
    }
}