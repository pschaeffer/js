/**
 * HDLmWebpageOptimizer short summary.
 *
 * HDLmWebpageOptimizer description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following string controls what type and version
   of the AI code is used for webpage optimization. */
let useAIVersionWOV1;
useAIVersionWOV1 = 'OpenRouterWOV1';
/* The heading for the webpage optimizer is set below.
   The heading does not end with a version suffix. */
const headingWOV1 = "Webpage Optimizer";
/* The help text is set below. The help text is stored
   in an object so that it can be easily accessed and
   changed if needed. */
const helpTextWOV1 = {
  "url": "Enter the URL of the webpage you want to optimize. " +
         "The URL may or may not start with 'https://'. " +
         "Press Enter to validate the URL and fetch the webpage."
};
/* The chat templates are used to build the prompts that
   are sent to Open Router for webpage optimization.
   The context template describes what the AI should do.
   The webpageServer template provides the HTML to optimize.
   The {url} placeholder in webpageServer is replaced with
   the actual HTML content of the original webpage. */
const OpenRouterChatTemplatesWOV1 = {
  "context": "You are an expert at improving and optimizing web pages for better sales, " +
             "user engagement, and overall performance.\n" +
             "\n" +
             "You will be asked to:\n" +
             "- Analyze a web page.\n" +
             "- Optimize the full HTML of the web page.\n" +
             "- Return the complete optimized HTML.\n" +
             "- List the specific improvements you made.\n",
  "webpageServer": "Optimize the following HTML page. Return the fully optimized HTML " +
                   "along with a list of the improvements you made:\n" +
                   "```HTML\n" +
                   "{url}\n" +
                   "```\n"
};
/* The response format type is set below. This constant
   is passed to openRouterOptimizeWebpageV1 as the
   responseFormat parameter. */
const openRouterResponseFormatTypeJsonObjectWOV1 = { type: "json_object" };
/* The response JSON schema for the optimizer is set below.
   The schema defines the structure that Open Router should
   return for a webpage optimization response. The response
   must include the optimized HTML and a list of improvements. */
const openRouterResponseJsonSchemaOptimizerWOV1 = { type: "json_schema",
                                                    json_schema: {
                                                      name: "optimizerSchema",
                                                      description: "Schema for webpage optimization response",
                                                      strict: true,
                                                      schema: {
                                                        type: "object",
                                                        properties: {
                                                          optimizedHtml: { type: "string",
                                                            description: "The fully optimized HTML of the webpage"
                                                          },
                                                          improvements: {
                                                            type: "array",
                                                            description: "A list of improvements made to the webpage",
                                                            items: {
                                                              type: "object",
                                                              properties: {
                                                                what: { type: "string",
                                                                  description: "What specific change was made"
                                                                },
                                                                why: { type: "string",
                                                                  description: "Why this change improves the page"
                                                                }
                                                              },
                                                              required: ["what", "why"],
                                                              additionalProperties: false
                                                            }
                                                          }
                                                        },
                                                        required: ["optimizedHtml", "improvements"],
                                                        additionalProperties: false
                                                      }
                                                    }
                                                  };
/* The HDLmWebpageOptimizer class is not used to create any objects.
   However, it does contain code for building and running the
   webpage optimizer. No instances of this class can ever be
   created. */
class HDLmWebpageOptimizer {
  /* This routine adds a base tag to the HTML right after
     the head section opening tag. The base tag allows all
     relative URLs in the HTML to be resolved correctly
     relative to the original URL. The modified HTML is
     returned to the caller. */
  static addBaseUrl(htmlStr, currentUrl) {
    /* Build the base tag to be inserted */
    let baseTag = '<base href="' + currentUrl + '">';
    /* Insert the base tag right after the head opening tag */
    let modifiedHtml = htmlStr.replace(/<head([^>]*)>/i, (match) => match + baseTag);
    /* Return the modified HTML to the caller */
    return modifiedHtml;
  }
  /* This routine builds and sets the state value.
     Calling this routine causes React to re-render
     the webpage optimizer UI. */
  static buildAndSetStateValue(setStateFunction, stateValue) {
    /* Set the state value using the provided function */
    setStateFunction(stateValue);
    /* Return the state value to the caller */
    return stateValue;
  }
  /* This routine builds an HTML page that shows the list
     of improvements made during webpage optimization.
     The HTML page is returned to the caller as a string. */
  static buildImprovementsHtml(improvements) {
    /* Build an array of HTML lines */
    let htmlLines = [];
    htmlLines.push('<!DOCTYPE html>');
    htmlLines.push('<html>');
    htmlLines.push('<head>');
    htmlLines.push('<title>Webpage Improvements</title>');
    htmlLines.push('<style>body { font-family: Arial, sans-serif; margin: 20px; }</style>');
    htmlLines.push('</head>');
    htmlLines.push('<body>');
    htmlLines.push('<h2>Webpage Improvements</h2>');
    htmlLines.push('<ol>');
    /* Add each improvement to the list */
    for (let improvement of improvements) {
      htmlLines.push('<li>');
      htmlLines.push('<strong>' + HDLmWebpageOptimizer.escapeHtml(improvement.what) + '</strong>');
      htmlLines.push('<br>');
      htmlLines.push(HDLmWebpageOptimizer.escapeHtml(improvement.why));
      htmlLines.push('</li>');
    }
    htmlLines.push('</ol>');
    htmlLines.push('</body>');
    htmlLines.push('</html>');
    /* Join the HTML lines and return to the caller */
    return htmlLines.join('\n');
  }
  /* This routine builds the overall web UI React element.
     The web UI React element is built from various sub-elements
     including a heading, a URL input area, Optimize and Save
     buttons, and an error message area. The overall web UI
     React element is returned to the caller. */
  static buildWebUiElement() {
    /* Use React state to allow forced re-renders. When the
       state value changes, React re-renders this component. */
    const [stateValue, setStateValue] = React.useState(0);
    HDLmWebpageOptimizer.stateSetFunction = setStateValue;
    /* Create the heading element for the URL section */
    let headingElement = HDLmReactFive.buildTextElement('h3', null, headingWOV1);
    /* Create the URL input area with a label */
    let urlInputDiv = HDLmReactFive.buildInputWLabel(
      HDLmWebpageOptimizer.handleUrlKeyDown,
      'Webpage URL',
      'Enter webpage URL here',
      'urlInput',
      '',
      false,
      null,
      true
    );
    /* Create a break element between the input and buttons */
    let breakElement = HDLmReactFive.buildBreakElement();
    /* Define the active button style used for enabled buttons */
    const activeButtonStyle = { borderRadius: '25px',
                                margin: '2px 8px 2px 1px',
                                padding: '10px 20px',
                                backgroundColor: '#007bff',
                                color: 'white',
                                border: 'none',
                                cursor: 'pointer' };
    /* Define the disabled button style used for grayed-out buttons */
    const disabledButtonStyle = { borderRadius: '25px',
                                  margin: '2px 8px 2px 1px',
                                  padding: '10px 20px',
                                  backgroundColor: '#007bff',
                                  color: 'white',
                                  border: 'none',
                                  cursor: 'not-allowed',
                                  opacity: '0.5' };
    /* Build the Optimize button props based on whether
       the button is currently enabled or disabled */
    let optimizeButtonProps;
    if (HDLmWebpageOptimizer.optimizeButtonEnabled) {
      optimizeButtonProps = { onClick: HDLmWebpageOptimizer.handleOptimize,
                              id: 'optimizeButton',
                              style: activeButtonStyle };
    }
    else {
      optimizeButtonProps = { disabled: true,
                              id: 'optimizeButton',
                              style: disabledButtonStyle };
    }
    /* Create the Optimize button React element */
    let optimizeButtonElement = React.createElement('button', optimizeButtonProps, 'Optimize');
    /* Build the Save button props based on whether
       the button is currently enabled or disabled */
    let saveButtonProps;
    if (HDLmWebpageOptimizer.saveButtonEnabled) {
      saveButtonProps = { onClick: HDLmWebpageOptimizer.handleSave,
                          id: 'saveButton',
                          style: activeButtonStyle };
    }
    else {
      saveButtonProps = { disabled: true,
                          id: 'saveButton',
                          style: disabledButtonStyle };
    }
    /* Create the Save button React element */
    let saveButtonElement = React.createElement('button', saveButtonProps, 'Save');
    /* Put both buttons in a div element */
    let buttonsDivElement = HDLmReactFive.putElementsInDiv(null,
                                                           [optimizeButtonElement,
                                                            saveButtonElement]);
    /* Define the style for the error text paragraph */
    const errorStyle = { color: 'red' };
    /* Create the error text element */
    let errorElement = HDLmReactFive.buildTextElement('p',
                                                      { style: errorStyle },
                                                      HDLmWebpageOptimizer.errorText);
    /* Combine all elements into a React fragment and return */
    return HDLmReactFive.putElementsInFragment([headingElement,
                                                urlInputDiv,
                                                breakElement,
                                                buttonsDivElement,
                                                errorElement]);
  }
  /* This routine clears the error text by setting it to
     an empty string. The UI is not re-rendered by this
     routine. The caller must call forceReRender if a
     re-render is needed. */
  static clearErrorText() {
    HDLmWebpageOptimizer.errorText = '';
  }
  /* This routine displays an error message by setting the
     error text and forcing a re-render of the UI. */
  static displayErrorMessage(errorText) {
    HDLmWebpageOptimizer.errorText = errorText;
    HDLmWebpageOptimizer.forceReRender();
  }
  /* This routine escapes HTML special characters in a
     string so that the string can be safely inserted
     into HTML content. The escaped string is returned
     to the caller. */
  static escapeHtml(str) {
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
  }
  /* This routine forces the React components to re-render.
     This is done by incrementing the input key value and
     updating the component state. */
  static forceReRender() {
    /* Increment the input key value to force a re-render */
    HDLmWebpageOptimizer.inputKeyValue++;
    let localStateValue = HDLmWebpageOptimizer.inputKeyValue;
    /* Build and set the new state value to trigger re-render */
    HDLmWebpageOptimizer.buildAndSetStateValue(HDLmWebpageOptimizer.stateSetFunction,
                                               localStateValue);
  }
  /* This routine handles the Optimize button click event.
     It calls openRouterOptimizeWebpageV1 with the original
     HTML and displays the results in browser tabs 3 and 4. */
  static async handleOptimize() {
    /* Clear any existing error text */
    HDLmWebpageOptimizer.clearErrorText();
    try {
      /* Call the AI optimization routine to get the optimized
         HTML and the list of improvements */
      let optimizationResult = await HDLmAI.openRouterOptimizeWebpageV1(
        HDLmWebpageOptimizer.currentUrl,
        HDLmWebpageOptimizer.originalHtml,
        useAIVersionWOV1,
        OpenRouterChatTemplatesWOV1,
        openRouterResponseFormatTypeJsonObjectWOV1,
        openRouterResponseJsonSchemaOptimizerWOV1
      );
      /* Store the optimized HTML and the improvements list */
      HDLmWebpageOptimizer.optimizedHtml = optimizationResult.optimizedHtml;
      HDLmWebpageOptimizer.improvements = optimizationResult.improvements;
      /* Display the optimized HTML directly in tab 3 */
      if (HDLmWebpageOptimizer.tab3 && !HDLmWebpageOptimizer.tab3.closed) {
        HDLmWebpageOptimizer.tab3.document.open();
        HDLmWebpageOptimizer.tab3.document.write(HDLmWebpageOptimizer.optimizedHtml);
        HDLmWebpageOptimizer.tab3.document.close();
      }
      /* Display the improvements list in tab 4 */
      if (HDLmWebpageOptimizer.tab4 && !HDLmWebpageOptimizer.tab4.closed) {
        let improvementsHtml = HDLmWebpageOptimizer.buildImprovementsHtml(
          HDLmWebpageOptimizer.improvements
        );
        HDLmWebpageOptimizer.tab4.document.open();
        HDLmWebpageOptimizer.tab4.document.write(improvementsHtml);
        HDLmWebpageOptimizer.tab4.document.close();
      }
      /* Enable the Save button now that the optimized webpage
         has been created and returned to this program */
      HDLmWebpageOptimizer.saveButtonEnabled = true;
      HDLmWebpageOptimizer.forceReRender();
    }
    catch (error) {
      HDLmWebpageOptimizer.displayErrorMessage('Optimization error: ' + error.message);
    }
  }
  /* This routine handles the Save button click event.
     It uses the File System Access API to prompt the user
     for a save location and then saves the optimized HTML
     to the file system. The user specifies the filename.
     The user is not prompted for a directory. */
  static async handleSave() {
    try {
      /* Use the File System Access API to show a save file picker.
         The user specifies the filename but not the directory. */
      let fileHandle = await window.showSaveFilePicker({
        suggestedName: 'optimized.html',
        types: [{ description: 'HTML file',
                  accept: { 'text/html': ['.html', '.htm'] } }]
      });
      /* Create a writable stream and write the optimized HTML */
      let writable = await fileHandle.createWritable();
      await writable.write(HDLmWebpageOptimizer.optimizedHtml);
      await writable.close();
    }
    catch (error) {
      /* Ignore AbortError which occurs when the user cancels
         the save dialog. Report all other errors. */
      if (error.name !== 'AbortError') {
        HDLmWebpageOptimizer.displayErrorMessage('Save error: ' + error.message);
      }
    }
  }
  /* This routine handles the key down event in the URL input
     area. It only processes the Enter key. When Enter is pressed,
     the URL is validated, a protocol is added if missing, and the
     original webpage HTML is fetched. If the fetch succeeds, the
     Optimize button is enabled. */
  static async handleUrlKeyDown(event) {
    /* Only process the Enter key */
    if (event.key !== 'Enter')
      return;
    /* Get the URL value entered by the user */
    let urlValue = event.target.value.trim();
    /* Check if the user entered an empty URL */
    if (!urlValue) {
      HDLmWebpageOptimizer.displayErrorMessage('Please enter a URL');
      return;
    }
    /* Add a protocol prefix if the URL does not already have one */
    if (!urlValue.startsWith('http://') && !urlValue.startsWith('https://'))
      urlValue = 'https://' + urlValue;
    /* Validate the URL by attempting to construct a URL object */
    let parsedUrl;
    try {
      parsedUrl = new URL(urlValue);
    }
    catch (parseError) {
      HDLmWebpageOptimizer.displayErrorMessage('The URL is not valid: ' + urlValue);
      return;
    }
    /* Store the validated URL */
    HDLmWebpageOptimizer.currentUrl = urlValue;
    /* Clear any existing error text */
    HDLmWebpageOptimizer.clearErrorText();
    /* Set tab 2 to display the original URL directly.
       Tab 2 navigates to the original URL, not the fetched HTML. */
    if (HDLmWebpageOptimizer.tab2 && !HDLmWebpageOptimizer.tab2.closed)
      HDLmWebpageOptimizer.tab2.location.href = urlValue;
    /* Fetch the original HTML from the URL */
    try {
      let htmlText = await HDLmAI.fetchUrl(urlValue, 'GET', {}, null);
      /* Check if the fetch succeeded */
      if (htmlText == null) {
        HDLmWebpageOptimizer.displayErrorMessage('Could not fetch the webpage: ' + urlValue);
        return;
      }
      /* Add a base tag to the HTML so relative URLs resolve correctly */
      htmlText = HDLmWebpageOptimizer.addBaseUrl(htmlText, urlValue);
      /* Store the original HTML for later use by the Optimize button */
      HDLmWebpageOptimizer.originalHtml = htmlText;
      /* Enable the Optimize button now that the URL is valid and
         the original HTML has been successfully obtained */
      HDLmWebpageOptimizer.optimizeButtonEnabled = true;
      HDLmWebpageOptimizer.forceReRender();
    }
    catch (fetchError) {
      HDLmWebpageOptimizer.displayErrorMessage('Error fetching the webpage: ' + fetchError.message);
    }
  }
  /* This routine provides the main entry point for the
     webpage optimizer. It opens three additional browser
     tabs (tabs 2 through 4), forces focus back to the
     first tab, and starts the stage processing. The main
     routine is not invoked by any code in this module. */
  static main() {
    /* Store a reference to the first tab (the control tab) */
    HDLmWebpageOptimizer.tab1 = window;
    /* Open the second tab which will show the original webpage */
    HDLmWebpageOptimizer.tab2 = window.open('', '_blank');
    /* Open the third tab which will show the optimized webpage */
    HDLmWebpageOptimizer.tab3 = window.open('', '_blank');
    /* Open the fourth tab which will show the improvements list */
    HDLmWebpageOptimizer.tab4 = window.open('', '_blank');
    /* Force focus back to the first tab */
    window.focus();
    /* Start the stage processing at the showWebPageUi stage */
    let stage = HDLmWebpageOptimizerStageTypes.showWebPageUi;
    HDLmWebpageOptimizer.nextStage(stage, null);
  }
  /* This routine runs the next stage of webpage optimizer
     processing. The next stage is determined by the stage
     parameter passed by the caller. */
  static async nextStage(stage, varNext) {
    /* Track whether to continue the stage processing loop */
    let nextStageLoop = true;
    /* Loop handling the next stage of processing */
    while (nextStageLoop) {
      /* Check if we are running under VsCode or not. If we are
         running under VsCode, show what stage is running. */
      if (HDLmUtility.isVscode())
        console.log(`In HDLmWebpageOptimizer.nextStage while loop ${stage}`);
      /* Switch on the current stage */
      switch (stage) {
        /* Handle the initial web page UI stage */
        case HDLmWebpageOptimizerStageTypes.showWebPageUi: {
          /* Get the React root container and render the web UI */
          let reactRoot = HDLmReactFive.getRootContainer('leftAndRightPage');
          reactRoot.render(React.createElement(HDLmWebpageOptimizer.buildWebUiElement));
          /* Move to the beforeUnload stage */
          stage = HDLmWebpageOptimizerStageTypes.beforeUnload;
          break;
        }
        /* Wait for the user to close the browser */
        case HDLmWebpageOptimizerStageTypes.beforeUnload: {
          /* Terminate the next stage loop */
          nextStageLoop = false;
          break;
        }
        /* Handle any unexpected stage values */
        default: {
          nextStageLoop = false;
          break;
        }
      }
    }
  }
}
/* The following field stores the current URL entered by the user */
HDLmWebpageOptimizer.currentUrl = null;
/* The following field stores the current error text */
HDLmWebpageOptimizer.errorText = '';
/* The following field stores the list of improvements */
HDLmWebpageOptimizer.improvements = null;
/* The following field is the input key value used to force re-renders */
HDLmWebpageOptimizer.inputKeyValue = 0;
/* The following field stores the optimized HTML */
HDLmWebpageOptimizer.optimizedHtml = null;
/* The following field tracks whether the Optimize button is enabled */
HDLmWebpageOptimizer.optimizeButtonEnabled = false;
/* The following field stores the original HTML fetched from the URL */
HDLmWebpageOptimizer.originalHtml = null;
/* The following field tracks whether the Save button is enabled */
HDLmWebpageOptimizer.saveButtonEnabled = false;
/* The following field stores the React state setter function */
HDLmWebpageOptimizer.stateSetFunction = null;
/* The following field stores a reference to tab 1 (the control tab) */
HDLmWebpageOptimizer.tab1 = null;
/* The following field stores a reference to tab 2 (the original webpage tab) */
HDLmWebpageOptimizer.tab2 = null;
/* The following field stores a reference to tab 3 (the optimized webpage tab) */
HDLmWebpageOptimizer.tab3 = null;
/* The following field stores a reference to tab 4 (the improvements tab) */
HDLmWebpageOptimizer.tab4 = null;
