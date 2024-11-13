import { BrowserRouter } from 'react-router-dom'
import BookRouter from './router/BookRouter'

function App() {

  return (
    <>
      <BrowserRouter>
          <BookRouter/>
      </BrowserRouter>
    </>
  )
}

export default App
