import React, { useState, useContext } from "react";
import { Link, useNavigate, } from "react-router-dom"
import "./index.css";
import Main from "../../context/main";

const Card = ({
    _id,
    name,
    price,
    discount,
    pictures,
    tags,
    likes,
    reviews

}) => {
    const { products, setProducts, setBasket, basket } = useContext(Main);
    const [isLike, setIsLike] = useState(likes.includes(3))
    const [inBasket, setInBasket] = useState(basket.filter(el => el.id === _id).length > 0);

    const addToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInBasket(true);
        setBasket(prev => [...prev, {
            id: _id,
            cnt: 1,
            name: name,
            img: pictures,
            price: price
        }])
    }
    const navigate = useNavigate();
    const tag = tags[tags.length - 1]
    const imgStyle = {
        backgroundImage: `url(${pictures})`
    }
    const tagHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        navigate(`/products/category/${tag}`);
    }
    const basketHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setInBasket(!inBasket);
    }
    const likeHandler = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLike(!isLike);
    }

    return <Link className="card" to={`/product/${_id}`}>
        {tag && <button
            className={`card__btn card__tag card__tag_${tag}`}
            onClick={tagHandler}
        >{tag}</button>}
        <span className="card__img" style={imgStyle}></span>
        <span className="card__content">
            <span className="card__title">{name}</span>
            <span className="card__info">
                {reviews.length
                    ? <span className="card__rate">
                        <i className="lni lni-star-fill" />
                        {(reviews.reduce((acc, el) => acc + el.rating, 0) /
                            reviews.length).toFixed(1)}
                    </span>
                    : <span className="card__rate card__rate_empty">
                        <i className="lni lni-star-fill" />
                    </span>
                }
                <span className="card__review">
                    {reviews.length > 0
                        ? `${reviews.length} отзывов`
                        : "нет отзывов"
                    }
                </span>
            </span>

            <span className="card__price"> {price} ₽</span>
            <span className="card__buttons">

                <button
                    className="card__btn card__btn_basket"
                    onClick={addToCart}
                    disabled={inBasket}
                >
                    <i className="lni lni-cart" />
                    В корзину</button>

                <button
                    className="card__btn"
                    onClick={likeHandler}
                >
                    {isLike
                        ? <i className="lni lni-heart-fill" />
                        : <i className="lni lni-heart" />
                    }
                </button>
            </span>
        </span>
    </Link>

}

export default Card;