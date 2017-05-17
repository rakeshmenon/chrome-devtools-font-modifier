var consoleStyles = ``;

var htmlAttrHighlight = `
	body.platform-mac ::shadow .webkit-html-attribute-name {
		font-weight: 500;
	    font-style: italic;
	}
`;

var jsDefHighlight = `
	body.platform-mac .CodeMirror .cm-js-def {
		font-weight: 500;
		background-color: lightgoldenrodyellow;
	}
`;

var styleTabHighlight = `
	body.platform-mac .style-panes-wrapper .styles-section .simple-selector.selector-matches,
	body.platform-mac .style-panes-wrapper .monospace .styles-section .simple-selector.selector-matches {
		font-weight: 500;
	    background-color: yellow;
	}
`;

function changeStyles(fontFace = 'Hack') {
	var styles = `
		body.platform-windows .style-panes-wrapper,
		body.platform-windows .style-panes-wrapper .monospace,
		body.platform-windows .CodeMirror,
		body.platform-windows .CodeMirror .monospace,
		body.platform-mac .style-panes-wrapper,
		body.platform-mac .style-panes-wrapper .monospace,
		body.platform-mac .CodeMirror,
		body.platform-mac .CodeMirror .monospace {
			font-size: 13px !important;
		    font-family: ${fontFace}, monospace !important;
		}

		body.platform-windows ::shadow .monospace,
		body.platform-windows ::shadow .source-code,
		body.platform-mac ::shadow .monospace,
		body.platform-mac ::shadow .source-code {
		    font-size: 13px !important;
		    line-height: 20px !important;
		    font-family: ${fontFace}, monospace !important;
		}
	`;

	chrome.devtools.panels.applyStyleSheet(styles);
}

var currentFont = localStorage.getItem('current_font');
changeStyles(currentFont);

window.addEventListener('storage', e => {
	switch(e.key) {
		case 'current_font':
			changeStyles(e.newValue);
			break;
		default:
			break;
	}
});