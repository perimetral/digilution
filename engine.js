global.$c = require('./config');
global.log = $c.logger;

const crypto = require('crypto');
const fs = require('fs');

const randomInt = (min, max) => {
	return new Promise((go, stop) => {
		min = Math.ceil(min);
		max = Math.floor(max);
		$c.random().then((data) => {
			return go(Math.floor(data * (max - min)) + min);
		}, (e) => { return stop(e); });
	});
};
const randomIntSync = (min, max) => {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor($c.randomSync() * (max - min)) + min;
};

const worker = () => {
	return new Promise((go, stop) => {
		randomInt($c.sizeMin, $c.sizeMax).then((size) => {
			crypto.randomBytes(size, (e, data) => {
				if (e) return stop(e);
				return $c.god({
					name: $c.namer().toString(),
					data
				});
			});
		}, (e) => { return stop(e); });
	});
};
const workerSync = () => {
	return $c.godSync({
		name: $c.namer().toString(),
		data: crypto.randomBytes(randomIntSync($c.sizeMin, $c.sizeMax)),
	});
};

module.exports = {
	worker,
	workerSync,
};