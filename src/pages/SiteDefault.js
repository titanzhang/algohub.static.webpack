import '../modules/common';

import SearchBox from '../modules/SearchBox';
import SearchResultLayer from '../modules/SearchResultLayer';

class PageSiteDefault {
	constructor() {
		this.configName = {
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
	}
}

new PageSiteDefault().init();
