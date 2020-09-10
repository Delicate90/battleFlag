import config from "../../config";

export const load = (name)=> {
    return new Promise(resolve => {
        const img = new Image();
        img.src = config.DEFAULT_SOURCE_DIR+name;
        img.onload = ()=> resolve(img)
    })
};

export const loadAll = async (names = {})=> {
     const keys = Object.keys(names);
     const res = await Promise.all(keys.map(k=>load(names[k])));
     return res.reduce((prev,next,index)=>(prev[keys[index]]=next)&&prev, {});
};