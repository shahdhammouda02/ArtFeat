import { useForm } from "react-hook-form";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import signin from "@/assets/images/signin.jpeg";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";

type SignInFormValues = {
  email: string;
  password: string;
};

const SignIn = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormValues>();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: (data: SignInFormValues) => void = (data) => {
    console.log(data);
    // Handle sign in logic here
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Left Section - Form with border and rounded */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-12 xl:px-12 relative z-10">
        {/* Background image for small screens */}
        <div className="lg:hidden absolute inset-0 -z-10">
          <img
            src={signin}
            alt="Artistic background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-sky-500 bg-opacity-50"></div>
        </div>

        <div className="mx-auto w-full max-w-lg lg:max-w-xl border border-gray-400 rounded-2xl p-14 bg-white/80 backdrop-blur-sm lg:bg-white shadow-md">
          {/* Header */}
          <div className="text-left mb-10">
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Sign In</h1>
            <p className="text-gray-600">Stay updated on the artistic world</p>
          </div>

          {/* Form */}
          <form className="space-y-7" onSubmit={handleSubmit(onSubmit)}>
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

            {/* Forgot password - aligned left */}
            <div className="text-left">
              <a href="#" className="text-sm text-sky-600 hover:text-sky-500">
                Forgot password?
              </a>
            </div>

            {/* Sign in button with rounded-xl */}
            <Button
              variant="default"
              className="w-full bg-sky-500 text-white py-5 px-4 rounded-full hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
            >
              Sign in
            </Button>
          </form>

          {/* New user section - centered */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              new To ArtFeat?{" "}
              <a
                href="#"
                className="text-sky-500 hover:text-sky-600 font-medium"
              >
                Join now
              </a>
            </p>
          </div>

          {/* Artist section - centered with background */}
          <div className="text-center mt-8">
            <div className="flex items-center justify-center gap-3">
              <p className="text-gray-600 mb-0">Are you an Artist?</p>
              <a
                href="#"
                className="inline-block bg-sky-800 text-white px-5 py-2.5 rounded-full hover:bg-sky-900 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors font-medium"
              >
                Let's get you started
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Image with light blue overlay only */}
      <div className="hidden lg:block flex-1 relative">
        <div className="absolute inset-0">
          {/* Background Image */}
          <img
            src={signin}
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

export default SignIn;
