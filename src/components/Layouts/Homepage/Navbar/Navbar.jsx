//importo css
import "../../../../style/NavbarLayout.css"

//Import Link per linkaggio delle varie page
import { Link } from "react-router-dom"

// Array di ogetti per quanto riguarda le rotte
import routes from "../../../../../data/routingCostant"

//importo cuore layout da react icons 
import { CiHeart } from "react-icons/ci";

//importo burger menu
import { HiBars3BottomRight } from "react-icons/hi2";


//Importo dati dal context
import { useContext } from "react";
import { GlobalContext } from "../../../../contexts/GlobalContext";



export default function Navbar({ openNav }) {

  //Ricavo dati dal context
  const {
    // Ricavo arr di obj dove all interno ci sarro tutti quelli che saranno contenuti per il confronto
    arrObjCompleto,

  } = useContext(GlobalContext)


  return (
    <div className="container-navbar">
      <div className="container-flex">

        {/* Flex Item 1 */}
        <div className="first-element">
          <img src="/LogoVersus.svg" alt="LogoVersus" />
        </div>

        {/* Flex Item 2 */}
        <div className="second-element">
          <ul>
            {/* faccio map sempre sui routes cosi per rendere il tutto dinamico */}
            {routes.map(rotta => (

              rotta.name ?

                <li key={rotta.id}
                  className={rotta.name === "Compare" && arrObjCompleto.length > 0 ? "compare-active" : ""}
                >
                  <Link to={rotta.path}>
                    {rotta.name}
                  </Link>
                </li>
                :
                null

            ))}
          </ul>
        </div>

        {/* Flex Item 3 */}
        <div className="third-element">
          <ul>
            <li>IT</li>

            <Link to="/wishlist" style={{textDecoration:"none",color:"black"}}>
              <li>
                <CiHeart />
              </li>
            </Link>

          </ul>

        </div>

        {/* Flex Item 4 */}
        <div className="four-element">
          <HiBars3BottomRight className='set-burger' onClick={openNav} />
        </div>

      </div>
    </div>
  )
}