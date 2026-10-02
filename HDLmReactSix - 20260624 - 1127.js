/**
 * HDLmReactSix short summary.
 * HDLmReactSix description.
 * @version 1.0
 * @author Peter
 */
"use strict";
class HDLmReactSix {
  static buildButtonElement(idValue, buttonText, buttonRoutine, isDisabled, styleObj) {
    let baseStyle = { borderRadius: '25px', margin: '2px 4px', padding: '10px 20px', backgroundColor: isDisabled ? '#cccccc' : '#007bff', color: 'white', border: 'none', cursor: isDisabled ? 'not-allowed' : 'pointer' };
    if (styleObj != null)
      baseStyle = Object.assign(baseStyle, styleObj);
    return React.createElement('button', { id: idValue, disabled: isDisabled, style: baseStyle, onClick: buttonRoutine }, buttonText);
  }
  static buildSingleLineInputWLabel(labelText, placeholderText, idValue, onKeyDownFunction, onChangeFunction, initialValue, autoFocusValue, wrapperStyleObj, inputStyleObj, labelStyleObj) {
    let localWrapperStyle = { display: 'block' };
    if (wrapperStyleObj != null)
      localWrapperStyle = Object.assign(localWrapperStyle, wrapperStyleObj);
    let localLabelStyle = { display: 'block', marginBottom: '0px' };
    if (labelStyleObj != null)
      localLabelStyle = Object.assign(localLabelStyle, labelStyleObj);
    let localInputStyle = { marginTop: '0px' };
    if (inputStyleObj != null)
      localInputStyle = Object.assign(localInputStyle, inputStyleObj);
    let labelElement = React.createElement('label', { style: localLabelStyle }, labelText);
    let inputElement = React.createElement('input', { type: 'text', id: idValue, name: idValue, placeholder: placeholderText, autoFocus: autoFocusValue === true, size: 80, defaultValue: initialValue, style: localInputStyle, onKeyDown: onKeyDownFunction, onChange: onChangeFunction });
    return React.createElement('div', { style: localWrapperStyle }, labelElement, inputElement);
  }
  static buildTextAreaWLabel(labelText, placeholderText, idValue, onChangeFunction, initialValue, rowsValue, wrapperStyleObj, textAreaStyleObj, labelStyleObj) {
    let localWrapperStyle = { display: 'block' };
    if (wrapperStyleObj != null)
      localWrapperStyle = Object.assign(localWrapperStyle, wrapperStyleObj);
    let localLabelStyle = { display: 'block', marginBottom: '4px' };
    if (labelStyleObj != null)
      localLabelStyle = Object.assign(localLabelStyle, labelStyleObj);
    let localTextAreaStyle = { width: '640px', maxWidth: '100%' };
    if (textAreaStyleObj != null)
      localTextAreaStyle = Object.assign(localTextAreaStyle, textAreaStyleObj);
    let labelElement = React.createElement('label', { style: localLabelStyle }, labelText);
    let textAreaElement = React.createElement('textarea', { id: idValue, name: idValue, placeholder: placeholderText, defaultValue: initialValue, rows: rowsValue, style: localTextAreaStyle, onChange: onChangeFunction });
    return React.createElement('div', { style: localWrapperStyle }, labelElement, textAreaElement);
  }
  static buildSpinnerElement() {
    let spinnerStyle = { display: 'inline-block', width: '40px', height: '40px', border: '6px solid #f3f3f3', borderTop: '6px solid #3498db', borderRadius: '50%', animation: 'hdlm-wps-v1-spin 1s linear infinite' };
    let spinnerDiv = React.createElement('div', { style: spinnerStyle });
    let labelStyle = { marginLeft: '12px', verticalAlign: 'middle' };
    let labelSpan = React.createElement('span', { style: labelStyle }, 'Processing ...');
    let wrapperStyle = { display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' };
    return React.createElement('div', { style: wrapperStyle }, spinnerDiv, labelSpan);
  }
  static getRootContainer(idValue) {
    let container = document.getElementById(idValue);
    return ReactDOM.createRoot(container);
  }
  static putElementsInFragment(elements) {
    return React.createElement(React.Fragment, null, ...elements);
  }
}