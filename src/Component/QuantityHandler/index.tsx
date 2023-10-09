import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './quantity.scss'
import { SearchOutlined ,MinusOutlined,PlusOutlined} from "@ant-design/icons";

interface Props{
  qty: number
  setQty: React.Dispatch<React.SetStateAction<number>>
}
const QuantityCounter = (props:Props) => {
  const {qty, setQty} = props;
  const pricePerItem: number = 100; // Replace with your actual item price

  const handleIncrement = () => {
    setQty(qty + 1);
  };

  const handleDecrement = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  

  return (
    <div>
      <div className="d-flex" style={{color:'var(--font-color)'}}>

        <button className="  quantity-input__modifier quantity-input__modifier--left" onClick={handleDecrement}>
          <MinusOutlined className='text-primary fw-bold' />
        </button>
        <input className="quantity-input__screen" type="text" value={qty} disabled />
        <button className="quantity-input__modifier quantity-input__modifier--right" onClick={handleIncrement}>
          <PlusOutlined className='text-primary fw-bold' />
        </button>
        <div className='ms-auto me-5 d-flex justity-content-end align-items-center'>
          <h4>Rs {qty * pricePerItem}</h4>
        </div>  
      </div>  
    </div>
  );
};

export default QuantityCounter;
