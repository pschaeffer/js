/**
 * HDLmHtml short summary.
 *
 * HDLmHtml description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The array below describes all of the known DOM node attributes. This array
   was obtained from the W3Schools web site. Some of the attributes were obtained
   from the MDN HTML attribute reference. */
const HDLmHtmlDOMAttributes = [
  'accept',
  'accept-charset',
  'accesskey',
  'action',
  'align',
  'alt',
  'async',
  'autocapitalize',
  'autocomplete',
  'autofocus',
  'autoplay',
  'background',
  'bgcolor',
  'border',
  'capture',
  'challenge',
  'charset',
  'checked',
  'cite',
  'class',
  'code',
  'codebase',
  'color',
  'cols',
  'colspan',
  'content',
  'contenteditable',
  'contextmenu',
  'controls',
  'coords',
  'crossorigin',
  'csp',
  'data',
  'datetime',
  'decoding',
  'default',
  'defer',
  'dir',
  'dirname',
  'disabled',
  'download',
  'draggable',
  'enctype',
  'enterkeyhint',
  'for',
  'form',
  'formaction',
  'formenctype',
  'formmethod',
  'formnovalidate',
  'formtarget',
  'headers',
  'height',
  'hidden',
  'high',
  'href',
  'hreflang',
  'http-equiv',
  'icon',
  'id',
  'importance',
  'integrity',
  'intrinsicsize',
  'inputmode',
  'ismap',
  'itemprop',
  'keytype',
  'kind',
  'label',
  'language',
  /* These entries are out-of-order. They were out-of-order in the original
     document. */
  'loading',
  'list',
  'loop',
  'low',
  'manifest',
  'max',
  'maxlength',
  /* These entries are out-of-order. They were out-of-order in the original
     document. */
  'minlength',
  'media',
  'method',
  'min',
  'multiple',
  'muted',
  'name',
  'novalidate',
  'onabort',
  'onafterprint',
  'onbeforeprint',
  'onbeforeunload',
  'onblur',
  'oncanplay',
  'oncanplaythrough',
  'onchange',
  'onclick',
  'oncontextmenu',
  'oncopy',
  'oncuechange',
  'oncut',
  'ondblclick',
  'ondrag',
  'ondragend',
  'ondragenter',
  'ondragleave',
  'ondragover',
  'ondragstart',
  'ondrop',
  'ondurationchange',
  'onemptied',
  'onended',
  'onerror',
  'onfocus',
  'onhashchange',
  'oninput',
  'oninvalid ',
  'onkeydown',
  'onkeypress',
  'onkeyup',
  'onload',
  'onloadeddata',
  'onloadedmetadata',
  'onloadstart',
  'onmousedown',
  'onmousemove',
  'onmouseout',
  'onmouseover',
  'onmouseup',
  'onmousewheel',
  'onoffline',
  'ononline',
  'onpagehide',
  'onpageshow',
  'onpaste',
  'onpause',
  'onplay',
  'onplaying',
  'onpopstate',
  'onprogress',
  'onratechange',
  'onreset',
  'onresize',
  'onscroll',
  'onsearch',
  'onseeked ',
  'onseeking',
  'onselect',
  'onstalled',
  'onstorage',
  'onsubmit',
  'onsuspend',
  'ontimeupdate',
  'ontoggle',
  'onunload',
  'onvolumechange ',
  'onwaiting',
  'onwheel',
  'open',
  'optimum',
  'pattern',
  'ping',
  'placeholder',
  'poster',
  'preload',
  'readonly',
  'referrerpolicy',
  'rel',
  'required',
  'reversed',
  'rows',
  'rowspan',
  'sandbox',
  'scope',
  'scoped',
  'selected',
  'shape',
  'size',
  'sizes',
  'slot',
  'span',
  'spellcheck',
  'src',
  'srcdoc',
  'srclang',
  'srcset',
  'start',
  'step',
  'style',
  'summary',
  'tabindex',
  'target',
  'title',
  'translate',
  'type',
  'usemap',
  'value',
  'width',
  'wrap'
];
/* The array below describes all of the known URI schemes. This array was obtained
   from 'Uniform Resource Identifier (URI) Schemes'. The key is scheme name. The first
   value is the Template. The second value is the Description. The third value is the
   Status. The fourth value is the Reference. */
const HDLmHtmlURISchemes = {
  'aaa': ['', 'Diameter Protocol', 'Permanent', '[RFC6733]'],
  'aaas': ['', 'Diameter Protocol with Secure Transport', 'Permanent', '[RFC6733]'],
  'about': ['', 'about', 'Permanent', '[RFC6694]'],
  'acap': ['', 'application configuration access protocol', 'Permanent', '[RFC2244]'],
  'acct': ['', 'acct', 'Permanent', '[RFC7565]'],
  'acd': ['prov/acd', 'acd', 'Provisional', '[Michael_Hedenus]'],
  'acr': ['prov/acr', 'TIDY_TAG_ACRONYM', 'Provisional', '[OMA-OMNA]'],
  'adiumxtra': ['prov/adiumxtra', 'adiumxtra', 'Provisional', '[Dave_Thaler]'],
  'afp': ['prov/afp', 'afp', 'Provisional', '[Dave_Thaler]'],
  'afs': ['', 'Andrew File System global file names', 'Provisional', '[RFC1738]'],
  'aim': ['prov/aim', 'aim', 'Provisional', '[Dave_Thaler]'],
  'amss': ['prov/amss', 'amss', 'Provisional', '[RadioDNS_Project]'],
  'android': ['prov/android', 'android', 'Provisional', '[Adam_Barth][https://developer.android.com/guide/topics/manifest/manifest-intro]'],
  'appdata': ['prov/appdata', 'appdata', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'apt': ['prov/apt', 'apt', 'Provisional', '[Dave_Thaler]'],
  'attachment': ['prov/attachment', 'attachment', 'Provisional', '[Dave_Thaler]'],
  'aw': ['prov/aw', 'aw', 'Provisional', '[Dave_Thaler]'],
  'barion': ['prov/barion', 'barion', 'Provisional', '[Bíró_Tamás]'],
  'beshare': ['prov/beshare', 'beshare', 'Provisional', '[Dave_Thaler]'],
  'bitcoin': ['prov/bitcoin', 'bitcoin', 'Provisional', '[Dave_Thaler]'],
  'bitcoincash': ['prov/bitcoincash', 'bitcoincash', 'Provisional', '[Corentin_Mercier]'],
  'blob': ['prov/blob', 'blob', 'Provisional', '[W3C_WebApps_Working_Group][Chris_Rebert]'],
  'bolo': ['prov/bolo', 'bolo', 'Provisional', '[Dave_Thaler]'],
  'browserext': ['prov/browserext', 'browserext', 'Provisional', '[Mike_Pietraszak]'],
  'calculator': ['prov/calculator', 'calculator', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'callto': ['prov/callto', 'callto', 'Provisional', '[Alexey_Melnikov]'],
  'cap': ['', 'Calendar Access Protocol', 'Permanent', '[RFC4324]'],
  'cast': ['prov/cast', 'cast', 'Provisional', '[Adam_Barth][https://developers.google.com/cast/docs/registration]'],
  'casts': ['prov/casts', 'casts', 'Provisional', '[Adam_Barth][https://developers.google.com/cast/docs/registration]'],
  'chrome': ['prov/chrome', 'chrome', 'Provisional', '[Dave_Thaler]'],
  'chrome-extension': ['prov/chrome-extension', 'chrome-extension', 'Provisional', '[Dave_Thaler]'],
  'cid': ['', 'content identifier', 'Permanent', '[RFC2392]'],
  'coap': ['', 'coap', 'Permanent', '[RFC7252]'],
  'coap+tcp': ['', 'coap+tcp [1]', 'Permanent', '[RFC8323]'],
  'coap+ws': ['', 'coap+ws [1]', 'Permanent', '[RFC8323]'],
  'coaps': ['', 'coaps', 'Permanent', '[RFC7252]'],
  'coaps+tcp': ['', 'coaps+tcp [1]', 'Permanent', '[RFC8323]'],
  'coaps+ws': ['', 'coaps+ws [1]', 'Permanent', '[RFC8323]'],
  'com-eventbrite-attendee': ['prov/com-eventbrite-attendee', 'com-eventbrite-attendee', 'Provisional', '[Bob_Van_Zant]'],
  'content': ['prov/content', 'content', 'Provisional', '[Dave_Thaler]'],
  'conti': ['prov/conti', 'conti', 'Provisional', '[Michael_Hedenus]'],
  'crid': ['', 'TV-Anytime Content Reference Identifier', 'Permanent', '[RFC4078]'],
  'cvs': ['prov/cvs', 'cvs', 'Provisional', '[Dave_Thaler]'],
  'dab': ['prov/dab', 'dab', 'Provisional', '[RadioDNS_Project]'],
  'data': ['', 'data', 'Permanent', '[RFC2397]'],
  'dav': ['', 'dav', 'Permanent', '[RFC4918]'],
  'diaspora': ['prov/diaspora', 'diaspora', 'Provisional', '[Dennis_Schubert]'],
  'dict': ['', 'dictionary service protocol', 'Permanent', '[RFC2229]'],
  'did': ['prov/did', 'did', 'Provisional', '[W3C_Credentials_Community_Group][Manu_Sporny]'],
  'dis': ['prov/dis', 'dis', 'Provisional', '[Christophe_Meessen]'],
  'dlna-playcontainer': ['prov/dlna-playcontainer', 'dlna-playcontainer', 'Provisional', '[DLNA]'],
  'dlna-playsingle': ['prov/dlna-playsingle', 'dlna-playsingle', 'Provisional', '[DLNA]'],
  'dns': ['', 'Domain Name System', 'Permanent', '[RFC4501]'],
  'dntp': ['prov/dntp', 'dntp', 'Provisional', '[Hans-Dieter_A._Hiep]'],
  'dpp': ['prov/dpp', 'dpp', 'Provisional', '[Gaurav_Jain][Wi-Fi_Alliance]'],
  'drm': ['prov/drm', 'drm', 'Provisional', '[RadioDNS_Project]'],
  'drop': ['prov/drop', 'drop', 'Provisional', '[Tim_McSweeney]'],
  'dtn': ['', 'DTNRG research and development', 'Provisional', '[RFC5050]'],
  'dvb': ['', 'dvb', 'Provisional', '[draft-mcroberts-uri-dvb]'],
  'ed2k': ['prov/ed2k', 'ed2k', 'Provisional', '[Dave_Thaler]'],
  'elsi': ['prov/elsi', 'elsi', 'Provisional', '[Kimmo_Lindholm]'],
  'example': ['', 'example', 'Permanent', '[RFC7595]'],
  'facetime': ['prov/facetime', 'facetime', 'Provisional', '[Dave_Thaler]'],
  'fax': ['', 'fax', 'Historical', '[RFC2806][RFC3966]'],
  'feed': ['prov/feed', 'feed', 'Provisional', '[Dave_Thaler]'],
  'feedready': ['prov/feedready', 'feedready', 'Provisional', '[Mirko_Nosenzo]'],
  'file': ['', 'Host-specific file names', 'Permanent', '[RFC8089]'],
  'filesystem': ['historic/filesystem', 'filesystem', 'Historical', '[W3C_WebApps_Working_Group][Chris_Rebert]'],
  'finger': ['prov/finger', 'finger', 'Provisional', '[Dave_Thaler]'],
  'first-run-pen-experience': ['prov/first-run-pen-experience', 'first-run-pen-experience', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'fish': ['prov/fish', 'fish', 'Provisional', '[Dave_Thaler]'],
  'fm': ['prov/fm', 'fm', 'Provisional', '[RadioDNS_Project]'],
  'ftp': ['', 'File Transfer Protocol', 'Permanent', '[RFC1738]'],
  'fuchsia-pkg': ['prov/fuchsia-pkg', 'fuchsia-pkg', 'Provisional', '[Adam_Barth][https://fuchsia.googlesource.com/fuchsia/]'],
  'geo': ['', 'Geographic Locations', 'Permanent', '[RFC5870]'],
  'gg': ['prov/gg', 'gg', 'Provisional', '[Dave_Thaler]'],
  'git': ['prov/git', 'git', 'Provisional', '[Dave_Thaler]'],
  'gizmoproject': ['prov/gizmoproject', 'gizmoproject', 'Provisional', '[Dave_Thaler]'],
  'go': ['', 'go', 'Permanent', '[RFC3368]'],
  'gopher': ['', 'The Gopher Protocol', 'Permanent', '[RFC4266]'],
  'graph': ['prov/graph', 'graph', 'Provisional', '[Alastair_Green]'],
  'gtalk': ['prov/gtalk', 'gtalk', 'Provisional', '[Dave_Thaler]'],
  'h323': ['', 'H.323', 'Permanent', '[RFC3508]'],
  'ham': ['', 'ham', 'Provisional', '[RFC7046]'],
  'hcap': ['prov/hcap', 'hcap', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'hcp': ['prov/hcp', 'hcp', 'Provisional', '[Alexey_Melnikov]'],
  'http': ['', 'Hypertext Transfer Protocol', 'Permanent', '[RFC7230, Section 2.7.1]'],
  'https': ['', 'Hypertext Transfer Protocol Secure', 'Permanent', '[RFC7230, Section 2.7.2]'],
  'hxxp': ['prov/hxxp', 'hxxp', 'Provisional', '[draft-salgado-hxxp]'],
  'hxxps': ['prov/hxxps', 'hxxps', 'Provisional', '[draft-salgado-hxxp]'],
  'hydrazone': ['', 'hydrazone', 'Provisional', '[Matthias_Merkel][https://tech.hydrazone.pro/uri/specification/hydrazone.txt]'],
  'iax': ['', 'Inter-Asterisk eXchange Version 2', 'Permanent', '[RFC5456]'],
  'icap': ['', 'Internet Content Adaptation Protocol', 'Permanent', '[RFC3507]'],
  'icon': ['', 'icon', 'Provisional', '[draft-lafayette-icon-uri-scheme]'],
  'im': ['', 'Instant Messaging', 'Permanent', '[RFC3860]'],
  'imap': ['', 'internet message access protocol', 'Permanent', '[RFC5092]'],
  'info': ['', 'Information Assets with Identifiers in Public Namespaces. [RFC4452] (section 3) defines an \'info\' registry of public namespaces, which is maintained by NISO and can be accessed from [http://info-uri.info/]', 'Permanent', '[RFC4452]'],
  'iotdisco': ['prov/iotdisco', 'iotdisco', 'Provisional', '[Peter_Waher][http://www.iana.org/assignments/uri-schemes/prov/iotdisco.pdf]'],
  'ipn': ['', 'ipn', 'Provisional', '[RFC6260]'],
  'ipp': ['', 'Internet Printing Protocol', 'Permanent', '[RFC3510]'],
  'ipps': ['', 'Internet Printing Protocol over HTTPS', 'Permanent', '[RFC7472]'],
  'irc': ['prov/irc', 'irc', 'Provisional', '[Dave_Thaler]'],
  'irc6': ['prov/irc6', 'irc6', 'Provisional', '[Dave_Thaler]'],
  'ircs': ['prov/ircs', 'ircs', 'Provisional', '[Dave_Thaler]'],
  'iris': ['', 'Internet Registry Information Service', 'Permanent', '[RFC3981]'],
  'iris.beep': ['', 'iris.beep', 'Permanent', '[RFC3983]'],
  'iris.lwz': ['', 'iris.lwz', 'Permanent', '[RFC4993]'],
  'iris.xpc': ['', 'iris.xpc', 'Permanent', '[RFC4992]'],
  'iris.xpcs': ['', 'iris.xpcs', 'Permanent', '[RFC4992]'],
  'isostore': ['prov/isostore', 'isostore', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'itms': ['prov/itms', 'itms', 'Provisional', '[Dave_Thaler]'],
  'jabber': ['perm/jabber', 'jabber', 'Permanent', '[Peter_Saint-Andre]'],
  'jar': ['prov/jar', 'jar', 'Provisional', '[Dave_Thaler]'],
  'jms': ['', 'Java Message Service', 'Provisional', '[RFC6167]'],
  'keyparc': ['prov/keyparc', 'keyparc', 'Provisional', '[Dave_Thaler]'],
  'lastfm': ['prov/lastfm', 'lastfm', 'Provisional', '[Dave_Thaler]'],
  'ldap': ['', 'Lightweight Directory Access Protocol', 'Permanent', '[RFC4516]'],
  'ldaps': ['prov/ldaps', 'ldaps', 'Provisional', '[Dave_Thaler]'],
  'leaptofrogans': ['', 'leaptofrogans', 'Permanent', '[RFC-op3ft-leaptofrogans-uri-scheme-07]'],
  'lorawan': ['prov/lorawan', 'lorawan', 'Provisional', '[OMA-DMSE]'],
  'lvlt': ['prov/lvlt', 'lvlt', 'Provisional', '[Alexander_Shishenko]'],
  'magnet': ['prov/magnet', 'magnet', 'Provisional', '[Dave_Thaler]'],
  'mailserver': ['', 'Access to data available from mail servers', 'Historical', '[RFC6196]'],
  'mailto': ['', 'Electronic mail address', 'Permanent', '[RFC6068]'],
  'maps': ['prov/maps', 'maps', 'Provisional', '[Dave_Thaler]'],
  'market': ['prov/market', 'market', 'Provisional', '[Dave_Thaler]'],
  'message': ['prov/message', 'message', 'Provisional', '[Dave_Thaler]'],
  'microsoft.windows.camera': ['prov/microsoft.windows.camera', 'microsoft.windows.camera', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'microsoft.windows.camera.multipicker': ['prov/microsoft.windows.camera.multipicker', 'microsoft.windows.camera.multipicker', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'microsoft.windows.camera.picker': ['prov/microsoft.windows.camera.picker', 'microsoft.windows.camera.picker', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'mid': ['', 'message identifier', 'Permanent', '[RFC2392]'],
  'mms': ['prov/mms', 'mms', 'Provisional', '[Alexey_Melnikov]'],
  'modem': ['', 'modem', 'Historical', '[RFC2806][RFC3966]'],
  'mongodb': ['prov/mongodb', 'mongodb', 'Provisional', '[Ignacio_Losiggio][Mongo_DB_Inc]'],
  'moz': ['prov/moz', 'moz', 'Provisional', '[Joe_Hildebrand]'],
  'ms-access': ['prov/ms-access', 'ms-access', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-browser-extension': ['prov/ms-browser-extension', 'ms-browser-extension', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-calculator': ['prov/ms-calculator', 'ms-calculator', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-drive-to': ['prov/ms-drive-to', 'ms-drive-to', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-enrollment': ['prov/ms-enrollment', 'ms-enrollment', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-excel': ['prov/ms-excel', 'ms-excel', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-eyecontrolspeech': ['prov/ms-eyecontrolspeech', 'ms-eyecontrolspeech', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-gamebarservices': ['prov/ms-gamebarservices', 'ms-gamebarservices', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-gamingoverlay': ['prov/ms-gamingoverlay', 'ms-gamingoverlay', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-getoffice': ['	prov/ms-getoffice', 'ms-getoffice', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-help': ['prov/ms-help', 'ms-help', 'Provisional', '[Alexey_Melnikov]'],
  'ms-infopath': ['prov/ms-infopath', 'ms-infopath', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-inputapp': ['prov/ms-inputapp', 'ms-inputapp', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-lockscreencomponent-config': ['prov/ms-lockscreencomponent-config', 'ms-lockscreencomponent-config', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-media-stream-id': ['prov/ms-media-stream-id', 'ms-media-stream-id', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-mixedrealitycapture': ['prov/ms-mixedrealitycapture', 'ms-mixedrealitycapture', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-mobileplans': ['prov/ms-mobileplans', 'ms-mobileplans', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-officeapp': ['prov/ms-officeapp', 'ms-officeapp', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-people': ['	prov/ms-people', 'ms-people', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-project': ['prov/ms-project', 'ms-project', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-powerpoint': ['prov/ms-powerpoint', 'ms-powerpoint', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-publisher': ['prov/ms-publisher', 'ms-publisher', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-restoretabcompanion': ['prov/ms-restoretabcompanion', 'ms-restoretabcompanion', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-screenclip': ['prov/ms-screenclip', 'ms-screenclip', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-screensketch': ['prov/ms-screensketch', 'ms-screensketch', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-search': ['prov/ms-search', 'ms-search', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-search-repair': ['prov/ms-search-repair', 'ms-search-repair', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-secondary-screen-controller': ['prov/ms-secondary-screen-controller', 'ms-secondary-screen-controller', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-secondary-screen-setup': ['prov/ms-secondary-screen-setup', 'ms-secondary-screen-setup', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings': ['prov/ms-settings', 'ms-settings', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-airplanemode': ['prov/ms-settings-airplanemode', 'ms-settings-airplanemode', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-bluetooth': ['prov/ms-settings-bluetooth', 'ms-settings-bluetooth', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-camera': ['	prov/ms-settings-camera', 'ms-settings-camera', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-cellular': ['prov/ms-settings-cellular', 'ms-settings-cellular', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-cloudstorage': ['	prov/ms-settings-cloudstorage', 'ms-settings-cloudstorage', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-connectabledevices': ['prov/ms-settings-connectabledevices', 'ms-settings-connectabledevices', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-displays-topology': ['prov/ms-settings-displays-topology', 'ms-settings-displays-topology', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-emailandaccounts': ['prov/ms-settings-emailandaccounts', 'ms-settings-emailandaccounts', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-language': ['	prov/ms-settings-language', 'ms-settings-language', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-location': ['prov/ms-settings-location', 'ms-settings-location', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-lock': ['prov/ms-settings-lock', 'ms-settings-lock', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-nfctransactions': ['prov/ms-settings-nfctransactions', 'ms-settings-nfctransactions', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-notifications': ['prov/ms-settings-notifications', 'ms-settings-notifications', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-power': ['prov/ms-settings-power', 'ms-settings-power', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-privacy': ['prov/ms-settings-privacy', 'ms-settings-privacy', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-proximity': ['prov/ms-settings-proximity', 'ms-settings-proximity', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-screenrotation': ['prov/ms-settings-screenrotation', 'ms-settings-screenrotation', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-wifi': ['prov/ms-settings-wifi', 'ms-settings-wifi', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-settings-workplace': ['prov/ms-settings-workplace', 'ms-settings-workplace', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-spd': ['prov/ms-spd', 'ms-spd', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-sttoverlay': ['prov/ms-sttoverlay', 'ms-sttoverlay', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-transit-to': ['prov/ms-transit-to', 'ms-transit-to', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-useractivityset': ['prov/ms-useractivityset', 'ms-useractivityset', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-virtualtouchpad': ['prov/ms-virtualtouchpad', 'ms-virtualtouchpad', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-visio': ['prov/ms-visio', 'ms-visio', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-walk-to': ['prov/ms-walk-to', 'ms-walk-to', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-whiteboard': ['prov/ms-whiteboard', 'ms-whiteboard', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-whiteboard-cmd': ['prov/ms-whiteboard-cmd', 'ms-whiteboard-cmd', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'ms-word': ['prov/ms-word', 'ms-word', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'msnim': ['prov/msnim', 'msnim', 'Provisional', '[Alexey_Melnikov]'],
  'msrp': ['', 'Message Session Relay Protocol', 'Permanent', '[RFC4975]'],
  'msrps': ['', 'Message Session Relay Protocol Secure', 'Permanent', '[RFC4975]'],
  'mss': ['prov/mss', 'mss', 'Provisional', '[Jarmo_Miettinen]'],
  'mtqp': ['', 'Message Tracking Query Protocol', 'Permanent', '[RFC3887]'],
  'mumble': ['prov/mumble', 'mumble', 'Provisional', '[Dave_Thaler]'],
  'mupdate': ['', 'Mailbox Update (MUPDATE) Protocol', 'Permanent', '[RFC3656]'],
  'mvn': ['prov/mvn', 'mvn', 'Provisional', '[Dave_Thaler]'],
  'news': ['', 'USENET news', 'Permanent', '[RFC5538]'],
  'nfs': ['', 'network file system protocol', 'Permanent', '[RFC2224]'],
  'ni': ['', 'ni', 'Permanent', '[RFC6920]'],
  'nih': ['', 'nih', 'Permanent', '[RFC6920]'],
  'nntp': ['', 'USENET news using NNTP access', 'Permanent', '[RFC5538]'],
  'notes': ['prov/notes', 'notes', 'Provisional', '[Dave_Thaler]'],
  'ocf': ['prov/ocf', 'ocf', 'Provisional', '[Dave_Thaler]'],
  'oid': ['prov/oid', 'oid', 'Provisional', '[draft-larmouth-oid-iri]'],
  'onenote': ['prov/onenote', 'onenote', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'onenote-cmd': ['prov/onenote-cmd', 'onenote-cmd', 'Provisional', '[urischemeowners_at_microsoft.com]'],
  'opaquelocktoken': ['', 'opaquelocktokent', 'Permanent', '[RFC4918]'],
  'openpgp4fpr': ['prov/openpgp4fpr', 'openpgp4fpr', 'Provisional', '[Wiktor_Kwapisiewicz]'],
  'pack': ['historic/pack', 'pack', 'Historical', '[draft-shur-pack-uri-scheme]'],
  'palm': ['prov/palm', 'palm', 'Provisional', '[Dave_Thaler]'],
  'paparazzi': ['prov/paparazzi', 'paparazzi', 'Provisional', '[Dave_Thaler]'],
  'payto': ['prov/payto', 'payto', 'Provisional', '[draft-dold-payto]'],
  'pkcs11': ['', 'PKCS#11', 'Permanent', '[RFC7512]'],
  'platform': ['prov/platform', 'platform', 'Provisional', '[Dave_Thaler]'],
  'pop': ['', 'Post Office Protocol v3', 'Permanent', '[RFC2384]'],
  'pres': ['', 'Presence', 'Permanent', '[RFC3859]'],
  'prospero': ['', 'Prospero Directory Service', 'Historical', '[RFC4157]'],
  'proxy': ['prov/proxy', 'proxy', 'Provisional', '[Dave_Thaler]'],
  'pwid': ['prov/pwid', 'pwid', 'Provisional', '[Eld_Zierau]'],
  'psyc': ['prov/psyc', 'psyc', 'Provisional', '[Dave_Thaler]'],
  'qb': ['prov/qb', 'qb', 'Provisional', '[Jan_Pokorny]'],
  'query': ['prov/query', 'query', 'Provisional', '[Dave_Thaler]'],
  'redis': ['prov/redis', 'redis', 'Provisional', '[Chris_Rebert]'],
  'rediss': ['prov/rediss', 'rediss', 'Provisional', '[Chris_Rebert]'],
  'reload': ['', 'reload', 'Permanent', '[RFC6940]'],
  'res': ['prov/res', 'res', 'Provisional', '[Alexey_Melnikov]'],
  'resource': ['prov/resource', 'resource', 'Provisional', '[Dave_Thaler]'],
  'rmi': ['prov/rmi', 'rmi', 'Provisional', '[Dave_Thaler]'],
  'rsync': ['', 'rsync', 'Provisional', '[RFC5781]'],
  'rtmfp': ['prov/rtmfp', 'rtmfp', 'Provisional', '[RFC7425]'],
  'rtmp': ['prov/rtmp', 'rtmp', 'Provisional', '[Dave_Thaler]'],
  'rtsp': ['', 'Real-Time Streaming Protocol (RTSP)', 'Permanent', '[RFC2326][RFC7826]'],
  'rtsps': ['', 'Real-Time Streaming Protocol (RTSP) over TLS', 'Permanent', '[RFC2326][RFC7826]'],
  'rtspu': ['', 'Real-Time Streaming Protocol (RTSP) over unreliable datagram transport', 'Permanent', '[RFC2326]'],
  'secondlife': ['prov/secondlife', 'query', 'Provisional', '[Dave_Thaler]'],
  'service': ['', 'service location', 'Permanent', '[RFC2609]'],
  'session': ['', 'session', 'Permanent', '[RFC6787]'],
  'sftp': ['prov/sftp', 'query', 'Provisional', '[Dave_Thaler]'],
  'sgn': ['prov/sgn', 'sgn', 'Provisional', '[Dave_Thaler]'],
  'shttp': ['', 'Secure Hypertext Transfer Protocol', 'Permanent', '[RFC2660]'],
  'sieve': ['', 'ManageSieve Protocol', 'Permanent', '[RFC5804]'],
  'simpleledger': ['prov/simpleledger', 'simpleledger', 'Provisional', '[James_Cramer]'],
  'sip': ['', 'session initiation protocol', 'Permanent', '[RFC3261]'],
  'sips': ['', 'secure session initiation protocol', 'Permanent', '[RFC3261]'],
  'skype': ['	prov/skype', 'Skype', 'Provisional', '[Alexey_Melnikov]'],
  'smb': ['prov/smb', 'smb', 'Provisional', '[Dave_Thaler]'],
  'sms': ['', 'Short Message Service', 'Permanent', '[RFC5724]'],
  'smtp': ['prov/smtp', 'smtp', 'Provisional', '[draft-melnikov-smime-msa-to-mda]'],
  'snews': ['', 'NNTP over SSL/TLS', 'Historical', '[RFC5538]'],
  'snmp': ['', 'Simple Network Management Protocol', 'Permanent', '[RFC4088]'],
  'soap.beep': ['', 'soap.beep', 'Permanent', '[RFC4227]'],
  'soap.beeps': ['', 'soap.beeps', 'Permanent', '[RFC4227]'],
  'soldat': ['prov/soldat', 'soldat', 'Provisional', '[Dave_Thaler]'],
  'spiffe': ['prov/spiffe', 'spiffe', 'Provisional', '[Evan_Gilman]'],
  'spotify': ['prov/spotify', 'spotify', 'Provisional', '[Dave_Thaler]'],
  'ssh': ['prov/ssh', 'ssh', 'Provisional', '[Dave_Thaler]'],
  'steam': ['prov/steam', 'steam', 'Provisional', '[Dave_Thaler]'],
  'stun': ['', 'stun', 'Permanent', '[RFC7064]'],
  'stuns': ['', 'stuns', 'Permanent', '[RFC7064]'],
  'submit': ['prov/submit', 'submit', 'Provisional', '[draft-melnikov-smime-msa-to-mda]'],
  'svn': ['prov/svn', 'svn', 'Provisional', '[Dave_Thaler]'],
  'tag': ['', 'tag', 'Permanent', '[RFC4151]'],
  'teamspeak': ['prov/teamspeak', 'teamspeak', 'Provisional', '[Dave_Thaler]'],
  'tel': ['', 'telephone', 'Permanent', '[RFC3966]'],
  'teliaeid': ['prov/teliaeid', 'teliaeid', 'Provisional', '[Peter_Lewandowski]'],
  'telnet': ['', 'Reference to interactive sessions', 'Permanent', '[RFC4248]'],
  'tftp': ['', 'Trivial File Transfer Protocol', 'Permanent', '[RFC3617]'],
  'things': ['prov/things', 'things', 'Provisional', '[Dave_Thaler]'],
  'thismessage': ['perm/thismessage', 'multipart/related relative reference resolution', 'Permanent', '[RFC2557]'],
  'tip': ['', 'Transaction Internet Protocol', 'Permanent', '[RFC2371]'],
  'tn3270': ['', 'Interactive 3270 emulation sessions', 'Permanent', '[RFC6270]'],
  'tool': ['prov/tool', 'tool', 'Provisional', '[Matthias_Merkel]'],
  'turn': ['', 'turn', 'Permanent', '[RFC7065]'],
  'turns': ['', 'turns', 'Permanent', '[RFC7065]'],
  'tv': ['', 'TV Broadcasts', 'Permanent', '[RFC2838]'],
  'udp': ['prov/udp', 'udp', 'Provisional', '[Dave_Thaler]'],
  'unreal': ['prov/unreal', 'unreal', 'Provisional', '[Dave_Thaler]'],
  'urn': ['', 'Uniform Resource Names', 'Permanent', '[RFC8141][IANA registry urn-namespaces]'],
  'ut2004': ['prov/ut2004', 'ut2004', 'Provisional', '[Dave_Thaler]'],
  'v-event': ['prov/v-event', 'v-event', 'Provisional', '[draft-menderico-v-event-uri]'],
  'vemmi': ['', 'versatile multimedia interface', 'Permanent', '[RFC2122]'],
  'ventrilo': ['prov/ventrilo', 'ventrilo', 'Provisional', '[Dave_Thaler]'],
  'videotex': ['historic/videotex', 'videotex', 'Historical', '[draft-mavrakis-videotex-url-spec][RFC2122][RFC3986]'],
  'vnc': ['', 'Remote Framebuffer Protocol', 'Permanent', '[RFC7869]'],
  'view-source': ['	prov/view-source', 'view-source', 'Provisional', '[Mykyta_Yevstifeyev]'],
  'wais': ['', 'Wide Area Information Servers', 'Historical', '[RFC4156]'],
  'webcal': ['prov/webcal', 'webcal', 'Provisional', '[Dave_Thaler]'],
  'wpid': ['prov/wpid', 'wpid', 'Historical', '[Eld_Zierau]'],
  'ws': ['', 'WebSocket connections', 'Permanent', '[RFC6455]'],
  'wss': ['', 'Encrypted WebSocket connections', 'Permanent', '[RFC6455]'],
  'wtai': ['prov/wtai', 'wtai', 'Provisional', '[Dave_Thaler]'],
  'wyciwyg': ['prov/wyciwyg', 'wyciwyg', 'Provisional', '[Dave_Thaler]'],
  'xcon': ['', 'xcon', 'Permanent', '[RFC6501]'],
  'xcon-userid': ['', 'xcon-userid', 'Permanent', '[RFC6501]'],
  'xfire': ['prov/xfire', 'xfire', 'Provisional', '[Dave_Thaler]'],
  'xmlrpc.beep': ['', 'xmlrpc.beep', 'Permanent', '[RFC3529]'],
  'xmlrpc.beeps': ['', 'xmlrpc.beeps', 'Permanent', '[RFC3529]'],
  'xmpp': ['', 'Extensible Messaging and Presence Protocol', 'Permanent', '[RFC5122]'],
  'xri': ['prov/xri', 'xri', 'Provisional', '[Dave_Thaler]'],
  'ymsgr': ['prov/ymsgr', 'ymsgr', 'Provisional', '[Dave_Thaler]'],
  'z39.50': ['', 'Z39.50 information access', 'Historical', '[RFC1738][RFC2056]'],
  'z39.50r': ['', 'Z39.50 Retrieval', 'Permanent', '[RFC2056]'],
  'z39.50s': ['', 'Z39.50 Session', 'Permanent', '[RFC2056]']
};
/* The following data structure contains information about all
   of the standard CSS styles. The CSS styles are used in many
   places in the code. Note that the Java code has another copy
   of these values. */
const HDLmHtmlCSSConstants =
{
  "align-content": "",
  "align-items": "",
  "align-self": "",
  "all": "",
  "animation": "",
  "animation-delay": "",
  "animation-direction": "",
  "animation-duration": "",
  "animation-fill-mode": "",
  "animation-iteration-count": "",
  "animation-name": "",
  "animation-play-state": "",
  "animation-timing-function": "",
  "backface-visibility": "",
  "background": "",
  "background-attachment": "",
  "background-blend-mode": "",
  "background-clip": "",
  "background-color": "",
  "background-image": "",
  "background-origin": "",
  "background-position": "",
  "background-repeat": "",
  "background-size": "",
  "border": "",
  "border-bottom": "",
  "border-bottom-color": "",
  "border-bottom-left-radius": "",
  "border-bottom-right-radius": "",
  "border-bottom-style": "",
  "border-bottom-width": "",
  "border-collapse": "",
  "border-color": "",
  "border-image": "",
  "border-image-outset": "",
  "border-image-repeat": "",
  "border-image-slice": "",
  "border-image-source": "",
  "border-image-width": "",
  "border-left": "",
  "border-left-color": "",
  "border-left-style": "",
  "border-left-width": "",
  "border-radius": "",
  "border-right": "",
  "border-right-color": "",
  "border-right-style": "",
  "border-right-width": "",
  "border-spacing": "",
  "border-style": "",
  "border-top": "",
  "border-top-color": "",
  "border-top-left-radius": "",
  "border-top-right-radius": "",
  "border-top-style": "",
  "border-top-width": "",
  "border-width": "",
  "bottom": "",
  "box-decoration-break": "",
  "box-shadow": "",
  "box-sizing": "",
  "caption-side": "",
  "caret-color": "",
  "clear": "",
  "clip": "",
  "color": "",
  "column-count": "",
  "column-fill": "",
  "column-gap": "",
  "column-rule": "",
  "column-rule-color": "",
  "column-rule-style": "",
  "column-rule-width": "",
  "column-span": "",
  "column-width": "",
  "columns": "",
  "content": "",
  "counter-increment": "",
  "counter-reset": "",
  "cursor": "",
  "direction": "",
  "display": "",
  "empty-cells": "",
  "filter": "",
  "flex": "",
  "flex-basis": "",
  "flex-direction": "",
  "flex-flow": "",
  "flex-grow": "",
  "flex-shrink": "",
  "flex-wrap": "",
  "float": "",
  "font": "",
  "font-family": "",
  "font-kerning": "",
  "font-size": "",
  "font-size-adjust": "",
  "font-stretch": "",
  "font-style": "",
  "font-variant": "",
  "font-weight": "",
  "grid": "",
  "grid-area": "",
  "grid-auto-columns": "",
  "grid-auto-flow": "",
  "grid-auto-rows": "",
  "grid-column": "",
  "grid-column-end": "",
  "grid-column-gap": "",
  "grid-column-start": "",
  "grid-gap": "",
  "grid-row": "",
  "grid-row-end": "",
  "grid-row-gap": "",
  "grid-row-start": "",
  "grid-template": "",
  "grid-template-areas": "",
  "grid-template-columns": "",
  "grid-template-rows": "",
  "hanging-punctuation": "",
  "height": "",
  "hyphens": "",
  "isolation": "",
  "justify-content": "",
  "left": "",
  "letter-spacing": "",
  "line-height": "",
  "list-style": "",
  "list-style-image": "",
  "list-style-position": "",
  "list-style-type": "",
  "margin": "",
  "margin-bottom": "",
  "margin-left": "",
  "margin-right": "",
  "margin-top": "",
  "max-height": "",
  "max-width": "",
  "min-height": "",
  "min-width": "",
  "mix-blend-mode": "",
  "object-fit": "",
  "object-position": "",
  "opacity": "",
  "order": "",
  "outline": "",
  "outline-color": "",
  "outline-offset": "",
  "outline-style": "",
  "outline-width": "",
  "overflow": "",
  "overflow-x": "",
  "overflow-y": "",
  "padding": "",
  "padding-bottom": "",
  "padding-left": "",
  "padding-right": "",
  "padding-top": "",
  "page-break-after": "",
  "page-break-before": "",
  "page-break-inside": "",
  "perspective": "",
  "perspective-origin": "",
  "pointer-events": "",
  "position": "",
  "quotes": "",
  "resize": "",
  "right": "",
  "scroll-behavior": "",
  "tab-size": "",
  "table-layout": "",
  "text-align": "",
  "text-align-last": "",
  "text-decoration": "",
  "text-decoration-color": "",
  "text-decoration-line": "",
  "text-decoration-style": "",
  "text-indent": "",
  "text-justify": "",
  "text-overflow": "",
  "text-shadow": "",
  "text-transform": "",
  "top": "",
  "transform": "",
  "transform-origin": "",
  "transform-style": "",
  "transition": "",
  "transition-delay": "",
  "transition-duration": "",
  "transition-property": "",
  "transition-timing-function": "",
  "unicode-bidi": "",
  "user-select": "",
  "vertical-align": "",
  "visibility": "",
  "white-space": "",
  "width": "",
  "word-break": "",
  "word-spacing": "",
  "word-wrap": "",
  "writing-mode": "",
  "z-index": ""
};
/* The HDLmHtml class doesn't actually do anything. However, it
   does serve to hold all of the HTML related values. */
class HDLmHtml {
  /* Add all of the CSS styles returned from the server to the class
     as static properties of the class. Note that the CSS styles are
     returned from the server as a JSON string. */
  static addCSSStyles(jsonStr) {
    let jsonObj = JSON.parse(jsonStr);
    HDLmHtml.CSSStyles = [];
    for (let [key, value] of Object.entries(jsonObj)) {
      HDLmHtml.CSSStyles[key] = value;
    }
    /* Freeze the HOLmHTML class object. This is not an instance of the
       HDLmHtml class. This is the the class object itself. The CSS styles
       are actually added to the class object itself. */
    Object.freeze(HDLmHtml);
  }
  /* Build an accept encoding HTML header */
  static buildAcceptEncodingHeader(acceptEncodingStr) {
    return HDLmHtml.buildHeader('Accept-Encoding', acceptEncodingStr);
  }
  /* Build an Amazon SDK Invocation Id HTML header */
  static buildAmzSdkInvocationIdHeader(sdkIdStr) {
    return HDLmHtml.buildHeader('amz-sdk-invocation-id', sdkIdStr);
  }
  /* Build an Amazon SDK Request HTML header */
  static buildAmzSdkRequestHeader(attemptNumber) {
    let attemptStr = attemptNumber.toString();
    let requestStr = 'attempt' + '=' + attemptStr;
    return HDLmHtml.buildHeader('amz-sdk-request', requestStr);
  }
  /* Build an Open AI authorization HTML header */
  static buildAuthorizationHeader(apiKeyStr) {
    let authValueStr = 'Bearer' + ' ' + apiKeyStr;
    return HDLmHtml.buildHeader('Authorization', authValueStr);
  }
  /* Build a content length HTML header */
  static buildContentLengthHeader(contentLength) {
    return HDLmHtml.buildHeader('Content-Length', contentLength.toString());
  }
  /* Build a content type HTML header */
  static buildContentTypeHeader(contentTypeStr) {
    return HDLmHtml.buildHeader('Content-Type', contentTypeStr);
  }
  /* Build an HTML header object from the values passed the caller */
  static buildHeader(typeStr, valueStr) {
    let outObj = {};
    outObj[typeStr] = valueStr;
    return outObj;
  }
  /* Build an HTML host header */
  static buildHostHeader(hostNameStr) {
    return HDLmHtml.buildHeader('Host', hostNameStr);
  }
  /* Build a user agent HTML header */
  static buildUserAgentHeader(userAgentStr) {
    return HDLmHtml.buildHeader('User-Agent', userAgentStr);
  }
  /* Build an X-Amz-Target HTML header */
  static buildXAmzTargetHeader(targetStr) {
    return HDLmHtml.buildHeader('X-Amz-Target', targetStr);
  }
  /* This routine builds a JavaScript object from a DOM node. The
     caller passed the DOM node. This routine builds the JavaScript
     object from the DOM node and all of the children of the DOM
     node. Note that this routine recursively calls itself (optionally)
     to handle children of the current node. */
  static buildObjectFromNode(domNode, recursionWanted) {
    /* Create the initial empty JavaScript object */
    let newObj = new Object();
    newObj.type = null;
    newObj.tag = null;
    newObj.attributes = null;
    newObj.text = null;
    newObj.subnodes = null;
    /* We need to get the node type. Only some types of nodes
       have other values. */
    let domNodeType = domNode.nodeType;
    newObj.type = HDLmHtml.getStringType(domNodeType);
    /* Try to get the HTML element tag. Note that tag is always
       converted to lowercase because uppercase tag names are
       hard to handle later. */
    if (domNodeType == Node.ELEMENT_NODE) {
      let domNodeName = domNode.nodeName;
      domNodeName = domNodeName.toLowerCase();
      newObj.tag = domNodeName;
    }
    /* Try to get the attributes of an HTML element. The number of
       attributes may be zero, one, or greater than one. All of the
       attributes are used to build an attribute object. The attribute
       object has one property for each attribute. The property name
       is the attribute name. The property value is the attribute
       value. */
    if (domNodeType == Node.ELEMENT_NODE) {
      let attrObj = new Object();
      let domNodeAttrs = domNode.attributes;
      let domNodeAttrsLength = domNodeAttrs.length;
      for (let i = 0; i < domNodeAttrsLength; i++) {
        let domNodeAttr = domNodeAttrs[i];
        attrObj[domNodeAttr.name] = domNodeAttr.value;
      }
      newObj.attributes = attrObj;
    }
    /* If the current DOM node is an HTML element, then we
       can try to get the text for the current HTLM element
       node. We don't want to use the textContent property
       because this would get the text for the current HTML
       element node and all of its descendants. What we want
       to do, is to get the text node under the current HTML
       element (if there is one). */
    if (domNodeType == Node.ELEMENT_NODE) {
      let domSubNodes = domNode.childNodes;
      let domSubNodesLength = domSubNodes.length;
      if (domSubNodesLength > 0) {
        let domSubNode = domSubNodes[0];
        let domSubNodeType = domSubNode.nodeType;
        if (domSubNodeType == Node.TEXT_NODE) {
          let domSubNodeText = domSubNode.textContent;
          newObj.text = domSubNodeText;
        }
      }
    }
    /* Try to get the node text, from the node. This can only
       be done for text nodes. */
    if (domNodeType == Node.TEXT_NODE) {
      let domNodeText = domNode.textContent;
      newObj.text = domNodeText;
    }
    /* Check if the caller wants recursive processing of
       subnodes */
    if (recursionWanted) {
      /* Handle all of the subnodes of the current node */
      let subNodesArray = new Array();
      let domSubNodes = domNode.childNodes;
      let domSubNodesLength = domSubNodes.length;
      for (let i = 0; i < domSubNodesLength; i++) {
        let domSubNode = domSubNodes[i];
        /* In one important case, we don't want to handle the current DOM
           subnode. If the current subnode is a text subnode, and if it is
           the first subnode, and if the parent node was an HTML element
           node, then we have already processed this subnode and we can skip
           it here. */
        if (i == 0) {
          let domSubNodeType = domSubNode.nodeType;
          if (domSubNodeType == Node.TEXT_NODE) {
            let parentOfSubNode = domSubNode.parentNode;
            let parentOfSubNodeType = parentOfSubNode.nodeType;
            if (parentOfSubNodeType == Node.ELEMENT_NODE)
              continue;
          }
        }
        let domSubNodeObj = HDLmHtml.buildObjectFromNode(domSubNode, recursionWanted);
        subNodesArray.push(domSubNodeObj)
      }
      newObj.subnodes = subNodesArray;
    }
    /* Return the final object value to the caller */
    return newObj;
  }
  /* Check if a browser extension window environment is active or not.
     Return a value showing if a browser extension window environment
     is active. The routine will return true, if we are running in a
     browser extension window, and false otherwise. Note that this
     routine will always return false in a debugger environment
     even if the debugger was invoked to debug a browser extension. */
  static checkBrowserExtensionEnvironment() {
    /* console.log(window.location.pathname); */
    return (window.location.pathname == '/HDLmHide.html'   ||
            window.location.pathname == '/HDLmManage.html' ||
            window.location.pathname == '/HDLmNode.html'   ||
            window.location.pathname == '/HDLmPopup.html'  ||
            window.location.pathname == '/HDLmSimple.html');
  }
  /* Check if a CSS style string is valid or not */
  static checkCSSStyle(style) {
    return style in HDLmHtml.CSSStyles;
  }
  /* This routine is used to check if a DOM element exists or not. The caller
     passes the ID value to this routine. This routine checks if a DOM element
     exists with that ID value. This routine returns null if an HTML element
     with the requested ID value does not exist. Otherwise, the HTML element
     is returned to the caller. */
  static checkDomElementById(idName) {
    let fieldElement = document.getElementById(idName);
    return fieldElement;
  }
  /* This method check if an element is a parent element of another element */
  static checkIfParent(targetElement, possibleParent) {
    let parentEl = targetElement.parentElement;
    let rv = false;
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      /* Check if the current parent element is the same as the
         possible parent element */
      if (parentEl == possibleParent) {
        rv = true;
        break;
      }
      /* Continue finding parent elements of the target element */
      parentEl = parentEl.parentElement;
      if (parentEl == null)
        break;
    }
    return rv;
  }
  /* This routine checks if a string is valid JavaScript code or not. The
     caller passes the string to this routine. This routine returns true
     if the string is valid JavaScript code, and false otherwise. The 
     string passed by the caller can and should contain new line char-
     acters. The string is check using the Esprima API. Note that 
     original string (containing the JavaScript program) is not modified
     in any way. */
  static checkJavaScriptCode(jsCode) {
    let rv = false;
    try {
      /* Parse the JavaScript code */
      let parsedCode = esprima.parseScript(jsCode);
      rv = true;
    } 
    catch (esprimaError) {
      /* console.log(esprimaError); */
      rv = false;
    }
    return rv;
  }
  /* Check if a style value is valid or not. This code really checks if
     a background-color is valid or not. */
  static checkStyleBackgroundColor(styleStr) {
    /* console.log(styleStr); */
    /* Set the error text return value */
    let errorText = HDLmUtility.isColor(styleStr, 'rgb only');
    return errorText;
  }
  /* Check if a border style value is valid or not. This code really 
     checks if a border is valid or not. Note, that this code
     treats the 'px' (without the quotes) suffix as mandatory. 
     A border style must follow the border size. */
  static checkStyleBorderValue(styleStr) {
    /* console.log(styleStr); */
    /* Set the initial return value */
    let errorText = '';
    let tokenVec = HDLmString.getTokens(styleStr);
    let tokenVecLen = tokenVec.length;
    /* console.log(tokenVecLen); */
    let tokenIndex = 0;
    if (tokenIndex >= (tokenVecLen - 1)) {
      errorText = 'No room for the number in the pixel value';
      return errorText;
    }
    let curToken = tokenVec[tokenIndex];
    let curValue = Number(curToken.value);
    /* console.log(curToken.value); */
    /* console.log(curValue); */
    /* console.log(typeof curValue); */
    if (isNaN(curValue)) {
      errorText = 'Number not found where needed in pixel value';
      return errorText;
    }
    let curNumber = Number(parseFloat(curValue));
    /* console.log(curNumber); */
    if (Number.isInteger(curNumber) == false) {
      errorText = 'Integer not found where needed in pixel value';
      return errorText;
    }
    /* At this point we need to process the mandatory 'px' (without
       the quotes) string */
    tokenIndex += 1;
    if (tokenIndex >= (tokenVecLen - 1)) {
      errorText = 'No room for the pixel suffix after the pixel value';
      return errorText;
    }
    /* Get the next token */ 
    curToken = tokenVec[tokenIndex];
    let tokenLower = curToken.value.toLowerCase();
    /* Check if the 'px' value (without the quotes) is valid or not */
    if (tokenLower != 'px') {
      errorText = 'Invalid suffix value found in the pixel value';
      return errorText;
    }
    /* The next token must be a space token after the pixel value */
    tokenIndex += 1;
    if (tokenIndex >= (tokenVecLen - 1)) {
      errorText = 'No room for the space(s) after the pixel value';
      return errorText;
    }
    /* Get the next token */
    curToken = tokenVec[tokenIndex]; 
    /* Check if we really have a space token at this point*/
    if (curToken.tokType != HDLmTokenTypes.space) {
      errorText = 'Current token is not a space token';
      return errorText;
    }
    /* The next token must be a border style token after the space token */
    tokenIndex += 1;
    if (tokenIndex >= (tokenVecLen - 1)) {
      errorText = 'No room for the border style after the space(s) token';
      return errorText;
    }
    /* Get the next token */
    curToken = tokenVec[tokenIndex];
    /* Check if we really have a border style string token at this point*/
    if (curToken.tokType != HDLmTokenTypes.identifier) {
      errorText = 'Current token is not an identifier token';
      return errorText;
    }
    /* Get and check the token value */
    curValue = curToken.value;
    errorText = HDLmUtility.isBorderStyle(curValue);
    if (errorText != '')
      return errorText;
    /* We may be done at this point. Nothing has to follow the 
       border style. The rest is optional. */
    tokenIndex += 1;
    if (tokenIndex >= (tokenVecLen - 1))
      return errorText;
    /* The next token must be a space token after the pixel value */
    if (tokenIndex >= (tokenVecLen - 1)) {
      errorText = 'No room for the space(s) after the border style';
      return errorText;
    }
    /* Get the next token */
    curToken = tokenVec[tokenIndex];
    /* Check if we really have a space token at this point*/
    if (curToken.tokType != HDLmTokenTypes.space) {
      errorText = 'Current token is not a space token';
      return errorText;
    }
    /* Get the next token */
    tokenIndex += 1;
    if (tokenIndex >= (tokenVecLen - 1)) {
      errorText = 'No room for the border color after the space(s) token';
      return errorText;
    }
    curToken = tokenVec[tokenIndex];
    /* Check if we really have a color string token at this point*/
    if (curToken.tokType != HDLmTokenTypes.identifier) {
      errorText = 'Current token is not an identifier token';
      return errorText;
    }
    /* Get and check the token value */
    curValue = curToken.value;
    errorText = HDLmUtility.isColor(curValue);
    if (errorText != '')
      return errorText;
    /* Check if we have tokens after the optional color string */
    tokenIndex += 1;
    /* console.log(tokenIndex); */
    /* console.log(tokenVecLen); */
    if (tokenIndex != (tokenVecLen - 1)) {
      errorText = 'Something was found after the border color value';
      return errorText;
    }
    /* console.log(errorText); */
    return errorText;
  }
  /* Check if a style value is valid or not. This code really checks 
     if a border-radius or simple border is valid or not. Note, that 
     this code treats the 'px' (without the quotes) suffix as optional. */
  static checkStylePixelValue(styleStr) {
    /* console.log(styleStr); */
    /* Set the initial return value */
    let errorText = '';
    let tokenVec = HDLmString.getTokens(styleStr);
    let tokenVecLen = tokenVec.length;
    /* console.log(tokenVecLen); */
    let tokenIndex = 0;
    if (tokenIndex >= (tokenVecLen - 1)) {
      errorText = 'No room for the number in the pixel value';
      return errorText;
    }
    let curToken = tokenVec[tokenIndex];
    let curValue = Number(curToken.value);
    /* console.log(curToken.value); */
    /* console.log(curValue); */
    /* console.log(typeof curValue); */
    if (isNaN(curValue)) {
      errorText = 'Number not found where needed in pixel value';
      return errorText;
    }
    let curNumber = Number(parseFloat(curValue));
    /* console.log(curNumber); */
    if (Number.isInteger(curNumber) == false) {
      errorText = 'Integer not found where needed in pixel value';
      return errorText;
    }
    /* At this point we need to process the optional 'px' (without
       the quotes) string */
    tokenIndex += 1;
    if (tokenIndex >= (tokenVecLen - 1))
      return errorText;
    curToken = tokenVec[tokenIndex];
    let tokenLower = curToken.value.toLowerCase();
    /* Check if the 'px' value (without the quotes) is valid or not */
    if (tokenLower != 'px') {
      errorText = 'Invalid suffix value found in the pixel value';
      return errorText;
    }
    /* Check if we have tokens after the optional suffix string */
    tokenIndex += 1;
    /* console.log(tokenIndex); */
    /* console.log(tokenVecLen); */
    if (tokenIndex != (tokenVecLen-1)) {
      errorText = 'Something was found after the pixel value';
      return errorText;
    }
    /* console.log(errorText); */
    return errorText;
  }
  /* Check for a specific CSS property in the inline style for
     an HTML element. Of course, the HTML element may not have
     a style attribute at all. This is not an error condition.
     This routine returns true, if the HTML element has a style
     and the style has the property in question. Otherwise, this
     routine returns false. */
  static checkStyleProperty(currentElement, property) {
    /* Declare and define a few local variables */
    let rv = false;
    let currentStyle = HDLmHtml.getStyleString(currentElement);
    if (currentStyle == null)
      return rv;
    /* Check if the style has the property we are interested in */
    let propIndex = currentStyle.indexOf(property);
    if (propIndex < 0)
      return rv;
    return true;
  }
  /* This routine creates a DOM element and returns the element to the caller.
     The caller can manipulate this element as need be. The caller provides
     the type of the new element (actually the tag name). */
  static createDomElement(newType) {
    let newNode = document.createElement(newType);
    return newNode;
  }
  /* This routine looks through all of the windows and tabs for each
     window and returns the first active tab. If an appropriate tab
     can not be found, a null value is returned to the caller. */
  static getActiveTab(windows) {
    /* Scan all of the windows looking for a 'normal' window */
    for (let i = 0; i < windows.length; i++) {
      let window = windows[i];
      if (window.type != 'normal')
        continue;
      let tabs = window.tabs;
      for (let j = 0; j < tabs.length; j++) {
        let tab = tabs[j];
        if (!tab.active)
          continue;
        return tab;
      }
    }
    return null;
  }
  /* Get all of the active tabs and return the associated promise
     to the caller. When the promise is fulfilled the active tabs
     will be available.

     Note that this routine does appear to be in use. This routine
     supports both Chrome and Firefox. */
  static getAllTabsPromise(tab, messageObject) {
    let getAllTabsPromise;
    /* We need to determine which browser is currently active */
    let browserName = HDLmHtml.getBrowserName();
    /* Check for Chrome vs. Firefox. Much more complex code is
       needed to handle Chrome. */
    if (browserName == 'Chrome') {
      /* Create a new promise */
      getAllTabsPromise = new Promise((resolve, reject) => {
        /* console.log(chrome); */
        /* console.log(chrome.windows); */
        /* console.log(chrome.windows.getAll); */
        chrome.windows.getAll({ populate: true }, response => {
          /* At this point we are inside a Chrome callback. The Chrome
             callback can only be invoked when the get all request has
             been completed and a response has been recieved. Note that
             the else case below will never really happen. */
          if (true) {
            resolve(response);
          }
          else {
            reject('Something went wrong with get all');
          }
        });
      });
    }
    /* We must be running in the Firefox environment. Invoke the correct
       routine for Firefox and return the promise to the caller. */
    else {
      getAllTabsPromise = browser.windows.getAll({ populate: true });
    }
    return getAllTabsPromise;
  }
  /* Get the attribute values for the DOM element passed by the caller.
     This routine returns an object with a property for each DOM element
     attribute. The property name is the attribute name. The property
     value is the attribute value. Note that this routine does not change
     or modify that attributes at all. Other routines must do this if it
     is required. */
  static getAttributes(element) {
    let attrsObj = {};
    let elementAttrs = element.attributes;
    let elementAttrsLength = elementAttrs.length;
    for (let i = 0; i < elementAttrsLength; i++) {
      /* Get the name and value of the current attribute */
      let attrsObjName = elementAttrs[i].name;
      let attrsObjValue = elementAttrs[i].value;
      attrsObj[attrsObjName] = attrsObjValue;
    }
    return attrsObj;
  }
  /* Get the attribute values for the DOM element passed by the caller.
     This routine returns an object with a property for each DOM element
     attribute. The property name is the attribute name. The property
     value is the attribute value. */
  static getAttributesExt(element) {
    let attrsObj = {};
    let elementAttrs = element.attributes;
    let elementAttrsLength = elementAttrs.length;
    for (let i = 0; i < elementAttrsLength; i++) {
      /* Get the name and value of the current attribute */
      let attrsObjName = elementAttrs[i].name;
      let attrsObjValue = elementAttrs[i].value;
      /* Check if the attribute name starts with a special string. These
         attriutes are created by our code and we definitely don't want
         to check them. These attributes must be bypassed and not treated
         as normal attributes. */
      if (attrsObjName.startsWith('hdlmupdated'))
        continue;
      /* We need some very special case code for the class attribute. The
         class attribute in actually a simple string. However, we don't
         want to treat the class attribute as a simple string. We want
         to create an array with each of the class values in it. */
      if (attrsObjName == 'class') {
        let attrsObjValueSplit = attrsObjValue.split(' ');
        let attrsObjValueSplitLength = attrsObjValueSplit.length;
        let attrsObjValueList = []
        for (let i = 0; i < attrsObjValueSplitLength; i++) {
          /* Add the current class value to the class value array.
             However, we don't want to add zero-length class values
             to the class value array. Check the length of the current
             class value and skip it, if it is a zero-length class
             value. */
          let attrsObjValueSplitValue = attrsObjValueSplit[i];
          /* We need to check the current class value to see if it
             ends with a newline character. If we find a newline
             character at the end of the current class value, then
             we need to remove it. */
          if (attrsObjValueSplitValue.endsWith('\n')) {
            let attrsObjValueSplitValueLen = attrsObjValueSplitValue.length;
            attrsObjValueSplitValue = attrsObjValueSplitValue.substr(0, attrsObjValueSplitValueLen - 1);
          }
          /* Check if the remaining length is greater than zero */
          if (attrsObjValueSplitValue.length > 0)
            attrsObjValueList.push(attrsObjValueSplitValue);
        }
        attrsObjValue = attrsObjValueList;
      }
      /* We need to use some special case code for href attributes. The
         problem is that we always want to use relative names, not href
         values that have a host name in them. */
      if (attrsObjName == 'href') {
        attrsObjValue = HDLmUtility.removeHost(attrsObjValue);
      }
      /* Generally we use all attributes. However, some attributes are just
         too dangerous to use. For example, an id (note, lower case) attribute
         with a generated number value that was probably generated. It will
         change each time it is used. We should not use it as a consequence. */
      if (attrsObjName == 'id') {
        if (HDLmNodeIden.checkNodeIdValid(attrsObjValue) == false)
          continue;
      }
      attrsObj[attrsObjName] = attrsObjValue;
    }
    return attrsObj;
  }
  /* This routine will try to get the name (really the type) of the current
     browser and return the name to the caller */
  static getBrowserName() {
    /* console.log('In HDLmHtml.getBrowserName'); */
    /* Check if a few values exist */
    let typeOfDocument = (typeof document);
    let typeOfWindow = (typeof window);
    let typeOfOpr = (typeof opr);
    let typeOfNavigator = (typeof navigator);
    let typeOfNavigatorUserAgent = (typeof navigator.userAgent);
    let typeOfNavigatorUserAgentData = (typeof navigator.userAgentData);
    /* console.log(typeOfDocument, typeOfWindow, typeOfOpr, typeOfNavigator); */
    /* Set a boolean for Opera 8.0+ */
    let isOpera = false;
    if (typeOfWindow != 'undefined' &&
      typeOfOpr != 'undefined' &&
      typeOfNavigator != 'undefined') {
      isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    }
    /* Set a boolean for Firefox 1.0+ */
    let isFirefox = typeof InstallTrigger !== 'undefined';
    /* Set a boolean for Safari 3.0+ "[object HTMLElementConstructor]" */
    let isSafari = false;
    try {
      isSafari = /constructor/i.test(window.HTMLElement) ||
        (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] ||
          (typeof safari !== 'undefined' && safari.pushNotification));
    }
    catch (e) {
      /* This happens a bit too often */
      /* console.log(e); */
      isSafari = false;
    }
    /* Set a boolean for Internet Explorer 6-11 */
    let isIE = false;
    if (typeOfDocument != 'undefined')
      isIE = /*@cc_on!@*/ false || !!document.documentMode;
    /* Set a boolean for Edge 20+. This is a really old approach that no
       longer works. These days Edge is built on Chromium and this check
       is obsolete. */
    let isEdge = false;
    if (typeOfWindow != 'undefined')
      isEdge = !isIE && !!window.StyleMedia;
    /* This is a much newer check for Edge that work with later versions
       of Edge, built on Chromium */
    if (isEdge == false &&
        typeOfWindow == 'object' &&
        window.hasOwnProperty('navigator')) {
	    let typeOfUserAgent = typeof window.navigator.userAgent;
	    if (typeOfUserAgent == 'string' &&
          window.navigator.userAgent.indexOf('Edg') > -1)
        isEdge = true;
    }
    /* This is a much newer check for Electron that work with later versions
       of Electron, built using Chromium */
    let isElectronChromium = false;
    if (isElectronChromium == false &&
        typeOfWindow == 'object' &&
        window.hasOwnProperty('navigator')) {
	    let typeOfUserAgent = typeof window.navigator.userAgent;
	    if (typeOfUserAgent == 'string' &&
          window.navigator.userAgent.indexOf('Electron') > -1)
        isElectronChromium = true;
    }
    /* console.log(isElectronChromium); */
    /* Set a boolean for Chrome 1 - 79 */
    let isChrome = false;
    /* console.log(typeOfWindow); */
    /* console.log(!!window.chrome); */
    /* console.log(window); */
    /* console.log(window.navigator); */
    /* console.log(window.navigator.userAgentData); */
    /* console.log(window.chrome); */
    /* console.log(!!window.chrome.webstore); */
    /* console.log(!!window.chrome.runtime); */
    if (typeOfWindow != 'undefined')
      isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    /* console.log(navigator); */
    /* console.log(navigator.userAgent); */
    /* console.log(isChrome); */
    /* This is yet another test for the Google Chrome brower. This test
       comes from Stack Overflow. Note that hasOwnProperty stopped
       working correctly for some unknown reason. This is why the
       in test is used instead. */
    try {
      /* console.log(isChrome); */
      /* console.log(typeOfNavigator); */
      /* console.log(navigator.userAgent); */
      /* console.log(navigator.userAgentData); */
      /* console.log(navigator); */
      /* console.log(/Chrome/.test(navigator.userAgent)); */
      let userAgentDataInNavigator = 'userAgentData' in navigator;
      let userAgentDataHasBrands = false;
      if (userAgentDataInNavigator)
        userAgentDataHasBrands = 'brands' in navigator.userAgentData;
      /* console.log(typeOfNavigator); */
      /* console.log(userAgentDataHasBrands); */
      /* console.log(userAgentDataInNavigator); */
      /* console.log(navigator); */
      if (typeOfNavigator != 'undefined' &&
          userAgentDataInNavigator) {
        /* console.log(/Chrome/.test(navigator.userAgent)); */
        isChrome = /Chrome/.test(navigator.userAgent) &&
          userAgentDataInNavigator &&
          userAgentDataHasBrands &&
          navigator.userAgentData.brands.some(b => b.brand === 'Google Chrome');
        /* console.log(isChrome); */
      }
    }
    catch (errorObj) {
      console.log(errorObj);
      isChrome = false;
    }
    /* console.log(isChrome); */
    /* Set a boolean for Edge (based on chromium) detection */
    let isEdgeChromium = false;
    if (typeOfNavigator != 'undefined')
      isEdgeChromium = isChrome && (navigator.userAgent.indexOf("Edg") != -1);
    /* console.log(isEdgeChromium); */
    /* Set a boolean for Blink engine detection */
    let isBlink = false;
    if (typeOfWindow != 'undefined')
      isBlink = (isChrome || isOpera) && !!window.CSS;
    /* Return the correct value to the caller */
    if (isOpera)
      return 'Opera';
    if (isFirefox)
      return 'Firefox';
    if (isSafari)
      return 'Safari';
    if (isIE)
      return 'IE';
    if (isEdge)
      return 'Edge';
    if (isChrome)
      return 'Chrome';
    if (isEdgeChromium)
      return 'EdgeChromium';
      if (isElectronChromium)
      return 'ElectronChromium';
    /* Testing has shown that the Blink engine can be detected in the standard
       Chrome environment. Since the check for Chrome comes before the check
       for Blink, this routine will return 'Chrome', not 'Blink'.*/
    if (isBlink)
      return 'Blink';
    return 'Unknown';
  }
  /* This routine returns the size of a browser window to the
     caller */
  static getBrowserSize() {
    /* Declare and define a few variables */
    let rv = {};
    /* Get the client size of the DOM element */
    rv['x'] = window.innerWidth;
    rv['y'] = window.innerHeight;
    return rv;
  }
  /* This routine gets (tries to get) the child element number for
     a child element. The child element, need not be a direct child
     of the parent element. This is not an error condition. The child
     element number is actually an index. In other words, it starts
     from zero, not one. If the child element number can not be found,
     then a null value is returned to the caller. */
  static getChildNumber(parentElement, childElement) {
    /* console.log('In HDLmHtml.getChildNumber', parentElement, childElement); */
    /* Set the default return value */
    let rv = null;
    /* Get an HTML collection of the child elements of the
       parent element. This collection does not support
       standard array operations. */
    let childrenOfParentHtmlCollection = parentElement.children;
    /* Convert the HTML collection to a standard array */
    let childrenOfParent = Array.from(childrenOfParentHtmlCollection);
    let parentOfChild = childElement;
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      /* Check if the current parent element is a direct child of
         the parent elememt */
      let parentOfChildIndex = childrenOfParent.indexOf(parentOfChild);
      if (parentOfChildIndex >= 0) {
        /* console.log('In HDLmHtml.getChildNumber', parentOfChildIndex); */
        return parentOfChildIndex;
      }
      /* Get the next parent of the child element */
      parentOfChild = parentOfChild.parentElement;
      if (parentOfChild == null)
        break;
    }
    return rv;
  }
  /* Get the computed style for an HTML element. This routine does not
     return the raw computed style for the HTML element. A great many
     style properties are discarded. The returned value will always be
     an object. */
  static getComputedStyle(currentElement) {
    /* Get all of the filtered key from the current HTML element */
    let keyArray = []
    let currentStyle = window.getComputedStyle(currentElement);
    let rvStyle = {}
    for (let currentStyleKey in currentStyle) {
      if (HDLmString.allNumeric(currentStyleKey))
        continue;
      if (currentStyleKey.startsWith('-moz'))
        continue;
      if (currentStyleKey.startsWith('Moz'))
        continue;
      if (currentStyleKey.startsWith('-ms'))
        continue;
      if (currentStyleKey.startsWith('-o'))
        continue;
      if (currentStyleKey.startsWith('-webkit'))
        continue;
      if (currentStyleKey.startsWith('webkit'))
        continue;
      if (currentStyleKey.startsWith('Webkit'))
        continue;
      /* Make sure the curent value is not a function */
      let currentStyleValue = currentStyle[currentStyleKey];
      if ((typeof currentStyleValue) == 'function')
        continue;
      keyArray.push(currentStyleKey);
    }
    /* Add all of the values to the return object */
    for (let keyValue of keyArray) {
      rvStyle[keyValue] = currentStyle[keyValue];
    }
    return rvStyle;
  }
  /* Get the JSON CSS styles string from the above CSS styles
     constants*/
  static getCSSStyles() {
    /* Build the required Promise for return to the caller */
    let stylesPromise = new Promise(function (resolve, reject) {
      let resolveValue = JSON.stringify(HDLmHtmlCSSConstants);
      resolve(resolveValue);
    })
    return stylesPromise;
  }
  /* This routine is used to check if a DOM element exists or not. The caller
     passes the ID value to this routine. This routine checks if a DOM element
     exists with that ID value. This routine returns null if an HTML element
     with the requested ID value does not exist. Otherwise, the HTML element
     is returned to the caller. */
  static getDomElementById(idName) {
    let fieldElement = document.getElementById(idName);
    return fieldElement;
  }
  /* This routine returns the client size of a DOM element to the
     caller */
  static getDomClientSize(domElement) {
    /* Declare and define a few variables */
    let rv = {};
    /* Get the client size of the DOM element */
    rv['x'] = domElement.clientWidth;
    rv['y'] = domElement.clientHeight;
    return rv;
  }
  /* This routine returns the location of the bounding rectangle
     for a DOM element */
  static getDomLocationBounding(domElement) {
    /* Declare and define a few variables */
    let rv = {};
    /* Get the client size of the DOM element */
    let loc = domElement.getBoundingClientRect();
    rv['x'] = loc['left'];
    rv['y'] = loc['top'];
    return rv;
  }
  /* This routine returns the offset size of a DOM element to the
     caller */
  static getDomOffsetSize(domElement) {
    /* Declare and define a few variables */
    let rv = {};
    /* Get the offset size of the DOM element */
    rv['x'] = domElement.offsetWidth;
    rv['y'] = domElement.offsetHeight;
    return rv;
  }
  /* This routine get the host name from a URL string. The caller 
     passes the URL string to this routine. This routine returns
     the host name to the caller. */
  static getHostName(urlString) {
    let url = new URL(urlString);
    return url.hostname;
  }
  /* This method finds that parent element of two input elements. Of course,
     the parent element might be the 'body' element and not very useful.
     The caller must check for this case. */
  static getParentElement(firstElement, secondElement) {
    /* Get the parent of the first element passed to this routine */
    let parentEl = firstElement.parentElement;
    let rv = null;
    /* What follows is a dummy loop used only to allow break to work */
    while (true) {
      /* Check if the current parent element, is also a parent element
         of the second element */
      let checkParent = HDLmHtml.checkIfParent(secondElement, parentEl);
      if (checkParent == true) {
        rv = parentEl;
        break;
      }
      parentEl = parentEl.parentElement;
      if (parentEl == null)
        break;
    }
    return rv;
  }
  /* This routine converts node type integers to string values. The
     string values are easier to understand and more readable. */
  static getStringType(nodeTypeInteger) {
    /* Check for each of the cases */
    switch (nodeTypeInteger) {
      case Node.ELEMENT_NODE:
        return 'Element';
      case Node.TEXT_NODE:
        return 'Text';
      case Node.CDATA_SECTION_NODE:
        return 'CDataSection';
      case Node.PROCESSING_INSTRUCTION_NODE:
        return 'ProcessingInstruction';
      case Node.COMMENT_NODE:
        return 'Comment';
      case Node.DOCUMENT_NODE:
        return 'Document';
      case Node.DOCUMENT_TYPE_NODE:
        return 'DocumentType';
      case Node.DOCUMENT_FRAGMENT_NODE:
        return 'DocumentFragment';
      /* All of the following are deprecated node types */
      case Node.ATTRIBUTE_NODE:
        return 'Attribute';
      case Node.ENTITY_REFERENCE_NODE:
        return 'EntityReference';
      case Node.ENTITY_NODE:
        return 'Entity';
      case Node.NOTATION_NODE:
        return 'Notation';
      default:
        return nodeTypeInteger.toString();
    }
  }
  /* This method tries to get the inline CSS style from an HTML
     element. If the HTML element has no style, then an empty
     style object is returned to the caller. Otherwise, the style
     string is obtained from the HTML element. The style
     string (if any) is broken up into parts. Each part is
     a style name / style value pair. Of course, the style
     value is not used in many cases and a colon separates
     the style name from the style value. */
  static getStyleObject(currentElement) {
    let rvStyleObject = {};
    let value = HDLmHtml.getStyleString(currentElement);
    if (value == null || value == '')
      return rvStyleObject;
    /* Split the style into an array of parts */
    let valueArray = value.split(';');
    for (let valueCurrent of valueArray) {
      valueCurrent = valueCurrent.trim();
      if (valueCurrent == '')
        continue;
      /* Declare and define a few variables */
      let valueAfter;
      let valueBefore;
      let valueIndex;
      /* Search for a colon in the value */
      valueIndex = valueCurrent.indexOf(':');
      if (valueIndex >= 0) {
        valueBefore = valueCurrent.substr(0, valueIndex);
        valueAfter = valueCurrent.substr(valueIndex + 1);
      }
      else {
        valueBefore = valueCurrent;
        valueAfter = '';
      }
      /* Add the current style name and value to the output
         array */
      rvStyleObject[valueBefore] = valueAfter;
    }
    return rvStyleObject;
  }
  /* This method tries to get the inline CSS style from an HTML
     element. If the HTML element has no style, then a null
     value is returned to the caller. Otherwise, the style
     string is returned to the caller. */
  static getStyleString(currentElement) {
    let value = currentElement.getAttribute('style');
    if (value == null || value == '')
      return null;
    return value;
  }
  /* Get a list of all of the browser windows and the tabs for each window.
     The list (actually a promise that returns the list when the promise is
     fulfilled) is returned to the caller. This routine uses promises. This
     routine returns a promise that will be fulfilled when the list of
     browser windows is available.

     Note that this routine is definitely in use (by other routines that are
     not in use). This routine is highly Chrome specific. */
  static getWindowsAllPromiseChrome() {
    let getAllTabsPromise = chrome.windows.getAll({ populate: true });
    return getAllTabsPromise;
  }
  /* Get some window (browser window, not Windows) information and return
     it to the caller. This is the low-level routine that actually gets
     window information. This routine runs synchronously and returns an
     object. */
  static getWindowInfo() {
    /* Build a JSON object with a set of window information */
    let jsonObj = {};
    jsonObj.href = window.location.href;
    jsonObj.hostname = window.location.hostname;
    jsonObj.pathvalue = window.location.pathname;
    jsonObj.protocol = window.location.protocol;
    jsonObj.port = window.location.port;
    jsonObj.search = window.location.search;
    jsonObj.baseURI = window.document.baseURI;
    jsonObj.title = window.document.title;
    jsonObj.URL = window.document.URL;
    jsonObj.appName = window.navigator.appName;
    jsonObj.height = window.screen.height;
    jsonObj.width = window.screen.width;
    return jsonObj;
  }
  /* Get the z-index of the current element. This value is used
     to make sure that windows are in front of each other. */
  static getZIndex(currentElement) {
    let rv;
    rv = getComputedStyle(currentElement).getPropertyValue('z-index');
    return rv
  }
  /* This routine removes all of the children of one DOM
     element. The caller passes the DOM element to be
     cleaned. This routine does all of the work. */
  static removeDomChildren(domElement) {
    while (domElement.firstChild) {
      domElement.removeChild(domElement.lastChild);
    }
  }
  /* This routine reverses a set of changes that are made
     to some strings. Some strings are modified to remove
     blanks, dollar signs, and uppercase characters. These
     charactesr are replaced with characters from the Latioan 
     language. */
  static reverseCharacterChanges(inStr) {
    /* The characters used below are Laotian letters. These 
       values were chosen because they are in the BMP, obscure
       (to English speakers), and do not cause exceptions. */    
    inStr = inStr.replace(/\u0e81/g, 'A');
    inStr = inStr.replace(/\u0e82/g, 'B');
    inStr = inStr.replace(/\u0e84/g, 'C');
    inStr = inStr.replace(/\u0e87/g, 'D');
    inStr = inStr.replace(/\u0e88/g, 'E');
    inStr = inStr.replace(/\u0e8a/g, 'F');
    inStr = inStr.replace(/\u0e8d/g, 'G');
    inStr = inStr.replace(/\u0e94/g, 'H');
    inStr = inStr.replace(/\u0e97/g, 'I');
    inStr = inStr.replace(/\u0e99/g, 'J');
    inStr = inStr.replace(/\u0e9f/g, 'K');
    inStr = inStr.replace(/\u0ea1/g, 'L');
    inStr = inStr.replace(/\u0ea3/g, 'M');
    inStr = inStr.replace(/\u0ea5/g, 'N');
    inStr = inStr.replace(/\u0ea7/g, 'O');
    inStr = inStr.replace(/\u0eaa/g, 'P');
    inStr = inStr.replace(/\u0eab/g, 'Q');
    inStr = inStr.replace(/\u0ead/g, 'R');
    inStr = inStr.replace(/\u0eb9/g, 'S');
    inStr = inStr.replace(/\u0ebb/g, 'T');
    inStr = inStr.replace(/\u0ebd/g, 'U');
    inStr = inStr.replace(/\u0ec0/g, 'V');
    inStr = inStr.replace(/\u0ec4/g, 'W');
    inStr = inStr.replace(/\u0ec6/g, 'X');
    inStr = inStr.replace(/\u0ec8/g, 'Y');
    inStr = inStr.replace(/\u0ecd/g, 'Z');
    inStr = inStr.replace(/\u0ed0/g, ' ');
    inStr = inStr.replace(/\u0ed1/g, '$');
    inStr = inStr.replace(/\u0ed2/g, '.');
    inStr = inStr.replace(/\u0ed3/g, '/');
    inStr = inStr.replace(/\u0ed4/g, '(');
    inStr = inStr.replace(/\u0ed5/g, ')');
    return inStr;
  }
  /* This routine runs asynchronously. That means that it will return a
     promise and return at some unknown point in the future. This routine
     uses another routine to get the current tab. The current tab is used
     to send a message asynchronously.

     This routine sends a message and return the associated promise to the
     caller. When the promise is fulfilled the response to the message will
     be available.

     Note that this routine does appear to be in use. This routine
     supports both Chrome and Firefox. */
  static async sendMessageAsync(messageObject) {
    let sendPromise;
    /* Get a promise, that when fulfilled will have the all of the
       current windows and tabs information */
    let getAllTabsPromise = HDLmHtml.getAllTabsPromise();
    let allWindows = await getAllTabsPromise;
    let currentTab = HDLmHtml.getActiveTab(allWindows);
    sendPromise = HDLmHtml.sendMessagePromise(currentTab, messageObject);
    return sendPromise;
  }
  /* Send a message and return the associated promise to the caller.
     When the promise is fulfilled the response to the message will
     be available.

     Note that this routine does appear to be in use. This routine
     supports both Chrome and Firefox. */
  static sendMessagePromise(tab, messageObject) {
    let sendPromise;
    /* We need to determine which browser is currently active */
    let browserName = HDLmHtml.getBrowserName();
    /* Check for Chrome vs. Firefox. Much more complex code is
       needed to handle Chrome. */
    if (browserName == 'Chrome') {
      /* Create a new promise */
      sendPromise = new Promise((resolve, reject) => {
        chrome.tabs.sendMessage(tab.id, messageObject, response => {
          /* At this point we are inside a Chrome callback. The Chrome
             callback can only be invoked when the send message has been
             completed and a response has been recieved. Note that the
             else case below will never really happen. */
          if (true) {
            resolve(response);
          }
          else {
            reject('Something went wrong with send message');
          }
        });
      });
    }
    /* We must be running in the Firefox environment. Invoke the correct
       routine for Firefox and return the promise to the caller. */
    else {
      sendPromise = browser.tabs.sendMessage(tab.id, messageObject);
    }
    return sendPromise;
  }
  /* This routine sets one HTML attribute in a DOM element.
     The caller provides the DOM element and the attribute
     name. Of course, the caller also provides the new value
     of the attribute. */
  static setDomAttribute(domElement, attrName, attrValue) {
    domElement.setAttribute(attrName, attrValue);
  }
  /* This routine sets one HTML style attribute in a DOM element.
     The caller provides the DOM element and the style attribute
     name. Of course, the caller also provides the new value
     of the style attribute. */
  static setDomStyle(domElement, attrName, attrValue) {
    domElement.style[attrName] = attrValue;
  }
  /* This routine splits a CSS style string into its components. The caller
     passes a CSS style string to this routine with several CSS styles in
     it. This routine returns an array of CSS style strings. Each array
     element is a single CSS style string. */
  static splitCssString(inputStr) {
    /* Make sure the first argument passed by the caller is a string */
    if (typeof inputStr != 'string') {
      let errorText = `Input value passed to splitCssString is not a string`;
      HDLmAssert(false, errorText);
    }
    /* Create an empty array to hold the CSS styles */
    let cssArray = [];
    /* Try to find each of the CSS styles in the input string */
    let lastRightBrace = -1;
    while (true) {
      /* Look for the right brace that terminates a CSS style */
      let rightBrace = inputStr.indexOf('}', lastRightBrace + 1);
      if (rightBrace < 0)
        break;
      /* Get the CSS style string */
      let cssStr = inputStr.substring(lastRightBrace + 1, rightBrace + 1);
      let cssStrLen = cssStr.length;
      /* Remove any leading white space and/or new line characters */
      while (true) {
        cssStr = cssStr.replace(/^(\s)*/, '');
        cssStr = cssStr.replace(/^(\n)*/, '');
        if (cssStr.length == cssStrLen)
          break;
        cssStrLen = cssStr.length;
      }
      /* Add the CSS style string to the output CSS array */
      cssArray.push(cssStr);
      /* Reset the last right brace position */
      lastRightBrace = rightBrace;
    }
    /* Return the array of CSS styles to the caller */
    return cssArray;
  }
  /* Store the node path as an attribute in a div. This operation
     should not fail. However, you never know. */
  static storeNodePath(nodePath) {
    /* Get the div element we will add an attribute to */
    let divName = HDLmDefines.getString('HDLMRIGHTDEF');
    let divRightDefElements = document.getElementsByClassName(divName);
    let nodePathName = HDLmDefines.getString('HDLMNODEPATH');
    if (divRightDefElements.length > 0)
      divRightDefElements[0].setAttribute(nodePathName, nodePath.toString());
  }
}