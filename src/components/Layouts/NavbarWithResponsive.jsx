//Importo componenti navbar sia responsive che non
import Navbar from "./Homepage/Navbar/Navbar"
import MobileNavbar from "./Homepage/Navbar/MobileNavBar"
import { useState } from "react"


export default function NavbarWithResponsive() {

    //imposto state per gestire aperto e chiuso per navbar
    const [show, setShow] = useState(false)

    //CHIUDO Nav
    const closeNav = () => setShow(false)

    //Apro Nav
    const openNav = () => setShow(true)


    return (
        <>
            <header>
                <Navbar openNav={openNav} />
                <MobileNavbar show={show} closeNav={closeNav} />
            </header>

        </>

    )
}