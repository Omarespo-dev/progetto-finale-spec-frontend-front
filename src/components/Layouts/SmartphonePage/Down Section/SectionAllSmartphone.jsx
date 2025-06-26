
//importo css
import '../../../../style/SectionProductCompare.css'

//importo icona
import { CiHeart } from "react-icons/ci";

//importo context e global per prendere i dati dal global
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../contexts/GlobalContext'

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

        // PRIMA controlla il limite
        if (arrObjCompleto.length >= 2) {
            alert("Hai raggiunto il massimo che puoi mettere")
            return
        }

        const giaPresente = arrObjCompleto.some(item => item.id === prod.id)

        if (!giaPresente) {
            setArrObjCompleto([...arrObjCompleto, prod])
        }
    }

    /////////////////////////////////////////////////////////////////////////




    //////////////// FUNZIONE LOGICA PER INPUT SOPRA ////////////////////////

    //Gestione Stato per Input
    const [input, setInput] = useState("")
    //Gestione input category
    const [inputSelect, setInputSelect] = useState("")


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
        if(inputSelect === ""){ 
            return filtro
        }else{
            // Categoria specifica: se obj.category e uguale all input select mi torni i prodotti selezionati per categoria && il filtro per ogni categoria
            return obj.category === inputSelect && filtro
        }

    })


    //log dei dati della query
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

                    <select name="order">
                        <option value="">Ordina Dalla</option>
                        <option value="a-z">A-Z</option>
                        <option value="z-a">Z-A</option>
                    </select>

                </div>


                {/* SMARTPHONE CARD */}
                <div className="smartphone-card">

                    {/* dall oggetto ricavo la proprieta product */}

                    {filtraggioInputSelect.length > 0 ? filtraggioInputSelect.map(product => (
                        <div className="card-evidenza" key={product.id}>
                            <section className="set-cuore-card">
                                <CiHeart />
                            </section>

                            <section className="set-img-card">
                                <img src={product.image} alt={product.title} />
                            </section>

                            <section className="set-description">
                                <p>{product.title} </p>
                                <button onClick={() => addProduct(product)}>Aggiungi al Confronto</button>
                            </section>
                        </div>
                    ))
                        :
                        <div className="card-evidenza" style={{ width: "100%", textAlign: 'center' }}>
                            <h2>Erore di Rete nessun Smartphone Trovato</h2>
                        </div>
                    }

                </div>

            </div>


        </div>
    )
}
