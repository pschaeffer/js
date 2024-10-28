/**
 * HDLmMenus short summary.
 *
 * HDLmMenus description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmMenus class is not used to create any objects. However,
   it does contain code for creating and handling menus. */
class HDLmMenus {
  /* The next method will adjust a new tree node name as need
     be. The basic idea is that every tree node name must be
     unique (at least under a specific site node). The routine
     will build a unique tree node name and return it to the
     caller if need be. 

     This check is caseless and any file numbers are potentially
     stripped from each node name. That means that FONT and font
     are treated as equal. It also means that Font (2) and font
     are potentially treated as equal. Note that this conversion 
     is only done for tree node name checking. Mixed case tree node
     names are stored in mixed case. That means that name checking
     is caseless, while names are actually stored in their original
     case (which may be mixed case).

     Note that file numbers (such as (2)) are really only removed if 
     the caller set the remove tails value to true. If this value is
     set to false, then file numbers will not be removed. */ 
  static adjustTreeNodeName(newNodeName, parentTreeNode, removeTails) {
    /* console.log('In HDLmMenus.adjustTreeNodeName', newNodeName, parentTreeNode, removeTails); */
    /* Get a count of how many times the new tree node name 
       is already used. Hopefully, this count will be zero. 
       However, it might not be zero. */
    let currentTreeNodeNull = null;
    let matchObj = HDLmTree.countSubNodeNames(newNodeName, parentTreeNode,
                                              currentTreeNodeNull, removeTails);
    /* console.log(matchObj); */
    if (matchObj.matchCount > 0) {
      let childList = parentTreeNode.children;
      let integerList = HDLmTree.buildIntegerListName(newNodeName, childList);
      /* Get the next available tree node number */
      let nextInteger = HDLmUtility.getNextInteger(integerList);
      newNodeName += ' (' + nextInteger.toString() + ')';
    }
    /* let abcd = newNodeName; */
    /* console.log(abcd); */
    return newNodeName;
  }
  /* This routine does all of the extra work needed to build a company
     node. A company node has a fixed set of subnodes that must be 
     built at this point. This routine does all of the work needed
     to actually build a company node. */
  static buildCompanyNode(companyTreeNode, updateDatabase) {
    let tooltip;    
    /* Get the node path for the node we just created */
    let fieldName = 'nodePath';
    let nodePathCompanyNode = companyTreeNode[fieldName];
    /* Add the new Data child to the new company */
    let nodePathData = nodePathCompanyNode.slice();
    let dataNodeName = HDLmDefines.getString('HDLMDATANODENAME');
    let dataNodeType = HDLmDefines.getString('HDLMDATATYPE');
    nodePathData.push(dataNodeName);
    tooltip = HDLmModTreeInfo[dataNodeType].tooltip;
    let newData = HDLmTree.buildTreeNode(dataNodeName,
                                         dataNodeType,
                                         tooltip,
                                         nodePathData,
                                         companyTreeNode,
                                         updateDatabase);
    /* Add the new Lists child to the new company */
    let nodePathLists = nodePathCompanyNode.slice();
    nodePathLists.push('Ignore Lists');
    tooltip = HDLmModTreeInfo['lists'].tooltip;
    let newLists = HDLmTree.buildTreeNode('Ignore Lists', 
                                          'lists',
                                          tooltip,
                                          nodePathLists,
                                          companyTreeNode,
                                          updateDatabase);
    /* Add the new Reports child to the new company */
    let nodePathReports = nodePathCompanyNode.slice();
    nodePathReports.push('Reports');
    tooltip = HDLmModTreeInfo['reports'].tooltip;
    let newReports = HDLmTree.buildTreeNode('Reports', 
                                            'reports',
                                             tooltip,
                                             nodePathReports,
                                             companyTreeNode,
                                             updateDatabase);
    /* Add the new Rules child to the new company */
    let nodePathRules = nodePathCompanyNode.slice();
    let rulesNodeName = HDLmDefines.getString('HDLMRULESNODENAME');
    let rulesNodeType = HDLmDefines.getString('HDLMRULESTYPE');
    nodePathRules.push(rulesNodeName);
    tooltip = HDLmModTreeInfo[rulesNodeType].tooltip;
    let newRules = HDLmTree.buildTreeNode(rulesNodeName,
                                          rulesNodeType,
                                          tooltip,
                                          nodePathRules,
                                          companyTreeNode,
                                          updateDatabase);
    return [newData, newLists, newReports, newRules];
  }
  /* The next method builds an appropriate menu for the current node. 
     The menu depends on the node type. Not all possible menu entries
     can be used with all node types. The new menu is returned to the 
     caller. */ 
  static buildMenu(fancyNode) {
    /* console.log('In buildmenu'); */
    /* console.log('aet', HDLmGlobals.activeEditorType); */
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let HDLmDataNodePath = fancyNode.data[fieldName];
    /* Using the node path from the Fancytree node, find the node
       in the modifications tree */
    let currentTreeNode = HDLmTree.locateTreeNode(HDLmDataNodePath);
    /* Report an error if the node could not be found */
    if (currentTreeNode == null) {
      let nodeString = HDLmDataNodePath.toString();
      console.log('In HDLmMenus.buildMenu', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    let currentTreeType = currentTreeNode.type;
    /* Their are many different types of nodes. The menu for each type 
       of node is different. Build the correct menu for each type of node. */
    let rv = '';
    switch (currentTreeType) {
      /* Build the correct menu for a Companies node. The menu for the Companies
         node does depend on the current editor type. */
      case 'companies':
        /* Companies nodes are only supported by the GUI editor, the GUI 
           extended editor, and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Handle the GUI editor or the GUI extended edior */
        if (HDLmGlobals.checkForGemOrGxe()) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus",      disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        /* Handle the pass-through editor */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus",      disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for a Company node */
      case 'company':
        /* Insert and paste are not supported / possible for company nodes for the GUI editor 
           or the GUI extended editor*/
        if (HDLmGlobals.checkForGemOrGxe()) {
          rv = [{ title: "Rename",  cmd: "rename", uiIcon: "ui-icon-gear",      disabled: false },
                { title: "Delete",  cmd: "delete", uiIcon: "ui-icon-trash",     disabled: false },
                { title: "Set Yes", cmd: "setyes", uiIcon: "ui-icon-arrow-1-n", disabled: false },
                { title: "Set No",  cmd: "setno",  uiIcon: "ui-icon-arrow-1-s", disabled: false },
                { title: "Copy",    cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Cut",     cmd: "cut",    uiIcon: "ui-icon-scissors",  disabled: false }];
        }
        /* All operations are possible for/with the ignore (ignore-lists) editor */
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus", disabled: false },
                { title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear", disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash", disabled: false },
                { title: "Copy",   cmd: "copy",   uiIcon: "ui-icon-copy", disabled: false },
                { title: "Cut",    cmd: "cut",    uiIcon: "ui-icon-scissors", disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        /* We need different menus depending on the current editor type */
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus",      disabled: false },
                { title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear",      disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash",     disabled: false },
                { title: "Copy",   cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Cut",    cmd: "cut",    uiIcon: "ui-icon-scissors",  disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        /* Insert and paste are not supported / possible for company nodes for the pass-through editor */
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          rv = [{ title: "Rename",  cmd: "rename", uiIcon: "ui-icon-gear",      disabled: false },
                { title: "Delete",  cmd: "delete", uiIcon: "ui-icon-trash",     disabled: false },
                { title: "Set Yes", cmd: "setyes", uiIcon: "ui-icon-arrow-1-n", disabled: false },
                { title: "Set No",  cmd: "setno",  uiIcon: "ui-icon-arrow-1-s", disabled: false },
                { title: "Copy",    cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Cut",     cmd: "cut",    uiIcon: "ui-icon-scissors",  disabled: false }];
        }
        /* Insert is not supported / possible for company nodes in the proxy editor */
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          rv = [{ title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear", disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash", disabled: false },
                { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
                { title: "Cut", cmd: "cut", uiIcon: "ui-icon-scissors", disabled: false },
                { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        /* All operations are possible for/with the store (stored value) editor */
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus", disabled: false },
                { title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear", disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash", disabled: false },
                { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
                { title: "Cut", cmd: "cut", uiIcon: "ui-icon-scissors", disabled: false },
                { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        else {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        break;
      /* Build the correct menu for a Configuration node */
      case 'config':
        /* Insert is not supported / possible for configuration (set of) nodes in the configuration editor */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          rv = [{ title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear", disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash", disabled: false },
                { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
                { title: "Cut", cmd: "cut", uiIcon: "ui-icon-scissors", disabled: false },
                { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        else {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        break
      /* Build the correct menu for a Data node. The menu for the Data
         node does depend on the current editor type. */
      case 'data':
        /* Data nodes are only supported by the GUI editor 
           and the GUI extended editor and the pass-through 
           editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Handle the GUI editor and the GUI extended editor */
        if (HDLmGlobals.checkForGemOrGxe()) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus", disabled: false },
          { title: "Copy",  cmd: "copy",  uiIcon: "ui-icon-copy",      disabled: false },
          { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        /* Handle the pass-through editor */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus", disabled: false },
          { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
          { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for a Division node */
      case 'division':
        /* Division nodes are only supported by the modifications editor 
           and the GUI editor and the GUI extended editor and the 
           pass-through editor and the store (stored value) editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false        &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.mod  &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.store) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        else {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus",      disabled: false },
                { title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear",      disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash",     disabled: false },
                { title: "Copy",   cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Cut",    cmd: "cut",    uiIcon: "ui-icon-scissors",  disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for an Ignore (ignore-list entry) node */
      case 'ignore':
        /* Ignore (ignore-list entry) nodes are only supported by the ignore-lists
           editor and the GUI editor and the GUI extended editor and the 
           pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.ignore) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        else { 
          rv = [{ title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear", disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash", disabled: false },
                { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
                { title: "Cut", cmd: "cut", uiIcon: "ui-icon-scissors", disabled: false },
                { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for a Line (one line of a report, actually line nodes are 
         direct children of lines nodes, not report nodes) node */
      case 'line':
        /* Line (one line of a set of lines) nodes are only supported
           by the GUI editor and/or the GUI extended editor and/or the 
           pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        else {
          rv = [{ title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false }];
        }
        break;
      /* Build the correct menu for a Lines (a set of lines) node */
      case 'lines':
        /* Lines (sets of lines) nodes are only supported by the GUI editor 
           and/or the GUI extended editor and/or the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        else {
          rv = [{ title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false }];
        }
        break;
      /* Build the correct menu for a List (one ignore-list) node */
      case 'list':
        /* List (one ignore-list) nodes are only supported by the ignore-lists editor 
           and the GUI editor and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.ignore) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        else {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus",      disabled: false },
                { title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear",      disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash",     disabled: false },
                { title: "Copy",   cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Cut",    cmd: "cut",    uiIcon: "ui-icon-scissors",  disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for a Lists (set of ignore-lists) node */
      case 'lists':
        /* Lists (set of ignore-lists) nodes are only supported by the 
           GUI editor and the GUI extended editor and the pass-through
           editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        else {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus",      disabled: false },
                { title: "Copy",   cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for a Modification node */
      case 'mod':
        /* Modification nodes are only supported by the modifications editor and 
           the GUI editor and the GUI extended editor and the pass-through editor
           and the inline editors */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false         &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.mod   &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.popup &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.simple) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* If we are using an editor type that supports Modifications then we must build
           a menu for a Modification node */
        else {
          rv = [{ title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear", disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash", disabled: false },
                { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
                { title: "Cut", cmd: "cut", uiIcon: "ui-icon-scissors", disabled: false },
                { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false },
                { title: "Enable", cmd: "enable", uiIcon: "ui-icon-check", disabled: false },
                { title: "Disable", cmd: "disable", uiIcon: "ui-icon-radio-off", disabled: false },
                { title: "Match", cmd: "match", uiIcon: "ui-icon-triangle-1-s", disabled: false },
                { title: "Stats", cmd: "stats", uiIcon: "ui-icon-calculator", disabled: false }];
          /* The menu slightly depends of which editor is in use. We need an insert
             menu entry in some cases. Some editors don't have a Top (top) node. As
             a consequence, insert must be supported by other types of nodes. */
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
            rv.unshift({ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus", disabled: false });
            rv.splice(6, 2);
          }
        }
        break;
      /* Build the correct menu for a Report (just one report) node */
      case 'report':
        /* Report (just one report) nodes are only supported by the GUI editor 
           and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        else {
          rv = [{ title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash", disabled: false },
                { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
                { title: "Cut", cmd: "cut", uiIcon: "ui-icon-scissors", disabled: false }];
        }
        break;
      /* Build the correct menu for a Reports (a set of reports) node */
      case 'reports':
        /* Reports (a set of reports) nodes are only supported by the GUI editor 
           and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        else {
          rv = [{ title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
                { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for a Rules node. The menu for the Rules
         node does depend on the current editor type. */
      case 'rules':
        /* Rules nodes are only supported by the GUI editor 
           and the GUI extended editor and the pass-through 
           editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Handle the GUI editor and the GUI extended editor */
        if (HDLmGlobals.checkForGemOrGxe()) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus",      disabled: false },
                { title: "Copy",   cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        /* Handle the pass-through editor */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus",      disabled: false },
                { title: "Copy",   cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for a Site node */
      case 'site':
        /* Site nodes are only supported by the modifications editor and
           the GUI editor and the GUI extended editor and the pass-through 
           editor and the store (stored value) editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false        &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.mod  &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.store) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        else {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus", disabled: false },
                { title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear", disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash", disabled: false },
                { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
                { title: "Cut", cmd: "cut", uiIcon: "ui-icon-scissors", disabled: false },
                { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for a Store (stored value) node */
      case 'store':
        /* Store (stored value) nodes are only supported by the store (stored value) editor */
        if (HDLmGlobals.activeEditorType != HDLmEditorTypes.store) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Enable, disable, and insert are not supported for store (stored value) nodes */
        else {
          rv = [{ title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear", disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash", disabled: false },
                { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy", disabled: false },
                { title: "Cut", cmd: "cut", uiIcon: "ui-icon-scissors", disabled: false },
                { title: "Paste", cmd: "paste", uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Build the correct menu for a Top node. The menu for the Top node does 
         depend on the current editor type. */
      case 'top':
        /* Handle all editor types other than the GUI editor and 
           and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          rv = [{ title: "Insert", cmd: "insert", uiIcon: "ui-icon-plus",      disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        /* A different menu is needed for the pass-through editor */
        else {
          rv = [{ title: "Set Yes", cmd: "setyes", uiIcon: "ui-icon-arrow-1-n", disabled: false },
                { title: "Set No",  cmd: "setno",  uiIcon: "ui-icon-arrow-1-s", disabled: false }];
        }
        break;
      /* Build the correct menu for a Value node. The menu for the Value
         node does depend on the current editor type. */
      case 'value':
        /* Value nodes are only supported by the GUI editor 
           and the GUI extended editor and the pass-through 
           editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Handle the GUI editor and the GUI extended editor */
        if (HDLmGlobals.checkForGemOrGxe()) {
          rv = [{ title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear",      disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash",     disabled: false },
                { title: "Copy",   cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Cut",    cmd: "cut",    uiIcon: "ui-icon-scissors",  disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        /* Handle the pass-through editor */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          rv = [{ title: "Rename", cmd: "rename", uiIcon: "ui-icon-gear",      disabled: false },
                { title: "Delete", cmd: "delete", uiIcon: "ui-icon-trash",     disabled: false },
                { title: "Copy",   cmd: "copy",   uiIcon: "ui-icon-copy",      disabled: false },
                { title: "Cut",    cmd: "cut",    uiIcon: "ui-icon-scissors",  disabled: false },
                { title: "Paste",  cmd: "paste",  uiIcon: "ui-icon-clipboard", disabled: false }];
        }
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
    return rv;
  }  
  /* The next method builds a new modification base name using a set  
     of information passed by the caller. This routine does not store
     the new modification name anywhere. However, it (the new name)
     is returned to the caller. The returned name may or may not be 
     unqiue. The name may or may not already be in use. */
  static buildModificationBase(newUrlValueStr, newDetailsType) {
    let defaultShortModName = HDLmDefines.getString('HDLMSHORTMODNAME');
    let newModName;
    let newPathString;
    /* We now have enough information to build the final modification name. 
       Of course, the final modification name is just a guess. The user will
       probably have to change the modification name by hand after the new
       modification has been added. The URL value passed to this routine may
       already be just a path value. In other words, the protocol and host 
       name may have already been removed. */
    newModName = defaultShortModName;
    /* Use the path value to help build the modification name */
    if (newUrlValueStr != null) {
      newPathString = HDLmUtility.getPathString(newUrlValueStr);
      /* Replace all occurences of '-' with a blank */
      newPathString = newPathString.replace(/\-/g, ' ');
      /* Replace all occurences of '/' with a blank */
      newPathString = newPathString.replace(/\//g, ' ');
      newPathString = newPathString.trim();
      if (newPathString != '')
        newModName += ' ' + newPathString;
    }
    /* Use the modification type to help build the modification name */
    newModName += ' ' + newDetailsType;
    /* Change the first character of each word to uppercase */
    newModName = HDLmString.ucFirstSentence(newModName);
    return newModName;
  }
  /* The next method builds a new modification name using a set of 
     information passed by the caller. This routine does not store
     the new modification name anywhere. However, it (the new name)
     is returned to the caller. The returned name will always be
     unique. A numeric suffix is added as need be to make sure that
     the name is unique. The URL value passed to this routine may
     already be just a path value. In other words, the protocol and
     host name may have already been removed. */
  static buildModificationName(parentTreeNode,  
                               newUrlValueStr, 
                               newDetailsType,
                               removeTails = false) {
    /* console.log('In HDLmMenus.buildModificationName'); */
    /* console.log(parentTreeNode); */
    /* console.log(newUrlValueStr); */
    /* console.log(newDetailsType); */
    /* Get the initial new modification name. This name may be altered
       by adding a suffix below. */
    let newModName = HDLmMenus.buildModificationBase(newUrlValueStr, newDetailsType);
    /* console.log(newModName); */
    /* Adjust the modification name (by adding a numeric suffix in parenthesis), if
       need be */
    newModName = HDLmMenus.adjustTreeNodeName(newModName, parentTreeNode, removeTails);
    /* console.log(newModName); */
    /* Return the final (possibly adjusted) modification name to the caller */
    return newModName;
  }
  /* The next method builds a new data value base name. This routine 
     does not store the new data value name anywhere. However, it (the 
     new name) is returned to the caller. The returned name may or may 
     not be unqiue. The name may or may not already be in use. */
  static buildValueBase() {
    /* We now have enough information to build the final data value name. 
       Of course, the final data value name is just a guess. The user will
       probably have to change the data value name by hand after the new
       data value has been added. */
    let newValueName = HDLmDefines.getString('HDLMFULLVALUENAME');
    /* Change the first character of each word to uppercase */
    newValueName = HDLmString.ucFirstSentence(newValueName);
    return newValueName;
  }
  /* The next method builds a new data value name. This routine 
     does not store the new data value name anywhere. However, it 
     (the new name) is returned to the caller. The returned name 
     will always be unique. A numeric suffix is added as need be 
     to make sure that the name is unique. */
  static buildValueName(parentTreeNode, 
                        removeTails = false) {
    /* console.log('In HDLmMenus.buildValueName', parentTreeNode, removeTails); */
    /* Get the initial new data value name. This name may be altered
       by adding a suffix below. */
    let newValueName = HDLmMenus.buildValueBase();
    /* console.log(newValueName); */
    /* Adjust the data value name (by adding a numeric suffix in parenthesis), if
       need be */
    newValueName = HDLmMenus.adjustTreeNodeName(newValueName, parentTreeNode, removeTails);
    /* console.log(newValueName); */
    /* Return the final (possibly adjusted) data value name to the caller */
    return newValueName;
  }
  /* The next method clears any pending values showing that we were in 
     the process of adding a new tree node. This routine must be called
     to cleanup after a new tree node has been added. It can be called
     in other cases as well. */ 
  static clearPending() {
    /* Clear the error message text */
    let errorStringEmpty = '';
    HDLmUtility.setErrorText(errorStringEmpty);
    /* Clear the global values that show we were adding a new tree node
       of some type */
    HDLmGlobals.setActiveNodeType(null);
    /* Remove the new tree node information from the web page */
    HDLmMod.removeEntries();
  }
  /* The next method handles a copy command for a specific Fancytree tree
     node. The caller passes the current Fancytree tree node and the current
     Fancytree tree node type. 
     
     Note that the caller will not pass a valid tree type in some cases. The
     value may be null. In this case, we just return to the caller. */ 
  static cmdCopy(fancyNode, currentTreeNode, currentTreeType) {
    /* Just return to the caller if the tree type value is null */
    if (currentTreeType == null)
      return;
    switch (currentTreeType) {
      /* Copy is not allowed for a Top (top) node */
      case 'top':
        break;
      /* Copy is not allowed for a Companies node */
      case 'companies':
        break;
      /* Handle the current command for a Company node */
      case 'company':
      /* Handle the current command for a Configuration node */
      case 'config':
      /* Handle the current command for a Data node */
      case 'data':
      /* Handle the current command for a Division node */
      case 'division':
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore':
      /* Handle the current command for a Line (one line of a lines node) node */
      case 'line':
      /* Handle the current command for a Lines (a set of lines) node */
      case 'lines':
      /* Handle the current command for a List (one ignore-list) node */
      case 'list':
      /* Handle the current command for a Lists (a set of ignore-lists) node */
      case 'lists':
      /* Handle the current command for a Modifications node */
      case 'mod':
      /* Handle the current command for a Report (just one report) */
      case 'report':
      /* Handle the current command for a Reports (a set of reports) */
      case 'reports':
      /* Handle the current command for a Rules node (a set of rules) */
      case 'rules':
      /* Handle the current command for a Site node */
      case 'site':
      /* Handle the current command for a Store (stored value) node */
      case 'store':
      /* Handle the current command for a Value node (a data value) */
      case 'value':
        /* Report an error if the current tree type is not allowed for 
           the current editor type */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          if (currentTreeType != 'config') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.checkForGemOrGxe()) {
          if (currentTreeType == 'config' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'line'     ||
              currentTreeType == 'lines'    ||
              currentTreeType == 'lists'    ||
              currentTreeType == 'mod'      ||
              currentTreeType == 'report'   ||
              currentTreeType == 'reports'  ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store'    ||              
              currentTreeType == 'value') {              
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||   
              currentTreeType == 'lines'   ||   
              currentTreeType == 'list'    ||  
              currentTreeType == 'lists'   ||   
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store'   ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'ignore'   ||
              currentTreeType == 'line'     ||
              currentTreeType == 'lines'    ||
              currentTreeType == 'list'     ||
              currentTreeType == 'lists'    ||
              currentTreeType == 'report'   ||
              currentTreeType == 'reports'  ||
              currentTreeType == 'store') {
              let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          if (currentTreeType != 'company') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'mod'     ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        /* Copy the current modification or value node */
        HDLmMenus.cmdCopyCommon(fancyNode, currentTreeNode);
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* This is the common code for copy processing. Most of the work needed
     for a copy command is the same for all tree node types. The code below 
     does the actual work. */
  static cmdCopyCommon(currentFancyNode, currentTreeNode) {
    let currentObj = HDLmTree.copyNode(currentTreeNode);
    let currentObjStr = JSON.stringify(currentObj);
    let addCopyEventNull = null;
    let addCopyDataNull = null;
    HDLmUnRe.addCopy(addCopyEventNull, addCopyDataNull, HDLmGlobals.activeCopyBuffer, currentObjStr);
    HDLmGlobals.activeCopyBuffer = currentObjStr;
  }
  /* The next method handles a cut (ctrl-x) command for a specific Fancytree 
     tree node. The caller passes the current Fancytree tree node and the
     current Fancytree tree node type. 
     
     Note that the caller will not pass a valid tree type in some cases. The
     value may be null. In this case, we just return to the caller. */
  static cmdCut(fancyNode, currentTreeNode, currentTreeType) {
    /* Just return to the caller if the tree type value is null */
    if (currentTreeType == null)
      return;
    switch (currentTreeType) {
      /* Cut (ctrl-x) is not allowed for a Top (top) node */
      case 'top':
        break;
      /* Cut (ctrl-x) is not allowed for a Companies node */
      case 'companies':
        break;
      /* Cut (ctrl-x) is not allowed for a Data node (a set of data values) */
      case 'data':
        break;
      /* Cut (ctrl-x) is not allowed for a Rules node (a set of rules) */
      case 'rules':
        break;
      /* Handle the current command for a Company node */
      case 'company':
      /* Handle the current command for a Configuration node */
      case 'config':
      /* Handle the current command for a Division node */
      case 'division':
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore':
      /* Handle the current command for a Line (one line of a report) node */
      case 'line':
      /* Handle the current command for a Lines (a set of lines) node */
      case 'lines':
      /* Handle the current command for a List (ignore-list) node */
      case 'list':
      /* Handle the current command for a Lists (a set of ignore-lists) node */
      case 'lists':
      /* Handle the current command for a Modifications node */
      case 'mod':
      /* Handle the current command for a Report (just one report) */
      case 'report':
      /* Handle the current command for a Reports (a set of reports) */
      case 'reports':
      /* Handle the current command for a Site node */
      case 'site':
      /* Handle the current command for a Store (stored value) node */
      case 'store':
      /* Handle the current command for a Value (data value) node */
      case 'value':
        /* Report an error if the current tree type is not allowed for 
           the current editor type */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          if (currentTreeType != 'config') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.checkForGemOrGxe()) {
          if (currentTreeType == 'config' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'line'     ||
              currentTreeType == 'lines'    ||
              currentTreeType == 'lists'    ||
              currentTreeType == 'mod'      ||
              currentTreeType == 'report'   ||
              currentTreeType == 'reports'  ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store'    ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store'   ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          if (currentTreeType != 'company') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'mod'     ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        /* Cut the current modification node */
        HDLmMenus.cmdCutCommon(fancyNode, currentTreeNode);
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* This is the common code for cut (ctrl-x) processing. Most of the work 
     needed for a cut (ctrl-x) command is the same for all tree node types. 
     The code below does the actual work. */
  static cmdCutCommon(currentFancyNode, currentTreeNode) {
    /* The cut event must be saved in the undo / redo array. To undo 
       a cut, the tree node (which might not be a modification node)
       must be restored along with the associated Fancytree node */
    let cutNodePath = currentTreeNode.nodePath.slice();
    let currentObj = HDLmTree.copyNode(currentTreeNode);
    let currentObjStr = JSON.stringify(currentObj);
    let addCutEventNull = null;
    let addCutDataNull = null;
    HDLmUnRe.addCut(addCutEventNull, addCutDataNull,
                    HDLmGlobals.activeCopyBuffer, currentObjStr,
                    cutNodePath,
                    currentFancyNode.isActive(), currentFancyNode.isExpanded());
    HDLmGlobals.activeCopyBuffer = currentObjStr;
    /* Invoke a standard routine to do all of the actual work of deleting 
       the tree node and the Fancytree node */
    HDLmTree.deleteTreeNode(currentFancyNode, currentTreeNode);
  }
  /* The next method handles a delete command for a specific Fancytree tree
     node. The caller passes the current Fancytree tree node and the current
     Fancytree tree node type. 

     Note that the caller will not pass a valid tree type in some cases. The
     value may be null. In this case, we just return to the caller. */
  static cmdDelete(fancyNode, currentTreeNode, currentTreeType) {
    /* console.log('In cmdDelete'); */
    /* console.log('ctn', currentTreeNode); */
    /* console.log('ctt', currentTreeType); */
    /* Just return to the caller if the tree type value is null */
    if (currentTreeType == null)
      return;
    switch (currentTreeType) {
      /* Delete is not allowed for a companies node */
      case 'companies':
      /* Delete is not allowed for a Data node (set of data values) */
      case 'data':
      /* Delete is not allowed for a Line (one line of a report) node */
      case 'line':
      /* Delete is not allowed for a Lines (a set of lines) node */
      case 'lines':
      /* Delete is not allowed for a Lists (a set of ignore-lists) node */
      case 'lists':
      /* Delete is not allowed for Reports (a set of reports) */
      case 'reports':
      /* Delete is not allowed for a Rules node (set of rules) */
      case 'rules':
      /* Delete is not allowed for a Top (top) node */
      case 'top':
        break;
      /* In some cases, a list (a list of ignore-list entries) can be
         deleted. In other cases, a list can not be deleted. If a list
         is part of a report, it can not be deleted. However, if a list
         is just one list (ignore-list) in a set of ignore-lists, then
         it can be deleted. Note that the same rules apply to ignore-list
         entries (individual ignores). */
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore':
      /* Handle the current command for a List (ignore-list) node */
      case 'list':
        let nodePath = currentTreeNode.nodePath;
        if (nodePath.indexOf('Reports') >= 0)
          break;
      /* Handle the current command for a Company node */
      case 'company':
      /* Handle the current command for a Configuration node */
      case 'config':
      /* Handle the current command for a Division node */
      case 'division':
      /* Handle the current command for a Modifications node */
      case 'mod':
      /* Handle the current command for a Report (just one report) */
      case 'report':
      /* Handle the current command for a Site node */
      case 'site':
      /* Handle the current command for a Store (stored value) node */
      case 'store':
      /* Handle the current command for a Value (data value) node */
      case 'value':
        /* Report an error if the current tree type is not allowed for 
           the current editor type */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          if (currentTreeType != 'config') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.checkForGemOrGxe()) {
          if (currentTreeType == 'config' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'line'     ||
              currentTreeType == 'lines'    ||
              currentTreeType == 'lists'    ||
              currentTreeType == 'mod'      ||
              currentTreeType == 'report'   ||
              currentTreeType == 'reports'  ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store'    ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store'   ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString); break;
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          if (currentTreeType != 'company') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'mod'     ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        /* Delete the current modification node */
        HDLmMenus.cmdDeleteCommon(fancyNode, currentTreeNode); 
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* This is the common code for delete processing. Most of the work needed
     for a delete command is the same for all tree node types. The code below 
     does the actual work. */
  static cmdDeleteCommon(currentFancyNode, currentTreeNode) {
    /* console.log('cmddeletecommon'); */
    /* console.log(currentTreeNode); */
    /* console.log(currentFancyNode); */
    /* The delete event must be saved in the undo / redo array. To undo 
       a delete, the tree node (which might not be a modification node)
       must be restored along with the associated Fancytree node */
    let deleteNodePath = currentTreeNode.nodePath.slice();
    /* We now must make a copy of the node that is about to be deleted. 
       The node that is about to be deleted may or may not be a modification
       node. The copy will be changed in many ways. We don't want to change
       the node that is about to be deleted. That means that we must make a 
       copy of the node that is about to be deleted. */ 
    /* console.log('cmddeletecommon', 's2'); */
    let currObj = HDLmTree.copyNode(currentTreeNode);
    let deleteTreeDataStr = JSON.stringify(currObj);
    let addDeleteEventNull = null;
    let addDeleteDataNull = null;
    HDLmUnRe.addDelete(addDeleteEventNull, addDeleteDataNull, deleteNodePath, deleteTreeDataStr,
                       currentFancyNode.isActive(), currentFancyNode.isExpanded());
    /* console.log('cmddeletecommon', 's3'); */
    /* Invoke a standard routine to do all of the actual work of deleting 
       the tree node and the Fancytree node */
    HDLmTree.deleteTreeNode(currentFancyNode, currentTreeNode);
    /* console.log('cmddeletecommon', 's4'); */
  }
  /* The next method handles a disable command for a specific modifications tree
     node. The caller passes the current modifications tree node and the current 
     modifications tree node type. */ 
  static cmdDisable(currentTreeNode, currentTreeType) {
    switch (currentTreeType) {
      /* Handle the current command for a Companies node */
      case 'companies':
        break;
      /* Handle the current command for a Company node */
      case 'company':
        break;
      /* Handle the current command for a Configuration node */
      case 'config':
        break;
      /* Handle the current command for a Data node (a set of data values) */
      case 'data':
        break;
      /* Handle the current command for a Division node */
      case 'division':
        break;
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore':
        break;
      /* Handle the current command for a Line (one line of a report) node */
      case 'line':
        break;
      /* Handle the current command for a Lines (a set of lines) node */
      case 'lines':
        break;
      /* Handle the current command for a List (ignore-list) node */
      case 'list':
        break;
      /* Handle the current command for a Lists (a set of ignore-lists) node */
      case 'lists':
        break;
      /* Build the correct menu for a Modification node */
      case 'mod':
        /* Report an error if the current tree type is not allowed for 
           the current editor type */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          if (currentTreeType != 'config') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.checkForGemOrGxe()) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'line'     ||
              currentTreeType == 'lines'    ||
              currentTreeType == 'lists'    ||
              currentTreeType == 'mod'      ||
              currentTreeType == 'report'   ||
              currentTreeType == 'reports'  ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store'    ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store'   ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          if (currentTreeType != 'company') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'mod'     ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        /* Invoke the common routine to do the actual work */
        HDLmMenus.cmdDisableCommon(currentTreeNode);
        break;
      /* Handle the current command for a Report (just one report) */
      case 'report':
        break;
      /* Handle the current command for a Reports (a set of reports) */
      case 'reports':
        break;
      /* Handle the current command for a Rules node (a set of rules) */
      case 'rules':
        break;
      /* Handle the current command for a Site node */
      case 'site':
        break;      
      /* Build the correct menu for a Store (stored value) node */
      case 'store':
        break;
      /* Handle the current command for a Top node */
      case 'top':
        break;
      /* Handle the current command for a Value node */
      case 'value':
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* This is the common code for disable processing. Most of the work needed
     for a disable command is the same for all tree node types. The code below 
     does the actual work. */
  static cmdDisableCommon(currentTreeNode) {
    /* Locate the correct widget and clear then enabled box */
    let widget = currentTreeNode.containerWidget.associatedWidgets['enabled'];
    widget.setChecked(false); 
    /* We don't need to set update status or reload the window
       here. The above code will cause the current tree node to
       be updated which will cause the update status to be set,
       and the window to be reloaded. */
  }
  /* The next method handles an enable command for a specific modifications tree
     node. The caller passes the current modifications tree node and the current 
     modifications tree node type. */
  static cmdEnable(currentTreeNode, currentTreeType) {
    switch (currentTreeType) {
      /* Handle the current command for a Companies node */
      case 'companies':
        break;
      /* Handle the current command for a Company node */
      case 'company':
        break;
      /* Handle the current command for a Configuration node */
      case 'config':
        break;
      /* Handle the current command for a Data node (a set of data values) */
      case 'data':
        break;
      /* Handle the current command for a Division node */
      case 'division':
        break;
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore':
        break;
      /* Handle the current command for a Line (one line of a report) node */
      case 'line':
        break;
      /* Handle the current command for a Lines (a set of lines) node */
      case 'lines':
        break;
      /* Handle the current command for a List (ignore-list) node */
      case 'list':
        break;
      /* Handle the current command for a Lists (a set of ignore-lists) node */
      case 'lists':
        break;
      /* Build the correct menu for a Modification node */
      case 'mod':
        /* Report an error if the current tree type is not allowed for 
           the current editor type */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          if (currentTreeType != 'config') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.checkForGemOrGxe()) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'line'     ||
              currentTreeType == 'lines'    ||
              currentTreeType == 'lists'    ||
              currentTreeType == 'mod'      ||
              currentTreeType == 'report'   ||
              currentTreeType == 'reports'  ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store'    ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store'   ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          if (currentTreeType != 'company') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'mod'     ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        /* Invoke the common routine to do the actual work */
        HDLmMenus.cmdEnableCommon(currentTreeNode);
        break;
      /* Handle the current command for a Report (just one report) */
      case 'report':
        break;
      /* Handle the current command for a Reports (a set of reports) */
      case 'reports':
        break;
      /* Handle the current command for a Rules node (a set of rules) */
      case 'rules':
        break;
      /* Handle the current command for a Site node */
      case 'site':
        break;
      /* Build the correct menu for a Store (stored value) node */
      case 'store':
        break;
      /* Handle the current command for a Top node */
      case 'top':
        break;
      /* Handle the current command for a Value node */
      case 'value':
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }  
  /* This is the common code for enable processing. Most of the work needed
     for a enable command is the same for all tree node types. The code below 
     does the actual work. */
  static cmdEnableCommon(currentTreeNode) {
    /* Locate the correct widget and set then enabled box */
    let widget = currentTreeNode.containerWidget.associatedWidgets['enabled'];
    widget.setChecked(true);
    /* We don't need to set update status or reload the window
       here. The above code will cause the current tree node to
       be updated which will cause the update status to be set,
       and the window to be reloaded. */
  }
  /* The next method handles an insert command for a specific Fancytree tree
     node. The caller passes the current Famcytree tree node and the current 
     Fancytree tree node type. */
  static cmdInsert(parentDescriptionId, 
                   parentValueId, 
                   currentTreeNode, 
                   currentTreeType,
                   nodeIdenGemOrGxe,
                   inlineStartupFlag) {
    /* console.log(currentTreeNode); */
    switch (currentTreeType) {
      /* Handle the current command for a Companies node */
      case 'companies': {
        /* Companies nodes are only supported (for insert) by the 
           GUI editor and the GUI extended editor and the 
           pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        let newActiveType;
        let newTreeNodeType;
        /* The content type shows if we are handling modifications, 
           proxy definitions, stored values, ignore-lists, or 
           configurations. The value returned below is a string, 
           not a numeric value such as enums typically are). */
        let contentType = HDLmUtility.getContentType(HDLmGlobals.activeEditorType);
        if (HDLmGlobals.checkForGemOrGxeOrPass()) {
          newActiveType = 'newcomp' + contentType;
          newTreeNodeType = 'comp' + contentType;
        }
        /* Add a new company to the Companies node */
        HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,  
                                  currentTreeNode, newActiveType, 
                                  newTreeNodeType, nodeIdenGemOrGxe,
                                  inlineStartupFlag);
        break;
      }
      /* Handle the current command for a company node */
      case 'company': {
        /* Company nodes are only supported (for insert) by the modifications editor
           and the store (stored value) editor and the ignore-lists editor */
        if (HDLmGlobals.activeEditorType != HDLmEditorTypes.mod    &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.ignore &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.store) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Add a new division to the current company for the modifications
           editor of the stored values editor */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod ||
            HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
          HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId, 
                                    currentTreeNode, 'newdivision', 'division',
                                    nodeIdenGemOrGxe, inlineStartupFlag);
        /* Add a new ignore-list to the current company for the ignore-lists
           editor */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) 
          HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,  
                                    currentTreeNode, 'newlist', 'list',
                                    nodeIdenGemOrGxe, inlineStartupFlag);
        break;
      }
      /* Handle the current command for a Configuration node. We don't really 
         support insert for configuration nodes even if we are running the 
         configuration editor. */
      case 'config': {
        /* Configuration nodes are only supported (for insert) by the configuration editor */
        if (HDLmGlobals.activeEditorType != HDLmEditorTypes.config) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        break;
      }
      /* Handle the current command for a Data node */
      case 'data': {
        /* Data nodes are only supported (for insert) by the GUI editor 
           and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        let newActiveType;
        let newTreeNodeType;
        /* The content type shows if we are handling modifications, 
           proxy definitions, stored values, ignore-lists, or 
           configurations. The value returned below is a string, 
           not a numeric value such as enums typically are). */
        let contentType = HDLmUtility.getContentType(HDLmGlobals.activeEditorType);
        if (HDLmGlobals.checkForGemOrGxe()) {
          newActiveType = 'newdivision';
          newTreeNodeType = 'division';
        }
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          newActiveType = 'newdivision';
          newTreeNodeType = 'division';
        }
        /* Add a new division to the Data node */
        HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,
          currentTreeNode, newActiveType, newTreeNodeType,
          nodeIdenGemOrGxe, inlineStartupFlag);
        break;
      }
      /* Handle the current command for a Division node */
      case 'division': {
        /* Division nodes are only supported by the modifications editor and 
           the GUI editor and the GUI extended editor and the pass-through 
           editor and the store (stored value) editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false       &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.mod && 
            HDLmGlobals.activeEditorType != HDLmEditorTypes.store) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Add a new site to the current division */
        HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,  
                                  currentTreeNode, 'newsite', 'site',
                                  nodeIdenGemOrGxe, inlineStartupFlag);
        break;
      }
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore': {
        /* Ignore (ignore-list entry) nodes are only supported by the ignore-lists editor 
           and the GUI editor and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.ignore) {  
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        }
        break;
      }
      /* Build the correct menu for a Line (one line of a report, actually line nodes are
         direct children of lines nodes, not report nodes) node */
      case 'line': {
        /* Line (one line of a set of lines) nodes are only supported
           by the GUI editor and the GUI extended editor and the 
           pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        }
        break;
      }
      /* Build the correct menu for a Lines (a set of lines) node */
      case 'lines': {    
        /* Lines (sets of lines) nodes are only supported by the GUI editor 
           and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        }
        break;
      }
      /* Handle the current command for a List (ignore-list) node */
      case 'list': {
        /* Ignore-list nodes are only supported by the ignore-lists editor 
           and the GUI editor and the GUI extended editor and the 
           pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.ignore) {  
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Add a new ignore (ignore-list entry) node to the current  */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore ||
            HDLmGlobals.checkForGemOrGxeOrPass())
          HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,  
                                    currentTreeNode, 'newignore', 'ignore',
                                    nodeIdenGemOrGxe, inlineStartupFlag);
        break;
      }
      /* Handle the current command for a Lists (a set of ignore-lists) node */
      case 'lists': {
        /* Lists of ignore-list nodes are only supported by the GUI editor 
           and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxe() == false && 
            HDLmGlobals.activeEditorType != HDLmEditorTypes.pass) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Add a new list (ignore-list) node to the current  */
        if (HDLmGlobals.checkForGemOrGxe())
          HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,
                                    currentTreeNode, 'newlist', 'list',
                                    nodeIdenGemOrGxe, inlineStartupFlag);
        /* Add a new list (ignore-list) node to the current  */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass)
          HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,  
                                    currentTreeNode, 'newlist', 'list',
                                    nodeIdenGemOrGxe, inlineStartupFlag);
        break;
      }
      /* Handle the current command for a Modifications node. We don't really 
         support insert for modification nodes even if we are running the 
         modifications editor. The only case where we really support insert
         for a modifications node, is the Simple editor. */
      case 'mod': {
        /* Modification nodes are only supported by the modifications editor and 
           the GUI editor and the GUI extended editor and the pass-through editor 
           and the inline editors */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false         &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.mod   &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.popup &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.simple) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* In at least one very important case, the parent tree node passed
           into this routine, really isn't the parent tree node at all. It   
           is actually the current node. We need to get the parent tree node
           and use it below. This happens because we support an insert menu
           command for a modification node (but only for the Simple editor). 
           We don't really want the modification node to be the parent of 
           anything. */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple)
          currentTreeNode = HDLmTree.locateTreeParentNode(currentTreeNode.nodePath);
        /* If one of the inline editors is active, run the common 
           insert code */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,
                                    currentTreeNode, 'newmod', 'mod',
                                    nodeIdenGemOrGxe, inlineStartupFlag);
        }
        break;
      }
      /* Handle the current command for a Report (just one report) */
      case 'report': {
        /* Reports (just one report in this case) are only supported by the GUI editor 
           and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxe() == false &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.pass) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        break;
      }
      /* Handle the current command for a Reports (a set of reports) */
      case 'reports': {
        /* Reports (a set of zero or more reports) are only supported by the 
           GUI editor and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxe() == false &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.pass) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        break;
      }
      /* Handle the current command for a Rules node (a set of rules) */
      case 'rules': {
        /* Rules nodes are only supported (for insert) by the GUI editor 
           and the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        let newActiveType;
        let newTreeNodeType;
        /* The content type shows if we are handling modifications, 
           proxy definitions, stored values, ignore-lists, or 
           configurations. The value returned below is a string, 
           not a numeric value such as enums typically are). */
        let contentType = HDLmUtility.getContentType(HDLmGlobals.activeEditorType);
        if (HDLmGlobals.checkForGemOrGxe()) {
          newActiveType = 'newdivision';
          newTreeNodeType = 'division';
        }
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          newActiveType = 'newdivision';
          newTreeNodeType = 'division';
        }
        /* Add a new division to the Rules node */
        HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,  
                                  currentTreeNode, newActiveType, newTreeNodeType,
                                  nodeIdenGemOrGxe, inlineStartupFlag);
        break;
      }
      /* Handle the current command for a Site node. Site nodes can be
         under a Rules node or a Data node. We need to support both 
         cases. */
      case 'site': {
        /* Site nodes are only supported by the modifications editor
           and the store (stored value) editor and the GUI editor and
           the GUI extended editor and the pass-through editor */
        if (HDLmGlobals.checkForGemOrGxeOrPass() == false        &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.mod  &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.store) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Add a new modificaton node or a value node to the current site */
        if (HDLmGlobals.checkForGemOrGxe()) {
          let greatGrandParentType = HDLmTree.getGreatGrandParentType(currentTreeNode);
          if (greatGrandParentType == 'rules') 
            HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,
                                      currentTreeNode, 'newmod', 'mod',
                                      nodeIdenGemOrGxe, inlineStartupFlag);
          else
            HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,
                                      currentTreeNode, 'newvalue', 'value',
                                      nodeIdenGemOrGxe, inlineStartupFlag);
        }
        /* Add a new modificaton to the current site */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod)
          HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,  
                                    currentTreeNode, 'newmod', 'mod',  
                                    nodeIdenGemOrGxe, inlineStartupFlag);
        /* Add a new modificaton to the current site */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          let greatGrandParentType = HDLmTree.getGreatGrandParentType(currentTreeNode);
          if (greatGrandParentType == 'rules')
            HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,
                                      currentTreeNode, 'newmod', 'mod',
                                      nodeIdenGemOrGxe, inlineStartupFlag);
          else
            HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId,
                                      currentTreeNode, 'newvalue', 'value',
                                      nodeIdenGemOrGxe, inlineStartupFlag);
        }
        /* Add a new store (stored value) node to the current site */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
          HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId, 
                                    currentTreeNode, 'newstore', 'store', 
                                    nodeIdenGemOrGxe, inlineStartupFlag);
        break;
      }
      /* Handle the current command for a Store (stored value) node. We don't 
         really support insert for store (stored value) nodes even if we are 
         running the store (stored value) editor. */
      case 'store': {
        /* Store (stored value) nodes are only supported by the store (stored 
           values) editor */
        if (HDLmGlobals.activeEditorType != HDLmEditorTypes.store) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        break;
      }
      /* Handle the current command for a Top (top) node */
      case 'top': {
        /* Insert is not suppored for the Top (top) node by the GUI editor 
           or the GUI extended editor */
        if (HDLmGlobals.checkForGemOrGxe()) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        /* Insert is not suppored for the Top (top) node by the pass-through editor */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        let newActiveType;
        let newTreeNodeType;
        /* The content type shows if we are handling modifications, 
           proxy definitions, stored values, ignore-lists, or 
           configurations. The value returned below is a string, 
           not a numeric value such as enums typically are). */
        let contentType = HDLmUtility.getContentType(HDLmGlobals.activeEditorType);
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore ||
            HDLmGlobals.activeEditorType == HDLmEditorTypes.mod    ||
            HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy  ||
            HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          newActiveType = 'newcomp' + contentType;
          newTreeNodeType = 'comp' + contentType;
        }
        /* Check if an inline editor is in use. If an inline editor is 
           in use, then the Fancytree node will be correct. The Fancytree 
           node will be for the Top (top) node wich is correct. However, the 
           new node needs to be inserted under a site down, not under the
           top node. */
        else if (HDLmGlobals.checkForInlineEditor()) {
          newActiveType = 'newmod';
          newTreeNodeType = 'mod';
          currentTreeNode = HDLmPopup.getSiteNode();
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.auth) {
          newActiveType = 'new' + contentType;
          newTreeNodeType = '' + contentType;
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          newActiveType = 'new' + contentType;
          newTreeNodeType = '' + contentType;
        }
        /* Add a new company or new configuration to the Top (top) node */
        HDLmMenus.cmdInsertCommon(parentDescriptionId, parentValueId, 
                                  currentTreeNode, newActiveType, newTreeNodeType,
                                  nodeIdenGemOrGxe, inlineStartupFlag);
        break;
      }
      /* Handle the current command for a Data value node. We don't 
         really support insert for Data value nodes, no matter what 
         editor we are running. */ 
      case 'value': {
        /* Data value nodes are only supported by the GUI editor and the
           GUI extended editor and the pass-through editor */ 
        if (HDLmGlobals.checkForGemOrGxe() == false &&
            HDLmGlobals.activeEditorType != HDLmEditorTypes.pass) {
          let errorString = currentTreeType;
          HDLmError.buildError('Error', 'Invalid type', 17, errorString);
          break;
        }
        break;
      }
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* This is the common code for insert processing. Most of the work needed
     for an insert command is the same for all tree node types. The code 
     below does the actual work.
     
     When this routine is invoke to insert a company. We may be trying to add
     a company for modifications or we may be trying to add a company for a 
     proxy definition. 

     If we adding a company using the GUI editor, then the
     newActiveType will be 'newcompgem' and the newTreeNodeType 
     will be 'compgem'

     If we adding a company using the GUI extended editor, then the
     newActiveType will be 'newcompgxe' and the newTreeNodeType
     will be 'compgxe'

     If we adding a data value using the GUI extended editor, then the
     newActiveType will be 'newvalue' and the newTreeNodeType will be
     'value'

     If we adding a company for an ignore (ignore-lists) definition, then
     the newActiveType will be 'newcompignore and the newTreeNodeType will
     be 'compignore'
     
     If we adding a company for modifications, then the newActiveType will 
     be 'newcompmod and the newTreeNodeType will be 'compmod'

     If we adding a company using the pass-through editor, then the
     newActiveType will be 'newcomppass' and the newTreeNodeType will
     be 'comppass'
     
     If we adding a company for a proxy definition, then the newActiveType 
     will be 'newcompproxy' and the newTreeNodeType will be 'compproxy'

     If we adding a company for a store (stored values) definition, then 
     the newActiveType will be 'newcompstore and the newTreeNodeType will
     be 'compstore'

     If we adding a modification using the Popup editor, then
     the newActiveType will be 'newmod' and the newTreeNodeType will
     be 'mod'
     
     If we adding a modification using the Simple editor, then
     the newActiveType will be 'newmod' and the newTreeNodeType will
     be 'mod'

     If we adding an authorization for an configuration (set of) definition,
     then the newActiveType will be 'newauth' and the newTreeNodeType
     will be 'auth'

     If we adding a configuration for a configuration (set of) definition, 
     then the newActiveType will be 'newconfig' and the newTreeNodeType 
     will be 'config' */
  static cmdInsertCommon(parentDescriptionId, parentValueId,
                         parentTreeNode, newActiveType,
                         newTreeNodeType,
                         nodeIdenGemOrGxe,
                         inlineStartupFlag) {
    /* Set a couple of global variables showing what we are trying to add */
    HDLmGlobals.setActiveNodeType(newActiveType);
    /* Build a tree node for the node that will be built */
    let nodePathParent = parentTreeNode.nodePath;
    let nodePathParentLength = nodePathParent.length;
    let newName = '';
    let newTooltip = HDLmTree.getTooltip(newActiveType);
    let newType = newTreeNodeType;
    /* When we build actual tree nodes, the tree node type must be 'company'
       for the modifications editor and the proxy editor and the store 
       editor and the ignore (ignore-lists) editor and the pass-through
       editor */
    if (newType == 'compgem'    ||
        newType == 'compgxe'    ||
        newType == 'compignore' ||
        newType == 'compmod'    ||
        newType == 'comppass'   ||
        newType == 'comppopup'  ||
        newType == 'compproxy'  ||
        newType == 'compsimple' ||
        newType == 'compstore')
      newType = 'company';
    let newPathString = '';
    let newTreeNode = new HDLmTree(newType, newTooltip);
    /* Build the new node path. Note that the old node path is actually copied.
       This is done so that the old node path is not modified by the code below. */
    let newTreePath = nodePathParent.slice();
    newTreePath.push(newName);
    newTreeNode.nodePath = newTreePath;
    /* Build a modifications node for the node that will be built. This is done 
       in all cases, even if we are building a new site, division, or company
       node. This step is required for the display code to work. */
    let newModNode;
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {   
      let configExtraEmpty = '';
      let configEnabledTrue = true;
      newModNode = HDLmConfig.buildConfigObject(newName, configExtraEmpty, 
                                                configEnabledTrue, newActiveType);  
    }
    /* New GUI or GXE objects don't have any extra information
       and they are always enabled (at least for now) */
    else if (HDLmGlobals.checkForGemOrGxe())
      newModNode = HDLmPass.buildPassObject(newName, newActiveType);
    /* New ignore objects don't have any extra information
       and they are always enabled (at least for now) */
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
      newModNode = HDLmIgnore.buildIgnoreObject(newName, newActiveType);
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
      let modificationCommentsEmpty = '';
      let modificationCssEmpty = '';
      let modificationEnabledTrue = true;
      let modificationExtraEmpty = '';
      let modificationFindsEmpty = [];
      let modificationNodeIdenEmpty = '';
      let modificationParameterNumberNull = null;
      let modificationUseModeEmpty = '';
      let modificationXpathEmpty = '';
      newModNode = HDLmMod.buildModificationObject(newName, newPathString, 
                                                   modificationExtraEmpty, modificationEnabledTrue,
                                                   modificationCssEmpty, modificationXpathEmpty, 
                                                   modificationFindsEmpty, modificationNodeIdenEmpty, 
                                                   newActiveType, modificationParameterNumberNull,
                                                   modificationCommentsEmpty, modificationUseModeEmpty);
    }
    /* New pass-through objects don't have any extra information
       and they are always enabled (at least for now) */
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass)
      newModNode = HDLmPass.buildPassObject(newName, newActiveType);
    /* New inline editor objects may have any extra information
       and they are always enabled (at least for now) */
    else if (HDLmGlobals.checkForInlineEditor()) {
      /* Check if we have a valid node identifier to use or not. If 
         we don't have a vaild node identifier, then we really can't 
         allow insert to proceed. */
      let defaultNodeIden = HDLmPopup.getDefaultModNodeIdenString();
      if (defaultNodeIden == null ||
        !HDLmPopup.checkNodeIdentifier(defaultNodeIden)) {
        HDLmUtility.setErrorText('No valid node identifier for building a rule');
        return;
      }
      newModNode = HDLmPopup.buildPopupObject(newName, newActiveType);
      HDLmPopup.getDefaultModValues(parentTreeNode, newModNode);
      /* console.trace(); */
      /* console.log(parentTreeNode); */
      /* console.log(newModNode); */
      /* console.log(newName); */
      /* console.log(newTreeNode); */
      let newTreeNodeLength = newTreeNode.nodePath.length;
      if (newTreeNodeLength > 0)
        newTreeNode.nodePath[newTreeNodeLength - 1] = newModNode.name;
      /* console.log(newTreeNode); */
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
      let proxyBackendServerEmpty = '';
      let proxyBackendTypeEmpty = '';
      let proxyEnabledTrue = true;
      let proxyExtraEmpty = '';
      let proxyMatchEmpty = '';
      let proxySecureServerEmpty = '';
      newModNode = HDLmProxy.buildProxyObject(newName, proxyExtraEmpty, 
                                              proxyEnabledTrue, newActiveType,
                                              proxyBackendTypeEmpty, proxyBackendServerEmpty, 
                                              proxySecureServerEmpty, proxyMatchEmpty); 
    }
    /* New store (stored value) objects don't have any extra information
       and they are always enabled (at least for now) */
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
      newModNode = HDLmStore.buildStoreObject(newName, newActiveType);
    newTreeNode.details = newModNode;
    /* If we have any actual node identifier values, then we need to 
       add the node identifier values to the current node. The node
       identifier values actually comes (possibly) from a browser
       extension. */ 
    let rvStr = '';
    if (nodeIdenGemOrGxe != '') {
      let newNodeIdenObj = JSON.parse(nodeIdenGemOrGxe);
      let newUrlValueStr = newNodeIdenObj['HDLmUrlValue'];
      delete newNodeIdenObj['HDLmUrlValue'];
      delete newNodeIdenObj['HDLmRequestType'];
      newTreeNode.details.nodeiden = newNodeIdenObj;
      let newOrderInfo = newNodeIdenObj['HDLmOrderInfo'];
      if (typeof newOrderInfo == 'undefined')
        newOrderInfo = null;
      delete newNodeIdenObj['HDLmOrderInfo'];
      let newCopyElements = newNodeIdenObj['HDLmCopyElements'];
      delete newNodeIdenObj['HDLmCopyElements'];
      rvStr = HDLmMenus.provideDefaultValues(HDLmOperationTypes.none,
                                             parentTreeNode,
                                             newTreeNode,
                                             newNodeIdenObj,
                                             newUrlValueStr,
                                             newOrderInfo,
                                             newCopyElements);
    }
    /* If this routine was not passed any node identifier values, then we
       just want to display the node we are building at this point */
    if (rvStr != 'finished') {
      let callSource = 'HDLmMenus.cmdInsertCommon';
      let currentDomElementNull = null;
      let handlingCmdInsertTrue = true;
      let newTreeEntryTrue = true;
      let possibleRuleTypesNull = null;
      /* console.log('about to displaymod'); */
      HDLmMod.displayMod(parentDescriptionId, parentValueId, newTreeNode,
                         possibleRuleTypesNull, currentDomElementNull,
                         HDLmGlobals.activeEditorType, newTreeEntryTrue,
                         inlineStartupFlag, handlingCmdInsertTrue,
                         callSource);
    }
  }   
  /* The next method handles a match command for a specific Fancytree tree
     node. The caller passes the current Fancytree tree node and the current
     Fancytree tree node type. 

     A match command provides match information for the current Fancytree
     node. The node information may show how the current Fancytree node
     matched or it did not match or both.
     
     Note that the caller will not pass a valid tree type in some cases. The
     value may be null. In this case, we just return to the caller. */
  static cmdMatch(fancyNode, currentTreeNode, currentTreeType) {
    /* Just return to the caller if the tree type value is null */
    if (currentTreeType == null)
      return;
    switch (currentTreeType) {
      /* Match is not allowed for a Top (top) node */
      case 'top':
      /* Match is not allowed for a Companies node */
      case 'companies':
      /* Match is not allowed for a Company node */
      case 'company':
      /* Match is not allowed for a Configuration node */
      case 'config':
      /* Match is not allowedd for a Data node (a set of data values) */
      case 'data':
      /* Match is not allowed for a Division node */
      case 'division':
      /* Match is not allowed for an Ignore (ignore-list entry) node */
      case 'ignore':
      /* Match is not allowed for a Line (one line of a lines node) node */
      case 'line':
      /* Match is not allowed for a Lines (a set of lines) node */
      case 'lines':
      /* Match is not allowed for a List (one ignore-list) node */
      case 'list':
      /* Match is not allowedfor a Lists (a set of ignore-lists) node */
      case 'lists':
        break;
      /* Handle the current command for a Modifications node */
      case 'mod':
        /* Report an error if the current tree type is not allowed for 
           the current editor type */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          if (currentTreeType != 'config') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.checkForGemOrGxe()) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'line'     ||
              currentTreeType == 'lines'    ||
              currentTreeType == 'lists'    ||
              currentTreeType == 'mod'      ||
              currentTreeType == 'report'   ||
              currentTreeType == 'reports'  ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store'    ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store'   ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          if (currentTreeType != 'company') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'mod'     ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        /* Provide match information the current modification node */
        HDLmMenus.cmdMatchCommon(fancyNode, currentTreeNode);
        break;
      /* Match is not allowed for a Report (just one report) */
      case 'report':
      /* Match is not allowed for a Reports node (a set of reports) */
      case 'reports':
      /* Match is not allowedd for a Rules node (a set of rules) */
      case 'rules':
      /* Match is not allowed for a Site node */
      case 'site':
      /* Match is not allowed for a Store (stored value) node */
      case 'store':
        break;
      /* Match is not allowed for a Value (data value) node */
      case 'value':
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* This is the common code for match processing */
  static cmdMatchCommon(currentFancyNode, currentTreeNode) {
    let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
    let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
    HDLmMod.displayMatch(divDescriptions, divValues, currentTreeNode);
  }
  /* The next method handles a paste command for a specific Fancytree tree
     node. The caller passes the current Fancytree tree node and the current
     Fancytree tree node type.
     
     Note that the caller will not pass a valid tree type in some cases. The
     value may be null. In this case, we just return to the caller. */
  static cmdPaste(fancyNode, currentTreeNode, currentTreeType) {
    /* Just return to the caller if the tree type value is null */
    if (currentTreeType == null)
      return;
    switch (currentTreeType) {
      /* Handle the current command for a Companies node */
      case 'companies':
      /* Handle the current command for a Company node */
      case 'company':
      /* Handle the current command for a Configuration node */
      case 'config':
      /* Handle the current command for a Data node (a set of data values) */
      case 'data':
      /* Handle the current command for a Division node */
      case 'division':
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore':
      /* Handle the current command for a Line (one line of a report) node */
      case 'line':
      /* Handle the current command for a Lines (a set of lines) node */
      case 'lines':
      /* Handle the current command for a List (ignore-list) node */
      case 'list':
      /* Handle the current command for a Lists (a set of ignore-lists) node */
      case 'lists':
      /* Handle the current command for a Modifications node */
      case 'mod':
      /* Handle the current command for a Report (just one report) */
      case 'report':
      /* Handle the current command for a Reports node (a set of reports) */
      case 'reports':
      /* Handle the current command for a Rules node (a set of rules) */
      case 'rules':
      /* Handle the current command for a Site node */
      case 'site':
      /* Handle the current command for a Store (stored value) node */
      case 'store':
      /* Handle the current command for a Top (top) node */
      case 'top': 
      /* Handle the current command for a Value (data value) node */
      case 'value':
        /* Report an error if the current tree type is not allowed for 
           the current editor type */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          if (currentTreeType != 'top' &&
              currentTreeType != 'config') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.checkForGemOrGxe()) {
          if (currentTreeType == 'config' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'line'     ||
              currentTreeType == 'lines'    ||
              currentTreeType == 'lists'    ||
              currentTreeType == 'mod'      ||
              currentTreeType == 'report'   ||
              currentTreeType == 'reports'  ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store'    ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store'   ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          if (currentTreeType != 'top' &&
              currentTreeType != 'company') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'mod'     ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString); 
            break;
          }
        }
        /* Get a reference to the current copy buffer. The copy buffer will actually
           be a copy of the tree of nodes copied previously. This tree may actually 
           be just one modification node. This is not an error condition. */
        let currObj = JSON.parse(HDLmGlobals.activeCopyBuffer);
        /* Paste the current modification node */
        let pasteFromNodePathNull = null;
        HDLmMenus.cmdPasteCommonDnd(pasteFromNodePathNull, fancyNode, currentTreeNode, currObj, HDLmUnReTypes.paste);
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* This is the common code for paste and DND processing. Most of the work
     needed for a paste command or DND operation is the same for all tree 
     node types. The code below does the actual work. 
     
     This code is used to handle DND processing. The caller passes an event
     type that shows if we are handling a traditional paste command or if 
     this code is being used for a DND operation. */
  static cmdPasteCommonDnd(fromNodePath, pasteFancyNode, pasteTreeNode, currObj, eventType) {
    /* console.log('cmdPasteCommonDnd'); */
    let rvBool = false;
    /* Check the reference to the copy buffer */
    if (currObj == null) {
      HDLmUtility.setErrorText('Nothing has been copied so far');
      return rvBool;
    }
    /* Get the level of the top tree node of the copy buffer. Get the level
       of the target node. The target node may be the Top (top) node if one 
       of the inline editors is active. */ 
    let copyLevel = currObj.nodePath.length;
    let pasteLevel = pasteTreeNode.nodePath.length;
    /* Check the copy and paste levels. The paste level must be equal to the
       copy level or just one higher. Note that higher levels actually have
       lower level numbers. In other words, a modification is at level 5 or 7.
       A site node is at level 4 or 6. The top node is actually level 1. 

       The level numbers are actually a function of what type of editor is
       in use. For example, modifications may be at level 7 using the pass-
       through editor and/or one of the inline editors. 

       The situation is even more complex if one of the inline editors is
       in use. The copy level might be 7 and the paste level might be 1. 
       This is not an error, if one of the inline editors is in use. */
    let levelsOK = false;
    if (HDLmGlobals.checkForInlineEditor() == false) {
      if (copyLevel == pasteLevel ||
          (copyLevel - pasteLevel) == 1)
        levelsOK = true;
    }
    /* It appears that one of the inline editors is in use. The set 
       of valid copy and paste levels is very different for the inline 
       editors. */
    else {
      if (copyLevel == pasteLevel ||
          (copyLevel == HDLmDefines.getNumber('HDLMMAXPASSNODEPATHLENGTH') &&
           pasteLevel == HDLmDefines.getNumber('HDLMTOPNODEPATHLENGTH')))
        levelsOK = true;
    }
    if (levelsOK == false) {
      if ((copyLevel - pasteLevel) > 1)
        HDLmUtility.setErrorText('Paste level is too high for copy level');
      else
        HDLmUtility.setErrorText('Paste level is too low for copy level');
      return rvBool;
    }
    /* Check if copy and paste levels are equal. In this case, we are really
       pasting to the parent of the paste node. Get the parent of the paste
       tree node passed by the caller.

       Note that if any of the inline editors is active, then we always want
       to paste to a node that is not the paste node. The paste node (in this 
       case) will be the top node and of course, we really don't want to paste 
       to the top node. We actually want (if an inline editor is active) to 
       paste to the parent of the copy node. */ 
    if (copyLevel == pasteLevel || 
        HDLmGlobals.checkForInlineEditor()) {
      /* Make sure that the copy level is valid */ 
      if (copyLevel <= HDLmDefines.getNumber('HDLMTOPNODEPATHLENGTH')) {
        let errorText = `Copy level (${copyLevel}) is less then two`;
        HDLmAssert(false, errorText);
      }
      /* Try to obtain (locate) the parent node of the copy node. 
         This should work when any of the inline editors is active
         or if the copy level is the same as the paste level. Of course,
         both conditions might be active. In other words, one of the 
         inline editors might be active and the copy and paste levels 
         might be the same. */
      let nodePath = currObj.nodePath.slice();
      let parentTreeNode = HDLmTree.locateTreeParentNode(nodePath);
      /* Report an error if the parent node could not be found */
      if (parentTreeNode == null) {
        let nodeString = nodePath.toString();
        console.log('In HDLmMenus.cmdPasteCommonDnd', nodeString);
        HDLmError.buildError('Error', 'Locate', 9, nodeString);
        return rvBool;
      }
      pasteTreeNode = parentTreeNode;
      /* At this point we need to find the parent of the current
         Fancytree node. This step very much depends on what type
         of editor is currently active. */
      if (HDLmGlobals.checkForInlineEditor() == false)
        pasteFancyNode = pasteFancyNode.getParent();
      /* Special case code is needed if the Popup editor is in use */
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
        let nodePath = currObj.nodePath.slice(0, 1);
        pasteFancyNode = HDLmTree.locateFancyNode(nodePath);
        /* Report an error if the parent node could not be found */
        if (pasteFancyNode == null) {
          let nodeString = nodePath.toString();
          console.log('In HDLmMenus.cmdPasteCommonDnd', nodeString);
          HDLmError.buildError('Error', 'Locate', 9, nodeString);
          return rvBool;
        }
      }
      /* Special case code is needed if the Simple editor is in use */
      else {
        pasteFancyNode = HDLmTree.locateFancyRootNode();
      }
    }
    /* We now must make a copy of the copy buffer. The copy will be changed
       in many ways. We don't want to change the original copy buffer. That
       means that we must make a copy of the copy buffer. */
    currObj = HDLmTree.copyNode(currObj);
    /* At this point we need to copy a reference to the paste tree node path.
       This reference will be used later to build a new node path for the
       copy buffer. */
    let pasteNodePath = pasteTreeNode.nodePath;
    /* At this point we need to count conflicting subnode names. However, we
       don't need to exempt any current node. Hence we pass a null value for 
       the current node below. */
    let removeTails = true;
    let lastNodePathValue = currObj.nodePath[currObj.nodePath.length - 1];
    let countCurrentTreeNodeNull = null;
    let matchObj = HDLmTree.countSubNodeNames(lastNodePathValue, pasteTreeNode,
                                              countCurrentTreeNodeNull, removeTails);
    let matchCount = matchObj.matchCount;
    /* At this point we may need to modify the current copy node name. This
       must be done if the match count was greater than zero. The new name 
       will be unique and not conflict with any existing node name. */
    if (matchCount > 0) {
      let currObjNameBase = HDLmString.removeFileNumberTail(lastNodePathValue); 
      let removeTailsTrue = true;
      lastNodePathValue = HDLmMenus.adjustTreeNodeName(currObjNameBase, pasteTreeNode, removeTailsTrue); 
      if (currObj.hasOwnProperty('details'))
        currObj.details.name = lastNodePathValue;
    }
    /* At this point we need to reset the node path in the copy of the copy buffer.
       We may be copying the copy buffer to a very different part of the tree.
       As a consequence, much of the node path for each node may change. */
    let currNodePath = pasteNodePath.slice();
    currNodePath.push(lastNodePathValue);
    HDLmTree.modifyTreeNodePath(currNodePath, currObj);
    /* At this point each copied node must be inserted into the 
       database maintained by the server */
    /* HDLmTree.addPendingInserts() */
    /* Add a paste event to the undo / redo array. Note that the node being 
       added is identified using the complete path to the node. This path
       (minus the last element) also identifies the Fancytree parent of the
       node being added. Of course, a copy of the node path is made. The 
       original node path is not used. The data to be pasted is also converted
       to JSON to force a copy to be made. */
    if (eventType == HDLmUnReTypes.paste) {
      let addPasteEventNull = null;
      let addPasteDataNull = null;
      HDLmUnRe.addPaste(addPasteEventNull, addPasteDataNull,
                        pasteFancyNode,
                        currNodePath.slice(),
                        JSON.stringify(currObj));
    }
    /* Add a DND event to the undo / redo array. Note that the node being 
       added is identified using the complete path to the node. This path
       (minus the last element) also identifies the Fancytree parent of the
       node being added. Of course, a copy of the node path is made. The 
       original node path is not used. The data to be added (using DND) is
       also converted to JSON to force a copy to be made. */
    if (eventType == HDLmUnReTypes.dnd) {
      let addDndEventNull = null;
      let addDndDataNull = null;
      HDLmUnRe.addDnd(addDndEventNull, addDndDataNull,
                      fromNodePath,
                      pasteFancyNode,
                      currNodePath.slice(),
                      JSON.stringify(currObj));
    }
    let handlingCmdInsertFalse = false;
    let processSubNodesTrue = true;
    let updateDatabaseTrue = true;
    let usePendingInsertsTrue = true;
    HDLmMenus.insertIntoBothTrees(pasteFancyNode, 
                                  currObj, 
                                  usePendingInsertsTrue, 
                                  processSubNodesTrue, 
                                  updateDatabaseTrue,
                                  handlingCmdInsertFalse);
    /* console.log('about to call processPendingInserts()'); */
    HDLmTree.processPendingInserts();
    rvBool = true;
    return rvBool;
  }
  /* The next method handles a rename command for a specific Fancytree tree
     node. The caller passes the current Fancytree tree node and the current
     Fancytree tree node type. */
  static cmdRename(fancyNode, currentTreeNode, currentTreeType) {
    switch (currentTreeType) {
      /* The Top (top) node can not be renamed */
      case 'top':
        break;
      /* The Companies node can not be renamed */ 
      case 'companies':
        break;
      /* Data nodes can not be renamed */
      case 'data':
        break;
      /* Rules nodes can not be renamed */
      case 'rules':
        break;
      /* Handle the current command for a Company node */
      case 'company':
      /* Handle the current command for a Configuration node */
      case 'config':
      /* Handle the current command for a Division node */
      case 'division':
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore':
      /* Handle the current command for a Line (one line of a report) node */
      case 'line':
      /* Handle the current command for a Lines (a set of lines) node */
      case 'lines':
      /* Handle the current command for a List (ignore-list) node */
      case 'list':
      /* Handle the current command for a Lists (a set of ignore-lists) node */
      case 'lists':
      /* Handle the current command for a Modifications node */
      case 'mod':
      /* Handle the current command for a Report (just one report) */
      case 'report':
      /* Handle the current command for a Reports (a set of reports) */
      case 'reports':
      /* Handle the current command for a Site node */
      case 'site':
      /* Handle the current command for a Store (stored value) node */
      case 'store':
      /* Handle the current command for a Value (data value) node */
      case 'value':
        /* Report an error if the current tree type is not allowed for 
           the current editor type */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          if (currentTreeType != 'config') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.checkForGemOrGxe()) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'line'     ||
              currentTreeType == 'lines'    ||
              currentTreeType == 'lists'    ||
              currentTreeType == 'mod'      ||
              currentTreeType == 'report'   ||
              currentTreeType == 'reports'  ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store'    ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store'   ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          if (currentTreeType != 'company') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'mod'     ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        /* Rename the current modification node */
        HDLmMenus.cmdRenameCommon(fancyNode, currentTreeNode);
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* This is the common code for rename processing. Most of the work needed
     for a rename command is the same for all tree node types. The code below 
     does the actual work. */
  static cmdRenameCommon(renameFancyNode, renameTreeNode) {
    renameFancyNode.editStart();
  }
  /* The next method does some checking for a setno or setyes command */
  static cmdSetCheck(currentTreeNode, currentTreeType) {
    /* Report an error if the current tree type is not allowed for 
       the current editor type */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
      if (currentTreeType != 'config') {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
      }
    }
    else if (HDLmGlobals.checkForGemOrGxe()) {
      if (currentTreeType == 'config'   ||
          currentTreeType == 'division' ||
          currentTreeType == 'site'     ||
          currentTreeType == 'store') {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
      }
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
      if (currentTreeType == 'config'   ||
          currentTreeType == 'division' ||
          currentTreeType == 'line'     ||
          currentTreeType == 'lines'    ||
          currentTreeType == 'lists'    ||
          currentTreeType == 'mod'      ||
          currentTreeType == 'report'   ||
          currentTreeType == 'reports'  ||
          currentTreeType == 'site'     ||
          currentTreeType == 'store'    ||
          currentTreeType == 'value') {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
      }
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
      if (currentTreeType == 'config'  ||
          currentTreeType == 'ignore'  ||
          currentTreeType == 'line'    ||
          currentTreeType == 'lines'   ||
          currentTreeType == 'list'    ||
          currentTreeType == 'lists'   ||
          currentTreeType == 'report'  ||
          currentTreeType == 'reports' ||
          currentTreeType == 'store'   ||
          currentTreeType == 'value') {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
      }
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
      if (currentTreeType == 'config'   ||
          currentTreeType == 'division' ||
          currentTreeType == 'site'     ||
          currentTreeType == 'store') {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
      }
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
      if (currentTreeType == 'config'  ||
          currentTreeType == 'ignore'  ||
          currentTreeType == 'line'    ||
          currentTreeType == 'lines'   ||
          currentTreeType == 'list'    ||
          currentTreeType == 'lists'   ||
          currentTreeType == 'report'  ||
          currentTreeType == 'reports' ||
          currentTreeType == 'store') {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
      }
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
      if (currentTreeType != 'company') {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
      }
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
      if (currentTreeType == 'config'  ||
          currentTreeType == 'ignore'  ||
          currentTreeType == 'line'    ||
          currentTreeType == 'lines'   ||
          currentTreeType == 'list'    ||
          currentTreeType == 'lists'   ||
          currentTreeType == 'report'  ||
          currentTreeType == 'reports' ||
          currentTreeType == 'store') {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
      }
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
      if (currentTreeType == 'config'  ||
          currentTreeType == 'ignore'  ||
          currentTreeType == 'line'    ||
          currentTreeType == 'lines'   ||
          currentTreeType == 'list'    ||
          currentTreeType == 'lists'   ||
          currentTreeType == 'mod'     ||
          currentTreeType == 'report'  ||
          currentTreeType == 'reports' ||
          currentTreeType == 'value') {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
      }
    }
  }
  /* The next method handles a Set No command for a specific modifications tree
     node. The caller passes the current modifications tree node and the current 
     modifications tree node type. */
  static cmdSetNo(currentTreeNode, currentTreeType) {
    let widget;
    switch (currentTreeType) {
      /* Handle the current command for a Companies node */
      case 'companies':
        break;
      /* Handle the current command for a Company node */
      case 'company':
        let companySetPassThruStatusFalse = false;
        HDLmMenus.setPassThruStatus(currentTreeNode, currentTreeType, companySetPassThruStatusFalse);
        break;
      /* Handle the current command for a Configuration node */
      case 'config':
        break;
      /* Handle the current command for a Data node (a set of data values) */
      case 'data':
        break;
      /* Handle the current command for a Division node */
      case 'division':
        break;
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore':
        break;
      /* Handle the current command for a Line (one line of a report) node */
      case 'line':
        break;
      /* Handle the current command for a Lines (a set of lines) node */
      case 'lines':
        break;
      /* Handle the current command for a List (ignore-list) node */
      case 'list':
        break;
      /* Handle the current command for a Lists (a set of ignore-lists) node */
      case 'lists':
        break;
      /* Build the correct menu for a Modification node */
      case 'mod':
        break;
      /* Handle the current command for a Report (just one report) */
      case 'report':
        break;
      /* Handle the current command for a Reports (a set of reports) */
      case 'reports':
        break;
      /* Handle the current command for a Rules node (a set of rules) */
      case 'rules':
        break;
      /* Handle the current command for a Site node */
      case 'site':
        break;
      /* Build the correct menu for a Store (stored value) node */
      case 'store':
        break;
      /* Handle the current command for a Top node */
      case 'top':
        let setPassThruStatusFalse = false;
        HDLmMenus.setPassThruStatus(currentTreeNode, currentTreeType, setPassThruStatusFalse);
        break;
      /* Handle the current command for a Value node (a data value) */
      case 'value':
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  } 
  /* The next method handles a Set Yes command for a specific modifications tree
     node. The caller passes the current modifications tree node and the current 
     modifications tree node type. */
  static cmdSetYes(currentTreeNode, currentTreeType) {
    let widget;
    switch (currentTreeType) {
      /* Handle the current command for a Companies node */
      case 'companies':
        break;
      /* Handle the current command for a Company node */
      case 'company':
        let companySetpassThruStatusTrue = true; 
        HDLmMenus.setPassThruStatus(currentTreeNode, currentTreeType, companySetpassThruStatusTrue);
        break;
      /* Handle the current command for a Configuration node */
      case 'config':
        break;
      /* Handle the current command for a Data node (a set of data values) */
      case 'data':
        break;
      /* Handle the current command for a Division node */
      case 'division':
        break;
      /* Handle the current command for an Ignore (ignore-list entry) node */
      case 'ignore':
        break;
      /* Handle the current command for a Line (one line of a report) node */
      case 'line':
        break;
      /* Handle the current command for a Lines (a set of lines) node */
      case 'lines':
        break;
      /* Handle the current command for a List (ignore-list) node */
      case 'list':
        break;
      /* Handle the current command for a Lists (a set of ignore-lists) node */
      case 'lists':
        break;
      /* Build the correct menu for a Modification node */
      case 'mod':
        break;
      /* Handle the current command for a Report (just one report) */
      case 'report':
        break;
      /* Handle the current command for a Reports (a set of reports) */
      case 'reports':
        break;
      /* Handle the current command for a Rules node (a set of rules) */
      case 'rules':
        break;
      /* Handle the current command for a Site node */
      case 'site':
        break;
      /* Build the correct menu for a Store (stored value) node */
      case 'store':
        break;
      /* Handle the current command for a Top node */
      case 'top':
        let passThruStatusTrue = true;
        HDLmMenus.setPassThruStatus(currentTreeNode, currentTreeType, passThruStatusTrue);
        break;
      /* Handle the current command for a Value node (a data value) */
      case 'value':
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* The next method handles a stats (statistics) command for a specific
     Fancytree tree node. The caller passes the current Fancytree tree 
     node and the current Fancytree tree node type. 
  
     A stats command provides stats information for the current Fancytree
     node. The node information will have statistics for the current fancy 
     tree node. 
       
     Note that the caller will not pass a valid tree type in some cases. The
     value may be null. In this case, we just return to the caller. */
  static cmdStats(fancyNode, currentTreeNode, currentTreeType) {
    /* Just return to the caller if the tree type value is null */
    if (currentTreeType == null)
      return;
    switch (currentTreeType) {
      /* Stats is not allowed for a Top (top) node */
      case 'top':
      /* Stats is not allowed for a Companies node */
      case 'companies':
      /* Stats is not allowed for a Company node */
      case 'company':
      /* Stats is not allowed for a Configuration node */
      case 'config':
      /* Stats is not allowedd for a Data node (a set of data values) */
      case 'data':
      /* Stats is not allowed for a Division node */
      case 'division':
      /* Stats is not allowed for an Ignore (ignore-list entry) node */
      case 'ignore':
      /* Stats is not allowed for a Line (one line of a lines node) node */
      case 'line':
      /* Stats is not allowed for a Lines (a set of lines) node */
      case 'lines':
      /* Stats is not allowed for a List (one ignore-list) node */
      case 'list':
      /* Stats is not allowedfor a Lists (a set of ignore-lists) node */
      case 'lists':
        break;
      /* Handle the current command for a Modifications node */
      case 'mod':
        /* Report an error if the current tree type is not allowed for 
           the current editor type */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
          if (currentTreeType != 'config') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.checkForGemOrGxe()) {
          if (currentTreeType == 'config'   ||
              currentTreeType == 'division' ||
              currentTreeType == 'site'     ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
          if (currentTreeType == 'config'   ||
            currentTreeType   == 'division' ||
            currentTreeType   == 'line'     ||
            currentTreeType   == 'lines'    ||
            currentTreeType   == 'lists'    ||
            currentTreeType   == 'mod'      ||
            currentTreeType   == 'report'   ||
            currentTreeType   == 'reports'  ||
            currentTreeType   == 'site'     ||
            currentTreeType   == 'store'    ||
            currentTreeType   == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
          if (currentTreeType == 'config'   ||
            currentTreeType   == 'ignore'   ||
            currentTreeType   == 'line'     ||
            currentTreeType   == 'lines'    ||
            currentTreeType   == 'list'     ||
            currentTreeType   == 'lists'    ||
            currentTreeType   == 'report'   ||
            currentTreeType   == 'reports'  ||
            currentTreeType   == 'store'    ||
            currentTreeType   == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          if (currentTreeType == 'config'   ||
            currentTreeType   == 'division' ||
            currentTreeType   == 'site'     ||
            currentTreeType   == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
          if (currentTreeType != 'company') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          if (currentTreeType == 'config'  ||
              currentTreeType == 'ignore'  ||
              currentTreeType == 'line'    ||
              currentTreeType == 'lines'   ||
              currentTreeType == 'list'    ||
              currentTreeType == 'lists'   ||
              currentTreeType == 'report'  ||
              currentTreeType == 'reports' ||
              currentTreeType == 'store') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
          if (currentTreeType == 'config'  ||
            currentTreeType   == 'ignore'  ||
            currentTreeType   == 'line'    ||
            currentTreeType   == 'lines'   ||
            currentTreeType   == 'list'    ||
            currentTreeType   == 'lists'   ||
            currentTreeType   == 'mod'     ||
            currentTreeType   == 'report'  ||
            currentTreeType   == 'reports' ||
            currentTreeType   == 'value') {
            let errorString = currentTreeType;
            HDLmError.buildError('Error', 'Invalid type', 17, errorString);
            break;
          }
        }
        /* Provide stats information the current modification node */
        HDLmMenus.cmdStatsCommon(fancyNode, currentTreeNode);
        break;
      /* Stats is not allowed for a Report (just one report) */
      case 'report':
      /* Stats is not allowed for a Reports (a set of reports) */
      case 'reports':
      /* Stats is not allowedd for a Rules node (a set of rules) */
      case 'rules':
      /* Stats is not allowed for a Site node */
      case 'site':
      /* Stats is not allowedfor a Store (stored value) node */
      case 'store':
      /* Stats is not allowedd for a Value node (a data value) */
      case 'value':
        break;
      /* Report an error if the node type did not match one of the expected choices */
      default: {
        let errorString = currentTreeType;
        HDLmError.buildError('Error', 'Invalid type', 17, errorString);
        break;
      }
    }
  }
  /* This is the common code for stats (statistics) processing */
  static cmdStatsCommon(currentFancyNode, currentTreeNode) {
    let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
    let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
    HDLmMod.displayStats(divDescriptions, divValues, currentTreeNode);
  }
  /* The next method adds a data field to the details of a modification
     as need. A new field does not always need to be added. In some cases,
     all we really need to do is to delete an old field. This routine
     returns a value showing if a new field was actually added or not. */
  static dataFieldAdd(currentTreeNode, modificationType, invokedBy) {
    /* We need to reset the tool tip at this point. This is only 
       possible in some cases. We need to reset the tooltip 
       because the modification type may have (probably has)
       changed. */
    if (currentTreeNode  != null &&
        modificationType != null) {
      /* console.log('s1'); */
      /* Check if this routine was run out of the modify type list code.
         This is the only case where the Fancytree node can be obtained. */
      let currentFancytreeNode = null;
      if (invokedBy == 'typelist possible change' &&
          HDLmGlobals.activeEditorType != HDLmEditorTypes.gxe) {
        currentFancytreeNode = HDLmTree.locateFancyNode(currentTreeNode.nodePath);
        /* Report an error if the Fancytree node could not be found */
        if (currentFancytreeNode == null) {
          let nodeString = currentTreeNode.nodePath.toString();
          HDLmError.buildError('Error', 'Locate', 25, nodeString);
          return;
        }
      }
      let newTreeTooltip = HDLmTree.getTooltip(modificationType);
      /* console.log(newTreeTooltip); */
      /* console.log(modificationType); */
      currentTreeNode.tooltip = newTreeTooltip;
      /* Reset the Fancytree tooltip if possible */
      if (invokedBy == 'typelist possible change') {
        if (currentFancytreeNode != null) {
          currentFancytreeNode.tooltip = newTreeTooltip;
          currentFancytreeNode.renderTitle();
        }
      }
      /* Remove the parameter property, if the new modification type
         does not use parameter numbers. */
      if (HDLmMod.getModificationTypeParmNumberUsed(modificationType) == false) {
        if (currentTreeNode.hasOwnProperty('details') &&
            currentTreeNode.details.hasOwnProperty('parameter'))
          delete currentTreeNode.details.parameter;
      }
      /* Reset the DOM node selection fields if we are switching
         to a visit type node. This is a very specific case, with 
         many checks before any changes are made. */
      if (invokedBy == 'typelist possible change' &&
          modificationType == 'visit' &&
          currentTreeNode.hasOwnProperty('details')) {
        /* Reset the CSS selector field, if need be */
        if (currentTreeNode.details.hasOwnProperty('cssselector'))
          currentTreeNode.details.cssselector = '';
        /* Reset the find information field, if need be */
        if (currentTreeNode.details.hasOwnProperty('find'))
          currentTreeNode.details.find = [];
        /* Reset the node identifier field, if need be */
        if (currentTreeNode.details.hasOwnProperty('nodeiden'))
          currentTreeNode.details.nodeiden = '';
        /* Reset the XPath information field, if need be */
        if (currentTreeNode.details.hasOwnProperty('xpath'))
          currentTreeNode.details.xpath = '';
      } 
    }
    /* Get the complete set of modification information. Note that this
       information is used for all tree node types, including companies,
       divisions, sites, and modifications. */
    let modTypeInfo = HDLmMod.getModTypeInfo();
    /* console.log(modTypeInfo); */
    if (modificationType == 'newcompproxy' ||
        modificationType == 'inject'       ||
        modificationType == 'HTML')
      modTypeInfo = HDLmProxy.HDLmProxyInfo;
    /* Get the array of fields for the current node */
    let modTypeData = modTypeInfo[modificationType];
    let modFields = modTypeData.fields;
    let modFieldsLength = modFields.length;
    /* Get the name of the last field in the field array */
    let modSource = modFields[modFieldsLength - 1].source;
    /* We need to create an empty field in current modification node 
       in some cases. Of course, if the field already exists, we do 
       not need to create it. We must also take care to create the 
       right kind of field, if the field does not exist. */
    let newFieldAddedDeleted = false;
    /* console.log(currentTreeNode.details, modSource); */
    /* console.log(modFields, modFieldsLength); */
    /* console.log(currentTreeNode.details.hasOwnProperty(modSource)); */
    /* console.log(modFields[modFieldsLength - 1].hasOwnProperty('datatype')); */
    if (!currentTreeNode.details.hasOwnProperty(modSource) &&
        modFields[modFieldsLength - 1].hasOwnProperty('datatype')) {
      let dataType = modFields[modFieldsLength - 1].datatype;
      /* console.log(dataType); */
      switch (dataType) {
        case 'array':
          currentTreeNode.details[modSource] = [];
          newFieldAddedDeleted = true;
          break;
        case 'number':
          currentTreeNode.details[modSource] = null;
          newFieldAddedDeleted = true;
          break;
        case 'text':
          currentTreeNode.details[modSource] = '';
          newFieldAddedDeleted = true;
          break;
        /* Report an error if the data type did not match one of the expected choices */
        default: {
          let errorString = dataType;
          HDLmError.buildError('Error', 'Invalid data type', 19, errorString);
          break;
        }
      }
    }
    return newFieldAddedDeleted;
  }
  /* The next method deletes data fields from the details of a modification
     as need. Old fields do not always need to be deleted. This routine
     returns a value showing if an old field was actually deleted or not. */
  static dataFieldDelete(currentTreeNode, modificationType) {
    /* Get the complete set of modification information. Note that this
       information is used for all tree node types, including companies,
       divisions, sites, and modifications. */
    let modTypeInfo = HDLmMod.getModTypeInfo();
    if (modificationType == 'newcompproxy')
      modTypeInfo = HDLmProxy.HDLmProxyInfo;
    /* Get the array of fields for the current node */
    let modTypeData = modTypeInfo[modificationType];
    let modFields = modTypeData.fields;
    let modFieldsLength = modFields.length;
    /* Get the name of the last field in the field array */
    let modSource = modFields[modFieldsLength - 1].source;
    /* We need to delete a field in current modification node 
       in some cases. Of course, if the field does not exist, we do 
       not need to delete it. */
    let newFieldAddedDeleted = false;
    if (currentTreeNode.details.hasOwnProperty(modSource) &&
      modFields[modFieldsLength - 1].hasOwnProperty('datatype')) {
      let dataType = modFields[modFieldsLength - 1].datatype;
      switch (dataType) {
        case 'array':
          delete currentTreeNode.details[modSource];
          newFieldAddedDeleted = true;
          break;
        case 'number':
          delete currentTreeNode.details[modSource];
          newFieldAddedDeleted = true;
          break;
        case 'text':
          delete currentTreeNode.details[modSource];
          newFieldAddedDeleted = true;
          break;
        /* Report an error if the data type did not match one of the expected choices */
        default: {
          let errorString = dataType;
          HDLmError.buildError('Error', 'Invalid data type', 19, errorString);
          break;
        }
      }
    }
    return newFieldAddedDeleted;
  }
  /* At this point we may be able to do some work on a new tree node of
     some type. Of course, we may not be handling a new tree node at this
     point. However, in some cases work on a new tree node is possible. 
     The call below will do the work on the new tree node (if one exists)
     if possible. 
     
     This routine always returns a string to the caller. In some cases, 
     the string indicates that the required work has been completed and
     the current modification (which may be a company, division, site, or
     actual modification) should not be redrawn. This code (in some cases)
     removes the modification from the web page. In these cases, we don't 
     want later code to redraw the modification.

     In at least one case, this routine is used to finish adding a new rule
     to the database without any user intervention. In at least one case, a
     new rule was built using node identifier values provided by a browser 
     extension. Ths new rule may have all of the required fields set. This 
     code is used to add the new rule to the rule database with any user 
     intervention or even a display of the new rule.
     
     This routine can be (and is) invoked in several different editor 
     environments. The editor environment is check in several places 
     below and different code is use for different environments. */  
  static finishTreeNode(currentTreeNode, containerAvailable, 
                        possibleRuleTypes, currentDomElement,
                        newTreeEntry, handlingCmdInsert,
                        callFromCallback, needUserInput) { 
    /* console.log('In HDLmMenus.finishTreeNode', containerAvailable, 
                   possibleRuleTypes, currentDomElement,
                   newTreeEntry, handlingCmdInsert,
                   callFromCallback, needUserInput); */
    /* console.trace(); */
    /* console.log('s15'); */
    /* console.log('s14', HDLmGlobals.activeNodeType); */
    /* Check if we are debugging the GUI eXtended Editor (GXE). If we are
       then a special flag is set to true than can be tested below. */
    let gxeDebug = false;
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe &&
        HDLmGlobals.checkDebuggerStatus() == true)
      gxeDebug = true;
    /* console.log(currentTreeNode.details.extra); */
    /* Set the return value string to a default value */
    let rvStr = ''; 
    /* We assume that we are not going to be using the WebSocket
       addTreeNode request type */
    let addTreeNodeWebSocketsDone = false;
    /* We assume that we are not going to insert a new tree node */
    let insertIntoDone = false;
    /* Check if we are really handling a new tree node. If not just
       return immediately to the caller. This check blocks all of  
       the code below if we are not handling a new tree node. The
       active node type may be set to null. This means that we are
       really not handling a new node. */
    if (HDLmGlobals.activeNodeType == null)
      return [insertIntoDone, addTreeNodeWebSocketsDone, rvStr];
    let firstThreeChars = HDLmGlobals.activeNodeType.substring(0, 3);
    if (firstThreeChars != 'new')     
      return [insertIntoDone, addTreeNodeWebSocketsDone, rvStr]; 
    /* console.log('s13'); */
    /* console.log('s1'); */
    /* Get the complete set of modification information. Note that this
       information is used for all tree node types, including companies,
       divisions, sites, and modifications. */
    let modTypeInfo = HDLmMod.getModTypeInfo();
    /* Get the current node type */
    let modificationType = currentTreeNode.details.type;
    /* let abcd = modificationType; */
    /* console.log(abcd); */
    /* The code block below (the dummy loop) is used to handle
       the case where a new modification node has just been 
       changed from a type of 'newmod' to an actual types. 
       We may need to add one or more fields at this point. 
       The code below does this. */
    /* The dummy loop below is used to allow break to work */
    /* console.log('s2', HDLmGlobals.activeNodeType, modificationType); */
    while (true) { 
      /* console.log(currentTreeNode.details.extra); */
      /* Set an initial value for redisplay modification. The initial
         value is false. It may be set to true in several cases below. */
      let redisplayModification = false;
      if (HDLmGlobals.activeNodeType == 'newsite') {
        currentTreeNode.details.type = 'site';
        HDLmMenus.clearPending();
        break;        
      }
      /* This block of code is really only used for one purpose. If we
         are handling a new modification node, then only some of the 
         fields can be displayed at the outset. At least one field
         can only be displayed later. This field depends on the type
         of the new modification. The user selects the type of the
         new modification from a select list. After the user picks
         the new modification type, the new field(s) can be added. */
      /* console.log(HDLmGlobals.activeNodeType); */
      if (HDLmGlobals.activeNodeType != 'newmod' &&
          HDLmGlobals.activeNodeType != 'newvalue')
        break;
      /* console.log('s12'); */
      /* console.log('s3');  */
      /* console.log(modificationType); */
      /* Check if node type is still 'newmod'. If this is true, then
         the new modification type has not been specified so far. If 
         this is true, then we don't want to run the code below. The 
         code below is only run to handling the case where the node
         type is specified. This is only done once for each new 
         modification. */ 
      /* console.log(modificationType); */
      if (modificationType == 'newmod'||
          modificationType == 'newvalue')
        break; 
      /* Check if we have detailed information for the current node type.
         We always should, but you never know. */
      if (!(modificationType in modTypeInfo)) {
        let errorString = modificationType;
        console.log(modificationType, modTypeInfo);
        HDLmError.buildError('Error', 'Lookup', 10, errorString);
        return [insertIntoDone, addTreeNodeWebSocketsDone, rvStr]; 
      } 
      /* console.log(currentTreeNode.details.extra); */
      /* console.log('s4'); */
      /* We need to create an empty field in current modification node 
         in some cases. Of course, if the field already exists, we do 
         not need to create it. We must also take care to create the 
         right kind of field, if the field does not exist. In some 
         case, we actually need to delete a field, not add one. */
      let newFieldAddedDeleted = HDLmMenus.dataFieldAdd(currentTreeNode,
                                                        modificationType,
                                                        "finish tree node");
      /* console.log(newFieldAddedDeleted); */
      /* In some cases, we need to delete a field from the newly created tree
         node. Certain type of tree nodes aren't allowed to have a parameter
         number field. For these types of nodes, the parameter number field
         must be deleted, if it exists. */
      if (currentTreeNode.details.hasOwnProperty('type') &&
          currentTreeNode.details.hasOwnProperty('parameter')) {
        let nodeDetailsType = currentTreeNode.details.type;
        if (HDLmMod.getModificationTypeParmNumberUsed(nodeDetailsType) == false) {
          delete currentTreeNode.details.parameter;
          newFieldAddedDeleted = true;
        }
      } 
      /* console.log(currentTreeNode.details.extra); */
      /* Some special code is needed for the GUI eXtended Editor (GXE).
         We need to set the extra information field in some cases. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
        /* console.log(redisplayModification); */
        /* The dummy loop below is only used to allow break to work */
        while (true) {
          /* Check if we can go any further */
          if (currentDomElement == null ||
              currentTreeNode   == null ||
              !currentTreeNode.hasOwnProperty('details'))
            break;
          /* Check if the parameter number is already properly set */
          if (currentTreeNode.details.hasOwnProperty('parameter') &&
              typeof(currentTreeNode.details.parameter) == 'number')
            break;
          /* Check if a parameter number is used with the current type
             of rule. This is true in some cases, but not in others. */
          let newDetailsType = currentTreeNode.details.type; 
          if (HDLmMod.getModificationTypeParmNumberUsed(newDetailsType) == false)
            break;
          /* Set the parameter number field, if need be */
          let newParameterNumber = HDLmTree.getParameterNumber(currentTreeNode);
          currentTreeNode.details.parameter = newParameterNumber;
          break;
        }
        /* The dummy loop below is only used to allow break to work */
        while (true) {
          /* console.log(currentTreeNode.details.extra); */
          /* Set the extra information field, if need be */
          if (currentDomElement == null ||
              currentTreeNode   == null ||
              !currentTreeNode.hasOwnProperty('details'))
            break;
          if (currentTreeNode.details.type != 'textchecked')
            break;
          if (currentTreeNode.details.hasOwnProperty('extra') &&
              currentTreeNode.details.extra.length > 0)
            break;
          let elementText = currentDomElement.innerText;
          let maxNodeIdenTextLength = HDLmDefines.getNumber('HDLMMAXIDENTEXTLEN');
          if (elementText.length > maxNodeIdenTextLength)
            elementText = elementText.substring(0, maxNodeIdenTextLength);
          currentTreeNode.details.extra = elementText;
          break;
        }
        if (callFromCallback == false &&
            needUserInput    == true  &&
            gxeDebug         == false)
          redisplayModification = true; 
        /* console.log(currentTreeNode, callFromCallback, needUserInput, gxeDebug, redisplayModification); */
      }
      /* console.log('s5'); */
      /* We need to check for one very special case here. In some cases, we 
         need to set the value of the extra information field. This is not
         generally true, but in some cases it is true. */
      /* console.log(currentTreeNode.details.extra); */
      if (HDLmGlobals.checkForInlineEditor()                      &&
          currentTreeNode.details.type == 'textchecked'           &&
          currentTreeNode.details.hasOwnProperty('extra') == true &&
          currentTreeNode.details.extra == ''                     &&
          currentTreeNode.details.hasOwnProperty('nodeiden') == true) {
        /* Extract the inner text value from the node identifier. This is the
           default value of the extra information field. */
        let innerText = currentTreeNode.details.nodeiden.attributes.innertext;
        innerText = HDLmString.ucFirstSentence(innerText);
        currentTreeNode.details.extra = innerText;
        redisplayModification = true;
      }    
      /* console.log(redisplayModification); */
      /* Check if a new field was actually added or deleted. We only need to
         redisplay the current modification if a new field was really addeded
         or deleted. */
      if (newFieldAddedDeleted == true)
        redisplayModification = true;
      /* console.log(redisplayModification); */
      if (redisplayModification) {
        /* console.log('In finishTreeNode', 'About to use HDLmMod.displayMod', redisplayModification); */
        let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
        let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
        let newTreeEntryTrue = true;
        /* console.log('about to displaymod'); */
        let callSource = 'HDLmMenus.finishTreeNode';
        let inlineStartupFlagFalse = false;
        HDLmMod.displayMod(divDescriptions, divValues, currentTreeNode,
                           possibleRuleTypes, currentDomElement,
                           HDLmGlobals.activeEditorType, newTreeEntryTrue,
                           inlineStartupFlagFalse, handlingCmdInsert,
                           callSource);
      } 
      break;
    } 
    /* console.log('s6'); */
    /* console.log('s11'); */
    /* The code block below (the dummy loop) is used to handle
       the case where a new modification node or some other type  
       of node is finally complete. At this point the complete node
       can actually be inserted into the tree of nodes and the
       Fancytree hierachy (in some cases) as well. The node that
       may be inserted below may or may not be a modification node.
       Other types of nodes are handled by this code as well. */
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* console.log(currentTreeNode.details.extra); */
      /* This code finishes the new tree node and inserts the new 
         tree node into the node tree */
      let containerWidgetCurrent;
      let errorText;
      let newTooltip = null;
      /* Try to get the error text from the container if the 
         container is available. If the container is not available,
         then no error text can be used. Set the error text to an
         empty string. */
      if (containerAvailable) {
        containerWidgetCurrent = currentTreeNode.containerWidget;
        errorText = containerWidgetCurrent.getErrorText();
      }
      else
        errorText = '';
      /* Check if the error text is an empty string or not. if the error text is 
         actually set, then more work needs to be done on the new tree node. We
         can just exit at this point. */
      /* console.log(errorText); */
      if (errorText != '')
        break;
      /* console.log('s7'); */
      /* Collect a set of information from the new node. This information
         is used to finish updating the new tree node. */
      let newName = currentTreeNode.details.name;
      let newNodePathLen = currentTreeNode.nodePath.length;
      let newModificationType = currentTreeNode.details.type;
      /* For some of the editors, we may want to change the modification
         name at this point. The modification name probably uses to the 
         path name at this point for some of the editors. We would really
         prefer to use the rule type as part of the modification name. */
      if (HDLmGlobals.checkForInlineEditor()) {
        /* Try to obtain (locate) the parent node of the current child node */
        let nodePath = currentTreeNode.nodePath;
        let parentTreeNode = HDLmTree.locateTreeParentNode(nodePath);
        /* Report an error if the parent node could not be found */
        if (parentTreeNode == null) {
          let nodeString = nodePath.toString();
          console.log('In HDLmMenus.finishTreeNode', nodeString);
          let errorText = HDLmError.buildError('Error', 'Locate', 9, nodeString);
          HDLmAssert(false, errorText);
        }
        newName = HDLmPopup.getUpdatedModName(parentTreeNode, newModificationType);
        currentTreeNode.details.name = newName;
        nodePath[newNodePathLen - 1] = newName;
        /* console.log(currentTreeNode); */
      }
      /* console.log('s10'); */
      /* Check if we are running the GUI editor or the GUI extended editor. If we 
         are running the GUI editor or the GUI extended editor, set the new type 
         to a special value that will retrieve the correct tooltip value. In at 
         least one case, we need to reset the type value as well. */
      if (HDLmGlobals.checkForGemOrGxe()) {
        newModificationType = newModificationType;
        /* Check if we just created a new company */
        let firstSevenChars = newModificationType.substring(0, 7);
        if (firstSevenChars == 'newcomp') {
          currentTreeNode.nodePath[newNodePathLen - 1] = newName;
          currentTreeNode.details.type = 'company';
          /* Build the standard/required subnodes of the company node
             and add them to the company node */
          let updateDatabase = false;
          HDLmMenus.buildCompanyNode(currentTreeNode, updateDatabase);
        }
        /* Check if we just created a new data value */
        /* console.log(newModificationType); */
        if (newModificationType == 'value') {
          currentTreeNode.tooltip = HDLmTree.getTooltip('newvalue');
          newTooltip = currentTreeNode.tooltip;
        }
      }
      /* console.log(currentTreeNode.details.extra); */
      /* console.log('s8'); */
      /* Check if we are running the ignore (ignore-lists) editor.
         If we are running the ignore (ignore-lists) editor, set the new 
         type to a special value that will retrieve the correct tooltip
         value. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
        newModificationType = newModificationType;
      /* Check if we are running the pass-through editor.
         If we are running the pass-through editor, set the new 
         type to a special value that will retrieve the correct
         tooltip value. In at least one case, we need to reset
         the type value as well. */
      /* console.log('s9'); */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
        newModificationType = newModificationType;
        /* Check if we just created a new company */
        if (newModificationType == 'newcomppass') {
          currentTreeNode.nodePath[newNodePathLen - 1] = newName;
          currentTreeNode.details.type = 'company';
          /* Build the standard/required subnodes of the company node
             and add them to the company node */
          let updateDatabase = true;
          HDLmMenus.buildCompanyNode(currentTreeNode, updateDatabase);
        }
        /* Check if we just created a new data value */
        /* console.log(newModificationType); */
        if (newModificationType == 'value') {
          currentTreeNode.tooltip = HDLmTree.getTooltip('newvalue');
          newTooltip = currentTreeNode.tooltip;
        }
      }
      /* console.log('s9'); */
      /* Check if we are running the Popup editor. If we are running 
         the Popup editor, set the new type to a special value that
         will retrieve the correct tooltip value. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup)
        newModificationType = newModificationType;
      /* Check if we are running the company proxy definitions editor. If
         we are running the proxy definitions editor, set the new type to
         a special value that will retrieve the correct tooltip value. 
         The actual modification type (for the proxy definitions editor) 
         is something like 'inject' or 'HTML'. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy)
        newModificationType = 'newcompproxy';
      /* Check if we are running the Simple editor. If we are running 
         the Simple editor, set the new type to a special value that
         will retrieve the correct tooltip value. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple)
        newModificationType = newModificationType;
      /* Check if we are running the company store (stored value) editor.
         If we are running the store (stored value) editor, set the new 
         type to a special value that will retrieve the correct tooltip
         value. */
      /* console.log(currentTreeNode.details.extra); */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
        newModificationType = newModificationType;
      if (newTooltip == null)
        newTooltip = HDLmTree.getTooltip(newModificationType);
      /* console.log('s8'); */
      /* For most editor types, the modification type will have been 
         reset (set) at this point to something like 'fontcolor or 
         'inject'. However, the configuration editor, the store 
         editor, and the ignore (ignore-lists) editor does not do 
         this. We must fix the modification type directly. */
      if (newModificationType == 'newconfig') {
        newModificationType = 'config';
        currentTreeNode.details.type = 'config';
      }
      if (newModificationType == 'newignore') {
        newModificationType = 'ignore';
        currentTreeNode.details.type = 'ignore';
      }
      if (newModificationType == 'newpass') {
        newModificationType = 'pass';
        currentTreeNode.details.type = 'pass';
      }
      if (newModificationType == 'newstore') {
        newModificationType = 'store';
        currentTreeNode.details.type = 'store';
      }
      if (newModificationType == 'newvalue') {
        /* We need to check for a very special case. It is possible
           that the data value node name is not set. The node name 
           must be set to create new node. */
        if (newName == '')
          break;
        newModificationType = 'value';
        currentTreeNode.details.type = 'value';
      }
      /* Set a few fields in the tree node using information obtained
         from the new tree node */
      currentTreeNode.nodePath[newNodePathLen - 1] = newName;
      currentTreeNode.tooltip = newTooltip;
      /* console.log('s10'); */
      /* At this point we want to delete the details property for all 
          nodes other than ignore (ignore-list entry) nodes. However, 
          we really only want to do this if we are running the ignore
          (ignore-lists) editor. This step can not be done for any other
          type of editor. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore &&
          currentTreeNode.type != 'ignore'                       &&
          currentTreeNode.hasOwnProperty('details'))
        delete currentTreeNode.details;
      /* At this point we want to delete the details property for all 
         nodes other than modification nodes. However, we really only
         want to do this if we are running the modiications editor. 
         This step can not be done for any other type of editor. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod &&
          currentTreeNode.type != 'mod'                       &&
          currentTreeNode.hasOwnProperty('details'))
        delete currentTreeNode.details;
      /* console.log('s7'); */
      /* At this point we want to delete the details property for 
         some nodes if we are running the GUI editor or the GUI 
         extended editor or the pass-through editor or one of the 
         inline editors. The pass-through editor and the inline editors
         are somewhat different in that many types (levels) of nodes 
         have details that we need to keep. As a consequence, the code 
         below is quite selective. At present, all nodes have details.
         As a consequence, we really don't want to delete the details. */
      /* console.log(currentTreeNode.details.extra); */
      if (HDLmGlobals.checkForAnyPass()) {
        /* Check if we are creating a leaf node for the pass-through
           editor. We don't want to keep any details, at least for now. */
        if (currentTreeNode.type != 'company' &&
            currentTreeNode.type != 'ignore'  &&
            currentTreeNode.type != 'line'    &&
            currentTreeNode.type != 'mod'     &&
            currentTreeNode.type != 'value') {
          if (false && currentTreeNode.hasOwnProperty('details'))
            delete currentTreeNode.details;
        }
      }
      /* console.log('s11'); */
      /* At this point we want to delete the details property for all 
         nodes other than modification nodes and top nodes. However, 
         we really only want to do this if we are running one of the 
         inline editors. This step can not be done for any other type
         of editor. This code is no longer in use. All tree node types
         now have details that we don't want to delete. */
      if (false                              &&
          HDLmGlobals.checkForInlineEditor() &&
          currentTreeNode.type != 'mod'      &&
          currentTreeNode.type != 'top'      &&
        currentTreeNode.hasOwnProperty('details'))
        delete currentTreeNode.details;
      /* At this point we want to delete the details property for all 
         nodes other than store (stored value) nodes. However, we really
         only want to do this if we are running the store (stored value)
         editor. This step can not be done for any other type of editor. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store &&
          currentTreeNode.type != 'store'                       &&
          currentTreeNode.hasOwnProperty('details'))
        delete currentTreeNode.details;
      /* console.log('s6'); */
      /* We need to handle one very complex case here. It is possible that the
         path value value for the details of a modification node will be set to 
         an empty string here. This is actually an error. The correct value is
         a string, one character long containing a slash. This appears to 
         happen when a new modification node is inserted into the overall
         tree structure, but the path value field is never touched (left with a 
         default value). */
      if (currentTreeNode.type == 'mod'                       &&
          currentTreeNode.hasOwnProperty('details')           &&
          currentTreeNode.details.hasOwnProperty('pathvalue') &&
          currentTreeNode.details.pathvalue == '')
        currentTreeNode.details.pathvalue = '/';
      /* Get the parent Fancytree node for use below. We should always be
         able to find the parent Fancytree node at this point. This is only
         really possible if we are running the standard rule editor. If we
         are running the GUI rule editor or the GUI extended editor, this
         can not be done. Note that if we are running the GUI extended
         editor (GXE) under the debugger than we can get the parent 
         Fancytree node. */
      /* console.log(currentTreeNode.details.extra); */
      let parentFancyNode = null;
      let needParentFancyNode = true;
      if (HDLmGlobals.checkForGemOrGxe() || 
          HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) 
        needParentFancyNode = false;
      /* console.log(HDLmGlobals.activeEditorType, gxeDebug, needParentFancyNode); */
      if (gxeDebug == true)
        needParentFancyNode = true;
      if (needParentFancyNode == true) {
        /* Some special code is needed hear to handle any or the inline 
           editors. The parent Fancytree node in this case will always 
           be the Top (top) level node. */
        let fancyNodePath = currentTreeNode.nodePath;
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup)
          fancyNodePath = currentTreeNode.nodePath.slice(0, 2);
        /* Try to locate the parent Fancytree node here. This may or may 
           not work because the parent Fancytree node may or may not be
           displayed at this point. */
        let reportFancyLocateErrors = false;
        parentFancyNode = HDLmTree.locateFancyParentNode(fancyNodePath, reportFancyLocateErrors);
        if (parentFancyNode == null &&
            parentFancyNode != null) {
          let nodeString = currentTreeNode.nodePath.toString();
          let errorText = `Parent Fancytree node not located (${nodeString})`;
          HDLmAssert(false, errorText);
        }
        /* console.log(parentFancyNode); */
      }
      /* console.log('s5'); */
      /* In at least one very important case, the parent Fancytree node will
         be known at this point. In this case, the parent Fancytree node is
         actually, the Fancytree root node. All Fancytree subnodes are 
         inserted directly under the Fancytree root node, if the Simple
         editor is active. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple)
        parentFancyNode = HDLmTree.locateFancyRootNode(); 
      /* If we are running the GUI rule editor or the GUI extended editor, 
         then we don't have Fancytree to update. We just set the Fancytree 
         node reference to null in this case. */
      if (HDLmGlobals.checkForGemOrGxe()) {
        if (gxeDebug == false)
          parentFancyNode = null;
      } 
      /* Add an insert event to the undo / redo array. Note that the node being 
         added is identified using the complete path to the node. This path
         (minus the last element) also identifies the Fancytree parent of the
         node being added. Of course, a copy of the node path is made. The 
         original node path is not used. The data to be pasted is also converted
         to JSON to force a copy to be made. */ 
      if (HDLmGlobals.checkForGemOrGxe() == false) {
        let currObj = HDLmTree.copyNode(currentTreeNode);
        let addInsertEventNull = null;
        let addInsertDataNull = null;
        HDLmUnRe.addInsert(addInsertEventNull, addInsertDataNull,
                           currentTreeNode.nodePath.slice(),
                           JSON.stringify(currObj));
      }
      /* console.log(currentTreeNode.details.extra); */
      /* console.log('s4'); */
      /* We need to decide if an actual insert should be done, at this 
         point or if an insert should just be added to the array of 
         pending inserts. In most cases, we really want to do a real 
         insert at this point. However, if we are using the GEM editor  
         or if we are using the GXE editor or if one of the inline editors
         is in use, then we really want to add to the pending inserts list.
         These comments are now out-of-date. The current comments follow. */ 
      /* We need to decide if an actual insert should be done at this
         point or if an insert should just be added to the array of
         pending inserts. In all cases, we now create a pending insert. */
      let usePendingInserts = true;
      if (HDLmGlobals.checkForInlineEditorOrGems())
        usePendingInserts = true;
      /* Check if the GEM or GXE environments are active. If the GEM or 
         GXE environments are active, then we must (should) make sure 
         that all of the parent nodes to the modification node really 
         exist. If we are handling a new company, these nodes will not 
         exist and must be created. */
      /* console.log('s3'); */
      if (HDLmGlobals.checkForGemOrGxe()) {
        let siteNodePath = currentTreeNode.nodePath.slice(0, 6);
        let updateDatabaseFalse = false;
        HDLmTree.buildSiteNode(siteNodePath, updateDatabaseFalse, HDLmNodeTypes.rules);
      }
      /* console.log(currentTreeNode.details.extra); */
      /* Try to add the new rule to the rule tree and the Fancytree node
         tree. Note that if we are handling the GUI rule editor or the 
         GUI extended editor, the parent Fancytree node will be null at
         this point because we have no Fancytree to update. The null value 
         tells the routine below not to update the Fancytree. */
      try {
        let processSubNodes = false;
        let updateDatabase = true;
        /* For a couple of types of editors we really don't want to
           update the database. The database will be actually be
           updated when the new modification is sent to the server
           using web sockets. */
        if (HDLmGlobals.checkForInlineEditorOrGems() == true) 
          updateDatabase = false;
        /* Check for a very special case here. If we using debugger 
           to debug the GXE code, then we really do want to update
           the database. */
        if (gxeDebug == true)
          updateDatabase = true;
        /* console.log('s2'); */
        /* console.log(parentFancyNode); */
        /* console.log(currentTreeNode); */        
        insertIntoDone = true;
        /* console.log(currentTreeNode.details.extra); */
        /* console.log(currentTreeNode); */
        HDLmMenus.insertIntoBothTrees(parentFancyNode, 
                                      currentTreeNode, 
                                      usePendingInserts,
                                      processSubNodes,
                                      updateDatabase,
                                      handlingCmdInsert);
        /* console.log(currentTreeNode.details.extra); */
        /* console.log('about to call processPendingInserts()'); */
        HDLmTree.processPendingInserts();
        /* console.log(currentTreeNode); */
        /* console.log(usePendingInserts); */
      }
      catch (errorObj) { 
        console.log(errorObj); 
      } 
      /* console.log('s1'); */
      /* Clear the global values that show we were adding a new tree node
         of some type. This can only be done for the standard rule editor
         and can not be done for the GUI rule editor or the GUI extended
         editor. Why this check was added is not clear. Note that this 
         check is effectively bypassed by the else clause below. */
      if (HDLmGlobals.checkForGemOrGxe() == false) {
        HDLmMenus.clearPending();
      }
      else
        HDLmMenus.clearPending();
      /* console.log(currentTreeNode.details.extra); */
      /* Send any pending inserts to the server database */
      /* console.log('about to call processPendingInserts()'); */
      HDLmTree.processPendingInserts();
      /* At this point we may want to update the nodes inside the server. 
         This is done by sending a message to the server telling it to 
         reload all of the nodes. */
      if (HDLmGlobals.checkForInlineEditorOrGems()) {
        /* console.log('In HDLmMenus.finishTreeNode', newTreeEntry); */
        /* console.trace(); */
        /* If we are running under the debugger and we are using
           the GUI eXtended Editor (GXE) then we really don't want 
           to add a tree node here */
        let sendAddRequest = true;
        if (gxeDebug == true)
          sendAddRequest = false;
        if (sendAddRequest == true) {
          addTreeNodeWebSocketsDone = true;
          HDLmWebSockets.sendAddTreeNodeRequest(currentTreeNode);
          HDLmGXE.rulesUpdatedSet();
        }
      }     
      /* At this point we need to consider a very special case. We may have
         just added a company using the GUI editor or the GUI extended editor
         or the pass-through editor. In that case, we need to create four more 
         nodes from scratch. They are the data node and the lists node and the 
         reports node and the rules node. */
      if (HDLmGlobals.checkForGemOrGxeOrPass()) {
        /* Check if we just created a new company. This code will never 
           execute because of the false clause below. */
        if (false && currentTreeNode.type == 'company') {
          let updateDatabase = true;
          HDLmMenus.buildCompanyNode(currentTreeNode, updateDatabase);
        }
        /* Add some missing fields to the new node */
        if (false)
          HDLmPass.addMissingPassObject(currentTreeNode);
        /* In some cases, we may need to update a count field in a parent
           node. This is not always true. */
        if (false) {
          let fieldName = 'nodePath';
          let nodePath = currentTreeNode[fieldName];
          HDLmTree.resetCountField(nodePath);
        }
      }
      rvStr = 'finished';
      break;
    }
    return [insertIntoDone, addTreeNodeWebSocketsDone, rvStr]; 
  } 
  /* This method gets a URL value from an image string. If the image
     string does not contain a proper URL value, then this routine 
     returns an empty (zero-length) string. Note that the returned
     URL string will always start with two slashes if it is a network
     (HTTP or HTTPS) URL. It will start with 'data:' if it is a data
     URL. This code supports both network URLs and data URLs. The leading 
     protocol (if any) and the leading colon (if one exists) are always
     removed from network URLs. */
  static getUrlFromImage(imageStr) {
    let urlStr = '';
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      if (imageStr == null ||
          imageStr == '')
        break;
      /* At this point we need to analyze the image string */
      let imageStrToken;
      let imageStrTokens = HDLmString.getTokens(imageStr, '"');
      /* Make sure we have enough tokens */
      let imageStrTokensLength = imageStrTokens.length;
      if (imageStrTokensLength < 4)
        break;
      /* Check the first token for a special value. If the special value
         is found, then a special path is needed. */
      imageStrToken = imageStrTokens[0];
      if (imageStrToken.value == 'data') {
        /* Check the second token */
        imageStrToken = imageStrTokens[1];
        if (imageStrToken.value != ':')
          break;
        /* We now need to scan forwards looking for the comma token.
           The comma token will be followed by the data URL value. */
        for (let i = 2; i < imageStrTokensLength; i++) {
          imageStrToken = imageStrTokens[i];
          if (imageStrToken.value != ',')
            continue;
          if ((i + 1) >= imageStrTokensLength)
            break;
          /* The needed URL value is actually the entire image string */
          urlStr = imageStr;
          break;
        }
      }
      /* We can now check for a fairly standard network URL */
      else if (imageStrToken.value == 'http' ||
               imageStrToken.value == 'https') {
        let startOfUrl;
        /* Check the second token */
        imageStrToken = imageStrTokens[1];
        if (imageStrToken.value != ':')
          break;
        /* Check the third token */
        imageStrToken = imageStrTokens[2];
        if (imageStrToken.value != '/')
          break;
        else
          startOfUrl = imageStrToken.pos;
        /* Check the fourth token */
        imageStrToken = imageStrTokens[3];
        if (imageStrToken.value != '/')
          break;
        /* The needed URL value is actually the entire image string */
        urlStr = imageStr.substring(startOfUrl);
        break;
      }
      break;
    }
    return urlStr;
  }
  /* This method gets a URL value from a style string. If the style
     string does not contain a proper URL value, then this routine 
     returns an empty (zero-length) string. Note that the returned
     URL string will always start with two slashes if it is a network
     (HTTP or HTTPS) URL. It will start with 'data:' if it is a data
     URL. This code supports both network URLs and data URLs. The leading 
     protocol (if any) and the leading colon (if one exists) are always
     removed from network URLs. The style must be a background-image style. */
  static getUrlFromStyle(styleStr) {
    let urlStr = '';
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      if (styleStr == null ||
          styleStr == '')
        break;
      /* At this point we need to analyze the style string. The style
          string may specific a background image URL. This type of style
          can be used. */
      let styleStrToken;
      let styleStrTokens = HDLmString.getTokens(styleStr, '"');
      /* Make sure we have enough tokens */
      if (styleStrTokens.length < 9)
        break;
      /* Check the first token */
      styleStrToken = styleStrTokens[0];
      if (styleStrToken.value != 'background')
        break;
      /* Check the second token */
      styleStrToken = styleStrTokens[1];
      if (styleStrToken.value != '-')
        break;
      /* Check the third token */
      styleStrToken = styleStrTokens[2];
      if (styleStrToken.value != 'image')
        break;
      /* Check the fourth token */
      styleStrToken = styleStrTokens[3];
      if (styleStrToken.value != ':')
        break;
      /* Check the fifth token */
      styleStrToken = styleStrTokens[4];
      if (styleStrToken.tokType != HDLmTokenTypes.space)
        break;
      /* Check the sixth token */
      styleStrToken = styleStrTokens[5];
      if (styleStrToken.value != 'url')
        break;
      /* Check the seventh token */
      styleStrToken = styleStrTokens[6];
      if (styleStrToken.value != '(')
        break;
      /* The URL will be in the eigth token. The URL may be a 
         traditional HTTP/HTTPS URL or it may be a data URL 
         value. At least for now we can not handle data values.
         This has been changed we do support data URLs now.*/
      styleStrToken = styleStrTokens[7];
      urlStr = styleStrToken.value;
      /* Check if we have a data value at this point. We can not
         handle data values for now. This has been changed. We do
         support data URLs at this point. */
      if (urlStr.startsWith('data')) {
        urlStr = urlStr;
      }
      /* Remove a set of prefixes from the URL string. Note that
         the code below changes (a lot) network URLs, but does not
         change data URLs at all. */
      if (urlStr.startsWith('https'))
        urlStr = urlStr.substr(5);
      if (urlStr.startsWith('http'))
        urlStr = urlStr.substr(4);
      if (urlStr.startsWith(':'))
        urlStr = urlStr.substr(1);
      break;
    }
    return urlStr;
  }
  /* The next method handles a command for a specific Fancytree node. 
     The caller passes the Fancytree node and the command. This code 
     finds the modifications tree node and routes the command as need be. */
  static handleCmd(parentDescriptionId, parentValueId, 
                   fancyNode, cmdStr, nodeIdenGemOrGxe) {
    /* console.log('In handleCmd', cmdStr); */
    /* console.log('aet', HDLmGlobals.activeEditorType); */
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let HDLmDataNodePath = fancyNode.data[fieldName];
    /* Using the node path from the Fancytree node, find the node
       in the modifications tree */
    let currentTreeNode = HDLmTree.locateTreeNode(HDLmDataNodePath);
    /* Report an error if the node could not be found */
    if (currentTreeNode == null) {
      let nodeString = HDLmDataNodePath.toString();
      console.log('In HDLmMenus.handleCmd', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    let currentTreeType = currentTreeNode.type;
    /* Their are many different types of commands. Each command is handled by
       a separate set of code. */
    switch (cmdStr) {
      /* Handle a copy command */
      case 'copy':
        HDLmMenus.cmdCopy(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle a cut command */
      case 'cut':
        HDLmMenus.cmdCut(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle a delete command */
      case 'delete':
        HDLmMenus.cmdDelete(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle an disable command */
      case 'disable':
        HDLmMenus.cmdDisable(currentTreeNode, currentTreeType);
        break;
      /* Handle an enable command */
      case 'enable':
        HDLmMenus.cmdEnable(currentTreeNode, currentTreeType);
        break;
      /* Handle an insert command */
      case 'insert':
        let inlineStartupFlagFalse = false;
        HDLmMenus.cmdInsert(parentDescriptionId,
                            parentValueId, 
                            currentTreeNode,
                            currentTreeType, 
                            nodeIdenGemOrGxe,
                            inlineStartupFlagFalse);
        break;
      /* Handle a match command */
      case 'match':
        HDLmMenus.cmdMatch(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle a paste command */
      case 'paste':
        HDLmMenus.cmdPaste(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle a rename command */
      case 'rename':
        HDLmMenus.cmdRename(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle a setno command */
      case 'setno':
        HDLmMenus.cmdSetNo(currentTreeNode, currentTreeType);
        break;
      /* Handle a setyes command */
      case 'setyes':
        HDLmMenus.cmdSetYes(currentTreeNode, currentTreeType);
        break;
      /* Handle a stats command */
      case 'stats':
        HDLmMenus.cmdStats(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Report an error if the command type did not match one of the expected choices */
      default: {
        let errorString = cmdStr;
        HDLmError.buildError('Error', 'Invalid type', 18, errorString);
        break;
      }
    }
  }
  /* The next method handles a keydown event for a specific Fancytree node. 
     The caller passes the Fancytree node and the key operation. This code 
     finds the modifications tree node and routes the command as need be.
     In some cases, the Fancytree node may not be set. We need to handle
     this case as well. The Fancytree node will not be set, if no Fancytree
     node currently has focus. This means that the Fancytree node will be 
     set to null. */
  static handleKeyboard(source, fancyNode, eventStr) {
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let HDLmDataNodePath;
    let currentTreeNode;
    let currentTreeType;
    if (fancyNode != null) {
      /* console.log('HDLmMenus.handleKeyboard'); */
      /* console.log(fieldName); */
      /* console.log(fancyNode); */
      /* console.log(fancyNode.data); */
      HDLmDataNodePath = fancyNode.data[fieldName];
      /* Using the node path from the Fancytree node, find the node
         in the modifications tree */
      currentTreeNode = HDLmTree.locateTreeNode(HDLmDataNodePath);
      /* Report an error if the node could not be found */
      if (currentTreeNode == null) {
        let nodeString = HDLmDataNodePath.toString();
        console.log('In HDLmMenus.handleKeyBoard', nodeString);
        HDLmError.buildError('Error', 'Locate', 9, nodeString);
        return;
      }
      currentTreeType = currentTreeNode.type;
    }
    else {
      currentTreeNode = null;
      currentTreeType = null;
    }
    /* Their are many different types of key operations. Each key operation 
       is handled by a separate set of code. */
    switch (eventStr) {
      /* Handle a ctrl-c (Copy) keyboard operation */
      case 'ctrl+c':
        HDLmMenus.cmdCopy(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle a ctrl-s (save) keyboard operation */
      case 'ctrl+s':
        HDLmTree.updateTree(); 
        break;
      /* Handle a ctrl-v (Paste) keyboard operation  */
      case 'ctrl+v':
        HDLmMenus.cmdPaste(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle a ctrl-x (cut) keyboard operation */
      case 'ctrl+x':
        HDLmMenus.cmdCut(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle a ctrl-y (redo) keyboard operation. For some reason
         we get two copies of this event. We only want to process
         the event that came from the Fancytree. The other event
         just gets ignored. */
      case 'ctrl+y':
        HDLmUnRe.redoChange(fancyNode, currentTreeNode, currentTreeType, source);
        break;
      /* Handle a ctrl-z (undo) keyboard operation. For some reason
         we get two copies of this event. We only want to process
         the event that came from the Fancytree. The other event
         just gets ignored. */
      case 'ctrl+z':
        HDLmUnRe.undoChange(fancyNode, currentTreeNode, currentTreeType, source);
        break;
      /* Handle a delete keyboard operation */
      case 'del':
        HDLmMenus.cmdDelete(fancyNode, currentTreeNode, currentTreeType);
        break;
      /* Handle an esc (Escape) keyboard operation */
      case 'esc':
        HDLmMenus.clearPending();
        break;
      /* Don't report an error if the key operation did not match one
         of the expected choices */
      default:
        break;
    }
  }
  /* The next method handles a key down event from a display widget. The 
     caller passes the current tree node (not Fancytree node) and the 
     key operation (event. This code handles the key down (key press) 
     event as need be. */
  static handleKeyboardWidget(currentTreeNode, event) { 
    /* Check if the GUI rule editor is active. Send all 
       key operations to a special routine if need be. */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem) {
      let gemHandleKeyboardNull = null;
      HDLmGEM.handleKeyboard(gemHandleKeyboardNull, currentTreeNode, event);
      return;
    }
    /* Check if the GUI extended rule editor is active. Send all key
       operations to a special routine if need be. */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
      let gxeHandleKeyboardNull = null;
      HDLmGXE.handleKeyboard(gxeHandleKeyboardNull, currentTreeNode, event);
      return;
    }
    /* Their are many different types of key operations. Each key operation 
       is handled by a separate set of code. */
    let eventStr = event.key;
    switch (eventStr) {
      /* Handle an esc (Escape) keyboard operation */
      case 'Escape':         
        HDLmMenus.clearPending();
        break;
      /* Don't report an error if the key operation did not match one
         of the expected choices */
      default:
        break;
    }
  }
  /* Add the new tree node to the Fancytree and the standard tree. 
     The caller passed the new tree node and Fancytree node that 
     should serve as the parent of the new tree node. Note that 
     this routine also updates the node tree as well as the 
     Fancytree node tree. The Fancytree node may be null, in 
     which case we will not update the Fancytree. */
  static insertIntoBothTrees(parentFancyNode, childTreeNode, 
                             usePendingInserts = false,
                             processSubNodes = false,
                             updateDatabase = false,
                             handlingCmdInsert = false) {
    /* console.log('HDLmMenus.insertIntoBothTrees'); */
    /* console.log(childTreeNode); */
    /* Get the node path associated with the tree of one or more
       nodes that are going to be inserted */
    let ajaxPromise;
    let nodePath = childTreeNode.nodePath;
    /* console.log(parentFancyNode); */
    /* console.log(childTreeNode); */
    /* console.log(usePendingInserts); */
    /* Insert all (one or more) rows associated with the node tree.
       This is only really done if the use pending inserts flag is
       set to false. If this flag is set to true, then the child
       tree node is added to the list of pending inserts. */
    if (updateDatabase == true) {
      if (usePendingInserts == false) 
        ajaxPromise = HDLmTree.passInsertOneTreePos(childTreeNode);
      else 
        HDLmTree.addPendingInserts(childTreeNode, processSubNodes);
    }
    /* The next step is to add the current tree node to the children
       array of the parent of the current tree node. */
    let addBool = HDLmTree.addToParentTree(childTreeNode);
    if (addBool == false) {
      let nodePathString = nodePath.toString();
      let errorText = `Child node (${nodePathString}) not added to parent node`;
      HDLmAssert(false, errorText);
    }
    /* Perform some related operatons. We may need to update some count
       values at this point. We clearly need to set the update status flag.
       If any of the inline editors are in use, we need to update the server
       and reload the current page. */
    HDLmTree.updateRelatedOperations(nodePath) 
    /* Check if the Fancytree node is null or not. Just return if the Fancytree
       node is null. */
    if (parentFancyNode != null) {
      /* Some of the new tree nodes we need to add are actually folders. However,
         some are not. Set a boolean field showing if the new tree node is a folder
         of not. */
      let newLazy = true;
      let newNodeFolder = true;
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
        newLazy = false;
        newNodeFolder = false;
      }
      else if (HDLmGlobals.checkForGemOrGxe() &&
               (childTreeNode.type == 'line'   ||
                childTreeNode.type == 'ignore' ||
                childTreeNode.type == 'mod'    ||
                childTreeNode.type == 'value')) {
        newLazy = false;
        newNodeFolder = false;
      }
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore &&
        childTreeNode.type == 'ignore') {
        newLazy = false;
        newNodeFolder = false;
      }
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod &&
        childTreeNode.type == 'mod') {
        newLazy = false;
        newNodeFolder = false;
      }
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass &&
               (childTreeNode.type == 'line'   ||
                childTreeNode.type == 'ignore' ||
                childTreeNode.type == 'mod'    ||
                childTreeNode.type == 'value')) {
        newLazy = false;
        newNodeFolder = false;
      }
      else if (HDLmGlobals.checkForInlineEditor() &&
        childTreeNode.type == 'mod') {
        newLazy = false;
        newNodeFolder = false;
      }
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
        newLazy = false;
        newNodeFolder = false;
      }
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store &&
        childTreeNode.type == 'store') {
        newLazy = false;
        newNodeFolder = false;
      }
      /* Build the new Fancytree node that we need to add to the fancy
         tree. We may need to add this node in one of several places. 
         The code below determines where to add the new Fancytree node. */
      let lastNodePathValue = childTreeNode.nodePath[childTreeNode.nodePath.length - 1];
      let newFancyNode = {
        title: lastNodePathValue,
        tooltip: childTreeNode.tooltip,
        folder: newNodeFolder,
        lazy: newLazy
      };
      /* console.log('In HDLmMenus.insertIntoBothTrees', parentFancyNode); */
      /* console.log(newFancyNode); */
      /* console.log(childTreeNode); */
      /* We can now add the new Fancytree tree node to the Fancytree */
      HDLmTree.addToParentFancy(parentFancyNode, newFancyNode, 
                                childTreeNode, handlingCmdInsert);
    }
    return ajaxPromise;
  }
  /* This method provides default values for a new modification that
     is being built. Of course, the default values may be wrong. However,
     they may be OK as well. The user is free to change (using the UI)
     these values as need be. */
  static provideDefaultValues(operationType,
                              parentTreeNode,
                              newTreeNode,
                              newNodeIdenObj,
                              newUrlValueStr,
                              newOrderInfo,
                              newCopyElements) {
    /* console.log(newTreeNode); */
    let forceCallToFinish = false;
    /* Set a default value for the new modification type */
    let newDetailsType = 'textchecked';
    let newModName = '';
    let parameterNumberUsed;
    let ruleFinished = false;
    let buildPerceptualHash = false;
    let buildPerceptualUrl;
    let newPathValueString;
    let rvStr = '';
    /* Get all of the current children of the parent node */
    let childList = parentTreeNode.children;
    /* Set the modification path value */
    if (newUrlValueStr != null) {
      newPathValueString = HDLmUtility.getPathString(newUrlValueStr);
      HDLmUtility.setIfNotSet(newTreeNode.details, 'pathvalue', newPathValueString);
    }
    /* Check if we should try to build an image rule. An image rule is
       only constructed if we are processing an (img) DOM element. Of
       course, this is only a guess. */ 
    if (ruleFinished == false  &&
        newOrderInfo == null   &&
        newNodeIdenObj != null &&
        newNodeIdenObj.hasOwnProperty('attributes')     &&
        newNodeIdenObj.attributes != null               &&
        newNodeIdenObj.attributes.hasOwnProperty('src') &&
        newNodeIdenObj.attributes.hasOwnProperty('tag') &&
        newNodeIdenObj.attributes.tag == 'img') {
      if (1 == 1) {
        /* The code below does seem to work. The type is set to the correct
           value. An array is built for the new order values. The first and
           only entry in the array is set to a default value. */
        if (1 == 1) {
          /* Set and save a few values needed to build the preceptual hash
             much later. These value are only needed in some cases. */
          let newImageInfo;
          newImageInfo = newNodeIdenObj.attributes.src;
          if (newImageInfo != null) {
            newImageInfo = HDLmUtility.removeHttpPrefix(newImageInfo);
            buildPerceptualHash = true;
            buildPerceptualUrl = newImageInfo;
          }
          newDetailsType = 'image';
          newTreeNode.details.type = '';
          HDLmUtility.setIfNotSet(newTreeNode.details, 'type', newDetailsType);
          let newImages = [newImageInfo];
          HDLmUtility.setIfNotSet(newTreeNode.details, 'images', newImages);
          ruleFinished = true;
          /* Finish building the new tree node and add it to the tree */
          forceCallToFinish = true;
        }
      }
    }
    /* Check if we should try to build an order rule. An order rule is
       only constructed if we were passed the number of child elements.        
       Of course, this is just a guess. */
    if (ruleFinished == false &&
        newOrderInfo != null) { 
      if (1 == 1) {
        /* The code below does seem to work. The type is set to the correct
           value. An array is built for the new order values. The first and
           only entry in the array is set to a default value. */
        if (1 == 1) {
          newDetailsType = 'order';
          newTreeNode.details.type = '';
          HDLmUtility.setIfNotSet(newTreeNode.details, 'type', newDetailsType);
          let newOrders = [newOrderInfo];
          HDLmUtility.setIfNotSet(newTreeNode.details, 'orders', newOrders);
          ruleFinished = true;
          /* Finish building the new tree node and add it to the tree */
          forceCallToFinish = true;
        }
      }
    }
    /* Check if we should try to build a style rule. Try to set
       the extra information field and the modification type
       value. This can only be done if the style is set to a
       specific type value or values. Of course, this is just 
       a guess. */
    if (ruleFinished == false &&
        newNodeIdenObj != null &&
        newNodeIdenObj.hasOwnProperty('attributes') &&
        newNodeIdenObj.attributes != null &&
        newNodeIdenObj.attributes.hasOwnProperty('style')) {
      let styleStr = newNodeIdenObj.attributes.style;
      if (styleStr != null &&
          styleStr != '') {
        /* At this point we need to analyze the style string. The style
           string may specific a background image URL. This type of style
           can be used. Note that we support network URLs (that typically
           start with two slashes and data URLs (that typically start with
           a string such as 'data:'. */
        let urlStr = HDLmMenus.getUrlFromStyle(styleStr); 
        /* The code below does seem to work. The type is set to the correct
           value. An array is built for the new style values. The first and
           only entry in the array is set to a default value. */
        if (urlStr != '') {
          /* Set and save a few values needed to build the preceptual hash
             much later. These value are only needed in some cases. */
          buildPerceptualHash = true;
          buildPerceptualUrl = urlStr;
          /* Set the type value correctly */
          newDetailsType = 'style';
          HDLmUtility.setIfNotSet(newTreeNode.details, 'extra', 'background-image');
          newTreeNode.details.type = '';
          HDLmUtility.setIfNotSet(newTreeNode.details, 'type', newDetailsType);
          let styles = [urlStr];
          HDLmUtility.setIfNotSet(newTreeNode.details, 'styles', styles);
          ruleFinished = true;
          /* Finish building the new tree node and add it to the tree */
          forceCallToFinish = true;
        }
      }
    }
    /* Check if we should try to build a replace rule. Try to set
       the modification type value. Note that the node identifier
       in this case, is not really a node identifier. It is a JSON
       string containing a set of HTML elements. Of course, we can
       not set the node identifier field. However, we can set one
       of the replace values. */ 
    if (ruleFinished == false &&
        newNodeIdenObj != null &&
        newNodeIdenObj.hasOwnProperty('attributes') &&
        newCopyElements == true) {
      /* The code below does seem to work. The type is set to the correct
         value. An array is built for the new text values. The first and
         only entry in the array is set to a default value. */
      if (1 == 1) {
        newDetailsType = 'replace';
        /* Try to clear a set of rule fields */ 
        newTreeNode.details.pathvalue = HDLmUtility.getPathString(newUrlValueStr);
        newTreeNode.details.nodeiden = '';
        newTreeNode.details.type = '';
        /* console.log(newTreeNode); */
        /* console.log(newTreeNode.details); */
        /* console.log(newTreeNode.details.type); */
        /* console.log(typeof newTreeNode.details.type); */
        HDLmUtility.setIfNotSet(newTreeNode.details, 'type', newDetailsType);
        /* Try to build the JSON object that we can use to update the target 
           web page. This will only work if we coped an entire web page. */
        let newReplaceObj; 
        newReplaceObj = HDLmMenus.searchNodeTag(newNodeIdenObj, 'body');
        if (newReplaceObj != null) {
          newReplaceObj.tag = 'div';
          newReplaceObj.attributes = null;
          newReplaceObj.text = null;
        }
        /* We may have just copied part of a web page */
        else  
          newReplaceObj = newNodeIdenObj;
        /* Build an array of replace(ment) text with just one entry */
        let replaceValues = [JSON.stringify(newReplaceObj)];
        HDLmUtility.setIfNotSet(newTreeNode.details, 'replacevalues', replaceValues);
        ruleFinished = true;
        /* Finish building the new tree node and add it to the tree */
        forceCallToFinish = true;
      }
    }
    /* Check if we should try to build a textchecked rule. Try to set
       the extra information field and the modification type value. 
       This can only be done if the inner text is set to a non-blank
       value. Of course, this is just a guess. */
    if (ruleFinished == false &&
        newNodeIdenObj != null &&
        newNodeIdenObj.hasOwnProperty('attributes') &&
        newNodeIdenObj.attributes != null &&
        newNodeIdenObj.attributes.hasOwnProperty('innertext')) {
      let innerTextStr = newNodeIdenObj.attributes.innertext;
      if (innerTextStr != null &&
          innerTextStr != '') {
        /* The code below does seem to work. The type is set to the correct
           value. An array is built for the new text values. The first and
           only entry in the array is set to a default value. */
        if (1 == 1) {
          newDetailsType = 'textchecked';
          HDLmUtility.setIfNotSet(newTreeNode.details, 'extra', innerTextStr);
          newTreeNode.details.type = '';
          HDLmUtility.setIfNotSet(newTreeNode.details, 'type', newDetailsType);
          let newTexts = [innerTextStr];
          HDLmUtility.setIfNotSet(newTreeNode.details, 'newtexts', newTexts);
          ruleFinished = true;
          /* Finish building the new tree node and add it to the tree */
          forceCallToFinish = true;
        }
      }
    }
    /* Check if we should try to build a text rule (not a textchecked
       rule). In this case, we don't need to set the extra information
       field. We do need to set the modification type value. This can 
       only be done if the inner text is set to a null or an empty value 
       Of course, this is just a guess. */
    if (ruleFinished == false &&
      newNodeIdenObj != null &&
      newNodeIdenObj.hasOwnProperty('attributes') &&
      newNodeIdenObj.attributes != null &&
      newNodeIdenObj.attributes.hasOwnProperty('innertext')) {
      let innerTextStr = newNodeIdenObj.attributes.innertext;
      if (innerTextStr == null ||
          innerTextStr == '') {
        /* The code below does seem to work. The type is set to the correct
           value. An array is built for the new text values. The first and
           only entry in the array is set to a default value. */
        if (1 == 1) {
          newDetailsType = 'text';
          newTreeNode.details.type = '';
          HDLmUtility.setIfNotSet(newTreeNode.details, 'type', newDetailsType);
          let newTexts = ['New Text'];
          HDLmUtility.setIfNotSet(newTreeNode.details, 'newtexts', newTexts);
          ruleFinished = true;
          /* Finish building the new tree node and add it to the tree */
          forceCallToFinish = true;
        }
      }
    }
    /* Check if a parameter number is used with the current type
       of rule. This is true in some cases, but not in others. */
    if (HDLmMod.getModificationTypeParmNumberUsed(newDetailsType) == false)
      parameterNumberUsed = false;
    else
      parameterNumberUsed = true;
    /* Build a map that shows how many times each parameter number 
       is used */
    let parmMapObj = HDLmTree.buildParameterMap(childList);
    if (parmMapObj != null) {
      let minParameterNumber = HDLmTree.findLowestParameter(parmMapObj);
      if (parameterNumberUsed)
        HDLmUtility.setIfNotSet(newTreeNode.details, 'parameter', minParameterNumber);
    }
    /* Build and use the new rule name if possible */
    let removeTailsFalse = false;
    newModName = HDLmMenus.buildModificationName(parentTreeNode,  
                                                 newPathValueString, 
                                                 newDetailsType,
                                                 removeTailsFalse);
    HDLmUtility.setIfNotSet(newTreeNode.details, 'name', newModName);
    /* Get the length of new tree node, node path */
    let nodePathLength = newTreeNode.nodePath.length;
    /* The last entry in the node path will be (should be) the actual 
       name of the modification / rule. Reset this name as need be.
       The last entry should / will have a temporary name value. We
       need to reset this name to it's correct and final value. */
    if (nodePathLength == (HDLmDefines.getNumber('HDLMSITENODEPATHLENGTH')+1))
      newTreeNode.nodePath[nodePathLength - 1] = newModName;
    /* Check if we must build the perceptual hash value at this point */
    if (buildPerceptualHash) {
      /* We may or may not want to add some additional attribute information  
         to the node identifier object. We only do this if we are handling
         a style that uses a background image. If that is true (which 
         will always be true at this point), then we get the perceptual
         hash value for the background image and add it to the attributes.
  
         The call below does not actually do anything immediately. At some
         point the network operation will complete and the data will be used
         to update the node identifier. */
      let newPromise = HDLmUtility.getPerceptualHash(buildPerceptualUrl); 
      /* Get the length of new tree node, node path */ 
      let nodePathLength = newTreeNode.nodePath.length;
      /* Copy most of the node path. Note that the new modification name 
         is not copied below. */
      let localNodePath = newTreeNode.nodePath.slice(0, nodePathLength-1);
      /* Add the new modification name to the local node path. This should
         always be the correct, updated value. */
      localNodePath.push(newModName); 
      /* The next statement will use the promise obtained above. When the
         promise resolves, the perceptual hash data will be used to update
         the node identifier values for the current node. */
      HDLmUtility.usePerceptualPromise(newPromise, localNodePath);
    }
    /* Check if we must call a special routine to finish building the new
       tree node */
    if (forceCallToFinish) {
      let addTreeNodeWebSocketsDone;
      let insertIntoDone;
      let callFromCallbackFalse = false;
      let containerAvailableFalse = false;
      let currentDomElementNull = null;
      let newTreeEntryFalse = false;
      let handlingCmdInsertFalse = false;
      let needUserInputTrue = true;
      let possibleRuleTypesNull = null;
      [insertIntoDone, addTreeNodeWebSocketsDone, rvStr] =
        HDLmMenus.finishTreeNode(newTreeNode, containerAvailableFalse, 
                                 possibleRuleTypesNull, currentDomElementNull,
                                 newTreeEntryFalse, handlingCmdInsertFalse,
                                 callFromCallbackFalse, needUserInputTrue);
    }
    return rvStr;
  }
  /* This method searches a set of nodes (a node hierarchy) for 
     the desired tag value. If the desired tag value is found,
     the node with the desired tag is returned to the caller. */
  static searchNodeTag(nodeObj, searchStr) {
    /* Check if we have found the correct tag */
    if (nodeObj.hasOwnProperty('tag') &&
        nodeObj.tag != null &&
        nodeObj.tag == searchStr)
      return nodeObj;
    /* Recursively check all of the subnode of the current node */
    if (nodeObj.hasOwnProperty('subnodes') &&
        nodeObj.subnodes != null) {
      let subNodes = nodeObj.subnodes;
      let subNodesLength = subNodes.length;
      for (let i = 0; i < subNodesLength; i++) {
        let subNode = subNodes[i];
        let subNodeSearch = HDLmMenus.searchNodeTag(subNode, searchStr);
        if (subNodeSearch != null)
          return subNodeSearch;
      }
    }
    /* Since we did not get a match, just return null */
    return null;
  }
  /* This method sets the pass-through value of the current tree node to
     a valud passed by the caller. Of course, various types of error 
     checking is done as well. */
  static setPassThruStatus(currentTreeNode, currentTreeType, passThru) {
    /* Check if the node type is acceptable for the current editor type */
    HDLmMenus.cmdSetCheck(currentTreeNode, currentTreeType);
    /* Reset the pass-through status of the current instance */
    currentTreeNode.details.passThru = passThru;
    /* convert the boolean value to a string that can be displayed */
    let passThruStr = (passThru) ? 'Yes' : 'No';
    /* Locate the correct widget and set then enabled box */
    let widget = currentTreeNode.containerWidget.associatedWidgets['passThru'];
    /* console.log('In HDLmMenus.setPassThruStatus'); */
    widget.setTextValue(passThruStr);
    /* We don't really need to so anything here for any of the 
       inline editors or other editors that don't display companies.
       The pass-through editor will send the updated tree (not
       the Fancytree) back to the server sooner or later. */
    widget.redrawCallback();
  }
}