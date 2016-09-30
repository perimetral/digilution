const engine = require('./engine');

let times = (process.argv.length > 2) ? process.argv[2] : 1;
if (times <= 0) times = 1;

for (let i = 0; i < times; i += 1) {
	engine.worker().then(() => {}, (e) => { console.log('ERR', e); });
};