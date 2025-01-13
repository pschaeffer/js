/**
 * HDLmAwsUtility short summary.
 *
 * HDLmAwsUtility description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* This routine is not actually in use. It turns out that it rather 
   difficult to use the AWS SDK in a browser-based application. The 
   AWS SDK is designed to run in a Node.js environment. Another 
   problem is that the calls need the AWS credentials to be set up
   in the environment. This is not a good idea for a browser-based
   application. */
/* Import a few values that we need later */ 
/*
import {BatchGetSecretValueCommand, 
        GetSecretValueCommand,
        SecretsManagerClient, 
} from "../node_modules/@aws-sdk-modified/client-secrets-manager";
*/
/* The HDLmAwsUtility class doesn't actually do anything. However,
   it does define a set of static methods that are used to run
   various AWS operations. */
class HDLmAwsUtility {
  /* Build a secret manager client for accessing secrets
     stored by the AWS Secrets Manager */
  static buildAwsSecretsManagerClient(regionName = 'us-east-2') {
    /* Create a Secrets Manager client */
    let  client = new SecretsManagerClient({
                  region: regionName, });
    return client;
  }
  /* This static method handles AWS Utility initialization */
  static handleInitialization() {
    /* console.log('In HDLmAwsUtility.handleInitialization'); */
  }
}
/* console.log('In HDLmAwsUtility.Running code'); */
/* Run the initialization function */
HDLmAwsUtility.handleInitialization();