/**
 * HDLmReactTwo short summary.
 *
 * HDLmReactTwo description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmReactTwo class is not used to create any objects.
   However, it does contain code for creating and using React. */ 
class HDLmReactTwo { 
  /* This function creates a div HTML elmement */
  static createDiv(rulesArray) {    
    /* console.log(rulesArray); */
    return React.createElement("div", null, React.createElement(HDLmReactTwo.createList, rulesArray));   
  }
  /* This function creates the React list */
  static createList(rulesArray) {     
    /* const arr = React.useState(-1); */
    /* console.log(arr); */
    /* console.log(rulesArray); */
    let items = rulesArray['rulesArray'];
    /* console.log(items); */
    return React.createElement(React.Fragment, null, React.createElement("ul", {
      className: "list-group", style: {listStyleType: "none"}
    }, items.map((item, index) => React.createElement("li", {
      key: item
    }, item))));
  }
  /* This function really does work. The code below was 
     generated using the online Babel conversion tool. */
  static startReact(rulesArray) { 
    /* console.log('s1'); */
    const container = document.getElementById('entryValues');
    /* console.log('s2'); */
    const root = ReactDOM.createRoot(container);
    /* console.log('s3'); */
    /* console.log(rulesArray); */
    root.render(React.createElement(HDLmReactTwo.createDiv, {rulesArray: rulesArray}));
  }
  /* This routine is not in use. This routine uses 'StrictMode'.
     For some reason, 'StrictMode' can not be found. */
  static strictMode(rulesArray) {
    const container = document.getElementById('entryValues');
    const root = ReactDOM.createRoot(container);
    root.render(React.createElement(StrictMode, null, React.createElement(App, null)));
  }
  /* This is a minimal JSX function. This function is called
     from other JavaScript code as a test. This codes doesn't 
     do all that much. This code requires JSX entry points
     that I have not been able to find. */
  static underscoreJsx() { 
    /* The function below returns some HTML. This is possible
       because the function is transpiled using Babel. Babel
       converts the JSX to ordinary JavaScript. This doesn't 
       really work because the _jsx entry point is unknown. */
    function Hello() {
      return /*#__PURE__*/_jsx("h1", {
        children: "Hello World!"
                                      });
    }
    /* console.log('s1'); */
    const container = document.getElementById('entryValues');
    /* console.log('s2'); */
    const root = ReactDOM.createRoot(container); 
    root.render(_jsx(Hello, {}))
  }
}