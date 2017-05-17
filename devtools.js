// Block scoping to avoid an IIFE
{
  const fontFace = localStorage.getItem(DFM_CONF.FONT_FACE);
  const fontSize = localStorage.getItem(DFM_CONF.FONT_SIZE);
  const lineHeight = localStorage.getItem(DFM_CONF.LINE_HEIGHT);

  /**
   * Change font attributes in devtools as per options
   *
   * @param {object} options Font attributes
   */
  const changeStyles = function(options) {
    DFM_CONF.getFontStyles({
      fontFace: options.fontFace,
      fontSize: options.fontSize,
      lineHeight: options.lineHeight
    });

    chrome.devtools.panels.applyStyleSheet(styles);
  }

  changeStyles({fontFace, fontSize, lineHeight});

  window.addEventListener('storage', e => {
    switch(e.key) {
      case DFM_CONF.FONT_FACE:
        changeStyles({ fontFace: e.newValue });
        break;
      case DFM_CONF.FONT_SIZE:
        changeStyles({ fontSize: e.newValue });
        break;
      case DFM_CONF.LINE_HEIGHT:
        changeStyles({ lineHeight: e.newValue });
        break;
      default: break;
    }
  });
}
