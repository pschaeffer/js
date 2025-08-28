/**
 * Class for supporting the tree of nodes
 *
 * The comments below apply mostly to the case where the node tree is used
 * to store and/or represent actual HTML modifications. This code is also
 * used to handle proxy definitions, configuration values, stored values,
 * ignore-lists, and pass-through information.
 *
 * In the HTML modifications case, the tree will have seven levels. The
 * levels are top, Companies, company, Rules, division, site, and modifications.
 *
 * In the proxy definitions case, the tree will have two levels. The
 * levels are top and company. The company tree level will have all
 * of the proxy definition details for each company.
 *
 * In the configuration values case, the tree will have two levels. The
 * levels are top and configuration (set of). The configuration tree
 * level will have the configuration values.
 *
 * Each instance of this class describes one node in the node tree. The
 * top-level node is called the top node. The top node has subnodes
 * for each company. Of course, the top node may have zero, one, or
 * more than one company subnodes.
 *
 * Each company node has zero or more subnodes. Each subnode of a company
 * node is a division node. The number of division nodes may be zero or
 * greater than zero.
 *
 * Each division node has zero or more subnodes. Each subnode of a division
 * node is a site node. The number of site nodes may be zero or greater than
 * zero.
 *
 * Each site node has zero or more subnodes. Each subnode of a site node is
 * a modification node. The number of modification nodes may be zero or
 * greater than zero.
 *
 * In all cases, child nodes are stored in the children array. Child nodes
 * must always be in ascending name order. This order must be maintained
 * when new child nodes are inserted into the children array.
 *
 * Each node is now stored in a separate record in the database maintained
 * by the server. This means that when a delete at a high level (say a delete
 * of an entire company), all of the subnodes must also be deleted. Of course,
 * all of the records for all of those nodes must also be deleted.
 *
 * The reverse is true in some case. For example, if a paste is done that adds
 * an entire tree of nodes, then a record must be added to the database for
 * each new node. Note that these new nodes will have to be inserted and won't
 * have (at the outset) database ID values. The database server will provide
 * these ID value as part of the reply to the insert.
 *
 * In some cases (such as the GEM or GXE editors), we must create a set of nodes 
 * starting from the company node, before a modification rule can be created. All 
 * of these new nodes (including the rule node) must be added to the tree in memory 
 * and a record in the database must be created for each node (including the rule node).
 *
 * If the name of a node is changed, then a database update must be done for that
 * node. The name of the changed node will be in the path of all nodes under the
 * node with the changed name. These changes must be made and the database server
 * must be updated for each node under the node with the changed name. 
 * 
 * The tree of nodes defines the high-level structure of the whatever the tree 
 * represents. 
 * 
 * Each tree node has a type. Take a look at the Java code for a better 
 * explanation of this class. Note that the details field always refers
 * to an HDLmMod object.  
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
class HDLmTree {
  /* Build a tree instance. The caller provides the name and type.
     Initially, each tree instance has no children. Children can
     be added later.

     The type value below is a tree node type (such as 'top' or
     'mod'). It is not the specific type of a modification node
     (such as 'attribute' or 'fontcolor'. */
  constructor(nodeType, tip) {
    this.tooltip = tip;
    this.type = nodeType;
    this.children = [];
    this.containerWidget = null;
  }
  /* Add a subnode to a node if the subnode does not already
     exist. Always return the subnode to the caller. The
     returned subnode will either be a new subnode (if need
     be) or an existing subnode.

     This routine does not appear to be in use at this time.
     Note that the levels do not appear to match the levels
     used by the pass-through editor or the inline editors. */
  static addNode(parentNode, subKey) {
    let subNode = {};
    let subTip = '';
    let subType = '';
    subNode = HDLmTree.hasNode(parentNode.children, subKey);
    if (subNode != null) {
      ;
    }
    else {
      if (parentNode.type == 'companies') {
        /* Companies nodes will have individual companies as children.
           The number of individual companies may be zero, one, or more
           than one. */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)
          subType = 'company';
        /* Companies nodes will have individual companies as children.
           The number of individual companies may be zero, one, or more
           than one. */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass)
          subType = 'company';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      else if (parentNode.type == 'company') {
        /* Company nodes actually have four different kinds of children,
           if the GUI editor or the GUI extended editor is active. The
           first type of child node is a data node. The second type of 
           child node is a lists node (a lists node has zero, one, or 
           many ignore-lista as subnodes). The third type of child node
           is a reports node (a reports node has zero, one, or many
           reports as subnodes). The fourth type of child node is
           a rules node. A rules node can hanve zero, one, or many 
           divisions under it.

           Note that a company node (if the pass-through editor is active)
           will always have exactly four subnodes, no more, no less. */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
          subType = 'lists';
        }
        /* List (as specified below) really means an ignore-list */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
          subType = 'list';
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod)
          subType = 'division';
        /* Company nodes actually have four different kinds of children,
           if the pass-through editor or a related editor is active. The 
           first type of child node is a data node. The second type of
           child node is a lists node (a lists node has zero, one, or
           many ignore-lista as subnodes). The third type of child node 
           is a reports node (a reports node has zero, one, or many reports
           as subnodes). The fourth type of child node is a rules node.
           A rules node can hanve zero, one, or many divisions under it.

           Note that a company node (if the pass-through editor is active)
           will always have exactly four subnodes, no more, no less. */
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          subType = 'lists';
        }
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
          subType = 'division';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      /* Data nodes are alway one of the four children of a company
         node (assuming the pass-through editor or a related editor     
         is active). The other children of a company node are a lists
         node (assuming the pass-through editor or a related editor 
         is active), a reports node, and a rules node. A data node
         will zero, one, or many divisions as children of the data node. */
      else if (parentNode.type == HDLmDefines.getString('HDLMDATATYPE')) {
        subType = 'division';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      else if (parentNode.type == 'division') {
        subType = 'site';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      /* Lines nodes are alway one of the four children of a report
         node. Lines nodes are only used with the pass-through editor.
         A lines node will have zero, one, or more line nodes as
         children of the lines node. The name of a lines node
         will always be one of 'Overall', 'Valid', or 'Invalid'
         (without the quotes). */
      else if (parentNode.type == 'lines') {
        subType = 'line';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      /* List nodes may either be direct children of company nodes,
         if the ignore-list editor is active. However, list nodes
         will be children of lists nodes if the pass-through editor
         is active. In one (exactly) case, a list node will be a
         direct child of a report node, if the pass-through editor
         is in use. A list node is always an ignore-list node with
         ignore instances as children. */
      else if (parentNode.type == 'list') {
        subType = 'ignore';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      /* Lists nodes are alway one of the four children of a company
         node. Lists nodes are only used with the pass-through or a 
         related editor. A lists node will have zero, one, or more 
         ignore-lists as children of the lists node. */
      else if (parentNode.type == 'lists') {
        subType = 'list';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      /* Report nodes are always a child of a reports node. Report nodes
         are only used with the pass-through or a related editor. A report 
         node will always have four child nodes. The first of the four child 
         nodes will always be a lines nodes for the overall report output. The
         second and third child nodes are the valid report output, and the 
         invalid report output. The fourth child node will always be a list 
         (ignore-list) with the ignores that were actually used to process 
         the report. */
      else if (parentNode.type == 'report') {
        subType = 'lines';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      /* Reports nodes are alway one of the four children of a company
         node (assuming the pass-through editor or a related editor is active).
         The other children of a company node are a data node, a lists node 
         (assuming the pass-through editor or a related editor is active) and
         a rules node. A reports node will zero, one, or many reports as 
         children of the reports node. */
      else if (parentNode.type == 'reports') {
        subType = 'report';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      /* Rules nodes are alway one of the four children of a company
         node (assuming the pass-through editor or a related editor     
         is active). The other children of a company node are a data node,
         a lists node (assuming the pass-through editor or a related editor
         is active), and a reports node. A rules node will zero, one, or 
         many divisions as children of the rules node. */
      else if (parentNode.type == HDLmDefines.getString('HDLMRULESTYPE')) {
        subType = 'division';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      else if (parentNode.type == 'site') {
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
          let getGreatGrandParentType = HDLmTree.getGreatGrandParentType(parentNode);
          /* Check the type of the great grand parent node. The type
             determines the type of the child of the site node. */
          if (getGreatGrandParentType == 'rules')
            subType = 'mod';
          else
            subType = 'value';
        }
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod)
          subType = 'mod';
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
          let getGreatGrandParentType = HDLmTree.getGreatGrandParentType(parentNode);
          /* Check the type of the great grand parent node. The type
             determines the type of the child of the site node. */
          if (getGreatGrandParentType == 'rules')
            subType = 'mod';
          else
            subType = 'value';
        }
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
          subType = 'mod';
        }
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
          subType = 'mod';
        }
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
          subType = 'store';
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      /* The top node will generally have zero, one, or more company
         nodes as children of the top node. Of course, this will not
         be true, if the configuration editor is active or if one of
         the inline editors is active. */
      else if (parentNode.type == 'top') {
        /* Check what type of editor is active. The type of the nodes
           under the top node, depend on the type of editor that is
           currently active. */
        if (HDLmGlobals.checkForInlineEditor())
          subType = 'mod';
        else
          subType = 'companies';
        /* Change the sub type in a number of cases */
        if (subType == 'company') {
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config)
            subType = 'config';
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem)
            subType = 'compgem';
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)
            subType = 'compgxe';
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
            subType = 'compignore';
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod)
            subType = 'compmod';
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
            subType = 'companies';
          }
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup)
            subType = 'comppopup';
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy)
            subType = 'compproxy';
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple)
            subType = 'compsimple';
          if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
            subType = 'compstore';
        }
        subTip = HDLmModTreeInfo[subType]['tooltip'];
      }
      /* Build the new subnode to be added to the node tree */
      subNode = new HDLmTree(subType, subTip);
      /* Search for the first existing node with a name that is
         greater than or equal to the current name. We must insert
         the new subnode just before the node with a higher name. */
      let subPos = parentNode.children.findIndex(childNode =>
        childNode.nodePath[childNode.nodePath.length - 1] >= subKey);
      /* If we did not find an existing node with a name that is
         greater than or equal to the current name. We must insert
         the new subnode at the end of the children array. Note
         that the children array may be empty. */
      if (subPos == -1)
        subPos = parentNode.children.length;
      /* Insert the new subnode in the correct position */
      parentNode.children.splice(subPos, 0, subNode);
    }
    return subNode;
  }
  /* This routine assumes that the parent Fancytree node has
     an array of children (possibly an empty list). The new 
     node is added (if need be) in the correct location. 
     The new Fancytree node is returned to the caller. */
  static addNodeToFancy(parentFancyNode, childFancyNode, childTreeNode) {
    let newFancyNode = null;
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    /* At this point we need to scan all of the children of the
       parent Fancytree node to determine where the new Fancytree
       node should be inserted. The new Fancytree node might be
       before any existing child Fancytree nodes or it might be
       after all of the existing Fancytree nodes. Of course, it
       might be in the middle of the existing Fancytree nodes. */
    let childrenArray = parentFancyNode.getChildren();
    /* Make sure we obtained a list */
    /* console.log(childrenArray); */
    /* console.log(typeof childrenArray) */
    if (typeof childrenArray != 'object') {
      let errorText = 'Fancytree children array is not an object';
      HDLmAssert(false, errorText);
    }
    if (Array.isArray(childrenArray) == false) {
      let errorText = 'Fancytree children array is not an array';
      HDLmAssert(false, errorText);
    }
    let childrenLength = childrenArray.length;
    let childTreeNodeName = childTreeNode.nodePath[childTreeNode.nodePath.length - 1];
    let i;
    for (i = 0; i < childrenLength; i++) {
      if (childTreeNodeName <= childrenArray[i].title)
        break;
    }
    /* Check if the new Fancytree node is already in the children 
       array. Return the existing Fancytree node if possible. */
    if (i < childrenLength &&
      /* console.log('In addNodeToFancy', 'node already exists'); */
      childTreeNodeName == childrenArray[i].title) {
      newFancyNode = childrenArray[i];
    }
    /* Insert the new Fancytree node in right place */
    else if (i >= childrenLength) {
      /* console.log('In addNodeToFancy', 'About to add the node', i, childrenLength, childFancyNode); */
      /* console.log('In addNodeToFancy', 'node added with addChildren'); */
      newFancyNode = parentFancyNode.addChildren(childFancyNode);
      newFancyNode.data[fieldName] = childTreeNode.nodePath.slice();
      /* console.log(newFancyNode); */
    }
    else {
      /* console.log('about to add the node'); */
      /* console.log('In addNodeToFancy', 'node added with addNode'); */
      newFancyNode = childrenArray[i].addNode(childFancyNode, 'before');
      newFancyNode.data[fieldName] = childTreeNode.nodePath.slice();
      /* console.log(newFancyNode); */
    }
    /* console.log('about to return'); */
    return newFancyNode;
  }
  /* This routine adds a set of pending deletes to the pending deletes
     array. The caller passes a tree node (which may or may not have
     children) that needs to be deleted. The passed tree node (which
     may or may have children) is not modified by this call. The children
     (which may or may not exist) are not modified by this call. The
     tree node passed by the caller (and all of it's children) are added
     to the pending deletes array. Eventually the passed tree node (and
     the possible children) will be deleted by other code. */
  static addPendingDeletes(treePos, processSubNodes = false) {
    /* Add the ID string to the array of pending deletes */
    HDLmTree.pendingDeletes.push(treePos.id);
    /* Check if subnodes should be handled or not */
    if (processSubNodes == false)
      return;
    /* Handle all of the children of the tree node passed
       by the caller */
    let childArray = treePos.children;
    let childArraySize = childArray.length;
    for (let i = 0; i < childArraySize; i++) {
      HDLmTree.addPendingDeletes(childArray[i], processSubNodes);
    }
  }
  /* This routine adds a set of pending inserts to the pending inserts
     array. The caller passes a tree node (which may or may not have
     children) that needs to be inserted. The passed tree node (which
     may or may have children) is not modified by this call. The children
     (which may or may not exist) are not modified by this call. The
     tree node passed by the caller (and all of it's children) are added
     to the pending inserts array. Eventually the passed tree node (and
     the possible children) will be modified when the ID value(s) are returned
     by the database server. A variety of unneeded information is (if present)
     removed from the temporary copy of the tree node (and it's children)
     passed by the caller. */
  static addPendingInserts(treePos, processSubNodes = false) {
    let tempDetails = {};
    let tempPos = {};
    /* Create a temporary copy of the current tree node. This is
       done so that we can make changes to the temporary copy that
       will not affect the original tree node. */
    tempPos = Object.assign(tempPos, treePos);
    if (tempPos.hasOwnProperty('children'))
      delete tempPos.children;
    if (tempPos.hasOwnProperty('containerWidget'))
      delete tempPos.containerWidget;
    if (tempPos.hasOwnProperty('id'))
      delete tempPos.id;
    /* Remove the saved details from the current node, if need be */
    if (tempPos.hasOwnProperty('savedDetails'))
      delete tempPos.savedDetails;
    /* Fix the details (an HDLmMod) so that the stringify will work */
    if (tempPos.hasOwnProperty('details')) {
      tempDetails = Object.assign(tempDetails, tempPos.details);
      if (tempDetails.hasOwnProperty('pathvalue')) {
        tempDetails.path = tempDetails.pathvalue;
        delete tempDetails.pathvalue;
        /* console.log(tempDetails); */
      }
      tempPos.details = tempDetails;
    }
    /* Convert the temporary object into a string */
    let tempPosStr = JSON.stringify(tempPos);
    /* console.log(tempPos); */
    /* Add the string (created from the temporary node) to the
       array of pending inserts */
    HDLmTree.pendingInserts.push(tempPosStr);
    /* Check if subnodes should be handled or not */
    if (processSubNodes == false)
      return;
    /* Handle all of the children of the tree node passed
       by the caller */
    /* console.log(treePos); */
    let childArray = treePos.children;
    let childArraySize = childArray.length;
    for (let i = 0; i < childArraySize; i++) {
      HDLmTree.addPendingInserts(childArray[i], processSubNodes);
    }
  }
  /* This routine adds set of a pending updates to the pending updates
     array. The caller passes a tree node (which may or may not have
     children) that needs to be updated. The passed tree node is not
     modified by this call. The children (which may or may not exist)
     are not modified by this call. The tree node passed by the caller
     (and all of it's children) are added to the pending updates array.

     Each pending update is actually an object with two properties
     (keys). The first property (a string) is the ID value of the
     node to be updated. The second property (also a string) is the
     contents of the updated node. A variety of unneeded information
     is (if present) removed from the temporary copy of the tree node
     passed by the caller. */
  static addPendingUpdates(treePos, processSubNodes = false) {
    let tempDetails = {};
    let tempObj = {};
    let tempPos = {};
    /* Copy the ID value out of the existing tree node. The ID value
       is used to actually do the update. */
    tempObj['id'] = treePos.id;
    /* Create a temporary copy of the current tree node. This is
       done so that we can make changes to the temporary copy that
       will not affect the original tree node. */
    tempPos = Object.assign(tempPos, treePos);
    if (tempPos.hasOwnProperty('children'))
      delete tempPos.children;
    if (tempPos.hasOwnProperty('containerWidget'))
      delete tempPos.containerWidget;
    if (tempPos.hasOwnProperty('id'))
      delete tempPos.id;
    /* Remove the saved details from the current node, if need be */
    if (tempPos.hasOwnProperty('savedDetails'))
      delete tempPos.savedDetails;
    /* Fix the details (an HDLmMod) so that the stringify will work */
    if (tempPos.hasOwnProperty('details')) {
      tempDetails = Object.assign(tempDetails, tempPos.details);
      if (tempDetails.hasOwnProperty('pathvalue')) {
        tempDetails.path = tempDetails.pathvalue;
        delete tempDetails.pathvalue;
        /* console.log(tempDetails); */
      }
      tempPos.details = tempDetails;
    }
    /* Convert the temporary object into a string */
    let tempPosStr = JSON.stringify(tempPos);
    tempObj['node'] = tempPosStr;
    /* Add the temporary object (created from the temporary node) to the
       array of pending updates */
    HDLmTree.pendingUpdates.push(tempObj);
    /* Check if subnodes should be handled or not */
    if (processSubNodes == false)
      return;
    /* Handle all of the children of the tree node passed
       by the caller */
    let childArray = treePos.children;
    let childArraySize = childArray.length;
    for (let i = 0; i < childArraySize; i++) {
      HDLmTree.addPendingUpdates(childArray[i], processSubNodes);
    }
    /* console.log(treePos); */
  }
  /* Add a set of the child tree nodes (data, ignore lists, reports, 
     rules) to a company tree node. These nodes are always the standard
     subnodes of a company tree node. A separate routine creates
     these subnodes. This routine adds each of the subnodes. */
  static addToCompanyNode(companyTreeNode,
    dataTreeNode,
    ignoreTreeNode,
    reportTreeNode,
    rulesTreeNode) {
    /* Check the value(s) passed by the caller */
    if (typeof companyTreeNode != 'object') {
      let errorText = `Company tree node (${companyTreeNode}) passed to addToCompanyNode is not an object`;
      HDLmAssert(false, errorText);
    }
    if (typeof dataTreeNode != 'object') {
      let errorText = `Data lists tree node (${ignoreTreeNode}) passed to addToCompanyNode is not an object`;
      HDLmAssert(false, errorText);
    }
    if (typeof ignoreTreeNode != 'object') {
      let errorText = `Ignore lists tree node (${ignoreTreeNode}) passed to addToCompanyNode is not an object`;
      HDLmAssert(false, errorText);
    }
    if (typeof reportTreeNode != 'object') {
      let errorText = `Reports tree node (${reportTreeNode}) passed to addToCompanyNode is not an object`;
      HDLmAssert(false, errorText);
    }
    if (typeof rulesTreeNode != 'object') {
      let errorText = `Rules tree node (${rulesTreeNode}) passed to addToCompanyNode is not an object`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the company tree node has a children array and that the
       children array is empty */
    if (!companyTreeNode.hasOwnProperty('children')) {
      let errorText = 'children field is missing from company tree node';
      HDLmError.buildError('Error', 'Missing field', 11, errorText);
      return;
    }
    if (Array.isArray(companyTreeNode.children) == false) {
      let errorText = 'Company tree node property children is not an array';
      HDLmError.buildError('Error', 'Invalid type', 30, errorString);
      return;
    }
    if (companyTreeNode.children.length != 0) {
      let errorText = `Company tree node children array length (${companyTreeNode.children.length}) is not zero`;
      HDLmError.buildError('Error', 'Invalid length', 49, errorText);
      return;
    }
    /* Add the subnodes to the children array of the company tree node */
    companyTreeNode.children.push(dataTreeNode);
    companyTreeNode.children.push(ignoreTreeNode);
    companyTreeNode.children.push(reportTreeNode);
    companyTreeNode.children.push(rulesTreeNode);
  }  
  /* Add a new Fancytree node to a parent Fancytree node. The caller
     provides the parent Fancytree node and the new Fancytree node.
     This routine checks if the parent Fancytree node is expanded
     or not. If the parent Fancytree node is not expanded, then the
     new Fancytree node can not be added. If the parent Fancytree node
     has been expanded, then the new Fancytree node must be added in
     the correct position. */
  static addToParentFancy(parentFancyNode, childFancyNode, childTreeNode,
                          handlingCmdInsert) {
    /* console.log('In HDLmTree.addToParentFancy', parentFancyNode, childFancyNode, childTreeNode, handlingCmdInsert); */
    let newFancyNode = null;
    /* Check if an insert command is active or not. If an insert commmand
       is active, then we must really expand the parent node, so that the
       new child Fancytree node can be made the active node. */
    if (handlingCmdInsert) 
      newFancyNode = HDLmTree.expandAndSet(parentFancyNode, childFancyNode, childTreeNode);
    else {
      /* At this point we may need to add a new Fancytree node. This
         only needs to be done if current parent node is expanded at
         this time. */
      let parentFancyIsExpanded = parentFancyNode.isExpanded();
      /* We need to check if the parent node has been expanded or not.
         If the parent node has not been expanded, then we don't need
         to create a new Fancytree node for the current tree node. */
      if (parentFancyIsExpanded !== false) 
        newFancyNode = HDLmTree.addNodeToFancy(parentFancyNode, childFancyNode, childTreeNode);   
      else
        newFancyNode = HDLmTree.expandAndSet(parentFancyNode, childFancyNode, childTreeNode);
    }
    return newFancyNode;
  }
  /* Locate (find) the parent of a node using a node path. Add the
     current node to the children array of the parent node. This
     routine will return true if the current node was added to the
     children array of the parent node. This routine will return false
     if the current node was not added to the children array of the
     parent node.

     This routine must be called with a node that has a parent. As
     a consequence, this routine should not be called with the path
     of the top node. */
  static addToParentTree(childTreeNode) {
    /* console.log('addToParentTree'); */
    /* console.log(childTreeNode); */
    let rvBool = false;
    /* Try to obtain (locate) the parent node of the current child node */
    let nodePath = childTreeNode.nodePath;
    let parentTreeNode = HDLmTree.locateTreeParentNode(nodePath);
    /* console.log(parentTreeNode); */
    /* Report an error if the parent node could not be found */
    if (parentTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.addToParentTree', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return rvBool;
    }
    /* Check all of the subnodes of the parent tree node looking for a
       tree node with a name higher (greater then) the current name. This
       may not happen. The new tree node name may be greater than all of
       the existing tree node names. */
    let childrenArray = parentTreeNode.children;
    /* let tempChildrenArray = childrenArray.slice(); */
    /* console.log(tempChildrenArray); */
    /* console.log(tempChildrenArray.length); */
    let childrenLength = childrenArray.length;
    /* console.log(childrenLength); */
    let i;
    for (i = 0; i < childrenLength; i++) {
      let childEntry = childrenArray[i];
      let childName = childEntry.nodePath[childEntry.nodePath.length - 1];
      if (childTreeNode.nodePath[childTreeNode.nodePath.length - 1] < childName)
        break;
    }
    /* Insert the new tree node into the correct place in the parent
       tree node children array. This may be at the beginning of the
       array, at the end of the array, or in the middle of the array. */
    /* let temqChildrenArray = parentTreeNode.children.slice(); */
    /* console.log(temqChildrenArray); */
    /* console.log(temqChildrenArray.length); */
    parentTreeNode.children.splice(i, 0, childTreeNode);
    /* let temrChildrenArray = parentTreeNode.children.slice(); */
    /* console.log(temrChildrenArray); */
    /* console.log(temrChildrenA6rray.length); */
    rvBool = true;
    return rvBool;
  }
  /* Add the JSON returned by AJAX to the node tree. This method
     may adds many nodes to the node tree at many levels. */
  static addToTree(jsonStr) {
    /* console.trace(); */
    /* console.log(jsonStr); */
    let jsonStrLen = jsonStr.length;
    /* The following code is just used to write to the console log.
       The idea is that parts of a very long JSON string are
       broken into pieces and the pieces are changed so that
       the can be used to build a Java JSON literal. */
    if (1 == 2) {
      /* Set the initial new line location. This value makes
         it appear that a new line was just before the first
         character of the very long JSON string. */
      let tempStr;
      let priorNewLine = -1;
      let strArray = [];
      /* Process every character in the very long JSON string */
      for (let index = 0; index < jsonStrLen; index++) {
        /* Get the current character */
        let charVal = jsonStr.charCodeAt(index);
        /* Check if the current character is a new line character */
        if (charVal == 10) {
          /* Get a part of the very long JSON string. The part is
             the text between two new line characters. */
          tempStr = jsonStr.substring(priorNewLine + 1, index);
          strArray.push(tempStr);
          priorNewLine = index;
        }
      }
      /* Add the last part of the very long JSON string. This
         code handles the text after the last new line character. */
      tempStr = jsonStr.substring(priorNewLine + 1, jsonStrLen);
      strArray.push(tempStr);
      /* Process each text string that was obtained above */
      let strArrayLen = strArray.length;
      let consoleStart = 0;
      let consoleEnd = 3000;
      /* Process each text string in the text string array */
      for (let i = 0; i < strArrayLen; i++) {
        /* Get the current array entry */
        let curStr = strArray[i];
        /* Make a few changes needed to build a proper Java
           JSON literal */
        curStr = curStr.replaceAll('\\n', '');
        curStr = curStr.replaceAll('"', '\\"');
        curStr = curStr.replaceAll('\\\\"', '\\\\\\"');
        curStr = '"' + curStr + '" +';
        /* console.log(curStr); */
        /* Write the current string to the console log */
        /* if (i >= consoleStart && i < consoleEnd) */
          /* console.log(curStr); */
      }
    }
    /* The HTTP request to the local server does not appear to fail.
       However, the HTTP request to the remote server does appear to
       fail if the network connection is not working. This can result
       in an empty string being passed to this routine. We need to
       check for this case and handle it. */
    if (jsonStr.length == 0) {
      let errorText = 'Nothing retrieved';
      HDLmError.buildError('Error',
                           'Retrieval failure',
                           16,
                           errorText);
      HDLmUtility.setErrorText(errorText);
      return;
    }
    /* Convert the AJAX JSON to a JS object and get some information
       from the object */
    let jsonObj = JSON.parse(jsonStr);
    /* Get the number of data rows returned from the server. The number
       of data rows will be equal to the number of tree nodes. */
    let dataRows = jsonObj.rows_returned;
    if (dataRows < 1) {
      let errorText = `Invalid number of data rows (${dataRows}) returned from the server`;
      HDLmAssert(false, errorText);
    }
    /* The data may have returned in a new format. Handle the new format.
       The new format has one row for each node in the node tree. */
    let jsonData = jsonObj.data;  
    let jsondataTypeof = typeof jsonData;
    if (false && jsondataTypeof == 'undefined')
      console.log(typeof jsonData, jsonData)
    /* The JSON data array may (or may not) contain bad entries.
       Why the JSON data array can have bad entries is not clear.
       However, it is empirically correct that bad entries can
       be found in some cases. */
    jsonData = jsonData.filter((curEntry) => {
      /* Check if the JSON data entry is valid or not. Invalid
         entries are removed here. */
      if (curEntry.info == '' ||
          curEntry.name == '')
        return false;
      else
        return true;
    });
    /* At this point, the info member of each object in the
       array is just a string. This string must be converted
       to a JSON object here. We also add the ID value so
       that the corresponding row can be deleted/updated
       later. */
    let jsonDataLen = jsonData.length;
    /* console.log(jsonDataLen); */
    /* jsonDataLen = 40; */
    for (let i = 0; i < jsonDataLen; i++) {
      /* Get the current array entry */
      let curEntry = jsonData[i];
      /* console.log(curEntry); */
      /* Get the info string and convert it to a JSON object */
      let infoStr = curEntry.info;
      /* At this point, the information string may actually be a string
         or it might be an object. We need to handle both cases. */
      let infoJson;
      if (typeof infoStr == 'string') {
        infoJson = JSON.parse(infoStr);
      }
      /* The information string may actually be an object at this
         point. This is not an error condition. This will happen
         when the string (not really a string) is obtained from
         the server via web sockets. */
      else {
        /* console.log('Inside addToTree'); */
        /* console.log(i); */
        /* console.log(curEntry); */
        /* console.log(typeof curEntry.info); */
        infoJson = infoStr;
        /* console.log(infoJson); */
      }
      /* Get and store the ID value */
      infoJson.id = curEntry.id;
      curEntry.info = infoJson;
    }
    /* Sort the JSON objects into ascending name order */
    jsonData.sort((a, b) => {
      let aName = a.info.nodePath[a.info.nodePath.length - 1];
      let bName = b.info.nodePath[b.info.nodePath.length - 1];
      if (aName < bName)
        return -1;
      else if (aName > bName)
        return 1;
      return 0;
    });
    /* Build the entire node tree using the JSON data passed
       to this routine as a JSON string */
    /* console.log(jsonData); */
    let currentTreeNodeNull = null;
    let treeTop = HDLmTree.buildNodeTree(jsonData, currentTreeNodeNull);
    HDLmTree.setTreeTop(treeTop);
    /* console.log(treeTop); */
    /* Add any missing fields to the modification level nodes or
       company level nodes for proxy definitions */
    HDLmTree.addToTreeFix(HDLmTree.getTreeTop());
  }
  /* This routine fixes the node tree as need be. In some cases, we may
     get a node tree from the database that is missing certain fields.
     These fields are needed later. This routine checks for missing
     fields and provides default values for them. */
  static addToTreeFix(node) {
    /* console.log(node.type); */
    if (node.type !='proxy') {
      /* console.log('In HDLmTree.addToTreeFix'); */
      /* console.log(node.type); */
    }
    /* Check if we are handling a companies level node or not. We
       recursively call this routine for all nodes other than
       companies level nodes and a few other node types. Companies
       level nodes are fixed, as need be. */
    if (node.type === 'companies') {
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the 
         GXE editor or the pass-through editor or one of the inline 
         editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a company level node or not. We
       recursively call this routine for all nodes other than
       company level nodes and a few other node types. Company
       level nodes are fixed, as need be. */
    if (node.type === 'company') {
      /* Check if we are running the GUI editor or the GXE editor or 
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the 
         GXE editor or the pass-through editor or one of the inline
         editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
      /* Check if we are running the proxy editor. We may need to create
         an additional set of fields, if we are running the proxy editor. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
        /* Add a default (empty) comments value, if need be */
        if (!node.details.hasOwnProperty('comments')) {
          node.details.comments = '';
        }
        /* Add a default (empty) extra information value, if need be */
        if (!node.details.hasOwnProperty('extra')) {
          node.details.extra = '';
        }
        /* Add a default (empty) backend type value, if need be */
        if (!node.details.hasOwnProperty('backendType')) {
          node.details.backendType = '';
        }
        /* Add a default (empty) backend server value, if need be */
        if (!node.details.hasOwnProperty('backendServer')) {
          node.details.backendServer = '';
        }
        /* Add a default (empty) secure server value, if need be */
        if (!node.details.hasOwnProperty('secureServer')) {
          node.details.secureServer = '';
        }
      }
    }
    /* Check if we are handling a authorization data node or not.
       We recursively call this routine for all nodes other than
       authorization level nodes and a few other node types.
       authorization data nodes are fixed, as need be. */
    if (node.type === 'auth') {
      /* Check if we are running the authorization editor. We may need to create
         an additional set of fields, if we are running the authorization editor. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.auth)
        HDLmMod.addMissingFieldsModObject(node.details, HDLmAuth.HDLmAuthInfo, 'auth');
    }
    /* Check if we are handling a configuration data node or not.
       We recursively call this routine for all nodes other than
       configuration level nodes and a few other node types.
       Configuration data nodes are fixed, as need be. */
    if (node.type === 'config') {
      /* Check if we are running the configuration editor. We may need to create
         an additional set of fields, if we are running the configuration editor. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config)
        HDLmMod.addMissingFieldsModObject(node.details, HDLmConfig.HDLmConfigInfo, 'config');
    }
    /* Check if we are handling a data (zero, one, or more
       divisions) node or not. We recursively call this routine
       for all nodes other than data (zero, one, or more divisions)
       level nodes and a few other node types. Data (zero, one,
       or more divisions) nodes are fixed, as need be. */
    if (node.type === HDLmDefines.getString('HDLMDATATYPE')) {
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the
         GXE editor or the pass-through editor or one of the inline 
         editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a division (zero, one, or more
       sites) node or not. We recursively call this routine
       for all nodes other than division (zero, one, or more sites)
       level nodes and a few other node types. Division (zero, one,
       or more sites) nodes are fixed, as need be. */
    if (node.type === HDLmDefines.getString('HDLMDIVISIONTYPE')) {
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the
         GXE editor or the pass-through editor or one of the inline 
         editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling an ignore-list entry node or not.
       We recursively call this routine for all nodes other than
       ignore-list entry nodes and a few other node types.
       Ignore-list entry nodes are fixed, as need be. */
    if (node.type === 'ignore') {
      /* Check if we are running the ignore-lists editor. We may
         need to create one or more additional fields, if we are
         running the ignore-lists editor. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
        HDLmIgnore.addMissingIgnoreObject(node.details);
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the GXE 
         editor or the pass-through editor or one of the inline editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a line (just one line) data
       node or not. We recursively call this routine for all nodes
       other than line (just one line) level nodes and a few
       other node types. Line (just one line) data nodes are
       fixed, as need be. */
    if (node.type === 'line') {
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the 
         GXE editor or the pass-through editor or one of the inline 
         editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a lines (zero, one, or more
       lines) data node or not. We recursively call this routine
       for all nodes other than lines (zero, one, or more lines)
       level nodes and a few other node types. Lines (zero, one,
       or more lines) data nodes are fixed, as need be. */
    if (node.type === 'lines') {
      /* Check if we are running the GUI editor or the GXE editor or 
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the 
         GXE editor or the pass-through editor or one of the inline 
         editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling an ignore-list data node or not.
       We recursively call this routine for all nodes other than
       ignore-list level nodes and a few other node types.
       Ignore-list data nodes are fixed, as need be. */
    if (node.type === 'list') {
      /* Check if we are running the GUI editor or the GXE editor or 
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the
         GXE editor of the pass-through editor or one of the inline 
         editors. */
      if (HDLmGlobals.checkForAnyPass()) 
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling an ignore-lists data node or not.
       We recursively call this routine for all nodes other than
       ignore-lists level nodes and a few other node types.
       Ignore-lists data nodes are fixed, as need be. */
    if (node.type === 'lists') {
      /* Check if we are running the GUI editor or the GXE editor or 
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the
         GXE editor or the pass-through editor or one of the inline 
         editors. */
      if (HDLmGlobals.checkForAnyPass()) 
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a modification level node or not. We
       recursively call this routine for all nodes other than modification
       level nodes and a few other node types. Modification level nodes are
       fixed, as need be. */
    if (node.type === 'mod') {
      /* Check if we are running the modifications editor. We may need to create
         an additional set of fields, if we are running the modifications editor,
         the GUI editor or the GUI extended editor or the pass-through editor or 
         one of the inline editors.*/
      if (HDLmGlobals.checkForAnyPass() ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
        /* Add a default (empty) comments value, if need be */
        if (!node.details.hasOwnProperty('comments')) {
          node.details.comments = '';
        }
        /* Add a default created field, if need be */
        if (!node.details.hasOwnProperty('created') ||
            node.details.created == '') {
          node.details.created = new Date();
        }
        /* Add a default (empty) CSS selector value, if need be */
        if (!node.details.hasOwnProperty('cssselector')) {
          node.details.cssselector = '';
        }
        /* Add a default (empty) Extra Information value, if need be */
        if (!node.details.hasOwnProperty('extra')) {
          node.details.extra = '';
        }
        /* Add a default last field, if need be */
        if (!node.details.hasOwnProperty('lastmodified') ||
            node.details.lastmodified == '') {
          node.details.lastmodified = new Date();
        }
        /* Add a default (empty) node identifier value, if need be */
        if (false && node.details.hasOwnProperty('nodeiden')) {
          let jsonStrNodeIden = JSON.stringify(node.details.nodeiden);
          if (jsonStrNodeIden.indexOf('phash') >= 0) {
            /* console.log(node.details); */
          }
        }
        if (!node.details.hasOwnProperty('nodeiden')) {
          node.details.nodeiden = '';
        }
        /* Add a default (empty) path value, if need be */
        if (node.details.hasOwnProperty('path')) {
          node.details.pathvalue = node.details.path;
          /* console.log(node.details.path); */
          /* console.log(node.details.pathvalue); */
          delete node.details.path;
          /* console.log(node.Details); */
        }
        /* console.log(node.details.pathvalue); */
        /* console.log(node.details); */
        if (!node.details.hasOwnProperty('pathvalue')) {
          node.details.pathvalue = '';
          /* console.log(node.details.pathvalue); */
        }
        if (!node.details.hasOwnProperty('probality')) {
          node.details.probability = '';           
        }
        if (!node.details.hasOwnProperty('usemode')) {
          node.details.usemode = '';           
        }
        /* Add a default (empty) XPath search value, if need be */
        if (!node.details.hasOwnProperty('xpath')) {
          node.details.xpath = '';
        }
        /* Fix a database error, if need be */
        if (node.details.nodeiden == '{}') {
          node.details.nodeiden = '';
        }
        /* We may have a image, that does not have a perceptual
           hash value. We need to fix this by getting the perceptual
           hash value and adding it to the node identifier. */
        /* What follows is a dummy loop used only to allow break to work */
        while (true) {
          /* Make sure we can use the node identifier object */
          if (node.details.nodeiden == '')
            break;
          if (typeof node.details.nodeiden != 'object')
            break;
          if (node.details.nodeiden.hasOwnProperty('attributes') == false)
            break;
          let nodeAttributes = node.details.nodeiden['attributes'];
          if (nodeAttributes == null)
            break;
          /* Make sure we have a tag attribute and that it has the
             correct value */
          if (nodeAttributes.hasOwnProperty('tag') == false)
            break;
          if (nodeAttributes.tag != 'img')
            break;
          /* Get the source value from the node identifier attributes */
          if (nodeAttributes.hasOwnProperty('src') == false)
            break;
          let nodeSource = nodeAttributes['src'];
          /* Make sure we don't already have a perceptual hash value */
          if (nodeAttributes.hasOwnProperty('phash'))
            break;
          /* Get the URL from the image source, if possible */
          let nodeUrl;
          nodeUrl = HDLmMenus.getUrlFromImage(nodeSource);
          if (nodeUrl == '')
            break;
          /* Get the node path for updating the node */
          let localNodePath = node.nodePath.slice();
          /* Run the code that updates the node with the perceptual hash
             data. Note that this actually occurs asynchronously well
             after (probably milliseconds) the statements below are
             executed. */
          let newPromise = HDLmUtility.getPerceptualHash(nodeUrl);
          HDLmUtility.usePerceptualPromise(newPromise, localNodePath);
          break;
        }
        /* We may have a style, with a background image, that does
           not have a perceptual hash value. We need to fix this by
           getting the perceptual hash value and adding it to the
           node identifier. */
        /* What follows is a dummy loop used only to allow break to work */
        while (true) {
          /* Make sure we can use the node identifier object */
          if (node.details.nodeiden == '')
            break;
          if (typeof node.details.nodeiden != 'object')
            break;
          if (node.details.nodeiden.hasOwnProperty('attributes') == false)
            break;
          let   nodeAttributes = node.details.nodeiden['attributes'];
          if (nodeAttributes == null)
            break;
          /* Get the style value from the node identifier attributes */
          if (nodeAttributes.hasOwnProperty('style') == false)
            break;
          let   nodeStyle = nodeAttributes['style'];
          /* Make sure we don't already have a perceptual hash value */
          if (nodeAttributes.hasOwnProperty('phash'))
            break;
          /* Get the URL from the style, if possible */
          let nodeUrl;
          nodeUrl = HDLmMenus.getUrlFromStyle(nodeStyle);
          if (nodeUrl == '')
            break;
          /* Get the node path for updating the node */
          let   localNodePath = node.nodePath.slice();
          /* Run the code that updates the node with the perceptual hash
             data. Note that this actually occurs asynchronously well
             after (probably milliseconds) the statements below are
             executed. */
          let   newPromise = HDLmUtility.getPerceptualHash(nodeUrl);
          HDLmUtility.usePerceptualPromise(newPromise, localNodePath);
          break;
        }
        /* Remove an empty (unused) value suffix field, if need be */
        if (node.details.hasOwnProperty('valueSuffix')) {
          delete node.details.valueSuffix;
        }
        /* Remove an empty (unused) values count field, if need be */
        if (node.details.hasOwnProperty('valuesCount')) {
          delete node.details.valuesCount;
        }
        /* Remove an empty (unused) values field, if need be */
        if (node.details.hasOwnProperty('values')) {
          delete node.details.values;
        }
        /* Remove an empty (unused) value field, if need be */
        if (node.details.hasOwnProperty('value')) {
          delete node.details.value;
        }
        /* In a few cases, we want to remove the parameter number
           field. This is true if the parameter number field is
           present and the modification type does not allow/use
           the parameter number field. */
        if (node.details.hasOwnProperty('type')) {
          let nodeDetailsType = node.details.type;
          if (HDLmMod.getModificationTypeParmNumberUsed(nodeDetailsType) == false) {
            if (node.details.hasOwnProperty('parameter'))
              delete node.details.parameter;
          }
        }
      }
    }
    /* Check if we are handling a report (just one report) data
       node or not. We recursively call this routine for all nodes
       other than report (just one report) level nodes and a few
       other node types. Report (just one report) data nodes are
       fixed, as need be. */
    if (node.type === 'report') {
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor or one of the inline editors. We
         may need to create one or more additional fields, if we
         are running the GUI editor or the GXE editor or the 
         pass-through editor or one of the inline editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a reports (zero, one, or more
       reports) data node or not. We recursively call this routine
       for all nodes other than reports (zero, one, or more reports)
       level nodes and a few other node types. Reports (zero, one,
       or more reports) data nodes are fixed, as need be. */
    if (node.type === 'reports') {
      /* Check if we are running the GUI editor or the GXE editor or 
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the 
         GXE editor or the pass-through editor or one of the inline
         editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a rules (zero, one, or more
       divisions) data node or not. We recursively call this routine
       for all nodes other than rules (zero, one, or more divisions)
       level nodes and a few other node types. Rules (zero, one,
       or more divisions) data nodes are fixed, as need be. */
    if (node.type === HDLmDefines.getString('HDLMRULESTYPE')) {
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the
         GXE editor or the pass-through editor or one of the inline 
         editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a site (zero, one, or more
       rules) node or not. We recursively call this routine
       for all nodes other than site (zero, one, or more rules)
       level nodes and a few other node types. Site (zero, one,
       or more rules) nodes are fixed, as need be. */
    if (node.type === HDLmDefines.getString('HDLMSITETYPE')) {
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor. We may need to create one or more 
         additional fields, if we are running the GUI editor or the
         GXE editor or the pass-through editor or one of the inline 
         editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a store (stored value) node or not.
       We recursively call this routine for all nodes other than
       store (stored value) nodes. Store (stored value) nodes are
       fixed, as need be. */
    if (node.type === 'store') {
      /* Check if we are running the store (stored values) editor. We may
         need to create one or more additional fields, if we are running
         the store (stored value) editor. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
        HDLmStore.addMissingStoreObject(node.details);
    }
    /* Check if we are handling a top (top) node or not. We
       recursively call this routine for all nodes other than
       top (top) nodes and a few other types. Top nodes are
       fixed, as need be. */
    if (node.type === 'top') {
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor or one of the inline editors. We may
         need to create one or more additional fields, if we are running 
         the GUI editor or the GXE editor or the pass-through editor or
         one of the inline editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Check if we are handling a value (data value) node or not. 
       We recursively call this routine for all nodes other than
       value (data value) nodes and a few other types. Top nodes are
       fixed, as need be. */
    if (node.type === HDLmDefines.getString('HDLMVALUETYPE')) {
      /* Check if we are running the GUI editor or the GXE editor or
         the pass-through editor or one of the inline editors. We may
         need to create one or more additional fields, if we are running 
         the GUI editor or the GXE editor or the pass-through editor or
         one of the inline editors. */
      if (HDLmGlobals.checkForAnyPass())
        HDLmPass.addMissingPassObject(node);
    }
    /* Recursively invoke this routine on all of the children of the
       curent node. These steps will have no effect if they current
       node does not have any children. */
    let children = node.children;
    let childrenLength = children.length;
    for (let i = 0; i < childrenLength; i++) {
      let child = children[i];
      HDLmTree.addToTreeFix(child);
    }
  }
  /* This routine adds a node (that currently does not exist)
     to the node tree. The node is added to the parent node's 
     children. The node is added in the correct order.
     All of the intermediate nodes are also created as
     need be. */
  static addTreeNode(newTreeNode) {
    /* Check if the new tree node value is null */
    if (newTreeNode == null) {
      let errorText = 'New tree node value passed to addTreeNode is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the new tree node value is an object */
    if (typeof newTreeNode !== 'object') {
      let errorText = 'New tree node value passed to addTreeNode is not an object';
      HDLmAssert(false, errorText);
    }
    /* All of the intermediate nodes (if any) must be
       created before the new node can be added to the
       node tree */
    let siteNodePath = newTreeNode.nodePath.slice(0, 6);
    let updateDatabaseFalse = false;
    let siteTreeNode = HDLmTree.buildSiteNode(siteNodePath, updateDatabaseFalse, HDLmNodeTypes.rules);
    /* Check if the site tree node value is null */
    if (siteTreeNode == null) {
      let errorText = 'Site tree node value returned from buildSiteNode is null';
      HDLmAssert(false, errorText);
    }
    /* We can now add the new tree node to the site node */
    let newTreeNodeBool = HDLmTree.addToParentTree(newTreeNode);
    /* Check if the new tree node value was successfully added */
    if (newTreeNodeBool != true) {
      let errorText = 'New tree node was not successfully added to the parent tree';
      HDLmAssert(false, errorText);
    }
  }
  /* This routine build a companies array from the current set 
     of rules. The companies array has an entry for each company. 
     The entry is (of course) a JSON object representing the
     company's rules. If a company has no rules, it will not
     have an entry in the array. */
  static buildCompaniesArray(treeTop) {
    /* Start the companies array */
    let companiesArray = [];
    /* Get the companies node */
    let companiesNode = treeTop.children[0];
    let companiesNodeChildren = companiesNode.children
    /* Process each company */
    for(let childNodeCompany of companiesNodeChildren) {
      let rulesArray = [];
      /* Get some information from the company node */
      let nodePath = childNodeCompany.nodePath;
      let nodePathLen = nodePath.length;
      let companyName = nodePath[nodePathLen - 1];
      /* Create a new company object */
      let companyObj = new Object;
      companyObj.name = companyName;
      /* Get the company rules node */
      let childNodeRules = childNodeCompany.children[3];
      /* Process each division */
      for(let childNodeDivision of childNodeRules.children) {
        let divisionNodeChildren = childNodeDivision.children;
        /* console.log(childNodeDivision); */
        /* Process each site */
        for(let childNodeSite of divisionNodeChildren) {
          let siteNodeChildren = childNodeSite.children;
          /* console.log(childNodeSite); */
          /* console.log(siteNodeChildren); */
          /* Process each rule */
          for(let childNodeRule of siteNodeChildren) {
            let ruleDetails = childNodeRule.details;
            rulesArray.push(childNodeRule);
          } 
        }
      }
      /* Store all of the rules in the company object */
      companyObj.rules = rulesArray;
      /* Add the company object to the companies array */
      companiesArray.push(companyObj);
    }
    return companiesArray;
  }
  /* This routine builds an information array with one entry for
     node in the node tree. Note that recursion is used to build
     the information array. */
  static buildInfoArray(infoArray, treePos) {
    /* console.log(treePos); */
    /* Declare and define a few variables */
    let tempDetails = {};
    let tempPos = {};
    /* Create a temporary copy of the current tree node. This is
       done so that we can make changes to the temporary copy that
       will not affect the original tree node. */
    tempPos = Object.assign(tempPos, treePos);
    /* Save the children array and then remove it from the current
       temporary tree node */
    let childrenArray = tempPos.children.slice();
    if (tempPos.hasOwnProperty('children'))
      delete tempPos.children;
    if (tempPos.hasOwnProperty('containerWidget'))
      delete tempPos.containerWidget;
    if (tempPos.hasOwnProperty('id'))
      delete tempPos.id;
    /* Remove the saved details from the current node, if need be */
    if (tempPos.hasOwnProperty('savedDetails'))
      delete tempPos.savedDetails;
    /* Fix the details (an HDLmMod) so that the stringify will work */
    if (tempPos.hasOwnProperty('details')) {
      tempDetails = Object.assign(tempDetails, tempPos.details);
      if (tempDetails.hasOwnProperty('pathvalue')) {
        tempDetails.path = tempDetails.pathvalue;
        delete tempDetails.pathvalue;
        /* console.log(tempDetails); */
      }
      tempPos.details = tempDetails;
    }
    /* Get a few more values from the current node */
    let infoStr = JSON.stringify(tempPos);
    /* Insert the current node into the information array */
    infoArray.push(infoStr);
    /* Process all of the children of the current node */
    let childrenCount = childrenArray.length;
    for (let i = 0; i < childrenCount; i++) {
      let curNode = childrenArray[i];
      HDLmTree.buildInfoArray(infoArray, curNode);
    }
    return;
  }
  /* This method builds a list of integers from the rule names in
     the list of rules passed by the caller. Only rules with names
     like 'Modification nnnn' are considered. All other rules are
     just ignored. The 'nnnn' values are extracted and added to a
     list. The list is returned to the caller. Stated differently,
     this routine builds a list of numbers used to create unique
     modification names. */
  static buildIntegerListModification(childList) {
    let childListLen = childList.length;
    let currentToken;
    let defaultModName = HDLmDefines.getString('HDLMDEFAULTMODNAME');
    let integerList = [];
    for (let i = 0; i < childListLen; i++) {
      let childEntry = childList[i];
      let currentName = childEntry.nodePath[childEntry.nodePath.length - 1];
      let currentTokens = HDLmString.getTokens(currentName);
      /* Make sure the current modification rule name is just
         a specific string ('Modification') and a number. Of
         course we must have a white space token before the
         number. */
      if (currentTokens.length != 4)
        continue;
      /* The first token must be a specific string ('Modification') */
      currentToken = currentTokens[0];
      if (currentToken.value != defaultModName)
        continue;
      /* The second token must be white space */
      currentToken = currentTokens[1];
      if (currentToken.tokType != HDLmTokenTypes.space)
        continue;
      /* The third token must be an integer */
      currentToken = currentTokens[2];
      if (currentToken.tokType != HDLmTokenTypes.integer)
        continue;
      /* We can now add the integer to the list */
      let currentTokenNumber = Number(currentToken.value)
      integerList.push(currentTokenNumber);
    }
    return integerList;
  }
  /* This method builds a list of integers from the rule names in
     the list of rules passed by the caller. Only rules with names
     that begin with a value passed by the caller are considered.
     These rules, may or may not, end with a 'nnnn' value. All other
     rules are just ignored. The 'nnnn' values are extracted and
     added to a list. The list is returned to the caller. Stated
     differently, this routine builds a list of numbers used to
     create unique rule names. */
  static buildIntegerListName(ruleNamePrefix, childList) {
    let childListLen = childList.length;
    let integerList = [];
    let rulePrefixLen = ruleNamePrefix.length;
    for (let i = 0; i < childListLen; i++) {
      /* Get the current rule name */
      let childEntry = childList[i];
      let currentName = childEntry.nodePath[childEntry.nodePath.length - 1];
      /* Check if the rule name starts with the required prefix.
         If the rule name does not start with the right prefix,
         then we can just skip this rule. */
      if (currentName.startsWith(ruleNamePrefix) == false)
        continue;
      /* Strip the prefix from the rule name */
      currentName = currentName.substr(rulePrefixLen);
      /* Check if we have anything left. If we don't have anything
         left, then the rule name was just the prefix and we don't
         have a numeric suffix (in parenthesis). We can just skip
         this rule. */
      let currentNameLength = currentName.length;
      if (currentNameLength == 0)
        continue;
      /* At this point the remaining string should consist only
         of a blank, a left parenthesis, a number, and a right
         parenthesis. If we have anything else, then we should
         not use this name. */
      let pattern = new RegExp("^\\s\\(\\d+\\)$");
      let testResult = pattern.test(currentName);
      if (testResult == false)
        continue;
      /* We can now add the integer to the list */
      let currentNameMatch = currentName.match(/\d+/g);
      if (currentNameMatch == null)
        continue;
      if (currentNameMatch.length == 0) {
        let errorString = currentName;
        HDLmError.buildError('Error', 'Current name did not match', 48, errorString);
        return integerList;
      }
      if (currentNameMatch.length > 1) {
        let errorString = currentName;
        HDLmError.buildError('Error', 'Too many matches for current name', 48, errorString);
        return integerList;
      }
      let currentNumber = Number(currentNameMatch[0]);
      integerList.push(currentNumber);
    }
    return integerList;
  }
  /* Build a set of JSON describing the child nodes of the current
     node. The JSON includes all of the child nodes of the current
     node and provides a complete node path for each node. Of course,
     if the current node has no child nodes (modification nodes do
     not have child nodes), then an empty set of JSON will be returned
     to the caller. */
  static buildJsonChildren(parentNode) {
    let rvObj = [];
    let childArray = parentNode.children;
    /* Build a set of JSON for each child node */
    for (let childNode of childArray) {
      let childObj = Object();
      childObj['title'] = childNode.nodePath[childNode.nodePath.length - 1];
      /* Some special code is needed for the GUI editor or the GXE
         editor. The effect of the code below is that 'lazy' and 'folder'
         are only set for non-leaf nodes when the GUI editor or the GXE
         are active. In all other cases, these options are not specified. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
        /* All nodes other than leaf nodes are lazy nodes */
        if (childNode.type != 'ignore' &&
            childNode.type != 'line'   &&
            childNode.type != 'mod'    &&
            childNode.type != 'value')
          childObj['lazy'] = true;
        /* All nodes other than leaf nodes are folder nodes */
        if (childNode.type != 'ignore' &&
            childNode.type != 'line'   &&
            childNode.type != 'mod'    &&
            childNode.type != 'value')
          childObj['folder'] = true;
      }
      /* Some special code is needed for the ignore (ignore-lists) editor.
         The effect of the code below are that 'lazy' and 'folder' are
         only set for non-ignore-list entry nodes when the ignore (ignore-lists)
         editor is active. In all other cases, these options are not
         specified. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore) {
        /* All nodes other than ignore (ignore-list entry) nodes are lazy nodes */
        if (childNode.type != 'ignore')
          childObj['lazy'] = true;
        /* All nodes other than list (ignore-list entry) nodes are folder nodes */
        if (childNode.type != 'ignore')
          childObj['folder'] = true;
      }
      /* Some special code is needed for the modifications editor.
         The effect of the code below is that 'lazy' and 'folder'
         are only set for non-modification nodes when the modification
         editor is active. In all other cases, these options are not
         specified. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod) {
        /* All nodes other than modification nodes are lazy nodes */
        if (childNode.type != 'mod')
          childObj['lazy'] = true;
        /* All nodes other than modification nodes are folder nodes */
        if (childNode.type != 'mod')
          childObj['folder'] = true;
      }
      /* Some special code is needed for the pass-through editor.
         The effect of the code below is that 'lazy' and 'folder'
         are only set for non-leaf nodes when the pass-through
         editor is active. In all other cases, these options are not
         specified. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
        /* All nodes other than leaf nodes are lazy nodes */
        if (childNode.type != 'ignore' &&
            childNode.type != 'line'   &&
            childNode.type != 'mod'    &&
            childNode.type != 'value')
          childObj['lazy'] = true;
        /* All nodes other than leaf nodes are folder nodes */
        if (childNode.type != 'ignore' &&
            childNode.type != 'line'   &&
            childNode.type != 'mod'    &&
            childNode.type != 'value')
          childObj['folder'] = true;
      }
      /* Some special code is needed for any of the inline editors.
         The effect of the code below is that 'lazy' and 'folder'
         are only set for non-modification nodes when any of the inline
         editors is active. In all other cases, these options are not
         specified. */
      if (HDLmGlobals.checkForInlineEditor()) {
        /* All nodes other than modification nodes are lazy nodes */
        if (childNode.type != 'mod')
          childObj['lazy'] = true;
        /* All nodes other than modification nodes are folder nodes */
        if (childNode.type != 'mod')
          childObj['folder'] = true;
      }
      /* Some special code is needed for the store (stored values) editor.
         The effect of the code below are that 'lazy' and 'folder' are
         only set for non-store nodes when the store (stored values)
         editor is active. In all other cases, these options are not
         specified. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store) {
        /* All nodes other than store (stored value) nodes are lazy nodes */
        if (childNode.type != 'store')
          childObj['lazy'] = true;
        /* All nodes other than store (stored value) nodes are folder nodes */
        if (childNode.type != 'store')
          childObj['folder'] = true;
      }
      /* We need to build the Tooltip (hover value) for each node */
      childObj['tooltip'] = childNode.tooltip;
      /* Get a deep copy of the node path of the parent tree
         (HDLmTree) node passed by the caller */
      let nodePathExtended = parentNode.nodePath.slice(0);
      nodePathExtended.push(childNode.nodePath[childNode.nodePath.length - 1]);
      /* We need to build the complete node path for each node */
      let fieldName = HDLmDefines.getString('HDLMNODEPATH');
      childObj[fieldName] = nodePathExtended;
      rvObj.push(childObj);
    }
    let rv = JSON.stringify(rvObj);
    return rv;
  }
  /* This routine builds the node tree using the JSON
     data passed by the caller. The node tree is built
     from the top (literally) down. When this routine is
     first invoked, it is pass a null value for the current
     node. The null value causes this routine to find and
     build the top node. All other nodes are built as direct
     and indirect children of the top node.*/
  static buildNodeTree(jsonData, curTreeNode) {
    /* Declare and define a few variables */
    let outArray;
    let infoJson;
    /* If the current node is null, then this is the first
       call to this routine. We need to find an build the
       top node here. */
    if (curTreeNode == null) {
      let getMatchingNodesEmptyList = [];
      outArray = HDLmTree.getMatchingEntries(jsonData, 1, getMatchingNodesEmptyList);
      infoJson = outArray[0].info;
      curTreeNode = HDLmTree.convertObjectToTree(infoJson);
    }
    /* Find all of the children of the current node */
    let findLevel = curTreeNode.nodePath.length + 1;
    let findNodes = curTreeNode.nodePath;
    outArray = HDLmTree.getMatchingEntries(jsonData, findLevel, findNodes);
    let outLen = outArray.length;
    /* Each of the matching entries is a child of the current entry.
       add each child entry. */
    curTreeNode.children = [];
    for (let i = 0; i < outLen; i++) {
      let curInfo = outArray[i].info;
      let curTreeSubNode = HDLmTree.convertObjectToTree(curInfo);
      curTreeNode.children.push(curTreeSubNode);
      let tempCurTreeNode = curTreeNode.children.slice();
      /* console.log(tempCurTreeNode); */
      /* console.log(curTreeNode.children.length); */
      HDLmTree.buildNodeTree(jsonData, curTreeSubNode);
    }
    return curTreeNode;
  }
  /* This method build a map (actually an object) with entries
     for all of the parameter numbers that are actually in use.
     The caller passes a list of child nodes that may or may not
     have parameter numbers. This routine scans all of the child
     nodes and uses the parameter numbers (if they can be found)
     to build the parameter number usage map. For example, if the
     child nodes used the parameter number 3, two times, then the
     returned map would have an entry with a key of 3 and a value
     of two. */
  static buildParameterMap(childList) {
    /* Get the number of children in the child list passed by
       the caller */
    let childListLen = childList.length;
    /* Build a map that shows how many times each parameter number
       is used */
    let parmMapObj = {};
    /* Check all of the children of the parent node */
    for (let i = 0; i < childListLen; i++) {
      /* Get the current child */
      let childEntry = childList[i];
      /* Try to obtain the parameter number of the current rule */
      if (childEntry.hasOwnProperty('details') == false)
        continue;
      if (childEntry.details.hasOwnProperty('parameter') == false)
        continue;
      let childParmNumber = childEntry.details.parameter;
      /* Check if the parameter map already has the current parameter
         number. If the parameter map already has the current parameter
         number, increment the count value. Otherwise, create the map
         entry with a count of 1. */
      if (parmMapObj.hasOwnProperty(childParmNumber) == false)
        parmMapObj[childParmNumber] = 1
      else {
        let parmMapEntryCount = parmMapObj[childParmNumber];
        parmMapEntryCount++;
        parmMapObj[childParmNumber] = parmMapEntryCount;
      }
    }
    return parmMapObj;
  }
  /* This routine either finds (locates) or builds a site tree
     node for a given node path. If new tree nodes need to be
     created, they are added to the node tree and sent to the
     server to be added to the database. It is assumed (and
     checked) that the top node and companies node already
     exist. The eventual site node is returned to the caller.
     The caller must pass a complete node path all the way down
     to the site node. */
  static buildSiteNode(passedNodePath, updateDatabase, nodeType) {
    /* Check the value(s) passed by the caller */
    if (typeof passedNodePath != 'object') {
      let errorText = `Node path value (${passedNodePath}) passed to buildSiteNode is not an object`;
      HDLmAssert(false, errorText);
    }
    if (Array.isArray(passedNodePath) != true) {
      let errorText = `Node path value (${passedNodePath}) passed to buildSiteNode is not an array`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the passed node path length is correct */
    let passedNodePathLen = passedNodePath.length;
    if (passedNodePathLen != HDLmDefines.getNumber('HDLMSITENODEPATHLENGTH')) {
      let errorText = `Passed node path length (${passedNodePathLen}) is incorrect`;
      HDLmAssert(false, errorText);
    }
    /* Build the node path for getting the companies node */
    let nodePath = passedNodePath.slice(0, 2);
    /* At this point we can try to locate the companies node. This
       step should never fail. However, you never know what is going
       to fail or not. */
    let companiesTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the companies node could not be found */
    if (companiesTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.buildSiteNode', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return null;
    }
    /* At this point we need to either locate or create the node
       for the current company */
    let hostName = passedNodePath[2];
    nodePath.push(hostName);
    let companyTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Create the company node, if the company node could not be found */
    if (companyTreeNode == null) {
      let companyTreeNodeType = HDLmDefines.getString('HDLMCOMPANYTYPE');
      let companyTooltip = HDLmTree.getTooltip('newcompmod');
      companyTreeNode = HDLmTree.buildTreeNode(hostName, companyTreeNodeType,
                                               companyTooltip, nodePath,
                                               companiesTreeNode, updateDatabase);
      /* At this point we may (or may not) want to do a lot of work
         to create a Fancytree node for the new company tree node */
      /* console.log(HDLmGlobals.activeEditorType); */
      if (!HDLmGlobals.checkForInlineEditorOrGems()) 
        HDLmTree.createCurrentFancytree(companyTreeNode);
    }
    /* At this point we should always be able to locate the
       data or rules node. The data or rules node was created 
       when the company node was created (if the company node
       was created). */
    /* Check if we are building a node path for a rule or a data value */
    if (nodeType == HDLmNodeTypes.data)
      nodePath.push(HDLmDefines.getString('HDLMDATANODENAME'));
    if (nodeType == HDLmNodeTypes.rules)
      nodePath.push(HDLmDefines.getString('HDLMRULESNODENAME'));
    /* At this point we can try to locate the rules node. This
       step should never fail. However, you never know what is
       going to fail or not. */
    let rulesTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the rules node could not be found */
    if (rulesTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.buildSiteNode', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return null;
    }
    /* Add the division and site nodes, if need be */
    let divisionNodeName = HDLmDefines.getString('HDLMDIVISIONNODENAME');
    nodePath.push(divisionNodeName);
    /* At this point we need to either locate or create the node
       for the current division */
    let divisionTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Create the division node, if the division node could not be found */
    if (divisionTreeNode == null) {
      let divisionTreeNodeType = HDLmDefines.getString('HDLMDIVISIONTYPE');
      let divisionTooltip = HDLmTree.getTooltip('newdivision');
      divisionTreeNode = HDLmTree.buildTreeNode(divisionNodeName, divisionTreeNodeType,
                                                divisionTooltip, nodePath,
                                                rulesTreeNode, updateDatabase);
      /* At this point we may (or may not) want to do a lot of work
         to create a Fancytree node for the new divison tree node */
      /* console.log(HDLmGlobals.checkForInlineEditorOrGems()); */
      /* console.log(HDLmGlobals.activeEditorType); */
      if (!HDLmGlobals.checkForInlineEditorOrGems())
        HDLmTree.createCurrentFancytree(divisionTreeNode);
    }
    /* Add the site node, if need be */
    let siteNodeName = HDLmDefines.getString('HDLMSITENODENAME');
    nodePath.push(siteNodeName);
    /* At this point we need to either locate or create the node
        for the current site */
    let siteTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Create the site node, if the site node could not be found */
    if (siteTreeNode == null) {
      let siteTreeNodeType = HDLmDefines.getString('HDLMSITETYPE');
      let siteTooltip = HDLmTree.getTooltip('newsite');
      siteTreeNode = HDLmTree.buildTreeNode(siteNodeName, siteTreeNodeType,
                                            siteTooltip, nodePath,
                                            divisionTreeNode, updateDatabase);
      /* At this point we may (or may not) want to do a lot of work
         to create a Fancytree node for the new site tree node */
      if (!HDLmGlobals.checkForInlineEditorOrGems())
        HDLmTree.createCurrentFancytree(siteTreeNode);
    }
    return siteTreeNode;
  }  
  /* Build a new tree node and inserts it into the tree. The
     caller provides all of the information about the new node.
     The return value is always the new tree node. */
  static buildTreeNode(newNodeName,
                       newNodeType,
                       newNodeTooltip,
                       newNodePath,
                       parentTreeNode,
                       updateDatabase) {
    let newNodeLevel = newNodePath.length;
    let newTreeNode = new HDLmTree(newNodeType, newNodeTooltip);
    newTreeNode.nodePath = newNodePath.slice(); 
    HDLmPass.addMissingPassObject(newTreeNode);
    /* console.log('buildtreenode'); */
    /* console.log(parentTreeNode); */
    /* console.log(newNodeName); */
    /* Search for the first existing node with a name that is
       greater than or equal to the current name. We must insert
       the new subnode just before the node with a higher name. */
    let subPos = parentTreeNode.children.findIndex(childNode =>
      childNode.nodePath[childNode.nodePath.length - 1] >= newNodeName);
    /* If we did not find an existing node with a name that is
       greater than or equal to the current name. We must insert
       the new subnode at the end of the children array. Note
       that the children array may be empty. */
    if (subPos == -1)
      subPos = parentTreeNode.children.length;
    /* Insert the new subnode in the correct position */
    parentTreeNode.children.splice(subPos, 0, newTreeNode);
    if (newNodeType == 'company') {
      /* Build the standard/required subnodes of the company node
         and add them to the company node */
      HDLmMenus.buildCompanyNode(newTreeNode, updateDatabase);
    }
    HDLmPass.addMissingPassObject(parentTreeNode);
    /* Add the new tree node to the list (actually an array) of
       pending inserts. Eventually, all of these nodes will be
       added to the nodes database maintained by the server. */
    if (updateDatabase == true) {
      let processSubNodes = false;
      HDLmTree.addPendingInserts(newTreeNode, processSubNodes);
    }
    return newTreeNode;
  }
  /* This routine checks if the node name (really the last entry in the
     node path) is greater than or equal to a test name. The node and the
     test name are passed by the caller. This routine always returns true
     or false to the caller. */
  static checkNodeName(testNode, testName) {
    /* Make sure the first argument passed by the caller is an object */
    if (typeof testNode != 'object') {
      let errorText = 'Test node value passed to checkNodeName is not an object';
      HDLmAssert(false, errorText);
    }
    if (testNode == null) {
      let errorText = 'Test node value passed to checkNodeName is null';
      HDLmAssert(false, errorText);
    }
    if (Array.isArray(testNode) == true) {
      let errorText = 'Test node value passed to checkNodeName is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the second argument passed by the caller is a string */
    if (typeof testName != 'string') {
      let errorText = 'Test name value passed to checkNodeName is not a string';
      HDLmAssert(false, errorText);
    }
    /* Get the name from the test node. The name will be the last entry
       in the node path of the node. */
    let lastNodePathValue = testNode.nodePath[testNode.nodePath.length - 1];
    return lastNodePathValue >= testName;
  }
  /* This code clears all pending operations. In other words,
     all pending operations are removed and no further work
     is done with the pending operations. This call applies
     to both inserts and updates. */
  static clearAllPendingOperations() {
    /* Remove all of the pending inserts */
    HDLmTree.clearPendingInserts();
    /* Remove all of the pending updates */
    HDLmTree.clearPendingUdates();
  }
  /* This code empties the list of pending inserts. In other words,
     the length of the list of pending inserts is set to zero. */
  static clearPendingInserts() {
    /* Remove all of the pending inserts */
    HDLmTree.pendingInserts.length = 0;
  }
  /* This code empties the list of pending updates. In other words,
     the length of the list of pending updates is set to zero. */
  static clearPendingUpdates() {
    /* Remove all of the pending updates */
    HDLmTree.pendingUpdates.length = 0;
  }
  /* This routine will remove the current tree node and all of the
     children of the current tree node. Actually, not much is done
     on the current tree node. However, this routine is (recursively)
     invoked on all of the children of the current tree node and
     then the children array is deleted. This should free all of
     the storage used by the current tree node and is children
     (all the way down). */
  static clearChildren(currentTreeNode) {
    /* Invoke this routine recursively on all of the children of
       the current node */
    for (let i = 0; i < currentTreeNode.children.length; i++)
      HDLmTree.clearChildren(currentTreeNode.children[i]);
    currentTreeNode.children = [];
  }
  /* Convert an object to an instance of the HDLmTree class.
     The new instance is returned to the caller. Specific fields
     are copied from the object to the new HDLmTree instance. */
  static convertObjectToTree(infoJsonObj) {
    /* Build an object from the JSON and copy each field */
    let curObjNode = Object.assign({}, infoJsonObj);
    let curTreeNode = new HDLmTree(curObjNode.type, curObjNode.tooltip);
    if (curObjNode.hasOwnProperty('details'))
      curTreeNode.details = HDLmMod.convertObjectToMod(curObjNode.details);
    if (curObjNode.hasOwnProperty('id'))
      curTreeNode.id = curObjNode.id;
    curTreeNode.nodePath = curObjNode.nodePath.slice();
    return curTreeNode;
  }
  /* This routine will build and return an object representing
     the current node and all (including recursively) of the
     subnodes of the current node. This value is used for copy
     and paste operatios. Note that the details property will
     be copied as need be. Also note that the container widget
     property will not be copied and will be deleted. */
  static copyNode(currentTreeNode) {
    /* console.log('copynode'); */
    /* console.log(currentTreeNode); */
    let copyObj = new HDLmTree(currentTreeNode.type, currentTreeNode.tooltip);
    delete copyObj.containerWidget;
    if (currentTreeNode.hasOwnProperty('details'))
      copyObj['details'] = JSON.parse(JSON.stringify(currentTreeNode.details));
    if (currentTreeNode.hasOwnProperty('id'))
      copyObj['id'] = currentTreeNode.id;
    copyObj['nodePath'] = currentTreeNode.nodePath.slice();
    for (let i = 0; i < currentTreeNode.children.length; i++) {
      let subObj = HDLmTree.copyNode(currentTreeNode.children[i]);
      copyObj.children.push(subObj);
    }
    return copyObj;
  }
  /* This routine checks all of the subnodes of the parent node passed
     to it and counts the number of subnodes with matching names. The
     number of subnodes with matching names may be zero or greater than
     zero. The name matching algorithm is caseless. In other words, ABCD
     is deemed to match abcd. Note that ABCD (2) will also match abcd if
     the remove tails flag is set to true. If the remove tails flag is
     set to false, then ABCD (2) will not match ABCD.

     A null value can be (and is in some cases) passed for current tree
     node to force all of the children of the parent tree node to be
     checked. Passing a null value for current tree node is not an error
     condition.

     The removal of file number tails (such as (2)) is actually optional.
     The caller passes a flag that controls this behavior. If the flag
     is set to true, then file number tails are removed. If this flag
     is set to false, then file number tails are not removed. */
  static countSubNodeNames(nodeName, parentTreeNode, currentTreeNode,
                           removeTails) {
    /* console.log('countSubNodeNames'); */
    /* console.trace(); */
    /* let tempParentTreeNode = Object.assign({}, parentTreeNode); */
    /* let tempParentTreeNodeChildren = parentTreeNode.children.slice(); */
    /* console.log(tempParentTreeNode); */
    /* console.log(tempParentTreeNodeChildren); */
    /* console.log(tempParentTreeNodeChildren.length); */
    /* let tempCurrentTreeNode = Object.assign({}, currentTreeNode); */
    /* console.log(tempCurrentTreeNode); */
    /* console.log(removeTails); */
    let matchObj = {};
    matchObj.matchCount = 0;
    matchObj.matchArray = [];
    /* The code below will convert the file name passed by the caller
       in two ways. First any numeric file number tail (such as (2)) will
       be removed. The file name will then be converted to lower case. Note
       that the file name may not have a file number tail. This is not an
       error condition. */
    if (removeTails)
      nodeName = HDLmString.removeFileNumberTail(nodeName);
    nodeName = nodeName.toLowerCase();
    /* Check all of the names in the subnodes of the current parent node */
    /* console.log(parentTreeNode.children.length); */
    for (let i = 0; i < parentTreeNode.children.length; i++) {
      /* console.log(i); */
      /* Check if the we are checking against ourself. We don't need to
         check for a match in our own node. */
      if (currentTreeNode != null &&
          currentTreeNode == parentTreeNode.children[i])
        continue;
      /* console.log(parentTreeNode.children.length); */
      /* console.log(Object.keys(parentTreeNode.children).length); */
      /* Get the subnode name with the file number tail removed (if any)
         and converted to lower case */
      let childEntry = parentTreeNode.children[i];
      let siblingName = childEntry.nodePath[childEntry.nodePath.length - 1];
      /* console.log(i); */
      /* console.log(siblingName); */
      /* console.log(parentTreeNode); */
      /* console.log(parentTreeNode.children[i]); */
      let siblingNameSave = siblingName;
      if (removeTails)
        siblingName = HDLmString.removeFileNumberTail(siblingName);
      siblingName = siblingName.toLowerCase();
      /* Check if the names match exactly */
      /* console.log(i); */
      /* console.log(siblingName); */
      /* console.log(nodeName); */
      if (siblingName == nodeName) {
        matchObj.matchCount++;
        matchObj.matchArray.push(siblingNameSave);
      }
    }
    return matchObj;
  }
  /* Create a new Fancytree node and add it to the Fancytree 
     node tree. This is only done in some cases. */
  static createCurrentFancytree(currentTreeNode) {
    /* console.log('In HDLmTree.createCurrentFancytree'); */
    /* Build the new Fancytree node that we need to add to the fancy
       tree */
    let addedToParent = false;
    let lastNodePathValue = currentTreeNode.nodePath[currentTreeNode.nodePath.length - 1];
    let newLazy = true;
    let newNodeFolder = true;
    let newFancyNode = {
      title: lastNodePathValue,
      tooltip: currentTreeNode.tooltip,
      folder: newNodeFolder,
      lazy: newLazy
    };
    /* console.log(newFancyNode); */
    /* Locate the current Fancytree node, if possible */
    let currentNodePath = currentTreeNode.nodePath;
    let currentNodePathLen = currentNodePath.length;
    let currentFancyNode = HDLmTree.locateFancyNode(currentNodePath);
    if (currentFancyNode != null)
      return 'Current Fancytree node already exists';
    /* Locate the parent of the new Fancytree node */
    let parentFancyNodePath = currentNodePath.slice(0, currentNodePathLen - 1);
    /* console.log(parentFancyNodePath); */
    let parentFancyNode = HDLmTree.locateFancyNode(parentFancyNodePath);
    /* console.log(parentFancyNode); */
    if (false && parentFancyNode == null) {
      let nodeString = parentFancyNodePath.toString();
      let errorText = `Parent Fancytree node not located (${nodeString})`;
      HDLmAssert(false, errorText);
    }
    /* Check if the parent Fancytree node was not found */
    if (parentFancyNode == null)
      return 'Parent Fancytree node is null';
    /* console.log(parentFancyNode.isActive()); */
    /* console.log(parentFancyNode.isExpanded()); */
    /* We can now add the new Fancytree tree node to the Fancytree */
    if (parentFancyNode.isExpanded()) {
      let handlingCmdInsertFalse = false;
      HDLmTree.addToParentFancy(parentFancyNode, newFancyNode, 
                                currentTreeNode, handlingCmdInsertFalse);
      addedToParent = true;
      return 'New Fancytree node added';
    }
    /* The parent Fancytree node is not expanded. We need to expand this note
       and when the expand operation is complete, we need to add the new tree
       node. */
    else {
      let expandPromise = parentFancyNode.setExpanded(true);
      expandPromise.then(function (response) {
        /* console.log(response); */
        let handlingCmdInsertFalse = false;
        HDLmTree.addToParentFancy(parentFancyNode, newFancyNode, 
                                  currentTreeNode, handlingCmdInsertFalse);
        addedToParent = true;
      },
      function (error) {
        HDLmError.buildError('Error', 'Expand failure', 52, error);
      });
    }
    /* Because of how promises work, this routine may finish before
       the promise is resolved. In other words, this routine may 
       indicate that a new Fancytree node was not added, when it
       really was (in the then function). */
    if (addedToParent == false)
      return 'New Fancytree node not added';
    else
      return 'New Fancytree node added'; 
  }
  /* This is the standard code for delete node processing. Most of the work
     needed for a delete is the same for all tree node types. The code below
     does the actual work. Note that this routine deletes the tree node from
     the node tree and the Fancytree node from the Fancytree. Note that a 
     Fancytree might not exist at this point (won't exist for some extensions)
     and the Fancytree node might be null. 
     
     This code does not actually delete the node in question. References to 
     the node are deleted. The tree node may be garbage collected sooner or
     later. */
  static deleteTreeNode(currentFancyNode, currentTreeNode) {
    /* console.log('In deleteTreeNode', currentFancyNode, currentTreeNode); */
    /* The delete event must be saved in the undo / redo array. To undo
       a delete, the tree node (which might not be a modification node)
       must be restored along with the associated Fancytree node. The
       delete node path is saved here so that it can be used later.
       The original delete node path may not even exist after the
       current node is deleted. */
    let deleteNodePath = currentTreeNode.nodePath.slice();
    /* As a first step we need to remove the current tree node from the children
       array of the parent of the current tree node */
    HDLmTree.removeFromParentTree(currentTreeNode);
    /* At this point we need to check for a very special case. 
       We may be running in some type of browser extension 
       window. In that case we really don't want to send a 
       request to the database server. What we need to do is
       to send a request to server that can actually handle 
       the request. */
    if (HDLmGlobals.checkForInlineEditorOrGems()) {
      /* console.log('about to invoke sendCurrentRequest'); */
      /* console.log(HDLmTree); */
      /* console.log(HDLmWebSockets); */
      /* console.log(currentTreeNode); */
      /* HDLmWebSockets.sendDeleteTreeNodeRequest(currentTreeNode); */
      /* console.log('aet', HDLmGlobals.activeEditorType); */
      /* console.log('aew', HDLmGlobals.checkActiveExtensionWindow()); */
      HDLmWebSockets.sendDeleteTreeNodeRequest(currentTreeNode);
      HDLmGXE.rulesUpdatedSet();
    }
    else {
      /* Delete all of the rows (one or more) that make up the tree */
      HDLmTree.passDeleteTreeFromDatabase(currentTreeNode);
    }
    HDLmTree.clearChildren(currentTreeNode);
    /* Remove the current Fancytree node from the Fancytree. This is actually
       rather easy to do. Of course, for some extensions no Fancytree is 
       actually created. */
    if (HDLmGlobals.activeEditorType != HDLmEditorTypes.gem &&
        HDLmGlobals.activeEditorType != HDLmEditorTypes.gxe)
      currentFancyNode.remove();
    /* Perform a set of update related operations */
    HDLmTree.updateRelatedOperations(deleteNodePath);
  }
  /* This routine will delete a few widget related properties from
     the current node and all of the children of the current node.
     This process is recursive so that all of the widget related
     properties, at all levels will be deleted. This routine does
     not appear to be in use. */
  static deleteWidgetProperties(currentTreeNode) {
    if (currentTreeNode.hasOwnProperty('containerWidget'))
      delete currentTreeNode.containerWidget;
    for (let i = 0; i < currentTreeNode.children.length; i++) {
      HDLmTree.deleteWidgetProperties(currentTreeNode.children[i]);
    }
  }
  /* The function below is called when a node is dragged over some other
     node. The node passed by the caller is the target of the current
     drag-and-drop operation. The node being dragged can be obtained
     from the data. */
  static dndDragDrop(node, data) {
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    /* Find the target tree node */
    let fancyTargetNodePath = node.data[fieldName];
    let targetTreeNode = HDLmTree.locateTreeNode(fancyTargetNodePath);
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = fancyTargetNodePath.toString();
      console.log('In HDLmTree.dndDragDrop', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* Check if what is being dragged is a Fancytree node */
    if (data.otherNode == null)
      return;
    if (data.otherNodeData == null)
      return;
    /* Find the tree node being dragged */
    let fancyDragNodePath = data.otherNode.data[fieldName];
    let dragNode = HDLmTree.locateTreeNode(fancyDragNodePath);
    /* Report an error if the node could not be found */
    if (dragNode == null) {
      let nodeString = fancyDragNodePath.toString();
      console.log('In HDLmTree.dndDragDrop', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* Make a copy of the current drag node. This is the node we are dragging
       from. This is not the node we are dragging too. */
    let currentObj = HDLmTree.copyNode(dragNode);
    /* Delete the node we are dragging from. Note that both the tree node and
       the Fancytree node are deleted. Note that tree node, may actually have
       nodes under it. Of course, this also applies to the Fancytree node.
       However, the Fancytree code should take care of this. */
    HDLmTree.deleteTreeNode(data.otherNode, dragNode);
    HDLmMenus.cmdPasteCommonDnd(fancyDragNodePath, node, targetTreeNode, currentObj, HDLmUnReTypes.dnd);
    return;
  }
  /* This routine is invoked at the end of drag-and-drop processing. A
     flag (data.isCancelled) can be check to determine if a drop occurred. */
  static dndDragEnd(node, data) {
    return;
  }
  /* The function below is called when a node is dragged over some other
     node. The node passed by the caller is the target of the current
     drag-and-drop operation. The node being dragged can be obtained
     from the data. */
  static dndDragEnter(node, data) {
    let rvValue = false;
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    /* Find the target tree node */
    let fancyTargetNodePath = node.data[fieldName];
    let targetTreeNode = HDLmTree.locateTreeNode(fancyTargetNodePath);
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = fancyTargetNodePath.toString();
      console.log('In HDLmTree.dndDragEnter', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return rvValue;
    }
    /* Find the tree node being dragged */
    let fancyDragNodePath = data.otherNode.data[fieldName];
    let dragNode = HDLmTree.locateTreeNode(fancyDragNodePath);
    /* Report an error if the node could not be found */
    if (dragNode == null) {
      let nodeString = fancyDragNodePath.toString();
      console.log('In HDLmTree.dndDragEnter', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return rvValue;
    }
    /* The target node must be exactly one level higher than the
       node being dragged */
    if ((dragNode.nodePath.length - targetTreeNode.nodePath.length) != 1)
      return rvValue;
    /* Check if the target node is a parent of the node being
       dragged. This is not allowed. */
    let parentNode = true;
    for (let i = 0; i < fancyTargetNodePath.length; i++) {
      if (fancyTargetNodePath[i] != fancyDragNodePath[i]) {
        parentNode = false;
        break;
      }
    }
    /* Check if we are attempting to drop a node over a parent node.
       This is not allowed. */
    if (parentNode == true)
      return rvValue;
    /* Only allow dragged nodes to be dropped over a target node */
    rvValue = 'over';
    data.dropEffect = "copy";
    data.dataTransfer.dropEffect = "copy";
    data.dataTransfer.effectAllowed = "copy";
    return rvValue;
  }
  /* This routine is invoked at the start of drag-and-drop processing.
     This routine decides if drag-and-drop processing should be allowed
     or not. We generally allow drag-and-drop processing. However, for
     the 'Top' (top) node and the next level down (company nodes) we
     do not allow drag-and-drop to proceeed. */
  static dndDragStart(node, data) {
    let rvBool = false;
    /* Check if any of the inline editors is active. We never allow
       drag-and-drop behavior with any of the inline editors. Note
       that drag-and-drop into the inline editors is allowed. For
       example, an image might be dropped into an inline editor. */
    if (HDLmGlobals.checkForInlineEditor()) {
      return rvBool;
    }
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let fancyNodePath = node.data[fieldName];
    let targetTreeNode = HDLmTree.locateTreeNode(fancyNodePath);
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = fancyNodePath.toString();
      console.log('In HDLmTree.dndDragStart', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return rvBool;
    }
    /* Check the current level. For the 'Top' (top) node and company
       nodes drag-and-drop is not allowed. */
    if (targetTreeNode.nodePath.length <= 2)
      return rvBool;
    /* Allow drag-and-drop processing to proceed */
    rvBool = true;
    return rvBool;
  }
  /* This routine is invoked before the inline editor is closed.
     This routine checks the new node title and does all of the work
     needed to validate and use the new node title (if it is valid). */
  static editInlineBeforeClose(event, data) {
    let rvBool = false;
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let oldNodePath = data.node.data[fieldName].slice();
    let fancyNodePath = data.node.data[fieldName];
    let targetTreeNode = HDLmTree.locateTreeNode(fancyNodePath);
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = fancyNodePath.toString();
      console.log('In HDLmTree.editInlineBeforeClose', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return rvBool;
    }
    /* Check if the save flag is set to false. If this is true,
       then the node title is either unchanged or the user pressed
       cancel. In either case we don't have any work to do. */
    if (data.save == false) {
      rvBool = true;
      return rvBool;
    }
    /* Get the new name and strip off any leading and trailing
       blanks */
    let newName = data.input.val();
    let newNameTrim = newName.trim();
    /* At this point we can check for a fairly special case. If
       the new name is for an ignore-list, we need to make sure
       that the new name is not disallowed because of potential
       conflicts with the names of other objects than can be
       associated with a report. */
    if (targetTreeNode.hasOwnProperty('type') &&
        targetTreeNode.type == 'list' &&
        HDLmPass.checkName(newNameTrim) == false) {
      let errorText = `The name (${newNameTrim}) is not allowed because of conflicts`;
      HDLmUtility.setErrorText(errorText);
      return rvBool;
    }
    /* Get the new node name and validate it. The new node name
       must be valid and not conflict with any existing node names.
       Note that remove tails is forced to true here for all editor
       types. The idea is that the user must use a new rule name
       that is unique even with all tails removed. */
    let removeTails = true;
    /* console.log('About to call checkTreeNodeName'); */
    let errorText = HDLmMod.checkTreeNodeName(targetTreeNode, newNameTrim, removeTails);
    if (errorText != '') {
      HDLmUtility.setErrorText(errorText);
      return rvBool;
    }
    /* At this point we have a valid new name for a node.
       We can now add the edit event to the changes array.
       This allows undo / redo processing for the changes
       array. */
    let oldName = fancyNodePath[fancyNodePath.length - 1];
    /* At this point we have a valid new name for a node */
    let removeOldFancyFalse = false; 
    HDLmTree.modifyNodeName(newName, data.node, targetTreeNode, removeOldFancyFalse);
    /* Possibly reload the current page */
    if (true) {
      let callFromCallbackFalse = false;
      HDLmMod.handleUpdateReloadPageUnconditional(callFromCallbackFalse);
    }
    /* Add the current change to the undo / redo list */
    HDLmUnRe.addEdit(oldName, newName, oldNodePath, data.node);
    rvBool = true;
    return rvBool;
  }
  /* Get the tree node associated with the Fancytree node passed
     by the caller. In general we allow inline editing of node
     names. However, the name of the top node ('Top') can not
     be changed. The names of several other node types can not
     be changed either.*/
  static editInlineBeforeEdit(event, data) {
    let rvBool = true;
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let nodePath = data.node.data[fieldName];
    let targetTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.editInlineBeforeEdit', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return rvBool;
    }
    /* Get the types of the current node. Several types of nodes
       can not be renamed. */
    let nodeType = targetTreeNode.type;
    if (nodeType == 'top'       ||
        nodeType == 'companies' ||
        nodeType == 'lines'     ||
        nodeType == 'line'      ||
        nodeType == 'lists'     ||
        nodeType == 'reports'   ||
        nodeType == 'report'    ||
        nodeType == HDLmDefines.getString('HDLMRULESTYPE'))
      rvBool = false;
    /* In some cases, a list (a list of ignore-list entries) can be
       renamed. In other cases, a list can not be renamed. If a list
       is part of a report, it can not be renamed. However, if a list
       is just one list (ignore-list) in a set of ignore-lists, then
       it can be renamed. Note that the same rules apply to ignore-list
       entries (individual ignores). */
    else if (nodeType == 'list' ||
             nodeType == 'ignore') {
      if (nodePath.indexOf('Reports') >= 0)
        rvBool = false;
    }
    return rvBool;
  }
  /* Get the tree node associated with the Fancytree node passed by
     the caller. This routine clears the error message text (if any).
     This routine also removes the current node if the save flag is
     set to true. The save flag will only be set to true, if a new
     node was constructed (with a new name). */
  static editInlineClose(event, data) {
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let nodePath = data.node.data[fieldName];
    let targetTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.editInlineClose', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* Check if the save flag is set to false. If this is true,
       then the node title is either unchanged or the user pressed
       cancel. In either case we don't have any work to do. If the
       save flag is set to true, then we need to remove the old
       Fancytree node. */
    if (data.save == true) {
      /* Remove the current (really the old) Fancytree node from the
         Fancytree. This is actually rather easy to do. */
      HDLmTree.removeFancyNode(data.node);
    }
    /* Clear the error message text */
    let errorStringEmpty = '';
    HDLmUtility.setErrorText(errorStringEmpty);
  }
  /* Get the tree node associated with the Fancytree node passed
     by the caller. This routine doesn't really do anything at
     this time. */
  static editInlineEdit(event, data) {
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let nodePath = data.node.data[fieldName];
    let targetTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.editInlineEdit', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
  }
  /* Get the tree node associated with the Fancytree node passed
     by the caller. This routine just clears the error message
     text (if any) for now. */
  static editInlineSave(event, data) {
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let nodePath = data.node.data[fieldName];
    let targetTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.editInlineSave', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* Clear the error message text */
    let errorStringEmpty = '';
    HDLmUtility.setErrorText(errorStringEmpty);
  }
  /* This routine expands the parent Fancytree node passed to it. The 
     parent Fancytree node may already be expanded (will be in some 
     cases). The new child Fancytree node is added to the parent, if
     need be. The new child Fancytree node is made the active node
     in all cases. The new Fancytree node may not be new in all cases.
     It may alreay exist. */
  static expandAndSet(parentFancyNode, childFancyNode, childTreeNode) {
    /* console.log('In expandAndSet', parentFancyNode, childFancyNode, childTreeNode); */
    parentFancyNode.setExpanded().then(function (response) {
      /* It appears (based on testing) that the response variable is not actually
         set. Response appears to have an undefined value. */
      /* console.log('In expandAndSet', response); */
      /* console.log('In expandAndSet', 'About to add the node'); */
      let newFancyNode = HDLmTree.addNodeToFancy(parentFancyNode, childFancyNode, childTreeNode);
      /* console.log('In expandAndAddFancy', newFancyNode); */
      /* Make sure the new Fancytree node was returned */
      if (newFancyNode == null) {
        let errorText = `New Fancytree node was not returned by addNodeToFancy routine`;
        HDLmAssert(false, errorText);
      }
      /* Under some circumstances we want to make the newly inserted Fancytree
         node, the active node. This is true in all cases, when this routine
         is used. */
      newFancyNode.setActive();
    }, function (error) {
         /* It appears (based on testing) that the error variable is not actually
            set. Error appears to have an undefined value. */
         HDLmError.buildError('Error', 'Expand and set failure', 14, error);
    });
  }
  /* Return the a value that can be used as the Fancytree
     source. This value is used to initialize the Fancytree
     tree instance. Note that this function must return a JSON
     object to the caller. */
  static fancyTreeSource(event, data) {
    /* console.log('In fancyTreeSource'); */
    let rvArray = [];
    /* We need very different code for the inline editors versus
       all other types of editor. The inline editors have no
       visible Top (top) node. The rules (if any) that fired
       for the current node are the initial set of nodes. */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
      /* At this point we may need to use the dummy DOM node object
         or we may use a real DOM node object obtained from the DOM.
         If we are running in the browser extension window environment,
         then we want to use a real DOM node. Otherwise we use a simuleted
         DOM node. */
      let domNodeObject = HDLmPopup.getDomNodeObject();
      /* Get the rule names from the real or simulated DOM node
         object */
      let fullRuleNames = HDLmTree.getFullRuleNames(domNodeObject);
      let outArray = [];
      /* Handle each of the full rule names */
      for (let i = 0; i < fullRuleNames.length; i++) {
        let fullRuleName = fullRuleNames[i];
        let currentTreeNode = HDLmTree.getTreeNode(fullRuleName);
        let nodePathName = HDLmDefines.getString('HDLMNODEPATH');
        /* Build an object with the information obtained above */
        let outObj = {};
        outObj.title = currentTreeNode.nodePath[currentTreeNode.nodePath.length - 1];
        outObj.lazy = false;
        outObj.folder = false;
        outObj.tooltip = currentTreeNode.tooltip;
        outObj[nodePathName] = currentTreeNode.nodePath.slice(0);
        rvArray.push(outObj);
      }
    }
    /* We must be running one of the other editors. The other
       editor have a top node. */
    else {
      /* Create an object that we can add a set of fields too.
         This object is added to the return array later. */
      let topObj = Object();
      let treeTopNode = HDLmTree.getTreeTop();
      topObj['title'] = treeTopNode.nodePath[treeTopNode.nodePath.length - 1];
      /* All nodes other than modification nodes are lazy nodes */
      topObj['lazy'] = true;
      /* All nodes other than modification nodes are folder nodes */
      topObj['folder'] = true;
      /* Set the top node Tooltip value */
      topObj['tooltip'] = HDLmTree.getTreeTop().tooltip;
      /* We need to build the complete node path for the top node */
      let fieldName = HDLmDefines.getString('HDLMNODEPATH');
      topObj[fieldName] = [treeTopNode.nodePath[treeTopNode.nodePath.length - 1]];
      rvArray.push(topObj);
    }
    return rvArray;
  }
  /* This method scans a parameter number usage map to find the
     parameter number that is used the least. The least used
     parameter number is returned to the caller. Note that if
     the parameter map does not have any information for a
     parameter number, then the usage is assumed to be zero. */
  static findLowestParameter(parmMap) {
    let currentCount;
    let maxParameterCount = HDLmDefines.getNumber('HDLMMAXPARAMETERCOUNT');
    let maxValue = Number.POSITIVE_INFINITY;
    let minParm;
    /* Check all of the parameter numbers looking for the one
       that is used the least */
    for (let i = 0; i < maxParameterCount; i++) {
      /* Check if the parameter map passed by the caller has an
         entry for the current parameter number */
      if (parmMap.hasOwnProperty(i))
        currentCount = parmMap[i];
      else
        currentCount = 0;
      /* Check if the current count is less that lowest value
         we have seen so far */
      if (currentCount < maxValue) {
        maxValue = currentCount;
        minParm = i;
        /* If the current count is zero, then we really don't
           need to keep searching. We are done at this point. */
        if (currentCount == 0)
          break;
      }
    }
    return minParm;
  }
  /* This routine fixes the entire node tree (the HDLmTree) by 
     adding ID values wherever they are missing. This can really
     happend if nodes (HDLmTree nodes) are added to the node tree
     that do not have ID values. This routine goes back to the 
     database server and gets the correct ID values and adds then
     to the node tree as need be.
     
     This routine has proven to be somewhat fragile. This routine
     tries to search an array for JSON strings. This approach is 
     fine (it does work) but is somewhat fragile. Even the slightest
     difference will cause the JSON strings not to match, which will
     cause this routine to fail. 

     This routine does not appear to be in use */ 
  static fixNodeIds() {
    /* console.log('fixnodeids'); */
    /* Build the node path for the node at the top of the tree */
    let nodePath = [];
    let topNodeName = HDLmDefines.getString('HDLMTOPNODENAME');
    nodePath.push(topNodeName);
    /* Try to find the top node. This should never fail. */
    let topTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* console.log(nodeIdenStr); */
    /* Report an error if the top node could not be found */
    if (topTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.fixNodeIds', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* Call the routine that will get all of the nodes that do not
       have proper ID values */
    let noIdsArray = [];
    HDLmTree.getNodesNoIds(noIdsArray, topTreeNode);
    /* console.log(noIdsArray); */
    let noIdsArrayLen = noIdsArray.length;
    /* Check if we have all of the IDs we need. If this is true,
       then we have no more work to do. */
    if (noIdsArrayLen == 0)
      return;
    /* Read all of the rows from the database. The rows read from 
       the database will have the correct ID values. Use the ID 
       values to fix the nodes that do not have ID values. */
    let ajaxPromise;
    ajaxPromise = HDLmTree.passReadAllRows();
    /* We can now wait from the Promise to complete */
    ajaxPromise.then(function (responseText) {
      /* console.log(responseText); */
      let responseJson = JSON.parse(responseText);
      let responseData = responseJson.data;
      let responseDataLen = responseData.length;
      /* We can not extract all of the rows and the ID values from
         the response data */
      let rowIdArray = [];
      let rowObjArray = [];
      for (let i = 0; i < responseDataLen; i++) {
        /* Get the current row entry from the row array */
        let curEntry = responseData[i];
        let curId = curEntry.id;
        let curInfo = curEntry.info;
        let curInfoTypeOf = typeof curInfo;
        if (curInfoTypeOf == 'string')
          curInfo = JSON.parse(curInfo);
        /* Remove a few values from the current information entry */
        delete curInfo.created;
        delete curInfo.lastmodified;
        /* console.log(curInfo); */
        /* console.log(typeof curInfo); */
        /* console.log(Object.keys(curInfo)); */
        /* Change the details so that a match is more likely */
        if (curInfo.hasOwnProperty('details') == true) {
          /* console.log('hasOwnProperty'); */
          let curDetails = curInfo.details;
          delete curDetails.countDivisions;
          delete curDetails.created;
          delete curDetails.lastmodified;
          delete curDetails.name; 
          delete curDetails.extra;
          delete curDetails.enabled;
        }
        /* console.log(curInfo); */
        /* console.log(curInfoStr); */
        /* console.log(typeof curInfoStr); */ 
        /* curInfoStr = curInfoStr.replace(/\s/g, ''); */
        /* curInfoStr = curInfoStr.replace(/\\n/g, ''); */
        /* Add the current row to the ID and string arrays */
        rowIdArray.push(curId);
        rowObjArray.push(curInfo);
      }
      /* console.log(rowIdArray); */
      /* console.log(rowObjArray); */
      /* We now have enough information to hopefully fix the nodes
         that do not have ID values */
      for (let i = 0; i < noIdsArrayLen; i++) {
        let noIdsArrayEntry = noIdsArray[i];
        /* Create a temporary copy of the current tree node. This is
           done so that we can make changes to the temporary copy that
           will not affect the original tree node. */
        let tempDetails = {};
        let tempPos = {};
        tempPos = Object.assign(tempPos, noIdsArrayEntry);
        if (tempPos.hasOwnProperty('children'))
          delete tempPos.children;
        if (tempPos.hasOwnProperty('containerWidget'))
          delete tempPos.containerWidget;
        if (tempPos.hasOwnProperty('id'))
          delete tempPos.id;
        /* Remove the saved details from the current node, if need be */
        if (tempPos.hasOwnProperty('savedDetails'))
          delete tempPos.savedDetails;
        if (tempPos.hasOwnProperty('details')) {
          tempDetails = Object.assign(tempDetails, tempPos.details);
          delete tempDetails.countDivisions;
          delete tempDetails.created;
          delete tempDetails.lastmodified;
          delete tempDetails.name; 
          delete tempDetails.extra;
          delete tempDetails.enabled;
          tempPos.details = tempDetails;
        }
        /* noIdsStr = noIdsStr.replace(/\"/g, '\\\"'); */
        /* noIdsStr = '"' + noIdsStr + '"'; */
        /* search the row array looking for an entry that matches
           the HDLmTree ndde we are looking for */
        let rowIndex = rowObjArray.findIndex(rowObj => {
            let rv = '';
            let objectsMisMatch;
            [objectsMisMatch, rv] = HDLmUtility.compareValues(rowObj, tempPos, rv);
            return !objectsMisMatch;
          }
        );
        /* console.log('in the no ids loop'); */
        /* console.log(tempPos); */
        /* console.log(noIdsStr); */
        /* console.log(rowIndex); */
        /* Use the row index to fix the tree node (HDLmTree) if possible */
        if (rowIndex >= 0) {
          noIdsArrayEntry.id = rowIdArray[rowIndex];
        }
      }
    }, function (errorText) {
      /* console.log(errorText); */
      HDLmError.buildError('Error', 'Read all rows failure', 14, errorText);
    });
  }
  /* Get the children of a rule tree node */
  getChildren() {
    return this.children;
  }
  /* Get the details (if any) of a rule tree node */
  getDetails() {
    return this.details;
  }
  /* Get a full rule name from a DOM element. This is only possible 
     if at least one rule fired for the current DOM element. Of course,
     several rules might fire for one DOM element. Only the first will
     be used. If the first full rule name can not be obtained, a null 
     value will be returned. */
  static getFullRuleName(currentElement) {
    /* The initial value of the full rule name (note the singular) is always
       null. We may be able to get a full rule name if at least one rule 
       fired for the current DOM element. */
    let fullRuleNameStr = null;
    /* Try to get the modification name of the first rule (if any)  
       that fired for the current DOM node */
    let recursionWantedFalse = false;
    let domNodeObject = HDLmHtml.buildObjectFromNode(currentElement, recursionWantedFalse);
    /* console.log(domNodeObject); */
    /* Get the full rule names from the real or simulated DOM node
       object */
    let fullRuleNames = HDLmTree.getFullRuleNames(domNodeObject);
    if (fullRuleNames.length > 0) {
      fullRuleNameStr = fullRuleNames[0];
      /* console.log(fullRuleNameStr); */
    }
    return fullRuleNameStr;
  }
  /* This routine gets rule names from a DOM node object. It is assumed 
     that the object passed to this routine will really be an object and 
     that the rule names will be been changed to use substitution characters
     where regular characters can not be used. 

     The rule names returned by this routine will proably be full rull names.
     A full rule name has a host name followed by a forward slash followed by
     a division name followed by a forward slash followed by a site name 
     followed by a forward slash followed by the actual rule name. */
  static getFullRuleNames(domNodeObj) {
    /* console.log('In HDLmTree.getFullRuleNames', domNodeObj); */
    let ruleNames = [];
    /* Check if a null value was passed for the DOM node
       object. Just return to the caller if that is true. */
    if (domNodeObj == null)
      return ruleNames;
    /* console.log('In HDLmTree.getFullRuleNames', domNodeObj); */
    /* Check if the JSON DOM node actually has any attributes.
       This will not always be the case. */
    if (!domNodeObj.hasOwnProperty('attributes'))
      return ruleNames;
    /* console.log('In HDLmTree.getFullRuleNames', domNodeObj); */
    /* Build the prefix that should come before each rule name */
    let hdlmUpdatedPrefix = HDLmDefines.getString('HDLMUPDATED');
    hdlmUpdatedPrefix = hdlmUpdatedPrefix.toLowerCase();
    let prefixLength = hdlmUpdatedPrefix.length;
    /* Get all of the attributes of the current DOM node */
    let attributes = domNodeObj.attributes;
    /* console.log('In HDLmTree.getFullRuleNames', attributes); */
    for (let curKey in attributes) {
      if (!curKey.startsWith(hdlmUpdatedPrefix))
        continue;
      let curValue = attributes[curKey];
      /* Remove the prefix and reverse all of the character changes. 
         These steps will yield the original rule name. */
      curKey = curKey.substring(prefixLength);
      curKey = HDLmHtml.reverseCharacterChanges(curKey);
      /* Add the rule name to the rule name array */
      ruleNames.push(curKey);
    }
    /* The rule names may not be in the correct sort order. We need 
       to make sure that the rule names are in the correct order. */
    ruleNames = HDLmTree.sortFullRuleNames(ruleNames);
    /* console.log('In HDLmTree.getFullRuleNames', ruleNames); */
    return ruleNames;
  }    
  /* This routine gets the count of rule names for a DOM node. It is assumed 
     that the DOM node passed to this routine will really be a DOM node and 
     that the rule names will be been changed to use substitution characters
     where regular characters can not be used. */
  static getFullRuleNamesCount(domNode) {
    /* console.log('In HDLmTree.getFullRuleNamesCount', domNode); */
    let ruleNamesCount = 0;
    /* Check if a null value was passed for the DOM node. 
       Just return to the caller, if that is true. */
    if (domNode == null)
      return ruleNamesCount;
    /* Get an object for the current DOM node */
    let recursionWantedFalse = false;
    let domNodeObj = HDLmHtml.buildObjectFromNode(domNode, recursionWantedFalse);
    /* console.log('In HDLmTree.getFullRuleNamesCount', domNodeObj); */
    /* Check if the JSON DOM node actually has any attributes.
       This will not always be the case. */
    if (!domNodeObj.hasOwnProperty('attributes'))
      return ruleNamesCount;
    /* console.log('In HDLmTree.getFullRuleNamesCount', domNodeObj); */
    /* Build the prefix that should come before each rule name */
    let hdlmUpdatedPrefix = HDLmDefines.getString('HDLMUPDATED');
    hdlmUpdatedPrefix = hdlmUpdatedPrefix.toLowerCase();
    let prefixLength = hdlmUpdatedPrefix.length;
    /* Get all of the attributes of the current DOM node */
    let attributes = domNodeObj.attributes;
    /* console.log('In HDLmTree.getFullRuleNamesCount', attributes); */
    for (let curKey in attributes) {
      if (!curKey.startsWith(hdlmUpdatedPrefix))
        continue;
      let curValue = attributes[curKey];
      /* Remove the prefix and reverse all of the character changes. 
         These steps will yield the original rule name. */
      curKey = curKey.substring(prefixLength);
      curKey = HDLmHtml.reverseCharacterChanges(curKey);
      /* Add the rule name to the rule name array */
      ruleNamesCount += 1;
    }
    /* console.log('In HDLmTree.getFullRuleNamesCount', ruleNamesCount); */
    return ruleNamesCount;
  }  
  /* Get the type of great grand parent of the current node. This
     type is needed in some cases. For example, some site node have
     modification nodes under them. Other site nodes have value nodes
     under them. */
  static getGreatGrandParentType(treePos) {
    /* Get the node path for the current node */
    let treePosNodePath = treePos.nodePath;
    let greatGrandParentNodePath = treePosNodePath.slice();
    greatGrandParentNodePath.pop();
    greatGrandParentNodePath.pop();
    /* At this point we can try to locate the great grand parent
       node above the current node. This step should never fail.
       However, you never know what is going to fail or not. */
    let greatGrandParentTreeNode = HDLmTree.locateTreeNode(greatGrandParentNodePath);
    /* Report an error if the companies node could not be found */
    if (greatGrandParentTreeNode == null) {
      let nodeString = greatGrandParentNodePath.toString();
      console.log('In HDLmTree.getGreatGrandParentType', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return null;
    }   
    return greatGrandParentTreeNode.type;
  }
  /* This routine extracts all of the ID values from a set
     of text passed by the caller and returns an array of
     ID values The response text came from a read all
     operation that returned all of the rows with a
     specific content value. */
  static getIdArray(responseText) {
    /* Declare and define a few values */
    let idArray = [];
    /* Extract all of the ID values from the response text */
    /* console.log('getIdArray'); */
    /* console.log(responseText); */
    let responseJson = JSON.parse(responseText);
    /* console.log(responseJson); */
    let responseData = responseJson.data;
    /* console.log(responseData); */
    let rowCount = responseData.length;
    /* Process each of the rows */
    for (let i = 0; i < rowCount; i++) {
      let rowObject = responseData[i];
      let rowId = rowObject.id;
      idArray.push(rowId);
    }
    return idArray;
  }
  /* This routine extracts ID values from the node tree
     and stores the ID values in an array. This routine
     also gets the information from the node tree. The
     information is modified by deleting the ID values
     and the container value. */
  static getIdValuesAndInfoFromNodeTree(treeIdArray, treeInfoArray, treePos) {
    /* Create a temporary copy of the current tree node. This is
       done so that we can make changes to the temporary copy that
       will not affect the original tree node. Notably, the ID 
       and container values are removed from the temporary copy. */
    let tempTreePos = Object.assign({}, treePos);
    delete tempTreePos.id;
    delete tempTreePos.children;
    delete tempTreePos.containerWidget;
    /* Add an entry to the tree array */
    treeIdArray.push(treePos.id);
    /* Convert the current tree node to a JSON string 
       and add it to the tree info array */
    let treePosStr = JSON.stringify(tempTreePos);
    treeInfoArray.push(treePosStr);
    /* Process all of the children of the current node */
    let childrenArray = treePos.children;
    let childrenCount = childrenArray.length;
    for (let i = 0; i < childrenCount; i++) {
      let curNode = childrenArray[i];
      HDLmTree.getIdValuesAndInfoFromNodeTree(treeIdArray, treeInfoArray, curNode);
    }
    return;
  }
  /* This routine extracts ID values from the response JSON
     and stores them in each node. The response JSON is from
     an insert operation. The tree array is really only used
     to keep track of how many tree nodes we have processed. */
  static getIdValuesFromResponseJson(responseJson, treeIdArray, treePos) {
    /* Declare and define a few variables */
    let idArraySize = treeIdArray.length;
    /* Set or reset the ID value using the response from the
       insert that was executed earlier */
    treePos.id = responseJson.data[idArraySize].id;
    /* Add an entry to the tree array */
    treeIdArray.push(treePos.id);
    /* Process all of the children of the current node */
    let childrenArray = treePos.children;
    let childrenCount = childrenArray.length;
    for (let i = 0; i < childrenCount; i++) {
      let curNode = childrenArray[i];
      HDLmTree.getIdValuesFromResponseJson(responseJson, treeIdArray, curNode);
    }
    return;
  }
  /* This routine extracts all of the info values from a set
     of text passed by the caller and returns an array of
     info values The response text came from a read all
     operation that returned all of the rows with a
     specific content value. */
  static getInfoArray(responseText) {
    /* Declare and define a few values */
    let infoArray = [];
    /* Extract all of the info values from the response text */
    /* console.log('getInfoArray'); */
    /* console.log(responseText); */
    let responseJson = JSON.parse(responseText);
    /* console.log(responseJson); */
    let responseData = responseJson.data;
    /* console.log(responseData); */
    let rowCount = responseData.length;
    /* Process each of the rows */
    for (let i = 0; i < rowCount; i++) {
      let rowObject = responseData[i];
      let rowInfo = rowObject.info;
      infoArray.push(rowInfo);
    }
    return infoArray;
  }  
  /* This routine scans the input array and returns all
     of the matching entries in the output array. For an
     entry to match, the entry must have the correct
     level number and the node array passed by the
     caller must match the node array of the entry.
     The node array passed by the caller is compared to
     the node array of each entry by comparing each
     entry in both arrays. */
  static getMatchingEntries(inArray, level, nodes) {
    /* Declare and define a few values */
    let inLen = inArray.length;
    let nodesLen = nodes.length;
    let outArray = [];
    /* Scan the input array looking for matches */
    for (let i = 0; i < inLen; i++) {
      /* Get the current array entry */
      let curEntry = inArray[i];
      /* Check if the array entry is at the correct level */
      if (level != curEntry.info.nodePath.length)
        continue;
      let entryNodeArray = curEntry.info.nodePath;
      /* Make sure that the node arrays match */
      let nodeMismatch = false;
      for (let j = 0; j < nodesLen; j++) {
        if (nodes[j] != entryNodeArray[j]) {
          nodeMismatch = true;
          break;
        }
      }
      /* Check if we found a node array mismatch */
      if (nodeMismatch)
        continue;
      /* At this point, we have an array entry that
         passed all of the tests */
      outArray.push(curEntry);
    }
    return outArray;
  }
  /* Get a modification name (rule name) from a DOM element. This 
     is only possible if at least one rule fired for the current 
     DOM element. Of course, several rules might fire for one DOM
     element. Only the first will be used. If the modification name
     can not be obtained, a null value will be returned. */ 
  static getModificationName(currentElement) {
    /* The initial value of the modification name (note the singular) is always
       null. We may be able to get a modification name from a full rule name if
       at least one rule fired for the current DOM element. */
    let modNameStr = null;
    /* Try to get the modification name of the first rule (if any)  
       that fired for the current DOM node */
    let recursionWantedFalse = false;
    let domNodeObject = HDLmHtml.buildObjectFromNode(currentElement, recursionWantedFalse);
    /* console.log(domNodeObject); */
    /* Get the rule names from the real or simulated DOM node
       object */
    let fullRuleNames = HDLmTree.getFullRuleNames(domNodeObject);
    if (fullRuleNames.length > 0) {
      let fullRuleName = fullRuleNames[0];
      /* console.log(fullRuleName); */
      modNameStr = HDLmTree.getModificationNameFromFull(fullRuleName);
    }
    return modNameStr;
  }
  /* Get a modification name (rule name) from a full rule 
     name */
  static getModificationNameFromFull(fullRuleName) {
    /* Split the full rule name and get all of the parts */
    let fullRuleNameSplit = HDLmTree.splitFullRuleName(fullRuleName);
    let splitLength = fullRuleNameSplit.length;
    /* Make sure the full rule name really had four parts */
    if (splitLength != 4) {
      let errorText = `Size of the full rule name split array (${splitLength}) is not four`;
      HDLmAssert(false, errorText);
    }
    /* Get the last part of the full rule name */
    let ruleName = fullRuleNameSplit[3];
    return ruleName;
  }
  /* Get a parameter number for use by the caller. The parameter
     number is typically used to build a new modification (rule).
     This routine  will return a null value if a new parameter 
     number can not be obtained for some reason. */
  static getParameterNumber(currentTreeNode) {
    let newParameterNumber = null;
    /* Try to locate the parent tree node */
    let currentTreeNodePath = currentTreeNode.nodePath;
    let parentTreeNode = HDLmTree.locateTreeParentNode(currentTreeNodePath);
    /* Report an error if the parent node could not be found */
    if (parentTreeNode == null) {
      let nodeString = currentTreeNodePath.toString();
      console.log('In HDLmTree.getParameterNumber', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* Build a map that shows how many times each parameter number 
       is used */
    let childList = parentTreeNode.children;
    let parmMapObj = HDLmTree.buildParameterMap(childList);
    if (parmMapObj == null)
      return;
    /* Get the lowest parameter number */
    let minParameterNumber = HDLmTree.findLowestParameter(parmMapObj);
    newParameterNumber = minParameterNumber;
    return newParameterNumber;
  }
  /* This routine checks if a tree node has no ID value and
     adds the node (if need be) to the output array. This
     routine calls itself recursively to handle children
     of the current tree node. */
  static getNodesNoIds(treeNoIdArray, treePos) {
    /* console.log('getnodesnoids'); */
    /* console.log(treePos); */
    /* Add an entry to the tree array, if the current tree
       positio does not have an ID value */
    if (treePos.hasOwnProperty('id') == false)
      treeNoIdArray.push(treePos);
    /* Process all of the children of the current node */
    let childrenArray = treePos.children;
    let childrenCount = childrenArray.length;
    for (let i = 0; i < childrenCount; i++) {
      let curNode = childrenArray[i];
      HDLmTree.getNodesNoIds(treeNoIdArray, curNode);
    }
    return;
  }
  /* Get the parts of a full rule name from a full rule 
     name */
  static getPartsfromFull(fullRuleName) {
    /* Split the full rule name and get all of the parts */
    let fullRuleNameSplit = HDLmTree.splitFullRuleName(fullRuleName);
    let splitLength = fullRuleNameSplit.length;
    /* Make sure the full rule name really had four parts */
    if (splitLength != 4) {
      let errorText = `Size of the full rule name split array (${splitLength}) is not four`;
      HDLmAssert(false, errorText);
    }
    /* Get the parts of the full rule name */
    let hostName     = fullRuleNameSplit[0];
    let divisionName = fullRuleNameSplit[1];
    let siteName     = fullRuleNameSplit[2];
    let modName      = fullRuleNameSplit[3];
    return [hostName, divisionName, siteName, modName]; 
  }
  /* Get the site tree (HDLmTree) node for a specific host name. The 
     site node should exist when this routine is caller. Default names
     are used for many levels of the tree, including the division name
     and the site name. */
  static getSiteTreeNode(hostName) {
    /* Check if the host name string value is null */
    if (hostName == null) {
      let errorText = 'Host name value passed to getSiteTreeNode is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the host name string value is a string */
    if (typeof hostName !== 'string') {
      let errorText = 'Host name value passed to getSiteTreeNode is not a string';
      HDLmAssert(false, errorText);
    }
    /* Declare and define the site node */
    let siteNodeTree;
    /* Build the node path for the site node */ 
    let siteNodePath = [];
    siteNodePath.push(HDLmDefines.getString('HDLMTOPNODENAME'));
    siteNodePath.push(HDLmDefines.getString('HDLMCOMPANIESNODENAME'));
    siteNodePath.push(hostName);
    siteNodePath.push(HDLmDefines.getString('HDLMRULESNODENAME'));
    siteNodePath.push(HDLmDefines.getString('HDLMDIVISIONNODENAME'));
    siteNodePath.push(HDLmDefines.getString('HDLMSITENODENAME'));
    /* Try to locate the site node */
    siteNodeTree = HDLmTree.locateTreeNode(siteNodePath);
    /* Report an error if the site tree node could not be found */
    if (siteNodeTree == null) {
      let nodeString = siteNodePath.toString();
      console.log('In HDLmTree.getSiteTreeNode', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return null
    }
    return siteNodeTree;
  } 
  /* Get the Tooltip value for the current node. This code is in a
     separate routine so that it can be invoked from several places. */
  static getTooltip(type) {
    let tooltip;
    /* Get the prefix of the current type */ 
    let firstThreeChars = type.substring(0, 3); 
    /* Get the rest of the current type */ 
    let restOfType = type.substring(3);
    if (firstThreeChars == 'new') 
      tooltip = HDLmModTreeInfo[restOfType].tooltip;
    else {
      /* Build the Tooltip information */
      let typeInfo = HDLmMod.getModificationTypeInfo(type);
      if (typeInfo != null)
        tooltip = typeInfo.longname;
      else
        tooltip = type;
      tooltip = HDLmString.ucFirst(tooltip) + ' ' + 'modification';
    }
    return tooltip;
  }
  /* Get a tree node from a full name or return null if the tree
     node can not be found. A full rule name includes the company
     name, division name, site name, and the actual rule name. */
  static getTreeNode(fullRuleName) {
    /* Split the full rule name and get all of the parts */
    let fullRuleNameSplit = HDLmTree.splitFullRuleName(fullRuleName);
    let splitLength = fullRuleNameSplit.length;
    /* Make sure the full rule name really had four parts */
    if (splitLength != 4) {
      let errorText = `Size of the full rule name split array (${splitLength}) is not four`;
      HDLmAssert(false, errorText);
    }
    /* Get the parts of the full rule name */
    let hostName = fullRuleNameSplit[0];
    let division = fullRuleNameSplit[1];
    let siteName = fullRuleNameSplit[2];
    let ruleName = fullRuleNameSplit[3];
    /* Build the node path for getting the node */
    let nodePath = [];
    let topNodeName = HDLmDefines.getString('HDLMTOPNODENAME');
    nodePath.push(topNodeName);
    let companiesNodeName = HDLmDefines.getString('HDLMCOMPANIESNODENAME');
    nodePath.push(companiesNodeName);
    nodePath.push(hostName);
    let rulesNodeName = HDLmDefines.getString('HDLMRULESNODENAME');
    nodePath.push(rulesNodeName);
    nodePath.push(division);
    nodePath.push(siteName);
    nodePath.push(ruleName);
    /* console.log(nodePath); */
    /* Using the node path, try to locate the actual node in
       the main rule tree (not the Fancytree) */
    let currentTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the node could not be found */
    if (currentTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.getTreeNode', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return null;
    }
    return currentTreeNode;
  }
  /* This routine returns the rule tree top (if any) to caller */
  static getTreeTop() {
    return HDLmTree.top;
  }
  /* Check if an array of nodes (possibly an empty array) has
     a node with the name passed by the caller. If a node with
     the same name is found, the node is returned to the caller.
     Othewise, a null value is returned to the caller. */
  static hasNode(nodeArray, name) {
    let node = nodeArray.find(nodeEntry => nodeEntry.nodePath[nodeEntry.nodePath.length - 1] == name);
    if (node == undefined)
      node = null;
    return node;
  }
  /* Get the child nodes of the node passed by the caller.
     This routine just returns the node information from
     an internal source. AJAX is not used. */
  static lazyLoad(event, data) {
    /* console.log('In lazyload', event, data); */
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let nodePath = data.node.data[fieldName];
    let targetTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the node could not be found */
    if (targetTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.lazyLoad', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* In most cases, we just want to find the children of the
       current node. However, in several cases that is definitely
       not true. */
    let jsonStr;
    /* This is the code that will get executed in most cases. 
       We just get the children of the target node and convert
       them to JSON. */
    if (HDLmGlobals.checkForInlineEditor() == false) {
      jsonStr = HDLmTree.buildJsonChildren(targetTreeNode);
      /* console.log('In HDLmTree.lazyload s1', jsonStr); */
      return JSON.parse(jsonStr);
    }
    /* Check for the Popup editor. Special case code is needed for
       the Popup editor. */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
      /* console.log('In HDLmTree.lazyload s2', window.location); */
      /* console.log(window.location); */
      /* console.log(HDLmGlobals.windowInfoObject); */
      let hostName = HDLmGlobals.windowInfoObject.hostname;
      let siteTreeNode = HDLmTree.getSiteTreeNode(hostName);
      /* console.log(targetTreeNode); */
      /* console.log(siteTreeNode); */
      jsonStr = HDLmTree.buildJsonChildren(siteTreeNode);
      /* console.log('lLjS', jsonStr); */
      return JSON.parse(jsonStr);
    }
    /* One of the inline editors is active. We start by getting a set
       of full rule names. Full rule names have a host name, division,
       site, and an actual rule name. */
    if (HDLmGlobals.checkForInlineEditor() == true) {
      /* console.log('In HDLmTree.lazyload s3'); */
      /* At this point we may need to use the dummy DOM node object
         or we may use a real DOM node object obtained from the DOM.
         If we are running in the browser extension window environment,
         then we want to use a real DOM node. Otherwise we use a simuleted
         DOM node. */
      let domNodeObject = HDLmPopup.getDomNodeObject();
      /* Get the rule names from the real or simulated DOM node
         object */
      let fullRuleNames = HDLmTree.getFullRuleNames(domNodeObject);
      let outArray = [];
      /* Handle each of the full rule names */
      for (let i = 0; i < fullRuleNames.length; i++) {
        let fullRuleName = fullRuleNames[i];
        let currentTreeNode = HDLmTree.getTreeNode(fullRuleName);
        let nodePathName = HDLmDefines.getString('HDLMNODEPATH');
        /* Build an object with the information obtained above */
        let outObj = {};
        outObj.title = currentTreeNode.nodePath[currentTreeNode.nodePath.length - 1];
        outObj.lazy = false;
        outObj.folder = false;
        outObj.tooltip = currentTreeNode.tooltip;
        outObj[nodePathName] = currentTreeNode.nodePath.slice(0);
        outArray.push(outObj);
      }
      /* console.log('In HDLmTree.lazyload s4', outArray); */
      return outArray;
    }
  }
  /* Locate (find) a Fancytree node using a node path. A node path is
     all of the names that lead a node. The first entry in the Fancytree
     node path is for the Top (top) Fancytree node (if one exists). This
     is required so that this function can find the (Top) top tree node.
     This routine will return the target Fancytree node if it is found.
     If the target Fancytree node can not be found, this routine will
     return a null value.

     This routine actually supports three different Fancytree node structures.
     The first structure is only used by the Popup editor. This structure only
     has a Top (top) node and zero or more Modification nodes. The Modification
     nodes are direct subnodes of the Top (top) node. The Top (top) node is a
     direct subnode of the invisible Fancytree root node.

     The second structure is only used by the Simple editor. This structure does
     not have a Top (top) node. The Modification nodes are direct subnodes of the
     Fancytree root node. The Fancytree root node is invisible in this and all
     other cases.

     The third structure is used by all of the other editors. This structure will
     have a complete hirearchy of Fancytree nodes starting with the Top (top) node. */
  static locateFancyNode(nodePath) {
    let nodePathLength = nodePath.length;
    let treeIdValue = HDLmDefines.getString('HDLMFANCYTREE');
    let fancyTree = $(treeIdValue).fancytree('getTree');
    /* Check if the Popup editor is active. The Popup editor only
       has the Top (top) Fancytree node and Fancytree nodes for
       each of the modifications (zero or more). */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
      if (nodePathLength != 1 &&
          nodePathLength != 7) {
        let nodePathString = nodePath.toString();
        let errorText = `Fancytree node path (${nodePathString}) node path length (${nodePathLength}) is not valid`;
        HDLmAssert(false, errorText);
      }
      /* Declare and define a variable for use below */
      let topNode;
      /* Check if we are trying to locate the Top (top) Fancytree node */
      if (nodePathLength == 1) {
        topNode = fancyTree.getFirstChild();
        return topNode;
      }
      /* We must be trying to locate a Fancytree node for a Modification
         node */
      topNode = fancyTree.getFirstChild();
      let nodePathName = HDLmDefines.getString('HDLMNODEPATH');
      let currentName = nodePath[6];
      let currentNode = topNode.children.find(nodeEntry => nodeEntry.data[nodePathName][6] == currentName);
      if (currentNode == undefined)
        currentNode = null;
      return currentNode
    }
    /* Check if the Simple editor is active. The Simple editor only
       has Fancytree nodes for each of the Modifications. The Simple
       editor does not have a Fancytree node for the Top (top) node
       because the Simple editor does not use the Top (top) node. */
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
      if (nodePathLength != 7) {
        let nodePathString = nodePath.toString();
        let errorText = `Fancytree node path (${nodePathString}) node path length (${nodePathLength}) is not valid`;
        HDLmAssert(false, errorText);
      }
      /* We must be trying to locate a Fancytree node for a modification
         node */
      let rootNode = HDLmTree.locateFancyRootNode();
      let nodePathName = HDLmDefines.getString('HDLMNODEPATH');
      let currentName = nodePath[6];
      let currentNode = rootNode.children.find(nodeEntry => nodeEntry.data[nodePathName][6] == currentName);
      if (currentNode == undefined)
        currentNode = null;
      return currentNode
    }
    /* It appears that we are not running one of the inline editors.
       We can just use a standard Fancytree node search in these
       cases. */
    else {
      if (nodePathLength < 1 ||
          nodePathLength > 7) {
        let nodePathString = nodePath.toString();
        let errorText = `Fancytree node path (${nodePathString}) node path length (${nodePathLength}) is not valid`;
        HDLmAssert(false, errorText);
      }
      /* Declare and define a variable for use below */
      let currentNode;
      /* Search the Fancytree node tree for the node we are looking for.
         Start with the top of the tree. */
      let topNode = fancyTree.getFirstChild();
      /* console.log('locateFancyTree'); */
      /* console.log(nodePath); */
      for (let i = 0; i < nodePathLength; i++) {
		    /* console.log(i); */
        let currentName = nodePath[i];
        /* Check if we are handling level 1. Level 1 is always the
           top-level node and does not have to be found in the same
           way. */
        if (i == 0) {
          currentNode = topNode;
          continue;
        }
        /* console.log(currentNode); */
        /* console.log(currentName); */
        /* We are not handling level 1. Use the current node to get
           the array of child nodes. Search the array of child nodes. */
        let currentNodeChildren = currentNode.children;
        /* Check if we actually have any children. If we don't have any
           children, then we can not continue checking. */
        if (currentNodeChildren == null)
          return null;
        /* Search the children array looking for a match */
        let nodePathName = HDLmDefines.getString('HDLMNODEPATH');
        currentNode = currentNodeChildren.find(nodeEntry => nodeEntry.data[nodePathName][i] == currentName);
        if (currentNode == undefined)
          return null;
      }
      return currentNode;
    }
  }
  /* Locate (find) the parent of a Fancytree node using a node path. A node
     path is all of the names that lead to a node. The first entry in the node
     path is for the top node. This is required so that this function can find
     the top Fancytree node. This routine will return the parent Fancytree node
     if it is found. If the parent Fancytree node can not be found, this routine
     will return a null value.

     This routine actually supports three different Fancytree node structures.
     The Fancytree node structures are described in detail elsewhere. */
  static locateFancyParentNode(nodePath, reportFancyLocateErrors) {
    let parentFancyNode = null;
    let nodePathLength = nodePath.length;
    /* Check if the Popup editor is active. The Popup editor only
       has the Top (top) Fancytree node and Fancytree nodes for
       each of the modifications (zero or more). */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
      /* Report an error if the node path is not long enough */
      if (nodePathLength < 2) {
        let nodePathString = nodePath.toString();
        HDLmError.buildError('Error', 'Invalid', 21, nodePathString);
        return parentFancyNode;
      }
      /* Make a copy of the node path and just use the first element.
         The first node (element) will be used to locate the parent
         node of the current node. */
      let parentPath = nodePath.slice(0, 1);
      /* Search for the parent Fancytree node in the node tree */
      parentFancyNode = HDLmTree.locateFancyNode(parentPath);
      /* Report an error if the node could not be found */
      if (parentFancyNode == null &&
          reportFancyLocateErrors) {
        let parentFancyNodeString = parentPath.toString();
        console.log('In HDLmTree.locateFancyParentNode', parentFancyNodeString);
        HDLmError.buildError('Error', 'Locate', 9, parentFancyNodeString);
        return parentFancyNode;
      }
      return parentFancyNode;
    }
    /* Check if the Simple editor is active. The Simple editor only
       has Fancytree nodes for each of the modifications. The Simple
       editor does not have a Fancytree node for the Top (top) node
       because the Simple editor does not use the Top (top) node. */
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
      if (nodePathLength != 7) {
        let nodePathString = nodePath.toString();
        let errorText = `Fancytree node path (${nodePathString}) node path length (${nodePathLength}) is not valid`;
        HDLmAssert(false, errorText);
      }
      /* We must be trying to locate the Fancytree parent of a Modification
         node */
      let rootNode = HDLmTree.locateFancyRootNode();
      return rootNode;
    }
    /* It appears that we are not running one of the inline editors.
       We can just use a standard Fancytree node search in these
       cases. */
    else {
      if (nodePathLength < 1 ||
          nodePathLength > 7) {
        let nodePathString = nodePath.toString();
        let errorText = `Fancytree node path (${nodePathString}) node path length (${nodePathLength}) is not valid`;
        HDLmAssert(false, errorText);
      }
      /* Make a copy of the node path and remove the last element.
         The remaining node path can be used to locate the parent
         node of the current node. */
      let parentPath = nodePath.slice(0, nodePathLength - 1);
      /* Search for the parent Fancytree node in the node tree */
      parentFancyNode = HDLmTree.locateFancyNode(parentPath);
      /* Report an error if the node could not be found */
      if (parentFancyNode == null &&
          reportFancyLocateErrors) {
        let parentFancyNodeString = parentPath.toString();
        console.log('In HDLmTree.locateFancyParentNode', parentFancyNodeString);
        HDLmError.buildError('Error', 'Locate', 9, parentFancyNodeString);
        return parentFancyNode;
      }
      return parentFancyNode;
    }
  }
  /* This routine returns the root of the Fancytree. This is not the
     Top (top) node. This is the actual root. */
  static locateFancyRootNode() {
    let treeIdValue = HDLmDefines.getString('HDLMFANCYTREE');
    let fancyTree = $(treeIdValue).fancytree("getTree");
    return fancyTree.rootNode;
  }
  /* Locate (find) a tree node using a node path. A node path is all of the
     names that lead a node. The first entry in the tree node path is for
     the top tree node. This is required so that this function can find
     the top tree node. This routine will return the target node if it is
     found. If the target node can not be found, this routine will return
     a null value. */
  static locateTreeNode(nodePath) {
    let nodePathLength = nodePath.length;
    let currentNode;
    for (let i = 0; i < nodePathLength; i++) {
      let currentName = nodePath[i];
      /* Check if we are handling level 1. Level 1 is always the
         top-level node and does not have to be found in the same
         way. */
      if (i == 0) {
        currentNode = HDLmTree.getTreeTop();
        continue;
      }
      /* console.log(currentName); */
      /* console.log(i); */
      /* console.log(currentNode); */
      /* console.log(currentNode.children); */
      /* We are not handling level 1. Use the current node to get
         the array of child nodes. Search the array of child nodes. */
      currentNode = currentNode.children.find(nodeEntry => nodeEntry.nodePath[nodeEntry.nodePath.length - 1] == currentName);
      if (currentNode == undefined) {
        return null;
      }
    }
    return currentNode;
  }
  /* Locate (find) the parent of a node using a node path. A node path
     is all of the names that lead a node. The first entry in the node path
     is for the top node. This is required so that this function can find
     the top node. This routine will return the parent node if it is found
     If the parent node can not be found, this routine will return a null
     value. */
  static locateTreeParentNode(nodePath) {
    let parentNode = null;
    let nodePathLength = nodePath.length;
    /* Report an error if the node path is not long enough */
    if (nodePathLength < 2) {
      let nodePathString = nodePath.toString();
      HDLmError.buildError('Error', 'Invalid', 21, nodePathString);
      return parentNode;
    }
    /* Make a copy of the node path and remove the last element.
       The remaining node path can be used to locate the parent
       node of the current node. */
    let parentPath = nodePath.slice(0, nodePathLength - 1);
    /* Search for the parent node in the node tree */
    parentNode = HDLmTree.locateTreeNode(parentPath);
    /* Report an error if the node could not be found */
    if (parentNode == null) {
      let parentNodeString = parentPath.toString();
      console.log('In HDLmTree.locateTreeParentNode', parentNodeString);
      HDLmError.buildError('Error', 'Locate', 9, parentNodeString);
      return parentNode;
    }
    return parentNode;
  }
  /* This routine checks the node path in the current Fancytree node
     and fixes the node path as need be. The same check and fixes are
     done on all of the children of the current Fancytree node (including
     recursively). This step is required for moving nodes from one part
     of the Fancytree node tree to another. */
  static modifyFancyNodePath(nodePath, currentFancyNode) {
    /* Modify the node path in the current Fancytree node */
    let fieldName = HDLmDefines.getString('HDLMNODEPATH');
    let nodePathLength = nodePath.length;
    currentFancyNode.data[fieldName].splice(0, nodePathLength, ...nodePath);
    /* Call this routine recursively to perform the same operation on
       all of the children of the current Fancytree node */
    let childrenArray = currentFancyNode.getChildren();
    if (childrenArray != null) {
      let childrenLength = childrenArray.length;
      for (let i = 0; i < childrenLength; i++)
        HDLmTree.modifyFancyNodePath(nodePath, childrenArray[i])
    }
  }
  /* This routine is invoked before the inline editor is closed.
     This routine checks the new node title and does all of the work
     needed to validate and use the new node title (if it is valid). */
  static modifyNodeName(newName, oldFancyNode, targetTreeNode, removeOldFancy) {
    /* Check if the old (current) Fancytree node is active and
       expanded. These values are used later to set the final
       status of the new Fancytree node. */
    let oldFancyNodeActive = oldFancyNode.isActive();
    let oldFancyNodeExpanded = oldFancyNode.isExpanded();
    /* At this point we have a valid new name for a node. We need to
       store this value is several places. We start by updating the
       current tree node. */
    let nodePath = targetTreeNode.nodePath;
    let nodePathLength = nodePath.length;
    if (nodePathLength > 0)
      nodePath[nodePathLength - 1] = newName;
    if (targetTreeNode.hasOwnProperty('details')) {
      targetTreeNode.details.name = newName;
      HDLmMod.resetLastModified(targetTreeNode.details);
    }
    /* At this point we need to update the node path in all of the
       children (including recursively) of the current tree node.
       Note that the call below may or may not result in many
       pending updates. If will always result in at least one
       pending update. The pending updates are sent to the server
       later. */
    HDLmTree.modifyTreeNodePath(nodePath, targetTreeNode);
    /* At this point each modified node must be updated in the
       database server */
    let processSubNodes = true;
    HDLmTree.addPendingUpdates(targetTreeNode, processSubNodes);
    /* At this point we can send all of the pending updates to the
       database server */
    HDLmTree.processPendingUpdates();
    /* As a first step we need to remove the current tree node from the children
       array of the parent of the current tree node. */
    let removeBool = HDLmTree.removeFromParentTree(targetTreeNode);
    if (removeBool == false) {
      let nodePathString = nodePath.toString();
      let errorText = `Child node (${nodePathString}) not removed from parent node`;
      HDLmAssert(false, errorText);
    }
    /* The next step is to add the current tree node to the children
       array of the parent of the current tree node. */
    let addBool = HDLmTree.addToParentTree(targetTreeNode);
    if (addBool == false) {
      let nodePathString = nodePath.toString();
      let errorText = `Child node (${nodePathString}) not added to parent node`;
      HDLmAssert(false, errorText);
    }
    /* At this point we need to update the node path in all of the
       children (including recursively) of the current Fancytree node */
    HDLmTree.modifyFancyNodePath(nodePath, oldFancyNode);
    let parentFancyNode = oldFancyNode.getParent();
    /* At this point we can build the new Fancytree node that may need to
       be added to the Fancytree tree */
    let newLazy = true;
    let newNodeFolder = true;
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config) {
      newLazy = false;
      newNodeFolder = false;
    }
    else if ((HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
              HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) &&
             (targetTreeNode.type == 'line'   ||
              targetTreeNode.type == 'ignore' ||
              targetTreeNode.type == 'mod'    ||
              targetTreeNode.type == 'value')) {
      newLazy = false;
      newNodeFolder = false;
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore &&
             targetTreeNode.type == 'ignore') {
      newLazy = false;
      newNodeFolder = false;
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod &&
             targetTreeNode.type == 'mod') {
      newLazy = false;
      newNodeFolder = false;
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass &&
             (targetTreeNode.type == 'line'   ||
              targetTreeNode.type == 'ignore' ||
              targetTreeNode.type == 'mod'    ||
              targetTreeNode.type == 'value')) {
      newLazy = false;
      newNodeFolder = false;
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup &&
             targetTreeNode.type == 'mod') {
      newLazy = false;
      newNodeFolder = false;
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy) {
      newLazy = false;
      newNodeFolder = false;
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple &&
             targetTreeNode.type == 'mod') {
      newLazy = false;
      newNodeFolder = false;
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store &&
             targetTreeNode.type == 'store') {
      newLazy = false;
      newNodeFolder = false;
    }
    /* Build the new Fancytree node that we need to add to the fancy
       tree. We may need to add this node in one of several places.
       The code below determines where to add the new Fancytree node. */
    let targetTreeNodeName = targetTreeNode.nodePath[targetTreeNode.nodePath.length - 1];
    let newFancyNode = {
      title: targetTreeNodeName,
      tooltip: targetTreeNode.tooltip,
      folder: newNodeFolder,
      lazy: newLazy
    };
    /* We can now add the new Fancytree tree node to the Fancytree */
    let handlingCmdInsertFalse = false;
    let newFancyNodeJustAdded = HDLmTree.addToParentFancy(parentFancyNode, newFancyNode, 
                                                          targetTreeNode, handlingCmdInsertFalse);
    /* The code below should set the focus to the newly created Fancytree
       node. However, it does not appear to do so. Why is not clear at all.
       Actually, it appears that the problem is a confusion of focus and
       active. The code below does not make the newly created Fancytree
       node active. It does give the node focus. */
    if (newFancyNodeJustAdded !== null) {
      newFancyNodeJustAdded.setFocus();
      /* If the old Fancytree node was active (and it probably was), we need
         to make the new Fancytree node active as well. This is done using a
         Fancytree method call. Of course, we don't want this activation event
         to be added to the undo / redo array. */
      if (oldFancyNodeActive) {
        HDLmUnRe.noChangeActivate(newFancyNodeJustAdded);
      }
      /* If the old Fancytree node was expanded (and it may or may not have been
         expanded), we need to expand the new Fancytree node as well. This is done
         using a Fancytree method call. Of course, we don't want this expand event
         to be added to the undo / redo array. */
      if (oldFancyNodeExpanded) {
        HDLmUnRe.noChangeExpand(newFancyNodeJustAdded);
      }
    }
    /* Check if a special flag is set showing that we need to remove the old
       Fancytree node. If this flag is set to true, we must remove the old
       Fancytree node. If this flag is set to false, then we must not remove
       the old FancyTree node. Testing has shoun that removing the Fancytree
       node causes dire problems in some cases. */
    if (removeOldFancy) {
      HDLmTree.removeFancyNode(oldFancyNode);
    }
    /* Return the newly created Fancytree node to the caller */
    return newFancyNodeJustAdded;
  }
  /* This routine checks the node path in the current node and fixes the
     node path as need be. The same check and fixes are done on all of the
     children of the current node (including recursively). This step is required
     for moving nodes from one part of the node tree to another. */
  static modifyTreeNodePath(nodePath, currentTreeNode) {
    let nodePathLength = nodePath.length;
    currentTreeNode.nodePath.splice(0, nodePathLength, ...nodePath);
    for (let i = 0; i < currentTreeNode.children.length; i++)
      HDLmTree.modifyTreeNodePath(nodePath, currentTreeNode.children[i]);
  }
  /* This routine deletes a set of rows specified by the caller.
     The caller passes an array with a set of ID values in it.
     All of the rows with the specified ID values are deleted
     by this code. This code returns a Promise to the caller.
     The row deletion is finished when the Promise is resolved. */
  static passDeleteRowsFromDatabase(idArray, infoArray) {
    /* Declare and define a few variables */
    let ajaxPromise;
    let idLen = idArray.length;
    let newStr = '';
    for (let i = 0; i < idLen; i++) {
      let rowId = idArray[i];
      let rowInfo = infoArray[i];
      if (newStr != '')
        newStr += ', ';
      newStr += '{ "id": "' + rowId + '",' + ' "info": ' + rowInfo + '}'
    }
    /* console.log(newStr); */
    /* Build the final deletion string */
    let inStr = '{ "data": [ ' + newStr + ' ] }';
    let baseUrl = HDLmConfigInfo.getentriesBridgeInternetMethodSsl() + "://" +
                    HDLmConfigInfo.getEntriesBridgeDeleteUrl();
    /* The call below returns a Promise. The Promise is used to wait
       for the row deletion to complete. */
    let userid = HDLmConfigInfo.getEntriesBridgeUserid();
    let password = HDLmConfigInfo.getEntriesBridgePassword();
    let requestAJAXAsyncTrue = true;
    ajaxPromise = HDLmAJAX.runAJAX('URL', requestAJAXAsyncTrue, baseUrl, userid, password, 'post', inStr);
    return ajaxPromise;
  }
  /* This routine deletes a set of rows specified by the caller.
     The rows are the nodes of a tree. The caller passes the top
     node of the tree. The row deletion is finished when the
     Promise is resolved. */
  static passDeleteTreeFromDatabase(treePos) {
    /* console.log('In HDLmTree.passDeleteTreeFromDatabase'); */
    /* Declare and define a few variables */
    let ajaxPromise;
    /* Get the ID values from a tree of nodes */
    let treeIdArray = [];
    let treeInfoArray = [];
    HDLmTree.getIdValuesAndInfoFromNodeTree(treeIdArray, treeInfoArray, treePos);
    /* console.log(treeIdArray); */
    /* Delete all of the rows that were part of the node tree */
    ajaxPromise = HDLmTree.passDeleteRowsFromDatabase(treeIdArray, treeInfoArray);
    return ajaxPromise;
  }
  /* This code converts one node of the node tree (not the Fancytree)
     to a string and sends it to the server. This has the effect of inserting
     one node as one row. The node can be a company node, a division node,
     a site node, or a rule node. The node could also be some other type
     of node. For example, it could be a report node. Note that any of the
     values may be a null value. A null value for any value, will result
     in a null value being stored in the database. This routine does not
     appear to be in use. */
  static passInsertRowNotUsed(content, info) {
    /* Declare and define one or more variables */
    let newStr = '';
    /* Send the current content string and the current information
       to the console log. This is done so that these values can be
       copied and saved later. */
    /* Check the content string */
    if (content !== null &&
        content != '') {
      if (newStr != '')
          newStr += ', ';
      newStr += '"content": ' + '"' + content + '"';
    }
    /* Check the information JSON string. A string is passed
       in this case. The conversion to JSON is done by the
       server. */
    if (info !== null &&
        info != '') {
      if (newStr != '')
          newStr += ', ';
      newStr += '"info": ' + info;
    }
    /* Check the information name string. A string is passed
       in this case. */
    if (1 == 1) {
      if (info !== null) {
        let infoName = info.nodePath[info.nodePath.length - 1];
        if (infoName != null &&
            infoName != undefined &&
            infoName != '') {
          if (newStr != '')
            newStr += ', ';
          newStr += '"name": ' + '"' + infoName + '"';
        }
      }
    }
    /* We can now try to insert the new node */
    let API = HDLmConfigInfo.getEntriesBridgeApi();
    let URL = HDLmConfigInfo.getentriesBridgeInternetMethodSsl() + "://" +
                HDLmConfigInfo.getEntriesBridgeInsertUrl(); 
    if (API === "bucket")
      URL += "";
    let userid = HDLmConfigInfo.getEntriesBridgeUserid();
    let password = HDLmConfigInfo.getEntriesBridgePassword();
    let ajaxPromise;
    /* console.log(newStr); */
    /* Build the final insertion string */
    let inStr = '{ "data": [ { ' + newStr + ' } ] }';
    /* The call below returns a Promise. The Promise is not used at
       this time. The data must be URI encoded before it is sent.
       This step is required to preserve characters such as the
       plus sign. Note that this code has been changed. The URI
       encoding is now done by the call below in some cases. */
    let requestAJAXAsyncTrue = true;
    ajaxPromise = HDLmAJAX.runAJAX('URL', requestAJAXAsyncTrue, URL, userid, password, 'post', inStr);
    return ajaxPromise;
  }
  /* This code inserts zero or more rows into the database. The caller
     passes an array with zero or more entries. A Promise is returned
     to the caller. When the Promise resolves, the insert operation is
     complete. */
  static passInsertRows(content, infoArray) {
    /* Declare and define one or more variables */
    let infoLen = infoArray.length;
    let newStr = '';
    /* Process each entry in the data array */
    for (let i = 0; i < infoLen; i++) {
      let kvAdded = false;
      /* Separate each of the objects, if need be */
      if (newStr != '')
        newStr += ', ';
      /* Start the current object */
      newStr += '{ ';
      /* Check and add the content string */
      if (content !== null &&
          content != '') {
        if (kvAdded)
          newStr += ', ';
        newStr += '"content": ' + '"' + content + '"';
        kvAdded = true;
      }
      /* Check the information JSON string. A string is passed
         in this case. The conversion to JSON is done by the
         server. */
      let infoEntry = infoArray[i];
      if (infoEntry !== null &&
          infoEntry != '') {
        if (kvAdded)
          newStr += ', ';
        newStr += '"info": ' + infoEntry;
        kvAdded = true;
      }
      /* Check the information name string. A string is passed
         in this case. */
      if (1 == 1) {
        let infoEntryObj = JSON.parse(infoEntry);
        if (infoEntryObj !== null) {
          let infoEntryObjName = infoEntryObj.nodePath[infoEntryObj.nodePath.length - 1];
          if (infoEntryObjName !== null &&
              infoEntryObjName !== undefined &&
              infoEntryObjName != '') {
            if (kvAdded)
              newStr += ', ';
            newStr += '"name": ' + '"' + infoEntryObjName + '"';
            kvAdded = true;
          }
        }
      }
      /* Finish the current object */
      newStr += ' }';
    }
    /* We can now try to insert the new nodes */
    let URL = HDLmConfigInfo.getentriesBridgeInternetMethodSsl() + "://" +
                HDLmConfigInfo.getEntriesBridgeInsertUrl(); 
    let userid = HDLmConfigInfo.getEntriesBridgeUserid();
    let password = HDLmConfigInfo.getEntriesBridgePassword();
    let ajaxPromise;
    /* console.log(newStr); */
    /* Build the final insertion string */
    let inStr = '{ "data": [ ' + newStr + ' ] }';
    /* The call below returns a Promise. The Promise is not used at
       this time. The data must be URI encoded before it is sent.
       This step is required to preserve characters such as the
       plus sign. Note that this code has been changed. The URI
       encoding is now done by the call below in some cases. */
    let requestAJAXAsyncTrue = true;
    ajaxPromise = HDLmAJAX.runAJAX('URL', requestAJAXAsyncTrue, URL, userid, password, 'post', inStr);
    return ajaxPromise;
  }
  /* This code inserts one or more rows into the database. One row
     is created for each node of the tree. The caller passes the top
     node of the tree. Note that this may not be the overall top node
     of the tree. */
  static passInsertOneTreePos(treePos) {
    /* Declare and define a few variables */
    let ajaxPromise;
    /* Build the content string for use below. */
    let content = HDLmUtility.getContentString();
    /* Get the data values from a tree of nodes */
    let treeDataArray = [];
    HDLmTree.buildInfoArray(treeDataArray, treePos);
    /* Insert all of the rows associated with the tree */
    ajaxPromise = HDLmTree.passInsertRows(content, treeDataArray);
    /* We can now wait from the Promise to complete */
    ajaxPromise.then(function (responseText) {
      let responseJson = JSON.parse(responseText);
      let treeIdArray = [];
      HDLmTree.getIdValuesFromResponseJson(responseJson, treeIdArray, treePos);
      /* The ID values returned by the insert must be stored in each
         node in the node tree */
      HDLmTree.resetIdValues(treeIdArray, treeDataArray);
    }, function (errorText) {
      /* console.log(errorText); */
      HDLmError.buildError('Error', 'Insert(s) failure', 14, errorText);
    });
    return ajaxPromise;
  }
  /* This code reads all of the rows from the database and returns
     a Promise to the caller. When the Promise resolves all of the
     rows will be in the response text. The set of rows depends on
     the current content type. The current content type depends on
     the current editor type. */
  static passReadAllRows() {
    /* We can now try to get the modifications or proxy definitions
       or anything else */
    let URL = HDLmConfigInfo.getentriesBridgeInternetMethodSsl() + "://" +
                HDLmConfigInfo.getEntriesBridgeReadUrl(); 
    /* The content type shows if we are handling modifications,
       proxy definitions, or configurations. The value returned
       below is a string, not a numeric value (such as enums
       typically are). */
    let queryStr = '';
    queryStr += '?';
    queryStr += HDLmUtility.buildBridgeRestQuery('content');
    URL += queryStr;
    /* console.log(queryStr); */
    /* Get the userid and password from the configuration information */
    let userid = HDLmConfigInfo.getEntriesBridgeUserid();
    let password = HDLmConfigInfo.getEntriesBridgePassword();
    /* Get the userid and password from the security information */
    userid = HDLmSecurity.getUserName();
    password = HDLmSecurity.getPassword();
    /* Get the Promise used to load the modifications */
    let requestAJAXAsyncTrue = true;
    return HDLmAJAX.runAJAX('URL', requestAJAXAsyncTrue, URL, userid, password);
  }
  /* This code reads some of the rows from the database and returns
     a Promise to the caller. When the Promise resolves all of the
     rows will be in the response text. */
  static passReadSomeRows(userid, password) {
    /* We can now try to get the modifications or proxy definitions
       or anything else */
    let URL = HDLmConfigInfo.getentriesBridgeInternetMethodSsl() + "://" +
                HDLmConfigInfo.getEntriesBridgeReadUrl(); 
    /* The content type shows if we are handling modifications,
       proxy definitions, or configurations. The value returned
       below is a string, not a numeric value (such as enums
       typically are). */
    let queryStr = '';
    queryStr += '?';
    queryStr += HDLmUtility.buildBridgeRestQuery('content');
    URL += queryStr;
    /* Get the Promise used to load the modifications */
    let requestAJAXAsyncTrue = true;
    return HDLmAJAX.runAJAX('URL', requestAJAXAsyncTrue, URL, userid, password);
  }
  /* This code updates all of the rows in a bucket that match
     the content string passed by the caller. The first step is
     to get all of the ID values for all of the rows in the bucket,
     that match the content string passed by the caller. The
     second step (if need be) is to delete all of those rows.
     The third step is to insert all of the new rows. */
  static passUpdateAllRows(content, treeTop, force) {
    /* console.log('passUpdateAllRows starting - count ' + HDLmGlobals.updateCounter); */
    /* Declare and define a few variables */
    let ajaxPromise;
    let idArray = [];
    let infoArray = []
    let rowCount;
    /* Increment the update counter. If the new update counter is
       greater than one, just return to the caller. Note that the
       force parameter can be set to true. If this is correct, then
       the code below really will be executed. The true value is used
       to force the execution of this code when this code is invoked
       by a then routine. */
    HDLmGlobals.updateCounter += 1;
    if (HDLmGlobals.updateCounter > 1 && force == false)
      return;
    /* The information array can be built from the node tree */
    HDLmTree.buildInfoArray(infoArray, treeTop);
    /* We can now try to get all of the rows with a matching
       content type value */
    ajaxPromise = HDLmTree.passReadAllRows();
    /* We can now wait from the Promise to complete */
    ajaxPromise.then(function (responseText) {
      let infoArrayAlternate = [];
      infoArrayAlternate = HDLmTree.getInfoArray(responseText);
      /* console.log(responseText); */
      /* Extract all of the ID values from the response text */
      idArray = HDLmTree.getIdArray(responseText);
      rowCount = idArray.length;
      /* console.log('passUpdateAllRows row count ' + rowCount + ' count ' + HDLmGlobals.updateCounter); */
      /* We can now delete all of the matching rows from the
         bucket. The number of rows might be zero or it might
         be greater than zero. */
      /* console.log('passUpdateAllRows - about to delete - count ' + HDLmGlobals.updateCounter); */
      ajaxPromise = HDLmTree.passDeleteRowsFromDatabase(idArray, infoArray);
      /* We can now wait from the Promise to complete */
      ajaxPromise.then(function (responseText) {
        /* Now that all of the old rows have been deleted, we can
           insert all of the new rows */
        /* console.log('passUpdateAllRows about to insert - after delete - count ' + HDLmGlobals.updateCounter); */
        ajaxPromise = HDLmTree.passInsertRows(content, infoArray);
        /* We can now wait from the Promise to complete */
        ajaxPromise.then(function (responseText) {
          /* console.log('passUpdateAllRows after delete/insert - count ' + HDLmGlobals.updateCounter); */
          let responseJson = JSON.parse(responseText);
          let treeIdArray = [];
          HDLmTree.getIdValuesFromResponseJson(responseJson, treeIdArray, treeTop);
          /* The ID values returned by the insert must be stored in each
             node in the node tree */
          HDLmTree.resetIdValues(treeIdArray, infoArray);
          /* The update operation is now complete. The update counter
             must be decremented by one. If the update counter is still
             greater then zero, then we have pending updates that need
             to be processed. The update counter is again decremented
             by one and the current routine is invoked with a force value
             of true. */
          HDLmGlobals.updateCounter -= 1;
          if (HDLmGlobals.updateCounter >= 1) {
            HDLmGlobals.updateCounter -= 1;
            let passUpdateAllRowsForceTrue = true;
            HDLmTree.passUpdateAllRows(content, treeTop, passUpdateAllRowsForceTrue);
          }
        }, function (errorText) {
          HDLmError.buildError('Error', 'Delete/insert failure', 14, errorText);
        });
      }, function (errorText) {
        HDLmError.buildError('Error', 'Delete rows failure', 14, errorText);
      });
    }, function (errorText) {
      HDLmError.buildError('Error', 'Read rows failure', 14, errorText);
    });
    return;
  }
  /* This code updates one row (one node) in the server. The node could
     also be some other type of node. For example, it could be a report
     node. */
  static passUpdateOneTreePos(treePos, newTreeEntryBoolean) {
    /* console.log('In HDLmTree.passUpdateOneTreePos', treePos, newTreeEntryBoolean); */
    /* console.trace(); */
    /* Get the current ID value. This value may or may not be 
       available. If this routine is invoked by one of the 
       inline editor (indirectly), then we won't have an ID
       value at this point. Of course, we can't do an update
       of the database without an ID value. */
    let idValue = null;
    if (treePos.hasOwnProperty('id'))
      idValue = treePos.id
    /* Declare and define one or more variables */
    let ajaxPromise;
    let tempDetails = {};
    let tempPos = {};
    /* Create a temporary copy of the current tree node. This is
       done so that we can make changes to the temporary copy that
       will not affect the original tree node. */
    tempPos = Object.assign(tempPos, treePos);
    if (tempPos.hasOwnProperty('children'))
      delete tempPos.children;
    if (tempPos.hasOwnProperty('containerWidget'))
      delete tempPos.containerWidget;
    if (tempPos.hasOwnProperty('id'))
      delete tempPos.id;
    /* Remove the saved details from the current node, if need be */
    if (tempPos.hasOwnProperty('savedDetails'))
      delete tempPos.savedDetails;
    /* Fix the details (an HDLmMod) so that the stringify will work */
    if (tempPos.hasOwnProperty('details')) {
      tempDetails = Object.assign(tempDetails, tempPos.details);
      /* If the current set of details are going to be sent to a server
         using web sockets, then we really don't want to change the name
         of the path field */
      if (tempDetails.hasOwnProperty('pathvalue') &&
          HDLmGlobals.checkForInlineEditorOrGems() == false) {
        tempDetails.path = tempDetails.pathvalue;
        delete tempDetails.pathvalue;
        /* console.log(tempDetails); */
      }
      tempPos.details = tempDetails;
    }
    let data = JSON.stringify(tempPos);
    /* Check if we are actually using one of the inline editors or if
       we are in the GEM environment or the GXE environment. If this 
       is true, then we really don't want to update the database at 
       this point. */
    if (HDLmGlobals.checkForInlineEditorOrGems() == false) {
      /* console.log('passUpdateOneTreePos'); */
      /* Try to actually update the node (row) */
      /* console.log('about to passUpdateRow'); */
      /* Check if we really have an ID value here. We can't
         update the database without a valid ID value. */
      if (idValue != null)
        ajaxPromise = HDLmTree.passUpdateRow(idValue, data);
      else
        ajaxPromise = Promise.resolve('This is a dummy promise');
    }
    /* Since we are using one of the inline editors or we are running 
       in the GEM environmentor or the GXE environment, we don't really
       want to try to update the database here. We do want to send 
       the update to the server for processing. */
    else {
      /* console.log('newTreeEntryBoolean'); */
      /* console.log(newTreeEntryBoolean); */
      if (HDLmGlobals.activeNodeType == null ||
          HDLmGlobals.activeNodeType.startsWith('new') == false) { 
        /* console.log('passUpdateOneTreePos'); */
        /* This code is no longer in use. The divs are deleted when the 
           user presses enter, not when an update is done. The update is
           done as need be. However, the div is deleted when the user, 
           uses the delete or esacpe key or when the mouse is clicked 
           outside of the div. */
        if (false && (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
                      HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)) {
          /* console.log('In passUpdateOneTreePos, about to delete divs'); */
          HDLmMenus.clearPending();
          HDLmGEM.deleteDivs();
        }
        /* console.log('sendUpdateTreeNodeRequest'); */
        HDLmWebSockets.sendUpdateTreeNodeRequest(tempPos)
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
            HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
          /* The next statement forces the current window to reload.
             This is needed so that the latest (possibly changed)
             modifications will be used. This code is no longer in
             use. The window is reloaded by other code, elsewhere. 
             How and where and when the window is reloaded is not
             clear. The above comment is of unknown origin. */
          /* window.location.href = window.location.href; */
          /* let treeTop = HDLmTree.getTreeTop(); */
          /* console.log(treeTop); */
        }
        /* Check for the GUI extended editor */ 
        if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
          /* The next statement forces the current window to reload.
             This is needed so that the latest (possibly changed)
             modifications will be used. */
        }
        /* Set a flag (but only for the GXE editor) showing that 
           at least one rule has been updated */
        HDLmGXE.rulesUpdatedSet();
      }
      ajaxPromise = Promise.resolve('This is a dummy promise');
    }
    return ajaxPromise;
  }
  /* This code updates one row (one node) in the server. The node could
     also be some other type of node. For example, it could be a report
     node. */
  static passUpdateRow(id, data) {
    /* Declare and define one or more variables */
    let newStr = '';
    /* Check the ID string */
    if (id !== null &&
        id != '') {
      if (newStr != '')
        newStr += ', ';
      newStr += '"id": ' + '"' + id + '"';
    }
    /* Check the data JSON string. A string is passed in this case.
       The conversion to JSON is done by the server. */
    if (data !== null &&
        data != '') {
      if (newStr != '')
        newStr += ', ';
      /* We may need to modify the data a bit before we send
         it. Check for this very special case. This change is
         only for script rules. We may need to change percent
         signs into percent signs followed by '25'. This is the
         correct hex code for a percent sign. On the host we 
         are invoking the URL decode function which requires
         the '25' after the percent sign. */
      let tempData = data;
      if (tempData.includes('"scripts"'))
        tempData = tempData.replaceAll('%', '%25');
      newStr += '"info": ' + tempData;
    }
    /* Check the data name string. A string is passed
       in this case. */
    if (1 == 1) {
      if (data !== null) {
        let dataObj = JSON.parse(data);
        let dataObjName = dataObj.nodePath[dataObj.nodePath.length - 1];
        if (dataObjName != null &&
            dataObjName != undefined &&
            dataObjName != '') {
          if (newStr != '')
            newStr += ', ';
          newStr += '"name": ' + '"' + dataObjName + '"';
        }
      }
    }
    /* We can now try to insert the new node */
    let API = HDLmConfigInfo.getEntriesBridgeApi();
    let URL = HDLmConfigInfo.getentriesBridgeInternetMethodSsl() + "://" +
                HDLmConfigInfo.getEntriesBridgeUpdateUrl(); 
    if (API === "bucket")
      URL += "";
    let userid = HDLmConfigInfo.getEntriesBridgeUserid();
    let password = HDLmConfigInfo.getEntriesBridgePassword();
    let ajaxPromise;
    /* Build the final insertion string */
    let inStr = '{ "data": [ { ' + newStr + ' } ] }';
    /* console.log(newStr); */
    /* The call below returns a Promise. The Promise is not used at
       this time. The data must be URI encoded before it is sent.
       This step is required to preserve characters such as the
       plus sign. Note that this code has been changed. The URI
       encoding is now done by the call below in some cases. */
    let requestAJAXAsyncTrue = true;
    ajaxPromise = HDLmAJAX.runAJAX('URL', requestAJAXAsyncTrue, URL, userid, password, 'post', inStr);
    return ajaxPromise;
  }
  /* This code updates zero or more rows (zero or more nodes) in the server.
     The nodes could be any type of node. For example, one of the nodes,
     could be a report node. */
  static passUpdateRows(idArray, dataArray) {
    /* Get the length of each array passed by the caller. The lengths
       must be the same. */
    let idArrayLen = idArray.length;
    let dataArrayLen = dataArray.length;
    if (idArrayLen != dataArrayLen) {
      let errorText = `The ID array length (${idArrayLen}) does not match the data array length (${dataArrayLen})`;
      HDLmAssert(false, errorText);
    }
    /* Declare and define one or more variables */
    let newStr = '';
    for (let i = 0; i < idArrayLen; i++) {
      /* Start to build the current object */
      newStr += '{ ';
      /* Get the current values from each array */
      let idEntry = idArray[i];
      let dataEntry = dataArray[i];
      let newEntryStr = '';
      /* Check the ID entry string */
      if (idEntry !== null &&
          idEntry != '') {
        if (newEntryStr != '')
          newEntryStr += ', ';
        newEntryStr += '"id": ' + '"' + idEntry + '"';
      }
      /* Check the data JSON string. A string is passed in this case.
         The conversion to JSON is done by the server. */
      if (dataEntry !== null &&
          dataEntry != '') {
        if (newEntryStr != '')
          newEntryStr += ', ';
        newEntryStr += '"info": ' + dataEntry;
      }
      /* Check the information name string. A string is passed
         in this case. */
      if (1 == 1) {
        if (dataEntry !== null) {
          let dataEntryObj = JSON.parse(dataEntry);
          let dataEntryObjName = dataEntryObj.nodePath[dataEntryObj.nodePath.length - 1];
          if (dataEntryObjName != null &&
              dataEntryObjName != undefined &&
              dataEntryObjName != '') {
            if (newEntryStr != '')
              newEntryStr += ', ';
            newEntryStr += '"name": ' + '"' + dataEntryObjName + '"';
          }
        }
      }
      /* Finish building the current object */
      newStr += newEntryStr;
      if (i < (idArrayLen - 1))
        newStr += ' }, ';
      else
        newStr += ' }';
    }
    /* We can now try to insert the new node */
    let API = HDLmConfigInfo.getEntriesBridgeApi();
    let URL = HDLmConfigInfo.getentriesBridgeInternetMethodSsl() + "://" +
                HDLmConfigInfo.getEntriesBridgeUpdateUrl(); 
    if (API === "bucket")
      URL += "";
    let userid = HDLmConfigInfo.getEntriesBridgeUserid();
    let password = HDLmConfigInfo.getEntriesBridgePassword();
    let ajaxPromise;
    /* Build the final insertion string */
    let inStr = '{ "data": [ ' + newStr + ' ] }';
    /* console.log(newStr); */
    /* The call below returns a Promise. The Promise is not used at
       this time. The data must be URI encoded before it is sent.
       This step is required to preserve characters such as the
       plus sign. Note that this code has been changed. The URI
       encoding is now done by the call below in some cases. */
    let requestAJAXAsyncTrue = true;
    ajaxPromise = HDLmAJAX.runAJAX('URL', requestAJAXAsyncTrue, URL, userid, password, 'post', inStr);
    return ajaxPromise;
  }
  /* This code inserts zero or more rows into the database. One row
     is created for each pending insert. The caller does not pass
     anything. The array of pending inserts may be empty. This is
     not an error condition. Of course, nothing will be done in
     this case. When the server responds with a set of ID values,
     the ID values are extracted and added to each tree node. */
  static processPendingInserts() {
    /* Declare and define a few variables */
    let ajaxPromise;
    /* Build the content string for use below. */
    let content = HDLmUtility.getContentString();
    /* Get the data values from the pending inserts. Note that
       a shallow copy is made here so that the actual pending
       inserts array can be cleared. */
    let treeDataArray = HDLmTree.pendingInserts.slice();
    HDLmTree.pendingInserts.length = 0;
    if (treeDataArray.length == 0)
      return ajaxPromise;
    /* console.log('processPendingInserts'); */
    /* Insert all of the rows associated with the tree */
    ajaxPromise = HDLmTree.passInsertRows(content, treeDataArray);
    /* We can now wait from the Promise to complete */
    ajaxPromise.then(function (responseText) {
      let treeIdArray = HDLmTree.getIdArray(responseText);
      /* The ID values returned by the insert must be stored in each
         node in the node tree */
      HDLmTree.resetIdValues(treeIdArray, treeDataArray);
    }, function (errorText) {
      /* console.log(errorText); */
      HDLmError.buildError('Error', 'Pending inserts failure', 14, errorText);
    });
    return ajaxPromise;
  }
  /* This code updates zero or more rows in the database. One row
     is updated by each pending update. The caller does not pass
     anything. The array of pending updates may be empty. This is
     not an error condition. Of course, nothing will be done in
     this case.

     If the same ID value is specified more than once, only the last
     use of the ID value will actually be used. In other words, the
     same ID value may appear more than once in the pending updates
     array. Only the last use of each ID value will really be used. */
  static processPendingUpdates() {
    /* Declare and define a few variables */
    let ajaxPromise;
    let updateMap = new Map();
    let updateIdArray = [];
    let updateDataArray = [];
    /* Check if the number of pending updates is actually zero. If this
       is true, then we can return to the caller immediately. */
    if (HDLmTree.pendingUpdates.length == 0)
      return;
    /* Build the content string for use below. */
    let content = HDLmUtility.getContentString();
    /* Add each pending update to the Map created above. This
       has the effect of only using the last use of each ID
       value. */
    let pendingCount = HDLmTree.pendingUpdates.length;
    for (let i = 0; i < pendingCount; i++) {
      let pendingUpdate = HDLmTree.pendingUpdates[i];
      let pendingId = pendingUpdate['id'];
      let pendingStr = pendingUpdate['node'];
      updateMap.set(pendingId, pendingStr);
    }
    /* Remove all of the pending updates */
    HDLmTree.pendingUpdates.length = 0;
    /* Process the map of pending updates */
    for (let updateEntry of updateMap) {
      updateIdArray.push(updateEntry[0]);
      updateDataArray.push(updateEntry[1]);
    }
    /* Update all of the rows */
    ajaxPromise = HDLmTree.passUpdateRows(updateIdArray, updateDataArray);
    /* Return the AJAX Promise */
    return ajaxPromise;
  }
  /* This routine is invoked to remove a Fancytree node. The caller
     passes the Fancytree node to be removed. This routine does the
     actual work. It turns out to be rather easy. */
  static removeFancyNode(fancyNode) {
    fancyNode.remove();
  }
  /* Locate (find) the parent of a node using a node path. Remove the
     current node from the children array of the parent node. This
     routine will return true if the current node was found in the
     children array of the parent node. This routine will return false
     if the current node was not found in the children array of the
     parent node.

     This routine must be called with a node that has a parent. As
     a consequence, this routine should not be called with the path
     of the top node. */
  static removeFromParentTree(currentTreeNode) {
    let rvBool = false;
    /* Try to obtain (locate) the parent node of the current node */
    let nodePath = currentTreeNode.nodePath;
    let parentNode = HDLmTree.locateTreeParentNode(nodePath);
    /* Report an error if the parent node could not be found */
    if (parentNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmTree.removeFromParentTree', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return rvBool;
    }
    /* Scan the children array looking for a match */
    let childIndex = parentNode.children.indexOf(currentTreeNode);
    if (childIndex < 0) {
      let nodeString = nodePath.toString();
      HDLmError.buildError('Error', 'Index', 22, nodeString);
      return rvBool;
    }
    /* Remove the matching entry in the children array */
    parentNode.children.splice(childIndex, 1);
    rvBool = true;
    return rvBool;
  }
  /* This routine resets a count field after a node is cut,
     deleted, inserted, pasted, etc. The count is always
     in the details of the parent node. The parent is the
     parent of the node that was just deleted. */
  static resetCountField(currentNodePath) {
    /* At this point, we must consider a very special case. The parent of
       the deleted tree node, may have a count field that needs to be fixed
       to take into account the restoration of the tree node. */
    if (HDLmGlobals.activeEditorType != HDLmEditorTypes.pass &&
        HDLmGlobals.checkForInlineEditorOrGems() == false)
      return;
    /* Make a copy of the node path passed by the caller. Since we
       need to changes to this node path, we must first make a copy. */
    let localNodePath = currentNodePath.slice();
    localNodePath.pop();
    /* Try to find the parent node. This should never fail. */
    let parentTreeNode = HDLmTree.locateTreeNode(localNodePath);
    /* Report an error if the parent node could not be found */
    if (parentTreeNode == null) {
      let nodeString = localNodePath.toString();
      console.log('In HDLmTree.resetCountField', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* Some parent nodes will not have any details and as a
       consequence, they won't have any count fields that
       need to be adjusted. If the parent node has no details,
       then we are done at this point. */
    if (!parentTreeNode.hasOwnProperty('details'))
      return;
    /* Make sure the parent node has details */
    if (!parentTreeNode.hasOwnProperty('details')) {
      let errorString = 'details';
      HDLmError.buildError('Error', 'Missing field', 11, errorString);
      return;
    }
    /* Make sure the parent node has children */
    if (!parentTreeNode.hasOwnProperty('children')) {
      let errorString = 'children';
      HDLmError.buildError('Error', 'Missing field', 11, errorString);
      return;
    }
    /* Fix the count field in the parent object */
    HDLmPass.addMissingPassObject(parentTreeNode);
  }
  /* This routine reset ID values in the node tree. We need to have
     the actual ID values in each node so that the node can be deleted
     and/or updated. This routine is passed an array of ID values and
     an array of node information. The node information is used to find
     the actual nodes that are then updated with current ID information. */
  static resetIdValues(idArray, infoArray) {
    /* Make sure the argument is an array */
    if (Array.isArray(idArray) == false) {
      let errorText = 'idArray passed to resetIdValues method is not an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the argument is an array */
    if (Array.isArray(infoArray) == false) {
      let errorText = 'infoArray passed to resetIdValues method is not an array';
      HDLmAssert(false, errorText);
    }
    /* Get the lengths of each array. The lengths must be equal. */
    let idArrayLen = idArray.length;
    let infoArrayLen = infoArray.length;
    if (idArrayLen != infoArrayLen) {
      let errorText = `idArray length (${idArrayLen}) is not equal to infoArray length (${infoArrayLen})`;
      HDLmAssert(false, errorText);
    }
    /* Process each entry in the info array */
    for (let i = 0; i < infoArrayLen; i++) {
      let infoArrayEntry = infoArray[i];
      let infoArrayEntryObj = JSON.parse(infoArrayEntry);
      let infoEntryNodePath = infoArrayEntryObj.nodePath;
      /* Try to find the node in the node tree we are looking for */
      let infoEntryNode = HDLmTree.locateTreeNode(infoEntryNodePath);
      /* Report an error if the node could not be found */
      if (infoEntryNode == null) {
        let nodeString = infoEntryNodePath.toString();
        /* console.log('HDLmTree.resetIdValues'); */
        console.log('In HDLmTree.resetIdValues', nodeString);
        HDLmError.buildError('Error', 'Locate', 9, nodeString);
        return false;
      }
      /* Get the new and old ID values. The old ID value
         is not really used. */
      let oldIdValue = infoEntryNode.id;
      let newIdValue = idArray[i];
      infoEntryNode.id = newIdValue; 
    }
    return true;
  }
  /* This routine sets the details (an HDLmMod) of the current node (HDLmTree) 
     using a value passed by the caller */
  setDetails(newDetails) {
    this.details = newDetails;
  }
  /* This routine sets the node path of the current node (HDLmTree) 
     using a value passed by the caller */
  setNodePath(newNodePath) {
    this.nodePath = newNodePath.slice();
  }
  /* This routine sets the rule tree top using a value passed
     by the caller */
  static setTreeTop(newTreeTop) {
    HDLmTree.top = newTreeTop;
  }
  /* This is the full rule name sort function. Note that a special 
     comparision routine is used to get the correct results. */
  static sortFullRuleNames(ruleNames) {
    /* Sort the rule name array passed by the caller */
    ruleNames = ruleNames.sort(HDLmTree.sortFullRuleNamesCompareFn);
    return ruleNames;
  }
  /* This is the full rule name comparision function. This function
     compares full rule names. Note that if the names are not equal,
     then the names are broken into parts and the parts are compared.
     This step is required to get the correct result. */
  static sortFullRuleNamesCompareFn(firstName, secondName) {
    let splitLength;
    /* Check if the names actually match. If they do, we are done. */
    if (firstName == secondName)
      return 0;
    /* Break the names (rule names) into parts. The parts must be
       compared. */
    let firstNameSplit = HDLmTree.splitFullRuleName(firstName);
    splitLength = firstNameSplit.length;
    /* Make sure the first full rule name really had four parts */
    if (splitLength != 4) {
      let errorText = `Size of the first full rule name split array (${splitLength}) is not four`;
      HDLmAssert(false, errorText);
    }
    let secondNameSplit = HDLmTree.splitFullRuleName(secondName);
    splitLength = secondNameSplit.length;
    /* Make sure the second full rule name really had four parts */
    if (splitLength != 4) {
      let errorText = `Size of the second full rule name split array (${splitLength}) is not four`;
      HDLmAssert(false, errorText);
    }
    /* Compare each of the parts of the names */
    for (let i = 0; i < splitLength; i++) {
      if (firstNameSplit[i] < secondNameSplit[i])
        return -1;
      else if (firstNameSplit[i] > secondNameSplit[i])
        return 1;
    }
    return 0;
  }
  /* Split a full rule name into a set of parts. The number of
     parts should always be four (4). The four parts are returned
     to the caller using an array. */
  static splitFullRuleName(fullRuleName) {
    let splitRv = [];
    let fullIndex;
    let fullRuleLocal = fullRuleName;
    /* Look for the first forward slash in the full rule name */
    fullIndex = fullRuleLocal.indexOf('/');
    /* Make sure we found the first forward slash. This will come
       after the host domain name. */
    if (fullIndex < 0) {
      let errorText = `Slash after host name not found in full rule name (${fullRuleName})`;
      HDLmAssert(false, errorText);
    }
    if (fullIndex == 0) {
      let errorText = `Slash after host name found at start of full rule name (${fullRuleName})`;
      HDLmAssert(false, errorText);
    }
    /* Get the host name from the full rule name and extract the
       remainder of the full rule name */
    let hostName = fullRuleLocal.substr(0, fullIndex);
    fullRuleLocal = fullRuleLocal.substr(fullIndex + 1);
    /* Look for the next forward slash in the remaining full rule name */
    fullIndex = fullRuleLocal.indexOf('/');
    /* Make sure we found the second forward slash. This will come
       after the division name. */
    if (fullIndex < 0) {
      let errorText = `Slash after division name not found in full rule name (${fullRuleName})`;
      HDLmAssert(false, errorText);
    }
    if (fullIndex == 0) {
      let errorText = `Slash after division name found at start of remaining rule name (${fullRuleLocal})`;
      HDLmAssert(false, errorText);
    }
    let divisionName = fullRuleLocal.substr(0, fullIndex);
    fullRuleLocal = fullRuleLocal.substr(fullIndex + 1);
    /* Look for the next forward slash in the remaining full rule name */
    fullIndex = fullRuleLocal.indexOf('/');
    /* Make sure we found the third forward slash. This will come
       after the site name. */
    if (fullIndex < 0) {
      let errorText = `Slash after site name not found in full rule name (${fullRuleName})`;
      HDLmAssert(false, errorText);
    }
    if (fullIndex == 0) {
      let errorText = `Slash after site name found at start of remaining rule name (${fullRuleLocal})`;
      HDLmAssert(false, errorText);
    }
    let siteName = fullRuleLocal.substr(0, fullIndex);
    fullRuleLocal = fullRuleLocal.substr(fullIndex + 1);
    /* The remainder should be the actual rule name. Note that the actual rule
       name may contain forward slash characters. This is not an error. */
    let ruleName = fullRuleLocal;
    if (ruleName.length == 0) {
      let errorText = `Zero length rule name found in full rule name (${fullRuleName})`;
      HDLmAssert(false, errorText);
    }
    /* Push a set of values into the return value array and return it */
    splitRv.push(hostName);
    splitRv.push(divisionName);
    splitRv.push(siteName);
    splitRv.push(ruleName);
    return splitRv;
  }
  /* This routine is used to store a tree node. The tree node might
     already exist in the tree or it might not. If the tree node 
     already exists in the tree, then the tree node is updated. If
     the tree node does not exist in the tree, then the tree node
     is added to the tree. */
  static storeTreeNode(treeNode) {
    /* console.log('In HDLmTree.storeTreeNode'); */
    /* Get the node path of the tree node passed by the caller */
    let nodePath = treeNode.nodePath;
    /* Try to find the node in the node tree we are looking for */
    let treeNodePos = HDLmTree.locateTreeNode(nodePath);
    /* If the node was not found, then we need to add the node to the
       tree. If the node was found, then we need to update the node. */
    if (treeNodePos == null) {
      /* console.log('In HDLmTree.storeTreeNode, add'); */
      HDLmTree.addTreeNode(treeNode);
    }
    else {
      /* console.log('In HDLmTree.storeTreeNode, update'); */
      HDLmTree.updateTreeNode(treeNode);
    }
  }
  /* This routine will perform a set of update related operations.
     The operations depend on what editor is currently in use and
     what type of node is being updated. */
  static updateRelatedOperations(currentTreeNodePath) {
    /* console.log('In HDLmTree.updateRelatedOperations'); */
    /* We only need to update count values if the GUI editor or the 
       GXE editor or the pass-through editor or one of the inline
       editors is in use */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass ||
        HDLmGlobals.checkForInlineEditorOrGems()) {
      /* In some cases, we may heed to update a count field in a parent
         node. This is not always true.  */
      HDLmTree.resetCountField(currentTreeNodePath);
    }
    /* The call below will always update the rules on the server.
       The current window will only be reloaded if we are running
       one of the inline editors. */
    if (HDLmGlobals.checkForInlineEditor()) {
      let callFromCallbackFalse = false;
      HDLmMod.handleUpdateReloadPageUnconditional(callFromCallbackFalse);
    }
  }
  /* The code below is the new code. The new code just converts the
     entire node tree (not the Fancytree) to JSON and sends it to the
     server. This has the effect of saving everything. Eventually a
     better approach will be needed with a permissions check. The entire
     tree is sent back to the server using REST. Note that a row is created
     for each node in the node tree. */
  static updateTree() {
    /* Update all of the rows in the database */
    let contentStr = HDLmUtility.getContentString();
    let treeTop = HDLmTree.getTreeTop();
    /* At this point we need to update all of the rows. If
       an update operation is already in progress, then we
       just want to queue the update operation for later.
       This is why the third argument is set to false. */
    let passUpdateAllRowsForceFalse = false;
    HDLmTree.passUpdateAllRows(contentStr, treeTop, passUpdateAllRowsForceFalse);
  }
  /* This routine updates a node (that currently does exist)
     in the node tree. The node is updated in the parent node's 
     children. The old node is removed and the new node is added
     in the correct order. */
  static updateTreeNode(newTreeNode) {
    /* Initialize a few variables */
    /* Check if the new tree node value is null */
    if (newTreeNode == null) {
      let errorText = 'New tree node value passed to updateTreeNode is null';
      HDLmAssert(false, errorText);
    }
    /* Check if the new tree node value is an object */
    if (typeof newTreeNode !== 'object') {
      let errorText = 'New tree node value passed to updateTreeNode is not an object';
      HDLmAssert(false, errorText);
    }
    /* Get the node path of the new tree node. This will actually
       be the same as the node path of the old node that is being
       replaced. */
    let newNodePath = newTreeNode.nodePath;
    let newNodeName = newNodePath[newNodePath.length - 1];
    if (newNodePath == null) {
      let errorText = 'Node path of new tree node is null';
      HDLmAssert(false, errorText);
    }
    /* Try to locate the parent tree node */ 
    let parentTreeNode = HDLmTree.locateTreeParentNode(newNodePath);
    /* Report an error if the parent node could not be found.
       This should never happen, but you never know. */
    if (parentTreeNode == null) {
      let nodeString = newNodePath.toString();
      console.log('In HDLmTree.updateTreeNode', nodeString);
      let errorText = HDLmError.buildError('Error', 'Locate', 9, nodeString);
      HDLmAssert(false, errorText);;
    }
    /* Search for the first existing node with a name that is
       equal to the current name. We must replace this child
       node with our new node. */
    let childPos = parentTreeNode.children.findIndex(childNode =>
        childNode.nodePath[childNode.nodePath.length - 1] == newNodeName);
    /* This find index operation should always be successful. However,
       you never know. */  
    if (childPos < 0) {       
      let nodeString = newNodePath.toString();
      console.log('In HDLmTree.updateTreeNode', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      let errorText = 'Old tree node was not found in the children array of the parent tree';
      HDLmAssert(false, errorText);
    }
    /* Replace the old node with the new one */
    parentTreeNode.children[childPos] = newTreeNode;
  }
}
/* Build the (initially) empty top node. We would like to do this
   inside the class definition. However, that is not possible even
   with ES6. The name of the top name is hard-coded below because
   this assignment occurs before the defines have been processed. */
let topName = 'Top';
let topType = 'top';
HDLmTree.setTreeTop(new HDLmTree(topType, HDLmModTreeInfo[topType]['tooltip']));
/* The next field (an array) contains all of the pending deletes from
   the database maintained by the server. Each delete is a string which
   is really an ID value. Each of the pending deletes is obtained from a
   tree node or something like a tree node. */
HDLmTree.pendingDeletes = [];
/* The next field (an array) contains all of the pending inserts into
   the database maintained by the server. Each insert is a string with
   no ID value. The server will provide the ID values that will be added
   to each tree node. Each of the pending inserts is obtained from a
   tree node or something like a tree node. */
HDLmTree.pendingInserts = [];
/* The next field (an array) contains all of the pending updates. The
   updates are eventually sent to the server and are used to update the
   database. Each update has a new value for a tree node (or something
   like a tree node) and an ID value. The ID value is used to identify
   the server database row that must be updated. */
HDLmTree.pendingUpdates = [];
/* The next field contains the top of the node tree. This value is 
   set (once) and does not change. It (in practice) is not null 
   This is the top of the 'pass' tree (of HDLmTree nodes */
HDLmTree.top = null; 