import re, os

jsDir = r"c:\Users\pscha\Documents\Visual_Studio_Code\Projects\WebApplication5\WebApplication5\js"
src = os.path.join(jsDir, "HDLmWebpageImprover - 20260522 - 0723.js")
dst = os.path.join(jsDir, "HDLmWebpageImprover.js")

with open(src, "r", encoding="utf-8") as f:
    content = f.read()

# --- Change 1: Fix "a numbered list" -> "a list" ---
content = content.replace("a numbered list", "a list")

# --- Change 2: Add DJB2 hash instructions to end of 'context' string ---
old_ctx_end = ("'but just use the contents of the Desired changes field and the Undesired changes field.',")
new_ctx_end = (
    "'but just use the contents of the Desired changes field and the Undesired changes field. ' +\n"
    "                   'For each improvement in the improved HTML, compute a hash code using the DJB2 algorithm: ' +\n"
    "                   'concatenate the what and why values with a pipe character between them, ' +\n"
    "                   'initialize hash to 5381, then for each character c compute hash = ((hash << 5) + hash) + charCode(c), ' +\n"
    "                   'then take hash as an unsigned 32-bit integer. ' +\n"
    "                   'Mark each changed HTML element by adding a CSS class with value ' +\n"
    "                   \"'HDLm' followed by the uppercase hexadecimal representation of the hash. \" +\n"
    "                   'Do not include these hash codes in the returned improvements array.',"
)
assert old_ctx_end in content, "ERROR: context ending not found"
content = content.replace(old_ctx_end, new_ctx_end)

# --- Change 3: Fix improvementsObj check in buildImprovementsElement ---
old_check = (
    "    if (improvementsObj != null &&\n"
    "        improvementsObj.hasOwnProperty('Improvements') &&\n"
    "        Array.isArray(improvementsObj['Improvements']))\n"
    "      improvementsArray = improvementsObj['Improvements'];"
)
new_check = (
    "    if (improvementsObj != null &&\n"
    "        Array.isArray(improvementsObj['Improvements']))\n"
    "      improvementsArray = improvementsObj['Improvements'];"
)
# Try CRLF too
old_check_crlf = old_check.replace("\n", "\r\n")
if old_check in content:
    content = content.replace(old_check, new_check)
    print("Fixed: improvementsObj check (LF)")
elif old_check_crlf in content:
    content = content.replace(old_check_crlf, new_check.replace("\n", "\r\n"))
    print("Fixed: improvementsObj check (CRLF)")
else:
    print("WARNING: improvementsObj check not found, searching...")
    idx = content.find("improvementsObj.hasOwnProperty('Improvements')")
    print(f"  Found at index: {idx}")
    if idx > 0:
        print(f"  Context: {repr(content[idx-50:idx+100])}")

# --- Change 4: Add Delete header column to buildImprovementsElement ---
old_header = (
    "    let yesHeaderProps = { 'style': { 'textAlign': 'center', 'paddingRight': '8px' } };\n"
    "    let noHeaderProps  = { 'style': { 'textAlign': 'center', 'paddingRight': '8px' } };\n"
    "    let improvHeaderProps = { 'style': { 'textAlign': 'left' } };\n"
    "    let yesThElement  = React.createElement('th', yesHeaderProps,   'Yes');\n"
    "    let noThElement   = React.createElement('th', noHeaderProps,    'No');\n"
    "    let improvThElement = React.createElement('th', improvHeaderProps, 'Improvement');\n"
    "    let headerRowElement = React.createElement('tr', null, yesThElement, noThElement, improvThElement);"
)
new_header = (
    "    let yesHeaderProps    = { 'style': { 'textAlign': 'center', 'paddingRight': '8px' } };\n"
    "    let noHeaderProps     = { 'style': { 'textAlign': 'center', 'paddingRight': '8px' } };\n"
    "    let deleteHeaderProps = { 'style': { 'textAlign': 'center', 'paddingRight': '8px' } };\n"
    "    let improvHeaderProps = { 'style': { 'textAlign': 'left' } };\n"
    "    let yesThElement      = React.createElement('th', yesHeaderProps,    'Yes');\n"
    "    let noThElement       = React.createElement('th', noHeaderProps,     'No');\n"
    "    let deleteThElement   = React.createElement('th', deleteHeaderProps, 'Delete');\n"
    "    let improvThElement   = React.createElement('th', improvHeaderProps, 'Improvement');\n"
    "    let headerRowElement  = React.createElement('tr', null, yesThElement, noThElement, deleteThElement, improvThElement);"
)
old_header_crlf = old_header.replace("\n", "\r\n")
if old_header in content:
    content = content.replace(old_header, new_header)
    print("Fixed: header row (LF)")
elif old_header_crlf in content:
    content = content.replace(old_header_crlf, new_header.replace("\n", "\r\n"))
    print("Fixed: header row (CRLF)")
else:
    print("WARNING: header row not found")

# --- Change 5: Add Delete radio button td and fix Improvement cell in data rows ---
old_row_section = (
    "      /* Build the delete key hint */\n"
    "      let deleteTdProps = { 'style': { 'textAlign': 'left', 'verticalAlign': 'top' } };\n"
    "      let improvementCellElement = React.createElement('td',\n"
    "                                                        deleteTdProps,\n"
    "                                                        whatLineElement,\n"
    "                                                        whyLineElement);\n"
    "      /* Compose the row with a tabIndex so the delete key can fire on it */\n"
    "      let rowProps = {\n"
    "        'key':       i,\n"
    "        'tabIndex':  0,\n"
    "        'onKeyDown': HDLmWebpageImprover.makeDeleteKeyHandler(i),\n"
    "        'style':     { 'borderBottom': '1px solid #ddd', 'cursor': 'default' }\n"
    "      };\n"
    "      let rowElement = React.createElement('tr', rowProps,\n"
    "                                            yesTdElement,\n"
    "                                            noTdElement,\n"
    "                                            improvementCellElement);"
)
new_row_section = (
    "      /* Build the Delete radio button */\n"
    "      let deleteRadioProps = {\n"
    "        'type':     'radio',\n"
    "        'name':     radioGroupName,\n"
    "        'value':    'delete',\n"
    "        'checked':  false,\n"
    "        'onChange': HDLmWebpageImprover.makeDeleteRadioHandler(i)\n"
    "      };\n"
    "      let deleteRadioElement = React.createElement('input', deleteRadioProps);\n"
    "      let deleteTdProps = { 'style': { 'textAlign': 'center', 'verticalAlign': 'top', 'paddingRight': '8px' } };\n"
    "      let deleteTdElement = React.createElement('td', deleteTdProps, deleteRadioElement);\n"
    "      /* Build the Improvement cell */\n"
    "      let improvTdProps = { 'style': { 'textAlign': 'left', 'verticalAlign': 'top' } };\n"
    "      let improvementCellElement = React.createElement('td',\n"
    "                                                        improvTdProps,\n"
    "                                                        whatLineElement,\n"
    "                                                        whyLineElement);\n"
    "      /* Compose the row with a tabIndex so the delete key can fire on it */\n"
    "      let rowProps = {\n"
    "        'key':       i,\n"
    "        'tabIndex':  0,\n"
    "        'onKeyDown': HDLmWebpageImprover.makeDeleteKeyHandler(i),\n"
    "        'style':     { 'borderBottom': '1px solid #ddd', 'cursor': 'default' }\n"
    "      };\n"
    "      let rowElement = React.createElement('tr', rowProps,\n"
    "                                            yesTdElement,\n"
    "                                            noTdElement,\n"
    "                                            deleteTdElement,\n"
    "                                            improvementCellElement);"
)
old_row_section_crlf = old_row_section.replace("\n", "\r\n")
if old_row_section in content:
    content = content.replace(old_row_section, new_row_section)
    print("Fixed: row section (LF)")
elif old_row_section_crlf in content:
    content = content.replace(old_row_section_crlf, new_row_section.replace("\n", "\r\n"))
    print("Fixed: row section (CRLF)")
else:
    print("WARNING: row section not found, checking partial...")
    idx = content.find("/* Build the delete key hint */")
    print(f"  'Build the delete key hint' at index: {idx}")

# --- Change 6: Add makeDeleteRadioHandler method before makeWantedChangeHandler ---
old_wanted_handler = (
    "  /* This factory routine returns a handler function for when the\n"
    "     Wanted radio button changes for a specific improvement row. */\n"
    "  static makeWantedChangeHandler(index, wantedValue) {"
)
new_with_delete_handler = (
    "  /* This factory routine returns a handler function for when the\n"
    "     Delete radio button is clicked for a specific improvement row.\n"
    "     When clicked, the improvement is removed from local storage. */\n"
    "  static makeDeleteRadioHandler(index) {\n"
    "    return function() {\n"
    "      let localUrl = HDLmWebpageImprover.currentUrl;\n"
    "      if (localUrl == null || localUrl == '')\n"
    "        return;\n"
    "      let improvementsObj = HDLmWebpageImprover.getStorageImprovements(localUrl);\n"
    "      if (improvementsObj == null)\n"
    "        return;\n"
    "      if (!Array.isArray(improvementsObj['Improvements']))\n"
    "        return;\n"
    "      if (index < 0 || index >= improvementsObj['Improvements'].length)\n"
    "        return;\n"
    "      let now = new Date().toISOString();\n"
    "      improvementsObj['Improvements'].splice(index, 1);\n"
    "      improvementsObj['Last Modified'] = now;\n"
    "      let modifiedUrl = HDLmWebpageImprover.getModifiedWebsiteUrl(localUrl);\n"
    "      let storageKey = 'HDLmImprovements' + modifiedUrl;\n"
    "      localStorage.setItem(storageKey, JSON.stringify(improvementsObj));\n"
    "      HDLmWebpageImprover.forceReRender();\n"
    "    };\n"
    "  }\n"
    "  /* This factory routine returns a handler function for when the\n"
    "     Wanted radio button changes for a specific improvement row. */\n"
    "  static makeWantedChangeHandler(index, wantedValue) {"
)
old_wanted_crlf = old_wanted_handler.replace("\n", "\r\n")
if old_wanted_handler in content:
    content = content.replace(old_wanted_handler, new_with_delete_handler)
    print("Fixed: added makeDeleteRadioHandler (LF)")
elif old_wanted_crlf in content:
    content = content.replace(old_wanted_crlf, new_with_delete_handler.replace("\n", "\r\n"))
    print("Fixed: added makeDeleteRadioHandler (CRLF)")
else:
    print("WARNING: makeWantedChangeHandler not found")

# --- Change 7: Add computeImprovementHash after clearErrorText ---
old_clear_error = (
    "  /* This routine clears the error text field */\n"
    "  static clearErrorText() {\n"
    "    HDLmUtility.setErrorText('');\n"
    "  }\n"
    "  /* This routine displays an error message using an alert */"
)
new_with_hash = (
    "  /* This routine clears the error text field */\n"
    "  static clearErrorText() {\n"
    "    HDLmUtility.setErrorText('');\n"
    "  }\n"
    "  /* This routine computes a DJB2 hash code from the what and why values.\n"
    "     The hash is used to mark HTML elements with a CSS class. */\n"
    "  static computeImprovementHash(what, why) {\n"
    "    /* Combine the what and why values with a pipe separator */\n"
    "    let combined = what + '|' + why;\n"
    "    /* Initialize the DJB2 hash */\n"
    "    let hash = 5381;\n"
    "    /* Process each character of the combined string */\n"
    "    for (let i = 0; i < combined.length; i++) {\n"
    "      hash = ((hash << 5) + hash) + combined.charCodeAt(i);\n"
    "      hash = hash | 0;\n"
    "    }\n"
    "    /* Convert hash to an unsigned 32-bit integer */\n"
    "    hash = hash >>> 0;\n"
    "    /* Return the hash with the HDLm prefix */\n"
    "    return 'HDLm' + hash.toString(16).toUpperCase();\n"
    "  }\n"
    "  /* This routine displays an error message using an alert */"
)
old_clear_crlf = old_clear_error.replace("\n", "\r\n")
if old_clear_error in content:
    content = content.replace(old_clear_error, new_with_hash)
    print("Fixed: added computeImprovementHash (LF)")
elif old_clear_crlf in content:
    content = content.replace(old_clear_crlf, new_with_hash.replace("\n", "\r\n"))
    print("Fixed: added computeImprovementHash (CRLF)")
else:
    print("WARNING: clearErrorText not found")

# --- Change 8: Fix improveOnClick condition ---
old_cond = "    if (desiredImprovements == '' && undesiredImprovements == '') {"
new_cond = "    if (desiredImprovements == '') {"
if old_cond in content:
    content = content.replace(old_cond, new_cond)
    print("Fixed: improveOnClick condition")
else:
    print("WARNING: improveOnClick condition not found")
    idx = content.find("desiredImprovements == ''")
    print(f"  Found 'desiredImprovements ==' at index: {idx}")

# --- Remove all blank lines ---
lines = content.splitlines()
non_blank = [line for line in lines if line.strip() != ""]
print(f"Removed {len(lines) - len(non_blank)} blank lines")
content = "\n".join(non_blank)

# Write the output file
with open(dst, "w", encoding="utf-8", newline="\n") as f:
    f.write(content)
print(f"Written {len(content)} chars, {len(non_blank)} lines to {dst}")
