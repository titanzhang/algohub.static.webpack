const AHMessage = {
  SEARCH_SHOW_RESULT: 'SearchResult.showResult',
  SEARCH_HIDE_RESULT: 'SearchResult.hideResult'
};

class SearchResultLayer {
  init({containerID, contentID}) {
    if (!contentID || !contentID) throw new Error('SearchResultLayer::Init error');
    const containerObj = $(`#${containerID}`);
    const contentObj = $(`#${contentID}`);

    ahjs.on(AHMessage.SEARCH_SHOW_RESULT, this.onShowResult(containerObj, contentObj));
    ahjs.on(AHMessage.SEARCH_HIDE_RESULT, this.onHideResult(containerObj));
  }

  onShowResult(containerObj, contentObj) {
    return (html) => {
      contentObj.html(html);
      containerObj.modal('show');
    };
  }

  onHideResult(containerObj) {
    return (delay) => {
      if (delay !== undefined && delay > 0) {
        setTimeout(()=>{containerObj.modal('hide');}, delay);
      } else {
        containerObj.modal('hide');
      }
    };
  }
}

export default SearchResultLayer;
export const message = AHMessage;
