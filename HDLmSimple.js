/**
 * HDLmSimple short summary.
 *
 * HDLmSimple description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following JSON data structure is used to build the editor
   for each type of Simple definition. The Simple type is used 
   as the property name to obtain each set of Simple data. */
const HDLmSimpleInfoData =
{
  "newcompsimple": {
    "fields":
      [
        {
          "description": "Company Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablecompsimplename"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        }
      ]
  },
  "top": {
    "fields":
      [
      ]
  }
}
/* The HDLmSimple class doesn't actually do anything. However, it
   does define a set of static methods that are used to build the
   Simple rule editor. No instances of this class can ever be created. */
class HDLmSimple {  
  /* Get the list of Simple types supported by this code. The
     list of types is returned to the caller as an array. Note
     that we don't have any Simple types (per se) at this time.
  
     However, if the caller provides a DOM element, then a list
     of rule types appropriate for the DOM element will be returned
     to the caller. Of course, this list is not the same for each
     type of DOM element. */
  static getSimpleTypeList(domElement) {
    if (domElement == null)
      return [];
    /* At this point, we need to get a rule type list that is
       appropriate for the current DOM element. Of course, the
       rule type list is different for each type of DOM element. */
    if (!domElement.hasOwnProperty('tag')) {
      let selectOptionValues = HDLmMod.getModificationTypeList();
      return selectOptionValues;
    }
    let tagStr = domElement.tag;
    /* At this point we have a tag string for the DOM element. 
       Using the tag string, we should be able to get a list
       of rule types that are valid for the current tag value.
       This list is actually obtained from the other inline 
       editor. We would not want to duplicate the list in this
       module. */
    let tagChoices = HDLmPopup.getTagChoices();
    if (!tagChoices.hasOwnProperty(tagStr)) {
      let selectOptionValues = HDLmMod.getModificationTypeList();
      return selectOptionValues;
    }
    return tagChoices[tagStr];
  }
  /* Return the Simple information to the caller */
  static get HDLmSimpleInfo() {
    return HDLmSimpleInfoData;
  }
}