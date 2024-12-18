/**
 * HDLmAwsUtility short summary.
 *
 * HDLmAwsUtility description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
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