
//Importiamo il contesto 
import { createContext } from "react";

//Definiamo il Global Context
const GlobalContext = createContext()
// Esporto anche il contesto così puoi usarlo con useContext
export { GlobalContext };

//Importo Custom Hook
import useFetch from "../hooks/useFetch";

// Funzione da rendere disponibile in tutto il codice
export default function GlobalProvider({ children }){
    //QUA PASSIAMO COSA CI SERVE E POI LO PASSEREMO CON IL VALUE

    const {fetchRecord,recordData ,dataCategory,fetchRecordCategory,setShowList,showList} = useFetch(import.meta.env.VITE_API_URL)


    return(
        <GlobalContext.Provider value={{fetchRecord,recordData,dataCategory,fetchRecordCategory,showList,setShowList}}>
            {children}
        </GlobalContext.Provider>
    )
}


