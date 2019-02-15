import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from 'react-apollo-hooks'

import Fallback from './Fallback'
import { strikethrough, underline } from 'ansi-colors'

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
const PizzaForm = () => {
  const { data, error, loading } = useQuery(GET_PIZZAS)
  if (loading) return <Fallback />
  if (error) return 'error'
  console.log(data)
  console.log(data.pizzaSizes[0].toppings)
  return (
    <div>
      <h2>Make your own pizza!</h2>
      {/* Todo: make this a component} */}
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
            <input type="radio" name="pizza size" value={p.name} />
            {p.name + ' '}
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
        <span style={{ textDecoration: 'line-through' }}>pinnaple - 0.95$</span>
        {data.pizzaSizes[0].toppings.map(t => (
          <div key={t.topping.name}>
            <input type="checkbox" value={t.topping.name} checked={t.defaultSelected} />
            <span>{`${t.topping.name} - ${t.topping.price}$`}</span>
          </div>
        ))}
      </div>
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
}

export default PizzaForm
