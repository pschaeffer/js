/**
 * HDLmUtility short summary.
 *
 * HDLmUtility description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The following data structure contains information about all 
   of the standard border styles. Note that the border style  
   is always in lowercase. */
const HDLmUtilityBorderStyleInfo = ['none', 'dashed', 'dotted', 'double', 'groove', 
                                    'hidden', 'inset', 'outset', 'ridge', 'solid'];
/* The following JSON data structure contains information about all 
   of the standard (140) HTML colors. Note that the property name is 
   always the color name in lowercase. */ 
const HDLmUtilityColorInfo =
  {
    "aliceblue":          { "name": "AliceBlue",          "hex": "#f0f8ff", "category": "White" },
    "antiquewhite":       { "name": "AntiqueWhite",       "hex": "#faebd7", "category": "White" },
    "aqua":               { "name": "Aqua",               "hex": "#00ffff", "category": "Blue" },
    "aquamarine":         { "name": "AquaMarine",         "hex": "#7fffd4", "category": "Blue" },
    "azure":              { "name": "Azure",              "hex": "#f0ffff", "category": "White" },
    "beige":              { "name": "Beige",              "hex": "#f5f5dc", "category": "White" },
    "bisque":             { "name": "Bisque",             "hex": "#ffe4c4", "category": "Brown" },
    "black":              { "name": "Black",              "hex": "#000000", "category": "Gray" },
    "blanchedalmond":     { "name": "BlanchedAlmond",     "hex": "#ffebcd", "category": "Brown" },
    "blue":               { "name": "Blue",               "hex": "#0000ff", "category": "Blue" },
    "blueviolet":         { "name": "BlueViolet",         "hex": "#8a2be2", "category": "Purple" },
    "brown":              { "name": "Brown",              "hex": "#a52a2a", "category": "Brown" },
    "burlywood":          { "name": "BurlyWood",          "hex": "#deb887", "category": "Brown" },
    "cadetblue":          { "name": "CadetBlue",          "hex": "#5f9ea0", "category": "Blue" },
    "chartreuse":         { "name": "Chartreuse",         "hex": "#7fff00", "category": "Green" },
    "chocolate":          { "name": "Chocolate",          "hex": "#d2691e", "category": "Brown" },
    "coral":              { "name": "Coral",              "hex": "#ff7f50", "category": "Orange" },
    "cornflowerblue":     { "name": "CornFlowerBlue",     "hex": "#6495ed", "category": "Blue" },
    "cornsilk":           { "name": "Cornsilk",           "hex": "#fff8dc", "category": "Brown" },
    "crimson":            { "name": "Crimson",            "hex": "#dc143c", "category": "Red" },
    "cyan":               { "name": "Cyan",               "hex": "#00ffff", "category": "Blue" },
    "darkblue":           { "name": "DarkBlue",           "hex": "#00008b", "category": "Blue" },
    "darkblue":           { "name": "DarkBlue",           "hex": "#00008b", "category": "Blue" },
    "darkblue":           { "name": "DarkBlue",           "hex": "#00008b", "category": "Blue" },
    "darkcyan":           { "name": "DarkCyan",           "hex": "#008b8b", "category": "Green" },
    "darkgoldenrod":      { "name": "DarkGoldenRod",      "hex": "#b8860b", "category": "Brown" },
    "darkgray":           { "name": "DarkGray",           "hex": "#a9a9a9", "category": "Gray" },
    "darkgreen":          { "name": "DarkGreen",          "hex": "#006400", "category": "Green" },
    "darkkhaki":          { "name": "DarkKhaki",          "hex": "#bdb76b", "category": "Yellow" },
    "darkmagenta":        { "name": "DarkMagenta",        "hex": "#8b008b", "category": "Purple" },
    "darkolivegreen":     { "name": "DarkOliveGreen",     "hex": "#556b2f", "category": "Green" },
    "darkorange":         { "name": "DarkOrange",         "hex": "#ff8c00", "category": "Orange" },
    "darkorchid":         { "name": "DarkOrchid",         "hex": "#9932cc", "category": "Purple" },
    "darkred":            { "name": "DarkRed",            "hex": "#8b0000", "category": "Red" },
    "darksalmon":         { "name": "DarkSalmon",         "hex": "#e9967a", "category": "Red" },
    "darkseagreen":       { "name": "DarkSeaGreen",       "hex": "#8fbc8f", "category": "Green" },
    "darkslateblue":      { "name": "DarkSlateBlue",      "hex": "#483d8b", "category": "Purple" },
    "darkslategray":      { "name": "DarkSlateGray",      "hex": "#2f4f4f", "category": "Gray" },
    "darkturquoise":      { "name": "DarkTurquoise",      "hex": "#00ced1", "category": "Blue" },
    "darkviolet":         { "name": "DarkViolet",         "hex": "#9400d3", "category": "Purple" },
    "deeppink":           { "name": "DeepPink",           "hex": "#ff1493", "category": "Pink" },
    "deepskyblue":        { "name": "DeepSkyBlue",        "hex": "#00bfff", "category": "Blue" },
    "dimgray":            { "name": "DimGray",            "hex": "#696969", "category": "Gray" },
    "dodgerblue":         { "name": "DodgerBlue",         "hex": "#1e90ff", "category": "Blue" },
    "firebrick":          { "name": "FireBrick",          "hex": "#b22222", "category": "Red" },
    "floralwhite":        { "name": "FloralWhite",        "hex": "#fffaf0", "category": "White" },
    "forestgreen":        { "name": "ForestGreen",        "hex": "#228b22", "category": "Green" },
    "fuchsia":            { "name": "Fuchsia",            "hex": "#ff00ff", "category": "Purple" },
    "gainsboro":          { "name": "Gainsboro",          "hex": "#dcdcdc", "category": "Gray" },
    "ghostwhite":         { "name": "GhostWhite",         "hex": "#f8f8ff", "category": "White" },
    "gold":               { "name": "Gold",               "hex": "#ffd700", "category": "Yellow" },
    "goldenrod":          { "name": "GoldenRod",          "hex": "#daa520", "category": "Brown" },
    "gray":               { "name": "Gray",               "hex": "#808080", "category": "Gray" },
    "green":              { "name": "Green",              "hex": "#008000", "category": "Green" },
    "greenyellow":        { "name": "GreenYellow",        "hex": "#adff2f", "category": "Green" },
    "honeydew":           { "name": "HoneyDew",           "hex": "#f0fff0", "category": "White" },
    "hotpink":            { "name": "HotPink",            "hex": "#ff69b4", "category": "Pink" },
    "indianred":          { "name": "IndianRed",          "hex": "#cd5c5c", "category": "Red" },
    "indigo":             { "name": "Indigo",             "hex": "#4b0082", "category": "Purple" },
    "ivory":              { "name": "Ivory",              "hex": "#fffff0", "category": "White" },
    "khaki":              { "name": "Khaki",              "hex": "#f0e68c", "category": "Yellow" },
    "lavender":           { "name": "Lavender",           "hex": "#e6e6fa", "category": "Purple" },
    "lavenderblush":      { "name": "LavenderBlush",      "hex": "#fff0f5", "category": "White" },
    "lawngreen":          { "name": "LawnGreen",          "hex": "#7cfc00", "category": "Green" },
    "lemonchiffon":       { "name": "LemonChiffon",       "hex": "#fffacd", "category": "Yellow" },
    "lightblue":          { "name": "LightBlue",          "hex": "#add8e6", "category": "Blue" },
    "lightcoral":         { "name": "LightCoral",         "hex": "#f08080", "category": "Red" },
    "lightcyan":          { "name": "LightCyan",          "hex": "#e0ffff", "category": "Blue" },
    "lightgoldenrodyellow": { "name": "LightGoldenrodYellow", "hex": "#fafad2", "category": "Yellow" },
    "lightgray":          { "name": "LightGray",          "hex": "#d3d3d3", "category": "Gray" },
    "lightgreen":         { "name": "LightGreen",         "hex": "#90ee90", "category": "Green" },
    "lightpink":          { "name": "LightPink",          "hex": "#ffb6c1", "category": "Pink" },
    "lightsalmon":        { "name": "LightSalmon",        "hex": "#ffa07a", "category": "Orange" },
    "lightseagreen":      { "name": "LightSeaGreen",      "hex": "#20b2aa", "category": "Green" },
    "lightskyblue":       { "name": "LightSkyBlue",       "hex": "#87cefa", "category": "Blue" },
    "lightslategray":     { "name": "LightSlateGray",     "hex": "#778899", "category": "Gray" },
    "lightsteelblue":     { "name": "LightSteelBlue",     "hex": "#b0c4de", "category": "Blue" },
    "lightyellow":        { "name": "LightYellow",        "hex": "#ffffe0", "category": "Yellow" },
    "lime":               { "name": "Lime",               "hex": "#00ff00", "category": "Green" },
    "limegreen":          { "name": "LimeGreen",          "hex": "#32cd32", "category": "Green" },
    "linen":              { "name": "Linen",              "hex": "#faf0e6", "category": "White" },
    "magenta":            { "name": "Magenta",            "hex": "#ff00ff", "category": "Purple" },
    "maroon":             { "name": "Maroon",             "hex": "#800000", "category": "Brown" },
    "mediumaquamarine":   { "name": "MediumAquaMarine",   "hex": "#66cdaa", "category": "Green" },
    "mediumblue":         { "name": "MediumBlue",         "hex": "#0000cd", "category": "Blue" },
    "mediumorchid":       { "name": "MediumOrchid",       "hex": "#ba55d3", "category": "Purple" },
    "mediumpurple":       { "name": "MediumPurple",       "hex": "#9370d8", "category": "Purple" },
    "mediumseagreen":     { "name": "MediumSeaGreen",     "hex": "#3cb371", "category": "Green" },
    "mediumslateblue":    { "name": "MediumSlateBlue",    "hex": "#7b68ee", "category": "Blue" },
    "mediumspringgreen":  { "name": "MediumSpringGreen",  "hex": "#00fa9a", "category": "Green" },
    "mediumturquoise":    { "name": "MediumTurquoise",    "hex": "#48d1cc", "category": "Blue" },
    "mediumvioletred":    { "name": "MediumVioletRed",    "hex": "#c71585", "category": "Pink" },
    "midnightblue":       { "name": "MidnightBlue",       "hex": "#191970", "category": "Blue" },
    "mintcream":          { "name": "MintCream",          "hex": "#f5fffa", "category": "White" },
    "mistyrose":          { "name": "MistyRose",          "hex": "#ffe4e1", "category": "White" },
    "moccasin":           { "name": "Moccasin",           "hex": "#ffe4b5", "category": "Yellow" },
    "navajowhite":        { "name": "NavajoWhite",        "hex": "#ffdead", "category": "Brown" },
    "navy":               { "name": "Navy",               "hex": "#000080", "category": "Blue" },
    "oldlace":            { "name": "OldLace",            "hex": "#fdf5e6", "category": "White" },
    "olive":              { "name": "Olive",              "hex": "#808000", "category": "Green" },
    "olivedrab":          { "name": "OliveDrab",          "hex": "#6b8e23", "category": "Green" },
    "orange":             { "name": "Orange",             "hex": "#ffa500", "category": "Orange" },
    "orangered":          { "name": "OrangeRed",          "hex": "#ff4500", "category": "Orange" },
    "orchid":             { "name": "Orchid",             "hex": "#da70d6", "category": "Purple" },
    "palegoldenrod":      { "name": "PaleGoldenRod",      "hex": "#eee8aa", "category": "Yellow" },
    "palegreen":          { "name": "PaleGreen",          "hex": "#98fb98", "category": "Green" },
    "paleturquoise":      { "name": "PaleTurquoise",      "hex": "#afeeee", "category": "Blue" },
    "palevioletred":      { "name": "PaleVioletRed",      "hex": "#db7093", "category": "Pink" },
    "papayawhip":         { "name": "PapayaWhip",         "hex": "#ffefd5", "category": "Yellow" },
    "peachpuff":          { "name": "PeachPuff",          "hex": "#ffdab9", "category": "Yellow" },
    "peru":               { "name": "Peru",               "hex": "#cd853f", "category": "Brown" },
    "pink":               { "name": "Pink",               "hex": "#ffc0cb", "category": "Pink" },
    "plum":               { "name": "Plum",               "hex": "#dda0dd", "category": "Purple" },
    "powderblue":         { "name": "PowderBlue",         "hex": "#b0e0e6", "category": "Blue" },
    "purple":             { "name": "Purple",             "hex": "#800080", "category": "Purple" },
    "red":                { "name": "Red",                "hex": "#ff0000", "category": "Red" },
    "rosybrown":          { "name": "RosyBrown",          "hex": "#bc8f8f", "category": "Brown" },
    "royalblue":          { "name": "RoyalBlue",          "hex": "#4169e1", "category": "Blue" },
    "saddlebrown":        { "name": "SaddleBrown",        "hex": "#8b4513", "category": "Brown" },
    "salmon":             { "name": "Salmon",             "hex": "#fa8072", "category": "Red" },
    "sandybrown":         { "name": "SandyBrown",         "hex": "#f4a460", "category": "Brown" },
    "seagreen":           { "name": "SeaGreen",           "hex": "#2e8b57", "category": "Green" },
    "seashell":           { "name": "SeaShell",           "hex": "#fff5ee", "category": "White" },
    "sienna":             { "name": "Sienna",             "hex": "#a0522d", "category": "Brown" },
    "silver":             { "name": "Silver",             "hex": "#c0c0c0", "category": "Gray" },
    "skyblue":            { "name": "SkyBlue",            "hex": "#87ceeb", "category": "Blue" },
    "slateblue":          { "name": "SlateBlue",          "hex": "#6a5acd", "category": "Purple" },
    "slategray":          { "name": "SlateGray",          "hex": "#708090", "category": "Gray" },
    "snow":               { "name": "Snow",               "hex": "#fffafa", "category": "White" },
    "springgreen":        { "name": "SpringGreen",        "hex": "#00ff7f", "category": "Green" },
    "steelblue":          { "name": "SteelBlue",          "hex": "#4682b4", "category": "Blue" },
    "tan":                { "name": "Tan",                "hex": "#d2b48c", "category": "Brown" },
    "teal":               { "name": "Teal",               "hex": "#008080", "category": "Green" },
    "thistle":            { "name": "Thistle",            "hex": "#d8bfd8", "category": "Purple" },
    "tomato":             { "name": "Tomato",             "hex": "#ff6347", "category": "Orange" },
    "turquoise":          { "name": "Turquoise",          "hex": "#40e0d0", "category": "Blue" },
    "violet":             { "name": "Violet",             "hex": "#ee82ee", "category": "Purple" },
    "wheat":              { "name": "Wheat",              "hex": "#f5deb3", "category": "Brown" },
    "white":              { "name": "White",              "hex": "#ffffff", "category": "White" },
    "whitesmoke":         { "name": "WhiteSmoke",         "hex": "#f5f5f5", "category": "White" },
    "yellow":             { "name": "Yellow",             "hex": "#ffff00", "category": "Yellow" },
    "yellowgreen":        { "name": "YellowGreen",        "hex": "#9acd32", "category": "Green" }
  };
const HDLmUtilityColorPatterns =
  {
    "rgb": [
      { "text": "rgb" },
      { "operator": "(" },
      { "integer": { "min": 0, "max": 255 } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 255 } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 255 } },
      { "operator": ")" },
      { "end": "" }
    ],
    "rgba": [
      { "text": "rgba" },
      { "operator": "(" },
      { "integer": { "min": 0, "max": 255 } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 255 } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 255 } },
      { "operator": "," },
      { "number": { "min": 0.0, "max": 1.0 } },
      { "operator": ")" },
      { "end": "" }
    ],
    "hsl": [
      { "text": "hsl" },
      { "operator": "(" },
      { "integer": { "min": 0, "max": 360 } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": ")" },
      { "end": "" }
    ],
    "hsla": [
      { "text": "hsla" },
      { "operator": "(" },
      { "integer": { "min": 0, "max": 360 } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": "," },
      { "number": { "min": 0.0, "max": 1.0 } },
      { "operator": ")" },
      { "end": "" }
    ],
    "hsv": [
      { "text": "hsv" },
      { "operator": "(" },
      { "integer": { "min": 0, "max": 360 } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": ")" },
      { "end": "" }
    ],
    "hwb": [
      { "text": "hwb" },
      { "operator": "(" },
      { "integer": { "min": 0, "max": 360 } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": ")" },
      { "end": "" }
    ],
    "cmyk": [
      { "text": "cmyk" },
      { "operator": "(" },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": "," },
      { "integer": { "min": 0, "max": 100 } },
      { "operator": { "value": "%", "optional": true } },
      { "operator": ")" },
      { "end": "" }
    ]
  };
/* The following data structure contains information about  
   all of the standard font families. Note that the first   
   letter of each font family is always in uppercase. Note
   also that some font names have been duplicated so that
   each word could be in uppercase. */ 
const HDLmUtilityFontFamilyInfo = [
  /* Wikipedia Font List - First */
  /* Serif */
  'Adobe Jenson', 'Albertus', 'Aldus', 'Alexandria', 'Algerian', 'Amelia', 'American Typewriter', 'Antiqua',
  'Arno', 'Aurora', 'News 706', 'Baskerville', 'Bell', 'Belwe Roman', 'Bembo', 'Bernhard Modern', 'Bodoni', 'Bauer Bodoni',
  'Bitstream Charter', 'Bookman', 'Bulmer', 'Caledonia', 'Calisto MT', 'Cambria', 'Capitals', 'Cartier', 'Caslon', 'Wyld',
  'Caslon Antique', 'Centaur', 'Century', 'Charis SIL', 'Cheltenham', 'Cloister Black', 'Cochin', 'Computer Modern',
  'Concrete Roman', 'Constantia', 'Copperplate', 'Copperplate Gothic',
  'DejaVu Serif', 'Didot', 'Droid Serif', 'Emerson', 'Fairfield',
  'Fantasy',
  'Fat face', 'Fat Face', 'FF Scala', 'Fixedsys', 'Footlight', 'Friz Quadrata', 'Garamond', 'Gentium', 'Georgia', 'GNU FreeFont',
  'Google logo', 'Google Logo', 'Goudy Old Style', 'Goudy', 'Granjon',
  'Hermann Zapf', 'Hightower Text', 'Hoefler Text', 'IBM Plex Serif *',
  'Imprint', 'ITC Benguiat', 'Janson', 'Jokerman', 'Joanna', 'Korinna', 'Legibility Group', 'Lexicon', 'Liberation Serif',
  'Linux Libertine', 'Literaturnaya', 'Lucida Bright *', 'Ludwig & Mayer', 'Memphis', 'Miller', 'Minion *', 'Modern', 'Mrs Eaves *',
  'MS Serif', 'Nebiolo Printech', 'Torino', 'New York', 'Nimbus Roman No. 9 L', 'Nimbus Roman Number 9 L', 'NPS Rawlinson Roadway',
  'OCR - A', 'Palatino', 'Book Antiqua', 'Sistina', 'Perpetua', 'Plantin', 'PT Fonts', 'Renault', 'Requiem', 'Rotis *', 'Rudolph Ruzicka',
  'Sabon',
  'Serif', 'serif',
  'Source Serif', 'Souvenir', 'Stephenson Blake',
  'STIX Fonts project', 'STIX Fonts Project', 'Sylfaen', 'Theano Didot', 'Times New Roman',
  'Times', 'Trajan', 'Trinité', 'Trump Mediaeval',
  'University of California Old Style', 'University Of California Old Style', 'Berkeley Old Style', 'Californian FB',
  'Utopia', 'Vera Serif', 'Windsor', 'XITS font project', 'XITS Font Project',
  /* Slab Serif */
  'Alexandria', 'American Typewriter', 'Archer', 'Athens',
  'Candida', 'Cholla Slab', 'City', 'Clarendon', 'Concrete Roman', 'Courier', 'Egyptienne', 'Guardian Egyptian', 'Legibility Group',
  'Ionic No. 5', 'Ionic Number 5', 'Lexia', 'Memphis', 'Nilland', 'Roboto Slab',
  'Rockwell', 'Schadow', 'Serifa', 'Skeleton Antique',
  'Slab Serif', 'slab serif',
  'Tower',
  /* Sans-Serif */
  'Agency FB', 'Akzidenz - Grotesk', 'Andalé Sans', 'Antique Olive',
  'Arial', 'Arial Unicode MS', 'Avant Garde Gothic', 'Avenir',
  'Bank Gothic', 'Bauhaus', 'Bell Centennial', 'Bell Gothic', 'Benguiat Gothic', 'Berlin Sans', 'Brandon Grotesque', 'Calibri',
  'Casey', 'Century Gothic *', 'Charcoal', 'Chicago', 'Clearview', 'Comic Sans', 'Compacta', 'Corbel', 'DejaVu Sans', 'DIN', 'Dotum',
  'Droid Sans', 'Dyslexie', 'Ecofont', 'Eras', 'Esseltub', 'Espy Sans', 'Eurocrat', 'Eurostile', 'Square 721', 'FF Dax', 'FF Meta *',
  'FF Scala Sans', 'Fira Sans', 'Fira Mono', 'Fira Code', 'Fira Go', 'Folio', 'Franklin Gothic *', 'FreeSans', 'Frutiger', 'Futura',
  'Geneva', 'Gill Sans *', 'Gill Sans Schoolbook', 'Gotham *', 'Haettenschweiler', 'Handel Gothic', 'Hei', 'Helvetica', 'Helvetica Neue',
  'Swiss 721', 'Highway Gothic', 'IBM Plex Sans *', 'Impact', 'Industria', 'Interstate', 'Johnston', 'New Johnston', 'Kabel', 'Klavika',
  'Lato', 'Liberation Sans', 'Linux Biolinum', 'Lucida Sans *', 'Lucida Grande *', 'Lucida Sans Unicode *', 'Lydian', 'Meiryo', 'Meta',
  'Microgramma', 'Modern', 'Motorway', 'MS Sans Serif', 'Myriad *', 'Neutraface', 'Neuzeit S', 'News Gothic', 'Nimbus Sans L', 'Nordstern',
  'Open Sans', 'Optima', 'Overpass', 'Parisine', 'Product Sans',
  'Proxima Nova', 'PT Sans', 'Rail Alphabet', 'Roboto', 'Rotis Sans', 'San Francisco',
  'Sans-serif', 'sans-serif',
  'Segoe UI', 'Skia', 'Source Sans Pro', 'SST *', 'Sweden Sans', 'Syntax', 'System', 'Tahoma', 'Template Gothic', 'Thesis Sans *', 'Tiresias',
  'Trade Gothic', 'Transport', 'Trebuchet MS', 'Twentieth Century', 'Tw Cen MT', 'Ubuntu', 'Unica', 'Univers', 'Zurich', 'Vera Sans', 'Verdana',
  /* Semi-Serif */
  'Nyala', 'Rotis Semi Serif', 'EasyReading',
  'Semi-Serif', 'semi-serif',
  /* Monospace */
  'Andalé Mono', 'Arial Monospaced', 'Bitstream Vera', 'Vera Sans Mono',
  'Consolas', 'Courier', 'Courier New', 'Cutive Mono', 'DejaVu Sans Mono',
  'Droid Sans Mono', 'Everson Mono', 'Everson Mono Unicode', 'Fira Mono',
  'Fira Code', 'Fixed', 'Fixedsys', 'HyperFont', 'IBM Plex Mono *', 'Inconsolata',
  'Letter Gothic', 'Liberation Mono', 'Lucida Console', 'Lucida Console *',
  'Lucida Sans Typewriter *', 'Lucida Typewriter *', 'Menlo', 'MICR', 'Monaco',
  'Monospace', 'monospace',
  'MS Gothic', 'MS Mincho', 'Nimbus Mono L',
  'OCR - A', 'OCR - B', 'PragmataPro', 'Prestige Elite', 'Prestige', 'Courier', 'ProFont', 'Proggy programming fonts', 'Roboto Mono',
  'SimHei', 'SST Typewriter', 'SimSun', 'Source Code Pro', 'Terminal', 'Ubuntu Mono', 'Vera Sans Mono', 'Vera',
  /* Script */
  /* Brush Scripts */
  'Balloon', 'Brush Script', 'Brush Script MT', 'Choc',
  'Cursive',
  'Dom Casual', 'Mistral', 'Papyrus', 'Segoe Script', 'Utopia',
  /* Calligraphic */
  'American Scribe', 'AMS Euler', 'Apple Chancery', 'Forte', 'French Script', 'ITC Zapf Chancery',
  'Kuenstler Script', 'Monotype Corsiva', 'Old English Text MT',
  'Zapfino',
  /* Handwriting */
  'Andy', 'Ashley Script', 'Cézanne', 'Chalkboard', 'Comic Sans MS', 'Comic Neue', 'Dom Casual', 'Freestyle Script',
  'Kristen', 'Lucida Handwriting',
  /* Other script */
  'Coronet', 'Curlz', 'Gravura', 'Script', 'Wiesbaden Swing',
  /* Blackletter */
  'Bastard', 'Breitkopf Fraktur', 'Fette Fraktur', 'Fraktur Bold', 'Fletcher', 'Fraktur',
  'Lucida Blackletter', 'Old English Text', 'Schwabacher',
  'Tannenberg', 'Textualis', 'Textura', 'Theuerdank Fraktur',
  /* Non-Latin */
  'Aharoni', 'Aldhabi', 'Aisha', 'Aparajita', 'Angika', 'Bhojpuri', 'Bodo',
  'Arek', 'Arial', 'Avory', 'Awami Nastaliq', 'Nastaliq', 'Baloo', 'Baloo', 'Baloo Bhai', 'Baloo Bhaijaan', 'Baloo Bhaina', 'Baloo Chettan ',
  'Baloo Da', 'Baloo Paaji', 'Baloo Tamma', 'Baloo Tammudu', 'Baloo Thambi', 'Calibri', 'Chandas', 'Devanagari', 'Clone', 'Corsair',
  'Eskorte', 'Gadugi', 'Grecs du roi', 'Grecs Du Roi', 'Hanacaraka', 'Japanese Gothic',
  'Jomolhari', 'Kiran', 'Devanagari', 'Kochi', 'Koren', 'Kruti Dev',
  'Devanagari', 'Malgun Gothic', 'Meiryo', 'Microsoft JhengHei', 'Microsoft YaHei', 'Minchō', 'Ming', 'Mona', 'MS Gothic', 'Nassim',
  'Nastaliq Navees', 'Neacademia', 'Noto Sans', 'Noto Serif', 'Perpetua Greek', 'Porson', 'Segoe UI Symbol', 'Shruti', 'Skolar',
  'Skolar Sans', 'SimSun', 'Sylfaen', 'Sutturah', 'Tahoma', 'Tengwar', 'Tibetan Machine Uni', 'Urdu Typesetting', 'Nastaliq',
  'Wilson Greek',
  /* 'Unicode fonts */
  'Alphabetum', 'Arial Unicode MS', 'Batang', 'Gungsuh', 'Bitstream Cyberbit', 'Bitstream Vera', 'Charis SIL',
  'Code2000', 'Code2001', 'Code2002', 'DejaVu fonts', 'Doulos SIL', 'EB Garamond', 'Everson Mono', 'Fallback', 'FreeFont',
  'FreeSerif', 'Gentium', 'GNU Unifont', 'Georgia Ref', 'Gulim', 'New Gulim', 'Dotum', 'Junicode', 'Kurinto Font Folio',
  'LastResort', 'Lucida Grande', 'Lucida Sans Unicode', 'MS Gothic', 'Noto', 'PragmataPro', 'Squarish Sans CT', 'STIX',
  'Titus Cyberbit Basic', 'Verdana Ref', 'XITS',
  /* Dingbat/Symbol fonts */
  'Dingbat', 'Asana',
  'Blackboard bold', 'Blackboard Bold', 'Bookshelf Symbol 7', 'Cambria Math',
  'Computer Modern', 'Lucida Math *', 'Marlett', 'Symbol', 'Webdings', 'Wingdings', 'Wingdings 2', 'Wingdings 3', 'Zapf Dingbats',
  /* Dingbat/Decorative fonts */
  'Ad Lib', 'Allegro', 'Andreas', 'Arnold Böcklin', 'Astur',
  'Banco', 'Bauhaus', 'Braggadocio', 'Broadway', 'Caslon Antique', 'Cooper Black',
  'Curlz', 'Ellington', 'Exocet', 'FIG Script', 'Forte', 'Gabriola', 'Horizon', 'Jim Crow', 'Lo - Type', 'Neuland', 'Peignot', 'San Francisco',
  'Stencil', 'Umbra', 'Westminster', 'Willow', 'Windsor',
  /* Ethnic fonts' */
  'Lithos', 'Höfðaletur',
  /* Miscellaneous */
  'Compatil', 'Generis', 'Grasset', 'LED', 'Luxi', 'Sans forgetica', 'Sans Forgetica',
  /* Microsoft Windows Font List */
  'Abadi MT', 'Minion Web', 'Agency FB', 'Aharoni Bold', 'Aldhabi', 'Algerian', 'Almanac MT', 'American Uncial', 'Andale Mono',
  'Andalus', 'Andy', 'AngsanaUPC', 'Angsana New', 'Aparajita', 'Arabic Transparent', 'Arabic Typesetting', 'Arial', 'Arial Black',
  'Arial Narrow', 'Arial Narrow Special', 'Arial Rounded MT', 'Arial Special', 'Arial Unicode MS', 'Augsburger Initials',
  'Avenir Next LT Pro', 'Bahnschrift', 'Baskerville Old Face', 'Batang & BatangChe', 'Bauhaus 93', 'Beesknees ITC', 'Bell MT',
  'Bembo', 'Berlin Sans FB', 'Bernard MT Condensed', 'Bickley Script', 'Biome', 'BIZ UDGothic', 'BIZ UDMincho Medium',
  'Blackadder ITC', 'Bodoni MT', 'Bodoni MT Condensed', 'Bon Apetit MT', 'Bookman Old Style', 'Bookshelf Symbol', 'Book Antiqua',
  'Bradley Hand ITC', 'Braggadocio', 'BriemScript', 'Britannic Bold',
  'Broadway', 'BrowalliaUPC', 'Browallia New', 'Brush Script MT',
  'Calibri', 'Californian FB', 'Calisto MT', 'Cambria', 'Cambria Math',
  'Candara', 'Cariadings', 'Castellar', 'Cavolini', 'Centaur',
  'Century', 'Century Gothic', 'Century Schoolbook', 'Chiller',
  'Colonna MT', 'Comic Sans MS', 'Consolas', 'Constantia', 'Contemporary Brush',
  'Cooper Black', 'Copperplate Gothic', 'Corbel', 'CordiaUPC',
  'Cordia New', 'Courier New', 'Curlz MT', 'Dante', 'DaunPenh', 'David',
  'Daytona', 'Desdemona', 'DFKai - SB', 'DilleniaUPC', 'Directions MT', 'DokChampa', 'Dotum', 'DotumChe', 'Dotum & DotumChe',
  'Ebrima', 'Eckmann', 'Edda', 'Edwardian Script ITC', 'Elephant', 'Engravers MT', 'Enviro', 'Eras ITC', 'Estrangelo Edessa',
  'EucrosiaUPC', 'Euphemia', 'Eurostile', 'FangSong', 'Felix Titling', 'Fine Hand', 'Fixed Miriam Transparent',
  'Flexure', 'Footlight MT', 'Forte', 'Franklin Gothic', 'Franklin Gothic Medium', 'FrankRuehl', 'FreesiaUPC',
  'Freestyle Script', 'French Script MT', 'Futura', 'Gabriola', 'Gadugi', 'Garamond', 'Garamond MT', 'Gautami',
  'Georgia', 'Georgia Ref', 'Gigi', 'Gill Sans MT', 'Gill Sans MT Condensed', 'Gisha', 'Gloucester', 'Goudy Old Style',
  'Goudy Stout', 'Gradl', 'Grotesque', 'Gulim & GulimChe', 'Gulim', 'GulimChe', 'Gungsuh & GungsuhChe', 'Gungsuh',
  'GungsuhChe', 'Hadassah Friedlaender', 'Haettenschweiler', 'Harlow Solid Italic', 'Harrington', 'HGGothicE',
  'HGMinchoE', 'HGSoeiKakugothicUB', 'High Tower Text', 'Holidays MT', 'HoloLens MDL2 Assets', 'Impact', 'Imprint MT Shadow',
  'Informal Roman', 'IrisUPC', 'Iskoola Pota', 'JasmineUPC', 'Javanese Text', 'Jokerman', 'Juice ITC', 'KaiTi',
  'Kalinga', 'Kartika', 'Keystrokes MT', 'Khmer UI', 'Kigelia', 'Kino MT', 'KodchiangUPC', 'Kokila', 'Kristen ITC',
  'Kunstler Script', 'Lao UI', 'Latha', 'LCD', 'Leelawadee', 'Levenim MT', 'LilyUPC', 'Lucida Blackletter', 'Lucida Bright',
  'Lucida Bright Math', 'Lucida Calligraphy', 'Lucida Console', 'Lucida Fax', 'Lucida Handwriting', 'Lucida Sans',
  'Lucida Sans Typewriter', 'Lucida Sans Unicode', 'Magneto', 'Maiandra GD', 'Malgun Gothic', 'Mangal', 'Map Symbols',
  'Marlett', 'Matisse ITC', 'Matura MT Script Capitals', 'McZee', 'Mead Bold', 'Meiryo', 'Mercurius Script MT Bold',
  'Microsoft GothicNeo', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft JhengHei UI', 'Microsoft New Tai Lue',
  'Microsoft PhagsPa', 'Microsoft Sans Serif', 'Microsoft Tai Le', 'Microsoft Uighur', 'Microsoft YaHei', 'Microsoft YaHei UI',
  'Microsoft Yi Baiti', 'MingLiU', 'MingLiU - ExtB', 'MingLiU_HKSCS', 'MingLiU_HKSCS - ExtB', 'Minion Web', 'Miriam',
  'Miriam Fixed', 'Mistral', 'Modern Love', 'Modern No. 20', 'Mongolian Baiti', 'Monotype.com', 'Monotype Corsiva',
  'Monotype Sorts', 'MoolBoran', 'MS Gothic', 'MS LineDraw', 'MS Mincho', 'MS Outlook', 'MS PGothic', 'MS PMincho',
  'MS Reference', 'MS UI Gothic', 'MT Extra', 'MV Boli', 'Myanmar Text', 'Narkisim', 'News Gothic MT', 'New Caledonia',
  'Niagara', 'Nirmala UI', 'Nyala', 'OCR - B - Digits', 'OCRB', 'OCR A Extended', 'Old English Text MT', 'Onyx',
  'Palace Script MT', 'Palatino Linotype', 'Papyrus', 'Parade', 'Parchment', 'Parties MT', 'Peignot Medium',
  'Pepita MT', 'Perpetua', 'Perpetua Titling MT', 'Placard Condensed', 'Plantagenet Cherokee', 'Playbill',
  'PMingLiU', 'PMingLiU - ExtB', 'Poor Richard', 'Posterama', 'Pristina', 'Quire Sans', 'Raavi', 'Rage Italic',
  'Ransom', 'Ravie', 'RefSpecialty', 'Rockwell', 'Rockwell Nova', 'Rod', 'Runic MT Condensed', 'Sabon Next LT',
  'Sagona', 'Sakkal Majalla', 'Script MT Bold', 'Segoe Chess', 'Segoe Print', 'Segoe Script', 'Segoe UI',
  'Segoe UI Symbol', 'Selawik', 'Shonar Bangla', 'Showcard Gothic', 'Shruti', 'Signs MT', 'SimHei', 'Simplified Arabic Fixed',
  'SimSun', 'SimSun - ExtB', 'Sitka', 'NSimSun', 'Snap ITC', 'Sports MT', 'STCaiyun', 'Stencil', 'STFangsong',
  'STHupo', 'STKaiti', 'Stop', 'STXihei', 'STXingkai', 'STXinwei', 'STZhongsong', 'Sylfaen', 'Symbol', 'Tahoma',
  'Tempo Grunge', 'Tempus Sans ITC', 'Temp Installer Font', 'The Hand', 'The Serif Hand', 'Times New Roman',
  'Times New Roman Special', 'Tisa Offc Serif Pro', 'Traditional Arabic', 'Transport MT', 'Trebuchet MS',
  'Tunga', 'Tw Cen MT', 'Univers', 'Urdu Typesetting', 'Utsaah', 'Vacation MT', 'Vani', 'Verdana', 'Verdana Ref',
  'Vijaya', 'Viner Hand ITC', 'Vivaldi', 'Vixar ASCI', 'Vladimir Script', 'Vrinda', 'Walbaum', 'Webdings',
  'Westminster', 'Wide Latin', 'Wingdings',
  /* Microsoft Windows 11 Font List */
  'Arial', 'Arial Italic', 'Arial Bold', 'Arial Bold Italic', 'Arial Black',
  'Bahnschrift', 'Calibri', 'Calibri Light', 'Calibri Light Italic', 'Calibri Italic',
  'Calibri Bold', 'Calibri Bold Italic', 'Cambria', 'Cambria Italic', 'Cambria Bold',
  'Cambria Bold Italic', 'Cambria Math', 'Candara', 'Candara Light', 'Candara Light Italic',
  'Candara Italic', 'Candara Bold', 'Candara Bold Italic', 'Cascadia Code',
  'Cascadia Code ExtraLight *', 'Cascadia Code ExtraLight Italic *', 'Cascadia Code Light *',
  'Cascadia Code Light Italic *', 'Cascadia Code SemiLight *', 'Cascadia Code SemiLight Italic *',
  'Cascadia Code Regular *', 'Cascadia Code Italic *', 'Cascadia Code SemiBold *',
  'Cascadia Code SemiBold Italic *', 'Cascadia Code Bold *', 'Cascadia Code Bold Italic *',
  'Cascadia Mono', 'Cascadia Mono ExtraLight *', 'Cascadia Mono ExtraLight Italic *',
  'Cascadia Mono Light *', 'Cascadia Mono Light Italic *', 'Cascadia Mono SemiLight *',
  'Cascadia Mono SemiLight Italic *', 'Cascadia Mono Regular *', 'Cascadia Mono Italic *',
  'Cascadia Mono SemiBold *', 'Cascadia Mono SemiBold Italic *', 'Cascadia Mono Bold *',
  'Cascadia Mono Bold Italic *', 'Comic Sans MS', 'Comic Sans MS Italic',
  'Comic Sans MS Bold', 'Comic Sans MS Bold Italic', 'Consolas', 'Consolas Italic',
  'Consolas Bold', 'Consolas Bold Italic', 'Constantia', 'Constantia Italic',
  'Constantia Bold', 'Constantia Bold Italic', 'Corbel', 'Corbel Light',
  'Corbel Light Italic', 'Corbel Italic', 'Corbel Bold', 'Corbel Bold Italic',
  'Courier New', 'Courier New Italic', 'Courier New Bold', 'Courier New Bold Italic',
  'Ebrima', 'Ebrima Bold', 'Franklin Gothic Medium', 'Franklin Gothic Medium Italic',
  'Gabriola', 'Gadugi', 'Gadugi Bold', 'Georgia', 'Georgia Italic', 'Georgia Bold',
  'Georgia Bold Italic', 'HoloLens MDL2 Assets', 'Impact', 'Ink Free', 'Javanese Text',
  'Leelawadee UI', 'Leelawadee UI Semilight', 'Leelawadee UI Bold', 'Lucida Console',
  'Lucida Sans Unicode', 'Malgun Gothic', 'Malgun Gothic Bold', 'Malgun Gothic Semilight',
  'Marlett', 'Microsoft Himalaya', 'Microsoft JhengHei', 'Microsoft JhengHei Light',
  'Microsoft JhengHei Bold', 'Microsoft JhengHei UI Light', 'Microsoft JhengHei UI',
  'Microsoft JhengHei UI Bold', 'Microsoft New Tai Lue', 'Microsoft New Tai Lue Bold',
  'Microsoft PhagsPa', 'Microsoft PhagsPa Bold', 'Microsoft Sans Serif',
  'Microsoft Tai Le', 'Microsoft Tai Le Bold', 'Microsoft YaHei', 'Microsoft YaHei Light',
  'Microsoft YaHei Bold', 'Microsoft YaHei UI Light', 'Microsoft YaHei UI',
  'Microsoft YaHei UI Bold', 'Microsoft Yi Baiti', 'MingLiU-ExtB', 'PMingLiU-ExtB',
  'MingLiU_HKSCS-ExtB', 'Mongolian Baiti', 'MS Gothic', 'MS PGothic', 'MS UI Gothic',
  'MV Boli', 'Myanmar Text', 'Myanmar Text Bold', 'Nirmala UI', 'Nirmala UI Semilight',
  'Nirmala UI Bold', 'Palatino Linotype', 'Palatino Linotype Italic', 'Palatino Linotype Bold',
  'Palatino Linotype Bold Italic', 'Segoe Fluent Icons', 'Segoe Fluent Icons *',
  'Segoe MDL2 Assets', 'Segoe Print', 'Segoe Print Bold', 'Segoe Script',
  'Segoe Script Bold', 'Segoe UI', 'Segoe UI Light', 'Segoe UI Light Italic',
  'Segoe UI Semilight', 'Segoe UI Semilight Italic', 'Segoe UI Italic', 'Segoe UI Semibold',
  'Segoe UI Semibold Italic', 'Segoe UI Bold', 'Segoe UI Bold Italic', 'Segoe UI Black',
  'Segoe UI Black Italic', 'Segoe UI Emoji', 'Segoe UI Historic', 'Segoe UI Symbol',
  'Segoe UI Variable', 'Segoe UI Variable Display Light *', 'Segoe UI Variable Display Semilight *',
  'Segoe UI Variable Display Regular *', 'Segoe UI Variable Display Semibold *',
  'Segoe UI Variable Display Bold *', 'Segoe UI Variable Small Light *',
  'Segoe UI Variable Small Semilight *', 'Segoe UI Variable Small Regular *',
  'Segoe UI Variable Small Semibold *', 'Segoe UI Variable Small Bold *',
  'Segoe UI Variable Text Light *', 'Segoe UI Variable Text Semilight *',
  'Segoe UI Variable Text Regular *', 'Segoe UI Variable Text Semibold *',
  'Segoe UI Variable Text Bold *', 'SimSun', 'NSimSun', 'SimSun-ExtB', 'Sitka Banner',
  'Sitka Banner Italic', 'Sitka Banner Semibold *', 'Sitka Banner Semibold Italic *',
  'Sitka Banner Bold', 'Sitka Banner Bold Italic', 'Sitka Display', 'Sitka Display Italic',
  'Sitka Display Semibold *', 'Sitka Display Semibold Italic *', 'Sitka Display Bold',
  'Sitka Display Bold Italic', 'Sitka Small', 'Sitka Small Italic', 'Sitka Small Semibold *',
  'Sitka Small Semibold Italic *', 'Sitka Small Bold', 'Sitka Small Bold Italic',
  'Sitka Heading', 'Sitka Heading Italic', 'Sitka Heading Semibold *', 'Sitka Heading Semibold Italic *',
  'Sitka Heading Bold', 'Sitka Heading Bold Italic', 'Sitka Subheading',
  'Sitka Subheading Italic', 'Sitka Subheading Semibold *', 'Sitka Subheading Semibold Italic *',
  'Sitka Subheading Bold', 'Sitka Subheading Bold Italic', 'Sitka Text',
  'Sitka Text Italic', 'Sitka Text Semibold *', 'Sitka Text Semibold Italic *',
  'Sitka Text Bold', 'Sitka Text Bold Italic', 'Sylfaen', 'Symbol', 'Tahoma',
  'Tahoma Bold', 'Times New Roman', 'Times New Roman Italic', 'Times New Roman Bold',
  'Times New Roman Bold Italic', 'Trebuchet MS', 'Trebuchet MS Italic', 'Trebuchet MS Bold',
  'Trebuchet MS Bold Italic', 'Verdana', 'Verdana Italic', 'Verdana Bold',
  'Verdana Bold Italic', 'Webdings', 'Wingdings', 'Yu Gothic', 'Yu Gothic Light',
  'Yu Gothic Regular', 'Yu Gothic Medium', 'Yu Gothic Bold', 'Yu Gothic UI Light',
  'Yu Gothic UI Semilight', 'Yu Gothic UI Regular', 'Yu Gothic UI Semibold',
  'Yu Gothic UI Bold', 'Aldhabi', 'Andalus', 'Arabic Typesetting', 'Microsoft Uighur',
  'Microsoft Uighur Bold', 'Sakkal Majalla', 'Sakkal Majalla Bold', 'Simplified Arabic',
  'Simplified Arabic Bold', 'Simplified Arabic Fixed', 'Traditional Arabic',
  'Traditional Arabic Bold', 'Urdu Typesetting', 'Urdu Typesetting Bold',
  'Shonar Bangla', 'Shonar Bangla Bold', 'Vrinda', 'Vrinda Bold', 'Euphemia',
  'Plantagenet Cherokee', 'Aparajita', 'Aparajita Italic', 'Aparajita Bold',
  'Aparajita Bold Italic', 'Kokila', 'Kokila Italic', 'Kokila Bold', 'Kokila Bold Italic',
  'Mangal', 'Mangal Bold', 'Sanskrit Text', 'Utsaah', 'Utsaah Italic', 'Utsaah Bold',
  'Utsaah Bold Italic', 'Nyala', 'Shruti', 'Shruti Bold', 'Raavi', 'Raavi Bold',
  'DengXian', 'DengXian Light', 'DengXian Bold', 'FangSong', 'KaiTi', 'SimHei',
  'DFKai-SB', 'MingLiU', 'MingLiU_HKSCS', 'PMingLiU', 'Aharoni Bold', 'David',
  'David Bold', 'FrankRuehl', 'Gisha', 'Gisha Bold', 'Levenim MT', 'Levenim MT Bold',
  'Miriam', 'Miriam Fixed', 'Narkisim', 'Rod', 'BIZ UDGothic', 'BIZ UDGothic Bold',
  'BIZ UDPGothic', 'BIZ UDPGothic Bold', 'BIZ UDMincho Medium', 'BIZ UDPMincho Medium',
  'Meiryo', 'Meiryo Italic', 'Meiryo Bold', 'Meiryo Bold Italic', 'Meiryo UI',
  'Meiryo UI Italic', 'Meiryo UI Bold', 'Meiryo UI Bold Italic', 'MS Mincho',
  'MS PMincho', 'UD Digi Kyokasho', 'UD Digi Kyokasho N-B', 'UD Digi Kyokasho NK-B',
  'UD Digi Kyokasho NK-R', 'UD Digi Kyokasho NP-B', 'UD Digi Kyokasho NP-R',
  'UD Digi Kyokasho N-R', 'Yu Mincho', 'Yu Mincho Light', 'Yu Mincho Regular',
  'Yu Mincho Demibold', 'Tunga', 'Tunga Bold', 'DaunPenh', 'Khmer UI', 'Khmer UI Bold',
  'MoolBoran', 'Batang', 'BatangChe', 'Dotum', 'DotumChe', 'Gulim', 'GulimChe',
  'Gungsuh', 'GungsuhChe', 'DokChampa', 'Lao UI', 'Lao UI Bold', 'Kartika',
  'Kartika Bold', 'Kalinga', 'Kalinga Bold', 'Arial Nova', 'Arial Nova Light',
  'Arial Nova Light Italic', 'Arial Nova Italic', 'Arial Nova Bold', 'Arial Nova Bold Italic',
  'Arial Nova Cond Light', 'Arial Nova Cond Light Italic', 'Arial Nova Cond',
  'Arial Nova Cond Italic', 'Arial Nova Cond Bold', 'Arial Nova Cond Bold Italic',
  'Georgia Pro', 'Georgia Pro Light', 'Georgia Pro Light Italic', 'Georgia Pro Italic',
  'Georgia Pro Semibold', 'Georgia Pro Semibold Italic', 'Georgia Pro Bold',
  'Georgia Pro Bold Italic', 'Georgia Pro Black', 'Georgia Pro Black Italic',
  'Georgia Pro Cond Light', 'Georgia Pro Cond Light Italic', 'Georgia Pro Cond',
  'Georgia Pro Cond Italic', 'Georgia Pro Cond Semibold', 'Georgia Pro Cond Semibold Italic',
  'Georgia Pro Cond Bold', 'Georgia Pro Cond Bold Italic', 'Georgia Pro Cond Black',
  'Georgia Pro Cond Black Italic', 'Gill Sans Nova', 'Gill Sans Nova Light',
  'Gill Sans Nova Light Italic', 'Gill Sans Nova Italic', 'Gill Sans Nova Bold',
  'Gill Sans Nova Bold Italic', 'Gill Sans Nova Ultra Bold', 'Gill Sans Nova Cond Lt',
  'Gill Sans Nova Cond Lt Italic', 'Gill Sans Nova Cond', 'Gill Sans Nova Cond Italic',
  'Gill Sans Nova Cond Bold', 'Gill Sans Nova Cond Bold Italic', 'Gill Sans Nova Cond XBd',
  'Gill Sans Nova Cond XBd Italic', 'Gill Sans Nova Cond Ultra Bold', 'Neue Haas Grotesk Text Pro',
  'Neue Haas Grotesk Text Pro UltraThin *', 'Neue Haas Grotesk Text Pro UltraThin Italic *',
  'Neue Haas Grotesk Text Pro Thin *', 'Neue Haas Grotesk Text Pro Thin Italic *',
  'Neue Haas Grotesk Text Pro ExtraLight *', 'Neue Haas Grotesk Text Pro ExtraLight Italic *',
  'Neue Haas Grotesk Text Pro Light *', 'Neue Haas Grotesk Text Pro Light Italic *',
  'Neue Haas Grotesk Text Pro Regular *', 'Neue Haas Grotesk Text Pro Regular Italic *',
  'Neue Haas Grotesk Text Pro Medium *', 'Neue Haas Grotesk Text Pro Medium Italic *',
  'Neue Haas Grotesk Text Pro Bold *', 'Neue Haas Grotesk Text Pro Bold Italic *',
  'Neue Haas Grotesk Text Pro Black *', 'Neue Haas Grotesk Text Pro Black Italic *',
  'Rockwell Nova', 'Rockwell Nova Bold', 'Rockwell Nova Bold Italic', 'Rockwell Nova Cond',
  'Rockwell Nova Cond Bold', 'Rockwell Nova Cond Bold Italic', 'Rockwell Nova Cond Italic',
  'Rockwell Nova Cond Light', 'Rockwell Nova Cond Light Italic', 'Rockwell Nova Extra Bold',
  'Rockwell Nova Extra Bold Italic', 'Rockwell Nova Italic', 'Rockwell Nova Light',
  'Rockwell Nova Light Italic', 'Verdana Pro', 'Verdana Pro Light', 'Verdana Pro Light Italic',
  'Verdana Pro Italic', 'Verdana Pro SemiBold', 'Verdana Pro SemiBold Italic',
  'Verdana Pro Bold', 'Verdana Pro Bold Italic', 'Verdana Pro Black', 'Verdana Pro Black Italic',
  'Verdana Pro Cond Light', 'Verdana Pro Cond Light Italic', 'Verdana Pro Cond',
  'Verdana Pro Cond Italic', 'Verdana Pro Cond SemiBold', 'Verdana Pro Cond SemiBold Italic',
  'Verdana Pro Cond Bold', 'Verdana Pro Cond Bold Italic', 'Verdana Pro Cond Black',
  'Verdana Pro Cond Black Italic', 'Iskoola Pota', 'Iskoola Pota Bold', 'Estrangelo Edessa',
  'Latha', 'Latha Bold', 'Vijaya', 'Vijaya Bold', 'Gautami', 'Gautami Bold',
  'Vani', 'Vani Bold', 'Angsana New', 'Angsana New Italic', 'Angsana New Bold',
  'Angsana New Bold Italic', 'AngsanaUPC', 'AngsanaUPC Italic', 'AngsanaUPC Bold',
  'AngsanaUPC Bold Italic', 'Browallia New', 'Browallia New Italic', 'Browallia New Bold',
  'Browallia New Bold Italic', 'BrowalliaUPC', 'BrowalliaUPC Italic', 'BrowalliaUPC Bold',
  'BrowalliaUPC Bold Italic', 'Cordia New', 'Cordia New Italic', 'Cordia New Bold',
  'Cordia New Bold Italic', 'CordiaUPC', 'CordiaUPC Italic', 'CordiaUPC Bold',
  'CordiaUPC Bold Italic', 'DilleniaUPC', 'DilleniaUPC Italic', 'DilleniaUPC Bold',
  'DilleniaUPC Bold Italic', 'EucrosiaUPC', 'EucrosiaUPC Italic', 'EucrosiaUPC Bold',
  'EucrosiaUPC Bold Italic', 'FreesiaUPC', 'FreesiaUPC Italic', 'FreesiaUPC Bold',
  'FreesiaUPC Bold Italic', 'IrisUPC', 'IrisUPC Italic', 'IrisUPC Bold',
  'IrisUPC Bold Italic', 'JasmineUPC', 'JasmineUPC Italic', 'JasmineUPC Bold',
  'JasmineUPC Bold Italic', 'KodchiangUPC', 'KodchiangUPC Italic', 'KodchiangUPC Bold',
  'KodchiangUPC Bold Italic', 'Leelawadee', 'Leelawadee Bold', 'LilyUPC',
  /* Google Font List */
  'Roboto', 'Carlito', 'Poltawski Nowy', 'Pathway Extreme', 'Open Sans',
  'Noto Sans Japanese', 'Ysabeau', 'Montserrat', 'Lato', 'Poppins', 'Bruno Ace SC',
  'Roboto Condensed', 'Source Sans Pro', 'Bruno Ace', 'Inter', 'Roboto Mono',
  'Oswald', 'Noto Sans', 'Raleway', 'Castoro Titling', 'Nunito Sans', 'Ubuntu',
  'Roboto Slab', 'Nunito', 'Vina Sans', 'Playfair Display', 'Rubik', 'Merriweather',
  'PT Sans', 'Mukta', 'Noto Sans Korean', 'Sigmar', 'Kanit', 'Work Sans',
  'Lora', 'Noto Sans Traditional Chinese', 'Fira Sans', 'Quicksand', 'Instrument Serif',
  'Barlow', 'Mulish', 'IBM Plex Sans', 'Inconsolata', 'PT Serif', 'Braah One',
  'Titillium Web', 'Noto Serif', 'Heebo', 'DM Sans', 'Hind Siliguri', 'Nanum Gothic',
  'Libre Franklin', 'Karla', 'Manrope', 'Josefin Sans', 'Noto Serif Hebrew',
  'Arimo', 'Libre Baskerville', 'Dosis', 'PT Sans Narrow', 'Source Serif Pro',
  'Bebas Neue', 'Bitter', 'Anton', 'Noto Serif Telugu', 'Cabin', 'Oxygen',
  'Cairo', 'Prompt', 'Abel', 'Source Code Pro', 'Dancing Script', 'Noto Sans Simplified Chinese',
  'EB Garamond', 'Lobster', 'Anuphan', 'Barlow Condensed', 'Exo 2', 'Maven Pro',
  'Pacifico', 'Schibsted Grotesk', 'Comfortaa', 'Hind', 'Crimson Text', 'Jost',
  'Noto Serif Japanese', 'Teko', 'Chivo Mono', 'Fjalla One', 'Signika Negative',
  'Rajdhani', 'Varela Round', 'Space Grotesk', 'Arvo', 'Asap', 'Assistant',
  'Caveat', 'Archivo', 'Righteous', 'Merriweather Sans', 'Abril Fatface',
  'Fira Sans Condensed', 'Rubik Pixels', 'Public Sans', 'Shadows Into Light',
  'Slabo 27px', 'Cormorant Garamond', 'Satisfy', 'Overpass', 'Hind Madurai',
  'IBM Plex Mono', 'M PLUS Rounded 1c', 'Yanone Kaffeesatz', 'Catamaran',
  'Zilla Slab', 'Play', 'Asap Condensed', 'Red Hat Display', 'Tajawal', 'Nanum Myeongjo',
  'Barlow Semi Condensed', 'Indie Flower', 'Secular One', 'Noticia Text',
  'Sedgwick Ave Display', 'Exo', 'Domine', 'Lilita One', 'Sarabun', 'Questrial',
  'Chakra Petch', 'Noto Sans Hong Kong', 'Signika', 'Permanent Marker', 'Russo One',
  'Dongle', 'Saira Condensed', 'IBM Plex Serif', 'Didact Gothic', 'Bree Serif',
  'Outfit', 'Rowdies', 'M PLUS 1p', 'Acme', 'Amatic SC', 'Cinzel', 'Urbanist',
  'Orbitron', 'Vollkorn', 'Source Sans 3', 'Archivo Narrow', 'Alegreya Sans',
  'Alkatra', 'DM Serif Display', 'ABeeZee', 'Almarai', 'Alfa Slab One', 'Kalam',
  'Cardo', 'Changa', 'Space Mono', 'Tinos', 'Amiri', 'Archivo Black', 'IBM Plex Sans Arabic',
  'Tilt Prism', 'Lexend', 'Figtree', 'Patua One', 'Sora', 'Alegreya', 'Yantramanav',
  'Martel', 'Courgette', 'PT Sans Caption', 'Great Vibes', 'Cormorant', 'Prata',
  'Yellowtail', 'Lobster Two', 'Ubuntu Condensed', 'Imbue', 'Montserrat Alternates',
  'Spectral', 'Be Vietnam Pro', 'Lexend Deca', 'Zeyada', 'Frank Ruhl Libre',
  'Rokkitt', 'Noto Serif Traditional Chinese', 'Titan One', 'Encode Sans',
  'Alata', 'Baloo 2', 'Eczar', 'Crete Round', 'Paytone One', 'Plus Jakarta Sans',
  'Sofia Sans Condensed', 'Philosopher', 'Pathway Gothic One', 'Delicious Handrawn',
  'Noto Serif Korean', 'Passion One', 'Francois One', 'Old Standard TT',
  'Marcellus', 'Macondo', 'Sen', 'Bodoni Moda', 'PT Mono', 'IBM Plex Sans Condensed',
  'Sawarabi Mincho', 'Kaushan Script', 'Creepster', 'Gruppo', 'Saira', 'Nova Oval',
  'Carter One', 'Luckiest Guy', 'Concert One', 'Sacramento', 'Khand', 'Gloria Hallelujah',
  'Cantarell', 'Unna', 'Quattrocento Sans', 'Noto Sans Display', 'News Cycle',
  'Faustina', 'Cookie', 'Alice', 'Gothic A1', 'Antic Slab', 'Chivo', 'Rubik Wet Paint',
  'Sawarabi Gothic', 'Merienda', 'Press Start 2P', 'Staatliches', 'Josefin Slab',
  'Yeseva One', 'Alegreya Sans SC', 'Crimson Pro', 'Gelasio', 'Neucha', 'Arsenal',
  'Poiret One', 'Patrick Hand', 'El Messiri', 'Advent Pro', 'Fira Sans Extra Condensed',
  'Ubuntu Mono', 'Blaka Hollow', 'Mukta Malar', 'Commissioner', 'Handlee',
  'Cuprum', 'Fugaz One', 'Quattrocento', 'Special Elite', 'Taviraj', 'Mitr',
  'Marck Script', 'Mr Dafoe', 'Roboto Flex', 'Vidaloka', 'Neuton', 'Allura',
  'Mandali', 'Antonio', 'Alumni Sans', 'Noto Serif Simplified Chinese', 'Ultra',
  'Playfair Display SC', 'Bangers', 'Niramit', 'Aleo', 'Noto Sans Thai',
  'Changa One', 'Ropa Sans', 'DM Serif Text', 'Hind Vadodara', 'Viga', 'Architects Daughter',
  'Abhaya Libre', 'Tangerine', 'Rubik Mono One', 'Gudea', 'DynaPuff', 'Sanchez',
  'Kosugi Maru', 'Nanum Gothic Coding', 'Ramabhadra', 'Laila', 'Encode Sans Condensed',
  'Parisienne', 'Voltaire', 'Yatra One', 'Libre Caslon Text', 'Quantico',
  'Unbounded', 'Hammersmith One', 'Roboto Serif', 'Volkhov', 'Saira Semi Condensed',
  'Castoro', 'Tenor Sans', 'Ruda', 'Goldman', 'Literata', 'Monoton', 'Amaranth',
  'Playball', 'Readex Pro', 'Red Hat Text', 'Baskervville', 'League Spartan',
  'Cabin Condensed', 'Noto Serif Bengali', 'Nanum Pen Script', 'Cousine',
  'Bungee', 'Homemade Apple', 'Alex Brush', 'Bad Script', 'Mada', 'Jura',
  'Audiowide', 'BIZ UDPGothic', 'Istok Web', 'Pragati Narrow', 'Unica One',
  'Itim', 'Labrada', 'Padauk', 'Rock Salt', 'Cinzel Decorative', 'Sriracha',
  'Adamina', 'Blinker', 'Oleo Script', 'Berkshire Swash', 'Phudu', 'Bai Jamjuree',
  'Sigmar One', 'Monda', 'Lusitana', 'Khula', 'Sorts Mill Goudy', 'Fira Mono',
  'Inter Tight', 'Six Caps', 'BenchNine', 'Epilogue', 'Actor', 'Days One',
  'Stint Ultra Condensed', 'Varela', 'Shantell Sans', 'Albert Sans', 'Gochi Hand',
  'Calistoga', 'Shrikhand', 'Economica', 'Lalezar', 'Electrolize', 'Pinyon Script',
  'Forum', 'Damion', 'Allerta Stencil', 'Courier Prime', 'Big Shoulders Display',
  'Share Tech Mono', 'Julius Sans One', 'Palanquin', 'Krub', 'Londrina Solid',
  'Comic Neue', 'Pontano Sans', 'Anonymous Pro', 'Martel Sans', 'Sintony',
  'Athiti', 'Pridi', 'Nothing You Could Do', 'Black Ops One', 'Sansita',
  'Kumbh Sans', 'Alef', 'Rufina', 'Sarala', 'Squada One', 'Karma', 'Zen Kaku Gothic New',
  'Do Hyeon', 'Black Han Sans', 'Italianno', 'Jaldi', 'Reenie Beanie', 'VT323',
  'Boogaloo', 'Noto Naskh Arabic', 'Antic', 'Zen Maru Gothic', 'Cabin Sketch',
  'Tillana', 'Leckerli One', 'Syne', 'Gilda Display', 'Glegoo', 'Pangolin',
  'Holtwood One SC', 'Hind Guntur', 'Kreon', 'Noto Sans Tamil', 'Caveat Brush',
  'JetBrains Mono', 'Average Sans', 'Markazi Text', 'Arapey', 'Shippori Mincho',
  'Lemonada', 'Charm', 'Noto Sans Malayalam', 'Koulen', 'Saira Extra Condensed',
  'Aclonica', 'Aboreto', 'Noto Sans Mono', 'Chewy', 'Covered By Your Grace',
  'Racing Sans One', 'Nanum Brush Script', 'Gajraj One', 'Michroma', 'Basic',
  'Libre Barcode 39', 'DM Mono', 'Shadows Into Light Two', 'Corben', 'Rancho',
  'Cantata One', 'Syncopate', 'Aldrich', 'Oranienbaum', 'Fraunces', 'Alatsi',
  'Petrona', 'Mali', 'Wallpoet', 'Cutive Mono', 'Amita', 'Armata', 'Capriola',
  'PT Serif Caption', 'Bevan', 'Jua', 'Alike Angular', 'Oxanium', 'Julee',
  'Patrick Hand SC', 'Golos Text', 'Coda', 'Fira Code', 'Source Serif 4',
  'Averia Serif Libre', 'Reem Kufi', 'Yrsa', 'Murecho', 'Palanquin Dark',
  'Candal', 'GFS Didot', 'Herr Von Muellerhoff', 'Just Another Hand', 'Bowlby One SC',
  'Mrs Saint Delafield', 'Allerta', 'Arbutus Slab', 'Rye', 'Graduate', 'Lustria',
  'Rammetto One', 'Knewave', 'Fredericka the Great', 'Atkinson Hyperlegible',
  'STIX Two Text', 'Gluten', 'Balsamiq Sans', 'Krona One', 'Trirong', 'Arizonia',
  'Mate', 'Marcellus SC', 'Coustard', 'Chonburi', 'Belleza', 'BioRhyme',
  'Annie Use Your Telescope', 'Rozha One', 'Darker Grotesque', 'Overpass Mono',
  'Noto Sans Devanagari', 'Short Stack', 'La Belle Aurore', 'Niconne', 'Pattaya',
  'K2D', 'Georama', 'Mynerve', 'Sniglet', 'Noto Serif Ethiopic', 'Alike',
  'Biryani', 'Gloock', 'Cedarville Cursive', 'Contrail One', 'Kameron', 'Fahkwang',
  'Kristi', 'Cormorant Infant', 'Noto Serif Display', 'Livvic', 'Kiwi Maru',
  'Enriqueta', 'Slackey', 'Schoolbell', 'Judson', 'Newsreader', 'IBM Plex Sans Thai',
  'Bubblegum Sans', 'Rambla', 'Scada', 'Petit Formal Script', 'Rubik Moonrocks',
  'Henny Penny', 'Sofia', 'Libre Bodoni', 'Coming Soon', 'Overlock', 'Carrois Gothic',
  'Bungee Inline', 'Yesteryear', 'Cambay', 'Marmelad', 'Kosugi', 'Telex',
  'NTR', 'Amiko', 'Mallanna', 'Qwigley', 'Norican', 'Grandstander', 'Magra',
  'Average', 'Atomic Age', 'Averia Libre', 'Suez One', 'Alegreya SC', 'Rochester',
  'Halant', 'Bowlby One', 'Caudex', 'Nobile', 'Bellefair', 'Lateef', 'Aladin',
  'Amethysta', 'Trocchi', 'Noto Sans Hebrew', 'Proza Libre', 'Podkova', 'Sedgwick Ave',
  'Quintessential', 'Delius', 'Sofia Sans Extra Condensed', 'Sofia Sans Semi Condensed',
  'Ovo', 'Baloo Da 2', 'Rubik Iso', 'Fauna One', 'B612', 'Seaweed Script',
  'Mate SC', 'Hepta Slab', 'Grand Hotel', 'ZCOOL XiaoWei', 'David Libre',
  'Brygada 1918', 'Stardos Stencil', 'Fjord One', 'Spinnaker', 'Manjari',
  'Irish Grover', 'Sunflower', 'Thasadith', 'Hanken Grotesk', 'Nixie One',
  'M PLUS 1', 'Monsieur La Doulaise', 'Hanuman', 'Miriam Libre', 'Jockey One',
  'Allan', 'Smooch Sans', 'Maitree', 'Marvel', 'Klee One', 'Kurale', 'IM Fell English SC',
  'Bungee Shade', 'Alexandria', 'Slabo 13px', 'ZCOOL QingKe HuangYou', 'Baloo Tamma 2',
  'Limelight', 'Grenze Gotisch', 'Oxygen Mono', 'Vazirmatn', 'Lily Script One',
  'Encode Sans Semi Condensed', 'Calligraffitti', 'Dawning of a New Day',
  'Share', 'Solitreo', 'Mansalva', 'Padyakke Expanded One', 'Rasa', 'Vollkorn SC',
  'Cutive', 'IM Fell English', 'Pirata One', 'Rosario', 'Rakkas', 'Montserrat Subrayada',
  'Kelly Slab', 'Rampart One', 'Noto Serif Malayalam', 'Martian Mono', 'Headland One',
  'Skranji', 'Baloo Paaji 2', 'Turret Road', 'Suranna', 'Poller One', 'Fresca',
  'Molengo', 'Waiting for the Sunrise', 'Sansita Swashed', 'Zen Old Mincho',
  'Bakbak One', 'Gemunu Libre', 'Copse', 'Love Ya Like A Sister', 'Spectral SC',
  'IBM Plex Sans KR', 'Vesper Libre', 'Fredoka', 'Cormorant Upright', 'Meera Inimai',
  'Style Script', 'Oleo Script Swash Caps', 'Metrophobic', 'League Gothic',
  'Della Respira', 'Gabriela', 'Noto Nastaliq Urdu', 'IM Fell DW Pica', 'UnifrakturMaguntia',
  'Cormorant SC', 'Allison', 'Bentham', 'Shippori Mincho B1', 'Italiana',
  'Zen Kaku Gothic Antique', 'Baloo Thambi 2', 'Lemon', 'Tilt Warp', 'Tilt Neon',
  'Odibee Sans', 'Farro', 'Goudy Bookletter 1911', 'Noto Sans Bengali', 'Bellota Text',
  'Zen Antique', 'Rubik 80s Fade', 'Rubik Vinyl', 'Rubik Spray Paint', 'Rubik Gemstones',
  'Rubik Storm', 'Big Shoulders Text', 'Atma', 'Fondamento', 'Kadwa', 'Harmattan',
  'Ma Shan Zheng', 'Mirza', 'McLaren', 'Edu TAS Beginner', 'Silkscreen',
  'Pompiere', 'Gurajada', 'Rouge Script', 'Radley', 'Buenard', 'Mukta Vaani',
  'Homenaje', 'Flamenco', 'Brawler', 'Aref Ruqaa', 'Quando', 'Ibarra Real Nova',
  'KoHo', 'Andika', 'Lexend Zetta', 'Hahmlet', 'Galada', 'Megrim', 'Mouse Memoirs',
  'RocknRoll One', 'Battambang', 'Fanwood Text', 'Metamorphous', 'Gravitas One',
  'Chelsea Market', 'Elsie', 'DotGothic16', 'Noto Serif Devanagari', 'Nova Mono',
  'Ruslan Display', 'Prosto One', 'Peralta', 'Noto Sans Sinhala', 'Averia Gruesa Libre',
  'Lekton', 'Duru Sans', 'Kodchasan', 'Notable', 'Montez', 'B612 Mono', 'Carme',
  'Azeret Mono', 'Nerko One', 'IM Fell Double Pica', 'Inder', 'Raleway Dots',
  'Ms Madi', 'Poly', 'Caladea', 'Antic Didone', 'Dela Gothic One', 'Supermercado One',
  'Aguafina Script', 'Meddon', 'Mr De Haviland', 'Tenali Ramakrishna', 'Geo',
  'Syne Mono', 'Akshar', 'Sue Ellen Francisco', 'Encode Sans Expanded', 'Anek Malayalam',
  'Gantari', 'Trykker', 'Emilys Candy', 'Almendra', 'Original Surfer', 'Federo',
  'Cambo', 'Hi Melody', 'Goblin One', 'Esteban', 'Yusei Magic', 'Hurricane',
  'Convergence', 'Euphoria Script', 'BhuTuka Expanded One', 'Amarante', 'Expletus Sans',
  'Major Mono Display', 'Tienne', 'Gugi', 'Happy Monkey', 'Germania One',
  'Oregano', 'Estonia', 'Numans', 'Ceviche One', 'Oooh Baby', 'Andada Pro',
  'Faster One', 'Shanti', 'Arya', 'Eater', 'Bellota', 'Modak', 'Finger Paint',
  'Red Rose', 'Anaheim', 'Dokdo', 'Give You Glory', 'Doppio One', 'Ledger',
  'Pavanam', 'Baloo Chettan 2', 'Sail', 'BIZ UDPMincho', 'Vast Shadow', 'Glory',
  'Sono', 'Kufam', 'Share Tech', 'Noto Sans SignWriting', 'Tomorrow', 'Baumans',
  'Averia Sans Libre', 'East Sea Dokdo', 'Inknut Antiqua', 'Lexend Exa',
  'Wendy One', 'Zen Kurenaido', 'Life Savers', 'Mukta Mahee', 'M PLUS 2',
  'Akaya Telivigala', 'Walter Turncoat', 'Reggae One', 'Overlock SC', 'Clicker Script',
  'Belgrano', 'Libre Caslon Display', 'IBM Plex Sans JP', 'Kite One', 'Fragment Mono',
  'Asul', 'Noto Sans Georgian', 'Jomhuria', 'Nova Round', 'Baloo Bhai 2',
  'Ramaraja', 'Freckle Face', 'Frijole', 'Mako', 'Encode Sans Semi Expanded',
  'Kaisei Decol', 'Recursive', 'Inria Serif', 'Montaga', 'Bubbler One', 'Over the Rainbow',
  'Balthazar', 'Just Me Again Down Here', 'Orienta', 'Shojumaru', 'Lexend Giga',
  'Coiny', 'Freehand', 'Bilbo Swash Caps', 'Charmonman', 'Hachi Maru Pop',
  'Mountains of Christmas', 'Scope One', 'Katibeh', 'Cherry Swash', 'Crafty Girls',
  'Saira Stencil One', 'Sree Krushnadevaraya', 'Cormorant Unicase', 'Sarpanch',
  'Xanh Mono', 'Timmana', 'Marhey', 'Inria Sans', 'Codystar', 'Delius Swash Caps',
  'Libre Barcode 39 Text', 'MedievalSharp', 'Gamja Flower', 'Noto Sans Khmer',
  'Strait', 'Solway', 'Baloo Bhaina 2', 'Kaisei Tokumin', 'Sumana', 'ZCOOL KuaiLe',
  'Habibi', 'Prociono', 'Loved by the King', 'Artifika', 'Londrina Shadow',
  'Port Lligat Slab', 'Sofia Sans', 'Ephesis', 'Port Lligat Sans', 'Salsa',
  'Familjen Grotesk', 'Gayathri', 'Imprima', 'UnifrakturCook', 'Chau Philomene One',
  'Alumni Sans Collegiate One', 'Kotta One', 'Shalimar', 'Ruthie', 'Mina',
  'Delius Unicase', 'MuseoModerno', 'Ranchers', 'Potta One', 'Vibur', 'Uncial Antiqua',
  'Piazzolla', 'Bigshot One', 'Kranky', 'Sulphur Point', 'Cherry Cream Soda',
  'League Script', 'Gaegu', 'Noto Serif Kannada', 'Londrina Outline', 'Fasthand',
  'Tauri', 'Ranga', 'Voces', 'The Girl Next Door', 'Corinthia', 'Dynalight',
  'Bayon', 'Unlock', 'Comforter Brush', 'Libre Barcode 128', 'Rubik Dirt',
  'Noto Sans Symbols', 'Puritan', 'Odor Mean Chey', 'Climate Crisis', 'Nova Square',
  'Noto Sans Telugu', 'Noto Sans Lao Looped', 'Nokora', 'Sonsie One', 'Trade Winds',
  'Carrois Gothic SC', 'Chango', 'Orelega One', 'IBM Plex Sans Devanagari',
  'Noto Serif Thai', 'Gafata', 'Wire One', 'Spicy Rice', 'Cantora One', 'Song Myung',
  'Unkempt', 'Coda Caption', 'Iceland', 'Lexend Mega', 'Asar', 'Rum Raisin',
  'Noto Sans Tangsa', 'Karantina', 'Stylish', 'Kaisei Opti', 'New Rocker',
  'Birthstone', 'Denk One', 'Stick', 'Miniver', 'Ribeye', 'Akronim', 'Farsan',
  'Kulim Park', 'Baloo Bhaijaan 2', 'Road Rage', 'Stoke', 'Abyssinica SIL',
  'Mochiy Pop One', 'Noto Serif Lao', 'Square Peg', 'Gorditas', 'Zen Dots',
  'Noto Serif Toto', 'Gowun Dodum', 'Rationale', 'Red Hat Mono', 'Khmer',
  'Mystery Quest', 'Noto Sans Kannada', 'Monofett', 'Besley', 'Gotu', 'Qwitcher Grypen',
  'Baloo Tammudu 2', 'Rosarivo', 'Cute Font', 'IBM Plex Sans Thai Looped',
  'Varta', 'Macondo Swash Caps', 'Anek Telugu', 'Kdam Thmor Pro', 'Stalemate',
  'Manuale', 'Noto Serif Khojki', 'Anek Tamil', 'Libre Barcode 39 Extended Text',
  'Sancreek', 'Lovers Quarrel', 'IM Fell French Canon', 'BIZ UDGothic', 'Dekko',
  'Suwannaphum', 'Tiro Kannada', 'Redressed', 'Moul', 'Medula One', 'WindSong',
  'Donegal One', 'Zilla Slab Highlight', 'Paprika', 'Bigelow Rules', 'Barrio',
  'Smokum', 'Stint Ultra Expanded', 'Hina Mincho', 'Engagement', 'Meie Script',
  'Chicle', 'Anek Bangla', 'Peddana', 'Montagu Slab', 'Fontdiner Swanky',
  'Trispace', 'Train One', 'Noto Sans Lao', 'Kavoon', 'Piedra', 'Scheherazade New',
  'Milonga', 'Nabla', 'Kumar One', 'Margarine', 'Cairo Play', 'Moon Dance',
  'Noto Sans Armenian', 'Princess Sofia', 'Eagle Lake', 'Crushed', 'Libre Barcode 128 Text',
  'Sarina', 'Cagliostro', 'Iceberg', 'Buda', 'Plaster', 'Anek Odia', 'IM Fell Great Primer',
  'Sura', 'Gowun Batang', 'Sirin Stencil', 'Grape Nuts', 'Jomolhari', 'Felipa',
  'Sahitya', 'Spline Sans', 'MonteCarlo', 'Molle', 'Angkor', 'Yeon Sung',
  'Romanesco', 'Dorsa', 'Ravi Prakash', 'Chathura', 'Condiment', 'Poor Story',
  'Underdog', 'Yomogi', 'Griffy', 'Comforter', 'Yuji Syuku', 'Kavivanar',
  'Zhi Mang Xing', 'Offside', 'Tulpen One', 'Content', 'Modern Antiqua',
  'Srisakdi', 'Mochiy Pop P One', 'Rhodium Libre', 'Elsie Swash Caps', 'Fascinate Inline',
  'Fuzzy Bubbles', 'Amiri Quran', 'Birthstone Bounce', 'Wellfleet', 'Radio Canada',
  'Simonetta', 'Shippori Antique', 'Joan', 'Ruluko', 'Vampiro One', 'Bilbo',
  'Text Me One', 'Kaisei HarunoUmi', 'Carattere', 'Vujahday Script', 'Jolly Lodger',
  'Girassol', 'Beth Ellen', 'Passions Conflict', 'Nova Flat', 'Linden Hill',
  'Nuosu SIL', 'Tiro Devanagari Hindi', 'Viaoda Libre', 'Autour One', 'Spirax',
  'Akaya Kanadaka', 'Joti One', 'Encode Sans SC', 'Waterfall', 'Englebert',
  'Bona Nova', 'Fenix', 'Mrs Sheppards', 'Bahianita', 'Stick No Bills', 'Keania One',
  'Chela One', 'Mogra', 'BioRhyme Expanded', 'Stalinist One', 'Diplomata',
  'Chilanka', 'Licorice', 'Metal Mania', 'Tiro Bangla', 'Inika', 'Swanky and Moo Moo',
  'Fascinate', 'Hanalei', 'Arima', 'Nosifer', 'Junge', 'Emblema One', 'Marko One',
  'Kantumruy Pro', 'Noto Serif Oriya', 'Risque', 'Yaldevi', 'Croissant One',
  'Maiden Orange', 'Jim Nightshade', 'Lakki Reddy', 'Zen Antique Soft', 'Oldenburg',
  'Inspiration', 'Black And White Picture', 'Tiro Gurmukhi', 'New Tegomin',
  'Bahiana', 'Anybody', 'Caesar Dressing', 'Grenze', 'IM Fell DW Pica SC',
  'Ribeye Marrow', 'M PLUS 1 Code', 'Long Cang', 'Mohave', 'Jacques Francois',
  'Kirang Haerang', 'Siemreap', 'Anek Latin', 'Single Day', 'Shippori Antique B1',
  'Alkalami', 'Anek Devanagari', 'Liu Jian Mao Cao', 'Texturina', 'Smooch',
  'Beau Rivage', 'Rubik Distressed', 'Rubik Marker Hatch', 'Rubik Burned',
  'Rubik Maze', 'Revalia', 'Galdeano', 'Spline Sans Mono', 'Dr Sugiyama',
  'Noto Sans Oriya', 'Lancelot', 'Qahiri', 'Alumni Sans Pinstripe', 'Seymour One',
  'Smythe', 'Gentium Book Plus', 'Noto Sans Symbols 2', 'Festive', 'Passero One',
  'Ewert', 'BIZ UDMincho', 'Metal', 'Diplomata SC', 'Edu QLD Beginner', 'Geostar Fill',
  'Bungee Outline', 'Hanalei Fill', 'Noto Serif Hong Kong', 'Galindo', 'Gentium Plus',
  'Arbutus', 'Glass Antiqua', 'Flavors', 'Noto Sans Tai Viet', 'Big Shoulders Stencil Text',
  'IM Fell Great Primer SC', 'Finlandica', 'Fuggles', 'Benne', 'Whisper',
  'Almendra SC', 'Jacques Francois Shadow', 'Bungee Hairline', 'Erica One',
  'Lavishly Yours', 'Gidugu', 'IM Fell French Canon SC', 'Devonshire', 'Edu NSW ACT Foundation',
  'Edu VIC WA NT Beginner', 'Edu SA Beginner', 'Meow Script', 'Gulzar', 'Asset',
  'Snippet', 'Almendra Display', 'Vibes', 'Charis SIL', 'Kumar One Outline',
  'Dangrek', 'The Nautigal', 'Libre Barcode 39 Extended', 'Butterfly Kids',
  'Nova Slim', 'Water Brush', 'Barriecito', 'Noto Sans Gujarati', 'Genos',
  'Bokor', 'Tiro Devanagari Sanskrit', 'Tiro Devanagari Marathi', 'Tiro Tamil',
  'Tiro Telugu', 'Noto Music', 'Gupter', 'Mingzat', 'Miss Fajardose', 'Astloch',
  'Noto Serif Georgian', 'Aubrey', 'Tai Heritage Pro', 'Sofadi One', 'Mr Bedfort',
  'Big Shoulders Stencil Display', 'Anek Gujarati', 'Splash', 'Zen Tokyo Zoo',
  'Praise', 'Sunshiney', 'Noto Serif Khmer', 'Alumni Sans Inline One', 'Lexend Tera',
  'IBM Plex Sans Hebrew', 'Butcherman', 'Caramel', 'Londrina Sketch', 'Mea Culpa',
  'Fruktur', 'Grechen Fuemen', 'Gwendolyn', 'Langar', 'Truculenta', 'Noto Serif Sinhala',
  'Hubballi', 'Chenla', 'Babylonica', 'GFS Neohellenic', 'Trochut', 'Luxurious Script',
  'Combo', 'Ballet', 'Lexend Peta', 'Rubik Glitch', 'IM Fell Double Pica SC',
  'Blaka', 'Ruge Boogie', 'Noto Serif Gujarati', 'Bonheur Royale', 'Are You Serious',
  'Imperial Script', 'Federant', 'Rubik Bubbles', 'Lacquer', 'Suravaram',
  'Neonderthaw', 'Snowburst One', 'Nova Cut', 'Purple Purse', 'Preahvihear',
  'Bonbon', 'Anek Gurmukhi', 'Miltonian', 'Noto Sans Ethiopic', 'Koh Santepheap',
  'Taprom', 'Noto Sans Limbu', 'Nova Script', 'Tapestry', 'Flow Circular',
  'Noto Sans Gurmukhi', 'Gideon Roman', 'Moulpali', 'Rubik Beastly', 'Big Shoulders Inline Text',
  'Uchen', 'Sassy Frass', 'Fleur De Leah', 'Miltonian Tattoo', 'Updock',
  'My Soul', 'Love Light', 'Sevillana', 'Reem Kufi Fun', 'Anek Kannada',
  'Dhurjati', 'Tourney', 'Noto Sans Javanese', 'Noto Sans Syloti Nagri',
  'Kenia', 'Yuji Boku', 'Libre Barcode EAN13 Text', 'Send Flowers', 'Ingrid Darling',
  'Big Shoulders Inline Display', 'Rubik Puddles', 'Rubik Microbe', 'Geostar',
  'Petemoss', 'Noto Serif Tamil', 'Aref Ruqaa Ink', 'Redacted Script', 'Syne Tactile',
  'Blaka Ink', 'Kings', 'Noto Serif Tibetan', 'Warnes', 'Island Moments',
  'Kolker Brush', 'Luxurious Roman', 'Oi', 'Noto Serif Armenian', 'Yuji Mai',
  'Noto Sans Adlam', 'Zen Loop', 'Bungee Spice', 'Redacted', 'Noto Sans Lepcha',
  'Noto Sans Adlam Unjoined', 'Noto Sans Coptic', 'M PLUS Code Latin', 'Explora',
  'Ole', 'Noto Sans Mongolian', 'Grey Qo', 'Flow Block', 'Moo Lah Lah', 'Twinkle Star',
  'Noto Sans Meetei Mayek', 'Cherish', 'Noto Sans Mende Kikakui', 'Puppies Play',
  'Noto Sans Tifinagh', 'Noto Sans Canadian Aboriginal', 'Reem Kufi Ink',
  'Noto Sans Zanabazar Square', 'Noto Sans Sora Sompeng', 'Noto Sans Tagalog',
  'Noto Rashi Hebrew', 'Noto Sans Thaana', 'Noto Sans Avestan', 'Noto Sans Cherokee',
  'Noto Serif Ahom', 'Flow Rounded', 'Noto Sans Balinese', 'Noto Sans Bamum',
  'Noto Sans Miao', 'Noto Serif Nyiakeng Puachue Hmong', 'Noto Sans Bassa Vah',
  'Noto Sans Medefaidrin', 'Noto Sans Vai', 'Noto Serif Balinese', 'Noto Sans Yi',
  'Noto Sans Sharada', 'Noto Serif Gurmukhi', 'Noto Sans Cham', 'Noto Sans Buginese',
  'Noto Sans Kayah Li', 'Noto Sans Tagbanwa', 'Noto Sans Chakma', 'Noto Sans Ol Chiki',
  'Noto Sans Osage', 'Noto Sans Hanunoo', 'Noto Sans Buhid', 'Noto Sans Multani',
  'Noto Sans Grantha', 'Noto Serif Grantha', 'Noto Sans Tai Tham', 'Noto Sans Lisu',
  'Noto Sans New Tai Lue', 'Noto Sans Sundanese', 'Noto Sans Batak', 'Noto Sans Pahawh Hmong',
  'Noto Sans Tai Le', 'Noto Sans Hanifi Rohingya', 'Noto Sans Wancho', 'Noto Sans Mro',
  'Noto Sans Newa', 'Noto Sans Masaram Gondi', 'Noto Sans Warang Citi', 'Noto Sans Siddham',
  'Noto Sans Saurashtra', 'Noto Sans Pau Cin Hau', 'Noto Sans Takri', 'Noto Sans Khojki',
  'Noto Sans Modi', 'Noto Sans Osmanya', 'Noto Sans Rejang', 'Noto Sans N\'Ko',
  'Noto Sans Arabic', 'Noto Kufi Arabic', 'Noto Sans Tirhuta', 'Noto Color Emoji',
  'Noto Sans Myanmar', 'Noto Emoji', 'Noto Sans Anatolian Hieroglyphs', 'Noto Sans Gothic',
  'Noto Sans Math', 'Noto Sans Samaritan', 'Noto Sans Old Persian', 'Noto Sans Thai Looped',
  'Noto Serif Tangut', 'Noto Sans Carian', 'Noto Sans Egyptian Hieroglyphs',
  'Noto Serif Myanmar', 'Noto Sans Imperial Aramaic', 'Noto Traditional Nüshu',
  'Noto Sans Old Hungarian', 'Noto Sans Old Italic', 'Noto Sans Deseret',
  'Noto Sans Marchen', 'Noto Sans Ugaritic', 'Noto Sans Linear B', 'Noto Sans Old Permic',
  'Noto Sans Elymaic', 'Noto Sans Nabataean', 'Noto Sans Manichaean', 'Noto Sans Nüshu',
  'Noto Sans Shavian', 'Noto Sans Phags Pa', 'Noto Sans Glagolitic', 'Noto Sans Mandaic',
  'Noto Sans Brahmi', 'Noto Sans Cuneiform', 'Noto Sans Cypriot', 'Noto Sans Lydian',
  'Noto Serif Dogra', 'Noto Sans Psalter Pahlavi', 'Noto Sans Indic Siyaq Numbers',
  'Noto Sans Tamil Supplement', 'Noto Serif Yezidi', 'Noto Sans Gunjala Gondi',
  'Noto Sans Palmyrene', 'Noto Sans Inscriptional Pahlavi', 'Noto Sans Old North Arabian',
  'Noto Sans Caucasian Albanian', 'Noto Sans Hatran', 'Noto Sans Inscriptional Parthian',
  'Noto Sans Khudawadi', 'Noto Sans Runic', 'Noto Sans Old Turkic', 'Noto Sans Old South Arabian',
  'Noto Sans Elbasan', 'Noto Sans Mayan Numerals', 'Noto Sans Syriac', 'Noto Sans Ogham',
  'Noto Sans Kaithi', 'Noto Sans Bhaiksuki', 'Noto Sans Linear A', 'Noto Sans Old Sogdian',
  'Noto Sans Lycian', 'Noto Sans Duployan', 'Noto Sans Phoenician', 'Noto Sans Kharoshthi',
  'Noto Sans Meroitic', 'Noto Sans Sogdian', 'Noto Sans Mahajani', 'Noto Sans Soyombo',
  /* Wikipedia Font List - Second */
  'Adobe Jenson', 'Albertus', 'Aldus', 'Alexandria', 'Algerian', 'Amelia',
  'American Typewriter', 'Antiqua', 'Arno', 'Aster', 'Aurora', 'News 706',
  'Baskerville', 'Bell', 'Belwe Roman', 'Bembo', 'Bernhard Modern', 'Bodoni',
  'Bauer Bodoni',
  'Bitstream Charter', 'Bookman', 'Bulmer', 'Caledonia', 'Calisto MT', 'Cambria',
  'Capitals', 'Cartier', 'Caslon', 'Wyld', 'Caslon Antique / Fifteenth Century',
  'Caslon Antique',
  'Centaur', 'Century type family', 'Charis SIL',
  'Gulim', 'New Gulim', 'Dotum',
  'Cheltenham', 'Clearface',
  'Cloister Black', 'Cochin', 'Computer Modern', 'Concrete Roman', 'Constantia',
  'Copperplate Gothic', 'DejaVu Serif', 'Didot', 'Droid Serif', 'Emerson',
  'Fairfield', 'Fat face', 'FF Scala', 'Fixedsys', 'Footlight', 'Friz Quadrata',
  'Garamond', 'Gentium', 'Georgia', 'GNU FreeFont', 'Google logo', 'Goudy Old Style',
  'Goudy', 'Granjon', 'Hermann Zapf', 'Hightower Text', 'Hoefler Text', 'IBM Plex Serif',
  'Imprint', 'ITC Benguiat', 'Janson', 'Jokerman', 'Joanna', 'Korinna', 'Legibility Group',
  'Lexicon', 'Liberation Serif', 'Linux Libertine', 'Literaturnaya', 'Lucida Bright',
  'Ludwig & Mayer', 'Memphis', 'Miller', 'Minion', 'Modern', 'Mrs Eaves',
  'MS Serif', 'Nebiolo Printech', 'Torino', 'New York', 'Nimbus Roman No. 9 L',
  'Nimbus Roman Number 9 L',
  'NPS Rawlinson Roadway', 'OCR-A', 'Palatino', 'Book Antiqua', 'Sistina',
  'Perpetua', 'Plantin', 'PT Fonts',
  'PT',
  'Renault', 'Requiem', 'Rotis', 'Rudolph Ruzicka',
  'Sabon', 'Source Serif', 'Souvenir', 'Stephenson Blake',
  'Sylfaen', 'Theano Didot', 'Times New Roman', 'Times',
  'Trajan', 'Trinité', 'Trump Mediaeval', 'University of California Old Style',
  'Berkeley Old Style', 'Californian FB', 'Utopia', 'Vera Serif', 'Windsor',
  'Archer', 'Athens', 'Candida', 'Cholla Slab', 'City',
  'Clarendon', 'Courier', 'Egyptienne', 'Guardian Egyptian', 'Ionic No. 5',
  'Ionic Number 5',
  'Lexia', 'Nilland', 'Roboto Slab', 'Rockwell', 'Schadow', 'Serifa', 'Skeleton Antique',
  'Tower', 'Agency FB', 'Akzidenz-Grotesk',
  'Andalé Sans', 'Antique Olive', 'Arial',
  'Arial Monospace',
  'Arial Unicode MS', 'Avant Garde Gothic',
  'Avenir', 'Bank Gothic', 'Bauhaus', 'Bell Centennial', 'Bell Gothic', 'Benguiat Gothic',
  'Berlin Sans', 'Brandon Grotesque', 'Calibri', 'Casey', 'Century Gothic',
  'Charcoal', 'Chicago', 'Clearview', 'Comic Sans',
  'Compacta', 'Corbel', 'DejaVu Sans', 'DIN', 'Dotum', 'Droid Sans', 'Dyslexie',
  'Ecofont', 'Eras', 'Esseltub', 'Espy Sans', 'Eurocrat', 'Eurostile', 'Square 721',
  'FF Dax', 'FF Meta', 'FF Scala Sans', 'Fira Sans', 'Fira Mono', 'Fira Code',
  'Fira Go', 'Folio', 'Franklin Gothic', 'FreeSans', 'Frutiger', 'Futura',
  'Geneva', 'Gill Sans', 'Gill Sans Schoolbook', 'Gotham', 'Haettenschweiler',
  'Handel Gothic', 'Hei', 'Helvetica', 'Helvetica Neue', 'Swiss 721', 'Highway Gothic',
  'IBM Plex Sans', 'Impact', 'Industria', 'Interstate', 'Johnston/New Johnston',
  'Kabel', 'Klavika', 'Lato', 'Liberation Sans', 'Linux Biolinum', 'Lucida Sans',
  'Lucida Grande', 'Lucida Sans Unicode',
  'Batang', 'Gungsuh',
  'Lydian', 'Meiryo', 'Meta', 'Microgramma',
  'Motorway', 'MS Sans Serif', 'Myriad',
  'Neutraface', 'Neuzeit S', 'News Gothic', 'Nimbus Sans L', 'Nordstern',
  'Open Sans', 'Optima', 'Overpass', 'Parisine', 'Product Sans',
  'Proxima Nova', 'PT Sans', 'Rail Alphabet', 'Roboto',
  'Rotis Sans', 'San Francisco',
  'Segoe UI', 'Skia', 'Source Sans Pro', 'SST', 'Sweden Sans',
  'Syntax', 'System', 'Tahoma', 'Template Gothic', 'Thesis Sans',
  'Tiresias', 'Trade Gothic', 'Transport', 'Trebuchet MS', 'Twentieth Century (Tw Cen MT)',
  'Twentieth Century', 'Tw Cen MT',
  'Ubuntu', 'Unica', 'Univers', 'Zurich', 'Vera Sans', 'Verdana', 'Nyala',
  'Rotis Semi Serif', 'EasyReading',
  'Andalé Mono', 'Bitstream Vera (Vera Sans Mono)',
  'Vera Sans Mono',
  'Consolas', 'Courier New',
  'DejaVu Sans Mono', 'Droid Sans Mono', 'Everson Mono',
  'Everson Mono Unicode',
  'Fixed', 'HyperFont',
  'IBM Plex Mono', 'Inconsolata', 'Letter Gothic', 'Liberation Mono', 'Lucida Console',
  'Lucida Sans Typewriter', 'Lucida Typewriter', 'Menlo', 'MICR', 'Monaco',
  'Monospace', 'MS Gothic', 'MS Mincho', 'Nimbus Mono L', 'OCR-B', 'PragmataPro',
  'Prestige Elite',
  'Prestige',
  'ProFont',
  'Cutive Mono',
  'Proggy programming fonts',
  'Proggy',
  'Roboto Mono',
  'SimHei', 'SST Typewriter', 'SimSun',
  'Awami Nastaliq',
  'Source Code Pro', 'Terminal', 'Ubuntu Mono',
  'Vera Sans Mono (Bitstream Vera)',
  'Vera Sans Mono',
  'Balloon', 'Brush Script', 'Choc', 'Dom Casual', 'Mistral', 'Papyrus',
  'Segoe Script', 'American Scribe', 'AMS Euler', 'Apple Chancery',
  'Forte', 'French Script', 'ITC Zapf Chancery', 'Kuenstler Script', 'Monotype Corsiva',
  'Old English Text MT', 'Zapfino', 'Andy', 'Ashley Script',
  'Cézanne', 'Chalkboard', 'Comic Sans MS', 'Comic Neue', 'Freestyle Script',
  'Kristen', 'Lucida Handwriting', 'Coronet', 'Curlz', 'Gravura', 'Script',
  'Wiesbaden Swing', 'Bastard', 'Breitkopf Fraktur', 'Fette Fraktur',
  'Fletcher', 'Fraktur', 'Lucida Blackletter', 'Old English Text', 'Schwabacher',
  'Tannenberg', 'Textualis', 'Theuerdank Fraktur', 'Aharoni',
  'Clone',
  'Hebrew script', 'Aparajita', 'Nastaliq',
  'Chandas', 'Gadugi', 'Grecs du roi', 'Japanese Gothic',
  'Jomolhari', 'Kiran', 'Kochi',
  'Sutturah',
  'Baloo',
  'Baloo Bhai',
  'Baloo Bhaijaan',
  'Baloo Bhaina',
  'Baloo Chettan',
  'Baloo Da',
  'Baloo Paaji',
  'Baloo Tamma',
  'Baloo Tammudu',
  'Baloo Thambi',
  'Nassim',
  'Neacademia',
  'Koren', 'Kruti Dev',
  'Malgun Gothic', 'Microsoft JhengHei', 'Microsoft YaHei', 'Minchō', 'Ming',
  'Mona', 'Nastaliq Navees', 'Noto',
  'Aldhabi', 'Corsair',
  'Perpetua Greek',
  'Aisha', 'Eskorte',
  'Porson',
  'Segoe UI Symbol', 'Shruti',
  'Arek', 'Skolar', 'Avory', 'Hanacaraka',
  'Tengwar', 'Tibetan Machine Uni', 'Urdu Typesetting',
  'Wilson Greek',
  'Unicode Standard',
  'Alphabetum',
  'Bitstream Cyberbit', 'Bitstream Vera', 'DejaVu fonts',
  'DejaVu',
  'Code2000', 'BMP', 'Code2001', 'Code2002', 'Doulos SIL', 'IPA', 'EB Garamond',
  'Fallback font',
  'Fallback',
  'FreeFont', 'GNU Unifont',
  'Georgia Ref', 'New Gulim', 'Junicode', 'Kurinto Font Folio', 'UCSUR',
  'LastResort', 'Unicode', 'ISO 8859-x', 'Nimbus Sans Global',
  'Google', 'Squarish Sans CT', 'STIX', 'XITS', 'Titus Cyberbit Basic',
  'Verdana Ref', 'Dingbat', 'Asana-Math', 'Blackboard bold',
  'Bookshelf Symbol 7', 'Cambria Math', 'Lucida Math', 'Marlett', 'Symbol',
  'Webdings', 'Wingdings', 'Wingdings 2', 'Wingdings 3', 'Zapf Dingbats',
  'Ad Lib',
  'Allegro', 'Andreas', 'Arnold Böcklin', 'Astur', 'Banco', 'Braggadocio',
  'Broadway', 'Caslon Antique', 'Cooper Black', 'Ellington', 'Exocet', 'FIG Script',
  'Gabriola', 'Horizon', 'Jim Crow', 'Lo-Type', 'Neuland', 'Peignot', 'San Francisco',
  'Stencil', 'Umbra', 'Westminster', 'Willow',
  'Lithos', 'Höfðaletur', 'Compatil', 'Generis', 'Grasset', 'LED', 'Luxi',
  'Sans forgetica',
  /* From MDN */
  'cursive', 'system-ui',
  'Gill Sans Extrabold',  
  'fantasy',
  'ui-serif',
  'ui-sans-serif',
  'ui-monospace',
  'ui-rounded',
  'emoji',
  'math',
  'fangsong',
  'inherit',
  'initial',
  'revert',
  'revert-layer',
  'unset',
  'Palladio', 'URW Palladio', 
  'Brush Script Std',   
  'Herculanum', 'Party LET'];
/* The following data structure contains information about  
   all of the standard font kernings. Note that the font   
   kerning is always in lowercase. */
const HDLmUtilityFontKerningInfo = ['auto', 'normal', 'none'];
/* The following data structure contains information about  
   all of the standard font size values. Note that the    
   font size value is always in lowercase. */
const HDLmUtilityFontSizeInfo = [
  'small', 'smaller', 'x-small', 'xx-small',
  'math', 'medium',
  'large', 'larger', 'x-large', 'xx-large', 'xxx-large',
  'inherit', 'initial',
  'revert', 'revert-layer', 
  'unset'];
/* The following data structure contains information about  
   all of the standard font stretch values. Note that the    
   font stretch value is always in lowercase. */
const HDLmUtilityFontStretchInfo = ['condensed', 'expanded',
  'extra-condensed', 'extra-expanded', 'inherit', 'initial',
  'normal', 'revert', 'revert-layer', 
  'semi-condensed', 'semi-expanded', 'ultra-condensed', 'ultra-expanded',
  'unset'];
/* The following data structure contains information about  
   all of the standard font styles. Note that the font style  
   all of the standard font styles. Note that the font style  
   is always in lowercase. */
const HDLmUtilityFontStyleInfo = ['italic', 'normal', 'oblique'];
/* The following data structure contains information about  
   all of the standard font variants. Note that the font   
   variant is always in lowercase. */
const HDLmUtilityFontVariantInfo = ['normal', 'small-caps', 'inherit', 'initial'];
/* The following data structure contains information about  
   all of the standard font weights. Note that the font weight  
   is always in lowercase. Note also that font weights can be
   specified as integers. */
const HDLmUtilityFontWeightInfo = ['bold', 'bolder', 'inherit', 'initial', 'lighter', 'normal',
                                   'revert','revert-layer', 'unset'];
/* The following data structure contains information about  
   all of the standard line heights. Note that the line height  
   is always in lowercase. Note also that line heignts can be
   specified in other ways. */
const HDLmUtilityLineHeightInfo = ['inherit', 'initial', 'lighter', 'normal',
  'revert', 'revert-layer', 'unset'];
/* The next value is used to generate unique ID values for HTML elements */ 
let HDLmUtilityId = 0; 
class HDLmUtility {
  /* Add a 'https:' prefix to a URL if need be. If the URL already starts
     with 'http:' or 'https:' it is not modified. However, if it does not
     have either 'http:' or 'https:', then 'https:' is added to the URL. 
     Note that a prefix such as 'file:' will not be recognized. This means
     that 'https:' will be added in front of 'file:'. */
  static addHttpsPrefix(urlStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof urlStr != 'string') {
      let errorText = `URL value passed to addHttpsPrefix is not a string`;
      HDLmAssert(false, errorText);
    }
    if (urlStr.startsWith('http:') ||
      urlStr.startsWith('https:'))
      return urlStr;
    return 'https:' + urlStr;
  }
  /* Add a specific CSS property to the inline style for an HTML
     element. If the HTML element already has a style, then the
     style is updated with the new property. If the HTML does not
     have an inline style, then an inline style is created. If
     the passed style is actually added, this routine returns
     true. If the style property is not added, this routine returns
     false; */
  static addStyleProperty(targetElement, property) {
    /* Declare and define a few variable */
    let rv = false;
    /* Get the existing inline style, if any */
    let currentStyle = HDLmHtml.getStyleString(targetElement);
    if (currentStyle == null)
      currentStyle = '';
    /* Add the new property to the inline style */
    currentStyle += ';';
    currentStyle += property;
    /* Store the updated style in the HTML element. We have to use
       eval here because the regular set attribute call does not
       work. Why is not clear. */
    /* let curStr = "targetElement.setAttribute('style', '"; */
    /* curStr += currentStyle; */
    /* curStr += "')"; */
    /* eval(curStr); */
    targetElement.setAttribute('style', currentStyle);
    /* Set the return value and return to the caller */
    rv = true;
    return rv;
  }
  /* Build a bridge rest API query from values passed by
     the caller. The returned value is the query string. */
  static buildBridgeRestQuery(colName) {
    /* Make sure the first argument passed by the caller is a string */
    if (typeof colName != 'string') {
      let errorText = `Column name value passed to buildBridgeRestQuery is not a string`;
      HDLmAssert(false, errorText);
    }
    let queryStr = '';
    /* Build the content string for use below. */
    let valueModified = HDLmUtility.getContentString();
    /* Actually build the suffix string */
    queryStr += 'q=[[[';
    queryStr += "'";
    queryStr += colName;
    queryStr += "'";
    queryStr += ",'eq',";
    queryStr += "'";
    queryStr += valueModified;
    queryStr += "'";
    queryStr += ',';
    queryStr += "'";
    queryStr += valueModified;
    queryStr += "'";
    queryStr += ']]]';
    return queryStr;
  }
  /* Build the content string from the values passed by the 
     caller */
  static buildContentString(companyPrefix, value, contentSuffix) {
    /* Make sure the first argument passed by the caller is a string */
    if (typeof companyPrefix != 'string') {
      let errorText = `Company prefix value passed to buildContentString is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the second argument passed by the caller is a string */
    if (typeof value != 'string') {
      let errorText = `Base value passed to buildContentString is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the third argument passed by the caller is a string */
    if (typeof contentSuffix != 'string') {
      let errorText = `Content suffix value passed to buildContentString is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Add the prefix to the value. If the prefix is an empty string,
       this step can be skipped. */
    let valueModified = value;
    if (companyPrefix != '')
      valueModified = valueModified + '_' + companyPrefix;
    /* Add the suffix to the value. If the suffix is an empty string,
       this step can be skipped. */
    if (contentSuffix != '')
      valueModified = valueModified + '_' + contentSuffix;
    /* Return the content string */
    return valueModified;
  }
  /* This function checks for duplicate elements in an array. The caller
     provides the input array. */
  static checkDuplicates(inArray) {
    let arrayLen = inArray.length;
    /* If the input array is empty or just has one element, we can not
       have any duplicates */
    if (arrayLen < 2)
      return false;
    /* Build a Set from the original array elements. The Set code will
       ignore any duplicates */
    let inSet = new Set(inArray);
    if (inSet.size < arrayLen)
      return true;
    return false;
  }
  /* The method below checks if the tokens in a token vector
     match the entries in a pattern array. If no errors are 
     detected, an empty string is returned to the caller. If
     an error is detected, an error message is returend to the
     caller. */
  static checkPattern(tokenVec, patternArray) {
    /* Make sure the first argument passed by the caller is an array */
    if (Array.isArray(tokenVec) == false) {
      let errorText = 'Token vector value passed to checkPattern method is not an array';
      HDLmAssert(false, errorText);
    }
    /* Make sure the second argument passed by the caller is an array */
    if (Array.isArray(patternArray) == false) {
      let errorText = 'Pattern value passed to checkPattern method is not an array';
      HDLmAssert(false, errorText);
    }
    let errorText = '';
    let patMax;
    let patMin;
    let patOptional;
    let patValue;
    let token;
    let tokNumber;
    /* Get the pattern array length and the token vector
       length. The token vector might have fewer entries 
       than the pattern array, if optional tokens are not
       present. */
    let patLen = patternArray.length;
    let tokLen = tokenVec.length;
    let tokIndx = 0;
    for (let i = 0; i < patLen; i++) {
      let pattern = patternArray[i];
      let patKeys = Object.keys(pattern);
      let patFirstKey = patKeys[0];
      /* Switch on the pattern type */
      switch (patFirstKey) {
        /* Handle end pattern entries. All we really do in this
           case is make sure we have an end token. */
        case 'end':
          patValue = pattern[patFirstKey];
          /* Make sure we can actually access the token */
          if (tokIndx >= tokLen) {
            errorText = `Token for pattern entry (${i}) is missing`;
            return errorText;
          }
          /* Get the current token and check it against the pattern */
          token = tokenVec[tokIndx];
          if (token.tokType != HDLmTokenTypes.end) {
            errorText = `Token (${tokIndx}) is not an end token`;
            return errorText;
          }
          /* Increment the token index value */
          tokIndx++;
          break;
        /* Handle integer pattern entries. The token will always contain
           an integer. We need to make sure then integer is in range. */
        case 'integer':
          patValue = pattern[patFirstKey];
          patMin = patValue.min;
          patMax = patValue.max;
          /* Make sure we can actually access the token */
          if (tokIndx >= tokLen) {
            errorText = `Token for pattern entry (${i}) is missing`;
            return errorText;
          }
          /* Get the current token and check it against the pattern. There
             are actually two checks here. First, we check if we have an
             integer token and then we check the integer token value. */
          token = tokenVec[tokIndx];
          if (token.tokType != HDLmTokenTypes.integer) {
            errorText = `Token (${tokIndx}) is not an integer`;
            return errorText;
          }
          /* Get the integer value of the token */
          let tokInt = parseInt(token.value);
          /* Check if the token value is too low or too high */
          if (tokInt < patMin) {
            errorText = `Token integer value (${tokInt}) is below the minimum (${patMin})`;
            return errorText;
          }
          if (tokInt > patMax) {
            errorText = `Token integer value (${tokInt}) is greater the maximum (${patMax})`;
            return errorText;
          }
          /* Increment the token index value */
          tokIndx++;
          break;
        /* Handle number pattern entries. A number is very different from 
           an integer. A number may contain a decimal point and digits to
           the right of the decimal point. */
        case 'number':
          patValue = pattern[patFirstKey];
          patMin = patValue.min;
          patMax = patValue.max;
          /* Make sure we can actually access the first token of the number */
          if (tokIndx >= tokLen) {
            errorText = `Token for pattern entry (${i}) is missing`;
            return errorText;
          }
          /* Get the current token and check it against the pattern. There
             are actually two checks here. First, we check if we have an
             number token and then we check the number token value. */
          token = tokenVec[tokIndx];
          if (token.tokType != HDLmTokenTypes.number) {
            errorText = `Token (${tokIndx}) is not a number`;
            return errorText;
          }
          /* We must build the number value in stages. The number value might
             actually be spread across three tokens. */
          tokNumber = token.value;
          tokIndx++;
          /* Check for a period token after the leading digits token */
          if (tokIndx < tokLen &&
            tokenVec[tokIndx].tokType == HDLmTokenTypes.operator &&
            tokenVec[tokIndx].value == '.') {
            tokNumber += '.';
            tokIndx++;
            /* Check for digits after the period */
            if (tokIndx < tokLen &&
              tokenVec[tokIndx].tokType == HDLmTokenTypes.number) {
              tokNumber += tokenVec[tokIndx].value;
              tokIndx++;
            }
          }
          /* Get the value of the token */
          tokNumber = Number(tokNumber);
          /* Check if the number value is too low or too high */
          if (tokNumber < patMin) {
            errorText = `Token number value (${tokNumber}) is below the minimum (${patMin})`;
            return errorText;
          }
          if (tokNumber > patMax) {
            errorText = `Token number value (${tokNumber}) is greater the maximum (${patMax})`;
            return errorText;
          }
          /* Increment the token index value */
          tokIndx++;
          break;
        /* Handle operator pattern entries. All we really do in this
           case is make sure the operator matches. */
        case 'operator':
          patOptional = false;
          patValue = pattern[patFirstKey];
          /* Check if the pattern is really an object. If this is true,
             extract the needed values from the objet. */
          if (typeof patValue == 'object') {
            patOptional = patValue.optional;
            patValue = patValue.value;
          }
          /* Check if the pattern value is optional. If the pattern 
             value is present (in the tokens), we skip it. */
          if (patOptional) {
            if (tokIndx < tokLen &&
              tokenVec[tokIndx].tokType == HDLmTokenTypes.operator &&
              tokenVec[tokIndx].value == patValue) {
              /* Increment the token index value */
              tokIndx++;
            }
            break;
          }
          /* Make sure we can actually access the token */
          if (tokIndx >= tokLen) {
            errorText = `Token for pattern entry (${i}) is missing`;
            return errorText;
          }
          /* Get the current token and check it against the pattern. There
             are actually two checks here. First, we check if we have an
             operator token and then we check the operator token value. */
          token = tokenVec[tokIndx];
          if (token.tokType != HDLmTokenTypes.operator) {
            errorText = `Token (${tokIndx}) is not an operator`;
            return errorText;
          }
          /* Check if the pattern value actually matches the token value */
          if (patValue != token.value) {
            errorText = `Token text value (${token.value}) does not match pattern value (${patValue})`;
            return errorText;
          }
          /* Increment the token index value */
          tokIndx++;
          break;
        /* Handle text pattern entries. All we really do in this
           case is make sure the text matches. */
        case 'text':
          patValue = pattern[patFirstKey];
          /* Make sure we can actually access the token */
          if (tokIndx >= tokLen) {
            errorText = `Token for pattern entry (${i}) is missing`;
            return errorText;
          }
          /* Get the current token and check it against the pattern. There
             are actually two checks here. First, we check if we have an
             identifier token and then we check the identifier token value. */
          token = tokenVec[tokIndx];
          if (token.tokType != HDLmTokenTypes.identifier) {
            errorText = `Token (${tokIndx}) is not an identifier`;
            return errorText;
          }
          /* Check if the pattern value actually matches the token value. Note 
             that the check is actually done against the token value converted 
             to lower case. */
          if (patValue != token.value.toLowerCase()) {
            errorText = `Token text value (${token.value}) does not match pattern value (${patValue})`;
            return errorText;
          }
          /* Increment the token index value */
          tokIndx++;
          break;
        default: {
          let errorString = patFirstKey;
          HDLmError.buildError('Error', 'Invalid pattern type', 12, errorString);
          errorText = 'Invalid pattern type (' + patFirstKey + ') passed to check pattern routine';
          return errorText;
        }
      }
    }
    return errorText;
  }
  /* The next routine takes an input URL string and checks if it
     is valid or not. A boolean value is returned to the caller
     showing if the URL string is valid or not. A URL string is
     considered to be valid if an URL object can be created from it. */
  static checkUrl(urlStr) {
    /* Check if the URL string passed by the caller is null */
    if (urlStr == null) {
      let errorText = "URL string passed to checkUrl is null";
      HDLmAssert(false, errorText);
    }
    /* Declare and define a few local variables */
    let rv = true;
    /* Try to create a new URL object from a URL string */
    try {
      let urlObj = new URL(urlStr);
    }
    catch (e) {
      rv = false;
    }
    return rv;
  }
  /* This routine compares two values. The values may or may not be
     objects or arrays. Many types of values are handled. In some 
     cases, this routine calls itself recursively to handled nested
     values. Note that string matching (comparison) is caseless. 
     In other words, 'WOW' will treated as equal to 'wow' or 'Wow'. */
  static compareValues(v1, v2, rv) {
    /* Declare and define a few values */
    let arrayComparison = false;
    let errorDetected = false;
    let v1TypeOf = typeof v1;
    let v2TypeOf = typeof v2;
    /* console.log(v1TypeOf); */
    /* console.log(v2TypeOf); */
    /* Make sure the types of the values match */
    if (v1TypeOf != v2TypeOf) {
      rv += '/typesMismatch';
      rv += ' ' + v1TypeOf;
      rv += ' ' + v2TypeOf;
      errorDetected = true;
      return [errorDetected, rv];
    }
    /* Handle each possible type */
    switch (v1TypeOf) {
      /* Check for an undefined value */
      case 'undefined': {
        rv += 'undefined';
        errorDetected = true;
        break;
      }
      /* Check for a boolean value */
      case 'boolean': {
        if (v1 != v2) {
          rv += '/boolean';
          rv += ' ' + String(v1);
          rv += ' ' + String(v2);
          errorDetected = true;
          break;
        }
        break;
      }
      /* Check for a numeric value */
      case 'number': {
        if (v1 != v2) {
          rv += '/number';
          rv += ' ' + String(v1);
          rv += ' ' + String(v2);
          errorDetected = true;
          break;
        }
        break;
      }
      /* Check for a big integer value */
      case 'bigint': {
        if (v1 != v2) {
          rv += '/bigint';
          rv += ' ' + String(v1);
          rv += ' ' + String(v2);
          errorDetected = true;
          break;
        }
        break;
      }
      /* Check for a string value */
      case 'string': {
        let v1Value = v1.toLowerCase();
        let v2Value = v2.toLowerCase();
        if (v1 != v2) {
          rv += '/string';
          rv += ' ' + String(v1);
          rv += ' ' + String(v2);
          errorDetected = true;
          break;
        }
        break;
      }
      /* Check for a symbol value */
      case 'symbol': {
        if (v1 != v2) {
          rv += '/symbol';
          rv += ' ' + String(v1);
          rv += ' ' + String(v2);
          errorDetected = true;
          break;
        }
        break;
      }
      /* Check for a function value */
      case 'function': {
        if (v1 != v2) {
          rv += '/function';
          rv += ' ' + String(v1);
          rv += ' ' + String(v2);
          errorDetected = true;
          break;
        }
        break;
      }
      /* Check for an object value */
      case 'object': {
        /* Both object values may actually be null values */
        if (v1 === null && v2 === null) {
          break;
        }
        /* The second value may not be a null value */
        if (v1 === null) {
          rv += '/notNullSecond';
          errorDetected = true;
          break;
        }
        /* The first value may not be a null value */
        if (v2 === null) {
          rv += '/notNullFirst';
          errorDetected = true;
          break;
        }
        /* Both object values may actually be date values */
        if ((v1 instanceof Date) && (v2 instanceof Date)) {
          /* Check if the dates are equal */
          if (v1 == v2)
            break;
          /* Report that the dates are not equal */
          rv += '/datesMismatch';
          rv += ' ' + String(v1);
          rv += ' ' + String(v2);
          errorDetected = true;
          break;
        }
        /* The second value may not be a date value */
        if (v1 instanceof Date) {
          rv += '/notDateSecond';
          errorDetected = true;
          break;
        }
        /* The first value may not be a null value */
        if (v2 instanceof Date) {
          rv += '/notDateFirst';
          errorDetected = true;
          break;
        }
        /* Both object values may actually be regular expression values */
        if ((v1 instanceof RegExp) && (v2 instanceof RegExp)) {
          /* Check if the regular expression values are equal */
          if (v1 == v2)
            break;
          /* Report that the regular expression values are not equal */
          rv += '/regexesMismatch';
          rv += ' ' + String(v1);
          rv += ' ' + String(v2);
          errorDetected = true;
          break;
        }
        /* The second value may not be a regular expression value */
        if (v1 instanceof RegExp) {
          rv += '/notRegExpSecond';
          errorDetected = true;
          break;
        }
        /* The first value may not be a regular expression value */
        if (v2 instanceof RegExp) {
          rv += '/noRegExpFirst';
          errorDetected = true;
          break;
        }
        /* Both object values may actually be arrays of values */
        let v1IsArray = Array.isArray(v1);
        let v2IsArray = Array.isArray(v2);
        if (v1IsArray && !v2IsArray) {
          rv += '/notArraySecond';
          errorDetected = true;
          break;
        }
        if (!v1IsArray && v2IsArray) {
          rv += '/notArrayFirst';
          errorDetected = true;
          break;
        }
        /* Compare the arrays */
        if (v1IsArray) {
          /* Set the array comparison flag to true. This flag is
             checked below. */
          arrayComparison = true;
          /* Get the lengths of each array and make sure that 
             they are equal */
          let v1Len = v1.length;
          let v2Len = v2.length;
          if (v1Len != v2Len) {
            rv += '/arrayLengthsMismatch';
            rv += ' ' + String(v1Len);
            rv += ' ' + String(v2Len);
            errorDetected = true;
            break;
          }
          /* Check if all of the array elememts match */
          for (let i = 0; i < v1Len; i++) {
            let oldRv = rv;
            let v1Entry = v1[i];
            let v2Entry = v2[i];
            rv += '/array' + '/' + String(i);
            [errorDetected, rv] = HDLmUtility.compareValues(v1Entry, v2Entry, rv);
            /* console.log(rv); */
            /* Check if we actually detected an error */
            if (!errorDetected)
              rv = oldRv;
            else
              break;
          }
          if (errorDetected)
            break;
        }
        /* This code handles all other cases, notably including JSON objects */
        if (arrayComparison == false) {
          let v1Keys = Object.keys(v1);
          let v2Keys = Object.keys(v2);
          let v1KeysLen = v1Keys.length;
          let v2KeysLen = v2Keys.length;
          /* This code was added (for a while) to allow key lengths to 
             slightly mismatch in one case */
          let lengthsOK = false;
          if (v1KeysLen == 13 && v2KeysLen == 14)
            lengthsOK = true;
          lengthsOK = false;
          if (v1KeysLen != v2KeysLen && (lengthsOK == false)) {
            rv += '/keysArrayLengthsMismatch';
            rv += ' ' + String(v1KeysLen);
            rv += ' ' + String(v2KeysLen);
            errorDetected = true;
            break;
          }
          /* Check if all of the object properties match */
          for (let i = 0; i < v1KeysLen; i++) {
            let oldRv = rv;
            let v1Key = v1Keys[i];
            let v1Property = v1[v1Key];
            /* Check if the second object has the key we are looking for */
            if (!v2.hasOwnProperty(v1Key)) {
              rv += '/keyMissing';
              rv += ' ' + v1Key;
              errorDetected = true;
              break;
            }
            /* Get the second property from the second object */
            let v2Property = v2[v1Key];
            rv += '/key' + '/' + v1Key;
            /* rv += '/key' + '/' + v1Key + '/' + String(i); */
            [errorDetected, rv] = HDLmUtility.compareValues(v1Property, v2Property, rv);
            /* console.log(rv); */
            /* Check if we actually detected an error */
            if (!errorDetected)
              rv = oldRv;
            else
              break;
          }
          if (errorDetected)
            break;
        }
        break;
      }
      /* Report an error if the comparison values types did not match */
      default: {
        let errorString = v1TypeOf;
        HDLmError.buildError('Error', 'Invalid type', 50, errorString);
        break;
      }
    }
    /* Provide a place for setting breakpoints if errors are detected */
    if (errorDetected) {
      errorDetected = errorDetected;
    }
    return [errorDetected, rv];
  }
  /* Build a (JSON) string from an error object. The error object may
     be an actual error object or just a string containing an error
     message. The code below handles both cases and returns a JSON
     string to the caller. */
  static errorToString(errorObj) {
    let newObj = {};
    if (typeof errorObj === 'string') {
      newObj.name = '';
      newObj.message = errorObj;
      newObj.reason = 'exception';
    }
    else {
      newObj.name = errorObj.name;
      newObj.message = errorObj.message;
      newObj.stack = errorObj.stack;
      newObj.reason = 'exception';
    }
    return JSON.stringify(newObj);
  }
  /* Return a unique ID string to the caller. The caller will use 
     this value as the id (note the use of lower case) in generated 
     HTLM elements. */
  static generateId() {
    HDLmUtilityId++;
    return "Unique" + HDLmUtilityId;
  }
  /* Get the content string from the current configuation */
  static getContentString() {
    /* console.log('In HDLmUtility.getContentString'); */
    /* Get some values used to build the content string */
    let companyPrefix = HDLmConfigInfo.getEntriesBridgeCompanyPrefix();
    let contentType = HDLmUtility.getContentType(HDLmGlobals.activeEditorType);
    /* In at least one important case, we need to change the editor
       type here. The GUI editor or the GXE editor needs to share 
       data with the main pass-through editor. This is accomplished
       by changing the editor type here. */
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem ||
        HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe) {
      let editorType = HDLmEditorTypes.pass;
      contentType = HDLmUtility.getContentType(editorType);
    }
    /* In at least one important case, we need to change the editor
       type here. The inline editors needs to share data with the main
       pass-through editor. This is accomplished by changing the 
       editor type here. */
    if (HDLmGlobals.checkForInlineEditor()) {
      let editorType = HDLmEditorTypes.pass;
      contentType = HDLmUtility.getContentType(editorType);
    }
    let contentSuffix = HDLmConfigInfo.getEntriesBridgeContentSuffix();
    let contentSuffixSystem = HDLmStateInfo.getSystemValue();
    /* console.log('Content suffix system: ' + contentSuffixSystem); */
    /* The suffix value is forced to the production value in 
       all cases. This is true even if we are running in test
       mode. */
    /* console.log('s3'); */
    contentSuffixSystem = HDLmStateInfo.getSystemValueProd();
    /* console.log('s4'); */
    /* console.log('Content suffix system: ' + contentSuffixSystem); */
    contentSuffix += contentSuffixSystem;
    /* Add the prefix to the value. If the prefix is an empty string,
       this step can be skipped. */
    let valueModified = contentType;
    if (companyPrefix != '')
      valueModified = valueModified + '_' + companyPrefix;
    /* Add the suffix to the value. If the suffix is an empty string,
       this step can be skipped. */
    if (contentSuffix != '')
      valueModified = valueModified + '_' + contentSuffix;
    /* Return the content string */
    return valueModified;
  }
  /* Get the current content type based on the current editor type */
  static getContentType(editorType) {
    return HDLmEditorTypes.toString(editorType);
  }
  /* The next routine tries to get the hostname from the current
     JavaScript environment. This code should work under Windows 
     and Linux and the various flavors of Unix. The hostname is 
     returned to the caller as a JavaScript string. Note that this
     routine may return a null value. 

     The hostname used below is the name of the web host, not the
     name of the current system. In other words, if Firefox or any
     other browser is running under Windows, then the hostname will
     be the name of the system the browser is connected to, not the
     name of the Windows system. */
  static getHostName() {
    /* Declare and define a few variables */
    let hostName = null;
    let localHostName = window.location.host;
    /* Check if we were able to obtain a hostname */
    if (typeof localHostName != 'string')
      return hostName;
    /* Since we were able to obtain a hostname, we can use it */
    return localHostName;
  }
  /* The next routine takes an input URL and gets the host name
     from it (if possible). The host name is returned to the 
     caller. This host name will be undefined if the input URL
     does not have a host name. The returned host name will not
     include the port number, if a port number was used. */
  static getHostNameFromUrl(urlStr) {
    /* Check if the URL string passed by the caller is null */
    if (urlStr == null) {
      let errorText = "URL string passed to getHostNameFromUrl is null";
      HDLmAssert(false, errorText);
    }
    /* Build a URL object from the input string */
    let urlObj = new URL(urlStr);
    /* console.log(urlObj); */
    let hostName = urlObj.host;
    return hostName;
  }
  /* This routine get the host name from a URL passed by the 
     caller. The host name is returned to the caller. The host
     name will be null, if the URL is not valid. */
  static getHostNameFromUrlWithCheck(urlValue) {
    /* Check if the URL value reference passed by the caller is null */
    if (urlValue == null) {
      let errorText = "URL value reference passed to getHostNameFromUrlWithCheck is null";
      HDLmAssert(false, errorText);
    }
    /* Check if the URL is valid or not. Just give up if the URL 
       string is not valid. */
    let urlValid = HDLmUtility.checkUrl(urlValue);
    if (!urlValid)
      return null;
    let hostName = HDLmUtility.getHostNameFromUrl(urlValue);
    return hostName;
  }
  /* The next routine takes a JavaScript object and converts it to
     a JSON string. The JSON string is returned to the caller. This
     conversion uses a built-in (and very helpful) JSON methid. */
  static getJsonFromObject(jsObj) {
    return JSON.stringify(jsObj);
  }
  /* The method below gets the next number from a list of 
     numbers. If the list is empty, this routine will return
     one. If the list has a gap, this routine will return the
     first number from the gap. For example, if the ilst has
     [1, 2, 4, 5], this routine will return 3. If the list has
     no gaps, then this routine will return a value that is one
     higher than the highest number in the list. For example, if
     the list has [1, 2, 3, 4], then this routine will return 5.
     Note that if the list is missing one, then the value of one
     will be returned. For example, if the list has [2, 3, 4],
     then this routine will return one. */
  static getNextInteger(integerList) {
    /* Make sure the argument passed by the caller is an array */
    if (Array.isArray(integerList) == false) {
      let errorText = 'Integer list value passed to getNextInteger method is not an array';
      HDLmAssert(false, errorText);
    }
    let integerListLen = integerList.length;
    /* Check if the existing integer list is empty. Just return
       one in this case. */
    if (integerListLen == 0)
      return 1;
    /* Check if the number one is in the list. If the number one
       is not in the list, return a one to the caller. */
    if (integerList.includes(1) == false)
      return 1;
    /* Check each entry in the list passed by the caller. We may
       find a gap in the list. */
    for (let i = 0; i < integerListLen; i++) {
      /* Get the current value and calculate the next 
         value. See if the next value is missing from the
         list. If the next value is missing, then we can
         return the next value to the caller. */
      let currentValue = integerList[i];
      let nextValue = currentValue + 1;
      if (integerList.includes(nextValue) == false)
        return nextValue;
    }
    return integerListLen + 1;
  }
  /* The next method takes an input URL and extracts the path value
     from it. The path value string is returned to the caller. The 
     path value string does not include the protocol, the host name,
     or the port number (if any). The path value string also excludes
     the URL fragment (if any) and the URL search value (if any).
     For example, the path value part of 
     https://www.oneworldobservatory.com/en-US/buy-tickets?q=123
     is 
     /en-US/buy-tickets */
  static getPathString(urlStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof urlStr != 'string') {
      let errorText = `URL value passed to getPathString is not a string`;
      HDLmAssert(false, errorText);
    }
    let indexOf;
    /* Remove the protocol (if any), the host name (if any), and 
       the port number (if any) from the URL string */
    urlStr = HDLmUtility.removeHost(urlStr);
    /* Remove the fragment (if any) from the URL string */
    indexOf = urlStr.lastIndexOf('#');
    if (indexOf >= 0)
      urlStr = urlStr.substr(0, indexOf);
    /* Remove the search value (if any) from the URL string */
    indexOf = urlStr.lastIndexOf('?');
    if (indexOf >= 0)
      urlStr = urlStr.substr(0, indexOf);
    return urlStr;
  }
  /* The method below get the perceptual hash value for an 
     image. At least for now, the image is specified by a 
     URL value. The caller provides the URL value and the 
     rountine below returns a promise that will eventually
     resolve to a 64-bit (in hexadecimal) perceptual hash
     value. */
  static getPerceptualHash(urlStr) {
    let hdlmPlusSign = HDLmDefines.getString('HDLMPLUSSIGN');
    let newStr = urlStr.replace(/\+/g, hdlmPlusSign);
    let URL = HDLmConfigInfo.getentriesBridgeInternetMethodSsl() + "://" +
      HDLmConfigInfo.getServerName() + "/" +
      HDLmConfigInfo.getPHashName();
    let userid = HDLmConfigInfo.getEntriesBridgeUserid();
    let password = HDLmConfigInfo.getEntriesBridgePassword();
    let requestAJAXAsyncTrue = true;
    let newPromise = HDLmAJAX.runAJAX('URL', requestAJAXAsyncTrue, URL, userid, password, 'post', newStr);
    return newPromise;
  }
  /* This routine returns a single character that will be used to 
     build keys for obtaining data. For javaproxyx.dnsalias.com,
     the character will be 'x' (without the quotes). For example, 
     if the actual hostname is javaproxyc.dnsalias.com, then a 'c'
     (a single character, without the quotes) will be returned to 
     the caller. 

     The hostname used below is the name of the web host, not the
     name of the current system. In other words, if Firefox or any
     other browser is running under Windows, then the hostname will
     be the name of the system the browser is connected to, not the
     name of the Windows system. */
  static getSystemCharacter() {
    /* Try to get the hostname associated with the current 
       JavaScript environment */
    let hostName = HDLmUtility.getHostName();
    /* Make sure the hostname is a valid JavaScript string */
    if (typeof (hostName) != 'string')
      return 'c';
    /* Get the actual system character from the hostname */
    if (hostName.startsWith("javaproxy") &&
      hostName.endsWith(".dnsalias.com"))
      return hostName.charAt(9);
    else
      return 'c';
  }
  /* Get a UUID and return it as a string to the caller */
  static getUuidStr() {
    /* console.log(self); */
    /* console.log(HDLmUtility.isElectron()); */
    /* console.log(crypto); */
    /* console.log(crypto.randomUUID); */ 
    /* console.log(HDLmUtility.isElectron()); */
    let uuidStr = crypto.randomUUID();
    return uuidStr;
  }
  /* The method below determines if a border style is valid or not.
     An error message will be returned if the border style is not 
     vaild. */
  static isBorderStyle(styleStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof styleStr != 'string') {
      let errorText = `Style value passed to isBorderStyle is not a string`;
      return errorText;
    } 
    let errorText = '';
    /* Get the border style string in lower case */
    let styleLower = styleStr.toLowerCase(); 
    /* Check if this a known border style */
    if (HDLmUtilityBorderStyleInfo.includes(styleLower))
      return errorText;
    /* Return an error message to the caller */
    errorText = `Border style string (${styleStr}) is invalid`;
    return errorText;
  } 
  /* The method below determines if an HTML color is valid or not.
     An HTML color can be defined in many ways. The code below should
     support all of them. This method returns an error string if an
     error is detected. This method returns an empty string if no 
     errors are detected. Note that the caller is responsible for
     removing any leading and trailing blanks. This routine will
     ensure that red and RED are both interpreted as red. Note that
     color functions such as rgb() can be in any case. This is also
     handled in this routine. */
  static isColor(colorStr, typeStr='all') {
    /* Make sure the argument passed by the caller is a string */
    if (typeof colorStr != 'string') {
      let errorText = `Color value passed to isColor is not a string`;
      return errorText;
    }
    let colorLen;
    let errorText = '';
    /* Remove any leading and/or trailing blanks from the color string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      colorStr = colorStr.trim();
    /* Check for an empty color string. This is always an error. */
    colorLen = colorStr.length;
    if (colorLen == 0) {
      errorText = 'Color string is empty';
      return errorText;
    }
    /* Check for a color string in hex format */
    if (colorStr.charAt(0) == '#') {
      /* Skip the leading pound sign */
      colorStr = colorStr.substr(1);
      colorLen = colorStr.length;
      if (colorLen != 3 && colorLen != 6) {
        let adjColorLen = colorLen + 1
        errorText = `Hexadecimal color string length (${adjColorLen}) is wrong`;
        return errorText;
      }
      /* Check if the string is valid hexadecimal */
      if (HDLmString.isHex(colorStr))
        return errorText;
      errorText = `Hexadecimal color string (${colorStr}) is invalid`;
      return errorText;
    }
    /* Build a token vector from the color string */
    let tokenVec = HDLmString.getTokensNonWhite(colorStr);
    let tokenLen = tokenVec.length;
    /* Check if the color string is just a simple color name, such 
       as 'red' (without the quotes). Note that the matching is 
       done on the lowercase version of the color name. That means
       that 'RED', 'Red', and 'red' are all considered to be valid. */
    if (tokenLen == 2) {
      let colorLower = colorStr.toLowerCase();
      if (HDLmUtilityColorInfo.hasOwnProperty(colorLower))
        return errorText;
    }
    /* We can now check if the color was specified using one of the 
       color functions, such as rgb, hwb, cmyk, etc. */
    let firstTok = tokenVec[0];
    let firstValue = firstTok.value;
    firstValue = firstValue.toLowerCase();
    if (!HDLmUtilityColorPatterns.hasOwnProperty(firstValue)) {
      errorText = `Color string type value (${firstValue}) is invalid`;
      return errorText;
    }
    /* Make sure that the color is allowed in this case */
    if (typeStr == 'rgb only' &&
        firstValue != 'rgb') {
      errorText = `Color string type value (${firstValue}) is not allowed`;
      return errorText;
    }
    /* We now know what type of color function we are using. We can
       now validate the color function pattern. */
    let colorPat = HDLmUtilityColorPatterns[firstValue];
    errorText = HDLmUtility.checkPattern(tokenVec, colorPat);
    if (errorText != '')
      errorText = `Color string value (${colorStr}) did not match pattern (${firstValue})`;
    return errorText;
  }
  /* The method below determines Electron JS is active or not.
     We have a number of tests for Electron JS. The code below
     uses all of them. */
  static isElectron() {
    /* Check for an Electron JS renderer process */
    if (typeof window !== 'undefined' &&
      typeof window.process === 'object' &&
      window.process.type === 'renderer') {
      return true;
    }
    /* Check for the main Electron JS process */
    if (typeof process !== 'undefined' &&
      typeof process.versions === 'object' &&
      !!process.versions.electron) {
      return true;
    }
    /* Detect the user agent when `nodeIntegration` option is set to true */
    if (typeof navigator === 'object' &&
      typeof navigator.userAgent === 'string' &&
      navigator.userAgent.indexOf('Electron') >= 0) {
      return true;
    }
    return false;
  }
  /* The method below determines if an HTML font string is valid or 
     not. This method returns an error string, if an error is detected. 
     This method returns an empty string, if no errors are detected. Note 
     that the caller is responsible for removing any leading and trailing 
     blanks. This routine tests an entire font string. A separate set 
     of routines ared used to check each part of font string. */
  static isFont(fontStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof fontStr != 'string') {
      let errorText = `Font value passed to isFont is not a string`;
      return errorText;
    }
    let errorText = '';
    let fontLen = 0;
    /* Remove any leading and/or trailing blanks from the font string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      fontStr = fontStr.trim();
    /* Check for an empty font string. This is always an error. */
    fontLen = fontStr.length;
    if (fontLen == 0) {
      errorText = 'Font string is empty';
      return errorText;
    }
    /* The font string is modified by changing all of 
       the minus signs into the Unicode character for a minus
       sign. This change causes 'sans-serif' (without the quotes)
       to be treated as one token. */
    let fontStrModified = fontStr.replaceAll('-', '\U2212');
    /* Build a token vector from the font string */
    let tokenVec = HDLmString.getTokens(fontStrModified);
    let tokenLen = tokenVec.length;
    /* Remove the trailing sentinel token */
    tokenLen--;
    /* Make sure we have at least one token */
    if (tokenLen == 0) {
      errorText = 'Font string has no tokens';
      return errorText;
    }
    let tokenIndex = 0;
    let loopCount = 0;
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      /* Increment the loop count */
      loopCount++;
      /* Check if we can get the font style token */
      if (tokenIndex >= tokenLen) {         
        errorText = 'No room for the font style';
        return errorText;
      }
      /* Get the current token */
      let curToken = tokenVec[tokenIndex];
      let curType = curToken.tokType;
      let curValue = curToken.value;
      /* Check if the value is a valid font style */
      errorText = HDLmUtility.isFontStyle(curValue);
      if (errorText != '')
        return errorText;
      /* Try to get the next token which might be one or more  
         spaces or something else (an error). Of course, we might 
         not get another token at this point. */
      tokenIndex++;
      /* Check if we can get the token that follows the font style */
      if (tokenIndex >= tokenLen) {
        errorText = 'No room for what follows the font style';
        return errorText;
      }
      curToken = tokenVec[tokenIndex];
      curType = curToken.tokType;
      curValue = curToken.value;
      /* At this point we may (or may not) have a space token.
         The space token is required at this point and not an 
         error. Just skip the space token. */
      if (curType != HDLmTokenTypes.space) {
        errorText = `Something invalid (${curValue}) follows the font style`;
        return errorText;
      }
      /* Check if we can get the font variant token */
      tokenIndex++;
      if (tokenIndex >= tokenLen) {
        errorText = 'No room for the font variant';
        return errorText;
      }
      /* Get the current token */
      curToken = tokenVec[tokenIndex];
      curType = curToken.tokType;
      curValue = curToken.value;
      /* Check if the value is a valid font variant */
      errorText = HDLmUtility.isFontVariant(curValue);
      if (errorText != '')
        return errorText;
      /* Try to get the next token which might be one or more  
         spaces or something else (an error). Of course, we might 
         not get another token at this point. */
      tokenIndex++;
      /* Check if we can get the token that follows the font variant */
      if (tokenIndex >= tokenLen) {
        errorText = 'No room for what follows the font variant';
        return errorText;
      }
      curToken = tokenVec[tokenIndex];
      curType = curToken.tokType;
      curValue = curToken.value;
      /* At this point we may (or may not) have a space token.
         The space token is required at this point and not an 
         error. Just skip the space token. */
      if (curType != HDLmTokenTypes.space) {
        errorText = `Something invalid (${curValue}) follows the font variant`;
        return errorText;
      }
      /* Check if we can get the font weight token */
      tokenIndex++;
      if (tokenIndex >= tokenLen) {
        errorText = 'No room for the font weight';
        return errorText;
      }
      /* Get the current token */
      curToken = tokenVec[tokenIndex];
      curType = curToken.tokType;
      curValue = curToken.value;
      /* Check if the value is a valid font weight */
      errorText = HDLmUtility.isFontWeight(curValue);
      if (errorText != '')
        return errorText;
      /* Try to get the next token which might be one or more  
         spaces or something else (an error). Of course, we might 
         not get another token at this point. */
      tokenIndex++;
      /* Check if we can get the token that follows the font weight */
      if (tokenIndex >= tokenLen) {
        errorText = 'No room for what follows the font weight';
        return errorText;
      }
      curToken = tokenVec[tokenIndex];
      curType = curToken.tokType;
      curValue = curToken.value;
      /* At this point we may (or may not) have a space token.
         The space token is required at this point and not an 
         error. Just skip the space token. */
      if (curType != HDLmTokenTypes.space) {
        errorText = `Something invalid (${curValue}) follows the font weight`;
        return errorText;
      }
      /* We might have a comma at this point. This is not
         an error. Just skip the comma. */
      if (curValue == ',') {
        tokenIndex++;
        if (tokenIndex >= tokenLen) {
          errorText = 'No room for what follows the comma in the font family string';
          return errorText;
        }
        curToken = tokenVec[tokenIndex];
        curType = curToken.tokType;
        curValue = curToken.value;
      }
      else {
        errorText = `Something invalid (${curValue}) follows a font family name`;
        return errorText;
      }
      /* At this point we may (or may not) have a space token.
         The space token is optional and not an error. Just
         skip the space token, if need be. */
      if (curType == HDLmTokenTypes.space)
        tokenIndex++;
    }
    return errorText;
  }  
  /* The method below determines if an HTML font family is valid or not.
     This method returns an error string, if an error is detected. This 
     method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks.
     This routine tests just one font family string. A separate routine is
     used to check a list of font families. */
  static isFontFamily(familyStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof familyStr != 'string') {
      let errorText = `Font family value passed to isFontFamily is not a string`;
      return errorText;
    }
    let errorText = '';
    let familyLen = 0;
    /* Remove any leading and/or trailing blanks from the family string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      familyStr = familyStr.trim();
    /* Check for an empty font family string. This is always an error. */
    familyLen = familyStr.length;
    if (familyLen == 0) {
      errorText = 'Font family string is empty';
      return errorText;
    }
    /* Check if this a known font family */
    if (HDLmUtilityFontFamilyInfo.includes(familyStr))
      return errorText;
    /* Return an error message to the caller */
    errorText = `Font family string (${familyStr}) is invalid`;
    return errorText;
  }
  /* The method below determines if an HTML font family string is valid 
     or not. This method returns an error string, if an error is detected. 
     This method returns an empty string, if no errors are detected. Note 
     that the caller is responsible for removing any leading and trailing 
     blanks. This routine tests an entire font family string. A separate 
     routine is used to check just one font family string. */
  static isFontFamilyStr(familyStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof familyStr != 'string') {
      let errorText = `Font family value passed to isFontFamilyStr is not a string`;
      return errorText;
    }
    let errorText = '';
    let familyLen = 0;
    /* Remove any leading and/or trailing blanks from the family string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      familyStr = familyStr.trim();
    /* Check for an empty font family string. This is always an error. */
    familyLen = familyStr.length;
    if (familyLen == 0) {
      errorText = 'Font family string is empty';
      return errorText;
    }
    /* The font family string is modified by changing all of 
       the minus signs into the Unicode character for a minus
       sign. This change causes 'sans-serif' (without the quotes)
       to be treated as one token. */
    let familyStrModified = familyStr.replaceAll('-', '\U2212');
    /* Build a token vector from the font family string */
    let tokenVec = HDLmString.getTokens(familyStrModified);
    let tokenLen = tokenVec.length;
    /* Remove the trailing sentinel token */
    tokenLen--;
    /* Make sure we have at least one token */
    if (tokenLen == 0) {
      errorText = 'Font family string has no tokens';
      return errorText;
    }
    let tokenIndex = 0;
    let familyCount = 0;
    /* What follows is a non-dummy loop used to allow break to work */
    while (true) {
      /* Increment the family count */
      familyCount++;
      /* The pattern is a font family name, followed by a comma, followed
         by some optional spaces. The font family name may be followed by
         nothing, marking the end of the font family string. */
      if (tokenIndex >= tokenLen) {
        if (familyCount == 1)
          errorText = 'No room for the font family name';
        else
          errorText = 'Family name missing where required'
        return errorText;
      }
      /* Get the current token */
      let curToken = tokenVec[tokenIndex];
      let curType = curToken.tokType;
      let curValue = curToken.value;
      /* Change the Unicode character for a minus sign back into
         a conventional minus sign */
      curValue = curValue.replaceAll('\U2212', '-');
      /* Check if the value is a valid font family */
      errorText = HDLmUtility.isFontFamily(curValue);
      if (errorText != '')
        return errorText;
      /* Try to get the next token which might be a comma or 
         something else (an error). Of course, we might not
         get another token at this point. */
      tokenIndex++;
      /* At this point we may be done with the font family string.
         The current font name may be the last token in the font
         family string. */
      if (tokenIndex == tokenLen)
        break;
      /* Get the next token */
      if (tokenIndex >= tokenLen) {
        errorText = 'No room for what follows the font family name';
        return errorText;
      }
      curToken = tokenVec[tokenIndex];
      curType = curToken.tokType;
      curValue = curToken.value;
      /* We might have a comma at this point. This is not
         an error. Just skip the comma. */
      if (curValue == ',') {
        tokenIndex++;
        if (tokenIndex >= tokenLen) {
          errorText = 'No room for what follows the comma in the font family string';
          return errorText;
        }
        curToken = tokenVec[tokenIndex];
        curType = curToken.tokType;
        curValue = curToken.value;
      }
      else {
        errorText = `Something invalid (${curValue}) follows a font family name`;
        return errorText;
      }
      /* At this point we may (or may not) have a space token.
         The space token is optional and not an error. Just
         skip the space token, if need be. */
      if (curType == HDLmTokenTypes.space)
        tokenIndex++;
    }
    return errorText;
  }  
  /* The method below determines if an HTML font kerning is valid or not.
     This method returns an error string, if an error is detected. This 
     method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks. */
  static isFontKerning(kerningStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof kerningStr != 'string') {
      let errorText = `Font kerning value passed to isFontKerning is not a string`;
      return errorText;
    }
    let errorText = '';
    let kerningLen = 0;
    /* Remove any leading and/or trailing blanks from the kerning string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      kerningStr = kerningStr.trim();
    /* Check for an empty font kerning string. This is always an error. */
    kerningLen = kerningStr.length;
    if (kerningLen == 0) {
      errorText = 'Font kerning string is empty';
      return errorText;
    }
    /* Check if this a known font kerning */
    if (HDLmUtilityFontKerningInfo.includes(kerningStr))
      return errorText;
    /* Return an error message to the caller */
    errorText = `Font kerning string (${kerningStr}) is invalid`;
    return errorText;
  }
  /* The method below determines if a font size is valid or not.
     A font size can be defined in many ways. The code below should
     support all of them. This method returns an error string if an
     error is detected. This method returns an empty string if no 
     error or errors are detected. Note that the caller is responsible
     for removing any leading and trailing blanks. */
  static isFontSize(fontSizeStr) {
    /* Make sure the argument is a string */
    if (typeof fontSizeStr != 'string') {
      let errorText = `Font size value passed to isFontSize is not a string`;
      return errorText;
    }
    let fontSizeLen;
    let errorText = '';
    /* Remove any leading and/or trailing blanks from the font size 
       string. This code is no longer in use. This code has been 
       changed. The caller must handle removing leading and trailing 
       blanks. */
    if (1 == 2)
      fontSizeStr = fontSizeStr.trim();
    /* Check for an empty fontSize string. This is always an error. */
    fontSizeLen = fontSizeStr.length;
    if (fontSizeLen == 0) {
      errorText = 'Font size input string is empty';
      return errorText;
    }
    /* The font size string is modified by changing all of 
       the minus signs into the Unicode character for a minus
       sign. This change causes 'x-small' (without the quotes)
       to be treated as one token. */
    let fontSizeModified = fontSizeStr.replaceAll('-', '\U2212');
    /* Build a token vector from the modified font size string */
    let tokenVec = HDLmString.getTokensNumber(fontSizeModified);
    let tokenLen = tokenVec.length;
    /* Remove the trailing sentinel token */
    tokenLen--;
    /* We have two very different cases to consider here.
       We might have a font size value of the type
       '80%' (without the quotes) or we might have something
       like 'x-small' (without the quotes). */
    if (tokenLen > 2) {
      /* Return an error message to the caller */
      errorText = `Font size string (${fontSizeStr}) is invalid`;
      return errorText;
    }
    /* Check the number of tokens. The number of tokens must
       be one or two. */
    if (tokenLen < 1 ||
        tokenLen > 2) {
      errorText = `Font size input string (${fontSizeStr}) has the wrong number (${tokenLen}) of tokens`;
      return errorText;
    }
    /* Check for length/percentage case */
    if (tokenLen == 2) {
      /* Get some information from the first token */
      let firstToken = tokenVec[0];
      let firstTokenValue = firstToken.value;
      let firstTokenType = firstToken.tokType;
      /* The first token must be an integer or a number */
      if (firstTokenType != HDLmTokenTypes.integer &&
          firstTokenType != HDLmTokenTypes.number) {
        /* Return an error message to the caller */
        errorText = `Font size string (${fontSizeStr}) does not start with an integer or a number`;
        return errorText;
      }
      /* Get the value of the first token */
      firstTokenValue = Number(firstTokenValue);
      /* Get and check the second token */
      let secondTokenValue = tokenVec[1].value;
      if (secondTokenValue != '%' &&
          secondTokenValue != 'em' &&
          secondTokenValue != 'px') {
        /* Return an error message to the caller */
        errorText = `Font size string (${fontSizeStr}) does not end with something valid`;
        return errorText;
      }
      /* Check if the second token shows that the value is a percentage. Just
         return if the value is not a percentage. */
      if (secondTokenValue == '%' &&
          (firstTokenValue < 0 ||
           firstTokenValue > 2000)) {
        errorText = `Percentage value (${firstValue}) is invalid`;
        return errorText;
      }
      return errorText;
    }  
    /* Check if this a known font size */
    if (HDLmUtilityFontSizeInfo.includes(fontSizeStr))
      return errorText;
    /* Return an error message to the caller */
    errorText = `Font size string (${fontSizeStr}) is invalid`;
    return errorText;
  }
  /* The method below determines if an HTML font stretch is valid or not.
     This method returns an error string, if an error is detected. This 
     method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks. */
  static isFontStretch(stretchStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof stretchStr != 'string') {
      let errorText = `Font stretch value passed to isFontStretch is not a string`;
      return errorText;
    }
    let errorText = '';
    let stretchLen = 0;
    /* Remove any leading and/or trailing blanks from the stretch string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      stretchStr = stretchStr.trim();
    /* Check for an empty font stretch string. This is always an error. */
    stretchLen = stretchStr.length;
    if (stretchLen == 0) {
      errorText = 'Font stretch string is empty';
      return errorText;
    }
    /* The font stretch string is modified by changing all of 
       the minus signs into the Unicode character for a minus
       sign. This change causes 'semi-expanded' (without the quotes)
       to be treated as one token. */
    let fontStretchModified = stretchStr.replaceAll('-', '\U2212');
    /* Build a token vector from the modified font stretch string */
    let tokenVec = HDLmString.getTokens(fontStretchModified);
    let tokenLen = tokenVec.length;
    /* Remove the trailing sentinel token */
    tokenLen--;
    /* Make sure we have at least one token */
    if (tokenLen == 0) {
      errorText = 'Font stretch string has no tokens';
      return errorText;
    }
    /* We have two very different cases to consider here.
       We might have a font stretch value of the type
       '50%' (without the quotes) or we might have something
       like 'semi-expanded' (without the quotes). */
    if (tokenLen > 2) {
      /* Return an error message to the caller */
      errorText = `Font stretch string (${stretchStr}) is invalid`;
      return errorText;
    }
    /* Check for integer/percentage case */
    if (tokenLen == 2) {
      if (tokenVec[0].tokType != HDLmTokenTypes.integer) {
        /* Return an error message to the caller */
        errorText = `Font stretch string (${stretchStr}) does not start with an integer`;
        return errorText;
      }
      if (tokenVec[1].tokType != HDLmTokenTypes.operator ||
          tokenVec[1].value != '%') {
        /* Return an error message to the caller */
        errorText = `Font stretch string (${stretchStr}) does not end with a percent sign`;
        return errorText;
      }
      return errorText;
    }
    /* Check if this a known font stretch */
    if (HDLmUtilityFontStretchInfo.includes(stretchStr))
      return errorText;
    /* Return an error message to the caller */
    errorText = `Font stretch string (${stretchStr}) is invalid`;
    return errorText;
  }
  /* The method below determines if an HTML font style is valid or not.
     This method returns an error string, if an error is detected. This 
     method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks. */
  static isFontStyle(styleStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof styleStr != 'string') {
      let errorText = `Font style value passed to isFontStyle is not a string`;
      return errorText;
    } 
    let errorText = '';
    let styleLen = 0;
    /* Remove any leading and/or trailing blanks from the style string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      styleStr = styleStr.trim();
    /* Check for an empty font style string. This is always an error. */
    styleLen = styleStr.length;
    if (styleLen == 0) {
      errorText = 'Font style string is empty';
      return errorText;
    } 
    /* Build a token vector from the font style string */
    let tokenVec = HDLmString.getTokens(styleStr);
    let tokenLen = tokenVec.length;
    /* Remove the trailing sentinel token */
    tokenLen--;
    /* Make sure we have at least one token */
    if (tokenLen == 0) {
      errorText = 'Font style string has no tokens';
      return errorText;
    }
    /* We have two very different cases to consider here.
       We might have a font style value of the type
       'oblique -23deg' (without the quotes) or we 
       might have something like 'italic' (without 
       the quotes). */
    if (tokenLen > 5) {
      /* Return an error message to the caller */
      errorText = `Font style string (${styleStr}) is invalid`;
      return errorText;
    }
    /* Check for the 'oblique 23deg' (without the quotes) case.
       Note that the angle might have a minus sign in front of
       it. */
    if (tokenLen == 4 || tokenLen == 5) {
      let minusFound = false;
      /* The first token must be the string 'oblique' (without the
         quotes) */
      if (tokenVec[0].value != 'oblique') {
        /* Return an error message to the caller */
        errorText = `Font style string (${styleStr}) does not start with 'oblique'`;
        return errorText;
      }
      if (tokenVec[1].tokType != HDLmTokenTypes.space) {
        /* Return an error message to the caller */
        errorText = `Font style string (${styleStr}) does not have space(s) where required`; 
        return errorText;
      }
      let curValue = '';
      let curNumber = 0;
      let tokenIndex = 2;
      /* We might have a minus sign here that is actually part
         of the font style angle */
      if (tokenVec[2].value == '-') {
        minusFound = true;
        tokenIndex++;
      }
      if (tokenVec[tokenIndex].tokType != HDLmTokenTypes.integer) {
        /* Return an error message to the caller */
        errorText = `Font style string (${styleStr}) does not have an integer where required`;
        return errorText;
      }
      /* Check the degreees value */
      curValue = tokenVec[tokenIndex].value;
      curNumber = Number(curValue);
      if (curNumber < 0 || curNumber > 90) {
        /* Return an error message to the caller */
        errorText = `Font style string (${styleStr}) angle is out of range`;
        return errorText;
      }
      /* Get the next (and last) token */
      tokenIndex++;
      if (tokenVec[tokenIndex].value != 'deg') {
        /* Return an error message to the caller */
        errorText = `Font style string (${styleStr}) does not have 'deg' where required`;
        return errorText;
      }
      return errorText;
    }
    /* Get the font style string in lower case */
    let styleLower = styleStr.toLowerCase();
    /* Check if this a known font style */
    if (HDLmUtilityFontStyleInfo.includes(styleLower))
      return errorText;
    /* Return an error message to the caller */
    errorText = `Font style string (${styleStr}) is invalid`;
    return errorText;
  }
  /* The method below determines if an HTML font variant is valid or not.
     This method returns an error string, if an error is detected. This 
     method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks.
     This routine tests just one font variant string. A separate routine is
     used to check a list of font families. */
  static isFontVariant(variantStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof variantStr != 'string') {
      let errorText = `Font variant value passed to isFontVariant is not a string`;
      return errorText;
    }
    let errorText = '';
    let variantLen = 0;
    /* Remove any leading and/or trailing blanks from the variant string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      variantStr = variantStr.trim();
    /* Check for an empty font variant string. This is always an error. */
    variantLen = variantStr.length;
    if (variantLen == 0) {
      errorText = 'Font variant string is empty';
      return errorText;
    }
    /* Check if this a known font variant */
    if (HDLmUtilityFontVariantInfo.includes(variantStr))
      return errorText;
    /* Return an error message to the caller */
    errorText = `Font variant string (${variantStr}) is invalid`;
    return errorText;
  }
  /* The method below determines if an HTML font weight is valid or not.
     This method returns an error string, if an error is detected. This 
     method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks.
     Note also that font weights can be a certain set of strings or a number
     in a specific rangee. */
  static isFontWeight(weightStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof weightStr != 'string') {
      let errorText = `Font weight value passed to isFontWeight is not a string`;
      return errorText;
    }
    let errorText = '';
    let weightLen = 0;
    /* Remove any leading and/or trailing blanks from the weight string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      weightStr = weightStr.trim();
    /* Check for an empty font weight string. This is always an error. */
    weightLen = weightStr.length;
    if (weightLen == 0) {
      errorText = 'Font weight string is empty';
      return errorText;
    }
    /* Check if the font weight is a number. Some font
       weight numbers are OK, some are not. */
    if (isNaN(weightStr) == false) {
      let weightNumber = Number(weightStr);
      /* Check if the font weight is an integer. Values
         that are not integers are not acceptable. */
      if (Number.isInteger(weightNumber) == false) {
        errorText = `Font weight value (${weightStr}) is not an integer`;
        return errorText;
      }
      /* Check if the font weight is in range or not */
      if (weightNumber < 1 || weightNumber > 1000) {
        errorText = `Font weight value (${weightStr}) is out of range`;
        return errorText;
      }
      return errorText;
    }
    /* Get the font weight string in lower case */
    let weightLower = weightStr.toLowerCase();
    /* Check if this a known font weight */
    if (HDLmUtilityFontWeightInfo.includes(weightLower))
      return errorText;
    /* Return an error message to the caller */
    errorText = `Font weight string (${weightStr}) is invalid`;
    return errorText;
  }
  /* The method below determines if an HTML height is valid or not.
     An HTML height can be defined in many ways. The code below should
     support all of them. This method returns an error string if an
     error is detected. Note that the caller is responsible for removing
     any leading and trailing blanks. This method returns an empty string
     if no errors are detected. Note that this routine actually supports
     widths as well as heights. The caller provides a type string that 
     shows if we are checking a height or a width. */
  static isHeight(subType, heightStr) {
    /* Make sure the first argument is a string */
    if (typeof subType != 'string') {
      let errorText = `Subtype value passed to isHeight is not a string`;
      return errorText;
    }
    /* Make sure the second argument is a string */
    if (typeof heightStr != 'string') {
      let errorText = `Height value passed to isHeight is not a string`;
      return errorText;
    }
    let heightLen;
    let errorText = '';
    /* Remove any leading and/or trailing blanks from the height 
       or width string. This code has been changed. This code has
       been changed.The caller must handle removing leading and 
       trailing blanks. */
    if (1 == 2)
      heightStr = heightStr.trim();
    /* Check for an empty height string. This is always an error. */
    heightLen = heightStr.length;
    if (heightLen == 0) {
      let subTypeCapitalized = HDLmString.ucFirst(subType);
      errorText = `${subTypeCapitalized} input string is empty`;
      return errorText;
    }
    /* Build a token vector from the height string */
    let tokenVec = HDLmString.getTokens(heightStr);
    let tokenLen = tokenVec.length;
    /* Remove the trailing sentinel token */
    tokenLen--;
    /* Check the number of tokens. The number of tokens must
       be one or two. */
    if (tokenLen < 1 ||
      tokenLen > 2) {
      let subTypeCapitalized = HDLmString.ucFirst(subType);
      errorText = `${subTypeCapitalized} input string (${heightStr}) has the wrong number (${tokenLen}) of tokens`;
      return errorText;
    }
    /* Get some information from the first token */
    let firstTok = tokenVec[0];
    let firstValue = firstTok.value;
    let firstType = firstTok.tokType;
    /* Check for the special value 'auto'. This value is
       always allowed. */
    if (tokenLen == 1 &&
      firstType == HDLmTokenTypes.identifier &&
      firstValue == 'auto')
      return errorText;
    /* The first token must be a number at this point */
    if (firstType != HDLmTokenTypes.integer) {
      errorText = `First token of ${subType} input string (${heightStr}) is not a number`;
      return errorText;
    }
    firstValue = Number(firstValue);
    /* Check if we have a second token */
    if (tokenLen == 1)
      return errorText;
    /* The second token can only be a certain set of values */
    let secondTok = tokenVec[1];
    let secondValue = secondTok.value.toLowerCase();
    let secondType = secondTok.tokType;
    if (secondValue != 'em' &&
      secondValue != 'px' &&
      secondValue != '%') {
      errorText = `Second token of ${subType} input string (${heightStr}) is invalid`;
      return errorText;
    }
    /* Check if the second token shows that the value is a percentage. Just
       return if the value is not a percentage. */
    if (secondValue != '%')
      return errorText;
    if (firstValue < 0 || firstValue > 2000) {
      errorText = `Percentage value (${firstValue}) is invalid`;
      return errorText;
    }
    return errorText;
  }
  /* Check if the caller passed a valid image URL value or not. A valid
     image URL is something than can be used as to obtain a URL from the
     Internet. Note that the code below also supports data URLs. Data URLs
     are inline and do not use the Internet. */
  static isImageUrl(urlStr) {
    /* Make sure the argument is a string */
    if (typeof urlStr != 'string') {
      let errorText = `URL value passed to isImageUrl is not a string`;
      return errorText;
    }
    /* Remove any leading and/or trailing blanks from the image URL string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      urlStr = urlStr.trim();
    let errorText = '';
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check if the image URL string is empty */
      if (urlStr.length == 0) {
        errorText = 'Image URL string is empty';
        break;
      }
      /* Try to remove the 'http:' or 'https:' prefix from the 
         image URL */
      if (urlStr.startsWith('https:'))
        urlStr = urlStr.substring(6);
      else if (urlStr.startsWith('http:'))
        urlStr = urlStr.substring(5);
      /* For now we allow all other values */
      if (urlStr.startsWith('//'))
        break;
      /* For now we allow all other values */
      if (urlStr.startsWith('data:'))
        break;
      errorText = 'Start of image URL is invalid';
      break;
    }
    return errorText;
  }
  /* Check if the value passed by the caller is iterable or not. 
     If not just return false to the caller. */
  static isIterable(inputValue) {
    /* Assume we don't have an iterable */
    let rv = false
    /* Check if the input value is something that can not
       possibly be an iterable */
    let typeOfInput = typeof (inputValue);
    if (typeOfInput == 'null' ||
        typeOfInput == 'undefined' ||
        typeOfInput == 'number' ||
        typeOfInput == 'boolean')
      return rv;
    /* Check if the passed value has a function for iterating */
    if (typeof (inputValue[Symbol.iterator]) != 'function')
      return rv;
    rv = true;
    return rv;
  }
  /* The method below determines if an input string represents a 
     valid JSON object or not. Note that this routine treats null
     as not being a valid JSON object. A object (including {}) is 
     not considered to be valid input. NaN is not considered to be
     valid input. A number is not considered to be valid input. A
     number in quotes is not considered to be valid input. An 
     empty string is not considered to be valid input. A non-empty
     string (that is not a valid JSON object) is not considered to 
     be valid input. For example, '{}' (without the quotes) is a 
     valid JSON object. By contrast, 'abc' (without the quotes) is 
     not a valid JSON object. Boolean values (false and true) are
     not valid JSON objects. */
  static isJsonObject(inputStr) {
    /* Assume we don't have a valid JSON object */
    let rv = false;
    /* Check for a null value. For historical reasons null is considered
       by JavaScript to be an object. However, we don't consider null to 
       be a valid JSON object. */
    if (inputStr === null)
      return rv;
    /* Try to create a valid JSON object */
    try {
      let jsonObj = JSON.parse(inputStr);
      if (typeof jsonObj == 'object')
        return true;
    }
    catch (e) { } 
    return rv;
  }
  /* The method below determines if an HTML line height is valid or not.
     This method returns an error string, if an error is detected. This 
     method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks. */
  static isLineHeight(heightStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof heightStr != 'string') {
      let errorText = `Line height value passed to isLineHeight is not a string`;
      return errorText;
    }
    let errorText = '';
    let heightLen = 0;
    /* Remove any leading and/or trailing blanks from the height string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      heightStr = heightStr.trim();
    /* Check for an empty line height string. This is always an error. */
    heightLen = heightStr.length;
    if (heightLen == 0) {
      errorText = 'Line height string is empty';
      return errorText;
    }
    /* The line height string is modified by changing all of 
       the minus signs into the Unicode character for a minus
       sign. This change causes 'semi-expanded' (without the quotes)
       to be treated as one token. */
    let lineHeightModified = heightStr.replaceAll('-', '\U2212');
    /* Build a token vector from the modified line height string */
    let tokenVec = HDLmString.getTokensNumber(lineHeightModified);
    let tokenLen = tokenVec.length;
    /* Remove the trailing sentinel token */
    tokenLen--;
    /* Make sure we have at least one token */
    if (tokenLen == 0) {
      errorText = 'Line height string has no tokens';
      return errorText;
    }
    /* We have two very different cases to consider here.
       We might have a line height value of the type
       '50%' (without the quotes) or we might have something
       like 'semi-expanded' (without the quotes). */
    if (tokenLen > 2) {
      /* Return an error message to the caller */
      errorText = `Line height string (${heightStr}) is invalid`;
      return errorText;
    }
    /* Check the number of tokens. The number of tokens must
       be one or two. */
    if (tokenLen < 1 ||
        tokenLen > 2) {
      errorText = `Line height input string (${heightStr}) has the wrong number (${tokenLen}) of tokens`;
      return errorText;
    }
    /* Check for length/percentage case */
    if (tokenLen == 2) {
      /* The first token must be an integer */
      if (tokenVec[0].tokType != HDLmTokenTypes.integer) {
        /* Return an error message to the caller */
        errorText = `Line height string (${heightStr}) does not start with an integer`;
        return errorText;
      }
      let secondTokenValue = tokenVec[1].value;
      if (secondTokenValue != '%'  &&
          secondTokenValue != 'em' &&
          secondTokenValue != 'px') {
        /* Return an error message to the caller */
        errorText = `Line height string (${heightStr}) does not end with something valid`;
        return errorText;
      }
      return errorText;
    }
    /* The line height might just be a number, such as 2 or
       2.5 */
    let firstTokenType = tokenVec[0].tokType;
    if (tokenLen == 1 && 
        (firstTokenType == HDLmTokenTypes.integer ||
         firstTokenType == HDLmTokenTypes.number)) { 
      return errorText;
    }
    /* Check if this a known line height */
    if (HDLmUtilityLineHeightInfo.includes(heightStr))
      return errorText;
    /* Return an error message to the caller */
    errorText = `Line height string (${heightStr}) is invalid`;
    return errorText;
  }
  /* The method below determines if an order string is valid or not.
     An order string must be comprised of a set of numbers possibly 
     separated by commas and/or whitespace. The commas are optional. 
     Note that the numbers need not be in ascending order. Indeed, 
     the purpose of an order string is to handle changes in order. 
     The list of numbers may (or may not) start with zero (no negative
     values are allowed) and may (or may not) include every ascending 
     integer up to the length of the list minus 1. In other words, 
     '3 0 2 1', is valid. So is '3,0,2,1'. So are '3,2,1' and '1,2,3'.
     So are '3 0', '3,0', '0 3', and '0,3'. Note that a number can
     not be used more than once. That means that '3,0,0,1' is not 
     valid. Nor is '3,2,2,0'. Gaps in the sequence are allowed.  
     That means that '1,3' or '3,1' are both valid. */
  static isOrder(orderStr) {
    /* Make sure the argument is a string */
    if (typeof orderStr != 'string') {
      let errorText = `Order value (${orderStr})passed to isOrder is not a string`;
      return errorText;
    }
    let curToken;
    let errorText = '';
    let errValue;
    let intCount;
    let intList = [];
    let intVal;
    let orderLen;
    /* Remove any leading and/or trailing blanks from the order string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      orderStr = orderStr.trim();
    /* Check for an empty order string. This is always an error. */
    orderLen = orderStr.length;
    if (orderLen == 0) {
      errorText = 'Order string is empty';
      return errorText;
    }
    /* Build a token vector from the order string */
    let tokenVec = HDLmString.getTokensNonWhite(orderStr);
    let tokenLen = tokenVec.length;
    if (tokenLen == 0 ||
        tokenLen == 1) {
      errorText = 'Order string is empty';
      return errorText;
    }
    /* The first entry in the token vector must be a number. Make
       sure that this is true. */
    curToken = tokenVec[0];
    if (curToken.tokType != HDLmTokenTypes.integer &&
        curToken.tokType != HDLmTokenTypes.number) {
      errorText = 'Order string does not start with a number';
      return errorText;
    }    
    /* The next-to-last entry in the token vector must be a number. Make
       sure that this is true. */
    curToken = tokenVec[tokenLen-2];
    if (curToken.tokType != HDLmTokenTypes.integer &&
        curToken.tokType != HDLmTokenTypes.number) {
      errorText = 'Order string does not end with a number';
      return errorText;
    }  
    /* Check each entry in the token vector. Each entry must either 
       be a number or a comma separating two numbers. */
    let ix = 0;
    while (true) {
      /* Get the current token and check if it is the trailing
         sentinel token. We are done with this loop if we have
         reached the sentinel token. */
      curToken = tokenVec[ix];
      if (curToken.tokType == HDLmTokenTypes.end)
        break;
      /* At this point we must have an integer token. Report 
         an error if we don't have an integer token. */
      if (curToken.tokType != HDLmTokenTypes.integer) {
        errValue = curToken.value;
        errorText = `Order value has an invalid token (${errValue}) in it`;
        break;
      }
      /* Use the integer token as an integer */
      intVal = parseInt(curToken.value);
      /* Make sure the integer value is not negative */
      if (intVal < 0) {
        errValue = curToken.value;
        errorText = `Order value has a negative number (${errValue}) in it`;
        break;
      }
      intList.push(intVal);
      /* Skip to the next token after the integer token. Check if it
         is the trailing sentinel token. We are done with this loop 
         if we have reached the sentinel token. */
      ix++;
      curToken = tokenVec[ix];
      if (curToken.tokType == HDLmTokenTypes.end)
        break;
      /* If the next token is a comma, then we must skip it. Otherwise, 
         the next token should be a number. Note that we do not allow a
         trailing comma token. This is an error that must be reported. */
      if (curToken.value == ',') {
        ix++;
        curToken = tokenVec[ix];
        if (curToken.tokType == HDLmTokenTypes.end) {
          errorText = 'Order value has an invalid trailing comma';
          break;
        }
        continue;
      }
    }
    /* Check if the prior code found an error. Return to the caller
       if the prior loop found an error. */
    if (errorText != '')
      return errorText;
    /* We can now check the contents of the integer array. Each entry
       must be unique. */ 
    let intListLength = intList.length;
    /* Make sure that we found at least one integer */
    if (intListLength <= 0) {
      errorText = 'Order value does not have any integers in it';
      return errorText;
    }
    /* Check each entry in the integer list array */
    for (let i = 0; i < intListLength; i++) {
      /* Check for a duplicate list entry. This is an error that 
         must be reported. */
      intVal = intList[i];
      intCount = 0;
      intList.forEach((listEntry) => {
        if (listEntry == intVal)
          if (intCount == 0)
            intCount = 1;
          else
            intCount += 1;
        });
      if (intCount > 1) {
        errorText = `Order value has a duplicate entry (${intVal})`;
        break;
      }
    }
    return errorText;
  }  
  /* Check if the caller passed a valid target value or not. A valid
     target is something than can be used as an XPath query or CSS
     selector. */
  static isTarget(targetStr) {
    /* Make sure the argument is a string */
    if (typeof targetStr != 'string') {
      let errorText = `Target value passed to isTarget is not a string`;
      return errorText;
    }
    /* Remove any leading and/or trailing blanks from the target string.
       This code is no longer in use. This code has been changed. The
       caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      targetStr = targetStr.trim();
    let errorText = '';
    /* The dummy loop below is used to allow break to work */
    while (true) {
      /* Check if the target string is empty */
      if (targetStr.length == 0) {
        errorText = 'Target string is empty';
        break;
      }
      /* Get the first character of the target string. Check if the 
         first character shows that we have a ID value or a CSS
         selector. */
      let firstChar = targetStr.charAt(0);
      if (firstChar == '#' ||
          firstChar == '.')
        break;
      /* Check for a period in the target string. The target string
         may start with a tag name followed by a CSS selector. */
      if (targetStr.indexOf('.') > 0)
        break;
      /* It turns out that XPath queries can take almost any form.
         That means that almost any non-blank string is OK. */
      break;
    }
    return errorText;
  }
  /* The method below determines if an HTML text or title string is valid 
     or not. This method returns an error string, if an error is detected. 
     This method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks. */
  static isText(subType, textStr) {
    /* Make sure the first argument is a string */
    if (typeof subType != 'string') {
      let errorText = `Subtype value passed to isText is not a string`;
      return errorText;
    }
    /* Make sure the argument passed by the caller is a string */
    if (typeof textStr != 'string') {
      let errorText = `Text or title value passed to isText is not a string`;
      return errorText;
    }
    let errorText = '';
    let textLen = 0;
    /* Remove any leading and/or trailing blanks from the text or title
       string. This code is no longer in use. This code has been changed. 
       The caller must handle removing leading and trailing blanks. */
    if (1 == 2)
      textStr = textStr.trim();
    /* Check for an empty text or title string. This used to be always an error. */
    textLen = textStr.length;
    return errorText;
  }
  /* The method below determines if an HTML text checked object is valid 
     or not. This method returns an error string, if an error is detected. 
     This method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks. */
  static isTextChecked(textObj) {
    /* Make sure the argument passed by the caller is an object */
    if (typeof textObj != 'object') {
      let errorText = `Text checked value passed to isTextChecked is not an object`;
      return errorText;
    }
    /* Make sure the argument passed by the caller is an array */
    if (Array.isArray(textObj) != true) {
      let errorText = `Text checked value passed to isTextChecked is not an array`;
      return errorText;
    }
    /* Make sure the argument passed by the caller has a length of two */
    if (textObj.length != 2) {
      let errorLength = textObj.length;
      let errorText = `Text checked value passed to isTextChecked has a wrong length (${errorLength})`;
      return errorText;
    }
    /* Get the first and second strings */
    let firstValue = textObj[0];
    let secondValue = textObj[1];
    /* Make sure the first value is a string */
    if (typeof firstValue != 'string') {
      let errorText = `First array entry in Text checked value passed to isTextChecked is not a string`;
      return errorText;
    }
    /* Make sure the second value is a string */
    if (typeof secondValue != 'string') {
      let errorText = `Second array entry in Text checked value passed to isTextChecked is not a string`;
      return errorText;
    }
    /* Provide a default return value */
    let errorText = '';
    return errorText;
  }
  /* Check if the caller passed a valid domain name or not. Return true
     if the domain name appears to be valid. Return false, if the domain
     name appears to be invalid. */
  static isValidDomain(domainStr) {
    /* Make sure the argument is a string */
    if (typeof domainStr != 'string') {
      let errorText = `Domain value passed to isValidDomain is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Just return false if the domain name string is undefined or not set */
    if (!domainStr)
      return false;
    let re = /^(?!:\/\/)([a-zA-Z0-9-]+\.){0,5}[a-zA-Z0-9-][a-zA-Z0-9-]+\.[a-zA-Z]{2,64}?$/gi;
    return re.test(domainStr);
  }
  /* The method below determines if an HTML visit string is valid or not. 
     This method returns an error string, if an error is detected. This 
     method returns an empty string, if no errors are detected. Note that
     the caller is responsible for removing any leading and trailing blanks. 
     The visit string is traced as part of visit execution. */
  static isVisit(visitStr) {
    /* Make sure the argument passed by the caller is a string */
    if (typeof visitStr != 'string') {
      let errorText = `Visit value passed to isVisit is not a string`;
      return errorText;
    }
    let errorText = '';
    return errorText;
  }
  /* Merge two objects into a third (new) object. The
     output object is always a new object. The first
     input object is just copied into the output object.
     The second input object is also copied into the output
     object. However, a check is made first to make sure 
     that the current key from the second object is not
     already present in the output object. */
  static mergeObjects(firstObject, secondObject) {
    let rvObject = {};
    /* Use all of the keys of the first object to build the
       output object */
    for (let currentKey in firstObject) {
      let objectValue = firstObject[currentKey];
      rvObject[currentKey] = objectValue;
    }
    /* Use all of the keys of the second object to build the
       output object. However, first check to see if the key
       is already present in the output object. */
    for (let currentKey in secondObject) {
      /* Check if the key value already exists in the output object */
      if (currentKey in rvObject)
        continue;
      let objectValue = secondObject[currentKey];
      rvObject[currentKey] = objectValue;
    }
    return rvObject;
  }
  /* This is the overall project initialization routine. It will run before
     most of the other code. Note that this will not be the first set of code
     to run. For example, the tree (not the Fancytree) data is obtained from 
     a server and the tree is constructed before this code runs. */
  static overallInitialize() {
    let newTitle;
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.auth)
      newTitle = 'Headlamp Login Editor';
    if (HDLmGlobals.activeEditorType == HDLmEditorTypes.config)
      newTitle = 'Headlamp Configurations Editor';
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gem)
      newTitle = 'Headlamp GUI Editor';
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.gxe)
      newTitle = 'Headlamp GUI Extended Editor';
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.ignore)
      newTitle = 'Headlamp Ignore-Lists Editor';
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.mod)
      newTitle = 'Headlamp Modifications Editor';
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.pass)
      newTitle = 'Headlamp Pass-Through Editor';
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.popup)
      newTitle = 'Headlamp Popup Editor';
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.proxy)
      newTitle = 'Headlamp Proxy Definitions Editor';
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.simple)
      newTitle = 'Headlamp Simple Editor';
    else if (HDLmGlobals.activeEditorType == HDLmEditorTypes.store)
      newTitle = 'Headlamp Stored Values Editor';
    window.document.title = newTitle;
    HDLmUtility.setHeader(newTitle);
  }
  /* The next routine takes an input URL and removes the protocol
     and the host name from it (if they are present). The returned
     value is the path string followed by the search string followed
     by the fragment string. Note that the host name (which is removed)
     includes the port number, if any. */
  static removeHost(urlStr) {
    /* console.log('in HDLmUtility.removeHost'); */
    /* console.log(urlStr); */
    /* console.trace(); */
    /* Make sure the argument is a string */
    if (typeof urlStr != 'string') {
      let errorText = `URL value passed to removeHost is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Check if the passed URL string has a colon in it. If it does
       not have a colon or the colon is in the wrong place, then we
       can just return the input string to the caller. */
    let indexOfColon = urlStr.indexOf(':');
    if (indexOfColon < 0 ||
        indexOfColon > 6)
      return urlStr;
    /* Build a URL object from the input string */
    let urlObj = new URL(urlStr);
    /* Look for two forward slashes in the URL */
    let doubleSlashPosition = urlStr.search('//');
    if (doubleSlashPosition < 0) {
      let errorText = `URL value passed to removeHost does not have two forward slashes`;
      HDLmAssert(false, errorText);
    }
    let modifiedUrlStr = urlStr.substr(doubleSlashPosition + 2);
    /* console.log('In HDLmUtility.removeHost'); */
    /* console.log('(' + modifiedUrlStr + ')'); */
    /* Look for one forward slash in the URL. This will not always work.
       In some cases, we just have a domain name at this point, not 
       followed by a slash character. */
    let oneSlashPosition = modifiedUrlStr.search('/');
    let pathStr;
    if (oneSlashPosition < 0) {
      /* let errorText = `URL value passed to removeHost does not have one forward slash`; */
      /* HDLmAssert(false, errorText); */
      pathStr = '';
    }
    else 
      pathStr = modifiedUrlStr.substr(oneSlashPosition);
    /* Get the part of the URL after the protocol, host name,
       and port number */
    let rv = urlStr.substr(urlObj.origin.length);
    /* console.log('(' + rv + ')'); */
    /* console.log('(' + pathStr + ')'); */
    return pathStr;
  }
  /* Remove a 'http:' or 'https:' prefix from a URL, if need be. If
     the URL starts with 'http:' or 'https:' the scheme is removed
     and the remaining URL is returned to the caller. If the URL does
     not start with 'http:' or 'https:', then the URL is not modified.
     Note that schemes such as 'file:' are ignored by this code. Note 
     that images that start with "date:* are ignored by this code. */
  static removeHttpPrefix(urlStr) {
    /* Make sure the argument is a string */
    if (typeof urlStr != 'string') {
      let errorText = `URL value passed to removeHttpPrefix is not a string`;
      HDLmAssert(false, errorText);
    }
    if (urlStr.startsWith('http:'))
      return urlStr.substring(5);
    else if (urlStr.startsWith('https:'))
      return urlStr.substring(6);
    else
      return urlStr;
  }   
  /* Remove zero or more wrappers and/or prefixes from a URL. The result
     will always be an URL without anything wrapped around it or prefixed
     to it. For example, 'url("https://x/y")' will be returned as '//x/y'.
     Note that schemes such as 'file:' are ignored by this code, at 
     least for now. */
  static removeUrlPrefixes(urlStr) {
    /* Make sure the argument is a string */
    if (typeof urlStr != 'string') {
      let errorText = `URL value passed to removeUrlPrefixes is not a string`;
      HDLmAssert(false, errorText);
    }
    let urlStrLen = urlStr.length;
    /* Remove the 'url()' wrapper that may be present */
    if (urlStr.startsWith('url(')) {
      urlStr = urlStr.substring(4, urlStrLen - 1);
      urlStrLen = urlStr.length;
    }
    /* Remove the double quotes that may be present */
    if (urlStr.startsWith('"')) {
      urlStr = urlStr.substring(1, urlStrLen - 1);
      urlStrLen = urlStr.length;
    }
    /* Remove the single quotes that may be present */
    if (urlStr.startsWith("'")) {
      urlStr = urlStr.substring(1, urlStrLen - 1);
      urlStrLen = urlStr.length;
    }
    /* Remove the 'https:' prefix that may be present */
    if (urlStr.startsWith('https:')) {
      urlStr = urlStr.substring(6);
      urlStrLen = urlStr.length;
    }
    /* Remove the 'http:' prefix that may be present */
    if (urlStr.startsWith('http:')) {
      urlStr = urlStr.substring(5);
      urlStrLen = urlStr.length;
    }
    return urlStr;
  } 
  /* The method below sets the error text field in the footer. The error
     text value passed by the caller may, or may not, be empty. The error 
     text field can be cleared by having the caller pass an empty string
     to this routine. */
  static setErrorText(errorStr) {
    /* Make sure the argument is a string */
    if (typeof errorStr != 'string') {
      let errorText = `Error value passed to setErrorText is not a string`;
      HDLmAssert(false, errorText);
    }
    let footerIdValue = HDLmDefines.getString('HDLMHTMLFOOTER');
    $(footerIdValue).text(errorStr);
    /* console.log(errorStr); */
    /* console.log(footerIdValue); */
    /* console.trace(); */
  }
  /* The method below sets the header to a value passed by the caller. 
     The value passed by the caller, may or may not be empty. The
     header can always be cleared by having the caller pass an empty
     string to this routine. */
  static setHeader(headerStr) {
    /* Make sure the argument is a string */
    if (typeof headerStr != 'string') {
      let errorText = `Header value passed to setHeader is not a string`;
      HDLmAssert(false, errorText);
    }
    let headerIdValue = HDLmDefines.getString('HDLMHTMLHEADER');
    $(headerIdValue).text(headerStr);
  }
  /* The next method sets a field in an object if either the
     field does not exist at all, of the field exists but is 
     a zero-length string. This method has no return value, 
     at least for now. */
  static setIfNotSet(curObj, curName, newValue) {
    /* Make sure the first argument is an object */
    if (typeof curObj != 'object') {
      let errorText = `Current object value passed to setIfNotSet is not an object`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the second argument is a string */
    if (typeof curName != 'string') {
      let errorText = `Current name value passed to setIfNotSet is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Make sure the third argument is a string or an object */
    let newValueType = typeof newValue;
    if (newValueType != 'string'  &&
        newValueType != 'boolean' &&
        newValueType != 'number'  &&
        newValueType != 'object') {
      let errorText = `New value type (${newValueType}) passed to setIfNotSet is invalid`;
      HDLmAssert(false, errorText);
    }   
    if (newValueType == null) {
      let errorText = `New value passed to setIfNotSet is null`;
      HDLmAssert(false, errorText);
    }  
    /* Use the new value, if possible */
    if (curObj.hasOwnProperty(curName) == false ||
      curObj[curName] == null ||
      curObj[curName] == '')
      curObj[curName] = newValue;
  }
  /* The method below set the current mode to either 'prod' or 'test'.
     The current mode is used to determine if the code is running in
     a production or test environment. The caller must pass a boolean 
     value showing what we want. */
  static setProdMode(modeValue) {
    /* console.log('In HDLmUtility.setProdMode'); */
    /* console.log(modeValue); */
    /* console.log(typeof(modeValue)); */
    /* Make sure the argument is a boolean */
    if (typeof(modeValue) != 'boolean') {
      let errorText = `Mode value (${modeValue}) passed to setProdMode is not a boolean`;
      HDLmAssert(false, errorText);
    }
    /* Build the state information, if need be */
    HDLmState.buildStateIfNeedBe();
    /* Check the value passed by the caller */
    if (modeValue == true) {
      HDLmConfig.setValue('currentEnvironment', HDLmConfigInfo.getCurrentEnvironmentProd());
      HDLmConfig.setValue('serverName', HDLmConfigInfo.getServerNameProd());
      HDLmStateInfo.setEntriesSystemValue(HDLmStateInfo.getSystemValueProd());
    }
    /* We must be in test mode */ 
    else {
      HDLmConfig.setValue('currentEnvironment', HDLmConfigInfo.getCurrentEnvironmentTest());
      HDLmConfig.setValue('serverName', HDLmConfigInfo.getServerNameTest());
      HDLmStateInfo.setEntriesSystemValue(HDLmStateInfo.getSystemValueTest());
    }
  } 
  /* This method tries to update a JSON string with a new value. The caller
     passes the old JSON string and the update values. This routine converts
     the JSON string to an object and then updates the object. The object is
     then converted back to a JSON string. */
  static updateJsonStr(jsonStr, keyStr, valueStr) {
    /* console.log('In HDLmUtility.updateJsonStr'); */
    /* console.log(jsonStr, keyStr, valueStr); */
    /* Check the JSON string passed the caller */
    if (jsonStr == null)
      jsonStr = '{}';
    /* Convert the JSON string back to an object so we can add the key
       and the value for the key */
    let jsonObj = JSON.parse(jsonStr);
    jsonObj[keyStr] = valueStr;
    /* console.log(jsonObj); */
    jsonStr = JSON.stringify(jsonObj);
    /* console.log(jsonStr, keyStr, valueStr); */
    return jsonStr;
  }
  /* The method below is passed a promise and a node path.
     The node path uniquely identifies a node that should
     be updated with the perceptual hash information. The
     promise will provide the perceptual hash information 
     when it is resolved. */
  static usePerceptualPromise(newPromise, nodePath) {
    newPromise.then(function (response) {
      /* Search for the current node in the node tree */
      let currentTreeNode = HDLmTree.locateTreeNode(nodePath);
      /* Report an error if the node could not be found */
      if (currentTreeNode == null) {
        let nodeString = nodePath.toString();
        HDLmError.buildError('Error', 'Locate', 9, nodeString);
        return;
      }
      /* Make sure the current node can be updated properly. 
         If the current node can be updated properly, then
         save the perceptual hash value. */
      if (currentTreeNode.hasOwnProperty('details') &&
          currentTreeNode.details.hasOwnProperty('nodeiden') &&
          currentTreeNode.details.nodeiden.hasOwnProperty('attributes')) {
        let responseJson = JSON.parse(response);
        let perceptualHashStr = responseJson.phash;
        currentTreeNode.details.nodeiden.attributes["phash"] = perceptualHashStr;
        /* At this point we can and should send the updated tree node 
           back to the server that owns and updates the database */
        let updatePromise; 
        let newTreeEntryBoolean = false;
        updatePromise = HDLmTree.passUpdateOneTreePos(currentTreeNode, newTreeEntryBoolean);
        updatePromise.then(function (response) {
          if (1 == 2) {
            /* console.log(response); */
          }
        },
        function (error) {
          /* console.log(error); */
        });
      }
    },
    function (error) {
      HDLmError.buildError('Error', 'Perceptual failure', 14, error);
    });
  }
}