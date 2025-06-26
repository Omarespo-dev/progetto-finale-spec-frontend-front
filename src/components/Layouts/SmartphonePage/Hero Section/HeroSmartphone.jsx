//import css
import '../../../../style/HeroSection.css'

//typewriter
import Typewriter from 'typewriter-effect';


export default function HeroSmartphone() {

    return (
        <div className="container-hero">
            <video autoPlay muted loop>
                <source src="/video/Galaxy S24.mp4" type="video/mp4" />
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
                                .typeString('Confronta lista di  <span class="highlight">Smartphone</span> in Tempo Reale')
                                .pauseFor(3000)
                                .deleteAll()
                                .start();
                        }}
                    />

                </h1>


            </div>

        </div>
    )
}
