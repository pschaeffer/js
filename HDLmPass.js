/**
 * HDLmPass short summary.
 *
 * HDLmPass description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following array has all of the field names. These are the
   field names in an ignore details instance or a line details 
   instance. The field names are in standard format. The first 
   character is lowercase. If these field names are going to be 
   used as headings, then the first character of each field name
   should be changed to uppercase. */
const HDLmPassFieldNames = ["createdFromVerificationCheck",
                            "scriptId",
                            "testCase",
                            "stepNumber",
                            "description",
                            "language",
                            "ticketPackage",
                            "testResults",
                            "detailsOne",
                            "detailsTwo",
                            "detailsThree"      
                           ];
/* The following array has all of the field types. These are the
   field types in a line details instance.  */
const HDLmPassFieldTypes = ["date",
                            "number",
                            "number",
                            "number",
                            "text",
                            "text",
                            "text",
                            "text",
                            "text",
                            "text",
                            "text"
                           ];
/* The following JSON data structure is used to build the editor
   for each type of pass-through definition. The pass-through type 
   is used as the property name to obtain each set of pass-through data. */
const HDLmPassInfoData =
{  
  "companies":   {
    "fields":
      [
        {
          "description": "Companies Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passcompaniesname"
        },
        {
          "description": "Companies Count",
          "source":      "countCompanies",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        }
      ]
  },
  "company":     {
    "fields":
      [
        {
          "description": "Company Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "companypassname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Pass-Through Status",
          "source":      "passThru",
          "fieldtype":   "boolean",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Created",
          "source":      "created",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Last Modified",
          "source":      "lastmodified",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        }
      ]
  },
  "data": {
    "fields":
      [
        {
          "description": "Data Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passdataname"
        },
        {
          "description": "Divisions Count",
          "source":      "countDivisions",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        }
      ]
  },
  "division": {
    "fields":
      [
        {
          "description": "Division Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passdivisionname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Created",
          "source":      "created",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Last Modified",
          "source":      "lastmodified",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Site Count",
          "source":      "countSites",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        }
      ]
  },
  "ignore":      {
    "fields":
      [
        {
          "description": "Ignore-List Entry Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passlistentryname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Created",
          "source":      "created",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Last Modified",
          "source":      "lastmodified",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Created From Verification",
          "source":      "createdFromVerificationCheck",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Script ID",
          "source":      "scriptId",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Test Case",
          "source":      "testCase",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Step Number",
          "source":      "stepNumber",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Description",
          "source":      "description",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Language",
          "source":      "language",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Ticket Package",
          "source":      "ticketPackage",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Test Results",
          "source":      "testResults",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details One",
          "source":      "detailsOne",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details Two",
          "source":      "detailsTwo",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details Three",
          "source":      "detailsThree",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        }
      ]
  },
  "line":        {
    "fields":
      [
        {
          "description": "Line Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passlineentryname"
        },
        {
          "description": "Created From Verification",
          "source":      "createdFromVerificationCheck",
          "fieldtype":   "iotext",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Script ID",
          "source":      "scriptId",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        },
        {
          "description": "Test Case",
          "source":      "testCase",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        },
        {
          "description": "Step Number",
          "source":      "stepNumber",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        },
        {
          "description": "Description",
          "source":      "description",
          "fieldtype":   "iotext",
          "subtype":     "ootextemptyok"
        },
        {
          "description": "Language",
          "source":      "language",
          "fieldtype":   "iotext",
          "subtype":     "ootextemptyok"
        },
        {
          "description": "Ticket Package",
          "source":      "ticketPackage",
          "fieldtype":   "iotext",
          "subtype":     "ootextemptyok"
        },
        {
          "description": "Test Results",
          "source":      "testResults",
          "fieldtype":   "iotext",
          "subtype":     "ootextemptyok"
        },
        {
          "description": "Details One",
          "source":      "detailsOne",
          "fieldtype":   "iotext",
          "subtype":     "ootextemptyok"
        },
        {
          "description": "Details Two",
          "source":      "detailsTwo",
          "fieldtype":   "iotext",
          "subtype":     "ootextemptyok"
        },
        {
          "description": "Details Three",
          "source":      "detailsThree",
          "fieldtype":   "iotext",
          "subtype":     "ootextemptyok"
        }
      ]
  },
  "lines": {
    "fields":
      [
        {
          "description": "Lines Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passlinesentryname"
        },
        {
          "description": "Line Count",
          "source":      "countLines",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        },
        {
          "description": "Lines Table",
          "source":      "dummyTable",
          "fieldtype":   "iotable",
          "subtype":     "ootableemptynotok"
        }
      ]
  },  
  "list": {
    "fields":
      [
        {
          "description": "Ignore-List Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passlistname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Created",
          "source":      "created",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Last Modified",
          "source":      "lastmodified",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Ignores Count",
          "source":      "countIgnores",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        }
      ]
  },
  "lists":       {
    "fields":
      [
        {
          "description": "Ignore-Lists Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passlistsname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Created",
          "source":      "created",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Last Modified",
          "source":      "lastmodified",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Lists Count",
          "source":      "countLists",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        }
      ]
  },
  "newcompgem": {
    "fields":
      [
        {
          "description": "Company Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablecompgemname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        }
      ]
  },
  "newcompgxe": {
    "fields":
      [
        {
          "description": "Company Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablecompgxename"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
      ]
  },
  "newcomppass": {
    "fields":
      [
        {
          "description": "Company Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablecomppassname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
      ]
  },
  "newdivision": { 
    "fields":
      [
        {
          "description": "Division Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editabledivisionname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },        
      ]
  },
  "newignore":   {
    "fields":
      [
        {
          "description": "Ignore-List Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablepasslistentryname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Created From Verification",
          "source":      "createdFromVerificationCheck",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Script ID",
          "source":      "scriptId",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Test Case",
          "source":      "testCase",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Step Number",
          "source":      "stepNumber",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Description",
          "source":      "description",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Language",
          "source":      "language",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Ticket Package",
          "source":      "ticketPackage",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Test Results",
          "source":      "testResults",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details One",
          "source":      "detailsOne",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details Two",
          "source":      "detailsTwo",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        },
        {
          "description": "Details Three",
          "source":      "detailsThree",
          "fieldtype":   "iotext",
          "subtype":     "matchvalue"
        }
      ]
  },
  "newlist": {
    "fields":
      [
        {
          "description": "Ignore-List Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablepasslistname"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
      ]
  },  
  "newmod": { 
    "fields":
      [
        {
          "description": "Modification Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablemodificationname"
        },
        {
          "description": "Modification Path Value",
          "source":      "pathvalue",
          "fieldtype":   "pathvalue",
          "subtype":     "Path Value"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Extra Information",
          "source":      "extra",
          "fieldtype":   "extrainfo",
          "subtype":     "extra"
        },
        {
          "description": "Use Mode",
          "source":      "usemode",
          "fieldtype":   "usemode",
          "subtype":     "usemode"
        },
        {
          "description": "CSS Selector",
          "source":      "cssselector",
          "fieldtype":   "cssinfo",
          "subtype":     "cssselector"
        },
        {
          "description": "XPath Information",
          "source":      "xpath",
          "fieldtype":   "xpathinfo",
          "subtype":     "xpath"
        },
        {
          "description": "Find Information",
          "source":      "find",
          "fieldtype":   "findinfo",
          "subtype":     "find"
        },
        {
          "description": "Node Identifier",
          "source":      "nodeiden",
          "fieldtype":   "nodeiden",
          "subtype":     "nodeiden"
        },
        {
          "description": "Modification Enabled",
          "source":      "enabled",
          "fieldtype":   "checkbox",
          "subtype":     "checkbox"
        },
        {
          "description": "Parameter Number",
          "source":      "parameter",
          "fieldtype":   "ionumber",
          "subtype":     "editableparameter"
        },
        {
          "description": "Modification Type",
          "source":      "type",
          "fieldtype":   "typelist",
          "subtype":     "editableruletypelist"
        }
      ]
    },  
  "newsite": { 
    "fields":
      [
        {
          "description": "Site Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editablesitename"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },        
      ]
  },
  "newvalue": { 
    "fields":
      [
        {
          "description": "Data Value Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "editabledatavaluename"
        },    
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Data value",
          "source":      "value",
          "fieldtype":   "iotext",
          "subtype":     "datavalue"
        }
      ]
  },
  "report":      {
    "fields":
      [
        {
          "description": "Report Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passreportname"
        },
        {
          "description": "Report Type",
          "source":      "reportType",
          "fieldtype":   "iotext",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Created",
          "source":      "created",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Line Count",
          "source":      "countLines",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        },
        {
          "description": "Report Table",
          "source":      "dummyTable",
          "fieldtype":   "iotable",
          "subtype":     "ootableemptynotok"
        }
      ]
  },
  "reports": {
    "fields":
      [
        {
          "description": "Reports Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passreportsname"
        },
        {
          "description": "Reports Count",
          "source":      "countReports",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        }
      ]
  },
  "rules": {
    "fields":
      [
        {
          "description": "Rules Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passrulesname"
        },
        {
          "description": "Divisions Count",
          "source":      "countDivisions",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        }
      ]
  },
  "site": {
    "fields":
      [
        {
          "description": "Site Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passsitename"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Created",
          "source":      "created",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Last Modified",
          "source":      "lastmodified",
          "fieldtype":   "datetime",
          "subtype":     "ootextemptynotok"
        },
        {
          "description": "Rules Or Values Count",
          "source":      "countRulesOrValues",
          "fieldtype":   "ionumber",
          "subtype":     "oonumberemptynotok"
        }
      ]
  },
  "top": {
    "fields":
      [
        {
          "description": "Top Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "passtopname"
        },
        {
          "description": "Pass-Through Status",
          "source":      "passThru",
          "fieldtype":   "boolean",
          "subtype":     "companypassname"
        },
      ]
  },
  "value": { 
    "fields":
      [
        {
          "description": "Data Value Name",
          "source":      "name",
          "fieldtype":   "iotext",
          "subtype":     "datavaluename"
        },
        {
          "description": "Comments",
          "source":      "comments",
          "fieldtype":   "comminfo",
          "subtype":     "comments"
        },
        {
          "description": "Created",
          "source":      "created",
          "fieldtype":   "dateio",
          "subtype":     "outputdate"
        },
        {
          "description": "Last Modified",
          "source":      "lastmodified",
          "fieldtype":   "dateio",
          "subtype":     "outputdate"
        },
        {
          "description": "Data value",
          "source":      "value",
          "fieldtype":   "iotext",
          "subtype":     "datavalue"
        }
      ]
  },
}
/* The information needed to build reports is provided by the 
   structure below. This structure is indexed by the current 
   report type. */
const HDLmPassReportData =
{
  "Check error": {
    "fields":
      [
        { "description":                  "Type" },
        { "testResults":                  "Value" }
      ]
  },
  "Check website": {
    "fields":
      [
        { "createdFromVerificationCheck": "CreatedFromVerificationCheck" },
        { "scriptId":                     "ScriptId" },
        { "testCase":                     "TestCase" },
        { "stepNumber":                   "StepNumber" },
        { "description":                  "Description" },
        { "language":                     "Language" },
        { "ticketPackage":                "TicketPackage" },
        { "testResults":                  "TestResults" },
        { "detailsOne":                   "DetailsOne" },
        { "detailsTwo":                   "DetailsTwo" },
        { "detailsThree":                 "DetailsThree" }
      ]
  }
}
class HDLmPass {
  /* This routine adds any missing fields to a pass-through object. 
     The possibly missing fields depend on the object type. The 
     possibly missing fields are highly dependent on the object
     type. */ 
  static addMissingPassObject(newPass) {
    /* Add any missing fields to the pass-through object  
       (actually a modification object) passed by the caller */
    if (!newPass.hasOwnProperty('type'))
      return;
    /* Check for a companies level object. Add any needed 
       fields as need be. */
    if (newPass.type == HDLmDefines.getString('HDLMCOMPANIESTYPE')) {
      let newType = HDLmDefines.getString('HDLMCOMPANIESTYPE');
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countCompanies');  
    }
    /* Check for a company level object. Add any needed 
       fields as need be. */
    if (newPass.type == HDLmDefines.getString('HDLMCOMPANYTYPE')) {   
      let newType = HDLmDefines.getString('HDLMCOMPANYTYPE');
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, '');   
      /* If the pass-through property does not already exist,
         create the pass-through property */
      if (!newPass.details.hasOwnProperty('passThru')) {
        newPass.details.passThru = false;
      }      
    }
    /* Check for a data (zero, one, or more divisions) level object. 
       Add any needed fields as need be. */
    if (newPass.type == HDLmDefines.getString('HDLMDATATYPE')) {      
      let newType = HDLmDefines.getString('HDLMDATATYPE');
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countDivisions');        
    }
    /* Check for a division (zero, one, or more sites) level object. 
       Add any needed fields as need be. */
    if (newPass.type == HDLmDefines.getString('HDLMDIVISIONTYPE')) {
      let newType = HDLmDefines.getString('HDLMDIVISIONTYPE');
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countSites'); 
    }   
    /* Check for an ignore-list entry object. Add any needed 
        fields as need be. */
    if (newPass.type == 'ignore') {
      let newType = 'ignore';
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, '');         
      /* We need to make sure all of the fields are defined as
         properties */
      let fieldNames = HDLmPass.getPassFieldNames();
      for (let fieldName of fieldNames) {
        if (!newPass.details.hasOwnProperty(fieldName)) {
          newPass.details[fieldName] = '';
        }
      }
    }
    /* Check for a line (just one line) level object. Add any needed 
       fields as need be. */
    if (newPass.type == 'line') {
      let newType = 'line';
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, '');    
      /* We need to make sure all of the fields are defined as
         properties */
      let fieldNames = HDLmPass.getPassFieldNames();
      let fieldCounter = -1;
      for (let fieldName of fieldNames) {
        fieldCounter += 1;
        /* Fix each type of field */
        let fieldType = HDLmPassFieldTypes[fieldCounter];
        /* Check for, and handle a date field */
        if (fieldType == 'date') {
          if (!newPass.details.hasOwnProperty(fieldName) ||
              newPass.details[fieldName] == '') {
            newPass.details[fieldName] = new Date();
          }
        }
        /* Check for, and handle a numeric field */
        if (fieldType == 'number') {
          if (!newPass.details.hasOwnProperty(fieldName) ) {
            newPass.details[fieldName] = 0;  
          }
        }
        /* Check for, and handle a text field */
        if (fieldType == 'text') {
          if (!newPass.details.hasOwnProperty(fieldName)) {
            newPass.details[fieldName] = '';
          }
        }
      }            
    }
    /* Check for a lines (zero, one, or more lines) level object. 
       Add any needed fields as need be. */
    if (newPass.type == 'lines') {
      let newType = 'lines'; 
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countLines');
      if (!newPass.details.hasOwnProperty('dummyTable') ||
          newPass.details.dummyTable == '') {
        newPass.details.dummyTable = 'dummyTable';
      }
    }
    /* Check for an ignore-list (list) level object. Add any needed 
       fields as need be. */
    if (newPass.type == 'list') {
      let newType = 'list'; 
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countIgnores');
    }
    /* Check for an ignore-lists (lists) level object. Add any needed 
       fields as need be. */
    if (newPass.type == 'lists') {
      let newType = 'lists'; 
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countLists');
    }
    /* Check for a report (just one report) level object. Add any needed 
       fields as need be. */
    if (newPass.type == 'report') {
      let newType = 'report';
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countLines');
      /* If the pass-through property does not already exist,
         create the pass-through property */
      if (!newPass.details.hasOwnProperty('passThru')) {
        newPass.details.passThru = false;
      }
      if (!newPass.details.hasOwnProperty('dummyTable') ||
          newPass.details.dummyTable == '') {
        newPass.details.dummyTable = 'dummyTable';
      }
    }
    /* Check for a reports (zero, one, or more reports) level object. 
       Add any needed fields as need be. */
    if (newPass.type == 'reports') {
      let newType = 'reports';
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countReports');  
    }
    /* Check for a rules (zero, one, or more divisions) level object. 
       Add any needed fields as need be. */
    if (newPass.type == HDLmDefines.getString('HDLMRULESTYPE')) {
      let newType = HDLmDefines.getString('HDLMRULESTYPE');
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countDivisions');    
    } 
    /* Check for a site (zero, one, or more ruless) level object. 
       Add any needed fields as need be. */
    if (newPass.type == HDLmDefines.getString('HDLMSITETYPE')) {
      let newType = HDLmDefines.getString('HDLMSITETYPE');
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, 'countRulesOrValues');    
    }    
    /* Check for a top-level object. Add any needed 
       fields as need be. */
    if (newPass.type == HDLmDefines.getString('HDLMTOPTYPE')) {
      let newType = HDLmDefines.getString('HDLMTOPTYPE');
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, '');   
      /* If the pass-through property does not already exist,
         create the pass-through property */
      if (!newPass.details.hasOwnProperty('passThru')) {
        newPass.details.passThru = false;
      }
    } 
    /* Check for a value (a data value) level object. 
       Add any needed fields as need be. */
    if (newPass.type == HDLmDefines.getString('HDLMVALUETYPE')) {
      let newType = HDLmDefines.getString('HDLMVALUETYPE');
      /* Add a set of default values to the pass object */
      HDLmPass.addMissingPassObjectDefault(newPass, newType, '');
      /* Set the value field to an empty string if it does not exist */
      if (!newPass.details.hasOwnProperty('value')) {
        newPass.details.value = '';
      }
    }
  }
  /* Set a bunch of default values is pass object (really a 
     modification) */
  static addMissingPassObjectDefault(newPassTreeNode, newType, countFieldName) {
    /* Create the node path field, if need be. The node path 
       field is only created if it does not exist. */
    if (!newPassTreeNode.hasOwnProperty('nodePath')) {
      newPassTreeNode.nodePath = [];
    }
    if (!newPassTreeNode.hasOwnProperty('details')) {
      newPassTreeNode.details = {};
    }
    if (!newPassTreeNode.details.hasOwnProperty('type')) {
      newPassTreeNode.details.type = newType;
    }
    if (!newPassTreeNode.details.hasOwnProperty('name')) {
      let newPassTreeNodeNodePathLength = newPassTreeNode.nodePath.length;
      if (newPassTreeNodeNodePathLength > 0) {
        let lastNodePathValue = newPassTreeNode.nodePath[newPassTreeNodeNodePathLength - 1];
        newPassTreeNode.details.name = lastNodePathValue;
      }
    }
    if (!newPassTreeNode.details.hasOwnProperty('enabled')) {
      newPassTreeNode.details.enabled = true;
    }
    if (!newPassTreeNode.details.hasOwnProperty('comments')) {
      newPassTreeNode.details.comments = '';
    }
    if (!newPassTreeNode.details.hasOwnProperty('updated')) {
      newPassTreeNode.details.updated = false;
    }
    /* Create the children array if need be */
    if (typeof newPassTreeNode.children == 'undefined')
      newPassTreeNode.children = [];
    /* Set the count field, if need be */
    if (countFieldName != '') {
      if (!newPassTreeNode.details.hasOwnProperty(countFieldName)) {
        newPassTreeNode.details[countFieldName] = newPassTreeNode.children.length;
      }
    }
    /* Set or reset the created and last modified fields */
    if (!newPassTreeNode.details.hasOwnProperty('created') ||
        newPassTreeNode.details.created == '') {
      newPassTreeNode.details.created = new Date();
    }
    if (!newPassTreeNode.details.hasOwnProperty('lastmodified') ||
        newPassTreeNode.details.lastmodified == '') {
      newPassTreeNode.details.lastmodified = new Date();
    }
  }
  /* Build a pass-through related object from the values passed 
     by the caller. This code is called for companies, ignore-lists,
     and ignore-list entries (and other things as well). */ 
  static buildPassObject(name, type) {
    /* Construct the new pass-through related object. This is actually
       a modification object used to build a pass-through related 
       object. */
    /* Get the prefixes of the current type */ 
    let firstThreeChars = type.substring(0, 3); 
    let firstSevenChars = type.substring(0, 7);
    /* Check if the caller asked for a new modification object.
       This request is handled here. */
    if (firstThreeChars == 'new') {
      let modificationEnabledTrue = true;
      let modificationExtraEmpty = '';
      let newMod = new HDLmMod(name, modificationExtraEmpty, modificationEnabledTrue, type);
      /* Check if we are creating some sort of new company object. 
         All company objects have certain fields in common. */
      if (firstSevenChars == 'newcomp') {
        newMod.comments = '';
      }
      /* Check if the caller asked for a new division object. This request
         is handled here. */
      if (type == 'newdivision') {
        newMod.comments = '';
        newMod.countSites = 0;
      } 
      /* Build a new modification (rule) object. Set a few fields to
         default values. */
      if (type == 'newmod') {
        let modificationCommentsEmpty = '';
        let modificationCssEmpty = '';
        let modificationExtraEmpty = '';
        let modificationEnabledTrue = true;
        let modificationFindsEmpty = [];
        let modificationName = name;
        let modificationNodeIdenEmpty = '';
        let modificationParameterNumberNull = null;
        let modificationPathStringEmpty = '';
        let modificationType = type;
        let modificationUseModeEmpty = '';
        let modificationXpathEmpty = '';
        newMod = HDLmMod.buildModificationObject(modificationName, modificationPathStringEmpty, 
                                                 modificationExtraEmpty, modificationEnabledTrue,
                                                 modificationCssEmpty, modificationXpathEmpty, 
                                                 modificationFindsEmpty, modificationNodeIdenEmpty, 
                                                 modificationType, modificationParameterNumberNull, 
                                                 modificationCommentsEmpty, modificationUseModeEmpty);
      }
      /* Check if the caller asked for a new site object. This request
         is handled here. */
      if (type == 'newsite') {
        newMod.comments = '';
        newMod.countRulesOrValues = 0;
      }   
      return newMod;
    }   
    /* Check if the caller asked for a new ignore object. This request
       get delagated to another routine. */
    if (type == 'newignore') {
      let newIgnore = HDLmIgnore.buildIgnoreObject(name, type);
      return newIgnore;
    }
    /* Check if the caller asked for a new modification object.
       This request is handled here. */
    if (type == 'newmod') {
      let modificationCommentsEmpty = '';
      let modificationCssEmpty = '';
      let modificationExtraEmpty = '';
      let modificationEnabledTrue = true;
      let modificationFindsEmpty = [];
      let modificationNodeIdenEmpty = '';
      let modificationParameterNumberNull = null;
      let modificationPathStringEmpty = '';
      let modificationUseModeEmpty = '';
      let modificationXpathEmpty = '';
      let newMod = HDLmMod.buildModificationObject(name, modificationPathStringEmpty, 
                                                   modificationExtraEmpty, modificationEnabledTrue, 
                                                   modificationCssEmpty, modificationXpathEmpty, 
                                                   modificationFindsEmpty, modificationNodeIdenEmpty, 
                                                   type, modificationParameterNumberNull,
                                                   modificationCommentsEmpty, modificationUseModeEmpty);
      return newMod;
    } 
    /* Check if the caller asked for a new value (data value) object.
       This request is handled here. */
    if (type == 'newvalue') {
      let buildValueExtraEmpty = '';
      let newValue = HDLmMod.buildValueObject(name, buildValueExtraEmpty, type);
      return newValue;
    } 
  }
  /* This routine is called to check an ignore-list name for 
     possible disallowed values. If the ignore-list name is OK,
     then this routine returns true. If the ignore-list name is
     not OK, then this routine returns false. */
  static checkName(name) {
    /* The following array will have the list of names that can
       not be used for ignore-lists. Generally, ignore-lists can 
       have any name. However, a few possible names are not allowed
       because of conflicts with the standard names of lines objects 
       that are associated with reports. */
    let disallowedNames = [];
    disallowedNames.push(HDLmDefines.getString('HDLMINVALIDNODENAME'));
    disallowedNames.push(HDLmDefines.getString('HDLMOVERALLNODENAME'));
    disallowedNames.push(HDLmDefines.getString('HDLMVALIDNODENAME'));    
    return !(disallowedNames.indexOf(name) >= 0);
  }
  /* Get the list of field names in the details of a line (report 
     line) or in the details of an ignore (ignore-list entry). The
     field names are the same in each case. */
  static getPassFieldNames() {
    return HDLmPassFieldNames;
  }
  /* Get the list of pass-through types supported by this code. The
     list of types is returned to the caller as an array. Note that
     we don't have any pass-through types at this time. */
  static getPassTypeList() {
    return [];
  }
  /* Return the pass-through information to the caller */
  static get HDLmPassInfo() {
    return HDLmPassInfoData;
  }
  /* Get the information needed to build an HTML table from the 
     contents of a report. The information returned by this call
     depends on the current report type. The caller provides the
     report type. */
  static getPassReportFields(reportType) {
    /* Check if the report type has field information available */
    if (!HDLmPassReportData.hasOwnProperty(reportType)) {
      let errorText = `Report type (${reportType}) not found in report data`;
      HDLmAssert(false, errorText);
    }
    return HDLmPassReportData[reportType].fields;
  }
}