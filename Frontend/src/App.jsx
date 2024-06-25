import './App.css'
import { Routes, Route } from 'react-router-dom'
import Login from './pages/Login';
import ListarMascotas from './pages/ListarMascotas';
import AnadirMascotas from './pages/AnadirMascotas';
import ConsultarMascotas from './pages/ConsultarMascotas';
import EditarMascotas from './pages/EditarMascotas';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/ListarMascotas' element={<PrivateRoute><ListarMascotas /></PrivateRoute>} />
      <Route path='/AnadirMascotas' element={<PrivateRoute><AnadirMascotas /></PrivateRoute>} />
      <Route path='/ConsultarMascotas/:id' element={<PrivateRoute><ConsultarMascotas /></PrivateRoute>} />
      <Route path='/EditarMascotas/:id' element={<PrivateRoute><EditarMascotas /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
