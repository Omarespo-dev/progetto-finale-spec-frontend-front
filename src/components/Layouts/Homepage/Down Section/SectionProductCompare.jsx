//importo css
import '../../../../style/SectionProductCompare.css'

//importo icona
import { CiHeart } from "react-icons/ci";

//importo context e global per prendere i dati dal global
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../contexts/GlobalContext.jsx'


export default function SectionProductCompare() {

  //Prendere i prodotti dai record almeno 6 la chiamata ai record sta in useFetch
  const { fetchParallelProduct, dataCategory , setArrObjCompleto,arrObjCompleto} = useContext(GlobalContext)

  //Dati presi dalla chiamata in parallelo
  const [datiObj, setDatiObj] = useState([])

  //mi deve far vedere i dati solo al montaggio del componente e al cambiamento di dataCategory
  useEffect(() => {
    fetchParallelProduct(dataCategory,setDatiObj)
  }, [dataCategory])

  //prendo i primi 6 elementi 
  const sixObj = datiObj.slice(0, 6)
  
  //debug dati
  // console.log(sixObj);

  //Function per aggiungere il prodotto al arrObjCompleto che include tutto
  function addProduct (prod){
    const giaPresente = arrObjCompleto.some(item => item.id === prod.id)

    if(!giaPresente){
      setArrObjCompleto([...arrObjCompleto, prod])
    }
  }

  return (
    <div className="container-smartphone-compare">

      <div className="contaier-flex-smartphone">

        <div className="smartphone-evidenza-container">
          <h2>Smartphone in <span className="highlight">Evidenza </span></h2>
          <p>Le nostre selezioni più consigliate, scelte appositamente per te.</p>
          <button>Vedi Tutti gli Smartphone</button>
        </div>

        <div className="smartphone-card">

          {/* dall oggetto ricavo la proprieta product */}
          {sixObj.map(product  => (
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
          ))}

        </div>

      </div>


    </div>
  )
}