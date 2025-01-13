/**
 * Class for supporting proxy definitions
 *    
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following JSON data structure is used to build the editor
   for each type of proxy definition. The proxy type is used
   as the property name to obtain each set of proxy data. */
const HDLmProxyInfoData =
  {
    "inject":        { "fields":
                       [
                         {
                           "description":   "Proxy Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "companyproxyname"
                         },
                         {
                           "description":   "Proxy Definition",
                           "source":        "match",
                           "fieldtype":     "matchtext",
                           "subtype":       "editableproxydefinition"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Backend Type",
                           "source":        "backendType",
                           "fieldtype":     "protocollist",
                           "subtype":       "protocollist"
                         },
                         {
                           "description":   "Backend Server Domain Name",
                           "source":        "backendServer",
                           "fieldtype":     "iotext",
                           "subtype":       "backendserver"
                         },
                         {
                           "description":   "Secure Server Domain Name",
                           "source":        "secureServer",
                           "fieldtype":     "iotext",
                           "subtype":       "secureserver"
                         },
                         {
                           "description":   "Company Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Proxy Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "typelist"
                         }
                       ]
                     },
    "HTML":          { "fields":
                       [
                         {
                           "description":   "Proxy Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "companyproxyname"
                         },
                         {
                           "description":   "Proxy Definition",
                           "source":        "match",
                           "fieldtype":     "matchtext",
                           "subtype":       "editableproxydefinition"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Backend Type",
                           "source":        "backendType",
                           "fieldtype":     "protocollist",
                           "subtype":       "protocollist"
                         },
                         {
                           "description":   "Backend Server Domain Name",
                           "source":        "backendServer",
                           "fieldtype":     "iotext",
                           "subtype":       "backendserver"
                         },
                         {
                           "description":   "Secure Server Domain Name",
                           "source":        "secureServer",
                           "fieldtype":     "iotext",
                           "subtype":       "secureserver"
                         },
                         {
                           "description":   "Company Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Proxy Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "typelist"
                         }
                       ]
                     },
    "newcompproxy":  { "fields":
                       [
                         {
                           "description":   "Proxy Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "editablecompproxyname"
                         },
                         {
                           "description":   "Proxy Definition",
                           "source":        "match",
                           "fieldtype":     "matchtext",
                           "subtype":       "editableproxydefinition"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Backend Type",
                           "source":        "backendType",
                           "fieldtype":     "protocollist",
                           "subtype":       "editableprotocollist"
                         },
                         {
                           "description":   "Backend Server Domain Name",
                           "source":        "backendServer",
                           "fieldtype":     "iotext",
                           "subtype":       "backendserver"
                         },
                         {
                           "description":   "Secure Server Domain Name",
                           "source":        "secureServer",
                           "fieldtype":     "iotext",
                           "subtype":       "secureserver"
                         },
                         {
                           "description":   "Company Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Proxy Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableproxytypelist"
                         }
                       ]
                     }
  };
/* The next JSON object contains some name information about
   each type of proxy definition */
const HDLmProxyTypeInfo = {
  "inject": { "longname": "inject" },
  "HTML":   { "longname": "HTML" }
};
/* The HDLmProxy class is not used to create any objects. However,
   it does contain code for handling proxy definitions. */
class HDLmProxy {
  /* Build a proxy definition object from the values passed by the
     caller */
  static buildProxyObject(name, extraStr, enabled, 
                          type, backendType, backendServer, 
                          secureServer, matchStr) {
    /* Construct the new proxy definition */
    let newProxy = new HDLmMod(name, extraStr, enabled, type);
    /* Add a few additional fields */
    newProxy.backendType = backendType;
    newProxy.backendServer = backendServer;
    newProxy.comments = '';
    newProxy.match = matchStr;
    newProxy.secureServer = secureServer;
    return newProxy;
  }
  /* Get the list of proxy types supported by this code. The
     list of types is returned to the caller as an array. */
  static getProxyTypeList() {
    return Object.keys(HDLmProxyTypeInfo);
  }
  /* Return the proxy definition information to the caller */
  static get HDLmProxyInfo() {
    return HDLmProxyInfoData;
  }
}