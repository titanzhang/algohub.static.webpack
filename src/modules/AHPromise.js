class AHPromise {
		constructor() {
			this._promise = new Promise( (resolve, reject) => {
				this._resolve = resolve;
				this._reject = reject;
			});
		}

		resolve(param) {
			return this._resolve(param);
		}

		reject(param) {
			return this._reject(param);
		}

    get promise() {
      return this._promise;
    }
}

export default AHPromise;
