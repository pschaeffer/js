"use strict";
let useAIVersionWpiWIV1 = 'openRouterWpiWIV1';
const headingWpiWIV1 = {
  pageText: 'Page Revenue Improver'
};
const helpTextWpiWIV1 = {
  url: 'Enter URL to improve',
  suggestion: 'Suggestion (optional)',
  improve: 'Improve (generate HTML)',
  saveHtml: 'Save (generated HTML)',
  saveImprovements: 'Save (improvements)',
  loadImprovements: 'Load (improvements)'
};
const suggestionPlaceholderWpiWIV1 = 'Enter a suggestion for the page revenue improver';
const openRouterChatTemplatesWpiWIV1 = {
  context:       'You are an expert at improving webpages to increase conversion rates and revenue.' +
                 '\nCopy everything from the old HTML to the generated HTML by default unless a change is made.' +
                 '\nThe copy must include CSS, links, images, and scripts, if they were present in the original HTML.' +
                 '\nReturn the complete improved HTML and a list of improvements made, each with a What field and a Why field and a Hash field.' +
                 '\nIf the Desired changes field is empty, devise some improvements on your own while considering the content of the Undesired changes field.' +
                 '\nIf the Desired changes field is not empty, do not devise further improvements on your own and instead use only the Desired changes field while considering the Undesired changes field.' +
                 '\nIf the User suggestion is empty, ignore it.' +
                 '\nFor each improvement, create a hash code using the DJB2 algorithm, starting with 5381, hash the What and Why values together, convert the result to hexadecimal, and include the HDLmClass prefix in the Hash value.' +
                 '\nMark changed HTML by adding a class with the exact hash value that includes the HDLmClass prefix.' +
                 '\n',
  webpageServer: 'Please improve the passed HTML to increase conversion rates ' +
                 'and revenue.\n' +
                 'Return the complete improved HTML and a list ' +
                 'of improvements made, each with a What field and a Why field and a Hash field.\n' +
                 '\n' +
                 'HTML:\n' +
                 '{{html}}\n' +
                 'User suggestion: {{suggest}}\n' +
                 'Desired changes: ({{desired}})\n' +
                 'Undesired changes: ({{undesired}})\n'
};
const openRouterResponseFormatTypeJsonObjectWpiWIV1 = {
  type: 'json_object'
};
const openRouterResponseJsonSchemaImproverWpiWIV1 = {
  type: 'json_schema',
  json_schema: {
    name: 'webpage_improver_response',
    description: 'Improved HTML and improvements',
    strict: true,
    schema: {
      type: 'object',
      properties: {
        improvedHtml: {
          type: 'string'
        },
        improvements: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              What: {
                type: 'string'
              },
              Why: {
                type: 'string'
              },
              Hash: {
                type: 'string'
              }
            },
            required: ['What', 'Why', 'Hash'],
            additionalProperties: false
          }
        }
      },
      required: ['improvedHtml', 'improvements'],
      additionalProperties: false
    }
  }
};
class HDLmWebpageImprover {
  static addBaseUrl(html, currentUrl) {
    let headIndex = typeof html == 'string' ? html.toLowerCase().indexOf('<head') : -1;
    if (headIndex < 0)
      return html;
    let headEnd = html.indexOf('>', headIndex);
    if (headEnd < 0)
      return html;
    return html.substring(0, headEnd + 1) + '<base href="' + currentUrl + '">' + html.substring(headEnd + 1);
  }
  static addGoogleAnalyticsTag(html) {
    if (typeof html != 'string')
      return html;
    let now = new Date();
    let date = now.getUTCFullYear().toString() + (now.getUTCMonth() + 1).toString().padStart(2, '0') + now.getUTCDate().toString().padStart(2, '0');
    let time = now.getUTCHours().toString().padStart(2, '0') + now.getUTCMinutes().toString().padStart(2, '0') + now.getUTCSeconds().toString().padStart(2, '0');
    let tag = 'HDLmGAWpiTag-' + date + '-' + time;
    let script = '<script>(function(){var tag="' + tag + '";if(typeof gtag==="function"){gtag("event",tag,{event_category:"HDLmGAWpiTag",event_label:tag});}})();</script>';
    let bodyEnd = html.toLowerCase().indexOf('</body>');
    if (bodyEnd < 0)
      return html + script;
    return html.substring(0, bodyEnd) + script + html.substring(bodyEnd);
  }
  static addStylesAndMessageHandler(html, items) {
    let styles = '';
    for (let item of items) {
      if (!item.Hash)
        continue;
      let name = 'hdlm-wpi-' + item.Hash;
      styles += '<style id="' + name + '">.' + item.Hash + '{animation:' + name + ' 0.6s step-start infinite;outline:4px solid orange;}@keyframes ' + name + '{50%{outline:none;}}</style>';
    }
    let script = '<script>(function(){document.querySelectorAll("style[id^=\\"hdlm-wpi-\\"]").forEach(function(styleNode){styleNode.disabled=true;});window.addEventListener("message",function(event){var parts=String(event.data).split(" ");var styleNode=document.getElementById("hdlm-wpi-"+parts[0]);if(styleNode)styleNode.disabled=parts[1]!=="hilite";});})();</script>';
    let headEnd = html.toLowerCase().indexOf('</head>');
    if (headEnd < 0)
      return html;
    return html.substring(0, headEnd) + styles + script + html.substring(headEnd);
  }
  static buildImprovement(item) {
    let timestamp = new Date().toISOString();
    return {
      Version: 1,
      Created: timestamp,
      'Last Modified': timestamp,
      What: item.What || '',
      Why: item.Why || '',
      Wanted: true,
      Hash: item.Hash || ''
    };
  }
  static buildUi() {
    const [, setRender] = React.useState(0);
    HDLmWebpageImprover.setRender = setRender;
    let update = function(name, value) {
      HDLmWebpageImprover[name] = value;
      HDLmWebpageImprover.refresh();
    };
    let url = HDLmReactFive.input(helpTextWpiWIV1.url, 'wpi-url', HDLmWebpageImprover.url, function(event) {
      update('url', event.target.value);
    }, function(event) {
      if (event.key === 'Enter')
        HDLmWebpageImprover.loadUrl();
    });
    let suggestion = HDLmReactFive.textArea(helpTextWpiWIV1.suggestion, 'wpi-suggestion', HDLmWebpageImprover.suggestion, suggestionPlaceholderWpiWIV1, function(event) {
      update('suggestion', event.target.value);
    });
    let table = HDLmWebpageImprover.items.length == 0 ? React.createElement('p', { style: { marginTop: '16px' } }, 'No improvements so far') : HDLmReactFive.table(HDLmWebpageImprover.items, {
      yes: index => HDLmWebpageImprover.setWanted(index, true),
      not: index => HDLmWebpageImprover.setWanted(index, false),
      delete: index => HDLmWebpageImprover.deleteImprovement(index),
      click: hash => HDLmWebpageImprover.highlight(hash)
    });
    return React.createElement(React.Fragment, null,
      React.createElement('h2', null, headingWpiWIV1.pageText),
      url,
      suggestion,
      HDLmReactFive.checkbox('wpi-rule', 'Create a rule for the updated page', HDLmWebpageImprover.createRule, event => update('createRule', event.target.checked)),
      HDLmReactFive.button('wpi-improve', helpTextWpiWIV1.improve, HDLmWebpageImprover.improve, !HDLmWebpageImprover.originalHtml || HDLmWebpageImprover.busy),
      HDLmReactFive.button('wpi-save-html', helpTextWpiWIV1.saveHtml, () => HDLmHtml.saveHtml(HDLmWebpageImprover.improvedHtml), !HDLmWebpageImprover.improvedHtml),
      HDLmReactFive.button('wpi-save-improvements', helpTextWpiWIV1.saveImprovements, () => HDLmImprovements.saveImprovements(HDLmWebpageImprover.storage()), false),
      HDLmReactFive.button('wpi-load-improvements', helpTextWpiWIV1.loadImprovements, HDLmWebpageImprover.loadImprovements, false),
      HDLmWebpageImprover.busy ? HDLmReactFive.spinner() : null,
      table);
  }
  static checkServerStatus() {
    let serverName = HDLmConfigInfo.getServerName();
    let statusName = HDLmDefines.getString('HDLMGETSSVALUE');
    let url = 'https://' + serverName + '/' + statusName;
    try {
      return HDLmAJAX.runAJAX('URL', true, url, '', '', 'get', '').then(() => true).catch(() => {
        HDLmWebpageImprover.displayErrorMessage('The server status request failed');
        return false;
      });
    }
    catch (error) {
      HDLmWebpageImprover.displayErrorMessage('The server status request failed');
      return Promise.resolve(false);
    }
  }
  static deleteImprovement(index) {
    let outer = HDLmWebpageImprover.storage();
    /* console.log('In HDLmWebpageImprover.deleteImprovement', outer, index); */
    outer = HDLmImprovements.deleteImprovement(outer, index);
    HDLmImprovements.putImprovements(outer, HDLmWebpageImprover.modifiedUrl);
    HDLmWebpageImprover.items = outer.Improvements;
    HDLmWebpageImprover.refresh();
  }
  static displayErrorMessage(message) {
    alert(String(message));
  }
  static getModifiedWebsiteUrl(value) {
    if (typeof value != 'string' || value.trim() == '')
      return '';
    let localUrl = value.trim();
    if (localUrl.indexOf('://') < 0)
      localUrl = 'https://' + localUrl;
    try {
      let url = new URL(localUrl);
      return url.host + (url.pathname == '/' ? '' : url.pathname);
    }
    catch (error) {
      return '';
    }
  }
  static improve() {
    if (HDLmWebpageImprover.busy)
      return;
    HDLmWebpageImprover.busy = true;
    HDLmWebpageImprover.refresh();
    let outer = HDLmWebpageImprover.storage();
    let improvements = outer.Improvements;
    let desired = improvements.filter(item => item.Wanted === true).map(item => item.What).join(';');
    let undesired = improvements.filter(item => item.Wanted === false).map(item => item.What).join(';');
    let suggestion = HDLmWebpageImprover.suggestion.trim();
    if (suggestion == suggestionPlaceholderWpiWIV1)
      suggestion = '';
    HDLmAI.openRouterImproveWebpageV1(HDLmWebpageImprover.originalUrl, 
                                      HDLmWebpageImprover.originalHtml, 
                                      suggestion, 
                                      useAIVersionWpiWIV1, 
                                      openRouterChatTemplatesWpiWIV1, 
                                      openRouterResponseFormatTypeJsonObjectWpiWIV1, 
                                      openRouterResponseJsonSchemaImproverWpiWIV1, 
                                      desired, 
                                      undesired).then(result => {
      HDLmWebpageImprover.improvedHtml = HDLmWebpageImprover.addGoogleAnalyticsTag(HDLmWebpageImprover.addBaseUrl(result.improvedHtml, HDLmWebpageImprover.originalUrl));
      HDLmWebpageImprover.items = (result.improvements || []).map(HDLmWebpageImprover.buildImprovement);
      HDLmImprovements.putImprovements(HDLmWebpageImprover.storage(), HDLmWebpageImprover.modifiedUrl);
      HDLmWebpageImprover.thirdTab = window.open('', '_blank');
      if (HDLmWebpageImprover.thirdTab) {
        HDLmWebpageImprover.thirdTab.document.open();
        HDLmWebpageImprover.thirdTab.document.write(HDLmWebpageImprover.addStylesAndMessageHandler(HDLmWebpageImprover.improvedHtml, HDLmWebpageImprover.items));
        HDLmWebpageImprover.thirdTab.document.close();
      }
      HDLmWebpageImprover.busy = false;
      if (HDLmWebpageImprover.createRule)
        HDLmHtml.storeWebpageRule({ urlStr: HDLmWebpageImprover.originalUrl, webpageStr: HDLmWebpageImprover.improvedHtml });
      HDLmWebpageImprover.refresh();
    }).catch(error => {
      HDLmWebpageImprover.busy = false;
      HDLmWebpageImprover.displayErrorMessage(error.message);
      HDLmWebpageImprover.refresh();
    });
  }
  static loadImprovements() {
    HDLmImprovements.loadImprovements().then(loaded => {
      if (!loaded)
        return;
      let outer = HDLmWebpageImprover.storage();
      for (let item of loaded.Improvements || [])
        outer = HDLmImprovements.possiblyAddImprovement(outer, item.Why, item.What, item.Hash);
      HDLmImprovements.putImprovements(outer, HDLmWebpageImprover.modifiedUrl);
      HDLmWebpageImprover.items = outer.Improvements;
      HDLmWebpageImprover.refresh();
    });
  }
  static loadUrl() {
    let value = HDLmWebpageImprover.url.trim();
    let normalized = value.indexOf('://') < 0 ? 'https://' + value : value;
    try {
      new URL(normalized);
    }
    catch (error) {
      HDLmWebpageImprover.displayErrorMessage('The URL is not valid');
      return;
    }
    fetch(normalized).then(response => {
      if (!response.ok)
        throw new Error('The URL could not be accessed');
      return response.text();
    }).then(html => {
      HDLmWebpageImprover.originalUrl = normalized;
      HDLmWebpageImprover.originalHtml = html;
      HDLmWebpageImprover.modifiedUrl = HDLmWebpageImprover.getModifiedWebsiteUrl(normalized);
      HDLmWebpageImprover.items = HDLmWebpageImprover.storage().Improvements;
      HDLmWebpageImprover.secondTab = window.open(normalized, '_blank');
      HDLmWebpageImprover.refresh();
    }).catch(error => HDLmWebpageImprover.displayErrorMessage(error.message));
  }
  static main() {
    if (HDLmWebpageImprover.shouldProgramRun(window.location.pathname))
      HDLmWebpageImprover.nextStage(HDLmWebpageImproverStageTypes.setTitle);
  }
  static nextStage(stage) {
    if (stage == HDLmWebpageImproverStageTypes.setTitle)
      return HDLmWebpageImprover.nextStage(HDLmWebpageImproverStageTypes.checkServerStatus);
    if (stage == HDLmWebpageImproverStageTypes.checkServerStatus)
      return HDLmWebpageImprover.checkServerStatus().then(up => up ? HDLmWebpageImprover.nextStage(HDLmWebpageImproverStageTypes.showWebpageUi) : null);
    if (stage == HDLmWebpageImproverStageTypes.showWebpageUi) {
      HDLmReactFive.root('leftAndRightPage').render(React.createElement(HDLmWebpageImprover.buildUi));
      window.focus();
      return HDLmWebpageImprover.nextStage(HDLmWebpageImproverStageTypes.visibilityChange);
    }
    if (stage == HDLmWebpageImproverStageTypes.visibilityChange)
      window.addEventListener('visibilitychange', HDLmWebpageImprover.visibilityChange);
  }
  static refresh() {
    if (HDLmWebpageImprover.setRender)
      HDLmWebpageImprover.setRender(Date.now());
  }
  static setWanted(index, wantedValue) {
    let outer = HDLmWebpageImprover.storage();
    let now = new Date().toISOString();
    outer.Improvements[index].Wanted = wantedValue;
    outer.Improvements[index]['Last Modified'] = now;
    outer['Last Modified'] = now;
    HDLmImprovements.putImprovements(outer, HDLmWebpageImprover.modifiedUrl);
    HDLmWebpageImprover.items = outer.Improvements;
    HDLmWebpageImprover.refresh();
  }
  static shouldProgramRun(pathnameValue) {
    if (typeof pathnameValue != 'string')
      return false;
    let pathname = pathnameValue.toLowerCase();
    return pathname.endsWith('index.html') || pathname.includes('/webpageimprover') || pathname.includes('/revenueimprover');
  }
  static storage() {
    return HDLmImprovements.getImprovements(HDLmWebpageImprover.modifiedUrl) || {
      Version: 1,
      Created: new Date().toISOString(),
      'Last Modified': new Date().toISOString(),
      Improvements: []
    };
  }
  static visibilityChange(event) {
    if (event != null && document.visibilityState == 'hidden')
      HDLmWebpageImprover.refresh();
  }
  static highlight(hashValue) {
    if (!HDLmWebpageImprover.thirdTab || HDLmWebpageImprover.thirdTab.closed)
      return;
    HDLmWebpageImprover.thirdTab.postMessage(hashValue + ' hilite');
    setTimeout(function() {
      if (HDLmWebpageImprover.thirdTab && !HDLmWebpageImprover.thirdTab.closed)
        HDLmWebpageImprover.thirdTab.postMessage(hashValue + ' normal');
    }, 30000);
  }
}
HDLmWebpageImprover.busy = false;
HDLmWebpageImprover.createRule = false;
HDLmWebpageImprover.improvedHtml = '';
HDLmWebpageImprover.items = [];
HDLmWebpageImprover.modifiedUrl = '';
HDLmWebpageImprover.originalHtml = '';
HDLmWebpageImprover.originalUrl = '';
HDLmWebpageImprover.secondTab = null;
HDLmWebpageImprover.setRender = null;
HDLmWebpageImprover.suggestion = '';
HDLmWebpageImprover.thirdTab = null;
HDLmWebpageImprover.url = '';