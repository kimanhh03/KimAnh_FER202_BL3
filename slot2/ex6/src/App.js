import React from 'react';

function App() {
  const people = [
    {name: 'Jack', age: 50},
    {name: 'Michael', age: 9},
    {name: 'John', age: 40},
    {name: 'Ann', age: 19},
    {name: 'Elisabeth', age: 16}
  ];

  const firstTeenager = people.find(person => person.age >= 10 && person.age <= 20);

  const allTeenagers = people.filter(person => person.age >= 10 && person.age <= 20);

  const everyIsTeenager = people.every(person => person.age >= 10 && person.age <= 20);

  const anyIsTeenager = people.some(person => person.age >= 10 && person.age <= 20);

  return (
    <div>
      <h1>ES6 People Array Exercises</h1>
      
      <div>
        <h2>Original people array:</h2>
        <pre>{JSON.stringify(people, null, 2)}</pre>
      </div>

      <div>
        <h2>1. First teenager:</h2>
        <pre>{JSON.stringify(firstTeenager, null, 2)}</pre>
      </div>

      <div>
        <h2>2. All teenagers:</h2>
        <pre>{JSON.stringify(allTeenagers, null, 2)}</pre>
      </div>

      <div>
        <h2>3. Every person is teenager:</h2>
        <pre>{JSON.stringify(everyIsTeenager)}</pre>
      </div>

      <div>
        <h2>4. Any person is teenager:</h2>
        <pre>{JSON.stringify(anyIsTeenager)}</pre>
      </div>
    </div>
  );
}

export default App;