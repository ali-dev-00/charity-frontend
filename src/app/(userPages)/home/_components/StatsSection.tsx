
import React from 'react';

const StatsSection = () => {
  const stats = [
    { number: '15+', label: 'Total Clients' },
    { number: '10+', label: 'Team Members' },
    { number: '30+', label: 'Project Done' },
    { number: '99%', label: 'Customer Satisfaction' }
  ];

  return (
    <section className="bg-[#F9F4E8] ">
      <div className="max-w-[1366px] mx-auto py-16 px-4 md:px-8 lg:px-16 ">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              See the Difference<br />
              We Make
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              Together, we're reaching the unreachable—restoring<br />
              dignity, empowering futures, and making meaningful<br />
              change in areas that need it most.
            </p>
          </div>

          {/* Right side - Statistics grid */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-lg p-8 text-center shadow-sm">
                <div className="text-4xl lg:text-5xl font-bold text-[#007466] mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 text-sm font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatsSection;