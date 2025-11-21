import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import signup from "@/assets/images/signup.jpeg";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { countries } from "@/data/countries";
import { authSchema, type SignUpFormValues } from "@/schemas/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(authSchema)
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit = (data: SignUpFormValues) => {
    console.log(data);
    // Handle sign up logic here
  };

  const watchCountry = watch("country");

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Form with border and rounded */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-12 xl:px-12 relative z-10">
        {/* Background image for small screens */}
        <div className="lg:hidden absolute inset-0 -z-10">
          <img
            src={signup}
            alt="Artistic background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sky-500 bg-opacity-50"></div>
        </div>

        <div className="mx-auto w-full max-w-lg lg:max-w-xl border border-gray-400 rounded-2xl p-14 bg-white/80 backdrop-blur-sm lg:bg-white shadow-md">
          {/* Header */}
          <div className="text-left mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Create Account</h1>
            <p className="text-gray-600">Be the spark of the artistry of ARTFEAT</p>
          </div>

          {/* Form */}
          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            {/* Name and Email row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name field */}
              <div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  {...register("name")}
                  className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email field */}
              <div>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            {/* Password and Confirm Password row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Password field */}
              <div className="relative">
                <Input
                  id="password"
                  placeholder="Password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                />
                {/* Eye icon */}
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password field */}
              <div className="relative">
                <Input
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  type={showConfirmPassword ? "text" : "password"}
                  {...register("confirmPassword")}
                  className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                />
                {/* Eye icon */}
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
            </div>

            {/* Country and City row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country Select */}
              <div>
                <Label htmlFor="country">Country</Label>
                <Select
                  value={watchCountry || ""}
                  onValueChange={(value) => {
                    setValue("country", value);
                    setValue("city", ""); // Reset city when country changes
                  }}
                >
                  <SelectTrigger className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(countries).map(([countryCode, country]) => (
                      <SelectItem key={countryCode} value={countryCode}>
                        {country.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.country && (
                  <p className="text-red-500 text-sm mt-2">{errors.country.message}</p>
                )}
              </div>

              {/* City Select */}
              <div>
                <Label htmlFor="city">City</Label>
                <Select
                  value={watch("city") || ""}
                  onValueChange={(value) => setValue("city", value)}
                  disabled={!watchCountry}
                >
                  <SelectTrigger className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                    <SelectValue placeholder={watchCountry ? "Select city" : "Select country first"} />
                  </SelectTrigger>
                  <SelectContent>
                    {watchCountry && 
                      countries[watchCountry as keyof typeof countries]?.cities.map((city) => (
                        <SelectItem key={city} value={city}>
                          {city}
                        </SelectItem>
                      ))
                    }
                  </SelectContent>
                </Select>
                {errors.city && (
                  <p className="text-red-500 text-sm mt-2">{errors.city.message}</p>
                )}
              </div>
            </div>

            {/* Sign up button with rounded-xl */}
            <Button
              type="submit"
              variant="default"
              className="w-full bg-sky-500 text-white py-5 px-4 rounded-full hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Sign Up
            </Button>
          </form>

          {/* Artist section - centered with background */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-3">
              <p className="text-gray-600 mb-0">Are you an Artist?</p>
              <a
                href="/artist-signup"
                className="inline-block bg-sky-800 text-white px-5 py-2.5 rounded-full hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Let's get you started
              </a>
            </div>
          </div>

          {/* Already have account section - centered */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Already have an account?{" "}
              <a
                href="/signin"
                className="text-sky-500 hover:text-sky-600 font-medium"
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - Image with light blue overlay only */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0">
          {/* Background Image */}
          <img
            src={signup}
            alt="Artistic background"
            className="w-full h-full object-cover"
          />
          {/* Light Blue Overlay only - no text or icons */}
          <div className="absolute inset-0 bg-sky-500 bg-opacity-50"></div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;