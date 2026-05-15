"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  // 👇 APNA ASLI WHATSAPP NUMBER YAHAN DAALEIN (Country code ke sath, + mat lagana)
  const myPhoneNumber = "918219417584"; 

  // Backend se data fetch karne ka logic
  useEffect(() => {
    axios.get("https://awsserver-web.onrender.com/api/services")
      .then((response) => {
        setServices(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching services:", error);
        setLoading(false);
      });
  }, []);

  // WhatsApp par bhejne ka function
  const handleBuyNow = (itemName: string, itemPrice: number) => {
    const message = `Hi AWSServer team! I am interested in your service: *${itemName}* for ₹${itemPrice}. Please provide more details.`;
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
            Our <span style={{ background: 'linear-gradient(to right, #4285f4, #9b72cb)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Services</span>
          </h1>
        </div>

        {/* Services Grid or Empty State */}
        {loading ? (
          <div className="glass-card" style={{ padding: '40px', textAlign: 'center', fontSize: '1.5rem', color: '#fbbc05' }}>
            Loading Services...
          </div>
        ) : services.length === 0 ? (
          <div className="glass-card" style={{ padding: '60px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <h2 style={{ fontSize: '2rem', color: '#ffffff', margin: 0 }}>Database abhi khali hai!</h2>
            <p style={{ fontSize: '1.2rem', color: '#d1d5db', margin: 0 }}>
              Jald hi hum Admin Panel se yahan shandaar services add karenge.
            </p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {services.map((service: any) => (
              <div key={service._id} className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#4285f4', margin: 0 }}>{service.title}</h2>
                <span style={{ display: 'inline-block', padding: '5px 12px', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '20px', fontSize: '0.9rem', width: 'fit-content' }}>
                  {service.category}
                </span>
                <p style={{ color: '#d1d5db', lineHeight: '1.6', flexGrow: 1, margin: 0 }}>{service.shortDescription}</p>
                <h3 style={{ fontSize: '1.4rem', color: '#ea4335', margin: 0, fontWeight: 'bold' }}>₹{service.priceStartingFrom}</h3>
                
                {/* Button mein onClick function lagaya hai */}
                <button 
                  onClick={() => handleBuyNow(service.title, service.priceStartingFrom)}
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