/**
 * HDLmHttp short summary.
 *
 * HDLmHttp description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmHttp class doesn't actually do anything. However, 
   it does serve to hold all of the HTTP related values and
   functions. */
class HDLmHttp {
  /* This routine URI decodes the string passed to it */
  static uriDecode(stringToBeDecoded) {
    return decodeURIComponent(stringToBeDecoded);
  }  
    /* This routine URI encodes the string passed to it */
  static uriEncode(stringToBeEncoded) {
    return encodeURIComponent(stringToBeEncoded);
  }  
}