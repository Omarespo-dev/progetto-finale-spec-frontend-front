
//importo css
import '../../../../style/SectionProductCompare.css'

//importo icona
import { CiHeart } from "react-icons/ci";

//importo context e global per prendere i dati dal global
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../contexts/GlobalContext'

//Importo Link per routing
import { Link } from 'react-router-dom';

//IMPORTO TOAST ALERT
import { toast } from 'react-toastify';


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

        arrObjCompleto, setArrObjCompleto

    } = useContext(GlobalContext)


    //Function per aggiungere il prodotto al arrObjCompleto che include tutto
    function addProduct(prod) {

        // PRIMA controlla il limite se la sua length e maggiore di 2 dammi l alert e non farmi niente
        if (arrObjCompleto.length >= 2) {
            toast.error("Hai raggiunto il massimo nel Comparatore")
            return
        }

        //verifico se e gia prensente un oggetto con lo stesso id del prodotto
        const giaPresente = arrObjCompleto.some(item => item.id === prod.id)

        //se non e presente mi aggiorni setArrObjCompleto con al copia di arrObjCompleto e mi agigungi il prod passato come parametro alla funzione
        if (!giaPresente) {
            setArrObjCompleto([...arrObjCompleto, prod])
            toast.success("Prodotto aggiunto al comparatore")
        } else {
            toast.error("Hai aggiunto lo stesso prodotto");
        }
    }

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
    const filtraggioInputSelect = dataSmartphoneDetail.filter(obj => {
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

    // ORDINAMENTO: Prende l'array filtrato e lo ordina secondo la scelta dell'utente
    const orderAtoZ = [...filtraggioInputSelect].sort((a, b) => {

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
    const removeDuplicate = [...new Set(dataCategory.map(smart => smart.category))]

    /////////////////////////////////////////////////////////////////////////



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

                    {orderAtoZ.length > 0 ? orderAtoZ.map(product => (
                        <div className="card-evidenza" key={product.id}>
                            <section className="set-cuore-card">
                                <CiHeart />
                            </section>

                            <section className="set-img-card">
                                <Link to={`/smartphone/${product.id}`}> <img src={product.image} alt={product.title} /> </Link>
                            </section>

                            <section className="set-description">
                                <p>{product.title} </p>
                                <button onClick={() => addProduct(product)}>Aggiungi al Confronto</button>
                            </section>
                        </div>
                    ))
                        :
                        <div className="card-evidenza" style={{ width: "100%", textAlign: 'center', height: "40vh", alignContent: "center" }}>
                            <h2>Errore Nessun Smartphone Trovato</h2>
                        </div>
                    }

                </div>

            </div>


        </div>
    )
}
