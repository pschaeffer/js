/**
 * HDLmReactFour short summary.
 *
 * HDLmReactFour description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmReactFour class is not used to create any objects.
   However, it does contain code for creating and using React. */ 
class HDLmReactFour {   
  /* This function creates the object for exactly one button */
  static buildButtonObj(buttonText, 
                        keyValue, 
                        styleObjBase, 
                        hilite, 
                        ruleStringIndex,
                        overallObject,
                        setKeyFunction) {     
    /* Make a copy of the style object */
    let styleObjCopy = Object.assign({}, styleObjBase);
    /* console.log(styleObjCopy); */
    /* Depending on the vaue of hilite, set the background color */ 
    if (hilite) 
      styleObjCopy.backgroundColor = "rgb(0, 100, 0)";
    else 
      styleObjCopy.backgroundColor = "rgb(100, 0, 0)";
    let buttonProps = {key:     keyValue, 
                       style:   styleObjCopy, 
                       onClick: (event) => {HDLmReactFour.handleClick(event, 
                                                                      ruleStringIndex, 
                                                                      overallObject, 
                                                                      setKeyFunction);}};  
    let buttonObj = React.createElement("button", buttonProps, buttonText); 
    /* console.log(buttonObj); */
    return buttonObj;
  }
  /* This function creates the object for several buttons */
  static buildButtonsObj(buttonAdditionalIndex, buttonProps) {   
    /* Extract a value from the properties object */
    let rulesStringArray = buttonProps['rulesArray'];
    /* Initialize a few variables */
    let buttonForceHilite = false;
    let buttonHilite = false;
    let buttonIndex = 0;
    let buttonObj = {};
    let buttonsObj = [];
    let buttonStyle = {backgroundColor: "rgb(100, 0, 0)", 
                       borderRadius:    "15px",
                       border:          "solid 3px black",
                       color:           "white",
                       margin:          "5px",
                       padding:         "8px 12px"};
    let buttonText = '';
    let ruleString = rulesStringArray[buttonAdditionalIndex];
    let ruleObj = JSON.parse(ruleString);
    let buttonUsemode = ruleObj['details']['usemode']; 
    /* Use the React useState hook */
    const [eventKey, setEventKey] = React.useState(-1);
    /* Build the first button */
    buttonIndex = 1;
    buttonText = 'Off';
    buttonForceHilite = (buttonUsemode == buttonText.toLowerCase()) ? true : false;
    buttonHilite = HDLmReactFour.buttonHiliteValue(buttonIndex, eventKey, buttonForceHilite);     
    buttonObj = HDLmReactFour.buildButtonObj(buttonText, 
                                             buttonIndex, 
                                             buttonStyle, 
                                             buttonHilite, 
                                             buttonAdditionalIndex,
                                             buttonProps,
                                             setEventKey); 
    /* console.log(eventKey); */
    buttonsObj.push(buttonObj);
    /* Build the second button */
    buttonIndex = 2;
    buttonText = 'Test';
    buttonForceHilite = (buttonUsemode == buttonText.toLowerCase()) ? true : false;
    buttonHilite = HDLmReactFour.buttonHiliteValue(buttonIndex, eventKey, buttonForceHilite); 
    buttonObj = HDLmReactFour.buildButtonObj(buttonText, 
                                             buttonIndex, 
                                             buttonStyle, 
                                             buttonHilite, 
                                             buttonAdditionalIndex,
                                             buttonProps,
                                             setEventKey); 
    buttonsObj.push(buttonObj);
    /* Build the third button */  
    buttonIndex = 3;
    buttonText = 'Prod';
    buttonForceHilite = (buttonUsemode == buttonText.toLowerCase()) ? true : false;
    buttonHilite = HDLmReactFour.buttonHiliteValue(buttonIndex, eventKey, buttonForceHilite);       
    buttonObj = HDLmReactFour.buildButtonObj(buttonText, 
                                             buttonIndex, 
                                             buttonStyle, 
                                             buttonHilite, 
                                             buttonAdditionalIndex,
                                             buttonProps,
                                             setEventKey); 
    buttonsObj.push(buttonObj);
    return buttonsObj;
  }
  /* This function creates a div HTML elmement */
  static buildDivObj(whatGoesInTheDivObj, keyValue, styleObj) {    
    /* console.log(whatGoesInTheDivOb); */
    /* console.log(keyValue); */
    return React.createElement("div", {key: keyValue, style: styleObj}, whatGoesInTheDivObj);   
  }
  /* This function creates a div HTML elmement */
  static buildDivObjNoKey(whatGoesInTheDivObj) {    
    /* console.log(whatGoesInTheDivOb); */
    /* console.log(keyValue); */
    return React.createElement("div", null, whatGoesInTheDivObj);   
  }
  /* This function creates the object for exactly one rule */
  static buildRuleObj(ruleString, index, overallObject) {   
    /* console.log(index); */ 
    /* Initialize a few values */
    let counter = 0;
    let ruleOuputObj = [];
    let styleObj = {};
    /* Get the rule name */
    let ruleObj = JSON.parse(ruleString);   
    let ruleDetails = ruleObj['details'];
    let ruleName = ruleDetails['name']; 
    /* Create a text object */  
    let textObj = HDLmReactFour.buildTextObj(ruleName, '4');
    let textDivObj = HDLmReactFour.buildDivObj(textObj, counter++, styleObj);
    ruleOuputObj.push(textDivObj);
    /* Create a set of buttons */
    let buttonsObj = HDLmReactFour.buildButtonsObj(index, overallObject);
    let buttonsDivObj = HDLmReactFour.buildDivObj(buttonsObj, counter++, styleObj);
    ruleOuputObj.push(buttonsDivObj);   
    /* Put the entire rule into a div */   
    styleObj = {border: "dotted 1px black", margin: "10px"};
    let ruleDivObj = HDLmReactFour.buildDivObj(ruleOuputObj, index, styleObj);
    return ruleDivObj;
  }
  /* This function displays the rules. This function is 
     passed an object that has the rules in it. We must
     convert the object into an array of rules. */
  static buildRulesObj(overallObject) {    
    /* Extract a value from the properties object */
    let rulesStringArray = overallObject['rulesArray'];
    /* console.log(rulesStringArray); */
    let indexValue; 
    let rulesObj = rulesStringArray.map((item, index) => {indexValue = index;
                                                          let rule = item;   
                                                          let ruleObject = HDLmReactFour.buildRuleObj(rule, index, overallObject);
                                                          return ruleObject});
    /* console.log(rulesObj); */
    /* Use the React useState hook. This hook
       is not really needed here. It is provided
       just for completeness. */
    const [eventKey, setEventKey] = React.useState(-1);
    /* Build the Done button, after all of 
       the rules have been built */
    let doneButtonAdditionalIndex = null;
    let doneButtonAdditionalProps = overallObject;
    let doneButtonHilite = false;
    let doneButtonIndex = indexValue + 1;
    let doneButtonStyle = {backgroundColor: "rgb(100, 0, 0)", 
                           borderRadius:    "15px",
                           border:          "solid 3px black",
                           color:           "white",
                           margin:          "15px",
                           padding:         "8px 12px"};
    let doneButtonObj = HDLmReactFour.buildButtonObj('Done', 
                                                     doneButtonIndex,
                                                     doneButtonStyle,
                                                     doneButtonHilite, 
                                                     doneButtonAdditionalIndex,
                                                     doneButtonAdditionalProps,
                                                     setEventKey); 
    rulesObj.push(doneButtonObj);
    return React.createElement(React.Fragment, null, React.createElement("div", {}, rulesObj));
  }
  /* This function creates the object for exactly one 
     string of text */
  static buildTextObj(outText, outLevel) {  
    outLevel = 'h' + outLevel; 
    let textStyle = {style: {fontFamily: 'Arial'}};
    let textObj = React.createElement(outLevel, textStyle, outText); 
    return textObj;
  }
  /* This routine returns a button hilite value. 
     The value is based on the button index and 
     the current value of the state variable. */
  static buttonHiliteValue(buttonIndex, eventKey, buttonForceHilite) {
    /* console.log(buttonIndex, eventKey); */
    let buttonHilite = false;
    if ((eventKey > 0 && eventKey == buttonIndex) ||
        (eventKey == -1 && buttonForceHilite == true))
      buttonHilite = true;
    else 
      buttonHilite = false;
    return buttonHilite;
  } 
  /* This routine handles the button click event.
     This routine sets a state variable as need
     be. This routine is passed a function for 
     setting the state variable. */ 
  static handleClick(event, additionalIndex, overallObject, setEventKey) { 
    let eventText = event.target.textContent;
    /* console.log(eventText); */ 
    /* Extract a value from the properties object */
    let rulesStringArray = overallObject['rulesArray'];
    /* Check if a rule object was really clicked. 
       If not, don't try to set the 'usemode' 
       field. */
    if (additionalIndex != null) {   
      /* Get the current rule object */
      let ruleString = rulesStringArray[additionalIndex];
      let ruleObj = JSON.parse(ruleString);
      /* Update the rule object with the new use mode */
      ruleObj['details']['usemode'] = eventText.toLowerCase();
      /* Update the rule tree */ 
      HDLmTree.storeTreeNode(ruleObj);
      /* Convert the updated rule object back to a string 
         and reset the correct string in the array */
      ruleString = JSON.stringify(ruleObj); 
      rulesStringArray[additionalIndex] = ruleString;
      /* Send the updated rule object to the server */
      let valuesArray = [ruleObj];
      let valuesObj = {rules: valuesArray};
      let valuesObjJson = JSON.stringify(valuesObj);
      /* console.log(valuesObjJson); */
      HDLmWebSockets.sendStoreTreeNodesRequest(valuesObjJson);
    }
    /* Run the function that was passed to this
       function. This function was (generally) 
       provided by the useState hook. */
    if (eventText == 'Off') 
      setEventKey(1);
    else if (eventText == 'Test') 
      setEventKey(2);
    else if (eventText == 'Prod') 
      setEventKey(3);
    else 
      setEventKey(-1);
    /* Check for a very special case. Check if the user 
       clicked the Done button. If so, thena special 
       function is called. This code may need to be
       changed to support manage rules in addition to 
       build rules. */
    if (eventText.toLowerCase() == 'done') {
      /* console.log('Done clicked', rulesStringArray); */
      HDLmBuildRules.inputDone(rulesStringArray);
    }
  }
  /* Build a React break element and return the React 
     break element to the caller */
  static buildBreakElement() {
    /* Create the break element */
    let breakElement = React.createElement('br', null); 
    /* Return the React break element to the caller */
    return breakElement;
  }
  /* Build a React input element using values passed by
     the caller and return the React input element to 
     the caller. Note that this is not an input area,
     just an input text box. */
  static buildInputElement(propsValue, onKeyDownFunction, placeHolderText, focusValue) {
    /* If the is not set, then we build a local set of props */
    if (propsValue == null)
      propsValue = {"type": "text",
                    "autoFocus": focusValue,
                    "onKeyDown": onKeyDownFunction,
                    "placeholder": placeHolderText
     };
    /* Create the input element */
    let inputElement = React.createElement('input', propsValue); 
    /* Return the React input element to the caller */
    return inputElement;
  }
  /* Build a React input area with a label using values  
     passed by the caller and return the React input area 
     element to the caller. Note that this is not an input
     area, just an input text box. */
  static buildInputWLabel(onKeyDownFunction, labelText, placeHolderText, focusValue) {
    /* Get a React element for the label text */
    let labelElement = HDLmReactFour.buildLabelElement(null, null, labelText);
    let breakElement = HDLmReactFour.buildBreakElement();
    /* Get a React element for the input area */
    let inputElement = HDLmReactFour.buildInputElement(null, 
                                                       onKeyDownFunction, 
                                                       placeHolderText, 
                                                       focusValue);
    /* Combine the label with the input element in a div */
    let divElement = HDLmReactFour.putElementsInDiv(null,
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
  static buildManageActionElement(propsValue, actionName) {
    /* Build a React action element for the action */
    let actionElement = React.createElement('button',
                                            propsValue, 
                                            actionName);
    /* Put the burton in a div */
    let actionDivElement = HDLmReactFour.putElementsInDiv(null, [actionElement]);    
    /* Return the React actions element in a div to the caller */                                    
    return actionDivElement;
  }  
  /* Build a React list of actions using values passed 
     by the caller and return the React actions element
     to the caller */
  static buildManageActionsElement(actionsPropsValue, 
                                   divPropsValue,
                                   actionsArrayElements) {
    /* Build a React actions element for the actions */ 
    let actionsElement = React.createElement('ManageActions', 
                                             actionsPropsValue, 
                                             actionsArrayElements); 
    /* Put the buttons in a div */
    let actionsDivElement = HDLmReactFour.putElementsInDiv(divPropsValue, [actionsElement]);  
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
  /* Build a company React element with a break using values
     passed by the caller and return the React company element 
     with the break to the caller */
  static buildManageCompanyWBreakElement(propsValue, companyNameString) {
    /* Build a React text element for the company */  
    let textElement = HDLmReactFour.buildTextElement('strong',
                                                     propsValue, 
                                                     companyNameString);  
    /* Build a React break element */                          
    let breakElement = HDLmReactFour.buildBreakElement();
    /* Combine the label with the break element in a fragment */
    let fragmentElement = HDLmReactFour.putElementsInFragment([textElement, breakElement]);
    /* Return the React fragment element to the caller */
    return fragmentElement;
  }
  /* Build a React table element using values passed by
     the caller and return the React table element to 
     the caller */
  static buildTableElement(propsValue, tableRowsArray) {
    /* Create the React table element */
    let tableElement = React.createElement('table', propsValue, tableRowsArray); 
    /* Return the React table element to the caller */
    return tableElement;
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
  /* Build a React table data element using values passed by
     the caller and return the React table data element to 
     the caller */
  static buildTdElement(propsValue, tableDataValue) {
    /* Create the React table data element */
    let tableDataElement = React.createElement('td', propsValue, tableDataValue); 
    /* Return the React table data element to the caller */
    return tableDataElement;
  }
  /* Build a React table header element using values passed by
     the caller and return the React table head element to 
     the caller */
  static buildThElement(propsValue, tableHeaderValue) {
    /* Create the React table header element */
    let tableHeaderElement = React.createElement('th', propsValue, tableHeaderValue); 
    /* Return the React table header element to the caller */
    return tableHeaderElement;
  }
  /* Build a React table row element using values passed by
     the caller and return the React table row element to 
     the caller */
  static buildTrElement(propsValue, tableRowArray) {
    /* Create the React table row element */
    let tableRowElement = React.createElement('tr', propsValue, tableRowArray); 
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