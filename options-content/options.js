// Block scoping to avoid an IIFE
{
  /**
   * Load fonts available in system and pre populate the select box
   */
  const prePopulateFonts = function() {
    const currentFont = localStorage.getItem(DFM_CONF.FONT_FACE);

    chrome.fontSettings.getFontList(fonts => {
      const optionsHTML = fonts.map(font => {
        const selected = font.fontId === currentFont ? 'selected' : '';
        return '<option value="' + font.fontId + '" ' + selected + '>' + font.displayName + '</option>';
      }).join('');
      
      document.getElementById('fontFace').innerHTML = optionsHTML;
    });
  }


  /**
   * Persist options to storage
   *
   * @param {object} options Options to be persisted to storage 
   */
  const store = function(options) {
    Object.keys(options).forEach(key => localStorage.setItem(key, options[key]));
  }


  /**
   * Bind events for available fields
   */
  const bindEvents = function() {
    const elements = {
      fontFace: document.getElementById(DFM_CONF.FONT_FACE),
      fontSize: document.getElementById(DFM_CONF.FONT_SIZE),
      lineHeight: document.getElementById(DFM_CONF.LINE_HEIGHT)
    };

    document.querySelectorAll('.save-changes').forEach((node) => {
      node.addEventListener('click', () => {
        store({
          fontFace: elements.fontFace.value,
          fontSize: elements.fontSize.value,
          lineHeight: elements.lineHeight.value
        });
      });
    });
  }


  /**
   * Start processing
   */
  const init = function() {
    prePopulateFonts();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
};
