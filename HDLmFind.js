/**
 * Class for finding HTML elements that need to be modified
 * 
 * Each instance of this class desribes one level of a possibly multilevel
 * find. In some cases, just one level is enough to find an HTML element
 * that should be modified. In other cases, the first level find will 
 * locate many HTML elements or it will locate just one HTML elememt that
 * is at too high a level.
 * 
 * Each subsequent level of find is nested inside the higher levels. In 
 * other words, each subsequent level of find is used to narrow the search
 * for the one (or more than one) HTML element that needs to be modified.
 * 
 * Each find can (optionally) specify a tag and (optionally) specify an
 * HTML attribute name and HTML attribute value. Of course, at least one
 * of these must be set to a non-blank value. The HTML attribute name may
 * be id (note, lower case) for which special DOM methods may be available
 * in some cases.
 * 
 * Finding can be done using HTML tags or other HTML attributes. We can search
 * using HTML tags at any level. However, we can only search for HTML id (note, 
 * lower case) values at the top-level. Of course, a search by iteration over 
 * all of the subnodes is always possible at any level. 
 *
 * This class has a constructor that builds an instance from values describing 
 * the current find. The class is designed so that the find step(s) can be quickly
 * done. 
 *
 * This class also has methods for doing a complete find (possibly multilevel)
 * and doing a find at just one level. The output from each method is likely
 * to be a list (array) of HTML nodes. The caller must decide to do with the
 * array of nodes. 
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
class HDLmFind {
}