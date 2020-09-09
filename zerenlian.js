const valid = (lvl, func) => {
    return {
        accept: (curLvl) => curLvl >= lvl,
        func
    }
};

const text = valid(1, str=>{
    console.log(str,'is text.');
    return false
})

const date = valid(2, str=>{
    console.log(str,'is date.');
    return true
})

const number = valid(3, str=>{
    console.log(str,'is number.');
    return false
})

const filters = {text,date,number};

const work = (lvl, str, force = false)=> {
    const filterArr = ['text', 'date', 'number'];
    while (filterArr.length > 0) {
        const filter = filters[filterArr.shift()];
        if (filter.accept(lvl)) {
            const {} = filter.func(str)
        }
    }
};

work(3, 'hello')