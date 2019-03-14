import React, { useState } from 'react'
import { useStore } from '../../hooks/storeHook'

const Toppings = ({ toppings }) => {
  const store = useStore()
  const [isPinnapleToppingDisabled, setIsPinnapleToppingDisabled] = useState(false)

  const toggleTopping = _topping => e => {
    const topping = {
      name: _topping.topping.name,
      price: _topping.topping.price,
      defaultSelected: _topping.defaultSelected
    }
    if (e.target.checked) {
      store.pizzaForm.addTopping(topping)
    } else {
      store.pizzaForm.removeTopping(topping)
    }
  }
  return (
    <div>
      <div>
        Choose your favourite toppings{' '}
        <span role="img" aria-label="Pepper Emoji">
          🌶:
        </span>
      </div>
      <input
        disabled={isPinnapleToppingDisabled}
        type="checkbox"
        onClick={e => {
          e.preventDefault()
          setIsPinnapleToppingDisabled(true)
          window.alert('Please choose a real topping 🙃')
        }}
        value="pinapple"
      />
      <span style={{ textDecoration: isPinnapleToppingDisabled ? 'line-through' : 'none' }}>
        pinnaple + 0.95$
      </span>
      {toppings.map(t => (
        <div key={t.topping.name}>
          <input
            disabled={store.pizzaForm.isToppingDisabled(t.topping.name)}
            onChange={toggleTopping(t)}
            type="checkbox"
            value={t.topping.name}
            checked={store.pizzaForm.toppings.has(t.topping.name)}
          />
          <span
            style={{
              textDecoration: store.pizzaForm.isToppingDisabled(t.topping.name) ? 'line-through' : 'none'
            }}
          >{`${t.topping.name} +${t.topping.price}$`}</span>
        </div>
      ))}
    </div>
  )
}

export default Toppings
