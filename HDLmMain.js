/**
 * HDLmMain short summary.
 *
 * HDLmMain description.
 *
 * @version 1.0
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
    /* This routine may been invoked to build rules or it may have 
       been invoked for some other reason */
    /* HDLmExecuteEditor.main();  */     
    if (1 == 1) 
      HDLmBuildRules.main();
    else   
      HDLmIndexOne.main();   
  } 
} 
/* Run the handle initialization function */
HDLmMain.handleInitialization();