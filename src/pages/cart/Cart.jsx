import { useLocation, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { ArrowLeft, Calendar, Clock, Trash2, Plus, Minus, Edit, Eye } from "lucide-react";
import { AuthContext } from "../../context/AuthContext";
import api from "../../api/axois.js";

const CartPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { user } = useContext(AuthContext);
  const pkg = state?.package;

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [qty, setQty] = useState(1);
  const [showDateTimeModal, setShowDateTimeModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState("100");
  const [loading, setLoading] = useState(false);

  if (!user) {
    navigate('/login');
    return null;
  }

  if (!pkg) {
    return <p className="text-center mt-20">Cart is empty</p>;
  }

  const baseTotal = pkg.price * qty;
  const addonTotal = 0;
  const platformCharges = 0;
  const totalAmount = baseTotal + addonTotal + platformCharges;

  const handleCheckout = async () => {
    if (!date || !time) {
      alert("Please select date & time");
      return;
    }
    
    setLoading(true);
    try {
      const bookingData = {
        packageId: pkg._id,
        vendorId: pkg.vendorId,
        eventDate: date,
        eventTime: time,
        totalAmount: totalAmount,
        paymentPercentage: parseInt(paymentOption),
        quantity: qty
      };
      
      const response = await api.post('/bookings', bookingData);
      alert("Booking Successful! 🎉");
      navigate("/user/orders");
    } catch (error) {
      console.error('Booking error:', error);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-semibold">Cart</h1>
          </div>
          <button className="text-blue-600 text-sm font-medium">Need help?</button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Main Product Card */}
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex gap-4">
                <img
                  src={pkg.images?.[0]}
                  alt={pkg.title}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">{pkg.title}</h2>
                      <p className="text-2xl font-bold text-gray-900 mt-1">₹{pkg.price}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Delivery Details</span>
                      <button className="text-blue-600 text-sm font-medium ml-2">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 mt-4">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium">{qty}</span>
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Select Date & Time Button */}
                  <button
                    onClick={() => setShowDateTimeModal(true)}
                    className="flex items-center gap-2 mt-4 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg border border-blue-200 hover:bg-blue-100"
                  >
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Select Date & Time</span>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t">
                <button className="flex items-center gap-2 text-red-500 hover:text-red-600">
                  <Trash2 className="w-4 h-4" />
                  <span className="font-medium">Delete</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-gray-700">
                  <Plus className="w-4 h-4" />
                  <span>Add Instruction</span>
                </button>
              </div>
            </div>

            {/* Coupon Section */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 text-sm font-bold">%</span>
                  </div>
                  <span className="font-medium text-blue-600">Coupon</span>
                </div>
                <button className="text-blue-600 font-medium">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Bill Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-5 h-5 bg-gray-100 rounded flex items-center justify-center">
                  <span className="text-xs">📋</span>
                </div>
                <h3 className="text-lg font-semibold">Bill Summary</h3>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Base Total</span>
                  <span className="font-medium">₹{baseTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Addon Total</span>
                  <span className="font-medium">₹{addonTotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Platform Charges</span>
                  <span className="font-medium">₹{platformCharges}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between items-center bg-orange-50 px-3 py-2 rounded-lg">
                  <span className="font-semibold">Amount to Pay</span>
                  <span className="font-bold text-lg text-orange-600">₹{totalAmount}</span>
                </div>
              </div>

              {/* Payment Options */}
              <div className="mt-6">
                <h4 className="font-medium mb-3">Payment Options</h4>
                <div className="flex gap-3">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="50"
                      checked={paymentOption === "50"}
                      onChange={(e) => setPaymentOption(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-sm">50%</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="payment"
                      value="100"
                      checked={paymentOption === "100"}
                      onChange={(e) => setPaymentOption(e.target.value)}
                      className="text-blue-600"
                    />
                    <span className="text-sm">100%</span>
                  </label>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full mt-6 bg-green-500 hover:bg-green-600 disabled:bg-gray-400 text-white py-3 rounded-lg font-medium text-lg transition-colors"
              >
                {loading ? 'Processing...' : `Proceed to Checkout | ₹${totalAmount}`}
              </button>

              {/* Status Indicators */}
              <div className="flex items-center justify-between mt-4 text-xs">
                <div className="flex items-center gap-1 text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Delivery details</span>
                </div>
                <div className="flex items-center gap-1 text-red-500">
                  <Clock className="w-3 h-3" />
                  <span>All date & time</span>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t text-xs text-gray-600">
                <div className="text-center">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-green-600">🔒</span>
                  </div>
                  <div>No Hidden</div>
                  <div>Charges</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-orange-600">🤝</span>
                  </div>
                  <div>5 Lakh+ Trusted</div>
                  <div>Clients</div>
                </div>
                <div className="text-center">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-1">
                    <span className="text-blue-600">🛡️</span>
                  </div>
                  <div>100% Secure</div>
                  <div>Payments</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Date & Time Modal */}
      {showDateTimeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold mb-4">Select Date & Time</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Select Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowDateTimeModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (date && time) {
                    setShowDateTimeModal(false);
                  } else {
                    alert("Please select both date and time");
                  }
                }}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
