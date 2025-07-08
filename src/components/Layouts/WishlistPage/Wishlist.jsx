//import css
import "../../../style/WishlistPage.css"


//import cuore e link
import { CiHeart } from "react-icons/ci"
import { Link, useNavigate } from "react-router-dom"


//importo dati dal context per la gestionre della wishlist
import { useContext, useCallback } from "react"
import { GlobalContext } from "../../../contexts/GlobalContext"
import { toast } from "react-toastify"
import CardWishlist from "./CardWishlist"



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

    // Uso useCallback perché questa funzione viene passata a un componente figlio memoizzato con React.memo.
    // Senza useCallback, la funzione verrebbe ricreata a ogni render del genitore, causando il re-render inutile del figlio.
    // Con useCallback, la funzione mantiene la stessa referenza finché le sue dipendenze non cambiano, evitando re-render inutili del figlio memoizzato.
    const addProduct = useCallback((prod) => {

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
    }, [arrObjCompleto, setArrObjCompleto, navigate, toast]);


    return (
        <div className="container-wishlist">
            <div className="container-flex-wishlist">
                <div className="smartphone-wishlist-tab">
                    <h2>Smartphone <span className="highlight">Preferiti </span></h2>
                    <p>I tuoi smartphone preferenti.</p>
                    <Link to="/smartphone"> <button >Aggiungi altri Smartphone ai preferiti</button> </Link>
                </div>

                <div className="smartphone-card-wishlist">
                    <CardWishlist
                        wishlist={wishlist}
                        addProduct={addProduct}
                        removeToWishlist={removeToWishlist}
                    />

                </div>
            </div>
        </div>
    )
}
