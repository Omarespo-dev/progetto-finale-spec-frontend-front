//css
import { useContext, useEffect, useState } from 'react';
import '../../../../style/HeroSection.css'

//typewriter
import Typewriter from 'typewriter-effect';

//Importo context per avere dati
import { GlobalContext } from '../../../../contexts/GlobalContext';

export default function HeroSection() {

    //Gestione Stato per Input
    const [input, setInput] = useState("")
    //Gestione della lista smartphone sotto input
    const [showList, setShowList] = useState(false)
    //Gestione input category
    const [inputSelect, setInputSelect] = useState("")

    //dati sia di recordData quindi filtro categoria e titolo e inoltre abbiamo un altra chiamata per i record che ci serve per rimuovere i duplicati delle categorie non possiamo farlo CON LA CATEGORIA DELLA QUERY
    const { recordData, fetchRecord, dataCategory,fetchRecordCategory} = useContext(GlobalContext)


    //uso UseEffect per non fare chiamate illimitate inoltre mi deve rifare la funzione  anche quando cambia input
    useEffect(() => {
        fetchRecord(input, inputSelect)
    }, [input, inputSelect])
    
    //log dei dati della query
    console.log(recordData);


    //uso UseEffect per non fare chiamate illimitate inoltre mi deve rifare la funzione 
    useEffect(() => {
        fetchRecordCategory()
    }, [])
    
    //Rimuovo i duplicati dal recordData cosi che mi ricavo solo le categorie senza duplicati
    const removeDuplicate = [...new Set(dataCategory.map(smart => smart.category))]
    


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

                                                onClick={() => {
                                                    setInput(smartphone.title)
                                                    setShowList(false)
                                                }}>

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

                    <button>Confronta</button>
                </div>

            </div>

        </div>
    )
}