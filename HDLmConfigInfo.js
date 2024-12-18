/**
 * HDLmConfigInfo short summary.
 *
 * HDLmConfigInfo description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
class HDLmConfigInfo {
  /* Get the JSON encoding value. The encoding value
     is returned to the caller. */
  static getApplicationJsonType() {
    return HDLmConfig.getValue('applicationJsonType');
  }
  /* Get the AWS Cognito accept encoding value. The 
     accept encoding value is returned to the caller. */
  static getAwsCognitoAcceptEncoding() {
    return HDLmConfig.getValue('AWSCognitoAcceptEncoding');
  }
  /* Get the AWS Cognito get user attributes API name. 
     This is actually a string. The string is returned 
     to the caller. */
  static getAwsCognitoApiGetUser() {
    return HDLmConfig.getValue('AWSCognitoApiGetUser');
  }
  /* Get the AWS Cognito initiate authentication API name. 
     This is actually a string. The string is returned to 
     the caller. */
  static getAwsCognitoApiInitiateAuth() {
    return HDLmConfig.getValue('AWSCognitoApiInitiateAuth');
  }
  /* Get the AWS Cognito respond to challenge API name. 
     This is actually a string. The string is returned to 
     the caller. */
  static getAwsCognitoApiRespondToAuthChallenge() {
    return HDLmConfig.getValue('AWSCognitoApiRespondToAuthChallenge');
  }
  /* Get the AWS Cognito content type value. The content 
     type value is returned to the caller. */
  static getAwsCognitoContentType() {
    return HDLmConfig.getValue('AWSCognitoContentType');
  }
  /* Get the AWS Cognito host name. This is actually a domain name.
     The domain name is returned to the caller. */
  static getAwsCognitoHost() {
    return HDLmConfig.getValue('AWSCognitoHost');
  }
  /* Get the AWS Cognito user agent value. This is actually 
     a string. The value is not correct, but does work with 
     AWS Cognito. The user agent value is returned to the 
     caller. */ 
  static getAwsCognitoUserAgent() {
    return HDLmConfig.getValue('AWSCognitoUserAgent');
  }
  /* Get the general build accept encoding value. The 
     accept encoding value is returned to the caller. */
  static getBuildAcceptEncoding() {
    return HDLmConfig.getValue('buildAcceptEncoding');
  }
  /* Get the general build user agent value. This is actually 
     a string. The value is not correct, but does work with 
     many web sites. The user agent value is returned to the 
     caller. */ 
  static getBuildUserAgent() {
    return HDLmConfig.getValue('buildUserAgent');
  }
  /* Get the standard maximum number of clusters and return
     it to the caller. The maximum number of clusters is
     always returned to the caller as a proper number, not
     a string. */
  static getClustersMaxCount() {
    return Number(HDLmConfig.getValue('clustersMaxCount')); 
  }
  /* Get the standard clusters sample size and return it to 
     the caller. The clusters sample size is always returned 
     to the caller as a proper number, not a string. */
  static getClustersSampleSize() {
    return Number(HDLmConfig.getValue('clustersSampleSize'));
  }
  /* Get the clusters threshold and return it to the caller. The 
     clusters threshold is the maximum similarity value for all 
     members of a cluster. The actual algorithm only checks the
     first member of a cluster against other possible entries. 
     So it is possible, the entries in a cluster might differ
     by more than the threshold value. The clusters threshold
     value is always returned to the caller as a proper number
     (a double-precision floating-point number), not a string. */
  static getClustersThreshold() {
    return Number(HDLmConfig.getValue('clustersThreshold'));
  }
  /* Get the current environment. The current environment will 
	   be set to values such as  "prod" or "production" or "test" 
	   (without the quotes). Other values may be added later. */
  static getCurrentEnvironment() {
    return HDLmConfig.getValue('currentEnvironment');
  }
  /* Get the current environment value used for production. This 
     value can be copied into the main current environment field. */ 
  static getCurrentEnvironmentProd() {
    return HDLmConfig.getValue('currentEnvironmentProd');
  }
  /* Get the current environment value used for testing. This 
     value can be copied into the main current environment field. */ 
  static getCurrentEnvironmentTest() {
    return HDLmConfig.getValue('currentEnvironmentTest');
  }
  /* Get the API type that is used to obtain the modifications
     using the bridge. The most basic API just accesses the bucket.
     Other APIs are more sophisticated. */
  static getEntriesBridgeApi() {
    return HDLmConfig.getValue('entriesBridgeApi');
  }
  /* Get the company prefix value that may (or may not) come 
     before the content value. If the company prefix value 
     is set, it will always be followed by an underscore that
     separates the company prefix value from the content value
     (something like 'mod' or 'proxy'). The company prefix value 
     should not start or end with an underscore. Other code will 
     supply the underscore. */
  static getEntriesBridgeCompanyPrefix() {
    return HDLmConfig.getValue('entriesBridgeCompanyPrefix');
  }
  /* Get the suffix value that follows the content value. Note
     that an underscore always separates the content value
     (something like 'mod' or 'proxy') from the suffix value,
     if the suffix value is non-blank. The suffix value should
     not start with an underscore. Other code will supply the
     underscore. */
  static getEntriesBridgeContentSuffix() {
    return HDLmConfig.getValue('entriesBridgeContentSuffix');
  }
  /* Get the URL that is used to delete from the  
     table that contains the modifications */
  static getEntriesBridgeDeleteUrl() {
    return HDLmConfig.getValue('serverName') + HDLmConfig.getValue('entriesBridgeDeleteUrl');
  }
  /* Get the URL that is used to insert into the table that
     contains the modifications */
  static getEntriesBridgeInsertUrl() {
    return HDLmConfig.getValue('serverName') + HDLmConfig.getValue('entriesBridgeInsertUrl');
  }
  /* Get the method that is used to access the table that contains
     the modifications */
  static getentriesBridgeInternetMethodSsl() {
    return HDLmConfig.getValue('entriesBridgeInternetMethodSsl');
  }
  /* Get part of the path that is used to access the table that contains
     the modifications */
  static getEntriesBridgePartialPath() {
    return HDLmConfig.getValue('entriesBridgePartialPath');
  }
  /* Return the configuration password */
  static getEntriesBridgePassword() {
    return HDLmConfig.getValue('entriesBridgePassword');
  }
  /* Get the URL that is used to access the table that contains
     the modifications */
  static getEntriesBridgeReadUrl() {
    return HDLmConfig.getValue('serverName') + HDLmConfig.getValue('entriesBridgeReadUrl');
  }
  /* Get the URL that is used to update the table that contains
     the modifications */
  static getEntriesBridgeUpdateUrl() {
    return HDLmConfig.getValue('serverName') + HDLmConfig.getValue('entriesBridgeUpdateUrl');
  }
  /* Return the bridge use cache value */
  static getEntriesBridgeUseCache() {
    return HDLmConfig.getValue('entriesBridgeUseCache');
  }
  /* Return the configuration userid */
  static getEntriesBridgeUserid() {
    return HDLmConfig.getValue('entriesBridgeUserid');
  }
  /* Get the company prefix value that may (or may not) come 
     before the content value. If the company prefix value 
     is set, it will always be followed by an underscore that
     separates the company prefix value from the content value
     (something like 'mod' or 'proxy'). The company prefix value 
     should not start or end with an underscore. Other code will 
     supply the underscore. */
  static getEntriesDatabaseCompanyPrefix() {
    return HDLmConfig.getValue('entriesDatabaseCompanyPrefix');
  }
  /* Get the suffix value that follows the content value. Note
     that an underscore always separates the content value
     (something like 'mod' or 'proxy') from the suffix value,
     if the suffix value is non-blank. The suffix value should
     not start with an underscore. Other code will supply the
     underscore. */
  static getEntriesDatabaseContentSuffix() {
    return HDLmConfig.getValue('entriesDatabaseContentSuffix');
  }
  /* Get the domain name that is used to insert into the table that
     contains the modifications */
  static getEntriesDatabaseInsertDomainName() {
    return HDLmConfig.getValue('entriesDatabaseInsertDomainName');
  }
  /* Get the method that is used to access the table that contains
     the modifications */
  static getentriesDatabaseInternetMethodSsl() {
    return HDLmConfig.getValue('entriesDatabaseInternetMethodSsl');
  }
  /* Get the table name that contains the modifications. This is the
     table that has all of the rules as separate rows. This value 
     might not be actually right if we are running against a test 
     database. Note that this value will always be correct, even 
     if we are running against a test database because we check 
     the current enviorment. */
  static getEntriesDatabaseTableName() {
    if (HDLmConfigInfo.getCurrentEnvironment() == 'prod')
      return HDLmConfig.getValue('entriesDatabaseTableNameProd');
    else
      return HDLmConfig.getValue('entriesDatabaseTableNameTest');
  }
  /* Return the database use cache value */
  static getEntriesDatabaseUseCache() {
    return HDLmConfig.getValue('entriesDatabaseUseCache');
  }
  /* Return the Internet method used by a local fetch */
  static getFetchInternetMethodNoSsl() {
    return HDLmConfig.getValue('fetchInternetMethodNoSsl');
  }
  /* Return the name of the Open AI service */
  static getOpenaiName() {
    return HDLmConfig.getValue('openaiName');
  }
  /* Get the pass-through limit value abd return it to the caller. The
     pass-through limit value determines the fraction of events that are
     treated as null events (nothing is changed). The value is treated as
     a percentage and can be a non-integer value (such as 5.5). If this
     value is set to zero, no events will be treated as null events. If
     this value is set to 10.0, then 10% of events will be treated as null
     events. If this value is set to 100.0, then all events will be treated
     as null events. */
  static getPassThroughLimit() {
    return Number(HDLmConfig.getValue('passThroughLimit'));
  }
	/* Get the name of of the perceptual hash program. The name of pHash
	   program is returned to the caller. */
  static getPHashName() {
    return HDLmConfig.getValue('phashName');
  }
	/* Get the name of of the proxy program (originally written in a different
	   language) that must be simulated by this code */
  static getProxyName() {
    return HDLmConfig.getValue('proxyName');
  } 
  /* Get the standard WebSocket server (listener) port number and
     return it to the caller. The port number is always returned 
     to the caller as a proper number, not a string. */
  static getPortNumberWebSocket() {
    return Number(HDLmConfig.getValue('portNumberWebSocket'));
  }
  /* Get the name of of the field that contains the current request type */ 
  static getRequestTypeName() {
    return HDLmConfig.getValue('requestTypeName');
  }
  /* Get the current server name used to handle POST requests
     and perhaps other things. Return the server name to the 
     caller as a string. */
  static getServerName() {
    return HDLmConfig.getValue('serverName');
  }
  /* Get the current server name value used for production. This 
     value can be copied into the main current server name field. */ 
  static getServerNameProd() {
    return HDLmConfig.getValue('serverNameProd');
  }
  /* Get the current server name value used for testing. This 
     value can be copied into the main current server name field. */ 
  static getServerNameTest() {
    return HDLmConfig.getValue('serverNameTest');
  }
  /* Get the name of of the field that contains the current URL value */
  static getUrlValueName() {
    return HDLmConfig.getValue('urlValueName');
  }
  /* Get the AWS Cognito user pool app Id. This is actually a value
     that identifies the user pool app. */
  static getUserPoolClientAppId() {
    return HDLmConfig.getValue('userPoolClientAppId');
  }
  /* Get the AWS Cognito user pool Id. This is actually a value
     that identifies the user pool. */
  static getUserPoolId() {
    return HDLmConfig.getValue('userPoolId');
  }
  /* Get the AWS Cognito user pool name. This is actually the 
     name of the user pool. */
  static getUserPoolName() {
    return HDLmConfig.getValue('userPoolName');
  }
  /* Get the AWS Cognito user pool region. This is actually the 
     region where the user pool lives. */
  static getUserPoolRegion() {
    return HDLmConfig.getValue('userPoolRegion');
  }  
  /* Return the path for Webpage-Improver description path */
  static getWebpageImproverDescriptionPath() {
    return HDLmConfig.getValue('webpageImproverDescriptionPath');
  }
  /* Return the path for Webpage-Improver improvements path */
  static getWebpageImproverImprovementsPath() {
    return HDLmConfig.getValue('webpageImproverImprovementsPath');
  }
  /* Return the path for Webpage-Improver LLM path */
  static getWebpageImproverLlmPath() {
    return HDLmConfig.getValue('webpageImproverLlmPath');
  }
  /* Return the path for Webpage-Improver markup path */
  static getWebpageImproverMarkupPath() {
    return HDLmConfig.getValue('webpageImproverMarkupPath');
  }
  /* Return the path for Webpage-Improver session path */
  static getWebpageImproverSessionPath() {
    return HDLmConfig.getValue('webpageImproverSessionPath');
  }
  /* Return the path for Webpage-Improver webpage path */
  static getWebpageImproverWebpagePath() {
    return HDLmConfig.getValue('webpageImproverWebpagePath');
  }
  /* Return the path for Webpage-Improver port number */
  static getWebpageImproverPort() {
    return HDLmConfig.getValue('webpageImproverPort');
  }
}