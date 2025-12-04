import React from "react";
import { TEAM_MEMBERS } from "@/data/team";
import type { TeamMember } from "@/types/team";

const TeamSection: React.FC = () => {
  return (
    <section className="bg-[#F8FBFE] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto text-center">
        {/* ✅ العنوان بنفس ستايل الأقسام السابقة */}
        <h2 className="text-4xl md:text-5xl font-extrabold inline-block relative mb-3">
          <span className="relative z-10">Meet Our Team</span>
          <span className="absolute left-0 bottom-1 w-full h-[40%] bg-sky-200 z-0"></span>
        </h2>
        <p className="text-gray-500 mb-12">
          Talented individuals united by a shared passion for innovation and
          excellence.
        </p>

        {/* ✅ بطاقات الفريق */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member: TeamMember, index: number) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm p-8 flex flex-col justify-between items-center text-center hover:shadow-lg transition duration-300 h-[450px]"
            >
              {/* القسم العلوي */}
              <div className="flex flex-col items-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-28 h-28 rounded-full object-cover mb-5 border-4 border-white shadow-md"
                />

                <h3 className="text-xl font-bold text-gray-900 mb-1 line-clamp-1">
                  {member.name}
                </h3>

                <p className="text-[#00A8E8] text-sm font-semibold mb-4 line-clamp-2">
                  {member.role}
                </p>

                <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">
                  {member.description}
                </p>
              </div>

              {/* أيقونة LinkedIn */}
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00A8E8] hover:text-[#0077b5] transition mt-6"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-7 h-7"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.762 2.239 5 5 5h14c2.762 0 5-2.238 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.804-1.75-1.732s.784-1.732 1.75-1.732 1.75.804 1.75 1.732-.784 1.732-1.75 1.732zm13.5 11.268h-3v-5.604c0-1.337-.028-3.059-1.862-3.059-1.863 0-2.148 1.454-2.148 2.959v5.704h-3v-10h2.884v1.367h.041c.402-.763 1.386-1.563 2.851-1.563 3.05 0 3.234 2.007 3.234 4.619v5.577z" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
