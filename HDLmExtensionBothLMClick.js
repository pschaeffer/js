/**
 * HDLmExtensionBothLMClick short summary.
 *
 * HDLmExtensionBothLMClick description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmExtensionBothLMClick class is not used to create any objects.
   However, it does contain code for clicking one the 'Load More' button. */ 
class HDLmExtensionBothLMClick {   
  /* The startup method is invoked to do all of the work needed to
     to add a new item to the context menu */
  static startup() { 
    /* Check if we are running outside of the normal browser environment.
       If we are, then no real startup is possible. Just return to the
       caller. This code is sometimes copied/used in places outside of
       a browser. This function will only work inside a browser. */
    if ((typeof browser) == 'undefined' &&
        (typeof chrome) == 'undefined')
      return;
    /* For some reason, 'chrome' is defined when we are running under
       Chrome (which really makes sense), but the call to get the
       current browser name does not work (which does not make sense).
       This happens when this code is just running, but not as part
       of either a background or content script. */
    if ((typeof browser) == 'undefined' &&
        (typeof chrome)  != 'object')
      return;
    /* Get the current browser name (really type of browser). Much of
       the code depends on knowing what type of browser we are running
       under. This should not be true, but is true. */
    let browserName = HDLmHtml.getBrowserName();
    if (browserName == 'Unknown') {
      let errorText = "The current browser type could not be determined - " + browserName;
      HDLmError.buildError('Error', 'Browser Type', 54, errorText);
      return;
    }
    /* Declare and define a few local variables */
    let rv;
    /* Check the current environment. We may be running as a content
       script of we may be running as a background script. Set a
       variable showing the current environment. */
    let curEnv = 'content';
    /* Check if we are running Firefox vs. Chrome. The detection
       approach is quite different for either. */
    if (browserName == 'Firefox') {
      if ((typeof browser.menus.create) == 'function')
        curEnv = 'background';
    }
    /* If the browser name is not 'Firefox', then we will assume
       that we are running under Chrome */
    else {
      /* This is a dummy test (always true) to avoid extension
         loading problems. */
      if (1 == 1) {
        if ((typeof chrome.contextMenus) != 'undefined')
          curEnv = 'background';
      }
    }
    /* Add an event listener for content scripts. This event
       listener only works as part of content scripts. The
       'event' occurs each time right-click action is taken. */
    if (curEnv == 'content') {
      if (browserName == 'Firefox') { }
      if (browserName == 'Chrome') {
        /* Add some JavaScript for creating and using a mutation observer */
        let HDLmObsTargetNode = document; 
        /* Options for the observer (which mutations to observe) */
        let HDLmObsConfig = {attributes: true, childList: true, subtree: true};
        /* Callback function to execute when mutations are observed */
        let HDLmObsCallback = function (mutationsList, HDLmObsObserver) {
          /* console.log(document.readyState); */
          let forceReadyState = false;
          if (document.readyState == 'complete' ||
              forceReadyState == true) {
            /* console.log(document.readyState); */
            let className = 'button collapsed-reply outline';
            let domElements = document.getElementsByClassName(className);
            for (let i = 0; i < domElements.length; i++) {
              let domElement = domElements[i];
              if (domElement.innerText == 'Load More') {
                domElement.click();
                break;
              }
            };
          };
        };
        /* Create an observer instance linked to the callback function */
        let HDLmObsObserver = new MutationObserver(HDLmObsCallback);
        /* Start observing the target node for configured mutations */
        HDLmObsObserver.observe(HDLmObsTargetNode, HDLmObsConfig);
      }
    }
    /* Create all of the context menu items. This code only works
       in background scripts. The required context menu entries
       are created below. */
    if (curEnv == 'background') {
      /* Check if the current browser is Chrome */
      if (browserName == 'Chrome') { }
    }
  }
}
/* Run the startup function */
HDLmExtensionBothLMClick.startup();