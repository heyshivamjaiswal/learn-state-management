# 🛒 Zustand Cart App — Explained Like You’re 10

This project is a small Cart app built using **React + Zustand**.

---

# 🧠 First: What problem are we solving?

In normal React:

- State lives in parent
- You pass it down via props
- If app grows → **prop drilling hell**

Zustand solves this by giving us:

> 🧠 A **global memory** for the whole app

Any component can:
- Read data
- Change data  
Without passing props.

---

# 🏪 Think of Zustand like a Shop Register

Imagine:

- There is ONE big register in the shop (the store)
- Anyone can:
  - Put item in it
  - Remove item from it
  - Read what’s inside it

That register = **Zustand store**

---

# 📦 Creating the Store (cart-store.js)

```js
import { create } from "zustand";

export const useCart = create((set) => ({
  cart: [],

  addToCart: (product) =>
    set((state) => ({
      cart: [...state.cart, product],
    })),

  removeFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),

  clearCart: () => set({ cart: [] }),
}));
```

---
### 🧠 What is create?
```
create((set) => ({ ... }))
```

Think of it like:

- “Hey Zustand, create a global brain. Here is:

- My data

- My functions to change that data”

- Everything inside create is:

🧠 State (data)

🎮 Actions (functions to change data)

*** 🧠 What is set?

Zustand gives us set.

set is like React’s setState, but for global state. ***

❗ You can NEVER change state directly. You must use set.


### 🧱 Two ways to use set
1️⃣ When new value depends on old value
```
addToCart: (product) =>
  set((state) => ({
    cart: [...state.cart, product],
  }))
```
Here:

*** We NEED old state.cart

So Zustand gives us state ***


2️⃣ When new value does NOT depend on old value
```
clearCart: () => set({ cart: [] })
```

Here:

We already know final answer = empty array

So we don’t need state

```
🛍️ ProductList Component
import { useCart } from "./store/cart-store";

function ProductList({ products }) {
  const addToCart = useCart((state) => state.addToCart);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <button onClick={() => addToCart(product)}>
            Add to cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
```

#### 🧠 What is happening here?
```
const addToCart = useCart((state) => state.addToCart);
```

Means:

“From global store, give me only the addToCart function”


##### 🧠 This line is VERY important:

```
onClick={() => addToCart(product)}
```

Why not:
```
onClick={addToCart(product)} ❌
```
Because:

onClick needs a function

addToCart(product) CALLS the function immediately

Correct rule:

If function needs argument → wrap it in arrow function

```
🧺 Cart Component
import { useCart } from "./store/cart-store";

function Cart() {
  const cart = useCart((state) => state.cart);
  const removeFromCart = useCart((state) => state.removeFromCart);
  const clearCart = useCart((state) => state.clearCart);

  return (
    <div>
      <h2>Cart</h2>

      {cart.map((product) => (
        <div key={product.id}>
          <span>{product.name}</span>
          <button onClick={() => removeFromCart(product.id)}>
            Remove
          </button>
        </div>
      ))}

      {cart.length > 0 && (
        <button onClick={clearCart}>Clear Cart</button>
      )}
    </div>
  );
}

export default Cart;

```
🧠 BIG QUESTION: Cart never created product. How does it know product.id?

Because:

ProductList added the whole product object to store

Store saved it in cart

Cart reads cart from store

Flow:
```
PRODUCTS
   ↓
product object
   ↓
addToCart(product)
   ↓
Zustand store cart = [ product ]
   ↓
Cart reads cart
   ↓
cart.map(product => product.id)

🧠 Cart does not create data. It only CONSUMES data.
🧠 Why sometimes we write:
onClick={clearCart}
```

But sometimes:
```
onClick={() => removeFromCart(product.id)}
```

Rule:

Case	What to write
Function needs NO argument 	onClick={clearCart}
Function needs argument	onClick={() => removeFromCart(id)}
🧠 Why not always use arrow?

You can, but:

onClick={clearCart}


Is shorter and cleaner when no arguments are needed.

##### 🧠 How one state uses another state’s data?

Actually:

Components don’t talk to each other.
They talk to the store.

So:

ProductList puts data in store

Cart reads data from store

They never directly connect

Like:

Both are using the same global cupboard










































