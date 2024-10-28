/**
 * HDLmStateInfo short summary.
 *
 * HDLmStateInfo description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
class HDLmStateInfo {  
  /* Get the system suffix value that follows the standard suffix. 
     This is typically just one character, such as 'a' or 'b' or
     'c' or 't' (without the quotes). The system suffix is
     returned to the caller as JavaScript string, not as a 
     JavaScript character. 
     
     This value is used to build the key that is used to 
     obtain data from a database. This value follows the 
     standard suffix. */
  static getSystemValue() {
    return HDLmState.getString("entriesContentSystemValue");
  }
  /* Get the standard suffix value for production systems */
  static getSystemValueProd() {
    return HDLmState.getString("entriesContentSystemValueProd");
  }
  /* Get the standard suffix value for test systems */
  static getSystemValueTest() {
    return HDLmState.getString("entriesContentSystemValueTest");
  }
  /* Set the system suffix value that follows the standard suffix. 
     This is typically just one character, such as 'a' or 'b' or 
	   'c' or 't' (without the quotes). The system suffix is set 
     from the string passed by the caller. The actual value is 
     a JavaScript string, not a JavaScript character. 
	  
	   This value is used to build the key that is used to 
	   obtain data from a database. This value follows the 
	   standard suffix. */
  static setEntriesSystemValue(newValue) {
    /* console.log('In HDLmStateInfo.setEntriesSystemValue'); */
    /* console.log('newValue: ' + newValue); */
    /* Make sure the value passed by the caller is a string */
    if (typeof (newValue) != 'string') {
      let errorText = `State (${newValue}) value passed to setEntriesSystemValue method is not a string`;
      HDLmAssert(false, errorText);
    }
    HDLmState.setString("entriesContentSystemValue", newValue);
  }
  /* Set the production system suffix value that follows the standard
     suffix. This is typically just one character, such as 'a' or 'b' 
     or 'c' or 't' (without the quotes). The system suffix is set 
     from the string passed by the caller. The actual value is 
     a JavaScript string, not a JavaScript character. 
  
     This value is used to build the key that is used to 
     obtain data from a database. This value follows the 
     standard suffix. */
  static setEntriesSystemValueProd(newValue) {
    /* console.log('In HDLmStateInfo.setEntriesSystemValueProd'); */
    /* console.log('newValue: ' + newValue); */
    /* Make sure the value passed by the caller is a string */
    if (typeof (newValue) != 'string') {
      let errorText = `State (${newValue}) value passed to setEntriesSystemValueProd method is not a string`;
      HDLmAssert(false, errorText);
    }
    HDLmState.setString("entriesContentSystemValueProd", newValue);
  }
  /* Set all of the system suffix values that follows the standard
     suffix. This is typically just one character, such as 'a' or 'b' 
     or 'c' or 't' (without the quotes). Some of the system suffix
     values are set from the string passed by the caller. Some are 
     hard-coded. The actual value is a JavaScript string, not a
     JavaScript character. */ 
  static setEntriesSystemValues(newValue) {
    /* console.log('In HDLmStateInfo.setEntriesSystemValues'); */
    /* console.log('newValue: ' + newValue); */
    /* Make sure the value passed by the caller is a string */
    if (typeof (newValue) != 'string') {
      let errorText = `State (${newValue}) value passed to setEntriesSystemValues method is not a string`;
      HDLmAssert(false, errorText);
    }
    HDLmState.setString("entriesContentSystemValue", newValue)
    HDLmState.setString("entriesContentSystemValueProd", newValue);
    HDLmState.setString("entriesContentSystemValueTest", 't')
  }
  /* Set the test system suffix value that follows the standard
     suffix. This is typically just one character, such as 'a' or
     'b' or 'c' or 't' (without the quotes). The system suffix is
     set from the string passed by the caller. The actual value is 
     a JavaScript string, not a JavaScript character. 

     This value is used to build the key that is used to 
     obtain data from a database. This value follows the 
     standard suffix. */
  static setEntriesSystemValueTest(newValue) {
    /* console.log('In HDLmStateInfo.setEntriesSystemValueTest'); */
    /* console.log('newValue: ' + newValue); */
    /* Make sure the value passed by the caller is a string */
    if (typeof (newValue) != 'string') {
      let errorText = `State (${newValue}) value passed to setEntriesSystemValueTest method is not a string`;
      HDLmAssert(false, errorText);
    }
    HDLmState.setString("entriesContentSystemValueTest", newValue);
  }
}