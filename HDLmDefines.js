/**
 * HDLmDefines short summary.
 *
 * HDLmDefines description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following data structure contains information about all 
   of the standard defines. The standard defines are used in many
   places in the code. Note that the Java code has another copy of
   these values. */ 
/* The pound signs (a character) used below in a few places are not
   really part of the final value, but mean that a search by ID should
   be used */
const HDLmDefinesConstants =
  {
    "HDLMACCESSCOOKIE":                   "HDLmAccessCookie",
    "HDLMDUMMYCOOKIE":                    "HDLmDummyCookie",
    "HDLMAPICHECKUSERNAMEPASSWORD":       "checkUsernamePassword",
    "HDLMAPICHECKLASTTIME":               "checkLastTime",
    "HDLMAPIGETUSER":                     "getUser",
    "HDLMAPISETPASSWORD":                 "setPassword",
    "HDLMAPIVERIFYCODE":                  "verifyCode",
    "HDLMBACKGROUNDCOLORHEX":             "00BFFF",
    "HDLMBACKGROUNDCOLORRGB":             "0, 191, 255", 
    "HDLMBUILDRULESJSNAME":               "HDLmBuildRulesJs",
    "HDLMBUILDRULESSETTESTOFF":           "HDLmBuildRulesSetTestOff",
    "HDLMBUILDRULESSETTESTON":            "HDLmBuildRulesSetTestOn",
    "HDLMCOMPANIESNODENAME":              "Companies",
    "HDLMCOMPANIESTYPE":                  "companies",
    "HDLMCOMPANYTYPE":                    "company",
    "HDLMCONFIGS":                        "HDLmConfigs",    
    "HDLMCURENV":                         "HDLm_Cur_Env",
    "HDLMDATANODENAME":                   "Data",
    "HDLMDATATYPE":                       "data",
    "HDLMDEBUGENABLED":                   "HDLmDebugEnabled",
    "HDLMDEFAULTMODNAME":                 "Modification",
    "HDLMDIVISIONNODENAME":               "example.com",
    "HDLMDIVISIONTYPE":                   "division",
    "HDLMDOMDOCUMENT":                    "DOMDocument",
    "HDLMDOMELEMENT":                     "DOMElement",
    "HDLMENTRYDESCRIPTIONS":              "#entryDescriptions",
    "HDLMENTRYVALUES":                    "#entryValues",
    "HDLMERRORTEXT":                      "HDLmErrorText",
    "HDLMEXPECTEDFILENAME":               "HDLmExpectedGetJsOutput.txt",
    "HDLMFANCYTREE":                      "#tree",
    "HDLMFIXEDFILENAME":                  "HDLmFixedJs.txt",
    "HDLMFONTSIZEMAX":                    300,
    "HDLMFONTSIZEMIN":                    1,
    "HDLMFORCEVALUE":                     "TCELESECROF",
    "HDLMFULLVALUENAME":                  "Value",
    "HDLMGEMPREFIX":                      "HDLmGemPrfx",
    "HDLMGETDATA":                        "HDLmGetData",
    "HDLMGETJSVALUE":                     "HDLmGetJS",
    "HDLMGRAALSYNTAXERROR":               "SyntaxError",
    "HDLMGXEPREFIX":                      "HDLmGxePrfx",
    "HDLMLEFTDEF":                        "leftDef",
    "HDLMHEIGHTMAX":                      2000,
    "HDLMHEIGHTMIN":                      1,
    "HDLMHOSTNAME":                       "HDLm_Host_Name",
	  "HDLMHOSTOS":                         "HDLm_Host_OS",	  
	  "HDLMHOSTUSERDIR":                    "HDLm_Host_UserDir",
    "HDLMHTMLFOOTER":                     "#footer",
    "HDLMHTMLHEADER":                     "#header",
    "HDLMIGNORELISTSNODENAME":            "Ignore Lists",
    "HDLMINLINELEFT":                     "#entryLeft",
    "HDLMINLINERIGHT":                    "#entryRight",
    "HDLMINVALIDNODENAME":                "Invalid",
    "HDLMINVOKEAPI":                      "HDLmInvokeApi",
    "HDLMLASTARRAYSIZE":                  100,
    "HDLMLEFTANDRIGHTPAGE":               "leftAndRightPage",
    "HDLMLOADMODNAME":                    "load",
    "HDLMLOADPAGEMODNAME":                "load page",
    "HDLMLOADPAGEMODNAMEOLD":             "load",
    "HDLMMANAGERULESBUILDCOOKIE":         "HDLmManageRulesBuildCookie",
    "HDLMMANAGERULESJSNAME":              "HDLmManageRulesJs",
    "HDLMMANAGERULESSETTESTOFF":          "HDLmManageRulesSetTestOff",
    "HDLMMANAGERULESSETTESTON":           "HDLmManageRulesSetTestOn",
    "HDLMMAXCHANGES":                     100,
    "HDLMMAXIDENTEXTLEN":                 20,
    "HDLMMAXJSONERRORLEN":                50,
    "HDLMMAXMODNODEPATHLENGTH":           5,
    "HDLMMAXPASSNODEPATHLENGTH":          7,
    "HDLMMAXPARAMETERCOUNT":              1000,
    "HDLMMODS":                           "HDLmMods",
    "HDLMNODEPATH":                       "HDLmNodePath",
    "HDLMOVERALLNODENAME":                "Overall",
    "HDLMPLUSSIGN":                       "HDLmPlusSign",
    "HDLMPOSTDATA":                       "HDLmPostData",
    "HDLMPREFIX":                         "HDLm",
    "HDLMREPORTNAMEPREFIX":               "Report",
	  "HDLMREPORTSNODENAME":                "Reports",
    "HDLMRIGHTDEF":                       "rightDef",
    "HDLMRULESNODENAME":                  "Rules",
    "HDLMRULESNODEPATHLENGTH":            7,
    "HDLMRULESTYPE":                      "rules",
    "HDLMSESSIONCLASSES":                 "HDLmSessionClasses",
    "HDLMSESSIONCOOKIE":                  "HDLmSessionCookie",
    "HDLMSESSIONDEBUGRULESENABLED":       "HDLmSessionDebugRulesEnabled",
    "HDLMSESSIONID":                      "HDLmSessionId",
    "HDLMSESSIONDEBUGNODEIDENENABLED":    "HDLmSessionDebugNodeIdenEnabled",
    "HDLMSESSIONPASSWORD":                "HDLmSessionPassword",
    "HDLMSESSIONPOSTRULETRACINGENABLED":  "HDLmSessionPostRuleTracingEnabled",
    "HDLMSESSIONRULEINFODIVISIONNAME":    "HDLmSessionRuleInfoDivisionName",
    "HDLMSESSIONRULEINFOHOSTNAME":        "HDLmSessionRuleInfoHostName",
    "HDLMSESSIONRULEINFOSITENAME":        "HDLmSessionRuleInfoSiteName",
    "HDLMSESSIONUSERNAME":                "HDLmSessionUserName",
    "HDLMSETLASTTIME":                    "setLastTime",
    "HDLMSHORTMODNAME":                   "Mod",
    "HDLMSIMULATEPROXYERROR":             "SimulateProxy Error",
	  "HDLMSIMULATEPROXYFAILURE":           "SimulateProxy Failure",
    "HDLMSITENODEPATHLENGTH":             6,
    "HDLMSITENODENAME":                   "example.com",
    "HDLMSITETYPE":                       "site",
    "HDLMSYSTEMPROD":                     "prod",
	  "HDLMSYSTEMTEST":                     "test",
	  "HDLMTIMINGSARRAYSIZE":               200,
    "HDLMTOPNODENAME":                    "Top",
    "HDLMTOPNODEPATHLENGTH":              1,
    "HDLMTOPTYPE":                        "top",
    "HDLMTREE":                           "HDLmTree",
    "HDLMTYPECOMPANIES":                  15,
	  "HDLMTYPECOMPANY":                    2,
	  "HDLMTYPECONFIG":                     6,
	  "HDLMTYPEDIVISION":                   3,
	  "HDLMTYPEIGNORE":                     9,
	  "HDLMTYPELINE":                       12,
	  "HDLMTYPELINES":                      13,
	  "HDLMTYPELIST":                       8,
	  "HDLMTYPELISTS":                      14,
	  "HDLMTYPEMOD":                        5,
	  "HDLMTYPEREPORT":                     11,
	  "HDLMTYPEREPORTS":                    10,
	  "HDLMTYPERULES":                      16,
	  "HDLMTYPESITE":                       4,
	  "HDLMTYPESTORE":                      7,
	  "HDLMTYPETOP":                        1,
    "HDLMUPDATED":                        "HDLmUpdated",
    "HDLMURLFAILEDTEXT":                  "URL failed",
	  "HDLMUSEARRAYSIZE":                   100,
    "HDLMVALIDNODENAME":                  "Valid",
    "HDLMVALUETYPE":                      "value",
    "HDLMWIDTHMAX":                       4000,
    "HDLMWIDTHMIN":                       1
  };
/* The HDLmDefines class doesn't actually do anything. However, it
   does serve to hold all of the values defined with define. */
class HDLmDefines {
  /* Add all of the defines returned from the server to the class
     as static properties of the class. Note that the defines are
     returned from the server as a JSON string. */
  static addDefines(jsonStr) {
    let jsonObj = JSON.parse(jsonStr);
    for (let [key, value] of Object.entries(jsonObj)) {
      HDLmDefines[key] = value;
    }
    /* Show that the defines have now been fully initialized */
    HDLmDefines.InitializationComplete = true;
    /* Freeze the HOLmDefines class object. This is not an instance of the
       HDLmDefines class. This is the the class object itself. The defines
       are actually added to the class object itself. */
    Object.freeze(HDLmDefines);
  }
  /* Get the JSON defines string from the above defines constants */
  static getDefines() {
    /* Build the required Promise for return to the caller */
    let definesPromise = new Promise(function (resolve, reject) {
      let resolveValue = JSON.stringify(HDLmDefinesConstants);
      resolve(resolveValue);
    })
    return definesPromise;
  }
	/* This static method returns the numeric value of a define
		 if the define name is valid (exists) and if the define
		 value is actually a number (not a string) */
  static getNumber(defineName) {
    /* Make sure the value passed by the caller is a string */
    if (typeof (defineName) != 'string') {
      let errorText = `Define (${defineName}) name value passed to getNumber method is not a string`;
      HDLmAssert(false, errorText);
    }
		/* Check if the define name passed by the caller is valid
		   or not. We need to raise an exception if the define name
		   passed by the caller is unknown. */
    if (!HDLmDefinesConstants.hasOwnProperty(defineName)) {
      let errorText = `Invalid Define Name (${defineName}) passed to getNumber`;
      HDLmAssert(false, errorText);
    }
		/* Get the value from the object and check if the value is not a number. 
       This method can only be used to obtain values that are actually numbers. */
    let rv = HDLmDefinesConstants[defineName];
    if ((typeof rv) != 'number') {
      let errorText = `Value of Define Name (${defineName}) is not a number`;
      HDLmAssert(false, errorText);
    }
    return rv;
  }
	/* This static method returns the string value of a define
		 if the define name is valid (exists) and if the define
		 value is actually a string (not a number) */
  static getString(defineName) {
    /* Make sure the value passed by the caller is a string */
    if (typeof (defineName) != 'string') {
      let errorText = `Define (${defineName}) name value passed to getString method is not a string`;
      HDLmAssert(false, errorText);
    }
		/* Check if the define name passed by the caller is valid
		   or not. We need to raise an exception if the define name
		   passed by the caller is unknown. */
    if (!HDLmDefinesConstants.hasOwnProperty(defineName)) {
      let errorText = `Invalid Define Name (${defineName}) passed to getString`;  
      HDLmAssert(false, errorText);
    }
		/* Get the value from the object and check if the value is not a string. 
       This method can only be used to obtain values that are actually strings. */
    let rv = HDLmDefinesConstants[defineName];
    if ((typeof rv) != 'string') {
      let errorText = `Value of Define Name (${defineName}) is not a string`; 
      HDLmAssert(false, errorText);
    }
    return rv;
  }
  /* Get the initialization status of the defines */
  static isInitialized() {
    return HDLmDefines.InitializationComplete;
  }
}
/* The next value is used to keep track if the defines have been initialized
   or not. Early in program startup, the defines will not have been properly
   initialized and can not be used. The flag below is used to keep trace of
   defines initialization status. */
HDLmDefines.InitializationComplete = false;