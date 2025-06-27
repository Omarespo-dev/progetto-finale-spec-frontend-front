//css
import { useContext, useEffect, useState } from 'react';
import '../../../../style/HeroSection.css'

//typewriter
import Typewriter from 'typewriter-effect';

//Importo context per avere dati
import { GlobalContext } from '../../../../contexts/GlobalContext';


//IMPORTO TOAST ALERT
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';


export default function HeroSection() {

    //Gestione Stato per Input
    const [input, setInput] = useState("")
    //Gestione input category
    const [inputSelect, setInputSelect] = useState("")

    //dati Presi dal context
    const {
        // Per chiamata filtro e categoria
        recordData, fetchRecord,

        // Per ricavarmi tutti i record per prendere solo le categorie
        dataCategory, fetchRecordCategory,

        //Per mostrare la lista e non 
        setShowList, showList,

        //Per chiamata parallelo per ricavare obj dall id
        fetchParallelProduct, arrObjCompleto

    } = useContext(GlobalContext)

    const navigate = useNavigate(); // Hook per navigazione programmatica


    //uso UseEffect per non fare chiamate illimitate inoltre mi deve rifare la funzione  anche quando cambia input e il selectInput
    useEffect(() => {
        fetchRecord(input, inputSelect)
    }, [input, inputSelect])

    //log dei dati della query
    // console.log(recordData);


    //uso UseEffect per non fare chiamate illimitate inoltre mi deve rifare la funzione 
    useEffect(() => {
        fetchRecordCategory()
    }, [])

    //Rimuovo i duplicati dal recordData cosi che mi ricavo solo le categorie senza duplicati
    const removeDuplicate = [...new Set(dataCategory.map(smart => smart.category))]


    //Funzione select product
    function selected(smartphone) {
        //setto input con il prodotto
        setInput(smartphone)

        //chiudo lista
        setShowList(false)
    }



    ///////////////////////////////////////////////////////////


    //arr con obj PRESO DA INPUT AL CLICK DEL BUTTON
    const [arrConfronto, setArrConfronto] = useState([])

    //Funzione Confronta button
    function addObjCompare() {
        // PRIMA controlla il limite
        if (arrObjCompleto.length >= 5) {
            toast.error("Hai raggiunto il massimo nel Comparatore")
            setInput('')
            setInputSelect('')
            return
        }

        //CERCO NELL ARR RECOR-DATA SE L OGGETTO E === INPUT SELEZIONATO
        const verifico = recordData.find(obj => obj.title === input)

        //SE E VERO ALLORA TU MI VERIFICHI SE ANCHE QUEL OGGETTO E GIA PRESENTE NELL ARR OGGETTO PK SE FOSSE VERO CHE HANNO ID UGUALI ALLORA RITORNI L ARR ALTRIMENTI MI FAI LA COPIA DELL ARR E MI AGGIUNGI L OGGETTO
        if (verifico) {
            // Calcolo se è duplicato PRIMA del setState
            const isDuplicate = arrConfronto.some(item => item.id === verifico.id);
            if (isDuplicate) {
                toast.error("Hai aggiunto lo stesso prodotto");
            } else {
                setArrConfronto(arr => [...arr, verifico]);
                toast.success(
                    <span>
                        Prodotto aggiunto al comparatore: {arrObjCompleto.length + 1}
                        <button
                            style={{
                                color: "white",
                                textDecoration: "none",
                                backgroundColor:" #fc6d39",
                                border: "none",
                                cursor: "pointer",
                                padding: "7px 15px",
                                font: "inherit",
                                marginTop:"10px",
                                
                                borderRadius:"20px"
                                
                            }}
                            onClick={() => navigate("/compare")}
                        >
                            Vai al confronto
                        </button>
                    </span>
                );
            }
        }

        //resetto input
        setInput('')
    }

    //faccio la chiamata al montaggio del componente e al cambiare di agggiunta al prodotto nell arrConfronto
    useEffect(() => {
        fetchParallelProduct(arrConfronto)
    }, [arrConfronto])

    //DEBUG 
    console.log(arrObjCompleto);



    return (
        <div className="container-hero">
            <video autoPlay muted loop>
                <source src="/video/Reveal.mp4" type="video/mp4" />
            </video>

            <div className="flex-item-hero">
                <h1>

                    {/* TypeWriter preso da libreria */}
                    <Typewriter
                        options={{
                            loop: true,
                            delay: 80,
                            deleteSpeed: 80,
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString('Confronta <span class="highlight">Smartphone</span> in Tempo Reale')
                                .pauseFor(3000)
                                .deleteAll()
                                .start();
                        }}
                    />

                </h1>

                <div className="set-input-btn-hero">
                    <div className="input-container">
                        <input
                            type="text"
                            placeholder="Inizia a digitare qui per confrontare"
                            value={input}
                            onChange={e => {
                                setShowList(true)
                                setInput(e.target.value)
                            }}

                        />

                        {showList && (

                            !recordData.length ?
                                <div className="set-list-input" >
                                    <ul>
                                        <li><h3 style={{ color: "#e55a2b" }}>Nessun Risultato Trovato</h3></li>
                                    </ul>
                                </div>

                                :
                                <div className="set-list-input" >
                                    <ul>
                                        {recordData.map(smartphone => (
                                            <li key={smartphone.id}

                                                onClick={() => selected(smartphone.title)}>

                                                {smartphone.title}</li>
                                        ))}
                                    </ul>
                                </div>
                        )}


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

                    <button onClick={addObjCompare}>Aggiungi al Confronto</button>
                </div>

            </div>

        </div>
    )
}