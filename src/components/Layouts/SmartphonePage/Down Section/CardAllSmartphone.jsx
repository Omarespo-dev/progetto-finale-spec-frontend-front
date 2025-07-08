//importo per react.memo
import React from 'react'

//importo link
import { Link } from 'react-router-dom'


//importo icona
import { CiHeart } from "react-icons/ci";

function CardAllSmartphone({ orderAtoZ, addToWishlist, wishlist, addProduct }) {
    return (
        orderAtoZ.length > 0 ? orderAtoZ.map(product => (
            <div className="card-evidenza" key={product.id}>
                <section className="set-cuore-card">
                    <CiHeart onClick={() => addToWishlist(product)} style={{ color: wishlist.some(item => item.id === product.id) ? "red" : "black" }} />
                </section>

                <section className="set-img-card">
                    <Link to={`/smartphone/${product.id}`}> <img src={product.image} alt={product.title} /> </Link>
                </section>

                <section className="set-description">
                    <p>{product.title} </p>
                    <button onClick={() => addProduct(product)}>Aggiungi al Confronto</button>
                </section>
            </div>
        ))
            :
            <div className="card-evidenza" style={{ width: "100%", textAlign: 'center', height: "40vh", alignContent: "center" }}>
                <h2>Errore Nessun Smartphone Trovato</h2>
            </div>

    )
}

export default React.memo(CardAllSmartphone)