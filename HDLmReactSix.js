"use strict";
class HDLmReactSix {
  static buildButtonElement(idValue, buttonText, buttonRoutine, isDisabled, styleObj) {
    let baseStyle = { margin: '20px 4px 0 0', padding: '8px 18px', backgroundColor: isDisabled ? '#cccccc' : '#2673c9', color: 'white', border: '0', cursor: isDisabled ? 'not-allowed' : 'pointer' };
    if (styleObj != null)
      baseStyle = Object.assign(baseStyle, styleObj);
    return React.createElement('button', { id: idValue, type: 'button', disabled: isDisabled, style: baseStyle, onClick: buttonRoutine }, buttonText);
  }
  static buildCheckboxElement(idValue, labelText, checkedValue, changeRoutine) {
    return React.createElement('label', { style: { display: 'block', marginTop: '16px' } }, React.createElement('input', { id: idValue, type: 'checkbox', checked: checkedValue, onChange: changeRoutine }), ' ', labelText);
  }
  static buildSingleLineInputWLabel(labelText, placeholderText, idValue, onKeyDownFunction, onChangeFunction, value, autoFocusValue) {
    return React.createElement('label', { style: { display: 'block', margin: 0 } }, labelText, React.createElement('input', { type: 'text', id: idValue, name: idValue, placeholder: placeholderText, value: value, autoFocus: autoFocusValue === true, onKeyDown: onKeyDownFunction, onChange: onChangeFunction, style: { display: 'block', margin: 0, width: '720px', maxWidth: '100%' } }));
  }
  static buildSpinnerElement() {
    return React.createElement('div', { role: 'status', 'aria-label': 'Improving webpages', style: { display: 'flex', alignItems: 'center', marginTop: '16px' } }, React.createElement('span', { style: { display: 'inline-block', width: '28px', height: '28px', border: '4px solid #dddddd', borderTopColor: '#2673c9', borderRadius: '50%', animation: 'hdlm-wps-spin 1s linear infinite' } }), React.createElement('span', { style: { marginLeft: '10px' } }, 'Processing ...'));
  }
  static buildTextAreaWLabel(labelText, placeholderText, idValue, onChangeFunction, value) {
    return React.createElement('label', { style: { display: 'block', marginTop: '16px' } }, labelText, React.createElement('textarea', { id: idValue, name: idValue, placeholder: placeholderText, value: value, rows: 5, onChange: onChangeFunction, style: { display: 'block', width: '720px', maxWidth: '100%' } }));
  }
  static getRootContainer(idValue) {
    return ReactDOM.createRoot(document.getElementById(idValue));
  }
  static putElementsInFragment(elements) {
    return React.createElement(React.Fragment, null, ...elements);
  }
}
