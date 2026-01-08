import { PRODUCTS } from './product'
import ProductList from './ProductList'
import Cart from './Cart'

function App() {
  return (
    <div>
      <h3>Welcome to the store</h3>
      <ProductList products={PRODUCTS} />
      <Cart/>
    </div>
  )
}

export default App
