/**
 * HDLmReactFive short summary.
 *
 * HDLmReactFive description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
class HDLmReactFive {
  static buildButtonElement(idValue, buttonText, buttonRoutine, isDisabled, titleText) {
    let buttonStyle = { borderRadius: '25px',
                        margin: '2px 4px',
                        padding: '10px 20px',
                        backgroundColor: isDisabled ? '#cccccc' : '#007bff',
                        color: 'white',
                        border: 'none',
                        cursor: isDisabled ? 'not-allowed' : 'pointer' };
    let buttonProps = { id: idValue,
                        disabled: isDisabled,
                        style: buttonStyle,
                        title: titleText,
                        onClick: buttonRoutine };
    return React.createElement('button', buttonProps, buttonText);
  }
  static buildImprovementsTable(improvements, handleYesChange, handleNotChange, handleDeleteChange, handleRowClick, handleDeleteKey) {
    let labelCellStyle = { textAlign: 'center',
                           padding: '4px 8px',
                           borderBottom: 'none',
                           fontWeight: 'bold' };
    let improvLabelCellStyle = { textAlign: 'left',
                                 padding: '4px 8px',
                                 borderBottom: 'none',
                                 fontWeight: 'bold' };
    let thYes = React.createElement('th', { style: labelCellStyle }, 'Yes');
    let thNot = React.createElement('th', { style: labelCellStyle }, 'Not');
    let thDelete = React.createElement('th', { style: labelCellStyle }, 'Delete');
    let thImprovement = React.createElement('th', { style: improvLabelCellStyle }, 'Improvement');
    let labelRow = React.createElement('tr', null, thYes, thNot, thDelete, thImprovement);
    let wantedCellStyle = { textAlign: 'center',
                            padding: '0px 8px 4px 8px',
                            borderTop: 'none',
                            fontWeight: 'bold' };
    let emptyCellStyle = { borderTop: 'none',
                           padding: '0px 8px 4px 8px' };
    let tdWantedYes = React.createElement('td', { style: wantedCellStyle }, 'wanted');
    let tdWantedNot = React.createElement('td', { style: wantedCellStyle }, 'wanted');
    let tdWantedDelete = React.createElement('td', { style: emptyCellStyle }, '');
    let tdWantedImprovement = React.createElement('td', { style: emptyCellStyle }, '');
    let wantedRow = React.createElement('tr', null, tdWantedYes, tdWantedNot, tdWantedDelete, tdWantedImprovement);
    let thead = React.createElement('thead', null, labelRow, wantedRow);
    let dataRows = improvements.map(function(improvement, index) {
      let radioName = 'improvement-' + index;
      let yesChecked = improvement['Wanted'] === true;
      let notChecked = improvement['Wanted'] === false;
      let yesRadioProps = { type: 'radio',
                            name: radioName,
                            value: 'yes',
                            checked: yesChecked,
                            onChange: function() { handleYesChange(index); } };
      let yesRadio = React.createElement('input', yesRadioProps);
      let notRadioProps = { type: 'radio',
                            name: radioName,
                            value: 'not',
                            checked: notChecked,
                            onChange: function() { handleNotChange(index); } };
      let notRadio = React.createElement('input', notRadioProps);
      let deleteRadioProps = { type: 'radio',
                               name: radioName,
                               value: 'delete',
                               checked: false,
                               onChange: function() { handleDeleteChange(index); } };
      let deleteRadio = React.createElement('input', deleteRadioProps);
      let whatDiv = React.createElement('div', { style: { textAlign: 'left' } }, 'What: ' + (improvement['What'] || ''));
      let whyDiv = React.createElement('div', { style: { textAlign: 'left' } }, 'Why: ' + (improvement['Why'] || ''));
      let impCellStyle = { textAlign: 'left',
                           padding: '6px 8px',
                           cursor: 'pointer',
                           verticalAlign: 'top' };
      let impCell = React.createElement('td',
                                        { style: impCellStyle,
                                          tabIndex: 0,
                                          onClick: function() { handleRowClick(improvement['Hash']); },
                                          onKeyDown: function(event) { handleDeleteKey(index, event); } },
                                        whatDiv, whyDiv);
      let radioCellStyle = { textAlign: 'center',
                             verticalAlign: 'top',
                             padding: '6px 8px' };
      let tdYes = React.createElement('td', { style: radioCellStyle }, yesRadio);
      let tdNot = React.createElement('td', { style: radioCellStyle }, notRadio);
      let tdDelete = React.createElement('td', { style: radioCellStyle }, deleteRadio);
      return React.createElement('tr',
                                 { key: index },
                                 tdYes, tdNot, tdDelete, impCell);
    });
    let tbody = React.createElement('tbody', null, ...dataRows);
    let tableStyle = { borderCollapse: 'collapse',
                       border: '1px solid #ccc',
                       marginTop: '8px' };
    return React.createElement('table', { style: tableStyle }, thead, tbody);
  }
  static buildSpinnerElement() {
    let spinnerStyle = { display: 'inline-block',
                         width: '40px',
                         height: '40px',
                         border: '6px solid #f3f3f3',
                         borderTop: '6px solid #3498db',
                         borderRadius: '50%',
                         animation: 'hdlm-wiv1-spin 1s linear infinite' };
    let spinnerDiv = React.createElement('div', { style: spinnerStyle });
    let labelStyle = { marginLeft: '12px', verticalAlign: 'middle' };
    let labelSpan = React.createElement('span', { style: labelStyle }, 'Processing ...');
    let wrapperStyle = { display: 'flex',
                         alignItems: 'center',
                         marginTop: '10px',
                         marginBottom: '10px' };
    return React.createElement('div', { style: wrapperStyle }, spinnerDiv, labelSpan);
  }
  static buildSuggestionAreaWLabel(labelText, placeholderText, idValue, onKeyDownFunction, initialValue, titleText) {
    let labelStyle = { display: 'block' };
    let labelElement = React.createElement('label', { style: labelStyle }, labelText);
    let textAreaProps = { id: idValue,
                          name: idValue,
                          rows: 6,
                          cols: 80,
                          placeholder: placeholderText,
                          defaultValue: initialValue,
                          title: titleText,
                          onKeyDown: onKeyDownFunction };
    let textAreaElement = React.createElement('textarea', textAreaProps);
    let wrapperStyle = { marginTop: '12px', display: 'block' };
    return React.createElement('div', { style: wrapperStyle }, labelElement, textAreaElement);
  }
  static buildUrlInputWLabel(labelText, placeholderText, idValue, onKeyDownFunction, initialValue, titleText) {
    let labelStyle = { display: 'block', marginBottom: '0px' };
    let labelElement = React.createElement('label', { style: labelStyle }, labelText);
    let inputProps = { type: 'text',
                       id: idValue,
                       name: idValue,
                       placeholder: placeholderText,
                       autoFocus: true,
                       size: 80,
                       defaultValue: initialValue,
                       title: titleText,
                       style: { marginTop: '0px' },
                       onKeyDown: onKeyDownFunction };
    let inputElement = React.createElement('input', inputProps);
    return React.createElement('div', null, labelElement, inputElement);
  }
  static getRootContainer(idValue) {
    let container = document.getElementById(idValue);
    let root = ReactDOM.createRoot(container);
    return root;
  }
  static putElementsInDiv(propsValue, elements) {
    return React.createElement('div', propsValue, ...elements);
  }
  static putElementsInFragment(elements) {
    return React.createElement(React.Fragment, null, ...elements);
  }
}
