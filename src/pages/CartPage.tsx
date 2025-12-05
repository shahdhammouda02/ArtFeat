import { useCart } from "@/hooks/useCart";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  Download,
  Package,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "digital" | "physical">(
    "all"
  );

  const digitalItems = items.filter(
    (item) =>
      item.type.toLowerCase().includes("digital") ||
      item.type === "Digital Art" ||
      item.type === "Digital"
  );
  const physicalItems = items.filter(
    (item) =>
      !item.type.toLowerCase().includes("digital") &&
      item.type !== "Digital Art" &&
      item.type !== "Digital"
  );

  const displayedItems =
    activeTab === "all"
      ? items
      : activeTab === "digital"
      ? digitalItems
      : physicalItems;

  const digitalSubtotal = digitalItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const physicalSubtotal = physicalItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

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
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Your Shopping Cart
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

      {/* Type Tabs */}
      <div className="mb-6 border-b">
        <div className="flex space-x-4">
          <button
            onClick={() => setActiveTab("all")}
            className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
              activeTab === "all"
                ? "border-sky-500 text-sky-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            All Items ({items.length})
          </button>
          {digitalItems.length > 0 && (
            <button
              onClick={() => setActiveTab("digital")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 ${
                activeTab === "digital"
                  ? "border-sky-500 text-sky-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Download className="h-4 w-4" />
              Digital ({digitalItems.length})
            </button>
          )}
          {physicalItems.length > 0 && (
            <button
              onClick={() => setActiveTab("physical")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 ${
                activeTab === "physical"
                  ? "border-sky-500 text-sky-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              <Package className="h-4 w-4" />
              Physical ({physicalItems.length})
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4 sm:space-y-6">
          {displayedItems.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {activeTab === "digital" ? "Digital" : "Physical"} Items
              </h3>
              <p className="text-gray-500 mb-4">
                {activeTab === "digital"
                  ? "You haven't added any digital artworks to your cart."
                  : "You haven't added any physical artworks to your cart."}
              </p>
              <Button variant="outline" onClick={() => setActiveTab("all")}>
                View All Items
              </Button>
            </div>
          ) : (
            displayedItems.map((item) => (
              <div
                key={item.id}
                className="border rounded-lg sm:rounded-xl p-4 sm:p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                  {/* Product Image */}
                  <div className="relative mx-auto sm:mx-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-36 sm:w-36 sm:h-36 object-cover rounded-lg"
                    />
                    <span
                      className={`absolute top-2 left-2 text-white text-xs font-semibold px-2 py-1 rounded ${
                        item.type.toLowerCase().includes("digital")
                          ? "bg-sky-500"
                          : "bg-amber-500"
                      }`}
                    >
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

                      {/* Type badge */}
                      <div className="flex flex-col gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            item.type.toLowerCase().includes("digital")
                              ? "bg-sky-100 text-sky-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {item.type.toLowerCase().includes("digital") ? (
                            <>
                              <Download className="h-3 w-3" />
                              Digital Download
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="h-3 w-3" />
                              Required Shipping
                            </>
                          )}
                        </span>

                        {/* Trash button right-aligned under badge */}
                        <div className="flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-800 hover:text-red-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Price */}
                      <div className="text-center sm:text-right">
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls */}
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
                          <span className="w-12 text-center font-medium bg-gray-100 h-10 flex items-center justify-center">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          {/* Shipping Notice */}
          {physicalItems.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start gap-2">
                <Package className="h-4 w-4 text-red-600 mt-0.5" />
                <div>
                  <p className="text-red-600 text-sm font-medium">
                    Shipping Address Required
                  </p>
                  <p className="text-red-500 text-xs mt-1">
                    To proceed with physical product, please ensure a shipping
                    address is provided
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="border rounded-xl p-4 sm:p-6 bg-white shadow-sm lg:sticky lg:top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-4 sm:mb-6 pb-3 sm:pb-4 border-b">
              Order Summary
            </h2>

            <div className="space-y-3 sm:space-y-4">
              {/* Digital Items Subtotal */}
              {digitalItems.length > 0 && (
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Digital (
                    {digitalItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}{" "}
                    items)
                  </span>
                  <span className="font-medium">
                    ${digitalSubtotal.toFixed(2)}
                  </span>
                </div>
              )}

              {/* Physical Items Subtotal */}
              {physicalItems.length > 0 && (
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Package className="h-4 w-4" />
                    Physical (
                    {physicalItems.reduce(
                      (sum, item) => sum + item.quantity,
                      0
                    )}{" "}
                    items)
                  </span>
                  <span className="font-medium">
                    ${physicalSubtotal.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-sm sm:text-base pt-2 border-t">
                <span className="text-gray-600">
                  Subtotal (
                  {items.reduce((sum, item) => sum + item.quantity, 0)} items)
                </span>
                <span className="font-medium">${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm sm:text-base">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">
                  {physicalItems.length > 0 ? (
                    "Calculated at checkout"
                  ) : (
                    <span className="text-green-600">Free</span>
                  )}
                </span>
              </div>

              <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Order Total</span>
                  <span className="text-gray-800">
                    ${totalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-4 sm:mt-6 bg-sky-500 hover:bg-sky-600 h-10 sm:h-12 text-sm sm:text-lg font-semibold"
              onClick={() => navigate("/checkout")}
              disabled={items.length === 0}
            >
              Proceed to Payment
            </Button>

            {/* <div className="mt-4 sm:mt-6 space-y-3 sm:space-y-4">
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
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
