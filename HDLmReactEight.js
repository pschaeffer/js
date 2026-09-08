"use strict";
class HDLmReactEight {
  static buildButtonElement(idValue, buttonText, buttonRoutine, isDisabled, styleObj, titleText) {
    let baseStyle = { borderRadius: '25px', margin: '2px 4px', padding: '10px 20px', backgroundColor: isDisabled ? '#cccccc' : '#007bff', color: 'white', border: 'none', cursor: isDisabled ? 'not-allowed' : 'pointer' };
    if (styleObj != null)
      baseStyle = Object.assign(baseStyle, styleObj);
    let propsObj = { id: idValue, disabled: isDisabled, style: baseStyle, onClick: buttonRoutine };
    if (typeof(titleText) == 'string' && titleText != '')
      propsObj.title = titleText;
    return React.createElement('button', propsObj, buttonText);
  }
  static buildImprovementsTable(improvements, handleYesChange, handleNotChange, handleDeleteChange, handleRowClick, handleDeleteKey) {
    let labelCellStyle = { textAlign: 'center', padding: '4px 8px', borderBottom: 'none', fontWeight: 'bold' };
    let improvLabelCellStyle = { textAlign: 'left', padding: '4px 8px', borderBottom: 'none', fontWeight: 'bold' };
    let wantedCellStyle = { textAlign: 'center', padding: '0px 8px 4px 8px', borderTop: 'none', fontWeight: 'bold' };
    let emptyCellStyle = { borderTop: 'none', padding: '0px 8px 4px 8px' };
    let thead = React.createElement('thead', null,
                                    React.createElement('tr', null,
                                                        React.createElement('th', { style: labelCellStyle }, 'Yes'),
                                                        React.createElement('th', { style: labelCellStyle }, 'Not'),
                                                        React.createElement('th', { style: labelCellStyle }, 'Delete'),
                                                        React.createElement('th', { style: improvLabelCellStyle }, 'Improvement')),
                                    React.createElement('tr', null,
                                                        React.createElement('td', { style: wantedCellStyle }, 'wanted'),
                                                        React.createElement('td', { style: wantedCellStyle }, 'wanted'),
                                                        React.createElement('td', { style: emptyCellStyle }, ''),
                                                        React.createElement('td', { style: emptyCellStyle }, '')));
    let dataRows = improvements.map(function(improvement, index) {
      let localImprovement = improvement == null ? {} : improvement;
      let radioName = 'improvement-wim-' + index;
      let yesChecked = localImprovement['Wanted'] === true;
      let notChecked = localImprovement['Wanted'] === false;
      let radioCellStyle = { textAlign: 'center', verticalAlign: 'top', padding: '6px 8px' };
      let yesRadio = React.createElement('input', { type: 'radio', name: radioName, value: 'yes', checked: yesChecked, onChange: function() { handleYesChange(index); } });
      let notRadio = React.createElement('input', { type: 'radio', name: radioName, value: 'not', checked: notChecked, onChange: function() { handleNotChange(index); } });
      let deleteRadio = React.createElement('input', { type: 'radio', name: radioName, value: 'delete', checked: false, onChange: function() { handleDeleteChange(index); } });
      let whatText = typeof(localImprovement['What']) == 'string' ? localImprovement['What'] : '';
      let whyText = typeof(localImprovement['Why']) == 'string' ? localImprovement['Why'] : '';
      let hashText = typeof(localImprovement['Hash']) == 'string' ? localImprovement['Hash'] : '';
      let impCellStyle = { textAlign: 'left', padding: '6px 8px', cursor: 'pointer', verticalAlign: 'top' };
      let impCell = React.createElement('td',
                                        { style: impCellStyle,
                                          tabIndex: 0,
                                          onClick: function() { handleRowClick(hashText); },
                                          onKeyDown: function(event) { handleDeleteKey(index, event); } },
                                        React.createElement('div', { style: { textAlign: 'left' } }, 'What: ' + whatText),
                                        React.createElement('div', { style: { textAlign: 'left' } }, 'Why: ' + whyText));
      return React.createElement('tr', { key: index },
                                 React.createElement('td', { style: radioCellStyle }, yesRadio),
                                 React.createElement('td', { style: radioCellStyle }, notRadio),
                                 React.createElement('td', { style: radioCellStyle }, deleteRadio),
                                 impCell);
    });
    let tbody = React.createElement('tbody', null, ...dataRows);
    let tableStyle = { borderCollapse: 'collapse', border: '1px solid #ccc', marginTop: '8px' };
    return React.createElement('table', { style: tableStyle }, thead, tbody);
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
  static buildSpinnerElement() {
    let spinnerStyle = { display: 'inline-block', width: '40px', height: '40px', border: '6px solid #f3f3f3', borderTop: '6px solid #3498db', borderRadius: '50%', animation: 'hdlm-wim-v1-spin 1s linear infinite' };
    let spinnerDiv = React.createElement('div', { style: spinnerStyle });
    let labelStyle = { marginLeft: '12px', verticalAlign: 'middle' };
    let labelSpan = React.createElement('span', { style: labelStyle }, 'Processing ...');
    let wrapperStyle = { display: 'flex', alignItems: 'center', marginTop: '10px', marginBottom: '10px' };
    return React.createElement('div', { style: wrapperStyle }, spinnerDiv, labelSpan);
  }
  static buildTextAreaWLabel(labelText, placeholderText, idValue, onChangeFunction, initialValue, rowsValue, wrapperStyleObj, textAreaStyleObj, labelStyleObj) {
    let localWrapperStyle = { display: 'block' };
    if (wrapperStyleObj != null)
      localWrapperStyle = Object.assign(localWrapperStyle, wrapperStyleObj);
    let localLabelStyle = { display: 'block', marginBottom: '4px' };
    if (labelStyleObj != null)
      localLabelStyle = Object.assign(localLabelStyle, labelStyleObj);
    let localTextAreaStyle = { width: '720px', maxWidth: '100%' };
    if (textAreaStyleObj != null)
      localTextAreaStyle = Object.assign(localTextAreaStyle, textAreaStyleObj);
    let labelElement = React.createElement('label', { style: localLabelStyle }, labelText);
    let textAreaElement = React.createElement('textarea', { id: idValue, name: idValue, placeholder: placeholderText, defaultValue: initialValue, rows: rowsValue, style: localTextAreaStyle, onChange: onChangeFunction });
    return React.createElement('div', { style: localWrapperStyle }, labelElement, textAreaElement);
  }
  static getRootContainer(idValue) {
    let container = document.getElementById(idValue);
    return ReactDOM.createRoot(container);
  }
  static putElementsInFragment(elements) {
    return React.createElement(React.Fragment, null, ...elements);
  }
}
