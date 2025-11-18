import { CartState } from "@/interfaces";
import Products from "@/pages/products";

// Why Choose Us data
  export const features = [
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
  export const categories = [
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
  export const reviews = [
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
  {/* Products Data */}
  export const ProductsData = [
        { id: 1, name: "Modern Sofa", price: 1299, image: "/assets/images/sofa.jpg", category: "living-room", rating: 4.5, inStock: true },
        { id: 2, name: "Wooden Dining Table", price: 899, image: "/assets/images/dining-table.jpg", category: "dining", rating: 4.8, inStock: true },
        { id: 3, name: "Queen Size Bed", price: 1599, image: "/assets/images/bed.jpg", category: "bedroom", rating: 4.7, inStock: false },
        { id: 4, name: "Office Chair", price: 299, image: "/assets/images/office-chair.jpg", category: "office", rating: 4.3, inStock: true },
        { id: 5, name: "Bookshelf", price: 459, image: "/assets/images/bookshelf.jpg", category: "living-room", rating: 4.6, inStock: true },
        { id: 6, name: "Coffee Table", price: 349, image: "/assets/images/coffee-table.jpg", category: "living-room", rating: 4.4, inStock: true },
        { id: 7, name: "Wardrobe", price: 1299, image: "/assets/images/wardrobe.jpg", category: "bedroom", rating: 4.9, inStock: true },
        { id: 8, name: "Dining Chairs (Set of 4)", price: 599, image: "/assets/images/dining-chairs.jpg", category: "dining", rating: 4.2, inStock: false },
        { id: 9, name: "Desk", price: 499, image: "/assets/images/desk.jpg", category: "office", rating: 4.5, inStock: true },
        { id: 10, name: "TV Stand", price: 399, image: "/assets/images/tv-stand.jpg", category: "living-room", rating: 4.3, inStock: true },
        { id: 11, name: "Nightstand", price: 199, image: "/assets/images/nightstand.jpg", category: "bedroom", rating: 4.7, inStock: true },
        { id: 12, name: "Bar Stool", price: 149, image: "/assets/images/bar-stool.jpg", category: "dining", rating: 4.1, inStock: true },
      ];

  export const productData = {
    id: 1,
    name: "Modern Luxury Sofa",
    price: 1299,
    rating: 4.5,
    reviewCount: 24,
    images: [
      "/assets/images/sofa-1.jpg",
      "/assets/images/sofa-2.jpg",
      "/assets/images/sofa-3.jpg",
      "/assets/images/sofa-4.jpg"
    ],
    colors: [
      { name: "Charcoal Gray", value: "#374151", inStock: true },
      { name: "Navy Blue", value: "#1E40AF", inStock: true },
      { name: "Forest Green", value: "#065F46", inStock: false },
      { name: "Cream White", value: "#FEF3C7", inStock: true }
    ],
    sizes: ["Small", "Medium", "Large"],
    description: "Experience ultimate comfort and style with our Modern Luxury Sofa. Crafted with premium materials and expert craftsmanship, this sofa is designed to be the centerpiece of your living room.",
    features: [
      "Premium hardwood frame for durability",
      "High-density foam cushions for comfort",
      "Removable, washable covers",
      "Stain-resistant fabric",
      "Easy assembly with included tools"
    ],
    dimensions: {
      width: "88 inches",
      depth: "38 inches",
      height: "32 inches",
      weight: "120 lbs"
    },
    specifications: {
      material: "100% Polyester Fabric",
      frame: "Solid Hardwood",
      filling: "High-Density Foam",
      care: "Spot clean with mild detergent"
    }
  };
  
export const Productsreviews = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Home Owner",
    image: "/assets/images/reviewer1.jpg",
    rating: 5,
    review: "Absolutely love this sofa! It's even more comfortable than I expected. The quality is outstanding and it looks beautiful in our living room.",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Interior Designer",
    image: "/assets/images/reviewer2.jpg",
    rating: 4,
    review: "Great value for the price. The fabric is durable and the construction is solid. My clients have been very happy with this piece.",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Business Owner",
    image: "/assets/images/reviewer3.jpg",
    rating: 5,
    review: "Perfect for our office lobby. Comfortable for clients and very stylish. The delivery was professional and setup was quick.",
    date: "3 weeks ago"
  }
];


