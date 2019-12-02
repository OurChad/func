---
title: "What is functional programming?"
date: "2019-10-31"
next: "declarative-programming"
nextLabel: "Declarative Programming"
previous: ""
previousLabel: ""
---

Functional programming is the process of building software by **composing pure functions**, avoiding **shared state, mutable data, and side-effects**.

## Composing pure functions
 Function composition is the process of **combining** two or more functions in order to produce a new function or perform some computation. 
 
 ```js
const double = x => x * 2
const plusOne = x => x + 1

const doubleOfThreePlusOne = plusOne(double(3))
// 7
```
 
## Pure Functions

Having in mind that functions are a process that receives some inputs and produces some output a pure function will, **given the same input, always return the same output and doesn't produce any side-effect.**

A pure function produces no side effects, which means that it can’t alter any external state. 

### What makes a function impure? (Side-effects)
Anything that can **make the result** of the function **inconsistent**.
- Shared state (If you’re unfamiliar with the term state, it’s basically information about something held in memory — which should sound a lot like variables)
- Mutable data

```js
const selectedCoverages = []
const coverage1 = {
    label: 'Coverage 1',
    selected: true,
    terms: []
}
const term1 = { label: 'Term 1' }

const addNewCoverage = coverage => {
    selectedCoverages.push(coverage)
}

const addTerm = (coverage, term) => {
    coverage.terms.push(term)
}

addTerm(coverage1, term1)
addNewCoverage(coverage1)

// Now we have a coverage that's not selected living in the array of selected coverages
coverage1.selected = false
// Now the array of terms on the coverage just have a undefined value
term1 = undefined
```
Lets look at the same example using Pure functions
```js
const selectedCoverages = []
const coverage1 = {
    label: 'Coverage 1',
    selected: true,
    terms: []
}
const term1 = { label: 'Term 1' }

const addNewCoverage = coverage => [...selectedCoverages, coverage]

const addTerm = (coverage, term) => ({
    ...coverage,
    terms
})
{
    coverage.term.push(term)
}

const coverage1WithTerm = addTerm(coverage1, term1)
const selectedCoveragesWithNewCoverage = addNewCoverage(coverage1WithTerm)

// or even

const selectedCoveragesWithNewCoverage = addNewCoverage(addTerm(coverage1, term1))

```
