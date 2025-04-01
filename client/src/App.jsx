import './App.css'
import React from "react";
import Efficiency from './components/Efficiency'
import Footer from './components/Footer'
import Header from './components/Header'
import Introduction from './components/Introduction'
import RunSort from './components/RunSort';

function App() {

  return (
    <>
    <Header />
      <Introduction></Introduction>
      <Efficiency></Efficiency>
      <RunSort></RunSort>
      <Footer></Footer>
    </>
  )
}

export default App
