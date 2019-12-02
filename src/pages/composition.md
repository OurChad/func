---
title: "Composing behaviours"
date: "2019-10-31"
next: "summary"
nextLabel: "Summary"
previous: "declarative-programming"
previousLabel: "Declarative Programming"
---

As discussed so far, composition is a major part of functional programming. In the below example we'll look at a simple To Do List application that is composed in such a way that the React components have no knowledge of the state management library and instead **declare** their usage of state.

## Redux / Context API Example

### actions.js

Here we declare the actions that will be dispatched for the state updates. The same actions are used for the Redux store as well as the Context API store.

```js
export const SET_TODO_ITEM_DONE = 'SET_TODO_ITEM_DONE';
export const DELETE_TODO_ITEM = 'DELETE_TODO_ITEM';
export const ADD_TODO_ITEM = 'ADD_TODO_ITEM';

export const addTodoItem = (todoItem) => ({
  type: ADD_TODO_ITEM,
  payload: todoItem
});

export const setTodoItemDone = (id, done) => ({
  type: SET_TODO_ITEM_DONE,
  payload: { id, done }
});

export const deleteTodoItem = (id) => ({
  type: DELETE_TODO_ITEM,
  payload: id
});
```

### reducer.js

Here we declare the reducer for updating state. Similar to the actions, we use the same reducer for both Redux and Context API. This is because both patterns are based on Facebook's Flux architecture.

```js
import {
  DELETE_TODO_ITEM,
  SET_TODO_ITEM_DONE,
  ADD_TODO_ITEM
} from "./todoItemsActions";

export const INITIAL_STATE = [];

export const todoItemsReducer = (state = [], { type, payload }) => {
  switch (type) {
    case ADD_TODO_ITEM:
      return [...state, payload];
    case SET_TODO_ITEM_DONE:
      return state.map((todoItem) => {
        if (todoItem.id === payload.id) {
          return { ...todoItem, done: payload.done };
        }
        return todoItem;
      });
    case DELETE_TODO_ITEM: {
      return state.filter((todoItem) => todoItem.id !== payload);
    }
    default:
      return state;
  }
};
```

### ToDoItemsProvider.js

Both Redux and Context API use a "Provider" to wrap your application to give it access to the store. We can export a provider wrapper for both options here and use them at the root of our application.

```jsx
import * as React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { INITIAL_STATE, todoItemsReducer } from './todoItemsReducer';

export const TodoItemsStateContext = React.createContext(INITIAL_STATE);
export const TodoItemsDispatchContext = React.createContext();

export const TodoItemsProvider  = ({ children }) => {
  const [state, dispatch] = React.useReducer(todoItemsReducer, INITIAL_STATE);

  return (
    <TodoItemsDispatchContext.Provider value={dispatch}>
      <TodoItemsStateContext.Provider value={state}>
        {children}
      </TodoItemsStateContext.Provider>
    </TodoItemsDispatchContext.Provider>
  );
};

export const ToDoItemsReduxProvider  = ({ children }) => {
  const store = createStore(todoItemsReducer, INITIAL_STATE, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

  return (
    <Provider store={store}>
        {children}
    </Provider>
  );
};
```

### useToDoItems.js

In order for our components to access and update the store it will need the state and a dispatch callback for actions. We can write a custom hook that can be used by our React components to provide these instances.

In the case of the Context API we access state and dispatch from the `useReducer` hook output defined in the above `ToDoItemsProvider.js`.

For Redux we use the new `useSelector` and `useDispatch` hooks provided by `react-redux`.

```js
import { useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  TodoItemsDispatchContext,
  TodoItemsStateContext
} from './TodoItemsProvider';

export const useTodoItems = () => {
  const state = useContext(TodoItemsStateContext);
  const dispatch = useContext(TodoItemsDispatchContext);
  return [state, dispatch];
};

export const useTodoItemsRedux = () => {
  const state = useSelector(state => state);
  const dispatch = useDispatch();
  return [state, dispatch];
};
```

### app.js

Here we wrap our components in the specific providers. Both components render the same children i.e. `ToDoItems` which will use our custom `useToDoItems` hook to access the store.

```jsx
import * as React from 'react';
import { TodoItemsProvider, ToDoItemsReduxProvider, useTodoItems, useTodoItemsRedux } from './hooks/useTodoItems';
import { TodoItems } from './TodoItems';

const App = () => (
  <>
    <ContextAPIComponent />
    <ReduxComponent />
  </>
);

const ContextAPIComponent = () => (
  <TodoItemsProvider>
    <h1>Context API</h1>
    <TodoItems useTodoItems={useTodoItems}/>
  </TodoItemsProvider>
);

export const ReduxComponent = () => (
  <ToDoItemsReduxProvider>
    <h1>Redux</h1>
    <TodoItems useTodoItems={useTodoItemsRedux} />
  </ToDoItemsReduxProvider>
);

export default App;
```

### todoItems.js

Finally  we have our TodoItems component. Instead of "connecting" this component to the Redux store or applying the "context" as we could do with the Context API, we have abstracted the state layer away from this components definition. Instead we have composed the component as a pure function that receives our `useTodoItems` custom hook in order to access state and dispatch.

We are **declaring that we want to use To Do Items** in this function but **the function does not care *how* we get the To Do Items**.

```jsx
export const TodoItems = ({ useTodoItems }) => {
  const [todoItems, dispatch] = useTodoItems();

  const onChange = React.useCallback((id, done) => {
    dispatch(setTodoItemDone(id, done));
  }, [dispatch]);

  const onDelete = React.useCallback((id) => {
    dispatch(deleteTodoItem(id));
  }, [dispatch]);

  return (
    <div>
      {todoItems.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          onChange={onChange}
          onDelete={onDelete}
          todoItem={todoItem}
        />
      ))}
    </div>
  );
};
```