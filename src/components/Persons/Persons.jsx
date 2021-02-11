import React from "react";

import Person from "./Person/Person";

const persons = (props) => props.persons.map((p, index) => {
  
    return (
      <Person
        name={p.name}
        age={p.age}
        key={p.id}
        click={() => props.delete(index)}
        change={(e) => {
          props.update(e, p.id);
          //gives two args, the event which is the event of click on input box and person id which we assign
        }}
      />
    );
  });

  export default persons;