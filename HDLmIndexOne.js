/**
 * HDLmIndexOne short summary.
 *
 * HDLmIndexOne description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmIndexOne class doesn't actually do anything. However, it
   does define a set of static methods that are used to build the
   a rule editor. No instances of this class can ever be created. */
class HDLmIndexOne {
  /* Provide the main routine  */
  static main() {  
    /* console.log('In HDLmIndexOne.main'); */
    /* console.log(window); */
    /* This routine may been invoked to edit rules or it may have 
       been invoked for some other reason. Check if the path shows 
       that what the user really wants is to edit rules. */
    let editRules = false;
    let windowlocationPathName = window.location.pathname;
    if (windowlocationPathName == '/') 
      editRules = true; 
    /* Check if the user wants to edit rules under the debbuger */
    
    if (windowlocationPathName.endsWith('index.html'))
      editRules = true;
    
    /* Check if we really want to edit rules */
    if (!editRules)
      return; 
    /* Get a JSON string with all of the authentication information
       in it. Store the all of the authentication information in a
       class variable as a set of properties. This really should be
       done inside the HDLmAuth class. However, even ES6 does not
       allow this. */
    let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
    let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
    let authPromise = HDLmAuth.getAuth(divDescriptions, divValues);
    /* console.log('In HDLmIndexOne.main'); */
    /* console.log(authPromise); */
    /* Handle the Promise used to obtain authentication information */
    authPromise.then(function (responseText) {
      let treeIdValue = HDLmDefines.getString('HDLMFANCYTREE');
      let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
      let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
      HDLmAuth.addAuth(responseText, treeIdValue, divDescriptions, divValues);
      /* Get the Promise used to obtain the defines information */
      return HDLmDefines.getDefines();
    }, function (error) {
      HDLmError.buildError('Error', 'Authentication failure', 14, error);
    /* Handle the Promise used to obtain defines information */
    }).then(function (responseText) {
      HDLmDefines.addDefines(responseText);
      /* Get the Promise used to obtain the configuration information */
      return HDLmConfig.getConfig();
    }, function (error) {
      HDLmError.buildError('Error', 'Defines failure', 14, error);
    /* Handle the Promise used to obtain configuration information */
    }).then(function (responseText) {
      HDLmConfig.addConfig(responseText);
      /*
      HDLmConfig.getConfigMissing();  
      */
      /* Get the Promise used to obtain the state information */
      return HDLmState.getState();
    }, function (error) {
      HDLmError.buildError('Error', 'Configuration failure', 14, error);
    /* Handle the Promise used to obtain state information */
    }).then(function (responseText) {
      HDLmState.addState(responseText);
      /* Get the Promise used to load the CSS styles information */
      return HDLmHtml.getCSSStyles();
    }, function (error) {
      HDLmError.buildError('Error', 'State failure', 14, error);
    /* Handle the Promise used to obtain CSS styles information */
    }).then(function (responseText) {
      /* console.log(responseText); */
      HDLmHtml.addCSSStyles(responseText);
      /* Check if we are running in the browser extension environment. 
         If this is true, then the debugger is clearly not active and 
         a browser extension window is active. */
      /* console.log(window.location.pathname); */
      if (HDLmHtml.checkBrowserExtensionEnvironment()) {
        /* console.log('HDLmHtml.checkBrowserExtensionEnvironment'); */
        /* console.log('I am here'); */
        /* console.log(HDLmHtml.checkBrowserExtensionEnvironment()); */ 
        HDLmGlobals.setActiveExtensionWindow(true);
        /* console.log(window.location.pathname); */
      }
      /* Check if we are running under a debugger. In some
         cases, we need a separate code path if we are running
         under a debugger. */
      let windowsLocationHostName = window.location.hostname;
      /* console.log('In HDLmIndexOne.main'); */
      /* console.log('windowsLocationHostName = ' + windowsLocationHostName); */ 
      /* console.log(window.location); */
      /* In the Visual Studio Code environment, the host name is an empty
         string. The host name is reset to make the code below simpler. */
      if (windowsLocationHostName == '')  
        windowsLocationHostName = 'localhost';
      /* console.log(window.location); */
      /* We may neet to set a few configuration values based on the
         server name. We may (or may not be) running in test mode. 
         We need to check for test mode and make some changes if we
         are running in test mode. */
      if (windowsLocationHostName != null      && 
          windowsLocationHostName != undefined && 
          windowsLocationHostName.indexOf('t') > 0) {
        /* console.log('setProdMode(false)'); */
        /* HDLmUtility.setProdMode(false); */
        /* console.log('setProdMode(false)'); */
        /* HDLmIndexOne.testWebSocket(); */
      }
      /* Set the server name as a configuration value. This step is 
         needed in all cases. so that all HTTP/S requests go back 
         to the server that we are running on. */
      if (HDLmGlobals.checkActiveExtensionWindow() == false)
        HDLmIndexOne.setServerName(windowsLocationHostName);
      /* console.log(windowsLocationHostName); */
      /* console.log(windowsLocationHostName.length); */
      /* This check seems to work with standard Visual Studio */
      if (windowsLocationHostName == 'localhost') 
        HDLmGlobals.setDebuggerStatus(true);
      /* This check seems to work with Visual Studio Code */
      if (windowsLocationHostName == '' && windowsLocationHostName.length == 0) 
        HDLmGlobals.setDebuggerStatus(true);  
      /* Declare a Promise used for authentication */
      let authenticationPromise;
      /* Check if we are now running under the debugger. If we are,
         then we really don't want to get and check authentication 
         information. This is also true if we are running in a
         browser extension environment. */
      /* This has been changed. We only check for the debugger for
         now. We don't check for the browser extension environment. */
      /* This has been changed yet again. We check for the browser
         extension environment and the debugger. One browser extension 
         environment actually use the authentication mechanism. This 
         browser extension allow any rule to be changed. */
      let runAuthentication = true;
      if (HDLmGlobals.checkActiveExtensionWindow() || 
          HDLmGlobals.checkDebuggerStatus()) 
        runAuthentication = false;
      if (window.location.pathname == '/HDLmHide.html')
        runAuthentication = true;
      if (runAuthentication == false) { 
        /* console.log('HDLmGlobals.checkActiveExtensionWindow()'); */
        /* console.log(HDLmGlobals.checkActiveExtensionWindow()); */
        /* console.log('HDLmGlobals.checkDebuggerStatus()'); */
        /* console.log(HDLmGlobals.checkDebuggerStatus()); */
        /* if (HDLmGlobals.checkDebuggerStatus() || true) { */
        /* Create the promise that is resolved below */
        authenticationPromise = new Promise(function (resolve, reject) {
          HDLmSecurity.finalScopeValue = "*";
          /* Resolve the promise */
          resolve("");
        }, function (error) {
          HDLmError.buildError('Error', 'Debugger bypass failure', 14, error);
        });
      }
      /* If we are not running under the debugger, we need to display
         the user name, password, and verification code, UI. */
      else {
        authenticationPromise = HDLmSecurity.getAuthentication();
      }
      return authenticationPromise;
    }, function (error) {
      HDLmError.buildError('Error', 'CSS styles failure', 14, error);
    /* Handle the Promise used for authentication */
    }).then(function (responseText) {
      /* Remove the current contents of the web page. This call cleans up
         anything left in the UI from the authentication process. */
      HDLmSecurity.removeBoth();
      /* Set the current editor type based on the current
         path value (browsers call this a path name). This
         should generally work. We use path values (browsers
         call these path names) to identify what editor should
         be invoked. */
      HDLmGlobals.setEditorType(window.location.pathname);
      /* It appears that a slash star comment acts as a blank. For example,
         you can put a slash star comment after a 'let' in JavaScript and
         before the variable name and get a valid result.

         When JavaScript is minified at least nine changes can be made:

           1. Variable names can be shortened 
           2. Comments can replaced with one (or zero) blanks
           3. Blanks (including other white space characters) can be replaced 
              with just one or zero blank characters
           4. Semicolons can be removed in most, but not all cases 
           5. Blocks (the use of {}) can be removed (in some cases) if
              the block only contained one line 
           6. Remove dead code (for example code after an if (1 == 2) statement) 
           7. Remove dead variables. A dead variable is never used and should not
              be declared. 
           8. Some functions are never used and should be removed from minified 
              JavaScript. This check needs to be done in a loop. For example, 
              imagine if C invokes B which invokes A. If C is never used and 
              removed, then B will be never used and removed. That will eventually 
              lead to A being never used and removed. The same logic applies to 
              variables.
           9. Blocks within blocks can be removed. For example, {{{{let x}}}} can
              be reduced to {let x}
           
           http://www.crockford.com/javascript/jsmin.html 
           https://developers.google.com/closure/compiler 
           http://yui.github.io/yuicompressor
           http://marijnhaverbeke.nl/uglifyjs

           Online tools

           https://www.toptal.com/developers/javascript-minifier
           https://codebeautify.org/minify-js
           https://jscompress.com/
           https://skalman.github.io/UglifyJS-online/
           https://www.minifier.org/
           https://www.digitalocean.com/community/tools/minify
           
      */
      /* console.log(window.location); */
      /* Get the system character from the routine that gets the
         system character. The system character will be 'b' (without
         the quotes) if the host system is javaproxyb.dnsalias.com.
         The system character will be 'c' (without the quotes) if
         the host system is javaproxyc.dnsalias.com. In the Virtual
         Studio test environment, the system character will be 'c'
         (without the quotes). Note that 'c' (without the quotes)
         isn't quite true. The value is forced to 'a' (without the
         quotes) below. */
      let systemCharacter = HDLmUtility.getSystemCharacter();
      systemCharacter = 'a';
      HDLmStateInfo.setEntriesSystemValues(systemCharacter);
      /* console.log('In HDLmIndexOne.main'); */
      /* The updates below were created for testing purposes. It turns
         out that these updates don't work. The ID values don't exist
         and as a consequence, these updates don't work. */
      if (1 == 2) {
        let id1 = '361dd20ea95f43758f9c46b0df551a91';
        let id2 = 'd19230b580774838b1e135f324f20427';
        let id3 = '54b6d5a08aa5460f839d67b06e543ea3';
        let data1 = '{"tooltip":"Top node of the node tree","type":"top","details":{"created":"2020-12-14T23:24:37.408Z","lastmodified":"2020-12-14T23:24:37.408Z","name":"Top","extra":"","enabled":false,"type":"top","updated":false,"passThru":false},"nodePath":["Top"]}';
        let data2 = '{"tooltip":"Companies node","type":"companies","details":{"created":"2020-12-14T23:24:37.408Z","lastmodified":"2021-01-04T18:12:28.757343100Z","countCompanies":8,"name":"Companies","extra":"","enabled":false,"type":"companies","updated":false},"nodePath":["Top","Companies"]}';
        let data3 = '{"tooltip":"Company node","type":"company","details":{"type":"company","name":"bskinz.com","created":"2021-01-05T21:42:38.150Z","lastmodified":"2021-01-05T21:42:38.150Z","passThru":false,"updated":false},"nodePath":["Top","Companies","bskinz.com"]}';
        let idArray = [];
        idArray.push(id1);
        idArray.push(id2);
        idArray.push(id3);
        let dataArray = [];
        dataArray.push(data1);
        dataArray.push(data2);
        dataArray.push(data3);
        let ajaxPromise = HDLmTree.passUpdateRows(idArray, dataArray);
        ajaxPromise.then(function (responseText) {
          /* console.log(responseText); */
        }, function (errorText) {
          /* console.log(errorText); */
        });
      }
      /* For local testing, we sometimes need to force the
         editor type. This can be done by allowing one of
         the statements below to actually execute.

         In at least one important case, we aren't really going
         to build and run an editor. We may want to build and
         run the pass-through display mechanism. */         
      /* HDLmGlobals.activeEditorType = HDLmEditorTypes.simple; */
      /* HDLmGlobals.activeEditorType = HDLmEditorTypes.popup; */
      /* HDLmGlobals.activeEditorType = HDLmEditorTypes.proxy; */
      /* HDLmGlobals.activeEditorType = HDLmEditorTypes.config; */
      /* HDLmGlobals.activeEditorType = HDLmEditorTypes.auth; */
      /* Check if we are using one of the inline editors. If we are, 
         then we need to send a message to a server to get the tree
         of modifications. */
      if (HDLmGlobals.checkForInlineEditor()) {
        /* console.log('In HDLmIndexOne.main before get modifications'); */
        let getModificationsPromise = HDLmWebSockets.getModifications();
        /* console.log('In HDLmIndexOne.main after get modifications'); */
        return getModificationsPromise;
      }
      else {
        /* console.log('In HDLmIndexOne.main before get modifications'); */
        let getModificationsPromise = HDLmMod.buildModificationTree();
        /* console.log('In HDLmIndexOne.main after get modifications'); *
        /* console.log(getModificationsPromise); */
        return getModificationsPromise;
      }
    }, function (error) {
      /* console.log('In HDLmIndexOne.main error after get modifications'); */
      HDLmError.buildError('Error', 'Authentication failure', 14, error);
    /* Handle the Promise used to load the modifications */
    }).then(function (responseText) {
      /* console.log('In HDLmIndexOne.main then after get modifications'); */
      /* console.log(responseText); */
      HDLmTree.addToTree(responseText);
      /* What needs to be done now, is a function of whether we are 
         running in the test environment or the production environment.
         Many values are actually fixed in the test environment. We can
         get these value by calling common code that will detecte the
         test environment. */
      if (HDLmGlobals.checkDebuggerStatus()) {
        /* Check if one of the inline editors is active. If one of the 
           inline editor is active, then we must set a number of values
           that may be used later. */
        if (HDLmGlobals.checkForInlineEditor()) {
          /* Since we are running in the debugger environment, we can use 
             synchronout routines to get all of the information we need */
          HDLmGlobals.nodeIdenString = HDLmPopup.buildDummyDomNodeIdentifier();
          let jsonObj = HDLmHtml.getWindowInfo();
          HDLmGlobals.windowInfoObject = jsonObj;
          let domNodeObject = HDLmPopup.buildDummyDomNodeObject();
          HDLmGlobals.domNodeObject = domNodeObject;
        }
        HDLmFancyOne.fancyTreeFunction();
        /* We must add an event listener for a couple of keyboard events.
           These keyboard events can occur when no Fancytree node is active.
           However, they must be captured and handled anyway. Of course, if
           a Fancytree node is active, we can let the Fancytree code do all
           of the works. */
        if (HDLmGlobals.checkForInlineEditor()) {
          /* console.log('HDLmIndexOne.then () callback'); */
          /* console.log('activeDebugger checkForInlineEditor true code'); */
          window.addEventListener('keydown', HDLmPopup.windowOnDown);
        }
        else {
          /* console.log('HDLmIndexOne.then () callback'); */
          /* console.log('activeDebugger checkForInlineEditor false code'); */
          window.addEventListener('keydown', HDLmIndexOne.windowOnDown);
        }
      }
      /* We are in some sort of production environment. This means that 
         we must send messages from the browser extension window to the 
         content script to get information only available to the content 
         script. Since these routines are asynchronous, we must use promises 
         to handle the responses.

         The overall goal is to force all of the asynchronous routines
         to complete before the Fancytree is started. This allows the
         Fancytree routines to use the data returned by the asynchronous
         routines as need be. */
      else {
        /* Check if any of the inline editors are active. If any of the 
           the inline editors are active, then we must set a number of 
           values that may be used later. */
        if (HDLmGlobals.checkForInlineEditor()) {
          /* console.log('In the else clause and checkforinlineEditors() passed'); */
          let currentTab;
          let getAllTabsPromise = HDLmHtml.getAllTabsPromise();
          getAllTabsPromise.then(function (response) {
            currentTab = HDLmHtml.getActiveTab(response);
            /* Send a message that will get the node identifier for the active DOM
               element as an object */
            let message = {};
            message['menuItemId'] = 'Get Node Identifier For Current Element';
            return HDLmHtml.sendMessagePromise(currentTab, message);
          }, function (error) {
            HDLmError.buildError('Error', 'GetAll failure', 14, error);
          }).then(function (response) {
            HDLmGlobals.nodeIdenString = response;
            /* Send a message that will get the active DOM element as an object */
            let message = {};
            message['menuItemId'] = 'Get Window Information';
            return HDLmHtml.sendMessagePromise(currentTab, message);
          }, function (error) {
            HDLmError.buildError('Error', 'Get node identifier failure', 14, error);
          }).then(function (response) {
            HDLmGlobals.windowInfoObject = response;
            /* Send a message that will get the active DOM element as an object */
            let message = {};
            message['menuItemId'] = 'Get JSON For Current Element';
            return HDLmHtml.sendMessagePromise(currentTab, message);
          }, function (error) {
            HDLmError.buildError('Error', 'Get window information failure', 14, error);
          }).then(function (response) {
            HDLmGlobals.domNodeObject = response;
            HDLmFancyOne.fancyTreeFunction();
            /* We must add an event listener for a couple of keyboard events.
               These keyboard events can occur when no Fancytree node is active.
               However, they must be captured and handled anyway. Of course, if
               a Fancytree node is active, we can let the Fancytree code do all
               of the works. */
            /* console.log('HDLmIndexOne.then () callback'); */
            /* console.log('checkForInlineCode true code'); */
            window.addEventListener('keydown', HDLmPopup.windowOnDown);
          }, function (error) {
            HDLmError.buildError('Error', 'Get JSON for current element failure', 14, error);
          });
        }
        /* One of the inline editors is not in use. We must use a separate 
           code path to start the Fancytree. */
        else {
          HDLmFancyOne.fancyTreeFunction();
          /* We must add an event listener for a couple of keyboard events.
             These keyboard events can occur when no Fancytree node is active.
             However, they must be captured and handled anyway. Of course, if
             a Fancytree node is active, we can let the Fancytree code do all
             of the works. */
          /* console.log('HDLmIndexOne.then () callback'); */
          /* console.log('checkForInlineCode false code'); */
          window.addEventListener('keydown', HDLmIndexOne.windowOnDown);
        }
      }
    }, function (error) {
      HDLmError.buildError('Error', 'Modifications failure', 14, error);
    });
  }
  /* Check if the server name should be stored as a configuration value.
     This is not always the case. For example, the server name is not
     stored as a configuration value when the server name is localhost. */
  static setServerName(serverName) {
    /* console.log('In HDLmIndexOne.setServerName'); */
    /* console.log('Setting server name to ' + serverName); */
    /* Check if the proposed server name starts with an invalid value */
    if (serverName == null             ||
        serverName == undefined        ||
        serverName.length == 0         ||
        serverName.startsWith('local') ||
        serverName.startsWith('Local') ||
        serverName.startsWith('127'))
      return;
    /* Store the server name as a configuration value */
    /* console.log('Setting server name to ' + serverName); */
    let configName = 'serverName';
    HDLmConfig.setValue(configName, serverName);
  }
  /* This is the test Web Socket routine */
  static testWebSocket() {
    /* console.log('In HDLmIndexOne.testWebSocket'); */
    /* console.log('getServerName ', HDLmConfigInfo.getServerName()); */
    HDLmConfig.setValue('currentEnvironment', 'test');
    HDLmConfig.setValue('serverName', 'javaproxya.dnsalias.com');    
    /* console.log('getServerName ', HDLmConfigInfo.getServerName()); */
    let upObj1 = {"type":"mod","tooltip":"Checked text modification",
                  "details":{"find":[],"changeattrsvalues":["kkkkk"],"enabled":false,
                  "pathre":false,"type":"changeattrs","parameter":1,"cssselector":"","comments":"",
                  "updated":false,"extra":"","name":"New modification name4","nodeiden":{},
                  "xpath":""},
                  "nodePath":["Top","Companies","yogaaccessories.com","Rules","example.com","example.com","New modification name4"],
                  "HDLmRequestType":"updateTreeNode","HDLmCopyElements":false,"HDLmUrlValue":""};
    let upObj2 = {"tooltip":"Style modification","type":"mod",
                  "details":{"name":"Change Add To Cart","extra":"background-color border-radius border",
                  "enabled":true,"type":"style","find":[],
                  "styles":["rgb(55,86,21); ; 0","rgb(55,86,218); 20; 0","rgb(55,86,218) ;  ;","rgb(19,91,21) ; ;","rgb(247,202,0) ;  ;","rgb(19,91,21) ; 20 ;","rgb(19,91,21) ;  ; 0","rgb(247,202,0) ; 20 ; 0"],
                  "pathre":false,"parameter":1,"cssselector":"","comments":"","updated":true,
                  "nodeiden":{"type":"id","attributes":{"innertext":"add to cart",
                  "onclick":"check_and_add(document.add);","id":"Add","tag":"button","type":"button",
                  "class":["btn","btn-default","btn-inverse","btn-addcart"]},"counts":{"id":1,"tag":29,"class":31},
                  "grandparent":{"tag":"div","innertext":"quantity","class":["addToCartBlock","sub-section"]},
                  "parent":{"tag":"div","innertext":"quantity","class":["qtybox-addcart","form-group"]}},
                  "xpath":"","pathvalue":"//.*/"},
                  "nodePath":["Top","Companies","www.yogadirect.com","Rules","example.com","example.com","Change Add To Cart"],
                  "HDLmRequestType":"updateTreeNode","HDLmCopyElements":false,
                  "HDLmUrlValue":"https://www.yogadirect.com/yoga-direct-1-4-inch-yoga-mat.html"}; 
    let addObj2 = {"tooltip":"Checked text modification","type":"mod",
                   "nodePath":["Top","Companies","www.yogadirect.com","Rules","example.com","example.com","Mod Yoga Direct 1 4 Inch Yoga Mat.Html Textchecked"],
                   "details":{"name":"Mod Yoga Direct 1 4 Inch Yoga Mat.Html Textchecked",
                   "extra":"var _cart_secure_url = \"https://www.yogadirect.com\"","enabled":true,
                   "type":"textchecked","pathvalue":"/yoga-direct-1-4-inch-yoga-mat.html","comments":"","cssselector":"",
                   "xpath":"","find":[],
                   "nodeiden":{"type":"tag",
                   "attributes":{"type":"text/javascript","tag":"script","innertext":"var _cart_secure_url"},
                   "counts":{"tag":51},
                   "parent":{"class":["listing-page","noleftbar","norightbar","qv-enabled","not-logged-in"],
                   "data-currency":"$","data-decimal":"2","tag":"body",
                   "innertext":"800-331-8233  custom"},
                   "grandparent":{"class":["no-js","win-magic","svg-magic"],"lang":"en",
                   "data-magic-ua":"chrome","data-magic-ua-ver":"122","data-magic-engine":"webkit",
                   "data-magic-engine-ver":"537.36","tag":"html","innertext":"800-331-8233  custom"}},
                   "parameter":2,"newtexts":["var _cart_secure_url = \"https://www.yogadirect.com\""]},
                   "HDLmRequestType":"addTreeNode","HDLmCopyElements":false,
                   "HDLmUrlValue":"https://www.yogadirect.com/yoga-direct-1-4-inch-yoga-mat.html"};
    let delObj2 = {"nodePath":
                   ["Top","Companies","www.yogadirect.com","Rules","example.com","example.com","Change Add To Cart"],
                   "HDLmRequestType":"deleteTreeNode","HDLmCopyElements":false,
                   "HDLmUrlValue":"https://www.yogadirect.com/yoga-direct-1-4-inch-yoga-mat.html"};     
    let delObj3 = {"nodePath":
                   ["Top","Companies","www.yogadirect.com"],
                   "HDLmRequestType":"deleteTreeNode","HDLmCopyElements":false,
                   "HDLmUrlValue":"https://www.yogadirect.com/yoga-direct-1-4-inch-yoga-mat.html"};   
    let unDoObj1 = {"HDLmRequestType":"unDo","HDLmCopyElements":false,"HDLmChangeNumber":1,
                    "HDLmUrlValue":"https://www.yogadirect.com/yoga-direct-1-4-inch-yoga-mat.html"};   
    let unDoObj2 = {"HDLmRequestType":"unDo","HDLmCopyElements":false,"HDLmChangeNumber":2,
                    "HDLmUrlValue":"https://www.yogadirect.com/yoga-direct-1-4-inch-yoga-mat.html"};  
    let xfrObj3 = {"fromSystem": "test", "toSystem": "prod", 
                   "fromDomain": "new.yogadirect.com", 
                   "fromDivision": "example.com", 
                   "fromSite": "example.com", 
                   "fromRule": "Change Add To Cart", 
                   "toDomain": "nex.yogadirect.com",
                   "HDLmRequestType":"transferSomething","HDLmCopyElements":false,
                   "HDLmUrlValue":"https://www.yogadirect.com/yoga-direct-1-4-inch-yoga-mat.html"};   
    let addStr2 = JSON.stringify(addObj2);
    let upStr1 = JSON.stringify(upObj1);
    let upStr2 = JSON.stringify(upObj2);
    let delStr3 = JSON.stringify(delObj3);
    let unDoStr1 = JSON.stringify(unDoObj1);
    let unDoStr2 = JSON.stringify(unDoObj2);
    let xfrStr3 = JSON.stringify(xfrObj3);
    /* console.log(upStr2); */ 
    HDLmWebSockets.sendCurrentRequest(xfrStr3, 'transferSomething'); 
    HDLmWebSockets.sendCurrentRequest(xfrStr3, 'transferSomething'); 
    HDLmWebSockets.sendCurrentRequest(unDoStr2, 'unDo');  
  }
  /* The routine below does all of the work needed to handle keyboard
     events when no Fancytree node is active. However, keyboard evnets
     must be captured and handled anyway. Of course, if a Fancytree node
     is active, we can let the Fancytree code do all of the needed work. */
  static windowOnDown(event) {
    /* Get the Fancytree instance and check if any node in the Fancytree
       has focus. If a Fancytree node has focus, we let the Fancytree
       node keyboard handler, do its work. However, if no node in the
       Fancytree has focus, then we must handle the keyboard here. */
    let treeIdValue = HDLmDefines.getString('HDLMFANCYTREE');
    let fancyTree = $(treeIdValue).fancytree("getTree");
    let activeNode = fancyTree.getActiveNode();
    let focusNode = fancyTree.getFocusNode();
    /* Check if any node in the Fancytree has focus. If any node has
       focus, then we can just return to the caller. */
    if (focusNode != null)
      return;
    /* Handle a ctrl-s (save) keyboard operation */
    if (event.key == 's' &&
      event.ctrlKey) {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
        /* console.log('Window event ctrl-s'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('Windows', currentFancyNodeNull, 'ctrl+s');
      event.preventDefault();
    }
    /* Handle a ctrl-x (cut) keyboard operation */
    if (event.key == 'x' &&
      event.ctrlKey) {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
        /* console.log('Window event ctrl-x'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('Windows', currentFancyNodeNull, 'ctrl+x');
    }
    /* Handle a ctrl-y (redo) keyboard operation */
    if (event.key == 'y' &&
      event.ctrlKey) {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
        /* console.log('Window event ctrl-y'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('Windows', currentFancyNodeNull, 'ctrl+y');
    }
    /* Handle a ctrl-z (undo) keyboard operation */
    if (event.key == 'z' &&
      event.ctrlKey) {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
        /* console.log('Window event ctrl-z'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('Windows', currentFancyNodeNull, 'ctrl+z');
    }
    /* Handle an escape keyboard operation */
    if (event.key == 'Escape') {
      /* if (HDLmGlobals.activeDebugging.windowsEvents) */
        /* console.log('Window event escape'); */
      let currentFancyNodeNull = null;
      HDLmMenus.handleKeyboard('Windows', currentFancyNodeNull, 'esc');
    }
  };
}