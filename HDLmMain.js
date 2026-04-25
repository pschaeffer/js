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
    /* console.log('In HDLmMain.handleInitialization'); */
    let windowLocationPathName = window.location.pathname;
    /* console.log('window.location.pathname', windowLocationPathName); */
    /* This routine may been invoked to build rules or it may have 
       been invoked for some other reason */
    /* HDLmExecuteEditor.main(); */
    /* Check if we are running under VSCode. If this
       is true, then we may want to run the code that
       manages rules or we may want to run the standard
       editor code. */  
    if (HDLmUtility.isVscode()) { 
      if (1 == 1) {
        if (1 == 2)
          HDLmManageRules.main();
        else
          HDLmWebpageOptimizer.main();
      }
      else
        HDLmIndexOne.main();
    } 
    /* Not running under VSCode. Just run all of the standard
       routines. In practice, only one will actually do anything. 
       Each routine will check the window location pathname and
       determine if it should execute. */
    else {
      HDLmIndexOne.main();   
      HDLmManageRules.main();
      HDLmWebpageOptimizer.main();
    }
  }  
} 
/* Run the handle initialization function */
HDLmMain.handleInitialization();