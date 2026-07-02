/**
 * HDLmImprovements short summary.
 *
 * HDLmImprovements description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmImprovements class is not meant to be instantiated. It only
   provides static helpers for storing, loading, and editing webpage
   improvement JSON objects. */
class HDLmImprovements {
  /* Normalize and return an outer improvements object. This helper keeps
     required keys present and typed. */
  static buildOuterObject(outerObj) {
    let nowIso = new Date().toISOString();
    if (outerObj == null)
      outerObj = {};
    if (outerObj['Version'] == null)
      outerObj['Version'] = 1;
    if (typeof(outerObj['Created']) != 'string' || outerObj['Created'] == '')
      outerObj['Created'] = nowIso;
    if (typeof(outerObj['Last Modified']) != 'string' || outerObj['Last Modified'] == '')
      outerObj['Last Modified'] = nowIso;
    if (!Array.isArray(outerObj['Improvements']))
      outerObj['Improvements'] = [];
    return outerObj;
  }
  /* Normalize one nested improvement object and return it. */
  static buildImprovementObject(improvementObj) {
    let nowIso = new Date().toISOString();
    if (improvementObj == null)
      improvementObj = {};
    if (improvementObj['Version'] == null)
      improvementObj['Version'] = 1;
    if (typeof(improvementObj['Created']) != 'string' || improvementObj['Created'] == '')
      improvementObj['Created'] = nowIso;
    if (typeof(improvementObj['Last Modified']) != 'string' || improvementObj['Last Modified'] == '')
      improvementObj['Last Modified'] = nowIso;
    if (typeof(improvementObj['What']) != 'string')
      improvementObj['What'] = '';
    if (typeof(improvementObj['Why']) != 'string')
      improvementObj['Why'] = '';
    if (typeof(improvementObj['Wanted']) != 'boolean')
      improvementObj['Wanted'] = true;
    if (typeof(improvementObj['Hash']) != 'string')
      improvementObj['Hash'] = '';
    return improvementObj;
  }
  /* Return the number of improvements in an outer improvements object. */
  static countImprovements(outerObj) {
    if (outerObj == null)
      return null;
    if (!Array.isArray(outerObj['Improvements']))
      return 0;
    return outerObj['Improvements'].length;
  }
  /* Delete one improvement by zero-based index and report invalid index
     values using the standard HDLm error number 33. */
  static deleteImprovement(outerObj, index) {
    if (outerObj == null)
      return null;
    outerObj = HDLmImprovements.buildOuterObject(outerObj);
    if (typeof(index) != 'number' || index < 0) {
      HDLmError.buildError('Error', 'Delete improvement', 33, 'Improvement index is too low');
      return outerObj;
    }
    if (index >= outerObj['Improvements'].length) {
      HDLmError.buildError('Error', 'Delete improvement', 33, 'Improvement index is too high');
      return outerObj;
    }
    outerObj['Improvements'].splice(index, 1);
    outerObj['Last Modified'] = new Date().toISOString();
    return outerObj;
  }
  /* Read an improvements object from localStorage and convert it from JSON
     text into binary object form. */
  static getImprovements(storageSuffix) {
    let storageKey = 'HDLmImprovements' + storageSuffix;
    let storedValue = localStorage.getItem(storageKey);
    if (storedValue == null)
      return null;
    try {
      let outerObj = JSON.parse(storedValue);
      outerObj = HDLmImprovements.buildOuterObject(outerObj);
      let rebuiltImprovements = [];
      for (let improvementObj of outerObj['Improvements'])
        rebuiltImprovements.push(HDLmImprovements.buildImprovementObject(improvementObj));
      outerObj['Improvements'] = rebuiltImprovements;
      return outerObj;
    }
    catch (errorObj) {
      console.error(errorObj);
      return null;
    }
  }
  /* Load an improvements object from a file chosen by the user. */
  static async loadImprovements() {
    try {
      let fileHandles = await window.showOpenFilePicker({
        multiple: false,
        types: [{ description: 'JSON Files', accept: { 'application/json': ['.json'] } }]
      });
      if (fileHandles == null || fileHandles.length == 0)
        return null;
      let fileHandle = fileHandles[0];
      let fileObj = await fileHandle.getFile();
      let fileText = await fileObj.text();
      return JSON.parse(fileText);
    }
    catch (errorObj) {
      if (errorObj.name != 'AbortError')
        console.error(errorObj);
      return null;
    }
  }
  /* Add an improvement when it does not already exist. If an exact match is
     found, only update the Last Modified timestamps. */
  static possiblyAddImprovement(outerObj, whyValue, whatValue, hashValue) {
    let nowIso = new Date().toISOString();
    outerObj = HDLmImprovements.buildOuterObject(outerObj);
    for (let improvementObj of outerObj['Improvements']) {
      if (improvementObj == null)
        continue;
      improvementObj = HDLmImprovements.buildImprovementObject(improvementObj);
      if (improvementObj['Why'] === whyValue && improvementObj['What'] === whatValue && improvementObj['Hash'] === hashValue) {
        improvementObj['Last Modified'] = nowIso;
        outerObj['Last Modified'] = nowIso;
        return outerObj;
      }
    }
    let newImprovementObj = {
      'Version': 1,
      'Created': nowIso,
      'Last Modified': nowIso,
      'What': whatValue,
      'Why': whyValue,
      'Wanted': true,
      'Hash': hashValue
    };
    outerObj['Improvements'].push(newImprovementObj);
    outerObj['Last Modified'] = nowIso;
    return outerObj;
  }
  /* Save an improvements object to localStorage. A null object removes the
     storage entry entirely. */
  static putImprovements(outerObj, storageSuffix) {
    let storageKey = 'HDLmImprovements' + storageSuffix;
    if (outerObj == null) {
      localStorage.removeItem(storageKey);
      return null;
    }
    outerObj = HDLmImprovements.buildOuterObject(outerObj);
    localStorage.setItem(storageKey, JSON.stringify(outerObj));
    return outerObj;
  }
  /* Save an improvements object using the File System Access API with a
     filename based on the current local date and time. */
  static async saveImprovements(outerObj) {
    if (outerObj == null)
      return null;
    let now = new Date();
    let dateStr = now.getFullYear().toString() +
                  (now.getMonth() + 1).toString().padStart(2, '0') +
                  now.getDate().toString().padStart(2, '0') + '-' +
                  now.getHours().toString().padStart(2, '0') +
                  now.getMinutes().toString().padStart(2, '0') +
                  now.getSeconds().toString().padStart(2, '0');
    let suggestedName = 'improvements-' + dateStr + '.json';
    try {
      let fileHandle = await window.showSaveFilePicker({
        suggestedName: suggestedName,
        types: [{ description: 'JSON Files', accept: { 'application/json': ['.json'] } }]
      });
      let writable = await fileHandle.createWritable();
      await writable.write(JSON.stringify(outerObj, null, 2));
      await writable.close();
    }
    catch (errorObj) {
      if (errorObj.name != 'AbortError') {
        console.error(errorObj);
        return 'An error occurred while saving the improvements file: ' + errorObj.message;
      }
    }
    return null;
  }
  /* Check whether an improvements object exists in localStorage. */
  static testIfImprovementsExist(storageSuffix) {
    let storageKey = 'HDLmImprovements' + storageSuffix;
    return localStorage.getItem(storageKey) != null;
  }
}