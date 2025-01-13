/**
 * Class for building and handling URL objects 
 *
 * HDLmUrl short summary.
 *
 * HDLmUrl description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmUrl class is definitely used to create objects. One instance 
   will be created for each URL that is passed to the constructor. */
class HDLmUrl {
  /* Build a URL object from a URL string. The URL object has all of the parts 
     of the original URL used to built the URL object, in it. The original URL 
     can be obtained from the URL object, as need be. */
  constructor(urlStr) {
    /* Set a few initial values */
    this.errorText = '';
    this.value = '';
    this.URL = null;
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check for an empty URL string. This is always an error. */
      let urlLen = urlStr.length;
      if (urlLen == 0) {
        this.errorText = 'URL string is empty';
        break;
      }
      /* Build a token vector from the URL string */
      let tokenVec = HDLmString.getTokens(urlStr);
      let tokenLen = tokenVec.length;
      let tokenIndex = 0;
      /* We can now get a set of values from the URL string */
      let parseRv = HDLmUrl.parseUrl(tokenIndex, tokenLen, tokenVec);
      /* Extract the values returned by the parse URL call */
      tokenIndex = parseRv[0];
      this.URL = parseRv[1];
      URL.errorText = URL.hostName.errorText;
      if (this.URL.errorText != '')
        break;
      break;
    }
  }  
  /* This instance method returns the URL error text to the caller. 
     The error text may be set to an empty string. */
  getErrorText() {
    return this.errorText;
  }
  /* This instance method returns the complete URL string back to 
     the caller by reconstructing the URL string from the parts. 
     If the original URL string did not have some part (the scheme
     for example, the reconstructed URL will not have that part
     either. */
  getUrlStr() {
    return this.value;
  }
  /* This static method does the high-level parse of a URL. Of
     course, many parts of the URL may be missing. */
  static parseUrl(tokenIndex, tokenLen, tokenVec) {
    /* Create a few local variables and set a few values */
    let curToken;
    let curType;
    let curValue;
    let haveScheme = false;
    let parseRv;
    let value = '';
    /* Build the final URL object that is returned to the caller */
    let URL = {};
    URL.errorText = '';
    URL.scheme = null;
    URL.hostName = null;
    URL.firstSlash = null;
    URL.pathValue = null;
    URL.value = '';
    URL.toString = function () {
      return URL.value;
    } 
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Get and check the first token which might be a scheme */
      curToken = tokenVec[tokenIndex];
      curType = curToken.tokType;
      curValue = curToken.value;
      if (curType == HDLmTokenTypes.end) {
        URL.errorText = 'URL string is empty';
        break;
      }
      if (curType == HDLmTokenTypes.space) {
        URL.errorText = 'URL string starts with one or more spaces';
        break;
      }
      /* Check if we have a second token and if the second token is 
         a colon. If both checks are true, then the first token must
         really be a scheme. Of course, the scheme must be an identifier
         and must be known. */
      if ((tokenIndex + 1) < tokenLen &&
          tokenVec[tokenIndex+1].value == ':') {
        haveScheme = true;
      }
      /* Check if we have a fourth token and if the third and fourth tokens
         are both forward slashes. If all of these checks are true. then the 
         first token must really be a scheme. Of course, the scheme must be 
         an identifier and must be known. */
      if ((tokenIndex + 3) < tokenLen &&
          tokenVec[tokenIndex + 2].value == '/' &&
          tokenVec[tokenIndex + 3].value == '/') {
        haveScheme = true;
      }
      /* If a scheme must be present, then we have some additional checkes
         to do */
      if (haveScheme) {
        /* The URL string must start with an identifier */
        if (curType != HDLmTokenTypes.identifier) { 
          URL.errorText = `URL string starts with an invalid token (${curValue})`;
          break;
        }
        /* Check if the scheme is known or not */
        if (!HDLmHtmlURISchemes.hasOwnProperty(curValue)) {
          URL.errorText = `URL string starts with an invalid scheme (${curValue})`;
          break
        }
        /* Build the scheme object that is part of the current URL */
        URL.scheme = {};
        URL.scheme.value = curValue;
        URL.scheme.toString = function () { 
          return URL.scheme.value; 
        }
        tokenIndex++;
        /* Get the next token, which should be a colon operator */
        curToken = tokenVec[tokenIndex];
        curType = curToken.tokType;
        curValue = curToken.value;
        /* Now we need to look for the colon after the scheme. This is only 
           done if we had an actual scheme value. */
        if (curType == HDLmTokenTypes.end) {
          URL.errorText = 'URL string is missing colon after scheme';
          break;
        }
        if (curType == HDLmTokenTypes.space) {
          URL.errorText = 'One or more spaces found where colon after scheme expected';
          break;
        }
        /* The URL scheme should be followed by a colon */
        if (curType != HDLmTokenTypes.operator) {
          URL.errorText = `URL scheme is followed by an invalid token (${curValue})`;
          break;
        }
        /* Verify that the operator after the scheme is a colon */
        if (curValue != ':') { 
          URL.errorText = `URL scheme is followed by an invalid operator (${curValue})`;
          break
        }
        /* Skip psat the colon token */
        tokenIndex++;
        /* Get the next token */
        curToken = tokenVec[tokenIndex];
        curType = curToken.tokType;
        curValue = curToken.value;
      }
      /* Now we need to look for the first forward slash. We should have a
         forward slash here even if we don't have a host name. If we don't 
         have a host name, then the forward slash will be followed by a path 
         name. If we do have a host name, then the first forward slash will
         be followed by another forward slash. Note that we can have a path
         without a host name or a host name preceeded by two forward slashes.
         In both cases, the scheme is optional. */ 
      if (curType == HDLmTokenTypes.end) {
        URL.errorText = 'URL string is missing first forward slash';
        break;
      }
      if (curType == HDLmTokenTypes.space) {
        URL.errorText = 'One or more spaces found where first forward slash expected';
        break;
      }
      /* The URL should always include the first forward slash */
      if (curType != HDLmTokenTypes.operator) {
        URL.errorText = `URL has invalid token (${curValue}) where first forward slash expected`;
        break;
      }
      /* Verify that the operator is a forward slash */
      if (curValue != '/') {
        URL.errorText = `URL has invalid operator (${curValue}) where first forward slash expected`;
        break
      }
      /* Skip past the first forward slash that is always present */
      tokenIndex++;
      /* Get the next token */
      curToken = tokenVec[tokenIndex];
      curType = curToken.tokType;
      curValue = curToken.value;
      /* We now need to check for a second forward slash token. If we have
         one, then the URL has a host name. If the second forward slash is
         missing, then the current URL does not have a host name. */
      if (curValue == '/') {
        /* Since we found the second forward slash token, we need to skip
           past it and extract the host name */
        tokenIndex++;
        /* We can now get a set of host name values from the URL string */
        parseRv = HDLmUrl.parseUrl(tokenIndex, tokenLen, tokenVec);
        /* Extract the values returned by the parse host name call */
        tokenIndex = parseRv[0];
        URL.hostName = parseRv[1];
        URL.errorText = URL.hostName.errorText;
        if (URL.errorText != '')
          break;
        /* We now need to check if the host name is followed by a forward
           slash. This forward slash is actually the start of the path value.
           We build a separate object for this operator. */
        /* Get the current token */
        curToken = tokenVec[tokenIndex];
        curType = curToken.tokType;
        curValue = curToken.value;
        if (curValue == '/') {
          tokenIndex++;
          URL.firstSlash = {};
          URL.firstSlash.value = '/';
          URL.firstSlash.toString = function () {
            return URL.firstSlash.value;
          }
        }
      }
      /* If a second slash didn't follow the first, then the first slash is
         the first part of the path. We need to store the first slash in a 
         separate object for the first slash. */
      else {
        URL.firstSlash = {};
        URL.firstSlash.value = '/';
        URL.firstSlash.toString = function () {
          return URL.firstSlash.value;
        }
      }
      /* We can now get a set of path values from the URL string */
      parseRv = HDLmUrl.parseUrlPathValue(tokenIndex, tokenLen, tokenVec);
      /* Extract the values returned by the parse path value call */
      tokenIndex = parseRv[0];
      URL.pathValue = parseRv[1];
      URL.errorText = URL.pathValue.errorText;
      if (URL.errorText != '')
        break;
      break;
    } 
    /* Build the final URL string from the parts. Add the protocol 
       scheme, if any */
    if (this.scheme != null)
      value += this.scheme.toString() + ':';
    /* Add the host name */
    if (this.hostName != null) {
      value += '//';
      value += this.hostName.toString();
    }
    /* Add the forward slash before the path value, if need be */
    if (this.firstSlash != null)
      value += this.firstSlash.toString();
    /* Add the path value, if need be */
    if (this.pathValue != null)
      value += this.pathValue.toString();
    URL.value = value;
    return [tokenIndex, URL];
  }
  /* This static method does the high-level parse of a host name. Of
     course, many parts of the host name may be missing. The host name
     may or many not contain user information. The host name will always
     contain some host information. The host name may or may not contain
     a port number. */
  static parseUrlHostName(tokenIndex, tokenLen, tokenVec) {
    /* Create a few local variables and set a few values */
    let curToken;
    let curType;
    let curValue;
    let parseRv;
    let value = '';
    /* Build the final host name object that is returned to the caller */
    let hostName = {};
    hostName.errorText = '';
    hostName.userInfo = null;
    hostName.hostStr = null;
    hostName.portNumber = null;
    hostName.value = '';
    hostName.toString = function () {
      return hostName.value;
    }
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* We can now try to get a set of user information values from the host
         name part of the URL string */
      parseRv = HDLmUrl.parseUrlHostNameUser(tokenIndex, tokenLen, tokenVec);
      /* Extract the values returned by the parse user information call */
      tokenIndex = parseRv[0];
      hostName.userInfo = parseRv[1];
      hostName.errorText = hostName.userInfo.errorText;
      if (hostName.errorText != '')
        break;
      /* We can now try to get the actual host name from the host
         name part of the URL string */
      parseRv = HDLmUrl.parseUrlHostNameHost(tokenIndex, tokenLen, tokenVec);
      /* Extract the values returned by the parse host name call */
      tokenIndex = parseRv[0];
      hostName.hostStr = parseRv[1];
      hostName.errorText = hostName.hostStr.errorText;
      if (hostName.errorText != '')
        break;
      /* We can now try to get the port number from the host name part 
         of the URL string */
      parseRv = HDLmUrl.parseUrlHostNamePort(tokenIndex, tokenLen, tokenVec);
      /* Extract the values returned by the parse port number call */
      tokenIndex = parseRv[0];
      hostName.portNumber = parseRv[1];
      hostName.errorText = hostName.portNumber.errorText;
      if (hostName.errorText != '')
        break;
      break;
    }
    /* Add the user information, if any */
    if (hostName.userInfo != null) {
      value += hostName.userInfo.toString();
      value += '@';
    }
    /* Add the actual host name, if any */   
    if (hostName.hostStr != null)
      value += hostName.hostStr.toString();
    /* Add the port number, if any */
    if (hostName.portNumber != null) {
      value += ':';
      value += hostName.portNumber.toString();
    }
    hostName.value = value;   
    return [tokenIndex, hostName];
  }
  /* This static method does the high-level parse of a path value. Of
     course, many parts of the path value may be missing. The path value 
     may or many not contain path information. The path value may or may
     not have a query string (with parameters). The path value may or may
     not have a fragment. */ 
  static parseUrlPathValue(tokenIndex, tokenLen, tokenVec) {
    /* Create a few local variables and set a few values */
    let curToken;
    let curType;
    let curValue;
    let parseRv;
    let value = '';
    /* Build the final path value object that is returned to the caller */
    let PathValue = {};
    PathValue.errorText = '';
    PathValue.pathValue = null;
    PathValue.query = null;
    PathValue.fragment = null;
    PathValue.value = '';
    PathValue.toString = function () {
      return PathValue.value;
    }
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* We can now try to get the path information from the path value part 
         of the URL string */
      parseRv = HDLmUrl.parseUrlPathValuePath(tokenIndex, tokenLen, tokenVec);
      /* Extract the values returned by the parse path call */
      tokenIndex = parseRv[0];
      PathValue.pathValue = parseRv[1];
      PathValue.errorText = PathValue.pathValue.errorText;
      if (PathValue.errorText != '')
        break;
      /* We can now try to get the query string (parameters) from the path value
         part of the URL string */
      parseRv = HDLmUrl.parseUrlPathValueQuery(tokenIndex, tokenLen, tokenVec);
      /* Extract the values returned by the parse query string call */
      tokenIndex = parseRv[0];
      PathValue.query = parseRv[1];
      PathValue.errorText = PathValue.query.errorText;
      if (PathValue.errorText != '')
        break;
      /* We can now try to get the fragment (anchor) from the path value part 
         of the URL string */
      parseRv = HDLmUrl.parseUrlPathValueFragment(tokenIndex, tokenLen, tokenVec);
      /* Extract the values returned by the parse path value fragment call */
      tokenIndex = parseRv[0];
      PathValue.fragment = parseRv[1];
      PathValue.errorText = PathValue.fragment.errorText;
      if (PathValue.errorText != '')
        break;
      break;
    }
    /* Add the path information, if any */
    if (PathValue.pathValue != null)  
      value += PathValue.userInfo.toString(); 
    /* Add the query string, if any */
    if (PathValue.query != null) {
      value += '?';
      value += PathValue.hostStr.toString();
    }
    /* Add the fragment, if any */
    if (PathValue.fragment != null) {
      value += '#';
      value += PathValue.fragment.toString();
    }
    PathValue.value = value;
    return [tokenIndex, PathValue];
  }    
  /* This instance method returns the complete URL string back to 
     the caller by reconstructing the URL string from the parts. 
     If the original URL string did not have some part (the scheme
     for example, the reconstructed URL will not have that part
     either. */
  toString() {
    return this.value;
  }
}