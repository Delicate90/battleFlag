import React,{useEffect} from "react";
import config from '../config';
import Source from "../component/source";
import action from "../component/action";

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

    const items = {};

    const init = async ()=> {
        await Source.init();
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

    const item = ()=> {
        items['zyun'] = {
            pos: {x: 1, y: 1, direction: 0},
            state: 'walk',
            walk: {
                step: 2,
                total: 4,
                current: 0
            }
        };
        items['zyun_m'] = {
            pos: {x: 3, y: 3, direction: 2},
            state: 'walk',
            walk: {
                step: 4,
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
            action[item.state](ctx, item, key);
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