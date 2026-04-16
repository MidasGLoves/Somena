import React, { useState, useEffect } from 'react';

const COURSES = [
  { name:"BS Nursing", color:"#ef4444", bg:"#fef2f2", tag:"Health",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["Anatomy and Physiology 1","Biochemistry and Nutrition","Biochemistry Playbook","Clinical Communication Blueprint","Communication in Nursing","Fundamentals of Nursing Theories and Practice Toolkit","Intro to Nursing Practice"]},{s:"Semester 2",l:["Anatomy and Physiology 2","Bacterial Blueprint","Clinical Assessment Blueprint","Fundamentals of Nursing Practice","Health Assessment","Microbiology and Parasitology","Nursing Pharmacology Blueprint","Pharmacology 1","The Clinical Blueprint"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Clinical Nursing Foundations","Community Health Nursing","MedSurg Nursing Made Incredibly Easy","Pathophysiology for Nurses At A Glance","Pathophysiology Notes","Pharmacology for Nurses","Surgical Nursing Foundations","Surgical Nursing One","The Cellular Continuum","The Community Nursing Ecosystem","The Pathophysiology Lens"]},{s:"Semester 2",l:["Adult Health Nursing Blueprint","Adult Health Nursing II","Essentials of Nursing Research","Medical Surgical Nursing II Sample","Med-Surg II Clinical Blueprint","Paediatric Nursing Notes","Pediatric Nursing and Health Care","Pediatric Nursing Clinical Blueprint","Pediatric Nursing Playbook","Psychiatric Mental Health Nursing","Psychiatric Nursing Blueprint","Sensory Nursing Guide","The Fluid Balance","The Nursing Research Blueprint","Understanding Nursing Research"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Community Health Ecosystems","Community Health Nursing Textbook","Empathy Architecture","Gerontological Nursing Lecture","Maternal and Child Health Nursing (Pillitteri)","Paediatric Nursing Notes","Pediatric Nursing Blueprint","Psychiatric Nursing Blueprint"]},{s:"Semester 2",l:["APN Leadership Blueprint","Critical Care Nursing Guidelines","Emergency Nursing Overview","ER Frontline Protocols","Essentials of Nursing Leadership and Management","Handbook of Oncology Nursing","Leadership and Nursing Care Management","Nursing Leadership and Management","The Architecture of Critical Care","The Nursing Triad"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Holistic Nursing Care Experiences","Holistic Nursing Practice Principles","Manual in Operating Room Nursing","Modern Nursing Workforce Vitals","Nurse Educator Blueprint","Perioperative Nursing Mastery","The Perioperative Blueprint"]},{s:"Semester 2",l:["Acute Resuscitation Dashboard","Intensive Nursing Clinical Dashboard","Psychiatric Nursing Blueprint Finale","Public Health Ecosystems","Mastering Clinical Judgment","The Clinical Defense Playbook","Healthcare Operations Blueprint","Public Health Nursing for Population Impact","Clinical Nursing Mastery"]}]}
    ]
  }
];

const ordinals = ['1st','2nd','3rd','4th'];

function SecretPage({ onBack }: { onBack: () => void }) {
  const codes = JSON.parse(localStorage.getItem('refCodes') || '[]');

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Bricolage Grotesque' }}>
      <h1 style={{ fontFamily: 'Bebas Neue', fontSize: '48px', marginBottom: '20px' }}>Admin: Reference Codes</h1>
      <button onClick={onBack} style={{ padding: '8px 16px', marginBottom: '20px', cursor: 'pointer', background: '#e5e7eb', border: 'none', borderRadius: '4px' }}>← Back to Site</button>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
        <thead>
          <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
            <th style={{ padding: '16px', borderBottom: '2px solid #e5e7eb' }}>Reference Code</th>
            <th style={{ padding: '16px', borderBottom: '2px solid #e5e7eb' }}>Time Inputted</th>
          </tr>
        </thead>
        <tbody>
          {codes.length === 0 ? (
            <tr><td colSpan={2} style={{ padding: '16px', textAlign: 'center', color: '#6b7280' }}>No codes yet.</td></tr>
          ) : (
            codes.map((c: any, i: number) => (
              <tr key={i}>
                <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', fontFamily: 'monospace', fontSize: '16px' }}>{c.code}</td>
                <td style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', color: '#4b5563' }}>{c.time}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function MainPage({ onSecret }: { onSecret: () => void }) {
  const [activeDrawer, setActiveDrawer] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('BS Nursing');
  const [selectedYears, setSelectedYears] = useState('4');
  const [refCode, setRefCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyCountdown, setVerifyCountdown] = useState(9);

  const totalAmount = 5;

  const toggleDrawer = (id: string) => {
    setActiveDrawer(prev => prev === id ? null : id);
  };

  const openModal = (courseName?: string, years: string = '4') => {
    if (courseName) {
      setSelectedCourse(courseName);
    }
    setSelectedYears(years);
    setIsModalOpen(true);
    setIsVerifying(false);
    setIsVerified(false);
    setRefCode('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleVerify = () => {
    if (!selectedCourse) {
      alert('Please select your course first!');
      return;
    }

    if (refCode === 'SOMENA') {
      onSecret();
      return;
    }

    if (refCode.length !== 13 || isNaN(Number(refCode))) {
      alert('Please enter a valid 13-digit GCash reference code.');
      return;
    }

    // Save to local storage
    const codes = JSON.parse(localStorage.getItem('refCodes') || '[]');
    codes.push({ code: refCode, time: new Date().toLocaleString() });
    localStorage.setItem('refCodes', JSON.stringify(codes));

    setIsVerifying(true);
    setVerifyCountdown(9);
  };

  useEffect(() => {
    if (isVerifying && verifyCountdown > 0) {
      const timer = setTimeout(() => setVerifyCountdown(c => c - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isVerifying && verifyCountdown === 0) {
      setIsVerifying(false);
      setIsVerified(true);
    }
  }, [isVerifying, verifyCountdown]);

  return (
    <>
      <div className="ticker">
        <div className="ticker-track">
          <span>✦ ONLY ₱5 FOR ALL 4 YEARS</span><span>✦ INSTANT PDF DOWNLOAD</span><span>✦ NURSING CURRICULUM</span><span>✦ UNIVERSALLY ACCEPTED CURRICULUM</span><span>✦ BOARD EXAM READY</span><span>✦ OVER 10,000 STUDENTS SERVED</span><span>✦ ONLY ₱5 FOR ALL 4 YEARS</span><span>✦ INSTANT PDF DOWNLOAD</span><span>✦ NURSING CURRICULUM</span><span>✦ UNIVERSALLY ACCEPTED CURRICULUM</span><span>✦ BOARD EXAM READY</span><span>✦ OVER 10,000 STUDENTS SERVED</span>
        </div>
      </div>

      <nav>
        <div className="nav-logo">MedGuide</div>
        <button className="nav-cta" onClick={() => openModal()}>Get My Guide — ₱5</button>
      </nav>

      <div className="hero">
        <div>
          <div className="hero-badge">The most comprehensive nursing study guide</div>
          <h1>STOP<br/>GUESSING<br/>YOUR <span className="accent" style={{color: '#ef4444'}}>NURSING</span><br/>JOURNEY FOR <span className="price-inline">₱5</span></h1>
          <p className="hero-sub">Get the <strong>complete semester-by-semester lesson guide</strong> for Nursing. Know exactly what to expect — from 1st year to your Board Exam.</p>
          <p className="hero-sub" style={{color: '#10b981', fontWeight: 600, marginTop: '-20px'}}>⚡ Highly optimized for quick learning in a short period of time. Perfect for your exam preparations!</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => openModal()}>📄 Download My PDF Now</button>
            <button className="btn-secondary" onClick={() => document.getElementById('courses')?.scrollIntoView({behavior:'smooth'})}>Browse curriculum ↓</button>
          </div>
          <div className="hero-proof">
            <div className="avatars">
              <span style={{background:'#e74c3c'}}>JR</span><span style={{background:'#3498db'}}>AC</span><span style={{background:'#27ae60'}}>MB</span><span style={{background:'#9b59b6'}}>LS</span>
            </div>
            <p className="hero-proof-text">Trusted by <strong>10,000+</strong> Nursing Students this semester</p>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-label">What you get inside</div>
          <div className="hero-card-price"><sub>₱</sub>5<sub style={{fontSize:'18px',opacity:0.5}}>/complete</sub></div>
          <div className="hero-card-note">One-time payment for the complete 4-year guide</div>
          <hr className="hero-card-divider"/>
          <ul className="hero-card-features">
            <li>All major subjects per semester</li>
            <li>Optimized for quick learning & exams</li>
            <li>Clinical duty &amp; internship guide</li>
            <li>Subject descriptions &amp; goals</li>
            <li>Elective &amp; specialization options</li>
            <li>Printable &amp; mobile-friendly PDF</li>
            <li>Universally accepted curriculum (Nationwide & Worldwide)</li>
          </ul>
          <button className="hero-card-btn" onClick={() => openModal()}>GET THE COMPLETE GUIDE →</button>
        </div>
      </div>

      {/* PDF Preview Section Placeholder */}
      <div className="preview-section" style={{ padding: '60px 20px', textAlign: 'center', background: '#f8fafc' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Sneak Peek Inside</h2>
        <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>Take a look at the high-quality, easy-to-read format of our nursing guide.</p>
        
        <div className="preview-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          <img src="https://i.postimg.cc/cgfNd2Gn/Screenshot-2026-04-16-115210.png" alt="Sneak Peek 1" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/JHmC0xRb/Screenshot-2026-04-16-115235.png" alt="Sneak Peek 2" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/V01Pvgz4/Screenshot-2026-04-16-115255.png" alt="Sneak Peek 3" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/8fDgc4TH/Screenshot-2026-04-16-115310.png" alt="Sneak Peek 4" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/D4F3067r/Screenshot-2026-04-16-115326.png" alt="Sneak Peek 5" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/tnyGJk9r/Screenshot-2026-04-16-115338.png" alt="Sneak Peek 6" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/rRc2sjqf/Screenshot-2026-04-16-122152.png" alt="Sneak Peek 7" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/D4F3067p/Screenshot-2026-04-16-122220.png" alt="Sneak Peek 8" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/T5Gv10TH/Screenshot-2026-04-16-122242.png" alt="Sneak Peek 9" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/D4gkXGzP/Screenshot-2026-04-16-122311.png" alt="Sneak Peek 10" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/m1wfH9rS/Screenshot-2026-04-16-122329.png" alt="Sneak Peek 11" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/kRc3bS5s/Screenshot-2026-04-16-122349.png" alt="Sneak Peek 12" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/gLDFZh0g/Screenshot-2026-04-16-122412.png" alt="Sneak Peek 13" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/30B5vGwS/Screenshot-2026-04-16-122451.png" alt="Sneak Peek 14" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/hQrWdmGZ/Screenshot-2026-04-16-122508.png" alt="Sneak Peek 15" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/ctmyn3J5/Screenshot-2026-04-16-122534.png" alt="Sneak Peek 16" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/zHjZghfM/Screenshot-2026-04-16-122555.png" alt="Sneak Peek 17" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
          <img src="https://i.postimg.cc/p5ZbFjd3/Screenshot-2026-04-16-134325.png" alt="Sneak Peek 18" style={{ width: '100%', height: 'auto', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} referrerPolicy="no-referrer" />
        </div>
      </div>

      <div className="why-strip">
        <div className="why-inner">
          <div className="why-item"><div className="why-num">100%</div><div className="why-title">Nursing Focused</div><div className="why-desc">Tailored specifically for Nursing students.</div></div>
          <div className="why-item"><div className="why-num">₱5</div><div className="why-title">Full Access</div><div className="why-desc">That's cheaper than a single textbook. Get the entire 4-year breakdown for just five pesos.</div></div>
          <div className="why-item"><div className="why-num">2sec</div><div className="why-title">Instant Download</div><div className="why-desc">Pay and receive your PDF immediately. No waiting, no shipping, no hassle. Available 24/7.</div></div>
        </div>
      </div>

      <div className="courses-section" id="courses">
        <div className="courses-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div className="section-label">Nursing Curriculum</div>
          <div className="section-title">Get The Complete Guide.<br/>All 4 Years Included.</div>
          <p className="section-sub" style={{marginTop:'12px', maxWidth: '600px'}}>👆 Tap any year pill to preview all subjects inside. Get the complete 4-year curriculum for only ₱5.</p>
          
          <div className="courses-grid" style={{ display: 'flex', justifyContent: 'center', width: '100%', maxWidth: '800px' }}>
            {COURSES.map((c, ci) => (
              <div key={ci} className="course-card" style={{ width: '100%' }}>
                <div className="course-card-top">
                  <div className="course-name">{c.name}</div>
                  <div className="course-tag" style={{background:c.bg, color:c.color}}>{c.tag}</div>
                </div>
                <div className="course-card-body">
                  <div className="years-hint">👆 Tap a year to preview all subjects inside</div>
                  <div className="years-row" style={{ justifyContent: 'center', gap: '12px', marginBottom: '20px' }}>
                    {c.years.map((yr, yi) => {
                      const id = `${ci}-${yi}`;
                      const isActive = activeDrawer === id;
                      return (
                        <div key={yi} className={`year-pill ${isActive ? 'active' : ''}`} style={{color:c.color, padding: '8px 16px', fontSize: '14px'}} onClick={() => toggleDrawer(id)}>
                          <span>{ordinals[yi]} Yr</span>
                          <span className="toggle-arrow">▾</span>
                        </div>
                      );
                    })}
                  </div>
                  
                  {c.years.map((yr, yi) => {
                    const id = `${ci}-${yi}`;
                    const isActive = activeDrawer === id;
                    return (
                      <div key={yi} className={`lesson-drawer ${isActive ? 'open' : ''}`} style={{borderColor:`${c.color}40`}}>
                        <div className="drawer-header" style={{background:c.bg}}>
                          <span className="drawer-year-label" style={{color:c.color}}>{yr.label}</span>
                          <button className="drawer-buy-btn" onClick={(e) => { e.stopPropagation(); openModal(c.name, '4'); }}>Get Full Guide ₱5 →</button>
                        </div>
                        {yr.sems.map((sem, si) => (
                          <div key={si} className="sem-block">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <div className="sem-title" style={{ marginBottom: 0 }}>{sem.s}</div>
                            </div>
                            {sem.l.map((lesson, li) => (
                              <div key={li} className="lesson-row">
                                <div className="lesson-dot" style={{background:`${c.color}88`}}></div>
                                <span>{lesson}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                  
                  <div className="course-card-footer" style={{ marginTop: '20px', paddingTop: '20px' }}>
                    <div className="total-price" style={{ fontSize: '15px' }}>Complete 4-year guide: <strong style={{ fontSize: '18px' }}>₱5</strong></div>
                    <button className="buy-all-btn" style={{ padding: '12px 24px', fontSize: '15px' }} onClick={() => openModal(c.name, '4')}>Get Complete Guide →</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="how-section">
        <div className="section">
          <div className="section-label">The Process</div>
          <div className="section-title">Simple. Fast. Done.</div>
          <div className="how-steps">
            <div className="how-step"><div className="step-num">01</div><div className="step-title">Get the guide</div><div className="step-desc">Get the complete 4-year nursing curriculum guide for a one-time payment of ₱5.</div></div>
            <div className="how-step"><div className="step-num">02</div><div className="step-title">Complete your ₱5 payment</div><div className="step-desc">Pay via GCash. Secure, instant, and officially receipted.</div></div>
            <div className="how-step"><div className="step-num">03</div><div className="step-title">Receive your PDF instantly</div><div className="step-desc">Download your complete curriculum guide immediately after payment. Print it or keep it on your phone.</div></div>
          </div>
        </div>
      </div>

      <div className="obj-strip">
        <div className="obj-inner">
          <div><div className="obj-icon">🔒</div><div className="obj-title">100% Secure Payment</div><div className="obj-desc">Protected by end-to-end encryption. We never store card details.</div></div>
          <div><div className="obj-icon">📲</div><div className="obj-title">Works on Any Device</div><div className="obj-desc">PDF opens on your phone, tablet, or laptop. Readable offline anytime.</div></div>
          <div><div className="obj-icon">🎯</div><div className="obj-title">Universally Accepted</div><div className="obj-desc">Based on generally accepted lessons taught on each level nationwide and worldwide.</div></div>
          <div><div className="obj-icon">💬</div><div className="obj-title">Wrong guide? We'll fix it</div><div className="obj-desc">Accidentally bought the wrong guide? Message us and we'll send the correct one free.</div></div>
        </div>
      </div>

      <div className="section">
        <div className="section-label">Student Reviews</div>
        <div className="section-title">Real Feedback.<br/>Real Students.</div>
        <div className="testi-grid">
          <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-text">"I haven't even started classes yet, but I already have my entire curriculum planned out. The layout is beautiful and easy to read. Only ₱5?! Incredibly worth it!"</p><div className="testi-author"><div className="testi-avatar" style={{background:'#e74c3c'}}>JR</div><div><div className="testi-name">Jessa Reyes</div><div className="testi-role">BS Nursing, 1st Year</div></div></div></div>
          <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-text">"As a student, I needed to plan my duties in advance. This gave me everything — subjects, duty schedule, thesis timeline. Worth every centavo."</p><div className="testi-author"><div className="testi-avatar" style={{background:'#2980b9'}}>MC</div><div><div className="testi-name">Marc Castillo</div><div className="testi-role">BS Nursing, 3rd Year</div></div></div></div>
          <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-text">"I bought the full 4-year Nursing guide for just ₱5. My friends thought I was joking. Shared it with my whole block. Legit the best study investment ever."</p><div className="testi-author"><div className="testi-avatar" style={{background:'#27ae60'}}>AL</div><div><div className="testi-name">Andrea Lim</div><div className="testi-role">BS Nursing, 2nd Year</div></div></div></div>
        </div>
      </div>

      <div className="cta-banner">
        <h2>YOUR NURSING JOURNEY<br/>STARTS WITH <span>₱5</span></h2>
        <p>Stop stressing. Start preparing. The most affordable study guide worldwide is one click away.</p>
        <button className="btn-big" onClick={() => openModal()}>📄 Get My PDF Now — ₱5</button>
        <p className="cta-banner-sub">Instant download · PDF format · No subscription · No hidden fees</p>
      </div>

      <footer>
        <div className="footer-logo">MedGuide</div>
        <div className="footer-note">© 2026 MedGuide · For nursing students worldwide · Based on universally accepted curricula · Not affiliated with any university</div>
      </footer>

      <button className="float-badge" onClick={() => openModal()}>📄 Get PDF — <span>₱5</span></button>

      {/* MODAL */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal">
          <div className="modal-header">
            <h3>GET YOUR CURRICULUM GUIDE</h3>
            <p>Complete 4-Year Nursing Package</p>
          </div>
          <div className="modal-body">
            <div className="modal-total" style={{ marginBottom: '16px' }}>
              <span className="modal-total-label">Total Amount Due</span>
              <span className="modal-total-price">₱{totalAmount}</span>
            </div>

            <div style={{ background: '#eff6ff', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #bfdbfe' }}>
              <p style={{ fontSize: '13px', color: '#1e3a8a', marginBottom: '12px', fontWeight: 500, lineHeight: 1.5 }}>
                Please send exactly <strong>₱{totalAmount}</strong> to GCash number:<br/>
                <span style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '1px', display: 'block', marginTop: '4px' }}>09770950502</span>
              </p>
              <label style={{ color: '#1e3a8a', marginBottom: '4px' }}>GCash Reference Code (13 digits)</label>
              <input 
                type="text" 
                value={refCode} 
                onChange={e => setRefCode(e.target.value)} 
                placeholder="e.g. 1000000000000" 
                style={{ marginBottom: 0, border: '1px solid #93c5fd', background: 'white' }}
                maxLength={13}
              />
            </div>

            {!isVerifying && !isVerified && (
              <button className="modal-pay-btn" onClick={handleVerify}>VERIFY PAYMENT →</button>
            )}

            {isVerifying && (
              <button className="modal-pay-btn" style={{ background: '#f59e0b', cursor: 'wait' }} disabled>
                VERIFYING... ({verifyCountdown}s)
              </button>
            )}

            {isVerified && (
              <button className="modal-pay-btn" style={{ background: '#10b981' }} onClick={() => { 
                const link = document.createElement('a');
                // Permanent GitHub Release Link
                link.href = 'https://github.com/MidasGLoves/NURSE/releases/download/V1.0/Nursing.zip';
                link.setAttribute('download', 'Nursing.zip');
                link.setAttribute('target', '_blank'); // Add target blank as a fallback
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                closeModal(); 
              }}>
                ⬇ DOWNLOAD PDF NOW
              </button>
            )}

            <button className="modal-close" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default function App() {
  const [view, setView] = useState<'main' | 'secret'>('main');

  if (view === 'secret') {
    return <SecretPage onBack={() => setView('main')} />;
  }

  return <MainPage onSecret={() => setView('secret')} />;
}
