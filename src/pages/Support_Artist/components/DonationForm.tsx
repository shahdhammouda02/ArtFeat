import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, User, Mail, MessageSquare } from "lucide-react";
import { useState } from "react";

const DonationForm = () => {
  const [selectedAmount, setSelectedAmount] = useState("25");
  const [donationType, setDonationType] = useState("one-time");
  const [customAmount, setCustomAmount] = useState("");

  const predefinedAmounts = ["25", "50", "100", "250", "500"];

  return (
    <section className="py-16 bg-gray-50">
      <div className="px-4 md:px-16 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-sky-700 rounded-full flex items-center justify-center mx-auto mb-6">
            <Heart className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-black mb-4">
            Make a Donation
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg">
            Your contribution helps us make a difference in the world
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-xl text-gray-800">Donation Details</CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-8">
            {/* Donation Type */}
            <div className="space-y-4">
              <label className="text-base font-medium text-gray-700">Donation Type</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer ${
                  donationType === "one-time"
                    ? "border-sky-700 bg-sky-50"
                    : "border-gray-300"
                }`}>
                  <input
                    type="radio"
                    value="one-time"
                    id="one-time"
                    name="donationType"
                    checked={donationType === "one-time"}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="w-4 h-4 text-sky-700 border-gray-300 focus:ring-sky-700"
                  />
                  <div>
                    <label htmlFor="one-time" className="font-medium cursor-pointer">One-time</label>
                    <p className="text-sm text-gray-500">Single donation</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-3 p-4 border-2 rounded-lg hover:bg-sky-50 transition-colors cursor-pointer ${
                  donationType === "monthly"
                    ? "border-sky-700 bg-sky-50"
                    : "border-gray-300"
                }`}>
                  <input
                    type="radio"
                    value="monthly"
                    id="monthly"
                    name="donationType"
                    checked={donationType === "monthly"}
                    onChange={(e) => setDonationType(e.target.value)}
                    className="w-4 h-4 text-sky-700 border-gray-300 focus:ring-sky-700"
                  />
                  <div>
                    <label htmlFor="monthly" className="font-medium cursor-pointer">Monthly</label>
                    <p className="text-sm text-gray-500">Recurring donation</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Donation Amount */}
            <div className="space-y-4">
              <label className="text-base font-medium text-black">Donation Amount</label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                {predefinedAmounts.map((amount) => (
                  <Button
                    key={amount}
                    variant={selectedAmount === amount ? "default" : "outline"}
                    className={`h-12 ${
                      selectedAmount === amount 
                        ? "bg-sky-700 hover:bg-sky-800 text-white" 
                        : "border-gray-300 hover:border-sky-700 hover:text-sky-700"
                    }`}
                    onClick={() => {
                      setSelectedAmount(amount);
                      setCustomAmount("");
                    }}
                  >
                    ${amount}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="custom-amount"
                  checked={customAmount !== ""}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedAmount("");
                    } else {
                      setCustomAmount("");
                    }
                  }}
                  className="w-4 h-4 text-sky-700 border-gray-300 rounded focus:ring-sky-700"
                />
                <label htmlFor="custom-amount" className="text-sm">Custom amount</label>
              </div>
              
              {(customAmount !== "" || selectedAmount === "") && (
                <Input
                  type="number"
                  placeholder="Enter custom amount"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setSelectedAmount("");
                  }}
                  className="max-w-xs"
                />
              )}
            </div>

            {/* Your Information */}
            <div className="space-y-4">
              <label className="text-base font-medium text-gray-700">Your Information</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <Input id="fullName" placeholder="Enter your full name" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <Input id="email" type="email" placeholder="Enter your email" />
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-4">
              <label htmlFor="message" className="text-base font-medium text-gray-700 flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Message (optional)
              </label>
              <textarea
                id="message"
                placeholder="Leave a message of support..."
                className="w-full p-3 border border-gray-300 rounded-lg resize-none h-24 focus:outline-none focus:ring-2 focus:ring-sky-700 focus:border-transparent"
              />
            </div>

            {/* Total Amount */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-700">Donation Amount:</span>
                <span className="text-2xl font-bold text-black">
                  ${customAmount || selectedAmount || "0"}
                </span>
              </div>
            </div>

            {/* Donate Button */}
            <Button 
              className="w-full bg-sky-700 hover:bg-sky-800 text-white py-4 text-lg font-medium rounded-lg"
              size="lg"
            >
              Donate ${customAmount || selectedAmount || "0"}
            </Button>

            <p className="text-center text-sm text-gray-500">
              Secure payment processing. Your card information is encrypted and safe.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default DonationForm;
