const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const $c = {};

$c.sizeMin = 1;
$c.sizeMax = 1 * 1024 * 1024;
$c.sandbox = path.join(__dirname, './sandbox');

$c.logger = console.log;
$c.namer = () => { return new Date().getTime(); };
$c.random = (...args) => {
	return new Promise((go, stop) => {
		return go(Math.random(...args));
	});
};
$c.randomSync = Math.random;
$c.executer = childProcess.execFile;
$c.executerSync = childProcess.execFileSync;
$c.stdoutHandler = (data) => {};
$c.stderrHandler = (data) => {};
$c.god = (entity) => {
	return new Promise((go, stop) => {
		let filename = path.join($c.sandbox, entity.name);
		fs.open(filename, 'w+', 0700, (e, fd) => {
			if (e) return stop(e);
			fs.write(fd, entity.data, 0, entity.data.length, (e, written, data) => {
				if (e) return stop(e);
				$c.logger(`WRITTEN ${written} BYTES TO ${filename}`);
				fs.fchmod(fd, 0700, (e) => {
					if (e) return stop(e);
					fs.close(fd, (e) => {
						if (e) return stop(e);
						$c.logger(`TRYING TO RUN ${filename}`);
						$c.executer(filename, [], { cwd: $c.sandbox }, (e, stdout, stderr) => {
							if (e) return stop(e);
							$c.stdoutHandler(stdout);
							$c.stderrHandler(stderr);
							return go();
						});
					});
				});
			});
		});
	});
};
$c.godSync = (entity) => {
	let filename = path.join($c.sandbox, entity.name);
	let fd = fs.openSync(filename, 'w+', 0700);
	let written = fs.writeSync(fd, entity.data, 0, entity.data.length);
	$c.logger(`WRITTEN ${written} BYTES TO ${filename}`);
	fs.fchmodSync(fd, 0700);
	fs.closeSync(fd);
	$c.logger(`TRYING TO RUN ${filename}`);
	return $c.executerSync(filename, [], { cwd: $c.sandbox });
};

module.exports = $c;