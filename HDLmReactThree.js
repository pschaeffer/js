/**
 * HDLmReactThree short summary.
 *
 * HDLmReactThree description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmReactThree class is not used to create any objects.
   However, it does contain code for creating and using React. */ 
class HDLmReactThree {   
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
                       onClick: (event) => {HDLmReactThree.handleClick(event, 
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
    buttonHilite = HDLmReactThree.buttonHiliteValue(buttonIndex, eventKey, buttonForceHilite);     
    buttonObj = HDLmReactThree.buildButtonObj(buttonText, 
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
    buttonHilite = HDLmReactThree.buttonHiliteValue(buttonIndex, eventKey, buttonForceHilite); 
    buttonObj = HDLmReactThree.buildButtonObj(buttonText, 
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
    buttonHilite = HDLmReactThree.buttonHiliteValue(buttonIndex, eventKey, buttonForceHilite);       
    buttonObj = HDLmReactThree.buildButtonObj(buttonText, 
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
    let textObj = HDLmReactThree.buildTextObj(ruleName, '4');
    let textDivObj = HDLmReactThree.buildDivObj(textObj, counter++, styleObj);
    ruleOuputObj.push(textDivObj);
    /* Create a set of buttons */
    let buttonsObj = HDLmReactThree.buildButtonsObj(index, overallObject);
    let buttonsDivObj = HDLmReactThree.buildDivObj(buttonsObj, counter++, styleObj);
    ruleOuputObj.push(buttonsDivObj);   
    /* Put the entire rule into a div */   
    styleObj = {border: "dotted 1px black", margin: "10px"};
    let ruleDivObj = HDLmReactThree.buildDivObj(ruleOuputObj, index, styleObj);
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
                                                          let ruleObject = HDLmReactThree.buildRuleObj(rule, index, overallObject);
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
    let doneButtonObj = HDLmReactThree.buildButtonObj('Done', 
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
  /* This function really does work. The code below was 
     generated using the online Babel conversion tool.
     This routine is actually passed an array. */
  static startReact(rulesStringArray) { 
    /* console.log('s1'); */
    const container = document.getElementById('entryValues');
    /* console.log('s2'); */
    const root = ReactDOM.createRoot(container);
    HDLmReactThree.rulesStringArray = rulesStringArray;
    /* console.log('s3'); */
    /* console.log(rulesArray); */ 
    /* console.log(rulesNamesObject); */ 
    let overallObject = {'rulesArray': rulesStringArray};
    root.render(React.createElement(HDLmReactThree.buildRulesObj, 
                                    overallObject));                                   
  }   
}