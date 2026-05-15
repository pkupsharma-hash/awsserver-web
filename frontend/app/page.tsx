"use client";
import { ArrowRight, Box, Code, Globe, Smartphone, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px', gap: '80px', paddingBottom: '80px' }}>
      
      {/* === 1. HERO SECTION === */}
      <div className="glass-card" style={{ maxWidth: '900px', width: '100%', padding: '80px 40px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '30px', marginTop: '20px' }}>
        <div style={{ display: 'inline-block', padding: '8px 20px', background: 'rgba(66, 133, 244, 0.1)', border: '1px solid rgba(66, 133, 244, 0.3)', borderRadius: '50px', color: '#4285f4', fontWeight: 'bold', letterSpacing: '1px', fontSize: '0.9rem', marginBottom: '-10px' }}>
          WELCOME TO THE FUTURE OF IT
        </div>
        
        <h1 style={{ fontSize: '4rem', fontWeight: 'bold', margin: 0, lineHeight: '1.2' }}>
          We Build <br/>
          <span style={{ background: 'linear-gradient(to right, #4285f4, #9b72cb, #ea4335)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
            Digital Experiences
          </span>
        </h1>
        
        <p style={{ fontSize: '1.2rem', color: '#d1d5db', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          AWSServer is your premium partner for Custom Software Development, High-End Web Design, and Next-Gen IT Solutions. We transform your ideas into reality.
        </p>
        
        <div style={{ marginTop: '10px', display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/services" style={{ textDecoration: 'none' }}>
            <button className="ai-button" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '12px 30px' }}>
              Explore Services <ArrowRight size={20} />
            </button>
          </Link>
          <Link href="/products" style={{ textDecoration: 'none' }}>
            <button className="ai-button" style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '12px 30px', filter: 'hue-rotate(90deg)' }}>
              View Products <Box size={20} />
            </button>
          </Link>
        </div>
      </div>

      {/* === 2. WHAT WE DO SECTION === */}
      <div style={{ maxWidth: '1200px', width: '100%', display: 'flex', flexDirection: 'column', gap: '40px' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffffff', margin: '0 0 15px 0' }}>Our <span style={{ color: '#4285f4' }}>Expertise</span></h2>
          <p style={{ color: '#9ca3af', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>Hum aadhunik (modern) technology ka use karke aapke business ko grow karne mein madad karte hain.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          
          <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(66, 133, 244, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4285f4' }}>
              <Globe size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#ffffff', margin: 0 }}>Web Development</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>High-speed, SEO friendly aur fully responsive websites jo aapke brand ko ek premium look deti hain.</p>
          </div>

          <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(234, 67, 53, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#ea4335' }}>
              <Smartphone size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#ffffff', margin: 0 }}>App Development</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>Android aur iOS ke liye smooth, secure aur user-friendly mobile applications ka nirman.</p>
          </div>

          <div className="glass-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ width: '50px', height: '50px', borderRadius: '12px', background: 'rgba(251, 188, 5, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fbbc05' }}>
              <Code size={28} />
            </div>
            <h3 style={{ fontSize: '1.5rem', color: '#ffffff', margin: 0 }}>Custom Software</h3>
            <p style={{ color: '#d1d5db', lineHeight: '1.6', margin: 0 }}>Aapke business ki zaroorat ke hisaab se tailor-made software solutions aur CRM systems.</p>
          </div>

        </div>
      </div>

      {/* === 3. WHY CHOOSE US SECTION === */}
      <div className="glass-card" style={{ maxWidth: '1200px', width: '100%', padding: '50px', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-around', gap: '40px' }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#ffffff', margin: '0 0 20px 0' }}>Why <span style={{ color: '#ea4335' }}>AWSServer?</span></h2>
          <p style={{ color: '#d1d5db', fontSize: '1.1rem', lineHeight: '1.6', marginBottom: '30px' }}>
            Hum sirf code nahi likhte, hum digital solutions create karte hain jo result dete hain. Hamari team latest AI aur Cloud technologies ka use karti hai.
          </p>
          <Link href="/contact" style={{ textDecoration: 'none' }}>
            <button className="ai-button" style={{ padding: '10px 25px' }}>Contact Us Today</button>
          </Link>
        </div>
        
        <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Shield color="#34a853" size={32} />
            <div>
              <h4 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.2rem' }}>100% Secure</h4>
              <p style={{ color: '#9ca3af', margin: 0 }}>Advanced security protocols for your data.</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <Zap color="#fbbc05" size={32} />
            <div>
              <h4 style={{ color: 'white', margin: '0 0 5px 0', fontSize: '1.2rem' }}>Lightning Fast</h4>
              <p style={{ color: '#9ca3af', margin: 0 }}>Optimized performance for better SEO & UX.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}