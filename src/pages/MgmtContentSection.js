import '../modules/common';

import Dialog from '../modules/Dialog';
import EditFormSection from '../modules/EditFormSection';
import UserNameInput from '../modules/UserNameInput';
import StepLink from '../modules/StepLink';
import FinishLink from '../modules/FinishLink';
import MDEditor from '../modules/MDEditor';

class PageMgmtContentSection {
	constructor() {
		this.configName = {
			editForm: 'editFormConfig',
			dialog: 'dialogConfig',
			userNameInput: 'userNameInputConfig',
			tagsDropdown: 'tagsConfig',
			mdEditor: 'mdEditorConfig'
		};
	}

	init() {
		// MD Editor
		let config = ahjs.getConfig(this.configName.mdEditor);
		const mdEditor = new MDEditor();
		if (config !== undefined) {
			mdEditor.init(config.containerID);
		}		

		// Username Input
		config = ahjs.getConfig(this.configName.userNameInput);
		const userObj = new UserNameInput();
		if (config !== undefined) {
			userObj.init(config.loginUrl, config.checkLoginUrl, config.modifierId);
		}

		// Edit Form
		config = ahjs.getConfig(this.configName.editForm);
		const formObj = new EditFormSection();
		if (config !== undefined) {
			formObj.init(config.formId, config.saveUrl, config.algoName, config.modId, mdEditor, config.baseUrl, userObj);
		}

		// Step Buttons
		StepLink.instance.init(formObj);

		// Finish Button
		FinishLink.instance.init(formObj);

		// Modal Dialog
		config = ahjs.getConfig(this.configName.dialog);
		if (config !== undefined) {
			Dialog.instance.init(config.dialogID, config.titleID, config.contentID);
		}

	}
}

new PageMgmtContentSection().init();