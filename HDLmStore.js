/**
 * HDLmStore short summary.
 *
 * HDLmStore description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following JSON data structure is used to build the editor
   for each type of store (stored value) definition. The store 
   type is used as the property name to obtain each set of store  
   data. */
const HDLmStoreInfoData =
  {
    "newcompstore":  { "fields":
                       [
                         {
                           "description": "Company Name",
                           "source":      "name",
                           "fieldtype":   "iotext",
                           "subtype":     "editablecompstorename"
                         },
                         {
                           "description": "Comments",
                           "source":      "comments",
                           "fieldtype":   "comminfo",
                           "subtype":     "comments"
                         }
                       ]
                     },
    "newdivision":   { "fields":
                       [
                         {
                           "description": "Division Name",
                           "source":      "name",
                           "fieldtype":   "iotext",
                           "subtype":     "editabledivisionname"
                         },  
                         {
                           "description": "Comments",
                           "source":      "comments",
                           "fieldtype":   "comminfo",
                           "subtype":     "comments"
                         }
                       ]
                     },
    "newsite":       { "fields":
                       [
                         {
                           "description": "Site Name",
                           "source":      "name",
                           "fieldtype":   "iotext",
                           "subtype":     "editablesitename"
                         },
                         {
                           "description": "Comments",
                           "source":      "comments",
                           "fieldtype":   "comminfo",
                           "subtype":     "comments"
                         }
                       ]
                     },
    "newstore":      { "fields":
                       [
                         {
                           "description": "Stored Value Name",
                           "source":      "name",
                           "fieldtype":   "iotext",
                           "subtype":     "editablestoredvaluename"
                         },
                         {
                           "description": "Comments",
                           "source":      "comments",
                           "fieldtype":   "comminfo",
                           "subtype":     "comments"
                         },
                         {
                           "description": "Stored Value",
                           "source":      "value",
                           "fieldtype":   "iotext",
                           "subtype":     "storevalue"
                         }
                       ]
                     },
    "store":         { "fields":
                       [
                         {
                           "description": "Stored Value Name",
                           "source":      "name",
                           "fieldtype":   "iotext",
                           "subtype":     "storedvaluename"
                         },
                         {
                           "description": "Comments",
                           "source":      "comments",
                           "fieldtype":   "comminfo",
                           "subtype":     "comments"
                         },
                         {
                           "description": "Stored Value",
                           "source":      "value",
                           "fieldtype":   "iotext",
                           "subtype":     "storevalue"
                         }
                       ]
                     }
  }
class HDLmStore {
  /* This routine adds any missing fields to a store (stored value) object.
     A store object in this case means a modification object being used to 
     build a stored value. */
  static addMissingStoreObject(newStore) {
    /* Add any missing fields to the store (stored value) object
       (actually a modification object) passed by the caller */
    if (!newStore.hasOwnProperty('comments')) {
      newStore.comments = '';
    }
    if (!newStore.hasOwnProperty('value')) {
      newStore.value = '';
    }
  }
  /* Build a store (stored value) object from the values passed 
     by the caller */
  static buildStoreObject(name, type) {
    /* Construct the new store (stored value) object. This is actually
       a modification object used to build a store (stored value) object. */
    let modificationEnabledTrue = true;
    let modificationExtraEmpty = '';
    let newStore = new HDLmMod(name, modificationExtraEmpty, modificationEnabledTrue, type);
    newStore.comments = '';
    newStore.value = '';
    return newStore;
  }
  /* Get the list of store types supported by this code. The list
     of types is returned to the caller as an array. Note that
     we don't have any store types at this time. */
  static getStoreTypeList() {
    return [];
  }
  /* Return the store (stored values) information to the caller */
  static get HDLmStoreInfo() {
    return HDLmStoreInfoData;
  }
}