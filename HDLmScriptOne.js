/**
 * HDLmScriptOne short summary.
 *
 * HDLmScriptOne description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmScriptOne class doesn't actually do anything. However, it
   does define a set of static methods that are used to build the
   a rule editor. No instances of this class can ever be created. */
class HDLmScriptOne {
  /* Save the status of a module, if possible */
  static saveModule() {
    if (typeof module === 'object') {
      window.moduleSave = module;
      module = undefined;
    }
  }
}
/* Run the save module function */
HDLmScriptOne.saveModule();