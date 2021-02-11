import React, { Component } from "react";

import Styles from "./App.module.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";
import Aux from "../HOC/Auxilary";
import withClass from "../HOC/withClass";
import AuthContext from "../context/Auth-Context";

class App extends Component {
  state = {
    persons: [
      { id: "jN3wrx", name: "Saad", age: 21 },
      { id: "Axy8Eu", name: "Naved", age: 21 },
      { id: "bdi9Eu", name: "Saif", age: 23 },
    ],
    showPersons: false,
    changeCounter: 0,
    authenticated: false
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({persons: persons});
  };

  updateNameHandler = (e, id) => {
    //gets two args event and person id
    const personIndex = this.state.persons.findIndex((p) => {
      return p.id === id;
    });
    //finds the index of the person on which input box is click by using findIndex and comparing the id from the orignal array and from the click one.
    const person = { ...this.state.persons[personIndex] };
    //use spread operator to copy that person which we get above from personIndex.
    person.name = e.target.value;
    //change the value of the person name with what we enter in the matched input box.
    const persons = [...this.state.persons];
    //copy the orignal person arry to a copy for work (Best practise).
    persons[personIndex] = person;
    //change the value of person name in copy arry at the index which we found by the person name we enter
    this.setState((prevState) => {
      return {
      persons: persons,
      //set the orignal array with copy array using setState.
      changeCounter: prevState.changeCounter + 1
      }
    });
    //console.log(this.state.changeCounter)
  };

  renderPersonsHandler = () => {
    let doesShowPersons = this.state.showPersons;
    this.setState({
      showPersons: !doesShowPersons,
    });
  };

  loginHandler = () => {
    this.setState({authenticated: true});
  }

  render() {
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          <Persons
            persons={this.state.persons}
            delete={this.deletePersonHandler}
            update={this.updateNameHandler}
          />
        </div>
      );
    }

    return (
      <Aux>
        <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
        <Cockpit title={this.props.appTitle}
          showPersons={this.state.showPersons}
          personsLength={this.state.persons.length}
          render={this.renderPersonsHandler}
        />
        {persons}
        </AuthContext.Provider>
      </Aux>
    );
  }
}

export default withClass(App, Styles.center);
