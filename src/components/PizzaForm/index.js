import React, { useState } from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'
import { observer } from 'mobx-react-lite'
import { useStore } from '../../hooks/storeHook'

import Fallback from '../Fallback'
import Toppings from './Toppings'

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
  const [pizzaSizeIndex, setPizzaSizeIndex] = useState()

  const setPizza = e => {
    const index = data.pizzaSizes.findIndex(p => p.name === e.target.value)
    setPizzaSizeIndex(index)
    const pizza = data.pizzaSizes[index]
    store.pizzaForm.setPizza(pizza)
  }
  if (loading) return <Fallback />
  if (error) return 'Something went wrong while loading the pizzas, please refresh the page.'
  console.log(data)
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
      {pizzaSizeIndex && (
        <>
          <Toppings toppings={data.pizzaSizes[pizzaSizeIndex].toppings} />
          <div>Total: {store.pizzaForm.totalPrice.toFixed(2)}$</div>
          <br />
          <div>
            <button onClick={store.addToCart}>
              Add to Cart{' '}
              <span role="img" aria-label="Cart Emoji">
                🛒
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  )
})

export default PizzaForm
