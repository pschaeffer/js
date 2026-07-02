/**
 * HDLmMain short summary.
 *
 * HDLmMain description.
 *
 * @version 1.
 * @author Peter
 */
"use strict";
/* The HDLmMain class doesn't actually do anything. However,  
   it does define a static method that invokes other code 
   to actually do something. No instances of this class can
   ever be created. */ 
class HDLmMain {
  /* Handle overall initialization */
  static handleInitialization() { 
    /* This code is for testing the HDLmJSON parser. It is not meant
       to be executed. It is only meant to be used for testing the 
       HDLmJSON parser while it is being developed. */
    if (1 == 2) {
      try { 
        let testJsonLen;
        let testJsonStr;
        let testJsonObj;
        testJsonStr = '{"status":"success","nested":{"message":"This is a test message.","code":"200"}}';
        testJsonStr = '["status","success","nested",{"message":"This is a test message.","code":200}]';
        testJsonStr = '{"content":"# Improvement \n"}';
        testJsonStr = '{ "face": "\uD83D\uDE10" }';    
        testJsonStr = '{' +
                        '"first_name": "John",' +
                        '"last_name": "Smith",' +
                        '"is_alive": true,' +
                        '"age": 27,' +
                        '"address": {' +
                        '  "street_address": "21 2nd Street",' +
                        '  "city": "New York",' +
                        '  "state": "NY",' +
                        '  "postal_code": "10021-3100"' +
                        '},' +
                        '"phone_numbers": [' +
                        '  {' +
                        '   "type": "home",' +
                        '   "number": "212 555-1234"' +
                        '  },' +
                        ' {' +
                        '    "type": "office",' +
                        '   "number": "646 555-4567"' +
                        '  }' +
                        '],' +
                        '"children": [' +
                        '  "Catherine",' +
                        '  "Thomas",' +
                        '  "Trevor"' +
                        '],' +
                        '"spouse": null' +
                      '}';
        testJsonStr = ' "face"  ';  
        testJsonStr = ' null '; 
        testJsonStr = ' 3.21e2 '; 
        testJsonLen = testJsonStr.length;
        testJsonObj = HDLmJSON.parseInternal(testJsonStr); 
        console.log(testJsonObj); 
        testJsonStr = '{"content":"# Improvement \n"}';      
        testJsonObj = HDLmJSON.parseInternal(testJsonStr); 
        console.log(testJsonObj); 
      } 
      catch (error) {
        console.log('Error parsing test JSON string: ' + error);
        let errorText = 'Error parsing test JSON string: ' + error;
        HDLmAssert(false, errorText);
      } 
    }
    /* console.log('In HDLmMain.handleInitialization'); */
    /* let windowLocationPathName = window.location.pathname; */
    /* console.log('window.location.pathname', windowLocationPathName); */
    /* This routine may been invoked to build rules or it may have 
       been invoked for some other reason */
    /* HDLmExecuteEditor.main(); */
    /* Check if we are running under VSCode. If this
       is true, then we may want to run the code that
       manages rules or we may want to run the standard
       editor code. */  
    if (HDLmUtility.isVscode()) {    
      if (1 == 2)
        HDLmIndexOne.main();  
      if (1 == 2)
        HDLmManageRules.main();  
      if (1 == 1)
        HDLmWebpageImprover.main();
      if (1 == 2)
        HDLmWebpagesImprover.main(); 
      if (1 == 2)
        HDLmWebsiteImprover.main();     
    } 
    /* Not running under VSCode. Just run all of the standard
       routines. In practice, only one will actually do anything. 
       Each routine will check the window location pathname and
       determine if it should execute. */
    else {
      HDLmIndexOne.main();   
      HDLmManageRules.main();
      HDLmWebpageImprover.main();
      HDLmWebpagesImprover.main();
      HDLmWebsiteImprover.main();
    }
  }  
} 
/* Run the handle initialization function */
HDLmMain.handleInitialization();