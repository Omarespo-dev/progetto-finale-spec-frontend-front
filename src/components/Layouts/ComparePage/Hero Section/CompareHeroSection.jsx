//Import dati dal global
import React, { useContext } from "react";
import { GlobalContext } from "../../../../contexts/GlobalContext";


//import css
import "../../../../style/CompareHeroSection.css"
import { Link } from "react-router-dom";

// close icon
import { IoIosClose } from "react-icons/io";

export default function CompareHeroSection() {
    //Ricavo dati dal context
    const {
        // Ricavo arr di obj dove all interno ci sarro tutti quelli che saranno contenuti per il confronto
        setArrObjCompleto, arrObjCompleto,

    } = useContext(GlobalContext)

    //log dati di confroto [{}]
    console.log(arrObjCompleto);

    //funzione deleteSingle Card
    function deleteCard(prod){
        //filtro su arrObj confrontando se oggetto.id e === al prod.id me lo scarti altrimenti se e diverso conservi
        const deleteProd = arrObjCompleto.filter(item => item.id !== prod)

        //aggiorno setArrobj con deleteProd
        setArrObjCompleto(deleteProd)
    }


    return (<>
        <div className="compare-container-hero-detail">
            {/* Prodotto 1 */}

            {arrObjCompleto.length > 0 ?
                arrObjCompleto.map((prod, index) => (
                    <React.Fragment key={prod.id}>
                        <div className="compare-card-compare-detail-1" style={{ width: "20%" }}>
                            <button id="compare-close-btn" onClick={() => deleteCard(prod.id)}><span><IoIosClose /></span></button>
                            <div className="compare-detail-name">
                                <h2>{prod.title}</h2>
                                <p>{prod.rating}</p>
                            </div>
                            <div className="compare-detail-img">
                                <img src={prod.image} alt={prod.title} />
                            </div>
                            <div className="compare-detail-price">
                                <h3>{prod.price}€</h3>
                            </div>
                            <div className="compare-detail-specs">
                                <ul>
                                    <li><b>Brand:</b> {prod.brand}</li>
                                    <li><b>Batteria:</b> {prod.specs?.battery}</li>
                                    <li><b>RAM:</b> {prod.specs?.ram}</li>
                                    <li><b>Storage:</b> {prod.specs?.storage}</li>
                                    <li><b>Display:</b> {prod.specs?.display}</li>
                                    <li><b>Risoluzione:</b> {prod.specs?.resolution}</li>
                                    <li><b>Fotocamera:</b> {prod.specs?.camera}</li>
                                    <li><b>OS:</b> {prod.specs?.os}</li>
                                    <li><b>5G:</b> {prod.specs?.is5G ? "Sì" : "No"}</li>
                                    <li><b>Ricarica rapida:</b> {prod.specs?.fastCharging ? `Sì (${prod.specs?.chargingPower})` : "No"}</li>
                                    <li><b>Biometria:</b> {prod.specs?.biometric}</li>
                                    <li><b>Peso:</b> {prod.specs?.weight}</li>
                                    <li><b>Impermeabile:</b> {prod.specs?.waterproof}</li>
                                    <li><b>Refresh Rate:</b> {prod.specs?.refreshRate}</li>
                                    <li><b>Porta ricarica:</b> {prod.specs?.chargingPort}</li>
                                </ul>
                            </div>
                        </div>

                        {index < arrObjCompleto.length - 1 && (
                            <div className="compare-vs-divider" >
                                <h2>VS</h2>
                            </div>)}



                    </React.Fragment>


                ))
                :
                <div className="compare-card-compare-section-1">
                    <div className="compare-compare-name">
                        <h2>Nessun Prodotto Aggiunto al Confronto</h2>
                        <Link to="/smartphone"> <button >Vai alla lista Prodotti</button> </Link>
                    </div>

                </div>
            }




        </div >


    </>

    )



}
