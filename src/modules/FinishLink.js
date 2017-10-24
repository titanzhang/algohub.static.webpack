let _instance;

class FinishLink {
	static get instance() {
		if (!_instance) {
			_instance = new FinishLink();
		}
		return _instance;
	}

	init(formObj) {
		if (!formObj) throw new Error('FinishLink::Init error');
		$("[ahlink='finish']").click(this.onClick(formObj));
	}

	onClick(formObj) {
		const callback = function(event) {
			( async () => {
				await formObj.saveResult();
			})();
			return false;
		};
		return callback;

	}
}

export default FinishLink;