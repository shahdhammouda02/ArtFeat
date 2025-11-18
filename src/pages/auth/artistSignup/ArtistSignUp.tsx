import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import signup from "@/assets/images/signup.jpeg";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

type ArtistSignUpFormValues = {
  name: string;
  surname: string;
  country: string;
  city: string;
  businessRegistered: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const ArtistSignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ArtistSignUpFormValues>();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: (data: ArtistSignUpFormValues) => void = (data) => {
    console.log(data);
    // Handle artist sign up logic here
  };

  const watchPassword = watch("password");

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
            <h1 className="text-3xl font-bold text-gray-900 mb-3">General Information</h1>
          </div>

          {/* Form */}
          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
            {/* Name and Surname row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Name field */}
              <div>
                <Input
                  id="name"
                  type="text"
                  placeholder="Name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                  className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Surname field */}
              <div>
                <Input
                  id="surname"
                  type="text"
                  placeholder="Surname"
                  {...register("surname", {
                    required: "Surname is required",
                  })}
                  className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                {errors.surname && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.surname.message}
                  </p>
                )}
              </div>
            </div>

            {/* Country and City row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Country field */}
              <div>
                <Input
                  id="country"
                  type="text"
                  placeholder="Country"
                  {...register("country", {
                    required: "Country is required",
                  })}
                  className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.country.message}
                  </p>
                )}
              </div>

              {/* City field */}
              <div>
                <Input
                  id="city"
                  type="text"
                  placeholder="City"
                  {...register("city", {
                    required: "City is required",
                  })}
                  className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-2">
                    {errors.city.message}
                  </p>
                )}
              </div>
            </div>

            {/* Business Registered question */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Is your business registered?
              </label>
              <div className="flex gap-6">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="yes"
                    {...register("businessRegistered", {
                      required: "Please select an option",
                    })}
                    className="w-4 h-4 text-sky-500 border-gray-300 focus:ring-sky-500"
                  />
                  <span className="ml-2 text-gray-700">Yes</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="no"
                    {...register("businessRegistered", {
                      required: "Please select an option",
                    })}
                    className="w-4 h-4 text-sky-500 border-gray-300 focus:ring-sky-500"
                  />
                  <span className="ml-2 text-gray-700">No</span>
                </label>
              </div>
              {errors.businessRegistered && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.businessRegistered.message}
                </p>
              )}
            </div>

            {/* Email field */}
            <div>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address",
                  },
                })}
                className="w-full py-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password field */}
            <div className="relative">
              <Input
                id="password"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
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
                {...register("confirmPassword", {
                  required: "Please confirm your password",
                  validate: value =>
                    value === watchPassword || "Passwords do not match",
                })}
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

            {/* Sign up button with rounded-xl */}
            <Button
              variant="default"
              className="w-full bg-sky-500 text-white py-5 px-4 rounded-full hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Sign Up
            </Button>
          </form>

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

export default ArtistSignUp;