import {loadAll} from './load';
import {pic} from '../../source';

export default class Source {

    static async init() {
        Source.pic = await loadAll(pic)
    }

    static get(name) {
        return Source.pic[name]
    }
}