import React from 'react'
import { observer } from 'mobx-react-lite'
import { useStore } from '../hooks/storeHook'

const Cart = observer(() => {
  const store = useStore()
  if (store.cartStore.isEmpty) return null
  return (
    <div>
      <h2>Your pies:</h2>
      <div>
        {/* pizzas */}
        {store.cartStore.cart.map((pizzaOrder, index) => (
          <div key={index}>
            {/* What to use for key? */}
            {pizzaOrder.size} pizza
            <small>
              {Array.from(pizzaOrder.toppings.values()).reduce((acc, t) => acc + ' - ' + t.name, '')}
            </small>
            {' - ' + pizzaOrder.totalPrice.toFixed(2)}$
            <button onClick={() => store.removerItemFromCart(index)}>
              <small> remove </small>
              <span role="img" aria-label="Bin Emoji">
                {' '}
                🗑{' '}
              </span>
            </button>
          </div>
        ))}
      </div>
      <div>
        <b>total:</b> {store.cartStore.total.toFixed(2)}$
      </div>
      <button onClick={store.checkout}>Checkout</button>
    </div>
  )
})

export default Cart
