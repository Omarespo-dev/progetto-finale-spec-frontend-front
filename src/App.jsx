//Importo react router Per gestire la SPA 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Importo Page
import Homepage from "./pages/Homepage"

//importo componenti layout
import NavbarWithResponsive from './components/Home/NavbarWithResponsive';

function App() {


  return (
    <BrowserRouter>
    <NavbarWithResponsive />
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
