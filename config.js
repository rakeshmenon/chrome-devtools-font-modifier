var DFM_CONF = DFM_CONF || {};

DFM_CONF.FONT_FACE = 'fontFace';
DFM_CONF.FONT_SIZE = 'fontSize';
DFM_CONF.LINE_HEIGHT = 'lineHeight';

DFM_CONF.html = `
	body.platform-mac ::shadow .webkit-html-attribute-name {
      font-weight: 500;
      font-style: italic;
	}
`;

DFM_CONF.js = `
	body.platform-mac .CodeMirror .cm-js-def {
      font-weight: 500;
      background-color: lightgoldenrodyellow;
	}
`;

DFM_CONF.css = `
	body.platform-mac .style-panes-wrapper .styles-section .simple-selector.selector-matches,
	body.platform-mac .style-panes-wrapper .monospace .styles-section .simple-selector.selector-matches {
      font-weight: 500;
      background-color: yellow;
	}
`;

/**
 * Get Font styles to modify devtools fonts based on inputs
 * @param {object} fontOptions Font attributes from the user
 */
DFM_CONF.getFontStyles = function (fontOptions) {
  const {
    fontFace = localStorage.getItem('fontFace'),
    fontSize = localStorage.getItem('fontSize'),
    lineHeight = localStorage.getItem('lineHeight') 
  } = fontOptions;

  return `
    body.platform-windows .style-panes-wrapper,
    body.platform-windows .style-panes-wrapper .monospace,
    body.platform-windows .CodeMirror,
    body.platform-windows .CodeMirror .monospace,
    body.platform-mac .style-panes-wrapper,
    body.platform-mac .style-panes-wrapper .monospace,
    body.platform-mac .CodeMirror,
    body.platform-mac .CodeMirror .monospace,
    body.platform-windows ::shadow .monospace,
    body.platform-windows ::shadow .source-code,
    body.platform-mac ::shadow .monospace,
    body.platform-mac ::shadow .source-code {
        font-size: ${fontSize} !important;
        line-height: ${lineHeight} !important;
        font-family: ${fontFace}, monospace !important;
    }
  `;
};