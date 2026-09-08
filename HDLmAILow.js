/**
 * HDLmAILow short summary.
 *
 * HDLmAILow description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";                               
/* The HDLmAILow class is not used to create any objects.
   However, it does contain code for using AI. */ 
class HDLmAILow {    
  /* This routine gets an improved webpage from Open Router
     Because this routine uses await, it only be used in
     an async function.
     
     This routine invokes the HDLmAI.sendWebSocketsExecuteRequest routine 
     which runs the HDLmWebSockets.executeAIRequest routine. */
  static async openRouterImproveWebpageV1(llmModelStr,
                                          currentUrl,
                                          originalHtml,
                                          suggestionText,
                                          versionAI,
                                          chatTemplates, 
                                          responseFormat,
                                          responseSchema,
                                          desiredImprovements,
                                          undesiredImprovements) { 
    /* let targetWebpageContents = await HDLmAI.getWebpage(webpageUrl); */
    /* console.log('Webpage content fetched from ' + webpageUrl); */
    /* console.log(targetWebpageContents); */
    /* Build the various prompts */
    /*
    let what1 = 'Added a top-of-page promotional bar with a free shipping threshold ($75+), a discount code (YOGA15) and a live countdown timer.';
    let what2 = 'Added a trust badges row (Free Shipping, 30-Day Returns, Trusted Since 1999, Wholesale Pricing, Secure Checkout) directly below the navigation.';
    let what3 = 'Added a social proof bar showing 4.8/5 stars from 12,000+ reviews near the hero.';
    let what4 = "Added a 'Why 500,000+ Yogis Choose YogaDirect' value-proposition section with four key benefits.";
    let desiredImprovementsLocal = what1 + ';' + what3;
    let undesiredImprovementsLocal = what2 + ';' + what4;
    */
    /* Declare and define an object that will be returned to the caller.
       This object will hold the improved webpage HTML and the list of
       improvments. It is declared here so that it can be assigned in 
       the try/catch block below and returned to the caller at the end
       of this routine. */
    let improvementContentObj = {};
    console.log('HDLmAILow.openRouterImproveWebpageV1: improvementContentObj = ' + improvementContentObj);
    let contextPrompt = HDLmAI.promptContextBothStr(chatTemplates,
                                                    'context');
    /* Build the Open Router context message */
    let contextMessage = HDLmAI.openRouterBuildMessageV1('system', contextPrompt);    
    /* let improvementBothMessage = HDLmAI.openRouterBuildMessageV1('user', contextBothPrompt); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows the Open Router key to be stored securely 
       on the server and not be exposed to the client. */
    let improvementResponse;
    let openRouterModel = 'dummyModel';           
    console.log('HDLmAILow.openRouterImproveWebpageV1: currentUrl = ' + currentUrl);              
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(chatTemplates, 
                                                            'webpageServer', 
                                                            currentUrl,
                                                            /* originalHtml, */
                                                            suggestionText, 
                                                            desiredImprovements,
                                                            undesiredImprovements); 
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV1('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV1(contextMessage,   
                                                                webpageServerMessage);                                                 
                                                                /* improvementBothMessage); */  
    /* Build the Open Router plugins array with the response healing plugin
       object in it */
    let pluginsArray = HDLmAI.openRouterBuildPluginsV1();                                                           
    /* Build the Open Router tools array with the web fetch tool 
       in it */
    let toolsArray = HDLmAI.openRouterBuildToolsV1();
    /* Build the Open Router body object with the model, 
       message list, tools array, and response schema
       in it */
    /* If we are sending the current request directly to an LLM,
       bypassing OpenRouter, the no plugins and tools are needed. */
    if (HDLmWebSockets.useOpenRouter != true) {
      pluginsArray = null;
      toolsArray = null;
    }
    /* The code below removes the plugins array in all cases. 
       The plugins array can only be used with Open Router. */
    if (1 == 2)
      pluginsArray = null;
    let bodyServerObj = HDLmAI.openRouterBuildBodyV1(openRouterModel, 
                                                     messageServerList, 
                                                     pluginsArray,
                                                     toolsArray,
                                                     responseSchema);
    if (1 == 1) {
      /*
      bodyServerObj['max_completion_tokens'] = 1000;
      bodyServerObj['max_tokens'] = 1000;
      */
      improvementResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyServerObj, 
                                                                      llmModelStr, 
                                                                      versionAI);      
    }
    /* Return the webpage improvement response from the caller */
    let improvementObj; 
    try {
      /* Parse the improvement response */
      /* HDLmUtility.saveUtf8Blob('ImprovementResponse', improvementResponse); */
      improvementObj = JSON.parse(improvementResponse);  
      console.log('HDLmAILow.openRouterImproveWebpageV1: improvementContentObj = ' + improvementContentObj);
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Improvement:', improvementResponse, 20);
      console.log('Error parsing Open Router improvement response: ' + error);
      let errorText = 'Error parsing Open Router improvement response: ' + error;
      console.log('HDLmAILow.openRouterImproveWebpageV1: improvementContentObj = ' + improvementContentObj);
      HDLmAssert(false, errorText);
    }
    /* Get the choices list from the improvement response */
    let improvementChoicesList = improvementObj['choices'];
    if (improvementChoicesList == null) {
      console.log('Error: No choices found in Open Router improvement response');
      let errorText = 'No choices found in Open Router improvement response';
      console.log('HDLmAILow.openRouterImproveWebpageV1: improvementContentObj = ' + improvementContentObj);
      HDLmAssert(false, errorText);
    }  
    /* get the first choice from the choices list */
    let improvementFirstChoice = improvementChoicesList[0];
    /* Get the message object from the first choice */
    let improvementMessageObj = improvementFirstChoice['message'];
    if (improvementMessageObj == null) {
      console.log('Error: Message object not built in Open Router improvement response');
      let errorText = 'Message object not built in Open Router improvement response';
      console.log('HDLmAILow.openRouterImproveWebpageV1: improvementContentObj = ' + improvementContentObj);
      HDLmAssert(false, errorText);
    }  
    /* Check for refusals in the message object */
    if (improvementMessageObj['refusal'] != null) {
      console.log('Error: Message object has refusal set in Open Router improvement response');
      improvementContentObj['refusal'] = true;
      console.log('HDLmAILow.openRouterImproveWebpageV1: returning improvementContentObj = ' + improvementContentObj);
      return improvementContentObj;
    } 
    /* Get the content from the message object. The 
       content is expected to be a JSON string that
       can be converted to an object */
    let improvementMessageContent = improvementMessageObj['content'];
    /* Try to parse the improvement content. The improvement content is 
       expected to be a JSON string that can be converted to an object. 
       The improved HTML and the list of improvements are expected to 
       be in the improvement content. */
    try {
      /* Parse the improvement content using an standard JSON parser */
      /* HDLmUtility.saveUtf8Blob('improvementMessageContent', improvementMessageContent); */
      improvementContentObj = JSON.parse(improvementMessageContent);   
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      console.log('Error parsing Open Router improvement content: ' + error);
      let errorText = 'Error parsing Open Router improvement content: ' + error;
      /* Get the length of the improvement message content */ 
      let improvementMessageContentLen = improvementMessageContent.length;  
      /* Check if the improvement message content is too long. 
         If it is, truncate it for logging purposes. */
      if (improvementMessageContentLen >= 10000)
        improvementMessageContent = improvementMessageContent.substring(0, 10000);
      HDLmUtility.logStringInParts('Content:', improvementMessageContent, 20);
      /* Display the string in Hexadecimal for debugging purposes */
      let improvementMessageContentHex = HDLmString.stringToHex(improvementMessageContent);
      HDLmUtility.logStringInParts('Content (Hex):', improvementMessageContentHex, 20);      
      HDLmAssert(false, errorText);
    }
    /* let improvementHtml = improvementContentObj['improvedHtml']; */
    /* Return the improved HTML (in an object) to the caller */
    console.log('HDLmAILow.openRouterImproveWebpageV1: returning improvementContentObj = ' + improvementContentObj);
    return improvementContentObj;
  };
  /* This routine gets an improved website from Open Router
     Because this routine uses await, it only be used in
     an async function. */
  static async openRouterImproveWebsiteV1(llmModelStr,
                                          currentUrl,
                                          suggestionText,
                                          versionAI,
                                          chatTemplates, 
                                          responseFormat,
                                          responseSchema) {    
    /* Build the context prompt */
    let contextPrompt = HDLmAI.promptContextBothStr(chatTemplates,
                                                    'context');
    /* Build the Open Router context message */
    let contextMessage = HDLmAI.openRouterBuildMessageV1('system', contextPrompt);    
    /* Declare and define a value that will be returned to the caller.
       This object will hold the improved webpage HTML and the list of
       improvments. It is declared here so that it can be assigned in 
       the try/catch block below and returned to the caller at the end
       of this routine. */
    let improvementContentObj;
    /* let improvementBothMessage = HDLmAI.openRouterBuildMessageV1('user', contextBothPrompt); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows the Open Router key to be stored securely 
       on the server and not be exposed to the client. */
    let improvementResponse;
    let openRouterModel = 'dummyModel';             
    console.log('HDLmAI.openRouterImproveWebsiteV1: currentUrl = ' + currentUrl);
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(chatTemplates, 
                                                            'webpageServer', 
                                                            currentUrl,
                                                            suggestionText); 
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV1('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV1(contextMessage,   
                                                                webpageServerMessage);                                                 
                                                                /* improvementBothMessage); */  
    /* Build the Open Router plugins array with the response healing plugin
       object in it */
    let pluginsArray = HDLmAI.openRouterBuildPluginsV1();   
    /* Build the Open Router tools array with the web fetch tool 
       in it */
    let toolsArray = HDLmAI.openRouterBuildToolsV1();
    /* Build the Open Router body object with the model, 
       message list, tools array, and response schema
       in it */
    let bodyServerObj = HDLmAI.openRouterBuildBodyV1(openRouterModel,                                                  
                                                     messageServerList,
                                                     pluginsArray,
                                                     toolsArray, 
                                                     responseSchema);
    if (1 == 1) {
      improvementResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyServerObj, 
                                                                      llmModelStr, 
                                                                      versionAI);      
    }
    /* Return the webpage improvement response from the caller */
    let improvementObj; 
    try {
      /* Parse the improvement response */    
      improvementObj = JSON.parse(improvementResponse);  
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Improvement:', improvementResponse, 20);
      console.log('Error parsing Open Router improvement response: ' + error);
      let errorText = 'Error parsing Open Router improvement response: ' + error;
      HDLmAssert(false, errorText);
    }
    /* Get the choices list from the improvement response */
    let improvementChoicesList = improvementObj['choices'];
    if (improvementChoicesList == null) {
      console.log('Error: No choices found in Open Router improvement response');
      let errorText = 'No choices found in Open Router improvement response';
      HDLmAssert(false, errorText);
    }  
    /* get the first choice from the choices list */
    let improvementFirstChoice = improvementChoicesList[0];
    /* Get the message object from the first choice */
    let improvementMessageObj = improvementFirstChoice['message'];
    if (improvementMessageObj == null) {
      console.log('Error: Message object not built in Open Router improvement response');
      let errorText = 'Message object not built in Open Router improvement response';
      HDLmAssert(false, errorText);
    }  
    /* Check for refusals in the message object */
    if (improvementMessageObj['refusal'] != null) {
      console.log('Error: Message object has refusal set in Open Router improvement response');
      let errorText = 'Message object has refusal set in Open Router improvement response';
      HDLmAssert(false, errorText);
    } 
    /* Get the content from the message object. The 
       content is expected to be a JSON string that
       can be converted to an object */
    let improvementMessageContent = improvementMessageObj['content'];
    /* Try to parse the improvement content. The improvement content is 
       expected to be a JSON string that can be converted to an object. 
       The improved HTML and the list of improvements are expected to 
       be in the improvement content. */
    try {
      /* Parse the improvement content using an standard JSON parser */     
      improvementContentObj = JSON.parse(improvementMessageContent);   
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      console.log('Error parsing Open Router improvement content: ' + error);
      let errorText = 'Error parsing Open Router improvement content: ' + error;
      /* Get the length of the improvement message content */ 
      let improvementMessageContentLen = improvementMessageContent.length;  
      /* Check if the improvement message content is too long. 
        If it is, truncate it for logging purposes. */
      if (improvementMessageContentLen >= 10000)
        improvementMessageContent = improvementMessageContent.substring(0, 10000);
      HDLmUtility.logStringInParts('Content:', improvementMessageContent, 20);
      /* Display the string in Hexadecimal for debugging purposes */
      let improvementMessageContentHex = HDLmString.stringToHex(improvementMessageContent);
      HDLmUtility.logStringInParts('Content (Hex):', improvementMessageContentHex, 20);      
      HDLmAssert(false, errorText);
    }
    /* let improvementHtml = improvementContentObj['improvedHtml']; */
    /* Return the improved HTML (in an object) to the caller */
    return improvementContentObj;
  };
}