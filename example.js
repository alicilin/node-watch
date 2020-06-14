'use strict';

const watcher = require('./watcher');

let w = new watcher({
    a: 'slm',
    b: 'hehehe',
    c: [
        {x: 'x', y: 'y'}
    ]
});

let obj = w.val();

w.watch(['c.*.x'], ['after'], ['update','delete', 'access', 'create'], ({ scope, propname, event, action, value, oldValue }) => {
    console.log( scope + ' -- ' + event + ' -- ' + action + ' - ' + propname + ' - ' + value + ' - ' + oldValue );
    return false;
});

async function init(){
    for await (let ntf of w.watchIterator(['c.*.x'], ['update','delete', 'access', 'create'])){
        console.log(ntf);
    }
}
init();
let a = obj.c[0].x;
console.log(a);