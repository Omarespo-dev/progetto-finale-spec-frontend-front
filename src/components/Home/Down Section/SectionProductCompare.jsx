
//importo css
import "../../../style/SectionProductCompare.css"

//importo icona
import { CiHeart } from "react-icons/ci";



export default function SectionProductCompare() {
  return (
    <div className="container-smartphone-compare">

      <div className="contaier-flex-smartphone">

        <div className="smartphone-evidenza-container">
          <h2>Smartphone in <span className="highlight">Evidenza </span></h2>
          <p>Le nostre selezioni più consigliate, scelte appositamente per te.</p>
          <button>Vedi Tutti gli Smartphone</button>
        </div>

        <div className="smartphone-card">
          <div className="card-evidenza">
            <section className="set-cuore-card">
              <CiHeart />
            </section>

            <section className="set-img-card">
              <img src="../../../images/apple-iphone-15-pro.jpg" alt="" />
            </section>

            <section className="set-description">
              <p>Apple iPhone 14 Pro Max 128GB Deep Purple </p>
              <button>Aggiungi al Confronto</button>
            </section>
          </div>

        </div>

      </div>


    </div>
  )
}
