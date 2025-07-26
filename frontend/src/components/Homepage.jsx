import React from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-orange-50 h-[100vh] py-30 px-6 md:px-12 lg:px-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12">
        {/* Text Content */}
        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Premium Raw Materials for <span className="text-orange-500">Street Food Vendors</span>
          </h1>
          <p className="text-lg text-gray-600">
            From fresh spices to essential ingredients, we supply everything your stall needs to serve delicious street food. Delivered fast and affordably.
          </p>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition"
            onClick={() => navigate('/all-products')}
          >
            Browse Products
          </button>
        </div>

        {/* Image */}
        <div className="relative w-full h-96 lg:h-[450px]">
          <img
            src="https://media.istockphoto.com/id/1644577817/photo/assortment-of-various-types-of-vegetables-arranged-in-a-rainbow-gradient-pattern.webp?a=1&b=1&s=612x612&w=0&k=20&c=BWzxygiskIvtywJ34RSduTn09VjcnVTCF6lsCRyAXJI="
            alt="Raw street food materials"
            className="rounded-2xl object-cover w-full h-full shadow-xl"
          />
          <div className="absolute bottom-4 left-4 bg-white/90 px-4 py-2 rounded-xl shadow-md text-sm text-gray-700">
            Fresh, bulk ingredients at your doorstep 🍅🌶️🥔
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
