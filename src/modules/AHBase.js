class AHBase {
	constructor() {
		this.configList = {};
		this.eventList = {};
		this.initList = [];
	}

	static get instance() {
		if (!window.ahjs) {
			window.ahjs = new AHBase();
		}
		return window.ahjs;
	}

	addConfig(name, config) {
		this.configList[name] = config;
	}

	getConfig(name) {
		return this.configList[name];
	}

	on(eventName, callback) {
		if (this.eventList[eventName] === undefined) {
			this.eventList[eventName] = [];
		}
		this.eventList[eventName].push(callback);
	}

	trigger(eventName, ...params) {
		const callbacks = this.eventList[eventName];
		if (callbacks === undefined) {
			return;
		}
		for (const callback of callbacks) {
			setTimeout(callback, 0, ...params);
		}
	}

	triggerSync(eventName, ...params) {
		const callbacks = this.eventList[eventName];
		if (callbacks === undefined) {
			return;
		}
		for (const callback of callbacks) {
			callback(...params);
		}
	}

	addInit(fun) {
		this.initList.push(fun);
	}

	runInit(lib) {
		for (const fun of this.initList) {
			setTimeout(fun, 0, lib);
		}
	}
}

export default AHBase.instance;
