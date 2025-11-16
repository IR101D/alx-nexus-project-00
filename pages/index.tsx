import Link from 'next/link';
import { categories, features, reviews } from '@/constants/data';
import Reviews from '@/components/HomePage/reviews';
import Categories from '@/components/HomePage/categories';
import Button from '@/components/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="border-2 relative h-screen bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/assets/hero-section.jpg')" }}
      >
        {/* <div className="absolute inset-0 bg-black bg-opacity-40"></div> */}

        <div className="relative h-full flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-7xl font-bold text-black mb-6">
              Elevate Your Living Space
            </h1>
            <p className="text-xl md:text-2xl text-black mb-8 max-w-2xl mx-auto">
              Discover premium furniture that combines style, comfort, and durability for your dream home.
            </p>
            <Button className="border-2 px-8 py-4 rext-lg font-semibold">
              Shop Collection
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why <br/> Choose Us</h2>
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <Categories/>
      {/* Serious Materials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Serious Materials for Making the Best Furniture
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                We source only the finest materials from sustainable forests and trusted suppliers. 
                Each piece of wood is carefully selected for its grain, durability, and beauty.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our commitment to quality extends beyond materials to craftsmanship. Every joint, 
                finish, and detail is executed with precision by our skilled artisans.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-gray-700">
                  <span className="text-[#B88E2F] mr-3">✓</span>
                  Solid hardwoods from sustainable sources
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-[#B88E2F] mr-3">✓</span>
                  Non-toxic, eco-friendly finishes
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-[#B88E2F] mr-3">✓</span>
                  Reinforced joinery for lasting durability
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="text-[#B88E2F] mr-3">✓</span>
                  Quality testing at every production stage
                </li>
              </ul>
            </div>
            <div className="relative">
              <div 
                className="h-96 lg:h-[500px] rounded-lg bg-cover bg-center bg-no-repeat shadow-lg"
                style={{ backgroundImage: "url('/assets/serious-material.png')" }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Experience Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div 
                className="h-96 lg:h-[500px] rounded-lg bg-cover bg-center bg-no-repeat shadow-lg"
                style={{ backgroundImage: "url('/assets/experiences.png')" }}
              ></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                We Provide You the Best Experience
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                From the moment you browse our collection to the day your furniture arrives, 
                we're dedicated to making your experience exceptional.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Our design consultants help you choose the perfect pieces, our craftsmen 
                build with care, and our delivery team ensures everything arrives in perfect condition.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Personal Design Consultation</h4>
                  <p className="text-gray-600 text-sm">Expert advice for your space</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">White Glove Delivery</h4>
                  <p className="text-gray-600 text-sm">Professional setup and placement</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Flexible Financing</h4>
                  <p className="text-gray-600 text-sm">Payment plans available</p>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Satisfaction Guarantee</h4>
                  <p className="text-gray-600 text-sm">Love it or return it</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
     <Reviews/>
    </div>
  );
}