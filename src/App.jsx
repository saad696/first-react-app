import React, { Component } from "react";
import styled from "styled-components";

import "./App.css";
import Person from "./Person/Person";

   //styles
   const StyledButton = styled.button `
   background-color: ${props => props.alt ? "#a4161a" : "#40916c"};
   color: #fff;
   font: inherit;
   border: 1px solid #000;
   padding: .5rem;
   cursor: pointer;
   transition: all .3s ease;

   &:hover {
         background-color: ${props => props.alt ? "#e5383b" : "#52b788"};
         color: #000;
   }
   `;
  //styles end
  
class App extends Component {
  state = {
    persons: [
      { id: "jN3wrx", name: "Saad", age: 21 },
      { id: "Axy8Eu", name: "Naved", age: 21 },
      { id: "bdi9Eu", name: "Saif", age: 23 }
    ],
    showPersons: false,
  };

  deletePersonHandler = (personIndex) => {
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  updateNameHandler = (e, id) => {
    //gets two args event and person id
    const personIndex = this.state.persons.findIndex(p => {return p.id === id});
    //finds the index of the person on which input box is click by using findIndex and comparing the id from the orignal array and from the click one.
    const person = {...this.state.persons[personIndex]};
    //use spread operator to copy that person which we get above from personIndex.
    person.name = e.target.value;
    //change the value of the person name with what we enter in the matched input box.
    const persons = [...this.state.persons];
    //copy the orignal person arry to a copy for work (Best practise).
    persons[personIndex] = person;
    //change the value of person name in copy arry at the index which we found by the person name we enter
    this.setState({
      persons: persons
      //set the orignal array with copy array using setState.
    });
  };

  renderPersonsHandler = () => {
    let doesShowPersons = this.state.showPersons;
    this.setState({
      showPersons: !doesShowPersons,
    });
  };
  render() {
    let persons = null;
    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((p, index) => {
            return (
              <Person
                name={p.name}
                age={p.age}
                key={p.id}
                click={() => this.deletePersonHandler(index)}
                change={(e) => {
                  this.updateNameHandler(e, p.id);
                  //gives two args, the event which is the event of click on input box and person id which we assign
                }}
              />
            );
          })}
        </div>
      );
    }

    const cssClasses = [];
    if(this.state.persons.length <= 2){
      cssClasses.push("red");
    }
    if(this.state.persons.length <= 1){
      cssClasses.push("bold")
    }
    return (
      <div className="App">
        <h1>Hey I'm Saad Shaikh</h1>
        <p className={cssClasses.join(" ")}>This is my first react app</p>
        <StyledButton alt={this.state.showPersons} onClick={this.renderPersonsHandler}>
          Toggle names
          </StyledButton>
        {persons}
      </div>
    );
  }
}

export default App;