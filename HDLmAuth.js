/**
 * HDLmAuth short summary.
 *
 * HDLmAuth description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following JSON data structure is used to build the editor
   for each type of authentication definition. The authentication
   type is used as the property name to obtain each set of authentication 
   data. */
const HDLmAuthInfoData =
  {
    "auth":          { "fields":
                       [
                         {
                           "description":   "Userid",
                           "source":        "userid",
                           "fieldtype":     "iotext",
                           "subtype":       "userid"
                         },
                         {
                           "description":   "Password",
                           "source":        "password",
                           "fieldtype":     "iotext",
                           "subtype":       "password"
                         }
                       ]
                     }
  };  
/* The HDLmAuth class is not used to create any objects. However,
   it does contain code for obtaining the database userid and password. */
class HDLmAuth {
  static addAuth(responseText, parentTreeId, parentDescriptionId, parentValueId) {
    /* Remove all of the display objects that were created to obtain userid and
       password information */
    HDLmMod.removeMod(parentTreeId);
    HDLmMod.removeMod(parentDescriptionId);
    HDLmMod.removeMod(parentValueId);
    let responseObject = JSON.parse(responseText);
    let authenticationObject = {};
    authenticationObject['entriesUserid'] = responseObject['userid']; 
    authenticationObject['entriesPassword'] = responseObject['password'];
    HDLmConfig.addConfig(JSON.stringify(authenticationObject));
  }
  /* Build an authentication definition object from the values passed 
     by the caller */
  static buildAuthObject(name, type) {
    /* Construct the new authentication definition */
    let modificationEnabledTrue = true;
    let modificationExtraEmpty = '';
    let newAuth = new HDLmMod(name, modificationExtraEmpty, 
                              modificationEnabledTrue, type);
    return newAuth;
  }
  /* Display the request for authentication information */
  static displayAuth(parentDescriptionId, parentValueId,
                     authPromise, authResolve, authReject) {
    /* console.log('In HDLmAuth.displayAuth'); */
    let newName = 'Authentication Information';
    let newType = 'Authentication';
    let nodePath = [];
    let nodePathLength = 0;
    let newTooltip = 'Authentication Information'
    /* The code below creates a new tree node without inserting a row into the data
       base. That is OK (for now) because this code is not really in use. Even if it
       was in use, the new tree node is just temporary (and used only to get database
       userid and password information). */
    let newTreeNode = new HDLmTree(newType, newTooltip);
    /* Build the new node path. Note that the old node path is actually copied.
       This is done so that the old node path is not modified by the code below. */
    let newTreePath = nodePath.slice();
    newTreePath.push(newName);
    newTreeNode.nodePath = newTreePath;
    let newActiveType = 'auth';
    /* Build the text that goes in the upper left-hand corner */
    let newText = '';
    /* Display the text value */
    newText += '<div ';
    /* Make the text normal */
    newText += ' style="' + 'font-weight:normal;' + '"'; 
    newText += ' title="' + newTooltip + '"';
    newText += '>';
    newText += newName;
    newText += '</div>';
    /* Create a new DOM element from the generated HTML */
    let newElement = $(newText);
    /* Add the new DOM element to the values div */
    let treeIdValue = HDLmDefines.getString('HDLMFANCYTREE');
    $(treeIdValue).append(newElement);
    /* Build a modifications node for the node that will be built. This is done 
       in all cases, even if we are building a new site, division, or company
       node. This step is required for the display code to work. */
    let newAuthNode = HDLmAuth.buildAuthObject(newName, newActiveType);
    newAuthNode.promise = authPromise;
    newAuthNode.resolve = authResolve;
    newAuthNode.reject = authReject;
    newAuthNode.userid = '';
    newAuthNode.password = '';
    newTreeNode.details = newAuthNode;
    /* console.log('about to displaymod'); */
    let callSource = 'HDLmAuth.displayAuth';
    let currentDomElementNull = null;
    let handlingCmdInsertFalse = false;
    let inlineStartupFlagFalse = false;
    let newTreeEntryTrue = true;
    let possibleRuleTypesNull = null;
    HDLmMod.displayMod(parentDescriptionId, parentValueId, newTreeNode,
                       possibleRuleTypesNull, currentDomElementNull,
                       HDLmEditorTypes.auth, newTreeEntryTrue, inlineStartupFlagFalse,
                       handlingCmdInsertFalse, callSource);
  }
  /* Get the Promise used to handle obtaining authentication information.
     This Promise is resolved when the user enters a set of authentication
     information that is valid. */
  static getAuth(parentDescriptionId, parentValueId) {
    let authReject;
    let authResolve;
    /* Build the Promise object that is used to obtain authentication 
       information */
    let authPromise = new Promise(function (resolve, reject) {
      authResolve = resolve;
      authReject = reject;
    });
    /* Set the title of the current web page */
    if (1 == 2) {
      let newTitle = 'Headlamp Login';
      window.document.title = newTitle;
      HDLmUtility.setHeader(newTitle);
    }
    /* Resolve the promise locally with the correct information */
    if (1 == 1) {
      let authenticationObject = {};
      authenticationObject['userid'] = 'admin';
      authenticationObject['password'] = 'headlamp';
      authResolve(JSON.stringify(authenticationObject)); 
      return authPromise;                                                                                                                                                                                                                                                                                                                                                                                                           mise;                                                                                                                                                                                                                                                                                                     
    }
    /* Display the dialog used to obtain authentication information */
    HDLmAuth.displayAuth(parentDescriptionId, parentValueId,
                         authPromise, authResolve, authReject);
    return authPromise;
  }
  /* Return the authentication definition information to the caller */
  static get HDLmAuthInfo() {
    return HDLmAuthInfoData;
  }
}