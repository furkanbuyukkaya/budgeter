# What is this project?

> This is a React Native Expo app that lets you keep track of your expenses.

## What is in it?

- Platform specific approach
- Local & backend storage
- Various navigators
- Reusable components

### How to use

- go to ...\budgeter\utils\http.js
- There, you will see a `BACKEND_URL`
- Change it with a Firebase database link
- That's it, you can now use both offline and online data

```js
const BACKEND_URL = "https://something.firebaseio.com/";
```

**Note:** you may also wanna implement localStorage.
