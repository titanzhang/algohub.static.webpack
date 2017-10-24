import '../modules/common';

import Dialog from '../modules/Dialog';
import EditFormName from '../modules/EditFormName';
import UserNameInput from '../modules/UserNameInput';
import StepLink from '../modules/StepLink';
import FinishLink from '../modules/FinishLink';
import TagsDropdown from '../modules/TagsDropdown';


class PageMgmtContentName {
	constructor() {
		this.configName = {
			editForm: 'editFormConfig',
			dialog: 'dialogConfig',
			userNameInput: 'userNameInputConfig',
			tagsDropdown: 'tagsConfig'
		};
	}

	init() {
		// Username Input
		let config = ahjs.getConfig(this.configName.userNameInput);
		const userObj = new UserNameInput();
		if (config !== undefined) {
			userObj.init(config.loginUrl, config.checkLoginUrl, config.modifierId);
		}

		// Edit Form
		config = ahjs.getConfig(this.configName.editForm);
		const formObj = new EditFormName();
		if (config !== undefined) {
			formObj.init(config.formId, config.saveUrl, config.nameId, config.tagsId, config.baseUrl, userObj);
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
		
		// Tags Dropdown
		config = ahjs.getConfig(this.configName.tagsDropdown);
		const tagsDropdown = new TagsDropdown();
		if (config !== undefined) {
			tagsDropdown.init(config.containerID, config.templateID, config.cTagID, config.cTagBtID, config.tagList);
		}
	}
}

new PageMgmtContentName().init();