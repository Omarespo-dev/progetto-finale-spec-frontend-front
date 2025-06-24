//Importo react router Per gestire la SPA 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importo componenti layout HEADER
import NavbarWithResponsive from './components/Home/NavbarWithResponsive';

//IMPORTO FILE DATA CON ROTTE
import routes from '../data/routingCostant';


function App() {


  return (
    <BrowserRouter>
      <NavbarWithResponsive />
      <Routes>
        
        {/* faccio map cosi mi ricavo ogni rotta */}
        {routes.map(rotta => (
          <Route path={rotta.path} element={<rotta.component />} />
        ))}

      </Routes>
    </BrowserRouter>
  )
}

export default App
