import React, { useState } from 'react';
import { 
  CreditCard, 
  User, 
  CalendarDays, 
  Lock, 
  Check, 
  X 
} from 'lucide-react';
import './pago.css';

const PaymentPage = () => {
  const [cardData, setCardData] = useState({
    cardOwner: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const [errors, setErrors] = useState({});
  const [isCardValid, setIsCardValid] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'expiryDate') {
      if (value.length === 2 && !value.includes('/')) {
        formattedValue = value + '/';
      }
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }));
  };

  const validateCard = () => {
    const newErrors = {};
    
    if (!cardData.cardOwner.trim()) {
      newErrors.cardOwner = 'Nombre del titular es requerido';
    }

    const cleanCardNumber = cardData.cardNumber.replace(/\s/g, '');
    if (!cleanCardNumber) {
      newErrors.cardNumber = 'Número de tarjeta es requerido';
    } else if (!/^\d{16}$/.test(cleanCardNumber)) {
      newErrors.cardNumber = 'Número de tarjeta debe tener 16 dígitos';
    }

    if (!cardData.expiryDate) {
      newErrors.expiryDate = 'Fecha de vencimiento es requerida';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiryDate)) {
      newErrors.expiryDate = 'Formato inválido (MM/AA)';
    }

    if (!cardData.cvv) {
      newErrors.cvv = 'Código de seguridad es requerido';
    } else if (!/^\d{3}$/.test(cardData.cvv)) {
      newErrors.cvv = 'CVV debe tener 3 dígitos';
    }

    setErrors(newErrors);

    const isValid = Object.keys(newErrors).length === 0;
    setIsCardValid(isValid);

    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateCard();
    
    if (isValid) {
      alert('Tarjeta validada correctamente');
    }
  };

  return (
    <div className="payment-container">
      <div className="card-container">
        <h1 className="payment-title">
          <CreditCard className="title-icon" /> Detalles de Pago
        </h1>
        
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="form-group">
            <label htmlFor="cardOwner">
              <User className="input-icon" /> Nombre del Titular
            </label>
            <input 
              type="text" 
              id="cardOwner"
              name="cardOwner"
              value={cardData.cardOwner}
              onChange={handleInputChange}
              placeholder="Nombre completo"
              className={`input-field ${errors.cardOwner ? 'error' : ''}`}
            />
            {errors.cardOwner && <p className="error-text">{errors.cardOwner}</p>}
          </div>
          <div className="form-group">
            <label htmlFor="cardNumber">
              <CreditCard className="input-icon" /> Número de Tarjeta
            </label>
            <input 
              type="text" 
              id="cardNumber"
              name="cardNumber"
              value={cardData.cardNumber}
              onChange={handleInputChange}
              placeholder="1234 5678 9012 3456"
              maxLength="19"
              className={`input-field ${errors.cardNumber ? 'error' : ''}`}
            />
            {errors.cardNumber && <p className="error-text">{errors.cardNumber}</p>}
          </div>
          <div className="split-group">
            <div className="form-group">
              <label htmlFor="expiryDate">
                <CalendarDays className="input-icon" /> Fecha Venc.
              </label>
              <input 
                type="text" 
                id="expiryDate"
                name="expiryDate"
                value={cardData.expiryDate}
                onChange={handleInputChange}
                placeholder="MM/AA"
                maxLength="5"
                className={`input-field ${errors.expiryDate ? 'error' : ''}`}
              />
              {errors.expiryDate && <p className="error-text">{errors.expiryDate}</p>}
            </div>

            <div className="form-group">
              <label htmlFor="cvv">
                <Lock className="input-icon" /> CVV
              </label>
              <input 
                type="text" 
                id="cvv"
                name="cvv"
                value={cardData.cvv}
                onChange={handleInputChange}
                placeholder="123"
                maxLength="3"
                className={`input-field ${errors.cvv ? 'error' : ''}`}
              />
              {errors.cvv && <p className="error-text">{errors.cvv}</p>}
            </div>
          </div>
          <button 
            type="submit" 
            className="submit-button"
          >
            {isCardValid === true ? <Check className="button-icon" /> : 
             isCardValid === false ? <X className="button-icon" /> : 
             'Validar Tarjeta'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;