
//import css
import "../../../style/WishlistPage.css"


//import cuore e link
import { CiHeart } from "react-icons/ci"
import { Link, useNavigate } from "react-router-dom"


//importo dati dal context per la gestionre della wishlist
import { useContext } from "react"
import { GlobalContext } from "../../../contexts/GlobalContext"
import { toast } from "react-toastify"



export default function Wishlist() {

    const { wishlist, setWishlist,

        //servono per aggiungere il prodotto messo nella wishlist nel confronto
        arrObjCompleto, setArrObjCompleto, removeToWishlist } = useContext(GlobalContext)


    // log arr di oggetit per i wishlist
    console.log(wishlist);

    ////////////////////////////////////////////////////////////////////////
    //SERVE PER AGIGUNGERE ALL ARR DI CONFRONTO
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


    return (
        <div className="container-wishlist">
            <div className="container-flex-wishlist">
                <div className="smartphone-wishlist-tab">
                    <h2>Smartphone <span className="highlight">Preferiti </span></h2>
                    <p>I tuoi smartphone preferenti.</p>
                    <Link to="/smartphone"> <button >Aggiungi altri Smartphone ai preferiti</button> </Link>
                </div>

                <div className="smartphone-card-wishlist">
                    {wishlist.length > 0 ? wishlist.map(product => (

                        <div className="card-evidenza-wishlist" key={product.id}>
                            <section className="set-cuore-card-wishlist">
                                <CiHeart style={{ color: wishlist.some(item => item.id === product.id) ? "red" : "black" }} onClick={() => removeToWishlist(product)} />
                            </section>

                            <section className="set-img-card-wishlist">
                                <Link to={`/smartphone/${product.id}`}> <img src={product.image} alt={product.title} /> </Link>
                            </section>

                            <section className="set-description-wishlist">
                                <p>{product.title} </p>
                                <button onClick={() => addProduct(product)}>Aggiungi al Confronto</button>
                            </section>
                        </div>


                    )) :
                        <div className="compare-card-compare-section-1-wishlist">
                            <div className="compare-compare-name-wishlist">
                                <h2>Nessun Prodotto Aggiunto alla wishlist</h2>
                                <Link to="/smartphone"> <button >Vai alla lista Prodotti</button> </Link>
                            </div>

                        </div>
                    }

                </div>
            </div>
        </div>
    )
}
