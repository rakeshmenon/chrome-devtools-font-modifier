var x = new XMLHttpRequest();

function loadFonts() {
	var currentFont = localStorage.getItem('current_font');

	chrome.fontSettings.getFontList(fonts => {
		var optionsHTML = fonts.map(font => {
			var selected = font.fontId === currentFont ? 'selected' : '';
			return '<option value="' + font.fontId + '" ' + selected + '>' + font.displayName + '</option>';
		}).join('');

		document.getElementById('fontFace').innerHTML = optionsHTML;

		document.getElementById('fontFace').addEventListener('change', e => {
			localStorage.setItem('current_font', e.currentTarget.value);
		})
	});
}

document.addEventListener('DOMContentLoaded', loadFonts);