//css
import "../../../style/HeroSection.css"

//typewriter
import Typewriter from 'typewriter-effect';


export default function HeroSection() {
    return (
        <div className="container-hero">
            <video autoPlay muted loop>
                <source src="../../../../video/Reveal.mp4" type="video/mp4" />

            </video>

            <div className="flex-item-hero">
                <h1>

                    {/* TypeWriter preso da libreria */}
                    <Typewriter
                        options={{
                            loop: true,
                            delay: 80,
                            deleteSpeed: 80,
                        }}
                        onInit={(typewriter) => {
                            typewriter
                                .typeString('Confronta <span class="highlight">Smartphone</span> in Tempo Reale')
                                .pauseFor(3000)
                                .deleteAll()
                                .start();
                        }}
                    />

                </h1>

                <div className="set-input-btn-hero">
                    <input type="text" placeholder="Inizia a digitare qui per confrontare" />
                    <button>Confronta</button>
                </div>

            </div>

        </div>
    )
}
