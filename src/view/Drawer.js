import React,{useEffect} from "react";
import config from '../config';

const Drawer = (props) => {

    useEffect(()=>{
        init().then(()=>{
            item()
        });
    },[])

    let ctx = null;

    const arr = [
        []
    ];

    const sources = {
        pic: {}
    };

    const items = {};

    const zYun = {
        walk: {
            up: [],
            down: [],
            left: [],
            right: []
        }
    };

    const init = async ()=> {
        sources.pic['zyun'] = await pic('zyun');
        sources.pic['zyun_m'] = await pic('zyun_m');
        ctx = document.getElementById('drawer').getContext('2d');
        ctx.width = config.DEFAULT_WIDTH;
        ctx.height = config.DEFAULT_HEIGHT;
        ctx.scale(config.SCALE, config.SCALE);
    };

    const clean = ()=> {
        ctx.clearRect(0,0,config.DEFAULT_WIDTH, config.DEFAULT_HEIGHT);
    };

    const back = ()=> {
        ctx.setLineDash([3,3]);
        ctx.beginPath();
        ctx.fillStyle = '#f00';
        let index = 0;
        while (index*config.DEFAULT_SECTION < config.DEFAULT_WIDTH) {
            ctx.moveTo(index*config.DEFAULT_SECTION, 0);
            ctx.lineTo(index*config.DEFAULT_SECTION, config.DEFAULT_HEIGHT);
            index++;
        }
        index = 0;
        while (index*config.DEFAULT_SECTION < config.DEFAULT_HEIGHT) {
            ctx.moveTo(0, index*config.DEFAULT_SECTION);
            ctx.lineTo(config.DEFAULT_WIDTH, index*config.DEFAULT_SECTION);
            index++;
        }
        ctx.closePath();
        ctx.stroke();
        ctx.setLineDash([]);
    };

    const pic = (name)=> {
        return new Promise(resolve => {
            const img = new Image();
            img.src = "/assets/"+name+".png";
            img.onload = ()=> resolve(img)
        })
    };

    const item = ()=> {
        items['zyun'] = {
            pos: {
                x: 1,
                y: 1
            },
            walk: {
                step: 2,
                direction: 0,
                total: 4,
                current: 0
            }
        };
        items['zyun_m'] = {
            pos: {x: 3, y: 3},
            walk: {
                step: 4,
                direction: 2,
                total: 4,
                current: 0
            }
        };
        if (!runner) {
            animation(run, 50)
        }
    };

    let runner = null;

    const run = ()=> {
        clean();
        back();
        const itemsKeys = Object.keys(items);
        for(let index=0,len=itemsKeys.length;index<len;index++) {
            const key = itemsKeys[index];
            const item = items[key];
            const now = Date.now();
            const pic = sources.pic[key];
            const {walk, pos} = item;
            if (walk.last) {
                if (now - walk.last > walk.step*50) {
                    walk.current = walk.current === (walk.total - 1) ? 0 : walk.current + 1;
                    walk.last = now;
                }
            } else {
                walk.last = now
            }
            ctx.drawImage(pic, config.DEFAULT_ITEM_WIDTH*walk.current, config.DEFAULT_ITEM_HEIGHT*walk.direction,
                config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT,
                config.DEFAULT_SECTION*pos.x + config.DEFAULT_SECTION/2 - config.DEFAULT_ITEM_WIDTH/2, config.DEFAULT_SECTION*pos.y,
                config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT);
        }
    };

    const animation = (func, diff)=> {
        let lastTime = 0;
        const anim = ()=> {
            const now = Date.now();
            if (now - lastTime > diff) {
                lastTime = now;
                func();
            }
            runner = window.requestAnimationFrame(anim)
        };
        anim();
    };

    // const walk = (item, step, x, y, direction)=> {
    //     let index = 0;
    //     let total = 4;
    //     animation(()=>{
    //         if (index === total) index = 0;
    //         ctx.clearRect(config.DEFAULT_SECTION*x,config.DEFAULT_SECTION*y,config.DEFAULT_SECTION,config.DEFAULT_SECTION);
    //         // ctx.clearRect(0,0,config.DEFAULT_WIDTH,config.DEFAULT_HEIGHT);
    //         ctx.drawImage(item, config.DEFAULT_ITEM_WIDTH*index, config.DEFAULT_ITEM_HEIGHT*direction,
    //             config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT,
    //             config.DEFAULT_SECTION*x + config.DEFAULT_SECTION/2 - config.DEFAULT_ITEM_WIDTH/2, config.DEFAULT_SECTION*y,
    //             config.DEFAULT_ITEM_WIDTH, config.DEFAULT_ITEM_HEIGHT);
    //         index++;
    //     }, step)
    // };

    const move = ()=> {

    };

    const handleClick = ()=> {
        ctx.translate(-34, -34);
        back();
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
            <button onClick={handleClick}>start</button>
            <canvas style={{margin: '100px 200px',border: '1px solid #000'}} id={'drawer'} width={config.BOX_WIDTH} height={config.BOX_HEIGHT}/>
        </div>
    )
};

export default Drawer