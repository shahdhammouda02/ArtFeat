"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

type FormValues = {
  country: string;
  fullName: string;
  street: string;
  line2?: string;
  city?: string;
  state?: string;
  postal?: string;
  phone?: string;
  defaultAddress?: boolean;
};

export default function Shipping() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      country: "Palestinian Territory, Occupied",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("FORM DATA:", data);
  };

  return (
    <div className="max-w-xl mx-auto py-10 px-4">
      {/* Steps */}
      <div className="flex items-center justify-center gap-6 mb-10">
        <div className="flex flex-col items-center">
          <div className="w-4 h-4 bg-black rounded-full" />
          <p className="text-sm mt-2">Delivery</p>
        </div>

        <div className="w-16 h-[2px] bg-gray-300" />

        <div className="flex flex-col items-center">
          <div className="w-4 h-4 border border-gray-400 rounded-full" />
          <p className="text-sm mt-2 text-gray-500">Payment</p>
        </div>

        <div className="w-16 h-[2px] bg-gray-300" />

        <div className="flex flex-col items-center">
          <div className="w-4 h-4 border border-gray-400 rounded-full" />
          <p className="text-sm mt-2 text-gray-500">Review</p>
        </div>
      </div>

      {/* Title */}
      <h2 className="text-xl font-semibold mb-6 text-center">
        Enter an address
      </h2>

      {/* FORM */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Country */}
        <div className="space-y-2">
          <Label>
            Country <span className="text-red-500">*</span>
          </Label>

          <Select
            onValueChange={(value) => setValue("country", value)}
            defaultValue="Palestinian Territory, Occupied"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="Palestinian Territory, Occupied">
                Palestinian Territory, Occupied
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Full name */}
        <div className="space-y-2">
          <Label>
            Full name <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            {...register("fullName", { required: "Full name is required" })}
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm">{errors.fullName.message}</p>
          )}
        </div>

        {/* Street */}
        <div className="space-y-2">
          <Label>
            Street address <span className="text-red-500">*</span>
          </Label>
          <Input
            type="text"
            {...register("street", { required: "Street address is required" })}
          />
          {errors.street && (
            <p className="text-red-500 text-sm">{errors.street.message}</p>
          )}
        </div>

        {/* Address line 2 */}
        <div className="space-y-2">
          <Label>Address line 2 (optional)</Label>
          <Input type="text" {...register("line2")} />
        </div>

        {/* City */}
        <div className="space-y-2">
          <Label>City / Town (optional)</Label>
          <Input type="text" {...register("city")} />
        </div>

        {/* State + postal */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>State / Province / Region (optional)</Label>
            <Input type="text" {...register("state")} />
          </div>

          <div className="space-y-2">
            <Label>Post code (optional)</Label>
            <Input type="text" {...register("postal")} />
          </div>
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label>Phone number (optional)</Label>
          <Input type="text" {...register("phone")} />
        </div>

        {/* Checkbox */}
        <div className="flex items-center gap-2">
          <Checkbox
            onCheckedChange={(checked) =>
              setValue("defaultAddress", checked === true)
            }
          />
          <Label>Set as default</Label>
        </div>

        {/* Buttons */}
        <div className="flex justify-between pt-4">
          <Button variant="outline" type="button">
            Back
          </Button>

          <Button className="bg-black text-white hover:bg-black/80" type="submit">
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
}
