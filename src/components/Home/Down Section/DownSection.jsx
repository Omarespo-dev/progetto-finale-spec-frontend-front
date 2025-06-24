
//Importo css
import '../../../style/DownSection.css'

//importo dati Downsection
import downSection from "../../../../data/downSection"


export default function DownSection() {
    return (
        <>
            <div className='img-set-down-section'>
                <img src="../../../../images/background-image.png" alt="" />
            </div>

            <div className='container-down-section'>
                <div className='container-down-section-flex'>
                    <section className='container-flex-down'>
                        <h2>Funzionalità <span className='highlight'>Esclusive  </span> di Confronto Smartphone</h2>

                        <p>Scopri le funzionalità chiave della nostra piattaforma, progettate per semplificare la tua scelta e aiutarti a trovare lo smartphone ideale che si adatta perfettamente alle tue esigenze.</p>
                    </section>

                    <section className='container-flex-down-2'>
                        {downSection.map(card => (
                            <section className='set-mini-card'>
                                <img src={card.image} alt={card.title} />
                                <h4>{card.title}</h4>
                                <p>{card.description}</p>
                            </section>
                        ))}

                    </section>
                </div>
            </div>
        </>

    )
}
