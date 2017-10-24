import Dialog from './Dialog';
import Utils from './common';

const text = {
	dlgTitle: 'Save Algorithm',
	dlgContentProcess: 'Processing ...',
	dlgContentSuccess: '<h4>Algorithm saved!</h4>See your algorithm <a href="{LINK}">HERE</a><br/>(There might be several minutes\' delay to see your change)',
	dlgContentFail: 'Whoops! Something is going wrong'
};

class EditForm {
	constructor() {
	}

	init(formId, saveUrl) {
		if (!formId || !saveUrl) throw new Error('EditForm::Init error');

		this.formObj = $('#' + formId);
		this.saveUrl = saveUrl;
	}

	showError(title, message) {
		const dialog = Dialog.instance;
		dialog.setTitle(title);
		dialog.setContent(message);
		dialog.show2();
	}

	postSaveResult(data) {
		const dialog = Dialog.instance;
		if (data.status) {
			dialog.setContent(text.dlgContentSuccess.replace('{LINK}', data.result.link));
		} else {
			dialog.setContent(text.dlgContentFail);
		}
		dialog.show();

		return data.status;
	}

	async saveResult() {
		const dialog = Dialog.instance;
		dialog.setTitle(text.dlgTitle);
		dialog.setContent(text.dlgContentProcess);
		dialog.show();

		const data = await Utils.post(this.saveUrl, this.formObj.serialize());

		if (data.status) {
			dialog.setContent(text.dlgContentSuccess.replace('{LINK}', data.result.link));
		} else {
			dialog.setContent(text.dlgContentFail);
		}
		dialog.show();

		return data.status;
	}

	submit(action) {
		this.formObj.attr('action', action);
		this.formObj.submit();
		return true;
	}
}

export default EditForm;