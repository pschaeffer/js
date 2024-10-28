/**
 * HDLmIgnore short summary.
 *
 * HDLmIgnore description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following JSON data structure is used to build the editor
   for each type of ignore definition. The ignore type is used 
   as the property name to obtain each set of ignore data. */
const HDLmIgnoreInfoData =
{
  "ignore": {
    "fields":
      [
        {
          "description": "Ignore-List Entry Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "ignorelistentryname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Created",
          "source":      "createdFromVerificationCheck",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Script ID",
          "source":      "scriptId",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Test Case",
          "source":      "testCase",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Step Number",
          "source":      "stepNumber",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Description",
          "source":      "description",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Language",
          "source":      "language",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Ticket Package",
          "source":      "ticketPackage",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {  
          "description": "Test Results",
          "source":      "testResults",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details One",
          "source":      "detailsOne",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details Two",
          "source":      "detailsTwo",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details Three",
          "source":      "detailsThree",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        }
      ]
  },
  "list": {
    "fields":
      [
        {
          "description": "Ignore-List Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "ignorelistname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        }
      ]
  },
  "newcompignore": {
    "fields":
      [
        {
          "description": "Company Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablecompignorename"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
      ]
  },
  "newignore": {
    "fields":
      [
        {
          "description": "Ignore-List Entry Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editableignorelistentryname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Created",
          "source":      "createdFromVerificationCheck",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Script ID",
          "source":      "scriptId",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Test Case",
          "source":      "testCase",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Step Number",
          "source":      "stepNumber",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Description",
          "source":      "description",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Language",
          "source":      "language",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Ticket Package",
          "source":      "ticketPackage",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Test Results",
          "source":      "testResults",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details One",
          "source":      "detailsOne",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details Two",
          "source":      "detailsTwo",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details Three",
          "source":      "detailsThree",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        }
      ]
  },
  "newlist": {
    "fields":
      [
        {
          "description": "Ignore-List Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editableignorelistname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        }
      ]
  }
}
class HDLmIgnore {
  /* This routine adds any missing fields to a ignore (ignore-list 
     entry value) object. A ignore-list entry object in this case 
     means a modification object being used to build an ignore-list 
     entry value */
  static addMissingIgnoreObject(newIgnore) {
    /* Add any missing fields to the ignore-list entry object
       (actually a modification object) passed by the caller */
    if (newIgnore.hasOwnProperty('type') &&
        newIgnore.type == 'ignore') {
      if (!newIgnore.hasOwnProperty('comments')) {
        newIgnore.comments = '';
      }
      if (!newIgnore.hasOwnProperty('createdFromVerificationCheck')) {
        newIgnore.createdFromVerificationCheck = '';
      }
      if (!newIgnore.hasOwnProperty('scriptId')) {
        newIgnore.scriptId = '';
      }
      if (!newIgnore.hasOwnProperty('testCase')) {
        newIgnore.testCase = '';
      }
      if (!newIgnore.hasOwnProperty('stepNumber')) {
        newIgnore.stepNumber = '';
      }
      if (!newIgnore.hasOwnProperty('description')) {
        newIgnore.description = '';
      }
      if (!newIgnore.hasOwnProperty('language')) {
        newIgnore.language = '';
      }
      if (!newIgnore.hasOwnProperty('ticketPackage')) {
        newIgnore.ticketPackage = '';
      }
      if (!newIgnore.hasOwnProperty('testResults')) {
        newIgnore.testResults = '';
      }
      if (!newIgnore.hasOwnProperty('detailsOne')) {
        newIgnore.detailsOne = '';
      }
      if (!newIgnore.hasOwnProperty('detailsTwo')) {
        newIgnore.detailsTwo = '';
      }
      if (!newIgnore.hasOwnProperty('detailsThree')) {
        newIgnore.detailsThree = '';
      }
    }
  }
  /* Build an ignore related object from the values passed 
     by the caller. This code is called for companies, 
     ignore-lists, and ignore-list entries. */
  static buildIgnoreObject(name, type) {
    /* Construct the new ignore related object. This is actually
       a modification object used to build an ignore related 
       object. */
    let modificationEnabledTrue = true;
    let modificationExtraEmpty = '';
    let newIgnore = new HDLmMod(name, modificationExtraEmpty, 
                                modificationEnabledTrue, type);
    if (type == 'newignore') {
      newIgnore.comments = '';
      newIgnore.createdFromVerificationCheck = '';
      newIgnore.scriptId = '';
      newIgnore.testCase = '';
      newIgnore.stepNumber = '';
      newIgnore.description = '';
      newIgnore.language = '';
      newIgnore.ticketPackage = '';
      newIgnore.testResults = '';
      newIgnore.detailsOne = '';
      newIgnore.detailsTwo = '';
      newIgnore.detailsThree = '';
    }
    return newIgnore;
  }
  /* Get the list of ignore types supported by this code. The list
     of types is returned to the caller as an array. Note that
     we don't have any ignore types at this time. */
  static getIgnoreTypeList() {
    return [];
  }
  /* Return the ignore (ignore-lists and ignore-list entries) 
     information to the caller */
  static get HDLmIgnoreInfo() {
    return HDLmIgnoreInfoData;
  }
}