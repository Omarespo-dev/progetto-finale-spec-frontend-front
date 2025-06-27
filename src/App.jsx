//Importo react router Per gestire la SPA 
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//importo componenti layout HEADER
import NavbarWithResponsive from './components/Layouts/Homepage/NavbarWithResponsive';

//IMPORTO FILE DATA CON ROTTE
import routes from '../data/routingCostant';
import Footer from './components/Layouts/Homepage/Footer/Footer';

//Importo il GlobalProvider cosi da rendere disponibili i dati in tutti i suoi componenti figli
import GlobalProvider from './contexts/GlobalContext';


//Importo alert da libreria
import { Slide, ToastContainer } from 'react-toastify';


function App() {


  return (<>
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Slide}
    />

    <GlobalProvider>
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
    </GlobalProvider>

  </>

  )
}

export default App
