import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./Pages/Home.jsx"
import Hotels from './Pages/Hotels';
import List from './Pages/List';
import Hotel from './Pages/Hotel';
import Featured from './Components/Featured';
import Login from './Pages/Login';
import Register from './Pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/Featured" element={<Featured />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/hotels/list" element={<List />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
