import React from "react"
import { categories } from "@/constants/data"
import Button from "../Button"
import Link from "next/link"
const Categories: React.FC = () => {
    return (
        <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
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
                */}   <div className="absolute bottom-4 left-4 text-black-800">
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>  
          <div className="text-center">
            <Link href='/products'>
            <Button className="border-1 px-8 py-3 rounded-lg ">
              Show More Categories
            </Button>
            </Link>
          </div>
        </div>
      </section>

    )
}
export default Categories;