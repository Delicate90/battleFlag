import config from "../../config";

export const load = (name)=> {
    return new Promise(resolve => {
        const img = new Image();
        img.src = config.DEFAULT_SOURCE_DIR+name;
        img.onload = ()=> resolve(img)
    })
};

export const loadAll = async (names = {})=> {
     const entries = Object.entries(names);
     const res = await Promise.all(entries.map(([k,v])=>load(v.src)));
     return res.reduce((prev,next,index)=>{
         // (prev[names[keys[index]]]={source:next,width:next.width,height:next.height})&&prev
         const [k,v] = entries[index];
         prev[v.src] = {source: next, width: next.width/v.pages, height: next.height/v.direction, pages: v.pages, directions: v.direction};
         return prev
     }, {});
};