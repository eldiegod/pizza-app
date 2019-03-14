import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'
import React from 'react'
import { render, fireEvent } from 'react-testing-library'

import PizzaForm from './index'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo-hooks'
import { Provider } from '../../hooks/storeHook'
import { storeInstance } from '../../rootStore'

const client = new ApolloClient({
  uri: 'https://core-graphql.dev.waldo.photos/pizza'
})

describe('Testing PizzaForm Component', () => {
  const { container, debug, getByText } = render(
    <Provider store={storeInstance}>
      <ApolloProvider client={client}>
        <PizzaForm />
      </ApolloProvider>
    </Provider>
  )
  it('should render fallback component while the pizzas are loading', () => {
    // debug(container)
    getByText(/heating ovens/i)
  })
  // it('should render toppings when a pizza size is selected', () => {})
})
