"use strict";
class HDLmReactFive {
  static button(idValue, textValue, clickFunction, disabledValue) {
    return React.createElement('button', {
      id: idValue,
      type: 'button',
      onClick: clickFunction,
      disabled: disabledValue,
      style: { margin: '20px 8px 0 0' }
    }, textValue);
  }
  static checkbox(idValue, textValue, checkedValue, changeFunction) {
    return React.createElement('label', {
      style: { display: 'block', marginTop: '16px' }
    }, React.createElement('input', {
      id: idValue,
      type: 'checkbox',
      checked: checkedValue,
      onChange: changeFunction
    }), ' ', textValue);
  }
  static input(labelText, idValue, value, changeFunction, keyDownFunction) {
    return React.createElement('label', {
      style: { display: 'block', margin: 0 }
    }, labelText, React.createElement('input', {
      id: idValue,
      type: 'text',
      value: value,
      autoFocus: true,
      onChange: changeFunction,
      onKeyDown: keyDownFunction,
      style: { display: 'block', margin: 0, width: '720px', maxWidth: '100%' }
    }));
  }
  static spinner() {
    return React.createElement('span', {
      style: {
        display: 'inline-block',
        margin: '20px 8px',
        border: '5px solid #ddd',
        borderTopColor: '#2673c9',
        borderRadius: '50%',
        width: '24px',
        height: '24px',
        animation: 'hdlm-wpi-spin 1s linear infinite'
      }
    });
  }
  static table(items, handlers) {
    let header = React.createElement('thead', null,
      React.createElement('tr', null,
        React.createElement('th', null, 'Yes'),
        React.createElement('th', null, 'Not'),
        React.createElement('th', null, 'Delete'),
        React.createElement('th', { style: { textAlign: 'left' } }, 'Improvement')),
      React.createElement('tr', null,
        React.createElement('th', null, 'wanted'),
        React.createElement('th', null, 'wanted'),
        React.createElement('th', null),
        React.createElement('th', null)));
    let rows = items.map(function(item, index) {
      let radioName = 'improvement-' + index;
      return React.createElement('tr', { key: index },
        React.createElement('td', null, React.createElement('input', {
          type: 'radio',
          name: radioName,
          checked: item.Wanted === true,
          onChange: function() { handlers.yes(index); }
        })),
        React.createElement('td', null, React.createElement('input', {
          type: 'radio',
          name: radioName,
          checked: item.Wanted === false,
          onChange: function() { handlers.not(index); }
        })),
        React.createElement('td', null, React.createElement('input', {
          type: 'radio',
          name: radioName,
          onChange: function() { handlers.delete(index); }
        })),
        React.createElement('td', {
          tabIndex: 0,
          onClick: function() { handlers.click(item.Hash || ''); },
          onKeyDown: function(event) { if (event.key === 'Delete') handlers.delete(index); },
          style: { textAlign: 'left', verticalAlign: 'top' }
        },
        React.createElement('div', null, 'What: ' + (item.What || '')),
        React.createElement('div', null, 'Why: ' + (item.Why || ''))));
    });
    return React.createElement('table', {
      style: { borderCollapse: 'collapse', marginTop: '16px' }
    }, header, React.createElement('tbody', null, rows));
  }
  static textArea(labelText, idValue, value, placeholderText, changeFunction) {
    return React.createElement('label', {
      style: { display: 'block', marginTop: '16px' }
    }, labelText, React.createElement('textarea', {
      id: idValue,
      value: value,
      placeholder: placeholderText,
      rows: 5,
      onChange: changeFunction,
      style: { display: 'block', width: '720px', maxWidth: '100%' }
    }));
  }
  static root(idValue) {
    return ReactDOM.createRoot(document.getElementById(idValue));
  }
}