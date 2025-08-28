/**
 * HDLmReactOne short summary.
 *
 * HDLmReactOne description.
 *
 * @version 1.0
 * @author Peter
 */
"use strict";
/* The HDLmReactOne class is not used to create any objects.
   However, it does contain code for creating and using React. */ 
class HDLmReactOne { 
  /* This is a minimal JSX function. This function is called
     from other JavaScript code as a test. This codes doesn't 
     do all that much. */
  static helloWorld() { 
    /* The function below returns some HTML. This is possible
       because the function is transpiled using Babel. Babel
       converts the JSX to ordinary JavaScript. */
    function Hello() {
      return React.createElement("h1", null, 'HelloWordl!');   
      /*
      return <h1>Hello World!</h1>;
      */
    }
  function Greeting() {
    var name = 'abcd';
    return React.createElement(
      'h1',
      null,
      'Hello ',
      React.createElement('i', null, name),
      '. Welcome!'
    );
  }
    /* console.log('s1'); */
    const container = document.getElementById('entryValues');
    /* console.log('s2'); */
    const root = ReactDOM.createRoot(container);
    let temph1 = Greeting();
    root.render(temph1); 
    /*
    root.render(<Hello />);S
    */
  }  
} 