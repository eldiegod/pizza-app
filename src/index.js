import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'

import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo-hooks'

import Fallback from './components/Fallback'
import App from './components/App'

const client = new ApolloClient({
  uri: 'https://core-graphql.dev.waldo.photos/pizza',
})

const render = Component => {
  return ReactDOM.render(
    <Suspense fallback={<Fallback />}>
      <ApolloProvider client={client}>
        <Component />
      </ApolloProvider>
    </Suspense>,
    document.getElementById('root'),
  )
}

render(App)

// Hot reloading
if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default
    render(NextApp)
  })
}
