/**
 * HDLmSecurity short summary.
 *
 * HDLmSecurity description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmSecurity class is not used to create any objects.
   However, it does contain security related code. */ 
class HDLmSecurity {
  /* Build the UI used to get a new password */
  static buildNewPasswordUi() {
    /* console.log('In HDLmSecurity.buildNewPasswordUi'); */
    let currentPasswordFirst = null;
    let currentPasswordSecond = null;
    let currentTreeNode = null;
    let currentValue;  
    let changePasswordWidgetTop;
    let changePasswordWidgetSecond;
    let changePasswordWidgetThird;
    let changePasswordWidgetFourth;
    let changePasswordWidgetFifth;
    let changePasswordWidgetSixth;
    let changePasswordWidgetNewPasswordFirst;
    let changePasswordWidgetNewPasswordSecond; 
    let typeDescription;
    let typeSource;
    let typeSubType;
    /* Remove the current contents of the web page */
    HDLmSecurity.removeBoth();
    /* Create a temporary container widget for use below */
    let containerWidget = new HDLmContainerWidget();
    /* Create a widget for the top change password text */
    typeDescription = '';
    typeSource = 'changepasswordtop';
    typeSubType = 'changepasswordtop';
    currentValue = 'Change Password';
    changePasswordWidgetTop = HDLmMod.displayFieldIOText('iotext',
                                                         typeSubType,
                                                         currentTreeNode, containerWidget,
                                                         function () {
                                                           containerWidget.displayErrorText();
                                                         },
                                                         typeDescription, currentValue, typeSubType,
                                                         function () { },
                                                         function () { },
                                                         function () { }, 
                                                         function () { });
    /* Add the top change password widget */
    containerWidget.addWidget(changePasswordWidgetTop, typeSource); 
    /* Create a widget for the second line of the change password text */
    typeDescription = '';
    typeSource = 'changepasswordsecond';
    typeSubType = 'changepasswordsecond';
    currentValue = 'Please enter your new password below';
    changePasswordWidgetSecond = HDLmMod.displayFieldIOText('iotext',
                                                            typeSubType,
                                                            currentTreeNode, containerWidget,
                                                            function () {
                                                              containerWidget.displayErrorText();
                                                            },
                                                            typeDescription, currentValue, typeSubType,
                                                            function () { },
                                                            function () { },
                                                            function () { },
                                                            function () { });
    /* Add the second line of text change password widget */
    containerWidget.addWidget(changePasswordWidgetSecond, typeSource);
    /* Create a widget for the third line of the change password text */
    typeDescription = '';
    typeSource = 'break';
    typeSubType = 'changepasswordbreak';
    currentValue = ' ';
    changePasswordWidgetThird = HDLmMod.displayFieldIOText('iotext',
                                                           typeSubType,
                                                           currentTreeNode, containerWidget,
                                                           function () {
                                                             containerWidget.displayErrorText();
                                                           },
                                                           typeDescription, currentValue, typeSubType,
                                                           function () { },
                                                           function () { },
                                                           function () { },
                                                           function () { });
    /* Add the third line of text change password widget */
    containerWidget.addWidget(changePasswordWidgetThird, typeSource);
    /* Create a widget for the fourth line of the change password text */
    typeDescription = '';
    typeSource = 'changepasswordfourth';
    typeSubType = 'changepasswordfourth';
    currentValue = 'New Password';
    changePasswordWidgetFourth = HDLmMod.displayFieldIOText('iotext',
                                                            typeSubType,
                                                            currentTreeNode, containerWidget,
                                                            function () {
                                                              containerWidget.displayErrorText();
                                                            },
                                                            typeDescription, currentValue, typeSubType,
                                                            function () { },
                                                            function () { },
                                                            function () { },
                                                            function () { });
    /* Add the fourth line of text change password widget */
    containerWidget.addWidget(changePasswordWidgetFourth, typeSource);
    /* Create a widget for the first set of new / permanent password information */
    typeDescription = '';
    typeSource = 'changepasswordnewpasswordfirst';
    typeSubType = 'changepasswordnewpasswordfirst';
    currentValue = '';
    changePasswordWidgetNewPasswordFirst = HDLmMod.displayFieldIOText('iotext',
                                                                      typeSubType,
                                                                      currentTreeNode, containerWidget,
                                                                      function () {
                                                                        containerWidget.displayErrorText();
                                                                      },
                                                                      typeDescription, currentValue, typeSubType,
                                                                      function () { },
                                                                      function (newTextValue, noErrors) { 
                                                                        /* console.log('In HDLmSecurity.buildNewPasswordUi'); */ 
                                                                        /* console.log(newTextValue); */
                                                                        /* console.log(noErrors); */
                                                                        changePasswordWidgetNewPasswordSecond.determineErrorText();
                                                                        containerWidget.displayErrorText();
                                                                        currentPasswordFirst = newTextValue;
                                                                      },
                                                                      function () { 
                                                                        changePasswordWidgetNewPasswordSecond.determineErrorText();
                                                                        let errorText = containerWidget.getErrorText();
                                                                        /* console.log(errorText); */
                                                                        if (errorText == '') {
                                                                          let currentObj = {};
                                                                          currentObj.password = currentPasswordFirst;
                                                                          let currentJson = JSON.stringify(currentObj);
                                                                          /* console.log(currentJson); */
                                                                          HDLmSecurity.inputDone(currentJson);
                                                                        }
                                                                      },
                                                                      function () { }
                                                                     );
    /* Add the first new / permanent password widget */
    /* console.log('In HDLmSecurity.buildNewPasswordUi'); */
    /* console.log(typeof changePasswordWidgetNewPasswordFirst); */
    containerWidget.addWidget(changePasswordWidgetNewPasswordFirst, typeSource);
    /* console.log(typeof changePasswordWidgetNewPasswordFirst); */
    /* Create a widget for the fifth line of the change password text */
    typeDescription = '';
    typeSource = 'break';
    typeSubType = 'changepasswordbreak';
    currentValue = '';
    changePasswordWidgetFifth = HDLmMod.displayFieldIOText('iotext',
                                                           typeSubType,
                                                           currentTreeNode, containerWidget,
                                                           function () {
                                                             containerWidget.displayErrorText();
                                                           },
                                                           typeDescription, currentValue, typeSubType,
                                                           function () { },
                                                           function () { },
                                                           function () { },
                                                           function () { }); 
    /* Add the fifth line of text change password widget */
    /* console.log('In HDLmSecurity.buildNewPasswordUi'); */
    containerWidget.addWidget(changePasswordWidgetFifth, typeSource);
    /* console.log('In HDLmSecurity.buildNewPasswordUi'); */
    /* Create a widget for the sixth line of the change password text */
    typeDescription = '';
    typeSource = 'changepasswordsixth';
    typeSubType = 'changepasswordsixth';
    currentValue = 'Enter New Password Again';
    changePasswordWidgetSixth = HDLmMod.displayFieldIOText('iotext',
                                                            typeSubType,
                                                            currentTreeNode, containerWidget,
                                                            function () {
                                                              containerWidget.displayErrorText();
                                                            },
                                                            typeDescription, currentValue, typeSubType,
                                                            function () { },
                                                            function () { },
                                                            function () { },
                                                            function () { });
    /* Add the sixth line of text change password widget */
    /* console.log('In HDLmSecurity.buildNewPasswordUi'); */
    containerWidget.addWidget(changePasswordWidgetSixth, typeSource);
    /* console.log('In HDLmSecurity.buildNewPasswordUi'); */
    /* Create a widget for the second set of new / permanent password information */
    typeDescription = '';
    typeSource = 'changepasswordnewpasswordsecond';
    typeSubType = 'changepasswordnewpasswordsecond';
    currentValue = '';
    changePasswordWidgetNewPasswordSecond = HDLmMod.displayFieldIOText('iotext',
                                                                       typeSubType,
                                                                       currentTreeNode, containerWidget,
                                                                       function () {
                                                                         containerWidget.displayErrorText();
                                                                       },
                                                                       typeDescription, currentValue, typeSubType,
                                                                       function () { },
                                                                       function (newTextValue, noErrors) { 
                                                                         /* console.log('In HDLmSecurity.buildNewPasswordUi'); */ 
                                                                         /* console.log(newTextValue); */
                                                                         /* console.log(noErrors); */
                                                                         changePasswordWidgetNewPasswordFirst.determineErrorText();
                                                                         containerWidget.displayErrorText();
                                                                         currentPasswordSecond = newTextValue;
                                                                       },
                                                                       function () { 
                                                                         changePasswordWidgetNewPasswordFirst.determineErrorText();
                                                                         let errorText = containerWidget.getErrorText();
                                                                         /* console.log(errorText); */
                                                                         if (errorText == '') {
                                                                           let currentObj = {}; 
                                                                           currentObj.password = currentPasswordSecond;
                                                                           let currentJson = JSON.stringify(currentObj);
                                                                           /* console.log(currentJson); */
                                                                           HDLmSecurity.inputDone(currentJson);
                                                                         }
                                                                       },
                                                                       function () { });
    /* Add the second new / permanent password widget */
    /* console.log(typeof changePasswordWidgetNewPasswordSecond); */
    containerWidget.addWidget(changePasswordWidgetNewPasswordSecond, typeSource);
    /* Prompt for the new password */
    HDLmSecurity.renderWidget(containerWidget);
  }
  /* Build the UI used to get a user name and password */
  static buildUsernamePasswordUi() {
    /* console.log('In HDLmSecurity.buildUsernamePasswordUi'); */
    /* console.trace(); */
    let currentPassword = null;
    let currentTreeNode = null;
    let currentUsername = null;
    let currentValue;  
    let newBreakFirstWidget;
    let newBreakSecondWidget;
    let newOverallWidget;
    let newPasswordPromptWidget;
    let newPasswordWidget;
    let newUsernamePromptWidget;
    let newUsernameWidget;
    let typeDescription;
    let typeSource;
    let typeSubType;
    /* Remove the current contents of the web page */
    HDLmSecurity.removeBoth();
    /* Create a temporary container widget for use below */
    let containerWidget = new HDLmContainerWidget();
    /* Create a widget for the overall signin information */
    typeDescription = '';
    typeSource = 'overallsignin';
    typeSubType = 'signinoverallusernamepassword';
    currentValue = 'Sign in with your username and password';
    newOverallWidget = HDLmMod.displayFieldIOText('iotext',
                                                  typeSubType,
                                                  currentTreeNode, containerWidget,
                                                  function () {
                                                    containerWidget.displayErrorText();
                                                  },
                                                  typeDescription, currentValue, typeSubType,
                                                  function () { },
                                                  function () { },
                                                  function () { },
                                                  function () { });
    /* Add the new overall widget */
    containerWidget.addWidget(newOverallWidget, typeSource);
    /* Create a break widget */
    typeDescription = '';
    typeSource = 'break';
    typeSubType = 'signinbreak';
    currentValue = '';
    newBreakFirstWidget = HDLmMod.displayFieldIOText('iotext',
                                                     typeSubType,
                                                     currentTreeNode, containerWidget,
                                                     function () {
                                                       containerWidget.displayErrorText();
                                                     },
                                                     typeDescription, currentValue, typeSubType,
                                                     function () { },
                                                     function () { },
                                                     function () { },
                                                     function () { });
    /* Add the break widget */
    containerWidget.addWidget(newBreakFirstWidget, typeSource);
    /* Create a widget for the username prompt information */
    typeDescription = '';
    typeSource = 'usernameprompt';
    typeSubType = 'signinusernameprompt';
    currentValue = 'Username';
    newUsernamePromptWidget = HDLmMod.displayFieldIOText('iotext',
                                                         typeSubType,
                                                         currentTreeNode, containerWidget,
                                                         function () {
                                                           containerWidget.displayErrorText();
                                                         },
                                                         typeDescription, currentValue, typeSubType,
                                                         function () { },
                                                         function () { },
                                                         function () { },
                                                         function () { });
    /* Add the new username prompt widget */
    containerWidget.addWidget(newUsernamePromptWidget, typeSource);
    /* Create a widget for the username information */
    typeDescription = '';
    typeSource = 'username';
    typeSubType = 'signinusername';
    currentValue = '';
    newUsernameWidget = HDLmMod.displayFieldIOText('iotext',
                                                   typeSubType,
                                                   currentTreeNode, containerWidget,
                                                   function () {
                                                     containerWidget.displayErrorText();
                                                   },
                                                   typeDescription, currentValue, typeSubType,
                                                   function () { },
                                                   function (newTextValue, noErrors) { 
                                                     /* console.log('In HDLmSecurity.buildUsernamePasswordUi'); */ 
                                                     /* console.log(newTextValue); */
                                                     /* console.log(noErrors); */
                                                     currentUsername = newTextValue;
                                                   },
                                                   function () {
                                                     let errorText = containerWidget.getErrorText();
                                                     /* console.log(errorText); */
                                                     if (errorText == '') {
                                                       let currentObj = {};
                                                       currentObj.username = currentUsername;
                                                       currentObj.password = currentPassword;
                                                       let currentJson = JSON.stringify(currentObj);
                                                       /* console.log(currentJson); */
                                                       HDLmSecurity.inputDone(currentJson);
                                                     }
                                                   },
                                                   function () { });
    /* Add the new username widget */
    containerWidget.addWidget(newUsernameWidget, typeSource);
    /* Create a break widget */
    typeDescription = '';
    typeSource = 'break';
    typeSubType = 'signinbreak';
    currentValue = '';
    newBreakSecondWidget = HDLmMod.displayFieldIOText('iotext',
                                                      typeSubType,
                                                      currentTreeNode, containerWidget,
                                                      function () {
                                                        containerWidget.displayErrorText();
                                                      },
                                                      typeDescription, currentValue, typeSubType,
                                                      function () { },
                                                      function () { },
                                                      function () { },
                                                      function () { }); 
    /* Add the break widget */
    containerWidget.addWidget(newBreakSecondWidget, typeSource);
    /* Create a widget for the password prompt information */
    typeDescription = '';
    typeSource = 'passwordprompt';
    typeSubType = 'signinpasswordprompt';
    currentValue = 'Password';
    newPasswordPromptWidget = HDLmMod.displayFieldIOText('iotext',
                                                         typeSubType,
                                                         currentTreeNode, containerWidget,
                                                         function () {
                                                           containerWidget.displayErrorText();
                                                         },
                                                         typeDescription, currentValue, typeSubType,
                                                         function () { },
                                                         function () { },
                                                         function () { },
                                                         function () { });

    /* Add the new password prompt widget */
    containerWidget.addWidget(newPasswordPromptWidget, typeSource);
    /* Create a widget for the password information */
    typeDescription = '';
    typeSource = 'password';
    typeSubType = 'signinpassword';
    currentValue = '';
    newPasswordWidget = HDLmMod.displayFieldIOText('iotext',
                                                   typeSubType,
                                                   currentTreeNode, containerWidget,
                                                   function () {
                                                     containerWidget.displayErrorText();
                                                   },
                                                   typeDescription, currentValue, typeSubType,
                                                   function () { },
                                                   function (newTextValue, noErrors) { 
                                                     /* console.log('In HDLmSecurity.buildUsernamePasswordUi'); */
                                                     /* console.log(newTextValue); */
                                                     /* console.log(noErrors); */
                                                     currentPassword = newTextValue;
                                                   },
                                                   function () { 
                                                     let errorText = containerWidget.getErrorText();
                                                     if (errorText == '') {
                                                       let currentObj = {};
                                                       currentObj.username = currentUsername;
                                                       currentObj.password = currentPassword;
                                                       let currentJson = JSON.stringify(currentObj);
                                                       HDLmSecurity.inputDone(currentJson);
                                                     }
                                                   },
                                                   function () { });
    /* Add the new password widget */
    containerWidget.addWidget(newPasswordWidget, typeSource);
    /* Prompt for the username and password */
    HDLmSecurity.renderWidget(containerWidget);
  }
  /* Build the UI used to get the verification code. The 
     verification code is sent by SMS to a phone and then
     entered by a user. */
  static buildVerificationUi(phoneNumber) {
    let currentTreeNode = null;
    let currentValue;
    let currentVerificationCode = null;
    let newOverallWidget;
    let newVerificationWidget;
    let typeDescription;
    let typeSource;
    let typeSubType;
    /* Remove the current contents of the web page */
    HDLmSecurity.removeBoth();
    /* Create a temporary container widget for use below */
    let containerWidget = new HDLmContainerWidget();
    /* Create a widget for the overall verification information */
    typeDescription = '';
    typeSource = 'overallverification';
    typeSubType = 'signinoverallverification';
    currentValue = 'We have delivered the authentication code by\nSMS to ' +
                   phoneNumber + '. Please enter the code to\ncomplete authentication';
    newOverallWidget = HDLmMod.displayFieldIOText('iotext',
                                                  typeSubType,
                                                  currentTreeNode, containerWidget,
                                                  function () {
                                                    containerWidget.displayErrorText();
                                                  },
                                                  typeDescription, currentValue, typeSubType,
                                                  function () { },
                                                  function () { },
                                                  function () { },
                                                  function () { });
    /* Add the new overall widget */
    containerWidget.addWidget(newOverallWidget, typeSource);
    /* Create a widget for the verification code */
    typeDescription = '';
    typeSource = 'verificationcode';
    typeSubType = 'signinverificationcode';
    currentValue = '';
    newVerificationWidget = HDLmMod.displayFieldIOText('iotext',
                                                       typeSubType,
                                                       currentTreeNode, containerWidget,
                                                       function () {
                                                         containerWidget.displayErrorText();
                                                       },
                                                       typeDescription, currentValue, typeSubType,
                                                       function () { },
                                                       function (newTextValue, noErrors) {
                                                         currentVerificationCode = newTextValue;
                                                       },
                                                       function () { 
                                                         let errorText = containerWidget.getErrorText();
                                                         if (errorText == '') {
                                                           let currentObj = {}; 
                                                           currentObj.verificationcode = currentVerificationCode;
                                                           let currentJson = JSON.stringify(currentObj);
                                                           /* console.log(currentJson); */
                                                           HDLmSecurity.inputDone(currentJson);
                                                         }
                                                       },
                                                       function () { });
    /* Add the new verification widget */
    containerWidget.addWidget(newVerificationWidget, typeSource);   
    /* Prompt for the verification code */
    HDLmSecurity.renderWidget(containerWidget);
  } 
  /* Get some user information by passing a request to the server */
  static adminGetUserServer(userName) {
    /* Get the name of the server used to handle some requests */
    let serverName = HDLmConfigInfo.getServerName();
    let userPoolId = HDLmConfigInfo.getUserPoolId();
    let invokeApiStr = HDLmDefines.getString('HDLMINVOKEAPI');
    let apiName = HDLmDefines.getString('HDLMAPIGETUSER');
    let urlStr = 'https://' + serverName + '/' + invokeApiStr + '?' + 'Name=' + apiName;
    /* Pass some JSON with the API request */ 
    let apiJson = HDLmSecurity.getJsonGetUser(userPoolId, userName);
    /* Invoke the server and return the promise to the caller */
    let apiPromise; 
    /* Use the fetch API */ 
    let apiHeaders = [];
    apiPromise = fetch(urlStr, { 
                                  credentials: "include", 
                                  "method": "POST",
                                  "headers": apiHeaders,
                                  "body": apiJson
    });
    /* Return the promise to the caller */
    /* console.log(apiPromise); */
    /* console.log(typeof (apiPromise)); */
    return apiPromise;
  }
  /* Set a new / permanent password by passing a request to the server */
  static adminSetPasswordServer(userNameStr, passwordStr) {
    /* Get the name of the server used to handle some requests */
    let serverName = HDLmConfigInfo.getServerName();
    let userPoolId = HDLmConfigInfo.getUserPoolId();
    let invokeApiStr = HDLmDefines.getString('HDLMINVOKEAPI');
    let apiName = HDLmDefines.getString('HDLMAPISETPASSWORD');
    let urlStr = 'https://' + serverName + '/' + invokeApiStr + '?' + 'Name=' + apiName;
    /* Pass some JSON with the API request */ 
    let apiJson = HDLmSecurity.getJsonSetPassword(userPoolId, userNameStr, passwordStr);
    /* Invoke the server and return the promise to the caller */
    let apiPromise; 
    /* Use the fetch API */ 
    let apiHeaders = [];
    apiPromise = fetch(urlStr, { 
                                  credentials: "include", 
                                  "method": "POST",
                                  "headers": apiHeaders,
                                  "body": apiJson
    });
    /* Return the promise to the caller */
    /* console.log(apiPromise); */
    /* console.log(typeof (apiPromise)); */
    return apiPromise;
  }
  /* Check the last time the user name / password and verification 
     code were actually checked. This routine sends a request to the
     server that determines if the user name / password UI is needed 
     or not. */
  static checkLasttimeServer(userName) {
    /* Get the name of the server used to handle some requests */
    let serverName = HDLmConfigInfo.getServerName();
    let invokeApiStr = HDLmDefines.getString('HDLMINVOKEAPI');
    let apiName = HDLmDefines.getString('HDLMAPICHECKLASTTIME');
    let urlStr = 'https://' + serverName + '/' + invokeApiStr + '?' + 'Name=' + apiName;
    /* Pass some JSON with the API request */ 
    let apiJson = HDLmSecurity.getJsonLastTime(userName);
    /* Invoke the server and return the promise to the caller */
    let apiPromise; 
    /* Use the fetch API */ 
    let apiHeaders = [];
    apiPromise = fetch(urlStr, { 
                                 credentials: "include", 
                                 "method": "POST",
                                 "headers": apiHeaders,
                                 "body": apiJson
    });
    /* Return the promise to the caller */
    /* console.log(apiPromise); */
    /* console.log(typeof (apiPromise)); */
    return apiPromise;
  }
  /* Check the user name and password that the user entered. The user
     name and password might be right or they might be wrong. The 
     actual checking is done remotely. This routine returns a promise
     that is eventually resolved. The response text for the promise
     shows if the user name and password were correct or not. */
  static checkUsernamePassword(userName, passwordStr) {
    /* Get some values needed to invoke the AWS Cognito API */
    let awsCognitoHostName = HDLmConfigInfo.getAwsCognitoHost();
    let clientId = HDLmConfigInfo.getUserPoolId();
    let clientAppId = HDLmConfigInfo.getUserPoolClientAppId();
    let apiJson = HDLmSecurity.getJsonInitiateAuth(clientAppId, userName, passwordStr);
    let apiJsonLen = apiJson.length;
    let apiHeaders = HDLmSecurity.getHeadersInitiateAuth(awsCognitoHostName, apiJsonLen);
    let apiPromise;
    /* Invoke the Cognito API and return the promise to the caller */
    apiPromise = HDLmSecurity.invokeCognitoApi(apiHeaders, apiJson);
    return apiPromise;
  }
  /* Check the user name and password that the user entered. The user
     name and password might be right or they might be wrong. The 
     actual checking is done remotely by our server. This routine 
     returns a promise that is eventually resolved. The response 
     text for the promise shows if the user name and password were 
     correct or not. */
  static checkUsernamePasswordServer(userName, passwordStr) {
    /* Get the name of the server used to handle some requests */
    let serverName = HDLmConfigInfo.getServerName(); 
    let invokeApiStr = HDLmDefines.getString('HDLMINVOKEAPI');
    let apiName = HDLmDefines.getString('HDLMAPICHECKUSERNAMEPASSWORD');
    let urlStr = 'https://' + serverName + '/' + invokeApiStr + '?' + 'Name=' + apiName;
    /* Pass some JSON with the API request */
    let clientAppId = HDLmConfigInfo.getUserPoolClientAppId();
    let apiJson = HDLmSecurity.getJsonInitiateAuth(clientAppId,  
                                                   userName,
                                                   passwordStr);
    let apiJsonLen = apiJson.length;
    /* Invoke the Cognito API (using the server) and return 
       the promise to the caller */
    let apiPromise;
    /* The callers passes the headers and the JSON */
    /* Use the fetch API */ 
    let awsCognitoHostName = HDLmConfigInfo.getAwsCognitoHost();
    let apiHeaders = HDLmSecurity.getHeadersInitiateAuth(awsCognitoHostName, apiJsonLen); 
    /* console.log(apiHeaders); */  
    /* console.log(apiJson); */
    /* Testing has shows that the headers passed below are not 
       really needed. The method and body are absolutely needed. */
    /* console.log(urlStr); */
    /* console.log(apiHeaders); */
    /* console.log(apiJson); */
    apiPromise = fetch(urlStr, { 
                                 credentials: "include",
                                 "method": "POST",
                                 "headers": apiHeaders,
                                 "body": apiJson
                               });
    /* Return the promise to the caller */
    /* console.log(apiPromise); */
    /* console.log(typeof (apiPromise)); */
    return apiPromise;
  }
  /* Check the verification code that the user entered. The user
     verification code might be right or it might be wrong. The
     actual checking is done remotely. This routine returns a promise
     that is eventually resolved. The response text for the promise
     shows if the verification code was correct or not. */
  static checkVerificationCode(challengeName, userName, verificationCode, session) {
    /* Get some values needed to invoke the AWS Cognito API */
    let awsCognitoHostName = HDLmConfigInfo.getAwsCognitoHost();
    let clientAppId = HDLmConfigInfo.getUserPoolClientAppId();
    let apiJson = HDLmSecurity.getJsonRespondToChallenge(clientAppId, challengeName, userName, verificationCode, session);
    let apiJsonLen = apiJson.length;
    let apiHeaders = HDLmSecurity.getHeadersRespondToChallenge(awsCognitoHostName, apiJsonLen);
    let apiPromise;
    /* Invoke the Cognito API and return the promise to the caller */
    apiPromise = HDLmSecurity.invokeCognitoApi(apiHeaders, apiJson);
    return apiPromise;
  }
  /* Check the verification code that the user entered. The user
     verification code might be right or it might be wrong. The
     actual checking is done remotely by our server. This routine
     returns a promise that is eventually resolved. The response text 
     for the promise shows if the verification code was correct or not. */
  static checkVerificationCodeServer(challengeName, userName, verificationCode, session) {
    /* Get the name of the server used to handle some requests */
    let serverName = HDLmConfigInfo.getServerName(); 
    let invokeApiStr = HDLmDefines.getString('HDLMINVOKEAPI');
    let apiName = HDLmDefines.getString('HDLMAPIVERIFYCODE');
    let urlStr = 'https://' + serverName + '/' + invokeApiStr + '?' + 'Name=' + apiName;
    /* Pass some JSON with the API request */
    let clientAppId = HDLmConfigInfo.getUserPoolClientAppId();
    let apiJson = HDLmSecurity.getJsonRespondToChallenge(clientAppId, challengeName, userName, verificationCode, session);
    let apiJsonLen = apiJson.length;
    /* Invoke the Cognito API (using the server) and return 
       the promise to the caller */
    let apiPromise;
    /* The callers passes the headers and the JSON */
    /* Use the fetch API */ 
    let awsCognitoHostName = HDLmConfigInfo.getAwsCognitoHost();
    let apiHeaders = HDLmSecurity.getHeadersRespondToChallenge(awsCognitoHostName, apiJsonLen);
    apiPromise = fetch(urlStr, {
                                 credentials: "include",
                                 "method": "POST",
                                 "headers": apiHeaders,
                                 "body": apiJson
                               });
    /* Return the promise to the caller */
    return apiPromise;
  }
  /* Get some attibutes for the current user, using the Cognito network
     API. These attributes are obtained by making a network API call. 
     This routine is not really used. The needed attributes are really
     obtained from the ID token that comes back from the verification 
     call. */
  static getAttributes(accessToken) {
    /* Get some values needed to invoke the AWS Cognito API */
    let awsCognitoHostName = HDLmConfigInfo.getAwsCognitoHost();
    let apiJson = HDLmSecurity.getJsonGetAttributes(accessToken);
    let apiJsonLen = apiJson.length;
    let apiHeaders = HDLmSecurity.getHeadersGetAttributes(awsCognitoHostName, apiJsonLen);
    let apiPromise;
    /* Invoke the Cognito API and return the promise to the caller */
    apiPromise = HDLmSecurity.invokeCognitoApi(apiHeaders, apiJson);
    return apiPromise;
  }
  /* This is the high-level routine that displays the prompts for
     the username and password */
  static getAuthentication() {   
    /* console.log('In getAuthentication()'); */ 
    let currentPromise;
    let currentRejectFunction;
    let currentResolveFunction; 
    let finishPromise;
    let finishRejectFunction;
    let finishResolveFunction; 
    /* Create the promise that is returned to the caller */
    finishPromise = new Promise(function (resolve, reject) {
      /* Save references to the reject and resolve functions */
      finishRejectFunction = reject;
      finishResolveFunction = resolve;
    });
    /* Get all of the authentication information */
    HDLmSecurity.nextStage(HDLmAuthenticationStageTypes.showUsernamePasswordUi, 
                           finishResolveFunction,
                           '',
                           '',
                           '',
                           '',
                           null,
                           null,
                           null);
    /* Return the promise created above to the caller */
    return finishPromise;
  }
  /* Get a set of headers for a get attributes request.
     The headers are built and returned as an object. */
  static getHeadersGetAttributes(hostNameStr, contentLength) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build the standard headers and add them to the headers object */
    let standardHeaders = HDLmSecurity.getHeadersStandard(hostNameStr, contentLength);
    headersObj = Object.assign(headersObj, standardHeaders);
    /* Build a X-Amz-Target header and add it to the headers object */
    let targetValue = HDLmConfigInfo.getAwsCognitoApiGetUser();
    let targetHeader = HDLmHtml.buildXAmzTargetHeader(targetValue);
    headersObj = Object.assign(headersObj, targetHeader);
    /* Return the headers object to the caller */
    return headersObj;
  }
  /* Get a set of headers for an initiate authentication request.
     The headers are built and returned as an object. */
  static getHeadersInitiateAuth(hostNameStr, contentLength) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build the standard headers and add them to the headers object */
    let standardHeaders = HDLmSecurity.getHeadersStandard(hostNameStr, contentLength);
    headersObj = Object.assign(headersObj, standardHeaders);
    /* Build a X-Amz-Target header and add it to the headers object */
    let targetValue = HDLmConfigInfo.getAwsCognitoApiInitiateAuth();
    let targetHeader = HDLmHtml.buildXAmzTargetHeader(targetValue);
    headersObj = Object.assign(headersObj, targetHeader);
    /* Return the headers object to the caller */
    return headersObj;
  }
  /* Get a set of headers for a response to challenge request.
     The headers are built and returned as an object. */
  static getHeadersRespondToChallenge(hostNameStr, contentLength) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build the standard headers and add them to the headers object */
    let standardHeaders = HDLmSecurity.getHeadersStandard(hostNameStr, contentLength);
    headersObj = Object.assign(headersObj, standardHeaders);
    /* Build a X-Amz-Target header and add it to the headers object */
    let targetValue = HDLmConfigInfo.getAwsCognitoApiRespondToAuthChallenge();
    let targetHeader = HDLmHtml.buildXAmzTargetHeader(targetValue);
    headersObj = Object.assign(headersObj, targetHeader);
    /* Return the headers object to the caller */
    return headersObj;
  }
  /* Get a set of standard headers for any AWS Cognito request. 
     The headers are built and returned as an object. */
  static getHeadersStandard(hostNameStr, contentLength) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build a host name header and add it to headers object */
    let hostHeader = HDLmHtml.buildHostHeader(hostNameStr);
    headersObj = Object.assign(headersObj, hostHeader);
    /* Build an accept encoding header and add it to the headers object */
    let acceptValue = HDLmConfigInfo.getAwsCognitoAcceptEncoding();
    let acceptHeader = HDLmHtml.buildAcceptEncodingHeader(acceptValue);
    headersObj = Object.assign(headersObj, acceptHeader);
    /* Build a content type header and add it to the headers object */
    let contentValue = HDLmConfigInfo.getAwsCognitoContentType();
    let contentHeader = HDLmHtml.buildContentTypeHeader(contentValue)
    headersObj = Object.assign(headersObj, contentHeader);
    /* Build a user agent header and add it to the headers object */
    let userAgentValue = HDLmConfigInfo.getAwsCognitoUserAgent();
    let userAgentHeader = HDLmHtml.buildUserAgentHeader(userAgentValue);
    headersObj = Object.assign(headersObj, userAgentHeader);
    /* Build an Amazon SDK invocation Id header and add it to the headers object */
    let uuidStr = HDLmUtility.getUuidStr();
    let uuidHeader = HDLmHtml.buildAmzSdkInvocationIdHeader(uuidStr);
    headersObj = Object.assign(headersObj, uuidHeader);
    /* Build an Amazon SDK request header and add it to the headers object */
    let requestHeader = HDLmHtml.buildAmzSdkRequestHeader(1);
    headersObj = Object.assign(headersObj, requestHeader);
    /* Build a content length header and add it to the headers object */
    let lengthHeader = HDLmHtml.buildContentLengthHeader(contentLength);
    headersObj = Object.assign(headersObj, lengthHeader);
    /* Return the headers object to the caller */
    return headersObj;
  }
  /* Get some JSON for a get attributes request */
  static getJsonGetAttributes(accessToken) {
    /* Build the initially empty get attributes object */
    let getObj = {};
    /* Set a few values in the get attributes object */
    getObj.AccessToken = accessToken; 
    /* Convert the get attributes object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* Get some JSON for an admin get user request */
  static getJsonGetUser(userPoolId, userName) {
    /* Build the initially empty get user object */
    let getObj = {};
    /* Set a few values in the get user object */
    getObj.UserPoolId = userPoolId; 
    getObj.UserName = userName;
    /* Convert the get user object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    /* console.log(outJson); */
    return outJson
  }
  /* Get some JSON for an initiate authentication request */
  static getJsonInitiateAuth(clientId, userName, passwordStr) {
    /* Build the initially empty authentication object */
    let authObj = {};
    /* Build the initially empty parameters object */
    let parmObj = {};
    /* Set a few values in the parameters object */
    parmObj.USERNAME = userName;
    parmObj.PASSWORD = passwordStr;
    /* Build the initially empty client metadata object */
    let clientObj = {};
    /* Set a few values in the client metadata object */
    clientObj.username = userName;
    clientObj.password = passwordStr;
    /* Set a few values in the authentication object */
    authObj.ClientId = clientId;
    authObj.AuthFlow = 'USER_PASSWORD_AUTH';
    authObj.AuthParameters = parmObj;
    authObj.ClientMetadata = clientObj;
    /* Convert the authentication object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(authObj);
    return outJson
  }
  /* Get some JSON for a check last time request */
  static getJsonLastTime(userName) {
    /* Build the initially empty check last time object */
    let checkObj = {}; 
    /* Set a few values in the check last time object */
    checkObj.Username = userName;
    /* Convert the check last time object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(checkObj);
    return outJson
  }
  /* Get some JSON for a response to challenge request */
  static getJsonRespondToChallenge(clientId, challengeName, userName, verificationCode, session) {
    /* Build the initially empty response to challenge object */
    let respondObj = {};
    /* Build the initially empty challenge responses object */
    let challengeObj = {};
    /* Set a few values in the parameters object */
    challengeObj.SMS_MFA_CODE = verificationCode;
    challengeObj.USERNAME = userName;
    /* Build the initially empty client metadata object */
    let clientObj = {};
    /* Set a few values in the client metadata object */
    clientObj.sms_mfa_code = verificationCode;
    clientObj.username = userName;
    /* Set a few values in the authentication object */
    respondObj.ClientId = clientId;
    respondObj.ChallengeName = challengeName;
    respondObj.Session = session;
    respondObj.ChallengeResponses = challengeObj;
    respondObj.ClientMetadata = clientObj;
    /* Convert the response to challenge object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(respondObj);
    return outJson
  }
  /* Get some JSON for a set last time request */
  static getJsonSetLastTime(userName) {
    /* Build the initially empty set last time object */
    let setObj = {};
    /* Set a value in the set last time object */
    setObj.UserName = userName;
    /* Convert the set last time object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(setObj);
    /* console.log(outJson); */
    return outJson
  }
  /* Get some JSON for an admin set password request */
  static getJsonSetPassword(userPoolId, userNameStr, passwordStr) {
    /* Build the initially empty admin set password object */
    let setObj = {};
    /* Set a few values in the admin set password object */
    setObj.UserPoolId = userPoolId; 
    setObj.UserName = userNameStr;
    setObj.Password = passwordStr;
    /* console.log(setObj); */
    /* Convert the admin set password object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(setObj);
    /* console.log(outJson); */
    return outJson
  }
  /* This routine returns the current password value. This value may or
     may not be null. */
  static getPassword() {
    return HDLmSecurity.finalPassword;
  }
  /* This routine returns the current scope value. This value may or
     may not be null. */
  static getScope() {
    return HDLmSecurity.finalScopeValue;
  }
  /* This routine returns the current user name value. This value may or
     may not be null. */
  static getUserName() {
    return HDLmSecurity.finalUserName;
  }
  /* Invoke an AWS Cognito API. This routine invokes an AWS Cognito API 
     and returns a promise to the caller. Eventually, the promise is 
     either resolved or rejected. If the promise is resolved, the response
     text shows the resolution. */
  static invokeCognitoApi(apiHeaders, apiJson) {
    /* Declare a few variables for use below */
    let userPromise;
    let urlStr;
    /* Get the AWS Cognito domain name */
    let cognitoDomain = HDLmConfigInfo.getAwsCognitoHost();
    /* Build the URL string for use below */
    let protocol = 'https';
    urlStr = protocol + '://' + cognitoDomain;
    /* The callers passes the headers and the JSON */
    /* Use the fetch API */
    /* console.log(urlStr); */
    /* console.log(apiHeaders); */
    /* console.log(apiJson); */
    userPromise = fetch(urlStr, {
                                  "method": "POST",
                                  "headers": apiHeaders,
                                  "body": apiJson
                                });
    /* Return the promise to the caller */
    return userPromise;
  }
  /* The input done function is invoked (called) when the user
     has provided the needed input using the UI. This function 
     is static and is always invoked. However, a variable 
     associated with this JavaScript file is used to locate 
     the function called by this routine. */
  static inputDone(clickJson) {
    let currentResolveFunction = HDLmSecurity.currentResolveFunction;
    currentResolveFunction(clickJson);
  }
  /* This function runs the next stage of authenticaion processing. 
     The next stage is determined by many things, not the least of
     which is whether the prior stage worked or not. Note that this
     routine is highly recursive and calls itself to wait in many
     cases. */ 
  static nextStage(stage, finishResolveFunction, userName, 
                   password, verificationCode, phoneNumber, 
                   challengeName, sessionValue, responsePromise) {
    /* Declare a few variables */ 
    /* Handle the next stage of authentication processing. The next
       stage is always determined by the caller. */
    /* console.log('In HDLmSecurity.nextStage'); */
    /* console.trace(); */
    /* console.log(stage); */ 
    switch (stage) {
      /* This type of processing is used to get some user
         information from the server. This information is
         checked to determine if we need to prompt for a
         new / permanent password. */
      case HDLmAuthenticationStageTypes.adminGetUser: {
        /* console.log('In HDLmSecurity.nextStage.adminGetUser'); */
        let currentPromise = HDLmSecurity.adminGetUserServer(userName); 
        /* Wait for the promise to resolve. When it does resolve, invoke the 
           next stage. This type of promise (associated with the Cognito
           API resolves with an object. Very strange to say the least. */
        currentPromise.then(function (responseObj) {
          let stageEnum;
          /* console.log('In HDLmSecurity.nextStage 3'); */
          /* Try to get the error message from the response (if any) */
          let errorMessage = responseObj.headers.get('x-amzn-ErrorMessage');
          /* console.log(errorMessage); */
          /* console.log(typeof responseObj); */
          /* console.log(responseObj); */
          if (errorMessage != null) {
            HDLmUtility.setErrorText(errorMessage);
            stageEnum = HDLmAuthenticationStageTypes.retryUsernamePassword;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName,
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
          /* If no error message was returned, then we move onto the next stage
             in the authentication process */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            responsePromise = responseReader.read();
            stageEnum = HDLmAuthenticationStageTypes.responsePromiseAdminGetUser;
            /* console.log('In HDLmSecurity.nextStage.adminGetUser', stageEnum); */
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Admin get user failure', 14, error);
        });
        break;
      }
      /* This type of processing is used to set a new / permanent 
         password for a user. This is done by passing a request to
         the server. */
      case HDLmAuthenticationStageTypes.adminSetPassword: {
        /* console.log('In HDLmSecurity.nextStage.adminSetPassword'); */
        let currentPromise = HDLmSecurity.adminSetPasswordServer(userName, password); 
        /* Wait for the promise to resolve. When it does resolve, invoke the 
           next stage. This type of promise (associated with the Cognito
           API resolves with an object. Very strange to say the least. */
        currentPromise.then(function (responseObj) {
          let stageEnum;
          /* console.log('In HDLmSecurity.nextStage 3'); */
          /* Try to get the error message from the response (if any) */
          let errorMessage = responseObj.headers.get('x-amzn-ErrorMessage');
          /* console.log(errorMessage); */
          /* console.log(typeof responseObj); */
          /* console.log(responseObj); */
          if (errorMessage != null) {
            HDLmUtility.setErrorText(errorMessage);
            stageEnum = HDLmAuthenticationStageTypes.retryUsernamePassword;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
          /* If no error message was returned, then we move onto the next stage
             in the authentication process. Actually, we try to get the session 
             at this point. */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            responsePromise = responseReader.read();
            stageEnum = HDLmAuthenticationStageTypes.responsePromiseAdminSetPassword;
            /* console.log('In HDLmSecurity.nextStage.adminSetPassword', stageEnum); */
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber,
                                   challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Admin set password failure', 14, error);
        });
        break;
      }
      /* This type of processing is used to determine if we need
         to prompt for a user name / password and a verification 
         code. In some cases, the prompts are needed. In other
         cases, they are not needed. */
      case HDLmAuthenticationStageTypes.checkLasttime: {
        /* Check the last time the user name / password and verification
           code were actually checked using a network request */
        let currentPromise = HDLmSecurity.checkLasttimeServer(userName);
        /* console.log('In HDLmSecurity.nextStage', userName); */
        currentPromise.then(function (responseObj) {
          /* console.log('In HDLmSecurity.nextStage', responseObj); */
          let stageEnum;
          /* Try to get the error message from the response (if any) */
          let errorMessage = responseObj.headers.get('x-amzn-ErrorMessage');
          /* console.log(responseObj); */
          /* console.log('In HDLmSecurity.nextStage', errorMessage); */
          if (errorMessage != null) {
            stageEnum = HDLmAuthenticationStageTypes.showVerificationCodeUi;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName,
                                   password, verificationCode, phoneNumber,
                                   challengeName, sessionValue, responsePromise);
          }
          /* If no error message was returned, then we are done with authentication
             processing */
          else {
            /* Run the final stage of processing */
            let stageEnum = HDLmAuthenticationStageTypes.finalStageProcessing;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName,
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Check last time failure', 14, error);
        });
        break;
      }
      /* Handle the check user name and password case. This stage
         uses the AWS Cognito API (via a network) to check a 
         user name and password. */
      case HDLmAuthenticationStageTypes.checkUsernamePassword: {
        /* Check the user name and password using a network request */
        /* console.log('In HDLmSecurity.nextStage 1'); */
        /* console.log(userName, password); */
        let currentPromise = HDLmSecurity.checkUsernamePasswordServer(userName, password);
        /* console.log('In HDLmSecurity.nextStage 2'); */
        /* Wait for the promise to resolve. When it does resolve, invoke the 
           next stage. This type of promise (associated with the Cognito
           API resolves with an object. Very strange to say the least. */
        currentPromise.then(function (responseObj) {
          let stageEnum;
          /* console.log('In HDLmSecurity.nextStage 3'); */
          /* Try to get the error message from the response (if any) */
          let errorMessage = responseObj.headers.get('x-amzn-ErrorMessage'); 
          /* let abcStr = JSON.stringify(responseObj); */
          /* console.log(abcStr); */
          /* console.log(errorMessage); */
          /* console.log(responseObj); */
          /* console.log(responseObj.headers); */
          /* console.log('abc'); */
          /* console.log(...responseObj.headers); */
          /* console.log('def'); */
          /* console.log(responseObj.body); */
          /* console.log(responseObj.bodyUsed); */
          /* console.log(responseObj.body.getReader(); */ 
          /* Check if we obtained a response error message */
          if (errorMessage != null) {
            HDLmUtility.setErrorText(errorMessage);
            stageEnum = HDLmAuthenticationStageTypes.retryUsernamePassword;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName,
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
          /* If no error message was returned, then we move onto the next stage
             in the authentication process. Actually, we try to get the session 
             at this point. */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            let responsePromise = responseReader.read();
            stageEnum = HDLmAuthenticationStageTypes.responsePromiseUsernamePassword;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Check username password failure', 14, error);
        });
        break;
      }
      /* Handle the check verification code case. This stage
         uses the AWS Cognito API (via a network) to check a 
         verification code. */
      case HDLmAuthenticationStageTypes.checkVerificationCode: {
        /* Get some values from the values passed by the caller */
        let currentSession = sessionValue;
        let currentChallengeName = challengeName;
        /* Check the verification code using a network request */
        let currentPromise = HDLmSecurity.checkVerificationCodeServer(currentChallengeName, 
                                                                      userName, 
                                                                      verificationCode, 
                                                                      currentSession); 
        /* Wait for the promise to resolve. When it does resolve, invoke the 
           next stage. This type of promise (associated with the Cognito
           API resolves with an object. Very strange to say the least. */
        currentPromise.then(function (responseObj) {
          let stageEnum;
          /* Try to get the error message from the response (if any) */
          let errorMessage = responseObj.headers.get('x-amzn-ErrorMessage');
          /* console.log(errorMessage); */
          /* Check if we obtained a response error message */
          if (errorMessage != null) {
            HDLmUtility.setErrorText(errorMessage);
            stageEnum = HDLmAuthenticationStageTypes.retryVerificationCode;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            responsePromise = responseReader.read();
            stageEnum = HDLmAuthenticationStageTypes.responsePromiseVerificationCode;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Check verification code failure', 14, error);
        });
        break;
      }
      /* We now have a valid user name and password and can finish 
         authentication */
      case HDLmAuthenticationStageTypes.finalStageProcessing: {
        finishResolveFunction('');
        break;
      }
      /* Handle the get attributes case. This stage uses 
         the AWS Cognito API (via a network) to get a set
         of user attributes. */  
      case HDLmAuthenticationStageTypes.getAttributes: {
        /* Get some values from the prior response JSON */
        let responseObj = JSON.parse(responseJson);
        let authenticationResults = responseObj.AuthenticationResult;
        let accessToken = authenticationResults.AccessToken;
        /* Get the ID token from the authentication results */
        let idToken = authenticationResults.IdToken;
        let idTokenPart = idToken.split('.')[1];
        /* Get the custom scope attribute from the ID token */
        let idTokenJson = atob(idTokenPart);
        let idTokenObj = JSON.parse(idTokenJson);
        let scopeValue = idTokenObj['custom:Scope'];
        HDLmSecurity.finalScopeValue = scopeValue;
        /* Get some attributes using a network request */
        let currentPromise = HDLmSecurity.getAttributes(accessToken);
        /* Wait for the promise to resolve. When it does resolve, invoke the 
           next stage. This type of promise (associated with the Cognito
           API resolves with an object. Very strange to say the least. */
        currentPromise.then(function (responseObj) {
          let stageEnum;
          /* Try to get the error message from the response (if any) */
          let errorMessage = responseObj.headers.get('x-amzn-ErrorMessage');
          /* console.log(errorMessage); */
          /* Check if we obtained a response error message */
          if (errorMessage != null) {
            HDLmUtility.setErrorText(errorMessage);
            stageEnum = HDLmAuthenticationStageTypes.retryVerificationCode;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            responsePromise = responseReader.read();
            stageEnum = HDLmAuthenticationStageTypes.responsePromiseGetAttributes;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Get attributes failure', 14, error);
        });
        break;
      }
      /* Use the user information to determine if a new / permanent password 
         is needed */
      case HDLmAuthenticationStageTypes.responsePromiseAdminGetUser: {
        /* Wait for the promise to resolve. When it does resolve, invoke 
           the next stage. */
        responsePromise.then(function (responseObj) {
          /* console.log(responseObj); */
          let responseValue = responseObj.value;
          let responseJson = new TextDecoder().decode(responseValue);
          /* console.log(responseJson); */
          /* console.log(responseObj); */
          /* console.log(typeof responseObj); */
          responseObj = JSON.parse(responseJson);
          let userStatus = responseObj.UserStatus;
          /* console.log(userStatus); */
          let stageEnum;
          /* In a very specific case, we need to get a new / permanent password */      
          if (userStatus == 'FORCE_CHANGE_PASSWORD') {  
            stageEnum = HDLmAuthenticationStageTypes.showNewPasswordUi; 
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
          /* Use the network to get some user information */
          else {
            stageEnum = HDLmAuthenticationStageTypes.checkLasttime;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Admin get user promise failure', 14, error);
        });
        break;
      }
      /* Set a new / permanent password by sending 
         a request to the server */  
      case HDLmAuthenticationStageTypes.responsePromiseAdminSetPassword: {
        /* Wait for the promise to resolve. When it does resolve, invoke 
           the next stage. */
        responsePromise.then(function (responseObj) {
          /* console.log(responseObj); */
          let responseValue = responseObj.value;
          let responseJson = new TextDecoder().decode(responseValue);
          /* console.log(responseJson); */
          /* console.log(responseObj); */ 
          /* console.log(typeof responseObj); */  
          responseObj = JSON.parse(responseJson);
          /* console.log(responseObj); */
          let stageEnum;
          let errorMessage = null;
          /* Try to get the error message from the response (if any) */
          if (responseObj.hasOwnProperty('headers')) {
            let responseHeaders = responseObj.headers;
            errorMessage = responseHeaders.get('x-amzn-ErrorMessage');
          }
          /* console.log(errorMessage); */
          /* console.log(typeof responseObj); */
          /* console.log(responseObj); */
          if (errorMessage != null) {
            HDLmUtility.setErrorText(errorMessage);
            stageEnum = HDLmAuthenticationStageTypes.retryUsernamePassword;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName,
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
          /* Set the last time value for the current user */
          else {
            /* Set the last time value for the current user */
            let stageEnum = HDLmAuthenticationStageTypes.setLasttime;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Admin set password promise failure', 14, error);
        });
        break;
      }
      /* Use the get attributes response promise to get some data */
      case HDLmAuthenticationStageTypes.responsePromiseGetAttributes: {
        /* Wait for the promise to resolve. When it does resolve, invoke 
           the next stage. */
        responsePromise.then(function (responseObj) {
          /* console.log(responseObj); */
          let responseValue = responseObj.value;
          let responseDone = responseObj.done;
          responseJson = new TextDecoder().decode(responseValue);
          /* console.log(responseJson); */
          let userAttributes = newResponseObj.UserAttributes;
          /* Run the final stage of processing */
          let stageEnum = HDLmAuthenticationStageTypes.finalStageProcessing;
          HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                 password, verificationCode, phoneNumber, 
                                 challengeName, sessionValue, responsePromise);
        }, function (error) {
          HDLmError.buildError('Error', 'Get attributes promise failure', 14, error);
        });
        break;
      }  
      /* Set the last time value by sending a request 
         to the server */  
      case HDLmAuthenticationStageTypes.responsePromiseSetLasttime: {
        /* Wait for the promise to resolve. When it does resolve, invoke 
           the next stage. */
        responsePromise.then(function (responseObj) {
          /* console.log(responseObj); */
          let responseValue = responseObj.value;
          let responseJson = new TextDecoder().decode(responseValue);
          /* console.log(responseJson, responseJson.length); */
          /* console.log(responseObj); */
          /* console.log(typeof responseObj); */  
          responseObj = JSON.parse(responseJson);
          /* console.log(responseObj); */
          let stageEnum;
          let errorMessage = null;
          /* Try to get the error message from the response (if any) */
          if (responseObj.hasOwnProperty('headers')) {
            let responseHeaders = responseObj.headers;
            errorMessage = responseHeaders.get('x-amzn-ErrorMessage');
          }
          /* console.log(errorMessage); */
          /* console.log(typeof responseObj); */
          /* console.log(responseObj); */
          if (errorMessage != null) {
            HDLmUtility.setErrorText(errorMessage);
            stageEnum = HDLmAuthenticationStageTypes.retryUsernamePassword;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName,
                                    password, verificationCode, phoneNumber, 
                                    challengeName, sessionValue, responsePromise);
          }
          /* Run the final stage of processing */
          else {
            /* Run the final stage of processing */
            let stageEnum = HDLmAuthenticationStageTypes.finalStageProcessing;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                    password, verificationCode, phoneNumber, 
                                    challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Admin set password promise failure', 14, error);
        });
        break;
      }    
      /* Use the user name and password response promise to get some data */
      case HDLmAuthenticationStageTypes.responsePromiseUsernamePassword: {
        /* Wait for the promise to resolve. When it does resolve, invoke 
           the next stage. */
        responsePromise.then(function (responseObj) {
          /* console.log(responseObj); */
          let responseValue = responseObj.value;
          let responseDone = responseObj.done;
          let responseJson = new TextDecoder().decode(responseValue);
          /* console.log(responseJson, responseJson.length); */
          /* console.log(responseObj); */
          /* Check if we actually obtained some useful response JSON
             from the server. If we did, the we can make an object 
             from it. If we did not, then we must create an empty
             object here. */ 
          if (responseJson.length > 0) {
            responseObj = JSON.parse(responseJson);
          }
          else {
            responseObj = {};
          }
          /* console.log(responseObj); */
          /* Try to get the phone number from the response (if any) */
          if (responseObj.hasOwnProperty('ChallengeParameters')) {
            /* console.log(responseJson); */
            let challengeParameters = responseObj.ChallengeParameters;
            /* console.log(challengeParameters); */
            if (challengeParameters.hasOwnProperty('userAttributes')) {
              let userAttributesStr = challengeParameters.userAttributes;
              let userAttributesObj = JSON.parse(userAttributesStr);
              /* console.log(userAttributesObj); */
              /* console.log(typeof userAttributesObj); */
              /* console.log(userAttributesObj.hasOwnProperty('phone_number')); */
              if (userAttributesObj.hasOwnProperty('phone_number')) {
                phoneNumber = userAttributesObj.phone_number;
                /* console.log(phoneNumber); */
              }
            }
            /* Try to get the phone number from another location */
            if (challengeParameters.hasOwnProperty('CODE_DELIVERY_DESTINATION')) {   
              phoneNumber = challengeParameters.CODE_DELIVERY_DESTINATION;
              /* console.log(phoneNumber); */
            }
          }
          /* Try to get the challenge name from the response (if any) */
          if (responseObj.hasOwnProperty('ChallengeName')) {
            challengeName = responseObj.ChallengeName;
            /* console.log(challengeName); */
          }
          /* Try to get the session string from the response (if any) */
          if (responseObj.hasOwnProperty('Session')) {   
            sessionValue = responseObj.Session;
            /* console.log(sessionValue); */
          }
          /* We can now store the final user name and password values */
          HDLmSecurity.finalUserName = userName;
          HDLmSecurity.finalPassword = password;
          let stageEnum;
          /* In some very specific cases, we don't really want to continue 
             checking */      
          if (userName == 'pdschaefferisnotused' || userName == 'myzelenskyisnotused') {  
            stageEnum = HDLmAuthenticationStageTypes.finalStageProcessing; 
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName,
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
          }
          /* Use the network to get some user information */
          else {
            stageEnum = HDLmAuthenticationStageTypes.adminGetUser;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
            /*
            stageEnum = HDLmAuthenticationStageTypes.checkLasttime;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                   password, verificationCode, phoneNumber, 
                                   challengeName, sessionValue, responsePromise);
            */
          }
        }, function (error) {
          HDLmError.buildError('Error', 'User name and password promise failure', 14, error);
        });
        break;
      }
      /* Use the verification code response promise to get some data */
      case HDLmAuthenticationStageTypes.responsePromiseVerificationCode: {
        /* Wait for the promise to resolve. When it does resolve, invoke 
           the next stage. */
        responsePromise.then(function (responseObj) {
          /* console.log(responseObj); */
          let responseValue = responseObj.value;
          let responseDone = responseObj.done;
          let responseJson = new TextDecoder().decode(responseValue);
          /* console.log(responseJson); */
          responseObj = JSON.parse(responseJson);
          /* console.log(responseObj); */
          let authenticationResults = responseObj.AuthenticationResult;
          /* Get the ID token from the authentication results */
          let idToken = authenticationResults.IdToken;
          let idTokenPart = idToken.split('.')[1];
          /* Get the custom scope attribute from the ID token */
          let idTokenJson = atob(idTokenPart);
          let idTokenObj = JSON.parse(idTokenJson);
          let scopeValue = idTokenObj['custom:Scope'];
          HDLmSecurity.finalScopeValue = scopeValue;
          /* Get some attributes for the current user. Note that this
             code is commented out. */
          /* stageEnum = HDLmAuthenticationStageTypes.getAttributes; */
          /* Run the final stage of processing */
          let stageEnum = HDLmAuthenticationStageTypes.finalStageProcessing; 
          HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                 password, verificationCode, phoneNumber, 
                                 challengeName, sessionValue, responsePromise);
        }, function (error) {
          HDLmError.buildError('Error', 'Verification code promise failure', 14, error);
        });
        break;
      }
      /* We now need to retry user name and password authentication.
         This code waits for the user to click on the sign in button 
         again. */
      case HDLmAuthenticationStageTypes.retryUsernamePassword: {
        let currentRejectFunction;
        let currentResolveFunction;
        /* Create a local promise */
        let currentPromise = new Promise(function (resolve, reject) {
          /* Save references to the reject and resolve functions */
          currentRejectFunction = reject;
          currentResolveFunction = resolve;
        });
        /* Store the location of the resolve function */
        HDLmSecurity.currentResolveFunction = currentResolveFunction;
        currentPromise.then(function (responseText) {
          /* Get the user name and password from the response text.
             These values may have changed since when we first got
             them. We need to get the current values. */
          let responseObj = JSON.parse(responseText);
          userName = responseObj.username;
          password = responseObj.password;
          /* console.log(userName); */
          /* Check the user name and password again */ 
          let stageEnum;
          stageEnum = HDLmAuthenticationStageTypes.checkUsernamePassword;
          HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                 password, verificationCode, phoneNumber, 
                                 challengeName, sessionValue, responsePromise);    
        }, function (error) {
          HDLmError.buildError('Error', 'Retry username password failure', 14, error);
        });
        break;
      }
      /* We now need to retry verification code authentication. This
         code waits for the user to click on the sign in button again. */
      case HDLmAuthenticationStageTypes.retryVerificationCode: {
        let currentRejectFunction;
        let currentResolveFunction;
        /* Create a local promise */
        let currentPromise = new Promise(function (resolve, reject) {
          /* Save references to the reject and resolve functions */
          currentRejectFunction = reject;
          currentResolveFunction = resolve;
        });
        /* Store the location of the resolve function */
        HDLmSecurity.currentResolveFunction = currentResolveFunction;
        currentPromise.then(function (responseText) {
          /* Get the user name and password from the response text.
             These values may have changed since when we first got
             them. We need to get the current values. */
          let responseObj = JSON.parse(responseText);
          verificationCode = responseObj.verificationcode;
          /* Check the verification code again */
          let stageEnum;
          stageEnum = HDLmAuthenticationStageTypes.checkVerificationCode;
          HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                 password, verificationCode, phoneNumber, 
                                 challengeName, sessionValue, responsePromise);
        }, function (error) {
          HDLmError.buildError('Error', 'Retry verification code failure', 14, error);
        });
        break;
      }
      /* This type of processing is used to set the last time value  
         for a user on the server. This is done by passing a request 
         to the server. */
      case HDLmAuthenticationStageTypes.setLasttime: {
        /* console.log('In HDLmSecurity.nextStage.setLasttime'); */
        let currentPromise = HDLmSecurity.setLasttimeServer(userName); 
        /* Wait for the promise to resolve. When it does resolve, invoke the 
           next stage. */
        currentPromise.then(function (responseObj) {
          let stageEnum;
          /* console.log('In HDLmSecurity.nextStage 3'); */
          /* Try to get the error message from the response (if any) */
          let errorMessage = responseObj.headers.get('x-amzn-ErrorMessage');
          /* console.log(errorMessage); */
          /* console.log(typeof responseObj); */
          /* console.log(responseObj); */
          if (errorMessage != null) {
            HDLmUtility.setErrorText(errorMessage);
            stageEnum = HDLmAuthenticationStageTypes.retryUsernamePassword;
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                    password, verificationCode, phoneNumber, 
                                    challengeName, sessionValue, responsePromise);
          }
          /* If no error message was returned, then we move onto the next stage
              in the authentication process. Actually, we try to get the session 
              at this point. */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            responsePromise = responseReader.read();
            stageEnum = HDLmAuthenticationStageTypes.responsePromiseSetLasttime;
            /* console.log('In HDLmSecurity.nextStage.setLasttime', stageEnum); */
            HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                    password, verificationCode, phoneNumber,
                                    challengeName, sessionValue, responsePromise);
          }
        }, function (error) {
          HDLmError.buildError('Error', 'Set last time failure', 14, error);
        });
        break;
      }
      /* Display the UI used to get a new / permanent password */
      case HDLmAuthenticationStageTypes.showNewPasswordUi: {
        let currentRejectFunction;
        let currentResolveFunction;
        /* Create a local promise */
        let currentPromise = new Promise(function (resolve, reject) {
          /* Save references to the reject and resolve functions */
          currentRejectFunction = reject;
          currentResolveFunction = resolve;
        });
        /* Build the user name and password UI */
        HDLmSecurity.currentResolveFunction = currentResolveFunction;
        HDLmSecurity.buildNewPasswordUi();
        /* Wait for the promise to resolve. When it does resolve, invoke 
           the next stage. */
        currentPromise.then(function (responseText) {
          /* Get the new / permanent password from the response text */
          let responseObj = JSON.parse(responseText);
          /* console.log(responseObj); */
          password = responseObj.password;
          let stageEnum = HDLmAuthenticationStageTypes.adminSetPassword;
          HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                 password, verificationCode, phoneNumber, 
                                 challengeName, sessionValue, responsePromise);
        }, function (error) {
          HDLmError.buildError('Error', 'Show new / permanent password UI failure', 14, error);
        });
        break;
      }
      /* Handle the initial user name and password UI case */
      case HDLmAuthenticationStageTypes.showUsernamePasswordUi: {
        let currentRejectFunction;
        let currentResolveFunction;
        /* Create a local promise */
        let currentPromise = new Promise(function (resolve, reject) {
          /* Save references to the reject and resolve functions */
          currentRejectFunction = reject;
          currentResolveFunction = resolve;
        });
        /* Build the user name and password UI */
        HDLmSecurity.currentResolveFunction = currentResolveFunction;
        HDLmSecurity.buildUsernamePasswordUi();
        /* Wait for the promise to resolve. When it does resolve, invoke 
           the next stage. */
        currentPromise.then(function (responseText) {
          /* Get the user name and password from the response text.
             These are the initial user name and password values. 
             These values may be changed by the user, if the initial
             values for the user name and password are not OK. */
          let responseObj = JSON.parse(responseText);
          /* console.log(responseObj); */
          userName = responseObj.username;
          password = responseObj.password;
          /* console.log(userName); */
          let stageEnum = HDLmAuthenticationStageTypes.checkUsernamePassword;
          HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                 password, verificationCode, phoneNumber, 
                                 challengeName, sessionValue, responsePromise);
        }, function (error) {
          HDLmError.buildError('Error', 'Show username password UI failure', 14, error);
        });
        break;
      }
      /* Handle the initial verification code UI case */
      case HDLmAuthenticationStageTypes.showVerificationCodeUi: {
        /* Get the phone number that will get the verification code */
        /* console.log(responseJson); */ 
        let responseNameStr = challengeName;
        let currentRejectFunction;
        let currentResolveFunction;
        /* Check for a special case, that we really can't handle */
        /* console.log(responseNameStr); */
        if (responseNameStr === 'NEW_PASSWORD_REQUIRED') {
          let errorText = 'Permanent password required at this point';
          let errorMessage = HDLmError.buildError('Error', 'Password', 58, errorText);
          /* console.log(errorMessage); */
          HDLmUtility.setErrorText(errorText);
          break;
        }
        /* Create a local promise */
        let currentPromise = new Promise(function (resolve, reject) {
          /* Save references to the reject and resolve functions */
          currentRejectFunction = reject;
          currentResolveFunction = resolve;
        });
        /* Build the verification code */
        HDLmSecurity.currentResolveFunction = currentResolveFunction;
        HDLmSecurity.buildVerificationUi(phoneNumber);
        /* Wait for the promise to resolve. When it does resolve, invoke
           the next stage. */
        /* console.log(responseText); */
        /* console.log(phoneNumber); */
        currentPromise.then(function (responseText) {
          /* console.log(responseText); */
          /* console.log(phoneNumber); */
          /* Get the verification code from the response text.
             This is the initial verification code value. This
             value may be changed by the user, if the initial
             value for the verification code is not OK. */
          let responseObj = JSON.parse(responseText);
          verificationCode = responseObj.verificationcode;
          let stageEnum = HDLmAuthenticationStageTypes.checkVerificationCode;
          HDLmSecurity.nextStage(stageEnum, finishResolveFunction, userName, 
                                 password, verificationCode, phoneNumber, 
                                 challengeName, sessionValue, responsePromise);
        }, function (error) {
          HDLmError.buildError('Error', 'Show verification code UI failure', 14, error);
        });
        break;
      }
      /* Report an error if the current stage did not match one 
         of the expected choices */
      default: {
        /* console.log(stage); */
        /* console.log(typeof stage); */
        /* console.log(stage.toString()); */
        /* console.log(HDLmEnums); */
        /* console.log(HDLmEnums.HDLmAuthenticationStageTypes); */
        /* console.log(HDLmEnums.HDLmAuthenticationStageTypes[stage][0]); */
        let errorString = stage.toString();
        HDLmError.buildError('Error', 'Invalid stage', 56, errorString);
        break;
      }
    }
  }
  /* The function below removes both the descriptions (typically
     they are null strings, but might not be) and the values */
  static removeBoth() {
    let divFancyTree = HDLmDefines.getString('HDLMFANCYTREE');
    let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
    HDLmMod.removeMod(divFancyTree);
    HDLmMod.removeMod(divValues);
  }
  /* The function below is used to render the current
     widget. This function is actually used to render
     the current container. */
  static renderWidget(currentWidget) {
    let treeIdValue = HDLmDefines.getString('HDLMFANCYTREE');
    let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
    currentWidget.render(treeIdValue, divValues);
  }
  /* set the last time value by passing a request to the server */
  static setLastTimeServer(userName) {
    /* Get the name of the server used to handle some requests */
    let serverName = HDLmConfigInfo.getServerName();
    let invokeApiStr = HDLmDefines.getString('HDLMINVOKEAPI');
    let apiName = HDLmDefines.getString('HDLMSETLASTTIME');
    let urlStr = 'https://' + serverName + '/' + invokeApiStr + '?' + 'Name=' + apiName;
    /* Pass some JSON with the API request */ 
    let apiJson = HDLmSecurity.getJsonSetLastTime(userName);
    /* Invoke the server and return the promise to the caller */
    let apiPromise; 
    /* Use the fetch API */ 
    let apiHeaders = [];
    apiPromise = fetch(urlStr, { 
                                  credentials: "include", 
                                  "method": "POST",
                                  "headers": apiHeaders,
                                  "body": apiJson
    });
    /* Return the promise to the caller */
    /* console.log(apiPromise); */
    /* console.log(typeof (apiPromise)); */
    return apiPromise;
  }
}
/* The static button click routine in this file is always 
   invoked when a user clicks on a button. The static 
   routine uses the field below to locate the final 
   routine that should be invoked. */
HDLmSecurity.currentResolveFunction = null;
/* The final password value (a string) is stored in the
   field below */
HDLmSecurity.finalPassword = null;
/* The final scope value (what a user has access to) is
   stored in the field below */
HDLmSecurity.finalScopeValue = null;
/* The final user name value (a string) is stored in the
   field below */
HDLmSecurity.finalUserName = null;