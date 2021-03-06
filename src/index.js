import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo-hooks'

import App from './components/App'

import { Provider } from './hooks/storeHook'
import storeInstance from './rootStore'

const client = new ApolloClient({
  uri: 'https://core-graphql.dev.waldo.photos/pizza'
})

const render = Component => {
  return ReactDOM.render(
    <Provider store={storeInstance}>
      <ApolloProvider client={client}>
        <Component />
      </ApolloProvider>
    </Provider>,
    document.getElementById('root')
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
