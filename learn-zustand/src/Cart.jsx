import { useCart } from "./store/cart-store";

function Cart() {
 const cart = useCart((s)=>s.cart);
 const removeFromCart = useCart((s)=>s.removeFromCart);
 const clearCart = useCart((s)=>s.clearCart);

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
