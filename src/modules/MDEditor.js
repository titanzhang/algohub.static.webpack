import SimpleMDE from 'simplemde';
import './MDEditor.css';

class MDEditor {
	constructor() {
		this.editor = null;
	}

	init(containerID) {
		const self = this;
		this.editor = new SimpleMDE({
			element: $('#' + containerID)[0],
			toolbar: [
				'bold', 'italic', 'heading', '|',
				'code', 'quote', 'unordered-list', 'ordered-list', '|',
				'link', 'image', 'table',
				{
					name: 'ytVideo',
					action: this.ytVideo,
					className: 'fa fa-youtube-play',
					title: 'Youtube Video'
				}, '|',
				'preview', '|', 'guide'
			],
			previewRender: (plainText, preview) => {
				const defaultRender = self.editor.markdown.bind(self.editor);
				setTimeout(function() {
					try {
						preview.innerHTML = defaultRender(self.ytVideoRender(plainText))
					} catch(e) {
						preview.innerHTML = 'Failed';
					}
				}, 250);
				return 'Loading ...';
			}
		});

	}

	get value() {
		return this.editor.value();
	}

	set value(v) {
		this.editor.value(v);
	}

	ytVideoRender(plainText) {
		const syntax = /(?:(?:https?:\/\/)?(?:www.youtube.com\/(?:embed\/|watch\?v=)|youtu.be\/)?([^?& ]+)(?:\?rel=\d)?)(?:\s+(\d+)\s(\d+))?/i;
		const startTag = '{% youtube', endTag = '%}';

		let startIndex = plainText.indexOf(startTag);
		while (startIndex >= 0) {
			const prePart = plainText.substring(0, startIndex);
			const postPart = plainText.substr(startIndex + startTag.length);

			const endIndex = postPart.indexOf(endTag);
			if (endIndex < 0) break;

			const midPart = postPart.substring(0, endIndex).trim();
			const found = midPart.match(syntax);
			if (found && found.length > 1) {
				const id = found[1];
				let width = found[2], height = found[3];
				if (width === undefined) width = 480;
				if (height === undefined) height = 320;
				const html = '<iframe width="'+width+'" height="'+height+'" frameborder="0" src="http://www.youtube.com/embed/'+id+'?ecver=2"></iframe>';
				plainText = prePart + html + postPart.substr(endIndex + endTag.length);
			} else {
				plainText = prePart + postPart.substr(endIndex + endTag.length);
			}

			startIndex = plainText.indexOf(startTag);
		}

		return plainText;
	}

	ytVideo(editor) {
		const cm = editor.codemirror;
		const selectedText = cm.getSelection();
		const text = selectedText || 'youtube link';
		cm.replaceSelection('{% youtube ' + text + ' %}');
	}
}

export default MDEditor;
