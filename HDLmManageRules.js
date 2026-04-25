/**
 * HDLmManageRules short summary.
 *
 * HDLmManageRules description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following string controls what type and version 
   of the AI code is used. If the string is set to 'OpenAINew',
   the new OpenAI code is used. If the string is set to 'OpenAIOld', 
   the old OpenAI code is used. If the string is set to 'OpenRouterV1',
   then version 1 of the Open Router code is used. If the string is set
   to 'OpenRouterV2', then version 2 of the OpenRouter code is used. 
   If the string is set to 'OpenRouterV3', then version 3 of the 
   OpenRouter code is used. If the string is set to 'OpenRouterV4',
   then version 4 of the OpenRouter code is used.*/ 
let useAIVersion;
useAIVersion = 'OpenAIOld';
useAIVersion = 'OpenAINew';
useAIVersion = 'OpenRouterV1'; 
useAIVersion = 'OpenRouterV2';
useAIVersion = 'OpenRouterV3';
useAIVersion = 'OpenRouterV4'; 
useAIVersion = 'OpenRouterV4';
/* The next integer controls the number of improvements 
   to request from the LLM */
const improvementsQuantity = 3;
/* The headings are set below. They are in this object
   so that they can be easily acccessed and changed 
   if needed. */
const headings = {
                   'actionsSection':        "Actions",
                   "pageText":              "Headlamp Rules Management",
                   "rulesSection":          "Existing and new rules",
                   "selectCompanyPrompt":   "Please select a company",
                   "suggestionSection":     "Please enter a suggestion (optional) for generating and testing rules",
                   "suggestionPrompt":      "Please enter a suggestion for the LLM (optional)",
                   "suggestionPlaceholder": "Make my site more friendly"
                 };
/* The help text is set below. They are in this object
   so that they can be easily acccessed and changed 
   if needed. */
const helpText = {
                   "suggestion": "A suggestion is a short text phrase " + 
                                 "that describes how you would like the " + 
                                 "web site to be improved. For example, " + 
                                 "you might enter 'Make my site more friendly'.",
                   "company":    "A company is an organization that provides " + 
                                 "services or products. You can select a company " + 
                                 "from the list to apply the rules to that company. " +
                                 "This field actually contains a domain name",
                   "thStatus":   "The status indicates if the rule is in production " + 
                                 "or test mode. Several more modes actually exist.",
                   "thRule":     "This field contains the actual rule name. " +
                                 "Rules have names that are unique within a company. " +
                                 "You can change the name of a rule by clicking " +
                                 "on the name and entering a new name or you can use an action.",
                   "tdStatus":   "The status indicates if the rule is in production " + 
                                 "or test mode. Several more modes actually exist.",
                   "tdStatusAll":     "The status indicates that the rule will always execute", 
                   "tdStatusAllways": "The status indicates that the rule will always execute", 
                   "tdStatusOff":     "The status indicates that the rule will never execute", 
                   "tdStatusOn":      "The status indicates that the rule will always execute", 
                   "tdStatusProd":    "The status shows that the rule is in production mode", 
                   "tdStatusTest":    "The status shows that the rule is is test mode. " +
                                      "Test mode rules only execute when the web page " +
                                      "is opened using the 'Test a rule' action. " +
                                      "Test mode rules do not affect normal users of " +
                                      "the web site.",                                   
                   "tdRule":     "This field contains the actual rule name. " +
                                 "Rules have names that are unique within a company. " +
                                 "You can change the name of a rule by clicking " +
                                 "on the name and entering a new name or you can use an action.",
                   "tdRuleText": "This field contains the actual rule name. " +
                                 "Rules have names that are unique within a company. " +
                                 "You can change the name of a rule by clicking " +
                                 "on the name and entering a new name or you can use an action."                            
                 };
/* The action in each entry is set to an empty string here. 
   Later, the action is set to a real routine. */
const actionsList = [
                      { name:   'Generate rules', 
                        action: '' },      
                      { name:   'Test a rule', 
                        action: '' },  
                      { name:   'Move rule(s) into production', 
                        action: '' },  
                      { name:   'Move rule(s) out of production', 
                        action: '' },
                      { name:   'Delete rule(s)', 
                        action: '' }, 
                      { name:   'Rename a rule', 
                        action: '' },      
                      { name:   'Show just production rules', 
                        action: '' },  
                      { name:   'Show just test rules', 
                        action: '' },  
                      { name:   'Show all rules', 
                        action: '' }, 
                      { name:   'Turn off rule(s)', 
                        action: '' }, 
                      { name:   'Undo changes', 
                        action: '' },
                      { name:   'Redo changes', 
                        action: '' },  
                  ];
/* The HDLmManageRules class doesn't actually do anything. However, it
   does define a set of static methods that are used to build/manage 
   one or more rules. No instances of this class can ever be
   created. */
class HDLmManageRules {
  /* This routine is executed when the user requests that
     rule(s) should be deleted */
  static actionDeleteRules() {
    /* console.log('In HDLmManageRules.actionDeleteRules'); */ 
    let checkRuleSelectedTrue = true;
    let checkDomainNameFalse = false;
    let errorText;
    let rulesDeletedList = [];
    let webpageDomainName;
    [errorText, webpageDomainName] = HDLmManageRules.startAnAction(checkRuleSelectedTrue,
                                                                   checkDomainNameFalse);   
    /* Check if any errors were detected */
    if (errorText != null)  
      return;   
    /* Find the rules in local storage */
    let ruleIdList = HDLmManageRules.ruleIdsList(HDLmManageRules.ruleIdsArray);
    for (let ruleIdValue of ruleIdList) {
      /* console.log(ruleIdList.length); */
      /* console.log(HDLmManageRules.ruleIdsArray.length); */
      /* Get the company number and the rule number */
      let companyNumber = ruleIdValue[0];
      let ruleNumber = ruleIdValue[1];
      /* The ruleIdsArray is updated to remove the deleted rule */
      let ruleIdsArray = HDLmManageRules.ruleIdsRemove(HDLmManageRules.ruleIdsArray,
                                                       companyNumber,
                                                       ruleNumber);
      HDLmManageRules.ruleIdsArray = ruleIdsArray;
      /* Delete the rule from local storage. The rule is not
         actually deleted. Instead it is marked as deleted. */
      let companyEntry = HDLmManageRules.getCompany(companyNumber);
      let companyRules = null;
      if (companyEntry != null)
        companyRules = companyEntry.rules;
      let deletedRule = null;
      if (Array.isArray(companyRules) == true)
        deletedRule = companyRules[ruleNumber-1];
      if (deletedRule == null ||
          deletedRule.actualRule == null) {
        HDLmManageRules.displayErrorMessage('The selected rule could not be found');
        continue;
      }
      /* Check if the rule has already been marked as deleted.
         There is no need to delete a rule more than once. 
         This check is needed to prevent a locate error on
         the host (in the Java code). */         
      if (deletedRule.hasOwnProperty('deleted') == true &&
          deletedRule.deleted == true) {
        continue;
      }
      deletedRule.deleted = true;
      /* Add the rule to the list of deleted rules */
      rulesDeletedList.push(deletedRule);
      /* Add the deleted rule to the list of deleted
         rules. This list is check later to find a bug. */
      let tempDeletedRule = {};
      tempDeletedRule = Object.assign(tempDeletedRule, deletedRule);
      HDLmManageRules.deletedRulesList.push(tempDeletedRule);
      /* Check for a duplicate rule name in the deleted rules 
         list. This is a bug check. If there are duplicate rule 
         names in the deleted rules list, this indicates a bug.
         The code below allows us to set a breakpoint and check 
         the state of the code when a duplicate rule name is found. */
      let localCount = HDLmManageRules.lookForDuplicateRuleNames(deletedRule, HDLmManageRules.deletedRulesList);
      if (localCount > 1) 
        localCount = localCount;
      /* The actual rule is one of the properties of the deletedRule
         object. */
      let deletedRuleActualRule = deletedRule.actualRule;
      /* Send the delete rule request to the server that deletes 
         it from the database. We should wait on a Promise for 
         the delete to complete. However, we don't. */
      HDLmWebSockets.sendDeleteTreeNodeRequest(deletedRuleActualRule);
    }
    /* Check if any rules were actually deleted. If rules
       were deleted, we need to add an undo / redo entry. */
    if (rulesDeletedList.length > 0)
      HDLmUnRe.addActionDelete(rulesDeletedList);
    /* Force a re-render of the rules */
    HDLmManageRules.forceReRender();
  }
  /* Generate a set of rules */
  static async actionGenerateRules() {
    /* console.log('In HDLmManageRules.actionGenerateRules'); */ 
    let checkRuleSelectedFalse = false;
    let checkDomainNameTrue = true;
    let errorText;
    let rulesGeneratedList = [];
    let webpageDomainName;
    [errorText, webpageDomainName] = HDLmManageRules.startAnAction(checkRuleSelectedFalse,
                                                                   checkDomainNameTrue);
    /* Check if any errors were detected */
    if (errorText != null)  
      return;   
    /* Build some rules for the current web page. This is actually
       an async routine, which means that invoking it, produces a
       promise. */
    if (1 == 1) {
      /* Call the web page improver to generate some rules */
      let localWebpageDomainName = HDLmManageRules.webpageDomainName;
      let localWebpageDomainNameWPrefix = HDLmUtility.addHttpsPrefixDoubleSlash(localWebpageDomainName);
      /* Check what type and version of the AI code should be used. This is controlled
         by the useAIVersion string. */
      switch (useAIVersion) {
        case 'OpenAIOld': {
          rulesGeneratedList = await HDLmManageRules.webpageImproverRunServicesOpenAIOld(HDLmManageRules.suggestionText,
                                                                                         localWebpageDomainNameWPrefix);
          break; 
        }
        case 'OpenAINew': {
          rulesGeneratedList = await HDLmManageRules.webpageImproverRunServicesOpenAINew(HDLmManageRules.suggestionText,
                                                                                         localWebpageDomainNameWPrefix);
          break; 
        }
        case 'OpenRouterV1': {
          rulesGeneratedList = await HDLmManageRules.webpageImproverRunServicesOpenRouterV1(HDLmManageRules.suggestionText,
                                                                                            localWebpageDomainNameWPrefix);
          break; 
        }
        case 'OpenRouterV2': {
          rulesGeneratedList = await HDLmManageRules.webpageImproverRunServicesOpenRouterV2(HDLmManageRules.suggestionText,
                                                                                            localWebpageDomainNameWPrefix);
          break; 
        }
        case 'OpenRouterV3': {
          rulesGeneratedList = await HDLmManageRules.webpageImproverRunServicesOpenRouterV3(HDLmManageRules.suggestionText,
                                                                                            localWebpageDomainNameWPrefix);
          break; 
        }
        case 'OpenRouterV4': {
          rulesGeneratedList = await HDLmManageRules.webpageImproverRunServicesOpenRouterV4(HDLmManageRules.suggestionText,
                                                                                            localWebpageDomainNameWPrefix);
          break; 
        }
        /* Report an error if the AI type and version did not match one 
           of the expected choices */
        default: {
          let errorString = useAIVersion;
          HDLmError.buildError('Error', 'Invalid type', 88, errorString);
          break;
        }
      }
    }
    /* The else routine is just for testing. The following code
       simulates the generation of rules. */
    else {
      /* Get an array of rule strings */
      let rulesStrArray = HDLmBuildRules.buildRulesArray();
      /* Convert the array of rule strings into an array
         of rule objects */
      let rulesArray = [];
      for (let ruleStr of rulesStrArray) {
        let rule = JSON.parse(ruleStr);
        rulesArray.push(rule);
      } 
      /* Store the test rules in the rulesGeneratedList */
      rulesGeneratedList = rulesArray;
    }
    /* At this point, we may need to add the rules created by
       the web page improver to the correct company. This is 
       only done if new rules have been created. */
    if (rulesGeneratedList.length > 0) {
      HDLmManageRules.addRulesToCompanies(rulesGeneratedList,
                                          HDLmManageRules.companiesArray);
      /* Get the company number for use later */
      let companyNumber = HDLmManageRules.getCompanyNumberFromRules(rulesGeneratedList,
                                                                    HDLmManageRules.companiesArray);
      /* Adjust the rule numbers in the rule IDs array */
      HDLmManageRules.ruleIdsArray = HDLmManageRules.ruleIdsAdjust(HDLmManageRules.ruleIdsArray, 
                                                                   companyNumber,                                                                    
                                                                   rulesGeneratedList.length);  
      /* The new rules should be sent to the server */
      HDLmManageRules.sendNewRulesToServer(rulesGeneratedList); 
      /* We need to add an undo / redo entry here */
      HDLmUnRe.addActionGenerate(rulesGeneratedList);
    }
    /* Run a timer. When the timer completes, it will
       (re)render the UI. */ 
    const maxTime = 5 * 60 * 1000;
    /* A React (re)render will be triggered after the specified timeout.
       This is done so that the newly added rules can be shown normally. */
    setTimeout(() => { console.log('ForceRender');                       
                       HDLmManageRules.forceReRender(); }, maxTime);  
    /* Force a re-render of the rules. This will cause the
       new rules to be added to correct company. */
    HDLmManageRules.forceReRender();
  }
  /* This routine is executed when the user requests that   
     rule(s) should be moved from some other status into 
     production */
  static actionMoveIntoProduction() {
    /* console.log('In HDLmManageRules.actionMoveIntoProduction'); */ 
    let checkRuleSelectedTrue = true;
    let checkDomainNameFalse = false;
    let errorText;
    let rulesMovedList = [];
    let webpageDomainName;
    [errorText, webpageDomainName] = HDLmManageRules.startAnAction(checkRuleSelectedTrue,
                                                                   checkDomainNameFalse);   
    /* Check if any errors were detected */
    if (errorText != null)  
      return; 
    /* Find the rules in local storage */      
    let ruleIdList = HDLmManageRules.ruleIdsList(HDLmManageRules.ruleIdsArray);       
    for (let ruleIdValue of ruleIdList) {
      let companyNumber = ruleIdValue[0];
      let ruleNumber = ruleIdValue[1];
      let rule = HDLmManageRules.getTreeRule(companyNumber, ruleNumber);
      if (rule == null) {
        HDLmManageRules.displayErrorMessage('The selected rule could not be found');
        continue;
      }
      /* Check if the rule is already in production */
      let localUseMode = '';
      if (rule.details.hasOwnProperty('usemode'))
        localUseMode = rule.details.usemode.toLowerCase();
      let localUseModeProd = false;
      if (localUseMode == ''       ||
          localUseMode == 'on'     ||
          localUseMode == 'all'    ||
          localUseMode == 'always' ||
        localUseMode == 'prod')
        localUseModeProd = true;
      if (localUseModeProd) {
        let ruleName = rule.details.name;
        errorText = "Rule '" + ruleName + "' is already in production";  
        HDLmManageRules.displayErrorMessage(errorText);
        continue;
        /* return; */
      }
      /* Build the rules array. This array is used below to
         find the most used use mode. */
      let rulesArray = []; 
      let companiesArray = HDLmManageRules.companiesArray; 
      let currentCompany = companiesArray[companyNumber-1]; 
      let currentCompanyRules = null;
      if (currentCompany != null)
        currentCompanyRules = currentCompany.rules;
      if (Array.isArray(currentCompanyRules) == false)
        currentCompanyRules = [];
      for (let ruleEntry of currentCompanyRules) {
        rulesArray.push(ruleEntry.actualRule);
      }
      /* Find the most used use mode. This is done by looking
         at all the rules in the current company and finding 
         the most frequently used use mode. */
      let mostUsedUseMode = '';
      if (rulesArray.length != 0) {
        /* Find the most used use mode */
        mostUsedUseMode = HDLmManageRules.findMostUsed('usemode', rulesArray);
        /* Check if the routine called above returned a nulll
           value. This can really happen. We must check for this
           case and handle a null value. */
        if (mostUsedUseMode == null) {
          mostUsedUseMode = '';
        }
        /* Check if the most used value is 'test' in some 
           form. Reset the value to 'prod' in this case. 
           This is really a bug fix. */
        if (mostUsedUseMode.toLowerCase() == 'test') 
          mostUsedUseMode = 'prod';
      }
      /* Mark the rule as being in production */
      rule.details.usemode = mostUsedUseMode;
      /* Add the rule to the list of moved into production rules */
      rulesMovedList.push(rule);      
      /* Send the updated rule to the server that puts it 
         into the database. We should wait on a Promise
         for the update to complete. However, we don't. */
      HDLmWebSockets.sendUpdateTreeNodeRequest(rule);
    }
    /* Check if any rules were actually moved. If rules
       were moved then  we need to add an undo / redo entry. */
    if (rulesMovedList.length > 0)
      HDLmUnRe.addActionProd(rulesMovedList);
    /* Force a re-render of the rules. This step is needed
       to show the change in the rules. */
    HDLmManageRules.forceReRender();
  }
  /* This routine is executed when the user requests that   
     rule(s) should be moved out of production */
  static actionMoveOutOfProduction() {
    /* console.log('In HDLmManageRules.actionMoveOutOfProduction'); */
    let checkRuleSelectedTrue = true;
    let checkDomainNameFalse = false;
    let errorText;
    /* The rulesMovedList array is used to store the rules
       that were moved out of production. Actually this 
       array is used to store pairs of values. The first 
       entry in the pair is the rule. The second entry
       in the pair is the previous use mode. */
    let rulesMovedList = [];
    let webpageDomainName;
    [errorText, webpageDomainName] = HDLmManageRules.startAnAction(checkRuleSelectedTrue,
                                                                   checkDomainNameFalse);
    /* Check if any errors were detected */
    if (errorText != null)
      return;
    /* Find the rules in local storage */
    let ruleIdList = HDLmManageRules.ruleIdsList(HDLmManageRules.ruleIdsArray);     
    for (let ruleIdValue of ruleIdList) {
      let companyNumber = ruleIdValue[0];
      let ruleNumber = ruleIdValue[1];
      let rule = HDLmManageRules.getTreeRule(companyNumber, ruleNumber);
      if (rule == null) {
        HDLmManageRules.displayErrorMessage('The selected rule could not be found');
        continue;
      }
      /* Check if the rule is already in production */
      let localUseMode = '';
      if (rule.details.hasOwnProperty('usemode'))
        localUseMode = rule.details.usemode.toLowerCase();
      let localUseModeProd = false;
      if (localUseMode == ''       ||
          localUseMode == 'on'     ||
          localUseMode == 'all'    ||
          localUseMode == 'always' ||
          localUseMode == 'prod')
        localUseModeProd = true; 
      /* Check if the rule is already out of production */ 
      if (localUseModeProd == false) {
        let ruleName = rule.details.name;
        errorText = "Rule '" + ruleName + "' is not in production";  
        HDLmManageRules.displayErrorMessage(errorText);
        continue;
        /* return; */
      }
      /* Get a copy of the use mode before it is changed */
      let previousUseMode = '';
      if (rule.details.hasOwnProperty('usemode'))
        previousUseMode = rule.details.usemode;
      /* Mark the rule as being in an off status */
      rule.details.usemode = 'off';
      /* Add the rule to the list of moved out of  production rules */
      rulesMovedList.push(rule);
      /* Also store the previous use mode. This is needed
         for the undo / redo processing. */
      rulesMovedList.push(previousUseMode);
      /* Send the updated rule to the server that puts it
         into the database. We should wait on a Promise
         for the update to complete. However, we don't. */
      HDLmWebSockets.sendUpdateTreeNodeRequest(rule);
    }
    /* Check if any rules were actually moved. If rules
       were moved, we need to add an undo / redo entry. */
    if (rulesMovedList.length > 0)
      HDLmUnRe.addActionTest(rulesMovedList);
    /* Force a re-render of the rules. This step is needed
       to show the change in the rules. */
    HDLmManageRules.forceReRender();
  }
  /* This routine is executed when the user requests that 
     changes be redone */
  static actionRedoChanges() {
    /* console.log('In HDLmManageRules.actionRedoChanges'); */
    /* Get rid of any existing error text */
    HDLmManageRules.clearErrorText()
    /* Request that the last change be redone */
    let source = 'HDLmManageRulesAction';
    HDLmUnRe.redoChange(null, null, null, source);
    /* Force a re-render of the rules */
    HDLmManageRules.forceReRender();
  }
  /* Rename a rule */
  static async actionRenameRule() {
    /* console.log('In HDLmManageRules.actionRenameRule'); */ 
    let checkRuleSelectedTrue = true;
    let checkDomainNameFalse = false;
    let errorText;
    let webpageDomainName;
    [errorText, webpageDomainName] = HDLmManageRules.startAnAction(checkRuleSelectedTrue,
                                                                   checkDomainNameFalse);
    /* Check if any errors were detected */
    if (errorText != null)  
      return;    
    /* Find the rules in local storage */
    let ruleIdList = HDLmManageRules.ruleIdsList(HDLmManageRules.ruleIdsArray);
    let ruleIdListLen = ruleIdList.length;
    if (ruleIdListLen > 1) {
      HDLmManageRules.displayErrorMessage('Select just one rule to rename');
      return;
    }
    /* Get the rule in local storage */
    let companyNumber = ruleIdList[0][0];
    let ruleNumber = ruleIdList[0][1];
     /* Try to find the old rule */
    let oldRule = HDLmManageRules.getTreeRule(companyNumber, ruleNumber);
    if (oldRule == null) {
      /* The old rule could not be found */
      let errorText = 'The old rule could not be found';
      HDLmManageRules.displayErrorMessage(errorText);
      return;
    } 
    /* Get the old rule name */
    let oldRuleName = oldRule.details.name;
    /* Get a promise that will resolve when the user has
       entered the new rule name and pressed the enter key 
       or clicked on the proceed button */
    let newRuleNamePromise = HDLmManageRules.getNewRuleName(oldRuleName);
    /* Wait for the new rule name promise to resolve */ 
    let newRuleName = await newRuleNamePromise; 
    /* Change the old rule name to the new name */
    HDLmManageRules.ruleNewName(companyNumber, 
                                ruleNumber, 
                                oldRuleName,
                                newRuleName,
                                true);
    /* Replace the action UI with the old UI */         
    let reactRoot = HDLmReactFour.getRootContainer('leftAndRightPage');
    reactRoot.render(React.createElement(HDLmManageRules.buildWebUiElement));  
    /* This call does not appear to be needed */
    if (1 == 2)  
      HDLmManageRules.buildAndSetRuleIdsValue(HDLmManageRules.stateSetFunction,
                                              HDLmManageRules.ruleIdsArray);
    /* This call does not appear to be needed */
    /* Force a re-render of the rules */
    if (1 == 2)
      HDLmManageRules.forceReRender();
  }    
  /* This routine is executed when the user requests that all 
     rules be shown */
  static actionShowAllRules() {
    /* console.log('In HDLmManageRules.actionShowAllRules'); */
    /* Get rid of any existing error text */
    HDLmManageRules.clearErrorText()
    /* Just leave if all rules are already being displayed */
    if (HDLmManageRules.displayRulesValue == null)
      return;
    /* Show that all rules should be displayed */
    HDLmUnRe.addActionShow(HDLmManageRules.displayRulesValue, null);
    HDLmManageRules.displayRulesValue = null;
    /* Force a re-render of the rules */
    HDLmManageRules.forceReRender();
  }
  /* This routine is executed when the user requests that only the
     production rules be shown */
  static actionShowProdRules() {
    /* console.log('In HDLmManageRules.actionShowProdRules'); */
    /* Get rid of any existing error text */
    HDLmManageRules.clearErrorText()
    /* Just leave if only production rules are already being displayed */
    if (HDLmManageRules.displayRulesValue == 'prod')
      return;
    /* Show that only production rules should be displayed */
    HDLmUnRe.addActionShow(HDLmManageRules.displayRulesValue, 'prod');
    HDLmManageRules.displayRulesValue = 'prod';
    /* Force a re-render of the rules */
    HDLmManageRules.forceReRender();
  }
  /* This routine is executed when the user requests that only the
     test rules be shown */
  static actionShowTestRules() {
    /* console.log('In HDLmManageRules.actionShowTestRules'); */
    /* Get rid of any existing error text */
    HDLmManageRules.clearErrorText()
    /* Just leave if only test rules are already being displayed */
    if (HDLmManageRules.displayRulesValue == 'test')
      return;
    /* Show that only test rules should be displayed */
    HDLmUnRe.addActionShow(HDLmManageRules.displayRulesValue, 'test');
    HDLmManageRules.displayRulesValue = 'test';
    /* Force a re-render of the rules */
    HDLmManageRules.forceReRender();
  }
  /* Test a rule */
  static actionTestRule() {
    /* console.log('In HDLmManageRules.actionTestRule'); */ 
    let checkRuleSelectedTrue = true;
    let checkDomainNameTrue = true;
    let errorText;
    let webpageDomainName;
    [errorText, webpageDomainName] = HDLmManageRules.startAnAction(checkRuleSelectedTrue,
                                                                   checkDomainNameTrue);
    /* Check if any errors were detected */
    if (errorText != null)  
      return;    
    /* Find the rules in local storage */
    let ruleIdList = HDLmManageRules.ruleIdsList(HDLmManageRules.ruleIdsArray);
    let ruleIdListLen = ruleIdList.length;
    if (ruleIdListLen > 1) {
      HDLmManageRules.displayErrorMessage('Select just one rule to test');
      return;
    }
    /* Get the rule in local storage */
    let companyNumber = ruleIdList[0][0];
    let ruleNumber = ruleIdList[0][1];
    /* console.log(companyNumber, ruleNumber); */
    /* Turn almost all of the rules off, except for the
       rule specified by the caller. Note that only test
       mode rules are changed. Production mode rules are
       ignored. */
    let companyRulesStr = HDLmManageRules.setRulesOff(companyNumber, ruleNumber);
    let sendStr = '{"nodes": ' + '[' + companyRulesStr + ']' + '}';
    /* Try to send the rules to the server */
    if (1 == 1) {
      let sendPromise = HDLmWebSockets.sendStoreTreeNodesRequest(sendStr);
      /* In a few seconds, open the web page in a new tab
         or window */
      let localWebpageDomainName = HDLmManageRules.webpageDomainName;
      let localWebpageDomainNameWPrefix = HDLmUtility.addHttpsPrefixDoubleSlash(localWebpageDomainName);
      console.log('Opening web page:', localWebpageDomainNameWPrefix);
      setTimeout(() => { window.open(localWebpageDomainNameWPrefix); }, 5000);
    }
    /* Force a re-render of the rules. This is not really
       needed if just one rule has been moved. */
    HDLmManageRules.forceReRender();    
  } 
  /* This routine is executed when the user requests that
     rule(s) should be turned off */
  static actionTurnOffRules() {
    /* console.log('In HDLmManageRules.actionTurnOffRules'); */
    let checkRuleSelectedTrue = true;
    let checkDomainNameFalse = false;
    let errorText;
    let rulesTurnedOffList = [];
    let webpageDomainName;
    [errorText, webpageDomainName] = HDLmManageRules.startAnAction(checkRuleSelectedTrue,
                                                                   checkDomainNameFalse);
    /* Check if any errors were detected */
    if (errorText != null)
      return;
    /* Find the rules in local storage */
    let ruleIdList = HDLmManageRules.ruleIdsList(HDLmManageRules.ruleIdsArray);
    for (let ruleIdValue of ruleIdList) {
      let companyNumber = ruleIdValue[0];
      let ruleNumber = ruleIdValue[1];
      let rule = HDLmManageRules.getTreeRule(companyNumber, ruleNumber);
      if (rule == null) {
        HDLmManageRules.displayErrorMessage('The selected rule could not be found');
        continue;
      }
      let previousUseMode = '';
      if (rule.details.hasOwnProperty('usemode'))
        previousUseMode = rule.details.usemode;
      let localUseMode = previousUseMode.toLowerCase();
      if (localUseMode == 'off') {
        let ruleName = rule.details.name;
        errorText = "Rule '" + ruleName + "' is already turned off";
        HDLmManageRules.displayErrorMessage(errorText);
        continue;
      }
      rule.details.usemode = 'off';
      rulesTurnedOffList.push(rule);
      rulesTurnedOffList.push(previousUseMode);
      HDLmWebSockets.sendUpdateTreeNodeRequest(rule);
    }
    /* Check if any rules were actually turned off. If rules
       were turned off, we need to add an undo / redo entry. */
    if (rulesTurnedOffList.length > 0)
      HDLmUnRe.addActionOff(rulesTurnedOffList);
    /* Force a re-render of the rules. This step is needed
       to show the change in the rules. */
    HDLmManageRules.forceReRender();
  }
  /* This routine is executed when the user requests that 
     changes be undone */
  static actionUndoChanges() {
    /* console.log('In HDLmManageRules.actionUndoChanges'); */
    /* Get rid of any existing error text */
    HDLmManageRules.clearErrorText()
    /* Request that the last change be undone */
    let source = 'HDLmManageRulesAction';
    HDLmUnRe.undoChange(null, null, null, source);
    /* Force a re-render of the rules */
    HDLmManageRules.forceReRender();
  }
  /* This routine is used to either undo or redo a change.
     The actionType is either 'undo' or 'redo'. The actionEnum
     specifies the type of change. The rulesArray contains
     the rules that were changed. */
  static actionUnRe(actionType, actionEnum, rulesArray) {
    /* console.log('In HDLmManageRules.actionUnRe'); */
    /* console.log(actionType, actionEnum, rulesArray); */
    if (actionType == 'redo') {
      switch (actionEnum) {
        /* Redo a delete rules event */
        case HDLmUnReTypes.actionDelete: { 
          for (let rule of rulesArray) {
            if (rule.hasOwnProperty('deleted'))
              delete rule.deleted;
            HDLmWebSockets.sendDeleteTreeNodeRequest(rule);
            rule.deleted = true;
          }
          break;
        } 
        /* Redo a turn off rules event */
        case HDLmUnReTypes.actionOff: {
          for (let i = 0; i < rulesArray.length; i += 2) {
            let rule = rulesArray[i];
            rule.details.usemode = 'off';
            HDLmWebSockets.sendUpdateTreeNodeRequest(rule);
          }
          break;
        }
        /* Redo a move into production rules event */
        case HDLmUnReTypes.actionProd: {
          for (let rule of rulesArray) {
            rule.details.usemode = 'prod';
            HDLmWebSockets.sendUpdateTreeNodeRequest(rule);
          }
          break;
        }
        /* Redo a move out of production rules event */
        case HDLmUnReTypes.actionTest: {
          for (let i = 0; i < rulesArray.length; i += 2) {
            let rule = rulesArray[i];
            rule.details.usemode = 'off';
            HDLmWebSockets.sendUpdateTreeNodeRequest(rule);
          }
          break;
        }  
        /* Redo a generate rules event */
        case HDLmUnReTypes.actionGenerate: {
          HDLmManageRules.addRulesToCompanies(rulesArray, HDLmManageRules.companiesArray);
          /* Get the company number for use later */
          let companyNumber = HDLmManageRules.getCompanyNumberFromRules(rulesArray,
                                                                        HDLmManageRules.companiesArray);
          /* Adjust the rule numbers in the rule IDs array */
          HDLmManageRules.ruleIdsArray = HDLmManageRules.ruleIdsAdjust(HDLmManageRules.ruleIdsArray, 
                                                                       companyNumber,                                                                    
                                                                       rulesArray.length);  
          /* The rules should be added to the server. The database
             will be updated accordingly. */
          HDLmManageRules.sendNewRulesToServer(rulesArray);                                                              
          break;
        }  
        /* Redo a select row or rows (by clicking) event */
        case HDLmUnReTypes.actionSelect: {
          let localRow = rulesArray;
          let localCompanyNumber = localRow[0];
          let localRuleNumber = localRow[1];
          let localRuleIdsArray = HDLmManageRules.ruleIdsAdd(HDLmManageRules.ruleIdsArray, 
                                                             localCompanyNumber, 
                                                             localRuleNumber);   
          HDLmManageRules.ruleIdsArray = localRuleIdsArray;                                                                
          break;
        } 
        /* Redo an un-select row or rows (by clicking) event */
        case HDLmUnReTypes.actionUnselect: {
          let localRow = rulesArray;
          let localCompanyNumber = localRow[0];
          let localRuleNumber = localRow[1];
          let localRuleIdsArray = HDLmManageRules.ruleIdsRemove(HDLmManageRules.ruleIdsArray, 
                                                                localCompanyNumber, 
                                                                localRuleNumber);   
          HDLmManageRules.ruleIdsArray = localRuleIdsArray;                                                                
          break;
        }
        /* Redo a new name for a rule event */
        case HDLmUnReTypes.actionNewName: {
          /* Get a few values that were stored in the undo / redo event */
          let localArray = rulesArray;
          let localOldRuleName = localArray[0];
          let localNewRuleName = localArray[1];          
          let localCompanyNumber = localArray[2];
          let localOldRuleNumber = localArray[3];     
          let localNewRuleNumber = localArray[4];       
          /* Change the rule name to the new name */
          HDLmManageRules.ruleNewName(localCompanyNumber, 
                                      localOldRuleNumber, 
                                      localOldRuleName,
                                      localNewRuleName,
                                      false);                                   
          break;
        }
        /* Report an error if the undo / redo change type did not match one 
           of the expected choices */
        default: {
          let errorString = actionEnum.toString();
          HDLmError.buildError('Error', 'Invalid type', 24, errorString);
          break;
        }
      }  
    }
    if (actionType == 'undo') {
      switch (actionEnum) {
        /* Undo a deleted rules event */
        case HDLmUnReTypes.actionDelete: {
          for (let rule of rulesArray) {
            if (rule.hasOwnProperty('deleted'))
              delete rule.deleted;
            /* The rule should be sent to the server */
            HDLmManageRules.sendNewRulesToServer([rule]);  
          }
          break;
        }
        /* Undo a turn off rules event */
        case HDLmUnReTypes.actionOff: {
          for (let i = 0; i < rulesArray.length; i += 2) {
            let rule = rulesArray[i];
            let previousUseMode = rulesArray[i+1];
            rule.details.usemode = previousUseMode;
            HDLmWebSockets.sendUpdateTreeNodeRequest(rule);
          }
          break;
        }
        /* Undo a move into production rules event */
        case HDLmUnReTypes.actionProd: {
          for (let rule of rulesArray) {
            rule.details.usemode = 'off';
            HDLmWebSockets.sendUpdateTreeNodeRequest(rule);
          }
          break;
        }
        /* Undo a move out of production rules event */
        case HDLmUnReTypes.actionTest: {
          for (let i = 0; i < rulesArray.length; i += 2) {
            let rule = rulesArray[i];
            let previousUseMode = rulesArray[i+1];
            rule.details.usemode = previousUseMode;
            HDLmWebSockets.sendUpdateTreeNodeRequest(rule);
          }
          break;
        }
        /* Undo a generate rules event */
        case HDLmUnReTypes.actionGenerate: {
          /* Get the company number for use later */
          let ruleCompanyName = null;
          let ruleNodePath = rulesArray[0].nodePath;
          let ruleNodePathLen = ruleNodePath.length;
          if (ruleNodePathLen >= 3) {
            ruleCompanyName = ruleNodePath[2];
          }
          /* Get the company number for use later */
          let companyNumber = HDLmManageRules.getCompanyNumberFromRules(rulesArray, 
                                                                        HDLmManageRules.companiesArray);
          /* Remove some rules from a company */ 
          HDLmManageRules.removeRulesFromCompanies(rulesArray.length, 
                                                   companyNumber,
                                                   HDLmManageRules.companiesArray);    
          /* Adjust the rule numbers in the rule IDs array */
          HDLmManageRules.ruleIdsArray = HDLmManageRules.ruleIdsAdjust(HDLmManageRules.ruleIdsArray, 
                                                                       companyNumber,                                                                    
                                                                       -rulesArray.length);  
          /* The rules should be deleted from the server. The database
             will be updated accordingly. */
          for (let rule of rulesArray) {
            HDLmWebSockets.sendDeleteTreeNodeRequest(rule);
          }                                                      
          break;
        }
        /* Undo a select row or rows (by clicking) event */
        case HDLmUnReTypes.actionSelect: {
          let localRow = rulesArray;
          let localCompanyNumber = localRow[0];
          let localRuleNumber = localRow[1];
          let localRuleIdsArray = HDLmManageRules.ruleIdsRemove(HDLmManageRules.ruleIdsArray, 
                                                                localCompanyNumber, 
                                                                localRuleNumber);   
          HDLmManageRules.ruleIdsArray = localRuleIdsArray;                                                                
          break;
        } 
        /* Undo an un-select row or rows (by clicking) event */
        case HDLmUnReTypes.actionUnselect: {
          let localRow = rulesArray;
          let localCompanyNumber = localRow[0];
          let localRuleNumber = localRow[1];
          let localRuleIdsArray = HDLmManageRules.ruleIdsAdd(HDLmManageRules.ruleIdsArray, 
                                                             localCompanyNumber, 
                                                             localRuleNumber);   
          HDLmManageRules.ruleIdsArray = localRuleIdsArray;                                                                
          break;
        }
        /* Undo a new name for a rule event */
        case HDLmUnReTypes.actionNewName: {
          /* Get a few values that were stored in the undo / redo event */
          let localArray = rulesArray;
          let localOldRuleName = localArray[0];
          let localNewRuleName = localArray[1];          
          let localCompanyNumber = localArray[2];
          let localOldRuleNumber = localArray[3];   
          let localNewRuleNumber = localArray[4];    
          /* Change the rule name back to the old name */
          HDLmManageRules.ruleNewName(localCompanyNumber, 
                                      localNewRuleNumber, 
                                      localNewRuleName,
                                      localOldRuleName,
                                      false);                                         
          break;
        }
        /* Report an error if the undo / redo change type did not match one 
           of the expected choices */
        default: {
          let errorString = actionEnum.toString();
          HDLmError.buildError('Error', 'Invalid type', 24, errorString);
          break;
        }
      }  
    }
  }
  /* This routine adds an array of rules to the correct
     company in the companies array. The rules were created
     (probably) by the generation process. */
  static addRulesToCompanies(rulesArray, companiesArray) {  
    /* console.log('In HDLmManageRules.addRulesToCompanies'); */
    /* console.log(rulesArray); */
    /* Check if either array is empty. This should never
       be the case. */
    if (rulesArray.length == 0 || 
        companiesArray.length == 0) {
      return;
    }
    /* Try to find a matching company name */
    let ruleCompanyName = null;
    let ruleNodePath = rulesArray[0].nodePath;
    let ruleNodePathLen = ruleNodePath.length;
    if (ruleNodePathLen >= 3) {
      ruleCompanyName = ruleNodePath[2];
    }
    /* Try to find the company number */
    let companyEntry = null;
    let companyNumber = 0;
    for (companyEntry of companiesArray) {
      companyNumber++;
      if (companyEntry.name == ruleCompanyName) 
        break;
    }
    /* Process all of the new rules. Note that the rules
       are processed in reverse order. This is required 
       so that the final order is correct. Note the use 
       of unshift below. */
    let rulesArrayLen = rulesArray.length;
    /* for (let i = 0; i < rulesArrayLen; i++) { */
    for (let i = (rulesArrayLen-1); i >= 0; i--) { 
      let ruleEntry = rulesArray[i];
      /* If a matching company is found, add the rule to the company's rules */
      if (ruleEntry) {
        let ruleObj = new Object();
        ruleObj['actualRule'] = ruleEntry;
        ruleObj['company'] = ruleCompanyName;
        ruleObj['identity'] = [companyNumber, 100];
        ruleObj['createdTimestamp'] = Date.now();
        companyEntry.rules.unshift(ruleObj);
      }
    }
    /* Check if we found a matching company. If so we
       need to reset all of the rule numbers. */
    if (companyEntry != null) {
      let companyRules = companyEntry.rules;
      let ruleNumber = 0;
      for (let ruleEntry of companyRules) {
        ruleNumber++;
        let ruleIdentity = [];
        ruleIdentity.push(companyNumber);
        ruleIdentity.push(ruleNumber); 
        ruleEntry.identity = ruleIdentity;
      }
    }
  }
  /* This routine adds a style that highlights a class */  
  static addStyleHighLightClass() {  
    /* console.log('In HDLmManageRules.addStyleHighLightClass'); */
    /* Build and add the requeted class */
    let styleStr = HDLmManageRules.buildStyleHighlight();
    let styleSheet = HDLmManageRules.createStyleDomEntry(); 
    HDLmManageRules.setDomEntryTextContent(styleSheet, styleStr);
    HDLmManageRules.appendDomEntryHead(styleSheet);
  }
  /* This routine adds a style for newly created rules */  
  static addStyleNewlyCreatedClass() {  
    /* console.log('In HDLmManageRules.addStyleNewlyCreatedClass'); */
    /* Build and add the requeted class */
    let styleStr = HDLmManageRules.buildStyleNewlyCreated();
    let styleSheet = HDLmManageRules.createStyleDomEntry(); 
    HDLmManageRules.setDomEntryTextContent(styleSheet, styleStr);
    HDLmManageRules.appendDomEntryHead(styleSheet);
  }
  /* This routine adds a style for a text area that is invisible */  
  static addStyleTextAreaInvisibleClass() {  
    /* console.log('In HDLmManageRules.addStyleTextAreaInvisibleClass'); */
    /* Build and add the requeted class */
    let styleStr = HDLmManageRules.buildStyleTextAreaInvisible();
    let styleSheet = HDLmManageRules.createStyleDomEntry(); 
    HDLmManageRules.setDomEntryTextContent(styleSheet, styleStr);
    HDLmManageRules.appendDomEntryHead(styleSheet);
  }
  /* This routine adds a style for a text area that is a rollover */  
  static addStyleTextAreaRolloverClass() {  
    /* console.log('In HDLmManageRules.addStyleTextAreaRolloverClass'); */
    /* Build and add the requeted class */
    let styleStr = HDLmManageRules.buildStyleTextAreaRollover();
    let styleSheet = HDLmManageRules.createStyleDomEntry(); 
    HDLmManageRules.setDomEntryTextContent(styleSheet, styleStr);
    HDLmManageRules.appendDomEntryHead(styleSheet);
  }
  /* This routine adds a style for a text area that is visible */  
  static addStyleTextAreaVisibleClass() {  
    /* console.log('In HDLmManageRules.addStyleTextAreaVisibleClass'); */
    /* Build and add the requeted class */
    let styleStr = HDLmManageRules.buildStyleTextAreaVisible();
    let styleSheet = HDLmManageRules.createStyleDomEntry(); 
    HDLmManageRules.setDomEntryTextContent(styleSheet, styleStr);
    HDLmManageRules.appendDomEntryHead(styleSheet);
  }
  /* This routine appends a DOM entry to the current 
     document.head */
  static appendDomEntryHead(domEntry) {  
    /* console.log('In HDLmManageRules.appendDomEntryHead'); */
    /* Add the DOM entry to the head */
    document.head.appendChild(domEntry);
  }
  /* This routine when called, adds an event listener to the window
     object. The event listener is used to detect when the user
     unloads the browser. */
  static beforeUnloadAdd() {
    /* console.log('In HDLmManageRules.beforeUnloadAdd'); */
    window.addEventListener('beforeunload', (event) => {
      HDLmManageRules.beforeUnloadDone(event);
    });
  }
  /* This routine is called when the user unloads the browser.
     This routine handles the before unload event. The routine
     is used to resolve the promise that was created before the
     user unloaded the browser. */
  static beforeUnloadDone(event) {
    /* console.log('In HDLmManageRules.beforeUnloadDone'); */
    /* console.log(event); */
    /* The line below has been commented out. This line is used
       to present a dialog box to the user. The dialog box is
       prevent the browser from closing. We don't want to prevent
       the browser from closing. */
    /* event.preventDefault(); */
    HDLmManageRules.beforeUnloadResolveFunction('The browser was closed');
  }    
  /* This routine builds an action React element from 
     a single action. The action object is passed to 
     this as a parameter. The React element is returned 
     to the caller. */
  static buildActionElement(actionEntry) {  
    /* console.log('In HDLmManageRules.buildActionElement'); */
    /* console.log(actionEntry); */
    /* Get the action text from the current action entry */
    let actionText = actionEntry.name; 
    let actionRoutine = actionEntry.action;
    let actionRoutineType = typeof(actionRoutine);
    /* console.log('actionRoutineType = ' + actionRoutineType); */
    if (actionRoutineType != 'function')  
      actionRoutine = null;
    /* Create the React element for just one action */  
    let actionElement = HDLmReactFour.buildManageActionElement(null, 
                                                               HDLmUtility.uniqueGenerateId(),
                                                               actionText,
                                                               actionRoutine);
    /* Return the action element to the caller */
    return actionElement;
  }
  /* This routine builds an actions React element from 
     an array of actions. The actions array is
     passed to this routine as a parameter. The React 
     element is returned to the caller. */
  static buildActionsElement(actionsArray, 
                             belowTopPixels,
                             fromLeftPixels) { 
    /* console.log('In HDLmManageRules.buildActionsElement'); */
    /* console.log(actionsArray); */
    /* Create an array to hold the action elements */
    let actionsArrayElements = [];
    /* Build a heading element */
    let headingElement = HDLmReactFour.buildTextElement('h3', null, headings["actionsSection"]);
    actionsArrayElements.push(headingElement);
    /* Set some action routines */
    actionsArray[0].action = HDLmManageRules.actionGenerateRules;
    actionsArray[1].action = HDLmManageRules.actionTestRule; 
    actionsArray[2].action = HDLmManageRules.actionMoveIntoProduction;
    actionsArray[3].action = HDLmManageRules.actionMoveOutOfProduction;
    actionsArray[4].action = HDLmManageRules.actionDeleteRules;
    actionsArray[5].action = HDLmManageRules.actionRenameRule;
    actionsArray[6].action = HDLmManageRules.actionShowProdRules;
    actionsArray[7].action = HDLmManageRules.actionShowTestRules;
    actionsArray[8].action = HDLmManageRules.actionShowAllRules;
    actionsArray[9].action = HDLmManageRules.actionTurnOffRules;
    actionsArray[10].action = HDLmManageRules.actionUndoChanges;
    actionsArray[11].action = HDLmManageRules.actionRedoChanges;
    /* Process each of the companies in the companies array */
    for (let actionEntry of actionsArray) {
      /* Create a React element for the current action */
      let actionElement = HDLmManageRules.buildActionElement(actionEntry); 
      /* Add the new element to the array of action elements */
      actionsArrayElements.push(actionElement);              
    }
    /* Create the React element that hold all of
       the action elements */  
    let actionsElement = HDLmReactFour.buildManageActionsElement(null, 
                                                                 belowTopPixels,
                                                                 fromLeftPixels,
                                                                 actionsArrayElements);
    /* Return the actions element to the caller */
    return actionsElement;
  }
  /* This routine is passed a function for updating the compoent
     state and a rule IDs array (which might be a null value).
     The component state is updated with the rule IDs array. 
     This will probably force React to (re)render the component. */      
  static buildAndSetRuleIdsValue(setStateFunction, ruleIdsArray) {
    /* console.log('In HDLmManageRules.buildAndSetRuleIdsValue'); */
    /* console.log(setStateFunction, ruleIdsArray); */
    /* Store the rule IDs array in the component state */
    setStateFunction(ruleIdsArray); 
    /* Return the rule IDs array to the caller */
    return ruleIdsArray;
  }
  /* This routine builds a companies React element from 
     an array of companies. The companies array is
     passed to this routine as a parameter. The React 
     element is returned to the caller. */
  static buildCompaniesElement(companiesArray) {  
    /* console.log('In HDLmManageRules.buildCompaniesElement'); */
    /* console.log(companiesArray); */
    const [selectedRuleIds, setSelectedRuleIds] = React.useState(null);
    HDLmManageRules.stateSetFunction = setSelectedRuleIds;
    /* console.log('selectedRuleIds = ' + selectedRuleIds); */
    /* Create an array to hold the company elements */
    let companiesArrayElements = [];
    /* Build a heading element */
    let headingText = headings["rulesSection"];
    let headingElement = HDLmReactFour.buildTextElement('h3', null, headingText);
    companiesArrayElements.push(headingElement);
    /* Process each of the companies in the companies array */
    for (let companyEntry of companiesArray) {
      /* Get the company name from the current entry */
      let companyName = companyEntry.name; 
      if (companyName != HDLmManageRules.webpageDomainName)
        continue;
      /* Create a React element for the current company */
      let companyElement = HDLmManageRules.buildCompanyElement(companyEntry);  
      /* Add the new element to the array of company elements */
      companiesArrayElements.push(companyElement);              
    }
    /* Create the React element that hold all of
       the company elements */  
    let companiesElement = HDLmReactFour.buildManageCompaniesElement(null, 
                                                                     companiesArrayElements);
    /* Return the companies element to the caller */
    return companiesElement;
  }
  /* This routine builds a companies selectReact element from 
     an array of companies. The companies array is passed to
     this routine as a parameter. The React element is 
     returned to the caller. */
  static buildCompaniesSelectElement(companiesArray,
                                     setSelectedCompany,
                                     ignoreCheckboxesFunction = null) {  
    /* console.log('In HDLmManageRules.buildCompaniesSelectElement'); */
    /* console.log(companiesArray); */
    /* Create an array to hold the company checkbox ID values */
    let idValueArray = [];
    let onRowClick = (event) => { /* Ignore checkbox clicks when the new company input is active */
                                  if (ignoreCheckboxesFunction != null &&
                                      ignoreCheckboxesFunction() == true)
                                    return;
                                  /* Get rid of any existing error text */
                                  HDLmManageRules.clearErrorText();
                                  let fieldId = event.target.id;
                                  let fieldValue = event.target.value;
                                  let checkboxDomElement;
                                  /* Turn off all of the checkboxes */
                                  for (let idValue of idValueArray) {
                                    /* Skip the checkbox that was just clicked */
                                    if (idValue == fieldId)
                                      continue;
                                    /* Try to get the checkbox DOM element */
                                    checkboxDomElement = document.getElementById(idValue);
                                    if (checkboxDomElement) { 
                                      /* Turn off the checkbox */
                                      checkboxDomElement.checked = false;
                                    }
                                  }
                                  /* Get the checkbox DOM element that was just clicked */
                                  checkboxDomElement = document.getElementById(fieldId);
                                  let checkboxName = checkboxDomElement.name;
                                  /* Now that a company has been selected, pass the company
                                     name to a function that the caller provided */
                                  setSelectedCompany(checkboxName);
                                  /* In a fraction of a second, turn on the checkbox 
                                     that was just clicked */
                                  setTimeout(() => { checkboxDomElement = document.getElementById(fieldId);
                                                     if (checkboxDomElement)
                                                       checkboxDomElement.checked = true; }, 100);                               
                                }
    /* Create an array to hold the company elements */
    let companiesArrayElements = [];
    /* Process each of the companies in the companies array */
    for (let companyEntry of companiesArray) {
      /* Build a company element for the current company */
      let companySelectElement; 
      let idValue;
      [companySelectElement, idValue] = HDLmManageRules.buildCompanySelectElement(companyEntry, onRowClick);
      /* Add the new element to the array of company elements */
      companiesArrayElements.push(companySelectElement);
      /* Add the ID value to the ID value array */
      idValueArray.push(idValue);              
    } 
    /* Create the React element that hold all of
       the company select elements */  
    let companiesSelectElement = HDLmReactFour.buildManageCompaniesElement(null, companiesArrayElements);
    /* Return the companies element to the caller */
    return companiesSelectElement;
  }
  /* This routine builds a React element for just one 
     company. The company object is passed to this 
     routine as a parameter. The React element is
     returned to the caller. */
  static buildCompanyElement(oneCompany) {
    /* console.log('In HDLmManageRules.buildCompanyElement'); */
    let companyName = oneCompany.name;
    /* Build a company name element */
    let companyNameElement = HDLmManageRules.buildCompanyNameElement(companyName);
    /* Build all of the table rows for the current company */
    let tableRowsArray = [];
    /* Build the table header row */
    let statusThElement = HDLmReactFour.buildThElement(null, 
                                                       HDLmManageRules.windowOnMouseEnter,
                                                       HDLmManageRules.windowOnMouseLeave,
                                                       'thStatus',
                                                       'Status');
    let ruleThElement = HDLmReactFour.buildThElement(null, 
                                                     HDLmManageRules.windowOnMouseEnter,
                                                     HDLmManageRules.windowOnMouseLeave,
                                                     'thRule',
                                                     'Rule name');
    let headerTrElement = HDLmReactFour.buildTrElement(null, 
                                                       [statusThElement, 
                                                        ruleThElement],
                                                       null, null, null);
    tableRowsArray.push(headerTrElement);
    /* Build a row for each rule in the current company */
    let companyRulesArray = oneCompany.rules;
    if (Array.isArray(companyRulesArray) == false)
      companyRulesArray = [];
    for (let companyRule of companyRulesArray) {
      /* get some information about the current rule */
      let companyNumber = companyRule.identity[0];
      let ruleNumber = companyRule.identity[1];
      /* Skip the current rule if it was deleted */
      if (companyRule.hasOwnProperty('deleted') == true &&
          companyRule.deleted == true)
        continue;
      /* Get some information about the current rule */
      let ruleNodepath = companyRule.actualRule.nodePath;    
      let ruleNodepathLength = ruleNodepath.length;   
      let ruleName = ruleNodepath[ruleNodepathLength - 1];  
      let ruleUseMode = companyRule.actualRule.details.usemode;
      /* Set the value to 'prod' if the use mode is not set */
      if (!ruleUseMode)
        ruleUseMode = 'prod';  
      /* Check if the current rule should be displayed or not.
         This code is used by the action that show all the rules,
         or just the test rules, or just the production rules. */
      let displayRulesValue = HDLmManageRules.displayRulesValue;
      if (displayRulesValue != null) {
        let localRuleUseMode = ruleUseMode;
        if (localRuleUseMode == 'none')
          localRuleUseMode = 'prod';
        if (localRuleUseMode != displayRulesValue)
          continue;
      }  
      /* Build a onRowClick function. The workings of this function
         require some explanation. This code checks if the current
         company number and rule number are in the rule IDs array.
         If they are, this function removes them from the array.
         If they are not, this function adds them to the array.
         The updated rule IDs array is saved in a variable and 
         also used as the component state. This force a full 
         rerender by React. */      
      let onRowClick = (event) => { /* Get rid of any existing error text */
                                    HDLmManageRules.clearErrorText();                               
                                    /* Get a few of the original values */ 
                                    let originalCompanyNumber = companyRule.identity[0];
                                    let originalRuleNumber = companyRule.identity[1];
                                    /* console.log('Original rule number = ' + originalRuleNumber); */
                                    /* console.log(originalCompanyNumber, originalRuleNumber);  */
                                    /* Check if the original values can be found in the
                                       rule IDs array. If this is correct, remove them.
                                       Otherwise, add them to rule IDs array. */
                                    let originalRuleid = HDLmManageRules.ruleIdsCheck(HDLmManageRules.ruleIdsArray,
                                                                                      originalCompanyNumber,
                                                                                      originalRuleNumber);                                                             
                                    let originalCheck = (originalRuleid != null) ? true : false;  
                                    /* Check if the original values were found */
                                    let ruleIdsArray;
                                    if (originalCheck == false ||
                                        originalCheck == null) {
                                      /* Check if the shift key is being held down. 
                                          If so, we may need to add more than one row. */
                                      let localRuleNumber = originalRuleNumber;
                                    if (event.shiftKey == true) {
                                      /* console.log(HDLmManageRules.ruleIdsArray.length); */
                                      /* console.log(HDLmManageRules.ruleIdsArray); */
                                      localRuleNumber = HDLmManageRules.ruleIdsShiftAdd(HDLmManageRules.ruleIdsArray,
                                                                                        originalCompanyNumber,
                                                                                        originalRuleNumber);
                                      /* console.log(HDLmManageRules.ruleIdsArray.length); */
                                      /* console.log(HDLmManageRules.ruleIdsArray); */
                                    }                                      
                                    ruleIdsArray = HDLmManageRules.ruleIdsAdd(HDLmManageRules.ruleIdsArray,
                                                                              originalCompanyNumber,
                                                                              localRuleNumber);
                                    HDLmUnRe.addActionSelect([originalCompanyNumber, localRuleNumber]);                                                                              
                                  }
                                  else {
                                    /* Check if the shift key is being held down. 
                                        If so, we may need to remove more than one row. */
                                    let localRuleNumber = originalRuleNumber;
                                    if (event.shiftKey == true) {                                     
                                      localRuleNumber = HDLmManageRules.ruleIdsShiftRemove(HDLmManageRules.ruleIdsArray,
                                                                                            originalCompanyNumber,
                                                                                            originalRuleNumber);                                                        
                                    }
                                    ruleIdsArray = HDLmManageRules.ruleIdsRemove(HDLmManageRules.ruleIdsArray,
                                                                                  originalCompanyNumber,
                                                                                  localRuleNumber);
                                    HDLmUnRe.addActionUnselect([originalCompanyNumber, localRuleNumber]);  
                                  }        
                                  /* console.log(ruleIdsArray); */
                                  HDLmManageRules.ruleIdsArray = ruleIdsArray;
                                  HDLmManageRules.buildAndSetRuleIdsValue(HDLmManageRules.stateSetFunction,
                                                                          ruleIdsArray);                                                                                
                                  /* console.log(HDLmManageRules.ruleIdsArray); */ };
      /* Show if the current row is selected or not */  
      let rowClassName;    
      if (HDLmManageRules.ruleIdsArray == null ||
          HDLmManageRules.ruleIdsArray.length == 0) {
        rowClassName = '';           
        /* console.log('Null values found', HDLmManageRules.ruleIdsArray); */
      }
      else {       
        /* console.log('About to check'); */
        let currentIdentity = companyRule.identity;
        let currentCompanyNumber = currentIdentity[0];
        let currentRuleNumber = currentIdentity[1];          
        let currentRuleid = HDLmManageRules.ruleIdsCheck(HDLmManageRules.ruleIdsArray,
                                                         currentCompanyNumber,
                                                         currentRuleNumber);                                              
        let currentCheck = (currentRuleid != null) ? true : false;                                                  
        /* console.log('Current check', currentCheck, HDLmManageRules.ruleIdsArray); */
        rowClassName = (currentCheck) ? 'row-highlighted' : '';
        /* console.log('rowClassName', rowClassName, currentCheck, currentRuleNumber); */
      }
      /* Check if the current row was created by this code */
      if (rowClassName == '' &&
          companyRule.hasOwnProperty('createdTimestamp')) {
        let ruleTimestamp = companyRule.createdTimestamp;
        /* Allow for the new row to be marked with a special color
           if it was created recently. The special color goes away
           after a certain amount of time */
        const maxTime = 5 * 60 * 1000;
        if ((Date.now() - ruleTimestamp) <= maxTime)
          rowClassName = 'row-newlycreated';       
      }     
      /* console.log(ruleName, ruleNumber, rowClassName); */
      /* console.log('s1'); */
      /* Buuild the status value */ 
      let ruleStatusTdElement = HDLmReactFour.buildTdElement(null, 
                                                             HDLmManageRules.windowOnMouseEnter,
                                                             HDLmManageRules.windowOnMouseLeave,
                                                             'tdStatus',
                                                             ruleUseMode);
      /* Build the rule name input text element. Note that the idValue 
         is set to a unique value. This is required so that React
         can keep track of the input text element. Also note that
         the input text element has a onKeyDown function. This
         function is used to update the rule name when the user
         presses the Enter key. */
      let idValue = companyNumber.toString().padStart(5, '0') + 
                    ruleNumber.toString().padStart(5, '0') + 
                    HDLmUtility.uniqueGenerateId();
      let ruleNameTdElement = HDLmReactFour.buildTdElement(null, 
                                                           HDLmManageRules.windowOnMouseEnter,
                                                           HDLmManageRules.windowOnMouseLeave,
                                                           'tdRule',
                                                           ruleName);
      /* Build a table data element for the rule name*/
      /* console.log(ruleName, rowClassName); */
      let ruleNameTextTdElement = HDLmReactFour.buildTdInputTextElement(null, 
                                                                        HDLmManageRules.windowOnMouseEnter,
                                                                        HDLmManageRules.windowOnMouseLeave,
                                                                        'tdRuleText',
                                                                        ruleName, 
                                                                        rowClassName, 
                                                                        HDLmManageRules.tableRowInputKeyDown,
                                                                        idValue,
                                                                        70);
      /* Build a table row for the current rule */
      let ruleTrElement = HDLmReactFour.buildTrElement(null,                                                     
                                                       [ruleStatusTdElement, 
                                                        ruleNameTextTdElement],
                                                       companyRule.identity[1],
                                                       rowClassName,
                                                       onRowClick); 
      /* console.log('After buildTrElement', rowClassName); */
      tableRowsArray.push(ruleTrElement);
    }  
    /* Build a table with all of the rules for the current company */
    let companyJustTableElement = HDLmReactFour.buildTableElement(null,
                                                                  tableRowsArray,
                                                                  20);
    let breakElement = HDLmReactFour.buildBreakElement();
    let companyTableElement = HDLmReactFour.putElementsInFragment([breakElement,
                                                                   breakElement,
                                                                   companyJustTableElement,
                                                                   breakElement]);
    /* Build a React company element for the company */
    let companyElement = HDLmReactFour.buildManageCompanyElement(null,
                                                                 companyNameElement,
                                                                 companyTableElement);
    /* Return the React company element to the caller */
    /* console.log('Build a copmany element for ' + companyName); */
    return companyElement; 
  }
  /* This routine builds a React element for the company
     name. The React element is returned to the caller. */
  static buildCompanyNameElement(companyName) {
    /* console.log('In HDLmManageRules.buildCompanyNameElement'); */
    /* Create a React element for the company name */
    let companyNameElement = 
          HDLmReactFour.buildManageCompanyNameElement(companyName,
                                                      HDLmManageRules.windowOnMouseEnter,
                                                      HDLmManageRules.windowOnMouseLeave,  
                                                      'company');
    /* Return the React element to the caller */
    return companyNameElement;
  }
  /* This routine builds a React select element for just one 
     company. The company object is passed to this routine as 
     a parameter. a React element is returned to the caller. */
  static buildCompanySelectElement(oneCompany, onClickFunction) {
    /* console.log('In HDLmManageRules.buildCompanySelectElement'); */
    let companyName = oneCompany.name;
    /* Build a company name element */
    let companyNameElement = HDLmManageRules.buildCompanyNameElement(companyName);
    /* Get a unique ID value for the current check box */
    let idValue = HDLmUtility.uniqueGenerateId();
    /* Build a check box for the current company */
    let companyCheckBoxElement = HDLmReactFour.buildCheckboxElement(null, 
                                                                    false, 
                                                                    onClickFunction, 
                                                                    idValue,
                                                                    companyName,);
    /* Build a React company element for the company */
    let companyDivElement = HDLmReactFour.putElementsInDiv(null, [companyCheckBoxElement, companyNameElement]);
    return [companyDivElement, idValue];
  }
  /* This routine gets a company number and a rule number passed
     to it. The company number and the rule number are used to 
     build a value that that is returned to the caller. The value
     returned to the caller is a list where the first entry is the
     company number and the second entry is the rule number. Both 
     values are one-base, not zero-based. */
  static buildRuleIdValue(companyNumber, ruleNumber) {
    /* console.log('In HDLmManageRules.buildRuleIdValue'); */
    /* console.log(companyNumber, ruleNumber); */
    let ruleIdList = [companyNumber, ruleNumber];
    /* Return the list to the caller */
    return ruleIdList;
  }
  /* This routine builds a style string that highlights 
     a class. The style string is returned to the caller. */   
  static buildStyleHighlight() {  
    /* console.log('In HDLmManageRules.buildStyleHighlight'); */
    /* Build the highlight style string */
    let styleStr = '.row-highlighted { background-color: #00e0e0; }';
    /* Return the CSS string to the caller */
    return styleStr;
  }
  /* This routine builds a style string for newly created
     rules. The style string is returned to the caller. */   
  static buildStyleNewlyCreated() {  
    /* console.log('In HDLmManageRules.buildStyleNewlyCreated'); */
    /* Build the highlight style string */
    let styleStr = '.row-newlycreated { background-color: #0000ff40; }';
    /* Return the CSS string to the caller */
    return styleStr;
  }
  /* This routine builds a style string for a rollover that 
     is invisible. The style string is returned to the caller. */   
  static buildStyleTextAreaInvisible() {  
    /* console.log('In HDLmManageRules.buildStyleTextAreaInvisible'); */
    /* Build the style string that makes DOM entries invisible */
    let styleStr = '.textarea-invisible { display: none; }';
    /* Return the CSS string to the caller */
    return styleStr;
  }
  /* This routine builds a initial style string for a rollover. 
     This style does not do anything, but does make some DOM 
     entries. The style string is returned to the caller. */   
  static buildStyleTextAreaRollover() {  
    /* console.log('In HDLmManageRules.buildStyleTextAreaRollover'); */ 
    let styleStr = '.textarea-rollover { }';
    /* Return the CSS string to the caller */
    return styleStr;
  }
  /* This routine builds a style string for a rollover that 
     is visible. The style string is returned to the caller. */   
  static buildStyleTextAreaVisible() {  
    /* console.log('In HDLmManageRules.buildStyleTextAreaVisible'); */
    /* Build the style string that makes DOM entries visible */
    let styleStr = '.textarea-visible { display: block; }';
    /* Return the CSS string to the caller */
    return styleStr;
  }
  /* This routine builds an overall web UI React element. 
     The overall web UI React element is built from 
     various sub-elements. The overall web UI React 
     element is returned to the caller. */
  static buildWebUiElement() {  
    /* console.log('In HDLmManageRules.buildWebUiElement'); */
    /* console.trace(); */
    /* Create the overall heading element */
    let pageText = headings["pageText"];
    let headingElement = HDLmReactFour.buildTextElement('h2', null, pageText); 
    /* Get the React element for the prompts */
    let promptElement = HDLmManageRules.getSuggestionPrompt();   
    /* Get the React element for the companies */  
    let companiesArray = HDLmManageRules.companiesArray;
    let companiesElement = HDLmManageRules.buildCompaniesElement(companiesArray);
    /* Build a text area for rollover help */
    let textAreaRolloverElement = 
          HDLmReactFour.buildTextAreaRolloverElement(6, 
                                                     50, 
                                                     ['textarea-rollover',
                                                      'textarea-invisible'
                                                     ],
                                                     HDLmManageRules.windowOnMouseEnter,
                                                     HDLmManageRules.windowOnMouseLeave,
                                                     'textareaRollover');
    /* Get the React element for the action buttons */
    let actionsElement = HDLmManageRules.buildActionsElement(actionsList,
                                                             199, 
                                                             600); 
    /* Create a break element to go between the prompt
       element and the companies element */
    let breakElement = HDLmReactFour.buildBreakElement();
    /* Create a React fragment element to hold all of
       the sub-elements */
    let tempFragment = HDLmReactFour.putElementsInFragment([headingElement, 
                                                            promptElement, 
                                                            /* breakElement, */
                                                            textAreaRolloverElement,
                                                            companiesElement, 
                                                            actionsElement
                                                           ]);
    /* Return the React fragment element to the caller */ 
    return tempFragment;
  }
  /* Check if the new company name is valid and not a duplicate */
  static checkNewCompanyName(newCompanyName, companiesArray) {
    let localCompanyName = newCompanyName;
    if (typeof(localCompanyName) != 'string')
      return ['The new company name must be a string', null];
    localCompanyName = localCompanyName.trim().toLowerCase();
    if (localCompanyName == '')
      return ['The new company name is blank', null];
    /* Normalize full URLs to host names and reject URL paths */
    if (localCompanyName.startsWith('https://') ||
        localCompanyName.startsWith('http://')) {
      try {
        let localUrlObj = new URL(localCompanyName);
        if (localUrlObj.pathname != '/' ||
            localUrlObj.search   != ''  ||
            localUrlObj.hash     != '')
          return ['The new company name must be a domain name only', null];
        localCompanyName = localUrlObj.hostname;
      }
      catch (errorObj) {
        console.error(errorObj);
        return ['The new company name is not valid', null];
      }
    }
    let localCompanyNameWPrefix = HDLmUtility.addHttpsPrefixDoubleSlash(localCompanyName);
    let errorText = HDLmManageRules.checkUrlValid(localCompanyNameWPrefix);
    if (errorText != '')
      return ['The new company name is not a valid domain name', null];
    for (let companyEntry of companiesArray) {
      if (companyEntry.name.toLowerCase() == localCompanyName)
        return ['The new company name is already in use', null];
    }
    return [null, localCompanyName];
  }
  /* Check if the server is reachable by sending a
     server-status message over HTTP GET. This routine
     returns true if the server is up and false if
     the server is down. */
  static async checkServerStatus() {
    let requestAJAXAsyncTrue = true;
    let requestType = 'URL';
    let serverName = HDLmConfigInfo.getServerName();
    let serverStatusStr = HDLmDefines.getString('HDLMSERVERSTATUS');
    let urlStr = 'https://' + serverName + '/' + serverStatusStr;
    let userid = '';
    let password = '';
    let httpType = 'get';
    let extraInfo = '';
    try {
      await HDLmAJAX.runAJAX(requestType,
                             requestAJAXAsyncTrue,
                             urlStr,
                             userid,
                             password,
                             httpType,
                             extraInfo);
      return true;
    }
    catch (errorObj) {
      console.error(errorObj);
      return false;
    }
  }
  /* Check if a URL is minimally valid. This routine returns a error
     text message if the URL is not valid. If the URL is valid, then
     this routine returns an empty string. */
  static checkUrlValid(urlStr) {
    let errorText = '';
    /* Try to build a URL object from the URL string.
       If we can't build a URL object, we must report
       an error and return. */
    try {
      let urlObj = new URL(urlStr);
    }
    catch (errorObj) {
      console.error(errorObj);
      errorText = errorObj.message;
      return errorText;
    }
    /* Get and check the host name string in the
       URL. If the host name is not valid, we can't
       do anything. */
    let hostNameStr = HDLmHtml.getHostName(urlStr);
    let typeOfHost = typeof(hostNameStr);
    if (typeOfHost == 'undefined')
      errorText = 'Host name is undefined';
    if (typeOfHost == 'null')
      errorText = 'Host name is null';
    if (typeOfHost != 'string')
      errorText = 'Host name is not a string';
    return errorText;
  }
  /* This routine clears the error text field */
  static clearErrorText() {
    /* console.log('In HDLmManageRules.clearErrorText'); */
    HDLmUtility.setErrorText('');
  }
  /* Construct a script based on the information passed
     to this routine. The new script string is returned
     to the caller.  */
  static constructScript(markupObj) {
     /* console.log('In HDLmManageRules.constructScript'); */
    let scriptValid = false;
    let stylesStr = '';
    let stylesValid = false;
    let overallValid = false;
    let overallStr = '';
    /* Extract some values from the markup object */
    let scriptStr = markupObj.scriptInsertions;
    let styleStr = markupObj.styleInsertions;
    /* Change the script in a few ways. The regular expressions
       below remove the leading and trailing 'script' tags and
       some new line characters. */
    /* console.log(scriptStr); */
    scriptStr = scriptStr.replace(/^<script((\s)+type(\s)*=(\s)*(?<quotechar>'|")text\/javascript(\k<quotechar>))?>(\n)*/g, "");
    scriptStr = scriptStr.replace(/(\n)*<\/script>/, "");
    /* Check if the JavaScript script starts and/or ends
       with a new line. If it does, remove the new line
       from the start or end or both. This code is no
       longer needed. The regular expressions above do
       the same work. */
    /*
    if (scriptStr.startsWith('\n'))
      scriptStr = scriptStr.substring(1);
    if (scriptStr.endsWith('\n')) {
      let scriptStrLen = scriptStr.length;
      if (scriptStrLen > 0)
        scriptStrLen -= 1;
      scriptStr = scriptStr.substring(0, scriptStrLen);
    }
    */
    /* Check if the script is valid JavaScript */
    scriptValid = HDLmHtml.checkJavaScriptCode(scriptStr);
    /* If the script is not valid JavaScript, log the script to the
       console. This is useful for debugging purposes. */
    if (!scriptValid)
      HDLmUtility.logStringInParts('Script', scriptStr);
    /* scriptValid = false; */
    /* Check if the script is valid JavaScript. If the script is not
       valid JavaScript, then we can't do anything. */
    if (!scriptValid)
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
    /* At this point we want to work on the 'style' insertions. The first
       step is too remove any 'style' tags and/or new line characters. */
    styleStr = styleStr.replace(/^<style>(\n)*/g, "");
    styleStr = styleStr.replace(/(\n)*<\/style>/, "");
    /* The style string may actually contain several styles. The
       first step is break up the style string into individual
       styles. The individual styles are return in an array. */
    let styleArray = HDLmHtml.splitCssString(styleStr);
    /* In some cases, the style string may be empty. In this case, we want
       to add an empty string to the style array. This is because we want
       to run the code that adds styles to the web page at least once, 
       even if there are no styles to add. This is a bug fix (as of 20126/3/17). */
    /* temp code */
    let styleArrayLen = styleArray.length;
    if (styleArrayLen == 0) {
      styleArray.push('');
      console.log('In HDLmManageRules.constructScript', ':', 'Empty style string found');
    }
    /* Process each of the styles */
    for (styleStr of styleArray) {
      /* The next step is to escape any single quotes in the style string.
         This is done because the style string is going to be assigned to
         a JavaScript variable. */
      styleStr = styleStr.replace(/\'/g, "\\'");
      /* The next step is to escape any new line characters in the style
         string. This is done because the style string is going to be
         assigned to a JavaScript variable. The inspiration for this code
         came from https://github.com/benjamn/recast/issues/421. */
      styleStr = styleStr.replace(/\n/g, "\\n");
      /* Build some more JavaScript code. This JavaScript code is used to
         add the style string to the web page. */
      let styleScript = '';
      styleScript += '\n';
      styleScript += '{\n';
      styleScript += '  var styleSheet = document.createElement("style");\n';
      styleScript += '  styleSheet.textContent = ' + "'" + styleStr + "'" + ';' + '\n';
      styleScript += '  document.head.appendChild(styleSheet);\n';
      styleScript += '}';
      /* Add the style script to the styles script string */
      stylesStr += styleScript;
    }
    /* Check if the script built to add style information
       is valid JavaScript */
    stylesValid = HDLmHtml.checkJavaScriptCode(stylesStr);
    /* If the styles string is not valid JavaScript, log the
       styles string to the console. This is useful for
       debugging purposes. */
    if (!stylesValid)
      HDLmUtility.logStringInParts('Styles', stylesStr);
    /* Check if the script built to add style information
       is valid JavaScript. If the script is not valid
       JavaScript, then we can't do anything. */
    if (!stylesValid)
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
    /* Check if the both the script string and the style string
       are valid JavaScript. If both are valid, then the overall
       JavaScript is valid. */
    if (scriptValid && stylesValid) {
      overallStr = scriptStr + stylesStr;
      overallValid = true;
    }
    /* Either the script string or the style string is not valid
       JavaScript */
    else
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
    
    /* Return the new script string to the caller */
    return [overallStr, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
  }
  /* Construct a tree node based on the information passed
     to this routine. The new tree node object is returned
     to the caller.  */
  static constructTreeNode(urlStr, improveWhy, markupObj) {
    let nodePathEntry;
    let nodeType = 'mod';
    let ruleType = 'script'
    let scriptValid = false;
    let stylesStr = '';
    let stylesValid = false;
    let overallValid = false;
    let overallStr = '';
    /* console.log('In HDLmManageRules.constructTreeNode'); */
    /* console.log(urlStr); */
    /* console.log(improveWhy); */
    /* console.log(markupObj); */
    /* Extract some values from the markup object */
    let scriptStr = markupObj.scriptInsertions;
    let styleStr = markupObj.styleInsertions;
    /* Change the script in a few ways. The regular expressions
       below remove the leading and trailing 'script' tags and
       some new line characters. */
    /* console.log(scriptStr); */
    scriptStr = scriptStr.replace(/^<script((\s)+type(\s)*=(\s)*(?<quotechar>'|")text\/javascript(\k<quotechar>))?>(\n)*/g, "");
    scriptStr = scriptStr.replace(/(\n)*<\/script>/, "");
    /* Check if the JavaScript script starts and/or ends
       with a new line. If it does, remove the new line
       from the start or end or both. This code is no
       longer needed. The regular expressions above do
       the same work. */
    /*
    if (scriptStr.startsWith('\n'))
      scriptStr = scriptStr.substring(1);
    if (scriptStr.endsWith('\n')) {
      let scriptStrLen = scriptStr.length;
      if (scriptStrLen > 0)
        scriptStrLen -= 1;
      scriptStr = scriptStr.substring(0, scriptStrLen);
    }
    */
    /* Check if the script is valid JavaScript */
    scriptValid = HDLmHtml.checkJavaScriptCode(scriptStr);
    /* If the script is not valid JavaScript, log the script to the
       console. This is useful for debugging purposes. */
    if (!scriptValid)
      HDLmUtility.logStringInParts('Script', scriptStr);
    /* scriptValid = false; */
    /* Check if the script is valid JavaScript. If the script is not
       valid JavaScript, then we can't do anything. */
    if (!scriptValid)
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
    /* At this point we want to work on the 'style' insertions. The first
       step is too remove any 'style' tags and/or new line characters. */
    styleStr = styleStr.replace(/^<style>(\n)*/g, "");
    styleStr = styleStr.replace(/(\n)*<\/style>/, "");
    /* The style string may actually contain several styles. The
       first step is break up the style string into individual
       styles. The individual styles are return in an array. */
    let styleArray = HDLmHtml.splitCssString(styleStr);
    /* In some cases, the style string may be empty. In this case, we want
       to add an empty string to the style array. This is because we want
       to run the code that adds styles to the web page at least once, 
       even if there are no styles to add. This is a bug fix (as of 20126/3/17). */
    let styleArrayLen = styleArray.length;
    /* In some cases, the style string may be empty. In this case, we want
       to report an error. The ifs below are separate deliberately. The goal 
       is to ensure that are error is reported in all case. */ 
    if (styleArrayLen == 0) 
      console.log('In HDLmManageRules.constructTreeNode', ':', 'Empty style string found');
    if (styleArrayLen == 0) {
      styleArray.push('');
    }
    /* Process each of the styles */
    for (styleStr of styleArray) {
      /* The next step is to escape any single quotes in the style string.
         This is done because the style string is going to be assigned to
         a JavaScript variable. */
      styleStr = styleStr.replace(/\'/g, "\\'");
      /* The next step is to escape any new line characters in the style
         string. This is done because the style string is going to be
         assigned to a JavaScript variable. The inspiration for this code
         came from https://github.com/benjamn/recast/issues/421. */
      styleStr = styleStr.replace(/\n/g, "\\n");
      /* Build some more JavaScript code. This JavaScript code is used to
         add the style string to the web page. */
      let styleScript = '';
      styleScript += '\n';
      styleScript += '{\n';
      styleScript += '  var styleSheet = document.createElement("style");\n';
      styleScript += '  styleSheet.textContent = ' + "'" + styleStr + "'" + ';' + '\n';
      styleScript += '  document.head.appendChild(styleSheet);\n';
      styleScript += '}';
      /* Add the style script to the styles script string */
      stylesStr += styleScript;
    }
    /* Check if the script built to add style information
       is valid JavaScript */
    stylesValid = HDLmHtml.checkJavaScriptCode(stylesStr);
    /* If the styles string is not valid JavaScript, log the
       styles string to the console. This is useful for
       debugging purposes. */
    if (!stylesValid)
      HDLmUtility.logStringInParts('Styles', stylesStr);
    /* Check if the script built to add style information
       is valid JavaScript. If the script is not valid
       JavaScript, then we can't do anything. */
    if (!stylesValid)
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
    /* Check if the both the script string and the style string
       are valid JavaScript. If both are valid, then the overall
       JavaScript is valid. */
    if (scriptValid && stylesValid) {
      overallStr = scriptStr + stylesStr;
      overallValid = true;
    }
    /* Either the script string or the style string is not valid
       JavaScript */
    else
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
    /* Build a URL object from the URL string */
    let urlObj = new URL(urlStr);
    /* Get some information from the URL object */
    let urlHostName = urlObj.hostname;
    let urlPathName = urlObj.pathname;
    /* Build the node path of the parent node (site) */
    let parentNodePath = [];
    nodePathEntry = HDLmDefines.getString('HDLMTOPNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMCOMPANIESNODENAME');
    parentNodePath.push(nodePathEntry);
    parentNodePath.push(urlHostName);
    nodePathEntry = HDLmDefines.getString('HDLMRULESNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMDIVISIONNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMSITENODENAME');
    parentNodePath.push(nodePathEntry);
    /* Build all of the intermediate levels as need be. This call will
       update the node tree (HDLmTree) in memory and won't send any new
       nodes to the database. Note that we are building a site node far 
       under the rules node. This is why we pass HDLmNodeTypes.rules as 
       the last argument to HDLmTree.buildSiteNode. */
    let updateDatabaseFalse = false;
    let updateFancyTreeFalse = false;
    let newSiteNode;
    newSiteNode = HDLmTree.buildSiteNode(parentNodePath, 
                                         updateDatabaseFalse, 
                                         updateFancyTreeFalse,
                                         HDLmNodeTypes.rules);
    /* Try to locate the parent node of the new tree node. The
       parent node is needed to get the (possible) new name
       suffix. */
    let parentTreeNode = HDLmTree.locateTreeNode(parentNodePath);
    /* Report an error if the parent node could not be found */
    if (parentTreeNode == null) {
      let nodeString = parentNodePath.toString();
      /* console.log('In HDLmManageRules.constructTreeNode', nodeString); */
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      /* This routine used to just return 'null' (without the quotes)
         to the caller. However, the caller expects a list with six
         values. */
      /* return null; */
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
    }
    /* The URL string is modified (possibly) to remove the suffix.
       We don't want the suffix (and the period before the suffix)
       to be part of the new modification name. This is the old
       approach where the modification name was derived from the
       URL. */
    let urlStringModified = HDLmString.removeFileNameSuffix(urlStr);
    if (urlStringModified == null)
      urlStringModified = urlStr;
    /* Get the new modification name */
    let removeTailsFalse = false;
    let quoteCharsSingleQuote = "'";
    let ignoreSomeSingleQuotesTrue = true;
    let newModName = HDLmMenus.buildModificationName(parentTreeNode,
                                                      urlStringModified,
                                                      ruleType,
                                                      removeTailsFalse,
                                                      quoteCharsSingleQuote,
                                                      ignoreSomeSingleQuotesTrue);
    /* Get the modification name from the why string */
    let tempWhyValue = HDLmString.getCompleteWords(improveWhy, 55);
    tempWhyValue = tempWhyValue.trim();
    newModName = HDLmMenus.buildModificationName(parentTreeNode,
                                                  tempWhyValue,
                                                  ruleType,
                                                  removeTailsFalse,
                                                  quoteCharsSingleQuote,
                                                  ignoreSomeSingleQuotesTrue);
    /* console.log('New mod name = ' + newModName); */
    /* Build the tooltip for the rule */
    let longNameStr = HDLmMod.getModificationLongName(ruleType);
    let tooltipStr = HDLmString.ucFirst(longNameStr);
    tooltipStr += ' ' + 'modification'
    /* Build the node path for the rule */
    let newRuleNodePath = parentNodePath;
    newRuleNodePath.push(newModName);
    /* Creat a new node identification object for the
       new rule. The node identification object is used
       to locate a node in the HTML. The HTML node is
       always the head node. */
    let newNodeIdenObj = new HDLmNodeIden()
    newNodeIdenObj.type = 'tag';
    newNodeIdenObj.attributes = {};
    newNodeIdenObj.attributes.tag = 'head';
    newNodeIdenObj.counts = {};
    newNodeIdenObj.counts.tag = 1;
    newNodeIdenObj.parent = {};
    newNodeIdenObj.parent.tag = 'html';
    /* Create a new rule/modification/details object */
    let newRuleObj = new HDLmMod(newModName, '', ruleType);
    newRuleObj.pathvalue = urlPathName;
    newRuleObj.comments = '';
    newRuleObj.probability = 100.0;
    newRuleObj.usemode = 'off';
    newRuleObj.cssselector = '';
    newRuleObj.xpath = '';
    newRuleObj.find = [];
    newRuleObj.nodeiden = newNodeIdenObj;
    newRuleObj.parameter = 0;
    /* newRuleObj.scripts = ['let aaa = 3;\nlet bbb = 4;']; */
    newRuleObj.scripts = [overallStr];
    newRuleObj.updated = false;
    /* Create a new tree node object */
    let treeNodeObj = new HDLmTree(nodeType, tooltipStr);
    treeNodeObj.details = newRuleObj
    treeNodeObj.type = nodeType
    treeNodeObj.nodePath = newRuleNodePath;
    /* Return the new tree node object to the caller */
    return [treeNodeObj, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
  }
  /* Construct a tree node based on the information passed
     to this routine. The new tree node object is returned
     to the caller.  */
  static constructTreeNodeFromScripts(urlStr, improveWhy, scriptsArray) {
    /* console.log('In HDLmManageRules.constructTreeNodeFromScripts'); */
    let nodePathEntry;
    let nodeType = 'mod';
    let ruleType = 'script'
    /* Build a URL object from the URL string */
    let urlObj = new URL(urlStr);
    /* Get some information from the URL object */
    let urlHostName = urlObj.hostname;
    let urlPathName = urlObj.pathname;
    /* Build the node path of the parent node (site) */
    let parentNodePath = [];
    nodePathEntry = HDLmDefines.getString('HDLMTOPNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMCOMPANIESNODENAME');
    parentNodePath.push(nodePathEntry);
    parentNodePath.push(urlHostName);
    nodePathEntry = HDLmDefines.getString('HDLMRULESNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMDIVISIONNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMSITENODENAME');
    parentNodePath.push(nodePathEntry);
    /* Build all of the intermediate levels as need be. This call will
       update the node tree (HDLmTree) in memory and won't send any new
       nodes to the database. Note that we are building a site node far 
       under the rules node. This is why we pass HDLmNodeTypes.rules as 
       the last argument to HDLmTree.buildSiteNode. */
    let updateDatabaseFalse = false;
    let updateFancyTreeFalse = false;
    let newSiteNode;
    newSiteNode = HDLmTree.buildSiteNode(parentNodePath, 
                                         updateDatabaseFalse, 
                                         updateFancyTreeFalse,
                                         HDLmNodeTypes.rules);
    /* Try to locate the parent node of the new tree node. The
       parent node is needed to get the (possible) new name
       suffix. */
    let parentTreeNode = HDLmTree.locateTreeNode(parentNodePath);
    /* Report an error if the parent node could not be found */
    if (parentTreeNode == null) {
      let nodeString = parentNodePath.toString();
      /* console.log('In HDLmManageRules.constructTreeNode', nodeString); */
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      /* This routine used to just return 'null' (without the quotes)
         to the caller. However, the caller expects a list with six
         values. */
      /* return null; */
      return [null, overallValid, scriptValid, stylesValid, scriptStr, stylesStr];
    }
    /* The URL string is modified (possibly) to remove the suffix.
       We don't want the suffix (and the period before the suffix)
       to be part of the new modification name. This is the old
       approach where the modification name was derived from the
       URL. */
    let urlStringModified = HDLmString.removeFileNameSuffix(urlStr);
    if (urlStringModified == null)
      urlStringModified = urlStr;
    /* Get the new modification name */
    let removeTailsFalse = false;
    let quoteCharsSingleQuote = "'";
    let ignoreSomeSingleQuotesTrue = true;
    let newModName = HDLmMenus.buildModificationName(parentTreeNode,
                                                     urlStringModified,
                                                     ruleType,
                                                     removeTailsFalse,
                                                     quoteCharsSingleQuote,
                                                     ignoreSomeSingleQuotesTrue);
    /* Get the modification name from the why string */
    let tempWhyValue = HDLmString.getCompleteWords(improveWhy, 55);
    tempWhyValue = tempWhyValue.trim();
    newModName = HDLmMenus.buildModificationName(parentTreeNode,
                                                  tempWhyValue,
                                                  ruleType,
                                                  removeTailsFalse,
                                                  quoteCharsSingleQuote,
                                                  ignoreSomeSingleQuotesTrue);
    /* console.log('New mod name = ' + newModName); */
    /* Build the tooltip for the rule */
    let longNameStr = HDLmMod.getModificationLongName(ruleType);
    let tooltipStr = HDLmString.ucFirst(longNameStr);
    tooltipStr += ' ' + 'modification'
    /* Build the node path for the rule */
    let newRuleNodePath = parentNodePath;
    newRuleNodePath.push(newModName);
    /* Creat a new node identification object for the
       new rule. The node identification object is used
       to locate a node in the HTML. The HTML node is
       always the head node. */
    let newNodeIdenObj = new HDLmNodeIden()
    newNodeIdenObj.type = 'tag';
    newNodeIdenObj.attributes = {};
    newNodeIdenObj.attributes.tag = 'head';
    newNodeIdenObj.counts = {};
    newNodeIdenObj.counts.tag = 1;
    newNodeIdenObj.parent = {};
    newNodeIdenObj.parent.tag = 'html';
    /* Create a new rule/modification/details object */
    let newRuleObj = new HDLmMod(newModName, '', ruleType);
    newRuleObj.pathvalue = urlPathName;
    newRuleObj.comments = '';
    newRuleObj.probability = 100.0;
    newRuleObj.usemode = 'off';
    newRuleObj.cssselector = '';
    newRuleObj.xpath = '';
    newRuleObj.find = [];
    newRuleObj.nodeiden = newNodeIdenObj;
    newRuleObj.parameter = 0;
    /* newRuleObj.scripts = ['let aaa = 3;\nlet bbb = 4;']; */
    newRuleObj.scripts = scriptsArray;
    newRuleObj.updated = false;
    /* Create a new tree node object */
    let treeNodeObj = new HDLmTree(nodeType, tooltipStr);
    treeNodeObj.details = newRuleObj
    treeNodeObj.type = nodeType
    treeNodeObj.nodePath = newRuleNodePath;
    /* Return the new tree node object to the caller */
    return treeNodeObj;
  }
  /* Add a new company to the local tree and send insert requests by websocket */
  static async createNewCompany(newCompanyName) {
    /* Create a few local variable */
    let nodePathEntry;
    let companiesNodePath = [];
    /* Try to find the companies node in the tree.
       The companies node is the parent node for 
       all company nodes. */
    nodePathEntry = HDLmDefines.getString('HDLMTOPNODENAME');
    companiesNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMCOMPANIESNODENAME');
    companiesNodePath.push(nodePathEntry);
    let companiesTreeNode = HDLmTree.locateTreeNode(companiesNodePath);
    if (companiesTreeNode == null)
      return ['The companies node could not be found', null];
    /* Check the company node already exists. If should be exist 
       at this point. */
    let companyNodePath = companiesNodePath.slice();
    companyNodePath.push(newCompanyName);
    let companyTreeNode = HDLmTree.locateTreeNode(companyNodePath);
    if (companyTreeNode != null) {
      return [`The company (${newCompanyName}) already exists`, null];
    }
    /* Build the new company tree node and add it the node tree.
       The company node starts out with four subnodes. */
    let companyTreeNodeType = HDLmDefines.getString('HDLMCOMPANYTYPE');
    let companyTooltip = HDLmTree.getTooltip('newcompmod');
    let updateDatabaseFalse = false;
    let updateFancyTreeFalse = false;
    companyTreeNode = HDLmTree.buildTreeNode(newCompanyName,
                                             companyTreeNodeType,
                                             companyTooltip,
                                             companyNodePath,
                                             companiesTreeNode,
                                             updateDatabaseFalse);
    /* Check if the new company really exists */
    if (companyTreeNode == null)
      return ['The new company could not be created', null];     
    /* Build a node path for the site node under the new 
       company. The site node is needed because the rules 
       are stored under the site node. The site node is
       built far down in the tree, so we have to build all 
       of the intermediate nodes as well. */  
    let parentNodePath = [];
    nodePathEntry = HDLmDefines.getString('HDLMTOPNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMCOMPANIESNODENAME');
    parentNodePath.push(nodePathEntry);
    parentNodePath.push(newCompanyName);
    nodePathEntry = HDLmDefines.getString('HDLMRULESNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMDIVISIONNODENAME');
    parentNodePath.push(nodePathEntry);
    nodePathEntry = HDLmDefines.getString('HDLMSITENODENAME');
    parentNodePath.push(nodePathEntry); 
    /* Build all of the intermediate levels as need be. This call will
       update the node tree (HDLmTree) in memory and won't send any new
       nodes to the database. Note that we are building a site node far
       under the rules node. This is why we pass HDLmNodeTypes.rules as
       the last argument to HDLmTree.buildSiteNode. */
    let newSiteNode = HDLmTree.buildSiteNode(parentNodePath,
                                             updateDatabaseFalse,
                                             updateFancyTreeFalse,
                                             HDLmNodeTypes.rules);
    if (newSiteNode == null)
      return ['The site node for the new company could not be created', null];
    let nodesToInsertArray = [];
    /* Create the insert for the company node */
    let nodePath = parentNodePath.slice(0, 3);
    let currentNode = HDLmTree.locateTreeNode(nodePath);
    if (currentNode != null &&
        (currentNode.hasOwnProperty('id') == false ||
      currentNode.id == null))
    nodesToInsertArray.push(HDLmManageRules.createTreeNodeInsertString(currentNode));
    /* Create the insert for the data node */
    nodePath.push(HDLmDefines.getString('HDLMDATANODENAME'));
    currentNode = HDLmTree.locateTreeNode(nodePath);
    if (currentNode != null &&
        (currentNode.hasOwnProperty('id') == false ||
         currentNode.id == null))
      nodesToInsertArray.push(HDLmManageRules.createTreeNodeInsertString(currentNode));
    nodePath.pop();  
    /* Create the insert for the ignore lists node */
    nodePath.push(HDLmDefines.getString('HDLMIGNORELISTSNODENAME'));
    currentNode = HDLmTree.locateTreeNode(nodePath);
    if (currentNode != null &&
        (currentNode.hasOwnProperty('id') == false ||
         currentNode.id == null))
      nodesToInsertArray.push(HDLmManageRules.createTreeNodeInsertString(currentNode));
    nodePath.pop();  
    /* Create the insert for the reports node */
    nodePath.push(HDLmDefines.getString('HDLMREPORTSNODENAME'));
    currentNode = HDLmTree.locateTreeNode(nodePath);
    if (currentNode != null &&
        (currentNode.hasOwnProperty('id') == false ||
         currentNode.id == null))
      nodesToInsertArray.push(HDLmManageRules.createTreeNodeInsertString(currentNode));
    nodePath.pop();  
    /* Create the insert for the rules node */
    nodePath.push(HDLmDefines.getString('HDLMRULESNODENAME'));
    currentNode = HDLmTree.locateTreeNode(nodePath);
    if (currentNode != null &&
        (currentNode.hasOwnProperty('id') == false ||
         currentNode.id == null))
      nodesToInsertArray.push(HDLmManageRules.createTreeNodeInsertString(currentNode));
    /* Create the insert for the division node */
    nodePath.push(HDLmDefines.getString('HDLMDIVISIONNODENAME'));
    currentNode = HDLmTree.locateTreeNode(nodePath);
    if (currentNode != null &&
        (currentNode.hasOwnProperty('id') == false ||
         currentNode.id == null))
      nodesToInsertArray.push(HDLmManageRules.createTreeNodeInsertString(currentNode));
    /* Create the insert for the site node */
    nodePath.push(HDLmDefines.getString('HDLMSITENODENAME'));
    currentNode = HDLmTree.locateTreeNode(nodePath);
    if (currentNode != null &&
        (currentNode.hasOwnProperty('id') == false ||
         currentNode.id == null))
      nodesToInsertArray.push(HDLmManageRules.createTreeNodeInsertString(currentNode));
    /* Send the new nodes to the server by websocket. The server will insert
       the new nodes into the database and will return the new nodes with
       their ID values filled in. The ID values are needed to update the
       local tree with the correct ID values. */
      if (nodesToInsertArray.length > 0) {
      try {
        let sendStr = '{"nodes": ' + '[' + nodesToInsertArray.toString() + ']' + '}';
        let sendPromise = HDLmWebSockets.sendStoreTreeNodesRequest(sendStr);
        let sendResponseJson = await sendPromise;
        let sendResponseObj = JSON.parse(sendResponseJson);
        if (sendResponseObj.hasOwnProperty('resultList') == true &&
            Array.isArray(sendResponseObj.resultList)         == true &&
            sendResponseObj.resultList.length                 == nodesToInsertArray.length)
          HDLmTree.resetIdValues(sendResponseObj.resultList, nodesToInsertArray);
      }
      catch (errorObj) {
        console.error(errorObj);
        let errorText = 'The new company was created locally but could not be sent to the server';
        return [errorText, null];
      }
    }
    /* At this point the new company has been created locally
       and on the server. The next step is to update
       the companies array in HDLmManageRules. */
    let treeTop = HDLmTree.getTreeTop();
    let companiesArray = HDLmTree.buildCompaniesArray(treeTop);
    HDLmManageRules.companiesArray = companiesArray;
    return [null, companiesArray];
  }
  /* This routine creates a style DOM entry. The style DOM
     entry is returned to the caller. */   
  static createStyleDomEntry() {  
    /* console.log('In HDLmManageRules.createStyleDomEntry'); */
    /* Build the highlight style string */
    let styleSheet = document.createElement('style');
    /* Return the DOM entry to the caller */
    return styleSheet;
  }
  /* Build a temporary tree node JSON string used for websocket inserts */
  static createTreeNodeInsertString(treePos) {
    let tempDetails = {};
    let tempPos = {};
    tempPos = Object.assign(tempPos, treePos);
    if (tempPos.hasOwnProperty('children'))
      delete tempPos.children;
    if (tempPos.hasOwnProperty('containerWidget'))
      delete tempPos.containerWidget;
    if (tempPos.hasOwnProperty('id'))
      delete tempPos.id;
    if (tempPos.hasOwnProperty('savedDetails'))
      delete tempPos.savedDetails;
    if (tempPos.hasOwnProperty('details')) {
      tempDetails = Object.assign(tempDetails, tempPos.details);
      if (tempDetails.hasOwnProperty('pathvalue')) {
        tempDetails.path = tempDetails.pathvalue;
        delete tempDetails.pathvalue;
      }
      tempPos.details = tempDetails;
    }
    let tempPosStr = JSON.stringify(tempPos);
    return tempPosStr;
  }
  /* This routine displays an error message passed
     to it. The error message is displayed as an
     alert box. This routine used to display the
     error text area. */
  static displayErrorMessage(errorMessage) {
    /* console.log('In HDLmManageRules.displayErrorMessage'); */
    alert(errorMessage);
  }
  /* This routine finds the most used field value in the rules 
     array. Each rule has a set of details. The details are an
     HDLmMod instance. The details have many fields. The field
     name is passed by the caller. This routine finds the most
     used value for the field. */
  static findMostUsed(fieldName, rulesArray) {
    /* Check if the passed rules array is empty */
    let rulesArrayLen = rulesArray.length;
    if (rulesArrayLen == 0) {
      /* Handle empty rules array case */
      return null;
    }
    /* Create an object to hold the usage counts */
    let fieldUsageCount = {};
    /* Process each rule in the rules array */
    for (let rule of rulesArray) {
      /* Get the rule details. The rule details are stored 
         in the 'details' property. The rule details are an
         HDLmMod instance. */
      let ruleDetails = rule.details;
      /* Check if the rule details have the specified field */
      if (ruleDetails.hasOwnProperty(fieldName)) {
        let fieldValue = ruleDetails[fieldName];
        /* Check if the field value is an empty string.
           This is a very common case. */
        if (fieldValue == '') {
          fieldUsageCount[fieldValue] = (fieldUsageCount[fieldValue] || 0) + 1;
        }
        /* Check if the field value exists. An empty string
           is not considered to be a valid value. */
        if (fieldValue) {
          fieldUsageCount[fieldValue] = (fieldUsageCount[fieldValue] || 0) + 1;
        }
      }
    }
    /* Get the most used value */
    let mostUsedValue = Object.keys(fieldUsageCount).reduce((a, b) => fieldUsageCount[a] > fieldUsageCount[b] ? a : b);
    /* Return the final most use value to the caller */
    return mostUsedValue;
  }
  /* This routine forces the React components to re-render.
     This is done by updating the component state. */
  static forceReRender() {
    /* console.log('In HDLmManageRules.forceReRender'); */
    /* The key value is incremented here to force a re-render
       of the React input areas. We use what are called uncontrolled
       components. Uncontrolled components are those that do not
       have their value controlled by React state. These components
       are typically controlled by the DOM instead. These components
       are remounted by React when the key value changes. */
    HDLmManageRules.inputKeyValue++;
    /* console.log('HDLmManageRules.inputKeyValue', HDLmManageRules.inputKeyValue); */
    /* Build and store a new component state. Note that 
       slice is used below. The use of slice forces the 
       creation of new array each time. This has the (desired)
       effect of causing the React components to re-render
       when the state is updated. */ 
    let localRuleIdsArray = HDLmManageRules.ruleIdsArray;
    if (localRuleIdsArray == null) 
      localRuleIdsArray = [];
    else
      localRuleIdsArray = HDLmManageRules.ruleIdsArray.slice();      
    HDLmManageRules.buildAndSetRuleIdsValue(HDLmManageRules.stateSetFunction,
                                            localRuleIdsArray); 
  }
  /* This routine tries to get the access cookie that may 
     have a userid in it. If the access cookie can be 
     found, it is returned to the caller. If the access
     cookie can not be found, then a null value is returned
     to the caller. */ 
  static getAccessCookie() {
    /* console.log('In getAccessCookie'); */
    /* Set the default return value */
    let rv = null;
    /* Check if the name of the Headlamp access cookie
       has been set or not */
    if (HDLmManageRules.accessCookieName == null)
      /* Save the name of access cookie */
      HDLmManageRules.accessCookieName = HDLmDefines.getString('HDLMACCESSCOOKIE');
    let localName = HDLmManageRules.accessCookieName;
    /* Get all of the cookies */
    let cookiesStr = document.cookie;
    /* console.log("'" + cookiesStr + "'"); */
    /* The code below was added just for testing under Windows because the document.cookie
       might be empty in some testing environments. This ensures that the function has
       a cookie string to work with during development and testing. */
    if (HDLmUtility.isVscode() && 
        cookiesStr == '')
      cookiesStr = 'HDLmAccessCookie=PsFedeDOuKGII%2BB6sJU%2FfnZB0%2BvzxyHtUVQx78BqvnKXdO21hj3smrXbBwswEmKqDO8Y1Nrdsqe7GYUn';
    /* console.log('cookiesStr is', cookiesStr); */
    /* Search the cookies for the one we are looking for */
    let cookiesArray = cookiesStr.split(";");
    /* console.log(cookiesArray); */
    for (let cookieStr of cookiesArray) {
      if (cookieStr.includes(localName)) {
        let cookieContents = cookieStr.split("=");
        rv = cookieContents[1];
        /* console.log("'" + rv + "'"); */
        break;
      }
    }
    /* console.log('x', "'" + cookies + "'"); */
    return rv;
  }
  /* This routine get a company and returns it to the 
     caller. The caller passes the company number. The 
     company number is one-based, not zero-based. */
  static getCompany(companyNumber) {
    /* console.log('In HDLmManageRules.getCompany'); */
    let companiesArray = HDLmManageRules.companiesArray;
    let specificCompany = companiesArray[companyNumber-1];
    return specificCompany;
  }
  /* This routine gets a company number from a company name.
     This routine returns null if the passed company name does
     not match any of the company names in the companies array. */ 
  static getCompanyNumber(companyNameStr, companiesArray) {  
    /* console.log('In HDLmManageRules.getCompanyNumber'); */
    /* Check if companies array is empty. This should never
       be the case. */    
    if (companiesArray == null ||
        companiesArray.length == 0) {
      return null;
    }
    /* Try to find the company number */
    let companyEntry = null;
    let companyNumber = 0;
    for (companyEntry of companiesArray) {
      companyNumber++;
      if (companyEntry.name == companyNameStr) 
        return companyNumber;
    }
    return null;
  }
  /* This routine gets a company number from a rules array. 
     The rules array must not be empty. The company number is
     returned to the caller. The company number is one-based,
     not zero-based. This routine returns null if the company 
     name from the rules array does not match any of the company
     names in the companies array. */ 
  static getCompanyNumberFromRules(rulesArray, companiesArray) {  
    /* console.log('In HDLmManageRules.getCompanyNumberFromRules'); */
    /* Check if rules array is empty. This should never
       be the case. */    
    if (rulesArray == null ||
        rulesArray.length == 0) {
      return null;
    }
    /* Check if companies array is empty. This should never
       be the case. */    
    if (companiesArray == null ||
        companiesArray.length == 0) {
      return null;
    }
    /* Get the company number for use later */
    let ruleCompanyName = null;
    let ruleNodePath = rulesArray[0].nodePath;
    let ruleNodePathLen = ruleNodePath.length;
    if (ruleNodePathLen >= 3) {
      ruleCompanyName = ruleNodePath[2];
    }
    /* Try to find the company number */
    let companyEntry = null;
    let companyNumber = 0;
    for (companyEntry of companiesArray) {
      companyNumber++;
      if (companyEntry.name == ruleCompanyName) 
        return companyNumber;
    }
    return null;
  }
  /* Get a set of headers for a fetch request. The headers are built
     and returned to the caller as an object. */
  static getHeadersFetch(hostNameStr) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build the standard headers and add them to the headers object */
    let standardHeaders = HDLmManageRules.getHeadersStandard(hostNameStr);
    headersObj = Object.assign(headersObj, standardHeaders);
    /* Return the headers object to the caller */
    return headersObj;
  }
  /* Get a set of standard headers for any request.
     The headers are built and returned as an object. */
  static getHeadersStandard(hostNameStr) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build a host name header and add it to headers object */
    let hostHeaderObj = HDLmHtml.buildHostHeaderObj(hostNameStr);
    headersObj = Object.assign(headersObj, hostHeaderObj);
    /* Build an accept encoding header and add it to the headers object */
    let acceptValue = HDLmConfigInfo.getBuildAcceptEncoding();
    let acceptHeaderObj = HDLmHtml.buildAcceptEncodingHeaderObj(acceptValue);
    headersObj = Object.assign(headersObj, acceptHeaderObj);
    /* Build a user agent header and add it to the headers object */
    let userAgentValue = HDLmConfigInfo.getBuildUserAgent();
    let userAgentHeaderObj = HDLmHtml.buildUserAgentHeaderObj(userAgentValue);
    headersObj = Object.assign(headersObj, userAgentHeaderObj);
    /* Return the headers object to the caller */
    return headersObj;
  }
  /* This routine tries to get a new password from a user */ 
  static getNewPassword() {
    /* console.log('In getNewPassword'); */
    let reactRejectFunction;
    let reactResolveFunction;
    /* Create a local promise */
    let reactPromise = new Promise(function (resolve, reject) {
      /* Save references to the reject and resolve functions */
      reactRejectFunction = reject;
      reactResolveFunction = resolve;
    });
    /* Store the location of the reject function */
    HDLmManageRules.promiseRejectFunction = reactRejectFunction;
    /* Store the location of the resolve function */
    HDLmManageRules.promiseResolveFunction = reactResolveFunction;   
     /* This function handles a key down event in the new password
        field */
    function newPasswordKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the new password in all cases, even if the current
         key is not the enter key. This approach ensures that the 
         new password field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.accessNewPassword = fieldValue;
      else
        HDLmManageRules.accessNewPassword = fieldValue + eventKey;
      if (eventKey == 'Enter') {
        /* Check if new password has been entered. If so 
           we can go onto the next stage. */
        let localNewPassword = HDLmManageRules.accessNewPassword;
        if (typeof(localNewPassword) != 'undefined' &&
            localNewPassword         != null        &&
            localNewPassword         != '')
          HDLmManageRules.inputDone('New password done');  
      }
    }
    /* Create the overall heading element */
    let pageText = headings["pageText"];
    let headingElement = HDLmReactFour.buildTextElement('h2', null, pageText); 
    /* Invoke some React code. The code is in a function
       so that we can control when we run it. */   
    let autoFocusTrue = true; 
    let rightPaddingValue = 30;
    let newPasswordElement; 
    let moveIconFunction;
    [newPasswordElement, moveIconFunction] = HDLmReactFour.buildPasswordWEyeWLabel(newPasswordKeyDown, 
                                                                                   'New Password', 
                                                                                   'Enter New Password',
                                                                                   rightPaddingValue,
                                                                                   autoFocusTrue);  
    /* Create a React fragment element to hold all of
       the sub-elements */
    let tempFragment = HDLmReactFour.putElementsInFragment([headingElement,
                                                            newPasswordElement
                                                           ]);
    let reactRoot = HDLmReactFour.getRootContainer('entryValues');
    HDLmReactFour.renderReact(reactRoot, tempFragment); 
    /* Later we need to move the icon DOM entry so that it
       is inside the password field. We use a timeout
       to delay the move operation until after the React
       rendering is done. */
    setTimeout(moveIconFunction, 0);
    /* Return the React promise to the caller */ 
    return reactPromise;
  }
  /* This routine tries to get a new rule name from a user.
     The old rule name is used as a default value. */
  static getNewRuleName(oldRuleName) {
    /* console.log('In HDLmManageRules.getNewRuleName'); */
    let reactRejectFunction;
    let reactResolveFunction;
    /* Create a local promise */
    let reactPromise = new Promise(function (resolve, reject) {
      /* Save references to the reject and resolve functions */
      reactRejectFunction = reject;
      reactResolveFunction = resolve;
    });
    /* Store the location of the reject function */
    HDLmManageRules.promiseRejectFunction = reactRejectFunction;
    /* Store the location of the resolve function */
    HDLmManageRules.promiseResolveFunction = reactResolveFunction;
    /* Provde a local new rule name variable */
    let localNewRuleName = oldRuleName; 
     /* This function handles a key down event in the 
        new rule name field */
    function newRuleNameKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      /* Get a copy of the event key */
      let eventKey = event.key;
      /* Check if the enter key has been pressed */
      if (eventKey == 'Enter') {
        let fieldValue = event.target.value;      
        localNewRuleName = fieldValue;
        /* console.log('New rule name has been entered'); */
        HDLmManageRules.inputDone(localNewRuleName);   
      }
    }
    /* This function handles a click event on the 
       proceed button */
    function proceedClick(event) {      
      /* Check if the new rule name has been entered */      
      /* Check if the new rule name is 'bad' */
      let checkNewRuleName = true;
      let errorText = '';
      if (checkNewRuleName == 'bad') {
        alert(errorText);
        return;
      }
      else {
        /* console.log('New rule name has been entered'); */
        let fieldValue = document.getElementById('newRuleName').value;
        localNewRuleName = fieldValue;
        HDLmManageRules.inputDone(localNewRuleName);  
      }
    }
    /* Create the overall heading element */
    let pageText = headings["pageText"];
    let pageHeadingElement = HDLmReactFour.buildTextElement('h2', null, pageText); 
    /* Invoke some React code. The code is in a function
       so that we can control when we run it. */
    let newRuleNameHeadingElement = 
          HDLmReactFour.buildTextElement('strong',
                                         null, 
                                         'Please enter the new rule name');  
    /* Display the old rule name in a read-only field */
    let readOnlyTrue = true;
    let autoFocusTrue = true;
    let initialValue = oldRuleName;                                     
    let oldRuleNameElement = HDLmReactFour.buildInputWLabel(newRuleNameKeyDown, 
                                                            'Old Rule Name', 
                                                            'Enter Old Rule Name', 
                                                            'oldRuleName',
                                                            initialValue, 
                                                            readOnlyTrue,
                                                            null,
                                                            autoFocusTrue); 
    /* Get the new rule name */
    let readOnlyFalse = false;
    autoFocusTrue = true;
    initialValue = oldRuleName; 
    let newRuleNameElement = HDLmReactFour.buildInputWLabel(newRuleNameKeyDown, 
                                                            'New Rule Name', 
                                                            'Enter New Rule Name', 
                                                            'newRuleName',
                                                            initialValue,
                                                            readOnlyFalse,
                                                            null,
                                                            autoFocusTrue);
    let breakElement = HDLmReactFour.buildBreakElement();
    let buttonElement = HDLmReactFour.buildButtonElement(null,
                                                         'Proceed', 
                                                         'Proceed', 
                                                         proceedClick);
    let tempFragment = HDLmReactFour.putElementsInFragment([pageHeadingElement,
                                                            newRuleNameHeadingElement,
                                                            breakElement, 
                                                            breakElement, 
                                                            oldRuleNameElement, 
                                                            breakElement, 
                                                            newRuleNameElement,
                                                            breakElement, 
                                                            buttonElement])
    let reactRoot = HDLmReactFour.getRootContainer('leftAndRightPage');
    HDLmReactFour.renderReact(reactRoot, tempFragment);
    /* Return the React promise to the caller */ 
    return reactPromise;
  }
  /* This routine displays the company list and asks the user
     to select a company. The selected company number is
     returned to the caller. The company number is one-based,
     not zero-based. */
  static getSpecificCompany(companiesArray) {
    /* console.log('In HDLmManageRules.getSpecificCompany'); */
    /* console.log(companiesArray); */
    let rv = null;
    let companiesArrayLen = companiesArray.length;
    let initialCompaniesArrayLen = companiesArrayLen;
    let reactRejectFunction;
    let reactResolveFunction;
    /* Create a local promise */
    let reactPromise = new Promise(function (resolve, reject) {
      /* Save references to the reject and resolve functions */
      reactRejectFunction = reject;
      reactResolveFunction = resolve;
    });
    /* Store the location of the reject function */
    HDLmManageRules.promiseRejectFunction = reactRejectFunction;
    /* Store the location of the resolve function */
    HDLmManageRules.promiseResolveFunction = reactResolveFunction;
    /* Check if the new company name field is currently in use */
    function newCompanyInputUsed() {
      let localNewCompanyName = HDLmManageRules.newCompanyNameChange;
      if (typeof(localNewCompanyName) != 'string')
        return false;
      return (localNewCompanyName.trim() != '');
    }
    /* This function handles change events in the new company name field */
    async function newCompanyNameChange(event) {
      /* Change events don't have a key value, 
         so we don't need to check the event key. 
         We just need to get the field value and 
         store it in a variable. */
      /* let eventKey = event.key; */
      let fieldValue = event.target.value;
      let proposedValue = fieldValue.trim();
      if (proposedValue == '')
        proposedValue = null;
      HDLmManageRules.newCompanyNameChange = proposedValue;
    }
    /* This function handles key down events in the new company name field */
    async function newCompanyNameKeyDown(event) {
      let eventKey = event.key;
      let fieldValue = event.target.value;
      let proposedValue = fieldValue;
      if (HDLmManageRules.keyValidForTextField(eventKey) == true)
        proposedValue = fieldValue + eventKey;
      proposedValue = proposedValue.trim();
      if (proposedValue == '')
        proposedValue = null;
      HDLmManageRules.newCompanyNameChange = proposedValue;
      /* Only the Enter key can submit a new company name */
      if (eventKey != 'Enter')
        return;
      /* A blank field + Enter is ignored */
      let enteredCompanyName = HDLmManageRules.newCompanyNameChange;
      if (enteredCompanyName == null)
        return;
      event.preventDefault();
      let localCompaniesArray = HDLmManageRules.companiesArray;
      let errorText;
      let validCompanyName;
      [errorText, validCompanyName] = HDLmManageRules.checkNewCompanyName(enteredCompanyName,
                                                                          localCompaniesArray);
      if (errorText != null) {
        HDLmManageRules.displayErrorMessage(errorText);
        return;
      }
      [errorText, localCompaniesArray] = await HDLmManageRules.createNewCompany(validCompanyName);
      if (errorText != null) {
        HDLmManageRules.displayErrorMessage(errorText);
        return;
      }
      rv = validCompanyName;
      companiesArray = localCompaniesArray;
      companiesArrayLen = companiesArray.length;
      HDLmManageRules.newCompanyNameChange = null;
      /* If no companies existed when we started, immediately use
         the new company and continue processing. */
      if (initialCompaniesArrayLen == 0) {
        HDLmManageRules.inputDone(rv);
        return;
      }
      renderCompanySelectionUi();
    }
    /* This function handles a click event in the proceed
       button */
    function proceedClick(event) {
      /* Ignore the proceed button if the new company field is currently in use */
      if (newCompanyInputUsed() == true)
        return;
      /* console.log('Proceed button clicked'); */
      let localSelectedCompany = rv;
      if (localSelectedCompany == null) {
        let errorText = 'A company must be selected';
        if (companiesArrayLen == 0)
          errorText = 'No companies are available';
        HDLmManageRules.displayErrorMessage(errorText);
      }
      else
        HDLmManageRules.inputDone(rv);
    }
    /* Render (or re-render) the company selection UI */
    function renderCompanySelectionUi() {
      /* The new company field should be reset when the company list is displayed */
      HDLmManageRules.newCompanyNameChange = null;
      /* This field is used below */
      let breakElement;
      /* The element array is built below. In some case, we do
         not need to add all of the elements. For example, if
         we don't have any companies, then we don't need to add
         the company select element. */
      let elementsArray = [];
      /* We have more than one company. We need to ask
         the user to select a company. */
      let pageText = headings["pageText"];
      let pageHeadingElement = HDLmReactFour.buildTextElement('h2', null, pageText);
      elementsArray.push(pageHeadingElement);
      /* Check if we have any companies or not. If we don't
         have any companies, then we don't need to add the
         company select element. */
      if (companiesArrayLen > 0) {
        let selectPromptText = headings["selectCompanyPrompt"];
        let selectHeadingElement = HDLmReactFour.buildTextElement('h3', null, selectPromptText);
        elementsArray.push(selectHeadingElement);
      }
      /* Build the companies select element */
      if (companiesArrayLen > 0) {
        let companiesElement = HDLmManageRules.buildCompaniesSelectElement(companiesArray,
                                                                           setSelectedCompany,
                                                                           () => { return newCompanyInputUsed(); });
        elementsArray.push(companiesElement);
      }
      /* Build the New Company Name input section */
      /* breakElement = HDLmReactFour.buildBreakElement(); */
      /* elementsArray.push(breakElement); */
      let newCompanyHeadingElement = HDLmReactFour.buildTextElement('h3', null, 'New Company Name');
      elementsArray.push(newCompanyHeadingElement);
      let readOnlyFalse = false;
      let autoFocusFalse = false;
      let initialValue = '';
      let newCompanyElement = HDLmReactFour.buildInputElement(null,
                                                              newCompanyNameChange,
                                                              newCompanyNameKeyDown, 
                                                              'Enter New Company Name',
                                                              'newCompanyName',
                                                              initialValue,
                                                              readOnlyFalse,
                                                              null,
                                                              autoFocusFalse);
      elementsArray.push(newCompanyElement);
      breakElement = HDLmReactFour.buildBreakElement();
      elementsArray.push(breakElement);
      /* Build a button element to proceed */
      breakElement = HDLmReactFour.buildBreakElement();
      elementsArray.push(breakElement);
      let buttonElement = HDLmReactFour.buildButtonElement(null,
                                                           'Proceed',
                                                           'Proceed',
                                                           proceedClick);
      elementsArray.push(buttonElement);
      /* Put all of the elements into a React fragment */
      let tempFragment = HDLmReactFour.putElementsInFragment(elementsArray);
      /* Display the company selection UI */
      let reactRoot = HDLmReactFour.getRootContainer('leftAndRightPage');
      HDLmReactFour.renderReact(reactRoot, tempFragment);
    }
    /* This function sets the return value (selected company)
       from this function. The caller passes a selected 
       company to this function. */ 
    function setSelectedCompany(company) {
      rv = company;      
    }
    renderCompanySelectionUi();
    return reactPromise;    
  }
  /* This routine tries to get a suggestion from a user. 
     The suggestion is checked (in practice, this does  
     not happen) to make sure it is valid. */ 
  static getSuggestion() {
    /* console.log('In HDLmManageRules.getSuggestion'); */
    /* This function handles a key down event in the suggestion
       field */
    function suggestionKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the suggestion in all cases, even if the current key  
         is not the enter key. This approach ensures that the 
         suggestion field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.suggestionText = fieldValue;
      else
        HDLmManageRules.suggestionText = fieldValue + eventKey;
    }
    /* Check if we are running under VsCode or not. If we are running
       under VsCode, set the web domain name to a known value. This 
       is no longer case (as of 2026/3/12). We use whatever value is
       selected. The driver/etc/hosts file has been updated so that 
       several domain names actually go to www.yogadirect.com. */
    if (false && HDLmUtility.isVscode()) {
      HDLmManageRules.webpageDomainName = 'https://www.yogadirect.com/';
      HDLmManageRules.webpageDomainName = 'www.themarvelouslandofoz.com';
      HDLmManageRules.webpageDomainName = 'www.yogadirect.com';
    }
    /* Invoke some React code. The code is in a function
       so that we can control when we run it. */
    let suggestionPrompt = headings["suggestionPrompt"];
    let suggestionPlaceholder = headings["suggestionPlaceholder"];
    let suggestionElement = HDLmReactFour.buildInputAreaWLabel(suggestionKeyDown, 
                                                               HDLmManageRules.windowOnMouseEnter,
                                                               HDLmManageRules.windowOnMouseLeave,  
                                                               'suggestion',
                                                               suggestionPrompt,  
                                                               suggestionPlaceholder, 
                                                               6,
                                                               50, 
                                                               true);  
    let breakElement = HDLmReactFour.buildBreakElement();
    let tempFragment = HDLmReactFour.putElementsInFragment([suggestionElement, 
                                                            breakElement
                                                           ]);
    /* Return the React fragment element to the caller */ 
    return tempFragment;
  } 
  /* This routine prompts the user for a suggestion */
  static getSuggestionPrompt() {
    /* console.log('In HDLmManageRules.getSuggestionPrompt'); */
    let promptText = headings["suggestionSection"];
    let headingElement = HDLmReactFour.buildTextElement('h3', null, promptText); 
    let suggestionElement = HDLmManageRules.getSuggestion();
    let tempFragment = HDLmReactFour.putElementsInFragment([headingElement, suggestionElement]);
    return tempFragment;
  }
  /* This routine gets a company number and a rule number
     passed to it. These values are used to find a specific
     rule in local storage. The rule returned is an HDLmTree
     instance. Note that the company number and rule number
     are one-based (not zero-based) and must be valid in 
     order to retrieve the rule. */
  static getTreeRule(companyNumber, ruleNumber) {
    /* Find the rule in local storage */
    let companiesArray = HDLmManageRules.companiesArray;
    if (Array.isArray(companiesArray) == false ||
        companyNumber <= 0 ||
        ruleNumber <= 0)
      return null;
    let specificCompany = companiesArray[companyNumber-1];
    if (specificCompany == null)
      return null;
    let rulesArray = specificCompany.rules;
    if (Array.isArray(rulesArray) == false)
      return null;
    let ruleEntry = rulesArray[ruleNumber-1];
    if (ruleEntry == null ||
        ruleEntry.actualRule == null)
      return null;
    let rule = ruleEntry.actualRule;
    return rule;
  }
  /* This routine tries to get the userid and the password 
     from a user. The userid and password combination are 
     checked to make sure they are valid. */ 
  static getUseridPassword() {
    /* console.log('In getUseridPassword'); */
    let reactRejectFunction;
    let reactResolveFunction;
    /* Create a local promise */
    let reactPromise = new Promise(function (resolve, reject) {
      /* Save references to the reject and resolve functions */
      reactRejectFunction = reject;
      reactResolveFunction = resolve;
    });
    /* Store the location of the reject function */
    HDLmManageRules.promiseRejectFunction = reactRejectFunction;
    /* Store the location of the resolve function */
    HDLmManageRules.promiseResolveFunction = reactResolveFunction;
    /* This function handles a click event in the userid
       field */
    function loginClick(event) {      
      /* Check if both the userid and the password have
         been entered. If both have been entered, then
         we can go onto the next stage. */
      let localUserid = HDLmManageRules.accessUserid;
      let localPassword = HDLmManageRules.accessPassword;
      /* Declare some local variables */
      let checkUserid;
      let checkPassword;
      let errorText;
      /* Check the entered values */
      if (typeof(localUserid) == 'undefined' ||
          typeof(localUserid) != 'string'    ||
          localUserid == null                || 
          localUserid == '') {
        alert('Please enter a valid userid');
        return; 
      }
      /* Check if the userid is 'bad' */
      [checkUserid, errorText] = HDLmUtility.isValidUserid(localUserid);
      if (checkPassword == 'bad') {
        alert(errorText);
        return;
      }
      /* Check the entered values */
      if (typeof(localPassword) == 'undefined' ||
          typeof(localPassword) != 'string'    ||
          localPassword == null                || 
          localPassword == '') {
        alert('Please enter a valid password');
        return; 
      }
      /* Check if the password is 'bad' */
      [checkPassword, errorText] = HDLmUtility.isValidPassword(localPassword);
      if (checkPassword == 'bad') {
        alert(errorText);
        return;
      }
      /* Report that a valid userid and password have been entered */       
      /* console.log('Userid and password entered'); */
      HDLmManageRules.inputDone('Userid/Password done');        
    }
    /* This function handles a key down event in the password
       field */
    function passwordKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the password in all cases, even if the current key  
         is not the enter key. This approach ensures that the 
         password field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.accessPassword = fieldValue;
      else
        HDLmManageRules.accessPassword = fieldValue + eventKey;
    }
    /* This function handles a key down event in the userid
       field */
    function useridKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the userid in all cases, even if the current key  
         is not the enter key. This approach ensures that the 
         userid field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.accessUserid = fieldValue;
      else
        HDLmManageRules.accessUserid = fieldValue + eventKey;   
    }
    /* Create the overall heading element */
    let pageText = headings["pageText"];
    let pageHeadingElement = HDLmReactFour.buildTextElement('h2', null, pageText); 
    /* Invoke some React code. The code is in a function
       so that we can control when we run it. */
    let useridPasswordHeadingElement = HDLmReactFour.buildTextElement('strong',
                                                                      null, 
                                                                      'Please enter your Headlamp userid and password');  
    /* Display the userid field */ 
    let readOnlyFalse = false;
    let autoFocusTrue = true;
    let initialValue = '';     
    let rightPaddingValue = 30;                                                                   
    let useridElement = HDLmReactFour.buildInputWLabel(useridKeyDown, 
                                                       'Userid', 
                                                       'Enter Userid', 
                                                       HDLmUtility.uniqueGenerateId(),
                                                       initialValue,
                                                       readOnlyFalse,
                                                       rightPaddingValue,
                                                       autoFocusTrue); 
    /* Display the password field */ 
    let autoFocusFalse = false;
    let passwordElement;
    let moveIconFunction;
    [passwordElement, moveIconFunction] = HDLmReactFour.buildPasswordWEyeWLabel(passwordKeyDown, 
                                                                                'Password', 
                                                                                'Enter Password', 
                                                                                rightPaddingValue,
                                                                                autoFocusFalse);   
    let breakElement = HDLmReactFour.buildBreakElement();
    let buttonElement = HDLmReactFour.buildButtonElement(null,
                                                        'Login', 
                                                        'Login', 
                                                        loginClick);
    let tempFragment = HDLmReactFour.putElementsInFragment([pageHeadingElement,
                                                            useridPasswordHeadingElement,
                                                            breakElement, 
                                                            breakElement, 
                                                            useridElement, 
                                                            breakElement, 
                                                            passwordElement,
                                                            breakElement, 
                                                            buttonElement])
    let reactRoot = HDLmReactFour.getRootContainer('entryValues');
    HDLmReactFour.renderReact(reactRoot, tempFragment);
    /* Later we need to move the icon DOM entry so that it
       is inside the password field. We use a timeout
       to delay the move operation until after the React
       rendering is done. */
    setTimeout(moveIconFunction, 0);    
    /* Return the React promise to the caller */ 
    return reactPromise;
  }
  /* This routine tries to get a verification code from a user */ 
  static getVerificationCode() {
    /* console.log('In getVerificationCode'); */
    let reactRejectFunction;
    let reactResolveFunction;
    /* Create a local promise */
    let reactPromise = new Promise(function (resolve, reject) {
      /* Save references to the reject and resolve functions */
      reactRejectFunction = reject;
      reactResolveFunction = resolve;
    });
    /* Store the location of the reject function */
    HDLmManageRules.promiseRejectFunction = reactRejectFunction;
    /* Store the location of the resolve function */
    HDLmManageRules.promiseResolveFunction = reactResolveFunction;
     /* This function handles a key down event in the verification code
        field */
    function verificationCodeKeyDown(event) {
      /* console.log('In event function', event.key, event.target.value); */
      let eventKey = event.key;
      /* Store the verification code in all cases, even if the current
         key is not the enter key. This approach ensures that the 
         verification code field is set in all cases. */
      let fieldValue = event.target.value;
      if (HDLmManageRules.keyValidForTextField(eventKey) == false)
        HDLmManageRules.accessVerificationCode = fieldValue;
      else
        HDLmManageRules.accessVerificationCode = fieldValue + eventKey;
      if (eventKey == 'Enter') {
        /* Check if verification code has been entered. If so 
           we can go onto the next stage. */
        let localVerificationCode = HDLmManageRules.accessVerificationCode;
        if (typeof(localVerificationCode) != 'undefined' &&
            localVerificationCode         != null        &&
            localVerificationCode         != '')
          HDLmManageRules.inputDone('Verification code done');  
      }
    }
    /* Create the overall heading element */
    let pageText = headings["pageText"];
    let headingElement = HDLmReactFour.buildTextElement('h2', null, pageText); 
    /* Invoke some React code. The code is in a function
       so that we can control when we run it. */
    let readOnlyFalse = false;
    let autoFocusTrue = true;
    let initialValue = '';     
    let verificationCodeElement = HDLmReactFour.buildInputWLabel(verificationCodeKeyDown, 
                                                                 'Verification Code', 
                                                                 'Enter Verification Code',
                                                                 HDLmUtility.uniqueGenerateId(),
                                                                 initialValue,
                                                                 readOnlyFalse,
                                                                 null,
                                                                 autoFocusTrue);  
    /* Create a React fragment element to hold all of
       the sub-elements */
    let tempFragment = HDLmReactFour.putElementsInFragment([headingElement,
                                                            verificationCodeElement
                                                           ]);
    let reactRoot = HDLmReactFour.getRootContainer('entryValues');
    HDLmReactFour.renderReact(reactRoot, tempFragment);
    /* Return the React promise to the caller */ 
    return reactPromise;
  }
  /* The next method handles a keydown events. The 
     caller passes the key operation. This code 
     routes the command as need be. */
  static handleKeyboard(source, eventStr) {
    /* console.log('In HDLmManageRules.handleKeyboard'); */
    let fancyNode = null;
    let currentTreeNode = null;
    let currentTreeType = null;
    /* Their are many different types of key operations. Each key operation 
       is handled by a separate set of code. */
    switch (eventStr) {
      /* Handle a ctrl-y (redo) keyboard operation. For some reason
         we get two copies of this event. We only want to process
         the event that came from the Fancytree. The other event
         just gets ignored. */
      case 'ctrl+y':
        HDLmUnRe.redoChange(fancyNode, currentTreeNode, currentTreeType, source);
        break;
      /* Handle a ctrl-z (undo) keyboard operation. For some reason
         we get two copies of this event. We only want to process
         the event that came from the Fancytree. The other event
         just gets ignored. */
      case 'ctrl+z':
        HDLmUnRe.undoChange(fancyNode, currentTreeNode, currentTreeType, source);
        break;
      /* Don't report an error if the key operation did not match one
         of the expected choices */
      default:
        break;
    }
  }
  /* The input done function is invoked (called) when the user
     has provided the needed input using the UI. This function
     is static and is always invoked. However, a variable
     associated with this JavaScript file is used to locate
     the function called by this routine. The user is prompted
     for a suggestion or a set of buttons are displayed. */
  static inputDone(currentValue) {
    /* console.log('In HDLmManageRules.inputDone'); */
    /* console.log(currentValue); */
    /* Get rid of any existing error text */
    HDLmManageRules.clearErrorText()
    let promiseResolveFunction = HDLmManageRules.promiseResolveFunction;
    promiseResolveFunction(currentValue);
  }
  /* Check if the current key value can (will) be added to 
     text fields. Many keys (such as letters) will be added
     to text fields. Many keys (such as enter) will not be
     added to text fields. */
  static keyValidForTextField(keyValue) {
    /* console.log(keyValue); */
    /* Set a default value for the return value */
    let rv = false;
    /* Check for key value that are longer than one */
    if (keyValue.length > 1)
      return rv;
    /* Check for a lowercase letter */
    if (keyValue >= 'a' && keyValue <= 'z')
      rv = true;
    /* Check for an uppercase letter */
    if (keyValue >= 'A' && keyValue <= 'Z')
      rv = true;
    /* Check for numbers */
    if (keyValue >= '0' && keyValue <= '9')
      rv = true;
    /* Check for a few special values */
    if (keyValue >= '!' && keyValue <= '/')
      rv = true;
    /* Check for a few special values */
    if (keyValue >= ':' && keyValue <= '@')
      rv = true;
    /* Check for a few special values */
    if (keyValue >= '[' && keyValue <= '`')
      rv = true;
      /* Check for a few special values */
    if (keyValue >= '{' && keyValue <= '~')
      rv = true;
    /* Return a value to the caller */
    /* console.log(rv); */
    return rv;
  }    
  /* This routine looks for duplicate rule names in a list of deleted rules.
     The routine returns the number of duplicate rule names that it finds. */
  static lookForDuplicateRuleNames(deleteRule, deletedRulesList) {
    /* Get the rule name of the rule this is being deleted */
    let deleteRuleName = deleteRule.actualRule.details.name;
    let duplicateRuleNameCount = 0;
    let i = 0;
    /* Loop through the deleted rules and look for duplicate rule names */
    for (let deletedRuleEntry of deletedRulesList) {
      i++;
      let actualRuleEntry = deletedRuleEntry.actualRule;
      let actualRuleNameEntry = actualRuleEntry.details.name;
      /* Check for a duplicate rule name */
      if (actualRuleNameEntry == deleteRuleName) {
        duplicateRuleNameCount++;
        /* The following code is for debugging purposes only. 
           It allows us to set a breakpoint on the line below 
           and check the state of the code when a duplicate
           rule name is found. */
        if (duplicateRuleNameCount > 1) 
          i = i;
      }
    };
    return duplicateRuleNameCount;
  }
  /* Provide the main routine */
  static main() {
    /* console.log('In HDLmManageRules.main'); */ 
    /* This routine may been invoked to manage rules or it may have
       been invoked for some other reason. Check if the path shows
       that what the user really wants is to manage rules. */
    let manageRules = false;
    let windowLocationPathName = window.location.pathname;
    /* console.log('window.location.pathname', windowLocationPathName); */
    if (windowLocationPathName.toLowerCase() == '/managerules')
      manageRules = true;
    /* Check if the user wants to manage rules under the VSCode debugger */
    if (windowLocationPathName.endsWith('index.html'))
      manageRules = true;
    /* Check if we really want to manage rules */
    /* console.log('manageRules', manageRules); */
    if (!manageRules)
      return;  
    /* console.log('HDLmManageRule.main'); */
    window.addEventListener('keydown', HDLmManageRules.windowOnDown);
    /* If we are here, then we are starting to manage one or more rules */
    let stage = HDLmManageRulesStageTypes.getConfigs; 
    HDLmManageRules.nextStage(stage, null);
    /* Return to the caller */
    /* console.log('HDLmManageRules.main done'); */
    /* console.trace(); */
    return;
  }
  /* This routine makes the rollover text area invisible 
     by setting the CSS classes of the text area. One of the 
     CSS classes makes the text area invisible. */
  static makeRolloverTextAreaInvisible(event) {
    /* console.log('In HDLmManageRules.makeRolloverTextAreaInvisible'); */
    /* We need to check if the mouse is actually in the rollover
       text area or not. If the mouse is in the text area, we
       don't want to make the rollover area invisible. */
    let fieldId = event.target.id;
    let fieldName = HDLmUtility.uniqueRemoveValue(fieldId);
    /* console.log('fieldName', fieldName, fieldId); */
    if (fieldName != 'textareaRollover')
      return;
    HDLmManageRules.makeRolloverTextAreaInvisibleAlways();
  }
  /* Make the rollover text area invisible in all cases 
     The first step is to find the rollover text area. 
     The next step is to set the CSS classes of the
     rollover ext area so that it is invisible. */
  static makeRolloverTextAreaInvisibleAlways() {
    /* console.log('In HDLmManageRules.makeRolloverTextAreaInvisibleAlways'); */
    /* Search for the rollover text area using 
     a class name the text area is expected 
     to have */
    let textAreaElements = document.getElementsByClassName('textarea-rollover');
    let textAreaElement = textAreaElements[0];
    if (textAreaElement != null) {
      textAreaElement.className = 'textarea-rollover textarea-invisible';
    }  
  }
  /* This routine makes the rollover text area invisible
     after a specified time. The text area is made invisible
     after the specified time by calling another routine. */
  static makeRolloverTextAreaInvisibleTime(textAreaId) {
    /* console.log('In HDLmManageRules.makeRolloverTextAreaInvisibleTime'); */
    /* Check if the rollover text area has the text area ID
       that was passed to this routine. If the IDs don't match,
       we don't make the text area invisible. */
    let textAreaElements = document.getElementsByClassName('textarea-rollover');
    let textAreaElement = textAreaElements[0];
    if (textAreaElement != null) {
      let fieldId = textAreaElement.id; 
      /* console.log('textAreaId', textAreaId, fieldId); */
      if (fieldId == textAreaId) 
        HDLmManageRules.makeRolloverTextAreaInvisibleAlways();
    }
  }
  /* This routine makes the rollover text area visible 
     by setting the CSS classes of the text area. One of the 
     CSS classes makes the text area visible. */
  static makeRolloverTextAreaVisible(event) {
    /* console.log('In HDLmManageRules.makeRolloverTextAreaVisible'); */
    /* Search for the rollover text area using 
       a class name the text area is expected 
       to have */
    let textAreaElements = document.getElementsByClassName('textarea-rollover');
    let textAreaElement = textAreaElements[0];
    if (textAreaElement != null) {
      /* Get the name and value of where the mouse entered */
      let fieldId = event.target.id;
      let fieldDom = document.getElementById(fieldId);
      /* Try to get the field name. If the field name
         is not defined, get the field name from the 
         the field ID instead. */
      let fieldName = event.target.name;
      let fieldNameType = typeof(fieldName);
      if (fieldNameType == 'undefined') 
        fieldName = HDLmUtility.uniqueRemoveValue(fieldId);
      /* If we are already in the rollover text area,
         just return to the caller. */
      if (fieldName == 'textareaRollover')
        return;
      /* Try to get the field value. If the field value
         is not defined, get the field value from the 
         the field text content instead. */
      let fieldValue = event.target.value;
      let fieldValueType = typeof(fieldValue);
      if (fieldValueType == 'undefined') 
        fieldValue = fieldDom.textContent;
      /* Display some debug information */
      /* console.log('fieldId', fieldId); */
      /* console.log('fieldName', fieldName); */
      /* console.log('fieldValue', fieldValue); */
      /* Get the position of the DOM element */
      let fieldDomRect = fieldDom.getBoundingClientRect();
      let fieldDomTop = fieldDomRect.top;
      let fieldDomTopAdjusted = fieldDomTop - 35;
      if (fieldDomTopAdjusted < 0)
        fieldDomTopAdjusted = 0;
      let fieldDomLeft = fieldDomRect.left;
      /* Set the text area text */
      let cssLeft = 'left: ' + fieldDomLeft + 'px; ';
      let cssTop = 'top: ' + fieldDomTopAdjusted + 'px; ';
      let cssPosition = 'position: absolute; ';
      let cssText = cssPosition + cssLeft + cssTop;
      textAreaElement.style.cssText = cssText;
      textAreaElement.className = 'textarea-rollover textare-visible';
      /* If the mouse entered field is the status field, then
         we need to change the field name based on the actual 
         data in the status field. This is done to ensure         
         that we get the correct help text. */
      if (fieldName == 'tdStatus') {
         let fieldValueCapitalized = HDLmString.ucFirst(fieldValue);
         fieldName = 'tdStatus' + fieldValueCapitalized;  
      } 
      let localHelpText = helpText[fieldName];
      /* console.log('localHelpText', typeof(localHelpText), fieldName); */
      textAreaElement.value = localHelpText;
      /* The ID field of the text area must be unique so 
         that is can be removed later */
      /* console.log('textAreaElement.id', textAreaElement.id); */
      textAreaElement.id = 'textareaRollover' + HDLmUtility.uniqueGenerateId(); 
      /* console.log('textAreaElement.id', textAreaElement.id); */
      /* The rollover text area is made invisible after a specified time. */
       const maxTime = 5 *  1000;
       setTimeout(() => { HDLmManageRules.makeRolloverTextAreaInvisibleTime(textAreaElement.id); }, 
                        maxTime); 
    }
  }
  /* This function runs the next stage of manage rules processing.
     The next stage is determined by many things, not the least of
     which is whether the prior stage worked or not. Note that this
     routine is highly recursive and calls itself to wait in many
     cases. */
  static async nextStage(stage, varNext) {
    /* console.log('In HDLmManageRules.nextStage'); */
    /* Handle the next stage of manage processing. The next
       stage is always determined by the caller. */
    /* console.trace(); */
    let nextStageLoop = true;
    /* Loop handling the next stage of processing */
    while (nextStageLoop) {
      /* Check if we are running under VsCode or not. If we are running
         under VsCode, show what stage is running. */
      if (HDLmUtility.isVscode()) 
        console.log(`In HDLmManageRules.nextStage while loop ${stage}`);
      /* console.log(stage); */
      /* The code below was used to find a bug */
      if (typeof(stage) == 'undefined') 
        stage = stage;
      /* Switch on the current stage */
      switch (stage) {
        /* Get the configs */
        case HDLmManageRulesStageTypes.getConfigs: {
          /* Get a Promise that will resolve to the configuration settings text.
             The configuration settings are expected to be in JSON format. The
             call below returns a Promise that resolves to a string containing
             the configuration data in JSON format. */
          let configsObj = await HDLmConfig.getConfigs();
          /* Add all of the configuration setting to an object in the
             HDLmConfig module. This allows the rest of the application
             to access and chanage configuration settings easily. */
          HDLmConfig.addConfigs(configsObj);
          /* Set either production mode on or off depening on what domain
             name was used to lanch this code */
          let localMode;
          /* We may neet to set a few configuration values based on the
             server name. We may (or may not be) running in test mode. 
             We need to check for test mode and make some changes if we
             are running in test mode. Note that under the debugger, the
             window location is an empty string. */
          let windowLocationHostName = window.location.hostname;
          /* console.log('windowLocationHostName', windowLocationHostName); */
          if (windowLocationHostName != null      && 
              windowLocationHostName != undefined && 
              windowLocationHostName.indexOf('t') > 0) 
            localMode = false;
          else 
            localMode = true;
          /* Set production mode to either true (production) or false (test) */
          /* console.log('localMode', localMode); */
          HDLmUtility.setProdMode(localMode);
          /* Move to the next stage */
          stage = HDLmManageRulesStageTypes.setTitle;
          break;
        }
        /* Set the title for the current web page */
        case HDLmManageRulesStageTypes.setTitle: {
          /* Set the title */
          let newTitle = 'Headlamp Manage Rules';
          newTitle = 'Headlamp Rules Management';
          newTitle = '';
          window.document.title = newTitle;
          HDLmUtility.setHeader(newTitle);
          stage = HDLmManageRulesStageTypes.checkServerStatus;
          break
        }
        /* Check if the server is reachable before doing any
           additional startup work */
        case HDLmManageRulesStageTypes.checkServerStatus: {
          let serverUp = await HDLmManageRules.checkServerStatus();
          /* console.log('In HDLmManageRules.nextStage checkServerStatus', serverUp); */
          if (serverUp == false) {
            let errorText = 'The server is unavailable';
            HDLmManageRules.displayErrorMessage(errorText);
            /* Stop stage processing if the server cannot be reached */
            nextStageLoop = false;
            break;
          }
          stage = HDLmManageRulesStageTypes.sendBuildCookie;
          break
        }
        /* Send a request to the server to build a cookie and setn
           the cookie back to the client */
        case HDLmManageRulesStageTypes.sendBuildCookie: {
          /* The code that tried to send the build cookie request
             does not work. This code has been disabled for now. */
          if ((1 == 2))
            await HDLmManageRules.sendBuildCookie(); 
          /* Try to get the access cookie */ 
          stage = HDLmManageRulesStageTypes.getAccessCookie;
          break;
        }
        /* This case does not appear to be in use */
        case HDLmManageRulesStageTypes.sendBuildCookieResponse: 
        /* Get the cookie that the user may have set. The cookie
           may have a userid in it. This eliminates the need for 
           the user to login each time. */
        case HDLmManageRulesStageTypes.getAccessCookie: {
          let localValueOfCookie = HDLmManageRules.getAccessCookie(); 
          /* console.log(localValueOfCookie); */
          /* Check if we were able to get the encrypted cooke value
             from the access cookie. If this is true, the we don't 
             need to promp the user for a userid and password. */
          if (localValueOfCookie == null) {
            stage = HDLmManageRulesStageTypes.getUseridPassword;
            break;
          }
          /* We were able to get the access cookie. The cookie
             is descrtped below and use. */ 
          else {
            /* Show that we were about to get access information
               from the access cookie */
            HDLmManageRules.getFromCookie = true;
            /* Convert the cookie value to binary. More work 
               is needed later. */
            if (localValueOfCookie.indexOf('%') >= 0) {
               /* console.log(localValueOfCookie); */
               localValueOfCookie = HDLmHttp.uriDecode(localValueOfCookie);
               /* console.log(localValueOfCookie); */
            }
            let encryptedValueString = atob(localValueOfCookie); 
            /* console.log(typeof(encryptedValue)); */  
            /* console.log(encryptedValueString); */ 
            /* Create a Uini8 array from the output of atob. This array
               is later passed to the standard description code. Note 
               that some special code was obtained from Stack Overflow
               ("How to convert uint8 Array to base64 Encoded String?").*/
            let encryptedArrayUint8 = new Uint8Array([...encryptedValueString].map(c => c.charCodeAt()));
            /* console.log(typeof(encryptedValue)); */
            /* console.log(encryptedArrayUint8); */
            /* Get a local copy of the AES secret encryption key */
            let localKey = HDLmConfigInfo.getSecretEncryptionKey();
            /* console.log(localKey); */
            /* Try to decrypt the cookie value */
            let decryptView = await HDLmEncryption.decrypt(localKey, encryptedArrayUint8);
            /* We now have a view of the actual decrypted data. */ 
            /* console.log(decryptView); */
            let decoder = new TextDecoder('utf-8'); 
            let decodedStr = decoder.decode(decryptView); 
            /* console.log(decodedStr); */
            let decryptObj = JSON.parse(decodedStr)
            /* console.log(decryptObj); */
            /* Get a few values from the object */
            HDLmManageRules.accessPassword = decryptObj.password;
            HDLmManageRules.accessUserid = decryptObj.userid;
            /* The userid and password have been obtained from the
               access cookie. The values should be valid. They are
               passed to the server to make sure that they are valid 
               and to update the in-memory database on the server.
               
               This code is not in use. The JavaScript code is run
               natively (not under VS Code) to update the in-memory
               database on the server. 
               
               The prior comment is not correct. We check the userid
               and password combination with the server to ensure they
               are valid and to update the in-memory database on the 
               server. */ 
            if (1 == 1) {
              /* Check the userid and the password */
              let localUserid = HDLmManageRules.accessUserid;
              let localPassword = HDLmManageRules.accessPassword;
              /* Wait for the server to finish check the userid
                 and password. */
              let responseObj = await HDLmSecurity.checkUsernamePasswordUpdateMemoryServer(localUserid, localPassword);       
              /* console.log(responseObj); */ 
              /* Check if the status code from the call, shows
                 that the call succeeded */
              let responseStatus = responseObj.status;
              /* Check if the userid/password combination were even
                 minimally valid. If they were not even minimally 
                 valid, we need to get a new combination of userid
                 and password. */
              if (responseStatus != 200) {
                let errorText = 'The Userid / Password combination was invalid';
                HDLmManageRules.displayErrorMessage(errorText);
              }            
            }
            /* Now that we have access information we can get
               some or all of the modifications. */
            stage = HDLmManageRulesStageTypes.getModifications;
            break;          
          }
        }
        /* Get the userid and the password from the user. The combination
           must be valid. */
        case HDLmManageRulesStageTypes.getUseridPassword: {
          /* Wait for the user to finish entering the userid
             and password. The userid and password combination
             may or may not be valid. */
          await HDLmManageRules.getUseridPassword(); 
          /* The user appears to have entered the userid/password combination */
          stage = HDLmManageRulesStageTypes.checkUseridPassword;
          break;
        } 
        /* Check the usedid and the password obtained from the user. 
           The combination must be valid. */
        case HDLmManageRulesStageTypes.checkUseridPassword: {
          /* Check the userid and the password */
          let localUserid = HDLmManageRules.accessUserid;
          let localPassword = HDLmManageRules.accessPassword;
          /* Wait for the server to finish check the userid
             and password. */
          let responseObj = await HDLmSecurity.checkUsernamePasswordServer(localUserid, localPassword);       
          /* console.log(responseObj); */ 
          /* Check if the status code from the call, shows
             that the call succeeded */
          let responseStatus = responseObj.status;
          /* Check if the userid/password combination were even
             minimally valid. If they were not even minimally 
             valid, we need to get a new combination of userid
             and password. */
          if (responseStatus != 200) {
            let errorText = 'The Userid / Password combination was invalid';
            HDLmManageRules.displayErrorMessage(errorText);
            stage = HDLmManageRulesStageTypes.getUseridPassword;
            break;
          }
          /* The reponse body will have additional information */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            let responseRead = await responseReader.read();
            stage = HDLmManageRulesStageTypes.checkUseridPasswordResponse;
            HDLmManageRules.nextStage(stage, responseRead);
            /* Terminate the next stage loop and terminate the switch */
            nextStageLoop = false;
            break;
          }     
        } 
        /* Check the usedid and the password response obtained from 
           the server. The combination must be valid. */
        case HDLmManageRulesStageTypes.checkUseridPasswordResponse: {  
          /* Wait for the server to send back a response */ 
          /* console.log(responseObj); */
          let responseObj = varNext;
          /* console.log(responseObj); */
          let responseValue = responseObj.value;
          /* The following code was added to circumvent a bug
             in AWS. The response value should not be undefined. 
             
             The comment above appears to be wrong. The bug was 
             acutally in my code (or so I think). What happens is
             that the userid / password combination is locally 
             checked (and passes) on the Java server. The combination
             is never sent to the AWS. As a oonsequence the 'value' 
             is undefined in the reply. */ 
             /* console.log("'" + responseValue + "'"); */
          if (typeof(responseValue) == 'undefined' ||
              responseValue == null                ||
              responseValue == '') {
            stage = HDLmManageRulesStageTypes.setAccessCookie;
            break;             
          }
          /* Check if the rest of this code should be executed */
          if (true) {
            /* console.log(typeof(responseValue)); */
            /* console.log("'" + responseValue + "'"); */
            let responseJson = new TextDecoder().decode(responseValue);
            /* console.log("'" + responseJson + "'"); */
            responseObj = JSON.parse(responseJson); 
            /* Check if the response has a challenge */
            if (responseObj.hasOwnProperty('ChallengeName')) {
              let responseChallenge = responseObj.ChallengeName;
              /* Check if a new password is needed */
              if (responseChallenge == 'NEW_PASSWORD_REQUIRED') { 
                stage = HDLmManageRulesStageTypes.getNewPassword;
                break;
              }
              /* Check if a verification code is needed */
              if (responseChallenge == 'SMS_MFA') { 
                HDLmManageRules.accessChallengeName = responseChallenge;
                HDLmManageRules.sessionId = responseObj.Session;
                stage = HDLmManageRulesStageTypes.getVerificationCode;
                break;
              }
            }          
            /* The user appears to have entered a valid combination of 
               a userid and password */
            else {
              stage = HDLmManageRulesStageTypes.setAccessCookie;
              break;
            }
          }
        } 
        /* Get the new password from the user */
        case HDLmManageRulesStageTypes.getNewPassword: {
          /* Wait for the user to finish entering the new password */
          await HDLmManageRules.getNewPassword();      
          /* console.log(responseText); */
          /* The user appears to have entered the new password */
          stage = HDLmManageRulesStageTypes.setNewPassword;
          break;
        } 
        /* Store the new password obtained from the user */
        case HDLmManageRulesStageTypes.setNewPassword: {
          /* Store the new password */
          let localUserid = HDLmManageRules.accessUserid;
          let localNewPassword = HDLmManageRules.accessNewPassword;
          /* Wait for the server to finish storing the new password */ 
          let responseObj = await HDLmSecurity.adminSetPasswordServer(localUserid, localNewPassword);
          /* console.log(responseObj); */ 
          /* Check if the status code from the call, shows
             that the call succeeded */
          let responseStatus = responseObj.status;
          /* check if the new password was even minimally valid. 
             If it was not even minimally valid, we need to get 
             a new combination of userid and password. */
          if (responseStatus != 200) {
            let errorText = 'The new password was invalid';
            HDLmManageRules.displayErrorMessage(errorText);
            stage = HDLmManageRulesStageTypes.getNewPassword;
            break;
          }
          /* The reponse body will have additional information
             that we can ignore */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            let responseRead = await responseReader.read();
            HDLmManageRules.accessPassword = HDLmManageRules.accessNewPassword;
            stage = HDLmManageRulesStageTypes.setAccessCookie;
            break;
          }
        } 
        /* This case does not appear to be in use */
        case HDLmManageRulesStageTypes.setNewPasswordResponse: 
        /* Get the verification code from the user */
        case HDLmManageRulesStageTypes.getVerificationCode: {
          /* Wait for the user to finish entering the verification code */
          let responseText = await HDLmManageRules.getVerificationCode(); 
          /* console.log(responseText); */
          /* The user appears to have entered the verification code */
          stage = HDLmManageRulesStageTypes.sendVerificationCode;
          break;           
        } 
        /* Send the verification code obtained from the user */
        case HDLmManageRulesStageTypes.sendVerificationCode: {
          /* Send the verification code */
          let localChallengeName = HDLmManageRules.accessChallengeName;
          let localSessionId = HDLmManageRules.sessionId;
          let localUserid = HDLmManageRules.accessUserid;
          let localVerificationCode = HDLmManageRules.accessVerificationCode;
          /* Wait for the server to finish checking the verification code */
          let responseObj = await HDLmSecurity.checkVerificationCodeServer(localChallengeName,
                                                                           localUserid, 
                                                                           localVerificationCode,
                                                                           localSessionId);
          /* console.log(responseObj); */ 
          /* Check if the status code from the call, shows
             that the call succeeded */
          let responseStatus = responseObj.status;
          /* check if the verification code was even minimally valid.
             If it was not even minimally valid, we need to get a new
             combination of userid and password. */
          if (responseStatus != 200) {
            let errorText = 'The verification code was invalid';
            HDLmManageRules.displayErrorMessage(errorText);
            stage = HDLmManageRulesStageTypes.getVerificationCode;
            break;
          }
          /* The reponse body will have additional information 
             that we will ignore */
          else {
            let responseBody = responseObj.body;
            let responseReader = responseBody.getReader();
            let responseRead = await responseReader.read();
            stage = HDLmManageRulesStageTypes.setAccessCookie;
            break;
          }
        } 
        /* This case does not appear to be in use */
        case HDLmManageRulesStageTypes.sendVerificationCodeResponse: 
        /* Set the access cookie. This eliminates the need for the 
           user to login each time. */
        case HDLmManageRulesStageTypes.setAccessCookie: {
          /* This code is only really needed if we were not 
             able to use the access cookie. This code stores
             the access cookie. */
          if (HDLmManageRules.getFromCookie == false) {
            /* Get a local copy of the AES secret encryption key */
            let localKey = HDLmConfigInfo.getSecretEncryptionKey();
            /* Get local copies of the userid and password */
            let localUserid = HDLmManageRules.accessUserid;
            let localPassword = HDLmManageRules.accessPassword;
            /* Build an object that contains the userid and password */
            let localObject = { "userid": localUserid,
                                "password": localPassword };
            /* Convert the object to a string and encrypt the string */
            let localJson = JSON.stringify(localObject);
            /* Wait for the encryption process to complete. The result 
               is a view of the actual encrypted data. */ 
            let responseView = await HDLmEncryption.encrypt(localKey, localJson); 
            /* console.log(responseView); */
            /* Convert the response view to as base 64 ASCII string by base 64
               encoding it. Note that some special code was obtained from Stack
               Overflow ("How to convert uint8 Array to base64 Encoded String?"). */
            let responseB64 = btoa(String.fromCharCode.apply(null, responseView));
            /* console.log(responseB64); */
            HDLmManageRules.setAccessCookie(responseB64);
            /* The server appears to have stored the session cookie */
            stage = HDLmManageRulesStageTypes.getModifications;
            break;
          } 
          /* We were able to use the access cookie. In that case,
             we can just go to the next step. */  
          else {
            stage = HDLmManageRulesStageTypes.getModifications;
            break
          }
        }
        /* Get the rules/modifications from the server */
        case HDLmManageRulesStageTypes.getModifications: {
          /* console.log('In HDLmManageRules.nextStage before get modifications'); */
          let responseText = await HDLmTree.passReadSomeRows(HDLmManageRules.accessUserid, 
                                                             HDLmManageRules.accessPassword);
          /* let rtl = responseText.length; */
          /* let rtl2 = responseText.length; */
          /* console.log('In HDLmManageRules.nextStage after get modifications', responseText); */
          /* console.log(responseText); */
          /* Convert the JSON string obtained by the call above 
             back into set of objects */
          HDLmTree.addToTree(responseText);
          /* Get the top of the tree */
          let treeTop = HDLmTree.getTreeTop();             
          /* Build the companies/rules array. The array has one
             entry for each company in the tree that actually 
             has zero or more rules. */
          let companiesArray = HDLmTree.buildCompaniesArray(treeTop); 
          if (1 == 2)  
            companiesArray.length = 0; 
          HDLmManageRules.companiesArray = companiesArray;
          /* We now have the rules. We need to select a specific company. */
          stage = HDLmManageRulesStageTypes.getSpecificCompany;
          break;
        }
        case HDLmManageRulesStageTypes.getSpecificCompany: {
          /* The user needs to select a specific company */
          let localWebpageDomainName = await HDLmManageRules.getSpecificCompany(HDLmManageRules.companiesArray);
          if (localWebpageDomainName == null) {
            /* Terminate the next stage loop and terminate the switch */
            nextStageLoop = false;
            break; 
          }
          else
            HDLmManageRules.webpageDomainName = localWebpageDomainName;
          /* We now have selected a specific company. We 
             need to turn test mode on. */
          stage = HDLmManageRulesStageTypes.setTestModeOn;
        }
        case HDLmManageRulesStageTypes.setTestModeOn: {
          /* Turn test mode on for the current user */
          await HDLmManageRules.setTestModeOn();
          stage = HDLmManageRulesStageTypes.showWebPageUi;
          break;
        }
        /* Handle the initial web page UI case */
        case HDLmManageRulesStageTypes.showWebPageUi: {     
          HDLmManageRules.addStyleHighLightClass();
          HDLmManageRules.addStyleNewlyCreatedClass();
          HDLmManageRules.addStyleTextAreaInvisibleClass();
          HDLmManageRules.addStyleTextAreaRolloverClass();
          HDLmManageRules.addStyleTextAreaVisibleClass();
          /* console.log('In HDLmManageRules.nextStage in showWebPageUi'); */
          /* Get where the React elements are to be placed */          
          let reactRoot = HDLmReactFour.getRootContainer('leftAndRightPage');
          reactRoot.render(React.createElement(HDLmManageRules.buildWebUiElement));   
          /* Terminate the next stage loop and terminate the switch.
             This is no longer done because we want to run the before
             unload code. */
          /* nextStageLoop = false; */
          stage = HDLmManageRulesStageTypes.beforeUnload;
          break;  
        } 
        /* Wait for the user to close the browser.
           This may happen quite soon or it may take
           a while. */
        case HDLmManageRulesStageTypes.beforeUnload: {
          /* console.log('In HDLmManageRules.beforeUnload'); */
          /* Add an event listener to the window object. The event
             listener is used to detect when the user closes the
             browser. */
          HDLmManageRules.beforeUnloadAdd();
          /* Define a few variables */
          let beforeUnloadRejectFunction;
          let beforeUnloadResolveFunction;
          /* Create a local promise */
          let beforeUnloadPromise = new Promise(function (resolve, reject) {
            /* Save references to the reject and resolve functions */
            beforeUnloadRejectFunction = reject;
            beforeUnloadResolveFunction = resolve;
          });
          /* Store the location of the resolve function */
          HDLmManageRules.beforeUnloadResolveFunction = beforeUnloadResolveFunction;
          /* Wait for a browser close event */
          beforeUnloadPromise.then(function(responseText) {
            /* console.log(document.visibilityState); */
            responseText = responseText;
            /* Turn off test mode  */
            stage = HDLmManageRulesStageTypes.setTestModeOff;
            HDLmManageRules.nextStage(stage, '');
          },
          function(error) {
            let errorText = '';
            errorText = 'Before unload (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Turn off test mode */
            stage = HDLmManageRulesStageTypes.setTestModeOff;
            HDLmManageRules.nextStage(stage, '');
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        /* Wait for the user to change the visibility of the browser.
           This may happen quite soon or it may take a while. */
        case HDLmManageRulesStageTypes.visibilityChange: {
          /* console.log('In HDLmManageRules.visibilityChange'); */
          /* Add an event listener to the window object. The event
             listener is used to detect when the user changes the
             visibility of the browser. */
          HDLmManageRules.visibilityChangeAdd();
          /* Define a few variables */
          let visibilityChangeRejectFunction;
          let visibilityChangeResolveFunction;
          /* Create a local promise */
          let visibilityChangePromise = new Promise(function (resolve, reject) {
            /* Save references to the reject and resolve functions */
            visibilityChangeRejectFunction = reject;
            visibilityChangeResolveFunction = resolve;
          });
          /* Store the location of the resolve function */
          HDLmManageRules.visibilityChangeResolveFunction = visibilityChangeResolveFunction;
          /* Wait for a visibility change event */
          visibilityChangePromise.then(function(responseText) {
            /* console.log(document.visibilityState); */
            responseText = responseText;
            /* Turn off test mode  */
            stage = HDLmManageRulesStageTypes.setTestModeOff;
            HDLmManageRules.nextStage(stage, '');
          },
          function(error) {
            let errorText = '';
            errorText = 'Visibility change (the promise) was rejected';
            HDLmUtility.setErrorText(errorText);
            /* Turn off test mode */
            stage = HDLmManageRulesStageTypes.setTestModeOff;
            HDLmManageRules.nextStage(stage, '');
          });
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
        case HDLmManageRulesStageTypes.setTestModeOff: {
          /* Turn test mode off for the current user */
          HDLmManageRules.setTestModeOff();
          /* Terminate the next stage loop and terminate the switch */
          nextStageLoop = false;
          break;
        }
      }
    }
  }
  /* This routine removes a set of rules from the correct
     company in the companies array. The rules were created
     (probably) by the generation process. */
  static removeRulesFromCompanies(numberOfRulesToBeRemoved, companyNumber, companiesArray) {  
    /* console.log('In HDLmManageRules.removeRulesFromCompanies'); */
    /* Check if invalid values were passed. This should never
       be the case. */
    if (numberOfRulesToBeRemoved <= 0 || 
        companyNumber            <= 0 ||
        companiesArray.length    == 0) { 
      return;
    }
    /* Get the requested company */ 
    let companyEntry = companiesArray[companyNumber - 1];
    if (companyEntry == null)
      return;
    if (Array.isArray(companyEntry.rules) == false)
      companyEntry.rules = [];
    /* Remove some rules from the current company */   
    companyEntry.rules.splice(0, numberOfRulesToBeRemoved);    
    /* Check if we found a matching company. If so we
       need to reset all of the rule numbers. */
    if (companyEntry != null) {
      let companyRules = companyEntry.rules;
      let ruleNumber = 0;
      for (let ruleEntry of companyRules) {
        ruleNumber++;
        let ruleIdentity = [];
        ruleIdentity.push(companyNumber);
        ruleIdentity.push(ruleNumber); 
        ruleEntry.identity = ruleIdentity;
      }
    }
  }
  /* This routine adds a company number and rule number
     pair passed by the caller from the rules IDs array. This
     might result in the rules IDs array shrinking or getting
     bigger or even staying the same. Of course, the passed
     company number and passed rule number pair must not
     match an existing entry in the rules IDs array. The 
     passed rule number might be a simple number or it might
     be a range. We must support both cases. */
  static ruleIdsAdd(ruleIdsArray, 
                    passedCompanyNumber,
                    passedRuleNumber) {
    /* console.log('In HDLmManageRules.ruleIdsAdd'); */
    /* Check if the caller passed a simple number or a range */
    let passedRuleNumberType = typeof(passedRuleNumber);
    let firstPassedRuleNumber;
    let lastPassedRuleNumber;
    if (passedRuleNumberType == 'string') {
      [firstPassedRuleNumber, lastPassedRuleNumber] = 
        HDLmManageRules.ruleIdsRange(passedRuleNumber);
    }
    else {
      firstPassedRuleNumber = lastPassedRuleNumber = passedRuleNumber;
    }
    /* Set a few flags and variables */
    let passedMatchFound = false;
    let passedRuleAdded = false;
    let ruleIdsResults = [];    
    /* If ruleIdsArray is null, initialize it to an 
       empty list. This step simplifies the code below. */     
    if (ruleIdsArray == null)
      ruleIdsArray = [];
    let ruleIdsArrayLen = ruleIdsArray.length;
    /* Check if the input array is empty */
    if (ruleIdsArrayLen == 0) {
      /* If the input array is empty, just add the new rule ID 
         to the output array. The passed rule number might be a
         simple number or a range. We must support both cases. */
      ruleIdsResults.push([passedCompanyNumber, passedRuleNumber]);
      passedRuleAdded = true;
      return ruleIdsResults;
    }
    /* Scan the rules ID array for a matching entry */
    let ruleIdsIndex;
    let ruleId;
    for (ruleIdsIndex = 0; ruleIdsIndex < ruleIdsArray.length; ruleIdsIndex++) {
      ruleId = ruleIdsArray[ruleIdsIndex];
      let ruleIdCompanyNumber = ruleId[0];
      /* Check if the current company number shows that we 
         have a ways to go */
      if (ruleIdCompanyNumber < passedCompanyNumber) {
        ruleIdsResults.push(ruleId);
        continue;
      }
      /* Check if the current company number shows that we
         have gone past the passed company */
      if (ruleIdCompanyNumber > passedCompanyNumber) {
        /* Check if the passed rule ID was added to the
           results array. If it was not added, then it
           must be added now. */
        if (passedRuleAdded == false) {
          /* Create a new local rule ID for just one rule */
          let localRuleId = [passedCompanyNumber, passedRuleNumber];
          /* The new local rule ID value can be added to
             the result output array */
          ruleIdsResults.push(localRuleId);
          passedRuleAdded = true;
        }
        /* Add the current rule ID to the result output array */
        ruleIdsResults.push(ruleId);
        continue;
      }
      /* At this point, the company numbers are equal. We
         need to check the rule numbers. Get the current 
         rule number. It might be a simple number or it 
         might be a string containing a range. We need
         to suport both cases. */
      let ruleIdRuleNumber = ruleId[1];
      let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
      let firstRuleIdNumber;
      let lastRuleIdNumber; 
      /* Check if the rule ID rule number is a string
         or a number. If the rule ID is really a string,
         then it will contain a range of actual rule
         numbers. */
      if (ruleIdRuleNumberType == 'string') 
        [firstRuleIdNumber, lastRuleIdNumber] = 
          HDLmManageRules.ruleIdsRange(ruleIdRuleNumber);
      else
        firstRuleIdNumber = lastRuleIdNumber = ruleIdRuleNumber;
      /* Check if the current rule number shows that we
         have a ways to go or if we have gone too far. 
         If the rule number is greater than the passed 
         rule number, then we have gone too far. */
      if (lastRuleIdNumber  < firstPassedRuleNumber ||
          firstRuleIdNumber > lastPassedRuleNumber) {  
        let localRuleId;
        [ruleIdsIndex, localRuleId] = HDLmManageRules.ruleIdsFirstLast(
                                        ruleIdsIndex,
                                        ruleIdsArray, 
                                        passedCompanyNumber,
                                        passedRuleNumber,
                                        passedRuleAdded, 
                                        firstRuleIdNumber,
                                        lastRuleIdNumber);
        if (localRuleId != null) {
          ruleIdsResults.push(localRuleId);
          passedRuleAdded = true;
          continue;
        }    
        else {    
          /* Check if the passed rule ID was added to the
             results array. If it was not added, then it
             must be added now. */
          if (firstRuleIdNumber > firstPassedRuleNumber &&  
              passedRuleAdded  == false) {
            let localRuleId = [passedCompanyNumber, passedRuleNumber];
            ruleIdsResults.push(localRuleId);
            passedRuleAdded = true;
          }   
          ruleIdsResults.push(ruleId);
          continue; 
        }
      }
      /* Check if the passed rule number is within the range.
         Note, that this code applies to the case where we 
         actually have a range of rule numbers and the case
         of where the first and last rule numbers are the same.
         This is a serious error. This should never
         happen. */
      if (passedRuleNumber >= firstRuleIdNumber && 
          passedRuleNumber <= lastRuleIdNumber) {
        passedMatchFound = true; 
        if (passedMatchFound == true) {
          let errorText = 'Rule passed to ruleIdsAdd found in rules IDs array'; 
          HDLmAssert(false, errorText);
        }        
        continue;
      }       
    }
    /* Check if the passed rule ID was added to the
       results array. If it was not added, then it
       must be added now. This can happen if the
       passsed rule ID array did not have any
       entries with a company number that was
       greater than the passed company number. 
       This can also happen if the passed rule
       ID array did not have any entries with 
       a rule number (within a company) that was
       greater than the passed rule number. */
    if (passedRuleAdded == false) {
      let localRuleId = [passedCompanyNumber, passedRuleNumber];
      ruleIdsResults.push(localRuleId);
      passedRuleAdded = true;
    }
    /* Return the final set of results to the caller */
    return ruleIdsResults;
  }
  /* This routine adjusts the rules IDs array for a specific
     company. The adjustment is either positive (if rules are 
     being added) or negative (if rules are being removed).
     Note that a new rules IDs array is returned to the caller. 
     The original rules IDs array is not changed. */
  static ruleIdsAdjust(ruleIdsArray, 
                       passedCompanyNumber,
                       adjustmentFactor) {
    /* console.log('In HDLmManageRules.ruleIdsAdjust'); */
    let ruleIdsResults = [];    
    /* If ruleIdsArray is null, initialize it to an 
       empty list. This step simplifies the code 
       below. */     
    if (ruleIdsArray == null)
      ruleIdsArray = [];
    /* Process each entry in the rules ID array */
    for (let ruleId of ruleIdsArray) {
      let ruleIdCompanyNumber = ruleId[0];
      /* Check if the current company number shows that we 
         should ignore this rule ID */
      if (ruleIdCompanyNumber != passedCompanyNumber) {
        ruleIdsResults.push(ruleId);
        continue;
      }     
      /* We need to build a local copy of the rule ID */
      let localRuleId = [ruleId[0], ruleId[1]]; 
      /* At this point, the company numbers are equal. We
         need to check the rule numbers. Get the current 
         rule number. It might be a simple number or it 
         might be a string containing a range. */
      let ruleIdRuleNumber = ruleId[1];
      let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
      /* Check if the rule ID rule number is a string
         or a number. If the rule ID is really a string,
         then it will contain a range of actual rule
         numbers. We need to support both cases. */
      if (ruleIdRuleNumberType == 'string') {
        let firstRuleIdNumber;
        let lastRuleIdNumber; 
        [firstRuleIdNumber, lastRuleIdNumber] = 
          HDLmManageRules.ruleIdsRange(ruleIdRuleNumber); 
        firstRuleIdNumber += adjustmentFactor;
        lastRuleIdNumber += adjustmentFactor;
        localRuleId[1] = firstRuleIdNumber.toString() + 
                           '-' + 
                           lastRuleIdNumber.toString();
      }  
      else {
        ruleIdRuleNumber += adjustmentFactor;
        localRuleId[1] = ruleIdRuleNumber;
      }
      /* Add the local rule ID to the results array */
      ruleIdsResults.push(localRuleId);
      continue;
    }   
    /* Return the final set of results to the caller */
    return ruleIdsResults
  }
  /* This routine checks if a company number and rule number
     pair passed by the caller can be found in the rule IDs
     array. This routine returns null if the pair is not
     found in any existing entry and returns the entry (which
     might be a range if the company number / rule number pair
     is found in a range). The passed rule number might be a 
     simple number or it might be a range. We need to support
     both cases. */
  static ruleIdsCheck(ruleIdsArray, 
                      passedCompanyNumber,
                      passedRuleNumber) {
    /* console.log('In HDLmManageRules.ruleIdsCheck'); */
    /* Check if the caller passed a simple number or a range */
    let passedRuleNumberType = typeof(passedRuleNumber);
    let firstPassedRuleNumber;
    let lastPassedRuleNumber;
    if (passedRuleNumberType == 'string') {
      [firstPassedRuleNumber, lastPassedRuleNumber] = 
        HDLmManageRules.ruleIdsRange(passedRuleNumber);
    }
    else {
      firstPassedRuleNumber = lastPassedRuleNumber = passedRuleNumber;
    }
    /* Check if the rule IDs array passed by the caller is 
       null or not */
    if (ruleIdsArray == null) {
      return null;
    }
    /* Scan the list of high-level list entries looking for
       an entry that contains the passed company number and 
       passed rule number */
    let ruleIdCounter = 0;
    for (let ruleId of ruleIdsArray) {
      ruleIdCounter++;
      let ruleIdCompanyNumber = ruleId[0];
      /* Check if the current company number shows that we 
         have a ways to go */
      if (ruleIdCompanyNumber < passedCompanyNumber)
        continue;
      /* Check if the current company number shows that we
         have gone past the company we are looking for */
      if (ruleIdCompanyNumber > passedCompanyNumber)
        return null;
      /* Get the current rule number. It might be a simple
         number or it might be a string containing a range. */
      let ruleIdRuleNumber = ruleId[1];
      let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
      /* Check if the rule ID rule number is a string
         or a number. If the rule ID is really a string,
         then it will contain a range of actual rule
         numbers. */
      if (ruleIdRuleNumberType == 'string') {
        let firstRuleIdNumber;
        let lastRuleIdNumber; 
        [firstRuleIdNumber, lastRuleIdNumber] = 
          HDLmManageRules.ruleIdsRange(ruleIdRuleNumber);
        /* Check if the last rule number in the range shows 
           that we have a ways to go */
        if (lastRuleIdNumber < lastPassedRuleNumber)
          continue;  
        /* Check if we have gone too far. If the first
           first rule number is greater than the passed 
           rule number, then we have gone too far. */
        if (firstRuleIdNumber > firstPassedRuleNumber) {
          return null;
        }
        /* Check if the passed rule number is within the range */
        if (firstPassedRuleNumber >= firstRuleIdNumber && 
            lastPassedRuleNumber  <= lastRuleIdNumber) 
          return ruleId; 
      }
      /* The rule number type in the Rule ID shows that it is 
         just a simple number. The number is used below. */
      else {
        /* Check if the current rule number shows that we 
           have a ways to go */
        if (ruleIdRuleNumber < firstPassedRuleNumber)
          continue;
        /* Check if we have gone too far. If the rule 
           number is greater than the passed rule 
           number, then we have gone too far. */
        if (ruleIdRuleNumber > lastPassedRuleNumber) {
          return null;
        }
        /* Check if the passed rule number is exactly equal
           to the rule ID rule number */
        if (firstPassedRuleNumber == ruleIdRuleNumber && 
            lastPassedRuleNumber  == ruleIdRuleNumber) 
          return ruleId; 
      }
    }
    /* Check if no matching entry was found */
    return null;
  }
  /* The current rule is merged with the next 
     rule if possible. The next rule might be 
     a range or it might be a simple number. In
     all cases, the merging process will produce
     a rule number that is a range. The current 
     rule number passed to this routine might be 
     a range or it might be just a simple number.
     We need to support both cases. */     
  static ruleIdsCheckNext(ruleIdsIndex,
                          ruleIdsArray, 
                          localRuleId,
                          passedCompanyNumber,
                          passedRuleNumber,
                          startRuleNumber) {
    /* console.log('In HDLmManageRules.ruleIdsCheckNext'); */
    /* If ruleIdsArray is null, initialize it to an 
       empty list. This step simplifies the code 
       below. */     
    if (ruleIdsArray == null)
      ruleIdsArray = [];
    /* Check a few values passed by the caller */
    let passedRuleNumberType = typeof(passedRuleNumber);
    let firstPassedRuleNumber;
    let lastPassedRuleNumber;
    if (passedRuleNumberType == 'string') {
      [firstPassedRuleNumber, lastPassedRuleNumber] = 
        HDLmManageRules.ruleIdsRange(passedRuleNumber);
    }
    else {
      firstPassedRuleNumber = lastPassedRuleNumber = passedRuleNumber;
    }
    /* Check if a next rule ID even exists.
       If the next rule ID does not exist,
       just return the current index and
       the local rule ID both passed by the 
       caller. */ 
    let ruleIdsArrayLen = ruleIdsArray.length;
    if ((ruleIdsIndex + 1) >= ruleIdsArrayLen)
      return [ruleIdsIndex, localRuleId];
    /* Under some circumstances, we need to merge
       the next rule ID into the local rule ID.
       The next rule ID might be a range or it
       might be a simple number. */            
    /* Get some information about the next rule ID */
    let nextRuleId = ruleIdsArray[ruleIdsIndex + 1];
    let nextRuleIdCompanyNumber = nextRuleId[0];
    let nextRuleIdRuleNumber = nextRuleId[1];
    /* Check if the next rule ID is a string */
    let nextRuleIdRuleNumberType = typeof(nextRuleIdRuleNumber);
    /* Check if the next rule ID rule number is a string
       or a number. If the rule ID is really a string,
       then it will contain a range of actual rule
       numbers. */
    if (nextRuleIdRuleNumberType == 'string') {
      let nextFirstRuleIdNumber;
      let nextLastRuleIdNumber; 
      [nextFirstRuleIdNumber, nextLastRuleIdNumber] = 
        HDLmManageRules.ruleIdsRange(nextRuleIdRuleNumber);
      /* Check if the next rule ID is in the same company
         and if the next rule ID first rule number is just 
         one greater than the current rule ID. */
      if (nextRuleIdCompanyNumber     == passedCompanyNumber &&
          (nextFirstRuleIdNumber - 1) == lastPassedRuleNumber) {
        localRuleId[1] = startRuleNumber + '-' + nextLastRuleIdNumber;
        /* Skip the next rule ID since it has been merged
           into the local rule ID */
        ruleIdsIndex++;
      }  
    }
    /* The next rule number type shows that it is just a simple
       number. The next number is used below. */
    else {
      /* Check if the next rule ID is in the same company
         and is just one greater than the current rule ID. */
      if (nextRuleIdCompanyNumber    == passedCompanyNumber &&
          (nextRuleIdRuleNumber - 1) == lastPassedRuleNumber) {
        localRuleId[1] = startRuleNumber + '-' + nextRuleIdRuleNumber;
        /* Skip the next rule ID since it has been merged
           into the local rule ID */
        ruleIdsIndex++;
      }  
    }
    /* Return the current index and the local rule ID */             
    return [ruleIdsIndex, localRuleId];
  }
  /* This routine returns the first combination of company
     number and rule number found in the rule IDs. This 
     routine does not appear to be in use. */ 
  static ruleIdsFirst(ruleIdsArray) {
    /* console.log('In HDLmManageRules.ruleIdsFirst'); */
    /* Check if the rule Ids array passed by the caller is 
       null or not */
    if (ruleIdsArray == null) {
      return null;
    }
    let ruleIdsArrayLen = ruleIdsArray.length;
    if (ruleIdsArrayLen == 0) {
      return null;
    }
    /* Get the first entry in the rule IDs array */
    let firstEntry = ruleIdsArray[0];
    let ruleIdcompanyNumber = firstEntry[0];
    /* Get the current rule number. It might be a simple
       number or it might be a string containing a range. */
    let ruleIdRuleNumber = firstEntry[1];
    let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
    /* Check if the rule ID rule number is a string
       or a number. If the rule ID is really a string,
       then it will contain a range of actual rule
       numbers. */
    if (ruleIdRuleNumberType == 'string') {
      let firstRuleIdNumber;
      let lastRuleIdNumber; 
      [firstRuleIdNumber, lastRuleIdNumber] = 
        HDLmManageRules.ruleIdsRange(ruleIdRuleNumber);
      return [ruleIdcompanyNumber, firstRuleIdNumber];  
    }
    /* The rule number type shows that it is just a simple
       number. The number is used below. */
    else {
      return [ruleIdcompanyNumber, ruleIdRuleNumber];
    }
  }
  /* This routine checks if the passed rule number 
     can be merged with an existing rule in the rule
     array. The passed rule number may be one less than
     the bottom of an entry in the rule array or it may
     be one greater than the top of an entry in the rule
     array. Note, that the next rule is merged into the 
     current rule if possible. The passed rule number
     might be a simple number or it might be a range. 
     We must support both cases. */
  static ruleIdsFirstLast(ruleIdsIndex,
                          ruleIdsArray, 
                          passedCompanyNumber,  
                          passedRuleNumber,
                          passedRuleAdded, 
                          firstRuleIdNumber,
                          lastRuleIdNumber) {
    /* console.log('In HDLmManageRules.ruleIdsFirstLast'); */
    /* Check if the caller passed a simple number or a range */
    let passedRuleNumberType = typeof(passedRuleNumber);
    let firstPassedRuleNumber;
    let lastPassedRuleNumber;
    if (passedRuleNumberType == 'string') {
      [firstPassedRuleNumber, lastPassedRuleNumber] = 
        HDLmManageRules.ruleIdsRange(passedRuleNumber);
    }
    else {
      firstPassedRuleNumber = lastPassedRuleNumber = passedRuleNumber;
    }
    let localRuleId = null;
    /* Check if the first rule ID rule number is exactly one 
       greater than the passed rule number. In this case
       we want to create a range of rule numbers. In this 
       case the existing rule ID comes after the new rule 
       number. */
    if (passedRuleAdded         == false &&
        (firstRuleIdNumber - 1) == lastPassedRuleNumber) {
      localRuleId = [passedCompanyNumber, 
                      firstPassedRuleNumber + 
                        '-' + 
                        lastRuleIdNumber];                             
      /* Under some circumstances, we need to merge
         the next rule ID into the local rule ID.
         The next rule ID might be a range or it
         might be a simple number. */
      [ruleIdsIndex, localRuleId] = HDLmManageRules.ruleIdsCheckNext(
                                      ruleIdsIndex, 
                                      ruleIdsArray, 
                                      localRuleId,
                                      passedCompanyNumber,
                                      localRuleId[1],
                                      firstPassedRuleNumber);   
      /* Return the current index and the local rule ID */             
      return [ruleIdsIndex, localRuleId];                        
    }   
    /* Check if the last rule ID rule number is exactly one 
       less than the passed rule number. In this case we want
       to create a range of rule numbers. In this case the 
       existing rule ID comes before the new rule number. */
    if (passedRuleAdded      == false &&
        (lastRuleIdNumber + 1) == firstPassedRuleNumber) {
      localRuleId = [passedCompanyNumber, 
                      firstRuleIdNumber + 
                        '-' + 
                        lastPassedRuleNumber];
      /* Under some circumstances, we need to merge
         the next rule ID into the local rule ID.
         The next rule ID might be a range or it
         might be a simple number. */
      [ruleIdsIndex, localRuleId] = HDLmManageRules.ruleIdsCheckNext(
                                      ruleIdsIndex, 
                                      ruleIdsArray, 
                                      localRuleId,
                                      passedCompanyNumber,
                                      localRuleId[1],
                                      firstRuleIdNumber);   
      /* Return the current index and the local rule ID */             
      return [ruleIdsIndex, localRuleId];                       
    }
    /* Return the current index and the local rule ID */             
    return [ruleIdsIndex, localRuleId];  
  }  
  /* This routine returns a list of company numbers and rule
     numbers. Each entry in the high-level list (the one 
     returned) is actually a lower-level list. The lower-level
     list has two entries. The first entry in the lower-level
     list is the company number and the second entry is the 
     rule number. If the passed rule Ids array is null, then
     a null value is returned. */
  static ruleIdsList(ruleIdsArray) {
    /* console.log('In HDLmManageRules.ruleIdsList'); */
       /* Build the list of company numbers and rule numbers */
    let ruleIdsresults = [];
    /* Check if the rule IDs array passed by the caller is 
       null or not */
    if (ruleIdsArray == null) {
      return ruleIdsresults;
    }
    /* Process each entry in the rules ID array */
    for (let ruleId of ruleIdsArray) {
      let companyNumber = ruleId[0];
      let ruleNumber;
      /* Get the current rule number. It might be a simple
         number or it might be a string containing a range. */
      let ruleIdRuleNumber = ruleId[1];
      let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
      /* Check if the rule ID rule number is a string
         or a number. If the rule ID is really a string,
         then it will contain a range of actual rule
         numbers. */
      if (ruleIdRuleNumberType == 'string') {
        let firstRuleNumber;
        let lastRuleNumber; 
        [firstRuleNumber, lastRuleNumber] = 
          HDLmManageRules.ruleIdsRange(ruleIdRuleNumber);
        for (let i = firstRuleNumber; i <= lastRuleNumber; i++) {
          ruleIdsresults.push([companyNumber, i]);
        }
      }
      /* The rule number type shows that it is just a simple
         number. The number is used below. */
      else {
        let ruleNumber = ruleIdRuleNumber;
        ruleIdsresults.push([companyNumber, ruleNumber]);
      }
    }
    return ruleIdsresults;
  }  
  /* This routine is passed a rule number range as a
     string (for example, '1-3'). The routine returns
     the first rule number (in this example, 1) and
     the last rule number (in this example, 3). */
  static ruleIdsRange(ruleNumberRange) {
    /* console.log('In HDLmManageRules.ruleIdsRange'); */
    let firstRuleNumber;
    let lastRuleNumber;
    /* Check if the rule number range is valid */
    if (ruleNumberRange) {
      /* Split the range into two parts */
      let rangeParts = ruleNumberRange.split('-');
      if (rangeParts.length == 2) {
        firstRuleNumber = parseInt(rangeParts[0]);
        lastRuleNumber = parseInt(rangeParts[1]);
      }
      /* This case should never happen, but we need to
         handle it anyway */
      else {
        let errorText = 'Invalid rule number range found in ruleIdsRange - ' + ruleNumberRange; 
        HDLmAssert(false, errorText);
      }
    }
    return [firstRuleNumber, lastRuleNumber];
  }  
  /* This routine removes a company number and rule number
     pair passed by the caller from the rules ID array. This 
     might result in the rules ID array shrinking or getting
     bigger or even staying the same. Of course, the passed  
     company number and passed rule number pair must match 
     an entry in the rules ID array. The passed rule number
     might be a simple number or it might be a range. We must 
     support both cases.*/
  static ruleIdsRemove(ruleIdsArray, 
                       passedCompanyNumber,
                       passedRuleNumber) {
    /* console.log('In HDLmManageRules.ruleIdsRemove'); */
    /* Check if the caller passed a simple number or a range */
    let passedRuleNumberType = typeof(passedRuleNumber);
    let firstPassedRuleNumber;
    let lastPassedRuleNumber;
    if (passedRuleNumberType == 'string') {
      [firstPassedRuleNumber, lastPassedRuleNumber] = 
        HDLmManageRules.ruleIdsRange(passedRuleNumber);
    }
    else {
      firstPassedRuleNumber = lastPassedRuleNumber = passedRuleNumber;
    }
    let passedMatchFound = false;
    /* Check if the rule IDs array passed by the caller is
       null or not */
    if (ruleIdsArray == null || 
        ruleIdsArray.length == 0) {
      let errorText = 'Rule passed to ruleIdsRemove not found in empty rules IDs array'; 
      HDLmAssert(false, errorText);
    }
    /* Scan the list of high-level list entries looking for
       an entry that contains the passed company number and 
       passed rule number */
    let ruleIdsResults = [];
    for (let ruleId of ruleIdsArray) {
      let ruleIdCompanyNumber = ruleId[0];
      /* Check if the current company number shows that we 
         have a ways to go */
      if (ruleIdCompanyNumber < passedCompanyNumber) {
        ruleIdsResults.push(ruleId);
        continue;
      }
      /* Check if the current company number shows that we
         have gone past the company we are looking for */
      if (ruleIdCompanyNumber > passedCompanyNumber) {
        ruleIdsResults.push(ruleId);
        continue;
      }
      /* Get the current rule number. It might be a simple
         number or it might be a string containing a range. */
      let ruleIdRuleNumber = ruleId[1];
      let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
      /* Check if the rule ID rule number is a string
         or a number. If the rule ID is really a string,
         then it will contain a range of actual rule
         numbers. */
      if (ruleIdRuleNumberType == 'string') {
        let firstRangeRuleNumber;
        let lastRangeRuleNumber; 
        [firstRangeRuleNumber, lastRangeRuleNumber] = 
          HDLmManageRules.ruleIdsRange(ruleIdRuleNumber);
        /* Check if the current rule number shows that we 
           have a ways to go */
        if (lastRangeRuleNumber < firstPassedRuleNumber) {
          ruleIdsResults.push(ruleId);
          continue; 
        }
        /* Check if we have gone too far. If the first
           rule number is greater than the passed rule 
           number, then we have gone too far. */
        if (firstRangeRuleNumber > lastPassedRuleNumber) {
          ruleIdsResults.push(ruleId);
          continue;
        }
        /* Check if the passed rule number is within the range */
        if (firstPassedRuleNumber >= firstRangeRuleNumber && 
            lastPassedRuleNumber  <= lastRangeRuleNumber) {
          passedMatchFound = true;
          /* At this point we have three cases to consider. First, 
             the start of the passed rule number might exactly 
             be equal to the first range rule number. Second, the 
             passed rule number (which might be a range) might be 
             between the first range rule number and the last range 
             rule number. Third, the end of the passed rule number 
             might be exactly equal to the last range rule number. */ 
          if (firstPassedRuleNumber == firstRangeRuleNumber) {
            /* Modify the first rule number. This has the 
               effect of removing the passed rule number from
               the range. */
            firstRangeRuleNumber = lastPassedRuleNumber + 1;
            /* At this point, we may have used up the entire 
               range. We need to check for this case. */
            if (firstRangeRuleNumber > lastRangeRuleNumber)
              continue;
            let localRuleId;
            /* Check if the range has shrunk to nothing. Nothing
               in this case means a single rule ID, and not a range. */
            if (firstRangeRuleNumber == lastRangeRuleNumber) 
              localRuleId = [passedCompanyNumber, firstRangeRuleNumber];
            else
              localRuleId = [passedCompanyNumber, 
                             firstRangeRuleNumber.toString() + '-' + lastRangeRuleNumber.toString()];
            /* The new local rule ID value can be added to
               the result output array */
            ruleIdsResults.push(localRuleId);
            continue
          }
          /* Second, the passed rule number might be greater
             than the first rule number and less than the last
             rule number. In this case, we are going to have 
             to split the range. */
          if (firstPassedRuleNumber > firstRangeRuleNumber &&
              lastPassedRuleNumber  < lastRangeRuleNumber) {
            let firstPassedRuleNumberMinusOne = firstPassedRuleNumber - 1;
            let lastPassedRuleNumberPlusOne = lastPassedRuleNumber + 1;
            let localRuleId;
            /* Check if the first part of the split range has
               shrunk to nothing. Nothing in this case means a 
               single rule ID, and not a range. */
            if (firstRangeRuleNumber == firstPassedRuleNumberMinusOne) 
              localRuleId = [passedCompanyNumber, firstRangeRuleNumber];
            else
              localRuleId = [passedCompanyNumber, 
                             firstRangeRuleNumber.toString() + 
                               '-' + 
                               firstPassedRuleNumberMinusOne.toString()];
            /* The new local rule ID value can be added to
               the result output array */
            ruleIdsResults.push(localRuleId);                   
            /* Check if the second part of the split range has
               shrunk to nothing */
            if (lastRangeRuleNumber == lastPassedRuleNumberPlusOne) 
              localRuleId = [passedCompanyNumber, lastRangeRuleNumber];
            else
              localRuleId = [passedCompanyNumber, 
                             lastPassedRuleNumberPlusOne.toString() + 
                               '-' + 
                               lastRangeRuleNumber.toString()];
            /* The new local rule ID value can be added to
               the result output array */
            ruleIdsResults.push(localRuleId); 
            continue;           
          }
          /* Third, the last passed rule number might be equal 
             to the last rule range number */
          if (lastPassedRuleNumber == lastRangeRuleNumber) {
            /* Modify the last rule number. This has the 
               effect of removing the passed rule number from
               the range. */
            lastRangeRuleNumber = firstPassedRuleNumber - 1;
            /* At this point, we may have used up the entire 
               range. We need to check for this case. */
            if (firstRangeRuleNumber > lastRangeRuleNumber)
              continue;
            let localRuleId;
            /* Check if the range has shrunk to nothing. Nothing
               in this case means a single rule ID, and not a range. */
            if (firstRangeRuleNumber == lastRangeRuleNumber) 
              localRuleId = [passedCompanyNumber, firstRangeRuleNumber];
            else
              localRuleId = [passedCompanyNumber, 
                             firstRangeRuleNumber.toString() + '-' + lastRangeRuleNumber.toString()];
            /* The new local rule ID value can be added to
               the result output array */
            ruleIdsResults.push(localRuleId);
            continue
          }
        }          
      }
      /* The rule number type shows that it is just a simple
         number. The number is used below. */
      else {
        /* Check if the current rule number shows that we 
           have a ways to go */
        if (ruleIdRuleNumber < passedRuleNumber) {
          ruleIdsResults.push(ruleId);
          continue;
        }
        /* Check if we have gone too far. If the rule 
           number is greater than the passed rule 
           number, then we have gone too far. */
        if (ruleIdRuleNumber > passedRuleNumber) {
          ruleIdsResults.push(ruleId);
          continue;
        }
        /* Check if the passed rule number is exactly equal
           to the rule ID rule number. In this case, we 
           don't want to include the high-level entry 
           in the final result. */
        if (passedRuleNumber == ruleIdRuleNumber) {
          passedMatchFound = true;
          continue;
        }
      }
    }
    /* Make sure that a match was found. If no match was
       found, this is a serious error and must be reported. */
    if (passedMatchFound == false) {
      let errorText = 'Rule passed to ruleIdsRemove not found in rules IDs array'; 
      HDLmAssert(false, errorText);
    }
    /* Check if no matching entry was found */
    let ruleIdsResultsLen = ruleIdsResults.length;
    if (ruleIdsResultsLen == 0)
      return null;
    return ruleIdsResults
  }
  /* This routine finds the range of rules that should
     be selected if the shift key is held down. Many
     cases are handled below. In all cases, a rule 
     number (which might be a range) is returned to
     the caller. Note, that the passed rule number 
     will always be a single number and not a range. */
  static ruleIdsShiftAdd(ruleIdsArray, 
                         passedCompanyNumber,
                         passedRuleNumber) {
    /* console.log('In HDLmManageRules.ruleIdsShiftAdd'); */
    /* Check if the rule IDs array passed by the caller is
       null or not */
    if (ruleIdsArray == null || 
        ruleIdsArray.length == 0) {
      if (passedRuleNumber >= 2) 
        return '1-' + passedRuleNumber.toString();
      else
        return 1;
    }
    /* Scan the list of high-level list entries looking for
       an entry that is after the passed rule number in the 
       the same company. We might not find any. */
    for (let ruleId of ruleIdsArray) {
      let ruleIdCompanyNumber = ruleId[0];
      /* Check if the current company number shows that we 
         have a ways to go */
      if (ruleIdCompanyNumber < passedCompanyNumber) 
        continue;
      /* Check if the current company number shows that we
         have gone past the company we are looking for */
      if (ruleIdCompanyNumber > passedCompanyNumber) 
        break;
      /* At this point, the company numbers are equal. We
         need to check the rule numbers. Get the current 
         rule number. It might be a simple number or it 
         might be a string containing a range. We need
         to suport both cases. */
      let ruleIdRuleNumber = ruleId[1];
      let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
      let firstRuleIdNumber;
      let lastRuleIdNumber; 
      /* Check if the rule ID rule number is a string
         or a number. If the rule ID is really a string,
         then it will contain a range of actual rule
         numbers. */
      if (ruleIdRuleNumberType == 'string') 
        [firstRuleIdNumber, lastRuleIdNumber] = 
          HDLmManageRules.ruleIdsRange(ruleIdRuleNumber);
      else
        firstRuleIdNumber = lastRuleIdNumber = ruleIdRuleNumber;
      /* Check if the first rule number in the range shows
         that we have a ways to go */
      if (firstRuleIdNumber < passedRuleNumber) 
        continue;
      /* We now have a rule ID that is in the same company
         and has a first rule number that is greater than 
         the passed rule number. */ 
      if (firstRuleIdNumber > passedRuleNumber) {
        let localFirstRuleIdNumberMinusOne = firstRuleIdNumber - 1;
        if (localFirstRuleIdNumberMinusOne > passedRuleNumber)
          return passedRuleNumber.toString() + 
                   '-' + 
                   localFirstRuleIdNumberMinusOne.toString();
        else
          return passedRuleNumber;
      }
    }
    /* Scan the list of high-level list entries looking for
       an entry that is before the passed rule number in the 
       the same company. We might not find any. */
    let localRuleId = null;
    for (let ruleId of ruleIdsArray) {
      let ruleIdCompanyNumber = ruleId[0];
      /* Check if the current company number shows that we 
         have a ways to go */
      if (ruleIdCompanyNumber < passedCompanyNumber) 
        continue;
      /* Check if the current company number shows that we
         have gone past the company we are looking for */
      if (ruleIdCompanyNumber > passedCompanyNumber) 
        break;
      /* At this point, the company numbers are equal. We
         need to check the rule numbers. Get the current 
         rule number. It might be a simple number or it 
         might be a string containing a range. We need
         to suport both cases. */
      let ruleIdRuleNumber = ruleId[1];
      let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
      let firstRuleIdNumber;
      let lastRuleIdNumber; 
      /* Check if the rule ID rule number is a string
         or a number. If the rule ID is really a string,
         then it will contain a range of actual rule
         numbers. */
      if (ruleIdRuleNumberType == 'string') 
        [firstRuleIdNumber, lastRuleIdNumber] = 
          HDLmManageRules.ruleIdsRange(ruleIdRuleNumber);
      else
        firstRuleIdNumber = lastRuleIdNumber = ruleIdRuleNumber;
      /* Check if the first rule number in the range shows
         that we have gone to far */
      if (firstRuleIdNumber > passedRuleNumber) 
        break;
      /* The local rule ID value might be set several times
         as this loop executes. The last value set is the
         one we want to use. */
      localRuleId = ruleId;
      continue;
    }
    /* Check if a local rule ID was found. This is the 
       last rule ID in the same company that comes before
       the passed rule number. */
    if (localRuleId != null) {
      /* At this point, the company numbers are equal. We
         need to check the rule numbers. Get the current 
         rule number. It might be a simple number or it 
         might be a string containing a range. We need
         to suport both cases. */
      let ruleIdRuleNumber = localRuleId[1];
      let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
      let firstRuleIdNumber;
      let lastRuleIdNumber; 
      /* Check if the rule ID rule number is a string
         or a number. If the rule ID is really a string,
         then it will contain a range of actual rule
         numbers. */
      if (ruleIdRuleNumberType == 'string') 
        [firstRuleIdNumber, lastRuleIdNumber] = 
          HDLmManageRules.ruleIdsRange(ruleIdRuleNumber);
      else
        firstRuleIdNumber = lastRuleIdNumber = ruleIdRuleNumber;
      /* We now have a rule ID that is in the same company
         and has a last rule number that is less than the
         passed rule number. */
      let localLastRuleIdNumberPlusOne = lastRuleIdNumber + 1;
      if (localLastRuleIdNumberPlusOne < passedRuleNumber)
        return localLastRuleIdNumberPlusOne.toString() + 
                 '-' + 
                 passedRuleNumber.toString();
      else
        return passedRuleNumber;
    }
    /* If we reach this point, then either no matching 
       company number was found or no matching rule ID 
       entry that can be used was found. In either
       case, we have more work to do. */
     if (passedRuleNumber >= 2) 
        return '1-' + passedRuleNumber.toString();
      else
        return 1;
  }
  /* This routine finds the range of rules that should
     be deselected if the shift key is held down. Many
     cases are handled below. In all cases, a rule 
     number (which might be a range) is returned to
     the caller. Note, that the passed rule number 
     will always be a single number and not a range. */
  static ruleIdsShiftRemove(ruleIdsArray, 
                            passedCompanyNumber,
                            passedRuleNumber) {
    /* console.log('In HDLmManageRules.ruleIdsShiftRemove'); */
    /* Check if the rule IDs array passed by the caller is
       null or not */
    if (ruleIdsArray == null || 
        ruleIdsArray.length == 0) {
      let errorText = 'Rule passed to ruleIdsShiftRemove not found in empty rules IDs array'; 
      HDLmAssert(false, errorText);
    }
    /* We an assume that passed rule will not found. In almost
       all cases, it will be found. */
    let passedMatchFound = false;
    /* Scan the list of high-level list entries looking for
       an entry that is after the passed rule number in the 
       the same company. We might not find any. */
    for (let ruleId of ruleIdsArray) {
      let ruleIdCompanyNumber = ruleId[0];
      /* Check if the current company number shows that we 
         have a ways to go */
      if (ruleIdCompanyNumber < passedCompanyNumber) 
        continue;
      /* Check if the current company number shows that we
         have gone past the company we are looking for */
      if (ruleIdCompanyNumber > passedCompanyNumber) 
        break;
      /* At this point, the company numbers are equal. We
         need to check the rule numbers. Get the current 
         rule number. It might be a simple number or it 
         might be a string containing a range. We need
         to suport both cases. */
      let ruleIdRuleNumber = ruleId[1];
      let ruleIdRuleNumberType = typeof(ruleIdRuleNumber);
      let firstRuleIdNumber;
      let lastRuleIdNumber; 
      /* Check if the rule ID rule number is a string
         or a number. If the rule ID is really a string,
         then it will contain a range of actual rule
         numbers. */
      if (ruleIdRuleNumberType == 'string') 
        [firstRuleIdNumber, lastRuleIdNumber] = 
          HDLmManageRules.ruleIdsRange(ruleIdRuleNumber);
      else
        firstRuleIdNumber = lastRuleIdNumber = ruleIdRuleNumber;
      /* Check if the last rule number in the range shows
         that we have a ways to go */
      if (lastRuleIdNumber < passedRuleNumber) 
        continue;
      /* Check if the first rule number in the range shows
         that we have gone to far */
      if (firstRuleIdNumber > passedRuleNumber) {
        if (passedMatchFound == false) {
          let errorText = 'Rule passed to ruleIdsShiftRemove not found in rules IDs array'; 
          HDLmAssert(false, errorText);
        }
        break;
      }
      /* We now have a rule ID that is in the same company
         and has a last rule number that is greater than
         or equal to the passed rule number. */ 
      if (firstRuleIdNumber <= passedRuleNumber &&
          lastRuleIdNumber  >= passedRuleNumber) {
        passedMatchFound = true;
        /* The passed rule number is within the range,
           if we actually have range */
        if (firstRuleIdNumber != lastRuleIdNumber)
          return firstRuleIdNumber.toString() + 
                   '-' + 
                   lastRuleIdNumber.toString();
        else
          return passedRuleNumber;
      }
    }
    /* Make sure that a match was found. If no match was
       found, this is a serious error and must be reported. */ 
    if (passedMatchFound == false) {
      let errorText = 'Rule passed to ruleIdsShiftRemove not found in rules IDs array'; 
      HDLmAssert(false, errorText);
    }   
  }
  /* This routine changes the name of an existing rule. The
     routine checks if the new name is valid. If the new
     name is valid, the rule is changed. If the new name
     is not valid, an error message is displayed to the
     user. */
  static ruleNewName(companyNumber, 
                     oldRuleNumber, 
                     oldName,
                     newName,
                     addUndoRedo) {
    /* console.log('In HDLmManageRules.ruleNewName'); */  
    /* console.log('In HDLmManageRules.ruleNewName', oldName, newName); */
    /* Check if the old name and new name are the same */
    if (oldName == newName) {
      /* The names are the same. Nothing to do */
      return;
    }
    /* Try to find the old rule */
    let oldRule = HDLmManageRules.getTreeRule(companyNumber, oldRuleNumber);
    if (oldRule == null) {
      /* The old rule could not be found */
      let errorText = 'The old rule could not be found';
      HDLmManageRules.displayErrorMessage(errorText);
      return;
    }
    /* Check if the new name has already been used. This is
       a serious error and must be reported to the user. */
    /* Get the company specified by the caller */
    let specificCompany = HDLmManageRules.getCompany(companyNumber);
    if (specificCompany == null) {
      let errorText = 'The company could not be found';
      HDLmManageRules.displayErrorMessage(errorText);
      return;
    }
    let specificCompanyRules = specificCompany.rules;
    if (Array.isArray(specificCompanyRules) == false)
      specificCompanyRules = [];
    /* Process all of the existing rules */    
    for (let existingRule of specificCompanyRules) {   
      /* Check if the new name has already been used */  
      if (existingRule.actualRule.details.name == newName) {
        /* The new name is already in use */
        let errorText = 'The new rule name is already in use';
        HDLmManageRules.displayErrorMessage(errorText);
        return;
      }      
    }    
    /* Delete the old rule from the tree of rules.
       The tree of rules is the local copy of the
       rules stored in memory. The tree of rules is
       also stored in database and in the memory of
       the server. The call below only deletes the
       rule from the local copy of the tree of rules.
       This call does not update the database. */
    let currentFancyNodeNull = null;
    let updateDatabaseFalse = false;
    HDLmTree.deleteTreeNode(currentFancyNodeNull, oldRule, updateDatabaseFalse); 
    /* Send a delete request to the server. The server
       deletes the rule from the database and from the
       memory of the server. */
    HDLmWebSockets.sendDeleteTreeNodeRequest(oldRule);
    /* Check if the old rule was highlighted. If
       it was, then remove the highlighting. */
    let highlightedCheck;
    let highlightedRuleId = HDLmManageRules.ruleIdsCheck(HDLmManageRules.ruleIdsArray,
                                                         companyNumber,
                                                         oldRuleNumber);
    highlightedCheck = (highlightedRuleId != null) ? true : false;     
    if (highlightedCheck == true) {      
      HDLmManageRules.ruleIdsArray = 
        HDLmManageRules.ruleIdsRemove(HDLmManageRules.ruleIdsArray,
                                       companyNumber,
                                       oldRuleNumber);                                      
    }
    /* If we reach this point, the new name is valid 
       and can be used */
    /* Change the rule using the new name */ 
    oldRule.details.name = newName; 
    let oldRuleNodePath = oldRule.nodePath;
    oldRule.nodePath[6] = newName;
    /* Add the rule back to the tree of rules. This 
       call does not change the database. */
    HDLmTree.storeTreeNode(oldRule);
    /* Send the modified rule to the server. The server
       updates the database. */
    HDLmManageRules.sendNewRulesToServer([oldRule]);
    /* Get the top of the tree */
    let treeTop = HDLmTree.getTreeTop();             
    /* Build the companies/rules array. The array has one
       entry for each company in the tree that actually 
       has zero or more rules. */
    let companiesArray = HDLmTree.buildCompaniesArray(treeTop);
    HDLmManageRules.companiesArray = companiesArray;
    /* Find the new rule number */
    let newRuleNumber = 0;
    specificCompany = HDLmManageRules.getCompany(companyNumber);
    if (specificCompany == null) {
      let errorText = 'The company could not be found after the rename';
      HDLmManageRules.displayErrorMessage(errorText);
      return;
    }
    specificCompanyRules = specificCompany.rules;
    if (Array.isArray(specificCompanyRules) == false)
      specificCompanyRules = [];
    for (let ruleEntry of specificCompanyRules) {
      newRuleNumber++;
      if (ruleEntry.actualRule.details.name == newName) 
        break;
    }
    /* Check if we need to highlight the rule */
    if (highlightedCheck == true) {
      /* Add the rule to list of rules to be highlighted */   
      HDLmManageRules.ruleIdsArray = 
        HDLmManageRules.ruleIdsAdd(HDLmManageRules.ruleIdsArray,
                                   companyNumber,
                                   newRuleNumber);                                    
    }
    /* The key value is incremented here to force a re-render
       of the React input areas. We use what are called uncontrolled
       components. Uncontrolled components are those that do not
       have their value controlled by React state. These components
       are typically controlled by the DOM instead. These components
       are remounted by React when the key value changes. The key
       value is actually incremented by the force re-render code. */
    /* HDLmManageRules.inputKeyValue++; */
    /* console.log('HDLmManageRules.inputKeyValue', HDLmManageRules.inputKeyValue); */
    /* We need to add an undo / redo entry in some
       cases */
    if (addUndoRedo == true)
      HDLmUnRe.addActionNewName(oldName, 
                                newName, 
                                companyNumber, 
                                oldRuleNumber,
                                newRuleNumber);
    /* Force a re-render of the rules */
    HDLmManageRules.forceReRender();
    return;
  }
  /* This routine is used to send a build cookie request
     to the server. The server builds the cookie and sends
     it back. */  
  static sendBuildCookie() {
    /* console.log('In HDLmManageRules.sendBuildCookie'); */
    /* Build an object that can be sent to the server 
       as the post (an HTTP method) body */
    let cookieObj = new Object
    cookieObj.cookieName = HDLmDefines.getString('HDLMDUMMYCOOKIE');
    cookieObj.maxAge = HDLmConfigInfo.getCookieMaxAge();
    cookieObj.password = 'Dummy';
    cookieObj.path = '/Dummy';
    cookieObj.secure = true;
    cookieObj.sameSite = 'None';
    cookieObj.userid = 'Dummy';
    let cookieJson = JSON.stringify(cookieObj);
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getentriesDatabaseInternetMethodWithSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    urlStr += '/';
    urlStr += HDLmDefines.getString('HDLMMANAGERULESBUILDCOOKIE');
    /* Send the URL to the server */
    let sendPromise = fetch(urlStr, {
                                      "method": "POST",
                                      "headers": [],
                                      "body": cookieJson
                                    }
                           );
    /* Return the promise build above to the caller */
    return sendPromise;                      
  }
  /* This routine sends one or more new rules to the server */
  static async sendNewRulesToServer(newRulesArray) {
    /* console.log('In HDLmManageRules.sendNewRulesToServer'); */
    let newRulesArrayLen = newRulesArray.length;
    if (newRulesArrayLen == 0)
      return;
    /* Build the string that is send to the server */
    let newRulesArrayString = [];
    for (let newRule of newRulesArray) {
      newRulesArrayString.push(JSON.stringify(newRule));
    }
    /* Send the rules created using AI to the server */
    /* Build a JSON string from the rules array */
    let newRulesStr = newRulesArrayString.toString();
    newRulesStr = '{"nodes": ' + '[' + newRulesStr + ']' + '}';
    /* Try to send the rules to the server */
    let sendPromise = HDLmWebSockets.sendStoreTreeNodesRequest(newRulesStr); 
    /* Wait for the store tree nodes to complete */
    let sendResponseJson = await sendPromise;
    let sendResponseObj = JSON.parse(sendResponseJson);
    let nodeIdList = sendResponseObj.resultList;
    for (let i = 0; i < newRulesArrayLen; i++) {
      newRulesArray[i].id = nodeIdList[i];
    }
  }
  /* This routine tries to set the access cookie to a value
     passed by the caller */  
  static setAccessCookie(passedCookieValue) {
    /* console.log('In setAccessCookie'); */
    /* Check if the name of the Headlamp access cookie
       has been set or not */
    if (HDLmManageRules.accessCookieName == null)
      /* Save the name of access cookie */
      HDLmManageRules.accessCookieName = HDLmDefines.getString('HDLMACCESSCOOKIE');
    /* Try to store the access cookie */
    let cookieName = HDLmManageRules.accessCookieName;
    /* Build the cookie value */
    let localValue = cookieName;
    localValue += "=";
    localValue += passedCookieValue;
    localValue += " ";
    localValue += ";";
    localValue += "Path=/; Max-Age=28800; Secure; SameSite=None "; 
    /* Store the new cookie value */
    /* localValue = "username=John Doe "; */
    document.cookie = localValue;
    /* console.log('x', "'" + passedCookieValue + "'"); */
    /* console.log('x', "'" + document.cookie + "'"); */
    return null;
  }  
  /* This routine sets a set of rules to off (the use mode is
     set to off), except for the rule specified by the caller
     which is set to test. The caller passes a company number 
     and rule number. This routine returns a string with almost
     all of the rules turned off. Note that the company number 
     and the rule number are one-based. Note also that only test
     mode rules are changed. Production mode rules are ignored. */
  static setRulesOff(companyNumber, ruleNumber) {
    /* console.log('In HDLmManageRules.setRulesOff', companyNumber, ruleNumber); */
    const constOffStr = 'off';
    const constTestStr = 'test';
    /* Get the rule specified by the caller and set it to test mode */
    let rule = HDLmManageRules.getTreeRule(companyNumber, ruleNumber);
    if (rule == null) {
      HDLmManageRules.displayErrorMessage('The selected rule could not be found');
      return '';
    }
    rule.details.usemode = constTestStr;
    /* Get the company specified by the caller */
    let specificCompany = HDLmManageRules.getCompany(companyNumber);
    if (specificCompany == null) {
      HDLmManageRules.displayErrorMessage('The selected company could not be found');
      return '';
    }
    let companyRulesArray = specificCompany.rules;
    if (Array.isArray(companyRulesArray) == false)
      companyRulesArray = [];
    /* Build the string that is send to the server */
    let companyRulesArrayString = [];
    for (let companyRule of companyRulesArray) {
      /* Get some information about the rule */
      let actualRule = companyRule.actualRule;
      let ruleIdentity = companyRule.identity;
      /* Get the use mode of the actual rule */
      let actualRuleUseMode = actualRule.details.usemode;
      if (actualRuleUseMode == constTestStr) {
        /* Check if this is the rule specified by the caller. 
           If not, then the rule is set to off. Otherwise, 
           put the rule into test mode. */
        if (companyNumber != ruleIdentity[0] ||
            ruleNumber    != ruleIdentity[1])
          actualRule.details.usemode = constOffStr;
        else {       
          actualRule.details.usemode = constTestStr;
        }
        companyRulesArrayString.push(JSON.stringify(actualRule));
      }    
    }
    /* Build a JSON string from the rules array */
    let companyRulesStr = companyRulesArrayString.toString();
    return companyRulesStr
  }
  /* This routine is used to turn test mode off for a user.
     In test mode, the user gets all of the rules, even
     the test rules. In non-test mode, the user only gets
     the production rules. */
  static setTestModeOff() {
    /* console.log('In HDLmManageRules.setTestModeOff'); */
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getentriesDatabaseInternetMethodWithSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    urlStr += '/';
    urlStr += HDLmDefines.getString('HDLMMANAGERULESSETTESTOFF');
    /* Send the URL to the server */
    let setPromise = fetch(urlStr, {
                                     "method": "POST",
                                     "headers": [],
                                     "body": {}
                                   }
                          );
    return setPromise;
  }
  /* This routine is used to turn test mode on for a user.
     In test mode, the user gets all of the rules, even
     the test rules. In non-test mode, the user only gets
     the production rules. */
  static setTestModeOn() {
    /* console.log('In HDLmManageRules.setTestModeOn'); */
    /* Build the URL that is sent to the server */
    let urlStr = '';
    urlStr += HDLmConfigInfo.getentriesDatabaseInternetMethodWithSsl();
    urlStr += '://';
    urlStr += HDLmConfigInfo.getServerName();
    urlStr += '/';
    urlStr += HDLmDefines.getString('HDLMMANAGERULESSETTESTON');
    /* Send the URL to the server */
    let setPromise = fetch(urlStr, {
                                     "method": "POST",
                                     "headers": [],
                                     "body": {}
                                   }
                          );
    return setPromise;
  }
  /* This routine set the text content of a DOM entry */ 
  static setDomEntryTextContent(domEntry, textStr) {  
    /* console.log('In HDLmManageRules.setDomEntryTextContent'); */
    /* Set the text content in the DOM entry */
    domEntry.textContent = textStr;
  }
  /* This routine is used to start an action. The action
     can really do anything. Check each action for what 
     it does and doesn't do. This routine will return
     null, if no errors are found. */ 
  static startAnAction(checkRuleSelected, checkDomainName) {
    /* console.log('In HDLmManageRules.startAnAction'); */
    /* Get rid of any existing error text */
    HDLmManageRules.clearErrorText()
    /* Set a few initial values */
    let errorText = null;
    let webpageDomainName = null;
    let ruleIdsArrayLen = 0;   
    if (HDLmManageRules.ruleIdsArray != null)
      ruleIdsArrayLen = HDLmManageRules.ruleIdsArray.length;
    /* Check if a rule has been selected. If not, display an
       error message and return to the caller. */
    if (checkRuleSelected &&
        ruleIdsArrayLen == 0) {
      errorText = 'No rule selected';
      HDLmManageRules.displayErrorMessage(errorText);
      return [errorText, webpageDomainName];
    }
    /* Check if the web page domain name should be checked */
    if (checkDomainName == false) 
      return [errorText, webpageDomainName];
    webpageDomainName = HDLmManageRules.webpageDomainName;
    /* Check if the web page domain name is set */
    if (!webpageDomainName) {
      errorText = 'The web page domain name is not set';
      HDLmManageRules.displayErrorMessage(errorText);
      return [errorText, webpageDomainName];
    }
    webpageDomainName = webpageDomainName.toLowerCase();
    let webpageDomainNameWPrefix = HDLmUtility.addHttpsPrefixDoubleSlash(webpageDomainName);
    /* Check if the web page URL is valid */
    errorText = HDLmManageRules.checkUrlValid(webpageDomainNameWPrefix);
    if (errorText != '') {
      errorText = 'The web page domain name is not valid';
      HDLmManageRules.displayErrorMessage(errorText); 
      return [errorText, webpageDomainName];
    }
    /* Set the error text back to null, if need be */
    if (errorText == '')
      errorText = null;
    return [errorText, webpageDomainName];
  }
  /* This routine gains control when a key is pressed
     in a rule name input field. The ID value tells us
     which row is being edited */
  static tableRowInputKeyDown(event) {
    /* console.log('In event function', event.key, event.target.value); */
    let eventKey = event.key;
    /* We only care about the Enter key */
    if (eventKey != 'Enter')
      return;
    /* Get the ID and value of the input field */
    let fieldId = event.target.id;
    let fieldValue = event.target.value;
    /* console.log('In event function', event, fieldValue); */
    /* console.log('In event function', fieldValue); */
    let companyNumberStr = fieldId.substring(0, 5);
    let ruleNumberStr = fieldId.substring(5, 10);
    let companyNumber = parseInt(companyNumberStr);
    let ruleNumber = parseInt(ruleNumberStr);
    let rule = HDLmManageRules.getTreeRule(companyNumber, ruleNumber);
    if (rule == null) {
      HDLmManageRules.displayErrorMessage('The selected rule could not be found');
      return;
    }
    let OldRuleName = rule.details.name;
    /* Try to change the rule name */
    HDLmManageRules.ruleNewName(companyNumber, 
                                ruleNumber, 
                                OldRuleName,
                                fieldValue,
                                true);
    return;
  }  
  /* This routine when called, adds an event listener to the window
     object. The event listener is used to detect when the user
     changes the visibility of the browser. */
  static visibilityChangeAdd() {
    /* console.log('In HDLmManageRules.visibilityChangeAdd'); */
    window.addEventListener('visibilitychange', (event) => {
      HDLmManageRules.visibilityChangeDone(event);
    });
  }
  /* This routine is called when the user change the visibility
     of the browser. This routine handles the visibility change
     event. The routine is used to resolve the promise that was
     created before the user changed the visibility of the browser. */
  static visibilityChangeDone(event) {
    /* console.log('In HDLmManageRules.visibilityChangeDone'); */
    /* console.log(event); */
    /* Show the document visibility state */
    /* console.log(document.visibilityState); */
    /* Count the number of times the user makes the browser hidden */
    if (document.visibilityState == 'hidden')
      HDLmManageRules.visibilityChangeHiddenCount++;
    /* Count the number of times the user makes the browser visible */
    if (document.visibilityState == 'visible')
      HDLmManageRules.visibilityChangeVisibleCount++;
    /* Show the hidden and visible counts */
    /* console.log(HDLmManageRules.visibilityChangeHiddenCount); */
    /* console.log(HDLmManageRules.visibilityChangeVisibleCount); */
    if (document.visibilityState == 'hidden'      &&
        HDLmManageRules.visibilityChangeHiddenCount > 1 &&
        HDLmManageRules.visibilityChangeHiddenCount > HDLmManageRules.visibilityChangeVisibleCount)
      HDLmManageRules.visibilityChangeResolveFunction('The vibility of the browser was hidden');
  }
  /* Get a set of standard headers for any webpage-improver service.
     The headers are built and returned as an object. */
  static webpageImproverGetHeadersStandard(hostNameStr, contentLength) {
    /* Create an empty headers object */
    let headersObj = {};
    /* Build a host name header and add it to headers object */
    if (hostNameStr != null) {
      let hostHeader = HDLmHtml.buildHostHeaderObj(hostNameStr);
      headersObj = Object.assign(headersObj, hostHeader);
    }
    /* Build a content type header and add it to the headers object */
    let contentType = HDLmConfigInfo.getApplicationJsonType();
    let contentHeader = HDLmHtml.buildContentTypeHeaderObj(contentType)
    headersObj = Object.assign(headersObj, contentHeader);
    /* Build a content length header and add it to the headers object */
    let lengthHeader = HDLmHtml.buildContentLengthHeaderObj(contentLength);
    headersObj = Object.assign(headersObj, lengthHeader);
    /* Return the headers object to the caller */
    return headersObj;
  }
  /* Get some JSON for a get improvements service request */
  static webpageImproverGetImprovementsJsonOld(sessionUuid, improvementsQuantity) {
    /* Build the initially empty get improvements service object */
    let getObj = {};
    /* Set a few values in the get improvements service object */
    getObj.sessionId = sessionUuid;
    getObj.quantity = improvementsQuantity;
    /* Convert the get improvements service object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* Get some JSON for a get LLM service request */
  static webpageImproverGetLlmJson(sessionUuid, llmName) {
    /* Build the initially empty get LLM service object */
    let getObj = {};
    /* Set a few values in the get LLM service object */
    getObj.sessionId = sessionUuid;
    getObj.provider = llmName;
    /* Convert the get LLM service object to JSON and return
        the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* Get some JSON for a get markup service request */
  static webpageImproverGetMarkupJson(sessionUuid, improvementStr) {
    /* Build the initially empty get markup service object */
    let getObj = {};
    /* Set a few values in the get markup service object */
    getObj.sessionId = sessionUuid;
    getObj.improvement = improvementStr;
    /* Convert the get markup service object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* Get some JSON for a get session service request */
  static webpageImproverGetSessionJson(sessionName) {
    /* Build the initially empty get session service object */
    let getObj = {};
    /* Set a few values in the get session service object */
    getObj.name = sessionName;
    /* Convert the get session service object to JSON and return
        the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* Get some JSON for a get webpage service request */
  static webpageImproverGetWebpageJson(sessionUuid, urlStr) {
    /* Build the initially empty get webpage service object */
    let getObj = {};
    /* Set a few values in the get webpage service object */
    getObj.sessionId = sessionUuid;
    getObj.url = urlStr;
    /* Convert the get webpage service object to JSON and return
       the JSON to the caller */
    let outJson = JSON.stringify(getObj);
    return outJson
  }
  /* This routine is used to invoke one of the webpage-improver
     services */
  static webpageImproverInvokeService(servicePath, serviceHeaders, serviceJson) {
    /* console.log('In HDLmManageRules.webpageImproverInvokeService'); */
    let webPromise = null;
    /* Build the URL that is sent to the server */
    let domainName; 
    let fetchMethod;  
    let urlStr;
    let urlMinusPathStr;
    /* Get the fetch method for use below */
    if (HDLmUtility.isVscode() == true) 
      fetchMethod = HDLmConfigInfo.getFetchInternetMethodNoSsl(); 
    else 
      fetchMethod = HDLmConfigInfo.getFetchInternetMethodWithSsl();
    /* Get the domain name for use below */
    if (HDLmUtility.isVscode() == true) {
      domainName = 'localhost';
      domainName = HDLmConfigInfo.getServerName();
    }
    else {
      domainName = 'localhost';
      domainName = HDLmConfigInfo.getServerName();
    }
    /*
    urlStr += '127.0.0.1';
    */
    urlStr = fetchMethod + '://' + domainName;
    urlStr += ':';
    urlStr += HDLmConfigInfo.getWebpageImproverPort();
    urlMinusPathStr = urlStr;
    urlStr += '/';
    urlStr += servicePath;
    console.log('urlStr is ' + urlStr);
    /* console.log(serviceHeaders, serviceJson); */
    /* The following lines were added to try to fix a bug. The bug fix
       did not work. */ 
    /* serviceHeaders['Access-Control-Allow-Origin'] = urlMinusPathStr; */
    /* console.log('Headers are ' + JSON.stringify(serviceHeaders)); */
    /* console.log('JSON is ' + serviceJson); */
    let serviceHeadersJsonKeys = Object.keys(serviceHeaders);
    /* console.log(serviceHeaders); */
    /* console.log('serviceHeaders keys length is ' + serviceHeadersJsonKeys.length); */
    serviceHeadersJsonKeys.forEach((item) => { /* console.log('Key name is', item, */
                                               /*             'Key value is', serviceHeaders[item]); */ });
    /* Send the URL to the service */
    webPromise = fetch(urlStr, {
                                  "method": "POST",
                                  "headers": serviceHeaders,
                                  "body": serviceJson
                                }
                      );
    /* Return the promise to the caller */
    return webPromise
  }
  /* This routine is used to run a set of services */
  static async webpageImproverRunServicesOpenAINew(suggestionText, webpageUrl) {
    console.log('In HDLmManageRules.webpageImproverRunServicesOpenAINew'); 
    /* Build the area where the new rules will be stored */
    let rulesGeneratedList = []; 
    let improvementsList = await HDLmAI.openAIGetImprovementsNew(suggestionText, webpageUrl, useAIVersion);
    console.log('improvementsList is', improvementsList);
    /* Get some values from the JSON object */
    try {
      let localImprovements = improvementsList;
      /* The user may or may not have provided a suggestion. The
         suggestion (if it exists) is used to build some markup.
         The markup is used to build some rules. */
      if (HDLmManageRules.suggestionText != null) {
      }
      /* Process each of the improvements. Convert the improvement to a
         set of markup. */
      let improvementsCount = localImprovements.length;
      let localMarkups = [];
      for (let i = 0; i < improvementsCount; i++) {
        /* Get the current improvement object */
        let improvementObj = localImprovements[i];
        let improvementWhat = improvementObj.what;
        let markupObj = await HDLmAI.openAIGetMarkup(improvementWhat, webpageUrl, useAIVersion);
        /* Get some values from the JSON object */
        localMarkups.push(markupObj);
      }
      /* Convert each of the markup objects to a rule */
      let markupsCount = localMarkups.length;
      for (let i = 0; i < markupsCount; i++) {
        let improvementObj = localImprovements[i];
        /* console.log(improvementObj); */ 
        let improvementWhy = improvementObj.why;
        /* The improvementWhy value may contain some special (bad) characters
           that need to be replaced. For example, the improvementWhy value may
           contain the \u2019 character, which is a right single quotation mark.
           This character needs to be replaced with a regular single quote character
           ('). 

           This code is no long needed because the server can properly handle all
           special characters. However, the code is left here in case we need to
           use it in the future for some reason. */
        /* improvementWhy = HDLmString.replaceAllSimple(improvementWhy, "\u2019","'"); */
        let markupObj = localMarkups[i];
        /* Build a tree node object from each of the markups */
        let constructList = HDLmManageRules.constructTreeNode(webpageUrl,
                                                              improvementWhy,
                                                              markupObj);
        let treeNodeObj = constructList[0];      
        let overallValid = constructList[1];
        let scriptValid = constructList[2];
        let stylesValid = constructList[3];
        let scriptStr = constructList[4];
        let stylesStr = constructList[5];
        /* Check if the tree node has at least
           one script */ 
        let scriptCount = treeNodeObj.details.scripts.length;
        /* Check if the script value is valid */
        if (overallValid && scriptCount > 0) {
          HDLmTree.storeTreeNode(treeNodeObj);
          rulesGeneratedList.push(treeNodeObj);
        }
        /* Some type of error was detected. Report the error
           and continue processing. */
        else {
          /* Check what sort of error was detected */
          if (scriptCount <= 0) {
            let errorText = 'No scripts were found in the generated rule';
            HDLmManageRules.displayErrorMessage(errorText);
          }
          else {
            let errorText = 'The generated script or style value(s) is/are not valid';
            HDLmManageRules.displayErrorMessage(errorText);
          }
        }
      }
      /* Return to the caller */
      return rulesGeneratedList;
    }
    /* Handle some sort of error condition */
    catch (error) {
      console.error(error);
      let errorText = '';
      errorText = HDLmError.buildError('Error', 'Get Webpage-Improver Error', 52, error);
      HDLmManageRules.displayErrorMessage(errorText);
      return false;
    }
    /* Return the new rules */
    return rulesGeneratedList;
  }
  /* This routine is used to run a set of services */
  static async webpageImproverRunServicesOpenAIOld(suggestionText, webpageUrl) {
    console.log('In HDLmManageRules.webpageImproverRunServicesOpenAIOld'); 
    let rulesGeneratedList;
    let serviceData,
        serviceHeaders,
        serviceJson,
        serviceLength,
        servicePath,
        servicePromise,
        serviceQuantity,
        serviceResponse,
        serviceSessionId,
        serviceStage;
    /* Put the services in a try-catch block */
    try {
      /* Build the area where the new rules will be stored */
      rulesGeneratedList = [];
      /* Get the JSON string for the session service */
      serviceJson = HDLmManageRules.webpageImproverGetSessionJson('Testing');
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                         serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverSessionPath();
      /* Invoke the session service */
      servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
                                                                    serviceHeaders,
                                                                    serviceJson);
      /* Wait for the session service to complete */
      serviceResponse = await servicePromise;
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      console.log('About to wait for session data');
      serviceData = await servicePromise;
      console.log('Done waiting for session data');
      let localSessionId = serviceData.sessionId;
      /* Get the JSON string for the LLM service */
      let llmName = HDLmConfigInfo.getOpenAIName();
      serviceSessionId = localSessionId;
      serviceJson = HDLmManageRules.webpageImproverGetLlmJson(serviceSessionId, llmName);
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                         serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverLlmPath();
      /* Invoke the LLM service */
      servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
                                                                    serviceHeaders,
                                                                    serviceJson);
      /* Wait for the LLM service to complete */
      console.log('About to wait for the LLM');
      serviceResponse = await servicePromise;
      console.log('Done waiting for the LLM');
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      serviceData = await servicePromise;
      /* Get some values from the JSON object */
      /* HDLmManageRules.webpageImproverProvider = serviceData.provider; */
      /* HDLmManageRules.webpageImproverModel = serviceData.model; */
      /* Get the JSON string for the webpage service */
      serviceJson = HDLmManageRules.webpageImproverGetWebpageJson(serviceSessionId,
                                                                  webpageUrl);
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                         serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverWebpagePath();
      /* Invoke the webpage service */
      servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
                                                                    serviceHeaders,
                                                                    serviceJson);
      /* Wait for the webpage service to complete */
      console.log('About to wait for the webpage service');
      serviceResponse = await servicePromise;
      console.log('Done waiting for the webpage service');
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      console.log('About to wait for the JSON object');
      serviceData = await servicePromise;
      console.log('Done waiting for the JSON object');
      /* Check if the URL was valid */
      if (!serviceData.hasOwnProperty('webpage')) {
        let errorText = serviceData;
        HDLmManageRules.displayErrorMessage(errorText);
        return false;
      }
      /* Get some values from the JSON object */
      /* HDLmManageRules.webpageImproverWebpage = serviceData.webpage; */
      /* Get the JSON string for the improvements service */
      serviceQuantity = improvementsQuantity;
      serviceJson = HDLmManageRules.webpageImproverGetImprovementsJsonOld(serviceSessionId,
                                                                          serviceQuantity);
      serviceLength = serviceJson.length;
      serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                         serviceLength);
      servicePath = HDLmConfigInfo.getWebpageImproverImprovementsPath();
      /* Invoke the improvements service */
      servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
                                                                    serviceHeaders,
                                                                    serviceJson);
      /* Wait for the improvements service to complete */
      console.log('About to wait for the improvements service');
      serviceResponse = await servicePromise;
      console.log('Done waiting for the improvements service');
      /* Convert the response to a JSON object */
      servicePromise = serviceResponse.json();
      console.log('About to wait for the JSON object');
      serviceData = await servicePromise;
      console.log('Done waiting for the JSON object');
      /* Check if we got any actual improvements */
      if (!serviceData.hasOwnProperty('improvements')) {
        let errorText = 'No improvements were found';
        HDLmManageRules.displayErrorMessage(errorText);
        return false;
      }
      /* Get some values from the JSON object */
      let localImprovements = serviceData.improvements;
      /* The user may or may not have provided a suggestion. The
         suggestion (if it exists) is used to build some markup.
         The markup is used to build some rules. */
      if (HDLmManageRules.suggestionText != null) {
      }
      /* Process each of the improvements. Convert the improvement to a
         set of markup. */
      let improvementsCount = localImprovements.length;
      let localMarkups = [];
      for (let i = 0; i < improvementsCount; i++) {
        let improvementObj = localImprovements[i];
        /* console.log(improvementObj); */
        let improvementWhat = improvementObj.what;
        /* Get the JSON string for the improvements service */
        serviceJson = HDLmManageRules.webpageImproverGetMarkupJson(serviceSessionId,
                                                                   improvementWhat);
        serviceLength = serviceJson.length;
        serviceHeaders = HDLmManageRules.webpageImproverGetHeadersStandard(null,
                                                                           serviceLength);
        servicePath = HDLmConfigInfo.getWebpageImproverMarkupPath();
        /* Invoke the markup service */
        servicePromise = HDLmManageRules.webpageImproverInvokeService(servicePath,
                                                                      serviceHeaders,
                                                                      serviceJson);
        /* Wait for the markup service to complete */
        console.log('About to wait for the markup service');
        serviceResponse = await servicePromise;
        console.log('Done waiting for the markup service');
        /* Convert the response to a JSON object */
        servicePromise = serviceResponse.json();
        console.log('About to wait for the JSON object');
        serviceData = await servicePromise;
        console.log('Done waiting for the JSON object');
        /* Get some values from the JSON object */
        localMarkups.push(serviceData);
      }
      /* Convert each of the markup objects to a rule */
      let markupsCount = localMarkups.length;
      for (let i = 0; i < markupsCount; i++) {
        let improvementObj = localImprovements[i];
        /* console.log(improvementObj); */ 
        let improvementWhy = improvementObj.why;
        /* The improvementWhy value may contain some special (bad) characters
           that need to be replaced. For example, the improvementWhy value may
           contain the \u2019 character, which is a right single quotation mark.
           This character needs to be replaced with a regular single quote character
           ('). 

           This code is no long needed because the server can properly handle all
           special characters. However, the code is left here in case we need to
           use it in the future for some reason. */
        /* improvementWhy = HDLmString.replaceAllSimple(improvementWhy, "\u2019","'"); */
        let markupObj = localMarkups[i];
        /* console.log(markupObj); */
        /* Build a tree node object from each of the markups */
        let constructList = HDLmManageRules.constructTreeNode(webpageUrl,
                                                              improvementWhy,
                                                              markupObj);
        let treeNodeObj = constructList[0];
        let overallValid = constructList[1];
        let scriptValid = constructList[2];
        let stylesValid = constructList[3];
        let scriptStr = constructList[4];
        let stylesStr = constructList[5];
        /* console.log('Information from constructTreeNode', treeNodeObj, improvementWhy, markupObj, webpageUrl); */
        /* console.log(overallValid, scriptValid, stylesValid); */
        /* console.log(scriptStr); */
        /* console.log(stylesStr); */
        /* Check if the script value is valid */
        if (overallValid) {
          HDLmTree.storeTreeNode(treeNodeObj);
          rulesGeneratedList.push(treeNodeObj);
        }
        /* Some type of error was detected. Report the error
           and continue processing. */
        else {
          /* console.log('Information from constructTreeNode', treeNodeObj, improvementWhy, markupObj, webpageUrl); */
          /* console.log(overallValid, scriptValid, stylesValid); */
          /* console.log(scriptStr); */
          /* console.log(stylesStr); */
          let errorText = 'The generated script or style value(s) is/are not valid';
          HDLmManageRules.displayErrorMessage(errorText);
          /* return null; */
          /* Return false */
        }
      }
      /* Return to the caller */
      return rulesGeneratedList;
    }
    /* Handle some sort of error condition */
    catch (error) {
      console.error(error);
      let errorText = '';
      errorText = HDLmError.buildError('Error', 'Get Webpage-Improver Error', 52, error);
      HDLmManageRules.displayErrorMessage(errorText);
      return false;
    }
  }
  /* This routine is used to run a set of services */
  static async webpageImproverRunServicesOpenRouterV1(suggestionText, webpageUrl) {
    /* console.log('In HDLmManageRules.webpageImproverRunServicesOpenRouterV1'); */
    /* Build the area where the new rules will be stored */
    let rulesGeneratedList = []; 
    let improvementsList = await HDLmAI.openRouterGetImprovementsV1(suggestionText, webpageUrl, useAIVersion);
    /* console.log('improvementsList is', improvementsList); */
    /* Get some values from the JSON object */
    try {
      let localImprovements = improvementsList;
      /* The user may or may not have provided a suggestion. The
         suggestion (if it exists) is used to build some markup.
         The markup is used to build some rules. */
      if (HDLmManageRules.suggestionText != null) {
      }
      /* Process each of the improvements. Convert the improvement to a
         set of markup. */
      let improvementsCount = localImprovements.length;
      let localMarkups = [];
      for (let i = 0; i < improvementsCount; i++) {
        /* Get the current improvement object */
        let improvementObj = localImprovements[i];
        let improvementWhat = improvementObj.what; 
        let markupObj = await HDLmAI.openRouterGetMarkupV1(improvementWhat, webpageUrl, useAIVersion);
        /* Get some values from the JSON object */
        localMarkups.push(markupObj);
      }
      /* Convert each of the markup objects to a rule */
      let markupsCount = localMarkups.length;
      for (let i = 0; i < markupsCount; i++) {
        let improvementObj = localImprovements[i];
        /* console.log(improvementObj); */
        let improvementWhy = improvementObj.why;
        /* The improvementWhy value may contain some special (bad) characters
           that need to be replaced. For example, the improvementWhy value may
           contain the \u2019 character, which is a right single quotation mark.
           This character needs to be replaced with a regular single quote character
           ('). 

           This code is no long needed because the server can properly handle all
           special characters. However, the code is left here in case we need to
           use it in the future for some reason. */
        /* improvementWhy = HDLmString.replaceAllSimple(improvementWhy, "\u2019","'"); */
        /* let rightSingleQuote = "\u2019"; */
        /* let treeTop = HDLmTree.getTreeTop(); */
        /* improvementWhy = rightSingleQuote + improvementWhy; */
        if (1 == 2) {
          console.log('In HDLmManageRules.webpageImproverRunServicesOpenRouterV1, improvementWhy is', improvementWhy);
        }
        let markupObj = localMarkups[i];
        /* Build a tree node object from each of the markups */
        let constructList = HDLmManageRules.constructTreeNode(webpageUrl,
                                                              improvementWhy,
                                                              markupObj);
        let treeNodeObj = constructList[0];      
        let overallValid = constructList[1];
        let scriptValid = constructList[2];
        let stylesValid = constructList[3];
        let scriptStr = constructList[4];
        let stylesStr = constructList[5];
        /* Check if the tree node has at least
           one script */ 
        let scriptCount = treeNodeObj.details.scripts.length;
        /* Check if the script value is valid */
        if (overallValid && scriptCount > 0) {
          HDLmTree.storeTreeNode(treeNodeObj);
          rulesGeneratedList.push(treeNodeObj);
        }
        /* Some type of error was detected. Report the error
           and continue processing. */
        else {
          /* Check what sort of error was detected */
          if (scriptCount <= 0) {
            let errorText = 'No scripts were found in the generated rule';
            HDLmManageRules.displayErrorMessage(errorText);
          }
          else {
            let errorText = 'The generated script or style value(s) is/are not valid';
            HDLmManageRules.displayErrorMessage(errorText);
          }
        }
      }
    }
    /* Handle some sort of error condition */
    catch (error) {
      console.error(error);
      let errorText = '';
      errorText = HDLmError.buildError('Error', 'Get Webpage-Improver Error', 52, error);
      HDLmManageRules.displayErrorMessage(errorText);
      rulesGeneratedList = [];
    }
    /* Return the new rules */
    return rulesGeneratedList;
  }
  /* This routine is used to run a set of services */
  static async webpageImproverRunServicesOpenRouterV2(suggestionText, webpageUrl) {
    console.log('In HDLmManageRules.webpageImproverRunServicesOpenRouterV2'); 
    /* Build the area where the new rules will be stored */
    let rulesGeneratedList = []; 
    let improvementsList = await HDLmAI.openRouterGetImprovementsV2(suggestionText, webpageUrl, useAIVersion);
    console.log('improvementsList is', improvementsList);
    /* Get some values from the JSON object */
    try {
      let localImprovements = improvementsList;
      /* The user may or may not have provided a suggestion. The
         suggestion (if it exists) is used to build some markup.
         The markup is used to build some rules. */
      if (HDLmManageRules.suggestionText != null) {
      }
      /* Process each of the improvements. Convert the improvement to a
         set of markup. */
      let improvementsCount = localImprovements.length;
      let localMarkups = [];
      for (let i = 0; i < improvementsCount; i++) {
        /* Get the current improvement object */
        let improvementObj = localImprovements[i];
        let markupObj = improvementObj.markup;
        /* Get some values from the JSON object */
        localMarkups.push(markupObj);
      }
      /* Convert each of the markup objects to a rule */
      let markupsCount = localMarkups.length;
      for (let i = 0; i < markupsCount; i++) {
        let improvementObj = localImprovements[i];
        /* console.log(improvementObj); */ 
        let improvementWhy = improvementObj.why;
        /* The improvementWhy value may contain some special (bad) characters
           that need to be replaced. For example, the improvementWhy value may
           contain the \u2019 character, which is a right single quotation mark.
           This character needs to be replaced with a regular single quote character
           ('). 

           This code is no long needed because the server can properly handle all
           special characters. However, the code is left here in case we need to
           use it in the future for some reason. */
        /* improvementWhy = HDLmString.replaceAllSimple(improvementWhy, "\u2019","'"); */
        let markupObj = localMarkups[i];
        /* Build a tree node object from each of the markups */
        let constructList = HDLmManageRules.constructTreeNode(webpageUrl,
                                                              improvementWhy,
                                                              markupObj);
        let treeNodeObj = constructList[0];      
        let overallValid = constructList[1];
        let scriptValid = constructList[2];
        let stylesValid = constructList[3];
        let scriptStr = constructList[4];
        let stylesStr = constructList[5];
        /* Check if the tree node has at least
           one script */ 
        let scriptCount = treeNodeObj.details.scripts.length;
        /* Check if the script value is valid */
        if (overallValid && scriptCount > 0) {
          HDLmTree.storeTreeNode(treeNodeObj);
          rulesGeneratedList.push(treeNodeObj);
        }
        /* Some type of error was detected. Report the error
           and continue processing. */
        else {
          /* Check what sort of error was detected */
          if (scriptCount <= 0) {
            let errorText = 'No scripts were found in the generated rule';
            HDLmManageRules.displayErrorMessage(errorText);
          }
          else {
            let errorText = 'The generated script or style value(s) is/are not valid';
            HDLmManageRules.displayErrorMessage(errorText);
          }
        }
      }
      /* Return to the caller */
      return rulesGeneratedList;
    }
    /* Handle some sort of error condition */
    catch (error) {
      console.error(error);
      let errorText = '';
      errorText = HDLmError.buildError('Error', 'Get Webpage-Improver Error', 52, error);
      HDLmManageRules.displayErrorMessage(errorText);
      return false;
    }
    /* Return the new rules */
    return rulesGeneratedList;
  }
  /* This routine is used to run a set of services */
  static async webpageImproverRunServicesOpenRouterV3(suggestionText, webpageUrl) {
    console.log('In HDLmManageRules.webpageImproverRunServicesOpenRouterV3'); 
    /* Build the area where the new rules will be stored */
    let rulesGeneratedList = []; 
    let improvementsList = await HDLmAI.openRouterGetImprovementsV3(suggestionText, webpageUrl, useAIVersion);
    console.log('improvementsList is', improvementsList);
    /* Get some values from the JSON object */
    try {
      let localImprovements = improvementsList;
      /* The user may or may not have provided a suggestion. The
         suggestion (if it exists) is used to build some markup.
         The markup is used to build some rules. */
      if (HDLmManageRules.suggestionText != null) {
      }
      /* Process each of the improvements. Convert the improvement to a
         set of markup. */
      let improvementsCount = localImprovements.length;
      let localMarkups = [];
      for (let i = 0; i < improvementsCount; i++) {
        /* Get the current improvement object */
        let improvementObj = localImprovements[i];
        let markupObj = improvementObj.markup;
        /* Get some values from the JSON object */
        localMarkups.push(markupObj);
      }
      /* Convert each of the markup objects to a rule */
      let markupsCount = localMarkups.length;
      for (let i = 0; i < markupsCount; i++) {
        let improvementObj = localImprovements[i];
        /* console.log(improvementObj); */ 
        let improvementWhy = improvementObj.why;
        /* The improvementWhy value may contain some special (bad) characters
           that need to be replaced. For example, the improvementWhy value may
           contain the \u2019 character, which is a right single quotation mark.
           This character needs to be replaced with a regular single quote character
           ('). 

           This code is no long needed because the server can properly handle all
           special characters. However, the code is left here in case we need to
           use it in the future for some reason. */
        /* improvementWhy = HDLmString.replaceAllSimple(improvementWhy, "\u2019","'"); */
        let markupObj = localMarkups[i];
        /* Build a tree node object from each of the markups */
        let constructList = HDLmManageRules.constructTreeNode(webpageUrl,
                                                              improvementWhy,
                                                              markupObj);
        let treeNodeObj = constructList[0];      
        let overallValid = constructList[1];
        let scriptValid = constructList[2];
        let stylesValid = constructList[3];
        let scriptStr = constructList[4];
        let stylesStr = constructList[5];
        /* Check if the tree node has at least
           one script */ 
        let scriptCount = treeNodeObj.details.scripts.length;
        /* Check if the script value is valid */
        if (overallValid && scriptCount > 0) {
          HDLmTree.storeTreeNode(treeNodeObj);
          rulesGeneratedList.push(treeNodeObj);
        }
        /* Some type of error was detected. Report the error
           and continue processing. */
        else {
          /* Check what sort of error was detected */
          if (scriptCount <= 0) {
            let errorText = 'No scripts were found in the generated rule';
            HDLmManageRules.displayErrorMessage(errorText);
          }
          else {
            let errorText = 'The generated script or style value(s) is/are not valid';
            HDLmManageRules.displayErrorMessage(errorText);
          }
        }
      }
      /* Return to the caller */
      return rulesGeneratedList;
    }
    /* Handle some sort of error condition */
    catch (error) {
      console.error(error);
      let errorText = '';
      errorText = HDLmError.buildError('Error', 'Get Webpage-Improver Error', 52, error);
      HDLmManageRules.displayErrorMessage(errorText);
      return false;
    }
    /* Return the new rules */
    return rulesGeneratedList;
  }
  /* This routine is used to run a set of services */
  static async webpageImproverRunServicesOpenRouterV4(suggestionText, webpageUrl) {
    /* console.log('In HDLmManageRules.webpageImproverRunServicesOpenRouterV4'); */
    /* Build the area where the new rules will be stored */
    let rulesGeneratedList = []; 
    let improvementsList = await HDLmAI.openRouterGetImprovementsV4(suggestionText, webpageUrl, useAIVersion);
    /* console.log('improvementsList is', improvementsList); */
    /* Get some values from the JSON object */
    try {
      let localImprovements = improvementsList;
      /* The user may or may not have provided a suggestion. The
         suggestion (if it exists) is used to build some markup.
         The markup is used to build some rules. */
      if (HDLmManageRules.suggestionText != null) {
      }
      /* Process each of the improvements. Convert the improvement to a
         set of markup. */
      let improvementsCount = localImprovements.length;
      let localMarkups = [];
      for (let i = 0; i < improvementsCount; i++) {
        /* Get the current improvement object */
        let improvementObj = localImprovements[i];
        let improvementWhat = improvementObj.what;
        let markupObj = await HDLmAI.openRouterGetMarkupV4(improvementWhat, webpageUrl, useAIVersion);
        /* Get some values from the JSON object */
        localMarkups.push(markupObj);
      }
      /* Convert each of the markup objects to a script string */
      let markupsCount = localMarkups.length;
      for (let i = 0; i < markupsCount; i++) {        
        let markupObj = localMarkups[i];
        /* Get the current improvement object */
        let improvementObj = localImprovements[i];
        let improvementWhy = improvementObj.why;
        /* The improvementWhy value may contain some special (bad) characters
           that need to be replaced. For example, the improvementWhy value may
           contain the \u2019 character, which is a right single quotation mark.
           This character needs to be replaced with a regular single quote character
           ('). 

           This code is no long needed because the server can properly handle all
           special characters. However, the code is left here in case we need to
           use it in the future for some reason. */
        /* improvementWhy = HDLmString.replaceAllSimple(improvementWhy, "\u2019","'"); */
      
        /* Build a tree node object from each of the markups */
        let constructList = HDLmManageRules.constructTreeNode(webpageUrl,
                                                              improvementWhy,
                                                              markupObj);
        let treeNodeObj = constructList[0];      
        let overallValid = constructList[1];
        let scriptValid = constructList[2];
        let stylesValid = constructList[3];
        let scriptStr = constructList[4];
        let stylesStr = constructList[5];
        /* Some type of error was detected. Report the error
           and continue processing. */
        if (!overallValid) {
          /* Check what sort of error was detected */
          if (!scriptValid) {
            let errorText = 'The script is not valid'; 
            HDLmManageRules.displayErrorMessage(errorText);
          }
          if (!stylesValid) {
            let errorText = 'The style is not valid'; 
            HDLmManageRules.displayErrorMessage(errorText);
          }
        }
        /* Get the number of scripts in the tree node object. 
           The number of scripts is used to determine if the 
           tree node object is valid. A tree node object must 
           have at least one script to be valid. */
        let scriptCount = 0;
        /* Check if the tree node has at least
           one script */ 
        /* console.log(typeof(treeNodeObj)); */
        /* console.log(treeNodeObj); */
        /* console.log(typeof(treeNodeObj.details)); */
        /* console.log(treeNodeObj.details); */
        /* console.log(typeof(treeNodeObj.details.scripts)); */ 
        /* console.log(treeNodeObj.details.scripts); */
        /* let detailsType = typeof(treeNodeObj.details); */
        /* Check if the tree node object is not null. The 
           tree node object may be null if the constructTreeNode
           routine encountered an error. Testing has show that 
           this can really happen if one of the scripts is invalid. */
        if (treeNodeObj != null)
          scriptCount = treeNodeObj.details.scripts.length;
        /* console.log(scriptValid, stylesValid); */
        /* Check if the script value is valid */
        if (overallValid && scriptCount > 0) {
          HDLmTree.storeTreeNode(treeNodeObj);
          rulesGeneratedList.push(treeNodeObj);
        }
        /* Some type of error was detected. Report the error
           and continue processing. */
        else {
          /* Check what sort of error was detected */
          if (scriptCount <= 0) {
            let errorText = 'No scripts were found in the generated rule';
            HDLmManageRules.displayErrorMessage(errorText);
          }
          else {
            let errorText = 'The generated script or style value(s) is/are not valid';
            HDLmManageRules.displayErrorMessage(errorText);
          }
        }
      }
    }
    /* Handle some sort of error condition */
    catch (error) {
      console.error(error);
      let errorText = '';
      errorText = HDLmError.buildError('Error', 'Get Webpage-Improver Error', 52, error);
      HDLmManageRules.displayErrorMessage(errorText);
      rulesGeneratedList = [];
    }
    /* Return the new rules */
    return rulesGeneratedList;
  } 
  /* Convert each of the markup objects to a script string */
  /* 
  let markupsCount = localMarkups.length;
  let scriptsArray = [];
  for (let i = 0; i < markupsCount; i++) {
    let markupObj = localMarkups[i];
  */
  /* Build a script string from each of the markups */
  /* 
  let constructList = HDLmManageRules.constructScript(markupObj);
  let overallStr = constructList[0];      
  let overallValid = constructList[1];
  let scriptValid = constructList[2];
  let stylesValid = constructList[3];
  let scriptStr = constructList[4];
  let stylesStr = constructList[5];
  */
  /* Some type of error was detected. Report the error
      and continue processing. */
  /*
  if (!overallValid) {
  */
  /* Check what sort of error was detected */
  /*
    if (!scriptValid) {
      let errorText = 'The script is not valid'; 
      HDLmManageRules.displayErrorMessage(errorText);
    }
    if (!stylesValid) {
      let errorText = 'The style is not valid'; 
      HDLmManageRules.displayErrorMessage(errorText);
    }
  } 
  */
  /* If no errors were detected, store the script
      string in the array of script strings */
  /* 
    else    
  */
  /* Make sure that at least one script was generated */
  /*                               
  if (scriptsArray.length > 0) {
    let treeNodeObj = HDLmManageRules.constructTreeNodeFromScripts(webpageUrl, firstImprovementWhy, scriptsArray);
    rulesGeneratedList.push(treeNodeObj);
  }
  */
  /* The routine below does all of the work needed to handle keyboard
     events */
  static windowOnDown(event) {
    /* console.log('In HDLmManageRules.windowOnDown'); */
    /* Handle a ctrl-y (redo) keyboard operation */
    if (event.key == 'y' &&
        event.ctrlKey) {
      HDLmManageRules.handleKeyboard('Windows',  'ctrl+y');
    }
    /* Handle a ctrl-z (undo) keyboard operation */
    if (event.key == 'z' &&
        event.ctrlKey) {
      HDLmManageRules.handleKeyboard('Windows',  'ctrl+z');
    }
  };
  /* The routine below does all of the work needed to handle
     mouse enter events */
  static windowOnMouseEnter(event) {
    /* console.log('In HDLmManageRules.windowOnMouseEnter'); */
    HDLmManageRules.makeRolloverTextAreaVisible(event);
  };
  /* The routine below does all of the work needed to handle
     mouse leave events */
  static windowOnMouseLeave(event) {
    /* console.log('In HDLmManageRules.windowOnMouseLeave'); */
    HDLmManageRules.makeRolloverTextAreaInvisible(event);
  }
}
/* The access challenge name is stored in the field
   below */
HDLmManageRules.accessChallengeName = null;
/* The name of the access cookie is stored in the field
   below */
HDLmManageRules.accessCookieName = null;
/* The new password (if one is available) is stored in the field
   below */
HDLmManageRules.accessNewPassword = null;
/* The password (if one is available) is stored in the field
   below */
HDLmManageRules.accessPassword = null;
/* The userid (if one is available) is stored in the field
   below */
HDLmManageRules.accessUserid = null;
/* The verification code is stored in the field 
   below */
HDLmManageRules.accessVerificationCode = null;
/* The resolve function saved in the field below is invoked
   when the user unloads the browser */
HDLmManageRules.beforeUnloadResolveFunction = null;
/* The companies array is stored in the field below.
   The companies array has information about each 
   company that has one or more rules. */
HDLmManageRules.companiesArray = null;
/* The list of deleted rules is stored in the array 
   below. This list was needed to find a bug. */ 
HDLmManageRules.deletedRulesList = [];
/* The display rules value is stored in the field below.
   This value can be used to display all of the rules
   or just some of the rules */
HDLmManageRules.displayRulesValue = null;
/* The next field shows if the access cookie was 
   used or if it needs to be stored */
HDLmManageRules.getFromCookie = false;
/* The key value is stored in the field below.
   The key value is used to force a re-render of
   the React input areas. Each time the key value
   is changed, the React input areas are re-rendered.
   We use what are called uncontrolled components.
   Uncontrolled components are those that do not
   have their value controlled by React state. These 
   components are typically controlled by the DOM 
   instead. These components are remounted by React 
   when the key value changes. */
HDLmManageRules.inputKeyValue = 1;
/* The next field contains the value of the new company
   name field. This value may be incomplete. This value 
   may be a duplicate of an existing company name. This 
   value may not be valid. */ 
HDLmManageRules.newCompanyNameChange = null;
/* The function saved in the field below is invoked
   when a promise is rejected */
HDLmManageRules.promiseRejectFunction = null;
/* The function saved in the field below is invoked
   when a promise is resolved */
HDLmManageRules.promiseResolveFunction = null;
/* The current set of rule IDs are stored in the field below.
   The current set of rule ID are modified, when a row is clicked
   on. The rule IDs are a list or null. Each entry is in the
   higher level list is a actually a list. The first entry in
   the lower-level list is the company number. The second entry 
   in the lower-level list is either a single number (a rule number) 
   or a string comprised of a range of rule numbers. For example, 
   the second entry in the lower-level list might be 14 (a single 
   rule number) or a '5-7' (a string with a range of rule numbers).
   From left to right, the company numbers are always ascending or
   equal. Within a company, the rule number are always ascending. 
   All of the company numbers and rule numbers are one-based, 
   rather than zero-based. This is also the current state of the
   companies component. */
HDLmManageRules.ruleIdsArray = null;   
/* The session ID (which is a string) is stored in the field
   below */
HDLmManageRules.sessionId = null;
/* The function returned by use state is stored in the field 
   below. This function is called to set the state of the 
   companies component. */
HDLmManageRules.stateSetFunction = null;
/* The suggestion text (if any) is stored in the field 
   below. The suggestion text (if any) is used to help 
   guide the LLM in creating improvements. */ 
HDLmManageRules.suggestionText = null;
/* The following count is used to keep track of the number
   of times the user hides the browser or a tab of the 
   browswer */
HDLmManageRules.visibilityChangeHiddenCount = 0;
/* The resolve function saved in the field below is invoked
   when the user changes the visibility of a webpage. This 
   can happen if the user switches tabs or minimizes the browser
   or closes the browser. */
HDLmManageRules.visibilityChangeResolveFunction = null;
/* The following count is used to keep track of the number
   of times the user makes the browser visible or makes a 
   tab of the browser visible */
HDLmManageRules.visibilityChangeVisibleCount = 0;
/* The web page domain name is stored in the field 
   below. The web page domain name is used to access  
   a page on the Internet. */ 
HDLmManageRules.webpageDomainName = null;
/* The webpage-improver improvements are stored in the field below */
/* HDLmManageRules.webpageImproverImprovements = null; */
/* The webpage-improver markups are stored in the array below */
/* HDLmManageRules.webpageImproverMarkups = []; */
/* The webpage-improver model is stored in the field below */
/* HDLmManageRules.webpageImproverModel = null; */
/* The webpage-improver provider is stored in the field below */
/* HDLmManageRules.webpageImproverProvider = null; */
/* The webpage-improver session ID is stored in the field below */
/* HDLmManageRules.webpageImproverSessionId = null; */
/* The webpage-improver webpage string is stored in the field below */
/* HDLmManageRules.webpageImproverWebpage = null; */