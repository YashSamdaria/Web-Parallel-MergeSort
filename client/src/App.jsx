import './App.css'
import Demo from './components/Demo'
import Efficiency from './components/Efficiency'
import Footer from './components/Footer'
import Header from './components/Header'
import Introduction from './components/Introduction'

function App() {

  return (
    <>
    <Header />
      <Introduction></Introduction>
      <Efficiency></Efficiency>
      <Demo></Demo>
      <Footer></Footer>
    </>
  )
}

export default App
