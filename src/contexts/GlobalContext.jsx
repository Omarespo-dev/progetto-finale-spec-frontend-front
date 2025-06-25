
//Importiamo il contesto 
import { createContext } from "react";

//Definiamo il Global Context
const GlobalContext = createContext()
// Esporto anche il contesto così puoi usarlo con useContext
export { GlobalContext };

//Importo Custom Hook
import useFetch from "../hooks/useFetch";

// Funzione da rendere disponibile in tutto il codice
export default function GlobalProvider({ children }) {
    //QUA PASSIAMO COSA CI SERVE E POI LO PASSEREMO CON IL VALUE

    const { 
        // Per chiamata filtro e categoria
        recordData, fetchRecord,

        // Per ricavarmi tutti i record per prendere solo le categorie
        dataCategory, fetchRecordCategory,

        //Per mostrare la lista e non 
        setShowList, showList,

        //Per chiamata parallelo per ricavare obj dall id
        fetchParallelProduct,datiObj } = useFetch(import.meta.env.VITE_API_URL)


    return (
        <GlobalContext.Provider value={{
            fetchRecord, recordData,
            dataCategory, fetchRecordCategory,
            showList, setShowList,
            fetchParallelProduct,datiObj
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


