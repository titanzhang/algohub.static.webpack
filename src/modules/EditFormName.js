import EditForm from './EditForm';
import  { message as TagsDropdownMsg } from './TagsDropdown';

const text = {
	dlgTitleError: 'Error',
	dlgContentErrorName: 'Algorithm name cannot be empty!',
	dlgContentErrorTags: 'Algorithm tag cannot be empty!'
};

class EditFormName extends EditForm {
	init(formId, saveUrl, nameId, tagsId, baseUrl, userNameObj) {
		if (!nameId || !tagsId || !baseUrl || !userNameObj) throw new Error('EditFormName::Init error');
		this.nameObj = $('#' + nameId);
		this.tagsObj = $('#' + tagsId);
		this.baseUrl = baseUrl;
		this.userNameObj = userNameObj;
		ahjs.on(TagsDropdownMsg.TAG_CHANGED, this.onTagsChanged(this.tagsObj));
		super.init(formId, saveUrl);
	}

	checkValue() {
		if (this.nameObj.val().trim().length === 0) {
			this.showError(text.dlgTitleError, text.dlgContentErrorName);
			return false;
		}
		if (this.tagsObj.val().trim().length === 0) {
			this.showError(text.dlgTitleError, text.dlgContentErrorTags);
			return false;
		}
		return true;
	}

	async saveResult() {
		if (!this.checkValue()) {
			return false;
		}

		const loginResult = await this.userNameObj.login();
		if (!loginResult) {
			return false;
		}

		return super.saveResult();
	}

	submit(step) {
		if (!this.checkValue()) {
			return false;
		}

		const action = this.baseUrl + encodeURIComponent(this.nameObj.val()) + '/' + step;
		return super.submit(action);
	}

	onTagsChanged(tagsObj) {
		return (tagList) => {
			tagsObj.val(tagList.join(','));
		};
	}
}

export default EditFormName;