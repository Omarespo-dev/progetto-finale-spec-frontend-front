
//import per react.memo
import React from 'react'

//Import Cuore
import { CiHeart } from "react-icons/ci"

//import Link
import { Link } from 'react-router-dom'

function CardWishlist({ wishlist, addProduct, removeToWishlist }) {
    return (

        wishlist.length > 0 ? wishlist.map(product => (

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

    )
}


export default React.memo(CardWishlist)