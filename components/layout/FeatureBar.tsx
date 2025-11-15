import React from "react";
import { ShieldCheck, CircleCheck, LockKeyholeOpen, Headset } from 'lucide-react';

// components/FeatureBar.tsx
const FeatureBar: React.FC = () => {

  const features = [
    {
      icon: <CircleCheck/>,
      title: 'High Quality',
      description: 'Premium materials & craftsmanship'
    },
    {
      icon: <ShieldCheck/>,
      title: 'Warranty Protection',
      description: 'Over 2 years'
    },
    {
      icon: <LockKeyholeOpen/>,
      title: 'Free Shipping',
      description: 'Orders over 150 $'
    },
    {
      icon: <Headset/>,
      title: '24/7 Support',
      description: 'Dedicated support'
    }
  ];

  return (
    <div className="bg-white border-y border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-8">
          {features.map((feature, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-12 h-12 bg-[#FAF3EA] rounded-lg flex items-center justify-center text-black-600">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-black-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureBar;