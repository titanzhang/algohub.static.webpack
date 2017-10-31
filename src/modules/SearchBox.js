import Utils from './common';
import { message as SearchResultMsg} from './SearchResultLayer';

const Text = {
  SEARCH_ONGOING: 'Searching ...',
  SEARCH_FAIL: 'Failed!',
  SEARCH_NOTFOUND: 'No algorithm found!'
};

class SearchBox {
  init({tagUrl, tagListID, tagTemplate, tagID, titleID, formID, searchUrl, linkTemplate}) {
    if (!tagUrl || !tagListID || !tagTemplate || !tagID || !titleID || !formID || !searchUrl || !linkTemplate) {
      throw new Error('SearchBox::Init error');
    }
    this.tagUrl = tagUrl;
    this.tagListObj = $(`#${tagListID}`);
    this.tagTemplate = tagTemplate;
    this.tagObj = $(`#${tagID}`);
    this.titleObj = $(`#${titleID}`);
    this.formObj = $(`#${formID}`);
    this.searchUrl = searchUrl;
    this.linkTemplate = linkTemplate;

    this.registerFormSubmit();
    this.buildTagList();

  }

  async buildTagList() {
    try {
      // Ajax call to get tag list
      const tagList = await Utils.get(this.tagUrl);
      if (!tagList) {
        return false;
      }

      // Build tag list html
      let html = this.tagListObj.html();
      for (const tag of tagList) {
        html += this.tagTemplate.replace('{DATA}', tag).replace('{TITLE}', tag);
      }
      this.tagListObj.html(html);

      // Register onClick event handler for each tag
      this.registerClickTag(this.tagObj);
      return true;
    } catch(e) {
      return false;
    }
  }

  registerClickTag(tagObj) {
    $("[ahlink='search_tag']").click(function(event) {
      const tag = $(this).attr('ahdata');
      if (!tag) {
  			tagObj.attr('ahdata', '');
  			tagObj.html('Tag');
  		} else {
  			tagObj.attr('ahdata', tag);
  			tagObj.html(tag);
  		}
    });
  }

  registerFormSubmit() {
    this.formObj.submit(() => {
      const tag = this.tagObj.attr('ahdata');
      const title = this.titleObj.val();
      const url = this.searchUrl + '?q=' + encodeURIComponent(title || '') + '&tag=' + encodeURIComponent(tag || '');

      ahjs.trigger(SearchResultMsg.SEARCH_SHOW_RESULT, Text.SEARCH_ONGOING);
      Utils.get(url)
      .then( (data) => {
        if (data.status) {
          let html = '';
          for (const page of data.result.pages) {
            html += this.linkTemplate.replace('{URL}', page.url).replace('{TITLE}', page.title);
          }
          ahjs.trigger(SearchResultMsg.SEARCH_SHOW_RESULT, html || Text.SEARCH_NOTFOUND);
        } else {
          ahjs.trigger(SearchResultMsg.SEARCH_SHOW_RESULT, Text.SEARCH_FAIL);
          ahjs.trigger(SearchResultMsg.SEARCH_HIDE_RESULT, 5000);
        }
      })
      .catch( () => {
        ahjs.trigger(SearchResultMsg.SEARCH_SHOW_RESULT, Text.SEARCH_FAIL);
        ahjs.trigger(SearchResultMsg.SEARCH_HIDE_RESULT, 5000);
      });

      return false;
    });
  }
}

export default SearchBox;
