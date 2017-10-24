let _instance;

class Dialog {
	static get instance() {
		if (!_instance) {
			_instance = new Dialog();
		}
		return _instance;
	}

	init(dialogID, titleID, contentID) {
		if (!dialogID || !titleID || !contentID) throw new Error('Dialog::Init error');

		const dialogObj = $('#' + dialogID);
		const titleObj = $('#' + titleID);
		const contentObj = $('#' + contentID);

		this.show = this.onShowHide(dialogObj, true, false);
		this.show2 = this.onShowHide(dialogObj, true, true);
		this.hide = this.onShowHide(dialogObj, false);
		this.setTitle = this.onSetTitle(titleObj);
		this.setContent = this.onSetContent(contentObj);
	}

	onShowHide(dialogObj, isShow, easyClose) {
		return async () => {
			if (!dialogObj) throw new Error('Dialog::Not initialized');
			if (easyClose) {
				dialogObj.modal({show: isShow? 'show': 'hide'});
			} else {
				dialogObj.modal({backdrop: 'static', keyboard: false, show: isShow? 'show': 'hide'});
			}
		}
	}

	onSetTitle(titleObj) {
		return async (title) => {
			if (!titleObj) throw new Error('Dialog::Not initialized');
			titleObj.html(title);
		}
	}

	onSetContent(contentObj) {
		return async (content) => {
			if (!contentObj) throw new Error('Dialog::Not initialized');
			contentObj.html(content);
		}
	}
}

export default Dialog;