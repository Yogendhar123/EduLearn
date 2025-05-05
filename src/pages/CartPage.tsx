import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, ShoppingBag, AlertTriangle } from 'lucide-react';
import { calculateTotal, CartItem } from '../data/cart';

const CartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Update document title
    document.title = 'Shopping Cart - EduLearn';
    
    // Load cart from localStorage
    const loadCart = () => {
      const savedCart = localStorage.getItem('cart');
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
      setLoading(false);
    };
    
    loadCart();
  }, []);
  
  // Update localStorage when cart changes
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, loading]);
  
  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.courseId === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.courseId !== itemId));
  };
  
  const handleClearCart = () => {
    setCartItems([]);
  };
  
  const handleCheckout = () => {
    navigate('/checkout');
  };
  
  if (loading) {
    return (
      <div className="min-h-screen pt-20 pb-12 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-16">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-start lg:space-x-8">
          {/* Main Cart */}
          <div className="w-full lg:w-2/3 mb-8 lg:mb-0">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
              {cartItems.length > 0 && (
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium flex items-center"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Clear Cart
                </button>
              )}
            </div>
            
            {cartItems.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.courseId} className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                          <img 
                            src={item.course.image} 
                            alt={item.course.title} 
                            className="w-full md:w-32 h-20 object-cover rounded-md"
                          />
                        </div>
                        <div className="flex-grow md:mr-4">
                          <h3 className="text-lg font-semibold text-gray-800 mb-1">{item.course.title}</h3>
                          <p className="text-sm text-gray-600 mb-2">Instructor: {item.course.instructor}</p>
                          <div className="flex items-center text-sm text-gray-500">
                            <span className="mr-2">{item.course.duration}</span>
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs">
                              {item.course.level}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 md:mt-0">
                          <div className="mr-6">
                            <p className="text-lg font-bold text-gray-800">${item.course.price.toFixed(2)}</p>
                          </div>
                          <div className="flex items-center">
                            <div className="flex items-center border border-gray-300 rounded-md mr-4">
                              <button 
                                onClick={() => handleQuantityChange(item.courseId, item.quantity - 1)}
                                className="px-3 py-1 border-r border-gray-300 text-gray-600 hover:bg-gray-100"
                              >
                                -
                              </button>
                              <span className="px-4 py-1 text-gray-700">{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(item.courseId, item.quantity + 1)}
                                className="px-3 py-1 border-l border-gray-300 text-gray-600 hover:bg-gray-100"
                              >
                                +
                              </button>
                            </div>
                            <button 
                              onClick={() => handleRemoveItem(item.courseId)}
                              className="text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
                <p className="text-gray-600 mb-6">
                  Looks like you haven't added any courses to your cart yet.
                </p>
                <Link 
                  to="/courses" 
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-md font-medium inline-flex items-center transition-colors"
                >
                  Browse Courses
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            )}
            
            <div className="mt-6">
              <Link to="/courses" className="text-blue-700 hover:text-blue-800 font-medium inline-flex items-center">
                <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Continue Shopping
              </Link>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="w-full lg:w-1/3 sticky top-24">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h2>
              
              {cartItems.length > 0 ? (
                <>
                  <div className="space-y-3 mb-4">
                    {cartItems.map((item) => (
                      <div key={item.courseId} className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          {item.course.title} x {item.quantity}
                        </span>
                        <span className="font-semibold">${(item.course.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Subtotal</span>
                      <span className="font-semibold">${calculateTotal(cartItems).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-600">Discount</span>
                      <span className="font-semibold text-green-600">-$0.00</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold mt-4">
                      <span>Total</span>
                      <span>${calculateTotal(cartItems).toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleCheckout}
                    disabled={cartItems.length === 0}
                    className="bg-blue-700 hover:bg-blue-800 text-white w-full py-3 rounded-md font-medium flex items-center justify-center transition-colors"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Proceed to Checkout
                  </button>
                </>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>Add courses to see the order summary</p>
                </div>
              )}
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="flex items-start text-xs text-gray-500">
                  <AlertTriangle className="h-4 w-4 text-yellow-500 mr-1 flex-shrink-0 mt-0.5" />
                  <p>
                    By proceeding to checkout, you agree to our Terms of Service and Privacy Policy.
                  </p>
                </div>
              </div>
            </div>
            
            {/* Coupon Code */}
            <div className="bg-white rounded-lg shadow-md p-6 mt-6">
              <h3 className="text-md font-semibold text-gray-800 mb-3">Have a Coupon?</h3>
              <div className="flex">
                <input
                  type="text"
                  placeholder="Enter coupon code"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-r-md font-medium transition-colors">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;