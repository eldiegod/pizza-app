import React from 'react'

import PizzaForm from './PizzaForm'
import Cart from './Cart'

const App = () => {
  return (
    <div style={{ fontFamily: 'PT Sans' }}>
      <h1>Pizza App</h1>
      <PizzaForm />
      <Cart />
    </div>
  )
}

export default App
