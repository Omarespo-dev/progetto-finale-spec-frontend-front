import { useState } from "react";


export default function useFetch(url) {

    //Gestione per incapsulare dati da chiamata
    const [recordData, setRecordData] = useState([])

    //Gestione per incapsulare dati da chiamata per le categorie e rimuovere i suoi duplicati
    const [dataCategory, setDataCategory] = useState([])

    //Ora Definisco un altro State per la chiamata in Promise all presa da arrConfronto
    const [arrObjCompleto, setArrObjCompleto] = useState([])

    //Gestione della lista smartphone sotto input
    const [showList, setShowList] = useState(false)

    //Faccio chiamata per avere i record per la lista sotto input 
    async function fetchRecord(searchInputTitle, categoryInput) {

        //Controllo se la lunghezza di input e 0 non fare chiamata e mettimi la lista a false
        if (searchInputTitle.length === 0) {
            setShowList(false)
            setRecordData([])
            return
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
            throw new Error(`Server non raggiungibile: ${err.message}`)

        }
    }


    //Faccio un altra chiamata per ricavarmi i record.category e rimuovere i suoi duplicati
    async function fetchRecordCategory() {

        //Prova ad eseguire questo se va male vai nel catch
        try {
            const response = await fetch(`${url}/products`)

            //Gestisco la response
            if (!response.ok) {
                throw new Error(`Errore Http: ${response.status}`);
            }

            //converto in json
            const convertJson = await response.json()

            //aggiorno i dati
            setDataCategory(convertJson)

        } catch (err) {
            console.error(err)
            throw new Error(`Server non raggiungibile:${err.message}`)

        }

    }


    //chiamata in paralelo per ricavare il dettaglio di quell oggetti
    async function fetchParallelProduct(arr, setterFunction = setArrObjCompleto) {

        try {

            //Faccio chiamata per ogni id pero prima mappo su datacategory per ricavarmi gli di e gli dico che con quell id di fare la chiamata in parallelo
            const obj = await Promise.all(
                arr.map(prod =>
                    fetch(`${url}/products/${prod.id}`)
                        .then(res => res.json())
                        .then(data => data.product) // ← Prendi solo product
                )
            )


            //PER FIXARE BUG CHE SE AGGIUNGEVO PRODOTTO CON INPUT E NE AGGIUNGEVO UN ALTRO DAI PRODOTTI SI RESETTAVA
            //DA VEDERE????
            setterFunction(prevArray => {
                // POI filtra e aggiungi
                const nuovi = obj.filter(newItem => !prevArray.find(oldItem => oldItem.id === newItem.id))
                return [...prevArray, ...nuovi]
            })

        } catch (err) {
            console.error(err)
        }
    }


    return {
        // Per chiamata filtro e categoria
        recordData, fetchRecord,

        // Per ricavarmi tutti i record per prendere solo le categorie
        dataCategory, fetchRecordCategory,

        //Per mostrare la lista e non 
        setShowList, showList,

        //Funzione per fare chiamata in Parallelo
        fetchParallelProduct,

        //Arr dove all interno avremmo tutti i prodotti che abbiamo selezionato per il confroto con la sua funzione di aggiornamento
        arrObjCompleto, setArrObjCompleto
    }

}
