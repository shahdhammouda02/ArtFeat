import { Auth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";

const ArtistDashboard = () => {
  const { user, isAuthenticated } = Auth();

  if (!isAuthenticated || user?.type !== 'artist') {
    return <Navigate to="/signin" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}! 🎨
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your artistic portfolio and track your creative journey
          </p>
        </div>

        {/* Artist Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-sky-600">12</div>
            <p className="text-gray-600">Artworks</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-gray-600">Sales</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-purple-600">156</div>
            <p className="text-gray-600">Views</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="text-2xl font-bold text-orange-600">4.8</div>
            <p className="text-gray-600">Rating</p>
          </div>
        </div>

        {/* Artist Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🎨</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Upload New Artwork</h3>
            <p className="text-gray-600 mb-4">Share your latest creation with the world</p>
            <button className="w-full bg-sky-500 text-white py-2 px-4 rounded-lg hover:bg-sky-600 transition-colors">
              Upload Art
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Sales & Analytics</h3>
            <p className="text-gray-600 mb-4">Track your sales and audience engagement</p>
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors">
              View Analytics
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">👤</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Artist Profile</h3>
            <p className="text-gray-600 mb-4">Update your portfolio and artist bio</p>
            <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600 transition-colors">
              Edit Profile
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">💼</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Commission Requests</h3>
            <p className="text-gray-600 mb-4">Manage custom commission orders</p>
            <button className="w-full bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
              View Requests
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">🛒</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Online Store</h3>
            <p className="text-gray-600 mb-4">Manage your products and inventory</p>
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">
              Manage Store
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-2xl">📢</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Promotions</h3>
            <p className="text-gray-600 mb-4">Create promotions and discounts</p>
            <button className="w-full bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition-colors">
              Run Promotion
            </button>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">New commission request</p>
                  <p className="text-gray-600 text-sm">From Sarah Johnson</p>
                </div>
                <span className="text-sm text-gray-500">2 hours ago</span>
              </div>
            </div>
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">Artwork "Sunset Dreams" sold</p>
                  <p className="text-gray-600 text-sm">$450 • Print</p>
                </div>
                <span className="text-sm text-gray-500">1 day ago</span>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">New follower</p>
                  <p className="text-gray-600 text-sm">ArtEnthusiast23 started following you</p>
                </div>
                <span className="text-sm text-gray-500">2 days ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDashboard;