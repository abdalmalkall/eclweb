import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import './App.css';
import logo from './assets/images/logo.png';
import heroImg from './assets/images/logo.png';
import About from './About';

function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <h1>مهاراتك طريقك للنجاح معنا</h1>
        <p>احصل على المهارات التي تحتاجها لمستقبل العمل.</p>
        <div className="search-bar">
          <input type="text" placeholder="ابحث هنا" />
          <button>بحث</button>
        </div>
        <div className="categories">
          <span>الهندسة</span>
          <span>الأعمال</span>
          <span>تكنولوجيا المعلومات</span>
          <span>الزراعة</span>
          <span>الضيافة</span>
          <span>الشعر والتجميل</span>
          <span>الوسائط الإبداعية</span>
        </div>
        <img
          src={heroImg}
          alt="logo"
        />
        <h2>رؤيتنا</h2>
        <p>مجتمع مدرسي مبادر منتمٍ طامح ملتزم بقيم التسامح، نهجه العلم والتطور وصولًا للتميز.</p>
        <h2>رسالتنا</h2>
        <p>
          توفير فرص عادلة لجميع طلبة المدرسة للحصول على تعليم عالي الجودة بما يمكنهم من التفكير العلمي الإبداعي والعمل بروح
          الفريق والتعلم مدى الحياة، والتزود بالمعارف والمهارات والقيم والاتجاهات التي تؤهلهم للدخول إلى سوق العمل والمساهمة في
          رفعة الوطن.
        </p>
      </section>
    </>
  );
}

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="الشعار" style={{height: 36}} />
          <span className="logo-text">Ecl</span>
        </div>
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">&#9776;</label>
        <ul className="nav-links">
          <li><Link to="/">الرئيسية</Link></li>
          <li><a href="#">اختيار المسار</a></li>
          <li><a href="#">الأسعار</a></li>
          <li><a href="#">الدورات</a></li>
          <li><a href="#">الأسئلة الشائعة</a></li>
          <li><Link to="/about">من نحن</Link></li>
          <li><a href="#">تواصل معنا</a></li>
        </ul>
        <div className="auth">
          <a href="#" className="login">تسجيل الدخول</a>
          <a href="#" className="register">إنشاء حساب</a>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
