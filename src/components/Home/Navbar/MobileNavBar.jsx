
//importo css
import "../../../style/NavbarLayoutMobile.css"

// Array di ogetti per quanto riguarda le rotte
import routes from "../../../../data/routingCostant"

//Link da react router dom
import { Link } from "react-router-dom"

//importo icone
import { IoClose } from "react-icons/io5";
import { CiHeart } from "react-icons/ci"


export default function MobileNavBar({show,closeNav}) {

  return (
    //Gestisco se show e vero mi mette la classe open che e in display block altrimenti none se e falso questo pk se clicco il button dalla navbar fa si che lo stato diventi true e quindi lo mostra
    <div className={`${show ? 'open' : 'setNav'}`}>

      {/* Overlay */}
      <div className="overlay">
      </div>

      {/* NAV Link */}
      <div className="navlinks">
        {routes.map((rotta,index) => (
          <Link key={index} to={rotta.path}>
            {rotta.name}
          </Link>
        ))}

        {/* IT E CUORE */}
        <ul className="element">
          <li>IT</li>
          <li>
            <CiHeart />
          </li>

        </ul>

        {/* Button chiusura */}
        <IoClose className="set-close-button" onClick={closeNav}/>
      </div>

    </div>
  )
}
