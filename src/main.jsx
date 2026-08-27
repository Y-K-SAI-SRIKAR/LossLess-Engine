import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom' 
import App from './App.jsx'
import './index.css'
import Model from './pages/model.jsx'
import Evaluate from './pages/evaluate.jsx'
import BenchMark from './pages/benchmark.jsx'
import Developer from './pages/developer.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/evaluate" element={<Evaluate />} />
      <Route path="/benchmark" element={<BenchMark />} />
      <Route path="/model" element={<Model />} />
      <Route path="/developer" element={<Developer />} />
    </Routes>
  </BrowserRouter>
)