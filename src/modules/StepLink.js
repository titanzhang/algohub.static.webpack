let _instance;
class StepLink {
	static get instance() {
		if (!_instance) {
			_instance = new StepLink();
		}
		return _instance;
	}

	init(formObj) {
		if (!formObj) throw new Error('StepLink::Init error');
		$("[ahlink='edit']").click(this.onClick(formObj));
	}

	onClick(formObj) {
		const callback = function(event) {
			formObj.submit($(this).attr('ahaction'));
			return false;
		};
		return callback;

	}
}

export default StepLink;