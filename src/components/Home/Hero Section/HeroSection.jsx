import "../../../style/HeroSection.css"

export default function HeroSection() {
    return (
        <div className="container-hero">
            <video autoPlay muted loop>
                <source src="../../../../video/Reveal.mp4" type="video/mp4" />

            </video>

            <div className="flex-item-hero">
                <h1>Confronta <span className="highlight">Smartphone</span> in Tempo Reale</h1>
                
                <div className="set-input-btn-hero">
                    <input type="text" placeholder="Inizia a digitare qui per confrontare"/>
                    <button>Confronta</button>

                </div>

            </div>

        </div>
    )
}
