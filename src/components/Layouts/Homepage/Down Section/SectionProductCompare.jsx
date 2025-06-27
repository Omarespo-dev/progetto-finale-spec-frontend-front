//importo css
import '../../../../style/SectionProductCompare.css'

//importo icona
import { CiHeart } from "react-icons/ci";

//importo context e global per prendere i dati dal global
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../contexts/GlobalContext.jsx'

//Importo Link per routing
import { Link, useNavigate } from 'react-router-dom';


//IMPORTO TOAST ALERT
import { toast } from 'react-toastify';

export default function SectionProductCompare() {

  //Prendere i prodotti dai record almeno 6 la chiamata ai record sta in useFetch
  const { fetchParallelProduct, dataCategory, setArrObjCompleto, arrObjCompleto } = useContext(GlobalContext)

  //Dati presi dalla chiamata in parallelo
  const [datiObj, setDatiObj] = useState([])

  //mi deve far vedere i dati solo al montaggio del componente e al cambiamento di dataCategory
  useEffect(() => {
    fetchParallelProduct(dataCategory, setDatiObj)
  }, [dataCategory])

  //prendo i primi 6 elementi 
  const sixObj = datiObj.slice(0, 6)

  //debug dati
  // console.log(sixObj);

  const navigate = useNavigate(); // Hook per navigazione programmatica

  //Function per aggiungere il prodotto al arrObjCompleto che include tutto
  function addProduct(prod) {

    // PRIMA controlla il limite se la sua length e maggiore di 2 dammi l alert e non farmi niente
    if (arrObjCompleto.length >= 5) {
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
      toast.error("Hai aggiunto lo stesso prodotto");
    }


  }

  return (
    <div className="container-smartphone-compare">

      <div className="contaier-flex-smartphone">

        <div className="smartphone-evidenza-container">
          <h2>Smartphone in <span className="highlight">Evidenza </span></h2>
          <p>Le nostre selezioni più consigliate, scelte appositamente per te.</p>
          <Link to="/smartphone"> <button >Vedi Tutti gli Smartphone</button> </Link>
        </div>

        <div className="smartphone-card">

          {/* dall oggetto ricavo la proprieta product */}

          {sixObj.length > 0 ? sixObj.map(product => (
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
            <div className="card-evidenza" style={{ width: "100%", textAlign: 'center' }}>
              <h2>Erore di Rete nessun Smartphone Trovato</h2>
            </div>
          }

        </div>

      </div>


    </div>
  )
}