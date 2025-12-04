import { useCart } from "@/hooks/useCart";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="container mx-auto py-16 px-4 text-center max-w-4xl">
        <div className="mb-8">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Your cart is empty
        </h2>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added any artworks to your cart yet.
        </p>
        <Button
          onClick={() => navigate("/all-artworks")}
          className="bg-sky-500 hover:bg-sky-600 px-8 py-3 text-lg"
        >
          Browse Artworks
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 sm:py-8 px-3 sm:px-4 max-w-6xl">
      {/* Header - Stack vertically on small screens */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Shopping Cart
        </h1>
        <div className="flex flex-wrap gap-2 sm:gap-3 w-full sm:w-auto">
          <Button
            variant="outline"
            onClick={() => navigate("/all-artworks")}
            className="flex items-center gap-2 text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="hidden sm:inline">Continue Shopping</span>
            <span className="sm:hidden">Continue</span>
          </Button>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 hover:bg-red-50 text-sm sm:text-base w-full sm:w-auto"
          >
            Clear Cart
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items - Full width on mobile */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="border rounded-lg sm:rounded-xl p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              {/* Mobile layout: Stack image and details vertically */}
              <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                {/* Product Image - Center on mobile */}
                <div className="relative mx-auto sm:mx-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-48 sm:w-48 sm:h-48 object-cover rounded-lg"
                  />
                  <span className="absolute top-2 left-2 bg-sky-500 text-white text-xs font-semibold px-2 py-1 rounded">
                    {item.type}
                  </span>
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
                    <div className="flex-1">
                      <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        ID: #{item.id}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 self-end sm:self-start"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Quantity Controls - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      <div className="flex items-center justify-between border rounded-lg w-full sm:w-auto">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="h-10 w-10 rounded-r-none"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-12 text-center font-medium">
                          {item.quantity}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="h-10 w-10 rounded-l-none"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                      <span className="text-gray-500 text-sm text-center sm:text-left">
                        ${item.price.toFixed(2)} each
                      </span>
                    </div>

                    {/* Price - Center on mobile */}
                    <div className="text-center sm:text-right">
                      <p className="text-xl sm:text-2xl font-bold text-gray-900">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">
                        Total for {item.quantity} item
                        {item.quantity > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary - Full width on mobile, sticky only on large screens */}
        <div className="lg:col-span-1">
          <div className="border rounded-xl p-4 sm:p-6 bg-white shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b">
              Order Summary
            </h2>

            <div className="space-y-3 sm:space-y-4">
              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">
                  Subtotal (
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>

              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Tax</span>
                <span className="font-medium">At checkout</span>
              </div>

              <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-sky-600">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-sm text-gray-500 mt-2">Including VAT</p>
              </div>
            </div>

            <Button
              className="w-full mt-4 sm:mt-6 bg-sky-500 hover:bg-sky-600 h-10 sm:h-12 text-sm sm:text-lg font-semibold"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </Button>

            <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Secure checkout
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Buyer protection
              </div>
              <div className="flex items-center text-xs sm:text-sm text-gray-600">
                <svg
                  className="w-3 h-3 sm:w-4 sm:h-4 mr-2 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Easy returns
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t">
              <p className="text-xs sm:text-sm text-gray-500 mb-2">
                Need help?
              </p>
              <Link
                to="/support"
                className="text-sky-600 hover:text-sky-700 text-xs sm:text-sm font-medium"
              >
                Contact our support team →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
