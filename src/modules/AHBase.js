class AHBase {
	constructor() {
		this.configList = {};
		this.eventList = {};
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

}

export default AHBase.instance;