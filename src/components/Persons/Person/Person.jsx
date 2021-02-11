import React, { Component } from "react";
import PersonStyles from "./Person.module.css";
import Aux from "../../../HOC/Auxilary";
import PropType from "prop-types";
import AuthContext from "../../../context/Auth-Context";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElementRef = React.createRef();
  }

  static contextType = AuthContext; 
  //a convinient way for the <Authcontext.Consumer> we can use context as an propperty which this line give us automatically.

  componentDidMount() {
    this.inputElementRef.current.focus();
  }

  render() {
    return (
      <Aux>
        <div className={PersonStyles.card}>
            {
              this.context.authenticated ? (
                <p className={PersonStyles.authenticated}>Authenticated!</p>
              ) : (
                <p className={PersonStyles.notAuthenticated}>Please login!</p>
              )
            }
          <hr />
          <p onClick={this.props.click}>
            Hey, I am {this.props.name} and I am {this.props.age} years old!
          </p>
          <p>{this.props.children}</p>
          <input
            type="text"
            onChange={this.props.change}
            value={this.props.name}
            ref={this.inputElementRef}
          />
        </div>
      </Aux>
    );
  }
}
//PropTpe is a tool to define clear prop types we can define props types as follows.
Person.propType = {
  click: PropType.func,
  change: PropType.func,
  name: PropType.string,
  age: PropType.number,
};
export default Person;
