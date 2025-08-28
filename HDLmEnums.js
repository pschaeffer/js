/**
 * HDLmEnums short summary.
 *
 * HDLmEnums description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmEnums class is not used to create any objects. However,
   it does contain code for creating a set of enums. */ 
class HDLmEnums {
}
/* The enum below defines the stages of authentication processing. 
   Authentication processing takes many stages. They are defined 
   below. */
let HDLmAuthenticationStageTypes = {
  "none":                            0,
  "adminGetUser":                    1, 
  "adminSetPassword":                2, 
  "checkLasttime":                   3,
  "checkUsernamePassword":           4,
  "checkVerificationCode":           5,
  "finalStageProcessing":            6,
  "getAttributes":                   7,
  "responsePromiseGetAttributes":    8,
  "responsePromiseAdminGetUser":     9,
  "responsePromiseAdminSetPassword": 10,
  "responsePromiseSetLasttime":      11,
  "responsePromiseUsernamePassword": 12,
  "responsePromiseVerificationCode": 13,
  "retryUsernamePassword":           14,
  "retryVerificationCode":           15,
  "setLasttime":                     16,
  "showNewPasswordUi":               17,
  "showUsernamePasswordUi":          18,
  "showVerificationCodeUi":          19
}
HDLmAuthenticationStageTypes.toString = function (enumVl) {
  /* console.log('In HDLmEnums.toString'); */
  /* console.log(Object.keys(HDLmAuthenticationStageTypes)); */
  return Object.keys(HDLmAuthenticationStageTypes).filter(key => (HDLmAuthenticationStageTypes[key] == enumVl))[0];
}
Object.freeze(HDLmAuthenticationStageTypes);
/* The enum below defines the stages of build processing. 
   Build processing takes many stages. They are defined 
   below. */
let HDLmBuildRulesStageTypes = {
  "none":                            0,
  "setTitle":                        1,
  "getModifications":                2,
  "setTestModeOn":                   3,
  "showWebPageUi":                   4,
  "waitForUrlInput":                 5,
  /* The next entry does not appear to be in use. */
  "executeFetch":                    6,
  /* The next entry does not appear to be in use. */
  "convertResponse":                 7,
  /* The next entry does not appear to be in use. */
  "getWebPage":                      8, 
  "webpageImproverServices":         9,
  "buildWebPageRules":               10,
  "showWebPageRules":                11,
  /* The next entry does not appear to be in use. */
  "reactBase":                       12,
  "reactLater":                      13,
  "sendWebPageRules":                14,
  "openWebPage":                     15,
  "beforeUnload":                    16,
  "visibilityChange":                17,
  "setTestModeOff":                  18      
};
HDLmBuildRulesStageTypes.toString = function (enumVl) {
  /* console.log('In HDLmEnums.toString'); */
  /* console.log(Object.keys(HDLmBuildRulesStageTypes)); */
  return Object.keys(HDLmBuildRulesStageTypes).filter(key => (HDLmBuildRulesStageTypes[key] == enumVl))[0];
}
Object.freeze(HDLmBuildRulesStageTypes);
/* The enum below defines the types of editors this code can be 
   used for. This code can be used to build and run a modifications
   editor, a proxy definition editor, a run-time configuration
   editor, a store (stored value) editor, an authentication editor, 
   an ignore-list editor, a pass-through display mechanism, a Popup
   editor, a Simple editor, a GUI editor, and a GUI extended editor.

   Of course, the pass-through display mechanism is not really an 
   editor at all (with possibly one exception). It is a mechanism 
   for displaying the overall pass-through status, the pass-through
   status of each company, etc.

   All ten (or more) types of editors are valid. This code was originally 
   used to build and run the modifications editor. It is now used to build
   and run several different types of editors. A global value is 
   used to control the current editor type.

   The store editor is used for storing things by name and retrieving
   them by name. Essentially anything can be stored and then retrieved.

   The ignore-list editor is used for entering, editing, and displaying
   ignore-lists. Ignore-lists specify verification tests (the output from
   verification tests) that can be safely ignored. 

   The Popup editor is actually the Popup editor for creating and 
   modifying rules. This editor can be run using browser extension or 
   under the debugger. In some cases, we need special code to make this
   enviornment work.

   The Simple editor is actually the Simple editor for creating and
   modifying rules. This editor can be run using a browser extension or
   under the debugger. In some cases, we need special code to make this
   enviornment work. 
   
   The GUI editor (GEM) is actually the GUI editor for creating and modifying
   rules. This editor is run using a browser extension. In some cases, we need 
   special code to make this enviornment work. 
   
   The GUI extended editor (GXE) is actually a GUI editor for creating and 
   modifying rules. This editor is run using a browser extension. In some
   cases, we need special code to make this enviornment work. */ 
let HDLmEditorTypes = {
  "none":    0,
  "auth":    1,
  "config":  2,
  "mod":     3,
  "proxy":   4,
  "store":   5,
  "ignore":  6,
  "pass":    7,
  "popup":   8,
  "simple":  9,
  "gem":     10,
  "gxe":     11
};
HDLmEditorTypes.toString = function (enumVl) {
  return Object.keys(HDLmEditorTypes).filter(key => (HDLmEditorTypes[key] == enumVl))[0];  
}
Object.freeze(HDLmEditorTypes);
/* The enum below provides values showing if a cookie should be
   HTTP only or not. Some cookies are marked as HTTP only. This
   means that JavaScript can not access (or modify) these cookies. */
let HDLmHttpOnly = {
  "none":                            0,
  "HttpOnlyTrue":                    1,
  "HttpOnlyFalse":                   2
};
HDLmHttpOnly.toString = function (enumVl) {
  return Object.keys(HDLmHttpOnly).filter(key => (HDLmHttpOnly[key] == enumVl))[0];  
}
Object.freeze(HDLmHttpOnly);
/* The enum below defines the stages of manage (rules) processing. 
   Manage (rules) processing takes many stages. They are defined 
   below. */
let HDLmManageRulesStageTypes = {
  "none":                            0,
  "getConfigs":                      1,
  "setTitle":                        2,
  "sendBuildCookie":                 3,
  /* The next entry does not appear to be in use. */
  "sendBuildCookieResponse":         4, 
  "getAccessCookie":                 5,
  "getUseridPassword":               6,
  "checkUseridPassword":             7,
  "checkUseridPasswordResponse":     8,
  "getNewPassword":                  9,
  "setNewPassword":                  10,
  /* The next entry does not appear to be in use. */
  "setNewPasswordResponse":          11,
  "getVerificationCode":             12,
  "sendVerificationCode":            13,
  /* The next entry does not appear to be in use. */
  "sendVerificationCodeResponse":    14,
  "setAccessCookie":                 15,
  "getModifications":                16,
  "setTestModeOn":                   17,
  "showWebPageUi":                   18,
  "waitForUrlInput":                 19,
  /* The next entry does not appear to be in use. */
  "executeFetch":                    20,
  /* The next entry does not appear to be in use. */
  "convertResponse":                 21,
  /* The next entry does not appear to be in use. */
  "getWebPage":                      22, 
  "webpageImproverServices":         23,
  "buildWebPageRules":               24,
  "showWebPageRules":                25,
  /* The next entry does not appear to be in use. */
  "reactBase":                       26,
  "reactLater":                      27,
  "sendWebPageRules":                28,
  "openWebPage":                     29,
  "beforeUnload":                    30,
  "visibilityChange":                31,
  "setTestModeOff":                  32
};
HDLmManageRulesStageTypes.toString = function (enumVl) {
  /* console.log('In HDLmEnums.toString'); */
  /* console.log(Object.keys(HDLmManageRulesStageTypes)); */
  return Object.keys(HDLmManageRulesStageTypes).filter(key => (HDLmManageRulesStageTypes[key] == enumVl))[0];
}
Object.freeze(HDLmManageRulesStageTypes);
/* The enum below defines the values for node identifier tracing. 
   We generally don't trace node identifier processing. However, 
   we can trace node identifier processing. These values control 
   what is traced and under what circumstances. */ 
let HDLmNodeIdenTracing = {
  "none":  0,
  "off":   1,
  "error": 2,
  "all":   3
};
Object.freeze(HDLmNodeIdenTracing);
/* The enum below defines the types of matches supported by this
   code. Many types of matches are supported at this time. New
   match types may be added in the future. All match types are 
   used to match path values sent by browers or other applications.
   Matching is also supported for domain names and other purposes.
   Many types of matches are converted to regexes for execution. 
   Indeed one type of match is just a regex.

   Note that the like matching mechanism is derived from the SQL
   like syntax. The same characters and mechanism are supported. */
let HDLmMatchTypes = {
  "none":   0,
  "simple": 1,
  "regex":  2,
  "glob":   3,
  "like":   4
};
Object.freeze(HDLmMatchTypes);
/* The enum below defines the types of nodes supported by this
   code. Many types of nodes are supported. We have one and 
   only one top-level node. The real top-level node is hidden 
   and visible (known) only to the Fancytree code. What we call
   the top-level node, is our (quite visible) top-level node. 
   Most (but not all) editor types have a top-level node. 

   Of course, we can have many company, division, site, 
   modification, store, list, ignore, value, and 
   configuration level nodes. Other types of nodes 
   exist as well. 

   It turns out that this enum does not appear to be in widespread 
   use. As a consequence, the relatively high numbers used for 
   configuration, store, list, ignore, and other types of
   nodes are not a problem. Configuration nodes are actually
   direct children of the top-level node, if the configuration
   editor is in use.

   Note tht the Java (not JavaScript) version of this enum
   is definitely in use. High numbers for some types of nodes
   do cause problems and we have special case code to handle
   those problems.

   Store nodes are children of site nodes if the store 
   editor is in use. If the standard modification editor
   is in use, modifications are direct children of site
   nodes.

   List nodes are direct children of company nodes if the
   ignore-lists editor is in use. Ignore nodes are direct 
   children of list nodes, if the ignore-lists editor is in 
   use or if the pass-through editor is in use.

   Generally, list nodes are one ignore-list. Of course, list
   nodes are direct children of company nodes if the ignore-lists
   editor is in use. List nodes are direct children of lists nodes,
   if the pass-through editor is in use. Note that one list node
   will be a child of a report node, if the the pass-through editor
   is in use.

   Ignore nodes are one ignore-list entry. They are really just one
   line (or node) of an ignore-list.

   Reports nodes represent a set of reports. Each reports node is a
   direct child of a company node.

   Report nodes are just one report. Of course, a report can contain
   any number of report lines (or zero). Report nodes are direct 
   children of reports nodes. Report nodes don't actually have 
   line nodes as children. They have lines nodes (sets of lines)
   and one list node (a set of ignores) as children.

   Line nodes are just one line of a report. Actually, each line 
   node is a child of a lines node, not a report node. Each line
   node is a direct child of a lines node and ony an indirect
   child of a report node.

   Lines nodes are set of lines. Each lines node is a direct child
   of a report node. Lines nodes have line nodes as direct children
   of them. 

   Lists nodes represent a set of ignore-lists. Each lists node is 
   a direct child of a company node. 
   
   Rules nodes represent a set of divisions. Each division has zero,
   one, or mode site nodes. Site nodes have zero, one, or more actual
   modifications. Each rules not is a direct child of a company node.   
   
   Data nodes represent a set of divisions. Each division has zero,
   one, or mode site nodes. Site nodes have zero, one, or more actual
   values. Each rules not is a direct child of a company node.
   
   Values (value nodes) are leaf nodes that contain exactualy one value.
   The value is typically a JSON string, but does not have to be a JSON 
   string. */  
let HDLmNodeTypes = {
  "none":      0,
  "top":       1,
  "company":   2,
  "division":  3,
  "site":      4,
  "mod":       5,
  "config":    6,
  "store":     7,
  "list":      8,
  "ignore":    9,
  "reports":   10,
  "report":    11,
  "line":      12,
  "lines":     13,
  "lists":     14,
  "companies": 15,
  "rules":     16,
  "data":      17,
  "value":     18
};
HDLmNodeTypes.toString = function (enumVl) {
  return Object.keys(HDLmNodeTypes).filter(key => (HDLmNodeTypes[key] == enumVl))[0];
}
Object.freeze(HDLmNodeTypes);
/* The enum below defines a set of operations that can be 
   requested by a caller. Many types of operations are 
   possible. New types of operations can added at any
   time. */
let HDLmOperationTypes = {
  "none":    0,
  "default": 1
};
Object.freeze(HDLmOperationTypes);
/* The enum below provides values showing if a cookie should be
   secure or not. Secure cookies are only send and received using
   SSL/TLS. Of course, this value is optional. Cookies are not 
   required to be secure. If practice, most cookies are secure
   cookies. */
let HDLmSecureCookie  = {
  "none":                    0,
  "SecureCookieTrue":        1,
  "secureCookieFalse":       2
};
HDLmSecureCookie.toString = function (enumVl) {
  return Object.keys(HDLmSecureCookie).filter(key => (HDLmSecureCookie[key] == enumVl))[0];
}
Object.freeze(HDLmSecureCookie);
/* The enum below defines the current type of error text reset
   being done. There is more than one type of error text reset.
   Each type of error text reset is defined here. */
let HDLmTextResetTypes = {
  "none":    0,
  "all":     1,
  "partial": 2
}
Object.freeze(HDLmTextResetTypes);
/* The enum below defines the types of tokens supported by the
   tokenizer. An integer is a sequence of numeric digits. A 
   number may or may not have a decimal point. Note that the 
   end type is used as a sentinel to mark the end of the token 
   array. */
let HDLmTokenTypes = {
  "none":       0,
  "identifier": 1,
  "operator":   2,
  "quoted":     3,
  "integer":    4,
  "number":     5,
  "space":      6,
  "unknown":    7,
  "end":        8 };
HDLmTokenTypes.toString = function (enumVl) {
  return Object.keys(HDLmTokenTypes).filter(key => (HDLmTokenTypes[key] == enumVl))[0];
}
Object.freeze(HDLmTokenTypes);
/* The enum below defines the types of changes that are subject
   to undo/redo processing. A different set of data must be saved
   for each change type. The saved data must be sufficient to undo
   a given change and then (potentially) redo a change as well. */
let HDLmUnReTypes = {
  "none":     0,
  /* Activate occurs when a node is activated. This generally 
     occurs when a Fancytree node is clicked on. */
  "activate": 1,
  /* Check occurs when a node is enabled or disabled. This event
     only occurs when a disabled node is enabled or an enabled 
     node is disabled. 
     
     Note that this event type is not in use at this time. It turns
     output that using the context menus to change the enablement 
     status of a modification causes a very conventional keyboard
     operation to be simulated. The keyboard operation can be undone
     and redone as need be. */
  "check":    2,
  /* Collapse occurs when the minus sign to the left of a 
     Fancytree node is clicked on. This causes all of the 
     subnodes to disappear. */
  "collapse": 3,
  /* Copy occurs (and only occurs) when the Copy option of
     a context menu is used to copy something */
  "copy":     4,
  /* Cut occurs (and only occurs) when a cut (ctrl-x) operation
     is successfully completed */
  "cut":      5,
  /* Delete occurs when a node (that may or may not
     be a modification node) is deleted */
  "delete":   6,
  /* Drag-and-Drop occurs (and only occurs) when a Drag-and-Drop
     operation is successfully completed */
  "dnd":      7,
  /* Edit occurs when a Fancytree node is renamed. It turns 
     out that you can not rename a Fancytree node by changing
     the Modification Name field. However, a Fancytree node 
     can be renamed by updating the node name inline. */
  "edit":     8,
  /* Escape is not supported at this time */
  "escape":   9,
  /* Expand occurs when the plus sign to the left of a 
     Fancytree node is clicked on. This causes all of the 
     subnodes to appear. */
  "expand":   10,
  /* Force occurs when a double-click event is received for an
     entry in a list of values for a modification node. It turns
     out that Force is not really needed. A double-click event
     causes standard content changes that are hanbled by the
     modify event. */
  "force":    11,
  /* Insert occurs (and only occurs) when the Insert option of
     a context menu is used to successfully insert a new node 
     of some type */
  "insert":   12,
  /* Modify occurs when the details (contents) of a modification
     node are changed. Note that the modification name can only
     be changed by changing the name of the associated Fancytree
     node. This is considered to be an edit, not a modify. */
  "modify":   13,
  /* Paste occurs (and only occurs) when the Paste option of
     a context menu is used to paste the currect copy buffer */
  "paste":    14
};
Object.freeze(HDLmUnReTypes);