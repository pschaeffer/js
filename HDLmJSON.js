/**
 * HDLmJSON short summary.
 *
 * HDLmJSON description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* import destr from 'https://cdn.jsdelivr.net/npm/destr@2.0.5/+esm'; */
/* The HDLmJSON class is not used to create any objects.
   However, it does contain code for using JSON. */ 
class HDLmJSON {
  /* This routine "gets" a colon from a JSON string. The colon (if found)
     is returned to the caller along with the current position in the string.
     If there is an error, then a null value is returned to the caller. 
     Whitespace is skipped before and after the colon. JSON uses colons
     to separate keys and values. */
  static getColon(jsonStr, jsonLen, strPos) {
    let curChar;   
    let skipRv;
    /* Skip any whitespace before the colon */
    skipRv = HDLmJSON.skipWhitespace(jsonStr, jsonLen, strPos);
    curChar = skipRv[0];
    strPos = skipRv[1];
    /* Check if the current character is a colon. 
       If it is not, then the JSON is invalid. */
    if (curChar !== ':') {
      return [null, strPos];
    }
    /* Skip the colon */
    strPos++;
    /* Skip any whitespace after the colon */
    skipRv = HDLmJSON.skipWhitespace(jsonStr, jsonLen, strPos);
    curChar = skipRv[0];
    strPos = skipRv[1];
    /* Return the colon and the current position 
       in the string to the caller */
    return [':', strPos];
  }
  /* This routine "gets" a comma from a JSON string. The comma 
     (if it is found) is returned to the caller along with the 
     current position in the string. If there is an error, then 
     a null value is returned to the caller. Whitespace is skipped 
     before and after the comma. JSON uses commas to separate values 
     and key/value pairs. */
  static getComma(jsonStr, jsonLen, strPos) {
    let curChar;   
    let skipRv;
    /* Skip any whitespace before the comma */
    skipRv = HDLmJSON.skipWhitespace(jsonStr, jsonLen, strPos);
    curChar = skipRv[0];
    strPos = skipRv[1];
    /* Check if the current character is a comma. 
       If it is not, then the JSON is invalid. */
    if (curChar !== ',') {
      return [null, strPos];
    }
    /* Skip the comma */
    strPos++;
    /* Skip any whitespace after the comma */
    skipRv = HDLmJSON.skipWhitespace(jsonStr, jsonLen, strPos);
    curChar = skipRv[0];
    strPos = skipRv[1];
    /* Return the comma and the current position 
       in the string to the caller */
    return [',', strPos];
  }
  /* This routine returns a list of values to the caller. 
     If there is an error, then a null value is returned 
     to the caller. The updated position in the string is 
     also returned. */
  static getList(jsonStr, jsonLen, strPos) {
    /* Declare and define a few local variables */
    let commaFound = false
    let curChar;
    let curValue;
    let getRv;
    let rv = [];
    let skipRv;
    let valueValid;
    /* Make sure the first character is an opening bracket. 
       If it is not, then the JSON is invalid. */
    if (jsonStr[strPos] != '[') {
      return [null, strPos];
    }
    /* Skip the opening bracket */
    strPos++; 
    /* Loop through the values in the list until we reach the closing bracket */
    while (true) {
      /* Skip any whitespace before the value. Check if we have 
         reached the end of the list (array). If we have, then 
         just return to the caller. */ 
      skipRv = HDLmJSON.skipWhitespace(jsonStr, jsonLen, strPos);
      curChar = skipRv[0];
      strPos = skipRv[1];
      /* The trailing bracket marks the end of the list. 
         However, this might be a case where we have a comma 
         followed by a closing bracket. This is invalid JSON.
         If we have reached the end of the list, then return 
         the list and the current position in the string to 
         the caller. */
      if (curChar == ']') {
        /* Check for a closing bracket that is preceded by a comma. 
           This is invalid JSON. */
        if (commaFound) 
          return [null, strPos];
        /* Skip the closing bracket */
        strPos++;
        return [rv, strPos];
      }
      /* Get a value from the JSON string. This value might 
         be an object, a list, a string, a boolean, or a null
         or several other types. */
      getRv = HDLmJSON.getValue(jsonStr, jsonLen, strPos);
      curValue = getRv[0];
      strPos = getRv[1];
      valueValid = getRv[2];
      /* Check if we actually got a value. If we did not, 
         then the JSON is invalid. */
      if (!valueValid) 
        return [null, strPos];
      /* Add the value to the list */
      rv.push(curValue);
      /* Get the possible comma after the value */ 
      getRv = HDLmJSON.getComma(jsonStr, jsonLen, strPos);
      curChar = getRv[0];
      strPos = getRv[1];
      /* If we got a comma, then we need to get the next value */
      if (curChar == ',') {
        commaFound = true;
      }
      /* If we did not get a comma, then we should be at 
         the end of the list */
      else {
        commaFound = false; 
        break;
      }
    }
    /* Make sure the last character is a closing bracket. 
       If it is not, then the JSON is invalid. */
    if (jsonStr[strPos] != ']') {
      return [null, strPos];
    }
    /* Skip the closing bracket */
    strPos++;
    /* Return the list and the current position 
       in the JSON string to the caller */
    return [rv, strPos];
  }  
  /* This routine gets a number of characters from the 
     input string. The number of characters to get is 
     specified by the caller. The characters are returned 
     to the caller. */ 
  static getNextChars(jsonStr, jsonLen, strPos, numChars) {
    /* Declare and define a local variable */
    let curValue;
    /* Check if we have enough characters left in the string
       to get the requested number of characters. If we do not, 
       then return a null value to the caller. */
    if (strPos + numChars > jsonLen) {
      return [null, strPos];
    }
    /* Get the requested number of characters from the string */
    curValue = jsonStr.substring(strPos, strPos + numChars);
    strPos += numChars;
    return [curValue, strPos];
  }
  /* This routine gets a number from a JSON string. The number 
     is returned to the caller along with the current position 
     in the string. If there is an error, then a null value is 
     returned to the caller. */
  static getNumber(jsonStr, jsonLen, strPos) {
    /* Declare and define a few local variables */
    let curChar;
    let curNumber;
    let curValue = ''; 
    /* Build the value */
    while (strPos < jsonLen) {
      /* Get the current character in the string */      
      curChar = jsonStr[strPos];
      /* Check if the current character is a valid character for a number.
         If it is, add it to the value and move to the next character. 
         If it is not, then we have reached the end of the number. */
      if (curChar == '+' || 
          curChar == '-' || 
          curChar == '.' ||
          curChar == 'e' ||
          curChar == 'E' ||
          (curChar >= '0' && curChar <= '9')) {
        curValue += curChar;
        strPos++; 
      }
      else
        break;
    }
    /* Check if we actually got a number. If we did not, 
       then the JSON is invalid. */
    if (curValue == '') {
      return [null, strPos];
    }
    /* Convert the value to a number and return it to the caller
       along with the current position in the string */
    try {
      curNumber = Number(curValue);
    } 
    catch (error) {
      return [null, strPos];
    }
    return [curNumber, strPos];
  }
  /* This routine gets an object from a JSON string. The object is returned 
     to the caller along with the current position in the string. If 
     there is an error, then a null value is returned to the caller. 
     JSON uses curly braces to enclose objects. */
  static getObj(jsonStr, jsonLen, strPos) {
    /* Declare and define a few local variables */
    let commaFound = false;
    let curChar;
    let curKey;
    let curValue;
    let getRv;
    let keyFound = false;
    let rvObj = {};
    let valueValid;
    /* Make sure the first character is an opening brace. 
       If it is not, then the JSON is invalid. */
    if (jsonStr[strPos] != '{') {
      return [null, strPos];
    }
    /* Skip the opening brace */
    strPos++;
    /* Build the object */
    while (true) {
      /* Get the next key in the object */
      getRv = HDLmJSON.getString(jsonStr, jsonLen, strPos);
      curKey = getRv[0];
      strPos = getRv[1];
      /* Check if we have reached the end of the 
         JSON string that represents the object */
      if (curKey == null || curKey == '') {
        /* Check if we don't have a key after a comma. 
           This is invalid JSON. */
        if (commaFound) 
          return [null, strPos]; 
        break;
      }
      /* We have a key. Set the flag to indicate
         that we have found a key. */
      keyFound = true;
      /* Get the colon that separates the key and value.
         This step includes skipping any whitespace before
         and after the colon. Note, that a colon character
         is required to separate the key and value. Also
         note, that a colon is returned to the caller. */
      getRv = HDLmJSON.getColon(jsonStr, jsonLen, strPos);
      curChar = getRv[0];
      strPos = getRv[1];
      if (curChar != ':')
        return [null, strPos];
      /* get the next value in the object */
      getRv = HDLmJSON.getValue(jsonStr, jsonLen, strPos);
      curValue = getRv[0];
      strPos = getRv[1];
      valueValid = getRv[2];
      /* Check if we actually got a value. If we did not, 
         then the JSON is invalid. */
      if (!valueValid) 
        return [null, strPos];
      /* Add the key/value pair to the object */
      rvObj[curKey] = curValue; 
      /* Get the comma that separates the key/value pairs.
         This step includes skipping any whitespace before
         and after the comma. Note, that a comma character
         is required to separate the key/value pairs. Also
         note, that a comma is not returned to the caller. */
      getRv = HDLmJSON.getComma(jsonStr, jsonLen, strPos);
      curChar = getRv[0];
      strPos = getRv[1];
      /* Check if we actually have a comma after the key/value pair.
         If we do, then we need to get the next key/value pair. If 
         we do not, then we have reached the end of the object. */
      if (curChar == ',') 
        commaFound = true;
      else {
        commaFound = false;
        /* At this point, there are no more key/value pairs in the object. 
           We should be at the end of the object. */
        break;
      }
    }
    /* Make sure the last character is a closing brace. 
       If it is not, then the JSON is invalid. */
    if (jsonStr[strPos] != '}') {
      return [null, strPos];
    }
    /* Skip the closing brace */
    strPos++;
    /* Return the object and the current position 
       in the string to the caller */
    return [rvObj, strPos];
  }
  /* This routine gets a string from a JSON string. The string
     might be a key or it might be a value. The string is returned 
     to the caller along with the current position in the string. If 
     there is an error, then a null value is returned to the caller. 
     JSON uses double quotes to enclose strings. 

     The string is returned to the caller along with the current 
     position in the JSON string. If there is an error, then a null 
     value is returned to the caller. Whitespace is skipped before 
     and after the string. */
  static getString(jsonStr, jsonLen, strPos) {
    let curChar;
    let curValue = '';
    let leadingTrailingDoubleQuoteCount = 0;
    let nextChar; 
    let priorChar;
    let skipRv;
    /* Skip any whitespace before the value */
    skipRv = HDLmJSON.skipWhitespace(jsonStr, jsonLen, strPos);
    curChar = skipRv[0];
    strPos = skipRv[1];
    /* Build the value */
    while (strPos < jsonLen) {
      /* Get the current and prior character in the string */      
      curChar = jsonStr[strPos];
      nextChar = (strPos + 1 < jsonLen) ? jsonStr[strPos + 1] : '';
      priorChar = (strPos - 1 >= 0) ? jsonStr[strPos - 1] : ''; 
      strPos++;          
      /* Check for a really strange case where we have a backslash 
         followed by a double quote. In this case, we want to treat
         the backslash as a double quote and skip the double quote. */ 
      if (curChar == '\\' && nextChar == '"') { 
        /* Add a double quote to the value and skip the double quote */
        curValue += '"'; 
        strPos++; 
        continue;
      }
      /* Check if we have found a double quote that is not preceded by a backslash. 
         If we have, increment the count of leading and trailing double quotes. If 
         we have found two double quotes, then we have reached the end of the value. */
      if (curChar == '"') {
        if (priorChar != '\\')
          leadingTrailingDoubleQuoteCount++;
        if (leadingTrailingDoubleQuoteCount == 2) {
          break;
        }
      }
      /* Add the current character to the value, if we
         have found the opening double quote */
      else {
        if (leadingTrailingDoubleQuoteCount == 1)
          curValue += curChar;
      }
    }
    /* Skip any whitespace after the value */
    skipRv = HDLmJSON.skipWhitespace(jsonStr, jsonLen, strPos);
    curChar = skipRv[0];
    strPos = skipRv[1];
    /* Return the value and the current position 
       in the string to the caller */
    return [curValue, strPos];
  }
  /* This routine gets a value from a JSON string. The value is returned 
     to the caller along with the current position in the string. If 
     there is an error, then a null value is returned to the caller
     and a false value is returned as the third element of the array.
     This routine is somewhat unusual in that it returns three values,
     not two, like the other "get" routines. */
  static getValue(jsonStr, jsonLen, strPos) {
    /* Declare and define a few local variables */
    let curChar;
    let curValue;
    let getRv;
    /* Get the current character in the string. This 
       determines the type of value we are dealing with. */
    if (strPos < jsonLen) {
      curChar = jsonStr[strPos];
    }
    else 
      return [null, strPos, false];
    /* Check what type of value we are dealing 
       with and get the value accordingly */
    switch (curChar) {
      /* Check for a value that is a string */ 
      case '"':
        getRv = HDLmJSON.getString(jsonStr, jsonLen, strPos);  
        strPos = getRv[1];
        curValue = getRv[0];
        return [curValue, strPos, true];
      /* Check for a value that is a JSON object */  
      case '{':
        getRv = HDLmJSON.getObj(jsonStr, jsonLen, strPos);  
        strPos = getRv[1];
        curValue = getRv[0];
        if (curValue != null)
          return [curValue, strPos, true];
        return [null, strPos, false];
      /* Check for a value that is a JSON list (array) */  
      case '[':
        getRv = HDLmJSON.getList(jsonStr, jsonLen, strPos);  
        strPos = getRv[1];
        curValue = getRv[0];
        if (curValue != null)
          return [curValue, strPos, true];
        return [null, strPos, false];
      /* Check for a value that is a null */ 
      case 'n':
        /* Skip past the "n" character */
        strPos++;
        getRv = HDLmJSON.getNextChars(jsonStr, jsonLen, strPos, 3);  
        strPos = getRv[1];
        curValue = getRv[0];
        if (curValue == 'ull')
          return [null, strPos, true];
        return [null, strPos, false];
      /* Check for a value that is a false boolean */ 
      case 'f':
        /* Skip past the "f" character */
        strPos++;
        getRv = HDLmJSON.getNextChars(jsonStr, jsonLen, strPos, 4);  
        strPos = getRv[1];
        curValue = getRv[0];
        if (curValue == 'alse')
          return [false, strPos, true];
        return [null, strPos, false];
      /* Check for a value that is a true boolean */ 
      case 't':
        /* Skip past the "t" character */
        strPos++;
        getRv = HDLmJSON.getNextChars(jsonStr, jsonLen, strPos, 3);  
        strPos = getRv[1];
        curValue = getRv[0];
        if (curValue == 'rue')
          return [true, strPos, true];
        return [null, strPos, false];
      /* Check for a value that is a number. A number can start with 
         a plus sign, a minus sign, a decimal point, or a digit. */
      case '+':
      case '-':
      case '.':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7': 
      case '8':
      case '9':
        getRv = HDLmJSON.getNumber(jsonStr, jsonLen, strPos);  
        strPos = getRv[1];
        curValue = getRv[0];
        if (curValue != null)
          return [curValue, strPos, true];
        return [null, strPos, false];
      /* Handle the default case */
      default:
        return [null, strPos, false];
    }  
  }
  /* This routine does a parse of a JSON string using the 
     destr libray. The destr library is quite a bit more 
     tolerant than the native JSON.parse routine. The resulting
     object is returned to the caller. If there is an error,
     then a null value is returned to the caller. */ 
  static parseDestr(jsonStr) {
    /* Declare and define a local variable */
    let rv; 
    /* Convert the JSON string using the destr library */ 
    rv = destr(jsonStr);
    /* Check the return value from the destr library */
    if (rv == jsonStr)
      rv = null;  
    return rv;
  }   
  /* This routine does a parse of a JSON string using several
     internal routines. The resulting array or object or value
     is returned to the caller. The first return value is the parsed JSON.
     The first return value might be an array, an object, a string, a number, 
     a boolean, or null. The second return value shows if the result is valid. */   
  static parseInternal(jsonStr) {
    /* Make sure the first (and only) argument passed by the caller 
       is a string */
    if (typeof jsonStr != 'string') {
      let errorText = `Input value passed to parseInternal is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the first (and only) argument passed by the caller 
       is long enough */
    if (jsonStr.length < 2) {
      let errorText = `Input value passed to parseInternal is not long enough to be valid JSON`;
      HDLmAssert(false, errorText);
    }
    /* Declare and define a few local variables */
    let curChar;
    let curValue;
    let getRv;
    let jsonLen = jsonStr.length;
    let rv;
    let skipRv;
    let strPos = 0;  
    let valueValid;
    /* Skip any whitespace at the beginning of the string */
    skipRv = HDLmJSON.skipWhitespace(jsonStr, jsonLen, strPos);
    /* Get the first non-whitespace character. This determines
       what type of JSON structure we are dealing with. */ 
    curChar = skipRv[0];
    strPos = skipRv[1];
    /* Check if we have reached the end of the string */
    if (strPos >= jsonLen) {
      return [null, false];
    }
    /* Get the value from the JSON string. This value might be a list, 
       an object, a string, a number, a boolean, or null. */
    getRv = HDLmJSON.getValue(jsonStr, jsonLen, strPos);
    curValue = getRv[0];
    strPos = getRv[1];
    valueValid = getRv[2];
    /* Check if we actually got a value. If we did not, 
       then the JSON is invalid. */
    if (!valueValid) {
      return [null, false];
    }
    return [curValue, true];
  }
 
  /* This routine skips whitespace characters in a JSON string. 
     The first non-whitespace character is returned to the caller. 
     If there are no non-whitespace characters, then a null value
     is returned to the caller. */ 
  static skipWhitespace(jsonStr, jsonLen, strPos) { 
    /* Skip any whitespace in the string */
    while (strPos < jsonLen && /\s/.test(jsonStr[strPos]))
      strPos++;
    if (strPos >= jsonLen)
      return [null, strPos];
    else
      return [jsonStr[strPos], strPos];
  }   
}