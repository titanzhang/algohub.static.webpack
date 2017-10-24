const AHMessage = {
	TAG_CHANGED: 'Tags.changed'
};

class TagsDropdown {

	init(containerID, templateID, cTagID, cTagBtID, tagList) {
		if (!containerID || !templateID || !cTagID || !cTagBtID) throw new Error('TagsDropdown::Init error');

		this.tagList = tagList.length === 0? []: tagList.split(',');
		this.container = $('#' + containerID);
		this.template = $('#' + templateID).html();
		const cTagInput = $('#' + cTagID);
		const cTagButton = $('#' + cTagBtID);

		$("[ahlink='addtag']").click(this.onClickAddTag());
		cTagButton.click(this.onClickCustTag(cTagInput));
		cTagInput.keypress(this.onKeyCustInput(cTagButton));

		this.buildTags();
	}

	onClickAddTag() {
		const self = this;
		const callback = function() {
			const tag = $(this).attr('ahdata');
			self.addTag(tag);
		};
		return callback;
	}

	addTag(newTag) {
		for (const tag of this.tagList) {
			if (tag === newTag) return;
		}
		this.tagList.push(newTag);
		this.buildTags();
	}

	onClickRemoveTag() {
		const self = this;
		const callback = function() {
			const removeTag = $(this).attr('ahdata');
			for (const i in self.tagList) {
				const tag = self.tagList[i];
				if (tag === removeTag) {
					self.tagList.splice(i, 1);
					break;
				}
			}
			self.buildTags();
			return false;
		};
		return callback;
	}

	buildTags() {
		let html = '';
		for (const tag of this.tagList) {
			html += this.template.replace(/\{AHTAG\}/g, tag);
		}
		// render new tags
		this.container.html(html);

		// unbind old tag links
		$("[ahlink='tag']").off('click');

		// bind new tag links
		$("[ahlink='tag']").click(this.onClickRemoveTag());

		ahjs.trigger(AHMessage.TAG_CHANGED, this.tagList);
	}

	onClickCustTag(cTagInput) {
		return () => {
			const tag = cTagInput.val().replace(/[^A-Za-z0-9_ ]/g, '').trim();
			if (tag.length !== 0) {
				this.addTag(tag);
			}
		};
	}

	onKeyCustInput(cTagButton) {
		return (event) => {
			if (event.which == '13') {
				cTagButton.click();
			}
		};
	}
}

export default TagsDropdown;
export const message = AHMessage;