/**
 * HDLmError short summary.
 *
 * HDLmError description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmError class is not used to create any objects. However,
   it does contain the static methods used for error logging. See 
   the Java version of this routine for the standard error numbers. */
class HDLmError {
  /* This is the standard error function. The caller provides the severity,
     type, number, and error message text. */
  static buildError(severity, type, number, text) {
    let errorStr = '';
    let errorPrefix = HDLmDefines.getString('HDLMPREFIX');
    /* In some cases the error prefix is not defined. If this routine is 
       invoked before the defines are built, then the error prefix will
       not be defined. A substitute value is provided below, if need be. */
    if ((typeof errorPrefix) == 'undefined')
      errorPrefix = 'HDLm';
    errorStr += errorPrefix + ' ';
    errorStr += severity + ' ';
    errorStr += type + ' ';
    errorStr += number.toString() + ' ';
    errorStr += text;
    /* console.trace(); */
    HDLmError.errorLog(errorStr);
    return errorStr;
  }
  /* This is the lowest level error logging method. This method does the
     actual logging of errors. */
  static errorLog(errorStr) {
    /* console.trace(); *
    /* console.trace(errorStr); */
    console.error(errorStr);
  }
  /* This routine is used to report an error. The caller provides the
     the error information. This routine does the error reporting
     using the information passed by the caller. */
  static reportError(errorObj, nameStr) {
    let errorStr = HDLmUtility.errorToString(errorObj);
    let builtStr = nameStr + ' Error (' + errorStr + ')';
    HDLmError.errorLog(builtStr);
    return builtStr;
  }
}