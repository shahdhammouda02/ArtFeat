import React from "react";

const WhyArtFeat: React.FC = () => {
  return (
    <section className="bg-[#F8FBFE] py-20 px-6 md:px-16 relative overflow-hidden">
      {/* دوائر زخرفية خلفية */}
      <div className="absolute bottom-10 left-10 w-24 h-24 bg-[#E0F2FE] rounded-full opacity-40"></div>
      <div className="absolute top-20 right-20 w-16 h-16 bg-[#FDE68A] rounded-full opacity-40"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 relative z-10">
        {/* النصوص */}
        <div className="flex-1">
          <span className="inline-block bg-[#E7F5FF] text-[#0077B6] px-4 py-1 rounded-full text-sm font-medium mb-4">
            ABOUT US
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why <span className="text-[#1A1A1A]">ArtFeat</span>
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">
            Our platform offers a distinctive display of paintings and pictures
            that highlight the beauty of the tourist areas in Palestine. It also
            allows the artist to establish his own store to display and market
            his artwork, with an emphasis on the policy of protecting
            intellectual property rights and applying high quality standards to
            ensure the preservation of the originality of artwork.
          </p>

          <p className="text-gray-600 mb-6 leading-relaxed">
            We are working to provide a unique user experience using blockchain
            technology to support our site in the future.
          </p>

          <ul className="space-y-3 text-gray-800 mb-8">
            <li className="flex items-start gap-2">
              <span className="text-[#00A8E8] text-lg">•</span>
              Distinctive display of paintings and artwork
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00A8E8] text-lg">•</span>
              Personal artist stores and marketplace
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00A8E8] text-lg">•</span>
              Intellectual property rights protection
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#00A8E8] text-lg">•</span>
              Blockchain technology integration
            </li>
          </ul>

          <button className="flex items-center gap-2 border border-[#00A8E8] text-[#00A8E8] px-5 py-2 rounded-full hover:bg-[#00A8E8] hover:text-white transition">
            Learn More <span>→</span>
          </button>
        </div>

        {/* الصور */}
        <div className="flex-1 flex justify-center relative">
          <div className="relative w-full max-w-md">
            {/* الصورة الخلفية (الفراشة) */}
            <img
              src="https://images.unsplash.com/photo-1616400619175-5c1f2c3b81cc?q=80&w=400&auto=format&fit=crop"
              alt="Butterfly Art"
              className="absolute top-10 left-0 w-40 h-48 rounded-xl object-cover shadow-md"
            />

            {/* الصورة المتوسطة (المربعات الملونة) */}
            <img
              src="https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0?q=80&w=400&auto=format&fit=crop"
              alt="Abstract Colors"
              className="absolute top-20 left-24 w-44 h-52 rounded-xl object-cover shadow-lg"
            />

            {/* الصورة الأمامية (وجه فني) */}
            <img
              src="https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=400&auto=format&fit=crop"
              alt="Portrait Art"
              className="relative z-10 w-52 h-60 rounded-xl object-cover shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyArtFeat;
