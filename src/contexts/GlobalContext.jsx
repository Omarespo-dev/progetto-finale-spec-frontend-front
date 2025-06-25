
//Importiamo il contesto 
import { createContext } from "react";

//Definiamo il Global Context
const GlobalContext = createContext()
// Esporto anche il contesto così puoi usarlo con useContext
export { GlobalContext };


// Funzione da rendere disponibile in tutto il codice
export default function GlobalProvider({ children }){
    //QUA PASSIAMO COSA CI SERVE E POI LO PASSEREMO CON IL VALUE

    return(
        <GlobalContext.Provider>
            {children}
        </GlobalContext.Provider>
    )
}


