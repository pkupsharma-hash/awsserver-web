import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AWSServer | Premium IT Services & Software Development",
  description: "Custom Software Development, Web Design, and Premium Digital IT Solutions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#000000' }}>
        
        {/* Animated Background Glowing Orbs */}
        <div className="orb-container">
          <div className="orb orb-blue"></div>
          <div className="orb orb-purple"></div>
          <div className="orb orb-pink"></div>
          <div className="orb orb-yellow"></div>
        </div>

        <svg width="0" height="0" style={{ position: 'absolute', display: 'none' }}>
          <linearGradient id="btn-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#4285f4" />
            <stop offset="33%" stopColor="#9b72cb" />
            <stop offset="66%" stopColor="#ea4335" />
            <stop offset="100%" stopColor="#fbbc05" />
          </linearGradient>
        </svg>

        {/* === TOP BLACK MASK (Jadoo Yahan Hai) === */}
        {/* Ye mask upar ke 20px gap ko cover karega taaki scroll karne par text us gap mein na dikhe */}
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '25px', 
          backgroundColor: '#000000',
          zIndex: 99998
        }}></div>

        {/* === FIXED WIDER PREMIUM NAVIGATION BAR === */}
        <nav className="glass-card" style={{
          position: 'fixed',
          top: '20px',
          left: '0',
          right: '0',
          margin: '0 auto',        
          width: '95%',
          maxWidth: '1300px',
          zIndex: 99999,           
          padding: '15px 40px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          /* Ise 98% dark kar diya hai, taaki premium glass look rahe par piche ka text aar-paar na dikhe */
          backgroundColor: 'rgba(15, 15, 20, 0.98)', 
          backdropFilter: 'blur(24px)',
          boxShadow: '0 10px 30px rgba(0,0,0,0.8)'
        }}>
          
          {/* Logo / Brand Name */}
          <Link href="/" style={{ textDecoration: 'none' }}>
            <h2 style={{ fontSize: '1.8rem', fontWeight: 'bold', margin: 0 }}>
              <span style={{ background: 'linear-gradient(to right, #4285f4, #ea4335)', WebkitBackgroundClip: 'text', color: 'transparent' }}>
                AWSServer
              </span>
            </h2>
          </Link>

          {/* Navigation Links */}
          <div style={{ display: 'flex', gap: '35px', alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '500' }}>Home</Link>
            <Link href="/services" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '500' }}>Services</Link>
            <Link href="/products" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '500' }}>Products</Link>
            <Link href="/contact" style={{ color: '#ffffff', textDecoration: 'none', fontWeight: '500' }}>Contact</Link>
            
            {/* Admin Button */}
            <Link href="/admin" style={{ textDecoration: 'none' }}>
              <button className="ai-button" style={{ padding: '8px 25px', fontSize: '0.95rem' }}>
                Admin
              </button>
            </Link>
          </div>
        </nav>

        {/* Main Website Content */}
        <main style={{ position: 'relative', zIndex: 10, paddingTop: '120px', flex: 1 }}>
          {children}
        </main>

        {/* === PREMIUM FOOTER === */}
        <footer className="glass-card" style={{
          marginTop: '60px',
          padding: '30px',
          textAlign: 'center',
          borderRadius: '24px 24px 0 0',
          borderBottom: 'none',
          position: 'relative',
          zIndex: 10
        }}>
          <h3 style={{ color: '#ffffff', marginBottom: '10px' }}>AWSServer Digital Solutions</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '15px' }}>
            Innovating the future with premium IT services and custom software development.
          </p>
          <div style={{ color: '#d1d5db', fontSize: '0.85rem' }}>
            &copy; {new Date().getFullYear()} AWSServer. All Rights Reserved. <br />
            New Delhi, India | contact@awsserver.online
          </div>
        </footer>
        
      </body>
    </html>
  );
}