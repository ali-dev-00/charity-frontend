import React from 'react';

const PurposeSection = () => {
  return (
    <section className="bg-white">
      <div className="max-w-[1366px] py-16 px-4 md:px-8 lg:px-16 mx-auto flex flex-col lg:flex-row items-center justify-between">
        {/* Text Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Guided by Purpose, Driven by Vision
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto lg:mx-0">
            At Olad Foundation, our mission is to uplift underprivileged communities through targeted programs in education, healthcare, and social support. We believe in creating long-term, sustainable impact that empowers individuals to break cycles of poverty and live with dignity.
          </p>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto lg:mx-0">
            We envision a world where every person has equal access to opportunity, compassion, and the resources needed to thrive. Our vision fuels every initiative we launch — building a more inclusive, empowered, and hopeful future for all.
          </p>
        </div>

        {/* Image Section */}
        <div className="lg:w-1/2 mt-8 lg:mt-0">
          <img
            src="/about/guided.svg" // Replace with your image path
            alt="Group of people"
            className="rounded-lg shadow-lg w-full h-auto object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;
