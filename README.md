# In corso.....
1)Completato Layout Homepage e Logica di aggiunta prodotti ad array che sara quello che conterra il confronto sia per quello selezionato da input che per i Prodotti in Home 

2)Completata layout e logica pagina Smartphone 
3)Quasi completato anche la pagina di Dettaglio manca BUTTON (AGGIUNGI CONFRONTO)


# Cose da fare
///Fare Pagina di confronto aggiungere elementi LOGICA GIA FATTA ///

/// SIA IN HOME SIA IN SMARTPHONE E SIA NELLA PAGINA DI DETTAGLIO INOLTRE AGGIUNGERE ALERT CHE STARA IN BASSO A DESTRA CHE TERRA IL CONTEGGIO DI QUELL ARR ANCHE ALL AGGIUNTA DEL PRODOTTO AL CONFRONTO ///

///Controllare Ogni Page per vedere se mancano Link o altro ///



# Progetto Finale
🖼️ Cosa devi realizzare

Una SPA che simula l’esperienza di un utente non autenticato, che può:

    Sfogliare, cercare e filtrare record
    Confrontare più elementi tra loro
    Salvare i preferiti

❌ Non può creare, modificare o cancellare record.

## 🥉 Requisiti Minimi

Per considerare il progetto completo, devono essere implementate almeno queste funzionalità:

    Gestione di una risorsa definita in types.ts✅

    Lista dei record, che mostra solo le proprietà principali title e category, e include:✅
        Barra di ricerca per cercare nei titoli (title)✅
        Filtro per categoria (category)✅
        Ordinamento alfabetico per title o category (A-Z e Z-A)✅

    Pagina di dettaglio per ogni record, con visualizzazione estesa delle sue proprietà (es. price, description, brand, ecc.)✅

    Comparatore di 2 record, visualizzati affiancati per confrontarne le caratteristiche.⚠️ {LOGICA GIA IMPLEMENTATA}

    È libera la modalità di selezione: puoi permettere all’utente di aggiungere record al comparatore direttamente dalla lista, dalla pagina di dettaglio, oppure usare un menu a tendina, checkbox o qualsiasi altro sistema.❌

    L’importante è che l’utente possa scegliere 2 record qualsiasi e confrontarli in modo chiaro.✅

    Sistema di preferiti, sempre accessibile e aggiornabile:❌
        L’utente può aggiungere o rimuovere record dai preferiti in qualsiasi momento❌
        I preferiti devono essere consultabili in ogni sezione dell’app (es. tramite una sezione dedicata, un’icona fissa, o una sidebar)❌



## 🥈 Requisiti Consigliati (Facoltativi)
Da affrontare solo dopo aver completato i Requisiti Minimi:

    Comparatore di 2 o più record: il layout si adatta per confrontare più elementi affiancati
    Debounce sulla ricerca, per migliorare la UX ed evitare chiamate API inutili
    Persistenza dei preferiti (es. salvataggio in localStorage), così che rimangano anche dopo il refresh della pagina
    Gestione degli stati vuoti, come:
        Nessun risultato trovato
        Lista preferiti vuota
        Nessun elemento selezionato nel comparatore


## 🥇 Requisiti Aggiuntivi (Facoltativi)

Da affrontare solo dopo i Requisiti Consigliati:

    Gestione di più risorse nella stessa SPA (es. products e courses), con interfacce distinte o integrate
    CRUD completo dal frontend:
        Creazione di nuovi record
        Modifica di record esistenti
        Eliminazione di record
        Validazione dei campi in input


## 🎯 BONUS (Facoltativo)
Da affrontare solo dopo i Requisiti Aggiuntivi:

    Creazione di una seconda versione del progetto in TypeScript.Se hai completato tutti i requisiti minimi, consigliati e aggiuntivi, puoi realizzare una nuova versione parallela del progetto usando TypeScript.
    ⚠️La versione principale deve comunque rimanere in JavaScript, come richiesto dal progetto.