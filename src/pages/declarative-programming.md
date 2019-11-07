---
title: "Declarative Programming"
date: "2019-10-31"
next: "declarative-programming"
nextLabel: "Declarative Programming"
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

**state** - it’s basically information about something held in memory — which should sound a lot like variables

## Reactive Programming