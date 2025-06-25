//importo css
import '../../../../style/SectionProductCompare.css'

//importo icona
import { CiHeart } from "react-icons/ci";

//importo context e global per prendere i dati dal global
import { useContext, useEffect, useState } from 'react'
import { GlobalContext } from '../../../../contexts/GlobalContext.jsx'


export default function SectionProductCompare() {

  //Prendere i prodotti dai record almeno 6 la chiamata ai record sta in useFetch
  const { fetchParallelProduct, datiObj, dataCategory } = useContext(GlobalContext)

  //mi deve far vedere i dati solo al montaggio del componente e al cambiamento di dataCategory
  useEffect(() => {
    fetchParallelProduct()
  }, [dataCategory])

  //prendo i primi 6 elementi 
  const sixObj = datiObj.slice(0, 6)
  console.log(sixObj);


  return (
    <div className="container-smartphone-compare">

      <div className="contaier-flex-smartphone">

        <div className="smartphone-evidenza-container">
          <h2>Smartphone in <span className="highlight">Evidenza </span></h2>
          <p>Le nostre selezioni più consigliate, scelte appositamente per te.</p>
          <button>Vedi Tutti gli Smartphone</button>
        </div>

        <div className="smartphone-card">

          {sixObj.map(smartphone => (
            <div className="card-evidenza" key={smartphone.product.id}>
              <section className="set-cuore-card">
                <CiHeart />
              </section>

              <section className="set-img-card">
                <img src={smartphone.product.image} alt={smartphone.product.title}  />
              </section>

              <section className="set-description">
                <p>{smartphone.product.title} </p>
                <button>Aggiungi al Confronto</button>
              </section>
            </div>
          ))}

        </div>

      </div>


    </div>
  )
}