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

const PREVIEW_IMAGES = [
  "https://i.imgur.com/M7FYL8F.png",
  "https://i.imgur.com/CXDa8N2.png",
  "https://i.imgur.com/dxn97VY.png",
  "https://i.imgur.com/CPqUGJb.png",
  "https://i.imgur.com/KbVFx4l.png",
  "https://i.imgur.com/GEZMfe0.png",
  "https://i.imgur.com/m6f6KWF.png",
  "https://i.imgur.com/UnyMv66.png",
  "https://i.imgur.com/V6yGT1L.png",
  "https://i.imgur.com/Cw1FgaA.png"
];

function isFreeDay() {
  const date = new Date();
  const day = date.getDay(); // 0 is Sunday, 6 is Saturday
  if (day === 0 || day === 6) {
    return true;
  }
  // List of holidays (MM-DD)
  const holidays = [
    '01-01', // New Year's Day
    '12-25', // Christmas
    '12-31', // New Year's Eve
    // Add more holidays here as needed
  ];
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  const formattedDate = `${month}-${d}`;
  
  if (holidays.includes(formattedDate)) {
    return true;
  }
  return false;
}

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
  const [isGalleryExpanded, setIsGalleryExpanded] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if user is near the bottom of the page (within 100px)
      const bottom = Math.ceil(window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 100;
      setIsAtBottom(bottom);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial state
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalAmount = 5;
  const freeDay = isFreeDay();
  const priceDisplay = freeDay ? "FREE" : "₱5";
  const tickerText = freeDay ? `✦ FREE ON WEEKENDS AND HOLIDAYS ✦ INSTANT PDF DOWNLOAD ✦ NURSING CURRICULUM ` : `✦ ONLY ₱5 FOR ALL 4 YEARS ✦ INSTANT PDF DOWNLOAD ✦ NURSING CURRICULUM ✦ UNIVERSALLY ACCEPTED CURRICULUM ✦ BOARD EXAM READY ✦ OVER 10,000 STUDENTS SERVED `;

  const toggleDrawer = (id: string) => {
    setActiveDrawer(prev => prev === id ? null : id);
  };

  const openModal = (courseName?: string, years: string = '4') => {
    if (courseName) {
      setSelectedCourse(courseName);
    }
    setSelectedYears(years);
    setIsModalOpen(true);
    // If it's a free day, bypass everything directly to verified
    if (freeDay) {
      setIsVerifying(false);
      setIsVerified(true);
    } else {
      setIsVerifying(false);
      setIsVerified(false);
    }
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
          <span>{tickerText}</span><span>{tickerText}</span><span>{tickerText}</span><span>{tickerText}</span>
        </div>
      </div>

      <nav>
        <div className="nav-logo">MedGuide</div>
        <button className="nav-cta" onClick={() => openModal()}>Get My Guide — {priceDisplay}</button>
      </nav>

      <div className="hero">
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div className="hero-badge">FREE ON WEEKENDS AND HOLIDAYS</div>
          <h1 style={{ marginTop: '0', fontSize: 'clamp(42px, 8vw, 84px)', lineHeight: '0.95', color: '#0f172a' }}>THE COMPLETE <span className="accent" style={{color: '#ef4444'}}>NURSING</span> ROADMAP</h1>
          <p className="hero-sub" style={{ margin: '0 auto 0', color: '#64748b' }}>A clean, semester-by-semester breakdown from 1st year to your Board Exam. See exactly what you'll be learning below.</p>
          <div className="hero-actions" style={{ justifyContent: 'center', marginTop: '30px' }}>
            <button className="btn-primary" onClick={() => openModal()}>Download My PDF Now {freeDay ? '- FREE' : ''}</button>
          </div>
        </div>
      </div>

      <div className="courses-section" id="courses" style={{ paddingTop: '10px', paddingBottom: '60px' }}>
        <div className="courses-inner" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px', alignItems: 'start', width: '100%', maxWidth: '1200px', textAlign: 'left' }}>
            {COURSES[0].years.map((yr, yi) => (
              <div key={yi} style={{ border: `1px solid ${COURSES[0].color}20`, borderRadius: '12px', overflow: 'hidden', background: '#ffffff', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <div style={{background:COURSES[0].bg, padding: '16px 20px', borderBottom: `1px solid ${COURSES[0].color}15` }}>
                  <span style={{color:COURSES[0].color, fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '0.04em'}}>{yr.label}</span>
                </div>
                {yr.sems.map((sem, si) => (
                  <div key={si} style={{ padding: '16px 20px' }}>
                    <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '12px', paddingBottom: '8px', borderBottom: '1px dashed #e2e8f0' }}>{sem.s}</div>
                    {sem.l.map((lesson, li) => (
                      <div key={li} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px', fontSize: '13px', lineHeight: '1.45', color: '#334155' }}>
                        <div style={{ background:`${COURSES[0].color}50`, width: '4px', height: '4px', borderRadius: '50%', marginTop: '7px', flexShrink: 0 }}></div>
                        <span>{lesson}</span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PDF Preview Section Placeholder */}
      <div className="preview-section" style={{ padding: '60px 20px', textAlign: 'center', background: '#f8fafc' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#0f172a', marginBottom: '10px' }}>Sneak Peek Inside</h2>
        <p style={{ fontSize: '18px', color: '#64748b', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>Take a look at the high-quality, easy-to-read format of our nursing guide.</p>
        
        <div className="preview-gallery" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', justifyContent: 'center', maxWidth: '1200px', margin: '0 auto' }}>
          {(isGalleryExpanded ? PREVIEW_IMAGES : PREVIEW_IMAGES.slice(0, 6)).map((src, idx) => (
            <div key={idx} style={{ cursor: 'pointer', overflow: 'hidden', borderRadius: '12px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)' }} onClick={() => setLightboxImage(src)}>
              <img src={src} alt={`Sneak Peek ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s ease' }} referrerPolicy="no-referrer" onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'} onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'} />
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '30px' }}>
          <button onClick={() => setIsGalleryExpanded(!isGalleryExpanded)} style={{ padding: '12px 28px', fontSize: '16px', fontWeight: 600, color: '#0f172a', background: '#e2e8f0', border: 'none', borderRadius: '8px', cursor: 'pointer', transition: 'background 0.2s' }} onMouseOver={(e) => e.currentTarget.style.background = '#cbd5e1'} onMouseOut={(e) => e.currentTarget.style.background = '#e2e8f0'}>
            {isGalleryExpanded ? 'Show Less' : `Show All ${PREVIEW_IMAGES.length} Pages`}
          </button>
        </div>
      </div>

      <div className="why-strip">
        <div className="why-inner">
          <div className="why-item"><div className="why-num">100%</div><div className="why-title">Nursing Focused</div><div className="why-desc">Tailored specifically for Nursing students.</div></div>
          <div className="why-item"><div className="why-num">{priceDisplay}</div><div className="why-title">Full Access</div><div className="why-desc">That's cheaper than a single textbook. Get the entire 4-year breakdown {freeDay ? 'completely free this weekend.' : 'for just five pesos.'}</div></div>
        </div>
      </div>

      <div className="how-section">
        <div className="section">
          <div className="section-label">The Process</div>
          <div className="section-title">Simple. Fast. Done.</div>
          <div className="how-steps">
            <div className="how-step"><div className="step-num">01</div><div className="step-title">Get the guide</div><div className="step-desc">Get the complete 4-year nursing curriculum guide {freeDay ? 'for absolutely free today' : 'for a one-time payment of ₱5'}.</div></div>
            <div className="how-step"><div className="step-num">02</div><div className="step-title">{freeDay ? 'Skip the payment' : 'Complete your ₱5 payment'}</div><div className="step-desc">{freeDay ? 'Enjoy the free access this weekend/holiday immediately.' : 'Pay via GCash. Secure, instant, and officially receipted.'}</div></div>
            <div className="how-step"><div className="step-num">03</div><div className="step-title">Receive your PDF instantly</div><div className="step-desc">Download your complete curriculum guide immediately{freeDay ? '' : ' after payment'}. Print it or keep it on your phone.</div></div>
          </div>
        </div>
      </div>

      <div className="obj-strip">
        <div className="obj-inner">
          <div>
            <div className="obj-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div className="obj-title">100% Secure Access</div>
            <div className="obj-desc">Protected by end-to-end encryption. We never store your details.</div>
          </div>
          <div>
            <div className="obj-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
            </div>
            <div className="obj-title">Works on Any Device</div>
            <div className="obj-desc">PDF opens on your phone, tablet, or laptop. Readable offline anytime.</div>
          </div>
          <div>
            <div className="obj-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
            </div>
            <div className="obj-title">Universally Accepted</div>
            <div className="obj-desc">Based on generally accepted lessons taught on each level nationwide and worldwide.</div>
          </div>
          <div>
            <div className="obj-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <div className="obj-title">Wrong guide? We'll fix it</div>
            <div className="obj-desc">Accidentally bought the wrong guide? Message us and we'll send the correct one free.</div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="section-label">Student Reviews</div>
        <div className="section-title">Real Feedback.<br/>Real Students.</div>
        <div className="testi-grid">
          <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-text">"I haven't even started classes yet, but I already have my entire curriculum planned out. The layout is beautiful and easy to read. Incredibly worth it!"</p><div className="testi-author"><div className="testi-avatar" style={{background:'#e74c3c'}}>JR</div><div><div className="testi-name">Jessa Reyes</div><div className="testi-role">BS Nursing, 1st Year</div></div></div></div>
          <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-text">"As a student, I needed to plan my duties in advance. This gave me everything — subjects, duty schedule, thesis timeline. Worth every centavo."</p><div className="testi-author"><div className="testi-avatar" style={{background:'#2980b9'}}>MC</div><div><div className="testi-name">Marc Castillo</div><div className="testi-role">BS Nursing, 3rd Year</div></div></div></div>
          <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-text">"I bought the full 4-year Nursing guide. My friends thought I was joking. Shared it with my whole block. Legit the best study investment ever."</p><div className="testi-author"><div className="testi-avatar" style={{background:'#27ae60'}}>AL</div><div><div className="testi-name">Andrea Lim</div><div className="testi-role">BS Nursing, 2nd Year</div></div></div></div>
        </div>
      </div>

      <div className="cta-banner">
        <h2>YOUR NURSING JOURNEY<br/>STARTS {freeDay ? 'FOR FREE' : 'WITH ₱5'}</h2>
        <p>Stop stressing. Start preparing. The most affordable study guide worldwide is one click away.</p>
        <button className="btn-big" onClick={() => openModal()}>Get My PDF Now — {priceDisplay}</button>
        <p className="cta-banner-sub">Instant download · PDF format · No subscription · No hidden fees</p>
      </div>

      <footer>
        <div className="footer-logo">MedGuide</div>
        <div className="footer-note">© 2026 MedGuide · For nursing students worldwide · Based on universally accepted curricula · Not affiliated with any university</div>
      </footer>

      <button className="float-badge" onClick={() => openModal()}>Get PDF — <span>{priceDisplay}</span></button>

      {/* MODAL */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal">
          <div className="modal-header">
            <h3>GET YOUR CURRICULUM GUIDE</h3>
            <p>Complete 4-Year Nursing Package</p>
          </div>
          <div className="modal-body">
            {!freeDay && (
              <>
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
              </>
            )}

            {freeDay && (
              <div style={{ background: '#ecfdf5', padding: '16px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #a7f3d0' }}>
                <p style={{ fontSize: '15px', color: '#065f46', margin: 0, fontWeight: 600, textAlign: 'center' }}>
                  Happy Free Day! Your guide is completely free today. Enjoy!
                </p>
              </div>
            )}

            {!isVerifying && !isVerified && !freeDay && (
              <button className="modal-pay-btn" onClick={handleVerify}>VERIFY PAYMENT →</button>
            )}

            {isVerifying && !freeDay && (
              <button className="modal-pay-btn" style={{ background: '#f59e0b', cursor: 'wait' }} disabled>
                VERIFYING... ({verifyCountdown}s)
              </button>
            )}

            {(isVerified || freeDay) && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <button className="modal-pay-btn" style={{ background: '#10b981', margin: 0 }} onClick={() => { 
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
                  ⬇ DOWNLOAD NOW (.ZIP)
                </button>
                
                <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', padding: '15px', borderRadius: '8px', textAlign: 'left', fontSize: '13px', color: '#475569' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#0f172a', fontSize: '14px', fontWeight: 600 }}>How to open the .ZIP file:</h4>
                  <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <li><strong>iPhone/iPad:</strong> Open the "Files" app, find the downloaded file, and tap it to unzip.</li>
                    <li><strong>Android:</strong> Open "Files by Google" or "My Files", locate the file, and tap "Extract".</li>
                    <li><strong>Mac:</strong> Double-click the ZIP file to extract it automatically.</li>
                    <li><strong>Windows:</strong> Right-click the ZIP file and select "Extract All...".</li>
                  </ul>
                </div>
              </div>
            )}

            <button className="modal-close" onClick={closeModal}>Cancel</button>
          </div>
        </div>
      </div>
      {/* LIGHTBOX */}
      {lightboxImage && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.9)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'zoom-out' }} onClick={() => setLightboxImage(null)}>
          <img src={lightboxImage} alt="Expanded Preview" style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain', borderRadius: '8px', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }} referrerPolicy="no-referrer" />
          <button style={{ position: 'absolute', top: '20px', right: '30px', background: 'transparent', border: 'none', color: 'white', fontSize: '40px', cursor: 'pointer' }} onClick={() => setLightboxImage(null)}>×</button>
        </div>
      )}

      {/* SCROLL INDICATOR */}
      {!isAtBottom && (
        <div className="scroll-indicator">
          SCROLL FOR MORE <span style={{ fontSize: '18px', lineHeight: 1 }}>↓</span>
        </div>
      )}
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
