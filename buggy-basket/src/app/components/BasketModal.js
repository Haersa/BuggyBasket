'use client';

import { X, Minus, Plus, ShoppingBasket } from 'lucide-react';
import { useBasket } from '../context/BasketContext';
import { toast } from 'react-toastify';

export default function BasketModal() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, clearBasket, total } = useBasket();

  const handleRemove = async (id) => {
    await removeItem(id);
    toast.success('Item removed from basket.');
  };

  const handleClear = async () => {
    await clearBasket();
    toast.success('Basket cleared.');
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="modal-overlay" onClick={() => setIsOpen(false)} />
      <div className="basket-drawer">
        <div className="basket-drawer-header">
          <h2 className="basket-drawer-title">Your Basket</h2>
          <button className="modal-close" onClick={() => setIsOpen(false)}>
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="basket-empty">
            <ShoppingBasket size={48} />
            <p>Your basket is empty.</p>
          </div>
        ) : (
          <>
            <div className="basket-items">
              {items.map((item) => (
                <div key={item.id} className="basket-item">
                  <div className="basket-item-image">
                    {item.image_url ? (
                      <img src={item.image_url} alt={item.name} />
                    ) : (
                      <div className="basket-item-image-placeholder" />
                    )}
                  </div>
                  <div className="basket-item-details">
                    <p className="basket-item-name">{item.name}</p>
                    <p className="basket-item-price">£{(item.price * item.quantity).toFixed(2)}</p>
                    <div className="basket-item-qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1}>
                        <Minus size={14} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button className="basket-item-remove" onClick={() => handleRemove(item.id)}>
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>

            <div className="basket-payment-btns">
  <button className="basket-payment-btn basket-apple-pay">
    <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" alt="Apple Pay" height="18" />
    <span>Pay</span>
  </button>
  <button className="basket-payment-btn basket-google-pay">
    <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" height="22" />
  </button>
  <button className="basket-payment-btn basket-klarna">
    <img src="https://upload.wikimedia.org/wikipedia/commons/4/40/Klarna_Payment_Badge.svg" alt="Klarna" height="22" />
  </button>
</div>

            <div className="basket-footer">
              <div className="basket-total">
                <span>Total</span>
                <span>£{total.toFixed(2)}</span>
              </div>
              <button className="basket-checkout-btn">Proceed to Checkout</button>
              <button className="basket-clear-btn" onClick={handleClear}>Clear Basket</button>
            </div>
          </>
        )}
      </div>
    </>
    
  );
}