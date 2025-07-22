// components/Accreditation.tsx
import React from "react";

const CompaniesSection: React.FC = () => {
  // Array of images within the component
  const images = [
    "/company-01.svg",  // Replace with the actual path to your images
    "/company-02.svg",
    "/company-03.svg",
    "/company-01.svg",  // Replace with the actual path to your images
    "/company-02.svg",
    "/company-03.svg",
  ];

  return (
    <section className="text-center  max-w-[1366px] px-4 md:px-8 lg:px-16 py-16 lg:py-20">
      <h3 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-6">Accreditation & Certifications</h3>
      <p className="mb-8 text-gray-600">Accreditations and certifications that validate our commitment and trustworthiness.</p>
      <div className="flex justify-center flex-wrap gap-10">
        {images.map((image, index) => (
          <div key={index} className=" w-auto  h-[70px]">
            <img 
              src={image} 
              alt={`Certification ${index + 1}`} 
              className="object-contain w-full h-full" 
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CompaniesSection;
