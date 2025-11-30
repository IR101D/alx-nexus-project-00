// components/ClientReviews.tsx
import { Review, ClientReviewsProps } from "@/interfaces";
import React from "react";
import { reviews } from "@/constants/data";


const Reviews: React.FC= () => {
  return (
     <section className="py-20 bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
                <p className="text-xl text-gray-600">Hear from satisfied customers worldwide</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                    <div className="flex items-center mb-4">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <span 
                            key={i} 
                            className={`text-lg ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6 italic">"{review.review}"</p>
                    <div className="flex items-center">
                      <div 
                        className="w-12 h-12 rounded-full bg-cover bg-center bg-no-repeat mr-4"
                        style={{ backgroundImage: `url(${review.image})` }}
                      ></div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <p className="text-gray-500 text-sm">{review.role}</p>
                        <p className="text-gray-400 text-xs">{review.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
  );
};

export default Reviews;