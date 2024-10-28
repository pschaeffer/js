/**
 * HDLmState short summary.
 *
 * HDLmState description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following data structure contains information about all 
   of the standard state values. The standard state values are 
   used in many places in the code. Note that the Java code has 
   another copy of these values. The default and initial value
   for the system character is 'c' (without the quotes). */
const HDLmStateConstants =
  {
    "entriesContentSystemValue":     "c",
    "entriesContentSystemValueProd": "a",
    "entriesContentSystemValueTest": "t"
  };
class HDLmState {
  /* Process the JSON state string returned from the server
     or created locally. Most of the actual state data is 
     stored in just one place, in another language, on the 
     server. The server state data is used to build the 
     JavaScript state data. 

     The above comment is no longer true. The standard state
     data is now stored locally in this routine. */
  static addState(jsonStr) {
    /* console.log('In HDLmState.addState'); */
    /* console.log(jsonStr); */
    /* Create a local state object from the JSON provided
       by the caller */
    let localStateInfo = JSON.parse(jsonStr);
    /* Create the state object, if it does not already exist */
    if (typeof HDLmState.HDLmStateInfoData == 'undefined' ||
        HDLmState.HDLmStateInfoData == null)
      HDLmState.HDLmStateInfoData = {};
    /* Extract all of the keys from the local state object */
    let localStateInfoKeys = Object.keys(localStateInfo);
    /* Use the keys to build the state object */
    for (const key of localStateInfoKeys)
      HDLmState.HDLmStateInfoData[key] = localStateInfo[key];
  }  
  /* This routine build the state values from local values,
     if need be. If the state values are already built, then
     this routine does nothing. Normally, the state values 
     are built as part of initialization. However, if the 
     browser extension environment, they are not. The routine
     below is used to build the state values in other cases. */
  static buildStateIfNeedBe() {
    /* console.log('In HDLmState.buildState'); */
    /* console.log(HDLmState.HDLmStateInfoData); */
    /* Check if the state object has already been built */
    if (HDLmState.HDLmStateInfoData != null)
      return;
    /* Build the state object */
    let localStateJson = JSON.stringify(HDLmStateConstants);
    HDLmState.addState(localStateJson);
    /* console.log(HDLmState.HDLmStateInfoData); */
  }
  /* Get the JSON state string from the above state
     constants */
  static getState() {
    /* Build the required Promise for return to the caller */
    let statePromise = new Promise(function (resolve, reject) {
      let resolveValue = JSON.stringify(HDLmStateConstants);
      resolve(resolveValue);
    })
    return statePromise;
  }  
	/* This static method returns the numeric value of a state value,
		 if the state value is valid (exists) and if the state value
		 is actually a number (not a string) */
  static getNumber(stateName) {
    /* Make sure the value passed by the caller is a string */
    if (typeof (stateName) != 'string') {
      let errorText = `State (${stateName}) name value passed to getNumber method is not a string`;
      HDLmAssert(false, errorText);
    }
		/* Check if the state name passed by the caller is valid
		   or not. We need to cause an assert if the state name
		   passed by the caller is unknown. */
    if (!HDLmState.HDLmStateInfoData.hasOwnProperty(stateName)) {
      let errorText = `Invalid state Name (${stateName}) passed to getNumber`;
      HDLmAssert(false, errorText);
    }
		/* Get the value from the object and check if the value is a number. This 
		   method can only be used to obtain values that are actually numbers. */
    let rv = HDLmState.HDLmStateInfoData[stateName];
    if ((typeof rv) != 'number') {
      let errorText = `Value of state Name (${stateName}) is not a number`;
      HDLmAssert(false, errorText);
    }
    return rv;
  }
	/* This static method returns the string value of a state value
		 if the state value is valid (exists) and if the state value
		 is actually a string (not a number) */
  static getString(stateName) {
    /* console.log('In HDLmState.getString'); */ 
    /* console.log('stateName: ' + stateName); */
    /* Make sure the value passed by the caller is a string */
    if (typeof(stateName) != 'string') {
      let errorText = `State (${stateName}) name value passed to getString method is not a string`;
      HDLmAssert(false, errorText);
    }
		/* Check if the state name passed by the caller is valid
		   or not. We need to cause an assert if the state name
		   passed by the caller is unknown. */
    /* console.log(HDLmState.HDLmStateInfoData); */
    /* console.log(HDLmState); */
    /* console.log('stateName: ' + stateName); */
    if (!HDLmState.HDLmStateInfoData.hasOwnProperty(stateName)) {
      let errorText = `Invalid state Name (${stateName}) passed to getString`;
      HDLmAssert(false, errorText);
    }
		/* Get the value from the object and check if the value is a string. This 
		   method can only be used to obtain values that are actually strings. */
    let rv = HDLmState.HDLmStateInfoData[stateName];
    if ((typeof rv) != 'string') {
      let errorText = `Value of state Name (${stateName}) is not a string`;
      HDLmAssert(false, errorText);
    }
    return rv;
  }
	/* This static method returns the value of a state name
		 if the state value is valid (exists) */
  static getValue(stateName) {
    /* Make sure the value passed by the caller is a string */
    if (typeof (stateName) != 'string') {
      let errorText = `State (${stateName}) name value passed to getValue method is not a string`;
      HDLmAssert(false, errorText);
    }
		/* Check if the state name passed by the caller is valid
		   or not. We need to cause an assert if the state name
		   passed by the caller is unknown. */
    if (!HDLmState.HDLmStateInfoData.hasOwnProperty(stateName)) {
      let errorText = `Invalid state Name (${stateName}) passed to getValue`;
      HDLmAssert(false, errorText);
    }
    /* Get the value from the object */
    let rv = HDLmState.HDLmStateInfoData[stateName];
    return rv;
  }
  /* This static method sets the string value of a state value 
     if the state name is valid (exists) and if the new state
     value is actually a string (not a number or a boolean). 
     The caller provides the new state value. */
  static setString(stateName, stateValue) {
    /* Make sure the name value passed by the caller is a string */
    if (typeof (stateName) != 'string') {
      let errorText = `State (${stateName}) name value passed to setString method is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the new value passed by the caller is a string */
    if (typeof (stateValue) != 'string') {
      let errorText = `State (${stateValue}) name value passed to setString method is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Create the state object, if it does not already exist */
    if (typeof HDLmState.HDLmStateInfoData == 'undefined' ||
        HDLmState.HDLmStateInfoData == null)
      HDLmState.HDLmStateInfoData = {};
		/* Check if the state name passed by the caller is valid
		   or not. We need to cause an assert if the state name
		   passed by the caller is unknown. This check is no 
       longer done. We have an important cases where the 
       state name does not exist, but still must be added. */
    if (false && !HDLmState.HDLmStateInfoData.hasOwnProperty(stateName)) {
      let errorText = `Invalid state Name (${stateName}) passed to setString`;
      HDLmAssert(false, errorText);
    }
		/* Get the value from the object and check if the value is a string. This 
		   method can only be used to obtain values that are actually strings. */
    let nv = stateValue;
    if ((typeof nv) != 'string') {
      let errorText = `New state value (${stateValue}) is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Set one of the keys of the object from the value */
    HDLmState.HDLmStateInfoData[stateName] = nv;
  }
}
/* The field below eventually references an object with all 
   of the state data. This field is initially set to null to
   show that it has not been set. */
HDLmState.HDLmStateInfoData = null;