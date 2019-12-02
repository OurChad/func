---
title: "Declarative Programming"
date: "2019-10-31"
next: "composition"
nextLabel: "Composition"
previous: "/"
previousLabel: "What is Functional Programming?"
---

Functional programming is **declarative** rather than imperative, and **application state flows through pure functions**.
Contrast with object oriented programming, where application state is usually shared and colocated with methods in objects.

## Declarative Programming

The most used phase to define declarative programming is: 

*Declarative programming is about `what` you want while imperative programming is about `how` you do something.*

### In English

- Goal: Get a table at a restaurant
-- Imperative(HOW): *I see that table located under the Gone Fishin’ sign is empty. My husband and I are going to walk over there and sit down.*
-- Declarative(WHAT): *Table for two, please.*

- Goal: Get a cup of water
-- Imperative(HOW): *Please, get up, move your chair, walk to the door, open the door, walk towards the fridge, open the fridge...*
-- Declarative(WHAT): *Please, get a cup of water for me*


`Many (if not all) declarative approaches have some sort of underlying imperative abstraction.`

The response for the declarative expression “table for two, please” is relying that the employee of the restaurant knows all of the imperative steps to get us to the table.
Same is truth for the second example, the person that I ask for a cup of water know how to get the cup of water.

The point is: `You don't need to know the how`

### In Code

- Goal: Multiply all the elements of a array by two
-- Imperative(HOW): 
```js
  const double = (arr) => {
  let results = []
  for (let i = 0; i < arr.length; i++){
    results.push(arr[i] * 2)
  }
  return results
}
```
-- Declarative(WHAT):
```js
  const double = arr => arr.map(item => item * 2)
```

- Goal: Create a button that changes the text onClick
-- Imperative(How):
```js
  const button = document.createElement('button')
  button.text('Not clicked')
  button.onclick = () => {
    if (button.text() === 'Not clicked') {
      button.text('clicked')
    } else {
      button.text('Not clicked')
    }
  }
```

-- Declarative(WHAT):
```jsx
  <button
    text={this.state.text}
    onClick={this.toggleText}
  />
```

#### Pros
- Easy to reson about (Once you understand/get used to the abstractions)
- Developer doing less code = less oportunity for bug

#### Cons
- Normally, more abstractions means a downside on performance



## State flows through pure functions

### Higher order functions

A higher order function is a function that takes a function as an argument, or returns a function.

Example of some HoF is `.map`, `.reduce` and `.filter`. They take a function as an argument. They're higher order functions.

Higher order functions allow us to abstract repeated implementation in a declarative way and apply it in different contexts.

### Currying

A curried function is a function that takes multiple arguments one at a time. Given a function with 3 parameters, the curried version will take one argument and return a function that takes the next argument, which returns a function that takes the third argument. The last function returns the result of applying the function to all of its arguments

```js
  // add = a => b => Number
  const add = a => b => a + b;

  const result = add(2)(3); // => 5
```

The add function takes one argument, and then returns a **partial application** of itself with a fixed in the **closure** scope.

A partial application is a function which has been applied to some, but not yet all of its arguments. In other words, it’s a function which has some arguments fixed inside its closure scope.


**With currying and HoF our power to do composition increse immensely allowing us to create simple pipelines of functions where the data(state) flows through**


### How that looks like when it's all combined?

```js
const metadata = {
    "component": "StepPage",
    "route": "address",
    "id": "address",
    "type": "page",
    "content": [
      {
        "id": "state",
        "type": "field",
        "componentProps": {
          "required": true,
          "availableValues": [
            {
              "code": "CA",
              "name": "California"
            },
            {
              "code": "IL",
              "name": "Illinois"
            },
            {
              "code": "HI",
              "name": "Hawaii"
            },
            {
              "code": "NY",
              "name": "New York"
            }
          ]
        }
      }
    ]
  }

  // Imperative programming
  const removeAvaiableValuesFromField = (id, valuesToRemove, metadata) => {
    let filteredAvaiableValues = [];

    for (let i = 0; i < metadata.content.length; i++) {
      let fieldAvaiableValues = metadata.content[i].componentProps.avaiableValues;
      for (let j = 0; j < fieldAvaiableValues.length; j++) {
        if(!valuesToRemove.includes(fieldAvaiableValues[j].code)) {
          filteredAvaiableValues.push(fieldAvaiableValues[j].code)
        }
      }
    }
  
    return filteredAvaiableValues
  }

  // Somewhat functional/declarative
  const removeAvaiableValuesFromField = (id, valuesToRemove, metadata) => {
    const content = metadata.content
    const field = content.find((field) => field.id === id)
    const avaiableValues = field.componentProps.avaiableValues
    return avaiableValues.filter(value => !valuesToRemove.includes(value.code))
  }


  // Data flowing through functions
  const removeAvaiableValuesFromField = (id, valuesToRemove) => compose(
    filter(value => !valuesToRemove.includes(value.code)),
    path(['componentProps, avaiableValues']),
    find(isMatch({ id }),
    path('content')
  )

  const filteredAvaiableValues = removeAvaiableValuesFromField('state', [ "CA", "IL" ])(metadata)

```

