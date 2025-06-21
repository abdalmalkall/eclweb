import React from "react";
import './App.css';

function About() {
  return (
    <div className="about-page" style={{background: "#f9f6f2", minHeight: "100vh", direction: "rtl"}}>
      <header style={{textAlign: "center", padding: "30px 0 10px 0"}}>
        <h1 style={{fontFamily: "'Cairo', Arial, sans-serif", color: "#bfa980", fontWeight: "bold", fontSize: "2rem"}}>
          مدرسة مرج الحمام المهنية للبنين
        </h1>
      </header>

      <main style={{maxWidth: 700, margin: "0 auto", padding: "20px"}}>
        <section className="about" style={{marginBottom: 30}}>
          <h2 style={{color: "#a68b5b"}}>من نحن</h2>
          <p>
            أنشأت مدرسة مرج الحمام في عهد صاحب الجلالة المغفور له جلالة الملك الحسين بن طلال المعظم سنة ١٩٨٧، وتعتبر المدرسة
            من أكبر المدارس المتميزة في جميع أنحاء المملكة. وبالتعاون مع منظمة التدريس العالمية "بيرسون"، فقد اعتمدت المدرسة
            التدريس المتمازج في خمس من المجالات.
          </p>
        </section>

        <section className="majors" style={{marginBottom: 30}}>
          <h2 style={{color: "#a68b5b"}}>التخصصات المعتمدة لدينا</h2>
          <ul style={{paddingRight: 20}}>
            <li>الأعمال (Business)</li>
            <li>الهندسة (Engineering)</li>
            <li>تكنولوجيا المعلومات (Information Technology)</li>
            <li>الزراعة (Agriculture)</li>
            <li>الضيافة (Hospitality)</li>
          </ul>
        </section>

        <h2 style={{color: "#a68b5b"}}>الخطة التطويرية لمدرستنا</h2>
        <p>تم إنشاء هذا الموقع بواسطة طلاب <strong>الأول ثانوي - إدارة أعمال</strong></p>
        <p>بإدارة المدير الفاضل <strong>محمود درويش</strong></p>
        <p>بإدارة الاستاذ <strong>حمزة المناصير</strong></p>
        <p>تطوير وتنسيق <strong>عبد الملك أحمد نعيم</strong></p>
      </main>

      <div className="login-buttons" style={{textAlign: "center", margin: "30px 0"}}>
        <a href="/" className="home-button" style={{
          display: "inline-block",
          background: "#bfa980",
          color: "#fff",
          padding: "10px 24px",
          borderRadius: "8px",
          textDecoration: "none",
          fontWeight: "bold"
        }}>
          <i className="fas fa-home" style={{marginLeft: 8}}></i>
          الصفحة الرئيسية
        </a>
      </div>

      <footer style={{textAlign: "center", padding: "20px 0", color: "#888"}}>
        <p>جميع الحقوق محفوظة لدى ©Educational Communication Launcher.2025</p>
      </footer>
    </div>
  );
}

export default About;