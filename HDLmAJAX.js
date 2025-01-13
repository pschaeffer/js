/**
 * HDLmAJAX short summary.
 *
 * HDLmAJAX description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
class HDLmAJAX {
  /* Build and send an AJAX request. We would really like to actually
     run the AJAX request here (in some cases). However, we must invoke 
     a proxy instead (in some cases). This is a SOP/CORS problem. The proxy
     is always invoked using POST. However, a value is passed to the proxy
     telling the proxy if it should use GET or POST. The type value (below)
     is passed to the proxy to control the type of the final AJAX request.

     The proxy is a program that can use HTTP as need be. Because the
     program runs on the server side, it is not subject to the SOP/CORS 
     restrictions, that JavaScript in a browser is subject to.
     
     The caller must pass an asynchronous value which is either true or
     false. If the asynchronous value is true, then this routine will
     return a Promise for the caller to use. If the asynchronous value
     is false, this routine will wait until the AJAX operation is done
     and will return the AJAX result. 
     
     At least for now we haven't found a way to really make AJAX calls 
     synchronous. As a consequence, only asynchronous AJAX calls are 
     supported at this time. */ 
  static runAJAX(requestType, requestAsync, 
                 URL = '',
                 userid = '', password = '',
                 type = 'get',
                 extraInfo = '') { 
    /* console.log('In HDLMAJAX.runAJAX'); */ 
    /* console.log(requestType); */
    /* console.log(URL); */
    /* console.log(userid); */
    /* console.log(password); */
    /* console.log(type); */
    /* console.log(extraInfo); */
    /* Get the number of arguments */
    let argsLen = arguments.length;
    let bypassProxy = false;
    let rejectFunction;
    let resolveFunction; 
    /* Get the name of the server used to handle some requests */
    let serverName = HDLmConfigInfo.getServerName();
    /* The function below gains control when an AJAX error occurs.
       the error is reported by failing the current request. */
    function runAJAXError() { 
      /* console.log('In HDLmAJAX.runAJAX.runAJAXError'); */
      rejectFunction(Error("Network Error"));
    }
    /* The function below gains control when an AJAX request completes.
       The function checks for errors and then (assuming no errors)
       passes the request response to the callback routine. */
    function runAJAXLoad() {
      /* console.log('In HDLmAJAX.runAJAX.runAJAXLoad'); */
      /* console.log(this.status); */
      /* Check the status of the request. This event will occur even
         if the status is a 404. */
      if (this.status == 200) {
        /* Resolve the Promise with the response text or a JSON
           object built from the response text */
        if (this.HDLmRequestType == 'nodedata') {
          resolveFunction(JSON.parse(this.responseText));
        }
        resolveFunction(this.responseText);
      }
      /* Reject the Promise with the error text */
      else {
        rejectFunction(Error(this.statusText));
      }
    }
    /* Check if we can bypass the proxy. This will be true in some
       cases. We can bypass the proxy if the current request can be
       handled by the server, without going through a proxy. */
    let partialPath = HDLmConfigInfo.getEntriesBridgePartialPath();
    if (requestType == 'URL' &&
        URL.startsWith('https://' + serverName + '/' + partialPath + '/'))
      bypassProxy = true;
    let invokeApiStr = HDLmDefines.getString('HDLMINVOKEAPI');
    if (requestType == 'URL' &&
        URL.startsWith('https://' + serverName + '/' + invokeApiStr + '?'))
      bypassProxy = true;
    /* We may be running in an Electron JS environment or the extension
       window environment. In either of these environments, we don't need 
       to use (can't use) a proxy to send HTTP(s) requests. They can be 
       sent directly from this code. As a consequence, the actual HTTP(S) 
       request must be built below. 

       The underlying idea is that in a few environments, we can send
       the request directly. However, in other environments, we must
       send the request to a proxy server which will forward the
       request as need be. This is actually a SOP/CORS problem. */
    /* console.log('s1'); */
    /* console.log(HDLmUtility.isElectron()); */
    /* console.log(HDLmGlobals.checkActiveExtensionWindow()); */
    /* console.log(bypassProxy); */
    if (bypassProxy              ||
        HDLmUtility.isElectron() ||
        HDLmGlobals.checkActiveExtensionWindow()) { 
      /* console.log('s2'); */
      /* Build the required Promise for return to the caller */
      let xElectronPromise = new Promise(function (resolve, reject) {
        /* Save references to the reject and resolve functions */
        rejectFunction = reject;
        resolveFunction = resolve;
        /* Build the AJAX object. Note that we attach a event listener 
           and save the callback routine specified by the caller. The
           load event listener is invoked by the system. It in turns 
           invokes the callback specified by the caller. */
        let xHttp = new XMLHttpRequest();
        /* We store the request type in the xHttp object for use later */
        xHttp.HDLmRequestType = requestType;
        xHttp.addEventListener("error", runAJAXError);
        xHttp.addEventListener("load", runAJAXLoad);
        /* We must use the type passed by the caller */
        type = type.toUpperCase();
        /* console.log(type); */
        /* console.log(URL); */
        xHttp.open(type, URL, requestAsync);
        if (requestAsync)
          xHttp.timeout = 60000;
        /* We need to check for a POST request. The data for POST
           requests has already been encoded. We must deocde the
           data here to avoid multiple encoding operations. The
           code has been changed and a decode is now longer needed. */        
        if (type == 'POST') { 
          xHttp.setRequestHeader("Content-type", "application/json");
        }
        /* This code is used to the userid and password directly to the
           server using AJAX. */
        xHttp.setRequestHeader("Authorization", "Basic " + btoa(userid + ":" + password)); 
        xHttp.send(extraInfo);
      });
      /* Check the asynchronous value. If this value is true, then
         we must return a Promise to the caller. The caller must 
         handle the Promise as need be. */
      if (requestAsync)
        return xElectronPromise;
    }
    /* If we are not running in the Electron JS environment or the
       extension window environment, then the current request must be 
       sent to a proxy server. The proxy server will perform the actual
       request.

       The underlying idea is that in a few environments, we can send
       the request directly. However, in other environments, we must
       send the request to a proxy server which will forward the 
       request as need be. This is actually a SOP/CORS problem. */  
    /* console.log('runAJAX 3'); */
    if (bypassProxy                              == false &&
        HDLmUtility.isElectron()                 == false &&
        HDLmGlobals.checkActiveExtensionWindow() == false) { 
      /* console.log('s4'); */
      /* Specifiy the name of the proxy routine on the server */ 
      let proxyName = HDLmConfigInfo.getProxyName();
      let requestUrl = 'https://' + serverName + '/' + proxyName;
      /* Build the required Promise for return to the caller */
      let xHttpPromise = new Promise(function (resolve, reject) {
        /* Save references to the reject and resolve functions */
        rejectFunction = reject;
        resolveFunction = resolve;
        /* Build the AJAX object. Note that we attach a event listener 
           and save the callback routine specified by the caller. The
           load event listener is invoked by the system. It in turns 
           invokes the callback specified by the caller. */
        let xhttp = new XMLHttpRequest();
        /* We store the request type in the xhttp object for use later */
        xhttp.HDLmRequestType = requestType;
        xhttp.addEventListener("error", runAJAXError);
        xhttp.addEventListener("load", runAJAXLoad);
        /* We must use POST to send additional data */ 
        xhttp.open("POST", requestUrl, requestAsync); 
        if (requestAsync)
          xhttp.timeout = 60000;
        xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        /* Build up the POST data. We pass the target URL, userid and password
           to the proxy server as POST data. We also send a type value that shows
           that this is a URL request. */
        let postData = '';
        postData += 'requesttype=';
        postData += requestType;
        postData += '&';
        postData += 'URL=';
        postData += URL;
        postData += '&';
        postData += 'userid=';
        postData += userid;
        postData += '&';
        postData += 'password=';
        postData += password;
        /* The code below added a duplicate password value. This was probably
           a typo at some point. The code has been disabled for now. */
        if (1 == 2) {
          postData += '&';
          postData += 'password=';
          postData += password;
        }
        postData += '&';
        postData += 'type=';
        postData += type;
        if (argsLen > 6) {
          postData += '&';
          postData += 'extrainfo=';
        /* The data must be URI component encoded before it is sent. This  
           step is required to preserve characters such as the plus sign. 
           Note that this code has been changed. */
          if (1 == 2) {
            /* console.log(postData); */
            /* console.log(extraInfo); */
          }
          extraInfo = encodeURIComponent(extraInfo);
          postData += extraInfo;
        } 
        /* console.log(postData); */ 
        /* console.log(extraInfo); */
        xhttp.send(postData);
        /* We can't use this code for now. This code would be used to the userid 
           and password directly to the server using AJAX. The code below causes
           some sort of DOMException. I do not know why. */
        if (1 == 2) {
          xhttp.setRequestHeader("Authorization", "Basic " + btoa(userid + ":" + password));
        }
        /* We don't really need to log this information at this time */
        if (1 == 1) {
          /* console.log(xhttp.status); */
          /* console.log(xhttp.readyState); */
          /* console.log(xhttp.statusText); */
          /* console.log(xhttp.responseText); */
        }
      });
      /* Check the asynchronous value. If this value is true, then
         we must return a Promise to the caller. The caller must 
         handle the Promise as need be. */
      if (requestAsync)
        return xHttpPromise;
    }
  }
}