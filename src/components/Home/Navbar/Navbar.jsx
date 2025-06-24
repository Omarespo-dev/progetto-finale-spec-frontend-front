
//importo css
import "../../../style/NavbarLayout.css"

//Import Link per linkaggio delle varie page
import { Link } from "react-router-dom"

// Array di ogetti per quanto riguarda le rotte
import routes from "../../../../data/routingCostant"

//importo cuore layout da react icons 
import { CiHeart } from "react-icons/ci";


export default function Navbar() {
  return (
    <div className="container-navbar">
      <div className="container-flex">

        {/* Flex Item 1 */}
        <div className="first-element">
          <img src="../../../../LogoVersus.svg" alt="LogoVersus" />
        </div>

        {/* Flex Item 2 */}
        <div className="second-element">
          <ul>
            {/* faccio map sempre sui routes cosi per rendere il tutto dinamico */}
            {routes.map(rotta => (
              <li key={rotta.id}>
                <Link to={rotta.path}>
                  {rotta.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Flex Item 3 */}
        <div className="third-element">
          <ul>
            <li>IT</li>
            <li>
              <CiHeart />
            </li>
          </ul>
        </div>

      </div>
    </div>
  )
}
