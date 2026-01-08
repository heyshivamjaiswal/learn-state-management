import { useCart } from "./store/cart-store";

function ProductList({products}){
  const addToCart = useCart((state)=>state.addToCart);
    return (
        <div>
        {products?.map((product)=>(
          <div key={product.id}>
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <button onClick={()=>addToCart(product)}>Add to cart</button>
          </div>
        ))}
        </div>
    );
}

export default ProductList;