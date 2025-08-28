/**
 * Class for supporting HTML modifications
 *
 * The comments below apply mostly to the case where modifications are used
 * to store and/or represent actual HTML modifications. However, this code 
 * is also used to handle new companies, divisions, and sites for HTML
 * modfications. This code is also used to handle proxy definitions and
 * configuration values and stored values and ignore-lists. 
 * 
 * Each instance of this class describes one HTML modification. The instance
 * has information about how to find the HTML element (or elements) that need
 * to be changed. The instance also describes the change that must be made.
 *
 * This class has a constructor that builds an instance from values describing
 * an instance. The class is designed so that the modifications can be quickly
 * applied. The conversion from values to a class instance may not be fast at all.
 *
 * This class also has methods for applying a modification to a set of HTML. The
 * apply method(s) find the HTML elements that need to be modified and change them
 * as need be.
 * 
 * This class and the UI widgets follow a set of rules that should hopefully make
 * them consistent for users. The rules are.
 *  
 *   1. If a UI widget displays a list of entries (zero or more) then some type of
 *      new entry field (or fields) are provided for adding additional entries. The
 *      number of new entry fields will be more than one, if each entry in the list
 *      of entries, has more than one field. If each entry is the list of entries has
 *      just one field, then only one new entry field will be provided.
 *      
 *   2. The contents of the new entry field or new entry fields will not be moved 
 *      into the list of entries unless the new entry field or fields are valid. As
 *      long as any errors are detected in the new entry field or fields, the contents
 *      of the new entry field or fields will not be moved into the list of entries.
 *      
 *   3. The only way to move the contents of the new entry field or fields to the 
 *      list of entries is by pressing the Enter key. Of course, the new entry field
 *      or fields will be checked for any errors, before it or they are moved.
 *   
 *   4. All fields, including lists of fields (that may or may not be empty) are 
 *      checked for errors before they are displayed. Any and all fields that have
 *      errors will be displayed with some kind of error indication.    
 *      
 *   5. In all cases, data will only be sent from a UI widget to the actual data if
 *      the data in the UI widget is valid (no errors). If the data in the UI widget
 *      is a list of some kind, every entry in the list must be valid.
 *      
 *   6. An error will be displayed, if the contents of any field or fields is/are invalid.
 *      There is one major exception to this rules. If a field is empty, then no error
 *      will be displayed, if empty is an acceptable value for the field or fields. If
 *      empty is not acceptable, for a field or fields, an error will be displayed if
 *      the field or fields are empty. 
 *      
 *   7. The Delete key does one of several things. If the Delete key is used with an 
 *      entry in a list, then the list entry will be deleted. If the Delete key is 
 *      used with a new entry field or new entry fields, then the contents will be 
 *      reset to empty. If the Delete key is used with an ordinary field (that is not
 *      a new entry field or fields and not an entry in a list), then the contents will
 *      be reset to empty.
 *      
 *   8. The UI widgets invoke the JavaScript trim function before attempting to validate
 *      a field. The validation routines must handle all case matching issues. This means
 *      that all blanks before and after RED must be stripped by the UI widgets. However, 
 *      the validation routine must make sure that RED, Red, and red are all handled the
 *      same.
 *      
 *   9. The modifications editor supports two types of images. The first type of image is
 *      actually a standard image that uses the <img> tag. The second type of image is a
 *      CSS background-image that is typically implemented using CSS. The second type of
 *      image can also be implemented using the style HTML attribute. 
 *      
 *      The first type of image (using the <img> tag) is supported by the image modification
 *      type. The second type of image is supported as a style modifications. Of course, if
 *      a style modification is used, then the style type must be set to background-image.
 *      
 *      Both types of images are stored internally as URLs. The 'http:' or 'https:' prefix
 *      is not stored as part of these URLs. The 'https:' prefix is added later when a URL
 *      is actually used.  
 *      
 *  10. The inline editors can not be used to create certain kinds of rules. For example, 
 *      order rules can not be created using the any of the inline editors. 
 *      
 *  11. If a rule is no longer associated with (fires for) some DOM element, then the 
 *      rule can not be deleted using any of the inline editors. The rule must be deleted 
 *      using the main rule editor.
 *      
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following JSON data structure is used to build the editor
   for each type of modification. The modification type is used
   as the property name to obtain each set of modification data. */
const HDLmModInfoData =
  {
    "attribute":     { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extraAttribute"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         }
                       ]
                     },
    "changeattrs":   { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Change Attributes Values",
                           "source":        "changeattrsvalues",
                           "fieldtype":     "textlist",
                           "subtype":       "changeattrs",
                           "datatype":      "array"
                         }
                       ]
                     },
    "changenodes":   { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Change Nodes Values",
                           "source":        "changenodesvalues",
                           "fieldtype":     "textlist",
                           "subtype":       "changenodes",
                           "datatype":      "array"
                         }
                       ]
                     },
    "extract":       { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         }
                       ]
                     },
    "fontcolor":     { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Font Colors",
                           "source":        "colors",
                           "fieldtype":     "colorlist",
                           "subtype":       "colors",
                           "datatype":      "array"
                         }
                       ]
                     },
    "fontfamily":    { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Font Families",
                           "source":        "families",
                           "fieldtype":     "textlist",
                           "subtype":       "fontfamily",
                           "datatype":      "array"
                         }
                       ]
                     },
    "fontkerning":   { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",                       
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Font Kernings",
                           "source":        "kernings",
                           "fieldtype":     "textlist",
                           "subtype":       "fontkerning",
                           "datatype":      "array"
                         }
                       ]
                     },
    "fontsize":      { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Font Sizes",
                           "source":        "sizes",
                           "fieldtype":     "textlist",
                           "subtype":       "fontsize",
                           "datatype":      "array"
                         }
                       ]
                     },
    "fontstyle":     { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Font Styles",
                           "source":        "styles",
                           "fieldtype":     "textlist",
                           "subtype":       "fontstyle",
                           "datatype":      "array" 
                         }
                       ]
                     },
    "fontweight":    { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Font Weights",
                           "source":        "weights",
                           "fieldtype":     "textlist",
                           "subtype":       "fontweight",
                           "datatype":      "array"
                         }
                       ]
                     },
    "height":        { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },              
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Heights",
                           "source":        "heights",
                           "fieldtype":     "textlist",
                           "subtype":       "height",
                           "datatype":      "array"
                         }
                       ]
                     },
    "image":         { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Images",
                           "source":        "images",
                           "fieldtype":     "imagelist",
                           "subtype":       "images",
                           "datatype":      "array"
                         }
                       ]
                     },
    "modify":        { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         }
                       ]
                     },      
    "notify":        { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Extract Targets",
                           "source":        "targets",
                           "fieldtype":     "textlist",
                           "subtype":       "target",
                           "datatype":      "array"
                         }
                       ]
                     },
    "order":         { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Order Information",
                           "source":        "orders",
                           "fieldtype":     "textlist",
                           "subtype":       "order",
                           "datatype":      "array"
                         }
                       ]
                     },    
  "remove":          { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Remove Values",
                           "source":        "removevalues",
                           "fieldtype":     "textlist",
                           "subtype":       "remove",
                           "datatype":      "array"
                         }
                       ]     
                     },
  "replace":         { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         }, 
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Replace Values",
                           "source":        "replacevalues",
                           "fieldtype":     "textlist",
                           "subtype":       "replace",
                           "datatype":      "array"
                         }
                       ]
                     },
  "script":          { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New JS Scripts",
                           "source":        "scripts",
                           "fieldtype":     "textlist",
                           "subtype":       "script",
                           "datatype":      "array"
                         }
                       ]
                     },
  "style":           { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extraStyle"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Style Information",
                           "source":        "styles",
                           "fieldtype":     "textlist",
                           "subtype":       "style",
                           "datatype":      "array"
                         }
                       ]
                     },
    "text":          { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Texts",
                           "source":        "newtexts",
                           "fieldtype":     "textlist",
                           "subtype":       "text",
                           "datatype":      "array"
                         }
                       ]
                     },
    "textchecked":   { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Texts",
                           "source":        "newtexts",
                           "fieldtype":     "textlist",
                           "subtype":       "textchecked",
                           "datatype":      "array"
                         }
                       ]
                     },
    "title":         { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Titles",
                           "source":        "titles",
                           "fieldtype":     "textlist",
                           "subtype":       "title",
                           "datatype":      "array"
                         }
                       ]
                     },
    "visit":         { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Visit Values",
                           "source":        "visitvalues",
                           "fieldtype":     "textlist",
                           "subtype":       "visit",
                           "datatype":      "array"
                         }
                       ]
                     },
    "width":         { "fields":
                       [
                         {
                           "description":   "Modification Name",
                           "source":        "name",
                           "fieldtype":     "iotext",
                           "subtype":       "modificationname"
                         },
                         {
                           "description":   "Modification Path Value",
                           "source":        "pathvalue",
                           "fieldtype":     "pathvalue",
                           "subtype":       "Path Value"
                         },
                         {
                           "description":   "Comments",
                           "source":        "comments",
                           "fieldtype":     "comminfo",
                           "subtype":       "comments"
                         },
                         {
                           "description":   "Extra Information",
                           "source":        "extra",
                           "fieldtype":     "extrainfo",
                           "subtype":       "extra"
                         },
                         {
                           "description":   "Probability",
                           "source":        "probability",
                           "fieldtype":     "float",
                           "subtype":       "probability"
                         },
                         {
                           "description":   "Use Mode",
                           "source":        "usemode",
                           "fieldtype":     "usemode",
                           "subtype":       "usemode"
                         },
                         {
                           "description":   "Created",
                           "source":        "created",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "Last Modified",
                           "source":        "lastmodified",
                           "fieldtype":     "dateio",
                           "subtype":       "outputdate"
                         },
                         {
                           "description":   "CSS Selector",
                           "source":        "cssselector",
                           "fieldtype":     "cssinfo",
                           "subtype":       "cssselector"
                         },
                         {
                           "description":   "XPath Information",
                           "source":        "xpath",
                           "fieldtype":     "xpathinfo",
                           "subtype":       "xpath"
                         },
                         {
                           "description":   "Find Information",
                           "source":        "find",
                           "fieldtype":     "findinfo",
                           "subtype":       "find"
                         },
                         {
                           "description":   "Node Identifier",
                           "source":        "nodeiden",
                           "fieldtype":     "nodeiden",
                           "subtype":       "nodeiden"
                         },
                         {
                           "description":   "Modification Enabled",
                           "source":        "enabled",
                           "fieldtype":     "checkbox",
                           "subtype":       "checkbox"
                         },
                         {
                           "description":   "Parameter Number",
                           "source":        "parameter",
                           "fieldtype":     "ionumber",
                           "subtype":       "parameter"
                         },
                         {
                           "description":   "Modification Type",
                           "source":        "type",
                           "fieldtype":     "typelist",
                           "subtype":       "editableruletypelist"
                         },
                         {
                           "description":   "New Widths",
                           "source":        "widths",
                           "fieldtype":     "textlist",
                           "subtype":       "width",
                           "datatype":      "array"
                         }
                       ]
                     }
  };
/* The next JSON object contains some name information about
   each type of tree node. Note that we have ten entries for
   company nodes. However, only one of these entry has a key of 
   'company'. Instead, more specific keys are used. The actual 
   keys are 'compmod' for company nodes used for modifications 
   and 'compproxy' for company nodes used proxy definitions.
   Of course, 'compstore' is used for company node use for 
   store information. Of course, 'compignore' is used for 
   company node use for ignore (ignore-lists) information. */
const HDLmModTreeInfo = {
  "auth": {
    "longname":    "authorization",
    "ucfirstname": "Authorization",
    "tooltip":     "Authorization node"
  },
  "companies": {
    "longname":    "companies",
    "ucfirstname": "Companies",
    "tooltip":     "Companies node"
  },
  "company": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "compdata": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "compgem": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "compgxe": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "compignore": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "compmod": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "comppass": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "comppopup": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "compproxy": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "compsimple": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "compstore": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },
  "compvalue": {
    "longname":    "company",
    "ucfirstname": "Company",
    "tooltip":     "Company node"
  },

  "config": {
    "longname":    "configuration",
    "ucfirstname": "Configuration",
    "tooltip":     "Configuration node"
  },
  "data": {
    "longname":    "data",
    "ucfirstname": "Data",
    "tooltip":     "Data node"
  },
  "division": {
    "longname":    "division",
    "ucfirstname": "Division",
    "tooltip":     "Division node"
  },
  "ignore": {
    "longname":    "ignore",
    "ucfirstname": "Ignore",
    "tooltip":     "Ignore-list entry node"
  },
  "line": {
    "longname":    "line",
    "ucfirstname": "Line",
    "tooltip":     "Report-line node"
  },
  "lines": {
    "longname":    "lines",
    "ucfirstname": "Lines",
    "tooltip":     "Report-lines node"
  },
  "list": {
    "longname":    "list",
    "ucfirstname": "List",
    "tooltip":     "Ignore-list node"
  },
  "lists": {
    "longname":    "lists",
    "ucfirstname": "Lists",
    "tooltip":     "Ignore-lists node"
  },
  "mod": {
    "longname":    "modification",
    "ucfirstname": "Modification",
    "tooltip":     "Modification node"
  },
  "report": {
    "longname":    "report",
    "ucfirstname": "Report",
    "tooltip":     "Report node"
  },
  "reports": {
    "longname":    "reports",
    "ucfirstname": "Reports",
    "tooltip":     "Reports node"
  },
  "rules": {
    "longname":    "rules",
    "ucfirstname": "Rules",
    "tooltip":     "Rules node"
  },
  "site": {
    "longname":    "site",
    "ucfirstname": "Site",
    "tooltip":     "Site node"
  },
  "store": {
    "longname":    "store",
    "ucfirstname": "Store",
    "tooltip":     "Stored value node"
  },
  "top": {
    "longname":    "top",
    "ucfirstname": "Top",
    "tooltip":     "Top node of the node tree"
  },
  "value": {
    "longname":    "value",
    "ucfirstname": "Value",
    "tooltip":     "Value node"
  },
};
/* The next JSON object contains some name information about
   each type of modification. The extra used field shows if
   a modification type uses extra information. It does not
   show if extra information is required by this modification
   type in all cases. */
const HDLmModTypeInfo = {
    "attribute":    { "type": "none",  "extraused": true,  "extrarequired": true,  "parmnumberused": false, "longname": "attribute" },
    "changeattrs":  { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "change attributes" },
    "changenodes":  { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "change nodes" },
    "extract":      { "type": "none",  "extraused": true,  "extrarequired": false, "parmnumberused": false, "longname": "extract" },
    "fontcolor":    { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "font color" },
    "fontfamily":   { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "font family" },
    "fontkerning":  { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "font kerning" },
    "fontsize":     { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "font size" },
    "fontstyle":    { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "font style" },
    "fontweight":   { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "font weight" },
    "height":       { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "height" },
    "image":        { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "image" },
    "modify":       { "type": "none",  "extraused": true,  "extrarequired": true,  "parmnumberused": false, "longname": "modify" },
    "notify":       { "type": "none",  "extraused": true,  "extrarequired": false, "parmnumberused": false, "longname": "notify" },
    "order":        { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "order" },
    "remove":       { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "remove" },
    "replace":      { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "replace" },
    "script":       { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "script" },
    "style":        { "type": "none",  "extraused": true,  "extrarequired": true,  "parmnumberused": true,  "longname": "style" },
    "text":         { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "text" },
    "textchecked":  { "type": "none",  "extraused": true,  "extrarequired": true,  "parmnumberused": true,  "longname": "checked text" },
    "title":        { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "title" },
    "visit":        { "type": "none",  "extraused": true,  "extrarequired": false, "parmnumberused": true,  "longname": "visit" },
    "width":        { "type": "none",  "extraused": false, "extrarequired": false, "parmnumberused": true,  "longname": "width" }
};
/* The possible font family values are listed below */
const HDLmModFamilyInfo = ['arial', 'cursive', 'fantasy', 'monospace',
                           'sans-serif', 'serif', 'system-ui'];
/* The possible font kerning values are listed below */
const HDLmModKerningInfo = ['auto', 'normal', 'none'];
/* The possible font style values are listed below. Note
   that oblique style values can be followed by an angle 
   value. */
const HDLmModStyleInfo = ['italic', 'normal', 'oblique'];
/* The possible font weight values are listed below. Note
   that font weight values can also be numbers. */
const HDLmModWeightInfo = ['bold', 'bolder', 'lighter', 'normal'];
class HDLmMod {
  /* Build an HTML modification object from the values passed by the
     caller. This is the only actual constructor. This is a very basic
     object. Additional fields are added to this object for each of 
     the actual uses. 

		 The type value below is a specific modification node type (such
		 as 'attribute' or 'fontcolor'). The type value is not a tree node
     type (such as 'top' or 'mod'). */
  constructor(name, extraStr, enabled, modType) {
    this.name = name;
    this.extra = extraStr;
    this.enabled = enabled;
    this.type = modType;
    this.created = new Date();
    this.lastmodified = new Date();
  }
  /* This routine adds any missing fields to a modification object */
  static addMissingFieldsModObject(newMod, modInfoFunction, modType) {
    /* Add any missing fields to the modification object passed 
       by the caller */
    let typeInfo = modInfoFunction;
    let modInfo = typeInfo[modType];
    let modInfoArray = modInfo['fields'];
    let modArrayLength = modInfoArray.length;
    /* Process each of the entries in the array. Check if the field
       already exists or not. */
    for (let i = 0; i < modArrayLength; i++) {
      let fieldSource = modInfoArray[i].source;
      let fieldType = modInfoArray[i].fieldtype;
      /* Add a default (empty or false) value, if need be */
      if (!newMod.hasOwnProperty(fieldSource)) {
        if (fieldType == 'checkbox')
          newMod[fieldSource] = false;
        else
          newMod[fieldSource] = '';
      }
      /* Since the field already has a value, check the value
         in some cases */
      else {
        if (fieldType == 'checkbox' &&
            newMod[fieldSource] == '') 
          newMod[fieldSource] = false;
      }
    }
  }
  /* Build an HTML modification object from the values passed by the
     caller */
  static buildModificationObject(name, pathStr, extraStr, enabled,
                                 cssStr, xpathStr, finds, nodeStr, 
                                 modType, parameterNumber,
                                 commentsStr, useModeStr) {
    /* Construct the new modification */
    /* console.log(extraStr); */
    let newModification = new HDLmMod(name, extraStr, enabled, modType);
    /* console.log(newModification); */
    /* Add a few additional fields */
    newModification.comments = commentsStr;
    newModification.cssselector = cssStr;
    newModification.xpath = xpathStr;
    newModification.find = finds;
    newModification.nodeiden = nodeStr;
    newModification.parameter = parameterNumber;
    newModification.pathvalue = pathStr;
    newModification.usemode = useModeStr;
    return newModification;
  }
  /* This routine builds the modification tree. Actually, most of the 
     tree does not have any details. Of course, rule nodes have details
     (the actual modifications). However, other node have details as
     well. 

     This routine does not really build the tree. This routine returns
     a Promise that can be used to build the tree when the Promise is
     successfully resolved.

     This code is used to build the first part of the pass-through
     display. A request is sent to a standard server to obtain informtion
     about whatever companies have been defined so far. */ 
  static buildModificationTree() {
    /* Get the Promise used to load the modifications */
    return HDLmTree.passReadAllRows();
  }
  /* Build an HTML value (data value) object from the values passed by the
     caller */
  static buildValueObject(name, extraStr, nodeType) {
    /* Construct the new data value object */
    let modificationEnabledTrue = true; 
    let newDataValueObject = new HDLmMod(name, extraStr, modificationEnabledTrue, nodeType);
    /* Add a few additional fields */    
    newDataValueObject.comments = '';  
    newDataValueObject.value = '';  
    return newDataValueObject;
  }
  /* This routine checks a set of find information and returns an error
     object if the find information is invalid. Actually, a set of error
     information is always returned to the caller. However, the error
     information will be empty (no errors) if the find information is 
     valid. Each field in in the find information is separately checked
     in some detail. See the code below. */
  static checkFindInformation(subType, value) {
    /* Define the initial error object. The error object is updated
       as need be below. */
    let errorObj = {
      "errorCount": 0,
      "errorTexts": []
    }
    /* Somewhat indirectly, get the number of fields in the value. 
       Generate an empty error text message for each field. */
    let valueKeys = Object.keys(value);
    for (let i = 0; i < valueKeys.length; i++) {
      errorObj.errorTexts.push('');
    }
    /* Get the individual values from the object passed by the 
       caller. These values are checked below. This code has 
       been changed. The caller must handle removing all leading
       and trailing blanks. */
    let valueTag = value['tag'];
    if (1 == 2)
      valueTag = valueTag.trim();
    let valueAttribute = value['attribute'];
    if (1 == 2)
      valueAttribute = valueAttribute.trim();
    let valueValue = value['value'];
    if (1 == 2)
      valueValue = valueValue.trim();
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check the tag value. It must be a valid identifier. */
      if (valueTag == '') {
        errorObj.errorCount++;
        errorObj.errorTexts[0] = 'Tag value must be set for find information';
        break;
      }
      /* Build a token vector from the tag. The token vector is 
         checked in several ways. */
      let tokenVec = HDLmString.getTokens(valueTag);
      let tokenLen = tokenVec.length;
      if (tokenLen != 2) {
        errorObj.errorCount++;
        errorObj.errorTexts[0] = 'Tag value has too many tokens';
        break;
      }
      /* Make sure the first token (the tag) is an identifier */
      let tokenFirst = tokenVec[0];
      if (tokenFirst.tokType != HDLmTokenTypes.identifier) {
        errorObj.errorCount++;
        errorObj.errorTexts[0] = 'Tag value is not a valid identifier';
        break;
      }
      /* We didn't find any errors in the tag. We can just terminate
         the loop. */
      break;
    }
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check the attribute field. It may not be set. This is not an
         error condition. */
      if (valueAttribute == '')
        break;
      /* Build a token vector from attribute field. The token vector is
         checked in several ways. */
      let tokenVec = HDLmString.getTokens(valueAttribute);
      let tokenLen = tokenVec.length;
      if (tokenLen != 2) {
        errorObj.errorCount++;
        errorObj.errorTexts[1] = 'Attribute field has too many tokens';
        break;
      }
      /* Make sure the second token (the attribute field) is an identifier */
      let tokenSecond = tokenVec[0];
      if (tokenSecond.tokType != HDLmTokenTypes.identifier) {
        errorObj.errorCount++;
        errorObj.errorTexts[1] = 'Attribute field is not a valid identifier';
        break;
      }
      /* We didn't find any errors in the attribute field. We can just terminate
         the loop. */
      break;
    }
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check the attribute value (not the attribute field). It may 
         not be set. This is not an error condition. */
      if (valueValue == '')
        break;
      /* If the attribute value (not the attribute field) is set, then
         the attribute field must also be set. */
      if (valueAttribute == '') {
        errorObj.errorCount++;
        errorObj.errorTexts[2] = 'Attribute value set without an attribute field value';
        break;
      }
      /* We didn't find any errors in the attribute. We can just terminate
         the loop. */
      break;
    }
    return errorObj;
  }
  /* This routine checks if a field exists for the current class.
     If the field exists, a true value is returned. Otherwise, a
     false value is returned. */
  static checkIfFieldInformationExists(currentObject, fieldName) {
    /* Make sure the current object is an object */
    if (typeof(currentObject) != 'object') {
      let errorText = 'Current object passed to checkIfFieldInformationExists( is not an object';
      HDLmAssert(false, errorText);
    }
    /* Make sure the field name is a string */
    if (typeof(fieldName) != 'string') {
      let errorText = 'Field name passed to checkIfFieldInformationExists( is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the field name length is greater then zero */
    if (fieldName.length <= 0) {
      let errorText = 'Field name length passed to checkIfFieldInformationExists( is not positive';
      HDLmAssert(false, errorText);
    }
    /* Check if the field exists in the current object */
    if (currentObject.hasOwnProperty(fieldName))
      return true;
    return false;   
  }
  /* This routine checks a tree node name and returns an error
     message if the tree node name is invalid. Note that the caller 
     is responsible for removing any leading and trailing blanks. A 
     valid tree node name must be non-blank (non-empty) and must not 
     be used by any other tree node under the current parent node. 
     Other than those rules, all other text values are valid. Note
     that the check for a duplicate node name is caseless. In other
     words, ABCD and abcd will be treated as duplicates. */
  static checkTreeNodeName(treeNode, value, removeTails) {
    /* console.log('checkTreeNodeName'); */
    let errorText = ''; 
    /* Get the long name and the modified long name of the current
       type of node. The modified long name is actually the original
       long name with the first letter converted to uppercase. */
    let treeType = treeNode.type;
    if (treeType == 'company') {
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem)
        treeType = 'compgem';
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)
        treeType = 'compgxe';
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
        treeType = 'compignore';
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod)
        treeType = 'compmod';
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass)
        treeType = 'comppass';
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup)
        treeType = 'comppopup';
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy)
        treeType = 'compproxy';
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple)
        treeType = 'compsimple';
      else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
        treeType = 'compstore';
    }
    if (!HDLmModTreeInfo.hasOwnProperty(treeType)) {
      let errorString = treeType;
      HDLmError.buildError('Error', 'Invalid tree type', 20, errorString);
      return errorText;
    }
    /* The long name obtained below is something like division and 
       the uppercase case first name is something like Division. These
       names are used to build error messages below. */
    let longName = HDLmModTreeInfo[treeType]['longname'];
    let ucFirstName = HDLmModTreeInfo[treeType]['ucfirstname'];
    /* Remove all leading and trailing blanks and check for an 
       empty tree node name. A tree node name can never be
       empty. Some non-blank text value must be set. Report an 
       error if the tree node name is empty. This code has been
       changed. The caller must handle removing leading and 
       trailing blanks. */
    if (1 == 2)
      value = value.trim();
    if (value == '') {
      errorText = `${ucFirstName} name can not be an empty string`;
      return errorText;
    }
    /* Use the node path of the current tree node to locate the 
       parent of the current tree node */    
    let childPath = treeNode.nodePath;
    /* Check the length of parent node path. The value must be
       less than five at this point in our code. This comment
       really only applies to the modification editor. */
    let maxChildPathLength;
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config)
      maxChildPathLength = 2;
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem)
      maxChildPathLength = 7;
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)
      maxChildPathLength = 7;
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
      maxChildPathLength = 4;
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod)
      maxChildPathLength = 5;
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass)
      maxChildPathLength = 7;
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup)
      maxChildPathLength = 7;
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy)
      maxChildPathLength = 2;
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple)
      maxChildPathLength = 7;
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
      maxChildPathLength = 5;
    if (childPath.length - 1 >= maxChildPathLength) {
      let errorText = 'Parent node path length is too high';
      HDLmAssert(false, errorText);
    }
    /* Search for the parent node in the node tree */
    let parentTreeNode = HDLmTree.locateTreeParentNode(childPath);
    /* Report an error if the node could not be found */
    if (parentTreeNode == null) {
      let childNodeString = childPath.toString();
      console.log('In HDLmMod.checkTreeNodeName', childNodeString);
      HDLmError.buildError('Error', 'Locate', 9, childNodeString);
      errorText = `Parent node can not be located - node(${childNodeString})`;
      return errorText;
    }
    /* Check if the current name conflicts with any other sibling
       node name. This check is caseless and any file numbers are
       stripped from each node name. That means that FONT and font
       are treated as equal. It also means that Font (2) and font 
       may be treated as equal, depending on whether remove tails 
       is set to true or false. Note that this conversion is only done
       for tree node name checking. Mixed case tree node names are
       stored in mixed case. That means that name checking is caseless,
       while names are actually stored in their original case (which
       may be mixed case). */
    let matchObj = HDLmTree.countSubNodeNames(value, parentTreeNode,
                                              treeNode, removeTails);
    let matchCount = matchObj.matchCount;
    if (matchCount > 0) {
      let duplicateValue = matchObj.matchArray[0];
      errorText = `Duplicate ${longName} name (${duplicateValue}) found`;
    }
    return errorText;
  }
  /* This routine is used to check values. This routine is passed
     a value type and a value. Either an empty string or an error 
     message is returned to the caller. Note that the caller is 
     responsible for removing any leading and trailing blanks. The
     value checking is very dependent on the type of the current 
     value. A (hopefully) useful error message is returned to the 
     caller. */
  static checkFontValue(subType, value) {
    let errorText = '';
    let dataIndex;
    /* The type of checking depends on the current data type */
    switch (subType) {
      case 'fontfamily':
        value = value.toLowerCase();
        dataIndex = HDLmModFamilyInfo.indexOf(value);
        break;
      case 'fontkerning':
        value = value.toLowerCase();
        dataIndex = HDLmModKerningInfo.indexOf(value);
        break;
      case 'fontstyle':
        value = value.toLowerCase();
        dataIndex = HDLmModStyleInfo.indexOf(value);
        break;
      case 'fontweight':
        value = value.toLowerCase();
        dataIndex = HDLmModWeightInfo.indexOf(value);
        break;
      default: {
        let errorString = subType;
        HDLmError.buildError('Error', 'Invalid type', 12, errorString);
        errorText = 'Invalid value type (' + subType + ') passed to check value routine';
        return errorText;
      }
    }
    /* Build an error message if the value was not successfully validated */
    if (dataIndex < 0) {
      /* Get some type information. The type value is used to obtain the
         long (full) name of the type. If the type information is available,
         then the long (full) name is used in the error message. */
      let typeInfo = HDLmMod.getModificationTypeInfo(subType);
      if (typeInfo != null)
        subType = typeInfo.longname;
      errorText = `Invalid ${subType} value (${value})`;
    }
    return errorText;
  }
  /* This routine checks if a passed probability value is valid. A 
     booolean value is always returned to the caller. If the probability 
     value is valid, then an empty error text value is returned. Otherwise,
     a non-empty error text value is returned. */
  static checkProbability(probabilityStr) {
    /* console.log('In HDLmMod.checkProbability'); */
    /* console.log(probabilityStr, probabilityStr.length); */
    /* console.trace(); */
    let errorText = '';
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      /* Check if the caller passed a null value. Null values are always
         OK. */
      if (probabilityStr == null) { 
        break
      }
      /* Check if the caller passed an empty string. Empty strings are always
         OK. */
      if (probabilityStr == '') { 
        break
      }
      /* Change the value to lowercase. This makes the checks below
         much simpler and caseless. */ 
      probabilityStr = probabilityStr.toLowerCase();
      /* Check if the probability string is a valid floating-
         point value */
      let probabilityValid = HDLmUtility.isValidFloat(probabilityStr);
      if (!probabilityValid) {
        errorText = 'Probability value is not a valid floating-point number';
        break;
      }
      /* Convert the string to a floating-point value */
      let probabilityValue = parseFloat(probabilityStr);
      /* Check if the probability value is too low */
      if (probabilityValue < 0.0) {
        errorText = 'Probability value must be zero or greater';
        break;
      }
      /* Check if the probability value is too high */
      if (probabilityValue > 100.0) {
        errorText = 'Probability value must be 100.0 or less  ';
        break;
      }
      break;
    }
    /* console.log('At end of HDLmMod.checkProbability'); */
    /* console.log(errorText, errorText.length); */
    return errorText;
  }
  /* This routine checks if a passed script (JavaScript) is valid or not.
     A boolean value is always returned to the caller. If the script is
     valid, then a true value is returned. Otherwise, a false value is
     returned. Note that this routine does not actually execute the
     script. It only checks the syntax of the script. */
  static checkScriptValid(scriptStr) {
    /* Assume that the script is valid */
    /* console.log(scriptStr); */
    let rv = true;
    /* Check if the script is valid */
    rv = HDLmHtml.checkJavaScriptCode(scriptStr); 
    /* console.log(rv); */
    return rv; 
    /* This is the old code that used a very different approach 
       to check the script. It is left here for reference only.
       This approach did not work in key cases. */
    let newScript = scriptStr.replaceAll("'", "\\x27"); 
    let finalStr = "new Function('" + newScript + "');";
    /* console.log(newScript); */
    /* console.log(finalStr); */
    try {
      let evalOutput = eval(finalStr); 
    } 
    catch (error) {
      console.log(error);
      rv = false; 
    }
    return rv;
  }
  /* This routine checks if a passed use mode value is valid. A booolean
     value is always returned to the caller. If the use mode value is
     valid, then a true value is returned. Otherwise, a false value is
     returned. Note, this routine handles a number of special cases. */
  static checkUseMode(useModeStr) {
    let rv = false; 
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      /* Check if the caller passed a null value. Null values are always
         OK. */
      if (useModeStr == null) {
        rv = true;
        break
      }
      /* Check if the caller passed an empty string. Empty strings are always
         OK. */
      if (useModeStr == '') {
        rv = true;
        break
      }
      /* Change the value to lowercase. This makes the checks below
         much simpler and caseless. */ 
      useModeStr = useModeStr.toLowerCase();
      /* Check for a number of valid values */
      if (useModeStr == 'on'  || 
          useModeStr == 'all' || 
          useModeStr == 'always') {
        rv = true;
        break;
      }
      /* Check for a number of valid values */
      if (useModeStr == 'off'  || 
          useModeStr == 'none' || 
          useModeStr == 'never') {
        rv = true;
        break;
      }
      /* Check for a number of valid values */
      if (useModeStr == 'production' || 
          useModeStr == 'prod'       || 
          useModeStr == 'test') {
        rv = true;
        break;
      }
      break;
    }
    return rv;
  }
  /* Convert an object to an instance of the HDLmMod class. 
     The new instance is returned to the caller. Specific fields
     are copied from the object to the new HDLmMod instance. */
  static convertObjectToMod(infoJsonObj) {
    /* Change the name of one field */
    if (infoJsonObj.hasOwnProperty('path')) {
      infoJsonObj.pathvalue = infoJsonObj.path;
      delete infoJsonObj.path; 
    }
    /* Build an object from the JSON and copy some fields */
    let curObjInstance = Object.assign({}, infoJsonObj);
    let curModInstance = new HDLmMod(curObjInstance.name, curObjInstance.extra, 
                                     curObjInstance.enabled, curObjInstance.type);
    /* Copy all of the fields from the object to the HDLmMod instance */
    for (let key in curObjInstance) {
      curModInstance[key] = curObjInstance[key];
    }
    return curModInstance;
  }
  /* The next method does all of the work of displaying the current error
     text passed by the caller. This error text can come from any source. 
     may actually have any non-empty error text. */
  static displayErrorText(errorText) {
    HDLmUtility.setErrorText(errorText);
  }
  /* The routine deletes some field from an object. The actual 
     use of this routine is to delete an error text field from 
     a tree node object. However, this routine could be used for 
     anything. */
  static deleteFieldInformation(currentObject, fieldName) {
    /* Make sure the current object is an object */
    if (typeof(currentObject) != 'object') {
      let errorText = 'Current object passed to deleteFieldInformation is not an object';
      HDLmAssert(false, errorText);
    }
    /* Make sure the field name is a string */
    if (typeof(fieldName) != 'string') {
      let errorText = 'Field name passed to deleteFieldInformation is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the field name length is greater then zero */
    if (fieldName.length <= 0) {
      let errorText = 'Field name length passed to deleteFieldInformation is not positive';
      HDLmAssert(false, errorText);
    }
    delete currentObject[fieldName];
  }
  /* This routine displays a check box field. Note that the caller
     provides the update callback function in this case. Only the
     caller knows where the updated check box value must be stored. */
  static displayFieldCheckBox(typeType, typeSubType,
                              currentTreeNode, containerWidget,
                              inputCallback,
                              description, value, subType,
                              updateCallback, keyDownCallback,
                              redrawCallback, fullRedrawCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldCheckBox method is an array';
      HDLmAssert(false, errorText);
    }
    /* Set a few options for check box widget built below. Use them
        to build the check box widget. */
    let checkOptions = {
      "editable":         true,
      "elementSelection": false,
    };
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let checkBoxWidget = new HDLmCheckBoxWidget(containerWidget, checkOptions,
                                                inputCallback,
                                                description, value,
                                                updateCallback, keyDownCallback,
                                                typeType, typeSubType,
                                                redrawCallback, fullRedrawCallback);
    return checkBoxWidget;
  }
  /* This routine displays a color list field */
  static displayFieldColorList(typeType, typeSubType,
                               currentTreeNode, containerWidget,
                               inputCallback,
                               description, value, subType,
                               redrawCallback,
                               updateCallback, keyDownCallback,
                               fullRedrawCallback) {
    /* Make sure the value is an array */
    if (Array.isArray(value) == false) {
      let errorText = 'Value passed to displayFieldColorList method is not an array';
      HDLmAssert(false, errorText);
    }
    /* Set a few options for list widget built below. Use them
       to build the list widget. The placeholder text is no longer
       needed, now that we are using an input color field. */
    let listOptions = {
      "delete":           true,
      "editable":         false,
      "elementSelection": false,
      "keepSorted":       true,
      "newEntry":         true,
      "placeHolderText":  "New Color",
      "setColors":        true, 
      "setImages":        false, 
      "setTexts":         false, 
      "spellCheck":       false,
      "subType":          subType,
      "type":             "color"
    };
    /* Note that an anonymous function is provided as a callback to
       redraw the widget. Note that the function uses a closure to
       obtain the node key value. 
       
       A separate callback is provided for updating the actual data
       when the data in the widget is modified. This callback also
       uses a closure to access the data values array. */
    let currentMod = currentTreeNode.details;
    let listWidget = new HDLmListWidget(currentMod, 
                                        containerWidget,
                                        listOptions,
                                        inputCallback,
                                        description, 
                                        value,
                                        redrawCallback,
                                        updateCallback, 
                                        keyDownCallback,
                                        typeType, 
                                        typeSubType,
                                        fullRedrawCallback);
    return listWidget;
  }
  /* This routine displays a comments value that can be modified */
  static displayFieldCommentsInformation(typeType, typeSubType,
                                         currentTreeNode, containerWidget,
                                         inputCallback,
                                         description, value, subType,
                                         redrawCallback,
                                         updateCallback, keyDownCallback,
                                         fullRedrawCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldCommentsInfomation method is an array';
      HDLmAssert(false, errorText);
    }
    let optPlaceHolder = "New Comments Value";
    let optUpdateOnEnter = false;
    /* Set a few options for text widget built below. Use them
       to build the text widget. The text widget is used to display
       and update the comment value. */
    let commentOptions = {
      "delete":           true,
      "editable":         true,
      "elementSelection": false,
      "emptyFieldOk":     true,
      "invokeRedraw":     false,
      "placeHolderText":  optPlaceHolder,
      "sizeValue":        60,
      "spellCheck":       false,
      "subType":          subType,
      "updateOnEnter":    optUpdateOnEnter
    };
    /* Set the full redraw callback address to null. This value 
       is not used in this context. */
    let fullRedrawCallbackNull = null;
    /* The current modification is set to null. This value is not
       or passed by the caller. */
    let textWidgetCurrentModificationNull = null;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let commentWidget = new HDLmTextWidget(containerWidget, commentOptions,
                                           inputCallback,
                                           description, value,
                                           currentTreeNode,
                                           redrawCallback,
                                           updateCallback, keyDownCallback,
                                           typeType, typeSubType,
                                           fullRedrawCallback,
                                           textWidgetCurrentModificationNull);
    return commentWidget;
  }  
  /* This routine displays a CSS selector value that can be modified */
  static displayFieldCSSSelector(typeType, typeSubType,
                                 currentTreeNode, containerWidget,
                                 inputCallback,
                                 description, value, subType,
                                 redrawCallback,
                                 updateCallback, keyDownCallback,
                                 fullRedrawCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldCSSSelector method is an array';
      HDLmAssert(false, errorText);
    }
    let optPlaceHolder = "New CSS Selector Value";
    let optUpdateOnEnter = true;
    /* We really don't want to use update on enter if any of 
       inline editors is in use. Of course, the more advanced 
       editors don't really use CSS selectors anyway. */
    if (HDLmGlobals.checkForInlineEditor()) 
      optUpdateOnEnter = false;
    /* Set a few options for text widget built below. Use them
       to build the text widget. The text widget is used to display
       and update the CSS selector value. */
    let cssOptions = {
      "delete":           true,
      "editable":         true,
      "elementSelection": true,
      "emptyFieldOk":     true,
      "invokeRedraw":     true,
      "placeHolderText":  optPlaceHolder,
      "sizeValue":        60,
      "spellCheck":       false,
      "subType":          subType,
      "updateOnEnter":    optUpdateOnEnter
    };
    /* Set the full redraw callback address to null. This value 
       is not used in this context. */
    let fullRedrawCallbackNull = null;
    /* The current modification is set to null. This value is not
       or passed by the caller. */
    let textWidgetCurrentModificationNull = null;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let cssWidget = new HDLmTextWidget(containerWidget, cssOptions,
                                       inputCallback,
                                       description, value,
                                       currentTreeNode,
                                       redrawCallback,
                                       updateCallback, keyDownCallback,
                                       typeType, typeSubType,
                                       fullRedrawCallback,
                                       textWidgetCurrentModificationNull);
    return cssWidget;
  }  
  /* This routine displays a field description. The caller provides 
     the description and where the description should be placed. */
  static displayFieldDescription(parentDescriptionId, description, top) {
    let newElement = null;
    let newText = ''
    /* Display the description text */
    newText = '';
    newText += '<div';
    newText += ' style="position:absolute; top:';
    newText += top;
    newText += 'px;"';
    newText += '>';
    newText += description;
    newText += "</div>";
    let newElementJQuery = $(parentDescriptionId).append(newText);
    if (newElementJQuery.length > 0)
      newElement = newElementJQuery[0];     
    return newElement;
  }
  /* This routine displays the extra information value that can be modified */
  static displayFieldExtraInformation(typeType, typeSubType,
                                      currentTreeNode, 
                                      containerWidget,
                                      inputCallback,
                                      description, value, subType,
                                      redrawCallback,
                                      updateCallback, 
                                      keyDownCallback,
                                      fullRedrawCallback,
                                      currentModification) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldExtraInformation method is an array';
      HDLmAssert(false, errorText);
    }
    let optPlaceHolder = "New Extra Information Value";
    let optUpdateOnEnter = false;
    /* Set a few options for text widget built below. Use them
       to build the text widget. The text widget is used to display
       and update the extra information value. */
    let extraOptions = {
      "delete":            true,
      "editable":          true,
      "elementSelection":  false,
      "emptyExtraValueOK": true,
      "emptyFieldOk":      true,
      "invokeRedraw":      false,
      "placeHolderText":   optPlaceHolder,
      "sizeValue":         60,
      "spellCheck":        false,
      "subType":           subType,
      "updateOnEnter":     optUpdateOnEnter
    };
    /* Set a few options for text widget built below. Use them
       to build the text widget. */
    if (subType == 'extraAttribute') {
      extraOptions.emptyExtraValueOK = false;
      extraOptions.emptyFieldOk = false;
    }
    /* Set a few options for text widget built below. Use them
       to build the text widget. */
    if (subType == 'extraStyle') {
      extraOptions.delete = false;
      extraOptions.emptyExtraValueOK = false;
      extraOptions.emptyFieldOk = false;
    }
    /* Get the current modification type, if possible. The current modification
       type is obtained from the current modification object, if possible. This 
       is not always possible. */
    let currentModificationType = '';
    if (currentModification != null &&
        (typeof currentModification.details.type) == 'string')
      currentModificationType = currentModification.details.type;
    /* Check if the current modification type shows that the extra information
       field must be set in all cases. This is not always true. Some rule types
       do not require that the extra information field to be set. */
    if (HDLmMod.getModificationTypeExtraRequired(currentModificationType) == true) 
      extraOptions.emptyExtraValueOK = false;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let extraWidget = new HDLmTextWidget(containerWidget, extraOptions,
                                         inputCallback,
                                         description, value,
                                         currentTreeNode,
                                         redrawCallback,
                                         updateCallback, 
                                         keyDownCallback,
                                         typeType, typeSubType, 
                                         fullRedrawCallback,
                                         currentModification);
    return extraWidget;
  }
  /* This routine displays a set of find information */
  static displayFieldFindInfo(typeType, typeSubType,
                              currentTreeNode, containerWidget,
                              inputCallback,
                              description, value, subType,
                              redrawCallback,
                              updateCallback, keyDownCallback,
                              fullRedrawCallback) {
    /* Make sure the value is an array */
    if (Array.isArray(value) == false) {
      let errorText = 'Value passed to displayFieldFindInfo method is not an array';
      HDLmAssert(false, errorText);
    }
    /* Declare and define a few local variables */
    let   optElementSelection = false;
    let   optEmptyFieldOk = false;
    /* Define all of the column of the grid */
    let gridInfo = [
                     {
                       "name": "Tag",
                       "size": 10,
                       "placeHolderText": "New Tag",
                       "source": "tag"
                     },
                     {
                       "name": "Attribute",
                       "size": 14,
                       "placeHolderText": "New Attribute",
                       "source": "attribute"
                     },
                     {
                       "name": "Value",
                       "size": 30,
                       "placeHolderText": "New Value",
                       "source": "value"
                     }
                   ];
    /* Check if this routine is being used to handle find information
       for selecting an HTML element. If this is true, then we must
       set the element selection flag to true. */
    if (subType == 'find') {
      optElementSelection = true;
      optEmptyFieldOk = true;
    }
    /* Set a few options for grid widget built below. Use them
       to build the grid widget. */
    let gridOptions = {
      "delete":           true,
      "editable":         true,
      "elementSelection": optElementSelection,
      "emptyFieldOk":     optEmptyFieldOk, 
      "newEntry":         true,
      "spellCheck":       false,
      "subType":          subType
    };
    /* Note that an anonymous function is provided as a callback to
       redraw the widget. Note that the function uses a closure to
       obtain the node key value. 
         
       A separate callback is provided for updating the actual data
       when the data in the widget is modified. This callback also
       uses a closure to access the current node and the correct 
       field of the current node. */
    let gridWidget = new HDLmGridWidget(containerWidget, gridOptions,
                                        inputCallback,
                                        description, value,
                                        redrawCallback, 
                                        updateCallback, keyDownCallback, 
                                        gridInfo,
                                        typeType, typeSubType,
                                        fullRedrawCallback);
    return gridWidget;
  }
  /* This routine displays a floating-point  value that can be modified */
  static displayFieldFloat(typeType, typeSubType,
                           currentTreeNode, 
                           containerWidget,
                           inputCallback,
                           description, value, subType,
                           redrawCallback,
                           updateCallback, 
                           keyDownCallback,
                           fullRedrawCallback,
                           currentModification) {
    /* console.log('In HDLmMod.displayFieldFloat'); */
    /* console.log(typeType, typeSubType, subType); */
    /* console.log(currentTreeNode); */
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldFoat method is an array';
      HDLmAssert(false, errorText);
    }
    /* Set a few default options for the text widget built below */
    let optPlaceHolder = "New Float Value";
    let optUpdateOnEnter = true;
    /* Check if sub type shows that special values should be
       used. */
    /* console.log(typeSubType, subType); */
    /* console.log(subType == 'probability'); */
    if (subType == 'probability') {
      optPlaceHolder = "New Probability Value"; 
    }
    /* Set a few options for text widget built below. Use them
       to build the text widget. The text widget is used to display
       and update the floating-point value. */
    let floatOptions = {
      "delete":            true,
      "editable":          true,
      "elementSelection":  false, 
      "emptyFieldOk":      true,
      "invokeRedraw":      false,
      "placeHolderText":   optPlaceHolder,
      "sizeValue":         15,
      "spellCheck":        false,
      "subType":           subType,
      "updateOnEnter":     optUpdateOnEnter
    };
    /* Get the current modification type, if possible. The current modification
       type is obtained from the current modification object, if possible. This 
       is not always possible. */
    let currentModificationType = '';
    if (currentModification != null &&
        (typeof currentModification.details.type) == 'string')
      currentModificationType = currentModification.details.type;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let floatWidget = new HDLmTextWidget(containerWidget, floatOptions,
                                               inputCallback,
                                               description, value,
                                               currentTreeNode,
                                               redrawCallback,
                                               updateCallback, 
                                               keyDownCallback,
                                               typeType, typeSubType, 
                                               fullRedrawCallback,
                                               currentModification);
    return floatWidget;
  }
  /* This routine displays a image list field */
  static displayFieldImageList(typeType, typeSubType,
                               currentTreeNode, containerWidget,
                               inputCallback,
                               description, value, subType,
                               redrawCallback,
                               updateCallback, keyDownCallback,
                               fullRedrawCallback) {
    /* Make sure the value is an array */
    if (Array.isArray(value) == false) {
      let errorText = 'Value passed to displayFieldImageList method is not an array';
      HDLmAssert(false, errorText);
    }
    /* Set a few options for list widget built below. Use them
       to build the list widget. The placeholder text is no longer
       needed, now that we are using an input image field. */
    let listOptions = {
      "delete":           true,
      "editable":         false,
      "elementSelection": false,
      "keepSorted":       false,
      "newEntry":         true,
      "placeHolderText":  "New Image",
      "setColors":        false,
      "setImages":        true,
      "setTexts":         false,
      "spellCheck":       false,
      "subType":          subType
    };
    /* Note that an anonymous function is provided as a callback to
       redraw the widget. Note that the function uses a closure to
       obtain the node key value. 
       
       A separate callback is provided for updating the actual data
       when the data in the widget is modified. This callback also
       uses a closure to access the data values array. */
    let currentMod = currentTreeNode.details;
    let listWidget = new HDLmListWidget(currentMod,
                                        containerWidget, 
                                        listOptions,
                                        inputCallback,
                                        description, 
                                        value,
                                        redrawCallback,
                                        updateCallback,
                                        keyDownCallback,
                                        typeType,
                                        typeSubType,
                                        fullRedrawCallback);
    return listWidget;
  }
  /* This routine displays a date value that can be modified */
  static displayFieldIODate(typeType, typeSubType,
                            currentTreeNode, containerWidget,
                            inputCallback,
                            description, value, subType,
                            redrawCallback,
                            updateCallback, keyDownCallback,
                            fullRedrawCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldIODate method is an array';
      HDLmAssert(false, errorText);
    }
    let optAlwaysRedraw = false;
    let optAlwaysUpdate = false;
    let optBold = false;
    let optBoldBox = false;
    let optBorderSize = 'default';
    let optCallOnEnter = false;
    let optDateOutput = true;
    let optDelete = false;
    let optEditable = false;
    let optElementSelection = false; 
    let optEmptyFieldOk = true;
    let optFontFamily = 'default';
    let optFontSize = 'default';
    let optInvokeRedraw = false;
    let optPlaceHolder = 'New Date Value';
    let optSetFocus = false;
    let optSizeValue = 'default';
    let optSpellCheck = true;
    let optTopMargin = 0;
    let optUpdateOnEnter = false;
    /* Set a few options for date widget built below. Use them
       to build the date widget. */
    if (subType == 'outputdate') {  
      optDateOutput = true;
      optDelete = true;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Date Value";
      optSpellCheck = false;
    }   
    /* Set a few options for text widget built below. Use them
       to build the text widget. */
    let textOptions = {
      "alwaysRedraw":     optAlwaysRedraw,
      "alwaysUpdate":     optAlwaysUpdate,
      "borderSize":       optBorderSize,
      "bold":             optBold,
      "boldBox":          optBoldBox,
      "callOnEnter":      optCallOnEnter,
      "dateOutput":       optDateOutput,
      "delete":           optDelete,
      "editable":         optEditable, 
      "elementSelection": optElementSelection, 
      "emptyFieldOk":     optEmptyFieldOk,
      "fontFamily":       optFontFamily,
      "fontSize":         optFontSize, 
      "invokeRedraw":     optInvokeRedraw,   
      "placeHolderText":  optPlaceHolder, 
      "setFocus":         optSetFocus,
      "spellCheck":       optSpellCheck,
      "sizeValue":        optSizeValue,
      "subType":          subType,
      "topMargin":        optTopMargin,
      "updateOnEnter":    optUpdateOnEnter
    };
    /* The current modification is set to null. This value is not
       or passed by the caller. */
    let textWidgetCurrentModificationNull = null;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let textWidget = new HDLmTextWidget(containerWidget, 
                                        textOptions,
                                        inputCallback,
                                        description, value,
                                        currentTreeNode,
                                        redrawCallback,
                                        updateCallback, keyDownCallback,
                                        typeType, typeSubType,
                                        fullRedrawCallback,
                                        textWidgetCurrentModificationNull);
    return textWidget;
  }   
  /* This routine displays a number that can be modified */
  static displayFieldIONumber(typeType, typeSubType,
                              currentTreeNode, containerWidget,
                              inputCallback,
                              description, value, subType,
                              updateCallback, keyDownCallback,
                              redrawCallback,fullRedrawCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldIONumber method is an array';
      HDLmAssert(false, errorText);
    }
    let optDelete = false;
    let optEditable = false;
    let optPlaceHolderText = HDLmNumberWidgetOptions.placeHolderText;
    /* Set a few options for number widget built below. Use them
       to build the number widget. */
    if (subType == 'editableparameter') {
      optDelete = true;
      optEditable = true;
      optPlaceHolderText = 'New Parameter Number';
    }
    /* We now allow parameter numbers to be changed at any time.
       As a consequence, the parameter number field is editable 
       at all times. */
    else if (subType == 'parameter') {
      optDelete = false;
      optEditable = true;
      optPlaceHolderText = 'New Parameter Number';
      /* We need to consider one very special case here. We may be
         creating a new modification tree node using insert. The 
         modification type may already be set, but the modification
         name has not been set. If that is true and if the modification
         name has not been set, we should allow the field to be edited. */
      if (HDLmGlobals.activeNodeType == 'newmod') {
        if (value == null) {
          optEditable = true;
        }
      }
    }
    let numberOptions = {
      "delete":           optDelete,
      "editable":         optEditable,
      "elementSelection": false,
      "placeHolderText":  optPlaceHolderText,
      "subType":          subType
    };
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let numberWidget = new HDLmNumberWidget(containerWidget, numberOptions,
                                            inputCallback,
                                            description, value,
                                            updateCallback, keyDownCallback,
                                            typeType, typeSubType,
                                            redrawCallback, fullRedrawCallback);
    return numberWidget;
  }   
  /* This routine displays an HTML table that can be modified */
  static displayFieldIOTable(typeType, typeSubType,
                             currentTreeNode, containerWidget,
                             inputCallback,
                             description, value, subType,
                             updateCallback, keyDownCallback,
                             redrawCallback,
                             clickCallback,
                             fullRedrawCallback) {
    /* Make sure the value is an array */
    if (Array.isArray(value) == false) {
      let errorText = 'Value passed to displayFieldIOTable method is not an array';
      HDLmAssert(false, errorText);
    }
    let optClickable = false;
    let optDelete = false;
    let optEditable = false;
    let optEmptyFieldOk = false;
    let optPlaceHolderText = HDLmTableWidgetOptions.placeHolderText;
    let optSpellCheck = false; 
    let optUpdateOnEnter = false;
    /* Check for a very specific sub type value used for reports */
    if (subType == 'ootableemptynotok') {
      optClickable = false;
      optDelete = true;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolderText = "New Table Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of  
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    /* Check for a very specific sub type value used for match information */
    else if (subType == 'ootableformatchinfo') {
      optClickable = true;
      optDelete = true;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolderText = "New Table Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
      optUpdateOnEnter = false;
    }
    let tableOptions = {
      "clickable": optClickable,
      "delete": optDelete,
      "editable": optEditable,
      "elementSelection": false,
      "placeHolderText": optPlaceHolderText,
      "subType": subType
    };
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let tableWidget = new HDLmTableWidget(containerWidget, tableOptions,
                                          inputCallback,
                                          description, value,
                                          updateCallback, keyDownCallback,
                                          typeType, typeSubType,
                                          redrawCallback,
                                          currentTreeNode,
                                          clickCallback,
                                          fullRedrawCallback);
    return tableWidget;
  }
  /* This routine displays a text value that can be modified */
  static displayFieldIOText(typeType, typeSubType,
                            currentTreeNode, containerWidget,
                            inputCallback,
                            description, value, subType,
                            redrawCallback,
                            updateCallback, keyDownCallback,
                            fullRedrawCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldIOText method is an array';
      HDLmAssert(false, errorText);
    }
    let optAlwaysRedraw = false;
    let optAlwaysUpdate = false;
    let optBold = false;
    let optBorderSize = 'default';
    let optBottomMargin = 0;
    let optCallOnEnter = false;
    let optDelete = false;
    let optEditable = false;
    let optElementSelection = false;
    let optEmptyFieldOk = true;
    let optFontFamily = 'default';
    let optFontSize = 'default';
    let optHtmlBreak = false;
    let optHtmlPre = false;
    let optInvokeRedraw = false;
    let optMaskValue = false;
    let optMultiLineValue = false; 
    let optPlaceHolder = 'New Value';
    let optRemoveTails = true;
    let optSetFocus = false;
    let optSizeValue = 'default';
    let optSpellCheck = true;
    let optTextOutput = false;
    let optTopMargin = 0;
    let optUpdateOnEnter = false;
    /* Set a few options for text widget built below. Use them
       to build the text widget. */
    if (subType == 'backendserver') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Backend Server Domain Name";
      optSpellCheck = false;
    }
    else if (subType == 'backendtype') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Backend Type";
      optSpellCheck = false;
    } 
    /* Check if we are handling a break used for setting 
       a new / permanent password */
    else if (subType == 'changepasswordbreak') {
      optHtmlBreak = true;
    }
    /* Check if we are handling a message for setting 
       a new / permanent password */
    else if (subType == 'changepasswordtop'   || subType == 'changepasswordsecond' ||
             subType == 'changepasswordthird' || subType == 'changepasswordfourth' ||
             subType == 'changepasswordfifth' || subType == 'changepasswordsixth') {
      optBold = true;
      optBorderSize = 0;
      optFontSize = 20;
      optSizeValue = 40;
      optTextOutput = true;
    }
    /* Check if we are handling a new / permanent password. 
       Passwords are used for authentication purposes. */
    else if (subType == 'changepasswordnewpasswordfirst' || subType == 'changepasswordnewpasswordsecond') {
      optAlwaysUpdate = true;
      optBorderSize = 0;
      optCallOnEnter = true;
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optFontSize = 20;
      optMaskValue = true;
      optPlaceHolder = "Enter New Password Value";
      optSpellCheck = false;
    }
    else if (subType == 'companypassname') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "Company Domain Name";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    else if (subType == 'companyproxyname') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "Company Domain Name";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    /* This sub type is definitely in use */
    else if (subType == 'datavalue') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = true;
      optPlaceHolder = "New Data Value";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    /* This sub type is definitely in use */
    else if (subType == 'datavaluename') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Data Value Name";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = false;
      /* If we just displaying a data value (but not entering one
         from scratch), then we don't want to generate an error if 
         we have FONT and FONT (2). */
      optRemoveTails = false;
    }
    else if (subType == 'editablecompgemname' ||  
             subType == 'editablecompgxename') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Company Domain Name";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'editablecompignorename') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Company Domain Name";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'editablecompmodname') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Company Name";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'editablecomppassname') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Company Domain Name";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'editablecomppopupname') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Company Domain Name";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'editablecompproxyname') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Company Domain Name";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    else if (subType == 'editablecompsimplename') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Company Domain Name";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    /* This sub type is definitely in use */
    else if (subType == 'editablecompstorename') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Company Domain Name";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'editableconfigname') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Configuration Name";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    /* The update on enter value is set to true below. This is required
       so that the data value name will be not set as it is entered by 
       the user. We do want to force the user to use enter to make the new
       data name stick. Of course, this prevents partial data value
       names from being stored in the data value object. This approach
       is needed because the other fields (notably the actual data value)
       will not be considered to be incomplete at this point. */
    else if (subType == 'editabledatavaluename') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Data Value Name";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
      /* If we are entering a data value, then we don't want
         to generate an error if we have FONT and FONT (2) */
      optRemoveTails = false;
    }
    else if (subType == 'editabledivisionname') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Division Name";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    /* The update on enter value is set to true below. This is required
       so that the ignore-list name will be not set as it is entered by 
       the user. We do want to force the user to use enter to make the new
       ignore-list name stick. Of course, this prevents partial ignore-list
       names from being stored in the ignore-list entry value object. */
    else if (subType == 'editableignorelistname' ||
             subType == 'editablepasslistname') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Ignore-List Name";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    /* The update on enter value is set to true below. This is required
       so that the ignore-list entry name will be not set as it is entered by 
       the user. We do want to force the user to use enter to make the new
       ignore-list entry name stick. Of course, this prevents partial ignore-list
       entry names from being stored in the ignore-list entry value object.
       This approach is needed because the other fields (notably the actual
       ignore-list value) will not be considered to be incomplete at this point. */
    else if (subType == 'editableignorelistentryname' ||
             subType == 'editablepasslistentryname') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Ignore-List Entry Name";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    /* The update on enter value is set to false below. This is required
       so that the modification name will be set as it is entered by the
       user. We don't want to force the user to use enter to make the new
       modification name stick. Of course, this causes partial modification
       names to be stored in the modification object. However, this should
       not be a problem because other fields in the modification will be
       incomplete at this point. 
       
       Note that the update on enter value is really set to true below.
       This appears to have been a later bug fix. */  
    else if (subType == 'editablemodificationname') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Modification Name";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We need to change the value of remove tails. If we are running 
         one the inline editors, then we need to change the remove tails 
         value. This change eliminates an error where the modification
         name is trully unique, but appears not to be unique because 
         of the setting of remove tails. */
      if (HDLmGlobals.checkForInlineEditor()) 
        optRemoveTails = false;
    }
    else if (subType == 'editablesitename') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Site Name";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    /* The update on enter value is set to true below. This is required
       so that the stored value name will be not set as it is entered by 
       the user. We do want to force the user to use enter to make the new
       stored name stick. Of course, this prevents partial stored value
       names from being stored in the stored value object. This approach
       is needed because the other fields (notably the actual store value)
       will not be considered to be incomplete at this point. */
    else if (subType == 'editablestoredvaluename') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Stored Value Name";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'generalpassword') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optMaskValue = true;
      optPlaceHolder = "Password Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'height') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Height Value";
    }
    else if (subType == 'ignorelistentryname') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    else if (subType == 'ignorelistname') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    /* This sub type is not used */
    else if (subType == 'ignorevalue') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = true;
      optPlaceHolder = "New Ignore-List Entry Value";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    /* This sub type is not used */
    else if (subType == 'ignorevaluename') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Ignore-List Name";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    else if (subType == 'iotextemptynotok') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Text Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'iotextemptyok') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = true;
      optPlaceHolder = "New Text Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'matchdetails') {
      optMultiLineValue = true;
    }
    else if (subType == 'matchvalue') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Match Value";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    else if (subType == 'modificationname') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Modification Name";
      optSizeValue = 30;
      optSpellCheck = false;
      /* We need to consider one very special case here. We may be
         creating a new modification tree node using insert. The 
         modification type may already be set, but the modification
         name has not been set. If that is true and if the modification
         name has not been set, we should allow the field to be edited. */
      if (HDLmGlobals.activeNodeType == 'newmod') {
        if (value == '') {
          optEditable = true;
        }
      }
      /* If we just displaying a data value (but not entering one
         from scratch), then we don't want to generate an error if 
         we have FONT and FONT (2). */
      optRemoveTails = false;
    }
    else if (subType == 'oonumberemptynotok') {
      optDelete = true;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Text Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'oonumberemptyok') {
      optDelete = true;
      optEditable = false;
      optEmptyFieldOk = true;
      optPlaceHolder = "New Text Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'ootextemptynotok') {
      optDelete = true;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Text Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'ootextemptyok') {
      optDelete = true;
      optEditable = false;
      optEmptyFieldOk = true;
      optPlaceHolder = "New Text Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'passlistentryname' ||
             subType == 'passlineentryname' ||
             subType == 'passlinesentryname') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    else if (subType == 'passcompaniesname' ||
             subType == 'passdataname'      ||
             subType == 'passdivisionname'  ||
             subType == 'passlistname'      ||
             subType == 'passlistsname'     ||
             subType == 'passreportname'    ||
             subType == 'passreportsname'   ||
             subType == 'passrulesname'     ||
             subType == 'passsitename'      ||
             subType == 'passtopname') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    else if (subType == 'positivefloat') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Positive Float";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    else if (subType == 'positiveint') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Positive Integer";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    /* Check if we are handling a suggestion prompt */
    else if (subType == 'promptSuggestionText') {
      optBold = true;
      optFontFamily = 'Arial';
      optFontSize = 20;
      optMultiLineValue = false;
      optSizeValue = 40;
      optTextOutput = true; 
    }
    /* Check if we are handling a web page URL prompt */
    else if (subType == 'promptUrlText') {
      optBold = true;
      optFontFamily = 'Arial';
      optFontSize = 20;
      optMultiLineValue = false;
      optSizeValue = 40;
      optTextOutput = true;
    }
    else if (subType == 'secureserver') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Secure Server Domain Name";
      optSpellCheck = false;
    }
    /* Check if we are handling a blank line. Blank lines are used
       to separate sections of the display. It turns out that this
       does not work. Blank lines are not displayed. */
    else if (subType == 'signinblankline') { 
      optBorderSize = 0;
      optFontSize = 20;
      optTextOutput = true;
      optTopMargin = 25;
    }
    /* Check if we are handling a blank line. Breaks are used
       to separate sections of the display. */
    else if (subType == 'signinbreak') { 
      optHtmlBreak = true;
    }
    /* Check if we are handling an overall sign in message. Sign in
       overall messages are used for authentication purposes. */
    else if (subType == 'signinoverallusernamepassword') {
      optBold = true;
      optBorderSize = 0;
      optFontSize = 20;
      optSizeValue = 40;
      optTextOutput = true;
    }
    /* Check if we are handling an overall sign in verification message. 
       Sign in overall verification messages are used for authentication 
       purposes. */
    else if (subType == 'signinoverallverification') {
      optBold = true;
      optBorderSize = 0;
      optFontFamily = 'Arial';
      optFontSize = 20;
      optHtmlPre = true;
      optMultiLineValue = false;
      optSizeValue = 40;
      optTextOutput = true;
    }
    /* Check if we are handling a sign in password. Sign in
       passwords are used for authentication purposes. */
    else if (subType == 'signinpassword') {
      optAlwaysUpdate = true;
      optBorderSize = 0;
      optCallOnEnter = true;
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optFontSize = 20;
      optMaskValue = true;
      optPlaceHolder = "Enter Password Value";
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    /* Check if we are handling a sign in password prompt. Sign in
       password prompts are used for authentication purposes. */
    else if (subType == 'signinpasswordprompt') {
      optBold = true;
      optBorderSize = 0;
      optFontSize = 20;
      optTextOutput = true;
      optTopMargin = 25;
    }
    /* Check if we are handling an sign in username. Sign in
       usernames are used for authentication purposes. */
    else if (subType == 'signinusername') {
      /* console.log('In HDLmDisplayField.displayFieldIOText signinusername'); */
      optAlwaysUpdate = true;
      optBorderSize = 0;
      optCallOnEnter = true;
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optFontSize = 20;
      optPlaceHolder = "Enter Username Value";
      optSetFocus = true;
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    /* Check if we are handling a sign in username prompt. Sign in
       username prompts are used for authentication purposes. */
    else if (subType == 'signinusernameprompt') {
      optBold = true;
      optBorderSize = 0;
      optFontSize = 20;
      optTextOutput = true;
      optTopMargin = 25;
    }
    /* Check if we are handling a sign in verification code. 
       Sign in verification codes are used for authentication 
       purposes. */
    else if (subType == 'signinverificationcode') {
      optAlwaysUpdate = true;
      optBorderSize = 0;
      optCallOnEnter = true;
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optFontSize = 20; 
      optPlaceHolder = "Enter Verification Code";
      optSetFocus = true;
      optSpellCheck = false;
      optTopMargin = 25; 
    }
    /* This sub type is definitely in use */
    else if (subType == 'storevalue') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = true;
      optPlaceHolder = "New Stored Value";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    /* This sub type is definitely in use */
    else if (subType == 'storedvaluename') {
      optDelete = false;
      optEditable = false;
      optEmptyFieldOk = false;
      optPlaceHolder = "New Stored Value Name";
      optSizeValue = 30;
      optSpellCheck = false;
      optUpdateOnEnter = false;
    }
    /* Check if we are handling suggestion text */
    else if (subType == 'suggestionText') {
      optBorderSize = 0;
      optBottomMargin = 25;
      optCallOnEnter = false; 
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optFontSize = 20; 
      optPlaceHolder = "Enter suggestion text";
      optSetFocus = true;
      optSpellCheck = false;
      optTopMargin = 25;  
      optUpdateOnEnter = false;
    }
    else if (subType == 'userid') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "Userid Value";
      optSpellCheck = false;
      optUpdateOnEnter = true;
      /* We really don't want to use update on enter if any of
         inline editors are in use */
      if (HDLmGlobals.checkForInlineEditor())
        optUpdateOnEnter = false;
    }
    /* Check if we are handling a web page URL */
    else if (subType == 'webPageUrl') {
      optBorderSize = 0;
      /* The bottom marigin is set to 25 below. This is required
         so that the suggestion prompt will be displayed with a 
         large gap between the web page URL and the suggestion
         prompt. */         
      optBottomMargin = 25;
      optCallOnEnter = true; 
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optFontSize = 20; 
      optPlaceHolder = "Enter Web Page URL";
      optSetFocus = true;
      optSpellCheck = false;
      optTopMargin = 25; 
      optUpdateOnEnter = true
    }
    else if (subType == 'width') {
      optDelete = true;
      optEditable = true;
      optEmptyFieldOk = false;
      optPlaceHolder = "New width Value";
      optSpellCheck = false;
    }
    /* Set a few options for text widget built below. Use them
       to build the text widget. */
    let textOptions = {
      "alwaysRedraw":     optAlwaysRedraw,
      "alwaysUpdate":     optAlwaysUpdate,
      "borderSize":       optBorderSize,
      "bold":             optBold,
      "bottomMargin":     optBottomMargin,
      "callOnEnter":      optCallOnEnter,
      "delete":           optDelete,
      "editable":         optEditable,
      "elementSelection": optElementSelection,
      "emptyFieldOk":     optEmptyFieldOk,
      "fontFamily":       optFontFamily,
      "fontSize":         optFontSize,
      "htmlBreak":        optHtmlBreak,
      "htmlPre":          optHtmlPre,
      "invokeRedraw":     optInvokeRedraw,
      "maskValue":        optMaskValue,
      "multiLineValue":   optMultiLineValue,
      "placeHolderText":  optPlaceHolder,
      "removeTails":      optRemoveTails,
      "setFocus":         optSetFocus,
      "spellCheck":       optSpellCheck,
      "sizeValue":        optSizeValue,
      "subType":          subType,
      "textOutput":       optTextOutput,
      "topMargin":        optTopMargin,
      "updateOnEnter":    optUpdateOnEnter
    };
    /* The current modification is set to null. This value is not
       or passed by the caller. */
    let textWidgetCurrentModificationNull = null;
    /* Set the full redraw callback address to null. This value 
       is not used in this context. */
    let fullRedrawCallbackNull = null;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let textWidget = new HDLmTextWidget(containerWidget, textOptions,
                                        inputCallback,
                                        description, value,
                                        currentTreeNode,
                                        redrawCallback,
                                        updateCallback, keyDownCallback,
                                        typeType, typeSubType,
                                        fullRedrawCallback,
                                        textWidgetCurrentModificationNull);
    return textWidget;
  }  
  /* This routine displays a text match value that can be modified.
     We support many types of text match values. The types are  
     simple, regex, glob, and like. Note that a valid text 
     match value can never be empty (a zero-length string). */
  static displayFieldMatchText(typeType, typeSubType,
                               currentTreeNode, containerWidget,
                               inputCallback,
                               description, value, subType,
                               redrawCallback,
                               updateCallback, keyDownCallback,
                               fullRedrawCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldMatchText method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the value passed by the caller is a string */
    if (typeof (value) != 'string') {
      let errorText = 'Value passed to displayFieldMatchText method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the value passed by the caller is not empty. Sadly 
       we must tolerate empty values here to allow Insert to work. */
    if (false && value.length == 0) {
      let errorText = 'Value passed to displayFieldMatchText method is empty';
      HDLmAssert(false, errorText);
    }
    /* Set a set of default values. Some of the defaults values
       are changed below. */
    let optPlaceHolder = "New Match Value";
    /* Check if the subtype specifies that some of 
       the defaults should be overridden */
    if (subType == 'editableproxydefinition') {
      optPlaceHolder = "New Proxy Definition";
    }
    /* Set a few options for text widget built below. Use them
       to build the text widget. Note that we allow empty match
       fields below. This is required so that modifications for
       a home page can be handled. This has been changed. We 
       do not allow empty match fields. */
    let textOptions = {
      "bold":             true,
      "delete":           true,
      "editable":         true,
      "elementSelection": false,
      "emptyFieldOk":     false,
      "placeHolderText":  optPlaceHolder,
      "sizeValue":        30,
      "spellCheck":       false,
      "subType":          subType
    };
    /* The current modification is set to null. This value is not
       or passed by the caller. */
    let textWidgetCurrentModificationNull = null;
    /* Set the full redraw callback address to null. This value 
       is not used in this context. */
    let fullRedrawCallbackNull = null;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let textWidget = new HDLmTextWidget(containerWidget, textOptions,
                                        inputCallback,
                                        description, value,
                                        currentTreeNode,
                                        redrawCallback,
                                        updateCallback, keyDownCallback,
                                        typeType, typeSubType,
                                        fullRedrawCallback,
                                        textWidgetCurrentModificationNull);
    return textWidget;
  }
  /* This routine displays a node identifier value that can be modified */
  static displayFieldNodeIden(typeType, typeSubType,
                              currentTreeNode, containerWidget,
                              inputCallback,
                              description, value, subType,
                              redrawCallback,
                              updateCallback, keyDownCallback,
                              fullRedrawCallback) {
    /* console.log('In HDLmMod.displayFieldNodeIden'); */
    /* console.log(currentTreeNode); */
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldNodeIden method is an array';
      HDLmAssert(false, errorText);
    }
    let optPlaceHolder = "New Node Identifier Value";
    let optUpdateOnEnter = true;
    /* We really don't want to use update on enter if any of 
       inline editors is in use. Of course, the more advanced 
       editors actually use node identifiers. */
    if (HDLmGlobals.checkForInlineEditor())
      optUpdateOnEnter = false;
    let valueString = '';
    /* Set a few options for text widget built below. Use them
       to build the text widget. The text widget is used to display
       and update the node identifier value. */
    let nodeIdenOptions = {
      "delete":           true,
      "editable":         true,
      "elementSelection": true,
      "emptyFieldOk":     true,
      "invokeRedraw":     true,
      "placeHolderText":  optPlaceHolder,
      "sizeValue":        60,
      "spellCheck":       false,
      "subType":          subType,
      "updateOnEnter":    optUpdateOnEnter
    };
    /* We need to convert the value object passed by the caller 
       to an appropriate string. The value object may actually be
       empty. This is not an error condition. */
    valueString = JSON.stringify(value);
    if (valueString == '""' || valueString == '{}')
      valueString = '';
    /* The current modification is set to null. This value is not
       or passed by the caller. */
    let textWidgetCurrentModificationNull = null;
    /* Set the full redraw callback address to null. This value 
       is not used in this context. */
    let fullRedrawCallbackNull = null;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let nodeIdenWidget = new HDLmTextWidget(containerWidget, 
                                            nodeIdenOptions,
                                            inputCallback,
                                            description, 
                                            valueString,
                                            currentTreeNode,
                                            redrawCallback,
                                            updateCallback, keyDownCallback,
                                            typeType, typeSubType,
                                            fullRedrawCallback,
                                            textWidgetCurrentModificationNull);
    return nodeIdenWidget;
  }  
  /* This routine displays a path text value that can be modified.
     We support many types of path text values. The types are  
     simple, regex, glob, and like. Note that a valid path text
     value can never be empty (a zero-length string). Also note that
     a valid path text value will always start with a forward slash. 
     This is true even for like (SQL LIKE) text value that could (hypothetically)
     start with an underscore. */
  static displayFieldPathValue(typeType, typeSubType,
                               currentTreeNode, containerWidget,
                               inputCallback,
                               description, value, subType,
                               redrawCallback,
                               updateCallback, keyDownCallback,
                               fullRedrawCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldPathValue method is an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the value passed by the caller is a string */
    if (typeof(value) != 'string') {
      let errorText = 'Value passed to displayFieldPathValue method is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the value passed by the caller is not empty. Sadly 
       we must tolerate empty values here to allow Insert to work. */
    if (false && value.length == 0) {
      let errorText = 'Value passed to displayFieldPathValue method is empty';
      HDLmAssert(false, errorText);
    }
    /* Make sure the value passed by the caller starts with a forward slash */
    if (value.length >= 1 &&
        value.charAt(0) != '/') {
      let errorText = 'Value passed to displayFieldPathValue method does not start with a forward slash';
      HDLmAssert(false, errorText);
    }
    /* Set a few options for text widget built below. Use them
       to build the text widget. Note that we allow empty path
       name fields below. This is required so that modifications 
       for a home page can be handled. This has been changed. We 
       do not allow empty path value fields. Even a home page field
       has a forward slash. */
    let textOptions = {
      "bold":             true,
      "delete":           true,
      "editable":         true,
      "elementSelection": false,
      "emptyFieldOk":     false,
      "placeHolderText":  "New Path Value",
      "sizeValue":        30,
      "spellCheck":       false,
      "subType":          subType
    };
    /* The current modification is set to null. This value is not
       or passed by the caller. */
    let textWidgetCurrentModificationNull = null;
    /* Set the full redraw callback address to null. This value 
       is not used in this context. */
    let fullRedrawCallbackNull = null;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let textWidget = new HDLmTextWidget(containerWidget, textOptions,
                                        inputCallback,
                                        description, value,
                                        currentTreeNode,
                                        redrawCallback,
                                        updateCallback, keyDownCallback,
                                        typeType, typeSubType,
                                        fullRedrawCallback,
                                        textWidgetCurrentModificationNull);
    return textWidget;
  }
  /* This routine displays a set of protocol type values that can
     be modified. The new protocol value must be in the list of 
     supported protocol type values. */
  static displayFieldProtocolList(typeType, typeSubType,
                                  currentTreeNode, containerWidget,
                                  inputCallback,
                                  description, value, subType,
                                  redrawCallback,
                                  updateCallback, keyDownCallback,
                                  fullRedrawCallback,
                                  deleteCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldProtocolList method is an array';
      HDLmAssert(false, errorText);
    }
    /* We assume that the current field (a list of protocol types) is not 
       editable. This is generally true. However, when the user is creating 
       (inserting) something new, then this field is editable. */
    let optDelete = false;
    let optEditable = false;
    let optInvokeRedraw = false;
    let optPlaceHolderText = '';
    let selectOptionValues;
    /* We need to populate the list of protocol values. The correct list 
       of values does not depend on the current editor type. */
    selectOptionValues = HDLmMod.getProtocolTypeList();
    /* Set a few values based on the (sub) type of data we are handling */
    switch (subType) {
      case 'editableprotocollist':
        optDelete = true;
        optEditable = true;
        /* The invoke redraw option is set to true below.
           This option is forced to true, so that redraw
           will always happen after a protocol list option
           is selected. */ 
        optInvokeRedraw = true;
        optPlaceHolderText = 'Select Protocol';
        break;
      case 'protocollist':
        optDelete = true;
        optEditable = true;
        optPlaceHolderText = 'Select Protocol';
        break;
    }
    /* Set a few options for select widget built below. Use them
       to build the select widget. */
    let selectOptions = {
      "delete":           optDelete,
      "editable":         optEditable,
      "elementSelection": false,
      "invokeRedraw":     optInvokeRedraw,     
      "subType":          subType
    };
    if (optPlaceHolderText != '')
      selectOptions["placeHolderText"] = optPlaceHolderText;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let selectWidget = new HDLmSelectWidget(containerWidget, selectOptions,
                                            inputCallback,
                                            description, value,
                                            selectOptionValues,
                                            redrawCallback,
                                            updateCallback, keyDownCallback,
                                            typeType, typeSubType,
                                            fullRedrawCallback,
                                            deleteCallback);
    return selectWidget;
  }
  /* This routine displays a list of text values that can be modified */
  static displayFieldTextList(typeType, typeSubType,
                              currentTreeNode, containerWidget,
                              inputCallback,
                              description, value, subType,
                              redrawCallback,
                              updateCallback, keyDownCallback,
                              fullRedrawCallback) {
    /* Make sure the value is an array */
    if (Array.isArray(value) == false) {
      let errorText = 'Value passed to displayFieldTextList method is not an array';
      HDLmAssert(false, errorText);
    }
    let optDelete = true;
    let optEditable = true;
    let optEmptyFieldOk = false;
    let optKeepSorted = true;
    let optNewEntry = true;
    let optPlaceHolderText = "";
    let optSetColors = false;
    let optSetImages = false;
    let optSetTexts = true;
    let optSpellCheck = true;
    let optZeroLengthOK = false;
    /* Set a few values based on the (sub) type of data we are handling */
    switch (subType) {
      case 'changeattrs':
        optEditable = true;
        optEmptyFieldOk = true;
        optKeepSorted = false;
        optPlaceHolderText = "New Change Attributes Value";
        optSpellCheck = true;
        break;
      case 'changenodes':
        optEditable = true;
        optEmptyFieldOk = false;
        optKeepSorted = false;
        optPlaceHolderText = "New Change Nodes Value";
        optSpellCheck = false;
        break;
      case 'fontfamily':
        optEditable = false;
        optPlaceHolderText = 'New Font Family';
        break;
      case 'fontkerning':
        optEditable = false;
        optPlaceHolderText = 'New Font Kerning';
        break;
      case 'fontsize':
        optDelete = true;
        optEditable = true;
        optPlaceHolderText = 'New Font Size';
        optSpellCheck = false;
        break;
      case 'fontstyle':
        optEditable = false;
        optPlaceHolderText = 'New Font Style';
        break;
      case 'fontweight':
        optEditable = false;
        optPlaceHolderText = 'New Font Weight';
        break;
      case 'height':
        optEditable = false;
        optPlaceHolderText = 'New Height';
        break;
      case 'order':
        optEditable = true;
        optKeepSorted = false;
        optPlaceHolderText = "New Order Information";
        optSpellCheck = true;
        break;
      case 'remove':
        optEditable = true;
        optKeepSorted = false;
        optPlaceHolderText = "New Remove Value";
        optSpellCheck = true;
        break;
      case 'replace':
        optEditable = true;
        optEmptyFieldOk = true;
        optKeepSorted = false;
        optPlaceHolderText = "New Replace Value";
        optSpellCheck = false;
        break;
      case 'script':
        optEditable = true;
        optEmptyFieldOk = true;
        optKeepSorted = false;
        optPlaceHolderText = "New JS Script";
        optSpellCheck = false;
        break;  
      case 'style':
        optEditable = true;
        optKeepSorted = false;
        optPlaceHolderText = "New Style Information";
        optSpellCheck = false;
        /* Most styles are handled as simple text. However, we handle
           one type of style (background-image) quite differently. For
           background-image's we use thumbnails rather than simple text. */
        let curModExtra = currentTreeNode.details.extra;
        if (curModExtra == 'background-image') {
          optEditable = false;
          optPlaceHolderText = "New Image";
          optSetColors = false;
          optSetImages = true;
          optSetTexts = false;
        }
        break;
      /* This code used to allow zero-length arrays for this sub type.
         Why this was allowed, is not clear. This is no longer true. 
         We now require at least one value for this sub-type. 

         Note that this has been changed yet again (2021/03/09). We
         now allow zero-length arrays. */ 
      case 'target':
        optEditable = true;
        optKeepSorted = false;
        optPlaceHolderText = "New Target";
        optSpellCheck = false;
        optZeroLengthOK = true;
        break;
      case 'text':
        optEditable = true;
        optEmptyFieldOk = false;
        optKeepSorted = false;
        optPlaceHolderText = "New Text";
        optSpellCheck = false;
        break;
      case 'textchecked':
        optEditable = true;
        optEmptyFieldOk = false;
        optKeepSorted = false;
        optPlaceHolderText = "New Text";
        optSpellCheck = false;
        break;
      case 'title':
        optEditable = true;
        optEmptyFieldOk = false;
        optPlaceHolderText = "New Title";
        break;
      case 'visit':
        optKeepSorted = false;
        optPlaceHolderText = "New Visit Value";
        break;
      case 'width':
        optEditable = false;
        optPlaceHolderText = 'New Width';
        break;
      default: {
        let errorString = subType;
        HDLmError.buildError('Error', 'Invalid subtype', 13, errorString);
        return;
      }
    }
    /* Set a few options for list widget built below. Use them
       to build the list widget. Note that the placeholder text
       is only set in some cases. */
    let listOptions = {
      "delete":           optDelete,
      "editable":         optEditable,
      "emptyFieldOk":     optEmptyFieldOk, 
      "elementSelection": false,
      "keepSorted":       optKeepSorted,
      "newEntry":         optNewEntry,
      "setColors":        optSetColors,
      "setImages":        optSetImages,
      "setTexts":         optSetTexts,
      "spellCheck":       optSpellCheck,
      "subType":          subType,
      "zeroLength":       optZeroLengthOK
    };
    if (optPlaceHolderText != '')
      listOptions["placeHolderText"] = optPlaceHolderText;
    /* Note that an anonymous function is provided as a callback to
       redraw the widget. Note that the function uses a closure to
       obtain the node key value. 
       
       A separate callback is provided for updating the actual data
       when the data in the widget is modified. This callback also 
       uses a closure to access the data values array. */ 
    /* console.log(this); */
    /* console.log(typeof this); */ 
    let currentMod = currentTreeNode.details;
    let listWidget = new HDLmListWidget(currentMod,
                                        containerWidget, 
                                        listOptions,
                                        inputCallback,
                                        description,
                                        value,
                                        redrawCallback,
                                        updateCallback,
                                        keyDownCallback,
                                        typeType,
                                        typeSubType,
                                        fullRedrawCallback);
    return listWidget;
  }
  /* This routine displays a type value that can be modified.
     The new value must be in the list of supported type values. */
  static displayFieldTypeList(typeType, typeSubType,
                              currentTreeNode, containerWidget,
                              inlineStartupFlag, 
                              possibleRuleTypes, currentDomElement,
                              inputCallback,
                              description, value, subType,
                              redrawCallback,
                              updateCallback, keyDownCallback,
                              fullRedrawCallback,
                              deleteCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldTypeList method is an array';
      HDLmAssert(false, errorText);
    }
    /* We assume that the current field (a list of types) is not editable.
       This is generally true. However, when the user is creating a new 
       modification, then this field is editable. */
    let optDelete = false;
    let optEditable = false;
    let optPlaceHolderText = 'New Value';
    let optSubType = typeSubType;
    let selectOptionValues;
    /* We need to populate the list of Select values. The correct list  
       of values depends on the current editor type. We use a completely 
       different list of values for the modifications editor versus
       the proxy editor. Note that the list of Select values for the
       configuration editor and the store (stored value) editor and 
       the ignore-lists editor are actually empty. */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config)
      selectOptionValues = HDLmConfig.getConfigTypeList();
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem) {
      selectOptionValues = HDLmPass.getPassTypeList();
      if (currentTreeNode.type == 'mod')
        selectOptionValues = HDLmMod.getModificationTypeList();
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
      selectOptionValues = HDLmPass.getPassTypeList();
      if (currentTreeNode.type == 'mod')
        selectOptionValues = HDLmMod.getModificationTypeList();
      if (possibleRuleTypes != null)
        selectOptionValues = possibleRuleTypes.slice();
      /* console.log(selectOptionValues); */
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
      selectOptionValues = HDLmIgnore.getIgnoreTypeList();
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod)
      selectOptionValues = HDLmMod.getModificationTypeList();
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
      selectOptionValues = HDLmPass.getPassTypeList();
      if (currentTreeNode.type == 'mod')
        selectOptionValues = HDLmMod.getModificationTypeList();
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup) {
      let getPopupDomElementNull = null;
      selectOptionValues = HDLmPopup.getPopupTypeList(getPopupDomElementNull);
      /* console.log('In displayFieldTypeList', currentTreeNode.type, inlineStartupFlag); */
      if (currentTreeNode.type == 'mod' && inlineStartupFlag == true) {
        selectOptionValues = HDLmPopup.getPopupTypeList(HDLmGlobals.domNodeObject);
      }
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy)
      selectOptionValues = HDLmProxy.getProxyTypeList();
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
      let getSimpleTypeListNull = null;
      selectOptionValues = HDLmSimple.getSimpleTypeList(getSimpleTypeListNull);
      if (currentTreeNode.type == 'mod') {
        selectOptionValues = HDLmSimple.getSimpleTypeList(HDLmGlobals.domNodeObject);
      }
      /* console.log(HDLmGlobals.domNodeObject); */
      /* console.log(currentTreeNode); */
    }
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
      selectOptionValues = HDLmStore.getStoreTypeList();
    /* Set a few values based on the (sub) type of data we are handling */
    switch (subType) {
      case 'editableproxytypelist':
        optDelete = true;
        optEditable = true;
        optPlaceHolderText = 'New Proxy Type Value';
        break;
      case 'editableruletypelist':
        optDelete = true;
        optEditable = true;
        optPlaceHolderText = 'New Rule Type Value';
        break;
      case 'typelist':
        optDelete = false;
        optEditable = false;
        break;
    }
    /* Set a few options for select widget built below. Use them
       to build the select widget. */
    let selectOptions = {
      "delete":           optDelete,
      "editable":         optEditable,
      "elementSelection": false,
      "placeHolderText":  optPlaceHolderText,
      "subType":          optSubType
    };
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let selectWidget = new HDLmSelectWidget(containerWidget, selectOptions,
                                            inputCallback,
                                            description, value,
                                            selectOptionValues,
                                            redrawCallback,
                                            updateCallback, keyDownCallback,
                                            typeType, typeSubType,
                                            fullRedrawCallback,
                                            deleteCallback);
    return selectWidget;
  }  
  
  /* This routine displays the use mode value that can be modified */
  static displayFieldUseMode(typeType, typeSubType,
                             currentTreeNode, 
                             containerWidget,
                             inputCallback,
                             description, value, subType,
                             redrawCallback,
                             updateCallback, 
                             keyDownCallback,
                             fullRedrawCallback,
                             currentModification) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldUseMode method is an array';
      HDLmAssert(false, errorText);
    }
    let optPlaceHolder = "New Use Mode Value";
    let optUpdateOnEnter = true;
    /* Set a few options for text widget built below. Use them
       to build the text widget. The text widget is used to display
       and update the use mode value. */
    let useModeOptions = {
      "delete":            true,
      "editable":          true,
      "elementSelection":  false, 
      "emptyFieldOk":      true,
      "invokeRedraw":      false,
      "placeHolderText":   optPlaceHolder,
      "sizeValue":         20,
      "spellCheck":        false,
      "subType":           subType,
      "updateOnEnter":     optUpdateOnEnter
    };
    /* Get the current modification type, if possible. The current modification
       type is obtained from the current modification object, if possible. This 
       is not always possible. */
    let currentModificationType = '';
    if (currentModification != null &&
        (typeof currentModification.details.type) == 'string')
      currentModificationType = currentModification.details.type;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let useModeWidget = new HDLmTextWidget(containerWidget, useModeOptions,
                                           inputCallback,
                                           description, value,
                                           currentTreeNode,
                                           redrawCallback,
                                           updateCallback, 
                                           keyDownCallback,
                                           typeType, typeSubType, 
                                           fullRedrawCallback,
                                           currentModification);
    return useModeWidget;
  }
  /* This routine displays a XPath search value that can be modified */
  static displayFieldXPath(typeType, typeSubType,
                           currentTreeNode, containerWidget,
                           inputCallback,
                           description, value, subType,
                           redrawCallback,
                           updateCallback, keyDownCallback,
                           fullRedrawCallback) {
    /* Make sure the value is not an array */
    if (Array.isArray(value) == true) {
      let errorText = 'Value passed to displayFieldXPath method is an array';
      HDLmAssert(false, errorText);
    }
    let optPlaceHolder = "New XPath Search Value";
    let optUpdateOnEnter = true;
    /* We really don't want to use update on enter if any of the
       inline editors is in use. Of course, the more advanced 
       editors don't really use XPath anyway. */
    if (HDLmGlobals.checkForInlineEditor())
      optUpdateOnEnter = false;
    /* Set a few options for text widget built below. Use them
       to build the text widget. The text widget is used to display
       and update the XPath search value. */
    let xpathOptions = {
      "delete":           true,
      "editable":         true,
      "elementSelection": true,
      "emptyFieldOk":     true,
      "invokeRedraw":     true,
      "placeHolderText":  optPlaceHolder,
      "sizeValue":        60,
      "spellCheck":       false,
      "subType":          subType,
      "updateOnEnter":    optUpdateOnEnter
    };
    /* The current modification is set to null. This value is not
       or passed by the caller. */
    let textWidgetCurrentModificationNull = null;
    /* Set the full redraw callback address to null. This value 
       is not used in this context. */
    let fullRedrawCallbackNull = null;
    /* A callback is provided for updating the actual data when
       the data in the widget is modified. This callback uses a 
       closure to access the current node and the correct field 
       of the current node. */
    let xpathWidget = new HDLmTextWidget(containerWidget, xpathOptions,
                                         inputCallback,
                                         description, value,
                                         currentTreeNode,
                                         redrawCallback,
                                         updateCallback, keyDownCallback,
                                         typeType, typeSubType,
                                         fullRedrawCallback,
                                         textWidgetCurrentModificationNull);
    return xpathWidget;
  }
  /* This routine displays match information as requested by the
     caller. The actual match information is obtained from the 
     server. The match information is displayed as a table. */
  static displayMatch(parentDescriptionId, parentValueId, currentTreeNode) {
    let matchDetails = [];
    let row;
    let saveValue;
    let value;
    let valueLen;
    /* console.log('HDLmMod.displayMatch'); */
    /* console.log('HDLmGlobals.checkActiveExtensionWindow()'); */
    /* Make sure the current node value has been passed */
    if (currentTreeNode == null) {
      let errorText = 'Current tree node value passed to displayMatch is not set';
      HDLmAssert(false, errorText);
    }
    /* Clear a few areas for the match information */
    HDLmMenus.clearPending(); 
    /* Get the node path for the current node. We can build
       the entire node name from the node path. */
    let nodePath = currentTreeNode.nodePath;
    let companyName = nodePath[2];
    let divisionName = nodePath[4];
    let siteName = nodePath[5];
    let ruleName = nodePath[6];
    /* Build the complete name of the rule including the company name, the
       division, the site, and the rule name */
    let extraInfo = companyName + '/' + divisionName + '/' + siteName + '/' + ruleName
    /* Get some information needed to build the match data request */
    let httpType;
    let requestUrl;
    let requestType = 'matchInfo';
    /* Check if we are running in a browser extension window environment.
       Special code is needed to handle this case. */
    if (HDLmGlobals.checkActiveExtensionWindow()) {
      httpType = 'post';
      let proxyName = HDLmConfigInfo.getProxyName();
      let serverName = HDLmConfigInfo.getServerName();
      requestUrl = 'https://' + serverName + '/' + proxyName + '?' + 'requesttype' + '=' + requestType;
      requestUrl += '&' + 'extrainfo' + '=' + encodeURI(extraInfo);
    }
    /* It appears that we are not running in a browser extension window environment. 
       A more conventional approach can be used in this case. */
    else {
      httpType = 'get';
      requestUrl = '';
    }
    let userid = HDLmConfigInfo.getEntriesBridgeUserid();
    let password = HDLmConfigInfo.getEntriesBridgePassword();
    /* Get the Promise used to get the match information */
    let requestAJAXAsyncTrue = true;
    let matchPromise = HDLmAJAX.runAJAX(requestType, 
                                        requestAJAXAsyncTrue, 
                                        requestUrl, 
                                        userid, 
                                        password, 
                                        httpType,
                                        extraInfo); 
    /* Handle the Promise used to obtain match information */
    matchPromise.then(function (responseText) {
      value = JSON.parse(responseText);
      valueLen = value.length;
      /* Remove and save the last element of each array */
      for (let i = 0; i < valueLen; i++) {
        row = value[i];
        saveValue = row.pop();
        matchDetails.push(saveValue);  
        /* Check if we need to add some information to the last element 
           of the current row. This information causes some very special
           formatting much later. */
        if (i > 0 &&
            row.length == 4) {
          let statusValue = row[3];
          /* Add a special value that gets checked for and used much later.
             The value special string Fix001 is checked for much later and
             use for some special formatting. */
          let newStatusValue = 'Fix001' + statusValue; 
          row[3] = newStatusValue;
        }
      }
      /* Create a widget for the match information */
      let containerWidget = currentTreeNode.containerWidget;
      let typeSubType = 'ootableformatchinfo';
      let typeDescription = 'Match Information';
      let newWidget = HDLmMod.displayFieldIOTable('iotable', typeSubType,
                                                  currentTreeNode, containerWidget,
                                                  function () {},
                                                  typeDescription, value, typeSubType,
                                                  function () {},
                                                  function () {},
                                                  function () {},
                                                  function (event, targetId) { 
                                                    HDLmMod.displayMatchDetails(event, targetId, matchDetails,
                                                                                parentDescriptionId, parentValueId, currentTreeNode); 
                                                  },                                                
                                                  function () {});
      /* Create a temporary container widget so that the match information
         can be displayed */
      let typeSource = 'type';
      containerWidget = new HDLmContainerWidget();
      containerWidget.addWidget(newWidget, typeSource);
      containerWidget.render(parentDescriptionId, parentValueId);
    }, function (error) { 
      HDLmError.buildError('Error', 'Match information failure', 14, error);
    });
  }
  /* This routine displays detailed match information as requested by the
     caller. The detailed match information was originally obtained from
     the server. The detailed match information is displayed as formatted
     JSON string. */
  static displayMatchDetails(event, targetId, matchDetails,
                             parentDescriptionId, parentValueId, currentTreeNode) {
    /* Make sure the event value has been passed */
    if (event == null) {
      let errorText = 'Current node value passed to displayMatchDetails is not set';
      HDLmAssert(false, errorText);
    }
    /* Split the target ID into two parts. The second part should show
       what match row we are after */
    let targetIdSplit = targetId.split('_');
    let targetIdSplitLen = targetIdSplit.length;
    HDLmAssert(targetIdSplitLen == 2, `Target ID split length (${targetIdSplitLen}) was not two`);
    let targetRow = Number(targetIdSplit[1]);
    /* Clear a few areas for the match information */
    HDLmMenus.clearPending();
    /* Create a widget for the match information */
    let containerWidget = currentTreeNode.containerWidget;
    let typeSubType = 'matchdetails';
    let typeDescription = 'Match Details';
    let value = matchDetails[targetRow];  
    value = JSON.parse(value);
    let jsonReplacerStringifyNull = null;
    value = JSON.stringify(value, jsonReplacerStringifyNull, 2);
    /* Create a widget for the match information */
    let newWidget = HDLmMod.displayFieldIOText('iotext', typeSubType,
                                               currentTreeNode, containerWidget,
                                               function () {},
                                               typeDescription, value, typeSubType,
                                               function () {},
                                               function () {},
                                               function () {},
                                               function () {}); 
    /* Create a temporary container widget so that the match information
       can be displayed */
    let typeSource = 'type';
    containerWidget = new HDLmContainerWidget();
    containerWidget.addWidget(newWidget, typeSource)
    containerWidget.render(parentDescriptionId, parentValueId);
  }
  /* This routine displays a set of modfication information. This
     routine build the DOM elements needed to display the data. This 
     is the core display modification routine. This routine builds a
     modification on a web page so that changes can be made. Note 
     that many different routines are used for each type of data in
     a modification. 
     
     This routine is passed an actual node. The node may or may not 
     be part of the node tree. This approach allows this routine to
     be used to display a node that is already part of the node tree
     or a node that is being constructed. */
  static displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                    possibleRuleTypes, currentDomElement,
                    useEditorType, newTreeEntry, inlineStartupFlag,
                    handlingCmdInsert, callSource) {
    /* console.log('In HDLmMod.displayMod', parentDescriptionId, parentValueId); */
    /* console.trace(); */
    /* console.log(currentTreeNode); */
    /* console.log(possibleRuleTypes); */
    /* console.log(currentDomElement); */
    /* console.log(useEditorType); */
    /* Make sure the current node value has been passed */
    if (currentTreeNode == null) {
      let errorText = 'Current tree node value passed to displayMod is not set';
      HDLmAssert(false, errorText);
    }
    /* Extract the node path from the current node */
    let nodePath = currentTreeNode.nodePath;
    /* Remove any global error messages for the current tree
       node. Error messages may be added later and they will
       be displayed. */
    let errorFieldNameDelete = HDLmDefines.getString('HDLMERRORTEXT');
    HDLmMod.deleteFieldInformation(currentTreeNode.details, errorFieldNameDelete);
    /* Make sure the node path value has been passed */
    if (nodePath == null) {
      let errorText = 'Node path value passed to displayMod is not set';
      HDLmAssert(false, errorText);
    }
    /* Make sure the node path value is an array */
    if (Array.isArray(nodePath) == false) {
      let errorText = 'Node path value passed to displayMod is not an array';
      HDLmAssert(false, errorText);
    }  
    /* If we are creating a new tree entry (using the insert command),
       we really don't want to search the node tree for an existing   
       node. We want to create a new node. */
    if (newTreeEntry == false) {
      /* Report an error if the current node could not be found 
         using the node path from the current node */
      let currentTreeNodeTemp = HDLmTree.locateTreeNode(nodePath);
      if (currentTreeNodeTemp == null) {
        let nodeString = nodePath.toString();
        console.log('In HDLmMod.displayMod', nodeString);
        HDLmError.buildError('Error', 'Locate', 9, nodeString);
        return;
      }
      /* Report an error if the node found using locate does not
        match the current node */ 
      if (currentTreeNode != currentTreeNodeTemp) {
        let nodeString = nodePath.toString();
        HDLmError.buildError('Error', 'Locate', 27, nodeString);
        return;
      }
    }
    /* Get the complete set of type information. The type of type information
       depends on the current editor type. Note that the editor type (in this
       case) is passed by the caller and not obtained from the global value.
       This allows the authentication editor type to be used with any other
       editor type. */
    let typeInfo;
    if (useEditorType == HDLmEditorTypes.auth)
      typeInfo = HDLmAuth.HDLmAuthInfo;
    else if (useEditorType == HDLmEditorTypes.config)
      typeInfo = HDLmConfig.HDLmConfigInfo;
    else if (useEditorType == HDLmEditorTypes.gem ||
             useEditorType == HDLmEditorTypes.gxe) {
      typeInfo = HDLmPass.HDLmPassInfo;
      if (currentTreeNode.type == 'mod') {
        if (currentTreeNode.details.type == 'newmod')
          typeInfo = HDLmPass.HDLmPassInfo;
        else
          typeInfo = HDLmMod.getModTypeInfo();
      }
      {
        /* console.log('s1'); */
        /* console.log(typeInfo); */
        /* console.log(currentTreeNode); */
      }
    }
    else if (useEditorType == HDLmEditorTypes.ignore)
      typeInfo = HDLmIgnore.HDLmIgnoreInfo;
    else if (useEditorType == HDLmEditorTypes.mod)
      typeInfo = HDLmMod.getModTypeInfo();
    else if (useEditorType == HDLmEditorTypes.pass) {
      typeInfo = HDLmPass.HDLmPassInfo;
      if (currentTreeNode.type == 'mod')
        typeInfo = HDLmMod.getModTypeInfo();
      if (currentTreeNode.hasOwnProperty('details')       &&
          currentTreeNode.details.hasOwnProperty('type')) {
        let currentTreeNodeType = currentTreeNode.details.type;
        if (currentTreeNodeType == 'newmod')
          typeInfo = HDLmPass.HDLmPassInfo
      }             
      /* console.log(typeInfo); */
      /* console.log(currentTreeNode); */
    }
    else if (useEditorType == HDLmEditorTypes.popup) {
      typeInfo = HDLmPopup.HDLmPopupInfo;
      if (currentTreeNode.type == 'mod')
        typeInfo = HDLmMod.getModTypeInfo();
    }
    else if (useEditorType == HDLmEditorTypes.proxy)
      typeInfo = HDLmProxy.HDLmProxyInfo;
    else if (useEditorType == HDLmEditorTypes.simple) {
      typeInfo = HDLmSimple.HDLmSimpleInfo;
      /* console.log(currentTreeNode.type, typeInfo); */
      if (currentTreeNode.type == 'mod') {
        /* console.log('In HDLmMod.displayMod', currentTreeNode.details.type); */        
        if (currentTreeNode.details.type == 'newmod')
          typeInfo = HDLmPass.HDLmPassInfo;
        else
          typeInfo = HDLmMod.getModTypeInfo();
      }
    }
    else if (useEditorType == HDLmEditorTypes.store)
      typeInfo = HDLmStore.HDLmStoreInfo; 
    /* Remove a few properties from the current tree node. These 
       properties may be created below. */
    delete currentTreeNode.containerWidget;
    /* We can only really display a node if it is a modifications node.
       There is really nothing to display for any other node type. Note
       that modification nodes are used on a temporary basis to handle
       the building of new nodes (for insert processing) for companies,
       divisions, and sites. */ 
    if (!currentTreeNode.hasOwnProperty('details'))
      return;
    /* Start to build the container widget that holds all of the other 
       widgets */
    let newWidget;
    /* Create the new container widget and store a reference to the new
       container widget in the current node. These steps allow the new
       container widget to be found from the current node at any time. */
    let containerWidget = new HDLmContainerWidget();
    currentTreeNode.containerWidget = containerWidget;
    /* Get the current modification type from the current node details,
       if possible */
    let modificationType;
    if (HDLmGlobals.checkForAnyPass()) {
      let currentTreeNodeDetails;
      if (currentTreeNode.hasOwnProperty('details'))
        currentTreeNodeDetails = currentTreeNode.details;
      if (typeof(currentTreeNodeDetails) == 'undefined')
        modificationType = currentTreeNode.type;
      else
        modificationType = currentTreeNode.details.type;
    }
    else 
      modificationType = currentTreeNode.details.type;
    /* Check if we have detailed information for the current node type.
       We always should, but you never know. */
    /* console.log('s2'); */
    /* console.log(modificationType, useEditorType, typeInfo); */
    /* console.log('s2.3'); */
    if (!(modificationType in typeInfo)) {
      let errorString = modificationType;
      /* console.log('In HDLmMod.displayMod', errorString); */
      /* console.log('In HDLmMod.displayMod', typeInfo); */
      HDLmError.buildError('Error', 'Lookup', 10, errorString);
      return;
    }
    let typeData = typeInfo[modificationType];
    /* console.log('s2.6'); */ 
    /* At this point we can (and should) mark the current node
       as unchanged. The node may be changed later. However, at
       this point it has not been changed. */
    currentTreeNode.details.updated = false;
    /* Get the array of fields to be displayed */
    let typeFields = typeData.fields;
    let typeFieldsLength = typeFields.length;
    /* console.log('s3'); */  
    /* console.log(typeFieldsLength); */
    for (let i = 0; i < typeFieldsLength; i++) {
      let typeSubType = null;
      let typeDescription = typeFields[i].description;
      /* In one very specific case, we need to change the 
         description a small bit. If we are handling a style with
         a type of background-image, then we may need to change 
         the description. Note that the change in the text is 
         quite minor (but helpful). */
      if (typeDescription == "New Style Information" &&
          currentTreeNode.details.extra == 'background-image')
        typeDescription = "New Style Image Information";
      let typeSource = typeFields[i].source;
      let typeType = typeFields[i].fieldtype;
      /* console.log(typeType); */
      if (typeType == 'boolean'      ||
          typeType == 'checkbox'     ||
          typeType == 'colorlist'    ||
          typeType == 'comminfo'     ||
          typeType == 'cssinfo'      ||
          typeType == 'dateio'       ||
          typeType == 'datetime'     ||
          typeType == 'extrainfo'    || 
          typeType == 'findinfo'     ||
          typeType == 'float'        ||
          typeType == 'imagelist'    ||
          typeType == 'ionumber'     ||
          typeType == 'iotable'      ||
          typeType == 'iotext'       ||
          typeType == 'matchtext'    ||
          typeType == 'nodeiden'     ||
          typeType == 'pathvalue'    ||
          typeType == 'protocollist' ||
          typeType == 'textlist'     ||
          typeType == 'typelist'     ||
          typeType == 'usemode'      ||
          typeType == 'xpathinfo')
        typeSubType = typeFields[i].subtype;
      /* console.log('s4'); */
      /* console.log(typeType, typeSubType); */
      /* In at least two very important cases, we really don't want to 
         display the parameter number field and/or the extra information
         field. If we are running one of the inline editors and the current
         type doesn't use the parameter number and/or extra information, then
         we should not display these fields. */
      if (HDLmGlobals.checkForInlineEditor() &&
          (typeType == 'extrainfo' || typeType == 'ionumber')) {
        if (typeType == 'extrainfo') {
          let extraUsed = HDLmMod.getModificationTypeExtraUsed(modificationType);
          if (extraUsed == false)
            continue;
        }
        if (typeType == 'ionumber') {
          let parmUsed = HDLmMod.getModificationTypeParmNumberUsed(modificationType);
          if (parmUsed == false)
            continue;
        }
      }
      /* If we are running the GUI eXtended Editor (GXE), then some
         additional work needs to be done. We need to change the 
         typelist typeSubType in some cases. We need force some
         fields not to be displayed. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe &&
          HDLmGlobals.checkDataValueTree() == false) {
        /* Check if we are creating a new tree entry */
        if (HDLmGlobals.activeNodeType != null &&
            HDLmGlobals.activeNodeType.startsWith('new')) {
          /* Most fields can just be skipped at this point. We only 
             need to display just a few fields. */
          if (typeType != 'colorlist' &&
              typeType != 'imagelist' &&
              typeType != 'typelist'  &&
              typeType != 'textlist')
            continue;
          /* Skip the type select list if the modification type
             has already been set. If the modification type has
             been set, we can just skip this field. */
          if (typeType == 'typelist') {
            if (modificationType != 'newmod')
              continue;
          }
        }
        /* We are not creating a new tree entry */
        else {
          /* Most fields can just be skipped at this point. We only 
             need to display just a few fields. */
          if (typeType != 'colorlist' &&
              typeType != 'imagelist' &&
              typeType != 'textlist')
            continue;
          /* We don't want to let the user change the rule type if we 
             are not creating a new rule */
          /* console.log(typeType, typeSubType, newTreeEntry); */
          if (typeSubType == 'editableruletypelist')
            typeSubType = 'typelist';
          /* console.log(typeType, typeSubType, newTreeEntry); */
        }
      }
      /* If we are using the Simple editor, then we only want a few 
         fields to be displayed. All of the rest of the fields should
         be skipped. */
      /* console.log(typeType); */
      /* console.log(HDLmGlobals.activeEditorType); */ 
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple) {
        /* console.log(typeType); */
        /* Most fields can just be skipped at this point. We only 
           need to display just a few fields. */
        if (typeType != 'colorlist' &&
            typeType != 'extrainfo' &&
            typeType != 'imagelist' &&
            typeType != 'typelist'  &&
            typeType != 'textlist')
          continue;
        /* Skip the extra information field if the modification type
           has not been set or if the extra information field has been
           set */
        if (typeType == 'extrainfo') {
          if (modificationType == 'newmod')
            continue;
          if (currentTreeNode.hasOwnProperty('details')       &&
              currentTreeNode.details.hasOwnProperty('extra') &&
              currentTreeNode.details.extra != '')
            continue;
        }
        /* Skip the type select list if the modification type
           has already been set. If the modification type has
           been set, we can just skip this field. */
        if (typeType == 'typelist') {
          if (modificationType != 'newmod')
            continue;
        }
      }
      /* Try to get the value of the current field. First we check if
         the value is actually available as a property of the object. 
         We generate an error message if the property is not available. */
      let value;
      /* console.log('s5'); */
      if (!(typeSource in currentTreeNode.details)) {
        let errorString = typeSource;
        /* Report an error if the field is not found in the current node.
           This code is no longer in use. Instead, we display an error
           for the current modification later. */ 
        /* HDLmError.buildError('Error', 'Missing field', 11, errorString); */
        /* Build the error text message and store it in a field of 
           the current node. This error message will be retrieved 
           and displayed later. */
        let errorText = `Field (${typeSource}) not found in current node details`;
        let errorFieldNameSave = HDLmDefines.getString('HDLMERRORTEXT');
        HDLmMod.saveFieldInformation(currentTreeNode.details, errorFieldNameSave, errorText);
        continue;
      }
      /* At this point we can actually extract the value we need. The 
         value might be a simple value or it might be an object or it
         might even be an array. */
      value = currentTreeNode.details[typeSource];
      /* Some additional work is needed for the GUI editor or the GUI extended
         editor or the pass-through editor in some cases. This value must actually 
         be an array of arrays in some cases. */
      if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe ||
          HDLmGlobals.activeEditorType == HDLmEditorTypes.pass) {
        if (typeType == 'iotable') {
          /* Check if we are handling a lines node (set of report lines)
             or a report node. For a report node will need to find the
             lines node that has the children with the actual data. For
             a lines node we will need to find the parent report so 
             that we can get the report type. */
          let linesNode;
          let linesNodeValid = true;
          let currentReportType;
          /* If we are handling a lines node, then the children of the
             lines node will have the data we need. */
          if (currentTreeNode.type == 'lines') {
            linesNode = currentTreeNode;
            /* Get the current node path and remove the name of the lines node */
            let reportNodePath = currentTreeNode.nodePath.slice();
            reportNodePath.pop();
            let reportNode = HDLmTree.locateTreeNode(reportNodePath);
            /* Report an error if the node could not be found */
            if (reportNode == null) {
              let nodeString = reportNodePath.toString();
              console.log('In HDLmMod.displayMod', nodeString);
              HDLmError.buildError('Error', 'Locate', 9, nodeString);
              linesNodeValid = false;
            }
            /* We can now save the report type for use later */
            currentReportType = reportNode.details.reportType;
          }
          /* If we are handling a report node, then we need to find the
             lines node that has the children with the data we need. */
          if (currentTreeNode.type == 'report') {
            /* We can now save the report type for use later */
            currentReportType = currentTreeNode.details.reportType;
            /* Get the current node path and add the name of the lines node */
            let reportNodePath = currentTreeNode.nodePath.slice();
            reportNodePath.push('Overall');
            linesNode = HDLmTree.locateTreeNode(reportNodePath);
            /* Report an error if the node could not be found */
            if (linesNode == null) {
              let nodeString = reportNodePath.toString();
              console.log('In HDLmMod.displayMod', nodeString);
              HDLmError.buildError('Error', 'Locate', 9, nodeString);
              linesNodeValid = false;
            }
          }
          /* Reset the overall value to an empty array */
          value = [];
          /* Get the list of field names we need and the titles for
             each column */
          let curArray = [];
          let fieldNames = [];
          let fieldObjects = HDLmPass.getPassReportFields(currentReportType);
          let fieldKeys = Object.keys(fieldObjects);
          /* Build the headings array and add it to the value array */
          curArray = [];
          for (let fieldKey of fieldKeys) {
            let currentField = fieldObjects[fieldKey];
            let objectNames = Object.keys(currentField);
            for (let objectName of objectNames) {
              let heading = currentField[objectName];
              fieldNames.push(objectName);
              curArray.push(heading);
            }
          }
          value.push(curArray)
          /* The children of the current node will have the data 
             we need */
          if (linesNodeValid) {
            for (let child of linesNode.children) {
              curArray = [];
              let childDetails = child.details;
              for (let fieldName of fieldNames) {
                curArray.push(childDetails[fieldName]);
              }
              value.push(curArray)
            }
          } 
        }
      } 
      /* console.log('s6'); */
      /* console.log(typeType); */
      /* Their are many different types of fields that must be displayed
         in different ways. Handle each type of field using a routine for
         that type of field. */
      switch (typeType) {
        case 'boolean':
          /* The value may need to be changed a bit. The original value
             is a boolean. We need a string. Of course, the first character
             of the string should be in uppercase. */
          value = (value) ? 'Yes' : 'No';
          /* Now that the value has been converted to a standard text
             string, display the value */
          newWidget = HDLmMod.displayFieldIOText(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newTextValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newTextValue = newTextValue.trim();
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newTextValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* In one very specialized case, we need to resolve a Promise
                 that is outstanding. Of course, we can only resolve the 
                 Promise if the container has no errors. We also have to
                 have a resolve routine to invoke. */
              if (currentTreeNode.details.hasOwnProperty('resolve') &&
                  containerWidget.getErrorText() == '') {
                if (currentTreeNode.details.userid == '') {
                  let errorText = 'Userid value has not been stored';
                  HDLmUtility.setErrorText(errorText);
                }
                else if (currentTreeNode.details.password == '') {
                  let errorText = 'Password value has not been stored';
                  HDLmUtility.setErrorText(errorText);
                }
                else {
                  let headerStringEmpty = '';
                  HDLmUtility.setHeader(headerStringEmpty);
                  let localResolve = currentTreeNode.details.resolve;
                  localResolve(JSON.stringify(currentTreeNode.details));
                }
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,  
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldIOText.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            });
          break;          
        case 'checkbox':
          /* The code below defines an anonymous function as the update
             callback. The function is a closure that uses the current
             node and the field name to implement the update. */
          newWidget = HDLmMod.displayFieldCheckBox(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function(newCheckValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details); 
              currentTreeNode.details[typeSource] = newCheckValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue, 
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldCheckBox.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            }
          );
          break;
        /* Note that the update callback must update the values array in place. 
           Creating a new array will not work in this case. */
        case 'colorlist':
          newWidget = HDLmMod.displayFieldColorList(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newValues, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              /* The code below empties the value array and then refills it */
              HDLmMod.trimArray(newValues);
              value.length = 0;
              value.push(...newValues);
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallbackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue, 
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldColorlist.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            }
          );
          break;
        case 'comminfo':
          newWidget = HDLmMod.displayFieldCommentsInformation(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newCommentValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newCommentValue = newCommentValue.trim();
              currentTreeNode.details.updated = true; 
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newCommentValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldCommentsInformation.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                  possibleRuleTypes, currentDomElement,
                                  useEditorType, newTreeEntry, 
                                  inlineStartupFlagFalse, handlingCmdInsert,
                                  callSource);             
           });
          break;
        case 'cssinfo':
          newWidget = HDLmMod.displayFieldCSSSelector(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newCSSValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newCSSValue = newCSSValue.trim();
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newCSSValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallbackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue, 
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldCSSSelector.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                  possibleRuleTypes, currentDomElement,
                                  useEditorType, newTreeEntry, 
                                  inlineStartupFlagFalse, handlingCmdInsert,
                                  callSource);             
            });
          break;
        case 'dateio':
          /* The value may need to be changed a bit. The original value
             may be a date in some internal format. We need to get a 
             string as the final value. */ 
          if (typeof (value) == 'string') {
            value = new Date(value);
            value = value.toLocaleString();
          }
          else if (typeof (value) == 'object' &&
                   value instanceof Date) {
            value = value.toLocaleString();
          }
          /* The value is part of an array so that it can be passed 
             by reference */
          let indirectValue = [value];
          /* Now that the value has been converted to a standard text
             string, display the value */
          newWidget = HDLmMod.displayFieldIODate(typeType, typeSubType,
                                                 currentTreeNode, containerWidget,
                                                 function () {
                                                   containerWidget.displayErrorText();
                                                 },
                                                 typeDescription, value, typeSubType,
                                                 function () {
                                                   containerWidget.render(parentDescriptionId, parentValueId);
                                                 },
                                                 function(newTextValue, noErrors) {
                                                   let rvStr = '';
                                                   let oldNodeState = JSON.stringify(currentTreeNode.details);
                                                   newTextValue = newTextValue.trim();
                                                   currentTreeNode.details.updated = true;
                                                   HDLmMod.resetLastModified(currentTreeNode.details);
                                                   currentTreeNode.details[typeSource] = newTextValue;
                                                   let newNodeState = JSON.stringify(currentTreeNode.details);
                                                   /* Update the database row with the updated node information
                                                      and then possibly reload the current page. This can only
                                                      be done if we have an ID for the current row. Of course,
                                                      we will not have an ID for a new row / node we are 
                                                      inserting. */
                                                  if (noErrors) {
                                                    let ajaxPromise;
                                                    let callFromCallBackTrue = true;
                                                    ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                                                    ajaxPromise.then(function (responseText) {
                                                      HDLmMod.handleUpdateReloadPageUnconditional();
                                                    }, function (error) {
                                                      HDLmError.buildError('Error', 'Pass update failure', 14, error);
                                                    });
                                                  }
                                                  /* In one very specialized case, we need to resolve a Promise
                                                    that is outstanding. Of course, we can only resolve the 
                                                    Promise if the container has no errors. We also have to
                                                    have a resolve routine to invoke. */
                                                  if (currentTreeNode.details.hasOwnProperty('resolve') &&
                                                    containerWidget.getErrorText() == '') {
                                                    if (currentTreeNode.details.userid == '') {
                                                      let errorText = 'Userid value has not been stored';
                                                      HDLmUtility.setErrorText(errorText);
                                                    }
                                                    else if (currentTreeNode.details.password == '') {
                                                      let errorText = 'Password value has not been stored';
                                                      HDLmUtility.setErrorText(errorText);
                                                    }
                                                    else {
                                                      let headerStringEmpty = '';
                                                      HDLmUtility.setHeader(headerStringEmpty);
                                                      let localResolve = currentTreeNode.details.resolve;
                                                      localResolve(JSON.stringify(currentTreeNode.details));
                                                    }
                                                  }
                                                  /* Add the current modify update event to the undo / redo change list */
                                                  HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
                                                  /* At this point we may be able to do some work on a new tree node of
                                                    some type. Of course, we may not be handling a new tree node at this
                                                    point. However, in some cases work on a new tree node is possible. 
                                                    The call below will do the work on the new tree node (if one exists)
                                                    if possible. */
                                                  let addTreeNodeDone;
                                                  let insertIntoDone;
                                                  let callFromCallbackTrue = true;
                                                  let containerAvailableTrue = true;
                                                  let needUserInputTrue = true;
                                                  [insertIntoDone, addTreeNodeDone, rvStr] = 
                                                    HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                                                             possibleRuleTypes, currentDomElement,
                                                                             newTreeEntry, handlingCmdInsert,
                                                                             callFromCallbackTrue, needUserInputTrue);
                                                  return rvStr;
                                                },
                                                /* This callback function handles key down (key press) events from the 
                                                   current widget. The widget may or may not call this routine. */
                                                function (event) {
                                                  HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
                                                },
                                                /* This callback function handles full redraw events. A full redraw
                                                   is needed when even redrawing each widget is not enough. For example,
                                                   when a style is changed (the extra information for a style is changed),
                                                   a full redraw is required. */
                                                function () { 
                                                  /* console.log('about to displaymod'); */
                                                  let callSource = 'HDLmMod.displayMod.displayFieldIODate.fullRedrawCallback';
                                                  let inlineStartupFlagFalse = false;
                                                  HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                                                     possibleRuleTypes, currentDomElement,
                                                                     useEditorType, newTreeEntry, 
                                                                     inlineStartupFlagFalse, handlingCmdInsert,
                                                                     callSource);             
                                                });
          break;    
        case 'datetime':
          /* The value may need to be changed a bit. The original value
             may be a date in some internal format. We need to get a 
             string as the final value. */ 
          if (typeof (value) == 'string') {
            value = new Date(value);
            value = value.toLocaleString();
          }
          else if (typeof (value) == 'object' &&
                   value instanceof Date) {
            value = value.toLocaleString();
          }
          /* Now that the value has been converted to a standard text
             string, display the value */
          newWidget = HDLmMod.displayFieldIOText(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newTextValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newTextValue = newTextValue.trim();
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newTextValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* In one very specialized case, we need to resolve a Promise
                 that is outstanding. Of course, we can only resolve the 
                 Promise if the container has no errors. We also have to
                 have a resolve routine to invoke. */
              if (currentTreeNode.details.hasOwnProperty('resolve') &&
                  containerWidget.getErrorText() == '') {
                if (currentTreeNode.details.userid == '') {
                  let errorText = 'Userid value has not been stored';
                  HDLmUtility.setErrorText(errorText);
                }
                else if (currentTreeNode.details.password == '') {
                  let errorText = 'Password value has not been stored';
                  HDLmUtility.setErrorText(errorText);
                }
                else {
                  let headerStringEmpty = '';
                  HDLmUtility.setHeader(headerStringEmpty);
                  let localResolve = currentTreeNode.details.resolve;
                  localResolve(JSON.stringify(currentTreeNode.details));
                }
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldIOText.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            });
          break;  
        case 'extrainfo':
          newWidget = HDLmMod.displayFieldExtraInformation(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newExtraValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newExtraValue = newExtraValue.trim();
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newExtraValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldExtraInformation.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            },
            /* Pass the address (a reference) to the current modification. This value
               will not be null in most cases */
            currentTreeNode
          );
          break;
        case 'findinfo':
          newWidget = HDLmMod.displayFieldFindInfo(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newValues, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              /* The code below empties the value array and then refills it */
              HDLmMod.trimObjectArray(newValues);
              value.length = 0;
              value.push(...newValues);
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldFindInfo.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                  possibleRuleTypes, currentDomElement,
                                  useEditorType, newTreeEntry, 
                                  inlineStartupFlagFalse, handlingCmdInsert,
                                  callSource);             
            });
          break;
        case 'float':
          newWidget = HDLmMod.displayFieldFloat(typeType, typeSubType,
                                                currentTreeNode, containerWidget,
                                                function () {
                                                  containerWidget.displayErrorText();
                                                },
                                                typeDescription, value, typeSubType,
                                                function () {
                                                  containerWidget.render(parentDescriptionId, parentValueId);
                                                },
                                                function(newFloatValue, noErrors) {
                                                  let rvStr = '';
                                                  let oldNodeState = JSON.stringify(currentTreeNode.details);
                                                  newFloatValue = newFloatValue.trim();
                                                  currentTreeNode.details.updated = true;
                                                  HDLmMod.resetLastModified(currentTreeNode.details);
                                                  currentTreeNode.details[typeSource] = newFloatValue;
                                                  let newNodeState = JSON.stringify(currentTreeNode.details);
                                                  /* Update the database row with the updated node information
                                                     and then possibly reload the current page. This can only
                                                     be done if we have an ID for the current row. Of course,
                                                     we will not have an ID for a new row / node we are 
                                                     inserting. */
                                                  if (noErrors) {
                                                    let ajaxPromise;
                                                    ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                                                    ajaxPromise.then(function (responseText) {
                                                      HDLmMod.handleUpdateReloadPageUnconditional();
                                                    }, function (error) {
                                                      HDLmError.buildError('Error', 'Pass update failure', 14, error);
                                                    });
                                                  }
                                                  /* Add the current modify update event to the undo / redo change list */
                                                  HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
                                                  /* At this point we may be able to do some work on a new tree node of
                                                    some type. Of course, we may not be handling a new tree node at this
                                                    point. However, in some cases work on a new tree node is possible. 
                                                    The call below will do the work on the new tree node (if one exists)
                                                    if possible. */
                                                  let addTreeNodeDone;
                                                  let insertIntoDone;
                                                  let callFromCallbackTrue = true;
                                                  let containerAvailableTrue = true;
                                                  let needUserInputTrue = true;
                                                  [insertIntoDone, addTreeNodeDone, rvStr] = 
                                                    HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                                                              possibleRuleTypes, currentDomElement,
                                                                              newTreeEntry, handlingCmdInsert,
                                                                              callFromCallbackTrue, needUserInputTrue);
                                                  return rvStr;
                                                },
                                                /* This callback function handles key down (key press) events from the 
                                                    current widget. The widget may or may not call this routine. */
                                                function (event) {
                                                  HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
                                                },
                                                /* This callback function handles full redraw events. A full redraw
                                                    is needed when even redrawing each widget is not enough. For example,
                                                    when a style is changed, a full redraw is required. */
                                                function () { 
                                                  /* console.log('about to displaymod'); */
                                                  let callSource = 'HDLmMod.displayMod.displayFieldFloat.fullRedrawCallback';
                                                  let inlineStartupFlagFalse = false;
                                                  HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                                                      possibleRuleTypes, currentDomElement,
                                                                      useEditorType, newTreeEntry, 
                                                                      inlineStartupFlagFalse, handlingCmdInsert,
                                                                      callSource);             
                                                },  
                                                /* Pass the address (a reference) to the current modification. This value
                                                    will not be null in most cases */
                                                currentTreeNode
                                               );
            break;
        /* Note that the update callback must update the values array in place. 
           Creating a new array will not work in this case. */
        case 'imagelist':
          newWidget = HDLmMod.displayFieldImageList(typeType, typeSubType,
                                                    currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newValues, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              /* The code below empties the value array and then refills it */
              HDLmMod.trimArray(newValues);
              value.length = 0;
              value.push(...newValues);
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue, 
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldImageList.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                  possibleRuleTypes, currentDomElement,
                                  useEditorType, newTreeEntry, 
                                  inlineStartupFlagFalse, handlingCmdInsert,
                                  callSource);             
            }
          );
          break;
        /* Display a number value. The updated number value may be returned 
           as a string and the string might even be empty. We need to be able
           to handle all of these cases. The code below provides an update 
           callback function. */
        case 'ionumber':
          /* console.log('ionumber'); */
          newWidget = HDLmMod.displayFieldIONumber(typeType, typeSubType,
                                                     currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function(newNumberValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newNumberValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              /* console.log('ionumber function 1'); */
              /* console.log(noErrors); */
              /* console.log(currentTreeNode); */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldDisplayFieldIONumber.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            }
          );
          break;
        /* Display an input/output HTML table. At present tables are output-only. 
           However, this might change in the future. This code will display all 
           of the data in the table. */
        case 'iotable':
          newWidget = HDLmMod.displayFieldIOTable(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function(newNumberValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newNumberValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles redraw requests */
            function () {},
            /* This callback function handles mouse (left-click) events from the
               current widget. The widget may or may not call this routine. */
            function (event) { 
            },
            /* This callback function handles full redraw requests */
            function () {});
          break;
        case 'iotext':
          newWidget = HDLmMod.displayFieldIOText(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newTextValue, noErrors) {
              /* console.log('In HDLmMod.displayMod iotext callback update function', newTextValue, noErrors); */
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newTextValue = newTextValue.trim();
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newTextValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* console.log('In HDLmMod.displayMod', newTreeEntry, noErrors); */
              /* console.trace(); */
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* In one very specialized case, we need to resolve a Promise
                 that is outstanding. Of course, we can only resolve the 
                 Promise if the container has no errors. We also have to
                 have a resolve routine to invoke. */
              if (currentTreeNode.details.hasOwnProperty('resolve') &&
                  containerWidget.getErrorText() == '') { 
                if (currentTreeNode.details.userid == '') {
                  let errorText = 'Userid value has not been stored';
                  HDLmUtility.setErrorText(errorText); 
                }
                else if (currentTreeNode.details.password == '') {
                  let errorText = 'Password value has not been stored';
                  HDLmUtility.setErrorText(errorText); 
                }
                else {
                  let headerStringEmpty = '';
                  HDLmUtility.setHeader(headerStringEmpty); 
                  let localResolve = currentTreeNode.details.resolve;
                  localResolve(JSON.stringify(currentTreeNode.details));
                }
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              /* console.log('In HDLmMod.displayMod', newTreeEntry); */
              /* console.trace(); */
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              /* console.log('In iotext callback event function', event); */
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldIOText.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            });
          break;
        /* Display a match text field. The leading slash is not removed from the
           match text values in most cases. Note that for regex match text fields,
           the leading slash is removed. Regex match text values actually start
           with two forward slashes. The first one is removed for display
           purposes. The stored value actually has both forward slashes. */
        case 'matchtext':
          if (value.length >= 3      &&
              value.charAt(0) == '/' &&
              value.charAt(1) == '/' &&
              value.charAt(value.length - 1) == '/')
            value = value.substr(1);
          newWidget = HDLmMod.displayFieldMatchText(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newTextValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newTextValue = newTextValue.trim();
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              /* Check if we need to prefix the new value with a forward slash.
                 This is only done if the new value is a regex value. The test
                 for regex values is quite simplistic. If the first and last
                 characters of the new value are foward slashes, the we assume
                 that we are handling a regex. Otherwise, we assume that we are
                 not handling a regex. */
              if (newTextValue.length >= 2 &&
                newTextValue.charAt(0) == '/' &&
                newTextValue.charAt(newTextValue.length - 1) == '/')
                currentTreeNode.details[typeSource] = '/' + newTextValue;
              else
                currentTreeNode.details[typeSource] = newTextValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue, 
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldMatchText.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            });
          break;
        /* Display a node identifier field. A node identifier field has information
           used to uniquely find a specific node. The information is actually stored
           in JSON form for use by the search routines. */
        case 'nodeiden':
          newWidget = HDLmMod.displayFieldNodeIden(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newNodeIdenValue, noErrors) {
              let rvStr = '';
              let newNodeIdenValueObject = {};
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newNodeIdenValue = newNodeIdenValue.trim();
              /* Convert the new node identifier value from a string to 
                 an object. The string is actually a JSON string. The 
                 object is a standard JavaScript object. */
              if (newNodeIdenValue != '')
                newNodeIdenValueObject = JSON.parse(newNodeIdenValue);
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newNodeIdenValueObject;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldNodeIden.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            });
          break;
        /* Display a path text field. The leading slash is not removed from the
           path text values in most cases. Note that for regex path text 
           fields, the leading slash is removed. Regex path text values actually 
           start with two forward slashes. The first one is removed for display 
           purposes. The stored value actually has both forward slashes. */
        case 'pathvalue':
          if (value.length >= 3 &&
              value.charAt(0) == '/' &&
              value.charAt(1) == '/' &&
              value.charAt(value.length - 1) == '/')
              value = value.substr(1);
          newWidget = HDLmMod.displayFieldPathValue(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newTextValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newTextValue = newTextValue.trim();
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              /* Check if we need to prefix the new value with a forward slash.
                 This is only done if the new value is a regex value. The test
                 for regex values is quite simplistic. If the first and last
                 characters of the new value are foward slashes, the we assume
                 that we are handling a regex. Otherwise, we assume that we are
                 not handling a regex. */
              if (newTextValue.length >= 2      &&
                  newTextValue.charAt(0) == '/' &&
                  newTextValue.charAt(1) != '/' &&
                  newTextValue.charAt(newTextValue.length - 1) == '/')
                currentTreeNode.details[typeSource] = '/' + newTextValue;
              else
                currentTreeNode.details[typeSource] = newTextValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallbackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldPathValue.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                  possibleRuleTypes, currentDomElement,
                                  useEditorType, newTreeEntry, 
                                  inlineStartupFlagFalse, handlingCmdInsert,
                                  callSource);             
            });
          break;
        case 'protocollist':
          newWidget = HDLmMod.displayFieldProtocolList(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newTypeValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newTypeValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              /* We want to force a full redraw at this point. The proxy entry may
                 or may not have errors at this point. However, a full redraw is 
                 needed to get the last modified date and time value displayed. */
              /* console.log(rvStr, noErrors); */                           
              rvStr = 'fullRedraw';                           
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () {
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldProtocolList.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, inlineStartupFlagFalse,
                                 handlingCmdInsert,
                                 callSource);
            },
            /* This callback function handles delete requests. A delete request
               occurs when the delete key is uses. */
            function () {
            });
          break;
        case 'textlist':
          newWidget = HDLmMod.displayFieldTextList(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newValues, noErrors) {
              /* console.log('In HDLmMod.displayMod textlist update callback function', newValues, noErrors); */
              /* console.trace(); */
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              /* console.log(currentTreeNode, currentTreeNode); */
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              /* The code below empties the value array and then refills it */
              HDLmMod.trimArray(newValues);
              value.length = 0;
              value.push(...newValues);
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* console.log('In HDLmMod.displayMod', newTreeEntry, noErrors); */
              /* console.trace(); */
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              /* console.log('In HDLmMod.displayMod', newTreeEntry); */
              /* console.trace(); */ 
              /* console.log(rvStr); */ 
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              /* console.log(insertIntoDone); */
              /* console.log(addTreeNodeDone); */
              /* console.log(rvStr); */
              /* console.log(newTreeEntry); */
              /* The update call must not return the string finished in some cases.
                 The string finished causes the text list add new entry routine not
                 to call the redraw routine. We must use the redraw routine in some
                 cases. */
              if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
                /* console.log('In HDLmMod.displayFieldTextList.updateCallback', callSource); */
                if (rvStr == 'finished')
                  rvStr = '';
              }
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              /* console.log('In textlist callback event function', event); */
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldTextList.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            }          
          );
          break;
        case 'typelist':
          /* console.log(currentDomElement); */
          newWidget = HDLmMod.displayFieldTypeList(typeType, typeSubType,
            currentTreeNode, containerWidget,
            inlineStartupFlag, 
            possibleRuleTypes, currentDomElement,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newTypeValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              let oldTypeValue = currentTreeNode.details[typeSource];
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              /* At this point, the user may have changed the type of
                 the current modification. This change requires that 
                 many things be done. The code below tries to make all
                 of the required changes.

                 However, in a few cases, we really don't want to do this.
                 If the current type is 'newmod', then we really don't 
                 want to delete and add fields. This will be done for 
                 'newmod' by the finishTreeNode call below. 

                 For a new proxy entry, we don't want to do this because
                 new proxy entries don't have fields that must be deleted
                 and added. */
              if (1 == 1) {                 
                if (oldTypeValue != 'newmod' &&
                    oldTypeValue != 'newcompproxy') {
                  HDLmMenus.dataFieldDelete(currentTreeNode, oldTypeValue);
                  HDLmMenus.dataFieldAdd(currentTreeNode, newTypeValue, "typelist possible change");
                  rvStr = 'fullRedraw';
                }
              }
              currentTreeNode.details[typeSource] = newTypeValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              /* console.log(currentDomElement); */
              HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                       possibleRuleTypes, currentDomElement,
                                       newTreeEntry, handlingCmdInsert,
                                       callFromCallbackTrue, needUserInputTrue);
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* Check if the return value string contains a set of special text
                 calling for a full redraw. This special value is returned from 
                 this routine. The caller (really invoker) checks the return 
                 value and asks for a full redraw if need be. */
              if (rvStr == 'fullRedraw') 
                return rvStr;
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw requests. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () {
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldTypeList.fullRedrawCallback';
              let localInlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, localInlineStartupFlagFalse,
                                 handlingCmdInsert,
                                 callSource);
            },
            /* This callback function handles delete requests. A delete request
               occurs when the delete key is used. */
            function () {
              let oldType = currentTreeNode.details.type;
              /* If the old type was actually set, then we need to delete a 
                 field from the details of the current node. This field was 
                 created for the old type and is no longer needed. */
              if (oldType != 'newmod') {
                let oldFieldsObject = HDLmModInfoData[oldType];
                let oldFieldsArray = oldFieldsObject['fields'];
                let oldFieldsArrayLength = oldFieldsArray.length;
                let oldField = oldFieldsArray[oldFieldsArrayLength - 1];
                let oldFieldSource = oldField['source'];
                delete currentTreeNode.details[oldFieldSource];
                currentTreeNode.details.type = 'newmod';
                /* We used to reset the extra information to a zero
                   length string in all cases. However, this code is
                   no longer in use. We just leave the extra information
                   field alone. */
                /* currentTreeNode.details.extra = ''; */
              }
            });
          break;        
        case 'usemode':
          newWidget = HDLmMod.displayFieldUseMode(typeType, typeSubType,
                                                  currentTreeNode, containerWidget,
                                                  function () {
                                                    containerWidget.displayErrorText();
                                                  },
                                                  typeDescription, value, typeSubType,
                                                  function () {
                                                    containerWidget.render(parentDescriptionId, parentValueId);
                                                  },
                                                  function(newUseModeValue, noErrors) {
                                                    let rvStr = '';
                                                    let oldNodeState = JSON.stringify(currentTreeNode.details);
                                                    newUseModeValue = newUseModeValue.trim();
                                                    currentTreeNode.details.updated = true;
                                                    HDLmMod.resetLastModified(currentTreeNode.details);
                                                    currentTreeNode.details[typeSource] = newUseModeValue;
                                                    let newNodeState = JSON.stringify(currentTreeNode.details);
                                                    /* Update the database row with the updated node information
                                                      and then possibly reload the current page. This can only
                                                      be done if we have an ID for the current row. Of course,
                                                      we will not have an ID for a new row / node we are 
                                                      inserting. */
                                                    if (noErrors) {
                                                      let ajaxPromise;
                                                      ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                                                      ajaxPromise.then(function (responseText) {
                                                        HDLmMod.handleUpdateReloadPageUnconditional();
                                                      }, function (error) {
                                                        HDLmError.buildError('Error', 'Pass update failure', 14, error);
                                                      });
                                                    }
                                                    /* Add the current modify update event to the undo / redo change list */
                                                    HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
                                                    /* At this point we may be able to do some work on a new tree node of
                                                      some type. Of course, we may not be handling a new tree node at this
                                                      point. However, in some cases work on a new tree node is possible. 
                                                      The call below will do the work on the new tree node (if one exists)
                                                      if possible. */
                                                    let addTreeNodeDone;
                                                    let insertIntoDone;
                                                    let callFromCallbackTrue = true;
                                                    let containerAvailableTrue = true;
                                                    let needUserInputTrue = true;
                                                    [insertIntoDone, addTreeNodeDone, rvStr] = 
                                                      HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                                                              possibleRuleTypes, currentDomElement,
                                                                              newTreeEntry, handlingCmdInsert,
                                                                              callFromCallbackTrue, needUserInputTrue);
                                                    return rvStr;
                                                  },
                                                  /* This callback function handles key down (key press) events from the 
                                                     current widget. The widget may or may not call this routine. */
                                                  function (event) {
                                                    HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
                                                  },
                                                  /* This callback function handles full redraw events. A full redraw
                                                     is needed when even redrawing each widget is not enough. For example,
                                                     when a style is changed, a full redraw is required. */
                                                  function () { 
                                                    /* console.log('about to displaymod'); */
                                                    let callSource = 'HDLmMod.displayMod.displayFieldUseMode.fullRedrawCallback';
                                                    let inlineStartupFlagFalse = false;
                                                    HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                                                       possibleRuleTypes, currentDomElement,
                                                                       useEditorType, newTreeEntry, 
                                                                       inlineStartupFlagFalse, handlingCmdInsert,
                                                                       callSource);             
                                                  },
                                                  /* Pass the address (a reference) to the current modification. This value
                                                    will not be null in most cases */
                                                  currentTreeNode
                                                );
            break;
        case 'xpathinfo':
          newWidget = HDLmMod.displayFieldXPath(typeType, typeSubType,
            currentTreeNode, containerWidget,
            function () {
              containerWidget.displayErrorText();
            },
            typeDescription, value, typeSubType,
            function () {
              containerWidget.render(parentDescriptionId, parentValueId);
            },
            function(newXPathValue, noErrors) {
              let rvStr = '';
              let oldNodeState = JSON.stringify(currentTreeNode.details);
              newXPathValue = newXPathValue.trim();
              currentTreeNode.details.updated = true;
              HDLmMod.resetLastModified(currentTreeNode.details);
              currentTreeNode.details[typeSource] = newXPathValue;
              let newNodeState = JSON.stringify(currentTreeNode.details);
              /* Update the database row with the updated node information
                 and then possibly reload the current page. This can only
                 be done if we have an ID for the current row. Of course,
                 we will not have an ID for a new row / node we are 
                 inserting. */
              if (noErrors) {
                let ajaxPromise;
                let callFromCallBackTrue = true;
                ajaxPromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntry);
                ajaxPromise.then(function (responseText) {
                  HDLmMod.handleUpdateReloadPageUnconditional();
                }, function (error) {
                  HDLmError.buildError('Error', 'Pass update failure', 14, error);
                });
              }
              /* Add the current modify update event to the undo / redo change list */
              HDLmUnRe.addModify(currentTreeNode.nodePath, oldNodeState, newNodeState);
              /* At this point we may be able to do some work on a new tree node of
                 some type. Of course, we may not be handling a new tree node at this
                 point. However, in some cases work on a new tree node is possible. 
                 The call below will do the work on the new tree node (if one exists)
                 if possible. */
              let addTreeNodeDone;
              let insertIntoDone;
              let callFromCallbackTrue = true;
              let containerAvailableTrue = true;
              let needUserInputTrue = true;
              [insertIntoDone, addTreeNodeDone, rvStr] = 
                HDLmMenus.finishTreeNode(currentTreeNode, containerAvailableTrue,
                                         possibleRuleTypes, currentDomElement,
                                         newTreeEntry, handlingCmdInsert,
                                         callFromCallbackTrue, needUserInputTrue);
              return rvStr;
            },
            /* This callback function handles key down (key press) events from the 
               current widget. The widget may or may not call this routine. */
            function (event) {
              HDLmMenus.handleKeyboardWidget(currentTreeNode, event);
            },
            /* This callback function handles full redraw events. A full redraw
               is needed when even redrawing each widget is not enough. For example,
               when a style is changed (the extra information for a style is changed),
               a full redraw is required. */
            function () { 
              /* console.log('about to displaymod'); */
              let callSource = 'HDLmMod.displayMod.displayFieldXPath.fullRedrawCallback';
              let inlineStartupFlagFalse = false;
              HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                                 possibleRuleTypes, currentDomElement,
                                 useEditorType, newTreeEntry, 
                                 inlineStartupFlagFalse, handlingCmdInsert,
                                 callSource);             
            }
          );
          break;
        default: {
          let errorString = typeType;
          HDLmError.buildError('Error', 'Invalid type', 12, errorString);
          continue;
        }
      }
      /* Add the new widget to the widget container */
      containerWidget.addWidget(newWidget, typeSource);
    }
    /* At this point all of the widgets in the widgets container have
       been constructed and added to the widgets container. Invoking
       the render method on the widgets container will draw all of the
       widgets. */
    containerWidget.render(parentDescriptionId, parentValueId);
    /* We can now show what modification is displayed by putting 
       the current modification node path in one of the divs. What
       actually happens is that the node path is converted to a 
       string and stored as an attribute. */ 
    HDLmHtml.storeNodePath(nodePath);
    /* Check if we have any error text to display. If we do, we
       display, the error text. */
    let errorFieldNameCheck = HDLmDefines.getString('HDLMERRORTEXT');
    if (HDLmMod.checkIfFieldInformationExists(currentTreeNode.details, errorFieldNameCheck)) {
      let errorText = HDLmMod.getFieldInformation(currentTreeNode.details, errorFieldNameCheck);
      HDLmUtility.setErrorText(errorText);
    }
  } 
  /* This routine displays a set of modfication information. This
     routine build the DOM elements needed to display the data. This 
     is the core display modification routine. This routine builds a
     modification on a web page so that changes can be made. Note 
     that many different routines are used for each type of data in
     a modification. 
     
     This routine must be passed a node path for a node that is actually 
     part of the node tree. The node path is used to locate the node in
     the node tree. If the locate fails, an error is reported. */
  static displayModTree(parentDescriptionId, parentValueId, nodePath, 
                        inlineStartupFlag, handlingCmdInsert,
                        possibleRuleTypes, currentDomElement) {
    /* Make sure the node path value has been passed */
    if (nodePath == null) {
      let errorText = 'Node path value passed to displayModTree is not set';
      HDLmAssert(false, errorText);
    }
    /* Make sure the node path value is an array */
    if (Array.isArray(nodePath) == false) {
      let errorText = 'Node path value passed to displayModTree is not an array';
      HDLmAssert(false, errorText);
    }
    /* Search for the current node in the node tree */
    let currentTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the node could not be found */
    if (currentTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmMod.displayModTree', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return;
    }
    /* At this point we need to set the active node based
       on whatever tree node was activated */
    if (currentTreeNode.hasOwnProperty('details')) {
      let newType = currentTreeNode.details.type;
      HDLmGlobals.setActiveNodeType(newType); 
    }
    /* Display the node from the node tree */
    let callSource = 'HDLmMod.displayModTree';
    let newTreeEntryFalse = false;
    /* console.log('about to displaymod'); */
    HDLmMod.displayMod(parentDescriptionId, parentValueId, currentTreeNode,
                       possibleRuleTypes, currentDomElement,
                       HDLmGlobals.activeEditorType, newTreeEntryFalse,
                       inlineStartupFlag, handlingCmdInsert,
                       callSource);
  }
  /* This routine displays stats (statistics) information as requested 
     by the caller. The actual stats information is obtained from the 
     server. The stats information is displayed as a table. */
  static displayStats(parentDescriptionId, parentValueId, currentTreeNode) {
    let row;
    let saveValue;
    let value;
    let valueLen;
    /* console.log('HDLmMod.displayStats'); */
    /* console.log('HDLmGlobals.checkActiveExtensionWindow()'); */
    /* Make sure the current node value has been passed */
    if (currentTreeNode == null) {
      let errorText = 'Current tree node value passed to displayStats is not set';
      HDLmAssert(false, errorText);
    }
    /* Clear a few areas for the stats information */
    HDLmMenus.clearPending();
    /* Get the node path for the current node. We can build
       the entire node name from the node path. */
    let nodePath = currentTreeNode.nodePath;
    let companyName = nodePath[2];
    let divisionName = nodePath[4];
    let siteName = nodePath[5];
    let ruleName = nodePath[6];
    /* Build the complete name of the rule including the company name, the
       division, the site, and the rule name */
    let extraInfo = companyName + '/' + divisionName + '/' + siteName + '/' + ruleName
    /* Get some information needed to build the statistics data request */
    let httpType;
    let requestUrl;
    let requestType = 'statsInfo';
    /* Check if we are running in a browser extension window environment. 
       Special code is needed to handle this case. */
    if (HDLmGlobals.checkActiveExtensionWindow()) {
      httpType = 'post';
      let proxyName = HDLmConfigInfo.getProxyName();
      let serverName = HDLmConfigInfo.getServerName();
      requestUrl = 'https://' + serverName + '/' + proxyName + '?' + 'requesttype' + '=' + requestType;
      requestUrl += '&' + 'extrainfo' + '=' + encodeURI(extraInfo);
    }
    /* It appears that we are not running in a browser extension window environment.
       A more conventional approach can be used in this case. */
    else {
      httpType = 'get';
      requestUrl = '';
    }
    /* Get some information needed to build the stats data request */
    let userid = HDLmConfigInfo.getEntriesBridgeUserid();
    let password = HDLmConfigInfo.getEntriesBridgePassword();
    /* Get the Promise used to get the stats information */
    let requestAJAXAsyncTrue = true;
    let statsPromise = HDLmAJAX.runAJAX(requestType, requestAJAXAsyncTrue, requestUrl, userid, password, httpType, extraInfo);
    /* Handle the Promise used to obtain stats information */
    statsPromise.then(function (responseText) {
      value = JSON.parse(responseText);
      /* Create a widget for the stats information */
      let containerWidget = currentTreeNode.containerWidget;
      let typeSubType = 'ootableforstatsinfo';
      let typeDescription = 'Statistics Information';
      let newWidget = HDLmMod.displayFieldIOTable('iotable', typeSubType,
                                                  currentTreeNode, containerWidget,
                                                  function () {},
                                                  typeDescription, value, typeSubType,
                                                  function () {},
                                                  function () {},
                                                  function () {},
                                                  function () {},
                                                  function () {});
      /* Create a temporary container widget so that the stats information
         can be displayed */
      let typeSource = 'type';
      containerWidget = new HDLmContainerWidget();
      containerWidget.addWidget(newWidget, typeSource);
      containerWidget.render(parentDescriptionId, parentValueId);
    }, function (error) {
      HDLmError.buildError('Error', 'Stats information failure', 14, error);
    });
  }
  /* The next method is invoked to fix a modification object. Modification
     objects may or may not be constructed correctly. This method fixes a 
     few modification structure errors. In some cases, we have single values
     (that may be objects), where we need arrays. The code below finds these
     single values and converts them into arrays. This code does not appear
     to be in use. */
  static fixMod(modValue) {
    let typeType = modValue.type;
    let modInfo = HDLmMod.getModTypeInfo();
    /* Get the modification information for the current type */
    let modInfoType = modInfo[typeType];
    let modInfoFields = modInfoType['fields'];
    /* Check all of the fields in the modification passed by the
       caller */
    for (let i = 0; i < modInfoFields.length; i++) {
      /* Only certain types of fields need to be checked. Skip all
         field types that don't need to be checked. */
      let fieldType = modInfoFields[i].fieldtype;
      if (fieldType != 'findinfo' &&
          fieldType != 'colorlist' &&
          fieldType != 'imagelist' &&
          fieldType != 'textlist')
        continue;
      let fieldName = modInfoFields[i].source;
      HDLmMod.fixModArray(modValue, fieldName);
    }
  }
  /* Check and possibly fix one property of an object. The caller 
     passes the object and the property name. This routine does 
     all of the work needed to make sure the property ends up as
     an array. This routine is only invoked by the fixMod routine
     which does not appear to be in use. */
  static fixModArray(modValue, propName) {
    let saveValue;
    /* Check if the designated property is an array or not. The property 
       must always be an array, even if the array has zero entries or 
       just one entry. */
    if (modValue.hasOwnProperty(propName) == false)
      modValue[propName] = [];
    else if (Array.isArray(modValue[propName]) == false) {
      saveValue = modValue[propName];
      modValue[propName] = [saveValue];
    }
  }
  /* This routine gets the comments string from the current set of details 
     (an HDLmMod) and returns the value to the caller */
  getComments() {
    return this.comments;
  }
  /* This routine gets the CSS selector string from the current set of details 
     (an HDLmMod) and returns the value to the caller */
  getCssSelector() {
    return this.cssselector;
  }
  /* The routine gets some field from an object. The actual 
     use of this routine is to get an error text field from 
     a tree node object. However, this routine could be used for 
     anything. */
  static getFieldInformation(currentObject, fieldName) {
    /* Make sure the current object is an object */
    if (typeof(currentObject) != 'object') {
      let errorText = 'Current object passed to getFieldInformation is not an object';
      HDLmAssert(false, errorText);
    }
    /* Make sure the field name is a string */
    if (typeof(fieldName) != 'string') {
      let errorText = 'Field name passed to getFieldInformation is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the field name length is greater then zero */
    if (fieldName.length <= 0) {
      let errorText = 'Field name length passed to getFieldInformation is not positive';
      HDLmAssert(false, errorText);
    }
    return currentObject[fieldName];
  }
  /* This routine gets the finds array from the current set of details 
     (an HDLmMod) and returns the value to the caller */
  getFinds() {
    return this.find;
  }
  /* This method builds an object with the complete structure 
	   needed to build the rule tree. The format of this object
	   does not exactly match the structure that comes back from
	   the bridge. 
	   
	   The bridge returns a row for each node in the node tree. As a 
	   practical matter all of the rows are obtained with a single 
	   REST call to the bridge server. 
	   
	   The caller can optionally pass a host name value. The host name 
	   value will be used to filter the rule tree. Note that the host 
	   name may not match any actual host names. This is not an error
	   condition. 
	   
	   This routine does not appear to be actually in use. The web socket
	   code that invokes this code appears to be inactive.
	   
	   Pass-through is part of the method name to help distinguish between
	   different routines that used to have the same name. */
  static getJsonTreePassThru(contentType, hostName) {
    /* Check if the content type reference passed by the caller is null */
    if (contentType == null) {
      let errorText = "Content type passed to getJsonTreePassThru is null";
      HDLmAssert(false, errorText);
    }		
  }
  /* Get the modification name for the current node. Only actual 
     modification nodes have a modification name. First we find
     the node using the node path passed by the caller. Then we 
     check if this is a modification node. If it is, we return the
     modification name to the caller. Otherwise we return an empty
     string. This routine does not appear to be in use at this time. */
  static getModName(nodePath) {
    let rvStr = '';
    /* Search for the current node in the node tree */
    let currentTreeNode = HDLmTree.locateTreeNode(nodePath);
    /* Report an error if the node could not be found */
    if (currentTreeNode == null) {
      let nodeString = nodePath.toString();
      console.log('In HDLmMod.getModName', nodeString);
      HDLmError.buildError('Error', 'Locate', 9, nodeString);
      return rvStr;
    }
    /* Only modification nodes have modification names */
    if (currentTreeNode.type != 'mod')
      return rvStr;
    /* The modification name is the last entry in the node path
       array */
    let nodePathLen = nodePath.length;
    return nodePath[nodePathLen - 1];
  }
  /* Get the name of the data array that may be associated 
     with the current rule type. The returned value will be
     a string with the array name or it will be null. */
  static getModificationArrayName(ruleType) {
    /* Make sure the rule type is in the modification information
       data structure */
    if (!HDLmModInfoData.hasOwnProperty(ruleType)) {
      let errorText = `Rule type (${ruleType}) not found in modification data`;
      HDLmAssert(false, errorText);
    }
    /* Get the array of fields for the current rule type */
    let modTypeInfo = HDLmModInfoData;
    let modTypeData = modTypeInfo[ruleType];
    /* Get the array of fields for the current data type */
    let modFields = modTypeData.fields;
    let modFieldsLength = modFields.length;
    /* Get the last field in the field array */
    let modField = modFields[modFieldsLength - 1];
    /* Make sure we have a data type and source field */
    if (!modField.hasOwnProperty('datatype'))
      return null;
    let dataTypeValue = modField.datatype;
    /* Make sure that the data type is an array */
    if (dataTypeValue != 'array')
      return null;
    /* Make sure we have a source */
    if (!modField.hasOwnProperty('source'))
      return null;
    return modField.source;
  }
  /* Get some information about a type of HTML modification. 
     The caller passes HTML modification type. This routine
     returns a set of information about the type. If the type
     is unknown, than a NULL value is returned to the caller. */
  static getModificationTypeInfo(typeStr) {
    /* Check if information for type specified by the caller exists */
    if (HDLmModTypeInfo.hasOwnProperty(typeStr))
      return HDLmModTypeInfo[typeStr];
    return null;
  }
  /* Get the list of modification types supported by this code. 
     The list of types is returned to the caller as an array. */
  static getModificationTypeList() { 
    return Object.keys(HDLmModTypeInfo);
  }
  /* This method returns a boolean showing if a modification type
     requires extra information or not. Most types of rules do not 
     use extra information. However, some do use extra information 
     and actually require it. This method takes a modification type 
     string and returns a boolean showing if extra information is 
     required or not. If the type is unknown, than a null value is 
     returned to the caller. Note that a modification type that uses 
     extra information may or may not require extra information. */
  static getModificationTypeExtraRequired(typeStr) {
    /* Check if information for type specified by the caller exists */
    if (HDLmModTypeInfo.hasOwnProperty(typeStr))
      return HDLmModTypeInfo[typeStr].extrarequired;
    return null;
  }
  /* This method returns a boolean showing if a modification type
     uses (and may or may not require) extra information or not. 
     Most types of rules do not use extra information. However, 
     some do. This method takes a modification type string and 
     returns a boolean showing if extra information is used or 
     not. If the type is unknown, than a null value is returned 
     to the caller. Note that a modification type that uses 
     extra information may or may not require extra information. */
  static getModificationTypeExtraUsed(typeStr) {
    /* Check if information for type specified by the caller exists */
    if (HDLmModTypeInfo.hasOwnProperty(typeStr))
      return HDLmModTypeInfo[typeStr].extraused;
    return null;
  }
  /* This method returns a string that contains the long name of 
     a modification type. All types of modifications have long
     names. The modification long name is use to build the tool-
     tip among other things. */
  static getModificationLongName(typeStr) {
    /* Check if information for type specified by the caller exists */
    if (HDLmModTypeInfo.hasOwnProperty(typeStr))
      return HDLmModTypeInfo[typeStr].longname;
    return null;
  }
  /* This method returns a boolean showing if a modification type
     uses (requires) a parameter number or not. Most types of rules
     require parameter numbers. However, some do not. This method
     takes a modification type string and returns a boolean showing
     if a parameter number is needed or not. If the type is unknown,
     than a NULL value is returned to the caller. */
  static getModificationTypeParmNumberUsed(typeStr) {
    /* Check if information for type specified by the caller exists */
    if (HDLmModTypeInfo.hasOwnProperty(typeStr))
      return HDLmModTypeInfo[typeStr].parmnumberused;
    return null;
  }
  /* This routine is used to access the modification type information 
     from other source modules */
  static getModTypeInfo() {
    return HDLmMod.HDLmModInfo;
  }
  /* This routine gets the name string from the current set of details 
     (an HDLmMod) and returns the value to the caller */
  getName() {
    return this.name;
  }
  /* This routine gets the node identifier object from the current set 
     of details (an HDLmMod) and returns the value to the caller */
  getNodeIden() {
    return this.nodeiden;
  }
  /* Get the list of protocol types supported by this code. 
     The list of types is returned to the caller as an array. */
  static getProtocolTypeList() {
    return ['http', 'https'];
  }
  /* This routine returns a list of rule types that apply to a 
     specific type. The list may or may not be empty. The caller
     provides the specific type (such as 'text' without the quotes). */
  static getRuleTypeList(specificType) {
    let rvList = [];
    for (let ruleType in HDLmModTypeInfo) {
      if (HDLmModTypeInfo[ruleType].type != specificType)
        continue;
      rvList.push(ruleType);
    }
    return rvList;
  }
  /* This routine gets the xPath string from the current set of details 
     (an HDLmMod) and returns the value to the caller */
  getXPath() {
    return this.xpath;
  }
  /* This routine is invoked when an update happens and the update
     should be sent to the rules server. Of course, other actions
     may be needed as well. Note that this routine is highly
     unconditional. This routine does not check for errors in
     anything. */
  static handleUpdateReloadPageUnconditional() {
    /* console.log('HDLmMod.handleUpdateReloadPageUnconditional'); */
    /* console.log('HDLmMod.handleUpdateReloadPageUnconditional', HDLmGlobals.checkForInlineEditor()); */
    /* console.log('HDLmMod.handleUpdateReloadPageUnconditional', HDLmGlobals.checkActiveExtensionWindow()); */
    /* console.log('HDLmMod.handleUpdateReloadPageUnconditional', HDLmGlobals.activeEditorType); */
    /* console.log('HDLmGlobals.handleUpdateReloadPageUnconditional()'); */
    /* We really only want to reload the current window if one 
       of the inline editors is active and we are running in a
       browser extension window. Note that the current window is 
       the current content window, not the browser extension. */
    if (HDLmGlobals.activeEditorType != HDLmEditorTypes.gem &&
        HDLmGlobals.activeEditorType != HDLmEditorTypes.gxe) {
      if (HDLmGlobals.checkForInlineEditor() == false ||
          HDLmGlobals.checkActiveExtensionWindow() == false)
        return;
    }
    /* console.log('HDLmMod.handleUpdateReloadPageUnconditional'); */
    /* We can now try to reload the current content window. 
       Of course, this will not happen in many environments. */
    if (HDLmGlobals.activeEditorType != HDLmEditorTypes.gem &&
        HDLmGlobals.activeEditorType != HDLmEditorTypes.gxe) {
      /* console.log('About to reload the current window'); */
      HDLmPopup.reloadCurrentWindow();
    }
  }
  /* Return the modification information to the caller */
  static get HDLmModInfo() {
    return HDLmModInfoData;
  }
  /* This routine removes all of modification information. This
     routine removes the DOM elements used to display the data.
     Note that a lower level routine is used to remove the actual
     DOM elements. */
  static removeEntries() {
    /* console.trace(); */
    /* Remove the new tree node information from the web page */
    let divDescriptions = HDLmDefines.getString('HDLMENTRYDESCRIPTIONS');
    let divValues = HDLmDefines.getString('HDLMENTRYVALUES');
    HDLmMod.removeMod(divDescriptions);
    HDLmMod.removeMod(divValues);
  }
  /* This routine removes a set of modfication information. This
     routine removes the DOM elements used to display the data. */
  static removeMod(parentId) {
    $(parentId).empty(); 
  }
  /* This routine removes all of inline editor information. This
     routine removes the DOM elements used to display the data.
     Note that a lower level routine is used to remove the actual
     DOM elements. */
  static removeInlineeditor() {
    /* Remove inline editor information from the web page */
    let divInlineLeft = HDLmDefines.getString('HDLMINLINELEFT');
    let divInlineRight = HDLmDefines.getString('HDLMINLINERIGHT');
    HDLmMod.removeMod(divInlineLeft);
    HDLmMod.removeMod(divInlineRight);
  }
  /* This routine resets the last modified date and time for 
     a modification. This routine should be called whenever 
     any change is made to a modification. */
  static resetLastModified(curMod) {   
    curMod.lastmodified = new Date();
  }
  /* This routine saves some informaton for this object instance.
     The information is probably error text, but does not have
     to be. */
  static saveFieldInformation(currentObject, fieldName, fieldValue) {
    /* Make sure the current object is an object */
    if (typeof(currentObject) != 'object') {
      let errorText = 'Current object passed to saveFieldInformation is not an object';
      HDLmAssert(false, errorText);
    }
    /* Make sure the field name is a string */
    if (typeof(fieldName) != 'string') {
      let errorText = 'Field name passed to saveFieldInformation is not a string';
      HDLmAssert(false, errorText);
    }
    /* Make sure the field name length is greater then zero */
    if (fieldName.length <= 0) {
      let errorText = 'Field name length passed to saveFieldInformation is not positive';
      HDLmAssert(false, errorText);
    }
    /* The field value can be anything, including a null value */
    currentObject[fieldName] = fieldValue;
  } 
  /* This routine sets the comments string of the current set of details 
     (an HDLmMod) using a value passed by the caller */
  setComments(newComments) {
    this.comments = newComments;
  }
  /* This routine sets the CSS selector string of the current set of details 
     (an HDLmMod) using a value passed by the caller */
  setCssSelector(newCssSelector) {
    this.cssselector = newCssSelector;
  }
  /* This routine sets the enabled status (a boolean) of the current set 
     of details (an HDLmMod) using a value passed by the caller */
  setEnabled(newEnabled) {
    this.enabled = newEnabled;
  }
  /* This routine sets the extra string of the current set of details 
     (an HDLmMod) using a value passed by the caller */
  setExtra(newExtra) {
    this.extra = newExtra;
  }
  /* This routine sets the finds array of the current set of details 
     (an HDLmMod) using a value passed by the caller */
  setFinds(newFinds) {
    this.find = newFinds;
  }
  /* This routine sets the name string of the current set of details 
     (an HDLmMod) using a value passed by the caller */
  setName(newName) {
    this.name = newName;
    /* console.log(newName); */
  }
  /* This routine sets the node identifier object of the current set 
     of details (an HDLmMod) using a value passed by the caller */
  setNodeIden(newNodeIden) {
    this.nodeiden = newNodeIden;
  }
  /* This routine sets the xPath string of the current set of details 
     (an HDLmMod) using a value passed by the caller */
  setXPath(newXPath) {
    this.xpath = newXPath;
  }
  /* This function loops through the entries of an array and trims
     each of them. That means removing all leading and trailing blanks.
     The array entries are changed in place. This code changes the 
     oringinal array, not a copy of the original array. */
  static trimArray(arrayValues) {  
    for (let i = 0; i < arrayValues.length; i++)
      arrayValues[i] = arrayValues[i].trim(); 
  }
  /* This function loops through the entries of an array and trims
     each of them. That means removing all leading and trailing blanks.
     Note that the original array is not changed at all. A copy of the
     original array is built with the trimmed entries. */
  static trimArrayCopy(arrayValues) {
    let rvList = [];
    for (let i = 0; i < arrayValues.length; i++)
      rvList.push(arrayValues[i].trim());
    return rvList;
  }
  /* This function loops through the entries of an array of objects. 
     The fields of each object in the array are then trimmed. The
     end result is an array of objects, where every field in every
     object has been trimmed. The array entries are changed in place.
     This code changes the oringinal array, not a copy of the original
     array. */
  static trimObjectArray(arrayObjects) {
    for (let i = 0; i < arrayObjects.length; i++) {
      let obj = arrayObjects[i];
      let keys = Object.keys(obj);
      for (let key of keys) {
        obj[key] = obj[key].trim();
      }
    }
  }
  /* This function loops through the entries of an array of objects. 
     The fields of each object in the array are then trimmed. The
     end result is an array of objects, where every field in every
     object has been trimmed. Note that the original array is not 
     changed at all. A copy of the original array is built with the
     trimmed entries. */
  static trimObjectArrayCopy(arrayObjects) {
    let rvList = [];
    for (let i = 0; i < arrayObjects.length; i++) { 
      let obj = arrayObjects[i];
      let keys = Object.keys(obj);
      /* Build the new object with all of the properties of the old
         object. Of course, the new properties are actually trimmed
         copies of the old properties. */
      let rvObj = {};
      for (let key of keys) 
        rvObj[key] = obj[key].trim();
      rvList.push(rvObj);
    }
    return rvList;
  }  
}