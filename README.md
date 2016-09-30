# digilution
In-the-wild-evolution emulator. App generates file[s] of random size and fills it up with random bytes, trying to run generated file[s]. If app will run much enough of time[s], it may produce self-replicating life and even intelligence one day, and actually that's why i've implemented it.

### Installation
Grab it here by casting: `git clone https://github.com/perimetral/digilution.git`

### Using
You may run app as standalone script by casting: `node app.js COUNT`, where `COUNT` is optional CLI argument determining of how much files do you want app to generate.
Or import **./engine.js** and use methods from it:

* `worker` (*function*, `() => Promise => null`): async 1 file generator;
* `workerSync` (*function*, `() => string`): sync 1 file generator, returns `stdout` of this file;

### Configuration
Use defaults or edit **./config.js** as follows:

* `sizeMin` (*number*, in *bytes*): bottom file size limit;
* `sizeMax` (*number*, in *bytes*): top file size limit;
* `sandbox` (*string*): directory to save generated files;
* `logger` (*function*, `...x => {}`): wrapper for logging;
* `namer` (*function*, `() => string`): generates filename and returns it;
* `random` (*function*, `() => Promise => number`): async random number generator;
* `randomSync` (*function*, `() => number`): sync random number generator;
* `executer` (*function*, takes/returns same as `fs.execFile`): async file executer;
* `executerSync` (*function*, takes/returns same as `fs.execFileSync`): sync file executer;
* `stdoutHandler` (*function*, `string => {}`): for async `stdout` monitoring;
* `stderrHandler` (*function*, `string => {}`): for async `stderr` monitoring;
* `god` (*function*, `Object => Promise => null`): opens file descriptor, writes to it, changes filemode, closes descriptor and tries to run resulted file;
* `godSync` (*function*, `Object => string`): sync version of `god`, returns `stdout` of executed file;

Format of *Object*, which is passed as param to `god` and `godSync`:

* `name` (*string*): single filename (without path and/or control symbols);
* `data` (*Buffer*): buffer containing data to write;

### Troubleshooting
Sometimes generated files outputs special symbols, so if you've configured printing of fresh stdout/stderr to your terminal, such behavior of new files may break your encoding. Restart your terminal to fix this issue.
