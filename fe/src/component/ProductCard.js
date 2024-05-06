import React from "react";
import { useNavigate } from 'react-router-dom';
import { currencyFormat } from "../utils/number";

const ProductCard = ({item}) => {
	const navigate = useNavigate()
  const showProduct = (id) => {
    navigate(`product/${item.id}`)
  };
  return (
    <div className="card" onClick={showProduct}>
      <img
        src={item.image} alt="" />
      <div>{item.name}</div>
      <div>{item.price}</div>
    </div>
  );
};

export default ProductCard;
