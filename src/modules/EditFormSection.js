import EditForm from './EditForm';
import MDEditor from './MDEditor';
import UserNameInput from './UserNameInput';

const text = {
	dlgTitleError: 'Error',
	dlgContentErrorName: 'Algorithm name cannot be empty!',
	dlgContentErrorTags: 'Algorithm tag cannot be empty!'
};

class EditFormSection extends EditForm {
	/**
	 * The Form component for editing a section of an algorithm
	 *
	 * @param      {string}  formId     DOM id of form
	 * @param      {string}  saveUrl    URL to save the content
	 * @param      {string}  algoName     Algorithm name
	 * @param      {string}  modId      DOM id of the input which contains the section being modified
	 * @param      {MDEditor}  editorObj  MDEditor object
	 * @param      {string}  baseUrl    URL of modifying content
	 * @param      {UserNameInput} userNameObj UserNameInput object
	 */
	init(formId, saveUrl, algoName, modId, editorObj, baseUrl, userNameObj) {
		if (!algoName || !modId || !baseUrl || !editorObj || !userNameObj) throw new Error('EditFormSection::Init error');
		this.algoName = algoName;
		this.modObj = $('#' + modId);
		this.baseUrl = baseUrl;
		this.editorObj = editorObj;
		this.userNameObj = userNameObj;

		this.editorObj.value = this.modObj.val();
		super.init(formId, saveUrl);
	}

	async saveResult() {
		this.modObj.val(this.editorObj.value);
		const loginResult = await this.userNameObj.login();
		if (!loginResult) {
			return false;
		}
		return super.saveResult();
	}

	submit(step) {
		this.modObj.val(this.editorObj.value);

		const action = this.baseUrl + encodeURIComponent(this.algoName) + '/' + step;
		return super.submit(action);
	}

}

export default EditFormSection;