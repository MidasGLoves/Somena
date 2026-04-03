import React, { useState, useEffect } from 'react';

const COURSES = [
  { name:"BS Business Administration", color:"#3b82f6", bg:"#eff6ff", tag:"Business",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["Introduction to Business","Business Mathematics","Fundamentals of Accounting 1","Business Communication","Economics 1 (Micro)"]},{s:"Semester 2",l:["Fundamentals of Accounting 2","Business Law 1","Economics 2 (Macro)","Statistics for Business","Organization & Management"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Managerial Accounting","Marketing Management","Business Law 2","Financial Management 1","Human Behavior in Organizations"]},{s:"Semester 2",l:["Financial Management 2","Operations Management","Business Research Methods","Cost Accounting","Labor Relations & Legislation"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Strategic Management","Entrepreneurship 1","Supply Chain Management","Management Information Systems","Investment & Portfolio Management"]},{s:"Semester 2",l:["Entrepreneurship 2","International Business","Project Management","Business Ethics","Taxation (Income & Business Tax)"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Business Policy & Strategy","Leadership & Decision Making","Feasibility Study","Elective (Specialization)","Thesis / Capstone 1"]},{s:"Semester 2",l:["On-the-Job Training (OJT)","Thesis / Capstone 2","Elective (Specialization)","Comprehensive Review","Business Plan Defense"]}]}
    ]
  },
  { name:"BS Education", color:"#22c55e", bg:"#f0fdf4", tag:"Teaching",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["The Child & Adolescent Learner","The Teaching Profession","Intro to Philosophy of Education","Communication Skills in English 1","Mathematics in the Modern World"]},{s:"Semester 2",l:["Facilitating Learner-Centered Teaching","Foundation of Special & Inclusive Ed.","Communication Skills in English 2","Science Technology & Society","Art Appreciation"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["The Teacher & the School Curriculum","Technology for Teaching & Learning 1","Major Subject 1 (Specialization)","Major Subject 2","Assessment in Learning 1"]},{s:"Semester 2",l:["Technology for Teaching & Learning 2","Assessment in Learning 2","Major Subject 3","Major Subject 4","Field Study 1 — Observation"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Principles of Teaching 1","Developmental Reading 1","Major Subject 5","Major Subject 6","Field Study 2 — Participation"]},{s:"Semester 2",l:["Principles of Teaching 2","Developmental Reading 2","Major Subject 7","Major Subject 8","Research in Education 1"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Student Teaching / Practice Teaching 1","Research in Education 2","Major Subject 9","Special Topics in Education","Seminar in Education"]},{s:"Semester 2",l:["Student Teaching / Practice Teaching 2","Classroom Management","Research Defense","LET Review","Exit Examination"]}]}
    ]
  },
  { name:"BS Information Technology", color:"#a855f7", bg:"#faf5ff", tag:"Tech",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["Intro to Computing","Computer Programming 1 (Python/C)","Discrete Mathematics","Communication Skills","Physical Education"]},{s:"Semester 2",l:["Computer Programming 2","Data Structures & Algorithms","Digital Logic Design","Technical Writing","Web Development Fundamentals"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Object-Oriented Programming","Database Management Systems","Computer Networks 1","Operating Systems","Systems Analysis & Design"]},{s:"Semester 2",l:["Advanced Database Systems","Computer Networks 2","Human-Computer Interaction","Software Engineering 1","Technopreneurship"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Software Engineering 2","Information Security","Mobile App Development","IT Project Management","Research Methods in IT"]},{s:"Semester 2",l:["Cloud Computing","Data Analytics","Elective 1 (AI / Web Systems)","Elective 2 (IoT / Cybersecurity)","Thesis / Capstone 1"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Thesis / Capstone 2","System Integration & Architecture","Social Issues & Professional Practice","Elective 3","Internship Preparation"]},{s:"Semester 2",l:["Practicum / OJT (486 hrs)","Thesis / Capstone Defense","Comprehensive Examination","IT Service Management","Exit Review"]}]}
    ]
  },
  { name:"BS Nursing", color:"#ef4444", bg:"#fef2f2", tag:"Health",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["Anatomy & Physiology 1","Biochemistry","Intro to Nursing Practice","Nutrition & Diet Therapy","Communication in Nursing"]},{s:"Semester 2",l:["Anatomy & Physiology 2","Microbiology & Parasitology","Fundamentals of Nursing Practice","Health Assessment","Pharmacology 1"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Medical-Surgical Nursing 1","Pharmacology 2","Pathophysiology","Community Health Nursing 1","NCM 100 — RLE (Clinical Exp.)"]},{s:"Semester 2",l:["Medical-Surgical Nursing 2","Psychiatric Nursing","Pediatric Nursing 1","Research in Nursing 1","NCM 101 — RLE"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Maternal & Child Health Nursing","Pediatric Nursing 2","Community Health Nursing 2","Geriatric Nursing","NCM 102 — RLE"]},{s:"Semester 2",l:["Critical Care Nursing","Emergency Nursing","Oncology Nursing","Nursing Leadership & Management","NCM 103 — RLE"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Nursing Research / Thesis","Operating Room Nursing","Nursing Informatics","Holistic Nursing","NCM 200 — Integrated RLE"]},{s:"Semester 2",l:["Community Immersion (Rural Health)","NCM 201 — Final RLE","Ethics in Nursing","NLE Review Program","Board Exam Preparation"]}]}
    ]
  },
  { name:"BS Computer Science", color:"#10b981", bg:"#ecfdf5", tag:"Tech",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["Intro to CS & Programming (C++)","Calculus 1","Discrete Structures 1","Communication Skills","Physics for CS"]},{s:"Semester 2",l:["Programming 2 (Java/Python)","Calculus 2","Discrete Structures 2","Computer Organization","Probability & Statistics"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Data Structures & Algorithms","Logic Design & Digital Circuits","Operating Systems","Linear Algebra","Object-Oriented Programming"]},{s:"Semester 2",l:["Algorithm Design & Complexity","Database Systems","Computer Networks","Software Engineering 1","Automata Theory"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Artificial Intelligence","Machine Learning 1","Programming Languages","Numerical Methods","CS Research Methods"]},{s:"Semester 2",l:["Machine Learning 2 / Deep Learning","Computer Graphics","Elective 1 (Data Science / Security)","Software Engineering 2","Thesis 1"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Thesis 2 — Implementation","Elective 2 (Cloud / Blockchain)","Elective 3 (NLP / CV / Robotics)","Social & Professional Issues","Seminar in CS"]},{s:"Semester 2",l:["Thesis Defense","Internship / Practicum","Elective 4","Tech Entrepreneurship","CS Exit Exam"]}]}
    ]
  },
  { name:"BS Accountancy", color:"#f59e0b", bg:"#fffbeb", tag:"Finance",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["Financial Accounting & Reporting 1","Business Mathematics","Economics 1","Business Law 1","Communication in Business"]},{s:"Semester 2",l:["Financial Accounting & Reporting 2","Business Statistics","Economics 2","Business Law 2","Logic & Critical Thinking"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Intermediate Accounting 1","Cost Accounting & Control 1","Income Taxation","Business Finance","Management Information Systems"]},{s:"Semester 2",l:["Intermediate Accounting 2","Cost Accounting & Control 2","Business & Transfer Taxes","Management Accounting 1","Auditing Theory"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Advanced Financial Accounting 1","Auditing Problems 1","Management Accounting 2","Business Policy & Strategy","Governance, Ethics & Risk"]},{s:"Semester 2",l:["Advanced Financial Accounting 2","Auditing Problems 2","Financial Management","Philippine Financial Reporting Standards","Accounting Research"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Accounting Research / Thesis","CPA Board Review 1 (FAR/AT)","Special Topics in Accounting","Elective (Internal Auditing)","Government Accounting"]},{s:"Semester 2",l:["CPA Board Review 2 (Tax/Mgt. Services)","Comprehensive Examination","Practicum / OJT","Accounting Seminar","CPALE Preparation"]}]}
    ]
  },
  { name:"BS Civil Engineering", color:"#6366f1", bg:"#eef2ff", tag:"Engineering",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["Engineering Drawing / CAD","Calculus 1","Chemistry for Engineers","Physics 1 (Mechanics)","Communication Skills"]},{s:"Semester 2",l:["Engineering Mechanics (Statics)","Calculus 2","Physics 2 (Electricity)","Materials Science","Surveying 1"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Strength of Materials","Fluid Mechanics 1","Differential Equations","Surveying 2","Engineering Geology"]},{s:"Semester 2",l:["Structural Theory 1","Fluid Mechanics 2 / Hydraulics","Probability & Statistics for Engineers","Construction Materials Testing","Soil Mechanics 1"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Structural Theory 2","Soil Mechanics 2 & Foundation Engr.","Hydraulic Engineering","Transportation Engineering 1","Environmental Engineering 1"]},{s:"Semester 2",l:["Structural Steel Design","Reinforced Concrete Design 1","Geotechnical Engineering","Transportation Engineering 2","Environmental Engineering 2"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Reinforced Concrete Design 2","Construction Management","Pre-stressed Concrete","CE Laws, Ethics & Contracts","CE Research / Thesis 1"]},{s:"Semester 2",l:["CE Research / Thesis 2 Defense","Quantity Surveying & Cost Estimation","Project Management","CE Board Exam Review","OJT / Practicum"]}]}
    ]
  },
  { name:"BS Criminology", color:"#f43f5e", bg:"#fff1f2", tag:"Law & Order",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["Introduction to Criminology","Law Enforcement Administration","Criminal Law Book 1","Communication Skills","Physical Education / ROTC"]},{s:"Semester 2",l:["Fundamentals of Criminal Investigation","Criminal Law Book 2","Sociology of Crimes","Philippine Criminal Justice System","Criminalistics 1"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Criminal Procedure & Court Testimony","Criminalistics 2 — Fingerprinting","Police Administration","Crime Prevention & Control","Human Behavior in Crisis"]},{s:"Semester 2",l:["Police Planning","Correctional Administration","Special Crimes Investigation","Juvenile Delinquency & Deviance","Criminalistics 3 — Questioned Documents"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Forensic Chemistry & Toxicology","Organized Crime & Terrorism","Traffic Management & Accident Investigation","Drug Education & Vice Control","Legal Medicine & Forensic Pathology"]},{s:"Semester 2",l:["Forensic Ballistics","Criminology Research Methods","Intelligence & Counter-Intelligence","White-Collar & Cyber Crime","Crisis Management"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Criminology Research / Thesis 1","Special Topics in Criminalistics","Ethics & Values in Law Enforcement","Elective Subject","Board Exam Review 1"]},{s:"Semester 2",l:["Criminology Thesis 2 / Defense","OJT — Police / Jail / Bureau","Comprehensive Exam","Board Exam Review 2","Criminologist Licensure Exam Prep"]}]}
    ]
  },
  { name:"BS Psychology", color:"#ec4899", bg:"#fdf2f8", tag:"Social Sci",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["General Psychology","Intro to Research Methods","Biological Basis of Behavior","Communication Skills","Social Sciences (Sociology)"]},{s:"Semester 2",l:["Developmental Psychology","Statistics in Psychology","Fundamentals of Human Anatomy","Ethics in Psychology","Philosophy of the Person"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Theories of Personality","Experimental Psychology","Abnormal Psychology","Social Psychology","Psychological Testing 1"]},{s:"Semester 2",l:["Cognitive Psychology","Psychopathology","Psychological Testing 2","Industrial / Organizational Psychology","Research Methods 2"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Counseling Psychology","Neuropsychology","Educational Psychology","Cross-Cultural Psychology","Quantitative Research in Psychology"]},{s:"Semester 2",l:["Health Psychology","Forensic Psychology","Community Psychology","Psychological Assessment (Projectives)","Qualitative Research Methods"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Psychology Thesis / Research 1","Child & Adolescent Psychotherapy","Human Sexuality & Reproductive Health","Elective (HR / Clinical / Guidance)","Seminar in Applied Psychology"]},{s:"Semester 2",l:["Thesis Defense","Practicum / Internship (Clinical or I-O)","Psychologist Licensure Review","Psychology of Exceptional Children","Comprehensive Exit Exam"]}]}
    ]
  },
  { name:"BS Hospitality Management", color:"#f97316", bg:"#fff7ed", tag:"Tourism",
    years:[
      {label:"1st Year",sems:[{s:"Semester 1",l:["Intro to Hospitality Industry","Fundamentals of Food Service","Communication Skills (Tourism)","Front Office Operations 1","Principles of Food Preparation"]},{s:"Semester 2",l:["Food & Beverage Service Operations","Housekeeping Management","Front Office Operations 2","Business Mathematics","Culinary Arts 1 — Local Cuisine"]}]},
      {label:"2nd Year",sems:[{s:"Semester 1",l:["Tourism Economics","Culinary Arts 2 — International","Bar & Beverage Management","Safety, Sanitation & Hygiene","Lodging Operations"]},{s:"Semester 2",l:["Event Management 1","Hospitality Marketing","Human Resource Management","Cost Control in Food Service","Wine & Sommelier Studies"]}]},
      {label:"3rd Year",sems:[{s:"Semester 1",l:["Event Management 2","Resort & Spa Management","Strategic Planning in Hospitality","Tourism Law & Ethics","Research Methods in Tourism"]},{s:"Semester 2",l:["Hotel Facilities Management","Revenue Management","Sustainable Tourism","Entrepreneurship in Tourism","Hospitality Research / Thesis 1"]}]},
      {label:"4th Year",sems:[{s:"Semester 1",l:["Hospitality Thesis 2","Digital Marketing for Tourism","International Tourism Trends","Quality Service Management","Seminar in Hospitality Management"]},{s:"Semester 2",l:["On-the-Job Training (600 hrs)","Thesis / Research Defense","Comprehensive Examination","Professional Ethics in Tourism","Exit Review & Evaluation"]}]}
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
  const [selectedCourse, setSelectedCourse] = useState('');
  const [selectedSem, setSelectedSem] = useState('1');
  const [email, setEmail] = useState('');
  const [refCode, setRefCode] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verifyCountdown, setVerifyCountdown] = useState(9);

  const totalAmount = parseInt(selectedSem) || 1;

  const toggleDrawer = (id: string) => {
    setActiveDrawer(prev => prev === id ? null : id);
  };

  const openModal = (courseName?: string, sems: string = '1') => {
    if (courseName) {
      setSelectedCourse(courseName);
    }
    setSelectedSem(sems);
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
      alert('Piliin muna ang iyong course!');
      return;
    }
    if (!email || !email.includes('@')) {
      alert('Maglagay ng valid email address para matanggap ang iyong PDF.');
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
          <span>✦ ONLY ₱1 PER SEMESTER</span><span>✦ INSTANT PDF DOWNLOAD</span><span>✦ 10 COURSES AVAILABLE</span><span>✦ UPDATED 2025 CURRICULUM</span><span>✦ BOARD EXAM READY</span><span>✦ OVER 5,000 STUDENTS SERVED</span><span>✦ ONLY ₱1 PER SEMESTER</span><span>✦ INSTANT PDF DOWNLOAD</span><span>✦ 10 COURSES AVAILABLE</span><span>✦ UPDATED 2025 CURRICULUM</span><span>✦ BOARD EXAM READY</span><span>✦ OVER 5,000 STUDENTS SERVED</span>
        </div>
      </div>

      <nav>
        <div className="nav-logo">Kurso<span>PH</span></div>
        <button className="nav-cta" onClick={() => openModal()}>Get My Guide — ₱1</button>
      </nav>

      <div className="hero">
        <div>
          <div className="hero-badge">Pinaka-abot kayang study guide sa PH</div>
          <h1>STOP<br/>GUESSING<br/>YOUR <span className="accent">COURSE</span><br/>FOR <span className="price-inline">₱1</span></h1>
          <p className="hero-sub">Get the <strong>complete semester-by-semester lesson guide</strong> for your exact college course and year level. Know exactly what to expect — before your first day of class.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => openModal()}>📄 Download My PDF Now</button>
            <button className="btn-secondary" onClick={() => document.getElementById('courses')?.scrollIntoView({behavior:'smooth'})}>Browse all courses ↓</button>
          </div>
          <div className="hero-proof">
            <div className="avatars">
              <span style={{background:'#e74c3c'}}>JR</span><span style={{background:'#3498db'}}>AC</span><span style={{background:'#27ae60'}}>MB</span><span style={{background:'#9b59b6'}}>LS</span>
            </div>
            <p className="hero-proof-text">Trusted by <strong>5,000+</strong> Filipino students this semester</p>
          </div>
        </div>
        <div className="hero-card">
          <div className="hero-card-label">What you get inside</div>
          <div className="hero-card-price"><sub>₱</sub>1<sub style={{fontSize:'18px',opacity:0.5}}>/semester</sub></div>
          <div className="hero-card-note">e.g. ₱2 for 1 year · ₱8 for full 4 years</div>
          <hr className="hero-card-divider"/>
          <ul className="hero-card-features">
            <li>All subjects per semester</li>
            <li>Board exam prep timeline included</li>
            <li>OJT &amp; practicum schedule guide</li>
            <li>Subject descriptions &amp; goals</li>
            <li>Elective &amp; specialization options</li>
            <li>Printable &amp; mobile-friendly PDF</li>
            <li>Updated 2025 CHED curriculum</li>
          </ul>
          <button className="hero-card-btn" onClick={() => openModal()}>CHOOSE MY COURSE &amp; SEMESTER →</button>
        </div>
      </div>

      <div className="why-strip">
        <div className="why-inner">
          <div className="why-item"><div className="why-num">10</div><div className="why-title">Courses Covered</div><div className="why-desc">Business, Nursing, IT, CS, Education, Accountancy, Engineering, Criminology, Psychology &amp; Hospitality</div></div>
          <div className="why-item"><div className="why-num">₱1</div><div className="why-title">Per Semester</div><div className="why-desc">That's cheaper than a photocopy. Get the entire semester breakdown for just one peso per semester.</div></div>
          <div className="why-item"><div className="why-num">2sec</div><div className="why-title">Instant Download</div><div className="why-desc">Pay and receive your PDF immediately. No waiting, no shipping, no hassle. Available 24/7.</div></div>
        </div>
      </div>

      <div className="courses-section" id="courses">
        <div className="courses-inner">
          <div className="section-label">All Available Courses</div>
          <div className="section-title">Pick Your Course.<br/>Pay Only What You Need.</div>
          <p className="section-sub" style={{marginTop:'12px'}}>👆 Tap any year pill to preview all subjects inside — then buy only what you need. ₱1 per semester, walang minimum.</p>
          
          <div className="courses-grid">
            {COURSES.map((c, ci) => (
              <div key={ci} className="course-card">
                <div className="course-card-top">
                  <div className="course-name">{c.name}</div>
                  <div className="course-tag" style={{background:c.bg, color:c.color}}>{c.tag}</div>
                </div>
                <div className="course-card-body">
                  <div className="years-hint">👆 Tap a year to preview all subjects inside</div>
                  <div className="years-row">
                    {c.years.map((yr, yi) => {
                      const id = `${ci}-${yi}`;
                      const isActive = activeDrawer === id;
                      return (
                        <div key={yi} className={`year-pill ${isActive ? 'active' : ''}`} style={{color:c.color}} onClick={() => toggleDrawer(id)}>
                          <span>{ordinals[yi]} Yr</span>
                          <span className="yprice">₱2</span>
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
                          <span className="drawer-year-label" style={{color:c.color}}>{yr.label} · 10 subjects</span>
                          <button className="drawer-buy-btn" onClick={(e) => { e.stopPropagation(); openModal(c.name, '2'); }}>Buy this year ₱2 →</button>
                        </div>
                        {yr.sems.map((sem, si) => (
                          <div key={si} className="sem-block">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                              <div className="sem-title" style={{ marginBottom: 0 }}>{sem.s}</div>
                              <button 
                                onClick={(e) => { e.stopPropagation(); openModal(c.name, '1'); }}
                                style={{ fontSize: '11px', padding: '4px 8px', background: c.color, color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                              >
                                Buy Sem ₱1 →
                              </button>
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
                  
                  <div className="course-card-footer">
                    <div className="total-price">Full 4-year guide: <strong>₱8</strong></div>
                    <button className="buy-all-btn" onClick={() => openModal(c.name, '8')}>Buy All Semesters →</button>
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
            <div className="how-step"><div className="step-num">01</div><div className="step-title">Choose your course &amp; semester</div><div className="step-desc">Select from 10 degree programs and pick exactly which semester(s) you need. Pay only ₱1 per semester.</div></div>
            <div className="how-step"><div className="step-num">02</div><div className="step-title">Complete your ₱1 payment</div><div className="step-desc">Pay via GCash. Secure, instant, and officially receipted.</div></div>
            <div className="how-step"><div className="step-num">03</div><div className="step-title">Receive your PDF instantly</div><div className="step-desc">Download your complete curriculum guide immediately after payment. Print it or keep it on your phone.</div></div>
          </div>
        </div>
      </div>

      <div className="obj-strip">
        <div className="obj-inner">
          <div><div className="obj-icon">🔒</div><div className="obj-title">100% Secure Payment</div><div className="obj-desc">Protected by end-to-end encryption. We never store card details.</div></div>
          <div><div className="obj-icon">📲</div><div className="obj-title">Works on Any Device</div><div className="obj-desc">PDF opens on your phone, tablet, or laptop. Readable offline anytime.</div></div>
          <div><div className="obj-icon">🎯</div><div className="obj-title">CHED Aligned</div><div className="obj-desc">All guides follow current CHED-mandated curricula and include board exam timelines.</div></div>
          <div><div className="obj-icon">💬</div><div className="obj-title">Wrong semester? We'll fix it</div><div className="obj-desc">Accidentally bought the wrong semester? Message us and we'll send the correct one free.</div></div>
        </div>
      </div>

      <div className="section">
        <div className="section-label">Student Reviews</div>
        <div className="section-title">Real Feedback.<br/>Real Students.</div>
        <div className="testi-grid">
          <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-text">"Hindi pa ko nagsisimula ng klase, naka-plan na ako for the whole semester. Ang ganda ng layout, madaling basahin. ₱1 lang?! Grabe ang sulit!"</p><div className="testi-author"><div className="testi-avatar" style={{background:'#e74c3c'}}>JR</div><div><div className="testi-name">Jessa Reyes</div><div className="testi-role">BS Nursing, 1st Year · UST</div></div></div></div>
          <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-text">"As a working student, I needed to plan my schedule in advance. This gave me everything — subjects, OJT schedule, thesis timeline. Worth every centavo."</p><div className="testi-author"><div className="testi-avatar" style={{background:'#2980b9'}}>MC</div><div><div className="testi-name">Marc Castillo</div><div className="testi-role">BS IT, 3rd Year · PUP</div></div></div></div>
          <div className="testi-card"><div className="testi-stars">★★★★★</div><p className="testi-text">"I bought the full 4-year Accountancy guide for just ₱8. My friends thought I was joking. Shared it with my whole block. Legit the best study investment ever."</p><div className="testi-author"><div className="testi-avatar" style={{background:'#27ae60'}}>AL</div><div><div className="testi-name">Andrea Lim</div><div className="testi-role">BS Accountancy, 2nd Year · DLSU</div></div></div></div>
        </div>
      </div>

      <div className="cta-banner">
        <h2>YOUR NEXT SEMESTER<br/>STARTS WITH <span>₱1</span></h2>
        <p>Stop stressing. Start preparing. The most affordable study guide in the Philippines is one click away.</p>
        <button className="btn-big" onClick={() => openModal()}>📄 Get My PDF Now — ₱1</button>
        <p className="cta-banner-sub">Instant download · PDF format · No subscription · No hidden fees</p>
      </div>

      <footer>
        <div className="footer-logo">Kurso<span>PH</span></div>
        <div className="footer-note">© 2026 KursoPH · For Filipino students · Based on CHED curricula · Not affiliated with any university</div>
      </footer>

      <button className="float-badge" onClick={() => openModal()}>📄 Get PDF — <span>₱1</span></button>

      {/* MODAL */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
        <div className="modal">
          <div className="modal-header">
            <h3>GET YOUR CURRICULUM GUIDE</h3>
            <p>Select your course and semester(s) below</p>
          </div>
          <div className="modal-body">
            <label>Your Course</label>
            <select value={selectedCourse} onChange={e => setSelectedCourse(e.target.value)}>
              <option value="">— Select a course —</option>
              {COURSES.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
            </select>
            
            <label>Semesters — ₱1 each</label>
            <select value={selectedSem} onChange={e => setSelectedSem(e.target.value)}>
              <option value="1">1 Semester — ₱1</option>
              <option value="2">2 Semesters (1 Year) — ₱2</option>
              <option value="3">3 Semesters — ₱3</option>
              <option value="4">4 Semesters (2 Years) — ₱4</option>
              <option value="8">Complete 8 Semesters (4 Years) — ₱8</option>
            </select>
            
            <label>Email Address (for PDF delivery)</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="yourname@email.com"/>
            
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
              <button className="modal-pay-btn" style={{ background: '#10b981' }} onClick={() => { alert('Downloading PDF...'); closeModal(); }}>
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
