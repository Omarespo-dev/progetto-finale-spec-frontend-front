import { useState } from "react";


export default function useFetch(url) {

    //Gestione per incapsulare dati da chiamata
    const [recordData, setRecordData] = useState([])

    //Gestione per incapsulare dati da chiamata per le categorie e rimuovere i suoi duplicati
    const [dataCategory, setDataCategory] = useState([])

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


    return {recordData,fetchRecord , dataCategory,fetchRecordCategory ,setShowList,showList}

}
