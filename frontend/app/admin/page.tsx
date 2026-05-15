"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { Lock, Mail, Eye, EyeOff, ShieldCheck, Key, Trash2, Settings } from "lucide-react";

export default function AdminPanel() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  // Naya State: Settings mein naya password dekhne ke liye
  const [showNewPassword, setShowNewPassword] = useState(false);

  // Lists fetch karne ke liye states
  const [servicesList, setServicesList] = useState([]);
  const [productsList, setProductsList] = useState([]);

  // Login States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Dashboard Tab State
  const [activeTab, setActiveTab] = useState("service");

  // Add Service States
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [shortDesc, setShortDesc] = useState("");
  const [price, setPrice] = useState("");

  // Add Product States
  const [pName, setPName] = useState("");
  const [pCategory, setPCategory] = useState("");
  const [pDesc, setPDesc] = useState("");
  const [pPrice, setPPrice] = useState("");

  // Update Credentials States
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const inputContainerStyle = {
    position: "relative" as "relative",
    width: "100%",
    marginBottom: "25px",
  };

  const iconStyle = {
    position: "absolute" as "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#4285f4",
    opacity: 0.8
  };

  const inputFieldStyle = {
    width: "100%",
    boxSizing: "border-box" as "border-box", 
    padding: "16px 15px 16px 45px",
    borderRadius: "12px",
    background: "rgba(0,0,0,0.6)",
    border: "1px solid rgba(255,255,255,0.1)",
    color: "white",
    outline: "none",
    fontSize: "1.05rem",
    transition: "all 0.3s ease",
  };

  const dashInputStyle = {
    width: "100%", 
    boxSizing: "border-box" as "border-box", 
    padding: "12px", 
    borderRadius: "8px", 
    background: "rgba(0,0,0,0.5)", 
    border: "1px solid rgba(255,255,255,0.2)", 
    color: "white", 
    marginBottom: "15px", 
    outline: "none"
  };

  const fetchData = async () => {
    try {
      const sRes = await axios.get("http://localhost:5000/api/services");
      setServicesList(sRes.data);
      const pRes = await axios.get("http://localhost:5000/api/products");
      setProductsList(pRes.data);
    } catch (error) {
      console.error("Data fetch error", error);
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("adminToken");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchData();
    }
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password });
      localStorage.setItem("adminToken", res.data.token);
      setToken(res.data.token);
      setIsLoggedIn(true);
      fetchData();
      alert("✅ Access Granted! Welcome back, Admin.");
    } catch (error) {
      alert("❌ Authentication Failed! Please check credentials.");
    }
  };

  const handleAddService = async (e: any) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const newService = { title, category, shortDescription: shortDesc, fullDescription: shortDesc, priceStartingFrom: Number(price) };
      await axios.post("http://localhost:5000/api/services", newService, config);
      alert("🚀 Service Added!");
      setTitle(""); setCategory(""); setShortDesc(""); setPrice("");
      fetchData();
    } catch (error: any) { alert("❌ Error: " + (error.response?.data?.message || "Server Error")); }
  };

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const newProduct = { name: pName, category: pCategory, description: pDesc, price: Number(pPrice) };
      await axios.post("http://localhost:5000/api/products", newProduct, config);
      alert("📦 Product Added!");
      setPName(""); setPCategory(""); setPDesc(""); setPPrice("");
      fetchData();
    } catch (error: any) { alert("❌ Error: " + (error.response?.data?.message || "Server Error")); }
  };

  const handleUpdateCredentials = async (e: any) => {
    e.preventDefault();
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.put("http://localhost:5000/api/auth/update", { email: newEmail, password: newPassword }, config);
      alert("✅ Credentials Updated Successfully! Please login again with your new details.");
      handleLogout();
    } catch (error: any) { 
      alert("❌ Error: " + (error.response?.data?.message || "Server Error")); 
    }
  };

  const handleDeleteService = async (id: string) => {
    if(!window.confirm("Kya aap sach mein is service ko delete karna chahte hain?")) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/services/${id}`, config);
      alert("🗑️ Service Deleted!");
      fetchData(); 
    } catch (error) { alert("❌ Delete failed!"); }
  };

  const handleDeleteProduct = async (id: string) => {
    if(!window.confirm("Kya aap sach mein is product ko delete karna chahte hain?")) return;
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      await axios.delete(`http://localhost:5000/api/products/${id}`, config);
      alert("🗑️ Product Deleted!");
      fetchData(); 
    } catch (error) { alert("❌ Delete failed!"); }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setToken("");
  };

  return (
    <div style={{ minHeight: "75vh", display: "flex", justifyContent: "center", alignItems: "center", padding: "20px" }}>
      
      {!isLoggedIn ? (
        <div className="glass-card" style={{ 
          maxWidth: "550px", 
          width: "100%", 
          boxSizing: "border-box", 
          padding: "60px 50px", 
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0.05, pointerEvents: "none" }}>
            <svg width="100%" height="100%"><path d="M0 20h20v20H0zM40 60h20v20H40zM80 10h10v10H80z" fill="white"/></svg>
          </div>

          <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="url(#btn-gradient)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ filter: "drop-shadow(0px 4px 15px rgba(66, 133, 244, 0.6))" }}>
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
              <rect x="8" y="10" width="8" height="6" rx="1" />
              <path d="M10 13h4" />
            </svg>
          </div>

          <h2 style={{ 
            fontSize: "2.8rem", 
            fontWeight: "900", 
            marginBottom: "10px", 
            background: "linear-gradient(to right, #4285f4, #ea4335)", 
            WebkitBackgroundClip: "text", 
            color: "transparent",
            letterSpacing: "1px"
          }}>
            ADMIN LOGIN
          </h2>
          <p style={{ color: "#9ca3af", marginBottom: "40px", fontSize: "1rem" }}>
            Access your centralized power panel.
          </p>

          <form onSubmit={handleLogin}>
            <div style={inputContainerStyle}>
              <Mail size={22} style={iconStyle} />
              <input 
                type="email" 
                placeholder="you@awsserver.online" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                style={inputFieldStyle} 
                required 
              />
            </div>

            <div style={inputContainerStyle}>
              <Lock size={22} style={iconStyle} />
              <input 
                type={showPassword ? "text" : "password"} 
                placeholder="••••••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                style={inputFieldStyle} 
                required 
              />
              <div 
                onClick={() => setShowPassword(!showPassword)} 
                style={{ position: "absolute", right: "15px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#9ca3af" }}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </div>
            </div>

            <button type="submit" className="ai-button" style={{ 
              width: "100%", 
              boxSizing: "border-box", 
              marginTop: "15px", 
              padding: "16px", 
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              fontWeight: "bold"
            }}>
              <Key size={22} /> LOGIN SECURELY
            </button>
          </form>

          <div style={{ marginTop: "35px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", color: "#4caf50", fontSize: "0.95rem" }}>
            <ShieldCheck size={18} /> End-to-End Encrypted Login
          </div>
        </div>
      ) : (
        <div className="glass-card" style={{ maxWidth: "800px", width: "100%", padding: "40px", boxSizing: "border-box" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px", flexWrap: "wrap", gap: "20px" }}>
            <h2 style={{ fontSize: "2rem", fontWeight: "bold", color: "#ea4335", margin: 0 }}>Dashboard</h2>
            <button onClick={handleLogout} style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "8px 20px", borderRadius: "50px", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px" }}>
              <Lock size={16} /> Logout
            </button>
          </div>

          <div style={{ display: "flex", gap: "10px", marginBottom: "30px", flexWrap: "wrap" }}>
            <button onClick={() => setActiveTab("service")} style={{ flex: '1 1 150px', padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "white", border: "1px solid rgba(255,255,255,0.2)", background: activeTab === "service" ? "#4285f4" : "rgba(0,0,0,0.5)", transition: "all 0.3s ease" }}>Services Mgt</button>
            <button onClick={() => setActiveTab("product")} style={{ flex: '1 1 150px', padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "white", border: "1px solid rgba(255,255,255,0.2)", background: activeTab === "product" ? "#ea4335" : "rgba(0,0,0,0.5)", transition: "all 0.3s ease" }}>Products Mgt</button>
            <button onClick={() => setActiveTab("settings")} style={{ flex: '1 1 150px', padding: "12px", borderRadius: "8px", cursor: "pointer", fontWeight: "bold", color: "white", border: "1px solid rgba(255,255,255,0.2)", background: activeTab === "settings" ? "#fbbc05" : "rgba(0,0,0,0.5)", transition: "all 0.3s ease", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <Settings size={18} /> Settings
            </button>
          </div>

          {/* === SETTINGS TAB === */}
          {activeTab === "settings" && (
            <div style={{ animation: "fadeIn 0.5s" }}>
              <h3 style={{ marginBottom: "20px", color: "#fbbc05", display: "flex", alignItems: "center", gap: "10px" }}>
                <ShieldCheck /> Security Settings
              </h3>
              <p style={{ color: "#d1d5db", marginBottom: "30px", fontSize: "0.95rem" }}>
                Yahan se aap apne Admin Panel ka login Email aur Password badal sakte hain. Update karne ke baad aapko dobara login karna padega.
              </p>
              <form onSubmit={handleUpdateCredentials} style={{ background: "rgba(0,0,0,0.3)", padding: "25px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <label style={{ color: "#9ca3af", display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>New Admin Email ID</label>
                <input type="email" placeholder="Enter new email address" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} style={dashInputStyle} required />
                
                <label style={{ color: "#9ca3af", display: "block", marginBottom: "8px", fontSize: "0.9rem" }}>New Secure Password</label>
                <div style={{ position: "relative", width: "100%", marginBottom: "15px" }}>
                  <input 
                    type={showNewPassword ? "text" : "password"} 
                    placeholder="Enter new password" 
                    value={newPassword} 
                    onChange={(e) => setNewPassword(e.target.value)} 
                    style={{ ...dashInputStyle, marginBottom: 0, paddingRight: "40px" }} // paddingRight added for icon space
                    required 
                    minLength={6} 
                  />
                  <div 
                    onClick={() => setShowNewPassword(!showNewPassword)} 
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", cursor: "pointer", color: "#9ca3af" }}
                  >
                    {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </div>
                </div>
                
                <button type="submit" className="ai-button" style={{ width: "100%", marginTop: "15px", filter: "hue-rotate(180deg)", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                  <Key size={18} /> Update Credentials
                </button>
              </form>
            </div>
          )}

          {/* === SERVICES TAB === */}
          {activeTab === "service" && (
            <div style={{ animation: "fadeIn 0.5s" }}>
              <form onSubmit={handleAddService} style={{ marginBottom: "40px", background: "rgba(0,0,0,0.3)", padding: "25px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <h3 style={{ marginBottom: "20px", color: "#4285f4" }}>Add New Service</h3>
                <input type="text" placeholder="Service Title" value={title} onChange={(e) => setTitle(e.target.value)} style={dashInputStyle} required />
                <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} style={dashInputStyle} required />
                <textarea placeholder="Short Description..." value={shortDesc} onChange={(e) => setShortDesc(e.target.value)} style={{ ...dashInputStyle, minHeight: "80px" }} required />
                <input type="number" placeholder="Price Starting From" value={price} onChange={(e) => setPrice(e.target.value)} style={dashInputStyle} required />
                <button type="submit" className="ai-button" style={{ width: "100%", marginTop: "10px" }}>Save Service</button>
              </form>

              <h3 style={{ color: "#d1d5db", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "10px", marginBottom: "15px" }}>Manage Existing Services</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {servicesList.map((srv: any) => (
                  <div key={srv._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#ffffff" }}>{srv.title}</h4>
                      <span style={{ fontSize: "0.85rem", color: "#9ca3af" }}>₹{srv.priceStartingFrom}</span>
                    </div>
                    <button onClick={() => handleDeleteService(srv._id)} style={{ background: "#ea4335", color: "white", border: "none", padding: "8px", borderRadius: "5px", cursor: "pointer" }} title="Delete Service">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {servicesList.length === 0 && <p style={{ color: "#9ca3af" }}>No services found.</p>}
              </div>
            </div>
          )}

          {/* === PRODUCTS TAB === */}
          {activeTab === "product" && (
            <div style={{ animation: "fadeIn 0.5s" }}>
              <form onSubmit={handleAddProduct} style={{ marginBottom: "40px", background: "rgba(0,0,0,0.3)", padding: "25px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <h3 style={{ marginBottom: "20px", color: "#ea4335" }}>Add New Software Product</h3>
                <input type="text" placeholder="Product Name" value={pName} onChange={(e) => setPName(e.target.value)} style={dashInputStyle} required />
                <input type="text" placeholder="Category" value={pCategory} onChange={(e) => setPCategory(e.target.value)} style={dashInputStyle} required />
                <textarea placeholder="Product Description..." value={pDesc} onChange={(e) => setPDesc(e.target.value)} style={{ ...dashInputStyle, minHeight: "80px" }} required />
                <input type="number" placeholder="Fixed Price" value={pPrice} onChange={(e) => setPPrice(e.target.value)} style={dashInputStyle} required />
                <button type="submit" className="ai-button" style={{ width: "100%", marginTop: "10px", filter: "hue-rotate(90deg)" }}>Save Product</button>
              </form>

              <h3 style={{ color: "#d1d5db", borderBottom: "1px solid rgba(255,255,255,0.2)", paddingBottom: "10px", marginBottom: "15px" }}>Manage Existing Products</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                {productsList.map((prod: any) => (
                  <div key={prod._id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "15px", background: "rgba(0,0,0,0.3)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                    <div>
                      <h4 style={{ margin: 0, fontSize: "1.1rem", color: "#ffffff" }}>{prod.name}</h4>
                      <span style={{ fontSize: "0.85rem", color: "#9ca3af" }}>₹{prod.price}</span>
                    </div>
                    <button onClick={() => handleDeleteProduct(prod._id)} style={{ background: "#ea4335", color: "white", border: "none", padding: "8px", borderRadius: "5px", cursor: "pointer" }} title="Delete Product">
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
                {productsList.length === 0 && <p style={{ color: "#9ca3af" }}>No products found.</p>}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}