import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import ListarMascotas from './pages/ListarMascotas';
import AnadirMascotas from './pages/AnadirMascotas';
import ConsultarMascotas from './pages/ConsultarMascotas';
import EditarMascotas from './pages/EditarMascotas';


function App() {

  return (
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/ListarMascotas' element={<ListarMascotas/>}/>
    <Route path='/AnadirMascotas' element={<AnadirMascotas/>}/>
    <Route path='/ConsultarMascotas/:id' element={<ConsultarMascotas/>}/>
    <Route path='/EditarMascotas/:id' element={<EditarMascotas/>}/>
  </Routes>
  )
}

export default App
