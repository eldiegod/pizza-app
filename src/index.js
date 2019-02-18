import React from 'react'
import ReactDOM from 'react-dom'
import { onSnapshot } from 'mobx-state-tree'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo-hooks'

import App from './components/App'

import { Provider } from './hooks/storeHook'
import { RootStore } from './rootStore'

const initialSnapshot = {
  pizzaForm: {
    size: '',
    maxToppings: 0,
    basePrice: 0,
  },
  cartStore: { cart: [] },
}
const storeInstance = RootStore.create(initialSnapshot)
// logs every state update for debug
onSnapshot(storeInstance, newSnapshot => {
  console.dir(newSnapshot)
})

const client = new ApolloClient({
  uri: 'https://core-graphql.dev.waldo.photos/pizza',
  fetchOptions: {
    headers: { 'Access-Control-Allow-Origin': '*' },
  },
})

const render = Component => {
  return ReactDOM.render(
    <Provider store={storeInstance}>
      <ApolloProvider client={client}>
        <Component />
      </ApolloProvider>
    </Provider>,
    document.getElementById('root'),
  )
}

render(App)

// Component Hot reloading
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(NextApp)
  })
}
