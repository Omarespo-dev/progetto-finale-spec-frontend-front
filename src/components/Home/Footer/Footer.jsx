
//importo css
import "../../../style/Footer.css"

//Importo icone 
import { FaXTwitter } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { AiFillTikTok } from "react-icons/ai";
import footerLinks from "../../../../data/footerLinks";
import { Link } from "react-router-dom";


export default function Footer() {
    return (
        <footer>
            <div className="container-footer">
                <div className="container-flex-footer">

                    {/* Flex item 1 */}
                    <div className="flex-item-footer">
                        <section className="flex-section-footer">
                            <img src="../../../../VERSUS LOGO-Photoroom.png" alt="" />

                            <p>Confronta gli smartphone più recenti e trova il modello perfetto per te.</p>
                        </section>

                        <section className="flex-section-footer-2">
                            <ul>
                                <li><FaXTwitter /></li>
                                <li><FaYoutube /></li>
                                <li><FaInstagram /></li>
                                <li><AiFillTikTok /></li>
                            </ul>
                        </section>

                    </div>

                    <div className="flex-item-footer2">
                        {footerLinks.map(section => (
                            <section key={section.id} className="flex-section-footer3">
                                <h3>{section.title}</h3>
                                <ul>
                                    {section.links.map((link, index) => (
                                        <Link to={link.url} key={index}>
                                            <li>{link.label}</li>
                                        </Link>
                                    )
                                    )}
                                </ul>
                            </section>
                        ))}


                    </div>


                </div>
            </div>
        </footer>

    )
}
