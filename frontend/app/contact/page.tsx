"use client";
import { useState } from "react";
import { ArrowLeft, Send, MapPin, Mail, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // 👇 APNA ASLI WHATSAPP NUMBER YAHAN DAALEIN
  const myPhoneNumber = "918219417584";

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    const waMessage = `Hello AWSServer Team!\n\nMy Name: ${name}\nMy Email: ${email}\n\nMessage: ${message}`;
    const whatsappUrl = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(waMessage)}`;
    window.open(whatsappUrl, '_blank');
    setName(""); setEmail(""); setMessage("");
  };

  const inputStyle = {
    width: "100%", padding: "12px", borderRadius: "8px", 
    background: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.2)", 
    color: "white", marginBottom: "15px", outline: "none"
  };

  return (
    <div style={{ minHeight: '100vh', padding: '40px 20px', position: 'relative', zIndex: 10 }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        
        {/* Back Button and Title */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
          <Link href="/">
            <button className="ai-button" style={{ padding: '12px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ArrowLeft size={24} />
            </button>
          </Link>
          <h1 style={{ fontSize: '3rem', fontWeight: 'bold', margin: 0, color: '#ffffff' }}>
            Contact <span style={{ background: 'linear-gradient(to right, #4285f4, #ea4335)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Us</span>
          </h1>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          
          {/* Contact Information Card */}
          <div className="glass-card" style={{ flex: '1 1 300px', padding: '40px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#fbbc05', margin: 0 }}>Get in Touch</h2>
            <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>
              Kkisi bhi IT Service, Software Development ya Business inquiry ke liye humse sampark karein. Hum 24/7 uplabdh hain.
            </p>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'white' }}>
              <MapPin color="#ea4335" />
              <span>Block-C, 30, Hastsal Vihar, New Delhi-110059</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'white' }}>
              <Mail color="#4285f4" />
              <span>contact@awsserver.online</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px', color: 'white' }}>
              <Phone color="#34a853" />
              <span>+91 8219417584</span>
            </div>
          </div>

          {/* Contact Form Card */}
          <div className="glass-card" style={{ flex: '2 1 400px', padding: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', color: '#4285f4', marginBottom: '20px' }}>Send us a Message</h2>
            <form onSubmit={handleSendMessage}>
              <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} required />
              <input type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} required />
              <textarea placeholder="How can we help you?" value={message} onChange={(e) => setMessage(e.target.value)} style={{ ...inputStyle, minHeight: "120px" }} required />
              
              <button type="submit" className="ai-button" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', width: '100%', marginTop: '10px' }}>
                <Send size={18} /> Send to WhatsApp
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
}