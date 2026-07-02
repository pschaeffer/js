/**
 * HDLmAI short summary.
 *
 * HDLmAI description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The next string contains a dummy OpenAI API key used 
   to access OpenAI services */ 
const openAIApiKey = "dummyKey"; 
/* The chat templates are used in several places */
const OpenAIChatTemplates = {
                              "context": "You are an expert at improving web pages, " + 
                                         "especially their sales and user engagement.\n" +
                                         "\n" +
                                         "You will be asked to:\n" +
                                         "- Analyze a web page.\n" +
                                         "- Create JSON output.\n" +
                                         "- Suggest ways to improve it.\n" +
                                         "- Provide HTML snippets (to be placed in the `<head>` and `<body>` sections) that implement an improvement.\n",
                              "improvements": "Suggest {{quantity}} ways to improve this page. For each suggestion, provide:\n" +
                                              "- What specific change should be made.\n" +
                                              "- Why it will improve sales or engagement.\n" +
                                              "\n" +
                                              "Prioritize improvements that will have the most impact on user conversion and interaction.\n" +
                                              "\n" +
                                              "Look for ways to:\n" +
                                              "- Adjust color schemes, typography, and whitespace for better aesthetics and usability.\n" +
                                              "- Reword the text to better convey the site's value through storytelling.\n" +
                                              "- Reorder the content to guide user's attention.\n" +
                                              "- Add or remove content to improve clarity and reduce clutter.\n" +
                                              "\n" +
                                              "Each improvement suggestion:\n" +
                                              "- Should start with the word 'Improve'.\n",
                              "markup": "Change the markup on this page to {{improvement}}.\n" +
                                        "\n" +
                                        "The markup must:\n" +
                                        "- Never modify any existing markup, instead use new insertions to modify the page.\n" +
                                        "- Include insertions (if needed) to be placed in `<head>`section.\n" +
                                        "- Include insertions (if needed) to be placed in the `<body>` section.\n" +
                                        "- Include everything needed, including opening and closing tags for `<style>` and `<script>`.\n" +
                                        "- Be valid HTML, CSS, or JavaScript.\n" +
                                        "- Never include any comments.\n" +
                                        "- Integrate well with the page's current design and functionality.\n",
                              "webpageClient": "Focus on the page at {{url}} and just respond 'OK' after examining it:\n" +
                                               "```HTML\n" +
                                               "{{webpageClient}}\n" +
                                               "```\n",
                              "webpageServer": "Focus on the page at {{url}} and just respond 'OK' after examining it.\n",
                            };
/* The next string determines the quantity of improvements
   to request from Open AI */
const openAIImprovementsQuantity = "3";
/* The next string controls which Open AI module is used 
   by default. This is a dummy value that is replaced by
   a real value on the server. */ 
const openAIModel = "dummyModel";
/* Build the JSON response format. This response format was 
   used to get JSON output from an LLM. This response format
   is not used at this time. */
const openAIResponseFormatTypeJsonObject = { type: "json_object" };
/* Build the JSON schema for improvements structured output 
   response format */
const openAIResponseJsonSchemaImprovements = { type: "json_schema",
                                               json_schema: {
                                                 name: "improvementsSchema", 
                                                 description: "Schema for webpage improvements suggestions",
                                                 strict: true,
                                                 schema: {
                                                   type: "object",
                                                   properties: {
                                                     items: {
                                                       type: "array",
                                                       description: "A list of webpage improvement suggestions",
                                                       items: {
                                                         type: "object",
                                                         properties: {
                                                           what: { type: "string",
                                                             description: "What specific change should be made"
                                                           },
                                                           why: { type: "string",
                                                             description: "Why it will improve sales or engagement"
                                                           }
                                                         },                                                        
                                                         required: ["what", "why"],
                                                         additionalProperties: false,
                                                       }
                                                     }
                                                   },
                                                   required: ["items"],
                                                   additionalProperties: false,
                                                 }
                                               }
                                             };
/* Build the JSON schema for markup structured output 
   response format. One result is returned to the 
   caller. */                                           
const openAIResponseJsonSchemaMarkup = { type: "json_schema",
                                         json_schema: {
                                           name: "markupSchema", 
                                           description: "Schema for webpage markup",
                                           strict: true,
                                           schema: {
                                             type: "object",
                                             properties: {                                              
                                               styleInsertions: { type: "string",
                                                 description: "Style insertions"
                                               },
                                               scriptInsertions: { type: "string",
                                                 description: "Script insertions"
                                               }
                                             },                                                        
                                             required: ["styleInsertions", "scriptInsertions"],
                                             additionalProperties: false,
                                           }
                                         }
                                       };             
/* Build the JSON schema for markup structured output 
   response format. Results are returned as a list. This
   JSON schema does not appear to be in use. */
const openAIResponseJsonSchemaMarkupList = { type: "json_schema",
                                             json_schema: {
                                               name: "markupSchema", 
                                               description: "Schema for webpage markup",
                                               strict: true,
                                               schema: {
                                                 type: "object",
                                                 properties: {
                                                   items: {
                                                     type: "array",
                                                     description: "A list of webpage markup",
                                                     items: {
                                                       type: "object",
                                                       properties: {
                                                         styleInsertions: { type: "string",
                                                           description: "Style insertions"
                                                         },
                                                         scriptInsertions: { type: "string",
                                                           description: "Script insertions"
                                                         }
                                                       },                                                        
                                                       required: ["styleInsertions", "scriptInsertions"],
                                                       additionalProperties: false,
                                                     }
                                                   }
                                                 },
                                                 required: ["items"],
                                                 additionalProperties: false,
                                               }  
                                             }
                                           };   
/* The next string contains the OpenAI URL used to access
   OpenAI services locally */
const openAIUrl = "https://api.openai.com/v1";                                                                           
/* The next string contains a dummy Open Router API key used 
   to access Open Router services */ 
const openRouterApiKeyV1 = "dummyKey"; 
/* The chat tempplates are used in several places. This chat
   template appears to be used. */
const OpenRouterChatTemplatesV1 = {
                                    "context": "You are an expert at improving web pages, " + 
                                               "especially their sales and user engagement.\n" +
                                               "\n" +
                                               "You will be asked to:\n" +
                                               "- Analyze a web page.\n" +
                                               "- Create JSON output.\n" +
                                               "- Suggest ways to improve it.\n" +
                                               "- Provide HTML snippets (to be placed in the `<head>` and `<body>` sections) that implement an improvement.\n",
                                    "improvements": "Suggest {{quantity}} ways to improve this page. For each suggestion, provide:\n" +
                                                    "- What specific change should be made.\n" +
                                                    "- Why it will improve sales or engagement.\n" +
                                                    "\n" +
                                                    "Prioritize improvements that will have the most impact on user conversion and interaction.\n" +
                                                    "\n" +
                                                    "Look for ways to:\n" +
                                                    "- Adjust color schemes, typography, and whitespace for better aesthetics and usability.\n" +
                                                    "- Reword the text to better convey the site's value through storytelling.\n" +
                                                    "- Reorder the content to guide user's attention.\n" +
                                                    "- Add or remove content to improve clarity and reduce clutter.\n" +
                                                    "\n" +
                                                    "Each improvement suggestion:\n" +
                                                    "- Should start with the word 'Improve'.\n",
                                    "markup": "Change the markup on this page to {{improvement}}.\n" +
                                              "\n" +
                                              "The markup must:\n" +
                                              "- Never modify any existing markup, instead use new insertions to modify the page.\n" +
                                              "- Include insertions (if needed) to be placed in `<head>`section.\n" +
                                              "- Include insertions (if needed) to be placed in the `<body>` section.\n" +
                                              "- Include everything needed, including opening and closing tags for `<style>` and `<script>`.\n" +
                                              "- Be valid HTML, CSS, or JavaScript.\n" +
                                              "- Never include any comments.\n" +
                                              "- Integrate well with the page's current design and functionality.\n",
                                    "webpageClient": "Focus on the page at {{url}} and just respond 'OK' after examining it:\n" +
                                                     "```HTML\n" +
                                                     "{{webpageClient}}\n" +
                                                     "```\n",
                                    "webpageServer": "Focus on the page at {{url}} and just respond 'OK' after examining it.\n",
                                  };
/* The next string determines the quantity of improvements
   to request from Open Router */
const openRouterImprovementsQuantityV1 = "3";
/* The next string controls which Open Router model is used 
   by default. This is a dummy value that is replaced by
   a real value on the server. */ 
const openRouterModelV1 = "dummyModel";
/* Build the JSON response format. This response format was 
   used to get JSON output from an LLM. This response format
   is not used at this time. */
const openRouterResponseFormatTypeJsonObjectV1 = { type: "json_object" };
const openRouterResponseJsonSchemaImprovementsV1 = { type: "json_schema",
                                                     json_schema: {
                                                       name: "improvementsSchema", 
                                                       description: "Schema for webpage improvements suggestions",
                                                       strict: true,
                                                       schema: {
                                                         type: "object",
                                                         properties: {
                                                           items: {
                                                             type: "array",
                                                             description: "A list of webpage improvement suggestions",
                                                             items: {
                                                               type: "object",
                                                               properties: {
                                                                 what: { type: "string",
                                                                   description: "What specific change should be made"
                                                                 },
                                                                 why: { type: "string",
                                                                   description: "Why it will improve sales or engagement"
                                                                 }
                                                               },                                                        
                                                               required: ["what", "why"],
                                                               additionalProperties: false,
                                                             }
                                                           }
                                                         },
                                                         required: ["items"],
                                                         additionalProperties: false,
                                                       }
                                                     }
                                                   };
/* Build the JSON schema for markup structured output 
   response format. One result is returned to the 
   caller. */                                           
const openRouterResponseJsonSchemaMarkupV1 = { type: "json_schema",
                                               json_schema: {
                                                 name: "markupSchema", 
                                                 description: "Schema for webpage markup",
                                                 strict: true,
                                                 schema: {
                                                   type: "object",
                                                   properties: {                                              
                                                     styleInsertions: { type: "string",
                                                       description: "Style insertions"
                                                     },
                                                     scriptInsertions: { type: "string",
                                                       description: "Script insertions"
                                                     }
                                                   },                                                        
                                                   required: ["styleInsertions", "scriptInsertions"],
                                                  additionalProperties: false,
                                                 }
                                               }
                                             };             
/* Build the JSON schema for markup structured output 
   response format. Results are returned as a list. This
   JSON schema does not appear to be in use. */
const openRouterResponseJsonSchemaMarkupListV1 = { type: "json_schema",
                                                   json_schema: {
                                                     name: "markupSchema", 
                                                     description: "Schema for webpage markup",
                                                     strict: true,
                                                     schema: {
                                                       type: "object",
                                                       properties: {
                                                         items: {
                                                           type: "array",
                                                           description: "A list of webpage markup",
                                                           items: {
                                                             type: "object",
                                                             properties: {
                                                               styleInsertions: { type: "string",
                                                                 description: "Style insertions"
                                                               },
                                                               scriptInsertions: { type: "string",
                                                                 description: "Script insertions"
                                                               }
                                                             },                                                        
                                                             required: ["styleInsertions", "scriptInsertions"],
                                                             additionalProperties: false,
                                                           }
                                                         }
                                                       },
                                                       required: ["items"],
                                                       additionalProperties: false,
                                                     }  
                                                   }
                                                 };    
/* The next string contains the Open Router URL used to access
   Open Router services locally */
const openRouterUrlV1 = "https://openrouter.ai/api/v1";
/* The next string contains a dummy Open Router API key used 
   to access Open Router services */ 
const openRouterApiKeyV2 = "dummyKey";
/* The chat tempplates are used in several places. This chat
   template appears to be used. */
const OpenRouterChatTemplatesV2 = {
                                    "context": "You are an expert at improving web pages, " + 
                                               "especially their sales and user engagement.\n" +
                                               "\n" +
                                               "You will be asked to:\n" +
                                               "- Analyze a web page.\n" +
                                               "- Create JSON output.\n" +
                                               "- Suggest ways to improve it.\n" +
                                               "- Provide HTML snippets (to be placed in the `<head>` and `<body>` sections) that implement an improvement.\n",
                                    "improvements": "Suggest {{quantity}} ways to improve this page. For each suggestion, provide:\n" +
                                                    "- What specific change should be made.\n" +
                                                    "- Why it will improve sales or engagement.\n" +
                                                    "- Markup needed to implement the improvement.\n" +
                                                    "\n" +
                                                    "Prioritize improvements that will have the most impact on user conversion and interaction.\n" +
                                                    "\n" +
                                                    "Look for ways to:\n" +
                                                    "- Adjust color schemes, typography, and whitespace for better aesthetics and usability.\n" +
                                                    "- Reword the text to better convey the site's value through storytelling.\n" +
                                                    "- Reorder the content to guide user's attention.\n" +
                                                    "- Add or remove content to improve clarity and reduce clutter.\n" +
                                                    "\n" +
                                                    "Each improvement suggestion:\n" +
                                                    "- Should start with the word 'Improve'.\n" +
                                                    "The markup must:\n" +
                                                    "- Never modify any existing markup, instead use new insertions to modify the page.\n" +
                                                    "- Include insertions (if needed) to be placed in `<head>`section.\n" +
                                                    "- Include insertions (if needed) to be placed in the `<body>` section.\n" +
                                                    "- Include everything needed, including opening and closing tags for `<style>` and `<script>`.\n" +
                                                    "- Be valid HTML, CSS, or JavaScript.\n" +
                                                    "- Never include any comments.\n" +
                                                    "- Integrate well with the page's current design and functionality.\n",
                                    "markup": "Change the markup on this page to {{improvement}}.\n" +
                                              "\n" +
                                              "The markup must:\n" +
                                              "- Never modify any existing markup, instead use new insertions to modify the page.\n" +
                                              "- Include insertions (if needed) to be placed in `<head>`section.\n" +
                                              "- Include insertions (if needed) to be placed in the `<body>` section.\n" +
                                              "- Include everything needed, including opening and closing tags for `<style>` and `<script>`.\n" +
                                              "- Be valid HTML, CSS, or JavaScript.\n" +
                                              "- Never include any comments.\n" +
                                              "- Integrate well with the page's current design and functionality.\n",
                                    "webpageClient": "Focus on the page at {{url}} and just respond 'OK' after examining it:\n" +
                                                     "```HTML\n" +
                                                     "{{webpageClient}}\n" +
                                                     "```\n",
                                    "webpageServer": "Focus on the page at {{url}} and just respond 'OK' after examining it.\n",
                                  };
const OpenRouterChatTemplatesOriginalV2 = {
                                    "context": "You are an expert at improving web pages, " + 
                                               "especially their sales and user engagement.\n" +
                                               "\n" +
                                               "You will be asked to:\n" +
                                               "- Analyze a web page.\n" +
                                               "- Create JSON output.\n" +
                                               "- Suggest ways to improve it.\n" +
                                               "- Provide HTML snippets (to be placed in the `<head>` and `<body>` sections) that implement an improvement.\n",
                                    "improvements": "Suggest {{quantity}} ways to improve this page. For each suggestion, provide:\n" +
                                                    "- What specific change should be made.\n" +
                                                    "- Why it will improve sales or engagement.\n" +
                                                    "\n" +
                                                    "Prioritize improvements that will have the most impact on user conversion and interaction.\n" +
                                                    "\n" +
                                                    "Look for ways to:\n" +
                                                    "- Adjust color schemes, typography, and whitespace for better aesthetics and usability.\n" +
                                                    "- Reword the text to better convey the site's value through storytelling.\n" +
                                                    "- Reorder the content to guide user's attention.\n" +
                                                    "- Add or remove content to improve clarity and reduce clutter.\n" +
                                                    "\n" +
                                                    "Each improvement suggestion:\n" +
                                                    "- Should start with the word 'Improve'.\n",
                                    "markup": "Change the markup on this page to {{improvement}}.\n" +
                                              "\n" +
                                              "The markup must:\n" +
                                              "- Never modify any existing markup, instead use new insertions to modify the page.\n" +
                                              "- Include insertions (if needed) to be placed in `<head>`section.\n" +
                                              "- Include insertions (if needed) to be placed in the `<body>` section.\n" +
                                              "- Include everything needed, including opening and closing tags for `<style>` and `<script>`.\n" +
                                              "- Be valid HTML, CSS, or JavaScript.\n" +
                                              "- Never include any comments.\n" +
                                              "- Integrate well with the page's current design and functionality.\n",
                                    "webpageClient": "Focus on the page at {{url}} and just respond 'OK' after examining it:\n" +
                                                     "```HTML\n" +
                                                     "{{webpageClient}}\n" +
                                                     "```\n",
                                    "webpageServer": "Focus on the page at {{url}} and just respond 'OK' after examining it.\n",
                                  };
/* The next string determines the quantity of improvements
   to request from Open Router */
const openRouterImprovementsQuantityV2 = "3";
/* The next string controls which Open Router module is used 
   by default. This is a dummy value that is replaced by
   a real value on the server. */ 
const openRouterModelV2 = "dummyModel";
/* Build the JSON response format. This response format was 
   used to get JSON output from an LLM. This response format
   is not used at this time. */
const openRouterResponseFormatTypeJsonObjectV2 = { type: "json_object" };
const openRouterResponseJsonSchemaImprovementsV2 = { type: "json_schema",
                                                     json_schema: {
                                                       name: "improvementsSchema", 
                                                       description: "Schema for webpage improvements suggestions",
                                                       strict: true,
                                                       schema: {
                                                         type: "object",
                                                         properties: {
                                                           items: {
                                                             type: "array",
                                                             description: "A list of webpage improvement suggestions",
                                                             items: {
                                                               type: "object",
                                                               properties: {
                                                                 what: { type: "string",
                                                                   description: "What specific change should be made"
                                                                 },
                                                                 why: { type: "string",
                                                                   description: "Why it will improve sales or engagement"
                                                                 },
                                                                 markup: {
                                                                   type: "object",
                                                                   properties: {
                                                                     styleInsertions: { type: "string",
                                                                       description: "Style insertions"
                                                                     },
                                                                     scriptInsertions: { type: "string",
                                                                       description: "Script insertions"
                                                                     }
                                                                   },
                                                                   required: ["styleInsertions", "scriptInsertions"],
                                                                   additionalProperties: false,
                                                                 }                                                                 
                                                               },                                                        
                                                               required: ["what", "why", "markup"],
                                                               additionalProperties: false,
                                                             }
                                                           }
                                                         },
                                                         required: ["items"],
                                                         additionalProperties: false,
                                                       }
                                                     }
                                                   };
const openRouterResponseJsonSchemaImprovementsOriginalV2 = { type: "json_schema",
                                                             json_schema: {
                                                               name: "improvementsSchema", 
                                                               description: "Schema for webpage improvements suggestions",
                                                               strict: true,
                                                               schema: {
                                                                 type: "object",
                                                                 properties: {
                                                                   items: {
                                                                     type: "array",
                                                                     description: "A list of webpage improvement suggestions",
                                                                     items: {
                                                                       type: "object",
                                                                       properties: {
                                                                         what: { type: "string",
                                                                           description: "What specific change should be made"
                                                                         },
                                                                         why: { type: "string",
                                                                           description: "Why it will improve sales or engagement"
                                                                         },
                                                                       },                                                        
                                                                       required: ["what", "why"],
                                                                       additionalProperties: false,
                                                                     }
                                                                   }
                                                                 },
                                                                 required: ["items"],
                                                                 additionalProperties: false,
                                                               }
                                                             }
                                                           };
/* The next string contains the Open Router URL used to access
   Open Router services locally */
const openRouterUrlV2 = "https://openrouter.ai/api/v1";
/* The next string contains a dummy Open Router API key used 
   to access Open Router services */ 
const openRouterApiKeyV3 = "dummyKey";
/* The chat tempplates are used in several places. This chat
   template appears to be used. */
const OpenRouterChatTemplatesV3 = {
                                    "context": "You are an expert at improving web pages, " + 
                                               "especially their sales and user engagement.\n" +
                                               "\n" +
                                               "You will be asked to:\n" +
                                               "- Analyze a web page.\n" +
                                               "- Create JSON output.\n" +
                                               "- Suggest ways to improve it.\n" +
                                               "- Provide HTML snippets (to be placed in the `<head>` and `<body>` sections) that implement an improvement.\n",
                                    "improvements": "Suggest {{quantity}} ways to improve this page. For each suggestion, provide:\n" +
                                                    "- What specific change should be made.\n" +
                                                    "- Why it will improve sales or engagement.\n" +
                                                    "- Markup needed to implement the improvement.\n" +
                                                    "\n" +
                                                    "Prioritize improvements that will have the most impact on user conversion and interaction.\n" +
                                                    "\n" +
                                                    "Look for ways to:\n" +
                                                    "- Adjust color schemes, typography, and whitespace for better aesthetics and usability.\n" +
                                                    "- Reword the text to better convey the site's value through storytelling.\n" +
                                                    "- Reorder the content to guide user's attention.\n" +
                                                    "- Add or remove content to improve clarity and reduce clutter.\n" +
                                                    "\n" +
                                                    "Each improvement suggestion:\n" +
                                                    "- Should start with the word 'Improve'.\n" +
                                                    "The markup must:\n" +
                                                    "- Never modify any existing markup, instead use new insertions to modify the page.\n" +
                                                    "- Include insertions (if needed) to be placed in `<head>`section.\n" +
                                                    "- Include insertions (if needed) to be placed in the `<body>` section.\n" +
                                                    "- Include everything needed, including opening and closing tags for `<style>` and `<script>`.\n" +
                                                    "- Be valid HTML, CSS, or JavaScript.\n" +
                                                    "- Never include any comments.\n" +
                                                    "- Integrate well with the page's current design and functionality.\n",
                                    "markup": "Change the markup on this page to {{improvement}}.\n" +
                                              "\n" +
                                              "The markup must:\n" +
                                              "- Never modify any existing markup, instead use new insertions to modify the page.\n" +
                                              "- Include insertions (if needed) to be placed in `<head>`section.\n" +
                                              "- Include insertions (if needed) to be placed in the `<body>` section.\n" +
                                              "- Include everything needed, including opening and closing tags for `<style>` and `<script>`.\n" +
                                              "- Be valid HTML, CSS, or JavaScript.\n" +
                                              "- Never include any comments.\n" +
                                              "- Integrate well with the page's current design and functionality.\n",
                                    "webpageClient": "Focus on the page at {{url}} and just respond 'OK' after examining it:\n" +
                                                     "```HTML\n" +
                                                     "{{webpageClient}}\n" +
                                                     "```\n",
                                    "webpageServer": "Focus on the page at {{url}} and just respond 'OK' after examining it.\n",
                                  };
/* The next string determines the quantity of improvements
   to request from Open Router */
const openRouterImprovementsQuantityV3 = "3";
/* The next string controls which Open Router module is used 
   by default. This is a dummy value that is replaced by
   a real value on the server. */ 
const openRouterModelV3 = "dummyModel";
/* Build the JSON response format. This response format was 
   used to get JSON output from an LLM. This response format
   is not used at this time. */
const openRouterResponseFormatTypeJsonObjectV3 = { type: "json_object" };
const openRouterResponseJsonSchemaImprovementsV3 = { type: "json_schema",
                                                     json_schema: {
                                                       name: "improvementsSchema", 
                                                       description: "Schema for webpage improvements suggestions",
                                                       strict: true,
                                                       schema: {
                                                         type: "object",
                                                         properties: {
                                                           items: {
                                                             type: "array",
                                                             description: "A list of webpage improvement suggestions",
                                                             items: {
                                                               type: "object",
                                                               properties: {
                                                                 what: { type: "string",
                                                                   description: "What specific change should be made"
                                                                 },
                                                                 why: { type: "string",
                                                                   description: "Why it will improve sales or engagement"
                                                                 },
                                                                 markup: {
                                                                   type: "object",
                                                                   properties: {
                                                                     styleInsertions: { type: "string",
                                                                       description: "Style insertions"
                                                                     },
                                                                     scriptInsertions: { type: "string",
                                                                       description: "Script insertions"
                                                                     }
                                                                   },
                                                                   required: ["styleInsertions", "scriptInsertions"],
                                                                   additionalProperties: false,
                                                                 }                                                                 
                                                               },                                                        
                                                               required: ["what", "why", "markup"],
                                                               additionalProperties: false,
                                                             }
                                                           }
                                                         },
                                                         required: ["items"],
                                                         additionalProperties: false,
                                                       }
                                                     }
                                                   };       
/* The next string contains the Open Router URL used to access
   Open Router services locally */
const openRouterUrlV3 = "https://openrouter.ai/api/v1";
/* The next string contains a dummy Open Router API key used 
   to access Open Router services */ 
const openRouterApiKeyV4 = "dummyKey"; 
/* The chat tempplates are used in several places. This chat
   template appears to be used. */
const OpenRouterChatTemplatesV4 = {
                                    "context": "You are an expert at improving web pages, " + 
                                               "especially their sales and user engagement.\n" +
                                               "\n" +
                                               "You will be asked to:\n" +
                                               "- Analyze a web page.\n" +
                                               "- Create JSON output.\n" +
                                               "- Suggest ways to improve it.\n" +
                                               "- Provide HTML snippets (to be placed in the `<head>` and `<body>` sections) that implement an improvement.\n",
                                    "improvements": "Suggest {{quantity}} ways to improve this page. For each suggestion, provide:\n" +
                                                    "- What specific change should be made.\n" +
                                                    "- Why it will improve sales or engagement.\n" +
                                                    "\n" +
                                                    "Prioritize improvements that will have the most impact on user conversion and interaction.\n" +
                                                    "\n" +
                                                    "Look for ways to:\n" +
                                                    "- Adjust color schemes, typography, and whitespace for better aesthetics and usability.\n" +
                                                    "- Reword the text to better convey the site's value through storytelling.\n" +
                                                    "- Reorder the content to guide user's attention.\n" +
                                                    "- Add or remove content to improve clarity and reduce clutter.\n" +
                                                    "\n" +
                                                    "Each improvement suggestion:\n" +
                                                    "- Should start with the word 'Improve'.\n",
                                    "markup": "Change the markup on this page to {{improvement}}.\n" +
                                              "\n" +
                                              "The markup must:\n" +
                                              "- Never modify any existing markup, instead use new insertions to modify the page.\n" +
                                              "- Include insertions (if needed) to be placed in `<head>`section.\n" +
                                              "- Include insertions (if needed) to be placed in the `<body>` section.\n" +
                                              "- Include everything needed, including opening and closing tags for `<style>` and `<script>`.\n" +
                                              "- Be valid HTML, CSS, or JavaScript.\n" +
                                              "- Never include any comments.\n" +
                                              "- Integrate well with the page's current design and functionality.\n",
                                    "webpageClient": "Focus on the page at {{url}} and just respond 'OK' after examining it:\n" +
                                                     "```HTML\n" +
                                                     "{{webpageClient}}\n" +
                                                     "```\n",
                                    "webpageServer": "Focus on the page at {{url}} and just respond 'OK' after examining it.\n",
                                  };
/* The next string determines the quantity of improvements
   to request from Open Router */
const openRouterImprovementsQuantityV4 = "3";
/* The next string controls which Open Router model is used 
   by default. This is a dummy value that is replaced by
   a real value on the server. */ 
const openRouterModelV4 = "dummyModel";
/* Build the JSON response format. This response format was 
   used to get JSON output from an LLM. This response format
   is not used at this time. */
const openRouterResponseFormatTypeJsonObjectV4 = { type: "json_object" };
const openRouterResponseJsonSchemaImprovementsV4 = { type: "json_schema",
                                                     json_schema: {
                                                       name: "improvementsSchema", 
                                                       description: "Schema for webpage improvements suggestions",
                                                       strict: true,
                                                       schema: {
                                                         type: "object",
                                                         properties: {
                                                           items: {
                                                             type: "array",
                                                             description: "A list of webpage improvement suggestions",
                                                             items: {
                                                               type: "object",
                                                               properties: {
                                                                 what: { type: "string",
                                                                   description: "What specific change should be made"
                                                                 },
                                                                 why: { type: "string",
                                                                   description: "Why it will improve sales or engagement"
                                                                 }
                                                               },                                                        
                                                               required: ["what", "why"],
                                                               additionalProperties: false,
                                                             }
                                                           }
                                                         },
                                                         required: ["items"],
                                                         additionalProperties: false,
                                                       }
                                                     }
                                                   };
/* Build the JSON schema for markup structured output 
   response format. One result is returned to the 
   caller. */                                           
const openRouterResponseJsonSchemaMarkupV4 = { type: "json_schema",
                                               json_schema: {
                                                 name: "markupSchema", 
                                                 description: "Schema for webpage markup",
                                                 strict: true,
                                                 schema: {
                                                   type: "object",
                                                   properties: {                                              
                                                     styleInsertions: { type: "string",
                                                       description: "Style insertions"
                                                     },
                                                     scriptInsertions: { type: "string",
                                                       description: "Script insertions"
                                                     }
                                                   },                                                        
                                                   required: ["styleInsertions", "scriptInsertions"],
                                                  additionalProperties: false,
                                                 }
                                               }
                                             };             
/* Build the JSON schema for markup structured output 
   response format. Results are returned as a list. This
   JSON schema does not appear to be in use. */
const openRouterResponseJsonSchemaMarkupListV4 = { type: "json_schema",
                                                   json_schema: {
                                                     name: "markupSchema", 
                                                     description: "Schema for webpage markup",
                                                     strict: true,
                                                     schema: {
                                                       type: "object",
                                                       properties: {
                                                         items: {
                                                           type: "array",
                                                           description: "A list of webpage markup",
                                                           items: {
                                                             type: "object",
                                                             properties: {
                                                               styleInsertions: { type: "string",
                                                                 description: "Style insertions"
                                                               },
                                                               scriptInsertions: { type: "string",
                                                                 description: "Script insertions"
                                                               }
                                                             },                                                        
                                                             required: ["styleInsertions", "scriptInsertions"],
                                                             additionalProperties: false,
                                                           }
                                                         }
                                                       },
                                                       required: ["items"],
                                                       additionalProperties: false,
                                                     }  
                                                   }
                                                 };    
/* The next string contains the Open Router URL used to access
   Open Router services locally */
const openRouterUrlV4 = "https://openrouter.ai/api/v1";                                    
/* The HDLmAI class is not used to create any objects.
   However, it does contain code for using AI. */ 
class HDLmAI {  
  /* This routine does an asynchronous fetch call to get
     something. The caller passes in the URL to get and 
     the options to use in the fetch call. The response
     text is returned to the caller. If there is an error,
     null is returned to the caller. Because this routine
     uses await, it only be used in an async function. */
  static async fetchUrl(urlStr, methodStr, headersObj, bodyObj) {
    /* Declare and define a few local variables */
    let responseText = null;
    let sendPromise;
    /* Get the start time for the fetch call */
    let startTime = Date.now();
    /* Send the URL to the server */
    try {
      /* Check if an actual body object was passed by 
         the caller */
      if (bodyObj != null) {
        sendPromise = fetch(urlStr, {
                                      "method": methodStr,
                                      "headers": headersObj,
                                      "body": bodyObj
                                    }
                           );
      }
      /* No body object was passed by the caller */
      else {
        sendPromise = fetch(urlStr, {
                                      "method": methodStr,
                                      "headers": headersObj
                                    }
                           );
      }
      let responseObj = await sendPromise;
      /* Get the end time for the fetch call */
      let endTime = Date.now();
      let fetchDuration = endTime - startTime;
      console.log(`HDLmAI.fetchUrl: Fetch to ${urlStr} took ${fetchDuration} ms`);
      /* console.log(responseObj); */
      /* Check if the status code from the call, shows
         that the call succeeded */
      let responseStatus = responseObj.status;
      /* Check if the webpage was even minimally valid.
         If the webpage was not even minimally valid,
         we cannot proceed any further. */
      if (responseStatus != 200) {
        let errorText = `The webpage ${urlStr} was not even minimally valid`;
        console.log('Error in HDLmAI.fetchUrl: ' + errorText);
        responseText = null;
      }
      /* The reponse body will have additional information */
      else {
        let responseBody = responseObj.body;
        let responseReader = responseBody.getReader();
        let responseRead = await responseReader.read();
        responseText = new TextDecoder("utf-8").decode(responseRead.value);
      }
    }
    catch (error) {
      console.log('Error in HDLmAI.fetchUrl: ' + error.message);
      responseText = null;
    }
    /* Return the response text to the caller */
    return responseText;
  }; 
  /* This routine gets a template structure and template 
     string (section) and returns the template string to
     the caller */  
  static getTemplateString(templateStructure, templateSection) {
    /* Check if the template section is valid */
    if ((templateSection in templateStructure) == false) {
      let errorText = `Template section ${templateSection} not found in ${templateStructure}`;
      HDLmAssert(false, errorText);
    }
    /* Return the template string to the caller */
    return templateStructure[templateSection];
  };   
  /* This routine gets a webpage from the Internet. The
     URL of the webpage is passed in. The content of the
     webpage is returned to the caller. If there is an error,
     null is returned to the caller. The URL passed by the 
     caller should already have a https prefix. Because this
     routine uses await, it only be used in an async function. */ 
  static async getWebpage(webUrl) {
    /* Declare and define a few local variables */
    let responseText = null;
    /* Just return to the caller if the target webpage has 
       already been fetched */
    if (HDLmAI.targetWebpageContents != null)
      return HDLmAI.targetWebpageContents;
    /* Try to fetch the webpage from the Internet */
    /* console.log(responseText); */
    responseText = await HDLmAI.fetchUrl(webUrl, 'GET', {}, null);
    /* console.log(responseText); */
    /* Store the webpage contents in a global variable */
    HDLmAI.targetWebpageContents = responseText;
    /* Return the response text to the caller */
    return responseText;  
  };
  /* This routine modifies the webpage contents to make it
     possible for AI to process them */  
  static modifyWebpage(webpageContents) { 
    /* Declare and define a few local variables */
    let doubleQuoteCount = 0;
    let i;
    let insideDoubleQuotesCount = 0;
    /* HDLmUtility.logStringInParts('Org:', webpageContents.substr(20000, 10000), 20); */
    /* let modifiedWebpageIndexOf = webpageContents.indexOf("style=\"tabindex=\"-1\""); */
    /* let modifiedWebpageContents = webpageContents.replace("style=\"tabindex=\"-1\"", "style=\"tabindex=\"-1\"\""); */
    let modifiedWebpageContents = webpageContents; 
    /* HDLmUtility.logStringInParts('Mwc:', modifiedWebpageContents.substr(0, 30000), 20); */
    let modifiedWebpageArray = modifiedWebpageContents.split('');
    let modifiedWebpageLength = modifiedWebpageContents.length;
    /* Loop through the webpage contents */
    for (i = 0; i < modifiedWebpageLength; i++) {
      /* Check if the current character is a double quote */
      if (modifiedWebpageContents[i] == '"') {
        doubleQuoteCount++;
        /* console.log(`Double quote at index ${i}, count ${doubleQuoteCount}`); */
      }
      /* Check if we are in double quoted string */
      else 
        if ((doubleQuoteCount % 2) == 1) {
          let modifiedWebpageChar = modifiedWebpageContents[i];
          let modifiedWebpageHex = HDLmString.charToHex(modifiedWebpageChar);
          if (doubleQuoteCount == 25 && 
              (modifiedWebpageHex == 'a0' )) {
            modifiedWebpageArray[i] = "X";
            console.log(`Letter at index ${i}, changed`);
          }
          insideDoubleQuotesCount++;
        }
    }     
    let modifiedWebpage = modifiedWebpageArray.join('');
    /* HDLmUtility.logStringInParts('Mwc:', modifiedWebpage.substr(625, 50), 20); */
    /* HDLmUtility.logStringInParts('Mwc:', HDLmString.stringToHex(modifiedWebpage.substr(625, 50)), 20); */
    /* HDLmUtility.logStringInParts('Mwc:', modifiedWebpageContents, 20); */
    /* HDLmUtility.logStringInParts('Mw:', modifiedWebpage, 20); */
    return modifiedWebpage;
  }
  /* This routine builds the Open AI authentication header.
     The authorization header is used to authenticate with 
     Open AI. The header is used in fetch calls to Open AI services.
     The header is stored in a global variable for later use and
     returned to the caller. */
  static openAIBuildAuthHeaderObj(apiKeyStr) {
    /* Just return to the caller if the authentication header
       has already been built */
    if (HDLmAI.openAIAuthHeader != null)
      return HDLmAI.openAIAuthHeader;
    /* Build the authorization header */
    let authHeaderObj = HDLmHtml.buildAuthorizationHeaderObj(apiKeyStr);
    /* Store the authorization header in a global variable */
    HDLmAI.openAIAuthHeader = authHeaderObj;
    /* Return the authorization header to the caller */
    return authHeaderObj;
  };
  /* This routine builds an Open AI body object. The body
     object is used to provide information to Open AI. The 
     body object is used in fetch calls to Open AI services.
     The body object is returned to the caller. */
  static openAIBuildBody(openAIModelStr, 
                         messageList,
                         responseFormat) {
    /* Build the Open AI body object */
    let bodyObj = {};
    /* Add the model infomation to the body object,
       if need be */
    if (openAIModelStr != null) 
      bodyObj['model'] = openAIModelStr;
    /* Add the messages to the body object, if 
       need be */
    if (messageList != null)
      bodyObj['messages'] = messageList;
    /* Add the response format to the body object, if 
       need be */
    if (responseFormat != null)
      bodyObj['response_format'] = responseFormat; 
    /* Return the body object to the caller */
    return bodyObj;
  };
  /* This routine builds the Open AI headers. The headers
     are used to provide information to Open AI. The headers
     are used in fetch calls to Open AI services. The headers
     are stored in a global variable for later use and returned
     to the caller. */
  static openAIBuildHeadersObj(openAIApiKey) {
    /* Just return to the caller if the headers have 
       already been built */
    if (HDLmAI.openAIHeaders != null)
      return HDLmAI.openAIHeaders;
    /* Build the Open AI headers object*/
    let headers = {};
    /* Build and add the authorization header object */
    let authHeaderObj = HDLmAI.openAIBuildAuthHeaderObj(openAIApiKey);
    headers = Object.assign(headers, authHeaderObj);
    /* Build and add the type header object */
    let typeHeaderObj = HDLmAI.openAIBuildTypeHeaderObj();
    headers = Object.assign(headers, typeHeaderObj);
    /* Store the headers in a global variable */
    HDLmAI.openAIHeaders = headers;
    /* Return the headers to the caller */
    return headers;
  };
  /* This routine builds an Open AI message object. The message
     object is used to provide information to Open AI. The 
     message object is used in fetch calls to Open AI services.
     The message object is returned to the caller. */
  static openAIBuildMessage(roleStr, messageStr) {
    /* Build the Open AI message object */
    let messageObj = {};
    /* Add the role to the message object */
    messageObj['role'] = roleStr;
    /* Add the messages to the body object */
    messageObj['content'] = messageStr;
    /* Return the message object to the caller */
    return messageObj;
  };
  /* This routine builds an Open AI message list.
     The message list is used to provide information
     to Open AI. The message list is used in fetch 
     calls to Open AI services. The message list is
     returned to the caller. */
  static openAIBuildMessageList(...messageListArray) {
    /* Build the Open AI message list */
    let messageList = [];
    /* Handle each of the messages passed in */
    messageList = messageListArray;
    /* Return the message list to the caller */
    return messageList;
  };
  /* This routine builds the Open AI type header. The type 
     header is used to provide type information to Open AI.
     The header is used in fetch calls to Open AI services.
     The header is stored in a global variable for later use
     and returned to the caller. */
  static openAIBuildTypeHeaderObj() {
    /* Just return to the caller if the type header has 
       already been built */
    if (HDLmAI.openAITypeHeader != null)
      return HDLmAI.openAITypeHeader;
    /* Build the type header object */
    let typeHeaderObj = HDLmHtml.buildContentTypeHeaderObj('application/json');
    /* Store the type header in a global variable */
    HDLmAI.openAITypeHeader = typeHeaderObj;
    /* Return the type header to the caller */
    return typeHeaderObj;
  };
  /* This routine gets improvements from Open AI. The
     suggestion text and the webpage URL are passed in.
     The improvements list is returned to the caller. 
     Because this routine uses await, it only be used in
     an async function. */
  static async openAIGetImprovementsNew(suggestionText, webpageUrl, versionAI) {
    /* Declare and define a few local variables */
    let improvementsList = [];
    /* let targetWebpageContents = await HDLmAI.getWebpage(webpageUrl); */
    /* console.log('Webpage content fetched from ' + webpageUrl); */
    /* console.log(targetWebpageContents); */
    /* Build the various prompts */
    let contextBothPrompt = HDLmAI.promptContextBothStr(OpenAIChatTemplates,
                                                        'context');
    /* let webpageClientPrompt = HDLmAI.promptWebpageClientStr(OpenAIChatTemplates,
                                                               'webpageClient', 
                                                               webpageUrl, 
                                                               targetWebpageContents); */
    let improvementsBothPrompt = HDLmAI.replaceTemplateStrings(OpenAIChatTemplates, 
                                                               'improvements', 
                                                               openAIImprovementsQuantity);
    /* Build the Open AI improvements messages */
    let contextBothMessage = HDLmAI.openAIBuildMessage('system', contextBothPrompt);    
    /* let webpageClientMessage = HDLmAI.openAIBuildMessage('user', webpageClientPrompt); */
    let improvementsBothMessage = HDLmAI.openAIBuildMessage('user', improvementsBothPrompt);
    /* Build the Open AI improvements message list */
    /* let messageClientList = HDLmAI.openAIBuildMessageList(contextBothMessage, 
                                                             webpageClientMessage, 
                                                             improvementsBothMessage); */
    /* Build the Open AI body object */ 
    let responseFormat;
    /* Get the JSON schema improvements response format */
    responseFormat = openAIResponseJsonSchemaImprovements;
    /* let bodyClientObj = HDLmAI.openAIBuildBody(openAIModel, messageClientList, responseFormat); */
    /* Build the Open AI headers */
    /* let headersObj = HDLmAI.openAIBuildHeadersObj(openAIApiKey); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows AI key to be stored securely on the 
       server and not be exposed to the client. */
    let improvementsResponse;
    /* Try to get the improvements from Open AI on the client */
    /*
    let bodyClientJsonStr = JSON.stringify(bodyClientObj);
    improvementsResponse = await HDLmAI.fetchUrl(openAIUrl + '/chat/completions',
                                                 'POST',
                                                 headersObj,
                                                 bodyClientJsonStr);   
    */
    /* Try to get the improvements from Open AI on the server */
    /* let webpageServerContents = HDLmAI.modifyWebpage(targetWebpageContents); */
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(OpenAIChatTemplates,
                                                            'webpageServer', 
                                                            webpageUrl);   
    let webpageServerMessage = HDLmAI.openAIBuildMessage('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openAIBuildMessageList(contextBothMessage,   
                                                          webpageServerMessage,                                                    
                                                          improvementsBothMessage);  
    let bodyServerObj = HDLmAI.openAIBuildBody(openAIModel, messageServerList, responseFormat);
    if (1 == 1)
      improvementsResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyServerObj, versionAI);      
    /* Return the improvements response to the caller */
    let improvementsObj; 
    try {
      /* Parse the improvements response */
      improvementsObj = JSON.parse(improvementsResponse);    
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Improvement:', improvementsResponse, 20);
      console.log('Error parsing Open AI improvements response: ' + error);
      let errorText = 'Error parsing Open AI improvements response: ' + error;
      HDLmAssert(false, errorText);
    }
    /* Get the choices list from the improvements response */
    let improvementsChoicesList = improvementsObj['choices'];
    if (improvementsChoicesList == null) {
      console.log('Error: No choices found in Open AI improvements response');
      let errorText = 'No choices found in Open AI improvements response';
      HDLmAssert(false, errorText);
    }  
    /* get the first choice from the choices list */
    let improvementsFirstChoice = improvementsChoicesList[0];
    /* Get the message object from the first choice */
    let improvementsMessageObj = improvementsFirstChoice['message'];
    if (improvementsMessageObj == null) {
      console.log('Error: Message object not built in Open AI improvements response');
      let errorText = 'Message object not built in Open AI improvements response';
      HDLmAssert(false, errorText);
    }  
    /* Check for refusals in the message object */
    if (improvementsMessageObj['refusal'] != null) {
      console.log('Error: Message object has refusal set in Open AI improvements response');
      let errorText = 'Message object has refusal set in Open AI improvements response';
      HDLmAssert(false, errorText);
    } 
    /* Get the content from the message object */
    let improvementsMessageContent = improvementsMessageObj['content'];
    let improvementsContentObj = JSON.parse(improvementsMessageContent);
    /* Some of the the messages may represent an improvement */ 
    for (let improvement of improvementsContentObj['items']) {
      improvementsList.push(improvement);
    }
    return improvementsList;    
  };
  /* This routine gets markup from Open AI. The
     improvement text and the webpage URL are passed 
     in. The markup is returned to the caller. Because
     this routine uses await, it can only be used in
     an async function. */
  static async openAIGetMarkup(improvementText, webpageUrl, versionAI) {
    /* Declare and define a few local variables */
    /* Build the various prompts */
    let contextBothPrompt = HDLmAI.contextBothPrompt;
    /* let webpageClientPrompt = HDLmAI.webpageClientPrompt; */
    let markupBothPrompt = HDLmAI.replaceTemplateStrings(OpenAIChatTemplates, 
                                                         'markup', 
                                                         improvementText);
    /* Build the Open AI markup messages */
    let contextBothMessage = HDLmAI.openAIBuildMessage('system', contextBothPrompt);    
    /* let webpageClientMessage = HDLmAI.openAIBuildMessage('user', webpageClientPrompt); */
    let markupBothMessage = HDLmAI.openAIBuildMessage('user', markupBothPrompt);
    /* Build the Open AI markup message list */
    /* let messageClientList = HDLmAI.openAIBuildMessageList(contextBothMessage, 
                                                             webpageClientMessage, 
                                                             markupBothMessage); */
    /* Build the Open AI body object */ 
    let responseFormat;
    /* Get the JSON schema markup response format */
    responseFormat = openAIResponseJsonSchemaMarkup;
    /* let bodyClientObj = HDLmAI.openAIBuildBody(openAIModel, messageClientList, responseFormat); */
    /* Build the Open AI headers */
    /* let headersObj = HDLmAI.openAIBuildHeadersObj(openAIApiKey); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows AI key to be stored securely on the server
       and not be exposed to the client. */
    let markupResponse;
    /* Try to get the markup from Open AI on the client */
    /* 
    markupResponse = await HDLmAI.fetchUrl(openAIUrl + '/chat/completions',
                                           'POST',
                                           headersObj,
                                           JSON.stringify(bodyClientObj));    
    */
    /* Try to get the markup from Open AI on the server*/
    /* let targetWebpageContents = await HDLmAI.getWebpage(webpageUrl); */
    /* let webpageServerContents = HDLmAI.modifyWebpage(targetWebpageContents); */
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(OpenAIChatTemplates, 
                                                            'webpageServer', 
                                                            webpageUrl);   
    let webpageServerMessage = HDLmAI.openAIBuildMessage('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openAIBuildMessageList(contextBothMessage,   
                                                          webpageServerMessage,                                                    
                                                          markupBothMessage);  
    let bodyObjServer = HDLmAI.openAIBuildBody(openAIModel, messageServerList, responseFormat);
    if (1 == 1)
      markupResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyObjServer, versionAI);      
    /* Return the markup response to the caller */
    let markupObj; 
    try {
      /* Parse the markup response */
      markupObj = JSON.parse(markupResponse);    
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Markup:', markupResponse);
      console.log('Error parsing Open AI markup response: ' + error);
      let errorText = 'Error parsing Open AI markup response: ' + error;
      HDLmAssert(false, errorText);
    }
    /* Get the choices list from the markup response */
    let markupChoicesList = markupObj['choices'];
    if (markupChoicesList == null) {
      console.log('Error: No choices found in Open AI markup response');
      let errorText = 'No choices found in Open AI markup response';
      HDLmAssert(false, errorText);
    }  
    /* get the first choice from the choices list */
    let markupFirstChoice = markupChoicesList[0];
    /* Get the message object from the first choice */
    let markupMessageObj = markupFirstChoice['message'];
    if (markupMessageObj == null) {
      console.log('Error: Message object not built in Open AI markup response');
      let errorText = 'Message object not built in Open AI markup response';
      HDLmAssert(false, errorText);
    }  
    /* Check for refusals in the message object */
    if (markupMessageObj['refusal'] != null) {
      console.log('Error: Message object has refusal set in Open AI markup response');
      let errorText = 'Message object has refusal set in Open AI markup response';
      HDLmAssert(false, errorText);
    } 
    /* Get the content from the message object */
    let markupMessageContent = markupMessageObj['content'];
    let markupContentObj = JSON.parse(markupMessageContent);
    return markupContentObj 
  };
  /* This routine builds the Open Router authentication header.
     The authorization header is used to authenticate with 
     Open Router. The header is used in fetch calls to Open Router 
     services. The header is stored in a global variable for later 
     use and returned to the caller. */
  static openRouterBuildAuthHeaderObjV1(apiKeyStr) {
    /* Just return to the caller if the authentication header
       has already been built */
    if (HDLmAI.openRouterAuthHeaderV1 != null)
      return HDLmAI.openRouterAuthHeaderV1;
    /* Build the authorization header */
    let authHeaderObj = HDLmHtml.buildAuthorizationHeaderObj(apiKeyStr);
    /* Store the authorization header in a global variable */
    HDLmAI.openRouterAuthHeaderV1 = authHeaderObj;
    /* Return the authorization header to the caller */
    return authHeaderObj;
  };
  /* This routine builds an Open Router body object. The body
     object is used to provide information to Open Router. The 
     body object is used in fetch calls to Open Router services.
     The body object is returned to the caller. */
  static openRouterBuildBodyV1(openRouterModelStr, 
                               messageList,
                               responseFormat) {
    /* Build the Open Router body object */
    let bodyObj = {};
    /* Add the model infomation to the body object,
       if need be */
    if (openRouterModelStr != null) 
      bodyObj['model'] = openRouterModelStr;
    /* Add the messages to the body object, if 
       need be */
    if (messageList != null)
      bodyObj['messages'] = messageList;
    /* Add the response format to the body object, if 
       need be */
    if (responseFormat != null)
      bodyObj['response_format'] = responseFormat; 
    /* Return the body object to the caller */
    return bodyObj;
  };
  /* This routine builds an Open Router message object. The message
     object is used to provide information to Open Router. The 
     message object is used in fetch calls to Open Router services.
     The message object is returned to the caller. */
  static openRouterBuildMessageV1(roleStr, messageStr) {
    /* Build the Open Router message object */
    let messageObj = {};
    /* Add the role to the message object */
    messageObj['role'] = roleStr;
    /* Add the messages to the body object */
    messageObj['content'] = messageStr;
    /* Return the message object to the caller */
    return messageObj;
  };
  /* This routine builds an Open Router message list.
     The message list is used to provide information
     to Open Router. The message list is used in fetch 
     calls to Open Router services. The message list is
     returned to the caller. */
  static openRouterBuildMessageListV1(...messageListArray) {
    /* Build the Open Router message list */
    let messageList = [];
    /* Handle each of the messages passed in */
    messageList = messageListArray;
    /* Return the message list to the caller */
    return messageList;
  };
  /* This routine gets improvements from Open Router. The
     suggestion text and the webpage URL are passed in.
     The improvements list is returned to the caller. 
     Because this routine uses await, it only be used in
     an async function. */
  static async openRouterGetImprovementsV1(suggestionText, webpageUrl, versionAI) {
    /* Declare and define a few local variables */
    let improvementsList = [];
    /* let targetWebpageContents = await HDLmAI.getWebpage(webpageUrl); */
    /* console.log('Webpage content fetched from ' + webpageUrl); */
    /* console.log(targetWebpageContents); */
    /* Build the various prompts */
    let contextBothPrompt = HDLmAI.promptContextBothStr(OpenRouterChatTemplatesV1,
                                                        'context');
    /* let webpageClientPrompt = HDLmAI.promptWebpageClientStr(OpenRouterChatTemplatesV1, 
                                                               'webpageClient', 
                                                               webpageUrl, 
                                                               targetWebpageContents); */
    let improvementsBothPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV1,
                                                               'improvements', 
                                                               openRouterImprovementsQuantityV1);
    /* Build the Open Router improvements messages */
    let contextBothMessage = HDLmAI.openRouterBuildMessageV1('system', contextBothPrompt);    
    /* let webpageClientMessage = HDLmAI.openRouterBuildMessageV1('user', webpageClientPrompt); */
    let improvementsBothMessage = HDLmAI.openRouterBuildMessageV1('user', improvementsBothPrompt);
    /* Build the Open Router improvements message list */
    /* let messageClientList = HDLmAI.openRouterBuildMessageListV1(contextBothMessage, 
                                                                   webpageClientMessage, 
                                                                   improvementsBothMessage); */
    /* Build the Open Router body object */ 
    let responseFormat;
    /* Get the JSON schema improvements response format */
    responseFormat = openRouterResponseJsonSchemaImprovementsV1;
    /* let bodyClientObj = HDLmAI.openRouterBuildBodyV1(openRouterModelV1, messageClientList, responseFormat); */
    /* Build the Open Router headers */
    /* let headersObj = HDLmAI.openRouterBuildHeadersObjV1(openRouterApiKeyV1); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows the Open Router key to be stored securely 
       on the server and not be exposed to the client. */
    let improvementsResponse;
    /* Try to get the improvements from Open Router on the client */
    /*
    let bodyClientJsonStr = JSON.stringify(bodyClientObj);
    improvementsResponse = await HDLmAI.fetchUrl(openRouterUrlV1 + '/chat/completions',
                                                 'POST',
                                                 headersObj,
                                                 bodyClientJsonStr);   
    */
    /* Try to get the improvements from Open Router on the server */
    /* let webpageServerContents = HDLmAI.modifyWebpage(targetWebpageContents); */
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV1, 
                                                            'webpageServer', 
                                                            webpageUrl);   
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV1('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV1(contextBothMessage,   
                                                                webpageServerMessage,                                                    
                                                                improvementsBothMessage);  
    let bodyServerObj = HDLmAI.openRouterBuildBodyV1(openRouterModelV1, messageServerList, responseFormat);
    if (1 == 1)
      improvementsResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyServerObj, versionAI);      
    /* Return the improvements response to the caller */
    let improvementsObj; 
    try {
      /* Parse the improvements response */
      improvementsObj = JSON.parse(improvementsResponse);    
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Improvement:', improvementsResponse, 20);
      console.log('Error parsing Open Router improvements response: ' + error);
      let errorText = 'Error parsing Open Router improvements response: ' + error;
      HDLmAssert(false, errorText);
    }
    /* Get the choices list from the improvements response */
    let improvementsChoicesList = improvementsObj['choices'];
    if (improvementsChoicesList == null) {
      console.log('Error: No choices found in Open Router improvements response');
      let errorText = 'No choices found in Open Router improvements response';
      HDLmAssert(false, errorText);
    }  
    /* get the first choice from the choices list */
    let improvementsFirstChoice = improvementsChoicesList[0];
    /* Get the message object from the first choice */
    let improvementsMessageObj = improvementsFirstChoice['message'];
    if (improvementsMessageObj == null) {
      console.log('Error: Message object not built in Open Router improvements response');
      let errorText = 'Message object not built in Open Router improvements response';
      HDLmAssert(false, errorText);
    }  
    /* Check for refusals in the message object */
    if (improvementsMessageObj['refusal'] != null) {
      console.log('Error: Message object has refusal set in Open Router improvements response');
      let errorText = 'Message object has refusal set in Open Router improvements response';
      HDLmAssert(false, errorText);
    } 
    /* Get the content from the message object */
    let improvementsMessageContent = improvementsMessageObj['content'];
    let improvementsContentObj = JSON.parse(improvementsMessageContent);
    /* Some of the the messages may represent an improvement */ 
    for (let improvement of improvementsContentObj['items']) {
      improvementsList.push(improvement);
    }
    return improvementsList;    
  };
  /* This routine gets markup from Open Router. The
     improvement text and the webpage URL are passed 
     in. The markup is returned to the caller. Because
     this routine uses await, it can only be used in
     an async function. */
  static async openRouterGetMarkupV1(improvementText, webpageUrl, versionAI) {
    /* Declare and define a few local variables */
    /* Build the various prompts */
    let contextBothPrompt = HDLmAI.contextBothPrompt;
    /* let webpageClientPrompt = HDLmAI.webpageClientPrompt; */
    let markupBothPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV1, 
                                                         'markup', 
                                                         improvementText);
    /* Build the Open Router markup messages */
    let contextBothMessage = HDLmAI.openRouterBuildMessageV1('system', contextBothPrompt);    
    /* let webpageClientMessage = HDLmAI.openRouterBuildMessageV1('user', webpageClientPrompt); */
    let markupBothMessage = HDLmAI.openRouterBuildMessageV1('user', markupBothPrompt);
    /* Build the Open Router markup message list */
    /* let messageClientList = HDLmAI.openRouterBuildMessageListV1(contextBothMessage, 
                                                                   webpageClientMessage, 
                                                                   markupBothMessage); */
    /* Build the Open Router body object */ 
    let responseFormat;
    /* Get the JSON schema markup response format */
    responseFormat = openRouterResponseJsonSchemaMarkupV1;
    /* let bodyClientObj = HDLmAI.openRouterBuildBodyV1(openRouterModelV1, messageClientList, responseFormat); */
    /* Build the Open Router headers */
    /* let headersObj = HDLmAI.openRouterBuildHeadersObjV1(openRouterApiKeyV1); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows the Open Router key to be stored securely 
       on the server and not be exposed to the client. */
    let markupResponse;
    /* Try to get the markup from Open Router on the client */
    /* 
    markupResponse = await HDLmAI.fetchUrl(openRouterUrlV1 + '/chat/completions',
                                           'POST',
                                           headersObj,
                                           JSON.stringify(bodyClientObj));    
    */
    /* Try to get the markup from Open AI on the server*/
    /* let targetWebpageContents = await HDLmAI.getWebpage(webpageUrl); */
    /* let webpageServerContents = HDLmAI.modifyWebpage(targetWebpageContents); */
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV1, 
                                                            'webpageServer', 
                                                            webpageUrl);   
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV1('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV1(contextBothMessage,   
                                                                webpageServerMessage,                                                    
                                                                markupBothMessage);  
    let bodyObjServer = HDLmAI.openRouterBuildBodyV1(openRouterModelV1, messageServerList, responseFormat);
    if (1 == 1)
      markupResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyObjServer, versionAI);      
    /* Return the markup response to the caller */
    let markupObj; 
    try {
      /* Parse the markup response */
      markupObj = JSON.parse(markupResponse);    
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Markup:', markupResponse);
      console.log('Error parsing Open Router markup response: ' + error);
      let errorText = 'Error parsing Open Router markup response: ' + error;
      HDLmAssert(false, errorText);
    }
    /* Get the choices list from the markup response */
    let markupChoicesList = markupObj['choices'];
    if (markupChoicesList == null) {
      console.log('Error: No choices found in Open Router markup response');
      let errorText = 'No choices found in Open Router markup response';
      HDLmAssert(false, errorText);
    }  
    /* get the first choice from the choices list */
    let markupFirstChoice = markupChoicesList[0];
    /* Get the message object from the first choice */
    let markupMessageObj = markupFirstChoice['message'];
    if (markupMessageObj == null) {
      console.log('Error: Message object not built in Open Router markup response');
      let errorText = 'Message object not built in Open Router markup response';
      HDLmAssert(false, errorText);
    }  
    /* Check for refusals in the message object */
    if (markupMessageObj['refusal'] != null) {
      console.log('Error: Message object has refusal set in Open Router markup response');
      let errorText = 'Message object has refusal set in Open Router markup response';
      HDLmAssert(false, errorText);
    } 
    /* Get the content from the message object */
    let markupMessageContent = markupMessageObj['content'];
    let markupContentObj = JSON.parse(markupMessageContent);
    return markupContentObj 
  };
    /* This routine builds an Open Router V2 body object. The body
     object is used to provide information to Open Router. */
  static openRouterBuildBodyV2(openRouterModelStr,
                               messageList,
                               responseFormat) {
    /* Build the Open Router body object */
    let bodyObj = {};
    /* Add the model information to the body object, if need be */
    if (openRouterModelStr != null)
      bodyObj['model'] = openRouterModelStr;
    /* Add the messages to the body object, if need be */
    if (messageList != null)
      bodyObj['messages'] = messageList;
    /* Add the response format to the body object, if need be */
    if (responseFormat != null)
      bodyObj['response_format'] = responseFormat;
    /* Return the body object to the caller */
    return bodyObj;
  };
  /* This routine builds an Open Router V2 message object. */
  static openRouterBuildMessageV2(roleStr, messageStr) {
    /* Build the Open Router message object */
    let messageObj = {};
    /* Add the role to the message object */
    messageObj['role'] = roleStr;
    /* Add the content to the message object */
    messageObj['content'] = messageStr;
    /* Return the message object to the caller */
    return messageObj;
  };
  /* This routine builds an Open Router V2 message list. */
  static openRouterBuildMessageListV2(...messageListArray) {
    /* Build the Open Router message list */
    let messageList = [];
    /* Handle each of the messages passed in */
    messageList = messageListArray;
    /* Return the message list to the caller */
    return messageList;
  };
  /* This routine gets combined improvements and markup from Open Router.
     The suggestion text and the webpage URL are passed in. The
     improvements list is returned to the caller. */
  static async openRouterGetImprovementsV2(suggestionText, webpageUrl, versionAI) {
    /* Declare and define a few local variables */
    let improvementsList = [];
    /* let targetWebpageContents = await HDLmAI.getWebpage(webpageUrl); */
    /* console.log('Webpage content fetched from ' + webpageUrl); */
    /* console.log(targetWebpageContents); */
    /* Build the various prompts */
    let contextBothPrompt = HDLmAI.promptContextBothStr(OpenRouterChatTemplatesV2,
                                                        'context');
    /* let webpageClientPrompt = HDLmAI.promptWebpageClientStr(OpenRouterChatTemplatesV2, 
                                                               'webpageClient', 
                                                               webpageUrl, 
                                                               targetWebpageContents); */
    let improvementsBothPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV2, 
                                                               'improvements', 
                                                               openRouterImprovementsQuantityV2);
    /* Build the Open Router improvements messages */
    let contextBothMessage = HDLmAI.openRouterBuildMessageV2('system', contextBothPrompt);    
    /* let webpageClientMessage = HDLmAI.openRouterBuildMessageV2('user', webpageClientPrompt); */
    let improvementsBothMessage = HDLmAI.openRouterBuildMessageV2('user', improvementsBothPrompt);
    /* Build the Open Router improvements message list */
    /* let messageClientList = HDLmAI.openRouterBuildMessageListV2(contextBothMessage, 
                                                                   webpageClientMessage, 
                                                                   improvementsBothMessage); */
    /* Build the Open Router body object */ 
    let responseFormat;
    /* Get the JSON schema improvements response format */
    responseFormat = openRouterResponseJsonSchemaImprovementsV2;
    /* let bodyClientObj = HDLmAI.openRouterBuildBodyV2(openRouterModelV2, messageClientList, responseFormat); */
    /* Build the Open Router headers */
    /* let headersObj = HDLmAI.openRouterBuildHeadersObjV2(openRouterApiKeyV2); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows the Open Router key to be stored securely 
       on the server and not be exposed to the client. */
    let improvementsResponse;
    /* Try to get the improvements from Open Router on the client */
    /*
    let bodyClientJsonStr = JSON.stringify(bodyClientObj);
    improvementsResponse = await HDLmAI.fetchUrl(openRouterUrlV2 + '/chat/completions',
                                                 'POST',
                                                 headersObj,
                                                 bodyClientJsonStr);   
    */
    /* Try to get the improvements from Open Router on the server */
    /* let webpageServerContents = HDLmAI.modifyWebpage(targetWebpageContents); */
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV2, 
                                                            'webpageServer', 
                                                            webpageUrl);   
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV2('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV2(contextBothMessage,   
                                                                webpageServerMessage,                                                    
                                                                improvementsBothMessage);  
    let bodyServerObj = HDLmAI.openRouterBuildBodyV2(openRouterModelV2, messageServerList, responseFormat); 
    improvementsResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyServerObj, versionAI);     
    /* Return the improvements response to the caller */
    let improvementsObj;
    try {
      /* Parse the improvements response */
      improvementsObj = JSON.parse(improvementsResponse);
    }
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Improvement:', improvementsResponse, 20);
      console.log('Error parsing Open Router V2 improvements response: ' + error);
      let errorText = 'Error parsing Open Router V2 improvements response: ' + error;
      HDLmAssert(false, errorText);
    }  
    /* Some of the responses may represent an improvement */
    let improvements = improvementsObj['improvements'];
    for (let improvement of improvements) {
      improvementsList.push(improvement);
    }
    return improvementsList;
  };
   /* This routine builds an Open Router V3 body object. The body
     object is used to provide information to Open Router. */
  static openRouterBuildBodyV3(openRouterModelStr,
                               messageList,
                               responseFormat) {
    /* Build the Open Router body object */
    let bodyObj = {};
    /* Add the model information to the body object, if need be */
    if (openRouterModelStr != null)
      bodyObj['model'] = openRouterModelStr;
    /* Add the messages to the body object, if need be */
    if (messageList != null)
      bodyObj['messages'] = messageList;
    /* Add the response format to the body object, if need be */
    if (responseFormat != null)
      bodyObj['response_format'] = responseFormat;
    /* Return the body object to the caller */
    return bodyObj;
  };
  /* This routine builds an Open Router V3 message object. */
  static openRouterBuildMessageV3(roleStr, messageStr) {
    /* Build the Open Router message object */
    let messageObj = {};
    /* Add the role to the message object */
    messageObj['role'] = roleStr;
    /* Add the content to the message object */
    messageObj['content'] = messageStr;
    /* Return the message object to the caller */
    return messageObj;
  };
  /* This routine builds an Open Router V3 message list. */
  static openRouterBuildMessageListV3(...messageListArray) {
    /* Build the Open Router message list */
    let messageList = [];
    /* Handle each of the messages passed in */
    messageList = messageListArray;
    /* Return the message list to the caller */
    return messageList;
  };
  /* This routine gets combined improvements and markup from Open Router.
     The suggestion text and the webpage URL are passed in. The
     improvements list is returned to the caller. */
  static async openRouterGetImprovementsV3(suggestionText, webpageUrl, versionAI) {
    /* Declare and define a few local variables */
    let improvementsList = [];
    /* let targetWebpageContents = await HDLmAI.getWebpage(webpageUrl); */
    /* console.log('Webpage content fetched from ' + webpageUrl); */
    /* console.log(targetWebpageContents); */
    /* Build the various prompts */
    let contextBothPrompt = HDLmAI.promptContextBothStr(OpenRouterChatTemplatesV3,
                                                        'context');
    /* let webpageClientPrompt = HDLmAI.promptWebpageClientStr(OpenRouterChatTemplatesV3, 
                                                               'webpageClient', 
                                                               webpageUrl, 
                                                               targetWebpageContents); */
    let improvementsBothPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV3, 
                                                               'improvements', 
                                                               openRouterImprovementsQuantityV3);
    /* Build the Open Router improvements messages */
    let contextBothMessage = HDLmAI.openRouterBuildMessageV3('system', contextBothPrompt);    
    /* let webpageClientMessage = HDLmAI.openRouterBuildMessageV3('user', webpageClientPrompt); */
    let improvementsBothMessage = HDLmAI.openRouterBuildMessageV3('user', improvementsBothPrompt);
    /* Build the Open Router improvements message list */
    /* let messageClientList = HDLmAI.openRouterBuildMessageListV3(contextBothMessage, 
                                                                   webpageClientMessage, 
                                                                   improvementsBothMessage); */
    /* Build the Open Router body object */ 
    let responseFormat;
    /* Get the JSON schema improvements response format */
    responseFormat = openRouterResponseJsonSchemaImprovementsV3;
    /* let bodyClientObj = HDLmAI.openRouterBuildBodyV3(openRouterModelV3, messageClientList, responseFormat); */
    /* Build the Open Router headers */
    /* let headersObj = HDLmAI.openRouterBuildHeadersObj(openRouterApiKeyV3); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows the Open Router key to be stored securely 
       on the server and not be exposed to the client. */
    let improvementsResponse;
    /* Try to get the improvements from Open Router on the client */
    /*
    let bodyClientJsonStr = JSON.stringify(bodyClientObj);
    improvementsResponse = await HDLmAI.fetchUrl(openRouterUrlV3 + '/chat/completions',
                                                 'POST',
                                                 headersObj,
                                                 bodyClientJsonStr);   
    */
    /* Try to get the improvements from Open Router on the server */
    /* let webpageServerContents = HDLmAI.modifyWebpage(targetWebpageContents); */
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV3, 
                                                            'webpageServer', 
                                                            webpageUrl);   
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV3('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV3(contextBothMessage,   
                                                                webpageServerMessage,                                                    
                                                                improvementsBothMessage);  
    let bodyServerObj = HDLmAI.openRouterBuildBodyV3(openRouterModelV3, messageServerList, responseFormat); 
    improvementsResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyServerObj, versionAI);     
    /* Return the improvements response to the caller */
    let improvementsObj;
    try {
      /* Parse the improvements response */
      improvementsObj = JSON.parse(improvementsResponse);
    }
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Improvement:', improvementsResponse, 20);
      console.log('Error parsing Open Router V3 improvements response: ' + error);
      let errorText = 'Error parsing Open Router V3 improvements response: ' + error;
      HDLmAssert(false, errorText);
    }  
    /* Some of the responses may represent an improvement */
    let improvements = improvementsObj['improvements'];
    for (let improvement of improvements) {
      improvementsList.push(improvement);
    }
    return improvementsList;
  };
  /* This routine builds an Open Router V4 body object. The body
     object is used to provide information to Open Router. */
  static openRouterBuildBodyV4(openRouterModelStr,
                               messageList,
                               responseFormat) {
    /* Build the Open Router body object */
    let bodyObj = {};
    /* Add the model information to the body object, if need be */
    if (openRouterModelStr != null)
      bodyObj['model'] = openRouterModelStr;
    /* Add the messages to the body object, if need be */
    if (messageList != null)
      bodyObj['messages'] = messageList;
    /* Add the response format to the body object, if need be */
    if (responseFormat != null)
      bodyObj['response_format'] = responseFormat;
    /* Return the body object to the caller */
    return bodyObj;
  };
  /* This routine builds an Open Router V4 message object. */
  static openRouterBuildMessageV4(roleStr, messageStr) {
    /* Build the Open Router message object */
    let messageObj = {};
    /* Add the role to the message object */
    messageObj['role'] = roleStr;
    /* Add the content to the message object */
    messageObj['content'] = messageStr;
    /* Return the message object to the caller */
    return messageObj;
  };
  /* This routine builds an Open Router V4 message list. */
  static openRouterBuildMessageListV4(...messageListArray) {
    /* Build the Open Router message list */
    let messageList = [];
    /* Handle each of the messages passed in */
    messageList = messageListArray;
    /* Return the message list to the caller */
    return messageList;
  };
  /* This routine gets improvements from Open Router. The
     suggestion text and the webpage URL are passed in.
     The improvements list is returned to the caller. 
     Because this routine uses await, it only be used in
     an async function. */
  static async openRouterGetImprovementsV4(suggestionText, webpageUrl, versionAI) {
    /* Declare and define a few local variables */
    let improvementsList = [];
    /* let targetWebpageContents = await HDLmAI.getWebpage(webpageUrl); */
    /* console.log('Webpage content fetched from ' + webpageUrl); */
    /* console.log(targetWebpageContents); */
    /* Build the various prompts */
    let contextBothPrompt = HDLmAI.promptContextBothStr(OpenRouterChatTemplatesV4,
                                                        'context');
    /* let webpageClientPrompt = HDLmAI.promptWebpageClientStr(OpenRouterChatTemplatesV4, 
                                                               'webpageClient', 
                                                               webpageUrl, 
                                                               targetWebpageContents); */
    let improvementsBothPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV4,
                                                               'improvements', 
                                                               openRouterImprovementsQuantityV4);
    /* Build the Open Router improvements messages */
    let contextBothMessage = HDLmAI.openRouterBuildMessageV4('system', contextBothPrompt);    
    /* let webpageClientMessage = HDLmAI.openRouterBuildMessageV4('user', webpageClientPrompt); */
    let improvementsBothMessage = HDLmAI.openRouterBuildMessageV4('user', improvementsBothPrompt);
    /* Build the Open Router improvements message list */
    /* let messageClientList = HDLmAI.openRouterBuildMessageListV4(contextBothMessage, 
                                                                   webpageClientMessage, 
                                                                   improvementsBothMessage); */
    /* Build the Open Router body object */ 
    let responseFormat;
    /* Get the JSON schema improvements response format */
    responseFormat = openRouterResponseJsonSchemaImprovementsV4;
    /* let bodyClientObj = HDLmAI.openRouterBuildBodyV4(openRouterModelV4, messageClientList, responseFormat); */
    /* Build the Open Router headers */
    /* let headersObj = HDLmAI.openRouterBuildHeadersObjV4(openRouterApiKeyV4); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows the Open Router key to be stored securely 
       on the server and not be exposed to the client. */
    let improvementsResponse;
    /* Try to get the improvements from Open Router on the client */
    /*
    let bodyClientJsonStr = JSON.stringify(bodyClientObj);
    improvementsResponse = await HDLmAI.fetchUrl(openRouterUrlV4 + '/chat/completions',
                                                 'POST',
                                                 headersObj,
                                                 bodyClientJsonStr);   
    */
    /* Try to get the improvements from Open Router on the server */
    /* let webpageServerContents = HDLmAI.modifyWebpage(targetWebpageContents); */
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV4, 
                                                            'webpageServer', 
                                                            webpageUrl);   
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV4('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV4(contextBothMessage,   
                                                                webpageServerMessage,                                                    
                                                                improvementsBothMessage);  
    let bodyServerObj = HDLmAI.openRouterBuildBodyV4(openRouterModelV4, messageServerList, responseFormat);
    if (1 == 1)
      improvementsResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyServerObj, versionAI);      
    /* Return the improvements response to the caller */
    let improvementsObj; 
    try {
      /* Parse the improvements response */
      improvementsObj = JSON.parse(improvementsResponse);    
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Improvement:', improvementsResponse, 20);
      console.log('Error parsing Open Router improvements response: ' + error);
      let errorText = 'Error parsing Open Router improvements response: ' + error;
      HDLmAssert(false, errorText);
    }
    /* Get the choices list from the improvements response */
    let improvementsChoicesList = improvementsObj['choices'];
    if (improvementsChoicesList == null) {
      console.log('Error: No choices found in Open Router improvements response');
      let errorText = 'No choices found in Open Router improvements response';
      HDLmAssert(false, errorText);
    }  
    /* get the first choice from the choices list */
    let improvementsFirstChoice = improvementsChoicesList[0];
    /* Get the message object from the first choice */
    let improvementsMessageObj = improvementsFirstChoice['message'];
    if (improvementsMessageObj == null) {
      console.log('Error: Message object not built in Open Router improvements response');
      let errorText = 'Message object not built in Open Router improvements response';
      HDLmAssert(false, errorText);
    }  
    /* Check for refusals in the message object */
    if (improvementsMessageObj['refusal'] != null) {
      console.log('Error: Message object has refusal set in Open Router improvements response');
      let errorText = 'Message object has refusal set in Open Router improvements response';
      HDLmAssert(false, errorText);
    } 
    /* Get the content from the message object */
    let improvementsMessageContent = improvementsMessageObj['content'];
    let improvementsContentObj = JSON.parse(improvementsMessageContent);
    /* Some of the the messages may represent an improvement */ 
    for (let improvement of improvementsContentObj['items']) {
      improvementsList.push(improvement);
    }
    return improvementsList;    
  };
  /* This routine gets markup from Open Router. The
     improvement text and the webpage URL are passed 
     in. The markup is returned to the caller. Because
     this routine uses await, it can only be used in
     an async function. */
  static async openRouterGetMarkupV4(improvementText, webpageUrl, versionAI) {
    /* Declare and define a few local variables */
    /* Build the various prompts */
    let contextBothPrompt = HDLmAI.contextBothPrompt;
    /* let webpageClientPrompt = HDLmAI.webpageClientPrompt; */
    let markupBothPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV4, 
                                                         'markup', 
                                                         improvementText);
    /* Build the Open Router markup messages */
    let contextBothMessage = HDLmAI.openRouterBuildMessageV4('system', contextBothPrompt);    
    /* let webpageClientMessage = HDLmAI.openRouterBuildMessageV4('user', webpageClientPrompt); */
    let markupBothMessage = HDLmAI.openRouterBuildMessageV4('user', markupBothPrompt);
    /* Build the Open Router markup message list */
    /* let messageClientList = HDLmAI.openRouterBuildMessageListV4(contextBothMessage, 
                                                                   webpageClientMessage, 
                                                                   markupBothMessage); */
    /* Build the Open Router body object */ 
    let responseFormat;
    /* Get the JSON schema markup response format */
    responseFormat = openRouterResponseJsonSchemaMarkupV4;
    /* let bodyClientObj = HDLmAI.openRouterBuildBodyV4(openRouterModelV4, messageClientList, responseFormat); */
    /* Build the Open Router headers */
    /* let headersObj = HDLmAI.openRouterBuildHeadersObjV4(openRouterApiKeyV4); */
    /* Use WebSockets for communication with the server. The server executes
       the actual request. This allows the Open Router key to be stored securely 
       on the server and not be exposed to the client. */
    let markupResponse;
    /* Try to get the markup from Open Router on the client */
    /* 
    markupResponse = await HDLmAI.fetchUrl(openRouterUrlV4 + '/chat/completions',
                                          'POST',
                                          headersObj,
                                          JSON.stringify(bodyClientObj));    
    */
    /* Try to get the markup from Open AI on the server*/
    /* let targetWebpageContents = await HDLmAI.getWebpage(webpageUrl); */
    /* let webpageServerContents = HDLmAI.modifyWebpage(targetWebpageContents); */
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(OpenRouterChatTemplatesV4, 
                                                            'webpageServer', 
                                                            webpageUrl);   
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV4('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV4(contextBothMessage,   
                                                          webpageServerMessage,                                                    
                                                          markupBothMessage);  
    let bodyObjServer = HDLmAI.openRouterBuildBodyV4(openRouterModelV4, messageServerList, responseFormat);
    if (1 == 1)
      markupResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyObjServer, versionAI);      
    /* Return the markup response to the caller */
    let markupObj; 
    try {
      /* Parse the markup response */
      markupObj = JSON.parse(markupResponse);    
    } 
    /* Catch any errors that occur during parsing */
    catch (error) {
      HDLmUtility.logStringInParts('Markup:', markupResponse);
      console.log('Error parsing Open Router markup response: ' + error);
      let errorText = 'Error parsing Open Router markup response: ' + error;
      HDLmAssert(false, errorText);
    }
    /* Get the choices list from the markup response */
    let markupChoicesList = markupObj['choices'];
    if (markupChoicesList == null) {
      console.log('Error: No choices found in Open Router markup response');
      let errorText = 'No choices found in Open Router markup response';
      HDLmAssert(false, errorText);
    }  
    /* get the first choice from the choices list */
    let markupFirstChoice = markupChoicesList[0];
    /* Get the message object from the first choice */
    let markupMessageObj = markupFirstChoice['message'];
    if (markupMessageObj == null) {
      console.log('Error: Message object not built in Open Router markup response');
      let errorText = 'Message object not built in Open Router markup response';
      HDLmAssert(false, errorText);
    }  
    /* Check for refusals in the message object */
    if (markupMessageObj['refusal'] != null) {
      console.log('Error: Message object has refusal set in Open Router markup response');
      let errorText = 'Message object has refusal set in Open Router markup response';
      HDLmAssert(false, errorText);
    } 
    /* Get the content from the message object */
    let markupMessageContent = markupMessageObj['content'];
    let markupContentObj = JSON.parse(markupMessageContent);
    return markupContentObj 
  };
  /* This routine gets an improved webpage from Open Router
     Because this routine uses await, it only be used in
     an async function.
     
     This routine invokes the HDLmAI.sendWebSocketsExecuteRequest routine 
     which runs the HDLmWebSockets.executeAIRequest routine. */
  static async openRouterImproveWebpageV1(currentUrl,
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
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(chatTemplates, 
                                                            'webpageServer', 
                                                            /* currentUrl); */
                                                            originalHtml,
                                                            suggestionText, 
                                                            desiredImprovements,
                                                            undesiredImprovements); 
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV1('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV1(contextMessage,   
                                                                webpageServerMessage);                                                 
                                                                /* improvementBothMessage); */  
    let bodyServerObj = HDLmAI.openRouterBuildBodyV1(openRouterModel, messageServerList, responseSchema);
    if (1 == 1) {
      /*
      bodyServerObj['max_completion_tokens'] = 1000;
      bodyServerObj['max_tokens'] = 1000;
      */
      improvementResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyServerObj, versionAI);      
    }
    /* Return the webpage improvement response from the caller */
    let improvementObj; 
    try {
      /* Parse the improvement response */
      /* HDLmUtility.saveUtf8Blob('ImprovementResponse', improvementResponse); */
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
      if (improvementMessageContentLen >= 5000)
        improvementMessageContent = improvementMessageContent.substring(0, 4999);
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
  /* This routine gets an improved website from Open Router
     Because this routine uses await, it only be used in
     an async function. */
  static async openRouterImproveWebsiteV1(currentUrl,
                                          suggestionText,
                                          versionAI,
                                          chatTemplates, 
                                          responseFormat,
                                          responseSchema) {  
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
    let webpageServerPrompt = HDLmAI.replaceTemplateStrings(chatTemplates, 
                                                            'webpageServer', 
                                                            currentUrl,
                                                            suggestionText); 
    let webpageServerMessage = HDLmAI.openRouterBuildMessageV1('user', webpageServerPrompt);
    let messageServerList = HDLmAI.openRouterBuildMessageListV1(contextMessage,   
                                                                webpageServerMessage);                                                 
                                                                /* improvementBothMessage); */  
    let bodyServerObj = HDLmAI.openRouterBuildBodyV1(openRouterModel, messageServerList, responseSchema);
    if (1 == 1) {
      improvementResponse = await HDLmAI.sendWebSocketsExecuteRequest(bodyServerObj, versionAI);      
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
      if (improvementMessageContentLen >= 5000)
        improvementMessageContent = improvementMessageContent.substring(0, 4999);
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
  /* This routine builds the context string that is passed 
     to AI. The context string is used to provide information
     to AI services. The context string is stored in a global
     variable for later use and returned to the caller. */
  static promptContextBothStr(templateStructure, promptNameStr) {
    /* Just return to the caller if the context string
       has already been built */
    if (HDLmAI.contextBothPrompt != null)
      return HDLmAI.contextBothPrompt;
    /* Get the context string */
    let contextStr = HDLmAI.getTemplateString(templateStructure, promptNameStr);
    /* Store the context string in a global variable */
    HDLmAI.contextBothPrompt = contextStr;
    /* Return the context string to the caller */
    return contextStr;
  };
  /* This routine builds the client webpage prompt string that is passed 
     to AI. The client webpage prompt string is used to provide information
     to AI services. The client webpage prompt string is stored in a global
     variable for later use and returned to the caller. */
  static promptWebpageClientStr(templateStructure, promptNameStr, webpageUrl, webpageContents) {
    /* Just return to the caller if the webpage prompt string
       has already been built */
    if (HDLmAI.webpageClientPrompt != null)
      return HDLmAI.webpageClientPrompt;
    /* Get the clientwebpage prompt string */
    let webpageClientPromptStr = HDLmAI.replaceTemplateStrings(templateStructure,
                                                               promptNameStr, 
                                                               webpageUrl, 
                                                               webpageContents);
    /* Store the clientwebpage prompt string in a global variable */
    HDLmAI.webpageClientPrompt = webpageClientPromptStr;
    /* Return the clientwebpage prompt string to the caller */
    return webpageClientPromptStr;
  };
  /* This routine gets a template string (the caller passes
     the template name) and returns the modified string to 
     the caler */  
  static replaceTemplateStrings(templateStructure, templateName, ...replacements) {
    /* Declare and define a few local variables */
    let processedText = HDLmAI.getTemplateString(templateStructure, templateName);
    let replacementsLength = replacements.length;
    /* Check that there are enough replacements */
    if (replacementsLength <= 0) {
      let errorText = 'Not enough replacements passed to replaceTemplateStrings';
      HDLmAssert(false, errorText);
    }
    /* Modify the template string */
    processedText = HDLmAI.replaceTemplateStringsLowLevel(processedText, ...replacements);
    /* Return the processed text to the caller */
    return processedText;
  }; 
  /* This routine takes a template string and returns the 
     modified string to the caler */  
  static replaceTemplateStringsLowLevel(textToProcess, ...replacements) {
    /* Declare and define a few local variables */
    let processedText = textToProcess;
    let replacementsLength = replacements.length;
    /* Check that there are enough replacements */
    if (replacementsLength <= 0) {
      let errorText = 'Not enough replacements passed to replaceTemplateStringsLowLevel';
      HDLmAssert(false, errorText);
    }
    /* Handle each of the replacements */
    let replacementIndex = 0;
    while (replacementIndex < replacementsLength) {
      let replacement = replacements[replacementIndex];
      let replacementcount = (processedText.match(/{{[^}]*}}/g) || []).length;
      processedText = processedText.replace(/{{[^}]*}}/, replacement);
      replacementIndex++;
    }
    /* Return the processed text to the caller */
    return processedText;
  };  
  /* This routine sends a WebSockets execute request to the main
     WebSockets routine. The headers and body objects are passed
     in. The response from the server is returned to the caller. */
  static async sendWebSocketsExecuteRequest(bodyObj, versionAI) {
    /* Declare and define a few local variables */
    let typeStr;
    let webSocketsResponse = null;
    let versionStr;
    /* Set the AI type string based on the AI version passed in */
    if (versionAI == 'OpenAINew')
      typeStr = 'new';
    else if (versionAI == 'OpenAIOld')
      typeStr = 'old';
    else if (versionAI == 'OpenRouterV1')
      typeStr = 'V1';
    else if (versionAI == 'OpenRouterV2')
      typeStr = 'V2';
    else if (versionAI == 'OpenRouterV3')
      typeStr = 'V3';
    else if (versionAI == 'OpenRouterV4')
      typeStr = 'V4';
    else if (versionAI == 'openRouterWpiWIV1')
      typeStr = 'Wpi';
    else if (versionAI == 'openRouterWpsWIV1')
      typeStr = 'Wps';
    else if (versionAI == 'openRouterWsiWIV1')
      typeStr = 'Wsi';
    /* Set the AI version string based on the AI version passed in */
    if (versionAI == 'OpenAINew' || 
        versionAI == 'OpenAIOld')
      versionStr = 'OpenAI';
    else if (versionAI == 'OpenRouterV1'      || 
             versionAI == 'OpenRouterV2'      ||
             versionAI == 'OpenRouterV3'      ||
             versionAI == 'OpenRouterV4'      ||
             versionAI == 'openRouterWpiWIV1' ||
             versionAI == 'openRouterWpsWIV1' ||
             versionAI == 'openRouterWsiWIV1')
      versionStr = 'OpenRouter';
    /* Get the start time for the WebSockets call */
    let startTime = Date.now();  
    /* Send the WebSockets execute request */
    /* console.log(`In HDLmAI.sendWebSocketsExecuteRequest: Sending WebSockets request for ${versionStr} ${typeStr}`); */
    webSocketsResponse = await HDLmWebSockets.executeAIRequest(bodyObj, versionStr, typeStr);
    /* Get the end time for the WebSockets call */
    let endTime = Date.now();
    let webSocketsDuration = endTime - startTime;
    console.log(`HDLmAI.sendWebSocketsExecuteRequest: WebSockets took ${webSocketsDuration} ms`);
    /* Build the required Promise for return to the caller */
    let webSocketsPromise = new Promise(function (resolve, reject) {
      resolve(webSocketsResponse);
    });
    /* Return the Promise to the caller */
    return webSocketsPromise;
  };
}
/* The following field points to the context prompt that is 
   passed to AI (client and server)*/ 
HDLmAI.contextBothPrompt = null;
/* The following header is passed to Open AI to provide authentication.
   The header contains the API key needed to access OpenAI services. This
   header is used in fetch calls to Open AI services. */
HDLmAI.openAIAuthHeader = null;
/* The following headers are passed to Open AI to provide information
   that Open AI services need */
HDLmAI.openAIHeaders = null;
/* The following header is passed to Open AI to provide content type 
   information. The header contains the content type needed to access
   Open AI services. This header is used in fetch calls to Open AI 
   services. */
HDLmAI.openAITypeHeader = null;
/* The following header is passed to Open Router to provide authentication.
   The header contains the API key needed to access Open Router services. This
   header is used in fetch calls to Open Router services. */
HDLmAI.openRouterAuthHeaderV1 = null;
/* The following headers are passed to Open Router to provide information
   that Open Router services need */
HDLmAI.openRouterHeadersV1 = null;
/* The following header is passed to Open Router to provide content type 
   information. The header contains the content type needed to access
   Open Router services. This header is used in fetch calls to Open Router 
   services. */
HDLmAI.openRouterTypeHeaderV1 = null;
/* The following field points to the clientwebpage prompt that is 
   passed to AI */ 
HDLmAI.webpageClientPrompt = null;
/* The following field points to the webpage we are trying  
   to improve. This field is used in fetch calls to various 
   services. */
HDLmAI.targetWebpageContents = null;