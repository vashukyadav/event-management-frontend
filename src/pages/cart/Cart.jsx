import { ShoppingBag, ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const navigate = useNavigate();

  // 🔴 Abhi cart empty maan rahe hain
  const cartItems = [];

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white flex flex-col">

        {/* 🔝 TOP BAR */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-700 hover:text-pink-600"
          >
            <ArrowLeft size={20} />
            <span className="font-medium">Cart</span>
          </button>

          <button className="text-sm text-gray-500 hover:underline">
            Need help?
          </button>
        </div>

        {/* 🛒 EMPTY STATE */}
        <div className="flex-1 flex flex-col items-center justify-center text-center px-4">

          {/* ICON */}
          <div className="bg-pink-100 rounded-full p-8 mb-6">
            <ShoppingBag size={50} className="text-pink-500" />
          </div>

          {/* TEXT */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Your Cart is Empty
          </h2>

          <p className="text-gray-600 max-w-md mb-8">
            It looks like you haven't added anything to your cart yet.
            Let's change that!
          </p>

          {/* BUTTONS */}
          <button
            onClick={() => navigate("/")}
            className="bg-pink-500 hover:bg-pink-600 text-white px-10 py-3 rounded-full font-semibold mb-4 transition"
          >
            Go to Homepage
          </button>

          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-pink-500 hover:underline"
          >
            Continue Shopping
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  }

  // 🔵 Future: cart items UI yahan aayega
  return <div>Cart Items UI</div>;
};

export default Cart;
