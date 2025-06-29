
//Importiamo il contesto 
import { createContext, useState } from "react";

//Definiamo il Global Context
const GlobalContext = createContext()
// Esporto anche il contesto così puoi usarlo con useContext
export { GlobalContext };

//Importo Custom Hook
import useFetch from "../hooks/useFetch";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// Funzione da rendere disponibile in tutto il codice
export default function GlobalProvider({ children }) {
    //QUA PASSIAMO COSA CI SERVE E POI LO PASSEREMO CON IL VALUE

    const {
        // Per chiamata HOMEPAGE filtro PER TITLE E CATEGORIA 
        recordData, fetchRecord,

        // Per ricavarmi tutti i record per prendere solo le categorie
        dataCategory, fetchRecordCategory,

        //Per mostrare la lista e non 
        setShowList, showList,

        //Funzione per fare chiamata in Parallelo
        fetchParallelProduct,

        //Arr dove all interno avremmo tutti i prodotti che abbiamo selezionato per il confroto con la sua funzione di aggiornamento
        arrObjCompleto, setArrObjCompleto,

        //Per pagina PRODOTTI smartphone filtro PER TITLE E CATEGORIA 
        fetchRecordSmartphone, dataSmartphone,

        // Per Pagina di dettaglio di un singolo prodotto
        smartphoneDetail, phoneDetail


    } = useFetch(import.meta.env.VITE_API_URL)


    //////////////////////////////////////////////////////////////////////////////////
    //GESTIONE DELLA WISHLIST
    //stato per dati per conservare oggetto nella wishlist []
    const [wishlist, setWishlist] = useState([])

    const navigate = useNavigate(); // Hook per navigazione programmatica

    //Funzione addToWishlist()
    function addToWishlist(prodId) {

        //verifico se nella wishlist contiene gia lo stesso prodotto
        const verificoProd = wishlist.some(item => item.id === prodId.id)

        //se non lo contiene lo aggiungo altrimenti alert
        if (!verificoProd) {
            setWishlist(prev => [...prev, prodId])
            toast.success(
                <span>
                    Prodotto aggiunto alla wishlist: {wishlist.length + 1}
                    <button
                        style={{
                            color: "white",
                            textDecoration: "none",
                            backgroundColor: " #fc6d39",
                            border: "none",
                            cursor: "pointer",
                            padding: "7px 15px",
                            font: "inherit",
                            marginTop: "10px",

                            borderRadius: "20px"

                        }}
                        onClick={() => navigate("/wishlist")}
                    >
                        Vai alla wishlist
                    </button>
                </span>
            );
        } else {
            toast.error("Hai aggiunto lo stesso prodotto alla wishlist");
        }
    }

    //Funzione removeToWishlist()
    function removeToWishlist(prod){
        //se l oggetto dentro wishlist e diverso dal prod.id (true conserva ) altrimenti se so uguali (false scarta)
        const rimuovoProd = wishlist.filter(item => item.id !== prod.id)
        setWishlist(rimuovoProd)
    }





    return (
        <GlobalContext.Provider value={{
            fetchRecord, recordData,
            dataCategory, fetchRecordCategory,
            showList, setShowList,
            fetchParallelProduct,
            arrObjCompleto, setArrObjCompleto,

            fetchRecordSmartphone, dataSmartphone,
            smartphoneDetail, phoneDetail,

            //wishlist value con anche la funzione addToWishlist
            wishlist, setWishlist, addToWishlist,removeToWishlist
        }}>
            {children}
        </GlobalContext.Provider>
    )
}


