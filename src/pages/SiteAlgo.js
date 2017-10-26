import '../modules/common';

import UserNameInput from '../modules/UserNameInput';
import CommentForm from '../modules/CommentForm';


class PageSiteAlgo {
	constructor() {
		this.configName = {
			commentForm: 'commentFormConfig',
			userNameInput: 'userNameInputConfig'
		};
	}

	init() {
		// Username Input
		let config = ahjs.getConfig(this.configName.userNameInput);
		const userObj = new UserNameInput();
		if (config !== undefined) {
			userObj.init(config.loginUrl, config.checkLoginUrl, config.authorId);
		}

		// Add comment form
		config = ahjs.getConfig(this.configName.commentForm);
		const formObj = new CommentForm();
		if (config !== undefined) {
			formObj.init({
        formID: config.formID,
        fieldIDs: config.fieldIDs,
        messageID: config.messageID,
        userObj: userObj,
      });
		}

    // Search box
	}
}

new PageSiteAlgo().init();
