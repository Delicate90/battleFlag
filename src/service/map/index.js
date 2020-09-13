const _map = [
    [0, 0, 'wall', 0, 0],
    [0, 0, 'wall', 0, 'wall'],
    [0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0]
];

const _maxWidth = 5;
const _maxHeight = 4;

const set = (key, x, y) => {
    _map[y][x] = key;
};

const remove = (x, y) => {
    _map[y][x] = 0;
};

const get = (x, y) => {
    return _map[y][x]
};

const all = () => {
    return _map
};

//获取所有固定封闭单元
const getClosed = () => {
    const closed = [];

    for (let y = 0; y < _maxHeight; y++) {
        closed.push('-1|' + y);
        for (let x = 0; x < _maxWidth; x++) {
            if (y === 0) {
                closed.push(x + '|-1');
                closed.push(x + '|' + _maxHeight);
            }
            if (_map[y][x] !== 0) closed.push(x + '|' + y)
        }
        closed.push(_maxWidth + '|' + y);
    }
    return closed
};

//计算曼哈顿距离
const calcDistance = (x1, y1, x2, y2) => {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
};

//升序排列
const sortWays = (ways, sortIndex)=> {
    return ways.sort((v1,v2)=>v1[sortIndex]-v2[sortIndex])
};

//查询x1,y1节点的可选路线单元
const findWays = (x1, y1, x2, y2, closed = [], opened = [], G, ways = [], prevPoint) => {
    G++;
    const closedStr = ',' + [...closed, ...opened].join(',') + ',';
    const verify = (vX, vY) => {
        const vPointStr = ',' + vX + '|' + vY + ',';
        if (closedStr.indexOf(vPointStr) === -1) {
            const H = calcDistance(vX, vY, x2, y2);
            const F = G + H;
            ways.push([vX, vY, G, H, F, prevPoint]);
            opened.push(vX + '|' + vY);
        }
    };
    verify(x1 - 1, y1);
    verify(x1 + 1, y1);
    verify(x1, y1 - 1);
    verify(x1, y1 + 1);
    return sortWays(ways, 4);
};

//逆序列化单元
const deserializeWays = (point, routes = [])=> {
    routes.unshift([point[0],point[1]]);
    if (point[5]) {
        return deserializeWays(point[5], routes)
    } else {
        return routes
    }
};

const formatWays = (sX, sY, routes)=> {
    const res = [];
    for (let i=0,len = routes.length;i<len;i++) {
        const [eX, eY] = routes[i];
        res.push({sX, sY, eX, eY});
        sX = eX;
        sY = eY;
    }
    return res;
};

//AStar线路规划
const planing = (x1, y1, x2, y2) => {
    const closed = getClosed();
    const opened = [];
    let ways = findWays(x1, y1, x2, y2, closed, opened, 0);
    let endPoint = [];
    while (ways.length > 0) {
        const _point = ways.shift();
        if (x2 === _point[0] && y2 === _point[1]) {
            endPoint = _point;
            break;
        }
        ways = findWays(_point[0],_point[1], x2, y2, closed, opened, _point[2], ways, _point);
    }
    remove(x1,y1);
    const routes = deserializeWays(endPoint);
    return formatWays(x1, y1, routes)
};

export const map = {set, get, remove, all, planing};