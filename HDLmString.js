/**
 * HDLmString short summary.
 *
 * HDLmString description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
const HDLmStringImageTypes = ['ai',
                              'avif',
                              'bmp', 'dib',
                              'cdr',
                              'eps',
                              'exif',
                              'gif',
                              'heif', 'heic',
                              'ico', 'cur',
                              'ind', 'indd', 'indt', 'idml',
                              'jpg', 'jpeg', 'jpe', 'jif', 'jfif', 'jfi', 'pjpeg', 'pjp',
                              'jp2', 'j2k', 'jpf', 'jpm',
                              'jpg2', 'j2c', 'jpc', 'jpx',
                              'mj2',
                              'pdf',
                              'ppm', 'pgm', 'pbm', 'pnm',
                              'png', 'apng',
                              'psd',
                              'raw', 'arw', 'cr', 'crw', 'cr2', 'cr3', 'erf', 'k25',
                              'nef', 'nrw', 'orf', 'pef', 'rw2', 'srf', 'sr2', 'xdc',
                              'svg', 'svgz',
                              'tiff', 'tif',
                              'webp',
                              'xbm',
                              'xcf'];
class HDLmString {
  /* Add a set of double quotes around a string passed by the 
     caller and return the updated string to the caller. Note
     that this routine follows the rules of JSON and will escape
     double quotes in the passed string as need be. */ 
  static addDoubleJson(inStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inStr != 'string') {
      let errorText = `Input value passed to addDoubleJson is not a string`;
      HDLmAssert(false, errorText);
    } 
    return JSON.stringify(inStr);
  }
  /* This method is passed a string. It returns true if the string
     is all numeric and false if the string is not all numeric. */
  static allNumeric(inStr) {
    let rv = true;
    for (let i = 0; i < inStr.length; i++) {
      let cuChar = inStr.charAt(i);
      if (cuChar < '0' || cuChar > '9') {
        rv = false;
        break;
      }
    }
    return rv;
  }
  /* Build a string from an object. The caller provides the object and 
     the delimiters. The first delimiter separates each key from each
     value. The second delimiter separates each key/value pair from the
     next key/value pair. */
  static buildStringFromObject(value, firstDelim, secondDelim) {
    let rvString = ''
    for (let curKey in value) {
      let curVal = value[curKey];
      rvString += curKey + firstDelim + curVal + secondDelim;
    }
    return rvString;
  }
  /* This function does a case insensitive string comparison. Of course,
     this function can be changed as need be to better case insensitive
     string comparisons. This routine will return true if the strings
     are equal. This routine will return false if the strings are not
     equal. */
  static compareCaseInsensitive(firstStr, secondStr) {
    return firstStr.localeCompare(secondStr, undefined, { sensitivity: 'accent' }) === 0;
  }
  /* This routine escapes double quotes in a string, if the double
     quotes are not already escaped. The caller provides the input
     string and the output string is returned. */
  static escapeDoubleQuotes(inStr) { 
    let outStr = '';
    let ch;
    let inStrLength = inStr.length;
    /* Process all of the character in the input string */
    for (let i = 0; i < inStrLength; i++) {  
      /* Get the current character */
      ch = inStr.charAt(i);   
      /* Check for a double quote character that is not already escaped */
      if (ch == '"' &&
          (i == 0 || 
           inStr.charAt(i - 1) != '\\')) 
        outStr += '\\'; 
      outStr += ch;
    }  
    return outStr;
  }
  /* Get a string from an array. The caller provides the array and
     a separator value. The separator value is added to the output 
     string before all values other than the first. */
  static fromArrayJson(inArray, sepStr) {
    /* Make sure the first argument passed by the caller is an array */
    if (Array.isArray(inArray) == false) {
      let errorText = 'Input array passed to fromArrayJson method is not an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the second argument passed by the caller is a string */
    if (typeof sepStr != 'string') {
      let errorText = `Separator value passed to fromArrayJson is not a string`;
      HDLmAssert(false, errorText);
    }  
    let rv = '';
    let inLen = inArray.length;
    for (let i = 0; i < inLen; i++) {
      if (i > 0)
        rv += sepStr;
      rv += HDLmString.getJsonValue(inArray[i]);
    }
    return rv;
  }
  /* This routine returns a modified version of the input
     string. The input string is not changed in any way. 
     The output string is a copy of the input string ending 
     at the end of last word that starts on or before the 
     specified output length. The key idea is that the last
     word is not truncated. A few examples, should help to
     explain this function. 
     
       input String:  'The quick' 
       output Length: 20 
       output String: 'The quick'

       input String:  'The quick' 
       output Length: 3
       output String: 'The'

       input String:  'The quick' 
       output Length: 4 
       output String: 'The '
       
       input String:  'The quick' 
       output Length: 5 
       output String: 'The quick'

       input String:  'The quick brown fox' 
       output Length: 4 
       output String: 'The '

       input String:  'The quick brown fox' 
       output Length: 5 
       output String: 'The quick'

       input String:  'The quick brown fox' 
       output Length: 11 
       output String: 'The quick brown'
     */ 
  static getCompleteWords(inStr, outLen) {
    /* Make sure the first argument passed by the caller is a string */
    if (typeof inStr != 'string') {
      let errorText = `Input value passed to getCompleteWords is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the sedond argument passed by the caller is a number */
    if (typeof outLen != 'number') {
      let errorText = `Output length passed to getCompleteWords is not a number`;
      HDLmAssert(false, errorText);
    }
    let inLen = inStr.length;
    let returnValue;
    /* Check if the input string is shorter than or equal to the output
       length. If this is true, just return the input string to the caller. */ 
    if (inLen <= outLen)
      return inStr;
    /* Find the first space character after (and including) the 
       output length */
    let spacePos = inStr.indexOf(' ', outLen - 1);
    /* Check if the space character was not found */
    if (spacePos < 0)
      return inStr;
    /* Check for a very special case. If the space character
       is found at the output length position, then we must 
       include the space character in the output string. */
    if (spacePos == outLen - 1) {
      returnValue =  inStr.substr(0, spacePos+1);   
      return returnValue;
    }
    /* Return the input string up to the space character */
    returnValue =  inStr.substr(0, spacePos);
    return returnValue;
  }
  /* Get the suffix, from what should be a file name. The 
     suffix is everything after the last period. If no 
     period is found a null value is returned to the 
     caller. */
  static getFileNameSuffix(fileName) {
    /* Make sure the first argument passed by the caller is a string */
    if (((typeof fileName) != 'string')) {
      let errorText = `File name (${fileName}) passed to getFileNameSuffix method is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Find the last occurrence (if any) of a period in the file name string */
    let lastIndex = fileName.lastIndexOf('.');
    if (lastIndex < 0)
      return null;
    return fileName.substr(lastIndex + 1);
  }
  /* Get the file type, from what should be the file name suffix.
     The file name suffix is everything after the last period in
     the file name. */ 
  static getFileNameType(fileNameSuffix) {
    /* Make sure the first argument passed by the caller is a string */
    if (((typeof fileNameSuffix) != 'string')) {
      let errorText = `File name suffix (${fileNameSuffix}) passed to getFileNameType method is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Check if the file name suffix is known */
    let rv = null;
    if (HDLmStringImageTypes.includes(fileNameSuffix))
      rv = 'image';
    return rv;
  }
  /* Return some JSON to the caller as a string. The caller 
     provides the key name and the key value. This routine
     builds the required JSON and returns it to the caller. */
  static getJson(keyStr, value) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof keyStr != 'string') {
      let errorText = `Key value passed to getJson is not a string`;
      HDLmAssert(false, errorText);
    }
    let rv = '"' + keyStr + '": ';
    rv += HDLmString.getJsonValue(value);
    return rv;
  }
  /* Get a JSON friendly string from a value. This routine builds an output 
     string from the value passed by the caller. Not all types of data are 
     supported. See below for the details. Note that this routine follows 
     the rules of JSON and will escape double quotes in a passed string as
     need be. */
  static getJsonValue(value) {
    let rv;
    let valueType = typeof value;
    /* Check for null values. Null values are treated as objects.
       However, we want a special message for them. */
    if (valueType == 'object' && value === null)
      valueType = 'null';
    switch (valueType) {
      case 'boolean':
        rv = value ? 'true' : 'false';
        break;
      case 'function':
        throw 'The getJsonValue routine does not support functions';
      case 'null':
        rv = 'null';  
        break;
      case 'number':
        rv = value;
        break;
      case 'object':
        throw 'The getJsonValue routine does not support objects';
      case 'string':
        rv = JSON.stringify(value);
        break;
      case 'symbol':
        throw 'The getJsonValue routine does not support symbols';
      case 'undefined':
        throw 'The getJsonValue routine does not support undefined values';
      default:
        throw 'Type (' + valueType + ') passed to the getJsonValue routine is unknown';
    }
    return rv;
  }
  /* This function returns a string with a set of numbers to the caller.
     The caller specifies, the number of numbers. The first number is 
     typically zero. The number of numbers must be zero or greater than
     zero. For example, if the caller specifies 3, then this routine 
     will typically return '0,1,2'. If the caller specifies zero, then
     this routine will return an empty string. This is not an error
     condition. If the number of numbers is greater than one, then the
     numbers will be separted by some separator. */
  static getNumberString(count) {
    /* Make sure the argument is a number */
    if (typeof count != 'number') {
      let errorText = `Count value passed to getNumberString is not a number`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is greater than or equal to zero */
    if (count < 0) {
      let errorText = `Count value (${count}) passed to getNumberString is less than zero`;
      HDLmAssert(false, errorText);
    }
    /* Build the string of numbers */
    let rv = '';
    for (let i = 0; i < count; i++) {
      /* Check if we need o add a separator */
      if (rv != '')
        rv += ',';
      /* Add the next number */
      rv += i.toString();
    }
    return rv;
  }
  /* This function returns a vector of objects to the caller. The vector
     of objects has one entry for each token in the string passed to this
     routine, plus a sentinal entry to mark the end of the vector. The vector
     of objects will contain just the sentinel entry if the string passed to
     this routine is emtpy. This is not considered to be an error condition.
     
     One object will be built for each token in the string passed by the 
     caller. The object describes the token in some detail. The object
     gives the token position (starting from 0, not 1), the token type,
     and the token contents.
     
     This is a low-level tokenization routine. No attempt is made in this
     routine to build higher-level tokens. Other routines can do this or
     use the tokens built by this routine to do so. This routine will return
     integer tokens for sequences of numeric digits. It will not return 
     number tokens. This means that a decimal point will end up in a separate
     operator token. 

     Note that an identifier can contain numeric digits in it. This is part
     of the definition of an identifier in JavaScript. 
     
     This code supports one very special case. In some cases, a single 
     quote is not used to delimit a string, but is actually an apostrophe.
     The English language uses apostrophes in contractions (e.g. "don't")   
     and possessives (for example "John's" without the double quotes) and 
     plural forms. In these cases, the apostrophe is not used to delimit 
     a string. The apostrophe is treated as part of the identifier. */
  static getTokens(inStr, quoteChars = "'", ignoreSomeSingleQuotes = false) {
    /* Make sure the first argument passed by the caller is a string */
    if (typeof inStr != 'string') {
      let errorText = `Input value passed to getTokens is not a string`;
      HDLmAssert(false, errorText);
    }   
    /* Make sure the second argument passed by the caller is a string */
    if (typeof quoteChars != 'string') {
      let errorText = `Quote character value passed to getTokens is not a string`;
      HDLmAssert(false, errorText);
    }  
    /* Make sure the length of the second argument passed by the caller is OK */
    if (quoteChars.length != 1 &&
        quoteChars.length != 2) {
      let errorText = `Length of quote characters value passed to getTokens is not 1 or 2`;
      HDLmAssert(false, errorText);
    }  
    let ch;
    let inLen = inStr.length;
    let rv = [];
    let obj;
    let pos = 0;
    let unmatchedQuotes = false;
    /* Process each character in the input string */
    while (pos < inLen) {
      /* Get the current character */
      ch = inStr.charAt(pos);
      /* Check for an alpha character of some kind. The first character 
         of an identifier must be an alpha character. The other characters
         can be alphanumeric. */
      if (HDLmString.isAlpha(ch)) {
        obj = {};
        obj.tokType = HDLmTokenTypes.identifier;
        obj.pos = pos;
        obj.value = ch;
        pos++;
        /* Append all alphanumeric characters after the first one. In some
           cases single quotes (apostrophes) are considerd to be alphanumber
           character. See below.  */
        while (pos < inLen) {
          /* Get the next character */
          ch = inStr.charAt(pos);
          /* In some cases, we must force single quote characters to be
             treated as alphanumeric characters. This is done to support
             contractions, possessive forms, and plural forms. 
             
             The problem is that English uses the single quote character
             in two ways. Single quotes are used as a string delimiter 
             and as an apostrophe. If single quote is used as an apostrophe
             then it must be treated as alphanumber character. 
             
             We don't support escape characters. In some cases, single quote
             characters are escaped. For example, if a single quote is used
             inside a string delimited by single quotes, then it must be 
             escaped. The escape character should be checked for in some
             cases. 
             
             In some cases, all upper case is used. This might include
             the trailing 's' (without the quotes). This case should be
             checked for and properly supported. 
             
             In some cases, numbers should be converted to identifiers.
             For example, the string "1960's" (without the double quotes)
             should be treated as one identifier with six characters. 
             
             In some cases, operators should be converted to identifiers.
             For example, the string "&'s" (without the double quotes)
             should be treated as one identifier with three characters. 

             In some cases, apostrophes inside a string should be treated
             as part of the contents of the string, rather than terminating
             the string. For example consider the string 'abc users's def'.
             The apostrophe after 'users' (without the quotes) is not meant
             to terminate the string, but is just a possessive form. The 
             string should not be converted to an identifier. 

             The rules for using an apostrophe are quite complex. See the
               following references.

               https://www.freecodecamp.org/news/what-is-a-contraction-grammar-and-definition/
               https://www.suu.edu/writingcenter/undergraduate/pdf/tip-sheets/apostrophe.pdf
               https://en.wikipedia.org/wiki/Apostrophe
               https://en.wikipedia.org/wiki/Wikipedia:List_of_English_contractions
             
             The plural and possessive forms are badly mixed up. For example, in some
             cases apostrophe s is plural and in other cases it is a possessive. */  
          let forceAlphaNumeric = false;   
          /* What follows is a dummy loop used only to allow break to work */          
          while (true) {
            /* Check if we have a single quote character. If we don't
               then we have not more work to do. */
            if (ch != "'") 
              break;
            /* Check if the caller wants to ignore some single quotes.
               If not, then we have not more work to so. */
            if (ignoreSomeSingleQuotes == false)
              break;
            /* Get the number of prior characters. This is the number of
               characters before the single quote. */
            let priorCount = pos;
            /* Get the prior character, if we have one */
            let priorChar = '';
            let priorCharIsAlphaStrictly = false;
            if (priorCount >= 1) {
              priorChar = inStr.charAt(pos - 1);
              priorCharIsAlphaStrictly = HDLmString.isAlphaStrict(priorChar);
            }
            /* Get the number of characters after the single quote. This 
               is the number of characters after the single quote. */
            let afterCount = inLen - pos - 1;
            /* Check if the next character is an 's' (without the quotes) */ 
            let afterChar = '';
            if (afterCount >= 1)
              afterChar = inStr.charAt(pos + 1);
            /* We assume that the character after the plural form is not a white 
               space character. If it is, then we have might have a valid plural 
               form. The other possibility is that we don't have any characters
               after the plural form. */
            let afterOk = false;
            if (afterCount >= 1) {        
              let afterChar = inStr.charAt(pos + 1);
              if (HDLmString.isWhiteSpace(afterChar))       
                afterOk = true;
            }
            /* This is a check for end-of-string */ 
            else if (afterCount == 0) 
              afterOk = true;
            /* We assume that the character after the contraction or possessive form
               or plural form is not a white space character. If it is, then we have
               might have a valid contraction or possessive form or plural form. The 
               other possibility is that we don't have any characters after the contraction
               or possessive form or plural form. */
            let afterNextOk = false;
            if (afterCount >= 2) {        
              let afterNextChar = inStr.charAt(pos + 2);
              if (HDLmString.isWhiteSpace(afterNextChar))       
                afterNextOk = true;
            }
            /* This is a check for end-of-string */ 
            else if (afterCount == 1) 
              afterNextOk = true;
            /* We assume that the character after the contraction or possessive form
               or plural form is not a white space character. If it is, then we have
               might have a valid contraction or possessive form or plural form. The 
               other possibility is that we don't have any characters after the contraction
               or possessive form or plural form. */
            let afterAfterNextOk = false;
            if (afterCount >= 3) {        
              let afterAfterNextChar = inStr.charAt(pos + 3);
              if (HDLmString.isWhiteSpace(afterAfterNextChar))       
                afterAfterNextOk = true;
            }
            /* This is a check for end-of-string */ 
            else if (afterCount == 2) 
              afterAfterNextOk = true;
            /* Check if we have a contraction. This code checks for many
               types of contractions. */ 
            if ((priorCharIsAlphaStrictly       && 
                 afterCount >= 2                &&
                 inStr.substr(pos+1, 2) == "ll" &&
                 afterAfterNextOk == true )        ||
                (priorCharIsAlphaStrictly       && 
                 afterCount >= 2                &&
                 inStr.substr(pos+1, 2) == "re" &&
                 afterAfterNextOk == true )        ||
                (priorCharIsAlphaStrictly       && 
                 afterCount >= 2                &&
                 inStr.substr(pos+1, 2) == "ve" &&
                 afterAfterNextOk == true )        ||
                (priorCharIsAlphaStrictly       && 
                 afterCount >= 1                &&
                 inStr.substr(pos+1, 1) == "d"  &&
                 afterNextOk == true )             ||
                (priorCharIsAlphaStrictly       && 
                 afterCount >= 1                &&
                 inStr.substr(pos+1, 1) == "m"  &&
                 afterNextOk == true )             || 
                (priorChar == 'n'               && 
                 afterCount >= 1                &&
                 inStr.substr(pos+1, 1) == "t"  &&
                 afterNextOk == true)              ||
                /* Check for a'ight which is a contraction of alright */
                (priorChar == 'a'               && 
                 afterCount >= 4                &&
                 inStr.substr(pos+1, 4) == "ight") ||
                /* Check for g'ovt which is a contraction of government */
                (priorChar == 'g'               && 
                 afterCount >= 3                &&
                 inStr.substr(pos+1, 3) == "ovt")
                ) { 
              forceAlphaNumeric = true;
              break;
            }
            /* Check if we have a possessive form. The first step is to check  
               if the prior character is strictly an alpha character. The
               second stop is to check if the character after the single
               quote is an 's' (without the quotes). The third step is 
               to check for a blank or end-of-string after the 's' (without 
               the quotes). */ 
            if (priorCharIsAlphaStrictly == true &&
                afterChar == 's'                 &&
                afterNextOk == true) {
              forceAlphaNumeric = true;
              break;
            }
            /* Check if we are in a string, delimited by single quotes */
            let unmatchedSingleQuotes = false;
            if (quoteChars == "'" &&
                unmatchedQuotes == true)
              unmatchedSingleQuotes = true;           
            /* Check if we have a plural form. The first step is to check
               if the prior character is an 's' (without the quotes). The 
               second step is to check for a blank or end-of-string after
               the single quote. The third step is to make sure we are not
               in a string delimited by single quotes. 
               
               The above comment may be wrong. If the letter 's' (without
               the quotes) is followed by single quote, we have plural 
               noun and the single quote probably means we have the 
               possessive form. Of course, some strings actually end 
               in 's' (without the quotes). It would be a mistake in 
               these cases, to treat the single quote after the 's' 
               (without the quotes) and anything other than the end
               of the string. */
            if (priorChar == 's'         &&
                afterOk   == true        &&
                unmatchedSingleQuotes == false) {
              forceAlphaNumeric = true;
              break;
            }      
            break;
          }
          /* Check if the force alphanumeric flag is set or if the character 
             is really an alphanumeric character */
          if (forceAlphaNumeric             == false && 
              HDLmString.isAlphaNumeric(ch) == false)
            break;
          obj.value += ch;
          pos++;
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
        obj.pos = pos;
        obj.value = ch;
        pos++;
        /* Append all numeric characters after the first one */
        while (pos < inLen) {
          /* Get the next character */
          ch = inStr.charAt(pos);
          if (!HDLmString.isDigit(ch))
            break;
          obj.value += ch;
          pos++;
        }
        rv.push(obj);
        continue;
      }
      /* Check for an Operator character of some kind. A separate token
         is created for each operator. */ 
      if (HDLmString.isOperator(ch)) {
        obj = {};
        obj.tokType = HDLmTokenTypes.operator;
        obj.pos = pos;
        obj.value = ch;
        pos++;
        rv.push(obj);
        continue;
      }
      /* A variable is set here to show that we have found a quote character.
         This variable is reset if the quote character should be ignored. */
      let quoteCharFound = quoteChars.includes(ch)
      /* Check for a quote character. The quote character does not become
         part of the output token. Pairs of quotes are combined into one
         quote character that does become part of the output token. The 
         final quote terminates the quoted string. The first quote character
         and the final quote character do not become part of the output token. */
      if (quoteCharFound == true) {
        let localQuoteChar = ch;
        unmatchedQuotes = true;
        obj = {};
        obj.tokType = HDLmTokenTypes.quoted;
        obj.pos = pos;
        obj.value = '';
        pos++;
        /* Append the contents of the quoted string not including the 
           leading and trailing quote characters */
        while (pos < inLen) {
          /* Get the next character */
          ch = inStr.charAt(pos);
          /* Check for a quote character. Non-quote characters are just
             added to the output token. */
          if (ch != localQuoteChar) {
            obj.value += ch;
            pos++;
            continue;
          }
          /* At this point we need to check if the next character can
             be obtained and if the next character is also a quote. If
             both tests are true, then we have a pair of quotes that
             can be combined into one quote character. */
          if (pos + 1 < inLen && inStr.charAt(pos + 1) == localQuoteChar) {
            obj.value += ch;
            pos += 2;
            continue;
          }
          /* At this point we have found the trailing quote character and
             we can terminate the quoted string. Note that the trailing 
             quote (like the leading quote) is not added to the token. */
          pos++;
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
        obj.pos = pos;
        obj.value = ch;
        pos++;
        /* Append all white space characters after the first one */
        while (pos < inLen) {
          /* Get the next character */
          ch = inStr.charAt(pos);
          if (!HDLmString.isWhiteSpace(ch))
            break;
          obj.value += ch;
          pos++;
        }
        rv.push(obj);
        continue;
      }
      /* All other characters are treated as unknown characters. Because of the 
         rules of JavaScript, Hash (pound) and curly braces are all treated as 
         unknown characters. A separate token is created for each unknown character. */
      if (1 == 1) {
        obj = {};
        obj.tokType = HDLmTokenTypes.unknown;
        obj.pos = pos;
        obj.value = ch;
        pos++;
        rv.push(obj);
        continue;
      }
    }
    /* Add the sentinel entry at the end of the token object array */
    obj = {};
    obj.tokType = HDLmTokenTypes.end;
    obj.pos = pos;
    obj.value = '';
    pos++;
    rv.push(obj);
    return rv;
  }
  /* This function returns a vector of objects to the caller. The vector
     of objects has one entry for each non-white token in the string passed 
     to this routine, plus a sentinal entry to mark the end of the vector.
     The vector of objects will contain just the sentinel entry if the string 
     passed to this routine is emtpy. This is not considered to be an error 
     condition.
   
     One object will be built for each token in the string passed by the 
     caller. The object describes the token in some detail. The object
     gives the token position (starting from 0, not 1), the token type,
     and the token contents. */
  static getTokensNonWhite(inStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inStr != 'string') {
      let errorText = `Input value passed to getTokensNonWhite is not a string`;
      HDLmAssert(false, errorText);
    }
    let rv = [];
    let tokenVec = HDLmString.getTokens(inStr);
    let tokenLen = tokenVec.length;
    for (let i = 0; i < tokenLen; i++)
      if (tokenVec[i].tokType != HDLmTokenTypes.space)
        rv.push(tokenVec[i]);
    return rv;
  }
  /* This function returns a vector of objects to the caller. The vector
     of objects has one entry for each token in the string passed to this
     routine, plus a sentinal entry to mark the end of the vector. Note that
     multiple input tokens (as many as three) are combined into one output 
     token in some cases. The idea is that '2.5' (without the quotes) should
     be treated as one number token, rather than as an integer token, an
     operator token, and a third integer token. Note that '+.2' will end up 
     as two tokens. The first token will be an operator token with a value of 
     '+' and the second token will be a number token with a value of '.2'. 
     Note also that in some cases the dot operator will not be merged into 
     another token. For example, '+.+' will be treated initially as three
     tokens and will remain three tokens.

     The vector of objects will contain just the sentinel entry if the string 
     passed to this routine is emtpy. This is not considered to be an error 
     condition.
  
     One object will be built for each token in the string passed by the 
     caller. The object describes the token in some detail. The object
     gives the token position (starting from 0, not 1), the token type,
     and the token contents. */
  static getTokensNumber(inStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inStr != 'string') {
      let errorText = `Input value passed to getTokensNonWhite is not a string`;
      HDLmAssert(false, errorText);
    }
    let rv = [];
    let tokenVec = HDLmString.getTokens(inStr);
    let tokenLen = tokenVec.length;
    /* Process all of the input tokens */
    for (let i = 0; i < tokenLen; i++) {
      /* Check if we have a dot token preceeded
         by an integer token */
      if (tokenVec[i].value == '.' &&
          i > 0 &&
          tokenVec[i - 1].tokType == HDLmTokenTypes.integer) { 
        let rvLastIndex = rv.length -1
        rv[rvLastIndex].tokType = HDLmTokenTypes.number;
        rv[rvLastIndex].value += '.';
        continue;
      }
      /* Check if we have an integer token preceeded by
         a token that end with a dot */
      if (tokenVec[i].tokType == HDLmTokenTypes.integer &&
          i > 0 &&
          tokenVec[i - 1].value == '.') {
        let rvLastIndex = rv.length - 1
        rv[rvLastIndex].tokType = HDLmTokenTypes.number;
        rv[rvLastIndex].value += tokenVec[i].value;
        continue;
      }
      /* Since the above checks did not work, just copy
         the current token to the output token vector */
      rv.push(tokenVec[i]);
    }
    return rv;
  }
  /* The function below returns a boolean showing if a character
     is a valid alpha character or not. The caller actually passes 
     a string. However, the length of the string must be exactly
     one. Note that in keeping with the rules of JavaScript,
     underscore and dollar sign are considered to be alpha
     characters. */
  static isAlpha(inChar) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inChar != 'string') {
      let errorText = `Input character value passed to isAlpha is not a string`;
      HDLmAssert(false, errorText);
    }
    let inLen = inChar.length;
    /* Make sure the input string length is one */
    if (inLen != 1) {
      let errorText = 'Input string (' + inChar + ') length (' + inLen + ') passed to isAlpha is not one';
      HDLmAssert(false, errorText);
    }
    return (inChar >= 'a' && inChar <= 'z') ||
           (inChar >= 'A' && inChar <= 'Z') ||
           (inChar == '_' || inChar == '$');
  }
  /* The function below returns a boolean showing if a character
     is a valid alphanumeric character or not. The caller actually
     passes a string. However, the length of the string must be 
     exactly one. Note that in keeping with the rules of JavaScript,
     underscore and dollar sign are considered to be alphanumeric 
     characters. */
  static isAlphaNumeric(inChar) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inChar != 'string') {
      let errorText = `Input character value passed to isAlphaNumeric is not a string`;
      HDLmAssert(false, errorText);
    }
    let inLen = inChar.length;
    /* Make sure the input string length is one */
    if (inLen != 1) {
      let errorText = 'Input string (' + inChar + ') length (' + inLen + ') passed to isAlphaNumeric is not one';
      HDLmAssert(false, errorText);
    }
    return (inChar >= '0' && inChar <= '9') ||
           (inChar == '_' || inChar == '$') ||
           (inChar >= 'a' && inChar <= 'z') ||
           (inChar >= 'A' && inChar <= 'Z');   
  }
  /* The function below returns a boolean showing if a character
     is a valid alpha character or not. The caller actually passes 
     a string. However, the length of the string must be exactly
     one. Note that underscore and dollar sign are not considered 
     to be alpha characters even though JavaScript considers them
     to be alpha characters. */
  static isAlphaStrict(inChar) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inChar != 'string') {
      let errorText = `Input character value passed to isAlphaStrict is not a string`;
      HDLmAssert(false, errorText);
    }
    let inLen = inChar.length;
    /* Make sure the input string length is one */
    if (inLen != 1) {
      let errorText = 'Input string (' + inChar + ') length (' + inLen + ') passed to isAlphaStrict is not one';
      HDLmAssert(false, errorText);
    }
    return (inChar >= 'a' && inChar <= 'z') ||
           (inChar >= 'A' && inChar <= 'Z');
  }
  /* The function below returns a boolean showing if a character
     is a valid numeric digit or not. The caller actually passes 
     a string. However, the length of the string must be exactly
     one. Note that the code below does not consider non-traditional
     digit characters to be digits. This could be a problem in the
     future. */
  static isDigit(inChar) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inChar != 'string') {
      let errorText = `Input character value passed to isDigit is not a string`;
      HDLmAssert(false, errorText);
    }
    let inLen = inChar.length;
    /* Make sure the input string length is one */
    if (inLen != 1) {
      let errorText = 'Input string (' + inChar + ') length (' + inLen + ') passed to isDigit is not one';
      HDLmAssert(false, errorText);
    }
    return (inChar >= '0' && inChar <= '9');
  }
  /* The function below returns a boolean showing if a string consists
     entirely of valid hexadecimal characters or not. Both upper and 
     lower case hexadecimal are accepted. The string can be any length
     including zero-length. A zero length string is considered to be a
     valid hexadecimal string. The input string is not modified. */
  static isHex(inStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inStr != 'string') {
      let errorText = `Input value passed to isHex is not a string`;
      HDLmAssert(false, errorText);
    }
    let re = /^[0-9A-Fa-f]*$/g;
    return re.test(inStr);
  }
  /* The function below returns a boolean showing if a character
     is a valid operator character or not. The caller actually
     passes a string. However, the length of the string must be 
     exactly one. Note that comma is included in the list of
     operator characters below because comma is a valid JavaScript
     operator. Period and brackets (left and right) are also 
     included in the list of operator characters because they 
     are used as accessors. Curly braces are not included because
     curly braces are not valid JavaScript operators. For the same
     reason the hash (pound) character is not included either. */
  static isOperator(inChar) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inChar != 'string') {
      let errorText = `Input character value passed to isOperator is not a string`;
      HDLmAssert(false, errorText);
    }
    let inLen = inChar.length; 
    /* Make sure the input string length is one */ 
    if (inLen != 1) {
      let errorText = 'Input string (' + inChar + ') length (' + inLen + ') passed to isOperator is not one';
      HDLmAssert(false, errorText);
    }
    let haystack = '+-*/%=!><&|~^?:,().[]';
    return (haystack.indexOf(inChar) >= 0);
  }
  /* The function below returns a boolean showing if a character
     is a valid white space character or not. The caller actually
     passes a string. However, the length of the string must be 
     exactly one. The list below only includes the traditional 
     white space characters. Many other (Unicode) non-traditional
     white space characters exist. They may need to be added in 
     the future. */
  static isWhiteSpace(inChar) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inChar != 'string') {
      let errorText = `Input character value passed to isWhiteSpace is not a string`;
      HDLmAssert(false, errorText);
    }
    let inLen = inChar.length;
    /* Make sure the input string length is one */
    if (inLen != 1) {
      let errorText = 'Input string (' + inChar + ') length (' + inLen + ') passed to isWhiteSpace is not one';
      HDLmAssert(false, errorText);
    }
    let haystack = ' \f\n\r\t\v';
    return (haystack.indexOf(inChar) >= 0);
  }
  /* This method is passed a string. It counts the number of numeric 
     characters (0-9) and returns the count to the caller. */
  static numericCount(inStr) {
    let rv = 0;
    for (let i = 0; i < inStr.length; i++) {
      let cuChar = inStr.charAt(i);
      if (cuChar >= '0' && cuChar <= '9')
        rv++;
    }
    return rv;
  }
  /* Remove leading and trailing quotes from a string. The input string
     may or may not have leading and trailing quotes. The output string
     will not have leading and trailing quotes. */
  static removeQuotes(inStr) {
    /* Check if the input string is a string */
    if (typeof(inStr) != 'string') {
      let errorText = `Input value passed to removeQuotes is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Check if the input string is empty */
    let inStrLen = inStr.length;
    if (inStrLen < 2)
      return inStr;
    /* Get the first and last characters of the input string */
    let firstChar = inStr.charAt(0);
    let lastChar = inStr.charAt(inStrLen - 1);
    /* Check if the first character is some type of quote 
       character */ 
    if (firstChar != '"' && firstChar != "'")
      return inStr;
    /* Check if the last character is the same type of quote
       character as the first character */
    if (lastChar != firstChar)
      return inStr;
    return inStr.substring(1, inStrLen - 1);
  }
  /* Remove a file number tail (if any) from a string. Some strings end
     with a file number (of the form (nnn)) that must be removed for 
     duplicate checking. This routine checks if the input string has 
     a file number tail and removes it. In other words, 'Abcd' is 
     returned as 'Abcd' and 'Abcd (2)' is also returned as 'Abcd'. 
     Note that this routine does not change the case of any part of
     the input or output strings. */
  static removeFileNumberTail(inStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inStr != 'string') {
      let errorText = `Input value passed to removeFileNumberTail is not a string`;
      HDLmAssert(false, errorText);
    }
    let re = /(\s\(\d+\))$/;
    let ix = inStr.search(re);
    if (ix < 0)
      return inStr;
    else
      return inStr.substring(0, ix);
  }
  /* Remove the suffix and the period, from what should be  
     a file name. The file name may actually be an HTML path 
     name. The suffix is everything after the last period. 
     If no period is found a null value is returned to the 
     caller. */
    static removeFileNameSuffix(fileName) {
    /* Make sure the first argument passed by the caller is a string */
    if (((typeof fileName) != 'string')) {
      let errorText = `File or path name (${fileName}) passed to removeFileNameSuffix method is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Find the last occurrence (if any) of a period in the file or 
       path name string */
    let lastIndex = fileName.lastIndexOf('.');
    if (lastIndex < 0)
      return null;
    /* Check if the period is the first character in the file name.
       If this is true, just return an empty string to the caller. */
    if (lastIndex == 0)
      return '';
    /* Return everything up to, but not including, the last period */
    return fileName.substring(0, lastIndex);
  }
  /* The function below does a replace all on an input string. The 
     input string is not modified. The new string is returned to the
     caller. Note that regex is used below. The search string is escaped
     as need be for regex use. */
  static replaceAll(inStr, search, replacement) {
    /* Make sure the first argument passed by the caller is a string */
    if (typeof inStr != 'string') {
      let errorText = `Input value passed to replaceAll is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the second argument passed by the caller is a string */
    if (typeof search != 'string') {
      let errorText = `Search value passed to replaceAll is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the third argument passed by the caller is a string */
    if (typeof replacement != 'string') {
      let errorText = `Replacement value passed to replaceAll is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Fix the search strings by replacing all of the characters that
       will cause problems when the search string is used as a regex. 
       Note that the sequence, left square bracket, backslash, right
       square bracket, appears to mean both square brackets with the
       right square bracket, escaped as need be. */
    search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    search = search.replace(/\s/g, "\\s");
    return inStr.replace(new RegExp(search, 'g'), replacement);
  }
  /* This routine converts a JavaScript string to 
     a hexadecimal JavaScript string */
  static stringToHex(str) {
    /* Make sure the first (and only) argument passed by the caller is a string */
    if (typeof str != 'string') {
      let errorText = `Input value passed to stringToHex is not a string`;
      HDLmAssert(false, errorText);
    }
    let hex = '';
    for (let i = 0; i < str.length; i++) {
      const charCode = str.charCodeAt(i);
      hex += charCode.toString(16).padStart(2, '0'); 
    }
    return hex;
  }
  /* Return the number of times a test string ends with a tail string.
     The number can be zero or greater than zero. The test string can
     be a zero-length string. The tail string must not be a zero-length
     string. */
  static tailCount(testStr, tailStr) {
    /* Make sure the first argument passed by the caller is a string */
    if (typeof testStr != 'string') {
      let errorText = `Test value passed to tailCount is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the second argument passed by the caller is a string */
    if (typeof tailStr != 'string') {
      let errorText = `Tail value passed to tailCount is not a string`;
      HDLmAssert(false, errorText);
    }
    let count = 0;
    let testLen = testStr.length;
    let tailLen = tailStr.length;
    /* Make sure the tail string ia not a zero-length string */
    if (tailLen <= 0) {
      let errorText = 'Tail value string passed by the caller, is a zero-length string';
      HDLmAssert(false, errorText);
    }
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      /* Check if we enough space left in the test string for the tail string */
      if (tailLen > testLen)
        break;
      /* Check if the remaining test string ends with the tail string */
      if (!testStr.substr(0, testLen).endsWith(tailStr))
        break;
      /* Increment the count and adjust the remaining string length */
      count++;
      testLen -= tailLen;
    }
    return count;    
  }
  /* This function truncates a string (if need be) and returns the 
     truncated string to the caller. The string is only truncated if
     need be. */
  static truncateString(inStr, maxLen) {
    let   inStrLen = inStr.length;
    if (inStrLen <= maxLen)
      return inStr;
    return inStr.substr(0, maxLen);
  }
  /* Convert the first character of a string to uppercase and return the
     string to the caller. The original string is not modified. */ 
  static ucFirst(value) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof value != 'string') {
      let errorText = `Value passed to ucFirst is not a string`;
      HDLmAssert(false, errorText);
    }
    if (value.length == 0)
      return value;
    return value.charAt(0).toUpperCase() + value.substr(1);
  }
  /* Convert the first character all of words in a string to uppercase
     and return the possibly modified sentence to the caller */
  static ucFirstSentence(inputValue, quoteChars = "'", ignoreSomeSingleQuotes = false) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof inputValue != 'string') {
      let errorText = `Input value passed to ucFirstSentence is not a string`;
      HDLmAssert(false, errorText);
    }
    let outputValue = '';
    let valueString;
    let valueToken;
    let valueTokens = HDLmString.getTokens(inputValue, quoteChars, ignoreSomeSingleQuotes);
    let tokenCount = valueTokens.length - 1;
    for (let i = 0; i < tokenCount; i++) {
      /* Get some information from the current token */
      valueToken = valueTokens[i];
      valueString = valueToken.value;
      /* If the current token is an identifier, then we must
         convert the first character to uppercase */
      if (valueToken.tokType == HDLmTokenTypes.identifier)
        valueString = HDLmString.ucFirst(valueString);
      /* Add the current (possibly modified) value to the output 
         string */
      outputValue += valueString;
    }
    return outputValue;
  }
}