//importo css
import '../../../../style/SectionProductCompare.css'


//importo context e global per prendere i dati dal global
import { useContext, useEffect, useState, useMemo, useCallback } from 'react'
import { GlobalContext } from '../../../../contexts/GlobalContext'

//Importo Link per routing
import { Link, Navigate, useNavigate } from 'react-router-dom';

//IMPORTO TOAST ALERT
import { toast } from 'react-toastify';
import CardAllSmartphone from './CardAllSmartphone';


export default function SectionAllSmartphone() {

    //////////////// FUNZIONE LOGICA PER SMARTPHONE CARD ////////////////////////

    //Prendere i prodotti dai record la chiamata ai record sta in useFetch

    //dati Presi dal context
    const {

        // Per ricavarmi tutti i record per prendere solo le categorie
        dataCategory, fetchRecordCategory,

        //Per Pagina prodotti smartphone filtraggio TITLE E CATEGORY
        fetchRecordSmartphone, dataSmartphone,


        //Per chiamata parallelo per ricavare obj dall id
        fetchParallelProduct,

        //arr di oggetti per il confronto con la sua funzione di aggiornamento
        arrObjCompleto, setArrObjCompleto,


        //Per wishlist con funzione di aggiunta
        wishlist, addToWishlist


    } = useContext(GlobalContext)

    const navigate = useNavigate(); // Hook per navigazione programmatica

    //Function per aggiungere il prodotto al arrObjCompleto che include tutto 
    // Uso useCallback perché questa funzione viene passata a un componente figlio memoizzato con React.memo.
    // Senza useCallback, la funzione verrebbe ricreata a ogni render del genitore, causando il re-render inutile del figlio.
    // Con useCallback, la funzione mantiene la stessa referenza finché le sue dipendenze non cambiano, evitando re-render inutili del figlio memoizzato.
    
    const addProduct = useCallback((prod) => {

        // PRIMA controlla il limite se la sua length e maggiore di 2 dammi l alert e non farmi niente
        if (arrObjCompleto.length >= 3) {
            toast.error("Hai raggiunto il massimo nel Comparatore")
            return
        }

        //verifico se e gia prensente un oggetto con lo stesso id del prodotto
        const giaPresente = arrObjCompleto.some(item => item.id === prod.id)

        //se non e presente mi aggiorni setArrObjCompleto con al copia di arrObjCompleto e mi agigungi il prod passato come parametro alla funzione
        if (!giaPresente) {
            setArrObjCompleto([...arrObjCompleto, prod])
            toast.success(
                <span>
                    Prodotto aggiunto al comparatore: {arrObjCompleto.length + 1}
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
                        onClick={() => navigate("/compare")}
                    >
                        Vai al confronto
                    </button>
                </span>
            );
        } else {
            toast.error("Hai aggiunto lo stesso prodotto nel Comparatore");
        }
    }, [arrObjCompleto, setArrObjCompleto, navigate, toast]);

    /////////////////////////////////////////////////////////////////////////




    //////////////// FUNZIONE LOGICA PER INPUT SOPRA ////////////////////////

    //Gestione Stato per Input
    const [input, setInput] = useState("")
    //Gestione input category
    const [inputSelect, setInputSelect] = useState("")

    //Gestione ordina da A-Z e Z-A
    const [orderSelect, setOrderSelect] = useState("")


    //uso UseEffect per non fare chiamate illimitate inoltre mi deve rifare la funzione  anche quando cambia input e il selectInput
    useEffect(() => {
        fetchRecordSmartphone(input, inputSelect)
    }, [input, inputSelect])


    //Dati presi dalla chiamata in parallelo
    const [dataSmartphoneDetail, setDataSmartphoneDetail] = useState([])

    //mi deve far vedere i dati solo al montaggio del componente e al cambiamento di dataCategory
    useEffect(() => {
        fetchParallelProduct(dataSmartphone, setDataSmartphoneDetail)
    }, [dataSmartphone])


    // FACCIO IL FILTRAGGIO PER DATI CHE MI ARRIVANO PK IO VOGLIO CHE NEL CERCARE MI RITORNI GLI ELEMENTI ANCHE PER CATEGORIA
    //UseMemo per non rifare il calcolo costoso quindi per il filtaggio ma fammelo solo se una delle dipendenze cambia

    const filtraggioInputSelect = useMemo(() => {
        return dataSmartphoneDetail.filter(obj => {
            //Se il nome dell’elemento contiene il testo scritto dall’utente (ignorando maiuscole/spazi), 
            // allora tieni l’elemento — altrimenti scartalo.
            const filtro = obj.title.toLowerCase().includes(input.toLowerCase().trim())

            //filtro per categoria se input select e vuoto mi ritorni il filtro quindi tutti i prodotti
            if (inputSelect === "") {
                return filtro
            } else {
                // Categoria specifica: se obj.category e uguale all input select mi torni i prodotti selezionati per categoria && il filtro per ogni categoria
                return obj.category === inputSelect && filtro
            }

        })
    }, [dataSmartphoneDetail, input, inputSelect])



    // ORDINAMENTO: Prende l'array filtrato e lo ordina secondo la scelta dell'utente
    //UseMemo per non rifare il calcolo costoso quindi per l-ordinamento ma fammelo solo se una delle dipendenze cambia
    const orderAtoZ = useMemo(() => {
        return [...filtraggioInputSelect].sort((a, b) => {

            // CONTROLLO VUOTO: Se l'utente non ha scelto nessun ordinamento dal select
            if (orderSelect === "") {
                // NESSUN CAMBIAMENTO: return 0 = mantieni l'ordine originale dell'array
                return 0
            }

            // CASO A-Z: L'utente ha scelto ordinamento alfabetico crescente
            if (orderSelect === "a-z") {
                // CONFRONTO 1: Se il titolo di 'a' viene prima alfabeticamente di 'b' 
                if (a.title < b.title) return -1  // RISULTATO: metti 'a' PRIMA di 'b'
                // CONFRONTO 2: Se il titolo di 'a' viene dopo alfabeticamente di 'b'
                if (a.title > b.title) return 1   // RISULTATO: metti 'a' DOPO 'b'
                // UGUALI: Se i titoli sono identici, non cambiare posizione
                return 0
            }

            // CASO Z-A: L'utente ha scelto ordinamento alfabetico decrescente  
            if (orderSelect === "z-a") {
                // CONFRONTO INVERSO 1: Se 'a' è maggiore alfabeticamente di 'b'
                if (a.title > b.title) return -1  // RISULTATO: metti 'a' PRIMA (ordine decrescente)
                // CONFRONTO INVERSO 2: Se 'a' è minore alfabeticamente di 'b'
                if (a.title < b.title) return 1   // RISULTATO: metti 'a' DOPO (ordine decrescente)
                // UGUALI: Se i titoli sono identici, non cambiare posizione
                return 0
            }

            // FALLBACK: Se nessuna condizione precedente è soddisfatta
            return 0  // SICUREZZA: mantieni ordine originale

        })
    }, [filtraggioInputSelect, orderSelect])

    //log dei dati della query
    // console.log(orderAtoZ);

    //log per arr dove stanno gli oggeti che aggiungiamo
    // console.log(arrObjCompleto);
    /////////////////////////////////////////////////////////////////////////





    //////////////// FUNZIONE PER LA CATEGORIA /////////////////////////////

    //uso UseEffect per non fare chiamate illimitate inoltre mi deve rifare la funzione 
    useEffect(() => {
        fetchRecordCategory()
    }, [])

    //Rimuovo i duplicati dal recordData cosi che mi ricavo solo le categorie senza duplicati 
    // UseMemo per non rifare il calcolo delle categorie non duplicate
    const removeDuplicate = useMemo(() => {
        return [...new Set(dataCategory.map(smart => smart.category))];
    }, [dataCategory]);

    /////////////////////////////////////////////////////////////////////////




    ///////////////////////////////////////////////////////////
    //Gestione wishlist

    console.log(wishlist);


    return (
        <div className="container-smartphone-compare">

            <div className="contaier-flex-smartphone">

                <div className="set-input-btn-hero" style={{ marginTop: "50px" }}>

                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Inizia a digitare qui per confrontare"
                            value={input}
                            onChange={e => {
                                setInput(e.target.value)
                            }}

                        />


                    </div>

                    <select
                        value={inputSelect}
                        onChange={e => {
                            setInput("")
                            setInputSelect(e.target.value)
                        }
                        }>

                        <option value="">Seleziona categoria</option>
                        {removeDuplicate.map((category, index) => (

                            <option key={index} value={category}>{category}</option>
                        ))}

                    </select>

                    <select
                        name="order"
                        value={orderSelect}
                        onChange={e => setOrderSelect(e.target.value)}
                    >
                        <option value="">Ordina Dalla</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>

                </div>


                {/* SMARTPHONE CARD */}
                <div className="smartphone-card">

                    {/* dall oggetto ricavo la proprieta product */}

                    <CardAllSmartphone
                        orderAtoZ={orderAtoZ}
                        addToWishlist={addToWishlist}
                        wishlist={wishlist}
                        addProduct={addProduct}
                    />

                </div>

            </div>


        </div>
    )
}
