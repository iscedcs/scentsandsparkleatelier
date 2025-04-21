import { Product } from "@/components/product-grid";

export const products: Product[] = [
    {
      id: "1",
      name: "Love Spell Scented Candle",
      description: "Soft, romantic, and enchanting. Love Spell wraps your space in a dreamy blend of sweet notes of cashmere vanilla, pomegranate, blueberry muffin and many more creating an atmosphere of warmth and affection. One light, and it’s love at first scent.",
      image: "/products/IMG_2336.JPG",
      price: "₦13,000",
      category: "Signature",
    },
    {
      id: "2",
      name: "Sweet Lychee",
      description: "Juicy, vibrant, and irresistibly sweet. Sweet Lychee fills your space with the fresh, tropical aroma of bergamot, vetiver leathery undertone and floral scent of ylang ylang. One light, and your room transforms into a sweet escape.",
      image: "/products/sweet.jpeg",
      price: "₦13,000",
      category: "Signature",
    },
    {
      id: "3",
      name: "Fruiti",
      description: "Citrus scents are known to reduce stress and anxiety, promoting a sense of calm and well-being. invigorating aroma of citrus scented candles, expertly crafted to uplift and revitalize your space. These candles combine the natural essence of citrus fruits – lemons, limes, oranges, and grapefruits – to create a refreshing ambiance that's perfect for any room.",
      image: "/products/IMG_2256.JPG",
      price: "₦12,000",
      category: "Signature",
    },
    {
      id: "4",
      name: "Habibi Tings",
      description: "Light it up, this candle fills your space with a rich, cozy scent that lingers. A bold blend of warm cinnamon, deep woody notes, and a touch of sweet blood orange. Comfort in a jar, crafted just for you.",
      image: "/products/IMG_7224.JPG",
      price: "₦12,500",
      category: "Relaxing",
    },
    {
      id: "5",
      name: "Sweet Macarons",
      description: "This mouth watering macaron candle is perfect to give as a gift to your beloved ones, or to use as a home decoration. The candle is made from high quality soy wax and strongly scented with notes of buttermilk pancake, strawberry milk, blueberry muffin and vanilla.",
      image: "/products/photo_2025-04-13_22-15-45.jpg",
      price: "₦15,500",
      category: "Classic",
    },
    {
      id: "6",
      name: "Citrus Burst",
      description: "An energizing blend of citrus notes that brings a fresh, clean scent to your space.",
      image: "/products/IMG_2337.JPG",
      price: "₦8,500",
      category: "Energizing",
    },
    {
      id: "7",
      name: "Earthy Room Spray",
      description: "Earthy – A Breath of Nature 🌿✨ Grounding, fresh, and effortlessly calming. Earthy brings the outdoors in with rich, natural notes that create a peaceful, refreshing atmosphere. One spritz, and your space feels like a deep breath of fresh air.",
      image: "/products/photo_2025-04-13_22-16-10.jpg",
      price: "₦12,000",
      category: "Fresh",
    },
    {
      id: "8",
      name: "Love Notes Room Spray",
      description: "A scent that feels like a love letter in the air. Love Notes fills your space with a soft, warm fragrance that lingers beautifully, comforting and inviting, Just one spritz, and your room feels like magic.",
      image: "/products/photo_2025-04-13_22-16-15.jpg",
      price: "₦12,000",
      category: "Floral",
    },
    {
      id: "9",
      name: "Charm Room Spray",
      description: "One spray, and your space comes alive. Charm is light, inviting, and lingers just enough to make an impression. Perfect for those who love a scent that feels warm, elegant, and effortlessly fresh.",
      image: "/products/photo_2025-04-13_22-16-23.jpg",
      price: "₦12,000",
      category: "Seasonal",
    },
    {
      id: "10",
      name: "Citrus Diffuser",
      description: "Fresh, Zesty, Uplifting Bright, crisp, and full of life. This citrus-infused diffuser blends oranges, lemons, and grapefruits to energize your space and keep it smelling clean and refreshing all day.",
      image: "/products/photo_2025-04-13_22-16-30.jpg",
      price: "₦15,000 - ₦20,000",
      category: "Seasonal",
    },
    {
      id: "11",
      name: "Oud Mist Diffuser",
      description: "Bold, Rich, Timeless Deep, woody, and effortlessly luxurious. Oud Mist fills your space with the warm, smoky essence of oud, blended with rich, lingering notes that create a sense of mystery and sophistication.",
      image: "/products/photo_2025-04-13_22-16-33.jpg",
      price: "₦15,000 - ₦20,000",
      category: "Seasonal",
    },
    {
      id: "12",
      name: "Love Notes Diffuser",
      description: "Love Notes – Soft, Sweet, Romantic A scent that feels like love at first whiff. Love Notes is a dreamy blend of soft florals, warm vanilla, and a hint of musk perfect for creating a cozy, intimate atmosphere.",
      image: "/products/photo_2025-04-13_22-16-35.jpg",
      price: "#15,000",
      category: "Seasonal",
    },
    {
      id: "13",
      name: "Redolent",
      description: "Rich, bold, and unforgettable. Redolent fills your space with a lingering aroma that captivates the senses. Warm, inviting, and deeply comforting. This is the scent that turns moments into memories. Infused with notes of pomegranate, refreshing aroma of pineapple and passion fruit.",
      image: "/products/IMG_2242.JPG",
      price: "₦10,000",
      category: "Seasonal",
    },
  ]

  export const NAVLINKS: {
	name: string;
	href: string;
	title: string;
}[] = [
	{
		name: 'home',
		href: '/',
		title: 'HOME',
	},
	{
		name: 'about',
		href: '/about',
		title: 'ABOUT',
	},

	{
		name: 'collections',
		href: '/collections',
		title: 'COLLECTIONS',
	},
	{
		name: 'contact',
		href: '/contact',
		title: 'CONTACT',
	},
];