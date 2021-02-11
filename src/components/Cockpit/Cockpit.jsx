import React, {useEffect, useRef, useContext} from "react";
import AuthContext from "../../context/Auth-Context";

import cockpitStyles from "./Cockpit.module.css";

const CockPit = (props) => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);
  
  //useEffect is a react hook which runs for every render cycle
    useEffect(() => {
      console.log(`[useEffect] - from cockPit id - (${Math.floor(Math.random()*100)+1})`);
      setTimeout(() => {
        toggleBtnRef.current.click();
      }, 1000);
    }, [props.persons])
    const cssClasses = [];
    let buttonClasses = "";
    if(props.showPersons){
        buttonClasses = cockpitStyles.Red
    }
    
    if(props.personsLength <= 2){
      cssClasses.push(cockpitStyles.red);
    }
    if(props.personsLength <= 1){
      cssClasses.push(cockpitStyles.bold)
    }

  return (
    <div className={cockpitStyles.cockpit}>
      <h1>{props.title}</h1>
      <p className={cssClasses.join(" ")}>This is my first react app</p>
      <button
        ref={toggleBtnRef}
        className={buttonClasses}
        onClick={props.render}
      >
        Toggle names
      </button>
     <button onClick={authContext.login}>Login</button>

    </div>
  );
};

export default React.memo(CockPit);