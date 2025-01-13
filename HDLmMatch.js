/**
 * HDLmMatch short summary.
 *
 * HDLmMatch description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmMatch class is used to return the results from one match
   related call. The match calls return many values. Instances of 
   this class are created to return all of the values from one
   call. */
class HDLmMatch {
  /* Build a match instance. The instance starts out with default
     values for everything. */
  constructor() {
    this.type = HDLmMatchTypes.none;
    this.errorFlag = false;
    this.errorText = '';
  }
  /* The next routine checks if the test string passed by the caller
     is a valid match string or not. A valid match string can be a 
     proper regex string, a proper glob string, a proper like (SQL
     LIKE) string, or just a simple string. This routine will return
     an error message, if an invalid match string is detected. This
     routine will return a null value if no errors are detected. This
     routine should not raise an exception if an invalid match string
     is passed to it. */
  static check(testString) {
    /* Make sure the test string is not a null value */
    if (testString == null) {
      let errorText = 'Test string value passed to check is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the test string is not the wrong type */ 
    if (typeof(testString) != 'string') {
      let errorText = 'Test string value passed to check is not a string';
      HDLmAssert(false, errorText);
    }
    /* Set a few values for use below */
    let testType = HDLmMatchTypes.none; 
    let regexString = null;
    let rv = null;
    /* Check if the match string is actually a regex */
    let testStringLen = testString.length;    
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check if we really have a regex at this point. The rules for  
         a regex are reasonably strict. The first and second characters
         must be a forward slash. The last character must be forward slash. 
         Note that the first and second characters and the last character 
         are not actually used for pattern matching. The actual regex is 
         in the middle. */
      /* console.log(testType); */
      if (testStringLen >= 3          &&
          testString.charAt(0) == '/' &&
          testString.charAt(1) == '/' &&
          testString.charAt(testStringLen - 1) == '/') {
        testType = HDLmMatchTypes.regex;
        try {
          let re = new RegExp(testString.substring(2, testStringLen - 1));
        }
        catch (errorObj) {
          /* console.log(errorObj); */
          rv = errorObj.message;
          break;
        }
        break;
      }       
      /* If the pattern is not actually a regex, it still might be a glob
         or a like. Globs and likes are handled by converting them to 
         regexes. */     
	    /* Note that some match strings are not really regexes. However, we convert
         them to regexes anyway. This is how globs are implemented. If we find
         a non-regex string that contains glob characters, we convert it to a
         regex. Of course, we set the regex flag as well. The same approach is
         used for likes (SQL LIKEs) as well. */
      if (HDLmMatch.globCheck(testString)) {
        testType = HDLmMatchTypes.glob;
        try {
          regexString = HDLmMatch.globToRegex(testString);
        }
        catch (errorObj) {
          /* console.log(errorObj); */
          rv = errorObj.message
          break;
        }
      	/* If we were able to build the regex string without any errors,
      	   then we should be able to compile the regex string as well. */
        if (rv == null) {
          try {
            let re = new RegExp(regexString);
          }
          catch (errorObj) {
            /* console.log(errorObj); */ 
            rv = errorObj.message;
            break;
          }
          break;
        } 
      }      
      /* Since the current string is not a regex string or a glob string,
          then we must check for a like (SQL LIKE) string. */    
      if (HDLmMatch.likeCheck(testString)) {
        testType = HDLmMatchTypes.like;
        try {
          regexString = HDLmMatch.likeToRegex(testString);
        }
        catch (errorObj) {
          /* console.log(errorObj); */ 
          rv = errorObj.message;
          break;
        }
        /* If we were able to build the regex string without any errors,
            then we should be able to compile the regex string as well. */
        if (rv == null) {
          try {
            let re = new RegExp(regexString);
          }
          catch (errorObj) {
            /* console.log(errorObj); */
            rv = errorObj.message;
            break;
          }
          break;
        }
      }
	    /* If we don't have a real regex or a glob or a like, then we
	       have a simple string comparison. Make sure we don't have a 
	       zero-length string. Perhaps we should allow zero-length 
	       match strings. */
      if (testStringLen == 0)
        rv = "Zero-length match string found";
      testType = HDLmMatchTypes.simeple;
      break;
    }
    /* We need to get the type of the current match. Some types of 
        matches need additional checks. For eample, globs and likes 
        are not allowed to end with an odd number of backslashes. */
    if (testType == HDLmMatchTypes.glob ||
        testType == HDLmMatchTypes.like) {
      let tailCount = HDLmString.tailCount(testString, '\\');
      if ((tailCount % 2) > 0) 
        rv = 'The match string must not end with an unmatched escape';    
    }    
    /* Return a value showing if the test string was valid or not */
    return rv;
  }
  /* The next routine checks a class. A class can be a set of characters
     (possibly numbers) or a range of characters (possibly numbers). Of
     course, a class can include a negation character that (must) follow
     the left square bracket. */
  static checkClass(tokenList, startingIndex, matchType) {
    /* Make sure the token list is not a null value */
    if (tokenList == null) {
      let errorText = 'Token list value passed to checkClass is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the token list is not the wrong type */ 
    if (typeof(tokenList) != 'object') {
      let errorText = 'Token list value passed to checkClass is not a list';
      HDLmAssert(false, errorText);
    }
    /* Make sure the token list is not empty */
    if (tokenList.length <= 0) {
      let errorText = 'Token list value passed to checkClass is empty';
      HDLmAssert(false, errorText);
    }
    /* Make sure the starting index (index of the left square bracket)
       is valid */
    if (startingIndex <= 0) {
      let errorText = 'Starting index value passed to checkClass is invalid';
      HDLmAssert(false, errorText);
    }
    /* Make sure the starting index (index of the left square bracket)
       is valid */
    if (matchType != HDLmMatchTypes.glob &&
        matchType != HDLmMatchTypes.like) { 
      let errorText = 'Match type value passed to checkClass is invalid';
      HDLmAssert(false, errorText);
    }
    let endingIndex = -1;
    let rv = null;
    /* Scan all of the tokens after the starting index looking for the 
       right square bracket */
    let tokenListLen = tokenList.length;
    /* Check each of the tokens in the token list */
    for (let i = (startingIndex + 1); i < tokenListLen; i++) {
      /* Get the current token */
      let currentToken = tokenList[i];
      let tokenType = currentToken.tokType;
      let tokenValue = currentToken.value;
      /* Check if we have an operator token for the right square bracket */
      if (tokenType == HDLmTokenTypes.operator &&
          tokenValue == ']') {
        endingIndex = i;
        break;
      }
    }
    /* Make sure we found the right square bracket at the end of the
       class */
    if (endingIndex < 0) {
      let errorText = 'No right square bracket found to end class';
      rv = errorText;
      return rv;
    }
    /* get the class length in tokens */
    let classLen = endingIndex - startingIndex - 1;
    if (classLen <= 0) {
      let errorText = 'Character class is empty';
      rv = errorText;
      return rv;
    }
    /* A character class can start with some sort of negation 
       operator. This operator is quite optional. */
    let classStart = startingIndex + 1;
    let currentToken = tokenList[classStart];
    let tokenType = currentToken.tokType;
    let tokenValue = currentToken.value;
    let tokenLength = 0;
    /* Check for some kind of negation character */
    if (tokenValue == '!' ||
        tokenValue == '^') {
      if (matchType == HDLmMatchTypes.glob &&
          tokenValue != '!') {
        let errorText = 'Negation operator for a character class is not an exclamation mark';
        rv = errorText;
        return rv;
      }
      if (matchType == HDLmMatchTypes.like &&
          tokenValue != '^') {
        let errorText = 'Negation operator for a character class is not a not sign';
        rv = errorText;
        return rv;
      }
      /* Skip past the negation operator */
      classLen -= 1;
      classStart += 1;
      if (classLen <= 0) {
        let errorText = 'Character class after negation operator is empty';
        rv = errorText;
        return rv;
      }
    }   
    /* Check the actual contents of the character class. Start by checking
       for a character range. */
    let classOK = false;
    if (classLen == 3) {
      /* Get the middle token. The middle token must be a dash. */
      currentToken = tokenList[classStart+1];
      tokenType = currentToken.tokType;
      tokenValue = currentToken.value;
      /* Check for a dash operator */
      if (tokenType == HDLmTokenTypes.operator &&
          tokenValue == '-') {
        /* Get the first token. The first token must be a number or 
           a character and can only have a length of one. */
        currentToken = tokenList[classStart];
        tokenType = currentToken.tokType;
        tokenValue = currentToken.value;
        tokenLength = tokenValue.length;
        if (tokenType != HDLmTokenTypes.integer &&
            tokenType != HDLmTokenTypes.identifier) {
          let errorText = 'Start of character class range is invalid';
          rv = errorText;
          return rv;
        }
        if (tokenLength != 1) {
          let errorText = 'Start of character class range has an invalid length';
          rv = errorText;
          return rv;
        }
        /* Get the third token. The third token must be a number or 
           a character and can only have a length of one. */
        currentToken = tokenList[classStart+2];
        tokenType = currentToken.tokType;
        tokenValue = currentToken.value;
        tokenLength = tokenValue.length;
        if (tokenType != HDLmTokenTypes.integer &&
          tokenType != HDLmTokenTypes.identifier) {
          let errorText = 'End of character class range is invalid';
          rv = errorText;
          return rv;
        }
        if (tokenLength != 1) {
          let errorText = 'End of character class range has an invalid length';
          rv = errorText;
          return rv;
        }
        /* Show that the current character class is OK */
        classOK = true;
      }
    }
    /* Make sure that every remaining token in the current character
       class is a number or an indentifier. This check really only
       applies to character classes that are not ranges. */
    if (classOK == false) {
      /* Check each of the tokens in the token list */
      for (let i = classStart; i < classStart+classLen; i++) {
        /* Get the current token */
        let currentToken = tokenList[i];
        let tokenType = currentToken.tokType;
        let tokenValue = currentToken.value;
        /* Check if the current token is valid or not */
        if (tokenType != HDLmTokenTypes.integer &&
            tokenType != HDLmTokenTypes.identifier) {
          let errorText = `Token (${tokenValue}) in character class is invalid`;
          rv = errorText;
          return rv;
        }
      }
    }
    return rv;
  }
  /* The next routine checks if the test string passed by the caller
     is a valid match string or not, by breaking the test string down
     into a set of tokens. The actual checking (by this routine) is
     only done for glob strings and like (SQL LIKE) string. 

     This routine will return an error message, if an invalid match 
     string is detected. This routine will return a null value if no 
     errors are detected. This routine should not raise an exception
     if an invalid match string is passed to it. 

     This routine is passed a match string and a match type. A lower 
     level routine is used to check globs and likes (SQL LIKEs). */
  static checkTokens(testString) {
    /* Make sure the test string is not a null value */
    if (testString == null) {
      let errorText = 'Test string value passed to checkTokens is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the test string is not the wrong type */ 
    if (typeof(testString) != 'string') {
      let errorText = 'Test string value passed to checkTokens is not a string';
      HDLmAssert(false, errorText);
    }
    let rv = null;
    let tokenList;
    /* Get the match type of the test string */
    let matchRv = HDLmMatch.getMatchType(testString);
    let errorFlag = matchRv.getErrorFlag();
    let errorText = matchRv.getErrorText();
    /* Check if the error flag is set. If the error flag is set,
       return the error text to the caller. */
    if (errorFlag) {
      rv = errorText;
      return rv;
    }      
    let matchType = matchRv.getType();
    /* Make sure the match type is not a null value */
    if (matchType == null) {
      let errorText = 'Match type value obtained from getMatchType is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure that the match type is set to an actual value */
    if (matchType == HDLmMatchTypes.none) { 
      let errorText = 'Match type value obtained from getMatchType is not set';
      HDLmAssert(false, errorText);
    }
    /* Construct a list (vector) of tokens from the test string passed
       by the caller */
    if (matchType == HDLmMatchTypes.glob) {
      tokenList = HDLmMatch.getTokens(testString, '[]?*!-');
      rv = HDLmMatch.checkTokensGlob(tokenList);
    }
    if (matchType == HDLmMatchTypes.like) {
      tokenList = HDLmMatch.getTokens(testString, '[]%_^-');
      rv = HDLmMatch.checkTokensLike(tokenList);
    }
    /* Return a value showing if the test string was valid or not */
    return rv;
  }  
  /* This routihe checks if a glob string is valid or not. The caller
     passes a set of tokens built from the glob string. This routine
     looks at each token and determines if the glob string is valid
     or not. 

     This routine will return an error message, if an invalid glob 
     string is detected (from the tokens). This routine will return
     a null value if no errors are detected. This routine should not 
     raise an exception if an invalid glob string is passed to it. */
  static checkTokensGlob(tokenList) {
    /* Make sure the token list is not a null value */
    if (tokenList == null) {
      let errorText = 'Token list value passed to checkTokensGlob is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the token list is not the wrong type */ 
    if (typeof(tokenList) != 'object') {
      let errorText = 'Token list value passed to checkTokensGlob is not a object';
      HDLmAssert(false, errorText);
    }
    let classCounter = 0;
    let errorText;
    let rv = null;
    let tokenListLen = tokenList.length;
    /* Check each of the tokens in the token list */
    for (let i = 0; i < tokenListLen; i++) {
      /* Get the current token */
      let currentToken = tokenList[i];
      let tokenType = currentToken.tokType;
      let tokenValue = currentToken.value;    
      /* The rules for handling each token depend on the token type
         and the token contents */
      switch (tokenType) {       
        /* We just assume that all identifier tokens are OK */
        case HDLmTokenTypes.identifier:
          break;
        /* We just assume that all integer tokens are OK */
        case HDLmTokenTypes.integer:
          break;
        /* We have found an operator token */
        case HDLmTokenTypes.operator:
          /* Check for a left square bracket. If we have found a left
             square bracket, then we need to check to check if a class
             is already active. */
          if (tokenValue == '[') {
            classCounter += 1;
            if (classCounter > 1) {
              errorText = "Some type of glob class has already been started";
              rv = errorText;
              break;
            }
            /* At this point we have a left square bracket token that marks
               the start of a character class. We need to check the entire
               character class. A common routine is used for this purpose. */
            rv = HDLmMatch.checkClass(tokenList, i, HDLmMatchTypes.glob);
          }
          /* Check for a left square bracket. If we have found a left
             square bracket, then we need to check to check if a class
             is already active. */
          if (tokenValue == ']') {
            classCounter -= 1;
            if (classCounter < 0) {
              errorText = "No glob class is currently active";
              rv = errorText;
              break;
            }
          }
          /* Check for an exclamation point. An exclamation point can only
             properly follow a left square bracket. */
          if (tokenValue == '!') {
            /* Check if prior token is/was a left square bracket. If the prior
               token is a left square bracket, then we do not have an error.
               In all other cases, we must report an error. */
            if (i > 0 &&
              tokenList[i - 1].tokType == HDLmTokenTypes.operator &&
              tokenList[i - 1].value == '[') {
              ;
            }
            else {            
              errorText = "Unescaped exclamation mark does not follow left bracket";
              rv = errorText;
              break;
            }
          }
          break;
        /* We just assume that all quoted string tokens are OK */
        case HDLmTokenTypes.quoted:
          break;
        /* We just assume that all white space tokens are OK */
        case HDLmTokenTypes.space:
          break;
        /* We have a token with the unknown token type. This should not happen.
           Generate a return message if it does happen. */
        case HDLmTokenTypes.unknown:
          errorText = `Token number (${i}) value (${tokenValue}) type is unknown`;
          rv = errorText;
          break;
        /* We have reached the sentinel token. We can now check the 
           class counter. */        
        case HDLmTokenTypes.end:       
          /* Now that we are done, we should not have a glob class still active.
             Report an error, if a glob class is still active. */
          if (classCounter > 0) {
            errorText = "Some type of glob class is active at end of the match string";
            rv = errorText;
          }
          break;        
        /* Handle all other characters. Just copy them to the output regex
           string. */
        default:
          errorText = HDLmTokenTypes.toString(tokenType);
          HDLmError.buildError('Error', 'Invalid type', 37, errorText);
          break;
      }
      /* We should terminate the token processing loop, if we have already
         found an error. */
      if (rv != null)
        break;
    }
    return rv;
  }
  /* This routihe checks if a like string is valid or not. The caller
     passes a set of tokens built from the like string. This routine
     looks at each token and determines if the like string is valid
     or not. 
  
     This routine will return an error message, if an invalid like 
     string is detected (from the tokens). This routine will return
     a null value if no errors are detected. This routine should not 
     raise an exception if an invalid like string is passed to it. */
  static checkTokensLike(tokenList) {
    /* Make sure the token list is not a null value */
    if (tokenList == null) {
      let errorText = 'Token list value passed to checkTokensLike is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the token list is not the wrong type */ 
    if (typeof(tokenList) != 'object') {
      let errorText = 'Token list value passed to checkTokensLike is not a object';
      HDLmAssert(false, errorText);
    }
    let classCounter = 0;
    let errorText;
    let rv = null;
    let tokenListLen = tokenList.length;
    /* Check each of the tokens in the token list */
    for (let i = 0; i < tokenListLen; i++) {
      /* Get the current token */
      let currentToken = tokenList[i];
      let tokenType = currentToken.tokType;
      let tokenValue = currentToken.value;
      /* The rules for handling each token depend on the token type
         and the token contents */
      switch (tokenType) {
        case HDLmTokenTypes.identifier:
          break;
        case HDLmTokenTypes.integer:
          break;
        /* We have found an operator token */
        case HDLmTokenTypes.operator:
          /* Check for a left square bracket. If we have found a left
             square bracket, then we need to check to check if a class
             is already active. */
          if (tokenValue == '[') {
            classCounter += 1;
            if (classCounter > 1) {
              errorText = "Some type of like class has already been started";
              rv = errorText;
              break;
            }
            /* At this point we have a left square bracket token that marks
               the start of a character class. We need to check the entire
               character class. A common routine is used for this purpose. */
            rv = HDLmMatch.checkClass(tokenList, i, HDLmMatchTypes.like);
            /* We should terminate the token processing loop, if we have already
               found an error. */
            if (rv != null)
              break;
          }
          /* Check for a left square bracket. If we have found a left
             square bracket, then we need to check to check if a class
             is already active. */
          if (tokenValue == ']') {
            classCounter -= 1;
            if (classCounter < 0) {
              errorText = "No like class is currently active";
              rv = errorText;
              break;
            }
          }
          /* Check for a not sign. A not sign can only properly follow
             a left square bracket. */
          if (tokenValue == '^') {
            /* Check if prior token is/was a left square bracket. If the prior
               token is a left square bracket, then we do not have an error.
               In all other cases, we must report an error. */
            if (i > 0 &&
              tokenList[i - 1].tokType == HDLmTokenTypes.operator &&
              tokenList[i - 1].value == '[') {
              ;
            }
            else {
              errorText = "Unescaped not sign does not follow left bracket";
              rv = errorText;
              break;
            }
          }
          break;
        case HDLmTokenTypes.quoted:
          break;
        case HDLmTokenTypes.space:
          break;
        /* We have a token with the unknown token type. This should not happen.
           Generate a return message if it does happen. */
        case HDLmTokenTypes.unknown:
          errorText = `Token number (${i}) value (${tokenValue}) type is unknown`;
          rv = errorText;
          break;
        /* We have reached the sentinel token. We can now check the 
           class counter. */
        case HDLmTokenTypes.end:
          /* Now that we are done, we should not have a like class still active.
             Report an error, if a like class is still active. */
          if (classCounter > 0) {
            errorText = "Some type of like class is active at end of the match string";
            rv = errorText;
            break;
          }
          break;
        /* Handle all other characters. Just copy them to the output regex
           string. */
        default:
          errorText = HDLmTokenTypes.toString(tokenType);
          HDLmError.buildError('Error', 'Invalid type', 37, errorText);
          break;
      }
      /* We should terminate the token processing loop, if we have already
         found an error. */
      if (rv != null)
        break;
    }
    return rv;
  }
  /* The next routine modifies (in some cases) the test string passed by
     by the caller. The test string is checked to see if it is a valid
     regex string. If the test string is not a valid regex string, then
     it is just returned to the caller. If the test string is a valid
     is a valid regex string, then it is changed by adding a leading 
     forward slash and is then returned to the caller. */
  static fixPossibleRegexString(testString) {
    /* Make sure the test string is not a null value */
    if (testString == null) {
      let errorText = 'Test string value passed to fixPossibleRegexString is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the test string is not the wrong type */ 
    if (typeof(testString) != 'string') {
      let errorText = 'Test string value passed to fixPossibleRegexString is not a string';
      HDLmAssert(false, errorText);
    }
    let testStringLen = testString.length;
    /* Check if the test string is a valid regex */
    if (testStringLen        >= 2   && 
        testString.charAt(0) == '/' &&
        testString.charAt(1) != '/' &&
        testString.charAt(testStringLen - 1) == '/') {
      /* Add a leading forward slash to the test string */
      testString = '/' + testString;       
    }
    return testString;
  }
  /* Get the match error flag value and return it to the caller */
  getErrorFlag() {
    return this.errorFlag;
  }
  /* Get the match error text value and return it to the caller */
  getErrorText() {
    return this.errorText;
  }
  /* Get the type of a match string. The match string is checked 
     to see if it a regex, glob, or like. If none of these are true,
     then the match string must be a simple match string. Simple 
     match strings are just compared to some input string. */ 
  static getMatchType(matchStr) {
    /* Make sure the match string is not a null value */
    if (matchStr == null) {
      let errorText = 'Match string value passed to getMatchType is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the match string is not the wrong type */ 
    if (typeof(matchStr) != 'string') {
      let errorText = 'Match string value passed to getMatchType is not a string';
      HDLmAssert(false, errorText);
    }
    /* Construct a new match class object. This object is used to return the
       type to the caller. */
    let matchRv = new HDLmMatch();
    /* Do some match string checking */
    let matchLen = matchStr.length;
    /* Check if we have a regex of some kind */
    if (matchLen >= 3 &&
        matchStr.charAt(0) == '/' &&
        matchStr.charAt(1) == '/' &&
        matchStr.charAt(matchLen - 1) == '/') {
      matchRv.setType(HDLmMatchTypes.regex);
    }
    /* Check for a glob of some kind */
    else if (HDLmMatch.globCheck(matchStr)) {
      matchRv.setType(HDLmMatchTypes.glob);
    }
    /* Check for a like of some kind */
    else if (HDLmMatch.likeCheck(matchStr)) {
      matchRv.setType(HDLmMatchTypes.like);
    }
    /* We must have a simple match string at this point */
    else {
      matchRv.setType(HDLmMatchTypes.simple);
    }
    return matchRv;
  }
  /* This function returns a vector of match token objects to the caller. The 
     vector of objects has one entry for each match token in the string passed
     to this routine, plus a sentinal entry to mark the end of the vector. The 
     vector of match token objects will contain just the sentinel entry if the 
     string passed to this routine is emtpy. This is not considered to be an 
     error condition.
         
     One object will be built for each match token in the string passed
     by the caller. The object describes the match token in some detail. 
     The object gives the token position (starting from 0, not 1), the 
     token type, and the token contents.
          
     This is a low-level tokenization routine. No attempt is made in this
     routine to build higher-level tokens. Other routines can do this or
     use the tokens built by this routine to do so. This routine will return
     integer tokens for sequences of numeric digits. It will not return 
     number tokens. This means that a decimal point will end up in a separate
     operator token if decimal point is specified as an operator.
  
     This routine builds seven types of tokens. They are alphanumeric tokens,
     numeric tokens, operator tokens, quoted string tokens, white space tokens,
     unknown tokens, and the sentinel token. The caller passes the list of 
     characters considered to be operators. 
   
     This routine uses a special routine to get the next character. This 
     routine returns an object describing the next character. In some cases,
     the next character is actually an operator that has been escaped. We
     treat escaped operators as alphanumeric characters. 
     
     Note that an identifier can contain numeric digits in it. This is part
     of the definition of an identifier in JavaScript. */
  static getTokens(inStr, inOps) {
    /* Make sure the input string is not a null value */
    if (inStr == null) {
      let errorText = 'Input string value passed to getTokens is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the input string is not the wrong type */ 
    if (typeof(inStr) != 'string') {
      let errorText = 'Input string value passed to getTokens is not a string';
      HDLmAssert(false, errorText);
    }
    let alpha = false;
    let alphaNumeric = false;
    let ch;
    let charRv;
    let endFlag = false;
    let escapeFlag = false;
    let index = -1;
    let inStrLen = inStr.length;
    let nextCh;
    let nextEndFlag = false;
    let nextEscapeFlag = false;
    let nextRv;
    let obj;
    let quoteChar = "'";
    let rv = [];
    /* Process each character in the input string */
    while (!endFlag) {
      /* Get the current character */
      charRv = HDLmMatchChar.nextCharGet(inStr, index);
      endFlag = charRv.getEndFlag();
      /* Check if the end flag is set. If the end flag is set, then we
         are done processing the input string. Note that if the end flag
         is set, then we can not use the index and next character values. */
      if (endFlag)
        break;
      escapeFlag = charRv.getEscapeFlag();
      index = charRv.getIndex();
      ch = charRv.getMatchChar();
      /* Check for an alpha character of some kind. Basically, we assume
         that any character is alpha if it is not anything else. */
      alpha = (HDLmString.isDigit(ch) == false &&
        (inOps.indexOf(ch) == -1) &&
        ch != quoteChar &&
        HDLmString.isWhiteSpace(ch) == false) ||
        (escapeFlag == true);
      /* If we actually have a alpha character, then we can start a new
         identifier at this point. The second through the last characters
         can be alphanumeric. However, the first character must be an 
         alpha character. */
      if (alpha) {
        obj = {};
        obj.tokType = HDLmTokenTypes.identifier;
        obj.pos = index;
        obj.value = ch;
        /* Append all alphanumeric characters after the first one */
        while (true) {
          /* Get the next character */
          charRv = HDLmMatchChar.nextCharGet(inStr, index);
          endFlag = charRv.getEndFlag();
          if (endFlag)
            break;
          escapeFlag = charRv.getEscapeFlag();
          ch = charRv.getMatchChar();
          /* We allow numeric characters at this point. An indentifier
             must start with an alpha character. However, the other 
             characters can be numeric. */
          alphaNumeric = ((inOps.indexOf(ch) == -1) &&
            ch != quoteChar &&
            HDLmString.isWhiteSpace(ch) == false) ||
            (escapeFlag == true);
          /* If the current character is not alphanumeric, then we are
             done with the current identifier. However, if the current 
             character is alphanumeric, then we can just add it to the 
             current identifier. */
          if (!alphaNumeric)
            break;
          obj.value += ch;
          index = charRv.getIndex();
        }
        rv.push(obj);
        continue;
      }
      /* Check for a numeric character of some kind. Any number of numeric
         characters are combined into one token. Note that the token type 
         is integer, not number. This routine does not return number tokens. 
         Instead, a decimal point after a series of digits will end up in a 
         separate token. */
      if (HDLmString.isDigit(ch)) {
        obj = {};
        obj.tokType = HDLmTokenTypes.integer;
        obj.pos = index;
        obj.value = ch;
        /* Append all numeric characters after the first one */
        while (true) {
          /* Get the next character */
          charRv = HDLmMatchChar.nextCharGet(inStr, index);
          endFlag = charRv.getEndFlag();
          /* Check if the end flag is set. If the end flag is set, then we
             are done processing the input string. Note that if the end flag
             is set, then we can not use the index and next character values. */
          if (endFlag)
            break;
          escapeFlag = charRv.getEscapeFlag();
          ch = charRv.getMatchChar();
          /* Check if we actually have a digit character. If we have a digit
             character, then we can add the digit to the current numeric token.
             If we don't have a digit character, then we are done with the 
             current numeric token. */
          if (!HDLmString.isDigit(ch))
            break;
          obj.value += ch;
          index = charRv.getIndex();
        }
        rv.push(obj);
        continue;
      }
      /* Check for an operator character of some kind. A separate token
         is created for each operator. Note that escaped operators are
         not considered to be operators. */
      if ((inOps.indexOf(ch) != -1) &&
        escapeFlag == false) {
        obj = {};
        obj.tokType = HDLmTokenTypes.operator;
        obj.pos = index;
        obj.value = ch;
        rv.push(obj);
        continue;
      }
      /* Check for the quote character. The quote character does not become
         part of the output token. Pairs of quotes are combined into one
         quote character that does become part of the output token. The 
         final quote terminates the quoted string. The first quote character
         and the final quote character do not become part of the output token. */
      if (ch == quoteChar) {
        let unmatchedQuotes = true;
        obj = {};
        obj.tokType = HDLmTokenTypes.quoted;
        obj.pos = index;
        obj.value = '';
        /* Append the contents of the quoted string not including the 
           leading and trailing quote characters */
        while (true) {
          /* Get the next character. This character is probably part of
             the quoted string. The character might be the last quote 
             character ending the quoted string. The character might be
             part of a pair of quotes that we will treat as one quote. */
          charRv = HDLmMatchChar.nextCharGet(inStr, index);
          endFlag = charRv.getEndFlag();
          /* Check if the end flag is set. If the end flag is set, then we
             are done processing the input string. Note that if the end flag
             is set, then we can not use the index and next character values. */
          if (endFlag)
            break;
          escapeFlag = charRv.getEscapeFlag();
          ch = charRv.getMatchChar();
          /* Check for a quote character. Non-quote characters are just
             added to the current output quoted string token. */
          if (ch != quoteChar) {
            obj.value += ch;
            index = charRv.getIndex();
            continue;
          }
          /* At this point we need to check if the next character can
             be obtained and if the next character is also a quote. If
             both tests are true, then we have a pair of quotes that
             can be combined into one quote character. */
          nextRv = HDLmMatchChar.nextCharGet(inStr, charRv.getIndex());
          nextEndFlag = nextRv.getEndFlag();
          /* If we have not reached the end of the string, then we can
             check for a pair of quote characters. If we actually have
             a pair of quote characters, then we can just add the second
             quote character to the output string and set the current index
             to the location of the second quote character. */
          if (nextEndFlag == false) {
            nextEscapeFlag = nextRv.getEscapeFlag();
            nextCh = nextRv.getMatchChar();
            if (nextCh == quoteChar) {
              obj.value += nextCh;
              index = nextRv.getIndex();
              continue;
            }
          }
          /* At this point we have found the trailing quote character and
             we can terminate the quoted string. Note that the trailing 
             quote (like the leading quote) is not added to the token. */
          index = charRv.getIndex();
          unmatchedQuotes = false;
          break;
        }
        /* Report an error if the quoted string had unmatched quotes */
        if (unmatchedQuotes) {
          let errorString = '(' + inStr + ')';
          HDLmError.buildError('Error', 'Unmatched quotes', 15, errorString);
        }
        rv.push(obj);
        continue;
      }
      /* Check for a white space character of some kind. Any number of white
         space characters are combined into one token. Note that the function
         used to check for white space characters only checks for traditional
         white space characters at this time. */
      if (HDLmString.isWhiteSpace(ch)) {
        obj = {};
        obj.tokType = HDLmTokenTypes.space;
        obj.pos = index;
        obj.value = ch;
        /* Append all white space characters after the first one */
        while (true) {
          /* Get the next character */
          charRv = HDLmMatchChar.nextCharGet(inStr, index);
          endFlag = charRv.getEndFlag();
          /* Check if the end flag is set. If the end flag is set, then we
             are done processing the input string. Note that if the end flag
             is set, then we can not use the index and next character values. */
          if (endFlag)
            break;
          escapeFlag = charRv.getEscapeFlag();
          ch = charRv.getMatchChar();
          /* Check if we actually have a white space character. If we have a white
             space character, then we can add the white space character to the current
             white space token. If we don't have a white space character, then we are 
             done with the current white space token. */
          if (!HDLmString.isWhiteSpace(ch))
            break;
          obj.value += ch;
          index = charRv.getIndex();
        }
        rv.push(obj);
        continue;
      }
      /* All other characters are treated as unknown characters. This should
         not happen with this tokenizer. Howver, you never know. */
      if (1 == 1) {
        obj = {};
        obj.tokType = HDLmTokenTypes.unknown;
        obj.pos = index;
        obj.value = ch;
        rv.push(obj);
        continue;
      }
    }
    /* Add the sentinel entry at the end of the token object array */
    obj = {};
    obj.tokType = HDLmTokenTypes.end;
    obj.pos = index + 1;
    obj.value = '';
    rv.push(obj);
    return rv;
  }
  /* Get the match type value and return it to the caller */
  getType() {
    return this.type;
  }
  /* Check if a string contains any glob characters. This routine
     will not change the input string. However, it will check for
     glob characters. If any glob characters are found, this routine
     will return true. If no glob characters are found, this routine
     will return false. Note that this routine does check for left
     square bracket, but not the right square bracket. It is assumed
     that a user will always have a left square bracket with a right
     square bracket.
   
     Note that an escaped glob character is still considered to be a
     glob character. This is required so that the input string will
     still be considered to be a glob string and will be converted
     to a regex. For example, the exclamation mark character must be
     escaped to prevent it from being treated as glob class negation.
     However, the escape should be removed because regex does not treat
     the exaclamation mark character as a special character.
  
     There is a major exception to the rules described above. In one very
     important case, a left square bracket is not considered to be a glob
     character. If the left square bracket is followed by a not sign, then
     the left square bracket is really part of a like (SQL LIKE) match, not
     a glob. The code below checks for this case. */
  static globCheck(matchString) {
    /* Make sure the match string is not a null value */
    if (matchString == null) {
      let errorText = 'Match string value passed to globCheck is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the match string is not the wrong type */ 
    if (typeof(matchString) != 'string') {
      let errorText = 'Match string value passed to globCheck is not a string';
      HDLmAssert(false, errorText);
    }
    let rv = false;
    let index = -1;
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      /* Get the next character and terminate if we have reached the end of
         the string */
      let checkRv = HDLmMatchChar.nextCharGet(matchString, index);
      let endFlag = checkRv.getEndFlag();
      if (endFlag)
        break;
      /* We must not update the index value to skip past the character
         we just obtained */
      index = checkRv.getIndex();
      /* Check if it is a special glob character */
      let matchChar = checkRv.getMatchChar();
      if (matchChar == '*' ||
          matchChar == '?' ||
          matchChar == '!') {
        rv = true;
        break;
      }
      /* Check if we have a left square bracket. Generally, a left square bracket
         means that we have a glob. However, in one important case, this is not true.
         If the left square bracket is followed by a not sign, then we actually have
         a like (SQL LIKE). This is not a glob at all. */
      if (matchChar == '[') {
        /* Test the next character and check if it is a not sign. If we actually have
           a not sign after a left square bracket, then this is probably a like (SQL
           LIKE), not a glob. */
        let testRv = HDLmMatchChar.nextCharGet(matchString, index);
        let endFlag = testRv.getEndFlag();
        if (endFlag)
          break;
        let testChar = testRv.getMatchChar();
        let testEscapeFlag = testRv.getEscapeFlag();
        if (testChar == '^' &&
          testEscapeFlag == false)
          continue;
        rv = true;
        break; 
      }
    }
    return rv;
  }  
  /* Check the tokens that make up a glob string. This routine
     is passed a set of token, built from a glob string. This
     routine checks the tokens to see if they form a proper
     glob. 
  /* Convert a glob string pattern to a regex string pattern.
     This routine takes an input glob string pattern and
     returns a regex string pattern. At least this routine
     tries to do so. The rules for how glob is supposed to
     work are actually quite complex. The generated regexes
     does not follow all of the rules. A key point is that a
     glob is not supposed to match a forward slash. However,
     the generated regex will match a forward slash. This is
     no longer true. The generated regex will not match a 
     forward slash.
       
     The prior comment may not be true. The current code builds
     a regex that does not match a forward slash.
    	
     The returned regex string will not have the leading and
     trailing forward slash characters needed for JavaScript
     and perhaps other systems. These characters will have to
     be added if the regex is going to be used with JavaScript
     and perhaps other systems. 		 
             
     Note that any character can be escaped (using a backslash). Any
     escaped character represents itself. This rule includes escape
     itself. If a backslash is preceded by another backslash, then 
     the two characters represent a single literal backslash. One
     consequence is that a single backslash can not be the last 
     character of an input string. */
  static globToRegex(globString) {
    /* Make sure the glob string is not a null value */
    if (globString == null) {
      let errorText = "Glob string passed to globToRegex is null";
      HDLmAssert(false, errorText);
    }
    /* Make sure the glob string is not the wrong type */ 
    if (typeof(globString) != 'string') {
      let errorText = 'Glob string value passed to globToRegex is not a string';
      HDLmAssert(false, errorText);
    }
    /* Declare and define a few local variables */
    let endFlag = false;
    let escapeFlag = false;
    let startFlag = false;
    let globChar = null;
    let priorChar = null;
    let globRv;
    let priorRv;
    let index = -1;
    let add;
    let regexStr = ''; 
	  /* Start the output regex string by attaching it to the left
	     bound of the test string */
    regexStr += '^';
	  /* We assume that we are not in class mode at the outset. Class
	     mode (something like [abc] or [0-9]) is always started by a
	     left square bracket. Of course, at the beginning we have not
	     found a left square bracket yet. */
    let classMode = false;
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
	    /* Get the next character and terminate if we have reached the end of
	       the string */
      globRv = HDLmMatchChar.nextCharGet(globString, index);
      endFlag = globRv.getEndFlag();
      escapeFlag = globRv.getEscapeFlag();
      index = globRv.getIndex();
      globChar = globRv.getMatchChar();
      if (endFlag)
        break;
	    /* The rules for handling each character depend on the character and 
	       whether the escape flag was set */
      switch (globChar) {
	      /* Handle several different characters in the original glob
	         string. Each of these characters can be handled by simply
	         escaping the character. We don't want these characters to
	         be treated as special regex characters. */
        case '.':
        case '^':
        case '$':
        case '+':
        case '(':
        case ')':
        case '{':
        case '}':
        case '\\':
        case '/':
        case '|':
          add = "\\" + globChar;
          break;
	      /* Left square bracket is a very special character. It may or may
	         not mark the start of a class (something like [abc] or [0-9]).
	         Of course, if the left square bracket is escaped, then it is
	         just a left square bracket, not the start of a class. */
        case '[':
	        /* Check if the left square bracket was preceded by a backslash.
	           If this is true, then the left square bracket is not really a
	           glob character at all. Note that the left square bracket must
	           be escaped because regex will treat it as a special character. */
          if (escapeFlag) {
            add = "\\" + globChar;
            break;
          }
	        /* We need to make sure that a class is not already active. Report
	           an error if a class is already started. */
          if (classMode) {
            let errorText = "Some type of glob class has already been started";
            HDLmAssert(false, errorText);
          }
	        /* At this point, we have a left square bracket that really is
	           the start of a class. The left square bracket does not need
	           to be escaped and in fact, must not be escaped. */
          add = "" + globChar;
          classMode = true;
          break;
	      /* Right square bracket is a very special character. It may or may
	         not mark the end of a class (something like [abc] or [0-9]). Of
	         course, if the right square bracket is escaped, then it is just
	         a right square bracket, not the end of a class. */
        case ']':
	        /* Check if the right square bracket was preceded by a backslash.
	           If this is true, then the right square bracket is not really a
	           glob character at all. Note that the right square bracket must
	           be escaped because regex will treat it as a special character.*/
          if (escapeFlag) {
            add = "\\" + globChar;
            break;
          }
	        /* We need to make sure that a class is already active. Report
	           an error if a class is not already started. */
          if (classMode == false) {
            let errorText = "No glob class is currently active";
            HDLmAssert(false, errorText);
          }
	        /* At this point, we have a right square bracket that really is
	           the end of a class. The right square bracket does not need
	           to be escaped. */
          add = "" + globChar;
          classMode = false;
          break;
	      /* We now need to consider a character that may or may not be a
	         glob character. The exclamation mark may be a negation of a
	         class or it may just be an exclamation mark. We only consider
	         an exclamation mark to be a glob character, if we are in class
	         mode and the prior character was a left square bracket. */
        case '!':
	        /* We now need to check for an exclamation mark that is (correctly)
	           preceded by an escape. In this case, the exclamation mark is not 
	           really meant as a glob character. Moreover, an escape should not 
	           be added to the output string because regex won't treat an exclamation
	           mark as a special regex character.*/
          if (escapeFlag) {
            add = "" + globChar;
            break;
          }
	        /* Check for an exclamation mark, right after a left square bracket.
	           This is the normal, expected case. All we need to do in this case
	           is to copy a not sign (not an exclamation mark) to the output string. */
          if (classMode == true) {
            priorRv = HDLmMatchChar.priorCharGet(globString, index);
            escapeFlag = priorRv.getEscapeFlag();
            startFlag = priorRv.getStartFlag();
            priorChar = priorRv.getMatchChar();
	    	    /* We need to look at the character before the current
	    	       (unescaped) exclamation mark. If the prior character
	    	       is a left square bracket and is also not escaped then
	    	       we just have a simple (and valid) negation. */
            if (priorChar != null &&
              priorChar == '[' &&
              escapeFlag == false) {
              add = "" + '^';
              break;
            }
          }
	        /* We now have an exclamation mark that is not after a left square bracket
	           and is not escaped. This is an error condition. */
          if (true) {
            let errorText = "Unescaped exclamation mark does not follow left bracket";
            HDLmAssert(false, errorText);
          }
	      /* We now need to consider a real glob character, the asterisk.
	         The user may want the asterisk to be a true glob or just an
	         asterisk in the pattern. In the latter case, the asterisk must
	         be preceded by an escape. */
        case '*':
	        /* Check if the asterisk was preceded by a backslash. If this is
	           true, then the asterisk is not really a glob character at all. */
          if (escapeFlag) {
            add = "\\" + globChar;
            break;
          }
	        /* We have a true glob asterisk. Replace it with a regex pattern
	           that matches any number of non-slash characters. */
          add = "[^\\/]*";
          break;
	      /* We now need to consider a real glob character, the question mark.
	         The user may want the question mark to be a true glob or just an
	         question mark in the pattern. In the latter case, the question
	         mark must be preceded by an escape. */
        case '?':
	        /* Check if the question mark was preceded by a backslash. If this
	           is true, then the question mark is not really a glob character
	           at all. */
          if (escapeFlag) {
            add = "\\" + globChar;
            break;
          }
	        /* We have a true glob question mark. Replace it with a regex pattern
	           that matches any one non-slash character. */
          add = "[^\\/]{1,1}";
          break;
	      /* Handle all other characters. Just copy them to the output regex
	         string. */
        default:
          add = "" + globChar;
          break;
      }
      regexStr += add;
    }
	  /* Now that we are done, we should not have a glob class still active.
	     Report an error, if a glob class is still active. */
    if (classMode == true) {
      let errorText = "Some type of glob class is active at end of input";
      HDLmAssert(false, errorText);
    }
    /* Add the trailing dollar sign */
    regexStr += '$';
    return regexStr.toString();
  }
  /* Check if a string contains any like (SQL LIKE) characters.
     This routine will not change the input string. However, it
     will check for like (SQL LIKE) characters. If any like (SQL
     LIKE) characters are found, this routine will return true.
     If no like (SQL LIKE) characters are found, this routine
     will return false. Note that this routine does check for left
     square bracket, but not the right square bracket. It is assumed
     that a user will always have a left square bracket with a right
     square bracket. This code follows (more or less) the SQL Server
     rules for SQL LIKE.

     Note that an escaped like (SQL LIKE) character is still considered
     to be a like (SQL LIKE) character. This is required so that the input
     string will still be considered to be a like (SQL LIKE) string and
     will be converted to a regex. For example, the percent character
     must be escaped to prevent it from being treated as like percent.
     However, the escape should be removed because regex does not treat
     percent as a special character. */
  static likeCheck(matchString) {
    /* Make sure the match string is not a null value */
    if (matchString == null) {
      let errorText = 'Match string value passed to likeCheck is null';
      HDLmAssert(false, errorText);
    }
    /* Make sure the match string is not the wrong type */ 
    if (typeof(matchString) != 'string') {
      let errorText = 'Match string value passed to likeCheck is not a string';
      HDLmAssert(false, errorText);
    }
    let rv = false;
    let matchStringLen = matchString.length;
    for (let i = 0; i < matchStringLen; i++) {
      /* Get the current match character */
      let matchChar = matchString.charAt(i);
      /* Check if it is a special like (SQL LIKE) character */
      if (matchChar == '%' ||
          matchChar == '_' ||
          matchChar == '[' ||
          matchChar == '^') {
        rv = true;
        break;
      }
    }
    return rv;
  }  
  /* Convert a like (SQL LIKE) string pattern to a regex string
     pattern. This routine takes an input like (SQL LIKE) string
     pattern and returns a regex string pattern. At least this
     routine tries to do so. The rules for how a like is supposed
     to work are actually quite complex. The generated regexes
     do not follow all of the rules, at I don't think so.
    	
     The returned regex string will not have the leading and
     trailing forward slash characters needed for JavaScript
     and perhaps other systems. These characters will have to
     be added if the regex is going to be used with JavaScript
     and perhaps other systems. This code follows (more or less)
     the SQL Server rules for SQL LIKE.
       
     Note that any character can be escaped (using a backslash). Any
     escaped character represents itself. This rule includes escape
     itself. If a backslash is preceded by another backslash, then 
     the two characters represent a single literal backslash. One
     consequence is that a single backslash can not be the last 
     character of an input string. */
  static likeToRegex(likeString) {
    /* Make sure the like string is not a null value */
    if (likeString == null) {
      let errorText = "Like string passed to likeToRegex is null";
      HDLmAssert(false, errorText);
    }
    /* Make sure the like string is not the wrong type */ 
    if (typeof(likeString) != 'string') {
      let errorText = 'Like string value passed to likeToRegex is not a string';
      HDLmAssert(false, errorText);
    }
    /* Declare and define a few local variables */
    let endFlag = false;
    let escapeFlag = false;
    let startFlag = false;
    let likeChar;
    let priorChar;
    let likeRv;
    let priorRv;
    let index = -1;
    let add;
    let regexStr = ''; 
	  /* Start the output regex string by attaching it to the left
	     bound of the test string */
    regexStr += '^';
    /* We assume that we are not in class mode at the outset. Class
       mode (something like [abc] or [0-9]) is always started by a
       left square bracket. Of course, at the beginning we have not
       found a left square bracket yet. */
    let classMode = false;
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
	    /* Get the next character and terminate if we have reached the end of
	       the string */
      likeRv = HDLmMatchChar.nextCharGet(likeString, index);
      endFlag = likeRv.getEndFlag();
      escapeFlag = likeRv.getEscapeFlag();
      index = likeRv.getIndex();
      likeChar = likeRv.getMatchChar();
      if (endFlag)
        break;
	    /* The rules for handling each character depend on the character and 
	       whether the escape flag was set */
      switch (likeChar) {
	      /* Handle several different characters in the original like
	         string. Each of these characters can be handled by simply
	         escaping the character. We don't want these characters to
	         be treated as special regex characters. */
        case '.':
        case '$':
        case '+':
        case '(':
        case ')':
        case '{':
        case '}':
        case '\\':
        case '/':
        case '|':
        case '?':
        case '*':
          add = "\\" + likeChar;
          break;
	      /* Left square bracket is a very special character. It may or may
	         not mark the start of a class (something like [abc] or [0-9]).
	         Of course, if the left square bracket is escaped, then it is
	         just a left square bracket, not the start of a class. */
        case '[':
	        /* Check if the left square bracket was preceded by a backslash.
	           If this is true, then the left square bracket is not really a
	           like character at all. */
          if (escapeFlag) {
            add = "\\" + likeChar;
            break;
          }
	        /* We need to make sure that a class is not already active. Report
	           an error if a class is already started. */
          if (classMode) {
            let errorText = "Some type of like class has already been started";
            HDLmAssert(false, errorText);
          }
	        /* At this point, we have a left square bracket that really is
	           the start of a class. The left square bracket does not need
	           to be escaped. */
          add = "" + likeChar;
          classMode = true;
          break;
	      /* Right square bracket is a very special character. It may or may
	         not mark the end of a class (something like [abc] or [0-9]). Of
	         course, if the right square bracket is escaped, then it is just
	         a right square bracket, not the start of a class. */
        case ']':
	        /* Check if the right square bracket was preceded by a backslash.
	           If this is true, then the right square bracket is not really a
	           like character at all. */
          if (escapeFlag) {
            add = "\\" + likeChar;
            break;
          }
	        /* We need to make sure that a class is already active. Report
	           an error if a class is not already started. */
          if (classMode == false) {
            let errorText = "No like class is currently active";
            HDLmAssert(false, errorText);
          }
	        /* At this point, we have a right square bracket that really is
	           the end of a class. The right square bracket does not need
	           to be escaped. */
          add = "" + likeChar;
          classMode = false;
          break;
	      /* We now need to consider a character that may or may not be a
	         like character. The not sign may be a negation of a class or
	         it may just be a not sign. We only consider a not sign to be
	         like character, if we are in class mode and the prior character
	         was a left square bracket. */
        case '^':
	        /* We now need to check for a not sign that is (correctly) preceded
	           by an escape. In this case, the not sign is not really meant as
	           a like character. However, an escape must be added to the output
	           string to prevent regex from treating the not sign as a special
	           regex character. */
          if (escapeFlag) {
            add = "\\" + likeChar;
            break;
          }
	        /* Check for a not sign, right after a left square bracket. This
	           is the normal, expected case. All we need to do in this case
	           is to copy the not sign to the output string. */
          if (classMode == true) {
            priorRv = HDLmMatchChar.priorCharGet(likeString, index);
            escapeFlag = priorRv.getEscapeFlag();
            startFlag = priorRv.getStartFlag();
            priorChar = priorRv.getMatchChar();
            /* We need to look at the character before the current
               (unescaped) not sign. If the prior character is a 
               left square bracket and is also not escaped then
               we just have a simple (and valid) negation. */
            if (priorChar != null &&
                priorChar == '[' &&
                escapeFlag == false) {
              add = "" + '^';
              break;
            }
          }
	        /* We now have a not sign that is not after a left square bracket
	           and is not escaped. This is an error condition. */
          if (true) {
            let errorText = "Unescaped not sign does not follow left bracket";
            HDLmAssert(false, errorText);
          }
	      /* We now need to consider a real like character, the percent sign.
	         The user may want the percent sign to be a true like percent sign
	         or just a percent sign character in the pattern. In the latter case,
	         the percent sign must be preceded by an escape in the input string. */
        case '%':
	        /* Check if the percent sign was preceded by a backslash. If this is
	           true, then the percent sign is not really a like character at all. */
          if (escapeFlag) {
            add = "" + likeChar;
            break;
          }
	        /* We have a true like percent signk. Replace it with a regex pattern
	           that matches any number (zero or more) of characters. Note that this
	           generated pattern will match forward slash characters. */
          add = ".*";
          break;
	      /* We now need to consider a real like character, the underscore.
	         The user may want the underscore to be a true like underscore
	         or just an underscore character in the pattern. In the latter
	         case, the underscore mark must be preceded by an escape in the
	         input string. */
        case '_':
	        /* Check if the underscore character was preceded by a backslash. If this
	           is true, then the underscore character is not really a like character
	           at all. */
          if (escapeFlag) {
            add = "" + likeChar;
            break;
          }
	        /* We have a true like underscore character. Replace it with a regex pattern
	           that matches one character (which could even be a forward slash). */
          add = ".{1,1}";
          break;
	      /* Handle all other characters. Just copy them to the output regex
	         string. */
        default:
          add = "" + likeChar;
          break;
      }
      regexStr += add;
    }
	  /* Now that we are done, we should not have a like class still active.
	     Report an error, if a like class is still active. */
    if (classMode) {
      let errorText = "Some type of like class is active at end of input";
      HDLmAssert(false, errorText);
    }
    /* Add the trailing dollar sign */
    regexStr += '$';
    return regexStr.toString();
  }  
  /* Set the match error flag using the value passed by the caller */
  setErrorFlag(newErrorFlag) {
    this.errorFlag = newErrorFlag;
  }
  /* Set the match error text using the value passed by the caller */
  setErrorText(newErrorText) {
    this.errorText = newErrorText;
  }
  /* Set the match type using the value passed by the caller */
  setType(newType) {
    this.type = newType;
  }
}