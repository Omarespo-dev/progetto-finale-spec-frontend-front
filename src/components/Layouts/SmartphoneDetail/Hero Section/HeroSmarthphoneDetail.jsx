//importo css
import "../../../../style/HeroSmartphoneDetail.css"

//contex dati
import { useContext, useEffect } from "react"
import { GlobalContext } from "../../../../contexts/GlobalContext"

//Ricavo id dall url
import { useNavigate, useParams } from "react-router-dom"


//IMPORTO TOAST ALERT
import { toast } from 'react-toastify';

export default function HeroSmarthphoneDetail() {

    //Ricavo dati dal context
    const {
        // //Ricavo arr di obj dove all interno ci sarro tutti quelli che saranno contenuti per il confronto
        setArrObjCompleto, arrObjCompleto,

        //Per singolo dettaglio
        smartphoneDetail, phoneDetail } = useContext(GlobalContext)


    //prendo ID dal url
    let { id } = useParams()

    //faccio la chiamata al montaggio del componente passandogli id preso dal url
    useEffect(() => {
        smartphoneDetail(id)
    }, [])


    //debug
    // console.log(phoneDetail);

    const navigate = useNavigate(); // Hook per navigazione programmatica

    //Function per aggiungere il prodotto al arrObjCompleto che include tutto
    function addProduct(prod) {

        // PRIMA controlla il limite se la sua length e maggiore di 2 dammi l alert e non farmi niente
        if (arrObjCompleto.length >= 3) {
            toast.error("Hai raggiunto il massimo nel Comparatore")
            return
        }

        //verifico se e gia prensente un oggetto con lo stesso id del prodotto
        const giaPresente = arrObjCompleto.some(item => item.id === prod.id)

        //se non e presente mi aggiorni setArrObjCompleto con al copia di arrObjCompleto e mi agigungi il prod passato come parametro alla funzione
        if (!giaPresente) {
            setArrObjCompleto([...arrObjCompleto, prod])
            toast.success(
                <span>
                    Prodotto aggiunto al comparatore: {arrObjCompleto.length + 1}
                    <button
                        style={{
                            color: "white",
                            textDecoration: "none",
                            backgroundColor: " #fc6d39",
                            border: "none",
                            cursor: "pointer",
                            padding: "7px 15px",
                            font: "inherit",
                            marginTop: "10px",
                            borderRadius: "20px"

                        }}
                        onClick={() => navigate("/compare")}
                    >
                        Vai al confronto
                    </button>
                </span>
            );
        } else {
            toast.error("Hai aggiunto lo stesso prodotto nel Comparatore");
        }
    }

    return (<>
        <div className="container-hero-detail">
            {/* Prodotto 1 */}

            <div className="card-compare-detail-1" key={phoneDetail.id}>
                <button onClick={() => addProduct(phoneDetail)}>Aggiungi al Confronto</button>
                <div className="detail-name">
                    <h2>{phoneDetail.title}</h2>
                    <p>{phoneDetail.rating}</p>
                </div>
                <div className="detail-img">
                    <img src={phoneDetail.image} alt={phoneDetail.title} />
                </div>
                <div className="detail-price">
                    <h3>{phoneDetail.price}€</h3>
                </div>
                <div className="detail-specs">
                    <ul>
                        <li><b>Brand:</b> {phoneDetail.brand}</li>
                        <li><b>Batteria:</b> {phoneDetail.specs?.battery}</li>
                        <li><b>RAM:</b> {phoneDetail.specs?.ram}</li>
                        <li><b>Storage:</b> {phoneDetail.specs?.storage}</li>
                        <li><b>Display:</b> {phoneDetail.specs?.display}</li>
                        <li><b>Risoluzione:</b> {phoneDetail.specs?.resolution}</li>
                        <li><b>Fotocamera:</b> {phoneDetail.specs?.camera}</li>
                        <li><b>OS:</b> {phoneDetail.specs?.os}</li>
                        <li><b>5G:</b> {phoneDetail.specs?.is5G ? "Sì" : "No"}</li>
                        <li><b>Ricarica rapida:</b> {phoneDetail.specs?.fastCharging ? `Sì (${phoneDetail.specs?.chargingPower})` : "No"}</li>
                        <li><b>Biometria:</b> {phoneDetail.specs?.biometric}</li>
                        <li><b>Peso:</b> {phoneDetail.specs?.weight}</li>
                        <li><b>Impermeabile:</b> {phoneDetail.specs?.waterproof}</li>
                        <li><b>Refresh Rate:</b> {phoneDetail.specs?.refreshRate}</li>
                        <li><b>Porta ricarica:</b> {phoneDetail.specs?.chargingPort}</li>
                    </ul>
                </div>
            </div>

            {/* Linea VS
            <div className="vs-divider">
                <span>VS</span>
            </div> */}



        </div>


    </>

    )
}
