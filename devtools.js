// Block scoping to avoid an IIFE
{
  /**
   * Change font attributes in devtools as per options
   *
   * @param {object} options Font attributes
   */
  const changeStyles = function(options) {
    options = options || {};

    chrome.devtools.panels.applyStyleSheet(DFM_CONF.getFontStyles({
      fontFace: options.fontFace,
      fontSize: options.fontSize,
      lineHeight: options.lineHeight
    }));
  };

  const changeHighlights = function() {
    var optionStyles = '';

    Object.keys(DFM_CONF.highlightStyles).forEach(type => {
      const storageKey = 'highlight.' + type;

      if (localStorage.getItem(storageKey) === 'true') {
        optionStyles += DFM_CONF.highlightStyles[type].checked;
      } else {
        optionStyles += DFM_CONF.highlightStyles[type].unchecked;
      }

      chrome.devtools.panels.applyStyleSheet(optionStyles);
    });
  };

  changeStyles({
    fontFace: DFM_CONF.fontFace,
    fontSize: DFM_CONF.fontSize,
    lineHeight: DFM_CONF.lineHeight
  });
  changeHighlights();

  window.addEventListener('storage', e => {
    if (e.key.startsWith('highlight.')) {
      changeHighlights();
    } else {
      switch(e.key) {
        case DFM_CONF.constants.FONT_FACE:
          changeStyles({ fontFace: e.newValue });
          break;

        case DFM_CONF.constants.FONT_SIZE:
          changeStyles({ fontSize: e.newValue });
          break;

        case DFM_CONF.constants.LINE_HEIGHT:
          changeStyles({ lineHeight: e.newValue });
          break;

        default: break;
      }
    }
  });
}
