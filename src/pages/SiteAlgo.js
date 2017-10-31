import '../modules/common';

import UserNameInput from '../modules/UserNameInput';
import CommentForm from '../modules/CommentForm';
import SearchBox from '../modules/SearchBox';
import SearchResultLayer from '../modules/SearchResultLayer';

class PageSiteAlgo {
	constructor() {
		this.configName = {
			commentForm: 'commentFormConfig',
			userNameInput: 'userNameInputConfig',
			searchBoxConfig: 'searchBoxConfig',
			searchResultConfig: 'searchResultConfig'
		};
	}

	init() {
		// Navbar Search Box
		let config = ahjs.getConfig(this.configName.searchBoxConfig);
		const searchBoxObj = new SearchBox();
		if (config !== undefined) {
			searchBoxObj.init({
				tagUrl: config.tagUrl,
				tagListID: config.tagListID,
				tagTemplate: config.tagTemplate,
				tagID: config.tagID,
				titleID: config.titleID,
				formID: config.formID,
				searchUrl: config.searchUrl,
				linkTemplate: config.linkTemplate
			});
		}

		// Search Result Layer
		config = ahjs.getConfig(this.configName.searchResultConfig);
		const searchResultObj = new SearchResultLayer();
		if (config !== undefined) {
			searchResultObj.init({
				containerID: config.resultID,
				contentID: config.contentID
			});
		}

		// Username Input
		config = ahjs.getConfig(this.configName.userNameInput);
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
