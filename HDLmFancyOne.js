/**
 * HDLmFancyOne short summary.
 *
 * HDLmFancyOne description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmFancyOne class doesn't actually do anything. However, it
   does define a set of static methods that are used to build the
   a rule editor. No instances of this class can ever be created. */
class HDLmFancyOne {
  /* The function below does all of the work to build and maintain
     the Fancytree. This function is run asynchronously out of the
     last part of initialization. This function used to be run out
     of the jQuery ready event. */
  static fancyTreeFunction() {
    /* Run some overall project initialization code */
    HDLmUtility.overallInitialize();
    /* Initialize the tree inside the <div id="tree"> element */
    let treeIdValue = HDLmDefines.getString('HDLMFANCYTREE');
    $(treeIdValue).fancytree({
      /* Enable the inline editing extension */
      extensions: ["dnd5", "edit"],
      /* Provide some options and routines for drag-and-drop */
      dnd5: {
        /* Expand nodes after n milliseconds of hovering - default */
        autoExpandMS: 1500,
        /* Absolute position offset for .fancytree-drop-marker - default */
        /* Relative to ..fancytree-title (icon/img near a node accepting drop) */
        dropMarkerOffsetX: -24,
        /* Additional offset for drop-marker with hitMode = "before"/"after" - default */
        dropMarkerInsertOffsetX: -16,
        /* true: Drag multiple (i.e. selected) nodes - default is false */
        multiSource: false,
        /* Prevent dropping nodes from different Fancytrees - default is false */
        preventForeignNodes: true,
        /* Prevent dropping items other than Fancytree nodes - default is false */
        preventNonNodes: true,
        /* Prevent dropping nodes on own descendants - default */
        preventRecursiveMoves: true,
        /* Prevent dropping nodes 'before self', etc. - default */
        preventVoidMoves: true,
        /* Enable auto-scrolling while dragging - default */
        scroll: true,
        /* Active top/bottom margin in pixel - default */
        scrollSensitivity: 20,
        /* Pixels per event - default */
        scrollSpeed: 5,
        /* The function below is called at the start of drag-and-drop processing */
        dragStart: function (node, data) {
          if (HDLmGlobals.activeDebugging.DNDEvents)
            console.log('Fancytree event DND dragStart');
          let rvBool = HDLmTree.dndDragStart(node, data);
          return rvBool;
        },
        /* The function below is called while node dragging is underway */
        dragDrag: function (node, data) {
          if (HDLmGlobals.activeDebugging.DNDEvents)
            console.log('Fancytree event DND dragDrag');
        },
        /* The function below is called at the end of drag-and-drop processing */
        dragEnd: function (node, data) {
          if (HDLmGlobals.activeDebugging.DNDEvents)
            console.log('Fancytree event DND dragEnd');
          HDLmTree.dndDragEnd(node, data);
        },
        /* The function below is called when a node is dragger over some other node */
        dragEnter: function (node, data) {
          if (HDLmGlobals.activeDebugging.DNDEvents)
            console.log('Fancytree event DND dragEnter');
          let rvValue = HDLmTree.dndDragEnter(node, data);
          return rvValue;
        },
        dragOver: function (node, data) {
          if (HDLmGlobals.activeDebugging.DNDEvents)
            console.log('Fancytree event DND dragOver');
        },
        /* We always want nodes to be expanded, if possible */
        dragExpand: function (node, data) {
          if (HDLmGlobals.activeDebugging.DNDEvents)
            console.log('Fancytree event DND dragExpand');
          return true;
        },
        dragLeave: function (node, data) {
          if (HDLmGlobals.activeDebugging.DNDEvents)
            console.log('Fancytree event DND dragLeave');
        },
        /* This is the function that does the actual work of handling
           drop. The dragged node becomes a child of the target node. */
        dragDrop: function (node, data) {
          if (HDLmGlobals.activeDebugging.DNDEvents)
            console.log('Fancytree event DND dragDrop');
          HDLmTree.dndDragDrop(node, data);
        }
      },
      /* Provide some options and routines for inline editing */
      edit: {
        triggerStart: ["clickActive", "f2"],
        /* The routine invoked below will prevent any attempt to
           edit the name of the top node */
        beforeEdit: function (event, data) {
          if (HDLmGlobals.activeDebugging.editEvents)
            console.log('Fancytree event edit beforeEdit');
          let rvBool = HDLmTree.editInlineBeforeEdit(event, data);
          return rvBool;
        },
        /* The routine invoked below does the actual work of checking
           the new node name value and either accepting it or rejecting
           it. If the new node name is valid, then it is used to replace
           the existing node name. */
        beforeClose: function (event, data) {
          if (HDLmGlobals.activeDebugging.editEvents)
            console.log('Fancytree event edit beforeClose');
          let rvBool = HDLmTree.editInlineBeforeClose(event, data);
          return rvBool;
        },
        /* The close function doesn't do to much. However, it does clear
           any error message text and remove the old node if a new node
           was constructed. */
        close: function (event, data) {
          if (HDLmGlobals.activeDebugging.editEvents)
            console.log('Fancytree event edit close');
          HDLmTree.editInlineClose(event, data);
        }
      },
      /* Activate a leaf node (a modification). This code actually displays
         a modification on the web page. */
      activate: function (event, data) {
        /* console.log('In HDLmFancyOne.fancyTreeFunction', event, data); */
        if (HDLmGlobals.activeDebugging.fancyEvents)
          console.log('Fancytree event activate');
        let fieldName = HDLmDefines.getString('HDLMNODEPATH');
        let HDLmDataNodePath = data.node.data[fieldName];
        /* Activation events (changes) are subject to undo / redo processing.
           As a consequence, we must call the add activate routine here. Note
           that some activate events cause a different node to be deactivated
           and some activate events do not cause a different node to be
           deactivated. */
        HDLmUnRe.addActivate(event, data, HDLmDataNodePath);
        /* Clear the global values that show we were adding a new tree node
           of some type */
        HDLmMenus.clearPending();
        let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
        let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
        /* console.log('about to displaymod'); */
        let currentDomElementNull = null;
        let handlingCmdInsertFalse = false;
        let inlineStartupFlagFalse = false;
        let possibleRuleTypesNull = null;
        HDLmMod.displayModTree(divDescriptions, divValues, HDLmDataNodePath,
                               inlineStartupFlagFalse, handlingCmdInsertFalse,
                               possibleRuleTypesNull, currentDomElementNull);
      },
      blur: function (event, data) {
        if (HDLmGlobals.activeDebugging.fancyEvents)
          console.log('Fancytree event blur');
      },
      checkbox: false,
      /* This routine (function) is called when a node is collapsed. The actual
         work of collapsing the node is mostly done by Fancytree. We must keep
         track of this event so that the collapse can be undone and then potentially
         redone. */
      collapse: function (event, data) {
        if (HDLmGlobals.activeDebugging.fancyEvents)
          console.log('Fancytree event collapse');
        let fieldName = HDLmDefines.getString('HDLMNODEPATH');
        let HDLmDataNodePath = data.node.data[fieldName];
        HDLmUnRe.addCollapse(event, data, HDLmDataNodePath);
      },
      /* Deactivate a leaf node (a modification). This code removes a modification
         from a web page and updates the database if need be. Note that a deactivate
         event for a modification can run (will be called) after the modification
         has been deleted. This works (for now) becuase of how the update modification
         code works. */
      deactivate: function (event, data) {
        if (HDLmGlobals.activeDebugging.fancyEvents)
          console.log('Fancytree event deactivate');
        HDLmMod.removeEntries();
        /* The error text must be cleared here in all cases. We may be
           deactivating a node as part of the activation of a higher
           level node. The activation of a higher level node will not
           clear the error text. As a consequence, the error text must
           be cleared here. */
        let setErrorStringEmpty = '';
        HDLmUtility.setErrorText(setErrorStringEmpty);
        let fieldName = HDLmDefines.getString('HDLMNODEPATH');
        let HDLmDataNodePath = data.node.data[fieldName];
        /* Deactivation events (changes) are not subject to undo / redo processing.
           However, we must call the add deactivate routine here in any case. This
           call is needed for record keeping purposes. */
        HDLmUnRe.addDeactivate(event, data, HDLmDataNodePath);
      },
      /* This routine (function) is called when a node is expanded. The actual
         work of expanding the node is mostly done by Fancytree. We must keep
         track of this event so that the expand can be undone and then potentially
         redone. */
      expand: function (event, data) {
        if (HDLmGlobals.activeDebugging.fancyEvents)
          console.log('Fancytree event expand');
        let fieldName = HDLmDefines.getString('HDLMNODEPATH');
        let HDLmDataNodePath = data.node.data[fieldName];
        HDLmUnRe.addExpand(event, data, HDLmDataNodePath);
      },
      focus: function (event, data) {
        if (HDLmGlobals.activeDebugging.fancyEvents)
          console.log('Fancytree event focus');
      },
      /* This routine (function) is called after the Fancytree is initialized.
         Note that event and data are both set when this routine is called. In
         one very important case, the real work is done by code in a different
         file. Note that the Fancytree has been built when this function is
         invoked. */
      init: function (event, data) {
        if (HDLmGlobals.checkForInlineEditor())
          HDLmPopup.fancyTreeInitialize(event, data);
      },
      lazyLoad: function (event, data) {
        if (HDLmGlobals.activeDebugging.fancyEvents)
          console.log('Fancytree event lazyLoad');
        /* console.log('Fancytree event lazyLoad'); */
        /* console.log(event); */
        /* console.log(data); */
        data.result = HDLmTree.lazyLoad(event, data);
        /* console.log(data.result); */
      },
      source: function (event, data) {
        if (HDLmGlobals.activeDebugging.fancyEvents)
          console.log('Fancytree event source');
        return HDLmTree.fancyTreeSource(event, data);
      }
    }).on('keydown', function (event) {
      if (HDLmGlobals.activeDebugging.fancyEvents)
        console.log('Fancytree event on keydown');
      /* Handle keyboard operations by routing them to the standard
         menu code. We don't always have an active node at this point.
         The code below checks for and handles that case. We do convert
         the event to a string form that is more usable. */
      let eventStr = $.ui.fancytree.eventToString(event);
      let fancyTree = $(this).fancytree("getTree");
      let fancyNode = fancyTree.getActiveNode();
      /* The Fancytree node value passed below may be null. This is not
         an error condition. This will happen when no current Fancytree
         node is active. The code called below must be able to handle this
         case. */       
      HDLmMenus.handleKeyboard('Fancytree on', fancyNode, eventStr);     
      if (eventStr == 'ctrl+s')
        event.preventDefault();
    });
    /* Associate a context menu with the tree inside the <div id="tree"> element */
    $(treeIdValue).contextmenu({
      autoFocus: true,
      /* The function below is invoked before each menu is opened.
         We use it to build an appropriate menu. */
      beforeOpen: function (event, ui) {
        if (HDLmGlobals.activeDebugging.contextEvents)
          console.log('Fancytree event context beforeOpen');
        let fancyNode = $.ui.fancytree.getNode(ui.target);
        /* The code below builds the menu for the current node on the fly.
           The entire menu for the current node is constructed by the call
           below and used. */
        $(treeIdValue).contextmenu("replaceMenu", HDLmMenus.buildMenu(fancyNode));
        /* Activate the node on right-click */
        fancyNode.setActive();
        /* Disable tree keyboard handling */
        ui.menu.prevKeyboard = fancyNode.tree.options.keyboard;
        fancyNode.tree.options.keyboard = false;
      },
      /* The function below is invoked when a menu is closed */
      close: function (event, ui) {
        if (HDLmGlobals.activeDebugging.contextEvents)
          console.log('Fancytree event context close');
        let fancyNode = $.ui.fancytree.getNode(ui.target);
        fancyNode.tree.options.keyboard = ui.menu.prevKeyboard;
        fancyNode.setFocus();
      },
      delegate: "span.fancytree-title",
      /* We override the hide options to make the menus faster */
      hide: null,
      /* The menu below isn't really used. The actual menu is built
         on the fly. */
      menu: [{ title: "Cut", cmd: "cut", uiIcon: "ui-icon-scissors" },
             { title: "Copy", cmd: "copy", uiIcon: "ui-icon-copy" }],
      /* The function below is invoked when a menu entry is selected */
      select: function (event, ui) {
        if (HDLmGlobals.activeDebugging.contextEvents)
          console.log('Fancytree event context select');
        let fancyNode = $.ui.fancytree.getNode(ui.target);
        let nodeIden = '';
        let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
        let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
        HDLmMenus.handleCmd(divDescriptions,
                            divValues,
                            fancyNode,
                            ui.cmd,
                            nodeIden);
      },
      /* We override the show options to make the menus faster */
      show: null
    });
  }
}