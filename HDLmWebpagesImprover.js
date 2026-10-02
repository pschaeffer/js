"use strict";
const headingWpsWIV1 = 'Pages Revenue Improver';
const helpTextWpsWIV1 = { url: 'Enter URL (of website) to improve', suggestion: 'Suggestion (optional)', directory: 'Enter a directory where webpages will be saved' };
const suggestionPlaceholderWpsWIV1 = 'Enter a suggestion for the pages revenue improver';
const useAIVersionWpsWIV1 = 'openRouterWpsWIV1';
const openRouterChatTemplatesWpsWIV1 = {
  context: 'You are an expert at improving webpages to increase conversion rates and revenue.\n' +
           'Copy everything from the old HTML to the generated HTML by default unless a change is made.\n' +
           'Return the complete improved HTML.\n',
  webpageServer: 'Please improve the HTML from the passed URL to increase conversion rates ' +
                 'and revenue.\n' +
                 'Return the complete improved HTML.\n' +
                 '\n' +
                 'HTML:\n' +
                 '{{html}}\n' +
                 'User suggestion: {{suggest}}\n'
};
const openRouterResponseFormatTypeJsonObjectWpsWIV1 = { type: 'json_object' };
const openRouterResponseJsonSchemaImproverWpsWIV1 = {
  type: 'json_schema',
  json_schema: {
    name: 'webpages_improver_response',
    description: 'Complete improved HTML',
    strict: true,
    schema: {
      type: 'object',
      properties: { improvedHtml: { type: 'string' }, improvements: { type: 'array', items: { type: 'object', properties: { What: { type: 'string' }, Why: { type: 'string' }, Hash: { type: 'string' } }, required: ['What', 'Why', 'Hash'], additionalProperties: false } } },
      required: ['improvedHtml'],
      additionalProperties: false
    }
  }
};
class HDLmWebpagesImprover {
  static addGoogleAnalyticsTag(htmlText) {
    if (typeof htmlText != 'string')
      return htmlText;
    let now = new Date();
    let dateGmt = now.getUTCFullYear().toString() + (now.getUTCMonth() + 1).toString().padStart(2, '0') + now.getUTCDate().toString().padStart(2, '0');
    let timeGmt = now.getUTCHours().toString().padStart(2, '0') + now.getUTCMinutes().toString().padStart(2, '0') + now.getUTCSeconds().toString().padStart(2, '0');
    let tag = 'HDLmGAWpsTag-' + dateGmt + '-' + timeGmt;
    let script = '<script>(function(){var tag="' + tag + '";if(typeof gtag==="function"){gtag("event",tag,{event_category:"HDLmGAWpsTag",event_label:tag});}})();</script>';
    let bodyIndex = htmlText.toLowerCase().indexOf('</body>');
    return bodyIndex < 0 ? htmlText + script : htmlText.substring(0, bodyIndex) + script + htmlText.substring(bodyIndex);
  }
  static addSpinnerStyle() {
    if (document.getElementById('hdlmWebpagesImproverSpinnerStyle') != null)
      return;
    let styleElement = document.createElement('style');
    styleElement.id = 'hdlmWebpagesImproverSpinnerStyle';
    styleElement.textContent = '@keyframes hdlm-wps-spin{0%{transform:rotate(0deg)}100%{transform:rotate(360deg)}}';
    document.head.appendChild(styleElement);
  }
  static buildSaveRelativePath(urlStr) {
    try {
      let pathName = new URL(urlStr).pathname;
      if (pathName == '' || pathName == '/')
        return 'index.html';
      let parts = pathName.split('/').filter(part => part != '');
      if (parts.length == 0)
        return 'index.html';
      if (pathName.endsWith('/') || parts[parts.length - 1].indexOf('.') < 0)
        parts.push('index.html');
      return parts.join('/');
    }
    catch (error) {
      return 'index.html';
    }
  }
  static buildWebUiElement() {
    const [, setRender] = React.useState(0);
    HDLmWebpagesImprover.stateSetFunction = setRender;
    function urlChange(event) {
      HDLmWebpagesImprover.urlInputCurrentValue = event.target.value;
      HDLmWebpagesImprover.urlValidated = false;
      HDLmWebpagesImprover.urlAccessed = false;
      HDLmWebpagesImprover.originalUrl = null;
      HDLmWebpagesImprover.originalHtml = null;
      HDLmWebpagesImprover.forceReRender();
    }
    function suggestionChange(event) {
      HDLmWebpagesImprover.suggestionCurrentValue = event.target.value;
    }
    function checkboxChange(event) {
      HDLmWebpagesImprover.createRule = event.target.checked;
      HDLmWebpagesImprover.forceReRender();
    }
    function urlKeyDown(event) {
      if (event.key == 'Enter')
        HDLmWebpagesImprover.validateAndLoadUrl(event.target.value.trim());
    }
    let urlElement = HDLmReactSix.buildSingleLineInputWLabel(helpTextWpsWIV1.url, 'https://www.example.com', 'urlInputWpsWIV1', urlKeyDown, urlChange, HDLmWebpagesImprover.urlInputCurrentValue, true);
    let suggestionElement = HDLmReactSix.buildTextAreaWLabel(helpTextWpsWIV1.suggestion, suggestionPlaceholderWpsWIV1, 'suggestionInputWpsWIV1', suggestionChange, HDLmWebpagesImprover.suggestionCurrentValue);
    let checkboxElement = HDLmReactSix.buildCheckboxElement('createRulesWpsWIV1', 'Create rules for the updated pages', HDLmWebpagesImprover.createRule, checkboxChange);
    let buttonElement = HDLmReactSix.buildButtonElement('improveButtonWpsWIV1', 'Improve', HDLmWebpagesImprover.improveWebsiteAndSave, !HDLmWebpagesImprover.urlValidated || !HDLmWebpagesImprover.urlAccessed || HDLmWebpagesImprover.improvingInProgress, { marginTop: '20px' });
    let elements = [React.createElement('h2', { key: 'heading' }, headingWpsWIV1), urlElement, suggestionElement, checkboxElement, buttonElement, React.createElement('div', { key: 'directory', style: { marginTop: '12px' } }, helpTextWpsWIV1.directory)];
    if (HDLmWebpagesImprover.improvingInProgress)
      elements.push(HDLmReactSix.buildSpinnerElement());
    return HDLmReactSix.putElementsInFragment(elements);
  }
  static async checkServerStatus() {
    let serverName = HDLmConfigInfo.getServerName();
    let statusName = HDLmDefines.getString('HDLMGETSSVALUE');
    let urlStr = 'https://' + serverName + '/' + statusName;
    try {
      await HDLmAJAX.runAJAX('URL', true, urlStr, '', '', 'get', '');
      return true;
    }
    catch (error) {
      HDLmWebpagesImprover.displayErrorMessage('The server status request failed');
      return false;
    }
  }
  static checkUrlValid(urlStr) {
    try {
      new URL(urlStr);
    }
    catch (error) {
      return error.message;
    }
    let hostName = HDLmHtml.getHostName(urlStr);
    if (typeof hostName != 'string' || hostName == '')
      return 'The URL host name is invalid';
    return '';
  }
  static displayErrorMessage(message) {
    alert(String(message));
  }
  static forceReRender() {
    HDLmWebpagesImprover.inputKeyValue++;
    if (HDLmWebpagesImprover.stateSetFunction != null)
      HDLmWebpagesImprover.stateSetFunction(HDLmWebpagesImprover.inputKeyValue);
  }
  static async getDirectoryHandleForPath(rootDirectoryHandle, pathParts) {
    let directoryHandle = rootDirectoryHandle;
    for (let pathPart of pathParts)
      directoryHandle = await directoryHandle.getDirectoryHandle(pathPart, { create: true });
    return directoryHandle;
  }
  static getHtmlFromAiResult(aiResult, fallbackHtml) {
    if (typeof aiResult == 'string' && aiResult != '')
      return aiResult;
    if (aiResult != null && typeof aiResult.improvedHtml == 'string' && aiResult.improvedHtml != '')
      return aiResult.improvedHtml;
    return fallbackHtml;
  }
  static getModifiedWebsiteUrl(urlStr) {
    if (typeof urlStr != 'string' || urlStr.trim() == '')
      return '';
    try {
      let urlObj = new URL(/^https?:\/\//i.test(urlStr.trim()) ? urlStr.trim() : 'https://' + urlStr.trim());
      return urlObj.host + (urlObj.pathname == '/' ? '' : urlObj.pathname);
    }
    catch (error) {
      return '';
    }
  }
  static getNormalizedWebsiteUrl(urlStr) {
    if (typeof urlStr != 'string' || urlStr.trim() == '')
      return null;
    let localUrl = /^https?:\/\//i.test(urlStr.trim()) ? urlStr.trim() : 'https://' + urlStr.trim();
    try {
      let urlObj = new URL(localUrl);
      if (urlObj.protocol != 'http:' && urlObj.protocol != 'https:')
        return null;
      urlObj.search = '';
      urlObj.hash = '';
      return urlObj.toString();
    }
    catch (error) {
      return null;
    }
  }
  static getUrlsToScanFromHtml(currentUrl, htmlText) {
    if (typeof htmlText != 'string' || htmlText == '')
      return [];
    let documentObject = new DOMParser().parseFromString(htmlText, 'text/html');
    let baseUrl = new URL(currentUrl);
    let foundUrls = [];
    let foundSet = new Set();
    for (let anchor of documentObject.querySelectorAll('a[href]')) {
      try {
        let linkUrl = new URL(anchor.getAttribute('href'), currentUrl);
        if (!['http:', 'https:'].includes(linkUrl.protocol) || linkUrl.hostname.toLowerCase() != baseUrl.hostname.toLowerCase())
          continue;
        linkUrl.search = '';
        linkUrl.hash = '';
        let link = linkUrl.toString();
        if (!foundSet.has(link)) {
          foundSet.add(link);
          foundUrls.push(link);
        }
      }
      catch (error) {
      }
    }
    return foundUrls;
  }
  static async improveWebsiteAndSave() {
    if (HDLmWebpagesImprover.improvingInProgress)
      return;
    if (!HDLmWebpagesImprover.urlValidated || !HDLmWebpagesImprover.urlAccessed || HDLmWebpagesImprover.originalUrl == null || HDLmWebpagesImprover.originalHtml == null) {
      HDLmWebpagesImprover.displayErrorMessage('Enter and validate a URL before improving');
      return;
    }
    HDLmWebpagesImprover.improvingInProgress = true;
    HDLmWebpagesImprover.forceReRender();
    try {
      let picker = window.showdirectorypicker || window.showDirectoryPicker;
      if (typeof picker != 'function')
        throw new Error('The browser does not support directory selection');
      let rootHandle = await picker.call(window, { mode: 'readwrite', startIn: 'documents' });
      let suggestion = typeof HDLmWebpagesImprover.suggestionCurrentValue == 'string' ? HDLmWebpagesImprover.suggestionCurrentValue.trim() : '';
      if (suggestion == suggestionPlaceholderWpsWIV1)
        suggestion = '';
      let queue = [HDLmWebpagesImprover.originalUrl];
      let queued = new Set(queue);
      let processed = new Set();
      let improvedPages = new Map();
      while (queue.length > 0) {
        let currentUrl = queue.shift();
        queued.delete(currentUrl);
        if (processed.has(currentUrl))
          continue;
        processed.add(currentUrl);
        let htmlText = currentUrl == HDLmWebpagesImprover.originalUrl ? HDLmWebpagesImprover.originalHtml : null;
        if (htmlText == null) {
          try {
            let response = await fetch(currentUrl);
            if (!response.ok)
              continue;
            htmlText = await response.text();
          }
          catch (error) {
            continue;
          }
        }
        let aiResult = await HDLmAI.openRouterImproveWebpageV1(currentUrl, htmlText, suggestion, useAIVersionWpsWIV1, openRouterChatTemplatesWpsWIV1, openRouterResponseFormatTypeJsonObjectWpsWIV1, openRouterResponseJsonSchemaImproverWpsWIV1, '', '');
        improvedPages.set(currentUrl, HDLmWebpagesImprover.addGoogleAnalyticsTag(HDLmWebpagesImprover.getHtmlFromAiResult(aiResult, htmlText)));
        for (let foundUrl of HDLmWebpagesImprover.getUrlsToScanFromHtml(currentUrl, htmlText)) {
          console.log('Found URL to possibly queue:', foundUrl);
          if (processed.has(foundUrl)) {
            console.log('URL already processed:', foundUrl);
            continue;
          }
          if (queued.has(foundUrl)) {
            console.log('URL already queued:', foundUrl);
            continue;
          }
          queued.add(foundUrl);
          queue.push(foundUrl);
        }
      }
      await HDLmWebpagesImprover.saveAllImprovedPages(rootHandle, improvedPages);
      if (HDLmWebpagesImprover.createRule)
        for (let [urlStr, webpageStr] of improvedPages)
          HDLmHtml.storeWebpageRule({ urlStr: urlStr, webpageStr: webpageStr });
    }
    catch (error) {
      HDLmWebpagesImprover.displayErrorMessage('An error occurred while improving the website: ' + error.message);
    }
    HDLmWebpagesImprover.improvingInProgress = false;
    HDLmWebpagesImprover.forceReRender();
  }
  static main() {
    if (HDLmWebpagesImprover.shouldProgramRun(window.location.pathname))
      HDLmWebpagesImprover.mainAsync();
  }
  static async mainAsync() {
    let configs = await HDLmConfig.getConfigs();
    HDLmConfig.addConfigs(configs);
    HDLmUtility.setProdMode(!(window.location.hostname || '').includes('t'));
    HDLmWebpagesImprover.nextStage(HDLmWebpagesImproverStageTypes.setTitle, null);
  }
  static async nextStage(stage, varNext) {
    let running = true;
    while (running) {
      switch (stage) {
        case HDLmWebpagesImproverStageTypes.setTitle:
          HDLmWebpagesImprover.addSpinnerStyle();
          stage = HDLmWebpagesImproverStageTypes.checkServerStatus;
          break;
        case HDLmWebpagesImproverStageTypes.checkServerStatus:
          if (!await HDLmWebpagesImprover.checkServerStatus()) {
            HDLmWebpagesImprover.displayErrorMessage('The server is unavailable');
            running = false;
            break;
          }
          stage = HDLmWebpagesImproverStageTypes.showWebpagesUi;
          break;
        case HDLmWebpagesImproverStageTypes.showWebpagesUi:
          HDLmReactSix.getRootContainer('leftAndRightPage').render(React.createElement(HDLmWebpagesImprover.buildWebUiElement));
          window.focus();
          stage = HDLmWebpagesImproverStageTypes.visibilityChange;
          break;
        case HDLmWebpagesImproverStageTypes.visibilityChange:
          HDLmWebpagesImprover.visibilityChangeAdd();
          running = false;
          break;
        default:
          running = false;
          break;
      }
    }
  }
  static async saveAllImprovedPages(rootHandle, improvedPages) {
    for (let [urlStr, htmlText] of improvedPages) {
      let pathParts = HDLmWebpagesImprover.buildSaveRelativePath(urlStr).split('/');
      let fileName = pathParts.pop();
      let directoryHandle = await HDLmWebpagesImprover.getDirectoryHandleForPath(rootHandle, pathParts);
      let fileHandle = await directoryHandle.getFileHandle(fileName, { create: true });
      let writable = await fileHandle.createWritable();
      await writable.write(htmlText);
      await writable.close();
    }
  }
  static shouldProgramRun(pathnameValue) {
    if (typeof pathnameValue != 'string')
      return false;
    let pathname = pathnameValue.toLowerCase();
    return pathname.endsWith('index.html') || pathname.includes('/webpagesimprover');
  }
  static validateAndLoadUrl(urlStr) {
    let normalizedUrl = HDLmWebpagesImprover.getNormalizedWebsiteUrl(urlStr);
    if (normalizedUrl == null) {
      HDLmWebpagesImprover.displayErrorMessage('The URL is not valid');
      return;
    }
    let errorText = HDLmWebpagesImprover.checkUrlValid(normalizedUrl);
    if (errorText != '') {
      HDLmWebpagesImprover.displayErrorMessage(errorText);
      return;
    }
    fetch(normalizedUrl).then(response => {
      if (!response.ok)
        throw new Error('Failed to access website URL: ' + response.status + ' ' + response.statusText);
      return response.text();
    }).then(htmlText => {
      HDLmWebpagesImprover.originalUrl = normalizedUrl;
      HDLmWebpagesImprover.originalHtml = htmlText;
      HDLmWebpagesImprover.urlValidated = true;
      HDLmWebpagesImprover.urlAccessed = true;
      HDLmWebpagesImprover.forceReRender();
    }).catch(error => HDLmWebpagesImprover.displayErrorMessage('Error accessing website URL: ' + error.message));
  }
  static visibilityChangeAdd() {
    window.addEventListener('visibilitychange', HDLmWebpagesImprover.visibilityChangeDone);
  }
  static visibilityChangeDone(event) {
    if (event != null && document.visibilityState == 'hidden')
      HDLmWebpagesImprover.visibilityChangeHiddenCount++;
  }
}
HDLmWebpagesImprover.originalHtml = null;
HDLmWebpagesImprover.originalUrl = null;
HDLmWebpagesImprover.urlInputCurrentValue = '';
HDLmWebpagesImprover.urlValidated = false;
HDLmWebpagesImprover.urlAccessed = false;
HDLmWebpagesImprover.suggestionCurrentValue = '';
HDLmWebpagesImprover.createRule = false;
HDLmWebpagesImprover.improvingInProgress = false;
HDLmWebpagesImprover.inputKeyValue = 0;
HDLmWebpagesImprover.stateSetFunction = null;
HDLmWebpagesImprover.visibilityChangeHiddenCount = 0;
