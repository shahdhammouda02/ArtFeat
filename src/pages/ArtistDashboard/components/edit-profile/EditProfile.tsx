import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Auth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Save } from 'lucide-react';
import { countries } from '@/data/countries';

const EditProfile = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile } = Auth();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    storename: '',
    country: '',
    city: '',
  });

  // Get available cities for selected country
  const [availableCities, setAvailableCities] = useState<string[]>([]);

  // Initialize form with user data
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        storename: user.storename || '',
        country: user.country || '',
        city: user.city || '',
      });

      // Set available cities if country exists
      if (user.country && countries[user.country as keyof typeof countries]) {
        const countryData = countries[user.country as keyof typeof countries];
        setAvailableCities(countryData?.cities || []);
      }
    }
  }, [user]);

  // Update available cities when country changes
  useEffect(() => {
    if (formData.country && countries[formData.country as keyof typeof countries]) {
      const countryData = countries[formData.country as keyof typeof countries];
      setAvailableCities(countryData?.cities || []);
      
      // Clear city if not in new country's cities
      if (formData.city && !countryData?.cities.includes(formData.city)) {
        setFormData(prev => ({ ...prev, city: '' }));
      }
    } else {
      setAvailableCities([]);
      setFormData(prev => ({ ...prev, city: '' }));
    }
  }, [formData.country, formData.city]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCountryChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      country: value,
      city: '' // Reset city when country changes
    }));
  };

  const handleCityChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      city: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update profile in context
    updateUserProfile(formData);
    
    // Navigate back to dashboard
    navigate('/artist-dashboard');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
         <div className="flex justify-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Edit Profile</h1>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name" className="text-gray-700 font-medium">
              Full Name
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full border-gray-300 focus:border-sky-500"
              required
            />
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              Email Address
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border-gray-300 focus:border-sky-500"
              required
            />
          </div>

          {/* Store Name */}
          <div className="space-y-2">
            <Label htmlFor="storename" className="text-gray-700 font-medium">
              Store Name
            </Label>
            <Input
              id="storename"
              name="storename"
              value={formData.storename}
              onChange={handleInputChange}
              className="w-full border-gray-300 focus:border-sky-500"
            />
          </div>

          {/* Country & City */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Country */}
            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <Select
                value={formData.country || ""}
                onValueChange={handleCountryChange}
              >
                <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
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
            </div>

            {/* City */}
            <div className="space-y-2">
              <Label htmlFor="city">City</Label>
              <Select
                value={formData.city || ""}
                onValueChange={handleCityChange}
                disabled={!formData.country}
              >
                <SelectTrigger className="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent">
                  <SelectValue 
                    placeholder={formData.country ? "Select city" : "Select country first"} 
                  />
                </SelectTrigger>
                <SelectContent>
                  {availableCities.map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 pt-6 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/artist-dashboard')}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-sky-500 hover:bg-sky-600 text-white"
            >
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;