/**
 * HDLmGlobals short summary.
 *
 * HDLmGlobals description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmGlobals class doesn't actually do anything. However, it
   does serve to hold a set of global values. Note that the HDLmGlobals
   class does have one static method for setting the current editor
   type. */ 
class HDLmGlobals {
  /* This routine checks the active extension status flag. This routine
     checks the active extension window status flag and returns a true 
     or false value to the caller. The returned value will only be true
     if we are running in the Popup or Simple extension windows. Note that 
     the Hide Show Alter Rules extension uses the Popup window. */
  static checkActiveExtensionWindow() {
    return HDLmGlobals.activeExtensionWindow;
  }
  /* This routine checks if the data value field is set or not. This
     routine returns true, if the data value is set to a non-null 
     value, and false otherwise. */
  static checkDataValueTree() {
    return (HDLmGlobals.dataValueTree != null);
  }
  /* This routine checks the debugger status flag. This routine checks
     the debugger status flag and returns a true or false value to the
     caller. */
  static checkDebuggerStatus() {
    return HDLmGlobals.activeDebugger;
  }
  /* This routine checks if one of the editors that uses the new 
     (pass) tree structure is in use. If any editor that uses the 
     new (pass) tree structure is in use, this routine returns true. 
     Otherwise, this routine returns false. */
    static checkForAnyPass() {
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass   ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.popup  ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.simple ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.gem    ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)
        return true;
      else
        return false;
  }
  /* This routine checks if the GEM or GXE editor is in use. 
     If either of the GEM or GXE editors is in use, this routine 
     returns true. Otherwise, this routine returns false. */
  static checkForGemOrGxe() {
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
        HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)
      return true;
    else
      return false;
  }
  /* This routine checks if the GEM or GXE or pass editor is in use. 
     If any of the GEM or GXE or pass editors is in use, this routine 
     returns true. Otherwise, this routine returns false. */
     static checkForGemOrGxeOrPass() {
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.pass)
        return true;
      else
        return false;
    }
  /* This routine checks if one of the inline editors is in use.
     At present, the inline editors are the Popup editor and the
     Simple editor. If any inline editor is in use, this routine 
     returns true. Otherwise, this routine returns false. */
  static checkForInlineEditor() {
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup ||
        HDLmGlobals.activeEditorType == HDLmEditorTypes.simple)
      return true;
    else
      return false;
  }
  /* This routine checks if one of the inline editors is in use
     or if we are using one of the GUI editors (GEMs). At present,
     the inline editors are the Popup editor and the Simple editor.
     If any inline editor or one of the GUI editors is in use,
     this routine returns true. Otherwise, this routine returns 
     false. */
  static checkForInlineEditorOrGems() {
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup  ||
        HDLmGlobals.activeEditorType == HDLmEditorTypes.simple ||
        HDLmGlobals.activeEditorType == HDLmEditorTypes.gem    ||
        HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)
      return true;
    else
      return false;
  }
  /* This routine gets the data value tree node and returns it
     to the caller */ 
  static getDataValueTree() {
    /* console.log('In HDLmGlobals.getDataValueTree'); */
    return HDLmGlobals.dataValueTree;
  }
  /* Reset a few data value related fields. These fields may have been
     set by a prior use of a browser extension to copy one or more elements.
     These values are reset so that other parts of the browser extension 
     can be used. */
  static resetDataValues() {
    /* console.log('In HDLmGlobals.resetDataValues'); */
    HDLmGlobals.dataValueTree = null;
  }
  /* This routine set the active extension window value to something
     passed by the caller */
  static setActiveExtensionWindow(newValue) {
    HDLmGlobals.activeExtensionWindow = newValue;
  }
  /* This routine set the active node type value to something
     passed by the caller */
  static setActiveNodeType(newValue) {
    /* console.log(newValue); */
    HDLmGlobals.activeNodeType = newValue;
  }
  /* This routine sets the data value tree node to whatever the caller
     passes. This routine will typically only be used by a browser 
     extension to set a new data value tree node reference. */
  static setDataValueTree(newDataValueTree) {
    HDLmGlobals.dataValueTree = newDataValueTree;
  }
  /* This routine sets the debugger status flag. The callers provides
     the actual debugger status. This routine stores the value passed
     by the caller in the actual global variable. */
  static setDebuggerStatus(newStatus) {
    HDLmGlobals.activeDebugger = newStatus; 
  }
  /* This routine sets the current editor type. The caller provides
     a string that is checked to determine the current editor type.
     If the string can not be used, the default editor type is left
     alone. */
  static setEditorType(inputStr) {
    /* console.log('HDLmGlobals.setEditorType', inputStr); */
    /* Remove the leading forward slash, if need be */
    if (inputStr.length > 0 &&
        inputStr.charAt(0) == '/')
      inputStr = inputStr.substring(1);
    /* Check for the configuration editor in some form */
    if (inputStr == 'config'        ||
        inputStr == 'configs'       ||
        inputStr == 'configuration' ||
        inputStr == 'configurations')
        HDLmGlobals.activeEditorType = HDLmEditorTypes.config;
    /* Check for the Popup editor in some form. This editor may 
       or may not be running under a debugger. */
    if (inputStr == 'HDLmPopup.html')
      HDLmGlobals.activeEditorType = HDLmEditorTypes.popup;
    /* Check for the Simple editor in some form. This editor may 
       or may not be running under a debugger. */
    if (inputStr == 'HDLmSimple.html')
      HDLmGlobals.activeEditorType = HDLmEditorTypes.simple;
    /* Check for the ignore (ignore-lists) editor in some form */
    if (inputStr == 'ignore'      ||
        inputStr == 'ignores'     ||
        inputStr == 'ignore-list' ||
        inputStr == 'ignore-lists')
      HDLmGlobals.activeEditorType = HDLmEditorTypes.ignore;
    /* Check for the modifications editor in some form */
    if (inputStr == 'mod'          ||
        inputStr == 'mods'         ||
        inputStr == 'modification' ||
        inputStr == 'modifications')
      HDLmGlobals.activeEditorType = HDLmEditorTypes.mod;
    /* Check for the pass-through editor in some form */
    if (inputStr == 'pass'             ||
        inputStr == 'pass-thru'        ||
        inputStr == 'passthru-display' ||
        inputStr == 'pass-through')
      HDLmGlobals.activeEditorType = HDLmEditorTypes.pass;
    /* Check for the proxy editor in some form */
    if (inputStr == 'proxy'  ||
        inputStr == 'proxys' ||
        inputStr == 'proxies')
      HDLmGlobals.activeEditorType = HDLmEditorTypes.proxy;
    /* Check for the store (stored values) editor in some form */
    if (inputStr == 'store'  ||
        inputStr == 'stores' ||
        inputStr == 'storage') 
      HDLmGlobals.activeEditorType = HDLmEditorTypes.store;
  }
}
/* The next global value is used to keep track of the current debugging
   status. If this global value is set to true, the debugging is active.
   By default, this global value is normally set to false. */
HDLmGlobals.activeDebugging = {
  contextEvents: false,
  DNDEvents: false,
  DOMEvents: false,
  editEvents: false,
  fancyEvents: false,
  ignoreChange: false,
  showInfo: false,
  showStatus: false,
  windowEvents: false
}
/* The next global value is the saved debugging information. This information
   is not currently in use. Of course, it could be used by changing the name
   of this variable. This global value would turn on all sorts of tracing that
   could be used to find various bugs. */
HDLmGlobals.activeDebuggingNotInUse = {
  contextEvents: true,
  DNDEvents: true,
  DOMEvents: true,
  editEvents: true,
  fancyEvents: true,
  ignoreChange: true,
  showInfo: true,
  showStatus: true,
  windowEvents: true
}
/* The next global value is used to keep track of what type of node is
   (if any) is active in the modification entry area. If this value is
   set to null, then no node is being edited in the node modification 
   area. */
HDLmGlobals.activeNodeType = null;
/* The next global value is use to handle copy and paste operations. 
   The current copy value is saved in the variable below. This value
   will always contain either a null value or a string reference. 
   This value will never contain an object reference. This global 
   value is also used for cut (ctrl-x) operations. Note that objects
   are converted into strings using JSON.stringify before references
   to the strings are stored in the field below. */
HDLmGlobals.activeCopyBuffer = null;
/* The next global value is used to show (and keep track of ) what 
   type of editor we are currently running. This code supports at
   least eleven types of editors. One type of editor is used to build
   and modify modification rules. A second type of editor is used to
   build and modify proxy definitions. A third type of editor is used
   to build and modify configuration values. A fourth type of editor 
   is used to build and manage stored values. A fifth type of editor
   is used to build and manage authentication information. A sixth
   type of editor is used to build and manage ignore-lists. A seventh
   type of editor is the pass-through editor. This editor is used to
   set/reset the pass-through status of a company or all companies.
   An eighth type of editor is used to create or modify rules with
   a extension window user interface. This editor is called the 
   Popup editor. A ninth type of editor is used to create and/or
   modify rules with a extension window interface. This editor is 
   called the Simple editor. A tenth type of editor is used to 
   create and/or modify (including deletion) rules using a browser
   extension. This editor is called the GUI editor. An eleventh  
   type of editor is used to create and/or modify (including deleteion) 
   rules using a browser extension. This editor is called the GXE editor.

   Note that this mechanism is also used to display and manage the
   output from verification tests. This is not really an editor at
   all. However, the editor mechanism is used for this purpose. Note,
   that the pass-through editor really is an editor when it is used
   to add or modify ignore-lists and when it is used to add or modify
   actual rules and when it is used to add or modify data values. */ 
HDLmGlobals.activeEditorType = HDLmEditorTypes.pass;
/* This code may or may not be running in a debugger environment.
   In some cases, we need to know if a debugger environment is 
   active or not. The global variable below is used to keep track
   of whether a debugger environment is active or not. */
HDLmGlobals.activeDebugger = false; 
/* This code may or may not be running in a browser extension environment.
   In some cases, we need to know if a browser extension environment is 
   active or not. The global variable below is used to keep track of
   whether a browser extension environment is active or not. Note that 
   many different extensions can create browser extension windows. This 
   global will be set to true for all of them. The current browser 
   extension windows are the Popup and Simple windows. Note that the
   Hide Show Alter Rules extension uses the Popup window. */
HDLmGlobals.activeExtensionWindow = false; 
/* The field below points to the tree node for the current data value. 
   In most cases, this field will be null. However, if the user invokes
   a browser extension for copying one or more HTML elements, then this 
   field will not be null. */
HDLmGlobals.dataValueTree = null;
/* The DOM node object is set (at tome point) with data
   from the actual DOM */
HDLmGlobals.domNodeObject = {};
HDLmGlobals.nodeIdenString = '';
HDLmGlobals.windowInfoObject = {};
/* The next global value is used to control execution of the update
   routine. If this value is greater than zero, then an update operation
   is already in progress. This value is used to indicate that additional
   update operations are needed. For example, a value of two means that 
   an update operation is already running and an additional update is 
   needed. */
HDLmGlobals.updateCounter = 0;