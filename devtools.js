// Block scoping to avoid an IIFE
{
  /**
   * Change font attributes in devtools as per options
   *
   * @param {object} options Font attributes
   */
  const changeStyles = function(options) {
    chrome.devtools.panels.applyStyleSheet(DFM_CONF.getFontStyles({
      fontFace: options.fontFace,
      fontSize: options.fontSize,
      lineHeight: options.lineHeight
    }));
  }

  changeStyles({
    fontFace: DFM_CONF.fontFace,
    fontSize: DFM_CONF.fontSize,
    lineHeight: DFM_CONF.lineHeight
  });

  window.addEventListener('storage', e => {
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
  });
}
