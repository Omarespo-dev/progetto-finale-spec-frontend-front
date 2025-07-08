
//per react.memo
import React from "react";

//importo icona
import { CiHeart } from "react-icons/ci";

//importo routing con Link
import { Link } from "react-router-dom";

const CardProductCompare = React.memo(function CardProductCompare({ sixObj, addToWishlist, wishlist, addProduct }) {
    return (

        sixObj.length > 0 ? sixObj.map(product => (
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
            <div className="card-evidenza" style={{ width: "100%", textAlign: 'center' }}>
                <h2>Erore di Rete nessun Smartphone Trovato</h2>
            </div>


    )
});

export default CardProductCompare;
