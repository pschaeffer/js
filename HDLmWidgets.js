/**
 * HDLmWidgets short summary.
 *
 * HDLmWidgets description.
 *
 * @version 1.0F
 * @author Peter
 */
"use strict";
/* The next JSON object contains some default values for the
   button widget */
const HDLmButtonWidgetOptions = {
  "elementSelection": false,
  "borderSize":       'default',
  "fontSize":         'default',
  "topMargin":        0
};
/* The next JSON object contains some default values for the
   check box widget */
const HDLmCheckBoxWidgetOptions = {
  "editable":         false,
  "elementSelection": false,
  "emptyFieldOk":     false,
};
/* The next JSON object contains some default values for the
   grid widget */
const HDLmGridWidgetOptions = {
  "delete":           false,
  "editable":         false,
  "elementSelection": false,
  "emptyFieldOk":     false,
  "keepSorted":       false,
  "newEntry":         false,
  "spellCheck":       true,
  "subType":          ""
};
/* The next JSON object contains some default values for the
   list widget. The list widget is normally used for lists of
   text. However, the list widget also supports lists of colors
   and images as well. */
const HDLmListWidgetOptions = {
  "delete":           false,
  "editable":         false,
  "elementSelection": false,
  "emptyFieldOk":     false,
  "keepSorted":       false,
  "newEntry":         false,
  "placeHolderText":  'New Value',
  "setColors":        false,
  "setImages":        false,
  "setTexts":         false,
  "sizeValue":        'default',
  "spellCheck":       true,
  "subType":          "text",
  "type":             "text",
  "unique":           false,
  "zeroLength":       false
};
/* The next JSON object contains some default values for the
   number widget */
const HDLmNumberWidgetOptions = {
  "delete":           false,
  "editable":         false,
  "elementSelection": false,
  "emptyFieldOk":     false,
  "placeHolderText":  "New Number",
  "subType":          ""
};
/* The next JSON object contains some default values for the
   select widget */
const HDLmSelectWidgetOptions = {
  "delete":           false,
  "editable":         false,
  "elementSelection": false,
  "emptyFieldOk":     false,
  "invokeRedraw":     false,
  "placeHolderText":  "New Value",
  "subType":          ""
};
/* The next JSON object contains some default values for the
   table widget */
const HDLmTableWidgetOptions = {
  "clickable":        false,
  "delete":           false,
  "editable":         false,
  "elementSelection": false,
  "emptyFieldOk":     false,
  "placeHolderText":  "New Table",
  "sizeValue":        'default',
  "subType":          ""
};
/* The next JSON object contains some default values for the
   text widget */
const HDLmTextWidgetOptions = {
  "alwaysRedraw":       false,
  "alwaysUpdate":       false,
  "bold":               false,
  "boldBox":            false,
  "borderSize":         'default',
  "bottomMargin":       0,
  "callOnEnter":        false,
  "dateOutput":         false,
  "delete":             false,
  "editable":           false,
  "elementSelection":   false,
  "emptyExtraValueOK":  true,
  "emptyFieldOk":       true,
  "emptyIgnoreValueOK": true,
  "emptyStoreValueOK":  true,
  "fontFamily":         'default',
  "fontSize":           'default',
  "htmlBreak":          false,
  "htmlPre":            false,
  "invokeRedraw":       false,
  "maskValue":          false,
  "multiLineValue":     false, 
  "placeHolderText":    'New Value',
  "removeTails":        true,
  "setFocus":           false,
  "sizeValue":          'default',
  "spellCheck":         true,
  "subType":            "",
  "textOutput":         false,
  "topMargin":          0,
  "updateOnEnter":      false
};
/* The map below is used to associate HTML id values (note the use of
   lower case) with widget instances. When an event occurs, the HTML
   id value can be easily obtained. The map below is used to locate
   the associated class instance. */
let HDLmWidgetMap = new Map();
/* The function below compares two values for sort purposes. The comparison
   allows for each value to be prefixed with the special value used to force
   selection of a specific value in a list. The special prefix is removed
   from each value before the comparison is actually done. This allows the
   real values to be properly compared. */
function sortValues(firstValue, secondValue) {
  let forceSelectString = HDLmDefines.getString('HDLMFORCEVALUE');
  if (firstValue.startsWith(forceSelectString))
    firstValue = firstValue.substring(forceSelectString.length);
  if (secondValue.startsWith(forceSelectString))
    secondValue = secondValue.substring(forceSelectString.length);
  if (secondValue > firstValue)
    return -1;
  else if (secondValue < firstValue)
    return 1;
  else
    return 0;
}
/* The HDLmButtonWidget class is used to create button widgets. Button widgets
   are used to display one Button. */
class HDLmButtonWidget {
  /* Build an HTML button widget class instance */
  constructor() {
    let argsLen = arguments.length;
    /* The next field is a reference to the container widget
       or a null value */
    this.containerWidget = null;
    /* Set the default options for a button widget */
    this.options = Object.assign({}, HDLmButtonWidgetOptions);
    /* The value below is used as the field description. Initially
       this field is set to an empty string. It can be set to an
       actual value by the constructor or by other code. */
    this.description = '';
    /* The field below is used as a copy of the orginal button value. In
       other words, a copy of the button value is placed in the field below.
       Changing this value will not change the original button value. */
    this.buttonValue = null;
    /* The next set of fields contain the type and sub type of the data the
       current widget is displaying. These fields are set when the current
       widget is created. These fields can be queried at any time. */
    this.dataType = null;
    this.subType = null;
    /* The next field contains a reference to the button click callback function.
       This function is invoked whenever an enabled button is clicked on. */
    this.clickCallback = null;
    /* The next field contains a reference to the redraw callback function.
       This function is invoked whenever the widget object must be redrawn.
       This will typically happen when the contents have changed. */
    this.redrawCallback = null;
    /* The next field contains a reference to the full redraw callback function.
       This function is invoked whenever the widget object must be fully redrawn.
       This will typically happen when the contents have changed and the modification
       must be fully redrawn. */
    this.fullRedrawCallback = null;
    /* Set the initial argument number to zero */
    let argNum = 0;
    /* Check if the invoker of the constructor passed the container widget */
    if (argsLen >= ++argNum)
      this.setContainerWidget(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed any options */
    if (argsLen >= ++argNum) {
      this.setOptions(arguments[argNum - 1]);
    }
    /* Check if the invoker of the constructor passed a description */
    if (argsLen >= ++argNum)
      this.setDescriptionValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a button value */
    if (argsLen >= ++argNum) {
      /* console.log('in HDLmButtonWidget'); */
      this.setButtonValue(arguments[argNum - 1]);
    }
    /* Check if the invoker of the constructor passed a button 
       click callback function. This function will be called
       whenever the current button widget is clicked on. */ 
    if (argsLen >= ++argNum)
      this.setClickCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a type value.
       The type value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setTypeValue(arguments[argNum - 1]);
    /* Generate a new unique id value (note the use of lower case)
       for the new HTML elements. Associate the new unique id value
       with the current class instance. */
    this.newUnique = HDLmUtility.generateId();
    /* The top margin property is always set for this type of widget,
       but not for some other widget types. This value is used later
       to move the description text down by the same amount as the
       top margin. */
    this.topMargin = this.options.topMargin;
  }
  /* This static method is invoked when a button click event occurs.  
     A button click event occurs whenever a button is clicked. */ 
  static eventClick(event) {
    /* console.log('in HDLmButtonWidget.eventClick'); */
    /* console.log(event); */
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log(`Fancytree event DOM HDLmButtonWidget Input Type (${event.inputType})`);
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let buttonWidgetCurrent = HDLmWidgetMap[targetId];
    /* console.log('We have a click'); */
    /* Check if this routine has been invoked too early for some reason.
       We actually don't know why this happens. */
    let tooEarly = false;
    if (typeof (buttonWidgetCurrent) == 'undefined' ||
        typeof (buttonWidgetCurrent.clickCallback) == 'undefined' ||
        buttonWidgetCurrent.clickCallback == null)
      tooEarly = true;
    /* Check if the current call is too early or not */
    if (tooEarly == true) {
      /* console.log('in HDLmButtonWidget.eventClick'); */
      /* console.log(event); */
    }
    /* If the current call is not too early, invoke the click
       call back routine */
    else 
      buttonWidgetCurrent.clickCallback();
  }
  /* This instance method returns the widget description to the caller */
  getDescription() {
    return this.description;
  }
  /* This instance method returns the widget error text to the caller.
     The error text will always be set to an empty string. */
  getErrorText() {
    return '';
  }
  /* This instance method returns the widget type value to the caller.
     The widget type value was set when the widget was created. */
  getTypeValue() {
    return this.dataType;
  }
  /* This method returns a boolean value showing if the current
     widget is an HTML element selection widget or not. The widget
     options must be checked to determine this value. */
  isElementSelection() {
    return this.options.elementSelection;
  }
  /* This method returns a boolean value showing if the value for the
     current widget is empty or not. A button widget is never considered 
     to be empty. */
  isEmpty() {
    return false;  
  }
  /* This method actually adds a button widget to an HTML web page.
     The caller provides the DOM element the button widget should be
     added to. This method returns the new DOM element to the caller. */
  render(parentId) {
    /* Make sure the parent ID is a string */
    if (typeof parentId != 'string') {
      let errorText = 'ParentId passed to render is not a string';
      HDLmAssert(false, errorText);
    }
    let newData;
    HDLmWidgetMap[this.newUnique] = this; 
    let newStyle = '';
    let newText = '';
    /* Display the button value */
    newText += '<div>'; 
    newText += '<button type="button"';
    /* Add the new unique id (note the use of lower case) value */
    newText += ' id="';
    newText += this.newUnique;
    newText += '"';
    if (this.options.borderSize != 'default')
      newStyle += 'border-width:' + this.options.borderSize.toString() + 'px;';
    if (this.options.fontSize != 'default')
      newStyle += 'font-size:' + this.options.fontSize.toString() + 'px;';
    /* Check if the top margin is set or not */
    if (this.options.topMargin > 0) {
      let topMargin = this.options.topMargin;
      newStyle += 'margin-top:' + topMargin.toString() + 'px;';
    }
    if (newStyle != '')
      newText += ' style="' + newStyle + '"';
    /* Add the disabled attribute, if need be */
    let errorText = this.containerWidget.getErrorText();
    /* console.log(errorText); */
    if (errorText != '')
      newText += ' disabled';
    /* Terminate the initial button tag */
    newText += '>';
    /* Add the button value */
    newText += this.buttonValue;
    /* Add the closing tags */
    newText += '</button>';
    newText += '</div>';
    /* Create a new jQuery array and a new DOM element from the generated HTML */
    let newJQArray = $(newText);
    let newElement = newJQArray[0];
    /* Add the new jQuery array to the values div */
    $(parentId).append(newJQArray); 
    /* Add the click event listener */
    newElement.addEventListener('click', HDLmButtonWidget.eventClick);    
    return newElement;
  }
  /* This method is used to set the enabledment status of 
     a button. Buttons are (in most cases) disabled at this
     outset. However, they may be enabled later. */
  setButtonStatus(newStatus) {
    /* Get the target button HTML element */
    let buttonElement = document.getElementById(this.newUnique);
    /* Set the enablement status of the button */
    /* console.log(buttonElement); */
    /* console.log(newStatus); */
    buttonElement.disabled = newStatus;
  }
  /* This method is used to set the value of a button widget. The value
     passed by the caller is copied into the button widget. Note that the
     actual button value is copied. */
  setButtonValue(newButtonValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(newButtonValue) == true) {
      let errorText = 'NewButtonValue passed to setButtonValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof newButtonValue != 'string') {
      let errorText = 'NewButtonValue passed to setButtonValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the text value */
    this.buttonValue = newButtonValue;
  }
  /* This method can be used to save a reference to the caller
     button click callback function. The click callback function
     is invoked whenever the button widget is enabled and clicked
     on. */  
  setClickCallback(newClickCallback) {
    /* Make sure the button click callback function is really a function */
    if (typeof newClickCallback != 'function') {
      let errorText = 'NewClickCallback passed to setClickCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.clickCallback = newClickCallback;
  }
  /* This method is used to set the parent container widget value of a button
     widget. The value passed by the caller is copied into the button widget.
     Note that the actual value is copied. */
  setContainerWidget(parentContainerWidget) {
    /* Make sure the parent container widget is really an object */
    if (typeof parentContainerWidget != 'object') {
      let errorText = 'ParentContainerWidget passed to setContainerWidget is not an object';
      HDLmAssert(false, errorText);
    }
    /* Copy the parent container widget reference */
    this.containerWidget = parentContainerWidget;
  }
  /* This method is used to set the description text for the current widget.
     The value passed to this routine must be a string. An error is reported
     if the value passed to this routine is not a string. */
  setDescriptionValue(descriptionValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(descriptionValue) == true) {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof descriptionValue != 'string') {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the description value */
    this.description = descriptionValue;
  }
  /* This method can be used to save a reference to the caller full
     redraw callback function. The full redraw callback function is
     invoked whenever the widget must be fully redrawn. This will
     typically happen whenever the contents of the widget have
     changed and the modification must be completely redrawn. */
  setFullRedrawCallback(newFullRedrawCallback) {
    /* Make sure the full redraw callback function is really a function */
    if (newFullRedrawCallback != null && typeof newFullRedrawCallback != 'function') {
      let errorText = 'NewFullRedrawCallback passed to setFullRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.fullRedrawCallback = newFullRedrawCallback;
  }
  /* This method can be used to set any select of options. The
     options passed by the caller will override any existing
     options (which may or may not be default values). */
  setOptions(newOptions) {
    /* Make sure the new options are an object */
    if (typeof newOptions != 'object') {
      let errorText = 'NewOptions passed to setOptions method are not an object';
      HDLmAssert(false, errorText);
    }
    let keys = Object.keys(newOptions);
    let keyLen = keys.length;
    for (let i = 0; i < keyLen; i++) {
      let currentKey = keys[i];
      if (this.options.hasOwnProperty(currentKey) == false) {
        let errorText = 'Property (' + currentKey + ') does not exist in options';
        HDLmAssert(false, errorText);
      }
      this.options[currentKey] = newOptions[currentKey];
    }
  }
  /* This method can be used to save a reference to the caller
     redraw callback function. The redraw callback function is
     invoked whenever the widget must be redrawn. This will
     typically happen whenever the contents of the widget have
     changed. */
  setRedrawCallback(newRedrawCallback) {
    /* Make sure the redraw callback function is really a function */
    if (typeof newRedrawCallback != 'function') {
      let errorText = 'NewRedrawCallback passed to setRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.redrawCallback = newRedrawCallback;
  }
  /* This method is used to set the sub type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setSubTypeValue(subTypeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(subTypeValue) == true) {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof(subTypeValue) != 'string') {
      let errorText = 'SubTypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the sub type value */
    this.subType = subTypeValue;
  }
  /* This method is used to set the type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setTypeValue(typeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(typeValue) == true) {
      let errorText = 'TypeValue passed to setTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof typeValue != 'string') {
      let errorText = 'TypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the type value */
    this.dataType = typeValue;
  }
}
/* The HDLmCheckBoxWidget class is used to create check box widgets. Check
   box widgets are used to display a boolean value. A boolean value is either
   true or false. */
class HDLmCheckBoxWidget {
  /* Build an HTML check box widget class instance */
  constructor() {
    let argsLen = arguments.length;
    /* The next field is a reference to the container widget
       or a null value */
    this.containerWidget = null;
    this.options = Object.assign({}, HDLmCheckBoxWidgetOptions);
    /* The current widget is assumed not be be read-only. This
       may be changed later. */
    this.readOnly = false;
    /* The next field contains a reference to the input callback
       function. This function is invoked whenever an input event
       occurs for the current widget. The value in the widget is
       a copy of the original value. */
    this.inputCallback = null;
    /* The value below is used as the field description. Initially
       this field is set to an empty string. It can be set to an
       actual value by the constructor or by other code. */
    this.description = '';
    /* The value below is used as a copy of the orginal boolean value.
       In other words, a copy of the original boolean value is placed in
       the field below. Changing this value will not change the original
       boolean value. */
    this.checked = null;
    /* The next field contains a reference to the update callback function.
       This function is invoked whenever the data value in the current widget
       object is updated. This function is used to update the actual data
       value after the value in the widget is changed. The value in the widget
       is a copy of the original value. The update callback routine is only
       invoked if the boolean value is valid. Callback routines are never
       called if the updated value(s) is/are invalid. */
    this.updateCallback = null;
    /* The next field contains a reference to the key down (key press) callback
       function. This function is invoked sometimes when a key is pressed for
       the current widget. This function is used to handle the key press event
       in some cases. Note that not all key press events are passed to this
       callback function. The actual code must be checked to determine which
       key press events are passed to this callback function. */
    this.keyDownCallback = null;
    /* The next set of fields contain the type and sub type of the data the
       current widget is displaying. These fields are set when the current
       widget is created. These fields can be queried at any time. */
    this.dataType = null;
    this.subType = null;
    /* The next field contains a reference to the redraw callback function.
       This function is invoked whenever the widget object must be redrawn.
       This will typically happen when the contents have changed. */
    this.redrawCallback = null;
    /* The next field contains a reference to the full redraw callback function.
       This function is invoked whenever the widget object must be fully redrawn.
       This will typically happen when the contents have changed and the modification
       must be fully redrawn. */
    this.fullRedrawCallback = null;
    /* The next field contains the current error text for the current widget.
       Of course, there never is any actual error text for a check box widget. */
    this.errorText = '';
    let argNum = 0;
    /* Check if the invoker of the constructor passed the container widget */
    if (argsLen >= ++argNum)
      this.setContainerWidget(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed any options */
    if (argsLen >= ++argNum)
      this.setOptions(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an input
       callback function. This function will be called whenever
       an input event occurs for the current widget. */
    if (argsLen >= ++argNum)
      this.setInputCallback(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed a description */
    if (argsLen >= ++argNum)
      this.setDescriptionValue(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed a value */
    if (argsLen >= ++argNum)
      this.setCheckValue(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an update
       callback function. This function will be called whenever
       the data value in current widget has been changed. The
       update callback routine is only invoked if the boolean
       value is valid. Callback routines are never called if
       the updated value(s) is/are invalid. */
    if (argsLen >= ++argNum)
      this.setUpdateCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a key down
       (key press) callback function. This function may or may not
       be called whenever a key press event occurs for the current
       widget. The actual code must be checked to determine if this
       routine will be invoked for a given key press event. */
    if (argsLen >= ++argNum)
      this.setKeyDownCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a type value.
       The type value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a sub type value.
       The sub type value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setSubTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a redraw callback.
       The redraw callback value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setRedrawCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a full redraw 
       callback. The full redraw callback value (if any) is saved in
       an instance field. */
    if (argsLen >= ++argNum)
      this.setFullRedrawCallback(arguments[argNum - 1]);
    /* Generate a new unique id value (note the use of lower case)
       for the new HTML elements. Associate the new unique id value
       with the current class instance. */
    this.newUnique = HDLmUtility.generateId();
  }
  /* This static method is invoked when an input event occurs. An
     input event occurs whenever an input field is changed in any
     way. */
  static eventInput(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log(`Fancytree event DOM HDLmCheckBoxWidget Input Type (${event.inputType})`);
    /* Check for an input event we need to ignore. Strangely enough this
       input event occurs even after the widget is removed /delete. Why
       is not clear. A widget should not receive any events after it has
       been deleted. Experience has shown that deleted widgets do receive
       events. Why isn't clear at all. */
    if (event.inputType == 'historyRedo' ||
        event.inputType == 'historyUndo')
      return;
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let checkWidgetCurrent = HDLmWidgetMap[targetId];
    /* Store the error text value. The error text may or may not be
       an empty string. Invoke the display error text method on the
       container widget to update the displayed error text. */
    let newErrorTextEmpty = '';
    checkWidgetCurrent.setErrorText(newErrorTextEmpty);
    checkWidgetCurrent.inputCallback();
    /* We need to update the actual boolean value at this point.
       This is done in two places. First the check box widget is
       updated. However, we also need to update the actual value.
       The check box widget contains a copy of the original value.
       The update callback routine is only invoked if the boolean
       value is valid. Callback routines are never called if the
       updated value(s) is/are invalid. */
    checkWidgetCurrent.checked = target.checked;
    checkWidgetCurrent.checked = Boolean(checkWidgetCurrent.checked);
    if (1 == 1) {
      let noErrors = false;
      if (checkWidgetCurrent.containerWidget.getErrorText() == '')
        noErrors = true;
      checkWidgetCurrent.updateCallback(checkWidgetCurrent.checked, noErrors);
      /* Run the full redraw callback routine - This code was added to do a full redraw.
         We did not do any redraw callback here. This is entirely new code.  This code
         displays the updated last modified date and time (amoung other things). */
      {
        let typeOfFullRedrawCallback = typeof(checkWidgetCurrent.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined')
          checkWidgetCurrent.fullRedrawCallback();
      }
    }
  }
  /* This static method is invoked by the pressing of any key. Of course,
     we really only want to handle the Delete, Enter, and Escape keys. */
  static eventKeyDown(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log('Fancytree event DOM HDLmCheckBoxWidget KeyDown');
    let key = event.key;
    /* Check for the Delete key */
    if (key === "Delete") {
      HDLmCheckBoxWidget.eventKeyDownDelete(event);
      return;
    }
    /* Check for the Enter key */
    if (key === "Enter") {
      HDLmCheckBoxWidget.eventKeyDownEnter(event);
      return;
    }
    /* Check for the Escape key */
    if (key === "Escape") {
      HDLmCheckBoxWidget.eventKeyDownEscape(event);
      return;
    }
  }
  /* This static method is invoked by the pressing of the Delete key.
     This method is actually called out of the more general key down
     routine. This routine does not do anything for now. */
  static eventKeyDownDelete(event) {
    let key = event.key;
    if (key !== "Delete") {
      let errorText = 'Event passed to the Delete routine does not have the Delete key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let checkWidgetCurrent = HDLmWidgetMap[targetId];
  }
  /* This static method is invoked by the pressing of the Enter key.
     This method is actually called out of the more general key down
     routine. Enter is generally ignored. */
  static eventKeyDownEnter(event) {
    let key = event.key;
    if (key !== "Enter") {
      let errorText = 'Event passed to the Enter routine does not have the Enter key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let checkWidgetCurrent = HDLmWidgetMap[targetId];
  }
  /* This static method is invoked by the pressing of the Escape key.
     This method is actually called out of the more general key down
     routine. Escape is generally ignored. However, if escape is used
     while a new tree entry is being created, then we need to cancel
     creating/adding the new tree entry. */
  static eventKeyDownEscape(event) {
    let key = event.key;
    if (key !== "Escape") {
      let errorText = 'Event passed to the Escape routine does not have the Escape key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let checkWidgetCurrent = HDLmWidgetMap[targetId];
    /* Invoke the key down (key press) callback routine with the
       current event value. The key down callback routine will
       decide what to do with the current event. */
    checkWidgetCurrent.keyDownCallback(event);
  }
  /* This instance method returns the widget description to the caller */
  getDescription() {
    return this.description;
  }
  /* This instance method returns the widget error text to the caller.
     The error text may be set to an empty string. */
  getErrorText() {
    return this.errorText;
  }
  /* This instance method returns the widget type value to the caller.
     The widget type value was set when the widget was created. */
  getTypeValue() {
    return this.dataType;
  }
  /* This method returns a boolean value showing if the current
     widget is an HTML element selection widget or not. This will
     always be false for check box widgets. */
  isElementSelection() {
    return false;
  }
  /* This method returns a boolean value showing if the value for the
     current widget is empty or not. A check box is considered to be
     empty if the value is a null or false. */
  isEmpty() {
    return this.checked === null || this.checked === false;
  }
  /* This method actually adds a check box widget to an HTML web page.
     The caller provides the DOM element the check box widget should be
     added to. This method returns the new DOM element to the caller. */
  render(parentId) {
    /* Make sure the parent ID is a string */
    if (typeof parentId != 'string') {
      let errorText = 'ParentId passed to render is not a string';
      HDLmAssert(false, errorText);
    }
    HDLmWidgetMap[this.newUnique] = this;
    this.setErrorText('');
    let newText = '';
    /* Display a check box value */
    newText += '<div>';
    newText += '<input type=checkbox';
    /* If the value can not be changed, mark it as disabled */
    if (this.options.editable == false ||
        this.readOnly == true)
      newText += ' disabled="disabled"';
    /* Add the new unique id (note the use of lower case) value */
    newText += ' id="';
    newText += this.newUnique;
    newText += '"';
    /* Add the actual value, if need be */
    if (this.checked == true)
      newText += ' checked';
    newText += '/>';
    newText += '</div>';
    /* Create a new jQuery array and a new DOM element from the generated HTML */
    let newJQArray = $(newText);
    let newElement = newJQArray[0];
    /* Add the new jQuery array to the values div */
    $(parentId).append(newJQArray);
    /* Add the input event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('input', HDLmCheckBoxWidget.eventInput);
    /* Add the key down event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('keydown', HDLmCheckBoxWidget.eventKeyDown);
     
    /*
    let newElement1 = document.querySelector('[title="Image modification"]');
    let newElement2 = document.querySelector('[title="Checked text modification"]');
    let orderElements = HDLmExtensionBothManageRules.contentOrderElements;
    let orderElementsLen = orderElements.length;
    orderElements.splice(0, orderElementsLen);
    orderElements.push(newElement1, newElement2);
    if (newElement1 != null &&
        newElement2 != null) {
      let localUrlStr = 'https://www.themarvelouslandofoz.com/';
      let urlObj = new URL(localUrlStr);
      let hostName = urlObj.hostname;
      let saveActiveEditorType = HDLmGlobals.activeEditorType;
      */
      /* HDLmGXE.saveDataValue(hostName, 'abcd'); */
      /* HDLmGXE.copySaveElement(hostName, newElement1); */
      /* HDLmGlobals.activeEditorType = saveActiveEditorType; */
    /*
    }
    */
    
    /*
    let currentElement = newElement;
    let nodeIdenJsonStr = HDLmNodeIden.buildNodeIdentifier(currentElement);
    HDLmGEM.buildCSSRules();
    HDLmGEM.buildButtonArea(currentElement);
    let dummyUrlStr = 'https://www.oneworldobservatory.com/en-US/buy-tickets';
    let dummyJsonStr = JSON.stringify({});
    dummyJsonStr = HDLmUtility.updateJsonStr(dummyJsonStr, 'HDLmRequestType', 'getModPart');
    dummyJsonStr = HDLmUtility.updateJsonStr(dummyJsonStr, 'HDLmUrlValue', dummyUrlStr);
    HDLmWebSockets.contentSendValue = dummyJsonStr;
    let messageCallback = (event) => {
      try {
        let eventObj = JSON.parse(event.data);
        let requestType = eventObj['HDLmRequestType'];
        if (requestType.startsWith('getMod') &&
          HDLmWebSockets.contentWebSocket != null)
          HDLmWebSockets.contentWebSocket.close();
        if (requestType.startsWith('getMod')) {
          HDLmGEM.updateRuleTree(event.data, dummyUrlStr, nodeIdenJsonStr);
        }
      }
      catch (errorObj) {
        HDLmError.reportError(errorObj, 'messageCallback');
      }
    }
    HDLmWebSockets.openWebSocketConnection(messageCallback);
    */
    /* 
    let currentElement = newElement;
    let nodeIdenJsonStr = HDLmNodeIden.buildNodeIdentifier(currentElement);
    let dummyUrlStr = 'https://www.oneworldobservatory.com/en-US/buy-tickets';
    let dummyJsonStr = nodeIdenJsonStr;
    let messageObj = JSON.parse(dummyJsonStr);
    let nodeCopyElements = false;
    HDLmElectronOne.handleMessageBuildNode(messageObj, dummyUrlStr, nodeCopyElements);        
    */
    /*
    let currentElement = newElement;
    let recursionWantedTrue = true;
    let elementObj = HDLmHtml.buildObjectFromNode(currentElement, recursionWantedTrue); 
    let dummyUrlStr = 'https://www.oneworldobservatory.com/en-US/buy-tickets';
    let nodeCopyElements = true;
    HDLmElectronOne.handleMessageCopyNode(elementObj, dummyUrlStr, nodeCopyElements);
    */
    /*
    let newElement1 = document.getElementById('ui-id-5');
    if (newElement1 != null) {
      HDLmGXE.displayValue('https://www.themarvelouslandofoz.com/', newElement1);
    }
    */
    return newElement;
  }
  /* This method is used to set the value of a check box widget. The value
     passed by the caller is copied into the check box widget, if the new
     value is different than the old value. Note that a click on the check
     box is simulated so that all of the other code (that would run if a
     human clicked on the check box) is exeuted. */
  setChecked(newCheckValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(newCheckValue) == true) {
      let errorText = 'NewCheckValue passed to setChecked method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a boolean */
    if (typeof newCheckValue != 'boolean') {
      let errorText = 'NewCheckValue passed to setChecked method is not a boolean';
      HDLmAssert(false, errorText);
    }
    /* Get the old value of the check box and determine if the new
       value is different or not. If the new value is different than
       the old value, simulate a click on the check box. */
    let checkElement = document.getElementById(this.newUnique);
    let oldCheckValue = Boolean(checkElement.checked);
    if (oldCheckValue != newCheckValue)
      checkElement.click();
  }
  /* This method is used to set the value of a check box widget. The value
     passed by the caller is copied into the check box widget. Note that the
     actual value is copied. */
  setCheckValue(newCheckValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(newCheckValue) == true) {
      let errorText = 'NewCheckValue passed to setCheckValue method is an array'; 
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a boolean */
    if (typeof newCheckValue != 'boolean') {
      let errorText = 'NewCheckValue passed to setCheckValue method is not a boolean';
      HDLmAssert(false, errorText);
    }
    /* Copy the value */
    this.checked = newCheckValue;
  }
  /* This method is used to set the parent container widget value of a check box
     widget. The value passed by the caller is copied into the check box widget.
     Note that the actual value is copied. */
  setContainerWidget(parentContainerWidget) {
    /* Make sure the parent container widget is really an object */
    if (typeof parentContainerWidget != 'object') {
      let errorText = 'ParentContainerWidget passed to setContainerWidget is not an object';
      HDLmAssert(false, errorText);
    }
    /* Copy the parent container widget reference */
    this.containerWidget = parentContainerWidget;
  }
  /* This method is used to set the description text for the current widget.
     The value passed to this routine must be a string. An error is reported
     if the value passed to this routine is not a string. */
  setDescriptionValue(descriptionValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(descriptionValue) == true) {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof descriptionValue != 'string') {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the description value */
    this.description = descriptionValue;
  }
  /* This method sets the error text field of the current widget to whatever
     error text value was passed by the caller. The error text value passed
     by the caller may or may not be an empty string. */
  setErrorText(newErrorText) {
    /* Make sure the error text string is actually a string */
    if (typeof newErrorText != 'string') {
      let errorText = 'NewErrorText passed to setErrorText is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the error text string */
    this.errorText = newErrorText;
  }
  /* This method can be used to save a reference to the caller full
     redraw callback function. The full redraw callback function is
     invoked whenever the widget must be fully redrawn. This will
     typically happen whenever the contents of the widget have
     changed and the modification must be completely redrawn. */
  setFullRedrawCallback(newFullRedrawCallback) {
    /* Make sure the full redraw callback function is really a function */
    if (newFullRedrawCallback != null && typeof newFullRedrawCallback != 'function') {
      let errorText = 'NewFullRedrawCallback passed to setFullRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.fullRedrawCallback = newFullRedrawCallback;
  }
  /* This method can be used to save a reference to the caller
     input callback function. The input callback function is
     invoked whenever an input event occurs for the current
     widget. */
  setInputCallback(newInputCallback) {
    /* Make sure the input callback function is really a function */
    if (typeof newInputCallback != 'function') {
      let errorText = 'NewInputCallback passed to setInputCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.inputCallback = newInputCallback;
  }
  /* This method can be used to save a reference to the caller key
     down (key press) callback funtion. The key press callback function
     is invoked (may be invoked) when a key press event occurs for the
     current widget. This callback routine is used to handle the key
     press event. */
  setKeyDownCallback(newKeyDownCallback) {
    /* Make sure the key down callback function is really a function */
    if (typeof newKeyDownCallback != 'function') {
      let errorText = 'NewKeyDownCallback passed to setKeyDownCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.keyDownCallback = newKeyDownCallback;
  }
  /* This method can be used to set any number of options. The
     options passed by the caller will override any existing
     options (which may or may not be default values). */
  setOptions(newOptions) {
    /* Make sure the new options are an object */
    if (typeof newOptions != 'object') {
      let errorText = 'NewOptions passed to setOptions method are not an object';
      HDLmAssert(false, errorText);
    }
    let keys = Object.keys(newOptions);
    let keyLen = keys.length;
    for (let i = 0; i < keyLen; i++) {
      let currentKey = keys[i];
      if (this.options.hasOwnProperty(currentKey) == false) {
        let errorText = 'Property (' + currentKey + ') does not exist in options';
        HDLmAssert(false, errorText);
      }
      this.options[currentKey] = newOptions[currentKey];
    }
  }
  /* This method can be used to save a reference to the caller
     redraw callback function. The redraw callback function is
     invoked whenever the widget must be redrawn. This will
     typically happen whenever the contents of the widget have
     changed. */
  setRedrawCallback(newRedrawCallback) {
    /* Make sure the redraw callback function is really a function */
    if (typeof newRedrawCallback != 'function') {
      let errorText = 'NewRedrawCallback passed to setRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.redrawCallback = newRedrawCallback;
  }
  /* This method is used to set the sub type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setSubTypeValue(subTypeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(subTypeValue) == true) {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof(subTypeValue) != 'string') {
      let errorText = 'SubTypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the sub type value */
    this.subType = subTypeValue;
  }
  /* This method is used to set the type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setTypeValue(typeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(typeValue) == true) {
      let errorText = 'TypeValue passed to setTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof typeValue != 'string') {
      let errorText = 'TypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the type value */
    this.dataType = typeValue;
  }
  /* This method can be used to save a reference to the caller
     update callback function. The update callback function is
     invoked whenever the data value in the widget has been
     changed. This callback is used to update the actual data
     value. The data value in the widget is just a copy of
     the original data value. The update callback routine is
     only invoked if the boolean value is valid. Callback routines
     are never called if the updated value(s) is/are invalid. */
  setUpdateCallback(newUpdateCallback) {
    /* Make sure the update callback function is really a function */
    if (typeof newUpdateCallback != 'function') {
      let errorText = 'NewUpdateCallback passed to setUpdateCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.updateCallback = newUpdateCallback;
  }
}
/* The HDLmContainerWidget class is used as a container for other widgets.
   This container has a render method. The render method on this widget
   invokes the render method on all widgets stored in the container. This
   has the effect of displaying the data stored in each of the widgets in
   the container. This may or may not be the actual data. The actual data
   may be different than the data in each widget if the widget data is
   invalid. */
class HDLmContainerWidget {
  /* Build an HTML container widget class instance */
  constructor() {
  /* Create an empty array for all of the widget references. As the
     current modification node is processed a set of widgets will be
     created. We may need to locate these widgets later. */
    this.widgetsArray = [];
    /* Create an empty associative array for all of the associated widget
       references. As the current modification node is processed a set of
       widgets will be created. We may need to locate these widgets later. */
    this.associatedWidgets = {};
  }
  /* The next method adds a widget to the current container. Of course,
     the new widget must be an object. */
  addWidget(newWidget, typeSource) {
    /* Make sure the new widget is really an object */
    if (typeof newWidget != 'object') {
      let errorText = 'NewWidget passed to addWidget is not an object';
      HDLmAssert(false, errorText);
    }
    this.widgetsArray.push(newWidget);
    /* At this point we can store a reference to the newly created widget
       in the current node. This will allow our code to find the widget
       from the current node as need be */
    this.associatedWidgets[typeSource] = newWidget;
  }
  /* The next method checks all of the HTML element selection widgets. At
     least one of them should specify some criteria for selecting a specific
     HTML element. If none of them has any HTML selection criteria, then we
     have an error that can be reported back to the caller. */
  checkElementSelection() {
    let errorText = '';
    let notEmptyCounter = 0;
    /* Scan all of the widgets. Count the number of HTML element selection
       widgets that are not empty. */
    for (let i = 0; i < this.widgetsArray.length; i++) {
      let currentWidget = this.widgetsArray[i];
      if (currentWidget.isElementSelection() == false)
        continue;
      if (currentWidget.isEmpty())
        continue;
      notEmptyCounter++;
    }
    /* We have an error, if all of the HTML element selection widgets
       are empty */
    if (notEmptyCounter == 0)
      errorText = 'All HTML selection fields are empty';
    return errorText;
  }
  /* The next method does all of the work of displaying the current error
     text for the current container. This is the error text from the first
     widget that actually has any error text. Of course, none of the widgets
     may actually have any non-empty error text. */
  displayErrorText() {
    let errorText = this.getErrorText();
    /* console.log(errorText); */
    /* console.log(typeof errorText); */
    HDLmUtility.setErrorText(errorText);
  }
  /* The next method does all of the work of getting the current error
     text for the current container. This is the error text from the first
     widget that actually has any error text. Of course, none of the widgets
     may actually have any non-empty error text. */
  getErrorText() {
    let errorText = '';
    let lastElementSelection = this.lastElementSelection();
    let visitTypeExpected = this.isTypeExpected('visit');
    for (let i = 0; i < this.widgetsArray.length; i++) {
      let currentWidget = this.widgetsArray[i];
      /* Skip all of the selection widgets if the current type 
         is visit. Visit modifications are not associated with
         any particular DOM node. */
      if (currentWidget.isElementSelection() && visitTypeExpected == true)
        continue;
      /* Skip the current widget, if the current widget is not displayed */
      if (this.isWidgetDisplayed(currentWidget) === false)
        continue;
      if (currentWidget.getErrorText() != '') {
        errorText = currentWidget.getErrorText();
        /* console.log(currentWidget); */
        /* console.log(errorText); */
        /* console.log(typeof errorText); */
        break;
      }
      /* The code below checks for a special case. Each of the target element
         selection fields may be OK (no errors). However, none of them may be
         set. This code checks for that case (which is an error). */
      if (i == lastElementSelection && this.checkElementSelection() != '') {
        errorText = this.checkElementSelection();
        console.log(errorText);
        console.log(typeof errorText);
        break;
      }
    }
    /* console.log(errorText); */
    /* console.log(typeof errorText); */
    return errorText;
  }
  /* The method below returns a boolean showing if the current type is a value
     passed by the caller. This method returns true, if the current type is the
     value passed by the caller. This methods returns false, if the current type
     is not equal to the value passed by the caller. */
  isTypeExpected(expectedType) {
    /* Check for the type field */
    if (this.associatedWidgets.hasOwnProperty('type') == false)
      return false;
    /* Check if the type value has a value */
    if (this.associatedWidgets.type.hasOwnProperty('selectValue') == false)
      return false;
    /* Get the current type */
    let currentType = this.associatedWidgets.type.selectValue;
    return (expectedType == currentType);
  }
  /* The method below returns a boolean showing if a widget should be displayed
     or not. Note that if a widget is not displayed, then we probably don't
     care about any error text associated with that widget. */
  isWidgetDisplayed(passedWidget) {
    /* If the widget passed by the caller is not empty, then it is always
       displayed */
    if (passedWidget.isEmpty() === false)
      return true;
    let widgetTypeArray = [];
    /* Build an associative array of widgets indexed by the
       type each widget was built for. This array is used below
       to determine if XPath search information and/or find values
       should be displayed. */
    for (let i = 0; i < this.widgetsArray.length; i++) {
      let currentWidget = this.widgetsArray[i];
      let currentType = currentWidget.getTypeValue();
      widgetTypeArray[currentType] = currentWidget;
    }
    /* Get the type of the widget passed by the caller */
    let passedType = passedWidget.getTypeValue();
    /* Check if are handling the CSS selector widget. This widget is
       displayed if the XPath, finds and node identifier widgets are
       empty. */
    if (passedType === 'cssinfo') {
      if (widgetTypeArray['xpathinfo'].isEmpty() === true &&
          widgetTypeArray['findinfo'].isEmpty() === true &&
          widgetTypeArray['nodeiden'].isEmpty() === true)
        return true;
      else
        return false;
    }
    /* Check if are handling the XPath search widget. This widget is
       displayed if the CSS selector, finds and node identifier widgets
       are empty. */
    if (passedType === 'xpathinfo') {
      if (widgetTypeArray['cssinfo'].isEmpty() === true &&
          widgetTypeArray['findinfo'].isEmpty() === true &&
          widgetTypeArray['nodeiden'].isEmpty() === true)
        return true;
      else
        return false;
    }
    /* Check if are handling the find information widget. This widget is
       displayed if the CSS selector, XPath, and node identifier widgets
       are empty. */
    if (passedType === 'findinfo') {
      if (widgetTypeArray['cssinfo'].isEmpty() === true &&
          widgetTypeArray['xpathinfo'].isEmpty() === true &&
          widgetTypeArray['nodeiden'].isEmpty() === true)
        return true;
      else
        return false;
    }
    /* Check if are handling the node identifier widget. This widget is
       displayed if the CSS selector, XPath, and find information widgets
       are empty. */
    if (passedType === 'nodeiden') {
      if (widgetTypeArray['cssinfo'].isEmpty() === true &&
          widgetTypeArray['xpathinfo'].isEmpty() === true &&
          widgetTypeArray['findinfo'].isEmpty() === true)
        return true;
      else
        return false;
    }
    return true;
  }
  /* The next method returns the number (actually an index starting from zero)
     of the last HTML element selection widget. The number of HTML elememt
     selection widgets may be zero or it may be greater than zero. */
  lastElementSelection() {
    let lastNumber = -1;
    /* Scan all of the widgets. Find the last HTML element selection widget. */
    for (let i = 0; i < this.widgetsArray.length; i++) {
      let currentWidget = this.widgetsArray[i];
      if (currentWidget.isElementSelection() == false)
        continue;
      lastNumber = i;
    }
    return lastNumber;
  }
  /* The next method does all of the work of displaying all of the widgets
     in the current container. First, any old information is removed. Then
     each widget is rendered and the widget description is displayed. */
  render(parentDescriptionId, parentValueId) {
    let visitTypeExpected = this.isTypeExpected('visit');
    /* Remove any existing widget fields */
    HDLmMod.removeEntries();
    for (let i = 0; i < this.widgetsArray.length; i++) {
      let currentWidget = this.widgetsArray[i];
      /* Skip all of the selection widgets if the current type 
         is visit. Visit modifications are not associated with
         any particular DOM node. */ 
      if (currentWidget.isElementSelection() && visitTypeExpected == true)
        continue;
      /* Skip the current widget, if the current widget is not displayed */
      if (this.isWidgetDisplayed(currentWidget) === false)
        continue;
      let newElement = currentWidget.render(parentValueId);
      /* Get the position of the new element */
      let newPosition = $(newElement).position();
      /* Display the description text */     
      if (HDLmGlobals.activeEditorType != HDLmEditorTypes.gem &&
          HDLmGlobals.activeEditorType != HDLmEditorTypes.gxe &&
          HDLmGlobals.activeEditorType != HDLmEditorTypes.simple) {
        let newPositionTop = newPosition.top;
        if (currentWidget.hasOwnProperty('topMargin'))
          newPositionTop += currentWidget.topMargin;
        HDLmMod.displayFieldDescription(parentDescriptionId,
                                        currentWidget.getDescription(),
                                        newPositionTop);
      }
    }
    /* Display the first (if any) error text message, set as
       part of the render process. This step will also clear
       any error text message left over from the rendering of
       a different modification. */
    this.displayErrorText();
  }
  /* This routine resets a container widget instance. Reset means
     resetting the various widget arrays and doing any other work
     needed to reset a container widget instance. */
  resetInstance() {
    this.widgetsArray = [];
    this.associatedWidgets = [];
  }
  /* This method sets the error text field of the current widget to whatever
     error text value was passed by the caller. The error text value passed
     by the caller may or may not be an empty string. */
  setErrorText(newErrorText) {
    /* Make sure the error text string is actually a string */
    if (typeof newErrorText != 'string') {
      let errorText = 'NewErrorText passed to setErrorText is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the error text string */
    this.errorText = newErrorText;
  }
}
/* The HDLmGridWidget class is used to create grid widgets. Grid widgets
   are used to display a grid of values with headings for each column.
   The grid of values may or may not be editable. The grid of values
   may or may not be extended. Some grids allow new entries to be added.
   Other grids do not. Some grids are kept in sorted order. Other grids
   are not kept in sorted order. */
class HDLmGridWidget {
  /* Build an HTML grid widget class instance */
  constructor() {
    let argsLen = arguments.length;
    /* The next field is a reference to the container widget
       or a null value */
    this.containerWidget = null;
    this.options = Object.assign({}, HDLmGridWidgetOptions);
    /* The current widget is assumed not be be read-only. This
       may be changed later. */
    this.readOnly = false;
    /* The next field contains a reference to the input callback
       function. This function is invoked whenever an input event
       occurs for the current widget. The value in the widget is
       a copy of the original value. */
    this.inputCallback = null;
    /* The value below is used as the field description. Initially
       this field is set to an empty string. It can be set to an
       actual value by the constructor or by other code. */
    this.description = '';
    /* The array below is used as a copy of the orginal grid of values.
       In other words, a copy of each value is placed in the array below.
       Changing this array will not change the original grid of values.
       Each value is (essentially) one row of grid data. */
    this.gridValues = [];
    /* The next field contains a reference to the redraw callback function.
       This function is invoked whenever the widget object must be redrawn.
       This will typically happen when the contents have changed. */
    this.redrawCallback = null;
    /* The next field contains a reference to the full redraw callback function.
       This function is invoked whenever the widget object must be fully redrawn.
       This will typically happen when the contents have changed and the modification
       must be fully redrawn. */
    this.fullRedrawCallback = null;
    /* The next field contains a reference to the update callback function.
       This function is invoked whenever the data values in the current widget
       object are updated. This function is used to update the actual data
       values after the values in widget are changed. The values in the widget
       are copies of the original values. The update callback routine is only
       invoked if the grid values are valid. Callback routines are never called
       if the updated value(s) is/are invalid. */
    this.updateCallback = null;
    /* The next field contains a reference to the key down (key press) callback
       function. This function is invoked sometimes when a key is pressed for
       the current widget. This function is used to handle the key press event
       in some cases. Note that not all key press events are passed to this
       callback function. The actual code must be checked to determine which
       key press events are passed to this callback function. */
    this.keyDownCallback = null;
    /* The array below is the information about the grid. Each array entry
       provides information about one column of the grid. This information
       is provided by the caller. The number of columns in the array below
       will be the same as the number of columns in the grid. */
    this.gridInfo = [];
    /* The next set of fields contain the type and sub type of the data the
       current widget is displaying. These fields are set when the current
       widget is created. These fields can be queried at any time. */
    this.dataType = null;
    this.subType = null;
    /* A set of fields are used to keep track of error information for the current
       grid of values (data rows). The call below (re)sets all of the error information
       fields. Separate error text fields exist for the new data entry fields (which may
       or may not exist) and each of the grid values (data rows). There is also an
       overall error text field for all of the grid values (data rows). */
    this.resetErrorText(HDLmTextResetTypes.all);
    let argNum = 0;
    /* Check if the invoker of the constructor passed the container widget */
    if (argsLen >= ++argNum)
      this.setContainerWidget(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed any options */
    if (argsLen >= ++argNum)
      this.setOptions(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an input
       callback function. This function will be called whenever
       an input event occurs for the current widget. */
    if (argsLen >= ++argNum)
      this.setInputCallback(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed a description */
    if (argsLen >= ++argNum)
      this.setDescriptionValue(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed any values */
    if (argsLen >= ++argNum)
      this.setGridValues(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an update
       redraw callback function. This function will be called
       whenever that current widget must be redrawn because the
       contents have changed. */
    if (argsLen >= ++argNum)
      this.setRedrawCallback(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an update
       callback function. This function will be called whenever
       the data values in current widget have been changed. The
       update callback routine is only invoked if the grid values
       are valid. Callback routines are never called if the updated
       value(s) is/are invalid. */
    if (argsLen >= ++argNum)
      this.setUpdateCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a key down
       (key press) callback function. This function may or may not
       be called whenever a key press event occurs for the current
       widget. The actual code must be checked to determine if this
       routine will be invoked for a given key press event. */
    if (argsLen >= ++argNum)
      this.setKeyDownCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed any information
       about the grid. This information is an array with one entry for
       each column in the grid. */
    if (argsLen >= ++argNum)
      this.setGridInfo(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a type value.
       The type value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a sub type value.
       The subtype value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setSubTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a full redraw
       callback function. This function will be called whenever the
       current widget must be fully redrawn because the contents have
       changed. */
    if (argsLen >= ++argNum)
      this.setFullRedrawCallback(arguments[argNum - 1]);
    /* Generate a new unique id value (note the use of lower case)
       for the new HTML elements. Associate the new unique id value
       with the current class instance. */
    this.newUnique = HDLmUtility.generateId();
  }
  /* This class instance method is invoked to add the contents of the
     new entry fields to the array of values. This method can be triggered
     by pressing enter in any of the new entry fields. In all cases, the
     goal is to take the contents of the new entry fields and construct an
     object from them. The object is then added to the values of the current
     grid widget. Of course, we will not add the contents of the new entry
     fields to the array of values in the grid widget, if they (the new
     entry fields) are invalid. The actual grid values will only be updated
     using the update callback if all of the values in the grid widget are
     valid. */
  addNewEntry(target) {
    let rvStr = '';
    /* Get the target id value (note the use of lower case) associated
       with the new entry fields */
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 6);
    /* We need to access and combine the values of several field
       to construct the new data object. Locate and process each
       of these fields. Note that the new entry fields are always
       in row zero. */
    let newValues = this.widgetGetRow(targetIdBase, 0);
    /* Check if the new value fields are valid or not. If the new value
       fields are not valid, we will just ignore them for now. Note that
       an empty new value is probably invalid. Note that we really do want
       to use the standard check input routine here. Empty values are not OK
       for adding to the list of values in general. */
    let subType = this.options.subType;
    let errorObj = this.checkInput(subType, newValues);
    if (errorObj.errorCount > 0)
      return rvStr;
    /* We need to update the actual array of values at this point.
       This is done in two places. First the grid widget is updated.
       However, we also need to update the actual array of values.
       The grid widget contains a copy of the original values. */
    this.gridValues.unshift(newValues);
    /* At this point we may need to update the some of the error
       text information for the current widget. The grid of values
       may have been empty before the current new value was added.
       This causes a specific error message that we need to clear. */
    if (this.gridValues.length == 1) {
      this.errorTextGridOverall = '';
      this.containerWidget.displayErrorText();
    }
    /* Check if the values need to be kept sorted or not */
    if (this.options.keepSorted == true)
      this.gridValues.sort();
    /* The call below will only update the actual grid data if all
       of the grid values are valid */
    let updateRvStr = this.updateGridValues(0);
    if (updateRvStr == 'finished')
      rvStr = 'noredraw';
    /* Clear the contents of the new entry fields. The details
       of clearing any existing content depend on the type of
       data we are dealing with. */
    this.widgetSetRow(targetIdBase, 0, '');
    /* Force the current node to be redrawn unless we don't
       want it to be redrawn for some reason */
    if (rvStr != 'noredraw') {
      let typeOfFullRedrawCallback = typeof(this.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined')
        this.fullRedrawCallback();
    }
    return rvStr;
  }
  /* This method checks an error object for any error text messages.
     Empty error text messages are ignored. The first actual error
     text message is returned to the caller. If no actual error text
     message is found, then an empty string will be returned to the
     caller. */
  checkErrorObj(errorObj) {
    let errorText = '';
    for (let i = 0; i < errorObj.errorTexts.length; i++) {
      if (errorText != '')
        break;
      errorText = errorObj.errorTexts[i];
    }
    return errorText;
  }
  /* This class instance method is invoked to validate a set of fields.
     The caller provids the type of the fields and the field values.
     This routine checks each field and returns a set of error
     information to the caller.

     The error information is returned using an object. The object
     contains an error count with the total number of errors detected
     and an error array with an entry for each field. The error array
     entries have the error text for each field.

     In other words, if there were three fields and the first and third
     were invalid, then the error count would be two. The first and third
     entries in the error array would have error text messages and the
     second entry would have an empty string.

     Note that this routine does not implement the rule that empty fields
     are considered to be valid for display purposes (but not for updating
     the grid values or the actual data values). This rule is handled by a
     separate routine. This is the core validation routine. Other routines
     can be layered on top of it.

     This class instance method effectively validates one value (or stated
     differently one data row). If more than one row exists (which is common),
     then this routine must be invoked for each row. */
  checkInput(subType, value) {
    let valueCopy = Object.assign({}, value);
    let valueKeys = Object.keys(valueCopy);
    for (let key of valueKeys) {
      let keyTypeOf = typeof key;
      valueCopy[key] = valueCopy[key].trim();
    }
    let errorObj = HDLmMod.checkFindInformation(subType, valueCopy);
    return errorObj;
  }
  /* This is a special version of the check input routine. This
     method treats empty fields as valid, even if the low-level
     check input routine does not. */
  checkInputEmpty(subType, value) {
    let errorObj = this.checkInput(subType, value);
    let valueKeys = Object.keys(value);
    for (let i = 0; i < valueKeys.length; i++) {
      let valueKey = valueKeys[i];
      if (value[valueKey] == '' &&
          errorObj.errorTexts[i] != '') {
        errorObj.errorTexts[i] = '';
        errorObj.errorCount--;
      }
    }
    return errorObj;
  }
  /* This static method is invoked when an input event occurs. An
     input event occurs whenever an input field is changed in any
     way. This includes the new entry fields and the fields that
     display actual grid data. */
  static eventInput(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log(`Fancytree event DOM HDLmGridWidget Input Type (${event.inputType})`);
    /* Check for an input event we need to ignore. Strangely enough this
       input event occurs even after the widget is removed /delete. Why
       is not clear. */
    if (event.inputType == 'historyRedo' ||
        event.inputType == 'historyUndo')
      return;
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 6);
    let gridWidgetCurrent = HDLmWidgetMap[targetIdBase];
    let targetIndexRowVal = targetId.substr(targetId.length-6,3);
    targetIndexRowVal = Number(targetIndexRowVal);
    let subType = gridWidgetCurrent.options.subType;
    /* Check the row of modified fields. These may be the new entry
       fields or the fields of one of the grid values. In all cases,
       check the modified fields and set the validity values for
       each field. */
    let newValue = gridWidgetCurrent.widgetGetRow(targetIdBase, targetIndexRowVal);
    let errorObj;
    /* Note that we use a different error checking routine depending on
       whether the input event was for the new data row or some other row.
       Empty values are OK for the new data row. However, the actual rows
       must have some information in them. */
    if (targetIndexRowVal == 0)
      errorObj = gridWidgetCurrent.checkInputEmpty(subType, newValue);
    else
      errorObj = gridWidgetCurrent.checkInput(subType, newValue);
    gridWidgetCurrent.widgetSetRowValidity(targetIdBase, targetIndexRowVal, errorObj);
    /* Store the error text value. The error text may or may not be
       an empty string. Invoke the display error text method on the
       container widget to update the displayed error text. */
    let errorText = gridWidgetCurrent.checkErrorObj(errorObj);
    if (targetIndexRowVal == 0)
      gridWidgetCurrent.errorTextGridNewRow = errorText;
    else
      gridWidgetCurrent.errorTextGridRows[targetIndexRowVal - 1] = errorText;
    gridWidgetCurrent.inputCallback();
    /* Update the data inside the grid widget, unless we are handling
       the new entry fields */
    if (targetIndexRowVal != 0)
      gridWidgetCurrent.gridValues[targetIndexRowVal - 1] = newValue;
    /* The call below will only update the actual grid data if all
       of the grid values are valid */
    gridWidgetCurrent.updateGridValues(targetIndexRowVal);
  }
  /* This static method is invoked by the pressing of any key. Of course,
     we really only want to handle the Delete, Enter, and Escape keys. */
  static eventKeyDown(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log('Fancytree event DOM HDLmGridWidget KeyDown');
    let key = event.key;
    /* Check for the Delete key */
    if (key === "Delete") {
      HDLmGridWidget.eventKeyDownDelete(event);
      return;
    }
    /* Check for the Enter key */
    if (key === "Enter") {
      HDLmGridWidget.eventKeyDownEnter(event);
      return;
    }
    /* Check for the Escape key */
    if (key === "Escape") {
      HDLmGridWidget.eventKeyDownEscape(event);
      return;
    }
  }
  /* This static method is invoked by the pressing of the Delete key.
     This method is actually called out of the more general key down
     routine. */
  static eventKeyDownDelete(event) {
    let key = event.key;
    if (key !== "Delete") {
      let errorText = 'Event passed to the Delete routine does not have the Delete key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 6);
    let gridWidgetCurrent = HDLmWidgetMap[targetIdBase];
    /* Check if delete is enabled for the current grid widget. Just
       return to the caller if delete is not enabled for the current
       grid widget. */
    if (gridWidgetCurrent.options.delete == false)
      return;
    let targetIndexRowVal = targetId.substr(targetId.length - 6, 3);
    targetIndexRowVal = Number(targetIndexRowVal);
    /* Check for an index value of zero. This is actually the
       new entry area. Just delete any contents in this case.
       The details of deleting any existing contents depending
       on the type of data we are dealing with. Generally we
       can just clear the field. */
    if (targetIndexRowVal == 0) {
      let widgetSetRowValueEmpty = '';
      gridWidgetCurrent.widgetSetRow(targetIdBase, targetIndexRowVal, widgetSetRowValueEmpty);
      let setRowValidityErrorObjNull = null;
      gridWidgetCurrent.widgetSetRowValidity(targetIdBase, targetIndexRowVal, setRowValidityErrorObjNull);
      gridWidgetCurrent.resetErrorTextGridNewRow();
      gridWidgetCurrent.inputCallback();
      return;
    }
    /* We need to update the actual array of values at this point.
       This is done in two places. First the grid widget is updated.
       However, we also need to update the actual array of values.
       The grid widget contains a copy of the original values. */
    gridWidgetCurrent.gridValues.splice(targetIndexRowVal - 1, 1);
    /* Since we are deleting an actual row, we should also delete
       the corresponding error text row. The code below actually
       does this. */
    gridWidgetCurrent.errorTextGridRows.splice(targetIndexRowVal - 1, 1);
    /* The call below will only update the actual grid data if all
       of the grid values are valid */
    gridWidgetCurrent.updateGridValues(-1);
    /* Force the current node to be redrawn */
    {
      let typeOfFullRedrawCallback = typeof(gridWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined')
        gridWidgetCurrent.fullRedrawCallback();
    }
  }
  /* This static method is invoked by the pressing of the Enter key.
     This method is actually called out of the more general key down
     routine. Enter is generally ignored. However, if enter is used
     with the new entry fields, then we need to add the new entry fields
     to the grid of values and clear the new entry fields. Of course, we
     need to make sure the new entry fields are valid. */
  static eventKeyDownEnter(event) {
    let key = event.key;
    if (key !== "Enter") {
      let errorText = 'Event passed to the Enter routine does not have the Enter key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 6);
    let gridWidgetCurrent = HDLmWidgetMap[targetIdBase];
    let targetIndexRowVal = targetId.substr(targetId.length - 6, 3);
    targetIndexRowVal = Number(targetIndexRowVal);
    /* Check for an index value of zero. This is actually one of the
       new entry fields. Use the value of the new entry fields to build
       a new data object. Add the new data object to the array of data
       values. In other words, add the contents of the new entry fields
       to the array of values as the first entry. This is only done if
       the new entry fields are valid. */
    if (targetIndexRowVal == 0)
      gridWidgetCurrent.addNewEntry(target);
  }
  /* This static method is invoked by the pressing of the Escape key.
     This method is actually called out of the more general key down
     routine. Escape is generally ignored. However, if escape is used
     while a new tree entry is being created, then we need to cancel
     creating/adding the new tree entry. */
  static eventKeyDownEscape(event) {
    let key = event.key;
    if (key !== "Escape") {
      let errorText = 'Event passed to the Escape routine does not have the Escape key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 6);
    let gridWidgetCurrent = HDLmWidgetMap[targetIdBase];
    /* Invoke the key down (key press) callback routine with the
       current event value. The key down callback routine will
       decide what to do with the current event. */
    gridWidgetCurrent.keyDownCallback(event);
  }
  /* This instance method returns the widget description to the caller */
  getDescription() {
    return this.description;
  }
  /* This instance method returns the overall widget error text for the current
     widget. This is a multi-stage process. The first step is to scan the grid
     row error text array for any error messages. The new entry fields also have
     an error text field associated with them. */
  getErrorText() {
    let errorText = '';
    let errorTextFromGrid = '';
    /* Scan the array of grid error text fields looking for a non-empty value */
    let gridLength = this.errorTextGridRows.length;
    for (let i = 0; i < gridLength; i++) {
      errorTextFromGrid = this.errorTextGridRows[i];
      if (errorTextFromGrid != '')
        break;
    }
    /* Set the final overall error text value */
    if (errorText == '')
      errorText = this.errorTextGridNewRow;
    if (errorText == '')
      errorText = errorTextFromGrid;
    if (errorText == '')
      errorText = this.errorTextGridOverall;
    return errorText;
  }
  /* This instance method returns the widget type value to the caller.
     The widget type value was set when the widget was created. */
  getTypeValue() {
    return this.dataType;
  }
  /* This method returns a boolean value showing if the current
     widget is an HTML element selection widget or not. The widget
     options must be checked to determine this value. */
  isElementSelection() {
    return this.options.elementSelection;
  }
  /* This method returns a boolean value showing if the value for the
     current widget is empty or not. A grid widget is considered to be
     empty if the value is a null or the grid array has zero rows. */
  isEmpty() {
    return this.gridValues === null || this.gridValues.length === 0;
  }
  /* This method returns a number padded on the left with zeros.
     The caller provides the original number and the final desired
     size of the number. This routine builds the padded number and
     returns it to the caller. */
  static padZeros(inNumber, finalSize) {
    let tempStr = "0000000000" + inNumber;
    tempStr = tempStr.substr(-finalSize);
    return tempStr;
  }
  /* This method actually adds a grid widget to an HTML web page.
     The caller provides the DOM element the grid widget should be
     added to. This method returns the new DOM element to the caller. */
  render(parentId) {
    /* Make sure the parent ID is a string */
    if (typeof parentId != 'string') {
      let errorText = 'ParentId passed to render is not a string';
      HDLmAssert(false, errorText);
    }
    let newData;
    let newElementGrid;
    let newUniqueGridInput = [];
    HDLmWidgetMap[this.newUnique] = this;
    /* Clear the error text fields. At the beginning of a render operation
       we have no (non-empty) error text information. The code below detects
       errors in various places and sets the error text information as need be. */
    this.resetErrorText(HDLmTextResetTypes.partial);
    /* Build the grid column headings. The grid column headings
       are text fields. They can not be modified and they have
       no events associated with them. The column headings are
       not really a table. However, a table is used because it
       looks nice in a browser. */
    if (this.options.newEntry) {
      let newText = '';
      newText += '<div>';
      newText += '<table>';
      newText += '<tr>'
      for (let i = 0; i < this.gridInfo.length; i++) {
        newText += '<th>'
        newText += '<input type=text';
        newText += ' style="font-weight:bold;font-family:monospace;"';
        newText += ' size="';
        newText += this.gridInfo[i].size;
        newText += '"';
        newText += ' value="';
        newText += this.gridInfo[i].name;
        newText += '"';
        newText += ' readonly';
        newText += '/>';
        newText += '</th>'
      }
      newText += '</tr>';
      newText += '</table>';
      newText += '</div> ';
      /* Create a new jQuery array and a new DOM element from the generated HTML */
      let newJQArray = $(newText);
      let newElement = newJQArray[0];
      newElementGrid = newElement;
      /* Add the new jQuery array to the values div */
      $(parentId).append(newJQArray);
    }
    /* Get the number of values. This is really the number of rows of
       data in the grid. */
    let valuesLength = this.gridValues.length;
    /* Create a set of entries for creating new entries, if need
       be. Note that a separate entry is created for each column.
       The input area or areas are not really a table. However,
       a table is used because it looks nice in a browser. */
    if (this.options.newEntry) {
      let newText = '';
      /* Check what type of input fields we should create here.
         Normally we create an input text fields. */
      newText += '<div>';
      newText += '<table>';
      newText += '<tr>';
      for (let i = 0; i < this.gridInfo.length; i++) {
        newText += '<td>';
        newText += '<input type=text';
        newText += ' style="font-family:monospace;"';
        /* Turn autocomplete on */
        newText += ' autocomplete="on"';
        /* Disable the spell checker, if need be */
        if (this.options.spellCheck == false)
          newText += ' spellcheck="false"';
        newText += ' placeholder="';
        newText += this.gridInfo[i].placeHolderText;
        newText += '"';
        newText += ' size="';
        newText += this.gridInfo[i].size;
        newText += '"';
        /* Add the new unique id (note the use of lower case) value */
        newText += ' id="';
        let newUniqueValue = this.newUnique + HDLmGridWidget.padZeros(0, 3) + HDLmGridWidget.padZeros(i, 3);
        newText += newUniqueValue;
        newUniqueGridInput.push(newUniqueValue);
        newText += '"';
        newText += '/>';
        newText += '</td>';
      }
      newText += '</tr>';
      newText += '</table>';
      newText += '</div> ';
      /* Create a new jQuery array and a new DOM element from the generated HTML */
      let newJQArray = $(newText);
      let newElement = newJQArray[0];
      /* Add the new jQuery array to the values div */
      $(parentId).append(newJQArray);
      /* Add a set of listeners to the outer div. This has the effect
         of adding the listeners to everything inside the div. */
      newElement.addEventListener('input', HDLmGridWidget.eventInput);
      newElement.addEventListener('keydown', HDLmGridWidget.eventKeyDown);
    }
    /* Display a grid of text or other values. The outer loop builds
       the rows. The inner loop builds the columns. This really is a
       table. The number of rows can be zero, one, or more than one. */
    let newText = '';
    newText += '<div>';
    newText += '<table>';
    for (let i = 0; i < valuesLength; i++) {
      newText += '<tr>';
      for (let j = 0; j < this.gridInfo.length; j++) {
        newText += '<td>';
        newText += '<input type=text';
        newText += ' style="font-family:monospace;"';
        newText += ' size="';
        newText += this.gridInfo[j].size;
        newText += '"';
        /* Disable the spell checker, if need be */
        if (this.options.spellCheck == false)
          newText += ' spellcheck="false"';
        /* Set the read only attribute, if need be */
        if (this.options.editable == false ||
            this.readOnly == true)
          newText += ' readonly';
        /* Add the new unique id (note the use of lower case) value */
        newText += ' id="';
        newText += this.newUnique + HDLmGridWidget.padZeros((i+1), 3) + HDLmGridWidget.padZeros(j, 3);
        newText += '"';
        /* Add the actual value. Note that double quotes are replaced
           with an escape sequence that should work. */
        newText += ' value="';
        newData = this.gridValues[i][this.gridInfo[j].source];
        newData = HDLmString.replaceAll(newData, '"', '&quot;');
        newText += newData;
        newText += '"/>';
        newText += '</td>';
      }
      newText += '</tr> ';
    }
    newText += '</table>';
    newText += '</div> ';
    /* Create a new jQuery array and a new DOM element from the generated HTML */
    let newJQArray = $(newText);
    let newElement = newJQArray[0];
    /* Add the new jQuery array to the values div */
    $(parentId).append(newJQArray);
    /* Add a set of listeners to the outer div. This has the effect
       of adding the listeners to everything inside the div. */
    if (this.options.editable == true)
      newElement.addEventListener('input', HDLmGridWidget.eventInput);
    /* Add the key down event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('keydown', HDLmGridWidget.eventKeyDown);
    /* Set the field validity information for each row. Note that
       the number of rows (data rows) may be zero. This is a separate
       error condition. */
    let subType = this.options.subType;
    for (let i = 0; i < valuesLength; i++) {
      let errorObj = this.checkInput(subType, this.gridValues[i]);
      this.widgetSetRowValidity(this.newUnique, i + 1, errorObj);
      let errorText = this.checkErrorObj(errorObj);
      this.errorTextGridRows.push(errorText);
    }
    /* Check if the number of values was is zero. This is a separate
       error. The number of values (data rows) must be non-zero. Report
       an error if the number of values (data rows) is actually zero.
       Note that we also check a flag here. In some cases, not having
       any rows is actually OK. */
    if (valuesLength == 0 && this.options.emptyFieldOk == false) {
      let errorText;
      errorText = 'No ' + HDLmString.ucFirst(subType) + ' information exists';
      /* console.log(1524); */
      this.errorTextGridOverall = errorText;
    }
    return newElementGrid;
  }
  /* This method resets all of the error text fields of the current widget
     to empty values. This step is required in several places. This step
     is required as part of widget construction and widget rendering. */
  resetErrorText(resetType) {
    if (resetType == HDLmTextResetTypes.all)
      this.errorTextGridNewRow = '';
    this.errorTextGridRows = [];
    this.errorTextGridOverall = '';
  }
  /* This method resets the error text field for the new fields (which may or may
     not exist) back to an empty string. This step is required when the delete key
     is used with the new fields. The delete key causes the new fields to be reset
     to empty values. The error text field for the new values must be reset as well. */
  resetErrorTextGridNewRow() {
    this.errorTextGridNewRow = '';
  }
  /* This method is used to set the parent container widget value of a grid
     widget. The value passed by the caller is copied into the grid widget.
     Note that the actual value is copied. */
  setContainerWidget(parentContainerWidget) {
    /* Make sure the parent container widget is really an object */
    if (typeof parentContainerWidget != 'object') {
      let errorText = 'ParentContainerWidget passed to setContainerWidget is not an object';
      HDLmAssert(false, errorText);
    }
    /* Copy the parent container widget reference */
    this.containerWidget = parentContainerWidget;
  }
  /* This method is used to set the description text for the current widget.
     The value passed to this routine must be a string. An error is reported
     if the value passed to this routine is not a string. */
  setDescriptionValue(descriptionValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(descriptionValue) == true) {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof descriptionValue != 'string') {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the description value */
    this.description = descriptionValue;
  }
  /* This method can be used to save a reference to the caller full
     redraw callback function. The full redraw callback function is
     invoked whenever the widget must be fully redrawn. This will
     typically happen whenever the contents of the widget have
     changed and the modification must be completely redrawn. */
  setFullRedrawCallback(newFullRedrawCallback) {
    /* Make sure the full redraw callback function is really a function */
    if (newFullRedrawCallback != null && typeof newFullRedrawCallback != 'function') {
      let errorText = 'NewFullRedrawCallback passed to setFullRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.fullRedrawCallback = newFullRedrawCallback;
  }
  /* This method is used to save the information about the grid. The
     caller passes an array of values. Each value is the array provides
     information about one column of the grid. The number of entries in
     the array is the same as the number of columns in the grid.

     The values passed by the caller are copied into the grid information
     array that is part of the graid widget. Note that the actual values
     are copied. Array assignment is normally by reference. This code
     actually copies the values. */
  setGridInfo(newGridInfo) {
    /* Make sure the arguments are an array */
    if (Array.isArray(newGridInfo) != true) {
      let errorText = 'NewGridInfo passed to setGridInfo method is not an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure each piece of grid information is an object */
    let newGridLength = newGridInfo.length;
    for (let i = 0; i < newGridLength; i++) {
      let gridInfo = newGridInfo[i];
      /* Make sure the piece of grid information is an object */
      if (typeof gridInfo != 'object') {
        let errorText = 'Value (' + i + ') passed to setGridInfo method is not an object';
        HDLmAssert(false, errorText);
      }
    }
    /* Copy the grid information values */
    this.gridInfo = newGridInfo.slice();
  }
  /* This method is used to set the values of a grid widget. The values
     passed by the caller are copied into the grid widget. Note that the
     actual values are copied. Array assignment is normally by reference.
     This code actually copies the values. */
  setGridValues(newGridValues) {
    /* Make sure the arguments are an array */
    if (Array.isArray(newGridValues) != true) {
      let errorText = 'NewGridValues passed to setGridValues method are not an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure each grid value is an object */
    let newGridLength = newGridValues.length;
    for (let i = 0; i < newGridLength; i++) {
      let gridValue = newGridValues[i];
      /* Make sure the grid value is an object */
      if (typeof gridValue != 'object') {
        let errorText = 'Value (' + i + ') passed to setGridValues method is not an object';
        HDLmAssert(false, errorText);
      }
    }
    /* Copy the values and then sort them if need be */
    this.gridValues = newGridValues.slice();
    if (this.options.keepSorted == true)
      this.gridValues.sort();
  }
  /* This method can be used to save a reference to the caller
     input callback function. The input callback function is
     invoked whenever an input event occurs for the current
     widget. */
  setInputCallback(newInputCallback) {
    /* Make sure the input callback function is really a function */
    if (typeof newInputCallback != 'function') {
      let errorText = 'NewInputCallback passed to setInputCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.inputCallback = newInputCallback;
  }
  /* This method can be used to save a reference to the caller key
     down (key press) callback funtion. The key press callback function
     is invoked (may be invoked) when a key press event occurs for the
     current widget. This callback routine is used to handle the key
     press event. */
  setKeyDownCallback(newKeyDownCallback) {
    /* Make sure the key down callback function is really a function */
    if (typeof newKeyDownCallback != 'function') {
      let errorText = 'NewKeyDownCallback passed to setKeyDownCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.keyDownCallback = newKeyDownCallback;
  }
  /* This method can be used to set any number of options. The
     options passed by the caller will override any existing
     options (which may or may not be default values). */
  setOptions(newOptions) {
    /* Make sure the new options are an object */
    if (typeof newOptions != 'object') {
      let errorText = 'NewOptions passed to setOptions method are not an object';
      HDLmAssert(false, errorText);
    }
    let keys = Object.keys(newOptions);
    let keyLen = keys.length;
    for (let i = 0; i < keyLen; i++) {
      let currentKey = keys[i];
      if (this.options.hasOwnProperty(currentKey) == false) {
        let errorText = 'Property (' + currentKey + ') does not exist in options';
        HDLmAssert(false, errorText);
      }
      this.options[currentKey] = newOptions[currentKey];
    }
  }
  /* This method can be used to save a reference to the caller
     redraw callback function. The redraw callback function is
     invoked whenever the widget must be redrawn. This will
     typically happen whenever the contents of the widget have
     changed. */
  setRedrawCallback(newRedrawCallback) {
    /* Make sure the redraw callback function is really a function */
    if (typeof newRedrawCallback != 'function') {
      let errorText = 'NewRedrawCallback passed to setRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.redrawCallback = newRedrawCallback;
  }
  /* This method is used to set the sub type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setSubTypeValue(subTypeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(subTypeValue) == true) {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof(subTypeValue) != 'string') {
      let errorText = 'SubTypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the sub type value */
    this.subType = subTypeValue;
  }
  /* This method is used to set the type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setTypeValue(typeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(typeValue) == true) {
      let errorText = 'TypeValue passed to setTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof typeValue != 'string') {
      let errorText = 'TypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the type value */
    this.dataType = typeValue;
  }
  /* This method can be used to save a reference to the caller
     update callback function. The update callback function is
     invoked whenever the data values in the widget have been
     changed. This callback is used to update the actual data
     values. The data values in the widget are just copies of
     the original data values. The update callback routine is
     only invoked if the grid values are valid. Callback routines
     are never called if the updated value(s) is/are invalid. */
  setUpdateCallback(newUpdateCallback) {
    /* Make sure the update callback function is really a function */
    if (typeof newUpdateCallback != 'function') {
      let errorText = 'NewUpdateCallback passed to setUpdateCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.updateCallback = newUpdateCallback;
  }
  /* This routine is called to actually update the real values that
     are displayed using the grid widget. The actual values are only
     updated if all of the values in array associated with the grid
     widget are valid. */
  updateGridValues(targetIndexRowVal) {
    let updateRvStr = '';
    /* The actual values should only be updated if all of the values
       in the grid widget are valid. Check all of the values to make
       sure they are valid. We need to use the real input checking
       routine here. Not the one that treats empty fields as valid. */
    let errorTotal = 0;
    let subType = this.options.subType;
    for (let i = 0; i < this.gridValues.length; i++) {
      let errorObj = this.checkInput(subType, this.gridValues[i]);
      errorTotal += errorObj.errorCount;
    }
    if (errorTotal == 0) {
      let noErrors = false;
      if (this.containerWidget.getErrorText() == '')
        noErrors = true;
      updateRvStr = this.updateCallback(this.gridValues, noErrors);
      /* Run the full redraw callback routine - This code was added to do a full redraw.
         We did not do any redraw callback here. This is entirely new code.  This code
         displays the updated last modified date and time (amoung other things). */
      if (targetIndexRowVal != 0) {
        let typeOfFullRedrawCallback = typeof(this.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined')
          this.fullRedrawCallback();
      }
    }
    return updateRvStr;
  }
  /* The next method gets all of the columns of a row and builds
     a new object from the values of the row. In other words, this
     method returns an object that contains the values that are
     actually shown in the web page. These values may have been
     modified by the user. The new object is returned to the
     caller. The base id (note the use of lower case) value
     passed to this routine must be an id value without any
     row or column suffixes.*/
  widgetGetRow(idBase, row) {
    /* Make sure the base id argument is a string */
    if (typeof idBase != 'string') {
      let errorText = 'Base id value passed to widgetGetRow method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the row argument is a valid number */
    if (typeof row != 'number' || row < 0) {
      let errorText = 'Row value passed to widgetGetRow method is invalid';
      HDLmAssert(false, errorText);
    }
    /* We need to access and combine the values of several field
       to construct the new data object. Locate and process each
       of these fields. */
    let newValue = {};
    let newData;
    let source;
    for (let i = 0; i < this.gridInfo.length; i++) {
      newData = HDLmGridWidget.widgetGetValue(idBase, row, i);
      source = this.gridInfo[i].source;
      newValue[source] = newData;
    }
    return newValue;
  }
  /* The next method gets the value of a widget field. In other
     words, this method returns the value that is actually shown
     in the web page. This value may have been modified by the
     user. The value is returned to the caller. The base id value
     passed to this routine must be an id value without any row or
     column suffixes. */
  static widgetGetValue(idBase, row, column) {
    /* Make sure the base id (note the use of lower case) argument is a string */
    if (typeof idBase != 'string') {
      let errorText = 'Base id value passed to widgetGetValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the row argument is a valid number */
    if (typeof row != 'number' || row < 0) {
      let errorText = 'Row value passed to widgetGetValue method is invalid';
      HDLmAssert(false, errorText);
    }
    /* Make sure the column argument is a valid number */
    if (typeof column != 'number' || column < 0) {
      let errorText = 'Column value passed to widgetGetValue method is invalid';
      HDLmAssert(false, errorText);
    }
    let newSelector = '#' + idBase + HDLmGridWidget.padZeros(row, 3) + HDLmGridWidget.padZeros(column, 3);
    let newData = $(newSelector).val();
    return newData;
  }
  /* The next method sets all of the columns of a row to a specific
     value. Of course, the value can be the empty string. In that
     case, the all of the columns of a row will be cleared. Note
     that the data inside the widget is not changed by this method.
     This method does not change the original data either. The value
     passed to this routine is not checked because it can be any value.
     The base id value passed to this routine must be an id value without
     any row or column suffixes.*/
  widgetSetRow(idBase, row, value) {
    /* Make sure the base id (note the use of lower case) argument is a string */
    if (typeof idBase != 'string') {
      let errorText = 'Base id value passed to widgetSetRow method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the row argument is a valid number */
    if (typeof row != 'number' || row < 0) {
      let errorText = 'Row value passed to widgetSetRow method is invalid';
      HDLmAssert(false, errorText);
    }
    /* Set the web page value of a row */
    for (let i = 0; i < this.gridInfo.length; i++) {
      HDLmGridWidget.widgetSetValue(idBase, row, i, value);
    }
  }
  /* Set the field validity values for a row. The row may be the
     new entry fields or it may not be. The caller provides the row
     number and an array of field validity values. The values are
     provided as array of error text messages. The error information
     can be set to null, which shows that no errors are present. Note
     that this routine does not implement the rule that empty fields
     are marked as valid even if they are considered to be invalid by
     the check input routine. The base id value passed to this routine
     must be an id value without any row or column suffixes. */
  widgetSetRowValidity(idBase, row, errorObj) {
    /* Make sure the base id argument is a string */
    if (typeof idBase != 'string') {
      let errorText = 'Base id value passed to widgetSetRowValidity method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the row argument is a valid number */
    if (typeof row != 'number' || row < 0) {
      let errorText = 'Row value passed to widgetSetRowValidity method is invalid';
      HDLmAssert(false, errorText);
    }
    /* Make sure the error information is an object or null */
    if (errorObj != null) {
      if (typeof errorObj != 'object') {
        let errorText = 'Error information passed to widgetSetRowValidity method is not an object';
        HDLmAssert(false, errorText);
      }
    }
    /* Set the validity values for all of the fields of a row */
    for (let column = 0; column < this.gridInfo.length; column++) {
      /* Use jQuery to set find a field using the row and column
         numbers */
      let newSelector = '#' + idBase + HDLmGridWidget.padZeros(row, 3) + HDLmGridWidget.padZeros(column, 3);
      let newElement = $(newSelector)[0];
      let errorText = '';
      if (errorObj != null)
        errorText = errorObj.errorTexts[column];
      newElement.setCustomValidity(errorText);
    }
  }
  /* The next method sets the value of a widget field. In other
     words, this method sets the value that is actually shown
     in the web page. Note that the data inside the widget is
     not changed by this method. This method does not change
     the original data either. The value passed to this routine
     is not checked because it can be any value. The base id value
     passed to this routine must be an id value without any row or
     column suffixes. */
  static widgetSetValue(idBase, row, column, value) {
    /* Make sure the base id (note the use of lower case) argument is a string */
    if (typeof idBase != 'string') {
      let errorText = 'Base id value passed to widgetSetValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the row argument is a valid number */
    if (typeof row != 'number' || row < 0) {
      let errorText = 'Row value passed to widgetSetValue method is invalid';
      HDLmAssert(false, rrorText);
    }
    /* Make sure the column argument is a valid number */
    if (typeof column != 'number' || column < 0) {
      let errorText = 'Column value passed to widgetSetValue method is invalid';
      HDLmAssert(false, errorText);
    }
    /* Use jQuery to set find and set the value of a field. This
       code sets the web page value of a row and a column. The
       widget data is not changed. */
    let newSelector = '#' + idBase + HDLmGridWidget.padZeros(row, 3) + HDLmGridWidget.padZeros(column, 3);
    $(newSelector).val(value);
  }
}
/* The HDLmListWidget class is used to create list widgets. List widgets
   are used to display values. The list of values may or may not be editable.
   The list of values may or may not be have different colors for each entry.
   The list of values may or may not be extended. Some lists allow new entries
   to be added. Other lists do not. */
class HDLmListWidget {
  /* Build an HTML list widget class instance */
  constructor() {
    let argsLen = arguments.length;
    /* The next field is a reference to the current modification
       or a null value */
    this.currentMod = null;
    /* The next field is a reference to the container widget
       or a null value */
    this.containerWidget = null;
    this.options = Object.assign({}, HDLmListWidgetOptions);
    /* The current widget is assumed not be be read-only. This
       may be changed later. */
    this.readOnly = false;
    /* The next field contains a reference to the input callback
       function. This function is invoked whenever an input event
       occurs for the current widget. The value in the widget is
       a copy of the original value. */
    this.inputCallback = null;
    /* The value below is used as the field description. Initially
       this field is set to an empty string. It can be set to an
       actual value by the constructor or by other code. */
    this.description = '';
    /* The array below is used as a copy of the orginal list of values.
       In other words, a copy of each value is placed in the array below.
       Changing this array will not change the original list of values. */
    this.listValues = [];
    /* The next field contains a reference to the redraw callback function.
       This function is invoked whenever the widget object must be redrawn.
       This will typically happen when the contents have changed. */
    this.redrawCallback = null;
    /* The next field contains a reference to the full redraw callback function.
       This function is invoked whenever the widget object must be fully redrawn.
       This will typically happen when the contents have changed and the modification
       must be fully redrawn. */
    this.fullRedrawCallback = null;
    /* The next field contains a reference to the update callback function.
       This function is invoked whenever the data values in the current widget
       object are updated. This function is used to update the actual data
       values after the values in widget are changed. The values in the widget
       are copies of the original values. The update callback routine is only
       invoked if the list values are valid. Callback routines are never called
       if the updated value(s) is/are invalid. */
    this.updateCallback = null;
    /* The next field contains a reference to the key down (key press) callback
       function. This function is invoked sometimes when a key is pressed for
       the current widget. This function is used to handle the key press event
       in some cases. Note that not all key press events are passed to this
       callback function. The actual code must be checked to determine which
       key press events are passed to this callback function. */
    this.keyDownCallback = null;
    /* The next set of fields contain the type and sub type of the data the
       current widget is displaying. These fields are set when the current
       widget is created. These fields can be queried at any time. */
    this.dataType = null;
    this.subType = null;
    /* A set of fields are used to keep track of error information for the current
       list of values (data rows). The call below (re)sets all of the error information
       fields. Separate error text fields exist for the new data entry field (which may
       or may not exist) and each of the list values (data rows). There is also an
       overall error text field for all of the list values (data rows). */
    this.resetErrorText(HDLmTextResetTypes.all);
    let argNum = 0;
    /* Check if the invoker of the constructor passed the current modification */
    if (argsLen >= ++argNum)
      this.setCurrentMod(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed the container widget */
    if (argsLen >= ++argNum)
      this.setContainerWidget(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed any options */
    if (argsLen >= ++argNum)
      this.setOptions(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an input
       callback function. This function will be called whenever
       an input event occurs for the current widget. */
    if (argsLen >= ++argNum)
      this.setInputCallback(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed a description */
    if (argsLen >= ++argNum)
      this.setDescriptionValue(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed any values */
    if (argsLen >= ++argNum)
      this.setListValues(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an update
       redraw callback function. This function will be called
       whenever that current widget must be redrawn because the
       contents have changed. */
    if (argsLen >= ++argNum)
      this.setRedrawCallback(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an update
       callback function. This function will be called whenever
       the data values in current widget have been changed. The
       update callback routine is only invoked if the list values
       are valid. Callback routines are never called if the updated
       value(s) is/are invalid. */
    if (argsLen >= ++argNum)
      this.setUpdateCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a key down
       (key press) callback function. This function may or may not
       be called whenever a key press event occurs for the current
       widget. The actual code must be checked to determine if this
       routine will be invoked for a given key press event. */
    if (argsLen >= ++argNum)
      this.setKeyDownCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a type value.
       The type value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a sub type value.
       The subtype value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setSubTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a full redraw
       callback function. This function will be called whenever the
       current widget must be fully redrawn because the contents have
       changed. */
    if (argsLen >= ++argNum)
      this.setFullRedrawCallback(arguments[argNum - 1]);
    /* Generate a new unique id value (note the use of lower case)
       for the new HTML elements. Associate the new unique id value
       with the current class instance. */
    this.newUnique = HDLmUtility.generateId();
  }
  /* This class instance method is invoked to add the contents of the
     new entry field to the array of values. This method is triggered
     by pressing enter in the new entry field. In all cases, the goal
     is to take the contents of the new entry field and construct a
     value from it. The value is then added to the values of the current
     list widget. Of course, we will not add the contents of the new entry
     field to the array of values in the list widget, if it (the new
     entry field) is invalid. The actual list values will only be updated
     using the update callback if all of the values in the list widget are
     valid.

     This routine is invoked from several places. In some cases, the target
     value is constructed by the browser (indirectly). In other cases, the
     target value is constructed by code. */
  addNewEntry(target) {
    let rvStr = '';
    /* console.log('In HDLmListWidget.addNewEntry'); */
    /* We need to get the contents of the new entry field */
    let newValue = target.value;
    /* We may need to modify the new value at this point. The new value
       may start with 'http:' or (more likely) 'https:'. Of course, this
       is only really true for images. So far images, we change the new
       value in some cases. */
    if (this.options.setImages == true)
      newValue = HDLmUtility.removeUrlPrefixes(newValue);
    /* Check if the new value field is valid or not. If the new value
       field is not valid, we will just ignore it for now. Note that
       an empty new value is probably invalid. We need to use the real
       input checking routihe here. Note that we really do want to use
       the standard check input routine here. Empty values are not OK
       for adding to the list of values in general. */
    let subType = this.options.subType;
    let errorText = this.checkInput(subType, newValue, this.getCurrentMod());
    /* console.log(errorText, subType); */
    if (errorText != '')
      return rvStr;
    /* We need to update the actual array of values at this point.
       This is done in two places. First the list widget is updated.
       However, we also need to update the actual array of values.
       The list widget contains a copy of the original values. */
    this.listValues.unshift(newValue);
    /* console.log(errorText, subType); */
    /* console.log(newValue, this.listValues); */
    /* At this point we may need to update the some of the error
       text information for the current widget. The list of values
       may have been empty before the current new value was added.
       This causes a specific error message that we need to clear. */
    if (this.listValues.length == 1) {
      this.errorTextListOverall = '';
      this.containerWidget.displayErrorText();
    }
    /* console.log(errorText, subType); */
    /* Check if the values need to be kept sorted or not */
    if (this.options.keepSorted == true)
      this.listValues.sort(sortValues);
    /* The call below will only update the actual list data if all
       of the list values are valid */
    let updateRvStr = this.updateListValues(0);
    /* console.log(updateRvStr); */
    if (updateRvStr == 'finished')
      rvStr = 'noredraw';
    /* Clear the contents of the new entry. The details of
       clearing any existing content depend on the type of
       data we are dealing with. Generally we can just
       clear the field. However, special code is needed to
       handle colors. */
    target.value = this.getEmptyValue();
    /* Force the current node to be redrawn unless we don't
       want it to be redrawn for some reason - This code was changed to do a full redraw */
    if (rvStr != 'noredraw') {
      let typeOfFullRedrawCallback = typeof(this.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined')
        this.fullRedrawCallback();
    }
    /* console.log(rvStr); */
    return rvStr;
  }
  /* This class instance method is invoked validate an input field. The
     caller provids the field type and the field value. This routine
     determines if the field is valid and either returns an empty string
     or an error message to the caller. */
  checkInput(subType, value, currentMod) {
    /* console.log('In HDLmListWidget.checkInput', subType); */
    /* console.log(currentMod); */
    let errorText = '';
    let forceSelectString = HDLmDefines.getString('HDLMFORCEVALUE');
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check all values for the special prefix */
      if (value.startsWith(forceSelectString))
        value = value.substring(forceSelectString.length);
      /* Check the change attributes value */
      if (subType == 'changeattrs') {
        value = value.trim();
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = `The change attributes value must not be empty`;
          break;
        }
        /* Check if we have anything left at this point. We may not
           have anything left and this is not an error condition. */
        if (value == '')
          break;
        let valueValid = true;
        /* Try to parse the JSON. If the parse fails, the JSON
           is invalid. */
        let valueObj;
        try {
          valueObj = JSON.parse(value);
        }
        catch (e) {
          valueValid = false;
        }
        /* Build the error text message if the value is invalid */
        if (!valueValid) {
          let valueTrunc = HDLmString.truncateString(value, 30);
          errorText = `Change value (${valueTrunc}) is an invalid JSON string`;
          break;
        }
        /* Check if the value is a valid change attributes string */
        errorText = this.checkChangeAttributesString(value);
        break;
      }
      /* Check the change nodes value */
      if (subType == 'changenodes') {
        value = value.trim();
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = `The change nodes value must not be empty`;
          break;
        }
        /* Check if we have anything left at this point. We may not
           have anything left and this is not an error condition. */
        if (value == '')
          break;
        let valueValid = true;
        /* Try to parse the JSON. If the parse fails, the JSON
           is invalid. */
        let valueObj;
        try {
          valueObj = JSON.parse(value);
        }
        catch (e) {
          valueValid = false;
        }
        /* Build the error text message if the value is invalid */
        if (!valueValid) {
          let valueTrunc = HDLmString.truncateString(value, 30);
          errorText = `Change value (${valueTrunc}) is an invalid JSON string`;
          break;
        }
        /* Check if the value is a valid change nodes string */
        errorText = this.checkChangeNodesString(value);
        break;
      }
      /* Check if a color string must be validated. An external routine is
         used for validating color strings. */
      if (subType == 'colors') {
        errorText = HDLmUtility.isColor(value.trim());
        break;
      }
      /* The font size value must be checked */
      if (subType == 'fontsize') {
        errorText = HDLmUtility.isFontSize(value.trim());
        break;
      }
      /* Check for a height or width and check them */
      if (subType == 'height' ||
          subType == 'width') {
        value = value.trim();
        if (value == '' &&
            this.options.emptyFieldOk == false) {
          if (subType == 'height')
            errorText = 'The height value must not be empty';
          if (subType == 'width')
            errorText = 'The width value must not be empty';
          break;
        }
        errorText = HDLmUtility.isHeight(subType, value);
        break;
      }
      /* Check the current image URL value. Image URL values identify specific
         images that are available on the Internet. Check the image URL value. */
      if (subType == 'images') {
        errorText = HDLmUtility.isImageUrl(value.trim());
        break;
      }
      /* Check if a order string must be validated. An external routine is
         used for validating order strings. */
      if (subType == 'order') {
        errorText = HDLmUtility.isOrder(value.trim());
        break;
      }
      /* At least for now, we only allow two remove values. The values
         are, yes and no. */
      if (subType == 'remove') {
        value = value.trim();
        if (HDLmString.compareCaseInsensitive(value, 'yes') ||
            HDLmString.compareCaseInsensitive(value, 'no'))
          break;
        errorText = `Remove value (${value}) is invalid`;
        break;
      }
      /* At least for now, we only allow two replace values. The values
         are either an empty string or a valid JSON string. */
      if (subType == 'replace') {
        value = value.trim();
        if (value == '' &&
            this.options.emptyFieldOk == false) {
          errorText = `The ${subType} value must not be empty`;
          break;
        }
        /* We now allow replace values that are just text (and not 
           valid JSON). These replace values and used to obtain 
           saved data values that are (hopefully) valid JSON. */
        if (1 == 2) {
          let valueValid = true;
          /* Try to parse the JSON. If the parse fails, the JSON
             is invalid. */
          let valueObj;
          try {
            valueObj = JSON.parse(value);
          }
          catch (e) {
            valueValid = false;
          }
          /* Build the error text message if the value is invalid */
          if (!valueValid) {
            let valueTrunc = HDLmString.truncateString(value, 30);
            errorText = `Replace value (${valueTrunc}) is invalid`;
          }
        }
        break;
      } 
      /* Check for a script value. Script (in this content) is a string
         that contains JavaScript code. */
      if (subType == 'script') {
        value = value.trim();
        let valueValid = HDLmMod.checkScriptValid(value);
        /* Check for an error in the script. This is a just a syntax
           check. Run time error can still occur. */
        if (!valueValid) 
          errorText = 'The JavaScript script is invalid';
        break;
      }
      /* Check for a style value. Several style values can be specified 
         using the Extra Information field. These style values (in the 
         Extra Information field) must be separated by one or more spaces.
         The actual style values can use a blank or a semicolon to separate
         individual values. If one or more blanks are used, then each style
         value must complete and not have any blanks in it. This means that
         rgb(15,15,15) is OK, but rgb(15 15 15) is not. If semicolons are 
         used, then we split on semicolons. Note that if we split on semi-
         colons, then a blank value can be used to show that an existing
         value should be used. Also note that 'unchanged' (without the 
         quotes) and 'novalue' (without the quotes) and 'none' (without
         the quotes) can also be used to show that an existing value should
         be used. */
      if (subType == 'style') {
        value = value.trim();
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = `The ${subType} value must not be empty`;
          break;
        }
        /* Break up the Extra Information string into an array
           of values */
        let curModExtra = '';
        if (currentMod != null &&
          currentMod.hasOwnProperty('extra'))
        curModExtra = currentMod.extra;
        /* console.log(currentMod); */
        /* console.log(curModExtra); */
        /* Remove any leading and/or trailing blanks */
        curModExtra = curModExtra.trim();
        /* Get a lowercase copy of the current modification extra value */
        curModExtra = curModExtra.toLowerCase();
        /* Convert any sequence of whitespace to a single blank */
        curModExtra = curModExtra.replace(/\s+/g, ' ');
        /* Split the current modification extra value into a set
           of values */
        let curModSplit = curModExtra.split(' ');
        let curModSplitLen = curModSplit.length;
        /* Remove any leading and/or trailing blanks */
        value = value.trim();
        /* Get a lowercase copy of the current value */
        value = value.toLowerCase();
        /* Convert any sequence of whitespace to a single blank */
        value = value.replace(/\s+/g, ' ');
        /* At this point we need to consider two very different cases.
           The style value may be divided using semicolons or it may 
           be divided using blanks. */
        let splitOn;
        if (value.indexOf(';') >= 0)
          splitOn = ';'
        else
          splitOn = ' ';
        /* Split the value into a set of values */
        let valueSplit = value.split(splitOn);
        let valueSplitLen = valueSplit.length;
        /* At this point the number of style values must be exactly equal
          to the number of styles. Check this and report any errors. */
        if (curModSplitLen != valueSplitLen) {
          let a = valueSplitLen;
          let b = curModSplitLen;
          errorText = `The number of actual values (${a}) does not equal the number of needed values (${b})`;
          break;
        }
        /* Handle each of the style types specified using the Extra
           Information field */
        for (let i in curModSplit) {
          /* Skip the current value if we can't access the style value */
          if (i > (curModSplitLen - 1))
            continue;
          /* Skip the current value if it does not exist */
          if (i > valueSplitLen - 1)
            continue;
          /* Get the current type of value and value */
          let curType = curModSplit[i];
          let curValue = valueSplit[i];
          /* console.log(splitOn); */
          /* console.log(curValue); */
          /* Check if we have any semicolons in the style value */
          if (splitOn == ';') {
            let curValueTrim = curValue.trim();
            let curValueSplit = curValueTrim.split(' ');
            curValue = curValueSplit[0];
          }
          /* console.log(curValue); */
          if (curValue == 'unchanged' ||
              curValue == 'novalue'   ||
              curValue == 'none'      ||
              curValue.trim().length == 0)
            continue;
          if (curType == 'background-color') {
            errorText = HDLmHtml.checkStyleBackgroundColor(curValue);
            if (errorText != '')
              break;
          }
          if (curType == 'border-radius' ||
              curType == 'border') {
            errorText = HDLmHtml.checkStylePixelValue(curValue);
            if (errorText != '')
              break;
          }
        }
        break;
      }
      /* Check the current target value. Target value identify specific HTML
         elements. Target values may be CSS selectors or XPath query strings. */
      if (subType == 'target') {
        errorText = HDLmUtility.isTarget(value.trim());
        break;
      }
      /* Sometimes, we consider all text values to be valid. However, in some
         cases, empty text values are not acceptable. */
      if (subType == 'text') {
        value = value.trim();
        if (value == '' &&
            this.options.emptyFieldOk == false) {
          errorText = `The ${subType} value must not be empty`;
          break;
        }
        break;
      }
      /* Sometimes, we consider all text (checked) values to be valid.
         However, in some cases, empty text (checked) values are not
         acceptable. */
      if (subType == 'textchecked') {
        value = value.trim();
        if (value == '' &&
            this.options.emptyFieldOk == false) {
          errorText = 'The text (checked) value must not be empty';
          break;
        }
        break;
      }
      /* Sometimes, we consider all title values to be valid. However, in some
         cases, empty title values are not acceptable. */
      if (subType == 'title') {
        value = value.trim();
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = `The ${subType} value must not be empty`;
          break;
        }
        break;
      }
      /* At least for now, we only allow two visit values. The values
         are, yes and no. */
      if (subType == 'visit') {
        value = value.trim();
        if (HDLmString.compareCaseInsensitive(value, 'yes') ||
            HDLmString.compareCaseInsensitive(value, 'no'))
          break;
        errorText = `Visit value (${value}) is invalid`;
        break;
      }
      /* At this point we need to use default field validation. The default
         field validation routine is external. */
      errorText = HDLmMod.checkFontValue(subType, value.trim());
      break;
    }
    return errorText;
  }
  /* Check if a change attributes string is valid or not. An error string
     is returned to the caller if the change attributes string is not 
     valid. The change string attributes must be a valid JSON string. */
  checkChangeAttributesString(changeString) {
    /* console.log('In HDLmWidgets.checkChangeAttributesString'); */
    let errorText = '';
    let changeStringValid = true;
    /* Try to parse the JSON. If the parse fails, the JSON
       is invalid. */
    let changeStringObj;
    try {
      changeStringObj = JSON.parse(changeString);
    }
    catch (e) {
      changeStringValid = false;
    }
    /* Build the error text message if the change string is invalid */
    if (!changeStringValid) {
      let changeStringTrunc = HDLmString.truncateString(changeString, 30);
      errorText = `Change attributes string (${changeStringTrunc}) is not valid JSON`;
      return errorText;
    }
    /* Check each of fields of the object */
    for (const changeKey in changeStringObj) {
      /* Check if key was in the object or an ancestor */
      if (!changeStringObj.hasOwnProperty(changeKey))
        continue;
      /* Check if the current key is a valid attribute name */
      if (!HDLmHtmlDOMAttributes.includes(changeKey)) {
        let changeKeyTrunc = HDLmString.truncateString(changeKey, 30);
        errorText = `Change attribute (${changeKeyTrunc}) is unknown`;
        return errorText;
      }
      /* Get the value for the current key */
      let changeValue = changeStringObj[changeKey];
      if (changeValue == null)
        continue;
      if (typeof changeValue != 'string') {
        let changeValueTrunc = HDLmString.truncateString(changeValue, 30);
        errorText = `Change attributes value (${changeValueTrunc}) is not a string`;
        return errorText;
      }
    }
    return errorText;
  }
  /* Check if a change nodes string is valid or not. An error string
     is returned to the caller if the change nodes string is not 
     valid. The change string nodes must be a valid JSON string. */
  checkChangeNodesString(changeString) {
    let errorText = '';
    let changeStringValid = true;
    /* Try to parse the JSON. If the parse fails, the JSON
       is invalid. */
    let changeStringObj;
    try {
      changeStringObj = JSON.parse(changeString);
    }
    catch (e) {
      changeStringValid = false;
    }
    /* Build the error text message if the change string is invalid */
    if (!changeStringValid) {
      let changeStringTrunc = HDLmString.truncateString(changeString, 30);
      errorText = `Change nodes string (${changeStringTrunc}) is not valid JSON`;
      return errorText;
    }
    /* Get all of the keys of object we just creaSted */
    let changeObjKeys = Object.keys(changeStringObj);
    let changeObjKeysLen = changeObjKeys.length;
    if (changeObjKeysLen == 0) {
      let changeStringTrunc = HDLmString.truncateString(changeString, 30);
      errorText = `Change nodes string (${changeStringTrunc}) has no JSON keys`;
      return errorText;
    }
    /* Check each of fields of the object */
    for (const changeKey in changeStringObj) {
      /* Check if key was in the object or an ancestor */
      if (!changeStringObj.hasOwnProperty(changeKey))
        continue;
      /* Get the value for the current key */
      let changeValue = changeStringObj[changeKey];
      /* Change numbers to strings. Other types are not
         changed here. For example, objects and not changed. */
      if (typeof(changeValue) == 'number')
        changeValue = changeValue.toString();
      /* The type of checking depends on the current data type */
      switch (changeKey) {
        case 'background-color': 
          errorText = HDLmHtml.checkStyleBackgroundColor(changeValue);
          break;
        case 'border':
          errorText = HDLmHtml.checkStyleBorderValue(changeValue);
          break;
        case 'border-radius':
          errorText = HDLmHtml.checkStylePixelValue(changeValue);
          break;
        case 'color':
          errorText = HDLmUtility.isColor(changeValue);
          break;
        case 'font':
          errorText = HDLmUtility.isFont(changeValue);
          break;
        case 'font-family':
          errorText = HDLmUtility.isFontFamilyStr(changeValue);
          break;
        case 'font-kerning':
          errorText = HDLmUtility.isFontKerning(changeValue);
          break;
        case 'font-size':
          errorText = HDLmUtility.isFontSize(changeValue);
          break;
        case 'font-stretch':
          errorText = HDLmUtility.isFontStretch(changeValue);
          break;
        case 'font-style':
          errorText = HDLmUtility.isFontStyle(changeValue);
          break;
        case 'font-variant':
          errorText = HDLmUtility.isFontVariant(changeValue);
          break;
        case 'font-weight':
          errorText = HDLmUtility.isFontWeight(changeValue);
          break;
        case 'height':
          errorText = HDLmUtility.isHeight('height', changeValue);
          break;
        case 'line-height':
          errorText = HDLmUtility.isLineHeight(changeValue);
          break;
        case 'text':
          errorText = HDLmUtility.isText('text', changeValue);
          break;
        case 'textchecked':
          errorText = HDLmUtility.isTextChecked(changeValue);
          break;
        case 'title':
          errorText = HDLmUtility.isText('title', changeValue);
          break;
        case 'visit':
          errorText = HDLmUtility.isVisit(changeValue);
          break;
        case 'width':
          errorText = HDLmUtility.isHeight('width', changeValue);
          break;
        default: {
          let errorString = changeKey;
          HDLmError.buildError('Error', 'Invalid type', 57, errorString);
          errorText = 'Invalid JSON key (' + changeKey + ') found in change nodes';
          return errorText;
        }
      }
      /* Check if an error was detected above. If we found an error,
         then we are done checking. */
      if (errorText != '')
        break;
    }
    return errorText;
  }
  /* This is a special version of the check input routine. This
     method treats empty fields as valid, even if the low-level
     check input routine does not. */
  checkInputEmpty(subType, value, currentMod) {
    let errorText = '';
    if (value != '')
      errorText = this.checkInput(subType, value, currentMod);
    return errorText;
  }
  /* This static method is invoked when a change event occurs. This
     code is not complete at this time and does not do anything. */
  static eventChange(event) {
    /* console.log('In HDLmListWidget.eventChange'); */
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 3);
    let listWidgetCurrent = HDLmWidgetMap[targetIdBase];
    let targetIndexVal = targetId.substr(targetId.length - 3, 3);
    targetIndexVal = Number(targetIndexVal);
    /* Check for an index value of zero. This is actually the
       new entry. We don't need to do anything for change events
       for the new entry. */
    if (targetIndexVal == 0) {
      return;
    }
  }
  /* This static method is invoked when a double-click event occurs */
  static eventDblClick(event) {
    /* console.log('In HDLmListWidget.eventDblClick'); */
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 3);
    let listWidgetCurrent = HDLmWidgetMap[targetIdBase];
    let targetIndexVal = targetId.substr(targetId.length - 3, 3);
    targetIndexVal = Number(targetIndexVal);
    /* Check for an index value of zero. This is actually the
       new entry. We don't need to do anything for double-click
       events for the new entry. */
    if (targetIndexVal == 0) {
      return;
    }
    /* Check all values for the special prefix */
    let forceSelectString = HDLmDefines.getString('HDLMFORCEVALUE');
    /* Loop through all of the entries looking for an entry with the
       special prefix. This loop keeps track of where the special prefix
       was found (if it was found) and removes the special prefix. */
    for (let i = 0; i < listWidgetCurrent.listValues.length; i++) {
      let forceSelectFound = false;
      if (listWidgetCurrent.listValues[i].startsWith(forceSelectString)) {
        forceSelectFound = true
        listWidgetCurrent.listValues[i] = listWidgetCurrent.listValues[i].substring(forceSelectString.length);
      }
      if (i == (targetIndexVal - 1) &&
          forceSelectFound == false)
        listWidgetCurrent.listValues[i] = forceSelectString + listWidgetCurrent.listValues[i];
    }
    /* The call below will only update the actual list data if all
       of the list values are valid - This code was changed to remove a redraw */
    listWidgetCurrent.updateListValues(targetIndexVal);
  }
  /* This static method is invoked when a drag over event occurs.
     Note that drag over events are only used for images. Only
     the 'New Image' field is enabled for this type of event. */
  static eventDragOver(event) {
    event.preventDefault();
  }
  /* This static method is invoked when a drop event occurs
     Note that drop events are only used for images. Only
     the 'New Image' field is enabled for this type of event. */
  static eventDrop(event) {
    event.preventDefault();
    /* Extract the URL of the image being dropped in the new
       image field */
    let imageText = event.dataTransfer.getData('text/html');
    let imageRegex = /src="?([^"\s]+)"?\s*/;
    let urlStrArray = imageRegex.exec(imageText);
    /* If the image is an href, we won't have an array
       at this point. Just return to the caller if this
       happens. This won't happen if the user actually
       drops a standard image. */
    if (urlStrArray == null)
      return;
    let urlStr = urlStrArray[1];
    urlStr = HDLmUtility.removeUrlPrefixes(urlStr);
    /* Find the widget associated with the current event */
    let currentTarget;
    let currentTargetId;
    currentTarget = event.target;
    currentTargetId = currentTarget.id;
    let currentTargetIdBase = currentTargetId.substr(0, currentTargetId.length - 3);
    let listWidgetCurrent = HDLmWidgetMap[currentTargetIdBase];
    /* We now have the URL of the dropped image. We need to add
       this image as a new image list entry. */
    let target = {};
    target.id = currentTargetId;
    target.value = urlStr;
    listWidgetCurrent.addNewEntry(target);
  }
  /* This static method is invoked when an input event occurs. An
     input event occurs whenever an input field is changed in any
     way. This includes the new entry field and the fields that
     display actual list data. Note the for the color picker,
     the input event seems to occur when the OK button of the
     color picker is pressed. This behavior may only apply to
     Chrome.*/
  static eventInput(event) {
    /* console.log('In HDLmListWidget.eventInput', event); */
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log(`Fancytree event DOM HDLmListWidget Input Type (${event.inputType})`);
    let addNewEntryRvStr = '';
    /* Check for an input event we need to ignore. Strangely enough this
       input event occurs even after the widget is removed /delete. Why
       is not clear. */
    if (event.inputType == 'historyRedo' ||
        event.inputType == 'historyUndo')
      return;
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 3);
    let listWidgetCurrent = HDLmWidgetMap[targetIdBase];
    let targetIndexRowVal = targetId.substr(targetId.length - 3, 3);
    targetIndexRowVal = Number(targetIndexRowVal);
    let subType = listWidgetCurrent.options.subType;
    /* console.log(targetIndexRowVal, subType); */
    /* Check the modified field. These may be the new entry field
       or one of the list values. In all cases, check the modified
       field and set the validity value for the field. */
    let newValue = target.value;
    /* console.log(newValue); */
    /* Note that we use a different error checking routine depending on
       whether the input event was for the new data row or some other row.
       Empty values are OK for the new data row. However, the actual rows
       must have some information in them. */
    let errorText;
    /* console.log(this); */
    if (targetIndexRowVal == 0)
      errorText = listWidgetCurrent.checkInputEmpty(subType, newValue,
                                                    listWidgetCurrent.getCurrentMod());
    else
      errorText = listWidgetCurrent.checkInput(subType, newValue,  
                                               listWidgetCurrent.getCurrentMod());
    target.setCustomValidity(errorText);
    /* console.log(errorText); */
    /* Store the error text value. The error text may or may not be
       an empty string. Invoke the display error text method on the
       container widget to update the displayed error text. */
    if (targetIndexRowVal == 0) {
      /* console.log(errorText); */
      listWidgetCurrent.errorTextListNewRow = errorText;
    }
    else
      listWidgetCurrent.errorTextListRows[targetIndexRowVal - 1] = errorText;
    listWidgetCurrent.inputCallback();
    /* Update the data inside the list widget, unless we are handling
       the new entry field */
    if (targetIndexRowVal != 0)
      listWidgetCurrent.listValues[targetIndexRowVal - 1] = newValue;
    /* The input event was for the new entry field. In most cases, we
       have nothing to do here. However, if we are handling colors then
       we need to add the new color to the list array.

       The call below that adds the new color to the list array will
       generally (if the new color is vaild) call the update routine.
       The update routine will be called again later separately. Note
       that the redraw routine will also (likely) be called by the
       add new entry routine and then be called again below. */
    else {
      /* Check if we are handling a color. We can just add the color
         at this point. */
      if (listWidgetCurrent.options.setColors == true)
        addNewEntryRvStr = listWidgetCurrent.addNewEntry(target);
    }
    /* The call below will only update the actual list data if all
       of the list values are valid */
    /* console.log('In HDLmListWidget.eventInput'); */
    listWidgetCurrent.updateListValues(targetIndexRowVal);
    /* Force the current node to be redrawn, if we are handling colors.
       An input event for a color list will probably cause a new color
       to be added to the list. The list must be redrawn in this case. 
       This code was changed to do a full redraw. */
    let fullRedawDone = false
    if (listWidgetCurrent.options.setColors == true &&
        addNewEntryRvStr != 'noredraw') {
      fullRedawDone = true;
      let typeOfFullRedrawCallback = typeof(listWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined')
        listWidgetCurrent.fullRedrawCallback();
    }
    /* Do a full redraw, if one has not already been done
       and if the current row is not the one used for new
       values. We don't want a full redraw if the current
       row is the row used to enter new value. A full redraw
       will wipe out the row used to enter new values. */
    if (fullRedawDone == false &&
        targetIndexRowVal != 0) {
      let typeOfFullRedrawCallback = typeof(listWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined') 
        listWidgetCurrent.fullRedrawCallback();
    }
  }
  /* This static method is invoked by the pressing of any key. Of course,
     we really only want to handle the Delete, Enter, and Escape keys. */
  static eventKeyDown(event) {
    /* console.log('In HDLmListWidget.eventKeyDown', event); */
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log('Fancytree event DOM HDLmListWidget KeyDown');
    let key = event.key;
    /* Check for the arrow up key */
    if (key === "ArrowUp") {
      HDLmListWidget.eventKeyDownArrowUp(event);
      return;
    }
    /* Check for the Delete key */
    if (key === "Delete") {
      HDLmListWidget.eventKeyDownDelete(event);
      return;
    }
    /* Check for the Enter key */
    if (key === "Enter") {
      HDLmListWidget.eventKeyDownEnter(event);
      return;
    }
    /* Check for the Escape key */
    if (key === "Escape") {
      HDLmListWidget.eventKeyDownEscape(event);
      return;
    }
  }
  /* This static method is invoked by the pressing of the arrow up key.
     This method is actually called out of the more general key down
     routine. */
  static eventKeyDownArrowUp(event) {
    /* console.log('In HDLmListWidget.eventKeyDownArrayup'); */
    let key = event.key;
    if (key !== "ArrowUp") {
      let errorText = 'Event passed to the Arrow Up routine does not have the Arrow Up key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 3);
    let listWidgetCurrent = HDLmWidgetMap[targetIdBase];
    /* Get the target row index value */
    let targetIndexRowVal = targetId.substr(targetId.length - 3, 3);
    targetIndexRowVal = Number(targetIndexRowVal);
    /* If the arrow up key was invoked for the new input field
       then we have nothing to do */
    if (targetIndexRowVal <= 0)
      return;
    /* Check for a color list. In that case, we have
       nothing to do. Just return to the caller. */
    if (listWidgetCurrent.options.setColors == true)
      return;
    /* Check for an image list. In this case, we have 
       a lot to do. */
    if (listWidgetCurrent.options.setImages == true) {
      let currentImage = listWidgetCurrent.listValues[targetIndexRowVal - 1];
      if (currentImage == null)
        return;
      let originalModificationNodePath = HDLmExtensionBothManageRules.getNodePathModification();
      if (originalModificationNodePath == null)
        return;
      let pathValueStr = null;
      if (listWidgetCurrent != null) {
        let listWidgetCurrentMod = listWidgetCurrent.currentMod;
        /* console.log(listWidgetCurrentMod); */
        if (listWidgetCurrentMod != null) 
          pathValueStr = listWidgetCurrentMod.pathvalue;       
      }
      /* console.log(listWidgetCurrent); */
      /* console.log(pathValueStr); */
      /* At this point we can try to get more text choices/variants from the server */
      let hostNameStr = HDLmExtensionBothManageRules.getCompanyName();
      let urlStr = null; 
      if (hostNameStr != null)
        urlStr = 'https://' + hostNameStr;
      /* console.log(hostNameStr); */
      /* console.log(urlStr); */
      /* console.log(currentImage); */
      /* console.log(originalModificationNodePath); */
      /* console.log(listWidgetCurrent); */
      /* console.log(targetIndexRowVal, currentImage); */
      /* At this point we can try to get more image choices/variants from the server */
      let newPromise = HDLmWebSockets.getImageChoices(currentImage, urlStr, pathValueStr);
      newPromise.then(function (response) {
        /* console.log('In HDLmListWidget.eventKeyDownArrowUp getImageChoices then'); */
        /* console.log(response); */
        /* Get the node path for the current modification. This will only work
           if the original modification is still displayed. If the oringal
           modification is gone, the call below will return null or the
           node path for a different modification. */
        let currentModificationNodePath = HDLmExtensionBothManageRules.getNodePathModification();
        if (response != null                    &&
            currentModificationNodePath != null &&
            currentModificationNodePath == originalModificationNodePath) {
          /* console.log(response); */
          let responseObj = JSON.parse(response);
          let choicesList = responseObj['choices'];
          let errorMessage = responseObj['message'];
          let choicesListLen = choicesList.length;
          /* Check if we get an error message back. This may really 
             happen in many cases. */
          if (errorMessage != null) {
            console.log(errorMessage); 
            HDLmUtility.setErrorText(errorMessage);
          }     
          /* We did not get an error message back. We can proceed with
             using the image choices list. */ 
          else {  
            /* The choices returned by the API will start with 'http:' or 'https:'
              (without the quotes). We need to remove the protocol and the colon
              after the protocol. */
            choicesList = choicesList.map((currentUrl) => HDLmMenus.getUrlFromImage(currentUrl));
            /* console.log(choicesList); */
            /* We need to update the actual array of values at this point.
               This is done in two places. First the list widget is updated.
               However, we also need to update the actual array of values.
               The list widget contains a copy of the original values. */
            listWidgetCurrent.listValues.splice(targetIndexRowVal, 0, ...choicesList);
            /* Since we are adding zero or more rows, we should also add zero
               or more error text rows. The code below actually does this. */
            let errorTextList = Array(choicesListLen).fill('');
            /* console.log(listWidgetCurrent); */
            listWidgetCurrent.errorTextListRows.splice(targetIndexRowVal, 0, ...errorTextList);
            /* The call below will only update the actual list data if all
               of the list values are valid */
            listWidgetCurrent.updateListValues(-1);
            /* Force the current node to be redrawn  - This code was changed to do a full redraw */
            {
              let typeOfFullRedrawCallback = typeof(listWidgetCurrent.fullRedrawCallback);
              if (typeOfFullRedrawCallback != 'undefined')
                listWidgetCurrent.fullRedrawCallback();
            }
          }
        }
      }, function (error) {
        HDLmError.buildError('Error', 'Get image choices failure', 52, error);
      });
    }
    /* Check for a text list. In this case, we have 
       a lot to do. */
    if (listWidgetCurrent.options.setTexts == true) {
      let currentText = listWidgetCurrent.listValues[targetIndexRowVal - 1];
      if (currentText == null)
        return;
      let originalModificationNodePath = HDLmExtensionBothManageRules.getNodePathModification();
      if (originalModificationNodePath == null)
        return;
      /* console.log(currentText); */
      /* console.log(originalModificationNodePath); */
      /* console.log(listWidgetCurrent);  */
      /* console.log(targetIndexRowVal, currentText); */
      /* Try to get the path value string for the current modification  */
      let pathValueStr = null;
      if (listWidgetCurrent != null) {
        let listWidgetCurrentMod = listWidgetCurrent.currentMod;
        /* console.log(listWidgetCurrentMod); */
        if (listWidgetCurrentMod != null) 
          pathValueStr = listWidgetCurrentMod.pathvalue;       
      }
      /* console.log(listWidgetCurrent); */
      /* console.log(pathValueStr); */
      /* At this point we can try to get more text choices/variants from the server */
      let hostNameStr = HDLmExtensionBothManageRules.getCompanyName();
      let urlStr = null; 
      if (hostNameStr != null)
        urlStr = 'https://' + hostNameStr;
      /* console.log(hostNameStr); */
      /* console.log(urlStr); */
      let newPromise = HDLmWebSockets.getTextChoices(currentText, urlStr, pathValueStr);
      newPromise.then(function (response) {
        /* Get the node path for the current modification. This will only work
           if the original modification is still displayed. If the oringal
           modification is gone, the call below will return null or the
           node path for a different modification. */
        let currentModificationNodePath = HDLmExtensionBothManageRules.getNodePathModification();
        if (response != null &&
          currentModificationNodePath != null &&
          currentModificationNodePath == originalModificationNodePath) {
          let responseObj = JSON.parse(response);
          let errorMessage = responseObj['message'];
          let choicesList = responseObj['choices'];
          let choicesListLen = choicesList.length;
          /* console.log(choicesList); */
          /* console.log(choicesListLen); */
          /* console.log(responseObj); */
          /* Check if we get an error message back. This may really 
             happen in many cases. */
          if (errorMessage != null) {
            /* console.log(errorMessage); */
            HDLmUtility.setErrorText(errorMessage);
          }     
          /* We did not get an error message back. We can proceed with
             using the choices list. */ 
          else {    
            /* We need to update the actual array of values at this point.
               This is done in two places. First the list widget is updated.
               However, we also need to update the actual array of values.
               The list widget contains a copy of the original values. */
            listWidgetCurrent.listValues.splice(targetIndexRowVal, 0, ...choicesList);
            /* Since we are adding zero or more rows, we should also add zero
              or more error text rows. The code below actually does this. */
            let errorTextList = Array(choicesListLen).fill('');
            /* console.log(listWidgetCurrent); */
            listWidgetCurrent.errorTextListRows.splice(targetIndexRowVal, 0, ...errorTextList);
            /* The call below will only update the actual list data if all
              of the list values are valid */
            listWidgetCurrent.updateListValues(-1);
            /* Force the current node to be redrawn. This code was changed 
               to do a full redraw. */
            {
              let typeOfFullRedrawCallback = typeof(listWidgetCurrent.fullRedrawCallback);
              if (typeOfFullRedrawCallback != 'undefined')
                listWidgetCurrent.fullRedrawCallback();
            }
          }
        }
      }, function (error) {
        HDLmError.buildError('Error', 'Get text choices failure', 52, error);
      });
    }
  }
  /* This static method is invoked by the pressing of the Delete key.
     This method is actually called out of the more general key down
     routine. */
  static eventKeyDownDelete(event) {
    let key = event.key;
    if (key !== "Delete") {
      let errorText = 'Event passed to the Delete routine does not have the Delete key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 3);
    let listWidgetCurrent = HDLmWidgetMap[targetIdBase];
    /* Check if delete is enabled for the current list widget. Just
       return to the caller if delete is not enabled for the current
       list widget. */
    if (listWidgetCurrent.options.delete == false)
      return;
    let targetIndexRowVal = targetId.substr(targetId.length - 3, 3);
    targetIndexRowVal = Number(targetIndexRowVal);
    /* Check for an index value of zero. This is actually the
       new entry area. Just delete any contents in this case. The
       details of deleting any existing contents depending on
       the type of data we are dealing with. Generally we can
       just clear the field. */
    if (targetIndexRowVal == 0) {
      target.value = listWidgetCurrent.getEmptyValue();
      target.setCustomValidity('');
      listWidgetCurrent.resetErrorTextListNewRow();
      listWidgetCurrent.inputCallback();
      return;
    }
    /* We need to update the actual array of values at this point.
       This is done in two places. First the list widget is updated.
       However, we also need to update the actual array of values.
       The list widget contains a copy of the original values. */
    listWidgetCurrent.listValues.splice(targetIndexRowVal - 1, 1);
    /* Since we are deleting an actual row, we should also delete
       the corresponding error text row. The code below actually
       does this. */
    listWidgetCurrent.errorTextListRows.splice(targetIndexRowVal - 1, 1);
    /* The call below will only update the actual list data if all
       of the list values are valid */
    listWidgetCurrent.updateListValues(-1);
    /* Force the current node to be redrawn. This code was changed
       to do a full redraw. */
    {
      let typeOfFullRedrawCallback = typeof(listWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined')
        listWidgetCurrent.fullRedrawCallback();
    }
  }
  /* This static method is invoked by the pressing of the Enter key.
     This method is actually called out of the more general key down
     routine. Enter is generally ignored. However, if enter is used
     with the new entry field, then we need to add the contents of the
     new entry field to the list of values and clear the new entry field.
     Of course, we need to make sure the new entry field is valid. */
  static eventKeyDownEnter(event) {
    let key = event.key;
    if (key !== "Enter") {
      let errorText = 'Event passed to the Enter routine does not have the Enter key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 3);
    let listWidgetCurrent = HDLmWidgetMap[targetIdBase];
    let targetIndexRowVal = targetId.substr(targetId.length - 3, 3);
    targetIndexRowVal = Number(targetIndexRowVal);
    /* Check for an index value of zero. This is actually the new entry
       field. Use the contents of the new entry field to build a new
       data value. Add the new data value to the array of data values.
       In other words, add the contents of the new entry field to the
       array of values as the first entry. This is only done if the new
       entry field is valid. */
    /* console.log('In HDLmListWidget.eventKeyDownEnter', target, targetIndexRowVal); */
    if (targetIndexRowVal == 0) 
      listWidgetCurrent.addNewEntry(target); 
  }
  /* This static method is invoked by the pressing of the Escape key.
     This method is actually called out of the more general key down
     routine. Escape is generally ignored. However, if escape is used
     while a new tree entry is being created, then we need to cancel
     creating/adding the new tree entry. */
  static eventKeyDownEscape(event) {
    let key = event.key;
    if (key !== "Escape") {
      let errorText = 'Event passed to the Escape routine does not have the Escape key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let targetIdBase = targetId.substr(0, targetId.length - 3);
    let listWidgetCurrent = HDLmWidgetMap[targetIdBase];
    /* Invoke the key down (key press) callback routine with the
       current event value. The key down callback routine will
       decide what to do with the current event. */
    listWidgetCurrent.keyDownCallback(event);
  }
  /* Get the value of the current modification from the current widget */
  getCurrentMod() {
    if (this.hasOwnProperty('currentMod'))
      return this.currentMod;
    else
      return null;
  }
  /* This instance method returns the widget description to the caller */
  getDescription() {
    return this.description;
  }
  /* The method below returns a empty value for a field. The type of
     empty value depends on the type of field. In most cases, a zero
     length string is an appropriate empty value. However, for colors
     this is not the case. */
  getEmptyValue() {
    if (this.options.setColors == false)
      return '';
    else
      return '#000000';
  }
  /* This instance method returns the overall widget error text for the current
     widget. This is a multi-stage process. The first step is to scan the list
     row error text array for any error messages. The new entry fields also have
     an error text field associated with them. The error text may be set to an
     empty string. */
  getErrorText() {
    let errorText = '';
    let errorTextFromList = '';
    /* Scan the array of list error text fields looking for a non-empty value */
    let listLength = this.errorTextListRows.length;
    for (let i = 0; i < listLength; i++) {
      errorTextFromList = this.errorTextListRows[i];
      if (errorTextFromList != '')
        break;
    }
    /* Set the final overall error text value */
    if (errorText == '')
      errorText = this.errorTextListNewRow;
    if (errorText == '')
      errorText = errorTextFromList;
    if (errorText == '')
      errorText = this.errorTextListOverall;
    /* console.log(errorText); */
    if (typeof errorTextListOverall != 'undefined')
      console.log(errorTextListOverall);
    if (typeof errorTextListNewRow != 'undefined')
      console.log(this.errorTextListNewRow);
    return errorText;
  }
  /* This instance method returns the widget type value to the caller.
     The widget type value was set when the widget was created. */
  getTypeValue() {
    return this.dataType;
  }
  /* This method returns a boolean value showing if the current
     widget is an HTML element selection widget or not. This will
     always be false for list widgets. */
  isElementSelection() {
    return false;
  }
  /* This method returns a boolean value showing if the value for the
     current widget is empty or not. A list widget is considered to be
     empty if the value is a null or the list array has a length of zero. */
  isEmpty() {
    return this.listValues === null || this.listValues.length === 0;
  }
  /* This method returns a number padded on the left with zeros.
     The caller provides the original number and the final desired
     size of the number. This routine builds the padded number and
     returns it to the caller. */
  static padZeros(inNumber, finalSize) {
    let tempStr = "0000000000" + inNumber;
    tempStr = tempStr.substr(-finalSize);
    return tempStr;
  }
  /* This method actually adds a list widget to an HTML web page.
     The caller provides the DOM element the list widget should be
     added to. This method returns the new DOM element to the caller. */
  render(parentId) {
    /* Make sure the parent ID is a string */
    if (typeof parentId != 'string') {
      let errorText = 'ParentId passed to render is not a string';
      HDLmAssert(false, errorText);
    }
    let newData;
    HDLmWidgetMap[this.newUnique] = this;
    /* Clear the error text fields. At the beginning of a render operation
       we have no (non-empty) error text information. The code below detects
       errors in various places and sets the error text information as need be. */
    this.resetErrorText(HDLmTextResetTypes.partial);
    /* Get the number of values */
    let valuesLength = this.listValues.length;
    let newElementList;
    let newUniqueInput;
    /* Create an entry for creating new entries, if need be */
    if (this.options.newEntry) {
      let newText = '';
      /* Check what type of input field we should create here.
         Normally we create an input text field. However, in
         one case we really want to create an input color field. */
      if (this.options.setColors == true) {
        newText += '<div><input type=' + this.options.type;
      }
      else {
        newText += '<div><input type=text';
      }
      /* Turn autocomplete on */
      newText += ' autocomplete="on"';
      /* Disable the spell checker, if need be */
      if (this.options.spellCheck == false)
        newText += ' spellcheck="false"';
      newText += ' placeholder="';
      newText += this.options.placeHolderText;
      newText += '"';
      /* Add the new unique id (note the use of lower case) value */
      newText += ' id="';
      newUniqueInput = this.newUnique + HDLmListWidget.padZeros(0, 3);
      newText += newUniqueInput;
      newText += '"';
      newText += '>';
      newText += '</input></div>';
      /* Create a new jQuery array and a new DOM element from the generated HTML */
      let newJQArray = $(newText);
      let newElement = newJQArray[0];
      newElementList = newElement;
      /* Add the new jQuery array to the values div */
      $(parentId).append(newJQArray);
      /* Add the input event listener */
      newElement.addEventListener('input', HDLmListWidget.eventInput);
      /* Add the key down event listener, if need be */
      newElement.addEventListener('keydown', HDLmListWidget.eventKeyDown);
      /* For images, add a few more event listeners */
      if (this.options.setImages == true) {
        newElement.addEventListener('dragover', HDLmListWidget.eventDragOver);
        newElement.addEventListener('drop', HDLmListWidget.eventDrop);
      }
    }
    /* Set a few force select related values */
    let forceSelectString = HDLmDefines.getString('HDLMFORCEVALUE');
    /* Display a list of text or other values */
    for (let i = 0; i < valuesLength; i++) {
      let forceSelectFound = false;
      let newText = '';
      /* Check if this is a special force select entry. This works
         for color lists and text lists. */
      let newValue = this.listValues[i];
      /* console.log(newValue); */
      if (newValue.startsWith(forceSelectString)) {
        forceSelectFound = true;
        /* We need to remove the special prefix from the text value. */
        newValue = newValue.substring(forceSelectString.length);
      }
      /* Some special work is needed for the first list entry
         in some cases. Basically, for images we need to shift
         the first entry down (and all later images below it). */
      let firstImage = (i == 0 && this.options.setImages == true) ?
                        true : false;
      if (firstImage) {
        newText += '<div style="height:5px;"/>';
      }
      /* Check if this a color or image list (not a text list)
         and if the special force select flag was set. If both
         conditions are true, then we must create an extra div
         element with a red border. 

         The border was changed to green so that we could easily 
         tell the difference between error and force select. The
         new value is green, not red. */
      if ((this.options.setColors == true || this.options.setImages == true) &&
          forceSelectFound == true) {
        newText += '<div style="width:170px;margin:5px;padding:5px;';
        newText += 'border:1px solid green;';
        newText += '">';
      }
      /* Set the input type to either text or image */
      if (this.options.setImages == true) {
        newText += '<div>';
        /* Check if we are handling a true image (which will
           always have a URL) of something else such as a
           gradient. Note that tabindex is set below to make
           the DOM element focusable. This required to make
           key events (such as delete) work.

           It turns out that input type of image can be used
           with gradients. The default produces a area with
           an ugly 'submit' button in the gradient area. Setting
           value (as below) gets rid of the ugly 'submit' button. */
        let newTag;
        if (newValue.startsWith('//'))
          newTag = 'input type="image"';
        else {
          newTag = 'img tabindex="0"';
          newTag = 'input type="image" value=""';
        }
        /* Build some more HTML */
        newText += '<';
        newText += newTag;
        newText += ' width="170" height="50"';
      }
      else
        newText += '<div><input type=text';
      /* Force the current entry to a specific color if need be */
      if (this.options.setColors == true) {
        newText += ' style="background-color:';
        newText += newValue;
        newText += ';"';
      }
      /* Check if we are handling a text list (not a color list) and
         if this is the special force select entry. We definitely
         don't want to do this if we are handling a list of colors
         or images. Note the comments below. This code has been
         changed (fixed, hopefully) several times. */
      /* console.log(this.options.setColors, this.options.setImages, forceSelectFound); */
      if (this.options.setColors == false &&
          this.options.setImages == false) {
        if (forceSelectFound) {
          /* The code below used to alway check for a leading slash.
             Why is not clear. This check has been disabled for now.
             Experience showed that red styles were not being used
             where they should have been. Why the check for a leading
             slash was added is not known.

             The mystery continues. The check for the leading slash has
             been restored. This change allowed lists of gradients to be
             displayed correctly. Without this change, lists of gradients
             were not being displayed correctly.

             This code has been tested with list of text, colors, images,
             and gradients. All appear to work correctly at this time.
             This code should be OK for now.  
           
             The code below used to specify red for the style color. This
             was changed to green so the errors (still red) and force select 
             (now green) would have different colors. */
          if (true || newValue.startsWith('/')) {
            newText += ' style="color:green;"';
          }
        }
      }
      /* Disable the spell checker, if need be */
      if (this.options.spellCheck == false)
        newText += ' spellcheck="false"';
      /* Set the read only attribute, if need be */
      if (this.options.editable == false ||
          this.readOnly == true)
        newText += ' readonly';
      /* Add the new unique id (note the use of lower case) value */
      newText += ' id="';
      newText += this.newUnique + HDLmListWidget.padZeros(i + 1, 3);
      newText += '"';
      /* Add the actual value. Note that double quotes are replaced
         with an escape sequence that should work. This code is highly
         dependent on the type of data we are displaying. Special code
         is used to add an 'http:' or 'https:' (more likely) prefix to
         image URLs. */
      if (this.options.setImages == true) {
        if (newValue.startsWith('//')) {
          newText += ' src="';
          newData = HDLmUtility.addHttpsPrefix(newValue);
          newText += newData;
        }
        else if (newValue.startsWith('data:')) {
          newText += ' src="';
          newText += newValue;
        }
        else {
          newText += ' style="background-image: ';
          newText += newValue;
        }
      }
      /* This is the standard case. We just add a value to the
         HTML. The value is likely to be standard text. */
      else {
        newText += ' value="';
        newData = newValue;
        newData = HDLmString.replaceAll(newData, '"', '&quot;');
        newText += newData;
      }
      newText += '"/>';
      newText += '</div>';
      /* Check if this a color or image list (not a text list)
         and if the special force select flag was set. If both
         conditions are true, then we must terminate the extra
         div element we created above. */
      if ((this.options.setColors == true || this.options.setImages == true) &&
          forceSelectFound == true)
        newText += '</div>';
      /* Create a new jQuery array and a new DOM element from the generated HTML */
      let newJQArray = $(newText);
      let newElement;
      /* Generally, the first element of the jQuery array is the one we
         want. However, in some very special cases, we actually want the
         second element of the jQuery array. JQuery will actually create
         two elements if the input text has two divs. This will happen
         if we added an extra div for padding. */
      if (newJQArray.length > 1 && firstImage == true)
        newElement = newJQArray[1];
      else
        newElement = newJQArray[0];
      /* Add the new jQuery array to the values div */
      $(parentId).append(newJQArray);
      /* Add the input event listener, if need be */
      if (this.options.editable == true)
        newElement.addEventListener('input', HDLmListWidget.eventInput);
      /* Add an event listener for double-click events */
      newElement.addEventListener('dblclick', HDLmListWidget.eventDblClick);
      /* Add the key down event listener, if need be */
      if (this.options.editable == true ||
          this.options.delete == true)
        newElement.addEventListener('keydown', HDLmListWidget.eventKeyDown);
    }
    /* Set the field validity information for each list value. Note that
       the number of list values (data rows) may be zero. This may be a 
       separate error condition. */
    let subType = this.options.subType;
    /* console.log(valuesLength); */
    for (let i = 0; i < valuesLength; i++) {
      let errorText;
      /* console.log(subType); */
      /* console.log(this.listValues[i]); */
      errorText = this.checkInput(subType, this.listValues[i], this.getCurrentMod());
      /* Use jQuery to set find a field using the row and column
         numbers */
      let newSelector = '#' + this.newUnique + HDLmListWidget.padZeros(i + 1, 3);
      let newElement = $(newSelector)[0];
      /* For some (unknown) reason, the function below does not
         work on images. We skip trying to use this function with
         images. This problem only occurs if we use the <img> tag.
         If we use <input type="image"> then this problem does not
         occur.

         At present we display gradients using an <input type="image">.
         As a consequence, we can the set custom validity function. */
      /* if (this.options.setImages != true) */
      let newElementTag = newElement.tagName.toLowerCase();
      if (newElementTag != 'img')
        newElement.setCustomValidity(errorText);
      this.errorTextListRows.push(errorText);
    }
    /* Check if the number of values was is zero. This is a separate
       error. The number of values (data rows) must be non-zero. Report
       an error if the number of values (data rows) is actually zero. */
    if (valuesLength == 0 && this.options.zeroLength == false) {
      let errorText;
      let newElement;
      let newSelector;
      /* Get some type information. The type value is used to obtain the
         long (full) name of the type. If the type information is available,
         then the long (full) name is used in the error message. */
      let longName = subType;
      let typeInfo = HDLmMod.getModificationTypeInfo(subType);
      if (typeInfo != null)
        longName = typeInfo.longname;
      errorText = 'No ' + longName + ' information exists';
      /* console.log(3089); */
      this.errorTextListOverall = errorText;
      /* At this point we need to mark the new entry area
         as being in error. The error is not directly tied
         to the contents of the new entry area. The error
         is caused by not having an actual values. */
      newSelector = '#' + newUniqueInput;
      newElement = $(newSelector)[0];
      newElement.setCustomValidity(errorText);
    }
    return newElementList;
  }
  /* This method resets all of the error text fields of the current widget
     to empty values. This step is required in several places. This step
     is required as part of widget construction and widget rendering. */
  resetErrorText(resetType) {
    if (resetType == HDLmTextResetTypes.all)
      this.errorTextListNewRow = '';
    this.errorTextListRows = [];
    this.errorTextListOverall = '';
  }
  /* This method resets the error text field for the new field (which may or may
     not exist) back to an empty string. This step is required when the delete key
     is used with the new field. The delete key causes the new field to be reset
     to an empty value. The error text field for the new value must be reset as well. */
  resetErrorTextListNewRow() {
    this.errorTextListNewRow = '';
  }
  /* This method is used to set the parent container widget value of a list
     widget. The value passed by the caller is copied into the list widget.
     Note that the actual value is copied. */
  setContainerWidget(parentContainerWidget) {
    /* Make sure the parent container widget is really an object */
    if (typeof parentContainerWidget != 'object') {
      let errorText = 'ParentContainerWidget passed to setContainerWidget is not an object';
      HDLmAssert(false, errorText);
    }
    /* Copy the parent container widget reference */
    this.containerWidget = parentContainerWidget;
  }
  /* This method is used to set the current modification value of a list
     widget. The value passed by the caller is copied into the list widget.
     Note that the actual value is copied. */
  setCurrentMod(passedCurrentMod) {
    /* Make sure the current modification is really an object */
    if (typeof passedCurrentMod != 'object') {
      let errorText = 'Current modification passed to setCurrentMod is not an object';
      HDLmAssert(false, errorText);
    }
    /* Copy the current modification reference */
    this.currentMod = passedCurrentMod;
    /* console.log(this.currentMod); */
  }
  /* This method is used to set the description text for the current widget.
     The value passed to this routine must be a string. An error is reported
     if the value passed to this routine is not a string. */
  setDescriptionValue(descriptionValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(descriptionValue) == true) {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof descriptionValue != 'string') {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the description value */
    this.description = descriptionValue;
  }
  /* This method can be used to save a reference to the caller full
     redraw callback function. The full redraw callback function is
     invoked whenever the widget must be fully redrawn. This will
     typically happen whenever the contents of the widget have
     changed and the modification must be completely redrawn. */
  setFullRedrawCallback(newFullRedrawCallback) {
    /* Make sure the full redraw callback function is really a function */
    if (newFullRedrawCallback != null && typeof newFullRedrawCallback != 'function') {
      let errorText = 'NewFullRedrawCallback passed to setFullRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.fullRedrawCallback = newFullRedrawCallback;
  }
  /* This method can be used to save a reference to the caller
     input callback function. The input callback function is
     invoked whenever an input event occurs for the current
     widget. */
  setInputCallback(newInputCallback) {
    /* Make sure the input callback function is really a function */
    if (typeof newInputCallback != 'function') {
      let errorText = 'NewInputCallback passed to setInputCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.inputCallback = newInputCallback;
  }
  /* This method can be used to save a reference to the caller key
     down (key press) callback funtion. The key press callback function
     is invoked (may be invoked) when a key press event occurs for the
     current widget. This callback routine is used to handle the key
     press event. */
  setKeyDownCallback(newKeyDownCallback) {
    /* Make sure the key down callback function is really a function */
    if (typeof newKeyDownCallback != 'function') {
      let errorText = 'NewKeyDownCallback passed to setKeyDownCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.keyDownCallback = newKeyDownCallback;
  }
  /* This method is used to set the values of a list widget. The values
     passed by the caller are copied into the list widget. Note that the
     actual values are copied. Array assignment is normally by reference.
     This code actually copies the values. */
  setListValues(newListValues) {
    /* Make sure the arguments are an array */
    if (Array.isArray(newListValues) != true) {
      let errorText = 'NewListValues passed to setListValues method are not an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure that each list value is a string */
    let newListLength = newListValues.length;
    for (let i = 0; i < newListLength; i++) {
      let listValue = newListValues[i];
      /* Make sure the list value is a string */
      if (typeof listValue != 'string') {
        let errorText = 'Option (' + i + ') passed to setListValues method is not a string';
        HDLmAssert(false, errorText);
      }
    }
    /* Copy the values and then sort them if need be */
    this.listValues = newListValues.slice();
    if (this.options.keepSorted == true)
      this.listValues.sort(sortValues);
  }
  /* This method can be used to set any number of options. The
     options passed by the caller will override any existing
     options (which may or may not be default values). */
  setOptions(newOptions) {
    /* Make sure the new options are an object */
    if (typeof newOptions != 'object') {
      let errorText = 'NewOptions passed to setOptions method are not an object';
      HDLmAssert(false, errorText);
    }
    let keys = Object.keys(newOptions);
    let keyLen = keys.length;
    for (let i = 0; i < keyLen; i++) {
      let currentKey = keys[i];
      if (this.options.hasOwnProperty(currentKey) == false) {
        let errorText = 'Property (' + currentKey + ') does not exist in options';
        HDLmAssert(false, errorText);
      }
      this.options[currentKey] = newOptions[currentKey];
    }
  }
  /* This method can be used to save a reference to the caller
     redraw callback function. The redraw callback function is
     invoked whenever the widget must be redrawn. This will
     typically happen whenever the contents of the widget have
     changed. */
  setRedrawCallback(newRedrawCallback) {
    /* Make sure the redraw callback function is really a function */
    if (typeof newRedrawCallback != 'function') {
      let errorText = 'NewRedrawCallback passed to setRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.redrawCallback = newRedrawCallback;
  }
  /* This method is used to set the sub type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setSubTypeValue(subTypeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(subTypeValue) == true) {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof subTypeValue != 'string') {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the sub type value */
    this.subType = subTypeValue;
  }
  /* This method is used to set the type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setTypeValue(typeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(typeValue) == true) {
      let errorText = 'TypeValue passed to setTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof typeValue != 'string') {
      let errorText = 'TypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the type value */
    this.dataType = typeValue;
  }
  /* This method can be used to save a reference to the caller
     update callback function. The update callback function is
     invoked whenever the data values in the widget have been
     changed. This callback is used to update the actual data
     values. The data values in the widget are just copies of
     the original data values. The update callback routine is only
     invoked if the list values are valid. Callback routines are
     never called if the updated value(s) is/are invalid. */
  setUpdateCallback(newUpdateCallback) {
    /* Make sure the update callback function is really a function */
    if (typeof newUpdateCallback != 'function') {
      let errorText = 'NewUpdateCallback passed to setUpdateCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.updateCallback = newUpdateCallback;
  }
  /* This routine is called to actually update the real values that
     are displayed using the list widget. The actual values are only
     updated if all of the values in array associated with the list
     widget are valid. */
  updateListValues(targetIndexRowVal) {
    /* console.log('In HDLmListWidget.updateListValues'); */
    let updateRvStr = '';
    /* The actual values should only be updated if all of the values
       in the list widget are valid. Check all of the values to make
       sure they are valid. We need to use the real input checking
       routihe here. Not the one that treats empty fields as valid. */
    let errorTotal = 0;
    let subType = this.options.subType;
    for (let i = 0; i < this.listValues.length; i++) {
      let errorText = this.checkInput(subType, this.listValues[i], this.getCurrentMod());
      if (errorText != '')
        errorTotal++;
    }
    if (errorTotal == 0) {
      let noErrors = false;
      if (this.containerWidget.getErrorText() == '')
        noErrors = true;
      /* console.log('In HDLmListWidget.updateListValues', this.listValues); */
      updateRvStr = this.updateCallback(this.listValues, noErrors);
      /* Run the full redraw callback routine - This code was added to do a full redraw.
         We did not do any redraw callback here. This is entirely new code.  This code
         displays the updated last modified date and time (amoung other things). */
      if (targetIndexRowVal != 0) {
        let typeOfFullRedrawCallback = typeof(this.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined')
          this.fullRedrawCallback();
      }
    }
    return updateRvStr;
  }
}
/* The HDLmNumberWidget class is used to create number widgets. Number widgets
   are used to display one number  value. The number value may or may not be
   editable. */
class HDLmNumberWidget {
  /* Build an HTML number widget class instance */
  constructor() {
    let argsLen = arguments.length;
    /* The next field is a reference to the container widget
       or a null value */
    this.containerWidget = null;
    this.options = Object.assign({}, HDLmNumberWidgetOptions);
    /* The current widget is assumed not be be read-only. This
       may be changed later. */
    this.readOnly = false;
    /* The next field contains a reference to the input callback
       function. This function is invoked whenever an input event
       occurs for the current widget. The value in the widget is
       a copy of the original value. */
    this.inputCallback = null;
    /* The value below is used as the field description. Initially
       this field is set to an empty string. It can be set to an
       actual value by the constructor or by other code. */
    this.description = '';
    /* The field below is used as a copy of the orginal number value. In
       other words, a copy of the number value is placed in the field below.
       Changing this value will not change the original number value. The
       number value stored in the field below may actually be a number or
       it may be a string representation of a number. */
    this.numberValue = null;
    /* The next field contains a reference to the update callback function.
       This function is invoked whenever the data value in the current widget
       object is updated. This function is used to update the actual data
       value after the value in widget is changed. The value in the widget
       is a copy of the original value. The update callback routine is only
       invoked if the number value is valid. Callback routines are never
       called if the updated value(s) is/are invalid. */
    this.updateCallback = null;
    /* The next field contains a reference to the key down (key press) callback
       function. This function is invoked sometimes when a key is pressed for
       the current widget. This function is used to handle the key press event
       in some cases. Note that not all key press events are passed to this
       callback function. The actual code must be checked to determine which
       key press events are passed to this callback function. */
    this.keyDownCallback = null;
    /* The next set of fields contain the type and sub type of the data the
       current widget is displaying. These fields are set when the current
       widget is created. These fields can be queried at any time. */
    this.dataType = null;
    this.subType = null;
    /* The next field contains a reference to the redraw callback function.
       This function is invoked whenever the widget object must be redrawn.
       This will typically happen when the contents have changed. */
    this.redrawCallback = null;
    /* The next field contains a reference to the full redraw callback function.
       This function is invoked whenever the widget object must be fully redrawn.
       This will typically happen when the contents have changed and the modification
       must be fully redrawn. */
    this.fullRedrawCallback = null;
    /* The next field contains the current error text for the current widget.
       Number widgets can definitely have actual error text. */
    this.errorText = '';
    let argNum = 0;
    /* Check if the invoker of the constructor passed the container widget */
    if (argsLen >= ++argNum)
      this.setContainerWidget(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed any options */
    if (argsLen >= ++argNum)
      this.setOptions(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed an input
       callback function. This function will be called whenever
       an input event occurs for the current widget. */
    if (argsLen >= ++argNum)
      this.setInputCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a description */
    if (argsLen >= ++argNum)
      this.setDescriptionValue(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed a number value.
       The number value passed by the caller may actually be a number
       or it may be a string representation of a number. */
    if (argsLen >= ++argNum)
      this.setNumberValue(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an update
       callback function. This function will be called whenever
       the data value in current widget has been changed. The update
       callback routine is only invoked if the number value is valid.
       Callback routines are never called if the updated value(s)
       is/are invalid. */
    if (argsLen >= ++argNum)
      this.setUpdateCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a key down
       (key press) callback function. This function may or may not
       be called whenever a key press event occurs for the current
       widget. The actual code must be checked to determine if this
       routine will be invoked for a given key press event. */
    if (argsLen >= ++argNum)
      this.setKeyDownCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a type value.
       The type value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a sub type value.
       The subtype value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setSubTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a redraw
       callback function. This function will be called whenever 
       the current widget must be redrawn because the contents 
       have changed. */
    if (argsLen >= ++argNum)
      this.setRedrawCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a full redraw
       callback function. This function will be called whenever the
       current widget must be fully redrawn because the contents have
       changed. */
    if (argsLen >= ++argNum)
      this.setFullRedrawCallback(arguments[argNum - 1]);
    /* Generate a new unique id value (note the use of lower case)
       for the new HTML elements. Associate the new unique id value
       with the current class instance. */
    this.newUnique = HDLmUtility.generateId();
  }
  /* This class instance method is invoked validate an input field. The
     caller provids the field type and the field value. This routine
     determines if the field is valid and either returns an empty string
     or an error message to the caller. */
  checkInput(subType, value) {
    let errorText = '';
    /* Check if we are validating a parameter number or not */
    let checkParmNumber = false;
    if (subType == 'parameter' ||
        subType == 'editableparameter')
      checkParmNumber = true;
    /* This method may be passed an actual number. However, all of the error
       checking code below assumes that this method will be passed a string.
       The code below converts the passed value to a string, if need be. */
    value = String(value);
    value = value.trim();
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check if the number field is empty. This is alway an error. */
      if (value == '') {
        errorText = 'Number value is an empty string';
        break;
      }
      /* Check if the value is too low. This can only be done if the
         current value is a parameter number and the value is too low. */
      if (checkParmNumber == true &&
          (typeof (value) == 'number') == true) {
        let numValue = Number(value);
        /* Check if the new parameter number is less than zero. Return
           an error message if the new parameter number is less than zero. */
        if (numValue < 0) {
          errorText = 'Number value is less than zero';
          break
        }
      }
      /* Check the number of tokens in the number field. The answer must
         always be two. The second token is just a sentinel. */
      let tokenVec = HDLmString.getTokens(value);
      let tokenLen = tokenVec.length;
      if (tokenLen != 2) {
        errorText = 'Number value has too many tokens';
        break;
      }
      /* Make sure the first token is really an integer. Note that an
         integer (as defined by the tokenizer) has no sign and no decimal
         point. */
      let tokenFirst = tokenVec[0];
      if (tokenFirst.tokType != HDLmTokenTypes.integer) {
        errorText = 'Number value is not a valid integer';
        break;
      }
      /* Check if the parameter number is too low or too high */
      if (checkParmNumber == true) {
        let numValue = Number(tokenVec[0].value);
        /* Check if the new parameter number is less than zero. Return
           an error message if the new parameter number is less than zero. */
        if (numValue < 0) {
          errorText = 'Number value is less than zero';
          break
        }
        /* Check if the new parameter number is too high. Return an error
           message if the new parameter number is too high. */
        let maxParameterNumber = HDLmDefines.getNumber('HDLMMAXPARAMETERCOUNT');
        if (numValue >= maxParameterNumber) {
          errorText = `Number value (${numValue}) is too high`;
          break
        }
      }
      break;
    }
    return errorText;
  }
  /* This static method is invoked when an input event occurs. An
     input event occurs whenever an input field is changed in any
     way. */
  static eventInput(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log(`Fancytree event DOM HDLmNumberWidget Input Type (${event.inputType})`);
    /* Check for an input event we need to ignore. Strangely enough this
       input event occurs even after the widget is removed /delete. Why
       is not clear. */
    if (event.inputType == 'historyRedo' ||
        event.inputType == 'historyUndo')
      return;
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let numberWidgetCurrent = HDLmWidgetMap[targetId];
    /* We need to update the actual number value at this point. This
       is done in two places. First the number widget is updated.
       However, we also need to update the actual number value.
       The number widget contains a copy of the original value.
       The number value obtained from the web page may actually
       be a number or it may be a string representation of a number. */
    numberWidgetCurrent.numberValue = target.value;
    /* We may need to check the actual value here. This can (and
       should) only be done for some types. Other types can not be
       checked at this time. Some types really can not be checked
       because all values are valid. The update callback routine
       is only invoked if the number value is valid. Callback routines
       are never called if the number value is invalid. */
    let subType = numberWidgetCurrent.options.subType;
    let errorText = numberWidgetCurrent.checkInput(subType, numberWidgetCurrent.numberValue);
    /* Store the error text value. The error text may or may not be
       an empty string. Invoke the display error text method on the
       container widget to update the displayed error text. */
    numberWidgetCurrent.setErrorText(errorText);
    numberWidgetCurrent.inputCallback();
    /* console.log('HDLmNumberWidget EI'); */
    /* console.log(errorText); */
    /* Invoke the update callback routine only if the number value is valid */
    if (errorText == '') {
      numberWidgetCurrent.numberValue = Number(numberWidgetCurrent.numberValue);
      try {
        let noErrors = false;
        if (numberWidgetCurrent.containerWidget.getErrorText() == '')
          noErrors = true;
        /* console.log('HDLmNumberWidget EI'); */
        /* console.log(noErrors); */
        /* console.log(errorText); */
        /* console.log(numberWidgetCurrent.containerWidget.getErrorText()); */
        numberWidgetCurrent.updateCallback(numberWidgetCurrent.numberValue, noErrors);
        /* Fully redaw the current modification. This code is entirely new. This code
           was added to display the updated last modified date and time amoung other
           things. */
        let typeOfFullRedrawCallback = typeof(numberWidgetCurrent.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined')
          numberWidgetCurrent.fullRedrawCallback();
      }
      catch (errorObj) { 
        console.log(errorObj); 
      }
    }
    /* Set the field validity value */
    target.setCustomValidity(errorText);
  }
  /* This static method is invoked by the pressing of any key. Of course,
     we really only want to handle the Delete, Enter, and Escape keys. */
  static eventKeyDown(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log('Fancytree event DOM HDLmNumberWidget KeyDown');
    let key = event.key;
    /* Check for the Delete key */
    if (key === "Delete") {
      HDLmNumberWidget.eventKeyDownDelete(event);
      return;
    }
    /* Check for the Enter key */
    if (key === "Enter") {
      HDLmNumberWidget.eventKeyDownEnter(event);
      return;
    }
    /* Check for the Escape key */
    if (key === "Escape") {
      HDLmNumberWidget.eventKeyDownEscape(event);
      return;
    }
  }
  /* This static method is invoked by the pressing of the Delete key.
     This method is actually called out of the more general key down
     routine. */
  static eventKeyDownDelete(event) {
    let key = event.key;
    if (key !== "Delete") {
      let errorText = 'Event passed to the Delete routine does not have the Delete key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let numberWidgetCurrent = HDLmWidgetMap[targetId];
    /* Check if delete is enabled for the current number widget. Just
       return to the caller if delete is not enabled for the current
       number widget. */
    if (numberWidgetCurrent.options.delete == false)
      return;
    /* We need to update the number value at this point. This
       is done in two places. First the number widget is updated.
       However, we also need to update the number value. The number
       widget contains a copy of the original value. The number
       value is updated by clearing it. Note that the number value
       becomes an empty string in this case. */
    target.value = '';
    numberWidgetCurrent.numberValue = target.value;
    /* We may need to check the actual value here. This can (and
       should) only be done for some types. Other types can not be
       checked at this time. Some types really can not be checked
       because all values are valid. The update callback routine
       is only invoked if the number value is valid. Callback routines
       are never called if the number value is invalid. */
    let subType = numberWidgetCurrent.options.subType;
    let errorText = numberWidgetCurrent.checkInput(subType, numberWidgetCurrent.numberValue);
    /* Store the error text value. The error text may or may not be
       an empty string. Invoke the display error text method on the
       container widget to update the displayed error text which may
       or may not be an empty string. */
    numberWidgetCurrent.setErrorText(errorText);
    numberWidgetCurrent.inputCallback();
    /* Invoke the update callback routine only if the number value is valid */
    /* console.log('HDLmNumberWidget DD'); */
    /* console.log(errorText); */
    if (errorText == '') {
      numberWidgetCurrent.numberValue = Number(numberWidgetCurrent.numberValue);
      let noErrors = false;
      if (numberWidgetCurrent.containerWidget.getErrorText() == '')
        noErrors = true;
      /* console.log('HDLmNumberWidget DD'); */
      /* console.log(noErrors); */
      /* console.log(errorText); */
      /* console.log(numberWidgetCurrent.containerWidget.getErrorText()); */
      numberWidgetCurrent.updateCallback(numberWidgetCurrent.numberValue, noErrors);
      /* Run the full redraw callback routine - This code was added to do a full redraw.
         We did not do any redraw callback here. This is entirely new code.  This code
         displays the updated last modified date and time (amoung other things). */
      {
        let typeOfFullRedrawCallback = typeof(numberWidgetCurrent.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined')
          numberWidgetCurrent.fullRedrawCallback();
      }
    }
    /* Set the field validity value */
    target.setCustomValidity(errorText);
  }
  /* This static method is invoked by the pressing of the Enter key.
     This method is actually called out of the more general key down
     routine. Enter is generally ignored. */
  static eventKeyDownEnter(event) {
    let key = event.key;
    if (key !== "Enter") {
      let errorText = 'Event passed to the Enter routine does not have the Enter key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let numberWidgetCurrent = HDLmWidgetMap[targetId];
  }
  /* This static method is invoked by the pressing of the Escape key.
     This method is actually called out of the more general key down
     routine. Escape is generally ignored. However, if escape is used
     while a new tree entry is being created, then we need to cancel
     creating/adding the new tree entry. */
  static eventKeyDownEscape(event) {
    let key = event.key;
    if (key !== "Escape") {
      let errorText = 'Event passed to the Escape routine does not have the Escape key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let numberWidgetCurrent = HDLmWidgetMap[targetId];
    /* Invoke the key down (key press) callback routine with the
       current event value. The key down callback routine will
       decide what to do with the current event. */
    numberWidgetCurrent.keyDownCallback(event);
  }
  /* This instance method returns the widget description to the caller */
  getDescription() {
    return this.description;
  }
  /* This instance method returns the widget error text to the caller.
     The error text may be set to an empty string. */
  getErrorText() {
    return this.errorText;
  }
  /* This instance method returns the widget type value to the caller.
     The widget type value was set when the widget was created. */
  getTypeValue() {
    return this.dataType;
  }
  /* This method returns a boolean value showing if the current
     widget is an HTML element selection widget or not. This will
     always be false for number widgets. */
  isElementSelection() {
    return false;
  }
  /* This method returns a boolean value showing if the value for the
     current widget is empty or not. A number widget is considered to be
     empty if the value is a null or if the value of the number is zero. */
  isEmpty() {
    return this.numberValue === null || this.numberValue === 0;
  }
  /* This method actually adds a number widget to an HTML web page.
     The caller provides the DOM element the number widget should be
     added to. This method returns the new DOM element to the caller. */
  render(parentId) {
    /* Make sure the parent ID is a string */
    if (typeof parentId != 'string') {
      let errorText = 'ParentId passed to render is not a string';
      HDLmAssert(false, errorText);
    }
    let newData;
    HDLmWidgetMap[this.newUnique] = this;
    this.setErrorText('');
    let newText = '';
    /* Display the number value */
    newText += '<div><input type=number';
    newText += ' placeholder="';
    newText += this.options.placeHolderText;
    newText += '"';
    /* Set the read only attribute, if need be */
    if (this.options.editable == false ||
        this.readOnly == true)
      newText += ' readonly';
    /* Add the new unique id (note the use of lower case) value */
    newText += ' id="';
    newText += this.newUnique;
    newText += '"';
    /* Add the actual number value */
    newText += ' value="';
    newData = this.numberValue;
    newText += newData;
    newText += '"/>';
    newText += '</div>';
    /* Create a new jQuery array and a new DOM element from the generated HTML */
    let newJQArray = $(newText);
    let newElement = newJQArray[0];
    /* Add the new jQuery array to the values div */
    $(parentId).append(newJQArray);
    /* Add the input event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('input', HDLmNumberWidget.eventInput);
    /* Add the key down event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('keydown', HDLmNumberWidget.eventKeyDown);
    /* Set the field validity information for the number value. The field
       should be valid, but you never know. */
    let subType = this.options.subType;
    if (subType == undefined)
      subType = '';
    let errorText = this.checkInput(subType, this.numberValue);
    this.setErrorText(errorText);
    /* Use jQuery to set find the field using the unique id (note the use
       of lower case) */
    let newSelector = '#' + this.newUnique;
    let newInputField = $(newSelector)[0];
    newInputField.setCustomValidity(errorText);
    return newElement;
  }
  /* This method is used to set the parent container widget value of a number
     widget. The value passed by the caller is copied into the number widget.
     Note that the actual value is copied. */
  setContainerWidget(parentContainerWidget) {
    /* Make sure the parent container widget is really an object */
    if (typeof parentContainerWidget != 'object') {
      let errorText = 'ParentContainerWidget passed to setContainerWidget is not an object';
      HDLmAssert(false, errorText);
    }
    /* Copy the parent container widget reference */
    this.containerWidget = parentContainerWidget;
  }
  /* This method is used to set the description text for the current widget.
     The value passed to this routine must be a string. An error is reported
     if the value passed to this routine is not a string. */
  setDescriptionValue(descriptionValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(descriptionValue) == true) {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof descriptionValue != 'string') {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the description value */
    this.description = descriptionValue;
  }
  /* This method sets the error text field of the current widget to whatever
     error text value was passed by the caller. The error text value passed
     by the caller may or may not be an empty string. */
  setErrorText(newErrorText) {
    /* Make sure the error text string is actually a string */
    if (typeof newErrorText != 'string') {
      let errorText = 'NewErrorText passed to setErrorText is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the error text string */
    this.errorText = newErrorText;
  }
  /* This method can be used to save a reference to the caller full
     redraw callback function. The full redraw callback function is
     invoked whenever the widget must be fully redrawn. This will
     typically happen whenever the contents of the widget have
     changed and the modification must be completely redrawn. */
  setFullRedrawCallback(newFullRedrawCallback) {
    /* Make sure the full redraw callback function is really a function */
    if (newFullRedrawCallback != null && typeof newFullRedrawCallback != 'function') {
      let errorText = 'NewFullRedrawCallback passed to setFullRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.fullRedrawCallback = newFullRedrawCallback;
  }
  /* This method can be used to save a reference to the caller
     input callback function. The input callback function is
     invoked whenever an input event occurs for the current
     widget. */
  setInputCallback(newInputCallback) {
    /* Make sure the input callback function is really a function */
    if (typeof newInputCallback != 'function') {
      let errorText = 'NewInputCallback passed to setInputCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.inputCallback = newInputCallback;
  }
  /* This method can be used to save a reference to the caller key
     down (key press) callback funtion. The key press callback function
     is invoked (may be invoked) when a key press event occurs for the
     current widget. This callback routine is used to handle the key
     press event. */
  setKeyDownCallback(newKeyDownCallback) {
    /* Make sure the key down callback function is really a function */
    if (typeof newKeyDownCallback != 'function') {
      let errorText = 'NewKeyDownCallback passed to setKeyDownCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.keyDownCallback = newKeyDownCallback;
  }
  /* This method is used to set the value of a number widget. The value
     passed by the caller is copied into the number widget. Note that the
     actual number value is copied. The number value stored in the field
     below may actually be a number or it may be a string representation
     of a number. */
  setNumberValue(newNumberValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(newNumberValue) == true) {
      let errorText = 'NewNumberValue passed to setNumberValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a number. Note that a null value is also
       tolerated here. The user must replace the null value with an actual
       number. */
    if (typeof newNumberValue != 'number' &&
        newNumberValue != null) {
      let errorText = 'NewNumberValue passed to setNumberValue method is not a number';
      HDLmAssert(false, errorText);
    }
    /* Copy the number value */
    this.numberValue = newNumberValue;
  }
  /* This method can be used to set any number of options. The
     options passed by the caller will override any existing
     options (which may or may not be default values). */
  setOptions(newOptions) {
    /* Make sure the new options are an object */
    if (typeof newOptions != 'object') {
      let errorText = 'NewOptions passed to setOptions method are not an object';
      HDLmAssert(false, errorText);
    }
    let keys = Object.keys(newOptions);
    let keyLen = keys.length;
    for (let i = 0; i < keyLen; i++) {
      let currentKey = keys[i];
      if (this.options.hasOwnProperty(currentKey) == false) {
        let errorText = 'Property (' + currentKey + ') does not exist in options';
        HDLmAssert(false, errorText);
      }
      this.options[currentKey] = newOptions[currentKey];
    }
  }
  /* This method can be used to save a reference to the caller
     redraw callback function. The redraw callback function is
     invoked whenever the widget must be redrawn. This will
     typically happen whenever the contents of the widget have
     changed. */
  setRedrawCallback(newRedrawCallback) {
    /* Make sure the redraw callback function is really a function */
    if (typeof newRedrawCallback != 'function') {
      let errorText = 'NewRedrawCallback passed to setRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.redrawCallback = newRedrawCallback;
  }
  /* This method is used to set the sub type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setSubTypeValue(subTypeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(subTypeValue) == true) {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof(subTypeValue) != 'string') {
      let errorText = 'SubTypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the sub type value */
    this.subType = subTypeValue;
  }
  /* This method is used to set the type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setTypeValue(typeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(typeValue) == true) {
      let errorText = 'TypeValue passed to setTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof typeValue != 'string') {
      let errorText = 'TypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the type value */
    this.dataType = typeValue;
  }
  /* This method can be used to save a reference to the caller
     update callback function. The update callback function is
     invoked whenever the data value in the widget has been
     changed. This callback is used to update the actual data
     value. The data value in the widget is just a copy of
     the original data value. The update callback routine is
     only invoked if the number value is valid. Callback routines
     are never called if the updated value(s) is/are invalid. */
  setUpdateCallback(newUpdateCallback) {
    /* Make sure the update callback function is really a function */
    if (typeof newUpdateCallback != 'function') {
      let errorText = 'NewUpdateCallback passed to setUpdateCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.updateCallback = newUpdateCallback;
  }
}
/* The HDLmSelectWidget class is used to create select widgets. Select widgets
   are used to choose and display one select option value. The select value may
   or may not be editable. In other words, it may or may not be possible to
   change the selection. */
class HDLmSelectWidget {
  /* Build an HTML select widget class instance */
  constructor() {
    let argsLen = arguments.length;
    /* The next field is a reference to the container widget
       or a null value */
    this.containerWidget = null;
    this.options = Object.assign({}, HDLmSelectWidgetOptions);
    /* The current widget is assumed not be be read-only. This
       may be changed later. */
    this.readOnly = false;
    /* The next field contains a reference to the input callback
       function. This function is invoked whenever an input event
       occurs for the current widget. The value in the widget is
       a copy of the original value. */
    this.inputCallback = null;
    /* The value below is used as the field description. Initially
       this field is set to an empty string. It can be set to an
       actual value by the constructor or by other code. */
    this.description = '';
    /* The field below is used as a copy of the orginal select option value. In
       other words, a copy of the select option value is placed in the field below.
       Changing this value will not change the original select option value. */
    this.selectValue = null;
    /* The field below is used as a reference to the select option values.
       The caller must provide the select option values. The select option
       values are not changed by the selet widget. As a consequence, it is
       OK to use a reference here. */
    this.selectOptions = [];
    /* The next field contains a reference to the redraw callback function.
       This function is invoked whenever the widget object must be redrawn.
       This will typically happen when the contents have changed. */
    this.redrawCallback = null;
    /* The next field contains a reference to the full redraw callback function.
       This function is invoked whenever the widget object must be fully redrawn.
       This will typically happen when the contents have changed and the modification
       must be fully redrawn. */
    this.fullRedrawCallback = null;
    /* The next field contains a reference to the update callback function.
       This function is invoked whenever the data value in the current widget
       object is updated. This function is used to update the actual data
       value after the value in widget is changed. The value in the widget
       is a copy of the original value. The update callback routine is only
       invoked if the select value is valid. Callback routines are never
       called if the updated value(s) is/are invalid. */
    this.updateCallback = null;
    /* The next field contains a reference to the key down (key press) callback
       function. This function is invoked sometimes when a key is pressed for
       the current widget. This function is used to handle the key press event
       in some cases. Note that not all key press events are passed to this
       callback function. The actual code must be checked to determine which
       key press events are passed to this callback function. */
    this.keyDownCallback = null;
    /* The next set of fields contain the type and sub type of the data the
       current widget is displaying. These fields are set when the current
       widget is created. These fields can be queried at any time. */
    this.dataType = null;
    this.subType = null;
    /* The next field contains a reference to the delete key callback function.
       This function is invoked whenever the delete key is used. */
    this.deleteCallback = null;
    /* The next field contains the current error text for the current widget.
       Select widgets can definitely have actual error text. */
    this.errorText = '';
    let argNum = 0;
    /* Check if the invoker of the constructor passed the container widget */
    if (argsLen >= ++argNum)
      this.setContainerWidget(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed any options */
    if (argsLen >= ++argNum)
      this.setOptions(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed an input
       callback function. This function will be called whenever
       an input event occurs for the current widget. */
    if (argsLen >= ++argNum)
      this.setInputCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a description */
    if (argsLen >= ++argNum)
      this.setDescriptionValue(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed a select option value */
    if (argsLen >= ++argNum)
      this.setSelectValue(arguments[argNum-1]);
    /* Check if the invoker of the cconstruction passed a set of
       select option values */
    if (argsLen >= ++argNum)
      this.setSelectOptions(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed an update
       redraw callback function. This function will be called
       whenever the current widget must be redrawn because the
       contents have changed. */
    if (argsLen >= ++argNum)
      this.setRedrawCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed an update
       callback function. This function will be called whenever
       the data value in current widget has been changed. The
       update callback routine is only invoked if the select
       value is valid. Callback routines are never called if
       the updated value(s) is/are invalid. */
    if (argsLen >= ++argNum)
      this.setUpdateCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a key down
       (key press) callback function. This function may or may not
       be called whenever a key press event occurs for the current
       widget. The actual code must be checked to determine if this
       routine will be invoked for a given key press event. */
    if (argsLen >= ++argNum)
      this.setKeyDownCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a type value.
       The type value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a sub type value.
       The subtype value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setSubTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a full redraw
       callback function. This function will be called whenever the
       current widget must be fully redrawn because the contents have
       changed. */
    if (argsLen >= ++argNum)
      this.setFullRedrawCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a delete
       callback function. This function will be called whenever
       the delete key is used with the current widget. */
    if (argsLen >= ++argNum)
      this.setDeleteCallback(arguments[argNum - 1]);
    /* Generate a new unique id value (note the use of lower case)
       for the new HTML elements. Associate the new unique id value
       with the current class instance. */
    this.newUnique = HDLmUtility.generateId();
  }
  /* This class instance method is invoked to validate an input field.
     The caller provids the field type and the field value. This routine
     determines if the field is valid and either returns an empty string
     or an error message to the caller. */
  checkInput(subType, currentWidget, value, valueList) {
    let errorText = '';
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check for a type list value. Only a few specific values are
         allowed for type list values. Note that the type list value
         must not be empty. */
      if (subType == 'typelist'              ||
          subType == 'editableproxytypelist' ||
          subType == 'editableruletypelist') {
        value = value.trim();
        /* Check if the current value is in the list of vales. The
           current value should be in the list of values. */
        if (!(value in valueList)) {
          errorText = currentWidget.errorMessageNotSpecified();
          break;
        }
      }
      /* Check for a protocol list value. Only a few specific values are
         allowed for protocol list values. Note that the protocol list
         value must not be empty. */
      if (subType == 'protocollist' ||
          subType == 'editableprotocollist') {
        value = value.trim();
        /* Check if the current value is in the list of vales. The
           current value should be in the list of values. */
        if (!(value in valueList)) {
          errorText = currentWidget.errorMessageNotSpecified();
          break;
        }
      }
      break;
    }
    return errorText;
  }
  /* This static method build a specific error message that is needed
     in a few places. The error message is returned to the caller. */
  errorMessageNotSpecified() {
    let errorText;
    errorText = 'Select value for ' + this.getDescription().toLowerCase() + ' not specified';
    return errorText;
  }
  /* This static method is invoked when an input event occurs. An
     input event occurs whenever an select element is changed in any
     way. */
  static eventInput(event) {
    /* console.log('In HDLmSelectWidget.eventInput'); */
    let rvStr = '';
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log(`Fancytree event DOM HDLmSelectWidget Input Type (${event.inputType})`);
    /* Check for an input event we need to ignore. Strangely enough this
       input event occurs even after the widget is removed / deleted. Why
       is not clear. */
    if (event.inputType == 'historyRedo' ||
        event.inputType == 'historyUndo')
      return;
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let selectWidgetCurrent = HDLmWidgetMap[targetId];
    /* Store the error text value. The error text may or may not be
       an empty string. Invoke the display error text method on the
       container widget to update the displayed error text. In this
       case, the error text is set to an empty string because we now
       have an actual select option value. */
    let errorText = '';
    selectWidgetCurrent.setErrorText(errorText);
    selectWidgetCurrent.inputCallback();
    /* console.log('In HDLmSelectWidget.eventInput'); */
    /* We need to update the actual select option value at this point.
       This is done in two places. First the select widget is updated.
       However, we also need to update the actual select option value.
       The select widget contains a copy of the original select option
       value. */
    selectWidgetCurrent.selectValue = target.value;
    /* Invoke the update callback routine only if the new select value
       is valid */
    if (errorText == '') {
      let noErrors = false;
      /* At this point we may not really want to update the server. If we just set
         the select list to a specific value, then this will cause a new field to
         be added to the current modification. The new field will almost certainly
         have an error associated with it. As a consequence, we should not update
         the server at this point, because the modification is not really done. */
      /* This code causes certain problems. For example, if a protocol is set to 
         a valid value, then the value won't be written out to the database. The 
         modification will be updated in memory, but not on disk. The updated value
         will be (may be) shown, but not updated in the rule database. */
      if (noErrors == true)
        noErrors = false;
      /* console.log('In HDLmSelectWidget.eventInput'); */
      rvStr = selectWidgetCurrent.updateCallback(selectWidgetCurrent.selectValue, noErrors);
      /* Run the full redraw callback routine - This code was added to do a full redraw.
         We did not do any redraw callback here. This is entirely new code.  This code
         displays the updated last modified date and time (amoung other things). */
      {
        let typeOfFullRedrawCallback = typeof(selectWidgetCurrent.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined')   
          selectWidgetCurrent.fullRedrawCallback();
      }
    }
    /* Set the field validity value based on the current error text */
    target.setCustomValidity(errorText);
    /* Invoke the redraw callback routine only if the select value
       is valid and the invoke redraw flag is true */
    if (errorText === '' &&
        selectWidgetCurrent.options.invokeRedraw === true)
      selectWidgetCurrent.redrawCallback();
    /* Check if a full redraw has been requested. If this is correct,
       invoke the full redraw callback routine. */
    if (rvStr == 'fullRedraw') {
      let typeOfFullRedrawCallback = typeof(selectWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined') 
        selectWidgetCurrent.fullRedrawCallback();
    }
  }
  /* This static method is invoked by the pressing of any key. Of course,
     we really only want to handle the Delete, Enter, and Escape keys. */
  static eventKeyDown(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log('Fancytree event DOM HDLmSelectWidget KeyDown');
    let key = event.key;
    /* Check for the Delete key */
    if (key === "Delete") {
      HDLmSelectWidget.eventKeyDownDelete(event);
      return;
    }
    /* Check for the Enter key */
    if (key === "Enter") {
      HDLmSelectWidget.eventKeyDownEnter(event);
      return;
    }
    /* Check for the Escape key */
    if (key === "Escape") {
      HDLmSelectWidget.eventKeyDownEscape(event);
      return;
    }
  }
  /* This static method is invoked by the pressing of the Delete key.
     This method is actually called out of the more general key down
     routine. */
  static eventKeyDownDelete(event) {
    let rvStr = '';
    let key = event.key;
    if (key !== "Delete") {
      let errorText = 'Event passed to the Delete routine does not have the Delete key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let selectWidgetCurrent = HDLmWidgetMap[targetId];
    /* Check if delete is enabled for the current select widget. Just
       return to the caller if delete is not enabled for the current
       select widget. */
    if (selectWidgetCurrent.options.delete == false)
      return;
    /* At this point we need to invoke the delete callback function.
       This function was provided by the code that created this widget.
       The delete callback function will do whatever work is needed
       and return back to this routine. It is assumed that the delete
       callback will make some number of changes. The full redraw
       callback is invoked so that the user can see changes. */
    selectWidgetCurrent.deleteCallback();
    {
      let typeOfFullRedrawCallback = typeof(selectWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined') 
        selectWidgetCurrent.fullRedrawCallback();
    }
    /* We need to update the select value at this point. This
       is done in two places. First the select widget is updated.
       However, we also need to update the select option value.
       The select widget contains a copy of the original select
       option value. The select option value is updated by setting
       it to the first select option value.

       The following code is no longer really in use. Most select
       lists are not editable. They are really read-only. If the
       select list is not read-only, then we just want to set the
       select value back to the placeholder text. Note that select
       lists don't really support placeholder text. Placeholder
       text is simulated for select fields.

       At present we don't have a way to set the select back to the
       simulated placeholder text.

       This is no longer true. A way has been found (see below) for
       setting the select back to the simulated placeholder text. */
    target.value = '';
    selectWidgetCurrent.selectValue = target.value;
    target.selectedIndex = 0;
    let subType = selectWidgetCurrent.options.subType;
    let errorText = selectWidgetCurrent.checkInput(subType,
                                                   selectWidgetCurrent,
                                                   selectWidgetCurrent.selectValue,
                                                   selectWidgetCurrent.selectOptions);
    /* Store the error text value. The error text may or may not be
       an empty string. Invoke the display error text method on the
       container widget to update the displayed error text which may
       or may not be an empty string. */
    selectWidgetCurrent.setErrorText(errorText);
    selectWidgetCurrent.inputCallback();
    /* Invoke the update callback routine only if the new select value
       is valid */
    if (errorText == '') {
      let noErrors = false;
      if (HDLmGlobals.checkForInlineEditor())
        noErrors = true;
      /* At this point we may not really want to update the server. If we just set
         the select list to a specific value, then this will cause a new field to
         be added to the current modification. The new field will almost certainly
         have an error associated with it. As a consequence, we should not update
         the server at this point, because the modification is not really done. */
      if (noErrors == true)
        noErrors = false;
      rvStr = selectWidgetCurrent.updateCallback(selectWidgetCurrent.selectValue, noErrors);
      /* Run the full redraw callback routine - This code was added to do a full redraw.
         We did not do any redraw callback here. This is entirely new code.  This code
         displays the updated last modified date and time (amoung other things). */
      {
        let typeOfFullRedrawCallback = typeof(selectWidgetCurrent.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined') 
          selectWidgetCurrent.fullRedrawCallback();
      }
    }
    /* Set the field validity value based on the current error text */
    target.setCustomValidity(errorText);
    /* Invoke the redraw callback routine only if the select value
       is valid and the invoke redraw flag is true */
    if (errorText === '' &&
        selectWidgetCurrent.options.invokeRedraw === true)
      selectWidgetCurrent.redrawCallback();
    /* Check if a full redraw has been requested. If this is correct,
       invoke the full redraw callback routine. */
    if (rvStr == 'fullRedraw') {
      let typeOfFullRedrawCallback = typeof(selectWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined') 
        selectWidgetCurrent.fullRedrawCallback();
    }
  }
  /* This static method is invoked by the pressing of the Enter key.
     This method is actually called out of the more general key down
     routine. Enter is generally ignored. */
  static eventKeyDownEnter(event) {
    let key = event.key;
    if (key !== "Enter") {
      let errorText = 'Event passed to the Enter routine does not have the Enter key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let selectWidgetCurrent = HDLmWidgetMap[targetId];
  }
  /* This static method is invoked by the pressing of the Escape key.
     This method is actually called out of the more general key down
     routine. Escape is generally ignored. However, if escape is used
     while a new tree entry is being created, then we need to cancel
     creating/adding the new tree entry. */
  static eventKeyDownEscape(event) {
    let key = event.key;
    if (key !== "Escape") {
      let errorText = 'Event passed to the Escape routine does not have the Escape key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let selectWidgetCurrent = HDLmWidgetMap[targetId];
    /* Invoke the key down (key press) callback routine with the
       current event value. The key down callback routine will
       decide what to do with the current event. */
    selectWidgetCurrent.keyDownCallback(event);
  }
  /* This instance method returns the widget description to the caller */
  getDescription() {
    return this.description;
  }
  /* This instance method returns the widget error text to the caller.
     The error text may be set to an empty string. */
  getErrorText() {
    return this.errorText;
  }
  /* This instance method returns the widget type value to the caller.
     The widget type value was set when the widget was created. */
  getTypeValue() {
    return this.dataType;
  }
  /* This method returns a boolean value showing if the current
     widget is an HTML element selection widget or not. This will
     always be false for select widgets. */
  isElementSelection() {
    return false;
  }
  /* This method returns a boolean value showing if the value for the
     current widget is empty or not. A select widget is considered to be
     empty if the value is a null. */
  isEmpty() {
    return this.selectValue === null;
  }
  /* This method actually adds a select widget to an HTML web page.
     The caller provides the DOM element the select widget should be
     added to. This method returns the new DOM element to the caller. */
  render(parentId) {
    /* Make sure the parent ID is a string */
    if (typeof parentId != 'string') {
      let errorText = 'ParentId passed to render is not a string';
      HDLmAssert(false, errorText);
    }
    let newData;
    HDLmWidgetMap[this.newUnique] = this;
    this.setErrorText('');
    let newText = '';
    let selectMatchFound = false;
    /* Display the select value */
    newText += '<div';
    newText += '>';
    newText += '<';
    newText += 'select';
    /* It appears that placeholder text is not supported for select lists
       This is true for the outer <div> HTML element. The placeholder text
       can be specified using the first option of the select list. This is
       not quite right (the placeholder text is not grayed out). However,
       it does work to some degree. As a consequence, we do use the first
       select option as the placeholder text. */
    if (1 == 2) {
      newText += ' placeholder="';
      newText += this.options.placeHolderText;
      newText += '"';
    }
    /* Set the read only attribute, if need be. For select elements,
       disabled must be used instead. */
    if (this.options.editable == false ||
        this.readOnly == true)
      newText += ' disabled';
    /* We need to determine if one of the select options has
       been specified. This flag is checked later for all
       sorts of reasons. */
    let selectOptionsLength;
    selectOptionsLength = this.selectOptions.length;
    for (let i = 0; i < selectOptionsLength; i++) {
      /* Check if we have a matching select option value. If we have
         a match, set a flag showing that we found a match. */
      if (this.selectValue == this.selectOptions[i]) {
        selectMatchFound = true;
        break;
      }
    }
    /* Add the new unique id (note the use of lower case) value */
    newText += ' id="';
    newText += this.newUnique;
    newText += '"';
    /* A special value is added here if one of the select options
       has not been specified. This really should be done using the
       set custom validity API. However, the set custom validity API
       does not work with select option lists for some reason. Of
       course this produces a different effect, but that is the best
       we can do for now. */
    if (selectMatchFound == false)
      newText += ' style="color:red;"';
    newText += '>';
    /* Build a special option value that serves as the placeholder text.
       Of course, this isn't real placeholder text and is not grayed out
       as it should be. However, it is the best we can do for now. */
    if (this.options.editable == true) {
      newText += '<option';
      newText += ' hidden disabled selected';
      newText += '>';
      newText += this.options.placeHolderText;
      newText += '</option>';
    }
    /* Build the list of select option values */
    for (let i = 0; i < selectOptionsLength; i++) {
      newText += '<option';
      /* Check if we have a matching select option value. If we have
         a match, use it. We used to do this only if the editable
         option was set to false.

         This is done in all cases now. That means that select list
         can be editiable, but we will still try to match one of the
         current values with the entries in the list. */
      /* if (this.options.editable == false && */
      if (this.selectValue == this.selectOptions[i]) {
        newText += ' selected';
        selectMatchFound = true;
      }
      /* We want to force the color of each of the options. However,
         we only need to do this if the color of the select list was
         changed. None of this should be necessary. However, the set
         custom validity API does not seem to be working (no color
         change) for select lists. */
      /* console.log(selectMatchFound); */
      /* console.log(this); */
      if (selectMatchFound == false)
        newText += ' style="color:black"';
      newText += '>';
      newText += this.selectOptions[i];
      newText += '</option>';
    }
    newText += '</select></div>';
    /* Check if a matching select value was found. If no matching select
       option value was found, generate an error message. */
    if (selectMatchFound == false)
      this.errorText = this.errorMessageNotSpecified();
    /* Create a new jQuery array and a new DOM element from the generated HTML */
    let newJQArray = $(newText);
    /* console.log(newText); */
    /* console.log(newJQArray); */
    let newElement = newJQArray[0];
    /* console.log(newElement); */
    /* Add the new jQuery array to the values div */
    $(parentId).append(newJQArray);
    /* console.log(parentId); */
    /* console.log($(parentId)); */
    /* console.log(newJQArray); */
    /* Add the input event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('input', HDLmSelectWidget.eventInput);
    /* Add the key down event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('keydown', HDLmSelectWidget.eventKeyDown);
    /* Use jQuery to set find the field using the unique id (note the use
       of lower case). Note that this code is always executed even if the
       error text field is not set. It is important to call the set custom
       validity routine, even if the error text is not set. */
    if (this.errorText != '' ||
        this.errorText == '') {
      let newSelector = '#' + this.newUnique;
      /* console.log(newSelector); */
      let newInputField = $(newSelector)[0];
      /* console.log($(newSelector)); */
      /* console.log(newInputField); */
      /* console.log(this.errorText); */
      /* The set custom validity call below does set the hover
         error text to the correct value. However, the call does
         not set the field to a special color. Why is not clear. */
      newInputField.setCustomValidity(this.errorText);
    }
    return newElement;
  }
  /* This method is used to set the parent container widget value of a select
     widget. The value passed by the caller is copied into the select widget.
     Note that the actual value is copied. */
  setContainerWidget(parentContainerWidget) {
    /* Make sure the parent container widget is really an object */
    if (typeof parentContainerWidget != 'object') {
      let errorText = 'ParentContainerWidget passed to setContainerWidget is not an object';
      HDLmAssert(false, errorText);
    }
    /* Copy the parent container widget reference */
    this.containerWidget = parentContainerWidget;
  }
  /* This method can be used to save a reference to the caller delete
     key callback function. The delete key callback function is invoked
     whenever the delete key is used. */
  setDeleteCallback(newDeleteCallback) {
    /* Make sure the delete key callback function is really a function */
    if (newDeleteCallback != null && typeof newDeleteCallback != 'function') {
      let errorText = 'NewDeleteCallback passed to setDeleteCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.deleteCallback = newDeleteCallback;
  }
  /* This method is used to set the description text for the current widget.
     The value passed to this routine must be a string. An error is reported
     if the value passed to this routine is not a string. */
  setDescriptionValue(descriptionValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(descriptionValue) == true) {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof descriptionValue != 'string') {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the description value */
    this.description = descriptionValue;
  }
  /* This method sets the error text field of the current widget to whatever
     error text value was passed by the caller. The error text value passed
     by the caller may or may not be an empty string. */
  setErrorText(newErrorText) {
    /* Make sure the error text string is actually a string */
    if (typeof newErrorText != 'string') {
      let errorText = 'NewErrorText passed to setErrorText is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the error text string */
    this.errorText = newErrorText;
  }
  /* This method can be used to save a reference to the caller full
     redraw callback function. The full redraw callback function is
     invoked whenever the widget must be fully redrawn. This will
     typically happen whenever the contents of the widget have
     changed and the modification must be completely redrawn. */
  setFullRedrawCallback(newFullRedrawCallback) {
    /* Make sure the full redraw callback function is really a function */
    if (newFullRedrawCallback != null && typeof newFullRedrawCallback != 'function') {
      let errorText = 'NewFullRedrawCallback passed to setFullRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.fullRedrawCallback = newFullRedrawCallback;
  }
  /* This method can be used to save a reference to the caller
     input callback function. The input callback function is
     invoked whenever an input event occurs for the current
     widget. */
  setInputCallback(newInputCallback) {
    /* Make sure the input callback function is really a function */
    if (typeof newInputCallback != 'function') {
      let errorText = 'NewInputCallback passed to setInputCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.inputCallback = newInputCallback;
  }
  /* This method can be used to save a reference to the caller key
     down (key press) callback funtion. The key press callback function
     is invoked (may be invoked) when a key press event occurs for the
     current widget. This callback routine is used to handle the key
     press event. */
  setKeyDownCallback(newKeyDownCallback) {
    /* Make sure the key down callback function is really a function */
    if (typeof newKeyDownCallback != 'function') {
      let errorText = 'NewKeyDownCallback passed to setKeyDownCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.keyDownCallback = newKeyDownCallback;
  }
  /* This method can be used to set any number of options. The
     options passed by the caller will override any existing
     options (which may or may not be default values). */
  setOptions(newOptions) {
    /* Make sure the new options are an object */
    if (typeof newOptions != 'object') {
      let errorText = 'NewOptions passed to setOptions method are not an object';
      HDLmAssert(false, errorText);
    }
    let keys = Object.keys(newOptions);
    let keyLen = keys.length;
    for (let i = 0; i < keyLen; i++) {
      let currentKey = keys[i];
      if (this.options.hasOwnProperty(currentKey) == false) {
        let errorText = 'Property (' + currentKey + ') does not exist in options';
        HDLmAssert(false, errorText);
      }
      this.options[currentKey] = newOptions[currentKey];
    }
  }
  /* This method can be used to save a reference to the caller
     redraw callback function. The redraw callback function is
     invoked whenever the widget must be redrawn. This will
     typically happen whenever the contents of the widget have
     changed. */
  setRedrawCallback(newRedrawCallback) {
    /* Make sure the redraw callback function is really a function */
    if (typeof newRedrawCallback != 'function') {
      let errorText = 'NewRedrawCallback passed to setRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.redrawCallback = newRedrawCallback;
  }
  /* This method is used to set the select options for a select widget.
     The values passed by the caller are not copied into the select
     widget. Instead, a refrence to the select options is copied into
     the select widget. */
  setSelectOptions(newSelectOptions) {
    /* Make sure the arguments are an array */
    if (Array.isArray(newSelectOptions) == false) {
      let errorText = 'NewSelectOptions passed to setSelectOptions method are bit an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure each select option is a string */
    let newSelectLength = newSelectOptions.length;
    for (let i = 0; i < newSelectLength; i++) {
      let selectOption = newSelectOptions[i];
      /* Make sure the select option is a string */
      if (typeof selectOption != 'string') {
        let errorText = 'Option (' + i + ') passed to setSelectOptions method is not a string';
        HDLmAssert(false, errorText);
      }
    }
    /* Copy the select options reference */
    this.selectOptions = newSelectOptions;
  }
  /* This method is used to set the value of a select widget. The value
     passed by the caller is copied into the select widget. Note that the
     actual select option value is copied. */
  setSelectValue(newSelectValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(newSelectValue) == true) {
      let errorText = 'NewSelectValue passed to setSelectValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof newSelectValue != 'string') {
      let errorText = 'NewSelectValue passed to setSelectValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the select value */
    this.selectValue = newSelectValue;
  }
  /* This method is used to set the sub type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setSubTypeValue(subTypeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(subTypeValue) == true) {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof subTypeValue != 'string') {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the sub type value */
    this.subType = subTypeValue;
  }
  /* This method is used to set the type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setTypeValue(typeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(typeValue) == true) {
      let errorText = 'TypeValue passed to setTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof typeValue != 'string') {
      let errorText = 'TypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the type value */
    this.dataType = typeValue;
  }
  /* This method can be used to save a reference to the caller
     update callback function. The update callback function is
     invoked whenever the data value in the widget has been
     changed. This callback is used to update the actual data
     value. The data value in the widget is just a copy of
     the original data value. The update callback routine is
     only invoked if the select value is valid. Callback routines
     are never called if the updated value(s) is/are invalid. */
  setUpdateCallback(newUpdateCallback) {
    /* Make sure the update callback function is really a function */
    if (typeof newUpdateCallback != 'function') {
      let errorText = 'NewUpdateCallback passed to setUpdateCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.updateCallback = newUpdateCallback;
  }
}
/* The HDLmTableWidget class is used to create HTML table widgets. Tabke widgets
   are used to display one HTML table value. The HTML talbe value is not editable. */
class HDLmTableWidget {
  /* Build an HTML table widget class instance */
  constructor() {
    let argsLen = arguments.length;
    /* The next field is a reference to the container widget
       or a null value */
    this.containerWidget = null;
    this.options = Object.assign({}, HDLmTableWidgetOptions);
    /* The current widget is assumed not be be read-only. This
       may be changed later. */
    this.readOnly = false;
    /* The next field contains a reference to the input callback
       function. This function is invoked whenever an input event
       occurs for the current widget. The value in the widget is
       a copy of the original value. */
    this.inputCallback = null;
    /* The value below is used as the field description. Initially
       this field is set to an empty string. It can be set to an
       actual value by the constructor or by other code. */
    this.description = '';
    /* The field below is used as a copy of the orginal table value. In
       other words, a copy of the table value is placed in the field below.
       Changing this value will not change the original table value.

       Tables are handles as JavaScript arrays. Each element of the
       array must be an array. The first array has the table headings.
       The second array has the first row of actual data. All of the
       arrays must be the same size. The size value must be the number
       of columns. */
    this.tableValue = null;
    /* The next field contains a reference to the update callback function.
       This function is invoked whenever the data value in the current widget
       object is updated. This function is used to update the actual data
       value after the value in widget is changed. The value in the widget
       is a copy of the original value. The update callback routine is only
       invoked if the table value is valid. Callback routines are never
       called if the updated value(s) is/are invalid. */
    this.updateCallback = null;
    /* The next field contains a reference to the key down (key press) callback
       function. This function is invoked sometimes when a key is pressed for
       the current widget. This function is used to handle the key press event
       in some cases. Note that not all key press events are passed to this
       callback function. The actual code must be checked to determine which
       key press events are passed to this callback function. */
    this.keyDownCallback = null;
    /* The next set of fields contain the type and sub type of the data the
       current widget is displaying. These fields are set when the current
       widget is created. These fields can be queried at any time. */
    this.dataType = null;
    this.subType = null;
    /* The next field contains a reference to the redraw callback function.
       This function is invoked whenever the widget object must be redrawn.
       This will typically happen when the contents have changed. */
    this.redrawCallback = null;
    /* The next field contains a reference to the full redraw callback function.
       This function is invoked whenever the widget object must be fully redrawn.
       This will typically happen when the contents have changed and the modification
       must be fully redrawn. */
    this.fullRedrawCallback = null;
    /* The next field contains a reference to the current modification. This value
       will be null in many cases. We generally don't need a reference to the current
       modification. However, in some cases, we do need this value. */
    this.currentModification = null;
    /* The next field contains a reference to the mouse (left-click) callback
       function. This function is invoked sometimes when a mouse is clicked for
       the current widget. This function is used to handle the mouse event
       in some cases. Note that not all mouse events are passed to this
       callback function. The actual code must be checked to determine which
       mouse events are passed to this callback function. */
    this.clickCallback = null;
    /* The next field contains the current error text for the current widget.
       Table widgets can definitely have actual error text. */
    this.errorText = '';
    let argNum = 0;
    /* Check if the invoker of the constructor passed the container widget */
    if (argsLen >= ++argNum)
      this.setContainerWidget(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed any options */
    if (argsLen >= ++argNum)
      this.setOptions(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed an input
       callback function. This function will be called whenever
       an input event occurs for the current widget. */
    if (argsLen >= ++argNum)
      this.setInputCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a description */
    if (argsLen >= ++argNum)
      this.setDescriptionValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a table value.
       The table value is always an array of arrays. */
    if (argsLen >= ++argNum)
      this.setTableValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed an update
       callback function. This function will be called whenever
       the data value in current widget has been changed. The
       update callback routine is only invoked if the table value
       is valid. Callback routines are never called if the updated
       value(s) is/are invalid. */
    if (argsLen >= ++argNum)
      this.setUpdateCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a key down
       (key press) callback function. This function may or may not
       be called whenever a key press event occurs for the current
       widget. The actual code must be checked to determine if this
       routine will be invoked for a given key press event. */
    if (argsLen >= ++argNum)
      this.setKeyDownCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a type value.
       The type value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a sub type value.
       The subtype value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setSubTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed an update
       redraw callback function. This function will be called
       whenever the current widget must be redrawn because the
       contents have changed. */
    if (argsLen >= ++argNum)
      this.setRedrawCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a reference to the
       current modification. This will only be true (the value will not
       be null) in some cases. We need to store this value for use later. */
    if (argsLen >= ++argNum)
      this.setCurrentModification(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a mouse
       (left-click) callback function. This function may or may not
       be called whenever a mouse click event occurs for the current
       widget. The actual code must be checked to determine if this
       routine will be invoked for a given mouse click event. */
    if (argsLen >= ++argNum)
      this.setClickCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a full redraw
       callback function. This function will be called whenever the
       current widget must be fully redrawn because the contents have
       changed. */
    if (argsLen >= ++argNum)
      this.setFullRedrawCallback(arguments[argNum - 1]);
    /* Generate a new unique id value (note the use of lower case)
       for the new HTML elements. Associate the new unique id value
       with the current class instance. */
    this.newUnique = HDLmUtility.generateId();
  }
  /* This class instance method is invoked to validate an input field.
     The caller provides the field type and the field value. This routine
     determines if the field is valid and either returns an empty string
     or an error message to the caller. */
  checkInput(subType,
             value,
             currentModification,
             enterMessageNeeded) {
    let errorText = '';
    let removeTails = true;
    /* The dummy loop below is used to allow break to work */
    while (true) {
      break;
    }
    return errorText;
  }
  /* This static method is invoked when a click event occurs. A
     click event occurs whenever the mouse is used to click on a
     field. The field does not have to be an input field. */
  static eventClick(event) {
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    /* Invoke the mouse (left-click) callback routine with the
       current event value. The mouse callback routine will
       decide what to do with the current event. */
    let targetIdSplit = targetId.split('_');
    let targetIdBase = targetIdSplit[0];
    let tableWidgetCurrent = HDLmWidgetMap[targetIdBase];
    tableWidgetCurrent.clickCallback(event, targetId);
  }
  /* This static method is invoked when an input event occurs. An
     input event occurs whenever an input field is changed in any
     way. */
  static eventInput(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log(`Fancytree event DOM HDLmTableWidget Input Type (${event.inputType})`);
    /* Check for an input event we need to ignore. Strangely enough this
       input event occurs even after the widget is removed /deleted. Why
       is not clear. */
    if (event.inputType == 'historyRedo' ||
        event.inputType == 'historyUndo')
      return;
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let tableWidgetCurrent = HDLmWidgetMap[targetId];
  }
  /* This static method is invoked by the pressing of any key. Of course,
     we really only want to handle the Delete, Enter, and Escape keys. */
  static eventKeyDown(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log('Fancytree event DOM HDLmTableWidget KeyDown');
    let key = event.key;
    /* Check for the Delete key */
    if (key === "Delete") {
      HDLmTableWidget.eventKeyDownDelete(event);
      return;
    }
    /* Check for the Enter key */
    if (key === "Enter") {
      HDLmTableWidget.eventKeyDownEnter(event);
      return;
    }
    /* Check for the Escape key */
    if (key === "Escape") {
      HDLmTableWidget.eventKeyDownEscape(event);
      return;
    }
  }
  /* This static method is invoked by the pressing of the Delete key.
     This method is actually called out of the more general key down
     routine. */
  static eventKeyDownDelete(event) {
    let key = event.key;
    if (key !== "Delete") {
      let errorText = 'Event passed to the Delete routine does not have the Delete key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let tableWidgetCurrent = HDLmWidgetMap[targetId];
  }
  /* This static method is invoked by the pressing of the Enter key.
     This method is actually called out of the more general key down
     routine. Enter is generally ignored. */
  static eventKeyDownEnter(event) {
    let key = event.key;
    if (key !== "Enter") {
      let errorText = 'Event passed to the Enter routine does not have the Enter key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let tableWidgetCurrent = HDLmWidgetMap[targetId];
  }
  /* This static method is invoked by the pressing of the Escape key.
     This method is actually called out of the more general key down
     routine. Escape is generally ignored. However, if escape is used
     while a new tree entry is being created, then we need to cancel
     creating/adding the new tree entry. */
  static eventKeyDownEscape(event) {
    let key = event.key;
    if (key !== "Escape") {
      let errorText = 'Event passed to the Escape routine does not have the Escape key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let tableWidgetCurrent = HDLmWidgetMap[targetId];
    /* Invoke the key down (key press) callback routine with the
       current event value. The key down callback routine will
       decide what to do with the current event. */
    tableWidgetCurrent.keyDownCallback(event);
  }
  /* This instance method returns the widget description to the caller */
  getDescription() {
    return this.description;
  }
  /* This instance method returns the widget error text to the caller.
     The error text may be set to an empty string. */
  getErrorText() {
    return this.errorText;
  }
  /* This instance method returns the widget type value to the caller.
     The widget type value was set when the widget was created. */
  getTypeValue() {
    return this.dataType;
  }
  /* This method returns a boolean value showing if the current
     widget is an HTML element selection widget or not. The widget
     options must be checked to determine this value. */
  isElementSelection() {
    return this.options.elementSelection;
  }
  /* This method returns a boolean value showing if the value for the
     current widget is empty or not. A table widget is considered to be
     empty if the value is a null or if the table value length is zero. */
  isEmpty() {
    return this.tableValue === null || this.tableValue.length === 0;
  }
  /* This method actually adds a table widget to an HTML web page.
     The caller provides the DOM element the table widget should be
     added to. This method returns the new DOM element to the caller. */
  render(parentId) {
    /* Make sure the parent ID is a string */
    if (typeof parentId != 'string') {
      let errorText = 'ParentId passed to render is not a string';
      HDLmAssert(false, errorText);
    }
    let newData;
    HDLmWidgetMap[this.newUnique] = this;
    this.setErrorText('');
    let newStyle = '';
    let newText = '';
    /* Display the table value */
    newText += '<div>';
    newText += '<table';
    /* Make the table bold if the appropriate option was set */
    if (this.options.bold == true)
      newStyle += 'font-weight:bold;';
    if (this.options.boldBox == true)
      newStyle += 'border:1px solid;';
    if (newStyle != '')
      newText += ' style="' + newStyle + '"';
    if (typeof(this.options.sizeValue) != 'undefined' &&
        this.options.sizeValue         != 'default'   &&
        this.options.sizeValue         != '') {
      newText += ' size="';
      newText += this.options.sizeValue;
      newText += '"';
    }
    newText += ' placeholder="';
    newText += this.options.placeHolderText;
    newText += '"';
    /* Set the read only attribute, if need be */
    if (this.options.editable == false ||
        this.readOnly == true)
      newText += ' readonly';
    /* Disable the spell checker, if need be */
    if (this.options.spellCheck == false)
      newText += ' spellcheck="false"';
    /* Add the new unique id (note the use of lower case) value */
    newText += ' id="';
    newText += this.newUnique;
    newText += '"';
    /* Finish the HTML table element */
    newText += '>';
    /* Build all of the table rows */
    let i = -1;
    for (let curRow of this.tableValue) {
      i += 1;
      newText += '<tr>';
      /* Handle the current row */
      for (let curData of curRow) {
        /* Check if some very special formatting is needed */
        let extraAttr = '';
        if (curData.startsWith('Fix001')) {
          curData = curData.substr(6);
          extraAttr = ' style="color:blue;text-decoration:underline;"';
        }
        /* Handle each of the data items in the current row */
        newText += (i == 0) ? '<th>' : '<td id="' + this.newUnique + "_" + i +'"' + extraAttr + '>';
        newText += curData;
        newText += (i == 0) ? '</th>' : '</td>';
      }
      newText += '</tr>';
    }
    newText += '</table>';
    newText += '</div>';
    /* Create a new jQuery array and a new DOM element from the generated HTML */
    let newJQArray = $(newText);
    let newElement = newJQArray[0];
    /* Add the new jQuery array to the values div */
    $(parentId).append(newJQArray);
    /* Add the input event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('input', HDLmTableWidget.eventInput);
    /* Add the key down event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('keydown', HDLmTableWidget.eventKeyDown);
    /* Add the click event listener, if need be */
    if (this.options.clickable == true)
      newElement.addEventListener('click', HDLmTableWidget.eventClick);
    /* Set the field validity information for the table value. The field
       should be valid, but you never know. Note that the code below sets
       the widget error text field based on the current text value. The
       widget error text field is also used to set the validity indicator. */
    let checkInputErrorMessageNeeded = false;
    let subType = this.options.subType;
    let errorText = this.checkInput(subType,
                                    this.textValue,
                                    this.currentModification,
                                    checkInputErrorMessageNeeded);
    this.setErrorText(errorText);
    /* Use jQuery to set find the field using the unique id (note the use
       of lower case) */
    let newSelector = '#' + this.newUnique;
    let newInputField = $(newSelector)[0];
    if (this.options.editable == true)
      newInputField.setCustomValidity(errorText);
    return newElement;
  }
  /* This method can be used to save a reference to the caller mouse
     (left-click) callback funtion. The mouse callback function
     is invoked (may be invoked) when a mouse event occurs for the
     current widget. This callback routine is used to handle the
     mouse event. */
  setClickCallback(newClickCallback) {
    /* Make sure the mouse callback function is really a function */
    if (typeof newClickCallback != 'function') {
      let errorText = 'NewClickCallback passed to setClickCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.clickCallback = newClickCallback;
  }
  /* This method is used to set the parent container widget value of a table
     widget. The value passed by the caller is copied into the table widget.
     Note that the actual value is copied. */
  setContainerWidget(parentContainerWidget) {
    /* Make sure the parent container widget is really an object */
    if (typeof parentContainerWidget != 'object') {
      let errorText = 'ParentContainerWidget passed to setContainerWidget is not an object';
      HDLmAssert(false, errorText);
    }
    /* Copy the parent container widget reference */
    this.containerWidget = parentContainerWidget;
  }
  /* This method is used to set the address of the current modification for
     use later. This method will be pass a null value in most (but not all)
     cases. The value is stored in a class variable for use later. */
  setCurrentModification(newCurrentModification) {
    /* Make sure the argument is an object */
    if (newCurrentModification != null && (typeof newCurrentModification) != 'object') {
      let errorText = 'CurrentModification passed to setCurrentModification method is not an object';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is of the correct class */
    let className = '';
    if (newCurrentModification != null) {
      className = newCurrentModification.constructor.name;
    }
    /* The code below allows the class name to be HDLmTree. This is required
       because the insert code uses an HDLmTree instance to build a new
       modification tree node. */
    if (className != ''        &&
        className != 'Object'  &&
        className != 'HDLmMod' &&
        className != 'HDLmTree') {
      let errorText = `currentModification passed to setCurrentModification method has the wrong class (${className})`;
      HDLmAssert(false, errorText);
    }
    /* Copy and save the current modification address */
    this.currentModification = newCurrentModification;
  }
  /* This method is used to set the description text for the current widget.
     The value passed to this routine must be a string. An error is reported
     if the value passed to this routine is not a string. */
  setDescriptionValue(descriptionValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(descriptionValue) == true) {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof descriptionValue != 'string') {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the description value */
    this.description = descriptionValue;
  }
  /* This method sets the error text field of the current widget to whatever
     error text value was passed by the caller. The error text value passed
     by the caller may or may not be an empty string. */
  setErrorText(newErrorText) {
    /* Make sure the error text string is actually a string */
    if (typeof newErrorText != 'string') {
      let errorText = 'NewErrorText passed to setErrorText is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the error text string */
    this.errorText = newErrorText;
  }
  /* This method can be used to save a reference to the caller full
     redraw callback function. The full redraw callback function is
     invoked whenever the widget must be fully redrawn. This will
     typically happen whenever the contents of the widget have
     changed and the modification must be completely redrawn. */
  setFullRedrawCallback(newFullRedrawCallback) {
    /* Make sure the full redraw callback function is really a function */
    if (newFullRedrawCallback != null && typeof newFullRedrawCallback != 'function') {
      let errorText = 'NewFullRedrawCallback passed to setFullRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.fullRedrawCallback = newFullRedrawCallback;
  }
  /* This method can be used to save a reference to the caller
     input callback function. The input callback function is
     invoked whenever an input event occurs for the current
     widget. */
  setInputCallback(newInputCallback) {
    /* Make sure the input callback function is really a function */
    if (typeof newInputCallback != 'function') {
      let errorText = 'NewInputCallback passed to setInputCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.inputCallback = newInputCallback;
  }
  /* This method can be used to save a reference to the caller key
     down (key press) callback funtion. The key press callback function
     is invoked (may be invoked) when a key press event occurs for the
     current widget. This callback routine is used to handle the key
     press event. */
  setKeyDownCallback(newKeyDownCallback) {
    /* Make sure the key down callback function is really a function */
    if (typeof newKeyDownCallback != 'function') {
      let errorText = 'NewKeyDownCallback passed to setKeyDownCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.keyDownCallback = newKeyDownCallback;
  }
  /* This method can be used to set any select of options. The
     options passed by the caller will override any existing
     options (which may or may not be default values). */
  setOptions(newOptions) {
    /* Make sure the new options are an object */
    if (typeof newOptions != 'object') {
      let errorText = 'NewOptions passed to setOptions method are not an object';
      HDLmAssert(false, errorText);
    }
    let keys = Object.keys(newOptions);
    let keyLen = keys.length;
    for (let i = 0; i < keyLen; i++) {
      let currentKey = keys[i];
      if (this.options.hasOwnProperty(currentKey) == false) {
        let errorText = 'Property (' + currentKey + ') does not exist in options';
        HDLmAssert(false, errorText);
      }
      this.options[currentKey] = newOptions[currentKey];
    }
  }
  /* This method can be used to save a reference to the caller
     redraw callback function. The redraw callback function is
     invoked whenever the widget must be redrawn. This will
     typically happen whenever the contents of the widget have
     changed. */
  setRedrawCallback(newRedrawCallback) {
    /* Make sure the redraw callback function is really a function */
    if (typeof newRedrawCallback != 'function') {
      let errorText = 'NewRedrawCallback passed to setRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.redrawCallback = newRedrawCallback;
  }
  /* This method is used to set the sub type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setSubTypeValue(subTypeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(subTypeValue) == true) {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof subTypeValue != 'string') {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the sub type value */
    this.subType = subTypeValue;
  }
  /* This method is used to set the value of a table widget. The value
     passed by the caller is copied into the table widget. Note that the
     actual table value is copied. */
  setTableValue(newTableValue) {
    /* Make sure the argument is an array */
    if (Array.isArray(newTableValue) == false) {
      let errorText = 'NewTableValue passed to setTableValue method is not an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is not a list */
    if (typeof newTableValue == 'list') {
      let errorText = 'NewTableValue passed to setTableValue method is a list';
      HDLmAssert(false, errorText);
    }
    /* Copy the table value */
    this.tableValue = newTableValue;
  }
  /* This method can be used to save a reference to the tree Nriode
     associated with the current widget. The caller provides the
     tree node reference. This routine saves the tree node
     reference in the current widget. */
  setTreeNode(newTreeNode) {
    /* Make sure the tree node reference is really an object */
    if (typeof newTreeNode != 'object') {
      let errorText = 'NewTreeNode passed to setTreeNode is not an object';
      HDLmAssert(false, errorText);
    }
    this.treeNode = newTreeNode;
  }
  /* This method is used to set the type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setTypeValue(typeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(typeValue) == true) {
      let errorText = 'TypeValue passed to setTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof typeValue != 'string') {
      let errorText = 'TypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the type value */
    this.dataType = typeValue;
  }
  /* This method can be used to save a reference to the caller
     update callback function. The update callback function is
     invoked whenever the data value in the widget has been
     changed. This callback is used to update the actual data
     value. The data value in the widget is just a copy of
     the original data value. The update callback routine is
     only invoked if the table value is valid. Callback routines
     are never called if the updated value(s) is/are invalid. */
  setUpdateCallback(newUpdateCallback) {
    /* Make sure the update callback function is really a function */
    if (typeof newUpdateCallback != 'function') {
      let errorText = 'NewUpdateCallback passed to setUpdateCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.updateCallback = newUpdateCallback;
  }
}
/* The HDLmTextWidget class is used to create text widgets. Text widgets
   are used to display one text value. The text value may or may not be
   editable. */
class HDLmTextWidget {
  /* Build an HTML text widget class instance */
  constructor() {
    let argsLen = arguments.length;
    /* The next field is a reference to the container widget
       or a null value */
    this.containerWidget = null;
    this.options = Object.assign({}, HDLmTextWidgetOptions);
    /* The current widget is assumed not be be read-only. This
       may be changed later. */
    this.readOnly = false;
    /* The next field contains a reference to the input callback
       function. This function is invoked whenever an input event
       occurs for the current widget. The value in the widget is
       a copy of the original value. */
    this.inputCallback = null;
    /* The value below is used as the field description. Initially
       this field is set to an empty string. It can be set to an
       actual value by the constructor or by other code. */
    this.description = '';
    /* The field below is used as a copy of the orginal text value. In
       other words, a copy of the text value is placed in the field below.
       Changing this value will not change the original text value. */
    this.textValue = null;
    /* The field below has a reference to the tree node associated
       with the current widget. This value will (hopefully) be set
       by the widget constructor. */
    this.treeNode = null;
    /* The next field contains a reference to the redraw callback function.
       This function is invoked whenever the widget object must be redrawn.
       This will typically happen when the contents have changed. */
    this.redrawCallback = null;
    /* The next field contains a reference to the full redraw callback function.
       This function is invoked whenever the widget object must be fully redrawn.
       This will typically happen when the contents have changed and the modification
       must be fully redrawn. */
    this.fullRedrawCallback = null;
    /* The next field contains a reference to the update callback function.
       This function is invoked whenever the data value in the current widget
       object is updated. This function is used to update the actual data
       value after the value in widget is changed. The value in the widget
       is a copy of the original value. The update callback routine is only
       invoked if the text value is valid. Callback routines are never
       called if the updated value(s) is/are invalid. */
    this.updateCallback = null;
    /* The next field contains a reference to the key down (key press) callback
       function. This function is invoked sometimes when a key is pressed for
       the current widget. This function is used to handle the key press event
       in some cases. Note that not all key press events are passed to this
       callback function. The actual code must be checked to determine which
       key press events are passed to this callback function. */
    this.keyDownCallback = null;
    /* The next set of fields contain the type and sub type of the data the
       current widget is displaying. These fields are set when the current
       widget is created. These fields can be queried at any time. */
    this.dataType = null;
    this.subType = null;
    /* The next field contains a reference to the current modification. This value
       will be null in many cases. We generally don't need a reference to the current
       modification. However, in some cases, we do need this value. */
    this.currentModification = null;
    /* The next field contains the current error text for the current widget.
       Text widgets can definitely have actual error text. */
    this.errorText = '';
    let argNum = 0;
    /* Check if the invoker of the constructor passed the container widget */
    if (argsLen >= ++argNum)
      this.setContainerWidget(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed any options */
    if (argsLen >= ++argNum) {
      this.setOptions(arguments[argNum - 1]);
      /* console.log(arguments[argNum - 1]); */
    }
    /* Check if the invoker of the constructor passed an input
       callback function. This function will be called whenever
       an input event occurs for the current widget. */
    if (argsLen >= ++argNum)
      this.setInputCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a description */
    if (argsLen >= ++argNum)
      this.setDescriptionValue(arguments[argNum-1]);
    /* Check if the invoker of the constructor passed a text value */
    if (argsLen >= ++argNum) {
      /* console.log('in HDLmTextWidget'); */
      this.setTextValue(arguments[argNum - 1]);
    }
    /* Check if the invoker of the constructor passed a tree node
       value (reference). The tree node reference is saved in the
       widget by the routine called below. */
    if (argsLen >= ++argNum)
      this.setTreeNode(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed an update
       redraw callback function. This function will be called
       whenever the current widget must be redrawn because the
       contents have changed. */
    if (argsLen >= ++argNum)
      this.setRedrawCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed an update
       callback function. This function will be called whenever
       the data value in current widget has been changed. The
       update callback routine is only invoked if the text value
       is valid. Callback routines are never called if the updated
       value(s) is/are invalid. */
    if (argsLen >= ++argNum)
      this.setUpdateCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a key down
       (key press) callback function. This function may or may not
       be called whenever a key press event occurs for the current
       widget. The actual code must be checked to determine if this
       routine will be invoked for a given key press event. */
    if (argsLen >= ++argNum)
      this.setKeyDownCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a type value.
       The type value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a sub type value.
       The subtype value (if any) is saved in an instance field. */
    if (argsLen >= ++argNum)
      this.setSubTypeValue(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a full redraw
       callback function. This function will be called whenever the
       current widget must be fully redrawn because the contents have
       changed. */
    if (argsLen >= ++argNum)
      this.setFullRedrawCallback(arguments[argNum - 1]);
    /* Check if the invoker of the constructor passed a reference to the
       current modification. This will only be true (the value will not
       be null) in some cases. We need to store this value for use later. */
    if (argsLen >= ++argNum)
      this.setCurrentModification(arguments[argNum - 1]);
    /* Generate a new unique id value (note the use of lower case)
       for the new HTML elements. Associate the new unique id value
       with the current class instance. */
    this.newUnique = HDLmUtility.generateId();
    /* The top margin property is always set for this type of widget,
       but not for some other widget types. This value is used later
       to move the description text down by the same amount as the 
       top margin. */
    this.topMargin = this.options.topMargin;
    /* console.log(this.topMargin); */
  }
  /* Check a password value using the AWS rules. Note that a raw value is
     passed to this routine. In other words, the trim function is not used
     on the vaule passed to this routine. */
  static checkAwsPassword(value) {
    /* The type must be a string at this point for all password values passed  
       to this routine */
    if (typeof (value) != 'string') {
      let errorText = `The value (${value}) passed to checkAwsPassword is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Keep checking the password value */
    let errorText = '';
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check the password length */
      if (value.length < 8) {
        errorText = 'The password must be at least 8 characters long';
        break;
      }
      if (value.length > 64) {
        errorText = 'The password must be no more than 64 characters long';
        break;
      }
      /* Check if the password begins or ends with a blank */
      if (value.startsWith(' ') == true) {
        errorText = 'Passwords can not start with a blank';
        break;
      }
      if (value.endsWith(' ') == true) {
        errorText = 'Passwords can not end with a blank';
        break;
      }
      /* Use regex to further check the password */
      let passwordExec;
      let passwordRegex;
      /* Check for at least one lowercase letter */
      passwordRegex = /[a-z]/;
      passwordExec = passwordRegex.exec(value);
      if (passwordExec == null) {
        errorText = 'Password does not have any lower case letters';
        break;
      }
      /* Check for at least one uppercase letter */
      passwordRegex = /[A-Z]/;
      passwordExec = passwordRegex.exec(value);
      if (passwordExec == null) {
        errorText = 'Password does not have any upper case letters';
        break;
      }
      /* Check for at least one digit */
      passwordRegex = /\d/;
      passwordExec = passwordRegex.exec(value);
      if (passwordExec == null) {
        errorText = 'Password does not have any numeric digits';
        break;
      }
      /* Check for at least one special character */
      let passwordSpecialCharacters = '~!@#$%^&*_-+=`|\(){}[]:;"\' <>,.?/';
      let passwordSpecialFound = false;
      let passwordLen = value.length;
      for (let i = 0; i < passwordLen; i++) {
        let curChar = value.charAt(i);
        if (passwordSpecialCharacters.indexOf(curChar) >= 0) {
          passwordSpecialFound = true;
          break;
        }
      }
      if (passwordSpecialFound == false) {
        errorText = 'Password does not have any special characters ( ~!@#$%^&*_-+=`|\(){}[]:;"\'<>,.?)';
        break;
      }
      break;
    }
    return errorText;
  }
  /* This class instance method is invoked to validate an input field.
     The caller provides the field type and the field value. This routine
     determines if the field is valid and either returns an empty string
     or an error message to the caller. */
  checkInput(subType,
             value,
             currentModification,
             currentWidget,
             enterMessageNeeded) {
    let errorText = '';
    let removeTails = true;
    let splitCount;
    /* console.log('In HDLmTextWidget.checkInput', subType); */
    /* console.log(value); */
    /* console.trace(); */
    /* console.log(currentModification); */
    /* console.log(HDLmGlobals.activeNodeType); */
    /* The dummy loop below is used to allow break to work */
    while (true) {        
      /* Check for a backend type value. Only a few specific values
         are allowed for backend types. Note that the backend type
         value must not be empty in most cases. */
      if (subType == 'backendtype') {
        value = value.trim();
        /* Check if the backend type value is empty and if empty
           values are not allowed */
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The Backend Type value must not be empty';
          break;
        }
        /* Convert the current value to lower case and check for a
           few specific values. Only the specific values are actually
           allowed. */
        value = value.toLowerCase()
        if (value != 'http' &&
            value != 'https') {
          errorText = `The Backend Type value (${value}) must be valid`;
          break;
        }
        break;
      }
      /* Check for a backend server value. The backend server value
         must be set (must not be empty) and must be a valid domain
         name. */
      if (subType == 'backendserver') {
        value = value.trim();
        /* Check if the backend server value is empty and if empty
           values are not allowed */
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The Backend Server value must not be empty';
          break;
        }
        /* Check if the backend server value is a valid domain */
        if (!HDLmUtility.isValidDomain(value)) {
          errorText = `The Backend Server value (${value}) must be valid`;
          break;
        }
        break;
      }
      /* Check for a comments value. Note that in some cases
         we allow an empty comments value. */
      if (subType == 'comments') {
        value = value.trim();
        /* Check if the comments value is empty and if empty
           values are not allowed */
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The comments value must not be empty';
          break;
        }
        break;
      }
      /* Check for a tree node name and handle tree node name
         checking */
      if (subType == "companyproxyname"            ||
          subType == "datavaluename"               ||
          subType == 'editablecompgemname'         ||
          subType == 'editablecompgxename'         ||
          subType == 'editablecompignorename'      ||
          subType == 'editablecompmodname'         ||
          subType == 'editablecomppassname'        ||
          subType == 'editablecomppopupname'       ||
          subType == 'editablecompproxyname'       ||
          subType == 'editablecompsimplename'      ||
          subType == 'editablecompstorename'       ||
          subType == 'editableconfigname'          ||
          subType == 'editabledatavaluename'       ||
          subType == 'editabledivisionname'        ||
          subType == 'editableignorelistname'      ||
          subType == 'editableignorelistentryname' ||
          subType == 'editablemodificationname'    ||
          subType == 'editablepasslistname'        ||
          subType == 'editablepasslistentryname'   ||
          subType == 'editablesitename'            ||
          subType == 'editablestoredvaluename'     ||
          subType == 'modificationname') {
        /* In at least three cases, we really do want to treat FONT and FONT (2)
           as different. If we just displaying a modification (but not entering
           one from scratch), then we don't want to generate an error if we
           have FONT and FONT (2). However, if we are creating a new modification
           (or something else) then we want to force the user to enter something
           that is truly unique. The code is no longer in use. The remove tails
           value is passed by the caller using the options. */
        /*
        if (subType == 'datavaluename'         ||
            subType == 'editabledatavaluename' ||  
            subType == 'modificationname')
          removeTails = false;
        */
        /* Remove any leading and/or trailing blanks and check for an
           empty string value */
        value = value.trim();
        if (value == '') {
          /* The error message depends on the type of tree node */
          let treeType = this.treeNode.type;
          if (treeType == 'company') {
            if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem)
              treeType = 'compgem';
            else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)
              treeType = 'compgxe';
            else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
              treeType = 'compignore';
            else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod)
              treeType = 'compmod';
            else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass)
              treeType = 'comppass';
            else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup)
              treeType = 'comppopup';
            else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy)
              treeType = 'compproxy';
            else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple)
              treeType = 'compsimple';
            else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
              treeType = 'compstore';
          }
          let longName = HDLmModTreeInfo[treeType]['longname'];
          /* We need to fix the long name in at least one case */
          if (longName == 'ignore')
            longName = 'ignore-list entry';
          errorText = `The ${longName} name value must not be empty`;
          break;
        }
        /* Check if the company name is a valid domain name */
        if (subType == "companyproxyname" &&
          !HDLmUtility.isValidDomain(value)) {
          errorText = `The Company Domain Name value (${value}) must be valid`;
          break;
        }
        /* Check for a CSS selector value. Note that in some cases
           we allow an empty CSS selector value. This is required
           so that modifications that use the find array or the XPath
           search value or the node identifier value can be handled
           without errors. */
        if (subType == 'cssselector') {
          value = value.trim();
          /* Check if the CSS selector value is empty and if empty
             values are not allowed */
          if (value == '' &&
            this.options.emptyFieldOk == false) {
            errorText = 'The CSS Selector value must not be empty';
            break;
          }
          /* Check if the CSS selector value starts with an allowed
             character. This is required if the CSS selector value
             is not empty. The code below has been disabled. It appears
             tht a valid CSS selector can start with any character. */
          if (value !== '' &&
            value.substring(0, 1) !== '/' &&
            value.substring(0, 1) !== '.' &&
            value.substring(0, 1) !== '#' &&
            false) {
            errorText = "The CSS Selector value must start with an allowed character";
            break;
          }
          break;
        }
        /* Check for data value information and handle data value checking.
           Note that in some cases we allow an empty data value. This is
           required so that empty data values can be handled. */
        if (subType == 'datavalue') {
          value = value.trim();
          /* We need to check for a very special case where having an empty data
             value field is not OK. The data value field must be set, if empty
             values are not OK. */
          if (value == '' &&
            this.options.emptyDataValueOK == false) {
            errorText = 'The data value must not be empty in this case';
            break;
          }
          if (value == '' &&
            this.options.emptyFieldOk == false) {
            errorText = 'The data value must not be empty';
            break;
          }
          break;
        }
        /* Check if the company name is a valid domain name */
        if ((subType == "editablecompgemname" || 
             subType == "editablecompgxename") &&
            !HDLmUtility.isValidDomain(value)) {
          errorText = `The Company Domain Name value (${value}) must be valid`;
          break;
        }
        /* Check if the company name is valid domain name */
        if (subType == "editablecompignorename" &&
            !HDLmUtility.isValidDomain(value)) {
          errorText = `The Company Domain Name value (${value}) must be valid`;
          break;
        }
        /* Check if the company name is a valid domain name */
        if (subType == "editablecomppassname" &&
            !HDLmUtility.isValidDomain(value)) {
          errorText = `The Company Domain Name value (${value}) must be valid`;
          break;
        }
        /* Check if the company name is a valid domain name */
        if (subType == "editablecomppopupname" &&
            !HDLmUtility.isValidDomain(value)) {
          errorText = `The Company Domain Name value (${value}) must be valid`;
          break;
        }
        /* Check if the company name is a valid domain name */
        if (subType == "editablecompproxyname" &&
            !HDLmUtility.isValidDomain(value)) {
          errorText = `The Company Domain Name value (${value}) must be valid`;
          break;
        }
        /* Check if the company name is a valid domain name */
        if (subType == "editablecompsimplename" &&
            !HDLmUtility.isValidDomain(value)) {
          errorText = `The Company Domain Name value (${value}) must be valid`;
          break;
        }
        /* Check if the company name is valid domain name */
        if (subType == "editablecompstorename" &&
            !HDLmUtility.isValidDomain(value)) {
          errorText = `The Company Domain Name value (${value}) must be valid`;
          break;
        }
        /* Check if update has actually been done in some cases */
        if ((subType == 'editableignorelistentryname' ||
             subType == 'editableignorelistname'      ||
             subType == 'editablepasslistentryname'   ||
             subType == 'editablepasslistname') &&
            enterMessageNeeded == true) {
          errorText = 'The Enter key must be used';
          break;
        }
        /* Check if the ignore-list name is disallowed for some reason.
           A few ignore-list names are not allowed because of potential
           conflicts with the parts of a report object. */
        if (subType == "editablepasslistname" &&
            HDLmPass.checkName(value) == false) {
          errorText = `The proposed name (${value}) is not allowed`;
          break;
        }
        /* In at least one important case, we need to change the value
           of remove tails. If we are running one the inline editors and
           the current sub type has a specific value, then we need to
           change the remove tails value. This change eliminates an error
           where the modification name is trully unique, but appears not
           to be unique because of the setting of remove tails. This code
           is no longer in use, the remove tails value is passed by the
           caller using the options. */
        /*
        if (HDLmGlobals.checkForInlineEditor() &&
            subType == "editablemodificationname")
          removeTails = false;
        */
        /* Check if the new tree node name is valid or not. This code
           ends up handling 'editablemodificationname' (without the quotes)
           and 'editabledatavaluename' (without the quotes). This code may
           handle other cases as well. */
        /* console.log('About to call checkTreeNodeName'); */
        /* console.log(value); */
        /* console.log(removeTails); */
        errorText = HDLmMod.checkTreeNodeName(this.treeNode,
                                              value,
                                              this.options.removeTails);
        /* console.log(errorText); */
        break;
      }
      /* Check for extra information and handle extra information checking.
         Note that in some cases we allow an empty extra information value.
         This is required so that modifications for a home page can be processed. */
      if (subType == 'extra') {
        value = value.trim();
        /* We need to check for a very special case where having an empty extra
           information field is not OK. The extra information field must be set,
           if the modification rule type is one of a few values. */
        if (value == '' &&
            this.options.emptyExtraValueOK == false) {
          errorText = 'The Extra Information value must not be empty for this modification type';
          break;
        }
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The Extra Information value must not be empty';
          break;
        }
        break;
      }
      /* Check for extra attribute information and handle extra attribute
         information checking. Note that in some cases we allow an empty
         extra attribute information value. This is required so that
         modifications for a home page can be processed. Check the
         attribute value in more detail, if need be. */
      if (subType == 'extraAttribute') {
        value = value.trim();
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The Extra Information value must not be empty';
          break;
        }
        /* Get the extra value and break it into two substrings. The first
           substring is the attribute to be modified. The second substring
           describes the type of modification. */
        let curModExtra = value;
        let curModExtraArray = curModExtra.split('/');
        if (curModExtraArray.length !== 2) {
          errorText = 'The Extra Information value must be a string with a slash in it';
          break;
        }
        let attributeName = curModExtraArray[0];
        let attributeRequest = curModExtraArray[1];
        if (attributeRequest.toUpperCase() !== 'USEPROXYHOST') {
          errorText = 'The Extra Information request value must be USEPROXYHOST';
          break;
        }
        break;
      }
      /* Check for extra style information and handle extra style
         information checking. Note that in some cases we allow an empty
         extra style information value. This is required so that
         modifications for a home page can be processed. Check the
         style value in more detail, if need be. */
      if (subType == 'extraStyle') {
        value = value.trim();
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The CSS Style value must not be empty';
          break;
        }
        /* Fix the CSS value in a number of ways */
        let valueSplit = value.trim();
        valueSplit = valueSplit.replace(/\s+/g, ' ');
        valueSplit = valueSplit.split(' '); 
        let valueSplitLen = valueSplit.length;
        for (let curValue of valueSplit) {
          /* console.log(curValue); */
          /* console.log(valueSplitLen); */
          /* The background-image style can not be specifed with other styles */
          if (curValue == 'background-image' &&
              valueSplitLen > 1) {
            errorText = 'The CSS Style value has background-image with other values';
            break;
          }
          if (HDLmHtml.checkCSSStyle(curValue) == false) {
            errorText = 'The CSS Style value must be valid';
            break;
          }
        }
        if (errorText != '')
          break;
        break;
      }
      /* Check for a height or width and check them */
      if (subType == 'height' ||
          subType == 'width') {
        value = value.trim();
        if (value == '') {
          if (subType == 'height')
            errorText = 'The height value must not be empty';
          if (subType == 'width')
            errorText = 'The width value must not be empty';
          break;
        }
        errorText = HDLmUtility.isHeight(subType, value);
        break;
      }
      /* Check for ignore (ignore-list entry) value information and handle
         ignore-list entry checking. Note that in some cases we allow an
         empty ignore-list entry value. This is required so that empty ignore-list
         entry values can be handled. This sub type does not appear to be in use. */
      if (subType == 'ignorevalue') {
        value = value.trim();
        /* We need to check for a very special case where having an empty ignore-list
           entry value field is not OK. The ignore-list entry value field must be set,
           if empty values are not OK. */
        if (value == '' &&
          this.options.emptyIgnoreValueOK == false) {
          errorText = 'The ignore-list entry value must not be empty in this case';
          break;
        }
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The ignore-list entry value must not be empty';
          break;
        }
        break;
      }
      /* Check for an input/output default text field of some kind */
      if (subType == 'iotextemptynotok' ||
          subType == 'iotextemptyok') {
        value = value.trim();
        if (value == '' &&
          this.options.emptyFieldOk == false)
          errorText = 'The text value must not be empty';
        break;
      }
      /* Check for a match string and handle match string checking.
         Note that in some cases we allow an empty match string value.
         This is required so that modifications for a home page can
         be processed. */
      if (subType == 'match'      || 
          subType == 'matchvalue' ||
          subType == 'editableproxydefinition') {
        value = value.trim();
        value = HDLmMatch.fixPossibleRegexString(value);
        /* Set some default error text. The defaults error
           text is overriden in at least one case. */
        let matchErrorTextPrefix = 'The match string value';
        if (subType == 'editableproxydefinition')
          matchErrorTextPrefix = 'The proxy definition value';
        let rv;
        if (value == '' &&
            this.options.emptyFieldOk == false) {
          errorText = `${matchErrorTextPrefix} must not be empty`;
          break;
        }
        /* Check if the current match string is valid or not */
        rv = HDLmMatch.check(value);
        if (rv != null) {
          errorText = rv;
          break;
        }
        /* Check if the current match string is valid or not */
        rv = HDLmMatch.checkTokens(value);
        if (rv != null) {
          errorText = rv;
          break;
        }
        break;
      }
      /* Check for a node identifier value. Note that in some cases
         we allow an empty node identifier value. This is required
         so that modifications that use the find array or the XPath
         search value or a CSS selector can be handled without
         errors. */
      if (subType == 'nodeiden') {
        value = value.trim();
        /* Check if the node identifier value is empty and if empty
           values are not allowed */
        if (value == '') {
          if (this.options.emptyFieldOk == false) {
            errorText = 'The node identifier value must not be empty';
            break;
          }
          else
            break;
        }
        /* Declare and define a few valued used to check and handle
           the JSON node identifier value */
        let   nodeError = false;
        let   nodeKeys;
        let   nodeValue;
        let   nodeValueCounts;
        let   nodeValueCurrentAttributes;
        let   nodeValueParentAttributes;
        let   searchTypeValue;
        let   searchTypeValueTypeOf;
        let   searchTypeValues = ['tag', 'id', 'name', 'class'];
        /* Check if the value is a valid JSON object */
        if (HDLmUtility.isJsonObject(value) == false) {
          errorText = 'The node identifier value must be a valid JSON object';
          break;
        }
        /* Try to convert the new value string to an object. The new
           value string must be a valid JSON string. Try to convert
           the new value string to an object (using JSON). This is 
           actually a duplicate check. The check for a JSON object
           does the same thing. */
        try {
          nodeValue = JSON.parse(value);
          if (value === null)
            nodeError = true;
          if (typeof nodeValue != 'object')
            nodeError = true;
        }
        /* Catch any errors in the JSON parsing process. If an error is
           detected, set a flag showing that an error occurred. The error
           flag is checked below. */
        catch (err) {
          nodeError = true;
        }
        /* Check the error flag to see if an error was found */
        if (nodeError) {
          errorText = 'The node identifier value must be a valid JSON string';
          break;
        }
        /* Get the object keys from the node identifier value object. The number
           of keys is fixed and must always be two. */
        nodeKeys = Object.keys(nodeValue);
        if (nodeKeys.length != 4 &&
            nodeKeys.length != 5) {
          errorText = 'The node identifier object must always have four or five keys';
          /* console.log(errorText); */
          break;
        }
        /* Check all of the node keys */
        let possibleNodeKeys = ['attributes', 'counts', 'grandparent', 'parent', 'type'];
        for (let nodeKey of nodeKeys) {
          /* console.log(nodeKey); */
          /* console.log(possibleNodeKeys); */
          if (possibleNodeKeys.includes(nodeKey))
            continue;
          else {
            errorText = `Invalid node key (${nodeKey}) found in node identifier`;
            break;
          }
        }
        /* console.log(errorText); */
        if (errorText != '')
          break;
        /* Get and check the node identifier type value */
        searchTypeValue = nodeValue.type;
        searchTypeValueTypeOf = typeof searchTypeValue;
        if (searchTypeValueTypeOf != 'string') {
          errorText = 'The node identifier type value is not a string';
          break;
        }
        if (searchTypeValue == "") {
          errorText = 'The node identifier type value is empty';
          break;
        }
        if (searchTypeValues.includes(searchTypeValue) == false) {
          errorText = 'The node identifier type value is not valid';
          break;
        }
        /* Get and check the node identifier current DOM element attributes value */
        let checkInputPrimaryAttributeTrue = true;
        nodeValueCurrentAttributes = nodeValue.attributes;
        errorText = this.checkInputAttributes(nodeValueCurrentAttributes,
                                              searchTypeValue,
                                              checkInputPrimaryAttributeTrue);
        if (errorText != '')
          break;
        /* Get and check the node identifier counts value */
        nodeValueCounts = nodeValue.counts;
        errorText = this.checkInputCounts(nodeValueCounts);
        if (errorText != '')
          break;
        /* Get and check the node identifier parent DOM element attributes value */
        let checkInputPrimaryAttributeFalse = false;
        nodeValueParentAttributes = nodeValue.attributes;
        let checkInputSearchTypeValue = null;
        errorText = this.checkInputAttributes(nodeValueParentAttributes,
                                              checkInputSearchTypeValue,
                                              checkInputPrimaryAttributeFalse);
        if (errorText != '')
          break;
        break;
      }
      /* Check for a password and handle password checking */
      if (subType == 'password') {
        value = value.trim();
        if (value == '' &&
          this.options.emptyFieldOk == false)
          errorText = 'The password value must not be empty';
        break;
      }
      /* Check for a path value and handle path value checking. Note that in some
         cases we allow an empty path value. This is required so that modifications
         for a home page can be processed. Note that this is no longer true. The path
         value for a home page will be a single forward slash and will not be empty. */
      if (subType == 'Path Value') {
        value = value.trim();
        value = HDLmMatch.fixPossibleRegexString(value);
        if (value == '' &&
            this.options.emptyFieldOk == false) {
          errorText = 'The path value must not be empty';
          break;
        }
        /* Make sure the path value starts with a forward slash. All path 
           values are required to start with a forward slash. This is true
           even for glob and like path values. */
        if (value.length >= 1 &&
            value.charAt(0) != '/') {
          errorText = 'The path value must start with a forward slash';
          break;
        }
        /* Check if the current match string is valid or not */
        let rv = HDLmMatch.check(value);
        if (rv != null) {
          errorText = rv;
          break;
        }
        /* Check if the current match string is valid or not */
        rv = HDLmMatch.checkTokens(value);
        if (rv != null) {
          errorText = rv;
          break;
        }
        break;
      }
      /* Check if a positive floating-point must be validated */
      if (subType == 'positivefloat') {
        /* Check if the test string contains a proper floating point value */
        let re = /^(\d)+(\.)(\d)+$/g;
        let reTest = re.test(value);
        if (!reTest) {
          errorText = `Floating-point value (${value}) is invalid`;
          break;
        }
        /* Check the actual floating-point value */
        let valueNumber = Number(value);
        if ((typeof(valueNumber) == 'number') == false ||
            valueNumber <= 0.0) {
          errorText = `Floating-point value (${value}) is invalid`;
          break;
        }
        break;
      }
      /* Check if a positive integer must be validated */
      if (subType == 'positiveint') {
        /* Check if the test string only contains digits */
        let re = /^(\d)+$/g;
        let reTest = re.test(value);
        if (!reTest) {
          errorText = `Integer value (${value}) is invalid`;
          break;
        }
        /* Check the actual integer value */
        let valueNumber = Number(value);
        if ((typeof(valueNumber) == 'number') == false ||
            !Number.isInteger(valueNumber)             ||
            valueNumber <= 0) {
          errorText = `Integer value (${value}) is invalid`;
          break;
        }
        break;
      }
      /* Check for a secure server value. The secure server value
         must be set (must not be empty) and must be a valid domain
         name. */
      if (subType == 'secureserver') {
        value = value.trim();
        /* Check if the secure server value is empty and if empty
           values are not allowed */
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The Secure Server value must not be empty';
          break;
        }
        /* Check if the secure server value is a valid domain */
        if (!HDLmUtility.isValidDomain(value)) {
          errorText = `The Secure Server value (${value}) must be valid`;
          break;
        }
        break;
      }
      /* Check for a password value. This type of password is used
         for authentication. The password must not be empty or have
         blanks in it. */
      if (subType == 'signinpassword'                 || 
          subType == 'changepasswordnewpasswordfirst' ||
          subType == 'changepasswordnewpasswordsecond') {
        let originalValue = value;
        value = value.trim();
        /* Check if the password value is empty and if empty
           values are not allowed */
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The password value must not be empty';
          /* console.log(errorText); */
          break;
        }
        splitCount = value.split(' ').length;
        if (splitCount > 1) {
          errorText = 'The password value must not contains blanks';
          /* console.log(splitCount); */
          break;
        }
        /* At this point we should continue to check the password.
           The call below uses the AWS rules to check the password. 
           Note that the raw password string is passed below. The 
           modified value (using trim) is not passed here. */
        errorText = HDLmTextWidget.checkAwsPassword(originalValue);
        if (errorText != '') {
          break;
        }
        /* At this point we may need to make sure that the first
           new / permanent password matches the second new / permanent
           password */
        /* console.trace(); */
        /* console.log(subType); */
        /* console.log(currentModification); */
        /* console.log(currentWidget); */
        if (subType == 'changepasswordnewpasswordfirst' &&
            currentWidget != null) {
          let currentContainer = currentWidget.containerWidget;
          if (currentContainer != null) {
            /* console.trace(); */
            /* console.log(currentContainer); */
            let secondValue = currentContainer.associatedWidgets['changepasswordnewpasswordsecond'].textValue;
            /* console.log(secondValue); */
            if (value != secondValue) {
              errorText = 'The first new password does not match the second new password (first)';
              break;
            }
          }
        }
        if (subType == 'changepasswordnewpasswordsecond' &&
            currentWidget != null) {
          let currentContainer = currentWidget.containerWidget;
          if (currentContainer != null) {
            /* console.trace(); */
            /* console.log(currentContainer); */
            let firstValue = currentContainer.associatedWidgets['changepasswordnewpasswordfirst'].textValue;
            /* console.log(firstValue); */ 
            /* console.log(value); */
            /* console.log(firstValue.length); */ 
            /* console.log(value.length); */
            if (value != firstValue) {
              errorText = 'The first new password does not match the second new password (second)';
              /* console.log(firstValue); */ 
              /* console.log(value); */
              break;
            }
          }
        }
      }
      /* Check for a probability value. Note that in some cases
         we allow an empty probability value. */
      if (subType == 'probability') {
        value = value.trim();
        /* Check if the probability value is empty and if empty
           values are not allowed */
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The probability value must not be empty';
          break;
        }        
        errorText = HDLmMod.checkProbability(value);   
        break;
      }
      /* Check for a user name value. This type of user name is 
         used for authentication. The user name must not be empty 
         or have blanks in it. */
      if (subType == 'signinusername') {
        value = value.trim();
        /* Check if the user name value is empty and if empty
           values are not allowed */
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The user name value must not be empty';
          /* console.log(errorText); */
          break;
        }
        splitCount = value.split(' ').length;
        if (splitCount > 1) {
          errorText = 'The user name value must not contains blanks';
          /* console.log(splitCount); */
          break;
        }
      }
      /* Check for a sign in verification code. This type of verification 
         code is used for authentication. The verification code must be  
         exactly six (6) digits long. */ 
      if (subType == 'signinverificationcode') {
        value = value.trim();
        /* Check if the verification code value is empty and if empty
           values are not allowed */
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The verification code value must not be empty'; 
          break;
        }
        /* Make sure the verification code is exactly six characters long */
        if (value.length != 6) {
          errorText = 'The verification code must exactly six characters long'; 
          break;
        }
        /* Check for six digits */
        let verificationCodeRegex = /\d{6}/;
        let verificationCodeExec = verificationCodeRegex.exec(value);
        if (verificationCodeExec == null) {
          errorText = 'Verification code does not have six numeric digits';
          break;
        }
      }
      /* Check for store value information and handle store value checking.
         Note that in some cases we allow an empty store (stored value) value.
         This is required so that empty store (store value) values can be
         handled. */
      if (subType == 'storevalue') {
        value = value.trim();
        /* We need to check for a very special case where having an empty store
           (stored value) value field is not OK. The store value field must be set,
           if empty values are not OK. */
        if (value == '' &&
          this.options.emptyStoreValueOK == false) {
          errorText = 'The store value must not be empty in this case';
          break;
        }
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The store value must not be empty';
          break;
        }
        break;
      }
      /* Check for a style value */
      /* console.log(subType); */
      if (subType == 'style') {
        value = value.trim();
        /* console.log(value); */
      }
      /* Check for a use mode value. Note that in some cases
         we allow an empty use mode value. */
      if (subType == 'usemode') {
        value = value.trim();
        /* Check if the use mode value is empty and if empty
           values are not allowed */
        if (value == '' &&
          this.options.emptyFieldOk == false) {
          errorText = 'The use mode value must not be empty';
          break;
        }        
        let valueOK = HDLmMod.checkUseMode(value);
        if (valueOK == false) {
          errorText = 'The use mode value is not valid';
          break;
        }
        break;
      }
      /* Check for a userid and handle userid checking */
      if (subType == 'userid') {
        value = value.trim();
        if (value == '' &&
          this.options.emptyFieldOk == false)
          errorText = 'The userid value must not be empty';
        break;
      }
      /* Check for a XPath search value. Note that in some cases
         we allow an empty XPath search value. This is required
         so that modifications that use the find array can be
         handled without errors. */
      if (subType == 'xpath') {
        value = value.trim();
        /* Check if the XPath search value is empty and if empty
           values are not allowed */
        if (value == '' &&
            this.options.emptyFieldOk == false) {
          errorText = 'The XPath search value must not be empty';
          break;
        }
        /* Check if the XPath search value starts with a slash
           character. This is required if the XPath search value
           is not empty. */
        if (value !== '' &&
            value.substring(0, 1) !== '/') {
          errorText = "The XPath search value must start with a forward slash";
          break;
        }
      }
      break;
    }
    /* console.log(errorText); */
    return errorText;
  }
  /* This class instance method is invoked to validate a set of attributes.
     The attributes may have originally come from the current DOM element
     or the parent of the current DOM element (or anywhere else). The caller
     provides the attributes object. This routine determines if the attribute
     object is valid and either returns an empty string or an error message
     to the caller. */
  checkInputAttributes(nodeValueAttributes, searchTypeValue, primaryAttribute) {
    let errorText = '';
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Declare and define a few valued used to check and handle
         the JSON node identifier value */
      let nodeValueAttributesClass;
      let nodeValueAttributesClassLength;
      let nodeValueAttributesClassTypeOf;
      let nodeValueAttributesEntry;
      let nodeValueAttributesEntryTypeOf;
      let nodeValueAttributesKeys;
      let nodeValueAttributesTag;
      let nodeValueAttributesTagTypeOf;
      let nodeValueAttributesTypeOf;
      let nodeValueAttributesTypeValue;
      let nodeValueAttributesTypeValueTypeOf;
      /* Get and check the node identifier attributes value */
      nodeValueAttributesTypeOf = typeof nodeValueAttributes;
      if (nodeValueAttributesTypeOf != 'object') {
        errorText = 'The node identifier attributes value is not an object';
        break;
      }
      /* We need to process and check all of the attributes. Most of the attributes
         will just be strings. However, the class attribute will always be an array. */
      nodeValueAttributesKeys = Object.keys(nodeValueAttributes);
      for (let key of nodeValueAttributesKeys) {
        nodeValueAttributesEntry = nodeValueAttributes[key];
        nodeValueAttributesEntryTypeOf = typeof nodeValueAttributesEntry;
        if (key == 'class') {
          if (Array.isArray(nodeValueAttributesEntry) == false) {
            errorText = 'The node identifier attributes class value entry is not an array';
            break;
          }
          if (nodeValueAttributesEntryTypeOf != 'object') {
            errorText = 'The node identifier attributes class value entry is not an object';
            break;
          }
          continue;
        }
        /* Special case code is required for the innertext attribute. The innertext
           attribute is not a standard attribute. This attribute can be null or a 
           string value. */     
        if (key == 'innertext') {
          /* The innertext attribute can be null or a string value */
          if (nodeValueAttributesEntry == null)
            continue          
          if (nodeValueAttributesEntryTypeOf != 'string') {
            errorText = `The node identifier attributes value entry (${key}) is not a string or null`;
            break;
          }
          continue;
        }
        /* The type must be a string at this point for all attributes other
           than class and innertext */        
        if (nodeValueAttributesEntryTypeOf != 'string') {
          errorText = `The node identifier attributes value entry (${key}) is not a string`;
          break;
        }
      }
      /* Check if we have an error message at this point. We have no more
         work to do, if this is true. */
      if (errorText != '')
        break;
      /* Get and check the tag attribute in the attributes values. Note that
         HTML element tag names are not generally considered to be attributes.
         However, we treat HTML element tag names as attributes anyway. */
      if (nodeValueAttributes.hasOwnProperty("tag") == false) {
        errorText = 'The node identifier attributes value does not have a tag name';
        break;
      }
      nodeValueAttributesTag = nodeValueAttributes.tag;
      nodeValueAttributesTagTypeOf = typeof nodeValueAttributesTag;
      if (nodeValueAttributesTagTypeOf != 'string') {
        errorText = 'The node identifier attributes tag value is not a string';
        break;
      }
      if (nodeValueAttributesTag == "") {
        errorText = 'The node identifier attributes tag value is empty';
        break;
      }
      /* Make sure that the node identifier attributes has an entry that
         matches the node identifier type. This is required in all cases.
         In other words, if the node identifier type is 'id', then the node
         information attributes must include an 'id' with an actual value. */
      if (primaryAttribute == true) {
        if (nodeValueAttributes.hasOwnProperty(searchTypeValue) == false) {
          errorText = 'The node identifier attributes does not contain an entry that matches the type';
          break;
        }
        /* Get the actual value we will be searching for. Make sure the value
           is a string and make sure it is not a zero-length string. Note that
           these rules do not apply if we are searching for a class. */
        nodeValueAttributesTypeValue = nodeValueAttributes[searchTypeValue];
        nodeValueAttributesTypeValueTypeOf = typeof nodeValueAttributesTypeValue;
        /* We may or may not be searching by class. If we are searching by class
           then the class attributes value will not be a string. It will be an
           array instead. */
        if (searchTypeValue == 'class') {
          if (Array.isArray(nodeValueAttributesTypeValue) == false) {
            errorText = 'The node identifier attributes entry with the search value is not an array';
            break;
          }
          if (nodeValueAttributesTypeValueTypeOf != 'object') {
            errorText = 'The node identifier attributes entry with the search value is not an object';
            break;
          }
        }
        /* It appears that we are not searching by class. If we are not searching by class,
            then the search value must be a string. */
        else {
          if (nodeValueAttributesTypeValueTypeOf != 'string') {
            errorText = 'The node identifier attributes entry with the search value is not a string';
            break;
          }
          if (nodeValueAttributesTypeValue == "") {
            errorText = 'The node identifier attributes entry with the search value is empty';
            break;
          }
        }
      }
      /* Get and check the class attribute in the attributes values. Note that
         this attribute is standard and optional. We always treat the value of
         this attribute as an array. */
      if (nodeValueAttributes.hasOwnProperty("class") == true) {
        nodeValueAttributesClass = nodeValueAttributes.class;
        nodeValueAttributesClassTypeOf = typeof nodeValueAttributesClass;
        if (Array.isArray(nodeValueAttributesClass) == false) {
          errorText = 'The node identifier attributes class value is not an array';
          break;
        }
        if (nodeValueAttributesClassTypeOf != 'object') {
          errorText = 'The node identifier attributes class value is not an object';
          break;
        }
        /* Make sure that that class length is not zero. This check is not
           used at this time. We allow zero-length class arrays. */
        nodeValueAttributesClassLength = nodeValueAttributesClass.length;
        if (nodeValueAttributesClassLength == 0) {
          errorText = 'The node identifier attributes class value is an empty array';
          break;
        }
        /* Check each entry in class array. Makes sure that all entries are
           strings. */
        for (let i = 0; i < nodeValueAttributesClassLength; i++) {
          let currentEntry = nodeValueAttributesClass[i];
          let currentEntryTypeOf = typeof currentEntry;
          if (currentEntryTypeOf != 'string') {
            errorText = 'The node identifier attributes class value has an array entry that is not a string';
            break;
          }
          if (currentEntry.length == 0) {
            errorText = 'The node identifier attributes class value has an array entry that is a zero-length string';
            break;
          }
        }
        /* Check if we have an error message at this point. We have no more
           work to do, if this is true. */
        if (errorText != '')
          break;
      }
      break;
    }
    return errorText;
  }
  /* This class instance method is invoked to validate a set of counts.
     The counts may have originally come from a set of DOM elements or
     anywhere else. The caller provides the counts object. This routine
     determines if the counts object is valid and either returns an empty
     string or an error message to the caller. */
  checkInputCounts(nodeValueCounts) {
    let errorText = '';
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Declare and define a few valued used to check and handle
         the JSON node identifier value */
      let   nodeValueCountsEntry;
      let   nodeValueCountsEntryTypeOf;
      let   nodeValueCountsKeys;
      let   nodeValueCountsKeysLength;
      let   nodeValueCountsTypeOf;
      let   searchTypeValues = ['tag', 'id', 'name', 'class'];
      /* Get and check the node identifier counts value */
      nodeValueCountsTypeOf = typeof nodeValueCounts;
      if (nodeValueCountsTypeOf != 'object') {
        errorText = 'The node identifier counts value is not an object';
        break;
      }
      /* We need to process and check all of the count values. All of the count
         values will just be numbers. */
      nodeValueCountsKeys = Object.keys(nodeValueCounts);
      /* The number of key values must be at least one and no more
         than four */
      nodeValueCountsKeysLength = nodeValueCountsKeys.length;
      if (nodeValueCountsKeysLength < 1) {
        errorText = 'The node identifier counts value is empty';
        break;
      }
      if (nodeValueCountsKeysLength > 4) {
        errorText = 'The node identifier counts value is has too many entries';
        break;
      }
      /* Process and check all of the entries in the counts object */
      for (let key of nodeValueCountsKeys) {
        /* Make sure the key value is an allowed serch type value */
        if (searchTypeValues.includes(key) == false) {
          errorText = `The node identifier counts object has an invalid key (${key})`;
          break;
        }
        nodeValueCountsEntry = nodeValueCounts[key];
        nodeValueCountsEntryTypeOf = typeof nodeValueCountsEntry;
        /* The type must be a number at this point for all counts */
        if (nodeValueCountsEntryTypeOf != 'number') {
          errorText = `The node identifier counts value entry (${key}) is not a number`;
          break;
        }
        /* Check the value of the counts entry */
        if (nodeValueCountsEntry <= 0) {
          errorText = `The node identifier counts value entry (${key}) has an invalid value (${nodeValueCountsEntry})`;
          break;
        }
      }
      /* Check if we have an error message at this point. We have no more
         work to do, if this is true. */
      if (errorText != '')
        break;
      break;
    }
    return errorText;
  }  
  /* This class instance method is invoked to determine the error text
     for a text widget. The updated error text is stored in the text
     widget. */ 
  determineErrorText() {
    /* Set a couple of values */ 
    let subType = this.options.subType;
    let value = this.textValue;
    let currentModification = this.currentModification;
    let currentWidget = this;
    let enterMessageNeededTrueOrFalse = false; 
    /* Get the current error text */
    let errorText = this.checkInput(subType,
                                    value,
                                    currentModification,
                                    currentWidget,
                                    enterMessageNeededTrueOrFalse);
    /* Save the error text */     
    /* console.log('In determineErrorText', errorText); */
    this.setErrorText(errorText);
  }
  /* This static method is invoked when an input event occurs. An
     input event occurs whenever an input field is changed in any
     way. */
  static eventInput(event) {    
    /* console.log('In HDLmTextWidget.eventInput'); */
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log(`Fancytree event DOM HDLmTextWidget Input Type (${event.inputType})`);
    /* Check for an input event we need to ignore. Strangely enough this
       input event occurs even after the widget is removed /delete. Why
       is not clear. */
    if (event.inputType == 'historyRedo' ||
        event.inputType == 'historyUndo')
      return;
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let textWidgetCurrent = HDLmWidgetMap[targetId]; 
    /* We need to update the actual text value at this point. This
       is done in two places. First the text widget is updated.
       However, we also need to update the actual text value.
       The text widget contains a copy of the original value. */
    textWidgetCurrent.textValue = target.value;
    /* We may need to check the actual value here. This can (and
       should) only be done for some types. Other types can not be
       checked at this time. Some types really can not be checked
       because all values are valid. The update callback routine
       is only invoked if the text value is valid. Callback routines
       are never called if the text value is invalid. */
    let subType = textWidgetCurrent.options.subType;
    /* Check if we should really call the update routine below. Generally
       we do want to call the update routine. However, in some cases, we
       have set the update on enter flag and the current event is not an
       enter. */
    let callUpdate = true;
    /* console.log(textWidgetCurrent.options, event); */ 
    /* Check if update on enter is set and the current event is not 
       an enter key event */
    /* console.log(callUpdate); */
    if (textWidgetCurrent.options.updateOnEnter == true) {
      /* console.log(callUpdate); */
      callUpdate = false;
      /* console.log(callUpdate); */
      /* console.log(event.hasOwnProperty('key')); */
      /* console.log(Object.hasOwn(event, 'key')); */ 
      /* console.log(event.toString()); */
      /* console.log(event.constructor.name); */
      if (event.toString() == '[object KeyboardEvent]' &&
          event.key == 'Enter')         
        callUpdate = true;
        /* console.log(callUpdate); */
    }
    /* console.log(callUpdate); */
    /* Check if the text field is valid or not. In some case the text
       field is actually valid, but we need to generate an error message
       showing that enter has not been done yet. The enter key will in
       some cases, force an actual update to be done. */
    let enterMessageNeededTrueOrFalse = true;
    if (callUpdate == true)
      enterMessageNeededTrueOrFalse = false;
    /* console.log(textWidgetCurrent); */
    /* console.log(this); */
    /* console.log(this.currentModification); */
    /* console.log(callUpdate); */
    let errorText = textWidgetCurrent.checkInput(subType,
                                                 textWidgetCurrent.textValue,
                                                 textWidgetCurrent.currentModification,
                                                 textWidgetCurrent, 
                                                 enterMessageNeededTrueOrFalse);
    /* console.log(errorText); */
    /* We need to check for a very special case where the user is entering
       a probability. We only really want the error message to be displayed
       if the user has pressed the enter key. This code should probably 
       be more general. Update on enter is commonly set as a option.
       We probably should be checking the options, not looking for a 
       specific sub type. Note the use of 'in' (without the quotes) 
       to check for the existence of the 'key' (without the quotes)
       property. This is required because 'key' (without the quotes)
       property is inherited. */
    if (subType == 'probability') {
      if (event == null             ||
          ('key' in event) == false ||
          event.key != 'Enter') 
        errorText = '';
    }
    /* We need to check for a very special case where the user is entering
       a use mode. We only really want the error message to be displayed
       if the user has pressed the enter key. This code should probably 
       be more general. Update on enter is commonly set as a option.
       We probably should be checking the options, not looking for a 
       specific sub type. Note the use of 'in' (without the quotes)
       to check for the existence of the 'key' (without the quotes)
       property. This is required because 'key' (without the quotes)
       property is inherited.*/
    if (subType == 'usemode') {
      if (event == null             ||
          ('key' in event) == false ||
          event.key != 'Enter') 
        errorText = '';
    }
    /* Store the error text value. The error text may or may not be
       an empty string. Invoke the display error text method on the
       container widget to update the displayed error text. */
    /* console.log(callUpdate); */
    textWidgetCurrent.setErrorText(errorText);
    textWidgetCurrent.inputCallback();
    /* Check if the error text shows that we can proceed with an update.
       In at least one case, the error text must be ignored so that the
       update can proceed. */
    let errorTextOK = false;
    let updateCalled = false;
    if (errorText == '')
      errorTextOK = true;
    /* Invoke the update callback routine only if the text value is valid
       and the call update flag is true */
    /* console.log(callUpdate); */
    if (errorTextOK == true &&
        callUpdate == true) {
      let noErrors = false;
      if (textWidgetCurrent.containerWidget.getErrorText() == '')
        noErrors = true;
      textWidgetCurrent.updateCallback(textWidgetCurrent.textValue, noErrors);
      updateCalled = true;
      /* Invoke the full redraw callback routine if the update callback 
         was invoked. This routine must be called to display the last 
         modified date and time. */
      let typeOfFullRedrawCallback = typeof(textWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined') {
        textWidgetCurrent.fullRedrawCallback();     
      }
    }
    /* If a special flag is set, we want to always call the update routine. 
       This is needed so that changes to this field, can effect other fields.
       For example, in some cases, a valid password should cause a 
       submit button to be enabled. */
    if (updateCalled == false &&
        textWidgetCurrent.options.alwaysUpdate === true) {
      /* Set the no errors flag as need be */
      let noErrors = false;
      if (textWidgetCurrent.containerWidget.getErrorText() == '')
        noErrors = true;
      /* Invoke the update routine */
      textWidgetCurrent.updateCallback(textWidgetCurrent.textValue, noErrors);
      updateCalled = true;
      /* Invoke the full redraw callback routine if the update callback 
         was invoked. This routine must be called to display the last 
         modified date and time. */
      let typeOfFullRedrawCallback = typeof(textWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined') {
        textWidgetCurrent.fullRedrawCallback();   
      }
    }
    /* Set the field validity value based on the current error text */
    /* console.log(errorText); */
    /* console.log(target); */
    target.setCustomValidity(errorText);
    /* Invoke the redraw callback routine only if the text value is valid
       and the invoke redraw flag is true. Note that the call update flag
       is also checked below. If we are using update on enter and the
       current event key is not enter, we will skip the redraw call. */
    let redrawDone = false;
    if (errorText === '' &&
        textWidgetCurrent.options.invokeRedraw === true) {
      if (callUpdate === true) {
        redrawDone = true;
        let typeOfFullRedrawCallback = typeof(textWidgetCurrent.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined') 
          textWidgetCurrent.fullRedrawCallback();
      }
      /* We generally don't want to invoke redraw if the update on enter
         flag is set to true. However, in one very specialized case we
         do want to force a redraw even if the update on enter flag is
         set. If the field is now empty we do want to force a redraw to
         occur. This is needed so that all of the fields used to select
         a target node will be shown, if the node identifier field is
         a target node will be shown, if the node identifier field is
         set to empty. */
      else {
        if (textWidgetCurrent.textValue == '') {
          redrawDone = true;
          let typeOfFullRedrawCallback = typeof(textWidgetCurrent.fullRedrawCallback);
          if (typeOfFullRedrawCallback != 'undefined') 
            textWidgetCurrent.fullRedrawCallback();
        }
      }
    }
    /* If a special flag is set, we want to always call redraw. This 
       is needed so that changes to this field, can effect other fields.
       For example, in some cases, a valid password should cause a 
       submit button to be enabled. */
    if (redrawDone == false &&
        textWidgetCurrent.options.alwaysRedraw === true) {
      redrawDone = true;
      let typeOfFullRedrawCallback = typeof(textWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined') 
        textWidgetCurrent.fullRedrawCallback(); 
    }
  }
  /* This static method is invoked by the pressing of any key. Of course,
     we really only want to handle the Delete, Enter, and Escape keys. */
  static eventKeyDown(event) {
    if (HDLmGlobals.activeDebugging.DOMEvents)
      console.log('Fancytree event DOM HDLmTextWidget KeyDown');
    let key = event.key;
    /* Check for the Delete key */
    if (key === "Delete") {
      HDLmTextWidget.eventKeyDownDelete(event);
      return;
    }
    /* Check for the Enter key */
    if (key === "Enter") {
      HDLmTextWidget.eventKeyDownEnter(event);
      return;
    }
    /* Check for the Escape key */
    if (key === "Escape") {
      HDLmTextWidget.eventKeyDownEscape(event);
      return;
    }
  }
  /* This static method is invoked by the pressing of the Delete key.
     This method is actually called out of the more general key down
     routine. */
  static eventKeyDownDelete(event) {
    let key = event.key;
    if (key !== "Delete") {
      let errorText = 'Event passed to the Delete routine does not have the Delete key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let textWidgetCurrent = HDLmWidgetMap[targetId];
    /* Check if delete is enabled for the current text widget. Just
       return to the caller if delete is not enabled for the current
       text widget. */
    if (textWidgetCurrent.options.delete == false)
      return;
    /* We need to update the text value at this point. The text value
       is updated by clearing it (setting it to an empty value). The
       new text value must be stored in one or two places. First the
       text widget is updated. The update callback routine is only
       invoked if the text value is valid. Callback routines are never
       called if the text value is invalid. */
    target.value = '';
    textWidgetCurrent.textValue = target.value;
    let errorMessageNeededFalse = false;
    let subType = textWidgetCurrent.options.subType;
    let errorText = textWidgetCurrent.checkInput(subType,
                                                 textWidgetCurrent.textValue,
                                                 textWidgetCurrent.currentModification,
                                                 textWidgetCurrent,
                                                 errorMessageNeededFalse);
    /* Store the error text value. The error text may or may not be
       an empty string. Invoke the display error text method on the
       container widget to update the displayed error text which may
       or may not be an empty string. */
    textWidgetCurrent.setErrorText(errorText);
    textWidgetCurrent.inputCallback();
    /* Invoke the update callback routine only if the text value is valid */
    if (errorText == '') {
      let noErrors = false;
      if (textWidgetCurrent.containerWidget.getErrorText() == '')
        noErrors = true;
      textWidgetCurrent.updateCallback(textWidgetCurrent.textValue, noErrors);
      /* Invoke the full redraw callback routine if the update callback 
         was invoked. This routine must be called to display the last 
         modified date and time. */
      {
        let typeOfFullRedrawCallback = typeof(textWidgetCurrent.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined') 
          textWidgetCurrent.fullRedrawCallback();
      }
    }
    /* Set the field validity value based on the current error text */
    target.setCustomValidity(errorText);
    /* Invoke the redraw callback routine only if the text value is valid
       and the invoke redraw flag is true */
    if (errorText === '' &&
        textWidgetCurrent.options.invokeRedraw === true) {
      let typeOfFullRedrawCallback = typeof(textWidgetCurrent.fullRedrawCallback);
      if (typeOfFullRedrawCallback != 'undefined')   
        textWidgetCurrent.fullRedrawCallback();
    }
  }
  /* This static method is invoked by the pressing of the Enter key.
     This method is actually called out of the more general key down
     routine. Enter is generally ignored. */
  static eventKeyDownEnter(event) {
    let key = event.key;
    if (key !== "Enter") {
      let errorText = 'Event passed to the Enter routine does not have the Enter key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let textWidgetCurrent = HDLmWidgetMap[targetId];
    /* Check if the update on enter flag is set. If this flag is set,
       then we need to invoke the input event routine. This routine
       will do all of the work needed to handle the enter operation. */
    if (textWidgetCurrent.options.updateOnEnter == true)
      HDLmTextWidget.eventInput(event);
    /* Check if the call on enter flag is set. If this flag is set,
       then we need to invoke the input event routine. This routine
       will do all of the work needed to handle the enter operation. */
    if (textWidgetCurrent.options.callOnEnter == true)
      textWidgetCurrent.keyDownCallback(event);
    /* In one very specific case, we need to force a complete redraw
       of the entire modification. Note that we need to redraw the
       entire modification in this case. Of course, this is a very
       unusual case. */
    if (textWidgetCurrent.dataType == 'extrainfo' &&
        textWidgetCurrent.errorText == '') {
      let targetTreeNode = textWidgetCurrent.treeNode;
      let modType = targetTreeNode.details.type;
      if (modType == 'style') {
        let typeOfFullRedrawCallback = typeof(textWidgetCurrent.fullRedrawCallback);
        if (typeOfFullRedrawCallback != 'undefined') 
          textWidgetCurrent.fullRedrawCallback();
      }
    }
  }
  /* This static method is invoked by the pressing of the Escape key.
     This method is actually called out of the more general key down
     routine. Escape is generally ignored. However, if escape is used
     while a new tree entry is being created, then we need to cancel
     creating/adding the new tree entry. */
  static eventKeyDownEscape(event) {
    let key = event.key;
    if (key !== "Escape") {
      let errorText = 'Event passed to the Escape routine does not have the Escape key';
      HDLmAssert(false, errorText);
    }
    /* Get the target for the current event. We use the target to find
       the widget class instance. */
    let target = event.target;
    let targetId = target.id;
    let textWidgetCurrent = HDLmWidgetMap[targetId];
    /* Invoke the key down (key press) callback routine with the
       current event value. The key down callback routine will
       decide what to do with the current event. */
    textWidgetCurrent.keyDownCallback(event);
  }
  /* This instance method returns the widget description to the caller */
  getDescription() {
    return this.description;
  }
  /* This instance method returns the widget error text to the caller.
     The error text may be set to an empty string. */
  getErrorText() {
    return this.errorText;
  }
  /* This instance method returns the widget type value to the caller.
     The widget type value was set when the widget was created. */
  getTypeValue() {
    return this.dataType;
  }
  /* This method returns a boolean value showing if the current
     widget is an HTML element selection widget or not. The widget
     options must be checked to determine this value. */
  isElementSelection() {
    return this.options.elementSelection;
  }
  /* This method returns a boolean value showing if the value for the
     current widget is empty or not. A text widget is considered to be
     empty if the value is a null or if the text value length is zero. */
  isEmpty() {
    return this.textValue === null || this.textValue.length === 0;
  }
  /* This method actually adds a text widget to an HTML web page.
     The caller provides the DOM element the text widget should be
     added to. This method returns the new DOM element to the caller. */
  render(parentId) {
    /* console.log('In HDLmTextWidget.render'); */
    /* Make sure the parent ID is a string */
    if (typeof parentId != 'string') {
      let errorText = 'ParentId passed to render is not a string';
      HDLmAssert(false, errorText);
    }
    let newData;
    HDLmWidgetMap[this.newUnique] = this;
    this.setErrorText('');
    let newStyle = '';
    let newText = '';
    let localReadOnly = false;
    /* console.log(localReadOnly); */
    /* Check if the widget is read only. If the widget is read only,
       then set the local read-only value to true. */ 
    if (this.options.editable == false  ||
        this.options.textOutput == true ||
        this.readOnly == true)
      localReadOnly = true;
    /* console.log(localReadOnly); */
    /* console.log(this.options.textOutput); */
    newText += '<div>';
    if (this.options.multiLineValue == false)
      if (this.options.maskValue == false) {
        /* console.log(localReadOnly); */
        if (this.options.textOutput == true) {
          if (this.options.bold == true) {
            if (this.options.htmlPre == true) {
              newText += '<pre>';
            }
            newText += '<b';
          }
          else
            newText += '<span';
        }
        else
          if (this.options.htmlBreak == true)
            newText += '<br';
          else
            newText += '<input type="text"';
      }
      else
        newText += '<input type="password"';
    else
      newText += '<textarea';
    /* console.log(newText); */
    /* For multiline text fields, let's find out many rows
       and columns we really need */
    if (this.options.multiLineValue == true) {
      /* Get the number of rows needed */
      let valueSplit = this.textValue.split('\n');
      let numberRows = String(valueSplit.length);
      if (numberRows > 0) {
        newText += ' rows="';
        newText += numberRows;
        newText += '"';
      }
      /* Get the number of columns needed */
      let maxCols = -1;
      valueSplit.forEach(text => maxCols = Math.max(maxCols, text.length));
      if (maxCols > 0) {
        let numberCols = String(maxCols);
        newText += ' cols="';
        newText += numberCols;
        newText += '"';
      }
    }
    /* Make the text bold if the appropriate option was set */
    /* console.log(this.options.bold, this.options.borderSize); */
    if (this.options.bold == true &&
        this.options.borderSize == 'default')
      newStyle += 'font-weight:bold;';
    /* console.log(newStyle); */
    if (this.options.boldBox == true &&
      this.options.borderSize == 'default')
      newStyle += 'border:1px solid;';
    if (this.options.borderSize != 'default')
      newStyle += 'border:' + this.options.borderSize.toString() + 'px;';
    if (this.options.bottomMargin > 0) {
      let bottomMargin = this.options.bottomMargin;
      newStyle += 'margin-bottom:' + bottomMargin.toString() + 'px;';
    }
    if (this.options.fontFamily != 'default')
      newStyle += 'font-family:' + this.options.fontFamily + ';';
    if (this.options.fontSize != 'default')
      newStyle += 'font-size:' + this.options.fontSize.toString() + 'px;';
    if (this.options.topMargin > 0) {
      let topMargin = this.options.topMargin;
      newStyle += 'margin-top:' + topMargin.toString() + 'px;';
    }
    if (newStyle != '')
      newText += ' style="' + newStyle + '"';
    if (this.options.sizeValue != 'default') {
      newText += ' size="';
      newText += this.options.sizeValue;
      newText += '"';
    }
    newText += ' placeholder="';
    newText += this.options.placeHolderText;
    newText += '"';
    /* Set the read only attribute, if need be */
    if (localReadOnly == true)
      newText += ' readonly';
    /* Disable the spell checker, if need be */
    if (this.options.spellCheck == false)
      newText += ' spellcheck="false"';
    /* Add the new unique id (note the use of lower case) value */
    newText += ' id="';
    newText += this.newUnique;
    newText += '"';
    /* console.log(newText); */
    /* In some cases (multiline values), we need to terminate the
       initial tag at this point */
    if (this.options.multiLineValue == true)
    /* Add the actual value. Note that double quotes are replaced
       with an escape sequence that should work. */
      newText += '>';
    if (this.options.multiLineValue == false)
      newText += ' value="';
    newData = this.textValue;
    newData = HDLmString.replaceAll(newData, '"', '&quot;');
    newText += newData;
    /* Terminate either the input tag or the entire textarea.
       This is true in most, but not cases. For text output 
       fields, the input tag is not terminated here. */
    if (this.options.multiLineValue == false) {
      if (this.options.textOutput == true)
        newText += '">';
      else
        newText += '"/>';
    }
    else {
      newText += '</textarea>';
    }
    /* Add the actual value in some cases at this point */
    if (this.options.textOutput == true) {
      newText += newData; 
      /* Terminate the current HTML field */
      if (this.options.bold == true) {
        newText += '</b>';
        if (this.options.htmlPre == true) {
          newText += '</pre>';
        }
      }
      else
        newText += '</span>';
      /* console.log(newData); */
    }
    newText += '</div>';
    /* console.log(newText); */
    /* Create a new jQuery array and a new DOM element from the generated HTML */
    let newJQArray = $(newText);
    let newElement = newJQArray[0];  
    /* Add the new jQuery array to the values div */
    $(parentId).append(newJQArray);
    /* Add the input event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('input', HDLmTextWidget.eventInput);
    /* Add the key down event listener, if need be */
    if (this.options.editable == true)
      newElement.addEventListener('keydown', HDLmTextWidget.eventKeyDown);
    /* Set the field validity information for the text value. The field
       should be valid, but you never know. Note that the code below sets
       the widget error text field based on the current text value. The
       widget error text field is also used to set the validity indicator.
       Note that a null event is passed in this case. */
    /* console.log(this.textValue); */
    let errorMessageNeededFalse = false; 
    let subType = this.options.subType;
    let errorText = this.checkInput(subType,
                                    this.textValue,
                                    this.currentModification,
                                    this,
                                    errorMessageNeededFalse);
    /* console.log(errorText); */
    this.setErrorText(errorText);
    /* console.log(errorText); */
    /* Use jQuery to set find the field using the unique id (note the use
       of lower case) */
    let newSelector = '#' + this.newUnique;
    let newInputField = $(newSelector)[0];
    /* The code below invokes the focus function on the current
       element. This code does not seem to work. */
    if (this.options.setFocus == true)
      newInputField.focus(); 
    /* console.log(newInputField); */
    /* console.log(newSelector); */
    /* console.log(errorText, newSelector, this.newUnique); */ 
    /* console.log(newInputField); */
    /* console.log(localReadOnly); */
    if (localReadOnly == false)
      newInputField.setCustomValidity(errorText);   
    return newElement;
  }
  /* This method is used to set the parent container widget value of a text
     widget. The value passed by the caller is copied into the text widget.
     Note that the actual value is copied. */
  setContainerWidget(parentContainerWidget) {
    /* Make sure the parent container widget is really an object */
    if (typeof parentContainerWidget != 'object') {
      let errorText = 'ParentContainerWidget passed to setContainerWidget is not an object';
      HDLmAssert(false, errorText);
    }
    /* Copy the parent container widget reference */
    this.containerWidget = parentContainerWidget;
  }
  /* This method is used to set the address of the current modification for
     use later. This method will be passed a null value in most (but not all)
     cases. The value is stored in a class variable for use later. */
  setCurrentModification(newCurrentModification) {
    /* Make sure the argument is an object */
    if (newCurrentModification != null && (typeof newCurrentModification) != 'object') {
      let errorText = 'CurrentModification passed to setCurrentModification method is not an object';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is of the correct class */
    let className = '';
    if (newCurrentModification != null) {
      className = newCurrentModification.constructor.name;
    }
    /* The code below allows the class name to be HDLmTree. This is required
       because the insert code uses an HDLmTree instance to build a new
       modification tree node. */
    if (className != ''        &&
        className != 'Object'  &&
        className != 'HDLmMod' &&
        className != 'HDLmTree') {
      let errorText = `currentModification passed to setCurrentModification method has the wrong class (${className})`;
      HDLmAssert(false, errorText);
    }
    /* Copy and save the current modification address */
    this.currentModification = newCurrentModification;
  }
  /* This method is used to set the description text for the current widget.
     The value passed to this routine must be a string. An error is reported
     if the value passed to this routine is not a string. */
  setDescriptionValue(descriptionValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(descriptionValue) == true) {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof descriptionValue != 'string') {
      let errorText = 'DescriptionValue passed to setDescriptionValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the description value */
    this.description = descriptionValue;
  }
  /* This method sets the error text field of the current widget to whatever
     error text value was passed by the caller. The error text value passed
     by the caller may or may not be an empty string. */
  setErrorText(newErrorText) {
    /* Make sure the error text string is actually a string */
    if (typeof newErrorText != 'string') {
      let errorText = 'NewErrorText passed to setErrorText is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the error text string */
    this.errorText = newErrorText;
  }
  /* This method can be used to save a reference to the caller full
     redraw callback function. The full redraw callback function is
     invoked whenever the widget must be fully redrawn. This will
     typically happen whenever the contents of the widget have
     changed and the modification must be completely redrawn. */
  setFullRedrawCallback(newFullRedrawCallback) {
    /* Make sure the full redraw callback function is really a function */
    if (newFullRedrawCallback != null && typeof newFullRedrawCallback != 'function') {
      let errorText = 'NewFullRedrawCallback passed to setFullRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.fullRedrawCallback = newFullRedrawCallback;
  }
  /* This method can be used to save a reference to the caller
     input callback function. The input callback function is
     invoked whenever an input event occurs for the current
     widget. */
  setInputCallback(newInputCallback) {
    /* Make sure the input callback function is really a function */
    if (typeof newInputCallback != 'function') {
      let errorText = 'NewInputCallback passed to setInputCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.inputCallback = newInputCallback;
  }
  /* This method can be used to save a reference to the caller key
     down (key press) callback funtion. The key press callback function
     is invoked (may be invoked) when a key press event occurs for the
     current widget. This callback routine is used to handle the key
     press event. */
  setKeyDownCallback(newKeyDownCallback) {
    /* Make sure the key down callback function is really a function */
    if (typeof newKeyDownCallback != 'function') {
      let errorText = 'NewKeyDownCallback passed to setKeyDownCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.keyDownCallback = newKeyDownCallback;
  }
  /* This method can be used to set any select of options. The
     options passed by the caller will override any existing
     options (which may or may not be default values). */
  setOptions(newOptions) {
    /* Make sure the new options are an object */
    if (typeof newOptions != 'object') {
      let errorText = 'NewOptions passed to setOptions method are not an object';
      HDLmAssert(false, errorText);
    }
    let keys = Object.keys(newOptions);
    let keyLen = keys.length;
    for (let i = 0; i < keyLen; i++) {
      let currentKey = keys[i];
      if (this.options.hasOwnProperty(currentKey) == false) {
        let errorText = 'Property (' + currentKey + ') does not exist in options';
        HDLmAssert(false, errorText);
      }
      this.options[currentKey] = newOptions[currentKey];
    }
  }
  /* This method can be used to save a reference to the caller
     redraw callback function. The redraw callback function is
     invoked whenever the widget must be redrawn. This will
     typically happen whenever the contents of the widget have
     changed. */
  setRedrawCallback(newRedrawCallback) {
    /* Make sure the redraw callback function is really a function */
    if (typeof newRedrawCallback != 'function') {
      let errorText = 'NewRedrawCallback passed to setRedrawCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.redrawCallback = newRedrawCallback;
  }
  /* This method is used to set the sub type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setSubTypeValue(subTypeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(subTypeValue) == true) {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof subTypeValue != 'string') {
      let errorText = 'SubTypeValue passed to setSubTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the sub type value */
    this.subType = subTypeValue;
  }
  /* This method is used to set the value of a text widget. The value
     passed by the caller is copied into the text widget. Note that the
     actual text value is copied. */
  setTextValue(newTextValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(newTextValue) == true) {
      let errorText = 'NewTextValue passed to setTextValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof newTextValue != 'string') {
      let errorText = 'NewTextValue passed to setTextValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the text value */
    this.textValue = newTextValue;
  }
  /* This method can be used to save a reference to the tree Nriode
     associated with the current widget. The caller provides the
     tree node reference. This routine saves the tree node
     reference in the current widget. */
  setTreeNode(newTreeNode) {
    /* Make sure the tree node reference is really an object */
    if (typeof newTreeNode != 'object') {
      let errorText = 'NewTreeNode passed to setTreeNode is not an object';
      HDLmAssert(false, errorText);
    }
    this.treeNode = newTreeNode;
  }
  /* This method is used to set the type value for the current widget.
     The value passed to this routine must be a string. An error is
     reported if the value passed to this routine is not a string. */
  setTypeValue(typeValue) {
    /* Make sure the argument is not an array */
    if (Array.isArray(typeValue) == true) {
      let errorText = 'TypeValue passed to setTypeValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is a string */
    if (typeof typeValue != 'string') {
      let errorText = 'TypeValue passed to setTypeValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Copy the type value */
    this.dataType = typeValue;
  }
  /* This method can be used to save a reference to the caller
     update callback function. The update callback function is
     invoked whenever the data value in the widget has been
     changed. This callback is used to update the actual data
     value. The data value in the widget is just a copy of
     the original data value. The update callback routine is
     only invoked if the text value is valid. Callback routines
     are never called if the updated value(s) is/are invalid. */
  setUpdateCallback(newUpdateCallback) {
    /* Make sure the update callback function is really a function */
    if (typeof newUpdateCallback != 'function') {
      let errorText = 'NewUpdateCallback passed to setUpdateCallback is not a function';
      HDLmAssert(false, errorText);
    }
    this.updateCallback = newUpdateCallback;
  }
}