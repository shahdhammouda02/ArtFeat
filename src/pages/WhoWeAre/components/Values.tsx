import React from "react";
import { Palette, Users, Heart, Eye } from "lucide-react";

const values = [
  {
    icon: <Palette className="w-8 h-8 text-sky-500" />,
    title: "Creativity",
    desc: "Championing bold artistic expression and innovative approaches to contemporary art.",
  },
  {
    icon: <Users className="w-8 h-8 text-sky-500" />,
    title: "Community",
    desc: "Building inclusive spaces where artists and art lovers connect and collaborate.",
  },
  {
    icon: <Heart className="w-8 h-8 text-sky-500" />,
    title: "Passion",
    desc: "Driven by genuine love for art and commitment to nurturing artistic talent.",
  },
  {
    icon: <Eye className="w-8 h-8 text-sky-500" />,
    title: "Vision",
    desc: "Looking forward to shape the future of contemporary art and cultural dialogue.",
  },
];

const Values: React.FC = () => {
  return (
    <section className="bg-sky-50 py-24 px-6">
      {/* 🔹 العنوان الرئيسي */}
      <div className="text-center mb-12">
        <h2
          className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6"
          style={{ fontFamily: "'Cormorant Garamond', serif" }}
        >
          Our Values
        </h2>
      </div>

      {/* 🔹 بطاقات القيم */}
      <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {values.map((item, i) => (
          <div
            key={i}
            className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition text-left"
          >
            {/* 🔸 الأيقونة */}
            <div className="mb-4">{item.icon}</div>

            {/* 🔸 العنوان */}
            <h3
              className="text-xl font-semibold text-gray-900 mb-3"
              style={{ fontFamily: "'Cormorant Garamond', serif" }}
            >
              {item.title}
            </h3>

            {/* 🔸 الوصف */}
            <p className="text-gray-600 text-sm leading-relaxed">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Values;
