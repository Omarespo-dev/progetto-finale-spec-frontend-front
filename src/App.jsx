//Importo react router Per gestire la SPA 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importo componenti layout HEADER
import NavbarWithResponsive from './components/Layouts/NavbarWithResponsive';

//IMPORTO FILE DATA CON ROTTE
import routes from '../data/routingCostant';
import Footer from './components/Layouts/Homepage/Footer/Footer';


function App() {


  return (
    <BrowserRouter>

      {/* Navbar completa anche con responsive */}
      <NavbarWithResponsive />

      <Routes>

        {/* faccio map cosi mi ricavo ogni rotta */}
        {routes.map(rotta => (
          <Route path={rotta.path} element={<rotta.component />} />
        ))}

      </Routes>

      {/* Footer */}
      <Footer />
    </BrowserRouter>
  )
}

export default App
