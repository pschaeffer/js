/**
 * HDLmReactFive short summary.
 *
 * HDLmReactFive description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmReactFive class is not used to create any objects.
   However, it does contain code for creating and using React. */ 
class HDLmReactFive {    
  /* Build a React break element and return the React 
     break element to the caller */
  static buildBreakElement() {
    /* Create the break element */
    let breakElement = React.createElement('br', null); 
    /* Return the React break element to the caller */
    return breakElement;
  }
  /* Build a React button element using values passed by
     the caller and return the React button element to 
     the caller */
  static buildButtonElement(propsValue, 
                            buttonIdValue,
                            buttonText, 
                            buttonRoutine) {
    /* console.log('In HDLmReactFive.buildButtonElement'); */
    if (propsValue == null) {
      const buttonStyle = { borderRadius: '25px',  
                            margin: '2px 1px',
                            padding: '10px 20px',
                            backgroundColor: '#007bff',
                            color: 'white',
                            border: 'none',
                            cursor: 'pointer' };               
      propsValue = { onClick: buttonRoutine,
                     id:      buttonIdValue,
                     style:   buttonStyle };
    }
    /* Build a React button element for the button */
    let buttonElement = React.createElement('button',
                                            propsValue, 
                                            buttonText);
    /* Put the button in a div */
    let buttonDivElement = HDLmReactFive.putElementsInDiv(null, [buttonElement]);    
    /* Return the React button element in a div to the caller */                                    
    return buttonDivElement;
  }
  /* Build a React checkbox element using values passed by
     the caller and return the React checkbox element to 
     the caller */
  static buildCheckboxElement(propsValue, isChecked, onClickFunction, idValue, companyName) {
    /* If the props are not set, then we build a local set of props */
    if (propsValue == null) {
      propsValue = { "type":   "checkbox",
                     "checked": isChecked,
                     "id":      idValue,
                     "name":    companyName,
                     "onClick": onClickFunction
                   }; 
    }
    /* Create the input/checkbox element */
    let inputElement = React.createElement('input', propsValue); 
    /* Return the React input/checkbox element to the caller */
    return inputElement;
  }
  /* Build a React font awesome i element using values passed by
     the caller and return the React font awesome i element to 
     the caller */
  static buildFontAwesomeIElement(propsValue, 
                                  faNameString,
                                  iconIdValue,
                                  onClickFunction) {
    /* Create the React icon element */
    if (propsValue == null) { 
      let classNameList = 'fas' + ' ' + faNameString;
      propsValue = { className: classNameList,
                     onClick: onClickFunction,
                     id: iconIdValue
                   };
    }
    let iconElement = React.createElement('i', propsValue, null);
    return iconElement;
  }
  /* Build a React input element using values passed by
     the caller and return the React input element to 
     the caller. Note that this is not an input area,
     just an input text box. */
  static buildInputElement(propsValue, 
                           onChangeFunction,
                           onKeyDownFunction, 
                           placeHolderText,
                           idValue,
                           initialValue, 
                           readOnlyValue,
                           rightPaddingValue,
                           focusValue) {
    /* If the is not set, then we build a local set of props */
    if (propsValue == null)
      propsValue = { "type": "text",
                     "id": idValue,
                     "autoFocus": focusValue,
                     "onKeyDown": onKeyDownFunction,
                     "placeholder": placeHolderText,
                     "defaultValue": initialValue,
                     "readOnly": readOnlyValue
                   };
       /* Check if the caller has passed a padding Right Value */ 
       if (rightPaddingValue != null) {
         let inputStyle = { 'padding-right': rightPaddingValue + "px" };   
         propsValue.style = inputStyle;
     };
    /* Add the onChange function to the props value, if the 
       value passed by the caller is not null */
    if (onChangeFunction != null) {
      propsValue.onChange = onChangeFunction;
    }
    /* Create the input element */
    let inputElement = React.createElement('input', propsValue); 
    /* Return the React input element to the caller */
    return inputElement;
  }
  /* Build a React input area with a label using values  
     passed by the caller and return the React input area 
     element to the caller. Note that this is not an input
     area, just an input text box. */
  static buildInputWLabel(onKeyDownFunction, 
                          labelText, 
                          placeHolderText, 
                          idValueForInput,
                          initialValue,
                          readOnlyValue,
                          rightPaddingValue,
                          focusValue) {
    /* Get a React element for the label text */
    let labelElement = HDLmReactFive.buildLabelElement(null, null, labelText);
    let breakElement = HDLmReactFive.buildBreakElement();
    let onChangeFunction = null;
    /* Get a React element for the input area */
    let inputElement = HDLmReactFive.buildInputElement(null, 
                                                       onChangeFunction, 
                                                       onKeyDownFunction, 
                                                       placeHolderText, 
                                                       idValueForInput,
                                                       initialValue,
                                                       readOnlyValue,
                                                       rightPaddingValue,
                                                       focusValue);
    /* Combine the label with the input element in a div */
    let divElement = HDLmReactFive.putElementsInDiv(null,
                                                    [labelElement, breakElement, inputElement]);
    /* Return the div React element to the caller */
    return divElement;
  }
  static buildInputAreaWLabel(onKeyDownFunction, 
                              onMouseEnterFunction,
                              onMouseLeaveFunction,
                              initialTextAreaName,
                              labelText, 
                              placeHolderText, 
                              numberOfRows, 
                              numberOfCols,
                              focusValue) {
    /* Get a React element for the label text */
    let labelElement = HDLmReactFive.buildLabelElement(null, null, labelText);
    let breakElement = HDLmReactFive.buildBreakElement();
    /* Get a React element for the input area */
    let inputElement = HDLmReactFive.buildTextAreaElement(onKeyDownFunction, 
                                                          onMouseEnterFunction,
                                                          onMouseLeaveFunction,
                                                          initialTextAreaName,
                                                          placeHolderText,
                                                          numberOfRows,
                                                          numberOfCols,
                                                          focusValue); 
    /* Combine the label with the input element in a div */
    let divElement = HDLmReactFive.putElementsInDiv(null,
                                                    [labelElement, breakElement, inputElement]);
    /* Return the div React element to the caller */
    return divElement;
  }
  /* Build a React label element using values passed by
     the caller and return the React label element to 
     the caller */
  static buildLabelElement(forValue, propsValue, labelString) {
    /* If the 'for' value is set and the props value 
       is not set, then we build a local set of props */
    if (forValue && !propsValue)
      propsValue = {"htmlFor": forValue};
    /* Create the label element */
    let labelElement = React.createElement('label', propsValue, labelString); 
    /* Return the React label element to the caller */
    return labelElement;
  }
  static buildManageActionElement(propsValue, 
                                  actionIdValue,
                                  actionName, 
                                  actionRoutine) {
    /* console.log('In HDLmReactFive.buildManageActionElement', actionRoutine); */
    /* Build a React action element for the action */
    let actionElement = HDLmReactFive.buildButtonElement(null,
                                                         actionIdValue, 
                                                         actionName, 
                                                         actionRoutine);
    /* Return the React action element to the caller */                                    
    return actionElement;
  }  
  /* Build a React list of actions using values passed 
     by the caller and return the React actions element
     to the caller */
  static buildManageActionsElement(actionsPropsValue, 
                                   belowTopPixels,
                                   fromLeftPixels,
                                   actionsArrayElements) {
    /* Build a React actions element for the actions */ 
    let actionsElement = React.createElement('ManageActions', 
                                             actionsPropsValue, 
                                             actionsArrayElements); 
    /* Put the buttons in a div */
    let divPropsValue;
    if (belowTopPixels != null) {
      const divStyle = { 'position': 'absolute',
                         'top': belowTopPixels.toString() + 'px',
                         'left': fromLeftPixels.toString() + 'px' };               
      divPropsValue = { style: divStyle };
    }
    let actionsDivElement = HDLmReactFive.putElementsInDiv(divPropsValue, [actionsElement]);  
    /* Return the React actions elements in a div to the caller */
    return actionsDivElement;
  }
  /* Build a companies React element using values passed by
     the caller and return the React companies element to 
     the caller */
  static buildManageCompaniesElement(propsValue, companiesArray) {
    /* Build a React companies element for the companies */
    let companiesElement = React.createElement('ManageCompanies', 
                                               propsValue, 
                                               companiesArray);
    /* Return the React companies element to the caller */
    return companiesElement;
  }
  /* Build a company React element using values passed by
     the caller and return the React company element to 
     the caller */
  static buildManageCompanyElement(propsValue, 
                                   companyNameElement,
                                   companyTableElement) {
    
    /* Build a React company element for the company */
    let companyElement = React.createElement('ManageCompany', 
                                             propsValue, 
                                             [companyNameElement,
                                              companyTableElement]);
    /* Return the React company element to the caller */
    return companyElement;
  }
  /* Build a company name React element using the
     company name string passed by the caller. The
     company name element is read-only and bold. */
  static buildManageCompanyNameElement(companyName,
                                       onMouseEnterFunction,
                                       onMouseLeaveFunction,
                                       initialName) {
    /* Build a unique name */
    let initialNameUnique = HDLmUtility.uniqueAddValue(initialName);                                         
    /* Create a set of properties for the company name */
    let companyNameProps = {value: companyName,
                            readOnly: true,
                            style: { fontWeight: 'bold'},
                            name: initialName,
                            id: initialNameUnique,
                            onMouseEnter: onMouseEnterFunction,
                            onMouseLeave: onMouseLeaveFunction};
    /* Build a React element for the company name */
    let companyNameElement = React.createElement('input', companyNameProps);
    /* Return the React company name element to the caller */
    return companyNameElement;
  }
  /* Build a company React element with a break using values
     passed by the caller and return the React company element 
     with the break to the caller */
  static buildManageCompanyWBreakElement(propsValue, companyNameString) {
    /* Build a React text element for the company */  
    let textElement = HDLmReactFive.buildTextElement('strong',
                                                     propsValue, 
                                                     companyNameString);  
    /* Build a React break element */                          
    let breakElement = HDLmReactFive.buildBreakElement();
    /* Combine the label with the break element in a fragment */
    let fragmentElement = HDLmReactFive.putElementsInFragment([textElement, breakElement]);
    /* Return the React fragment element to the caller */
    return fragmentElement;
  }
  /* Build a React password element using values passed by
     the caller and return the React password element to 
     the caller. The caller provides the placeholder text. */
  static buildPasswordElement(passedPropsValue, 
                              onKeyDownFunction, 
                              placeHolderText,
                              idValue,
                              paddingRightValue,
                              focusValue) {                                
    /* Build the properties for  the React password element */
    if (passedPropsValue == null) {
      passedPropsValue = { "type": "password",
                           "onKeyDown": onKeyDownFunction,
                           "placeholder": placeHolderText,
                           "id": idValue,
                           "autoFocus": focusValue
                         };
      /* Check if the caller has passed a padding Right Value */
      if (paddingRightValue != null) {
        let inputStyle = { 'padding-right': paddingRightValue + "px" };   
        passedPropsValue.style = inputStyle;
      }
    } 
    /* Create the input element */
    let passwordElement = React.createElement('input', passedPropsValue); 
    /* Return the React password element to the caller */
    return passwordElement;
  }
  /* Build a React password input area with a label using values  
     passed by the caller and return the React passsword input area 
     element to the caller. Note that this is a password input area,
     not just a password input text box. A special Icon is used to 
     show/hide the password. */
  static buildPasswordWEyeWLabel(onKeyDownFunction, 
                                 labelText, 
                                 placeHolderText, 
                                 paddingRightValue,
                                 focusValue) {
    /* Get the ID values used below */ 
    let iconIdValue = HDLmUtility.uniqueGenerateId(); 
    let passwordIdValue = HDLmUtility.uniqueGenerateId();
    /* Provide a local function to show/hide the password and 
       change the icon */
    function localOnClickFunction(event) {
      /* console.log('In localOnClickFunction'); */
      /* Find the password DOM entry and change it's type */
      let passwordDomEntry = document.getElementById(passwordIdValue);
      let oldPasswordType = passwordDomEntry.type;
      passwordDomEntry.type = (passwordDomEntry.type == 'text') ? 'password' : 'text';
      /* Find the icon DOM entry and change it */
      let iconDomEntry = document.getElementById(iconIdValue);
      if (oldPasswordType == 'text') {
        iconDomEntry.classList.remove('fa-eye-slash');
        iconDomEntry.classList.add('fa-eye');
      } 
      else {
        iconDomEntry.classList.remove('fa-eye');
        iconDomEntry.classList.add('fa-eye-slash');
      }
    }
    /* Provide a local function that moves the icon DOM entry */ 
    function localMoveIconFunction(event) {
      /* console.log('In localMoveIconFunction'); */
      /* Find the password DOM entry  */
      let passwordDomEntry = document.getElementById(passwordIdValue);
      /* Find the icon DOM entry and change it */
      let iconDomEntry = document.getElementById(iconIdValue);  
      /* Get the X and Y coordinates of the password field */
      let passwordDomRect = passwordDomEntry.getBoundingClientRect();
      let passwordDomOffsetTop = passwordDomEntry.offsetTop;
      let passwordDomOffsetWidth = passwordDomEntry.offsetWidth;
      let passwordDomTop = passwordDomRect.top;
      /* Adjust the top position to move the icon down a bit */
      let passwordDomOffsetTopAdjusted = passwordDomOffsetTop + 2; 
      if (passwordDomOffsetTopAdjusted < 0)
        passwordDomOffsetTopAdjusted = 0;
      /* Adjust the left position to move the icon over a bit */
      let passwordDomOffsetLeft = passwordDomEntry.offsetLeft; 
      let passwordDomOffsetWith = passwordDomEntry.offsetWidth;
      let passwordDomOffsetLeftAdjusted = passwordDomOffsetLeft + passwordDomOffsetWidth - paddingRightValue;
      if (passwordDomOffsetLeftAdjusted < 0)
        passwordDomOffsetLeftAdjusted = 0;
      /* Set the text area text */
      let cssLeft = 'left: ' + passwordDomOffsetLeftAdjusted + 'px; ';
      let cssTop = 'top: ' + passwordDomOffsetTopAdjusted + 'px; ';
      let cssPosition = 'position: absolute; ';
      let cssText = cssPosition + cssLeft + cssTop;
      iconDomEntry.style.cssText = cssText;
    }
    /* Build an icon element to show/hide the password */    
    let iconElement = HDLmReactFive.buildFontAwesomeIElement(null, 
                                                             'fa-eye', 
                                                             iconIdValue,
                                                             localOnClickFunction); 
    /* Get a React element for the label text */
    let labelElement = HDLmReactFive.buildLabelElement(null, null, labelText);
    let breakElement = HDLmReactFive.buildBreakElement();
    /* Get a React element for the input area */
    let inputElement = HDLmReactFive.buildPasswordElement(null, 
                                                          onKeyDownFunction, 
                                                          placeHolderText, 
                                                          passwordIdValue, 
                                                          paddingRightValue,
                                                          focusValue);
    /* Combine the label with the input element in a div */
    let divElement = HDLmReactFive.putElementsInDiv(null,
                                                    [labelElement, 
                                                     breakElement,  
                                                     inputElement,
                                                     iconElement]);
    /* Return the div React element to the caller */
    return [divElement, localMoveIconFunction];
  }
  /* Build a React password input area with a label using values  
     passed by the caller and return the React passsword input area 
     element to the caller. Note that this is a password input area,
     not just a password input text box. */
  static buildPasswordWLabel(onKeyDownFunction, 
                             labelText, 
                             placeHolderText, 
                             idValue,
                             paddingRightValue,
                             focusValue) {
    /* Get a React element for the label text */
    let labelElement = HDLmReactFive.buildLabelElement(null, null, labelText);
    let breakElement = HDLmReactFive.buildBreakElement();
    /* Get a React element for the input area */
    let inputElement = HDLmReactFive.buildPasswordElement(null, 
                                                          onKeyDownFunction, 
                                                          placeHolderText, 
                                                          idValue, 
                                                          paddingRightValue,
                                                          focusValue);
    /* Combine the label with the input element in a div */
    let divElement = HDLmReactFive.putElementsInDiv(null,
                                                    [labelElement, breakElement, inputElement]);
    /* Return the div React element to the caller */
    return divElement;
  }
  /* Build a React table element using values passed by
     the caller and return the React table element to 
     the caller */
  static buildTableElement(propsValue, tableRowsArray, leftShiftValue) {
    /* Create the React table element */
    if (leftShiftValue != null) {
      const tableStyle = { 'margin-left': leftShiftValue.toString() + 'px'
      };               
      propsValue = { style: tableStyle }; 
    }
    let tableElement = React.createElement('table', propsValue, tableRowsArray); 
    /* Return the React table element to the caller */
    return tableElement;
  }
  /* Build a React table data element using values passed by
     the caller and return the React table data element to 
     the caller */
  static buildTdElement(propsValue, 
                        onMouseEnterFunction,
                        onMouseLeaveFunction,
                        initialName,
                        tableDataValue) {
    /* Check if the caller has passed any properties. if so,
       we use them. If not, we create a default set of
       properties that left-aligns the table data text. */
    if (propsValue == null) {
      /* Build a unique name */
      let initialNameUnique = HDLmUtility.uniqueAddValue(initialName); 
      /* Build the properties */
      propsValue = { name: initialName,
                     id: initialNameUnique,
                     onMouseEnter: onMouseEnterFunction,
                     onMouseLeave: onMouseLeaveFunction
                   };
    }
    /* Create the React table data element */
    let tableDataElement = React.createElement('td', propsValue, tableDataValue); 
    /* Return the React table data element to the caller */
    return tableDataElement;
  }
  /* Build a React table data element using values passed by
     the caller and return the React table data element to 
     the caller. The table data element includes an input
     area that can be edited by the user. */
  static buildTdInputTextElement(propsValue, 
                                 onMouseEnterFunction,
                                 onMouseLeaveFunction,   
                                 initialName,
                                 tableDataValue, 
                                 rowClassName, 
                                 rowKeyFunction,
                                 idValue,
                                 inputSize) {
    /* Build the input properties. Note that defaultValue is used
       below, not value. It is important to use defaultValue so that
       the input element is properly initialized with the current
       value of the table data and all events are properly handled.
       Using defaultValue ensures that the input element is not
       controlled by the React state, which can cause issues with
       event handling. Using defaultValue also allows the input
       element to be properly initialized with the current value
       of the table data. Using defaultValue creates what is called
       an uncontrolled component in React. */
    let ikValue = HDLmWebpageOptimizer.inputKeyValue;
    /* console.log('In HDLmReactFive.buildTdInputTextElement - ikValue = ', ikValue, rowClassName, idValue); */
    /* console.trace(); */
    let inputPropsValue = { "type": "text",
                            "className": rowClassName,
                            "id": idValue,
                            "key": ikValue,
                            "name": initialName,
                            "onMouseEnter": onMouseEnterFunction,
                            "onMouseLeave": onMouseLeaveFunction,
                            "onKeyUp": rowKeyFunction,
                            "size": inputSize,
                            "defaultValue": tableDataValue
                          };
    /* Create the input element */
    let inputElement = React.createElement('input', inputPropsValue); 
    /* Create the React table data element with the input element
       as a child */
    let tableDataElement = React.createElement('td', propsValue, '', inputElement); 
    /* Return the React table data element to the caller */
    return tableDataElement;
  }
  /* Build a React text element using values passed by
     the caller and return the React text element to 
     the caller */
  static buildTextElement(tagValue, propsValue, textString) {
    /* Create the React text element */
    let textElement = React.createElement(tagValue, propsValue, textString); 
    /* Return the React text element to the caller */
    return textElement;
  }
  /* Build a React text area element using values passed by
     the caller and return the React text area element to 
     the caller */
  static buildTextAreaElement(onKeyDownFunction, 
                              onMouseEnterFunction,
                              onMouseLeaveFunction,
                              initialName,
                              placeHolderText,
                              numberOfRows,
                              numberOfCols,
                              focusValue) {
    /* Set the tag value to 'textarea' */
    let tagValue = 'textarea';
    /* Build a unique name */
    let initialNameUnique = HDLmUtility.uniqueAddValue(initialName);
    /* Setf the props value  */
    let propsValue = { "rows": numberOfRows,
                       "cols": numberOfCols,
                       "autoFocus": focusValue,
                       "name": initialName,
                       "id": initialNameUnique,
                       "onKeyDown": onKeyDownFunction,
                       "onMouseEnter": onMouseEnterFunction,
                       "onMouseLeave": onMouseLeaveFunction,
                       "placeholder": placeHolderText
                      };               
    /* Create the React text area element */
    let textAreaElement = React.createElement(tagValue, propsValue, placeHolderText); 
    /* Return the React text area element to the caller */
    return textAreaElement;
  }
  /* Build a React text area for a rollover element using 
     values passed by the caller and return the React text
     area element to the caller */
  static buildTextAreaRolloverElement(numberOfRows,
                                      numberOfCols,
                                      initialClasses,
                                      onMouseEnterFunction,
                                      onMouseLeaveFunction, 
                                      initialName) {
    /* Set the tag value to 'textarea' */
    let tagValue = 'textarea';
    /* Build a unique name */
    let initialNameUnique = HDLmUtility.uniqueAddValue(initialName); 
    /* Build the final class name string */
    if (Array.isArray(initialClasses)) {
      initialClasses = initialClasses.join(' ');
    }
    /* Setf the props value  */
    let propsValue = { "rows":         numberOfRows,
                       "cols":         numberOfCols,
                       "name":         initialName,
                       "id":           initialNameUnique,
                       "onMouseEnter": onMouseEnterFunction,
                       "onMouseLeave": onMouseLeaveFunction,
                       "className":    initialClasses
                      };               
    /* Create the React text area element */
    let textAreaElement = React.createElement(tagValue, propsValue, ''); 
    /* Return the React text area element to the caller */
    return textAreaElement;
  }
  /* Build a React table header element using values passed by
     the caller and return the React table head element to 
     the caller */
  static buildThElement(propsValue, 
                        onMouseEnterFunction,
                        onMouseLeaveFunction,
                        initialName,
                        tableHeaderValue) {
    /* Check if the caller has passed any properties. if so,
       we use them. If not, we create a default set of
       properties that left-aligns the table header text. */
    if (propsValue == null) {    
      /* Build a unique name */
      let initialNameUnique = HDLmUtility.uniqueAddValue(initialName);  
      const thStyle = { 'text-align': "left" };               
      propsValue = { style: thStyle, 
                     onMouseEnter: onMouseEnterFunction, 
                     onMouseLeave: onMouseLeaveFunction,
                     name: initialName, 
                     id: initialNameUnique }; 
    }
    /* Create the React table header element */
    let tableHeaderElement = React.createElement('th', propsValue, tableHeaderValue); 
    /* Return the React table header element to the caller */
    return tableHeaderElement;
  }
  /* Build a React table row element using values passed by
     the caller and return the React table row element to 
     the caller */
  static buildTrElement(propsValue, tableRowArray, keyValue, rowClassName, onRowClick) {
    /* Create the React table row element */    
    /* console.log(selectedRowId, setSelectedRowId); */
    /* console.log('In HDLmReactFive.buildTrElement - Entry', keyValue, isSelected); */
    /* Set the default properties for the table row. In
       practice, these default properties are only used
       for heading rows. */
    /* console.log('In HDLmReactFive.buildTrElement - keyValue = ', keyValue); */
    let trPropsValue = null;
    /* Build some properties for most table rows */
    if (rowClassName != null) {    
      /* console.log('In HDLmReactFive.buildTrElement - Later, className = ', rowClassName); */
      /* console.log('Building', keyValue,  isSelected); */
      trPropsValue = { key: keyValue,
                       className: rowClassName,
                       onClick: onRowClick };
    }                   
    let tableRowElement = React.createElement('tr', trPropsValue, tableRowArray); 
    /* Return the React table row element to the caller */
    return tableRowElement;
  }
  /* This function really does work. The code gets and 
     returns the DOM element where the React elements
     should be rendered. */
  static getRootContainer(idValue) {
    /* console.log('s1'); */
    const container = document.getElementById(idValue);
    /* console.log('s2'); */
    const root = ReactDOM.createRoot(container);
    /* Return the React root to the caller */
    return root;
  }
  /* This function puts one or more React elements 
     in a div (note the use of lowercase). The React
     element (not the DOM) element is returned to 
     the caller. */
  static putElementsInDiv(propsvalue, elements) {
    /* Create the React div element */
    let divElement = React.createElement('div', propsvalue, ...elements);   
    /* Return the React div element to the caller */
    return divElement;
  }
  /* This function puts one or more React elements 
     in a fragment. React provides React.Fragment 
     built into React. The React element is returned
     to the caller. */
  static putElementsInFragment(elements) {
    /* Create the React fragment element */
    let fragmentElement = React.createElement(React.Fragment, null, ...elements);   
    /* Return the React fragment element to the caller */
    return fragmentElement;
  }
  /* This function does the actual work of rendering 
     the React application in the location passed by
     the caller */
  static renderReact(appLocation, appElements) {
    /* Render the React elements in the location 
       passed by the caller */
    appLocation.render(appElements);  
  }
}
