import { useState } from "react";


export default function useFetch(url) {

    //Gestione per incapsulare dati QUELLA CON QUERY CON solo title e category Pagina Home 
    const [recordData, setRecordData] = useState([])

    //Gestione per incapsulare dati da chiamata pagina Smartphone prodotti QUELLA CON QUERY CON solo title e category
    const [dataSmartphone, setDataSmartphone] = useState([])

    //Gestione per incapsulare dati da chiamata per le categorie e rimuovere i suoi duplicati /products
    const [dataCategory, setDataCategory] = useState([])

    //Ora Definisco un altro State per la chiamata in Promise all presa da arrConfronto
    const [arrObjCompleto, setArrObjCompleto] = useState([])

    //Dati per Gestire la pagina di dettaglio di un singolo prodotto
    const [phoneDetail, setphoneDetail] = useState([])

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
            const response = await fetch(`${url}/products?search=${searchInputTitle.trim()}&category=${categoryInput}`)

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

    //Faccio chiamata per avere i Prodotti appena inizio a cercare dentro all input
    async function fetchRecordSmartphone(searchInputTitle, categoryInput) {

        //Prova ad eseguire questo se va male vai nel catch
        try {
            const response = await fetch(`${url}/products?search=${searchInputTitle}&category=${categoryInput}`)

            //Gestisco la response
            if (!response.ok) {
                throw new Error(`Errore Http: ${response.status}`);
            }

            //converto in json
            const convertJson = await response.json()
            setDataSmartphone(convertJson)

        } catch (err) {
            console.error(err)
            throw new Error(`Server non raggiungibile: ${err.message}`)

        }
    }





    //Faccio un altra chiamata per ricavarmi i record /products per poi prendermi i .category e rimuovere i suoi duplicati
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


    //chiamata in parallelo partendo da un arr di prodotti con solo id e ottenere tutti i dettagli in paralleleo di ogni prodotto
    async function fetchParallelProduct(arr, setterFunction = setArrObjCompleto) {

        try {

            //Faccio chiamata per ogni id pero prima mappo su datacategory per ricavarmi gli di e gli dico che con quell id di fare la chiamata in parallelo
            const obj = await Promise.all(
                //ritorna un arr di promise
                arr.map(async prod => {
                    const res = await fetch(`${url}/products/${prod.id}`);
                    const data = await res.json();
                    return data.product;
                })
            );

            
            setterFunction(prevArray => {
                //Prende arr di obj (dettagli) filtro Cerco nell arr precendete se esiste gia uno stesso oggetto con lo stesso id / Se non c e l oggetto viene aggiunto al nuovo arr return true lo conservi/ invece se lo trovi return false lo scarti
                const nuovi = obj.filter(newItem => !prevArray.find(oldItem => oldItem.id === newItem.id))

                // Restituisce un nuovo array con tutti i prodotti già presenti più quelli nuovi appena scaricati (senza duplicati)
                return [...prevArray, ...nuovi]
            })

        } catch (err) {
            console.error(err)
        }
    }

    //Chiamata per andare al dettaglio di quel prodotto
    async function smartphoneDetail(urlId) {

        //Prova ad eseguire questo se va male vai nel catch
        try {
            const response = await fetch(`${url}/products/${urlId}`)

            //Gestisco la response
            if (!response.ok) {
                throw new Error(`Errore Http: ${response.status}`);
            }

            //converto in json
            const convertJson = await response.json()

            //aggiorno i dati
            setphoneDetail(convertJson.product)

        } catch (err) {
            console.error(err)
            throw new Error(`Server non raggiungibile:${err.message}`)

        }
    }


    return {
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
    }

}
