//css
import { useEffect, useState } from 'react';
import '../../../../style/HeroSection.css'

//typewriter
import Typewriter from 'typewriter-effect';


export default function HeroSection() {

    //Gestione Stato per Input
    const [input, setInput] = useState("")
    //Gestione della lista smartphone sotto input
    const [showList, setShowList] = useState(false)
    //Gestione input category
    const [inputSelect, setInputSelect] = useState("")


    //Gestione per incapsulare dati da chiamata
    const [recordData, setRecordData] = useState([])


    //Faccio chiamata per avere i record per la lista sotto input 
    async function fetchRecord(url, searchInputTitle, categoryInput) {

        //Controllo se la lunghezza di input e 0 non fare chiamata e mettimi la lista a false
        if (searchInputTitle.length === 0 ) {
            setShowList(false)
        } else {
            setShowList(true)
        }

        //Prova ad eseguire questo se va male vai nel catch
        try {
            const response = await fetch(`${url}/products?search=${searchInputTitle}&category=${categoryInput}`)

            //Gestisco la response
            if (!response.ok) {
                throw new Error(`Errore Http: ${response.status}`);
            }

            //converto in json
            const convertJson = await response.json()
            setRecordData(convertJson)

        } catch (err) {
            console.error(err)
        }
    }

    //uso UseEffect per non fare chiamate illimitate inoltre mi deve rifare la funzione  anche quando cambia input
    useEffect(() => {
        fetchRecord(import.meta.env.VITE_API_URL, input, inputSelect)
    }, [input, inputSelect])

    //log dei dati della query
    console.log(recordData);

    
    //Rimuovo i duplicati dal recordData cosi che mi ricavo solo le categorie senza duplicati
    const removeDuplicate = [...new Set(recordData.map(smart => smart.category))]
    console.log(removeDuplicate);

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
                            onChange={e => setInput(e.target.value)}

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
                                            <li key={smartphone.id}>{smartphone.title}</li>
                                        ))}
                                    </ul>
                                </div>
                        )}


                    </div>

                    <select
                        value={inputSelect}
                        onChange={e => setInputSelect(e.target.value)}>
                        
                        <option value="">Seleziona categoria</option>
                        {removeDuplicate.map((category,index)=> (
                            
                            <option key={index} value={category}>{category}</option>
                        ))}
                        
                    </select>

                    <button>Confronta</button>
                </div>

            </div>

        </div>
    )
}