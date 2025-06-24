//Importo componenti navbar sia responsive che non
import Navbar from "./Navbar/Navbar"
import MobileNavbar from "./Navbar/MobileNavBar"


export default function NavbarWithResponsive() {
    return (
        <>
            <header>
                <Navbar />
                <MobileNavbar />
            </header>

        </>

    )
}
