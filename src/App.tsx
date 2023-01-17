import React from 'react'
import 'styles/app.scss'
import { Container, Footer, Header, Layout } from './components/Layout'
import { Todo } from './components/Todo'

function App() {
  return (
    <Layout>
      <Header />
      <Container>
        <Todo />
      </Container>
      <Footer />
    </Layout>
  )
}

export default App
