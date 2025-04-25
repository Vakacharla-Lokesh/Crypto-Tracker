import React from "react";
import "./Coin.css";

const Coin = ({
  image,
  name,
  symbol,
  price,
  volume,
  priceChange,
  marketCap,
}) => {
  return (
    <div>
      <div className="coin-container">
        <div className="coin-row">
          <div className="coin">
            <img src={image} alt="crypto" />
            <h1>{name}</h1>
            <p className="coin-symbol">{symbol}</p>
          </div>
          <div className="coin-data">
            <p className="coin-price">${price ? price.toFixed(2) : '0.00'}</p>
            {priceChange ? (
              priceChange < 0 ? (
                <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
              ) : (
                <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
              )
            ) : (
              <p className="coin-percent">0.00%</p>
            )}
            <p className="coin-volume">${volume ? volume.toLocaleString() : '0'}</p>
            <p className="coin-marketcap">${marketCap ? marketCap.toLocaleString() : '0'}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Coin;