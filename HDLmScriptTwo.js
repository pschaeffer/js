/**
 * HDLmScriptTwo short summary.
 *
 * HDLmScriptTwo description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmScriptTwo class doesn't actually do anything. However, it
   does define a set of static methods that are used to build the
   a rule editor. No instances of this class can ever be created. */
class HDLmScriptTwo {
  /* Restore the status of a module, if possible */
  static restoreModule() {
    if (window.moduleSave)
      module = window.moduleSave;
  }
}
/* Run the restore module function */
HDLmScriptTwo.restoreModule();