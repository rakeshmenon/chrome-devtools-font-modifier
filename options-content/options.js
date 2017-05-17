// Block scoping to avoid an IIFE
{
  /**
   * Load fonts available in system and pre populate the select box
   */
  const prePopulateFontStyles = function() {
    chrome.fontSettings.getFontList(fonts => {
      const optionsHTML = fonts.map(font => {
        const selected = font.fontId === DFM_CONF.fontFace ? 'selected' : '';
        return '<option value="' + font.fontId + '" ' + selected + '>' + font.displayName + '</option>';
      }).join('');
      
      document.getElementById(DFM_CONF.constants.FONT_FACE).innerHTML = optionsHTML;
      document.getElementById(DFM_CONF.constants.FONT_SIZE).value = DFM_CONF.fontSize;
      document.getElementById(DFM_CONF.constants.LINE_HEIGHT).value = DFM_CONF.lineHeight;
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
      fontFace: document.getElementById(DFM_CONF.constants.FONT_FACE),
      fontSize: document.getElementById(DFM_CONF.constants.FONT_SIZE),
      lineHeight: document.getElementById(DFM_CONF.constants.LINE_HEIGHT)
    };

    document.querySelector('#optionsForm').addEventListener('submit', event => {
      event.preventDefault();

      store({
        fontFace: elements.fontFace.value,
        fontSize: elements.fontSize.value,
        lineHeight: elements.lineHeight.value
      });
    });;

    document.querySelectorAll('.other-option').forEach(node => {
      node.addEventListener('change', event => {
        const target = event.currentTarget;
        const options = {};

        const changedOption = 'highlight.' + target.dataset.option;
        options[changedOption] = target.checked;

        store(options);
      });
    });
  }


  /**
   * Start processing
   */
  const init = function() {
    prePopulateFontStyles();
    bindEvents();
  }

  document.addEventListener('DOMContentLoaded', init);
};
