import { useState, useCallback } from "react";

const PHY_CHAPTERS = ["Physical World & Units & Measurements","Motion in a Straight Line","Motion in a Plane","Laws of Motion","Work, Energy & Power","System of Particles & Rotational Motion","Gravitation","Mechanical Properties of Solids","Mechanical Properties of Fluids","Thermal Properties of Matter","Thermodynamics","Kinetic Theory of Gases","Oscillations","Waves"];
const CHEM_CHAPTERS = ["Some Basic Concepts of Chemistry","Structure of Atom","Classification of Elements & Periodicity","Chemical Bonding & Molecular Structure","States of Matter","Chemical Thermodynamics","Equilibrium","Redox Reactions","Hydrogen","s-Block Elements","p-Block Elements (Groups 13–14)","Organic Chemistry – Basic Principles","Hydrocarbons","Environmental Chemistry"];
const MATH_CHAPTERS = ["Sets","Relations & Functions","Trigonometric Functions","Principle of Mathematical Induction","Complex Numbers & Quadratic Equations","Linear Inequalities","Permutations & Combinations","Binomial Theorem","Sequences & Series","Straight Lines","Conic Sections","Introduction to 3D Geometry","Limits & Derivatives","Mathematical Reasoning","Statistics","Probability"];
const CBSE_MAP = {
  Physics: PHY_CHAPTERS,
  Chemistry: CHEM_CHAPTERS,
  Mathematics: MATH_CHAPTERS,
  Biology: ["The Living World","Biological Classification","Plant Kingdom","Animal Kingdom","Morphology of Flowering Plants","Anatomy of Flowering Plants","Structural Organisation in Animals","Cell: The Unit of Life","Biomolecules","Cell Cycle & Cell Division","Transport in Plants","Mineral Nutrition","Photosynthesis in Higher Plants","Respiration in Plants","Plant Growth & Development","Digestion & Absorption","Breathing & Exchange of Gases","Body Fluids & Circulation","Excretory Products & Elimination","Locomotion & Movement","Neural Control & Coordination","Chemical Coordination & Integration"],
  "Computer Science": ["Computer Systems & Organisation","Introduction to Python","Data Types & Operators","Flow of Control","Functions","Strings","Lists, Dictionaries & Tuples","Societal Impacts of IT"],
};
const PROGRAMS = [
  {e:"💻",n:"Computer Science & Engineering (CSE / AI / ML)",d:"Extremely High",s:"₹8–40 LPA",c:["IIT Bombay","IIT Delhi","NIT Trichy","BITS Pilani"],sp:["AI / ML","Cybersecurity","Cloud Computing","Data Science"],o:"AI boom driving unprecedented demand. 2025 sees 40 %+ growth in ML roles across product companies."},
  {e:"📡",n:"Electronics & Communication (ECE)",d:"Very High",s:"₹6–25 LPA",c:["IIT Madras","IIT Kharagpur","NIT Warangal","BITS Hyderabad"],sp:["VLSI","Embedded Systems","5G / 6G","IoT"],o:"Semiconductor push under 'Make in India' creating thousands of new chip-design and fab jobs."},
  {e:"🧠",n:"Data Science & AI (Dedicated B.Tech)",d:"Extremely High",s:"₹10–50 LPA",c:["IIT Hyderabad","IIT Jodhpur","CMI","ISI Kolkata"],sp:["ML Engineering","NLP","Computer Vision","Analytics"],o:"India's fastest-growing field — 2 M+ jobs projected by 2027 per NASSCOM."},
  {e:"⚙️",n:"Mechanical Engineering",d:"High",s:"₹5–20 LPA",c:["IIT Kanpur","IIT Bombay","NIT Surathkal","BITS Goa"],sp:["Robotics","Automotive / EV","Aerospace","Advanced Manufacturing"],o:"EV revolution and defence manufacturing opening massive new avenues for fresh graduates."},
  {e:"🏗️",n:"Civil Engineering",d:"Moderate-High",s:"₹4–15 LPA",c:["IIT Roorkee","NIT Calicut","IIT Delhi","BITS Pilani"],sp:["Structural","Transportation","Smart Cities","Environmental"],o:"₹111 lakh crore national infra push (NIP) creating sustained hiring for the next decade."},
  {e:"🚀",n:"Aerospace Engineering",d:"High",s:"₹6–22 LPA",c:["IIT Bombay","IIT Kanpur","IIST Thiruvananthapuram","PEC Chandigarh"],sp:["Propulsion","Avionics","Space Tech","Defence"],o:"ISRO expansion + private space sector (Skyroot, Agnikul) boom makes this a red-hot pick."},
];
const EXAMS = [
  {n:"JEE Main",b:"National Testing Agency (NTA)",lv:"National",reg:"Nov–Dec 2024 (S1) | Feb–Mar 2025 (S2)",dt:"Jan–Feb & Apr 2025",att:"2 per year",elig:"12th PCM, 75 % aggregate",seats:"~2.5 L qualify for Advanced",pat:"90 MCQs — PCM (300 marks), 3 hrs",tip:"Master NCERT first. Practice 10 + year papers. Negative marking: –1 per wrong MCQ.",web:"jeemain.nta.nic.in"},
  {n:"JEE Advanced",b:"IITs (rotational organiser)",lv:"National — IITs",reg:"Apr–May 2025",dt:"May 2025",att:"2 lifetime attempts",elig:"Top 2.5 L JEE Main qualifiers",seats:"~17,000 seats across 23 IITs",pat:"2 papers × 3 hrs | MCQ + Integer + Paragraph type",tip:"Deep conceptual clarity wins. Problem-solving speed is decisive. Mock test under real conditions.",web:"jeeadv.ac.in"},
  {n:"BITSAT",b:"BITS Pilani",lv:"Institute Level",reg:"Jan–Apr 2025",dt:"May–Jun 2025",att:"1 per year",elig:"12th PCM ≥ 75 %, English ≥ 60 %",seats:"~2,000 (Pilani + Goa + Hyderabad + Dubai)",pat:"130 MCQs (PCM + English + Logical Reasoning) in 3 hrs",tip:"Speed is king. Finish early to attempt 12 bonus questions that can change your rank.",web:"bitsadmission.com"},
  {n:"VITEEE",b:"VIT University",lv:"Institute Level",reg:"Nov 2024 – Mar 2025",dt:"Apr–May 2025",att:"1 per year",elig:"12th PCM ≥ 60 %",seats:"5,000 + (Vellore, Chennai, AP, Bhopal)",pat:"125 MCQs (PCM + English + Aptitude) in 2.5 hrs",tip:"High acceptance rate, great placements. Good safety net while aiming for JEE.",web:"vit.ac.in"},
  {n:"SRMJEE",b:"SRM University",lv:"Institute Level",reg:"Dec 2024 – Apr 2025",dt:"Apr 2025",att:"1 per year",elig:"12th PCM ≥ 60 %",seats:"4,000 + seats",pat:"125 MCQs in 2.5 hrs",tip:"Moderate difficulty. Strong infrastructure and ₹5 L + median placements in CS branches.",web:"srmist.edu.in"},
  {n:"MHTCET",b:"State CET Cell, Maharashtra",lv:"State — Maharashtra",reg:"Jan–Mar 2025",dt:"Apr–May 2025",att:"1 per year",elig:"12th PCM | MH domicile preferred",seats:"80,000 + seats statewide",pat:"150 MCQs (PCM) in 3 hrs | 20 % weightage from Class 11",tip:"Don't ignore Class XI syllabus — it carries real marks. COEP & VJTI are the top prizes.",web:"cetcell.mahacet.org"},
  {n:"WBJEE",b:"West Bengal Joint Entrance",lv:"State — West Bengal",reg:"Dec 2024 – Jan 2025",dt:"Apr 2025",att:"1 per year",elig:"12th PCM ≥ 45 %",seats:"40,000 + seats in WB colleges",pat:"155 MCQs (Maths 75 + PCB 80) in 2 hrs",tip:"Strong Maths focus. Jadavpur University is the crown jewel — aim high on the Maths section.",web:"wbjeeb.nic.in"},
];

async function callClaude(prompt) {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, messages: [{ role: "user", content: prompt }] }),
  });
  const data = await res.json();
  return data.content.map(b => b.text || "").join("");
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:'DM Sans',sans-serif;background:#06071A;color:#E2E2F0;min-height:100vh;}
.hdr{background:#08091E;border-bottom:1px solid rgba(255,107,0,.25);padding:14px 24px;display:flex;align-items:center;justify-content:space-between;}
.logo{font-family:'Syne',sans-serif;font-size:26px;font-weight:800;background:linear-gradient(120deg,#FF6B00,#FFB347);-webkit-background-clip:text;-webkit-text-fill-color:transparent;letter-spacing:-1px;}
.tgl{font-size:10px;color:rgba(226,226,240,.4);letter-spacing:2px;text-transform:uppercase;margin-top:2px;}
.pill{background:rgba(255,107,0,.12);border:1px solid rgba(255,107,0,.35);color:#FF9240;font-size:11px;padding:4px 14px;border-radius:20px;}
.tabbar{display:flex;gap:2px;padding:10px 20px 0;background:#0A0B20;border-bottom:1px solid rgba(255,255,255,.05);overflow-x:auto;scrollbar-width:none;}
.tabbar::-webkit-scrollbar{display:none;}
.tb{padding:9px 15px;border-radius:8px 8px 0 0;background:transparent;border:none;color:rgba(226,226,240,.4);font-family:'DM Sans',sans-serif;font-size:12px;font-weight:500;cursor:pointer;white-space:nowrap;border-bottom:2px solid transparent;transition:.2s;}
.tb:hover{color:rgba(226,226,240,.8);background:rgba(255,255,255,.04);}
.tb.on{color:#FF6B00;border-bottom:2px solid #FF6B00;background:rgba(255,107,0,.08);}
.page{padding:28px 22px;max-width:1080px;margin:0 auto;}
.sec-title{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#FFF;margin-bottom:5px;}
.sec-sub{font-size:12.5px;color:rgba(226,226,240,.45);margin-bottom:22px;line-height:1.6;}
.grid2{display:grid;grid-template-columns:repeat(auto-fill,minmax(290px,1fr));gap:14px;}
.card{background:#0C0E24;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:18px;transition:.2s;}
.card:hover{border-color:rgba(255,107,0,.3);transform:translateY(-2px);}
.ci{font-size:22px;margin-bottom:10px;}
.ct{font-family:'DM Sans',sans-serif;font-size:14.5px;font-weight:600;color:#FFF;margin-bottom:5px;}
.cs{font-size:12px;color:rgba(226,226,240,.5);margin-bottom:11px;line-height:1.6;}
.sal{font-family:'Syne',sans-serif;font-size:19px;font-weight:800;color:#FF6B00;}
.sal-l{font-size:10px;color:rgba(226,226,240,.35);margin-bottom:10px;text-transform:uppercase;letter-spacing:1px;}
.tag{display:inline-block;padding:2px 9px;border-radius:20px;font-size:10.5px;font-weight:500;margin:2px;}
.to{background:rgba(255,107,0,.13);color:#FF9240;border:1px solid rgba(255,107,0,.28);}
.tb2{background:rgba(56,136,255,.1);color:#7AAFFF;border:1px solid rgba(56,136,255,.22);}
.tg{background:rgba(0,200,110,.1);color:#4ECDA4;border:1px solid rgba(0,200,110,.22);}
.db{font-size:10.5px;padding:2px 9px;border-radius:20px;}
.dxh{background:rgba(255,60,60,.12);color:#FF7070;border:1px solid rgba(255,60,60,.28);}
.dvh{background:rgba(255,150,0,.12);color:#FFB84D;border:1px solid rgba(255,150,0,.28);}
.dh{background:rgba(0,200,110,.1);color:#4ECDA4;border:1px solid rgba(0,200,110,.22);}
.dmh{background:rgba(100,150,255,.1);color:#90AEFF;border:1px solid rgba(100,150,255,.22);}
.lbl{font-size:9.5px;color:rgba(226,226,240,.35);text-transform:uppercase;letter-spacing:1px;display:block;margin-bottom:3px;}
.ec{background:#0C0E24;border:1px solid rgba(255,255,255,.07);border-radius:14px;padding:18px;margin-bottom:12px;}
.en{font-family:'Syne',sans-serif;font-size:17px;font-weight:800;color:#FFF;}
.eb{font-size:11px;color:rgba(226,226,240,.4);margin-top:1px;}
.egrid{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:12px;}
.ei span{font-size:12.5px;color:#E2E2F0;}
.tip{margin-top:12px;padding:10px;background:rgba(255,107,0,.06);border-radius:8px;border:1px solid rgba(255,107,0,.15);font-size:12px;color:rgba(226,226,240,.7);}
.tip b{color:#FF9240;}
.tl{position:relative;padding-left:22px;}
.tl::before{content:'';position:absolute;left:6px;top:0;bottom:0;width:1px;background:rgba(255,107,0,.18);}
.tli{position:relative;margin-bottom:18px;}
.tld{position:absolute;left:-19px;top:5px;width:9px;height:9px;border-radius:50%;background:#FF6B00;}
.tldate{display:inline-block;font-size:10.5px;padding:2px 8px;border-radius:4px;background:rgba(255,107,0,.12);color:#FF9240;margin-bottom:5px;}
.tlt{font-size:13px;font-weight:600;color:#FFF;margin-bottom:3px;}
.tlb{font-size:12px;color:rgba(226,226,240,.5);line-height:1.65;}
.btn{background:linear-gradient(120deg,#FF6B00,#FF9500);border:none;color:#FFF;padding:10px 20px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:13px;font-weight:600;cursor:pointer;transition:.2s;}
.btn:hover{opacity:.9;transform:translateY(-1px);}
.btn:disabled{opacity:.4;cursor:not-allowed;transform:none;}
.btn-g{background:rgba(255,107,0,.1);border:1px solid rgba(255,107,0,.3);color:#FF9240;}
select{background:#0C0E24;border:1px solid rgba(255,255,255,.1);color:#E2E2F0;padding:9px 13px;border-radius:8px;font-family:'DM Sans',sans-serif;font-size:12.5px;outline:none;cursor:pointer;max-width:340px;width:100%;}
select:focus{border-color:rgba(255,107,0,.5);}
.row{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-bottom:18px;}
.ld{display:flex;align-items:center;gap:8px;color:rgba(255,107,0,.7);font-size:12.5px;padding:14px 0;}
.dot{width:6px;height:6px;background:#FF6B00;border-radius:50%;animation:bop 1.2s infinite;}
.dot:nth-child(2){animation-delay:.2s;}
.dot:nth-child(3){animation-delay:.4s;}
@keyframes bop{0%,60%,100%{transform:translateY(0);}30%{transform:translateY(-7px);}}
.ai-box{background:#0C0E24;border:1px solid rgba(255,107,0,.18);border-radius:14px;padding:20px;min-height:100px;}
.ai-txt{font-size:13px;line-height:1.85;color:rgba(226,226,240,.85);white-space:pre-wrap;}
.hg{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:12px;}
.hc{background:#0C0E24;border:1px solid rgba(255,255,255,.07);border-radius:12px;padding:16px;}
.ht{font-size:13.5px;font-weight:600;color:#FFF;margin-bottom:5px;}
.hs{font-size:11.5px;color:rgba(226,226,240,.5);line-height:1.6;}
.rev{background:linear-gradient(135deg,rgba(255,107,0,.1),rgba(255,150,0,.04));border:1px solid rgba(255,107,0,.22);border-radius:12px;padding:18px;margin-top:18px;}
`;

function Loader(){return(<div className="ld"><div className="dot"/><div className="dot"/><div className="dot"/><span>AI is thinking...</span></div>);}

function ProgramsTab(){
  const dmap={Extremely:"dxh","Very":"dvh",High:"dh",Moderate:"dmh"};
  return(<div>
    <h2 className="sec-title">Best Engineering Programs in India — 2025</h2>
    <p className="sec-sub">Market analysis based on NASSCOM, AICTE, and industry hiring data. Salary ranges reflect fresher to 3-year experience CTC.</p>
    <div className="grid2">{PROGRAMS.map(p=>(<div key={p.n} className="card">
      <div className="ci">{p.e}</div>
      <div className="ct">{p.n}</div>
      <div className="cs">{p.o}</div>
      <div className="sal">{p.s}</div>
      <div className="sal-l">Avg CTC Range</div>
      <span className={`db ${dmap[p.d.split(" ")[0]]||"dh"}`}>{p.d} Demand</span>
      <div style={{marginTop:"12px"}}><span className="lbl">Top Colleges</span>{p.c.map(c=><span key={c} className="tag tb2">{c}</span>)}</div>
      <div style={{marginTop:"10px"}}><span className="lbl">Hot Specializations</span>{p.sp.map(s=><span key={s} className="tag to">{s}</span>)}</div>
    </div>))}</div>
  </div>);
}

function ExamsTab(){
  return(<div>
    <h2 className="sec-title">Top Engineering Entrance Exams — 2025</h2>
    <p className="sec-sub">Everything you need: registration windows, exam dates, eligibility, pattern, and insider tips.</p>
    {EXAMS.map(e=>(<div key={e.n} className="ec">
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
        <div><div className="en">{e.n}</div><div className="eb">{e.b}</div></div>
        <span className="tag tg">{e.lv}</span>
      </div>
      <div className="egrid">
        <div className="ei"><span className="lbl">Registration</span><span>{e.reg}</span></div>
        <div className="ei"><span className="lbl">Exam Date</span><span>{e.dt}</span></div>
        <div className="ei"><span className="lbl">Attempts</span><span>{e.att}</span></div>
        <div className="ei"><span className="lbl">Eligibility</span><span>{e.elig}</span></div>
        <div className="ei"><span className="lbl">Pattern</span><span>{e.pat}</span></div>
        <div className="ei"><span className="lbl">Seats / Scope</span><span>{e.seats}</span></div>
      </div>
      <div className="tip"><b>Pro Tip: </b>{e.tip}</div>
    </div>))}
  </div>);
}

function EnrollTab(){
  const steps=[
    {dt:"Start Now",t:"Gather Documents",b:"Aadhaar, Class 10 + 11 marksheets, passport photo (JPG < 200 KB), signature scan, category / PwD certificate if applicable. Keep scanned copies ready."},
    {dt:"Nov–Dec 2024",t:"JEE Main Session 1 Registration",b:"jeemain.nta.nic.in → New Registration → Fill form → Upload docs → Pay fee (₹1000 General / ₹800 OBC / ₹500 SC·ST·PwD) → Download Admit Card in Jan 2025."},
    {dt:"Jan–Apr 2025",t:"BITSAT, VITEEE & Other Private Exams",b:"Register simultaneously with JEE. BITSAT: bitsadmission.com | VITEEE: vit.ac.in | SRMJEE: srmist.edu.in. Keep different email IDs to manage communications separately."},
    {dt:"Feb–Mar 2025",t:"JEE Main Session 2 Registration",b:"Same portal, fresh application if you want to attempt Session 2. Your best of two scores is used for rank calculation. Fee same as Session 1."},
    {dt:"Jan–Mar 2025",t:"State Exam Registrations (MHTCET / WBJEE / KCET)",b:"Visit respective state CET cell official sites. Most require domicile proof. MHTCET: cetcell.mahacet.org | WBJEE: wbjeeb.nic.in | KCET: kea.kar.nic.in"},
    {dt:"Apr–May 2025",t:"JEE Advanced Registration",b:"jeeadv.ac.in → Login with JEE Main roll no → Only if you qualify in Top 2.5 L → Pay ₹3000 (Gen/OBC) or ₹1500 (SC/ST/PwD) → Admit Card in May."},
    {dt:"Jun–Jul 2025",t:"Counselling & Seat Acceptance",b:"JoSAA Counselling for IITs/NITs/IIITs — 6 rounds. CSAB for remaining NIT seats. State counselling for state colleges. Keep ₹40,000–60,000 ready for seat acceptance fee."},
  ];
  return(<div>
    <h2 className="sec-title">How to Enroll — Complete Roadmap</h2>
    <p className="sec-sub">Step-by-step registration timeline for the 2024–25 academic cycle. Never miss a deadline again.</p>
    <div className="tl">{steps.map(s=>(<div key={s.t} className="tli">
      <div className="tld"/>
      <div className="tldate">{s.dt}</div>
      <div className="tlt">{s.t}</div>
      <div className="tlb">{s.b}</div>
    </div>))}</div>
  </div>);
}

function AIUpdatesTab(){
  const [txt,setTxt]=useState("");const [load,setLoad]=useState(false);const [done,setDone]=useState(false);
  const go=useCallback(async()=>{
    setLoad(true);
    try{const r=await callClaude("You are a top educational counsellor for Indian engineering aspirants. Write 6 important and current updates specifically for Class XI PCM students in India preparing for JEE/BITSAT/engineering entrances in 2025. Cover: (1) latest NTA/exam policy changes, (2) best free study resources / apps right now, (3) critical upcoming registration deadlines, (4) in-demand engineering fields to target, (5) study schedule strategy for Class XI students, (6) one motivational insight backed by data. Use numbered sections with bold headings. Keep language crisp, practical, and encouraging. Assume today is May 2025.");setTxt(r);setDone(true);}
    catch(e){setTxt("Error fetching content. Please try again.");}
    setLoad(false);
  },[]);
  return(<div>
    <h2 className="sec-title">AI-Powered Updates for Class XI Students</h2>
    <p className="sec-sub">Powered by Claude — get the freshest engineering prep intelligence, personalised for 2025.</p>
    {!done&&!load&&<div style={{textAlign:"center",padding:"44px 20px"}}>
      <div style={{fontSize:"44px",marginBottom:"14px"}}>🤖</div>
      <div style={{fontSize:"14px",color:"rgba(226,226,240,.55)",marginBottom:"20px"}}>Click below to get AI-curated, current updates</div>
      <button className="btn" onClick={go}>Get Latest Updates →</button>
    </div>}
    {load&&<Loader/>}
    {done&&<><div className="ai-box"><div className="ai-txt">{txt}</div></div>
      <button className="btn btn-g" style={{marginTop:"14px"}} onClick={go}>Refresh →</button></>}
  </div>);
}

function SubjectTab({sub,chs}){
  const [ch,setCh]=useState("");const [txt,setTxt]=useState("");const [load,setLoad]=useState(false);
  const go=useCallback(async()=>{
    if(!ch)return;setLoad(true);setTxt("");
    try{const r=await callClaude(`You are an expert ${sub} teacher for Class XI CBSE and JEE/NEET students in India. For the chapter "${ch}", provide:
1. Chapter Overview (3 lines max)
2. Five most important questions from this chapter — mix of conceptual, numerical, and application types.
For each of the 5 questions:
Q: (write the question clearly)
Answer: (provide a complete, step-by-step model answer. Include key formulas highlighted. Mention marks weightage typical in JEE/board.)
Make the content immediately usable for exam preparation.`);setTxt(r);}
    catch(e){setTxt("Error. Please try again.");}
    setLoad(false);
  },[ch,sub]);
  return(<div>
    <h2 className="sec-title">{sub} — Chapter-wise Q & A</h2>
    <p className="sec-sub">Select a chapter to instantly generate the 5 most important questions with detailed model answers (JEE + Board ready).</p>
    <div className="row">
      <select value={ch} onChange={e=>{setCh(e.target.value);setTxt("");}}>
        <option value="">Select a chapter...</option>
        {chs.map(c=><option key={c} value={c}>{c}</option>)}
      </select>
      <button className="btn" disabled={!ch||load} onClick={go}>Generate Q & A →</button>
    </div>
    {load&&<Loader/>}
    {txt&&<div className="ai-box"><div className="ai-txt">{txt}</div></div>}
  </div>);
}

function CBSETab(){
  const [sub,setSub]=useState("Physics");const [ch,setCh]=useState("");const [txt,setTxt]=useState("");const [load,setLoad]=useState(false);
  const go=useCallback(async()=>{
    if(!ch)return;setLoad(true);setTxt("");
    try{const r=await callClaude(`You are a CBSE Class XI ${sub} expert examiner. For the chapter "${ch}", create a full CBSE Higher Secondary Board exam-style question paper section with:
- 2 Very Short Answer Questions (1 mark each)
- 2 Short Answer Type-I Questions (2 marks each)
- 2 Short Answer Type-II Questions (3 marks each)
- 2 Long Answer Questions (5 marks each)
- 1 Case-Based / Application Question (4 marks, with a paragraph scenario)
For every question provide a complete CBSE-style model answer with step-by-step working and mark allocation shown. Match exact CBSE board question paper style and difficulty.`);setTxt(r);}
    catch(e){setTxt("Error. Please try again.");}
    setLoad(false);
  },[sub,ch]);
  return(<div>
    <h2 className="sec-title">CBSE Higher Secondary Board Exam Prep</h2>
    <p className="sec-sub">Select subject and chapter to generate a full CBSE-style question set with mark-wise model answers.</p>
    <div className="row">
      <select value={sub} onChange={e=>{setSub(e.target.value);setCh("");setTxt("");}} style={{maxWidth:"200px"}}>
        {Object.keys(CBSE_MAP).map(s=><option key={s}>{s}</option>)}
      </select>
      <select value={ch} onChange={e=>{setCh(e.target.value);setTxt("");}}>
        <option value="">Select chapter...</option>
        {CBSE_MAP[sub].map(c=><option key={c} value={c}>{c}</option>)}
      </select>
      <button className="btn" disabled={!ch||load} onClick={go}>Generate Board Questions →</button>
    </div>
    {load&&<Loader/>}
    {txt&&<div className="ai-box"><div className="ai-txt">{txt}</div></div>}
  </div>);
}

function HostTab(){
  const hosts=[
    {i:"▲",n:"Vercel",t:"Free tier, instant deploy from GitHub, custom domain, HTTPS. Best option for modern React/HTML sites. CLI deploy in 30 seconds.",l:"vercel.com"},
    {i:"🌐",n:"Netlify",t:"Free hosting, 100 GB bandwidth/month, serverless functions, drag-and-drop deploy. Perfect starting point.",l:"netlify.com"},
    {i:"🐙",n:"GitHub Pages",t:"100 % free forever. Push HTML to a repo, enable Pages under Settings. Get yourname.github.io instantly.",l:"pages.github.com"},
    {i:"🔥",n:"Firebase Hosting",t:"Google's CDN-backed platform. Free SSL, 10 GB storage. Easy to add authentication or a database later.",l:"firebase.google.com"},
  ];
  const money=[
    {i:"💰",n:"Google AdSense",t:"Display ads. Educational sites earn ₹500–5000 / 10K visits. Apply once traffic is steady (3 months in)."},
    {i:"📚",n:"Affiliate Marketing",t:"Link to Unacademy, BYJU's, Vedantu, Amazon books. Earn 3–8 % per sale. Best passive income for edu sites."},
    {i:"🎓",n:"Premium Membership",t:"Charge ₹99–499 / month for unlimited AI Q&A, downloadable PDFs, and mock tests. Use Razorpay."},
    {i:"🤝",n:"Coaching Institute Partnerships",t:"Local institutes pay ₹5K–50K / month for referrals or placement of their banners / sponsored articles."},
    {i:"📝",n:"Sponsored Content",t:"Edtech brands pay ₹5K–50K per sponsored review / article. Build domain authority first (6–12 months)."},
    {i:"📊",n:"Paid Mock Tests",t:"Sell JEE/BITSAT mock tests at ₹29–99 each. 500 monthly buyers = ₹15K–50K passive income."},
  ];
  return(<div>
    <h2 className="sec-title">Host Your Site & Start Earning</h2>
    <p className="sec-sub">Full playbook — from zero to a live website to a revenue-generating edtech platform.</p>
    <div style={{marginBottom:"26px"}}>
      <div style={{fontSize:"15px",fontWeight:"600",color:"#FFF",marginBottom:"13px",fontFamily:"Syne"}}>🚀 Free Hosting Platforms</div>
      <div className="hg">{hosts.map(h=>(<div key={h.n} className="hc">
        <div style={{fontSize:"20px",marginBottom:"8px"}}>{h.i}</div>
        <div className="ht">{h.n}</div>
        <div className="hs">{h.t}</div>
        <div style={{marginTop:"10px",fontSize:"11px",color:"#FF9240"}}>→ {h.l}</div>
      </div>))}</div>
    </div>
    <div style={{background:"rgba(255,107,0,.06)",border:"1px solid rgba(255,107,0,.2)",borderRadius:"12px",padding:"18px",marginBottom:"26px"}}>
      <div style={{fontSize:"13.5px",fontWeight:"600",color:"#FF9240",marginBottom:"10px"}}>📋 5-Minute Launch Checklist</div>
      <div style={{fontSize:"12.5px",color:"rgba(226,226,240,.75)",lineHeight:"2.1"}}>
        1. Download this HTML / JSX file from Claude &nbsp;→&nbsp; 2. Create a free GitHub account &nbsp;→&nbsp; 3. New repo → upload file &nbsp;→&nbsp; 4. Settings → Pages → Deploy from main → your site is live at <b style={{color:"#FFF"}}>yourname.github.io</b><br/>
        5. Register <b style={{color:"#FFF"}}>.in domain</b> at GoDaddy / Namecheap (~₹800/year) &nbsp;→&nbsp; 6. Connect to Vercel for CDN + speed &nbsp;→&nbsp; 7. Add your Anthropic API key in the fetch call for self-hosted AI features
      </div>
    </div>
    <div>
      <div style={{fontSize:"15px",fontWeight:"600",color:"#FFF",marginBottom:"13px",fontFamily:"Syne"}}>💸 Monetization Strategies</div>
      <div className="hg">{money.map(m=>(<div key={m.n} className="hc">
        <div style={{fontSize:"20px",marginBottom:"8px"}}>{m.i}</div>
        <div className="ht">{m.n}</div>
        <div className="hs">{m.t}</div>
      </div>))}</div>
    </div>
    <div className="rev">
      <div style={{fontSize:"13.5px",fontWeight:"600",color:"#FF9240",marginBottom:"9px"}}>📈 Realistic Revenue Projection</div>
      <div style={{fontSize:"12px",color:"rgba(226,226,240,.72)",lineHeight:"2"}}>
        <b style={{color:"#FFF"}}>Months 1–3:</b> Build SEO content, share in JEE WhatsApp groups & r/JEE. Target 500–2,000 visitors/month.<br/>
        <b style={{color:"#FFF"}}>Months 3–6:</b> Apply for AdSense + 2 affiliate programs. Expected: ₹2,000–8,000/month.<br/>
        <b style={{color:"#FFF"}}>Months 6–12:</b> Launch ₹199/month premium plan + mock tests. Expected: ₹15,000–50,000/month.<br/>
        <b style={{color:"#FFF"}}>Year 2+:</b> Coaching partnerships + YouTube channel. ₹1–5 LPA realistically achievable.
      </div>
    </div>
  </div>);
}

const TABS=[
  {id:"prog",lbl:"🎓 Top Programs"},
  {id:"exam",lbl:"📝 Entrance Exams"},
  {id:"enrl",lbl:"📅 How to Enroll"},
  {id:"ai",lbl:"🤖 AI Updates"},
  {id:"phy",lbl:"⚛️ Physics"},
  {id:"chem",lbl:"🧪 Chemistry"},
  {id:"math",lbl:"∑ Mathematics"},
  {id:"cbse",lbl:"📚 CBSE Board"},
  {id:"host",lbl:"🚀 Host & Earn"},
];

export default function App(){
  const [active,setActive]=useState("prog");
  return(<div>
    <style>{css}</style>
    <div className="hdr">
      <div>
        <div className="logo">INGENIA</div>
        <div className="tgl">India's Engineering Intelligence Hub</div>
      </div>
      <span className="pill">Class XI · JEE · BITSAT · CBSE</span>
    </div>
    <div className="tabbar">{TABS.map(t=>(
      <button key={t.id} className={`tb${active===t.id?" on":""}`} onClick={()=>setActive(t.id)}>{t.lbl}</button>
    ))}</div>
    <div className="page">
      {active==="prog"&&<ProgramsTab/>}
      {active==="exam"&&<ExamsTab/>}
      {active==="enrl"&&<EnrollTab/>}
      {active==="ai"&&<AIUpdatesTab/>}
      {active==="phy"&&<SubjectTab sub="Physics" chs={PHY_CHAPTERS}/>}
      {active==="chem"&&<SubjectTab sub="Chemistry" chs={CHEM_CHAPTERS}/>}
      {active==="math"&&<SubjectTab sub="Mathematics" chs={MATH_CHAPTERS}/>}
      {active==="cbse"&&<CBSETab/>}
      {active==="host"&&<HostTab/>}
    </div>
  </div>);
}
