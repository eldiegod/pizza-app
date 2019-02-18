import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { observer } from 'mobx-react-lite'

import { useStore } from '../hooks/storeHook'

import Fallback from './Fallback'

const GET_PIZZAS = gql`
  {
    pizzaSizes {
      name
      maxToppings
      toppings {
        topping {
          name
          price
        }
        defaultSelected
      }
      basePrice
    }
  }
`
const PizzaForm = observer(() => {
  const { data, error, loading } = useQuery(GET_PIZZAS)
  const store = useStore()
  if (loading) return <Fallback />
  if (error) return 'Something went wrong while loading the pizzas, please refresh the page.'
  console.log(data)
  // console.log(data.pizzaSizes[0].toppings)
  const setPizza = e => {
    const pizza = data.pizzaSizes.find(p => p.name === e.target.value)
    store.pizzaForm.setPizza(pizza)
  }
  return (
    <div>
      <h2>Make your own pizza!</h2>
      <div>
        Choose a{' '}
        <span role="img" aria-label="Pizza Emoji">
          🍕
        </span>{' '}
        size:
      </div>
      <div>
        {data.pizzaSizes.map(p => (
          <div key={p.name}>
            <input onChange={setPizza} type="radio" name="pizza size" value={p.name} />
            {p.name} +{p.basePrice}$
          </div>
        ))}
      </div>
      <div>
        Choose your favourite toppings{' '}
        <span role="img" aria-label="Pepper Emoji">
          🌶:
        </span>
      </div>
      <div>
        <input
          disabled
          type="checkbox"
          onClick={e => {
            e.preventDefault()
            window.alert('Please choose a real topping 🙃')
          }}
          value="pinapple"
        />
        <span style={{ textDecoration: 'line-through' }}>pinnaple + 0.95$</span>
        {data.pizzaSizes[0].toppings.map(t => (
          <div key={t.topping.name}>
            <input
              onChange={e => {
                if (e.target.checked) {
                  store.pizzaForm.addTopping({
                    name: t.topping.name,
                    price: t.topping.price,
                    defaultSelected: t.defaultSelected,
                  })
                } else {
                  store.pizzaForm.removeTopping({
                    name: t.topping.name,
                    price: t.topping.price,
                    defaultSelected: t.defaultSelected,
                  })
                }
              }}
              type="checkbox"
              value={t.topping.name}
              // checked={t.defaultSelected}
            />
            <span>{`${t.topping.name} +${t.topping.price}$`}</span>
          </div>
        ))}
      </div>
      <div>
        Quantity:
        <input type="number" min="1" step="1" style={{ marginLeft: '5px', width: '4ch' }} />
      </div>
      <div>Total: {store.pizzaForm.totalPrice}$</div>
      <br />
      <div>
        <button>
          Add to Cart{' '}
          <span role="img" aria-label="Cart Emoji">
            🛒
          </span>
        </button>
      </div>
    </div>
  )
})

export default PizzaForm
