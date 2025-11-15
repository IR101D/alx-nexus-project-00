import Link from 'next/link';

export default function HomePage() {
  // Why Choose Us data
  const features = [
    {
      title: "Luxury facilities",
      description: "The advantage of hiring a workspace with us is that givees you comfortable service and all-around facilities."
    },
    {
      title: "Affordable Price",
      description: "You can get a workspace of the highst quality at an affordable price and still enjoy the facilities that are oly here."
    },
    {
      title: "Many Choices",
      description: "We provide many unique work space choices so that you can choose the workspace to your liking."
    },
  ];

  // Categories data
  const categories = [
    {
      image: "/assets/living.png",
      title: "Living Room",
      count: "24 Products"
    },
    {
      image: "/assets/bedroom.png",
      title: "Bedroom",
      count: "18 Products"
    },
    {
      image: "/assets/Dining.png",
      title: "Dining",
      count: "15 Products"
    },
    {
      image: "/assets/experiences.png",
      title: "Office",
      count: "12 Products"
    }
  ];

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Home Owner",
      image: "/assets/review1.png",
      rating: 5,
      review: "The quality of the furniture exceeded my expectations. The delivery was prompt and the setup was professional.",
      date: "2 weeks ago"
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Interior Designer",
      image: "/assets/review2.png",
      rating: 5,
      review: "As a professional designer, I appreciate the attention to detail and craftsmanship. My clients are always impressed.",
      date: "1 month ago"
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Business Owner",
      image: "/assets/review1.png",
      rating: 4,
      review: "Beautiful furniture that transformed our office space. The team was helpful throughout the process.",
      date: "3 weeks ago"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen bg-cover bg-center bg-no-repeat"
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
            <button className="bg-[#B88E2F] text-black px-8 py-4 rounded-lg text-lg font-semibold hover:bg-[#A67C2A] transition-colors duration-200">
              Shop Collection
            </button>
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-xl text-gray-600">Find the perfect furniture for every room</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {categories.map((category, index) => (
              <div key={index} className="group cursor-pointer">
                <div className="relative h-80 overflow-hidden rounded-lg mb-4">
                  <div 
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat group-hover:scale-110 transition-transform duration-200"
                    style={{ backgroundImage: `url(${category.image})` }}
                  ></div>
                {/**  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300"></div>
                */}   <div className="absolute bottom-4 left-4 text-yellow-800">
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <button className="border-2 border-[#B88E2F] text-[#B88E2F] px-8 py-3 rounded-lg font-semibold hover:bg-[#B88E2F] hover:text-white transition-all duration-200">
              Show More Categories
            </button>
          </div>
        </div>
      </section>

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
              <button className="bg-[#B88E2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#A67C2A] transition-colors duration-200">
                Learn About Our Process
              </button>
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
              <button className="bg-[#B88E2F] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#A67C2A] transition-colors duration-200">
                Book a Consultation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Reviews Section */}
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
    </div>
  );
}