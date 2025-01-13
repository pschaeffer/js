/**
 * HDLmAssert short summary.
 *
 * HDLmAssert description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmAssert function (which is not a class) is used to provide a 
   simple assert mechanism */ 
function HDLmAssert(test, errorText) {
  if (test)
    return;
  throw errorText;
}