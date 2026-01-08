# First: What problem does Redux solve?

---

#### In React:

Each component has its own state

Passing data from parent → child → grandchild → great-grandchild is painful

This problem is called prop drilling

Example Problem


#### 📂 Folder Structure

```
App
 └── Navbar
      └── ProfileMenu
           └── Avatar
                └── UserName

```

---


If UserName needs user data, you must pass props through every level 

## Redux Idea (In One Line)

Keep shared data in one central place, and let any component access it directly.

That central place is called the Store.
```
🏗️ Big Picture Architecture (Bird’s Eye View)
                ┌────────────────────┐
                │   Redux Store      │
                │  (Global State)    │
                └─────────▲──────────┘
                          │
                   updates│reads
                          │
        ┌─────────────────┴─────────────────┐
        │                                   │
  React Components                    React Components
 (useDispatch)                        (useSelector)
```

🧠 Important Terms (Must Understand)
🧱 State

#### State = The data of your application
```
{
  user: { ... },
  theme: "dark",
  cart: [ ... ]
}
```
#### Action

Action = An object that describes WHAT happened
```
{
  type: "user/login",
  payload: { ...userData }
}
```
#### Payload

Payload = The data sent with an action
```
payload = {
  fullName: "Amit Verma",
  age: 28
}
```
#### Reducer

Reducer = A function that decides HOW state changes

Rules:

❌ You do NOT change state directly

✅ You send an action

✅ Reducer calculates and returns new state
---

## Store

The Store is the single source of truth for your app’s data.

Think of it as:

* A database in memory
  
```
{
  user: {...},
  cart: {...},
  theme: {...}
}
```

There is only one store in a Redux app.
---

## Slice

A slice is one part of the state + its update logic.

Example:

👤 userSlice

🛒 cartSlice

🎨 themeSlice

Each slice:

* Owns its own data

* Owns its own reducers

## Reducer

Reducer is the only place where Redux allows state updates.

## Provider

Provider connects React and Redux

Without Provider:

❌ React cannot see Redux

With Provider:

✅ Any component can access Redux

## useSelector

useSelector is used to READ data from Redux store

## useDispatch

useDispatch is used to SEND actions to Redux store

```
📂 Project Structure
src/
 ├── main.jsx        # Provider setup
 ├── App.jsx         # React UI
 ├── store.js        # Redux store
 └── userSlice.js    # User slice
```
🧩 Example State: User Profile
```
{
  fullName: "Amit Verma",
  age: 28,
  location: "Bangalore",
  profession: "Frontend Developer"
}
```
🧩 userSlice.js
```
import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",

  initialState: {
    value: {
      fullName: "",
      age: 0,
      location: "",
      profession: ""
    }
  },

  reducers: {
    login: (state, action) => {
      state.value = action.payload;
    },

    logout: (state) => {
      state.value = {
        fullName: "",
        age: 0,
        location: "",
        profession: ""
      };
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
```

⚠️ About Mutation

This looks like mutation:

state.value = action.payload;


But:

Redux Toolkit uses Immer, so this is immutable and safe internally.

🏗️ store.js
```
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer
  }
});
```

```
📡 main.jsx
import { Provider } from "react-redux";
import { store } from "./store";

<Provider store={store}>
  <App />
</Provider>

```
```
🔍 Reading Data (useSelector)
import { useSelector } from "react-redux";

const user = useSelector((state) => state.user.value);
```

Meaning:
Store → user slice → value

```
✍️ Updating Data (useDispatch)
import { useDispatch } from "react-redux";
import { login } from "./userSlice";

const dispatch = useDispatch();

dispatch(
  login({
    fullName: "Amit Verma",
    age: 28,
    location: "Bangalore",
    profession: "Frontend Developer"
  })
);
```

```
🔁 Complete Data Flow
[ Button Click ]
       │
       ▼
 dispatch(action)
       │
       ▼
  Reducer runs
       │
       ▼
 Store updates
       │
       ▼
 UI re-renders

🧠 Full Architecture Diagram
┌──────────────┐
│ React UI     │
└───────┬──────┘
        │ dispatch(action)
        ▼
┌──────────────────────┐
│     Redux Store      │
│  ┌────────────────┐ │
│  │   userSlice    │ │
│  └────────────────┘ │
└─────────┬────────────┘
          │ useSelector
          ▼
┌──────────────┐
│ React UI     │
└──────────────┘

```


