var DFM_CONF = DFM_CONF || {};
DFM_CONF.constants = DFM_CONF.constants || {};
DFM_CONF.highlights = DFM_CONF.highlights || {};

DFM_CONF.constants.FONT_FACE = 'fontFace';
DFM_CONF.constants.FONT_SIZE = 'fontSize';
DFM_CONF.constants.LINE_HEIGHT = 'lineHeight';

DFM_CONF.fontFace = localStorage.getItem(DFM_CONF.constants.FONT_FACE);
DFM_CONF.fontSize = localStorage.getItem(DFM_CONF.constants.FONT_SIZE);
DFM_CONF.lineHeight = localStorage.getItem(DFM_CONF.constants.LINE_HEIGHT);

DFM_CONF.highlightStyles = {
  html: {
    checked: `
      body.platform-mac ::shadow .webkit-html-attribute-name {
          font-weight: bolder;
          font-style: italic;
      }
    `,
    unchecked: `
      body.platform-mac ::shadow .webkit-html-attribute-name {
          font-weight: normal;
          font-style: normal;
      }
    `
  },

  css: {
    checked: `
      body.platform-mac .style-panes-wrapper .styles-section .simple-selector.selector-matches,
      body.platform-mac .style-panes-wrapper .monospace .styles-section .simple-selector.selector-matches {
          font-weight: bolder;
          background-color: yellow;
      }
    `,
    unchecked: `
      body.platform-mac .style-panes-wrapper .styles-section .simple-selector.selector-matches,
      body.platform-mac .style-panes-wrapper .monospace .styles-section .simple-selector.selector-matches {
          font-weight: normal;
          background-color: transparent;
      }
    `
  }
};

/**
 * Get Font styles to modify devtools fonts based on inputs
 * @param {object} fontOptions Font attributes from the user
 */
DFM_CONF.getFontStyles = function (fontOptions) {
  const {
    fontFace = localStorage.getItem(DFM_CONF.constants.FONT_FACE) || 'inherit',
    fontSize = localStorage.getItem(DFM_CONF.constants.FONT_SIZE) || 'inherit',
    lineHeight = localStorage.getItem(DFM_CONF) || 'inherit'
  } = fontOptions;

  return `
    body.platform-windows .style-panes-wrapper,
    body.platform-windows .style-panes-wrapper .monospace,
    body.platform-mac .style-panes-wrapper,
    body.platform-mac .style-panes-wrapper .monospace {
        font-size: ${fontSize} !important;
        font-family: ${fontFace}, monospace !important;
    }

    body.platform-windows .CodeMirror,
    body.platform-windows .CodeMirror .monospace,
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