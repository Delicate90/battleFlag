import React,{useEffect} from "react";
import config from '../config';
import Source from "../service/source";
import {action, ACTION_STATE} from "../service/action";
import {OBJECT_DIRECTION, items} from '../service/object';

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
        items.walk('zyun', 1, 1, OBJECT_DIRECTION.LEFT);
        items.walk('zyun_m', 2,2, OBJECT_DIRECTION.LEFT);
        if (!runner) {
            animation(run, config.DEFAULT_ANIMATION_STEP)
        }
    };

    let runner = null;

    const run = ()=> {
        clean();
        back();
        items.forEach((value,key,index)=>action(value.state)(ctx, value, key))
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
        items.move('zyun', 3, 2);
    }

    const handleAttack = ()=> {
        items.attack('zyun', OBJECT_DIRECTION.LEFT);
    }

    return (
        <div style={{width: '100%', height: '100%'}}>
            <button onClick={handleClick}>start</button>
            <button onClick={handleAttack}>attack</button>
            <canvas style={{margin: '100px 200px',border: '1px solid #000'}} id={'drawer'} width={config.BOX_WIDTH} height={config.BOX_HEIGHT}/>
        </div>
    )
};

export default Drawer