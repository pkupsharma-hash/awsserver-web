"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 APNA ASLI WHATSAPP NUMBER YAHAN BHI DAALEIN (Country code ke sath)
  const myPhoneNumber = "918219417584";

  useEffect(() => {
    axios.get("https://awsserver-web.onrender.com/api/products")
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  // WhatsApp par bhejne ka function
  const handleBuyNow = (itemName: string, itemPrice: number) => {
    const message = `Hi AWSServer team! I want to purchase your product: *${itemName}* for ₹${itemPrice}. Please send me the details.`;
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        {/* Back Button and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <Link href="/">
            <button className="ai-button" style={{ padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>
            Our <span style={{ background: 'linear-gradient(to right, #ea4335, #fbbc05)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Products</span>
          </h1>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', fontSize: '1.5rem', color: '#fbbc05' }}>
            Loading Products...
          </div>
        ) : products.length === 0 ? (
          <div className="glass-card" style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', margin: 0 }}>No Products Available!</h2>
            <p style={{ fontSize: '1.2rem', color: '#d1d5db', margin: 0 }}>
              Jald hi hum Admin Panel se yahan shandaar software products add karenge.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {products.map((product: any) => (
              <div key={product._id} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ea4335', margin: 0 }}>{product.name}</h2>
                <span style={{ display: 'inline-block', padding: '5px 12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '0.9rem', width: 'fit-content' }}>
                  {product.category}
                </span>
                <p style={{ color: '#d1d5db', lineHeight: '1.6', flexGrow: 1, margin: 0 }}>{product.description}</p>
                <h3 style={{ fontSize: '1.4rem', color: '#fbbc05', margin: 0, fontWeight: 'bold' }}>₹{product.price}</h3>
                
                {/* Button mein onClick function lagaya hai */}
                <button 
                  onClick={() => handleBuyNow(product.name, product.price)}
                  className="ai-button" 
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginTop: '10px' }}
                >
                  <ShoppingCart size={18} /> Buy Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}