/**
 * HDLmConfig short summary.
 *
 * HDLmConfig description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following data structure contains information about all 
   of the standard configuration values. The standard configuration 
   values are used in many places in the code. Note that the Java 
   code has another copy of these values. */
const HDLmConfigConstants =
  { "applicationJsonType":                 "application/json",
    "AWSCognitoAcceptEncoding":            "identity",
    "AWSCognitoApiGetUser":                "AWSCognitoIdentityProviderService.GetUser",
    "AWSCognitoApiInitiateAuth":           "AWSCognitoIdentityProviderService.InitiateAuth",
    "AWSCognitoApiRespondToAuthChallenge": "AWSCognitoIdentityProviderService.RespondToAuthChallenge",
    "AWSCognitoContentType":               "application/x-amz-json-1.1",
    "AWSCognitoHost":                      "cognito-idp.us-east-2.amazonaws.com",
    /* The user agent value below is not accurate (at all). However, AWS Cognito
       demands a user agent value and the value below actually works. */
    "AWSCognitoUserAgent":                 "Boto3/1.26.83 Python/3.9.13 Windows/10 Botocore/1.29.83",
    "buildAcceptEncoding":                 "gzip, deflate, br, zstd",
    "buildUserAgent":                      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
    "clustersMaxCount":                    "10",
    "clustersSampleSize":                  "100",
    "clustersThreshold":                   "0.10",
    "companyName":                         "example.com",
    /* The maximum age in seconds for a cookie. A positive value indicates that the cookie will 
		   expire after that many seconds have passed. Note that the value is the maximum age when 
		   the cookie will expire, not the cookie's current age. A negative value means that the 
		   cookie is not stored persistently and will be deleted when the Web browser exits. 
		   A zero value causes the cookie to be deleted. */		  
		"cookieMaxAge":                        "28800",
    "currentEnvironment":                  "prod",
    "currentEnvironmentProd":              "prod",
    "currentEnvironmentTest":              "test",
    "entriesBridgeApi":                    "bucket",
    "entriesBridgeCompanyPrefix":          "",
    "entriesBridgeContentSuffix":          "java",
    "entriesBridgeDeleteUrl":              "/io/bucket/delete/",
    "entriesBridgeInsertUrl":              "/io/bucket/insert/",
    "entriesBridgeInternetMethodSsl":      "https",
    "entriesBridgePartialPath":            "io/bucket",
    "entriesBridgePassword":               null,
    "entriesBridgeReadUrl":                "/io/bucket/search/",
    "entriesBridgeUpdateUrl":              "/io/bucket/update/",
    "entriesBridgeUseCache":               "false",
    "entriesBridgeUserid":                 null,
    "entriesDatabaseCompanyPrefix":        "",
    "entriesDatabaseContentSuffix":        "java",
    "entriesDatabaseInternetMethodSsl":    "https",
    "entriesDatabaseTableNameProd":        "main_9",
    "entriesDatabaseTableNameTest":        "test_1",
    "entriesDatabaseUseCache":             "false",
    "fetchInternetMethodNoSsl":            "http",
    "fixWebSockets":                       "true",
    "logFileName":                         "info.log",
    "logRuleMatching":                     "false",
    "openAIApiGptModel":                   "gpt-4-turbo",	
    "openAIName":                          "openai",
    "parametersAccessMethod":              "cgi-bin/get-set.py?get",
    "parametersInternetMethodNoSsl":       "http",
    "parametersUpdateMethod":              "cgi-bin/get-set.py?set",
    "parametersUrl":                       "headlamp-software.com",
    "passThroughLimit":                    "5.0",
    "phashName":                           "HDLmPHash",
    /* The port number below is hard-coded into the browser extension
       that uses WebSockets to send node identifier values to the 
       Electron JS application */
    "portNumberWebSocket":                 "8102",
    "proxyName":                           "HDLmProxy.php",
    "requestTypeName":                     "HDLmRequestType",
    /* The secret key must be exactly 16 bytes long. Apparently, AES requires this */
    "secretEncryptionKey":                 "abcd1234efgh5678",
    "serverName":                          "javaproxya.dnsalias.com",
    "serverNameProd":                      "javaproxya.dnsalias.com",
    "serverNameTest":                      "javaproxya.dnsalias.com",
    "supportHTTP2":                        "true",	
    /* The Jetty folks say that HTTP/3 is not ready for production use. We
       are going to have to wait a while for a production version of HTTP/3. */	 	
    "supportHTTP3":                        "false",	
    "urlValueName":                        "HDLmUrlValue",
    "userPoolClientAppId":                 "4aa1bqd057v64omjq84hc4pnvl",
    "userPoolId":                          "us-east-2_xTvIIRtgB",
    "userPoolName":                        "HeadlampUserPool1",
    "userPoolRegion":                      "us-east-2",
    "webpageImproverDescriptionPath":      "scalar/v1",
    "webpageImproverImprovementsPath":     "improvements",
    "webpageImproverLlmPath":              "llm",
    "webpageImproverMarkupPath":           "markup",
    "webpageImproverSessionPath":          "session",
    "webpageImproverWebpagePath":          "webpage",
    "webpageImproverPort":                 "5005",
  };
/* The following JSON data struture defines all of the fields that
   can be configured. For each field, the JSON structure gives the
   field description, the field source, and the field type. This
   set of information has not been kept up-to-date and new configuration
   field may have been added that are not described below. */
const HDLmConfigFields =
  [
    {
      "description": "Configuration Name",
      "source":      "name",
      "fieldtype":   "iotext",
      "subtype":     "editableconfigname"
    },
    {
      "description": "Comments",
      "source":      "comments",
      "fieldtype":   "comminfo",
      "subtype":     "comments"
    },
    {
      "description": "Clusters Max Count",
      "source":      "clustersMaxCount",
      "fieldtype":   "iotext",
      "subtype":     "positiveint"
    },
    {
      "description": "Clusters Sample Size",
      "source":      "clustersSampleSize",
      "fieldtype":   "iotext",
      "subtype":     "positiveint"
    },
    {
      "description": "Clusters Threshold",
      "source":      "clustersThreshold",
      "fieldtype":   "iotext",
      "subtype":     "positivefloat"
    },
    {
      "description": "Company Name",
      "source":      "companyName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Delete Bridge Entries URL",
      "source":      "deleteBridgeEntriesUrl",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Delete Database Domain Name",
      "source":      "deleteDatabaseEntriesDomainName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Entries Bridge API",
      "source":      "entriesBridgeApi",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Entries Bridge Company Prefix",
      "source":      "entriesBridgeCompanyPrefix",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptyok"
    },
    {
      "description": "Entries Bridge Content Suffix",
      "source":      "entriesBridgeContentSuffix",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Entries Bridge Internet Method",
      "source":      "entriesBridgeInternetMethodSsl",
      "fieldtype":   "protocollist",
      "subtype":     "editableprotocollist"
    },
    {
      "description": "Entries Bridge Password",
      "source":      "entriesBridgePassword",
      "fieldtype":   "iotext",
      "subtype":     "generalpassword"
    },
    {
      "description": "Entries Bridge Use Cache",
      "source":      "entriesBridgeUseCache",
      "fieldtype":   "checkbox",
      "subtype":     "checkbox"
    },
    {
      "description": "Entries Bridge Userid",
      "source":      "entriesBridgeUserid",
      "fieldtype":   "iotext",
      "subtype":     "userid"
    },
    {
      "description": "Entries Database Company Prefix",
      "source":      "entriesDatabaseCompanyPrefix",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptyok"
    },
    {
      "description": "Entries Database Content Suffix",
      "source":      "entriesDatabaseContentSuffix",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Entries Database Internet Method",
      "source":      "entriesDatabaseInternetMethodSsl",
      "fieldtype":   "protocollist",
      "subtype":     "editableprotocollist"
    },
    {
      "description": "Entries Database Table Name",
      "source":      "entriesDatabaseTableName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Entries Database Use Cache",
      "source":      "entriesDatabaseUseCache",
      "fieldtype":   "checkbox",
      "subtype":     "checkbox"
    },
    {
      "description": "Fix Web Sockets",
      "source":      "fixWebSockets",
      "fieldtype":   "checkbox",
      "subtype":     "checkbox"
    },
    {
      "description": "Insert Bridge Entries URL",
      "source":      "insertBridgeEntriesUrl",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Insert Database Domain Name",
      "source":      "insertDatabaseEntriesDomainName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    { 
      "description": "Log File Name",  
      "source":      "logFileName", 
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    { 
      "description": "Log Rule Matching",
      "source":      "logRuleMatching",
      "fieldtype":   "checkbox",
      "subtype":     "checkbox"
    },
    { 
      "description": "Parameters Access Method",
      "source":      "parametersAccessMethod",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    { 
      "description": "Parameters Internet Method", 
      "source":      "parametersInternetMethodNoSsl",  
      "fieldtype":   "protocollist",
      "subtype":     "editableprotocollist"
    },
    { 
      "description": "Parameters Update Method", 
      "source":      "parametersUpdateMethod", 
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Parameters URL",
      "source":      "parametersUrl",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Pass-through Limit",
      "source":      "passThroughLimit",
      "fieldtype":   "iotext",
      "subtype":     "positivefloat"
    },
    {
      "description": "PHash Name",
      "source":      "phashName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Port Number Web Socket",
      "source":      "portNumberWebSocket",
      "fieldtype":   "iotext",
      "subtype":     "positiveint"
    },
    {
      "description": "Proxy Name",
      "source":      "proxyName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Read Bridge Entries URL",
      "source":      "readBridgeEntriesUrl",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Read Database Domain Name",
      "source":      "readDatabaseEntriesDomainName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Server Name",
      "source":      "serverName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Support HTTP/2",
      "source":      "supportHTTP2",
      "fieldtype":   "checkbox",
      "subtype":     "checkbox"
    },
    {
      "description": "Update Bridge Entries URL",
      "source":      "updateBridgeEntriesUrl",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "Update Database Domain Name",
      "source":      "updateDatabaseEntriesDomainName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    },
    {
      "description": "URL Value Name",
      "source":      "urlValueName",
      "fieldtype":   "iotext",
      "subtype":     "iotextemptynotok"
    }
  ];
class HDLmConfig {
  /* Process the JSON configuration string returned from the server
     or created locally. Most of the actual configuration data is 
     stored in just one place, in another language, on the server.
     The server configuration data is used to build the JavaScript
     configuration data. 

     The above comment is no longer true. The standard configuration
     data is now stored locally in this routine. */
  static addConfigs(jsonStr) {
    /* Create a local configuration object from the JSON provided
       by the caller */
    let localConfigValues = JSON.parse(jsonStr);
    /* Create the configuration object, if it does not already exist */
    if (typeof HDLmConfig.HDLmConfigValues == 'undefined')
      HDLmConfig.HDLmConfigValues = {};
    /* Extract all of the keys from the local configuration object */
    let localConfigValuesKeys = Object.keys(localConfigValues);
    /* Use the keys to build the configuration object */
    for (const key of localConfigValuesKeys)
      HDLmConfig.HDLmConfigValues[key] = localConfigValues[key];
  }
  /* Build a configuration definition object from the values passed 
     by the caller */
  static buildConfigObject(name, extraStr, enabled, type) {
    /* Construct the new configuration definition. This is actually
       a modification object used to build a configuration definition. */
    let newConfig = new HDLmMod(name, extraStr, enabled, type);
    HDLmMod.addMissingFieldsModObject(newConfig, HDLmConfig.HDLmConfigInfo, 'config');
    return newConfig;
  }
  /* Get the JSON configuration string from the above config
     constants */
  static getConfigs() {
    /* Build the required Promise for return to the caller */
    let configPromise = new Promise(function (resolve, reject) {
      let resolveValue = JSON.stringify(HDLmConfigConstants);
      resolve(resolveValue);
    })
    return configPromise;
  }
  /* This routine builds a list of missing configuration values
     and gets them from the server. The configuration values are
     returned to the caller as an array of configuration objects. */ 
  static getConfigMissing() {
    /* Build the list of missing configuration names */
    let configNames = ["entriesBridgePassword", "entriesBridgeUserid"]; 
    let configCallback = (overallConfigObjs) => {
      let configObjsList = overallConfigObjs.configsList;
      /* Process each configuration object */
      for (let configObj of configObjsList)  {
        let configName = configObj["configName"];
        let configValue = configObj["configValue"];
        HDLmConfig.HDLmConfigValues[configName] = configValue;
      }
    }
    /* Get the missing configuration values from the server */
    HDLmConfig.getConfigRequest(configNames, configCallback);
  }
  /* This routine takes a list of configuration names and returns
     a list of configuration values. The configuration values are
     returned to the caller as an array of configuration objects. 
     Each object has one configuration name and one configuration
     value. */
  static getConfigRequest(configNames, configCallback) {
    /* Make sure that the set of configuration names passed 
       by the caller is an array */
    if (!Array.isArray(configNames)) {
      let errorText = `Configuration names passed to getConfigRequest method are not an array`;
      HDLmAssert(false, errorText);
    }   
    if (typeof (configNames) != 'object') {
      let errorText = `Configuration names passed to getConfigRequest method are not an object`;
      HDLmAssert(false, errorText);
    }
    /* Make sure that the callback function is a function */
    if (typeof(configCallback) != 'function') {
      let errorText = `Configuration callback function passed to getConfigRequest method is not a function`;
      HDLmAssert(false, errorText);
    }
    /* Build the required Promise for return to the caller */
    let newPromise = HDLmWebSockets.getConfigRequest(configNames);
    newPromise.then(function (response) {
      let configObjs = JSON.parse(response);     
      configCallback(configObjs);  
    }, function (error) {
      HDLmError.buildError('Error', 'Get configuration values failure', 52, error);
    });
    return;
  }
  /* Get the list of configuration types supported by this code. The
     list of types is returned to the caller as an array. Note that
     we don't have any configuration types at this time. */
  static getConfigTypeList() {
    return []; 
  }

	/* This static method returns the numeric value of a config value
		 if the config value is valid (exists) and if the config value
		 is actually a number (not a string) */
  static getNumber(configName) {
    /* Make sure the value passed by the caller is a string */
    if (typeof (configName) != 'string') {
      let errorText = `Config (${configName}) name value passed to getNumber method is not a string`;
      HDLmAssert(false, errorText);
    }
		/* Check if the config name passed by the caller is valid
		   or not. We need to cause an assert if the config name
		   passed by the caller is unknown. Note, that configuration 
       constants is checked below, rather than configuration values.
       The configuration values may not have been build at this 
       point. */
    if (!HDLmConfigConstants.hasOwnProperty(configName)) {
      let errorText = `Invalid config Name (${configName}) passed to getNumber`;
      HDLmAssert(false, errorText);
    }
		/* Get the value from the object and check if the value is a number. This 
		   method can only be used to obtain values that are actually numbers. */
    let rv = HDLmConfig.HDLmConfigValues[configName];
    if ((typeof rv) != 'number') {
      let errorText = `Value of config Name (${configName}) is not a number`;
      HDLmAssert(false, errorText);
    }
    return rv;
  }
	/* This static method returns the string value of a config value
		 if the config value is valid (exists) and if the config value
		 is actually a string (not a number) */
  static getString(configName) {
    /* Make sure the value passed by the caller is a string */
    if (typeof (configName) != 'string') {
      let errorText = `Config (${configName}) name value passed to getString method is not a string`;
      HDLmAssert(false, errorText);
    }
		/* Check if the config name passed by the caller is valid
		   or not. We need to cause an assert if the config name
		   passed by the caller is unknown. Note, that configuration 
       constants is checked below, rather than configuration values.
       The configuration values may not have been build at this 
       point. */
    if (!HDLmConfigConstants.hasOwnProperty(configName)) {
      let errorText = `Invalid config Name (${configName}) passed to getString`;
      HDLmAssert(false, errorText);
    }
		/* Get the value from the object and check if the value is a string. This 
		   method can only be used to obtain values that are actually strings. */
    let rv = HDLmConfig.HDLmConfigValues[configName];
    if ((typeof rv) != 'string') {
      let errorText = `Value of config Name (${configName}) is not a string`;
      HDLmAssert(false, errorText);
    }
    return rv;
  }
	/* This static method returns the value of a configuration name
		 if the configuration value is valid (exists) */
  static getValue(configName) {
    /* Make sure the value passed by the caller is a string */
    if (typeof (configName) != 'string') {
      let errorText = `Configuration (${configName}) name value passed to getValue method is not a string`;
      HDLmAssert(false, errorText);
    }
		/* Check if the configuration name passed by the caller is valid
		   or not. We need to cause an assert if the configuration name
		   passed by the caller is unknown. Note, that configuration 
       constants is checked below, rather than configuration values.
       The configuration values may not have been build at this 
       point. */
    if (!HDLmConfigConstants.hasOwnProperty(configName)) {
      let errorText = `Invalid configuration Name (${configName}) passed to getValue`;
      HDLmAssert(false, errorText);
    }
    /* Try to get the requested configuration value from the configuration
       constants. This is frequently possible. Check if the configuration
       constant has a value. If it does, then return the value. */
    if (HDLmConfigConstants[configName] != null) {
      return HDLmConfigConstants[configName];
    }
    /* Check if some of the configuration value are missing. If some 
       of the configuration values are missing, then request the missing 
       configuration values are requested from the server. Essentially
       we use a side-effect of this call to get the missing values from
       the server. */
    /* console.log(configName); */
    if (HDLmConfig.missingConfigRequested) {
        HDLmConfig.missingConfigRequested = false;
        HDLmConfig.getConfigMissing();
    }
		/* Get the value from the object */
    let rv = HDLmConfig.HDLmConfigValues[configName];
    return rv;
  }
  /* This static method handles configuration initialization. 
     Some secret values are obtained from the AWS Secrets Manager. 
     This code does not appear to be in use. The AWS Secrets 
     manager is not invoked by the code below. */
  static handleInitialization() {
    /* console.log('In HDLmConfig.handleInitialization'); */
  }
  /* Return the configuration definition information to the caller */
  static get HDLmConfigInfo() {
    /* Check if this routine has already been run. Use the saved 
       configuration value if possible. */
    if (HDLmConfig.HDLmConfigInfoData != null)
      return HDLmConfig.HDLmConfigInfoData;
    /* Get the number of configuration fields */
    let configFieldsLength = HDLmConfigFields.length;
    let field = {};
    /* Create a few arrays for field definitions */
    let configArray = [];
    let newConfigArray = [];
    /* Add each field to the field arrays */
    for (let i = 0; i < configFieldsLength; i++) {
      field.description = HDLmConfigFields[i].description;
      field.source = HDLmConfigFields[i].source;
      /* Get the field type and check if it is actually two values */
      let fieldTypeConfig;
      let fieldTypeNewConfig;
      let fieldTypeStr = HDLmConfigFields[i].fieldtype;
      let fieldTypeSplit = fieldTypeStr.split(' ');
      if (fieldTypeSplit.length == 2) {
        fieldTypeConfig = fieldTypeSplit[0];
        fieldTypeNewConfig = fieldTypeSplit[1];
      }
      else
        fieldTypeConfig = fieldTypeNewConfig = fieldTypeStr;
      /* Get the field sub type and check if it is actually two values */
      let fieldSubTypeConfig;
      let fieldSubTypeNewConfig;
      let fieldSubTypeStr = HDLmConfigFields[i].subtype;
      let fieldSubTypeSplit = fieldSubTypeStr.split(' ');
      if (fieldSubTypeSplit.length == 2) {
        fieldSubTypeConfig = fieldSubTypeSplit[0];
        fieldSubTypeNewConfig = fieldSubTypeSplit[1];
      }
      else
        fieldSubTypeConfig = fieldSubTypeNewConfig = fieldSubTypeStr;
      /* Finish the field configuration object and store it in the array */
      field.fieldtype = fieldTypeConfig;
      field.subtype = fieldSubTypeConfig;
      configArray.push(Object.assign({}, field));
      /* Finish the field new configuration object and store it in the array */
      field.fieldtype = fieldTypeNewConfig;
      field.subtype = fieldSubTypeNewConfig;
      newConfigArray.push(Object.assign({}, field));
    }
    /* Build the configuration object */
    let configObj = {};
    configObj['fields'] = configArray
    /* Build the new configuration object */
    let newConfigObj = {};
    newConfigObj['fields'] = newConfigArray
    /* Build the configuration object that is returned to the caller */
    HDLmConfig.HDLmConfigInfoData = {};
    HDLmConfig.HDLmConfigInfoData['config'] = configObj;
    HDLmConfig.HDLmConfigInfoData['newconfig'] = newConfigObj;
    return HDLmConfig.HDLmConfigInfoData;
  }
  /* Set a configuration value to a new value. The configuration
     name is the name of the configuration value to set. The 
     configuration value is the new value to set. The first 
     value passed by the caller is the name of the configuration.
     The second value passed by the caller is the new value to
     set. */
  static setValue(configName, configValue) {
    /* Make sure the value passed by the caller is a string */
    if (typeof (configName) != 'string') {
      let errorText = `Configuration (${configName}) name value passed to setValue method is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Check if the configuration name passed by the caller is valid
       or not. We need to cause an assert if the configuration name
       passed by the caller is unknown. Note, that configuration 
       constants is checked below, rather than configuration values.
       The configuration values may not have been build at this 
       point. */
    if (!HDLmConfigConstants.hasOwnProperty(configName)) {
      let errorText = `Invalid configuration Name (${configName}) passed to setValue`;
      HDLmAssert(false, errorText);
    }
    /* Set the configuration value */
    HDLmConfig.HDLmConfigValues[configName] = configValue;
  }  
}
/* Run the initialization function */
HDLmConfig.handleInitialization();
/* The field below eventually references an object with all of the 
   configuration data. This field is initially set to null to show
   that it has not been set. */
HDLmConfig.HDLmConfigInfoData = null;
/* The field below is used to make sure that the missing configuration
   values are only requested once */
HDLmConfig.missingConfigRequested = true;