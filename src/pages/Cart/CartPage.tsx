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
  User,
  MapPin,
  CreditCard,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Auth } from "@/contexts/AuthContext";
import { countries } from "@/data/countries";
import visa from "@/assets/images/Visa_2021.svg";
import mastercard from "@/assets/images/Mastercard_2019_logo.svg";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } =
    useCart();
  const { user } = Auth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"all" | "digital" | "physical">(
    "all"
  );
  const [isCheckingOut, setIsCheckingOut] = useState(false);

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

  const shippingCost = physicalItems.length > 0 ? 5.0 : 0;
  const orderTotal = totalPrice + shippingCost;

  // Get user's country name
  const getUserCountryName = () => {
    if (!user?.country) return "United States";
    const countryData = countries[user.country as keyof typeof countries];
    return countryData?.name || "United States";
  };

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
          {isCheckingOut ? "Checkout" : "Your Shopping Cart"}
        </h1>
        {!isCheckingOut && (
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
        )}
      </div>

      {/* Type Tabs - Hide during checkout */}
      {!isCheckingOut && (
        <div className="mb-6 border-b overflow-x-auto -mx-3 sm:mx-0 px-3 sm:px-0">
          <div className="flex space-x-4 min-w-max pb-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
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
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 whitespace-nowrap ${
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
                className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors flex items-center gap-1 whitespace-nowrap ${
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
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Cart Items */}
        <div
          className={`${
            isCheckingOut ? "lg:col-span-2" : "lg:col-span-2"
          } space-y-4 sm:space-y-6`}
        >
          {displayedItems.length === 0 && !isCheckingOut ? (
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
                  <div className="relative mx-auto sm:mx-0 w-full sm:w-auto">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-40 sm:w-36 sm:h-36 object-cover rounded-lg"
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

                      {/* Type badge and trash button */}
                      <div className="flex flex-col sm:flex-col gap-2 mb-2">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium w-fit ${
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

                        <div className="flex justify-end sm:justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-gray-800 hover:text-red-500 p-2"
                          >
                            <Trash2 className="h-5 w-5" />
                            <span className="sr-only">Remove item</span>
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      {/* Price - Mobile: show on top */}
                      <div className="text-center sm:text-right order-2 sm:order-1">
                        <p className="text-xl sm:text-2xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Quantity Controls - Mobile: full width */}
                      <div className="flex flex-col sm:flex-row sm:items-center gap-4 order-2 sm:order-1 w-full sm:w-auto">
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

          {/* Shipping Address & Order Summary (during checkout) */}
          {isCheckingOut && (
            <div className="space-y-6">
              {/* Order Summary in checkout */}
              <div className="border rounded-xl p-4 sm:p-6 bg-white shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Order Summary
                </h3>

                <div className="space-y-3">
                  {/* Digital Items Subtotal */}
                  {digitalItems.length > 0 && (
                    <div className="flex justify-between text-sm">
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
                    <div className="flex justify-between text-sm">
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

                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shippingCost > 0 ? (
                        `$${shippingCost.toFixed(2)}`
                      ) : (
                        <span className="text-green-600">Free</span>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between pt-4 border-t text-lg font-bold">
                    <span>Total</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Address Details - Only show for physical items */}
              {physicalItems.length > 0 && (
                <div className="border rounded-xl p-4 sm:p-6 bg-white shadow-sm">
                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      <span className="text-base sm:text-lg">
                        Shipping Address
                      </span>
                    </h3>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
                      <div className="space-y-2">
                        <p className="font-medium text-gray-900">
                          {user?.name || "John Doe"}
                        </p>
                        <p className="text-gray-600">{getUserCountryName()}</p>
                        <p className="text-gray-600">{user?.city || "Anytown"}</p>
                        <p className="text-sky-600 text-sm">
                          <Link to="/shipping">Continue shipping</Link>
                        </p>
                         <p className="text-sky-600 text-sm">
                          <Link to="/shipping">Change address</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Shipping Notice - Only show when not in checkout */}
          {!isCheckingOut && physicalItems.length > 0 && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-start gap-2">
                <Package className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
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

        {/* Right Column - Order Summary or Payment Form */}
        <div className="lg:col-span-1">
          {isCheckingOut ? (
            /* Payment Form */
            <div className="border rounded-xl p-4 sm:p-6 bg-white shadow-sm lg:sticky lg:top-24">
              <div className="space-y-4">
                {/* Pay with Link Button */}
                <Button className="w-full bg-green-500 hover:bg-green-600 text-black h-12 text-base sm:text-lg font-semibold flex items-center justify-center gap-2">
                  Pay with
                  <span className="flex items-center justify-center bg-black text-white font-semibold text-lg rounded-full p-1">
                    <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </span>
                  <span className="font-bold">link</span>
                </Button>

                {/* OR divider */}
                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-gray-300"></div>
                  <span className="flex-shrink mx-4 text-gray-500 text-sm">
                    or
                  </span>
                  <div className="flex-grow border-t border-gray-300"></div>
                </div>

                {/* Email */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    defaultValue={user?.email || ""}
                    className="p-3 border border-gray-300 rounded-md text-base"
                  />
                </div>

                {/* Payment Method Title */}
                <div className="pt-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Payment method
                  </h3>
                </div>

                {/* Card Information */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Information
                  </Label>
                  <div className="relative">
                    <Input
                      type="text"
                      placeholder="1234 1234 1234 1234"
                      className="border border-gray-300 pl-4 pr-20 sm:pr-24 text-base"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1 sm:gap-2">
                      {/* Visa Logo */}
                      <div className="w-8 h-5 sm:w-10 sm:h-6 rounded flex items-center justify-center bg-sky-100 p-0.5 sm:p-1">
                        <img src={visa} alt="Visa" className="max-w-full max-h-full" />
                      </div>
                      {/* Mastercard Logo */}
                      <div className="w-8 h-5 sm:w-10 sm:h-6 rounded flex items-center justify-center bg-black p-0.5 sm:p-1">
                        <img src={mastercard} alt="Mastercard" className="max-w-full max-h-full" />
                      </div>
                    </div>
                  </div>

                  {/* Expiry and CVC in same line */}
                  <div className="flex items-center overflow-hidden mt-0">
                    {/* MM/YY section */}
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="MM / YY"
                        className="border-r border-gray-300 rounded-l-md rounded-r-none text-base"
                      />
                    </div>

                    {/* CVC section with icon on right */}
                    <div className="flex-1 relative">
                      <Input
                        type="text"
                        placeholder="CVC"
                        className="rounded-r-md rounded-l-none text-base"
                      />
                      <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-gray-800" />
                    </div>
                  </div>
                </div>
                
                {/* Cardholder name */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Cardholder name
                  </Label>
                  <Input
                    type="text"
                    placeholder="Full name on card"
                    defaultValue={user?.name || ""}
                    className="w-full p-3 border border-gray-300 rounded-md text-base"
                  />
                </div>

                {/* Country or region */}
                <div>
                  <Label className="block text-sm font-medium text-gray-700 mb-1">
                    Country or region
                  </Label>
                  <Select defaultValue={user?.country || "US"}>
                    <SelectTrigger className="w-full p-3 border border-gray-300 rounded-md text-base">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.entries(countries).map(([code, countryData]) => (
                        <SelectItem key={code} value={code} className="text-base">
                          {countryData.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Save information checkbox */}
                <div className="pt-4">
                  <Label className="flex items-center gap-2 cursor-pointer">
                    <Input
                      type="checkbox"
                      className="h-4 w-4 accent-sky-500"
                      defaultChecked
                    />
                    <span className="text-sm text-gray-700">
                      Save my information for faster checkout
                    </span>
                  </Label>
                  <p className="text-xs text-gray-500 mt-1 pl-6">
                    Pay securely on this site and everywhere Link is accepted.
                  </p>
                </div>

                {/* Pay Button */}
                <Button
                  className="w-full mt-4 bg-sky-500 hover:bg-sky-600 h-12 text-base sm:text-lg font-semibold"
                  onClick={() => {
                    // Handle payment processing
                    alert("Payment processed successfully!");
                  }}
                >
                  Pay
                </Button>
                
                {/* Powered by stripe */}
                <div className="pt-4 border-t text-center">
                  <p className="text-xs text-gray-500">
                    Powered by <span className="font-semibold">stripe</span> |{" "}
                    <a href="#" className="text-sky-600 hover:underline">
                      Terms
                    </a>{" "}
                    <a href="#" className="text-sky-600 hover:underline">
                      Privacy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Order Summary */
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
                      <span className="hidden sm:inline">Digital (</span>
                      <span className="sm:hidden">Digital: </span>
                      {digitalItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}
                      <span className="hidden sm:inline"> items)</span>
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
                      <span className="hidden sm:inline">Physical (</span>
                      <span className="sm:hidden">Physical: </span>
                      {physicalItems.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}
                      <span className="hidden sm:inline"> items)</span>
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
                      `$${shippingCost.toFixed(2)}`
                    ) : (
                      <span className="text-green-600">Free</span>
                    )}
                  </span>
                </div>

                <div className="border-t pt-3 sm:pt-4 mt-3 sm:mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Order Total</span>
                    <span className="text-gray-800">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <Button
                className="w-full mt-4 sm:mt-6 bg-sky-500 hover:bg-sky-600 h-10 sm:h-12 text-sm sm:text-lg font-semibold"
                onClick={() => setIsCheckingOut(true)}
                disabled={items.length === 0}
              >
                Proceed to Payment
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartPage;