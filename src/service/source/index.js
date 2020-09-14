import {loadAll} from './load';
import {pic} from '../../source';
import character from "./character";

export default class Source {

    static async init() {
        Source.pic = await loadAll(pic);
        Source.character = character;
    }

    static get(name, state) {
        const res = character[name][state];
        return {
            pic: Source.pic[res.pic.src],
            [state]: res
        }
    }
}