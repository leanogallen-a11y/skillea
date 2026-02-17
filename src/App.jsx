import { useState, useEffect, useRef } from "react";

// ============================================================
// GLOBAL STYLES
// ============================================================
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #0a0a0f;
      --surface: #13131a;
      --surface2: #1c1c28;
      --border: rgba(255,255,255,0.08);
      --accent: #7c6dfa;
      --accent2: #fa6d8a;
      --accent3: #6dfacd;
      --text: #f0f0f8;
      --muted: #7070a0;
      --card-bg: rgba(255,255,255,0.03);
      --radius: 16px;
      --radius-sm: 10px;
    }

    body { background: var(--bg); color: var(--text); font-family: 'DM Sans', sans-serif; min-height: 100vh; }

    h1, h2, h3, h4 { font-family: 'Syne', sans-serif; }

    ::-webkit-scrollbar { width: 6px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--accent); border-radius: 3px; }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(24px); }
      to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }
    @keyframes spin {
      to { transform: rotate(360deg); }
    }
    @keyframes floatOrb {
      0%, 100% { transform: translateY(0px) scale(1); }
      50% { transform: translateY(-30px) scale(1.05); }
    }

    .fade-up { animation: fadeUp 0.5s ease forwards; }
    .fade-up-d1 { animation: fadeUp 0.5s 0.1s ease both; }
    .fade-up-d2 { animation: fadeUp 0.5s 0.2s ease both; }
    .fade-up-d3 { animation: fadeUp 0.5s 0.3s ease both; }
    .fade-up-d4 { animation: fadeUp 0.5s 0.4s ease both; }

    input, textarea, select {
      background: var(--surface2);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--text);
      font-family: 'DM Sans', sans-serif;
      font-size: 14px;
      padding: 12px 16px;
      outline: none;
      transition: border-color 0.2s;
      width: 100%;
    }
    input:focus, textarea:focus {
      border-color: var(--accent);
    }
    input::placeholder, textarea::placeholder { color: var(--muted); }

    button { cursor: pointer; font-family: 'Syne', sans-serif; border: none; transition: all 0.2s; }

    .btn-primary {
      background: var(--accent);
      color: white;
      padding: 12px 24px;
      border-radius: var(--radius-sm);
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.02em;
    }
    .btn-primary:hover { background: #9483ff; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(124,109,250,0.4); }

    .btn-ghost {
      background: transparent;
      color: var(--text);
      padding: 12px 24px;
      border-radius: var(--radius-sm);
      font-weight: 500;
      font-size: 14px;
      border: 1px solid var(--border);
    }
    .btn-ghost:hover { background: var(--surface2); border-color: var(--accent); }

    .card {
      background: var(--card-bg);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      backdrop-filter: blur(12px);
    }

    .badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 12px;
      font-weight: 500;
      font-family: 'DM Sans', sans-serif;
    }

    .star { color: #fbbf24; }
  `}</style>
);

// ============================================================
// MOCK DATA
// ============================================================
const MOCK_USERS = [
  {
    id: 1, name: "Sophie Martin", city: "Paris", avatar: "SM",
    avatarColor: "#7c6dfa",
    bio: "Designer UX/UI passionnée et professeure de yoga. J'adore partager mes connaissances !",
    offering: ["Design UX/UI", "Figma", "Yoga", "Méditation"],
    seeking: ["Développement Web", "Python", "Photographie"],
    points: 12, rating: 4.9, reviews: 23, exchanges: 18
  },
  {
    id: 2, name: "Thomas Dupont", city: "Lyon", avatar: "TD",
    avatarColor: "#6dfacd",
    bio: "Dev full-stack, guitariste le weekend. Toujours partant pour apprendre quelque chose de nouveau.",
    offering: ["JavaScript", "React", "Node.js", "Guitare"],
    seeking: ["Design", "Marketing", "Cuisine"],
    points: 8, rating: 4.7, reviews: 14, exchanges: 11
  },
  {
    id: 3, name: "Amélie Rousseau", city: "Bordeaux", avatar: "AR",
    avatarColor: "#fa6d8a",
    bio: "Chef cuisinière et photographe amateur. La nourriture est mon art !",
    offering: ["Cuisine française", "Pâtisserie", "Photographie culinaire"],
    seeking: ["Yoga", "Développement Web", "Langues"],
    points: 15, rating: 5.0, reviews: 31, exchanges: 24
  },
  {
    id: 4, name: "Lucas Bernard", city: "Marseille", avatar: "LB",
    avatarColor: "#fbbf24",
    bio: "Professeur de langues et musicien. Parle 5 langues couramment.",
    offering: ["Anglais", "Espagnol", "Piano", "Composition"],
    seeking: ["Programmation", "Design Graphique", "Comptabilité"],
    points: 20, rating: 4.8, reviews: 42, exchanges: 35
  },
  {
    id: 5, name: "Camille Petit", city: "Paris", avatar: "CP",
    avatarColor: "#34d399",
    bio: "Experte en marketing digital et content creator. J'aide les créateurs à trouver leur audience.",
    offering: ["Marketing Digital", "SEO", "Rédaction Web", "Social Media"],
    seeking: ["Comptabilité", "Juridique", "Yoga"],
    points: 6, rating: 4.6, reviews: 9, exchanges: 7
  },
  {
    id: 6, name: "Antoine Moreau", city: "Nantes", avatar: "AM",
    avatarColor: "#f472b6",
    bio: "Comptable et passionné de jardinage. Je peux vous aider avec vos finances !",
    offering: ["Comptabilité", "Fiscalité", "Jardinage", "Permaculture"],
    seeking: ["Marketing", "Design", "Langues"],
    points: 11, rating: 4.9, reviews: 19, exchanges: 15
  }
];

const MOCK_MESSAGES = {
  2: [
    { from: "them", text: "Salut ! J'ai vu que tu proposais du design UX. Je serais super intéressé par un échange contre des cours de React !", time: "10:32" },
    { from: "me", text: "Hey Thomas ! Ça m'intéresse vraiment. Tu es disponible la semaine prochaine ?", time: "10:45" },
    { from: "them", text: "Parfait ! Mercredi soir ça te va ? On peut commencer par 1h chacun.", time: "11:02" },
    { from: "me", text: "C'est noté ! Je t'envoie mes disponibilités demain 🎉", time: "11:15" },
  ],
  3: [
    { from: "them", text: "Bonjour ! Votre profil est magnifique. Échange cuisine vs yoga ?", time: "Hier" },
    { from: "me", text: "Bonjour Amélie ! Avec plaisir, j'adorerais apprendre la pâtisserie !", time: "Hier" },
  ]
};

const SKILLS_LIST = [
  "Design UX/UI", "Développement Web", "JavaScript", "React", "Python", "Node.js",
  "Marketing Digital", "SEO", "Photographie", "Vidéo", "Musique", "Guitare", "Piano",
  "Cuisine", "Pâtisserie", "Yoga", "Sport", "Langues", "Anglais", "Espagnol",
  "Comptabilité", "Juridique", "Jardinage", "Coaching"
];

// Catégories communautaires initiales
const INITIAL_CATEGORIES = [
  {
    id: 1, name: "Design & Créativité", icon: "🎨",
    description: "UX/UI, illustration, graphisme, Figma, Photoshop et tout ce qui touche au design visuel.",
    color: "#7c6dfa", memberIds: [1, 5], tags: ["Design UX/UI", "Figma", "Illustration"],
    createdBy: "Sophie Martin", createdAt: "Jan 2025"
  },
  {
    id: 2, name: "Dev & Tech", icon: "💻",
    description: "Programmation, développement web, mobile, DevOps, bases de données...",
    color: "#6dfacd", memberIds: [2, 1], tags: ["JavaScript", "React", "Python", "Node.js"],
    createdBy: "Thomas Dupont", createdAt: "Jan 2025"
  },
  {
    id: 3, name: "Cuisine & Gastronomie", icon: "🍳",
    description: "Recettes, techniques culinaires, pâtisserie, cuisine du monde...",
    color: "#fa6d8a", memberIds: [3], tags: ["Cuisine", "Pâtisserie", "Cuisine du monde"],
    createdBy: "Amélie Rousseau", createdAt: "Fév 2025"
  },
  {
    id: 4, name: "Langues & Communication", icon: "🌍",
    description: "Apprentissage de langues, traduction, prise de parole, rédaction...",
    color: "#fbbf24", memberIds: [4, 2], tags: ["Anglais", "Espagnol", "Traduction"],
    createdBy: "Lucas Bernard", createdAt: "Fév 2025"
  },
  {
    id: 5, name: "Marketing & Business", icon: "📈",
    description: "Marketing digital, SEO, réseaux sociaux, stratégie d'entreprise...",
    color: "#34d399", memberIds: [5, 6], tags: ["Marketing Digital", "SEO", "Social Media"],
    createdBy: "Camille Petit", createdAt: "Mar 2025"
  },
  {
    id: 6, name: "Bien-être & Sport", icon: "🧘",
    description: "Yoga, méditation, coaching sportif, nutrition, mindfulness...",
    color: "#f472b6", memberIds: [1, 3], tags: ["Yoga", "Sport", "Méditation"],
    createdBy: "Sophie Martin", createdAt: "Mar 2025"
  },
  {
    id: 7, name: "Finance & Juridique", icon: "📊",
    description: "Comptabilité, fiscalité, droit, gestion de patrimoine...",
    color: "#60a5fa", memberIds: [6], tags: ["Comptabilité", "Fiscalité", "Droit"],
    createdBy: "Antoine Moreau", createdAt: "Avr 2025"
  },
  {
    id: 8, name: "Musique & Arts", icon: "🎵",
    description: "Guitare, piano, chant, composition, production musicale...",
    color: "#a78bfa", memberIds: [4], tags: ["Guitare", "Piano", "Composition"],
    createdBy: "Lucas Bernard", createdAt: "Avr 2025"
  },
];

// ============================================================
// COMPONENTS
// ============================================================

const Avatar = ({ user, size = 44 }) => (
  <div style={{
    width: size, height: size, borderRadius: "50%",
    background: `${user.avatarColor}20`,
    border: `2px solid ${user.avatarColor}`,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: size * 0.35, fontWeight: 700, color: user.avatarColor,
    fontFamily: "Syne, sans-serif", flexShrink: 0
  }}>
    {user.avatar}
  </div>
);

const Stars = ({ rating }) => {
  const full = Math.floor(rating);
  return (
    <span>
      {[1,2,3,4,5].map(i => (
        <span key={i} className="star" style={{ opacity: i <= full ? 1 : 0.3 }}>★</span>
      ))}
      <span style={{ marginLeft: 6, fontSize: 13, color: "var(--muted)" }}>{rating}</span>
    </span>
  );
};

const SkillBadge = ({ skill, color = "accent" }) => {
  const colors = {
    accent: { bg: "rgba(124,109,250,0.15)", text: "#9d8fff", border: "rgba(124,109,250,0.3)" },
    green: { bg: "rgba(109,250,205,0.12)", text: "#6dfacd", border: "rgba(109,250,205,0.25)" },
    pink: { bg: "rgba(250,109,138,0.12)", text: "#fa8d9a", border: "rgba(250,109,138,0.25)" },
  };
  const c = colors[color] || colors.accent;
  return (
    <span className="badge" style={{ background: c.bg, color: c.text, border: `1px solid ${c.border}` }}>
      {skill}
    </span>
  );
};

const OrbBackground = () => (
  <div style={{ position: "fixed", inset: 0, overflow: "hidden", pointerEvents: "none", zIndex: 0 }}>
    <div style={{
      position: "absolute", width: 600, height: 600,
      borderRadius: "50%", top: -200, right: -100,
      background: "radial-gradient(circle, rgba(124,109,250,0.12) 0%, transparent 70%)",
      animation: "floatOrb 8s ease-in-out infinite"
    }} />
    <div style={{
      position: "absolute", width: 400, height: 400,
      borderRadius: "50%", bottom: 100, left: -100,
      background: "radial-gradient(circle, rgba(250,109,138,0.08) 0%, transparent 70%)",
      animation: "floatOrb 10s ease-in-out infinite reverse"
    }} />
    <div style={{
      position: "absolute", width: 300, height: 300,
      borderRadius: "50%", top: "50%", left: "60%",
      background: "radial-gradient(circle, rgba(109,250,205,0.06) 0%, transparent 70%)",
      animation: "floatOrb 12s ease-in-out infinite 2s"
    }} />
  </div>
);

// ============================================================
// PAGES
// ============================================================

// --- LANDING PAGE ---
const LandingPage = ({ onNavigate }) => {
  const features = [
    { icon: "⏱️", title: "Système de temps", desc: "1h donnée = 1h reçue. Une monnaie juste et universelle basée sur votre temps." },
    { icon: "🔍", title: "Recherche intelligente", desc: "Trouvez des partenaires par compétence ou ville en quelques secondes." },
    { icon: "⭐", title: "Avis & confiance", desc: "Système de notation communautaire pour des échanges en toute sérénité." },
    { icon: "💬", title: "Messagerie intégrée", desc: "Organisez vos échanges directement sur la plateforme." },
  ];

  const stats = [
    { value: "12 400+", label: "Membres actifs" },
    { value: "34 000+", label: "Heures échangées" },
    { value: "180+", label: "Villes en France" },
    { value: "4.8★", label: "Note moyenne" },
  ];

  return (
    <div style={{ position: "relative", zIndex: 1 }}>
      {/* HERO */}
      <section style={{ padding: "120px 24px 80px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <div className="fade-up" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 16px", borderRadius: 100, background: "rgba(124,109,250,0.15)", border: "1px solid rgba(124,109,250,0.3)", marginBottom: 32 }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#6dfacd", animation: "pulse 2s infinite" }}></span>
          <span style={{ fontSize: 13, color: "#9d8fff", fontFamily: "DM Sans" }}>Plateforme d'échange communautaire</span>
        </div>
        <h1 className="fade-up-d1" style={{ fontSize: "clamp(40px, 7vw, 80px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 24, letterSpacing: "-0.03em" }}>
          Échangez vos<br />
          <span style={{ background: "linear-gradient(135deg, #7c6dfa, #fa6d8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            compétences
          </span>
          {" "}sans argent
        </h1>
        <p className="fade-up-d2" style={{ fontSize: 20, color: "var(--muted)", maxWidth: 560, margin: "0 auto 48px", lineHeight: 1.6 }}>
          Skilléa connecte les personnes qui veulent partager leur savoir. Apprenez, enseignez, grandissez — ensemble.
        </p>
        <div className="fade-up-d3" style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary" style={{ fontSize: 16, padding: "16px 36px" }} onClick={() => onNavigate("register")}>
            Commencer gratuitement →
          </button>
          <button className="btn-ghost" style={{ fontSize: 16, padding: "16px 36px" }} onClick={() => onNavigate("explore")}>
            Explorer les profils
          </button>
        </div>
      </section>

      {/* STATS */}
      <section style={{ padding: "40px 24px", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 32, textAlign: "center" }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{ fontSize: 36, fontWeight: 800, fontFamily: "Syne", background: "linear-gradient(135deg, #7c6dfa, #fa6d8a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>{s.value}</div>
              <div style={{ color: "var(--muted)", fontSize: 14, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section style={{ padding: "100px 24px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 60, textAlign: "center" }}>
          Comment ça marche ?
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 24 }}>
          {["Créez votre profil", "Listez vos compétences", "Trouvez un partenaire", "Échangez & apprenez"].map((step, i) => (
            <div key={i} className="card" style={{ padding: 28, textAlign: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: "50%", background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 800, fontFamily: "Syne", margin: "0 auto 16px" }}>
                {i + 1}
              </div>
              <div style={{ fontWeight: 600, fontSize: 16, fontFamily: "Syne" }}>{step}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "60px 24px 100px", maxWidth: 900, margin: "0 auto" }}>
        <h2 style={{ fontSize: 40, fontWeight: 800, marginBottom: 60, textAlign: "center" }}>Tout ce qu'il vous faut</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {features.map((f, i) => (
            <div key={i} className="card" style={{ padding: 28 }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{f.icon}</div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{f.title}</h3>
              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 24px", textAlign: "center", margin: "0 24px 80px", borderRadius: 24, background: "linear-gradient(135deg, rgba(124,109,250,0.15), rgba(250,109,138,0.1))", border: "1px solid rgba(124,109,250,0.2)", maxWidth: 860, marginInline: "auto" }}>
        <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 16 }}>Prêt à échanger votre premier savoir ?</h2>
        <p style={{ color: "var(--muted)", marginBottom: 32, fontSize: 16 }}>Rejoignez 12 400 membres qui apprennent et enseignent chaque jour.</p>
        <button className="btn-primary" style={{ fontSize: 16, padding: "16px 40px" }} onClick={() => onNavigate("register")}>
          Rejoindre la communauté →
        </button>
      </section>
    </div>
  );
};

// --- AUTH PAGE ---
const AuthPage = ({ mode, onNavigate, onLogin }) => {
  const [tab, setTab] = useState(mode || "login");
  const [form, setForm] = useState({ name: "", email: "", password: "", city: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLogin({ id: 99, name: form.name || "Sophie Martin", avatar: "SM", avatarColor: "#7c6dfa", city: form.city || "Paris", points: 12, bio: "Nouvelle sur Skilléa !", offering: [], seeking: [], rating: 5.0, reviews: 0, exchanges: 0 });
    }, 1200);
  };

  return (
    <div style={{ minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div className="card fade-up" style={{ width: "100%", maxWidth: 420, padding: 40 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>🔁</div>
          <h2 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>
            {tab === "login" ? "Bon retour !" : "Rejoindre Skilléa"}
          </h2>
          <p style={{ color: "var(--muted)", fontSize: 14 }}>
            {tab === "login" ? "Connectez-vous à votre compte" : "Créez votre compte gratuit"}
          </p>
        </div>

        {/* Tab switch */}
        <div style={{ display: "flex", background: "var(--surface2)", borderRadius: 10, padding: 4, marginBottom: 28 }}>
          {["login", "register"].map(t => (
            <button key={t} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px", borderRadius: 8, fontSize: 14,
              fontFamily: "Syne, sans-serif", fontWeight: 600,
              background: tab === t ? "var(--accent)" : "transparent",
              color: tab === t ? "white" : "var(--muted)"
            }}>
              {t === "login" ? "Connexion" : "Inscription"}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tab === "register" && (
            <input placeholder="Votre prénom et nom" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          )}
          <input placeholder="Email" type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
          <input placeholder="Mot de passe" type="password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} />
          {tab === "register" && (
            <input placeholder="Votre ville" value={form.city} onChange={e => setForm({...form, city: e.target.value})} />
          )}
          <button className="btn-primary" style={{ width: "100%", padding: "14px", marginTop: 8, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }} onClick={handleSubmit}>
            {loading ? <span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTop: "2px solid white", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} /> : null}
            {tab === "login" ? "Se connecter" : "Créer mon compte"}
          </button>
        </div>

        {tab === "login" && (
          <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--muted)" }}>
            Pas encore membre ?{" "}
            <span style={{ color: "var(--accent)", cursor: "pointer", fontWeight: 600 }} onClick={() => setTab("register")}>
              S'inscrire
            </span>
          </p>
        )}
      </div>
    </div>
  );
};

// --- MODAL CRÉER CATÉGORIE ---
const CreateCategoryModal = ({ onClose, onCreate }) => {
  const [form, setForm] = useState({ name: "", description: "", icon: "📚", tags: "" });
  const icons = ["📚","🎨","💻","🍳","🌍","📈","🧘","🎵","🏡","📷","🔬","✍️","🎭","🏋️","🌱"];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
      onClick={onClose}>
      <div className="card fade-up" style={{ width: "100%", maxWidth: 480, padding: 32 }} onClick={e => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 800 }}>Créer une catégorie</h2>
          <button onClick={onClose} style={{ background: "var(--surface2)", borderRadius: 8, padding: "6px 10px", color: "var(--muted)", fontSize: 18 }}>×</button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>ICÔNE</label>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {icons.map(ic => (
                <button key={ic} onClick={() => setForm({...form, icon: ic})} style={{
                  width: 40, height: 40, borderRadius: 10, fontSize: 20,
                  background: form.icon === ic ? "var(--accent)" : "var(--surface2)",
                  border: form.icon === ic ? "2px solid var(--accent)" : "1px solid var(--border)"
                }}>{ic}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>NOM DE LA CATÉGORIE *</label>
            <input placeholder="Ex: Photographie & Vidéo" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>DESCRIPTION</label>
            <textarea placeholder="Décrivez le type de compétences échangées..." rows={3} value={form.description} onChange={e => setForm({...form, description: e.target.value})} style={{ resize: "vertical" }} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "var(--muted)", fontWeight: 600, display: "block", marginBottom: 6 }}>TAGS (séparés par des virgules)</label>
            <input placeholder="Ex: Photo, Vidéo, Lightroom, Premiere" value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} />
          </div>
          <button className="btn-primary" style={{ width: "100%", padding: 14, marginTop: 4 }}
            onClick={() => { if (form.name.trim()) { onCreate(form); onClose(); } }}>
            ✨ Créer la catégorie
          </button>
        </div>
      </div>
    </div>
  );
};

// --- CATEGORY DETAIL VIEW ---
const CategoryDetail = ({ category, onBack, onMessage, onNavigate, joinedIds, onJoin }) => {
  const members = MOCK_USERS.filter(u => category.memberIds.includes(u.id));
  const joined = joinedIds.includes(category.id);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <button onClick={onBack} style={{ background: "none", color: "var(--muted)", fontSize: 14, marginBottom: 24, display: "flex", alignItems: "center", gap: 6 }}>
        ← Retour aux catégories
      </button>

      {/* Header catégorie */}
      <div className="card fade-up" style={{ padding: 32, marginBottom: 28, borderColor: `${category.color}33`, background: `${category.color}08` }}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
          <div style={{ width: 72, height: 72, borderRadius: 20, background: `${category.color}20`, border: `2px solid ${category.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, flexShrink: 0 }}>
            {category.icon}
          </div>
          <div style={{ flex: 1, minWidth: 200 }}>
            <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 8 }}>{category.name}</h1>
            <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.6, marginBottom: 14 }}>{category.description}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {category.tags.map(t => (
                <span key={t} className="badge" style={{ background: `${category.color}15`, color: category.color, border: `1px solid ${category.color}30` }}>{t}</span>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "flex-end", flexShrink: 0 }}>
            <div style={{ display: "flex", gap: 16, fontSize: 14 }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: 24, fontWeight: 800, fontFamily: "Syne", color: category.color }}>{category.memberIds.length}</div>
                <div style={{ color: "var(--muted)", fontSize: 12 }}>membres</div>
              </div>
            </div>
            <button onClick={() => onJoin(category.id)}
              style={{
                padding: "10px 24px", borderRadius: 10, fontSize: 14, fontWeight: 600, fontFamily: "Syne",
                background: joined ? "var(--surface2)" : category.color,
                color: joined ? "var(--muted)" : "white",
                border: joined ? "1px solid var(--border)" : "none",
                cursor: "pointer", transition: "all 0.2s"
              }}>
              {joined ? "✓ Membre" : "+ Rejoindre"}
            </button>
          </div>
        </div>
        <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--border)", fontSize: 13, color: "var(--muted)" }}>
          Créée par <strong style={{ color: "var(--text)" }}>{category.createdBy}</strong> · {category.createdAt}
        </div>
      </div>

      {/* Membres */}
      <h2 className="fade-up-d1" style={{ fontSize: 22, fontWeight: 800, marginBottom: 20 }}>
        Membres ({members.length})
      </h2>
      <div className="fade-up-d2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 }}>
        {members.map(user => (
          <div key={user.id} className="card" style={{ padding: 20, transition: "transform 0.2s, border-color 0.2s", cursor: "pointer" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = `${category.color}50`; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.borderColor = "var(--border)"; }}
            onClick={() => onNavigate("profile", user)}>
            <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
              <Avatar user={user} size={46} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{user.name}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>📍 {user.city}</div>
                <Stars rating={user.rating} />
              </div>
              <div style={{ background: "rgba(124,109,250,0.12)", color: "#9d8fff", borderRadius: 8, padding: "3px 9px", fontSize: 12, fontWeight: 600, height: "fit-content" }}>
                ⏱ {user.points}h
              </div>
            </div>
            <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.5, marginBottom: 12, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
              {user.bio}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5, marginBottom: 12 }}>
              {user.offering.slice(0, 3).map(s => <SkillBadge key={s} skill={s} color="accent" />)}
            </div>
            <button className="btn-primary" style={{ width: "100%", padding: "9px", fontSize: 13 }}
              onClick={e => { e.stopPropagation(); onMessage(user); }}>
              💬 Contacter
            </button>
          </div>
        ))}
        {members.length === 0 && (
          <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "60px 24px", color: "var(--muted)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>👋</div>
            <p>Soyez le premier à rejoindre cette catégorie !</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- EXPLORE PAGE (CATEGORIES) ---
const ExplorePage = ({ onNavigate, onMessage }) => {
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState(INITIAL_CATEGORIES);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [joinedIds, setJoinedIds] = useState([2]); // simuler déjà membre de "Dev & Tech"

  const filtered = categories.filter(c =>
    !search || c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.tags.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
    c.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreate = (form) => {
    const newCat = {
      id: Date.now(), name: form.name, icon: form.icon,
      description: form.description || "Nouvelle catégorie communautaire.",
      color: ["#7c6dfa","#fa6d8a","#6dfacd","#fbbf24","#f472b6","#60a5fa"][Math.floor(Math.random()*6)],
      tags: form.tags ? form.tags.split(",").map(t => t.trim()).filter(Boolean) : [],
      memberIds: [], createdBy: "Vous", createdAt: "Maintenant"
    };
    setCategories(prev => [newCat, ...prev]);
  };

  const handleJoin = (catId) => {
    setJoinedIds(prev => prev.includes(catId) ? prev.filter(id => id !== catId) : [...prev, catId]);
    setCategories(prev => prev.map(c => {
      if (c.id !== catId) return c;
      const isMember = c.memberIds.includes(99);
      return { ...c, memberIds: isMember ? c.memberIds.filter(id => id !== 99) : [...c.memberIds, 99] };
    }));
  };

  if (selectedCategory) {
    return <CategoryDetail
      category={selectedCategory}
      onBack={() => setSelectedCategory(null)}
      onMessage={onMessage}
      onNavigate={onNavigate}
      joinedIds={joinedIds}
      onJoin={handleJoin}
    />;
  }

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
      {showModal && <CreateCategoryModal onClose={() => setShowModal(false)} onCreate={handleCreate} />}

      {/* Header */}
      <div className="fade-up" style={{ display: "flex", gap: 16, justifyContent: "space-between", alignItems: "flex-end", marginBottom: 36, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>Catégories</h1>
          <p style={{ color: "var(--muted)" }}>Des espaces thématiques créés par la communauté. Rejoignez ceux qui vous intéressent.</p>
        </div>
        <button className="btn-primary" style={{ padding: "12px 24px", flexShrink: 0 }} onClick={() => setShowModal(true)}>
          + Créer une catégorie
        </button>
      </div>

      {/* Search */}
      <div className="fade-up-d1" style={{ position: "relative", maxWidth: 480, marginBottom: 36 }}>
        <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}>🔍</span>
        <input placeholder="Rechercher une catégorie, un tag..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 42 }} />
      </div>

      {/* Mes catégories */}
      {joinedIds.length > 0 && !search && (
        <div className="fade-up-d1" style={{ marginBottom: 40 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 16, color: "var(--muted)", letterSpacing: "0.05em", fontSize: 13 }}>MES CATÉGORIES</h2>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            {categories.filter(c => joinedIds.includes(c.id)).map(c => (
              <button key={c.id} onClick={() => setSelectedCategory(c)} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 18px",
                borderRadius: 12, background: `${c.color}15`, border: `1px solid ${c.color}40`,
                color: "var(--text)", fontFamily: "DM Sans", fontSize: 14, fontWeight: 500, cursor: "pointer",
                transition: "all 0.2s"
              }}>
                <span>{c.icon}</span> {c.name}
                <span style={{ background: `${c.color}30`, color: c.color, borderRadius: 6, padding: "1px 7px", fontSize: 12, fontWeight: 700 }}>{c.memberIds.length}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Toutes les catégories */}
      <div style={{ marginBottom: 14 }}>
        <span style={{ fontSize: 13, color: "var(--muted)", letterSpacing: "0.05em", fontWeight: 600 }}>
          {search ? `RÉSULTATS (${filtered.length})` : "TOUTES LES CATÉGORIES"}
        </span>
      </div>

      <div className="fade-up-d2" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
        {filtered.map(cat => {
          const isJoined = joinedIds.includes(cat.id);
          return (
            <div key={cat.id} className="card" style={{
              padding: 24, cursor: "pointer", transition: "transform 0.2s, border-color 0.2s",
              borderTop: `3px solid ${cat.color}`
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${cat.color}20`; }}
              onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}
              onClick={() => setSelectedCategory(cat)}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 14, marginBottom: 14 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: `${cat.color}18`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, flexShrink: 0 }}>
                  {cat.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 17, fontFamily: "Syne", marginBottom: 4 }}>{cat.name}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>par {cat.createdBy} · {cat.createdAt}</div>
                </div>
              </div>

              <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.6, marginBottom: 14, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                {cat.description}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {cat.tags.slice(0, 3).map(t => (
                  <span key={t} className="badge" style={{ background: `${cat.color}12`, color: cat.color, border: `1px solid ${cat.color}25`, fontSize: 11 }}>{t}</span>
                ))}
              </div>

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ fontSize: 13, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
                  <span>👥</span>
                  <span style={{ fontWeight: 600, color: "var(--text)" }}>{cat.memberIds.length}</span> membre{cat.memberIds.length > 1 ? "s" : ""}
                </div>
                <button onClick={e => { e.stopPropagation(); handleJoin(cat.id); }} style={{
                  padding: "7px 16px", borderRadius: 8, fontSize: 13, fontWeight: 600, fontFamily: "Syne",
                  background: isJoined ? "var(--surface2)" : cat.color,
                  color: isJoined ? "var(--muted)" : "white",
                  border: isJoined ? "1px solid var(--border)" : "none", cursor: "pointer",
                  transition: "all 0.2s"
                }}>
                  {isJoined ? "✓ Membre" : "+ Rejoindre"}
                </button>
              </div>
            </div>
          );
        })}

        {/* Card créer */}
        {!search && (
          <div onClick={() => setShowModal(true)} className="card" style={{
            padding: 24, cursor: "pointer", border: "2px dashed var(--border)",
            display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
            textAlign: "center", gap: 12, minHeight: 200,
            transition: "border-color 0.2s, background 0.2s",
            background: "transparent"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.background = "rgba(124,109,250,0.05)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.background = "transparent"; }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>✨</div>
            <div>
              <div style={{ fontWeight: 700, fontFamily: "Syne", marginBottom: 4 }}>Créer une catégorie</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>Votre domaine n'existe pas encore ?</div>
            </div>
          </div>
        )}
      </div>

      {filtered.length === 0 && search && (
        <div style={{ textAlign: "center", padding: "80px 24px", color: "var(--muted)" }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
          <p style={{ marginBottom: 20 }}>Aucune catégorie trouvée pour "{search}".</p>
          <button className="btn-primary" onClick={() => setShowModal(true)}>Créer cette catégorie</button>
        </div>
      )}
    </div>
  );
};

// --- PROFILE PAGE ---
const ProfilePage = ({ user, currentUser, onMessage }) => {
  const isOwn = !user || user.id === 99;
  const profile = isOwn ? currentUser : user;
  const [activeTab, setTab] = useState("about");

  const reviews = [
    { author: "Thomas D.", text: "Cours de design très bien structurés ! Très à l'écoute et pédagogue.", rating: 5, date: "Il y a 3 jours" },
    { author: "Camille P.", text: "Échange super enrichissant. Je recommande vivement !", rating: 5, date: "Il y a 1 semaine" },
    { author: "Lucas B.", text: "Très bonne expérience, on échange souvent maintenant.", rating: 4, date: "Il y a 2 semaines" },
  ];

  if (!profile) return null;

  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "40px 24px" }}>
      {/* Header */}
      <div className="card fade-up" style={{ padding: 32, marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", alignItems: "flex-start" }}>
          <Avatar user={profile} size={88} />
          <div style={{ flex: 1, minWidth: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", marginBottom: 4 }}>
              <h1 style={{ fontSize: 28, fontWeight: 800 }}>{profile.name}</h1>
              {isOwn && <span className="badge" style={{ background: "rgba(124,109,250,0.15)", color: "#9d8fff", border: "1px solid rgba(124,109,250,0.3)" }}>Mon profil</span>}
            </div>
            <p style={{ color: "var(--muted)", marginBottom: 10 }}>📍 {profile.city || "Paris"}</p>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 14 }}>
              <div><Stars rating={profile.rating} /><span style={{ marginLeft: 6, fontSize: 13, color: "var(--muted)" }}>({profile.reviews} avis)</span></div>
              <div style={{ color: "var(--muted)", fontSize: 14 }}>🔁 {profile.exchanges} échanges</div>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{profile.bio}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
            <div style={{ background: "rgba(124,109,250,0.1)", border: "2px solid var(--accent)", borderRadius: 14, padding: "16px 24px", textAlign: "center" }}>
              <div style={{ fontSize: 36, fontWeight: 800, color: "var(--accent)", fontFamily: "Syne" }}>{profile.points}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", fontWeight: 500 }}>heures disponibles</div>
            </div>
            {!isOwn && <button className="btn-primary" style={{ padding: "10px 20px", width: "100%" }} onClick={() => onMessage(profile)}>💬 Contacter</button>}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fade-up-d1" style={{ display: "flex", gap: 4, background: "var(--surface)", borderRadius: 12, padding: 4, marginBottom: 20 }}>
        {["about", "skills", "reviews"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{
            flex: 1, padding: "10px", borderRadius: 10, fontSize: 14,
            fontFamily: "Syne, sans-serif", fontWeight: 600,
            background: activeTab === t ? "var(--surface2)" : "transparent",
            color: activeTab === t ? "var(--text)" : "var(--muted)",
            border: activeTab === t ? "1px solid var(--border)" : "1px solid transparent"
          }}>
            {{ about: "À propos", skills: "Compétences", reviews: "Avis" }[t]}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="card fade-up-d2" style={{ padding: 28 }}>
        {activeTab === "about" && (
          <div>
            <h3 style={{ fontWeight: 700, marginBottom: 16 }}>À propos</h3>
            <p style={{ color: "var(--muted)", lineHeight: 1.7, marginBottom: 24 }}>{profile.bio}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div style={{ background: "var(--surface2)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "Syne", color: "var(--accent)" }}>{profile.exchanges}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>échanges réalisés</div>
              </div>
              <div style={{ background: "var(--surface2)", borderRadius: 12, padding: 16, textAlign: "center" }}>
                <div style={{ fontSize: 28, fontWeight: 800, fontFamily: "Syne", color: "var(--accent3)" }}>{profile.reviews}</div>
                <div style={{ fontSize: 13, color: "var(--muted)" }}>avis reçus</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "skills" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>✨</span> Ce que je propose
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(profile.offering?.length ? profile.offering : ["Aucune compétence ajoutée"]).map(s =>
                  <SkillBadge key={s} skill={s} color="accent" />
                )}
              </div>
            </div>
            <div>
              <h3 style={{ fontWeight: 700, marginBottom: 16, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 18 }}>🎯</span> Ce que je recherche
              </h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(profile.seeking?.length ? profile.seeking : ["Aucune compétence ajoutée"]).map(s =>
                  <SkillBadge key={s} skill={s} color="pink" />
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "reviews" && (
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
              <div style={{ fontSize: 48, fontWeight: 800, fontFamily: "Syne", color: "var(--accent)" }}>{profile.rating}</div>
              <div>
                <Stars rating={profile.rating} />
                <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>Basé sur {profile.reviews} avis</div>
              </div>
            </div>
            {reviews.map((r, i) => (
              <div key={i} style={{ padding: "16px 0", borderBottom: i < reviews.length - 1 ? "1px solid var(--border)" : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{r.author}</span>
                  <span style={{ color: "var(--muted)", fontSize: 12 }}>{r.date}</span>
                </div>
                <Stars rating={r.rating} />
                <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8, lineHeight: 1.5 }}>{r.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// --- MESSAGES PAGE ---
const MessagesPage = ({ currentUser, activeContact: initialContact }) => {
  const [active, setActive] = useState(initialContact || MOCK_USERS[0]);
  const [messages, setMessages] = useState(MOCK_MESSAGES[initialContact?.id] || MOCK_MESSAGES[2]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (initialContact) {
      setActive(initialContact);
      setMessages(MOCK_MESSAGES[initialContact.id] || []);
    }
  }, [initialContact]);

  const selectContact = (u) => {
    setActive(u);
    setMessages(MOCK_MESSAGES[u.id] || []);
  };

  const sendMsg = () => {
    if (!input.trim()) return;
    setMessages(m => [...m, { from: "me", text: input.trim(), time: new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" }) }]);
    setInput("");
  };

  const conversations = MOCK_USERS.slice(0, 4);

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <h1 className="fade-up" style={{ fontSize: 32, fontWeight: 800, marginBottom: 24 }}>Messages</h1>
      <div className="card fade-up-d1" style={{ display: "flex", height: 600, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{ width: 280, borderRight: "1px solid var(--border)", overflowY: "auto", flexShrink: 0 }}>
          {conversations.map(u => (
            <div key={u.id} onClick={() => selectContact(u)} style={{
              padding: "16px 18px", cursor: "pointer", display: "flex", gap: 12, alignItems: "center",
              background: active?.id === u.id ? "var(--surface2)" : "transparent",
              borderLeft: active?.id === u.id ? "3px solid var(--accent)" : "3px solid transparent",
              transition: "all 0.15s"
            }}>
              <Avatar user={u} size={40} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{u.name}</div>
                <div style={{ color: "var(--muted)", fontSize: 12, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {(MOCK_MESSAGES[u.id]?.slice(-1)[0]?.text) || "Démarrer une conversation..."}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat area */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          {/* Header */}
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar user={active} size={36} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{active?.name}</div>
              <div style={{ fontSize: 12, color: "var(--accent3)", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent3)" }}></span> En ligne
              </div>
            </div>
          </div>

          {/* Messages */}
          <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "me" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "70%",
                  background: m.from === "me" ? "var(--accent)" : "var(--surface2)",
                  borderRadius: m.from === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                  padding: "10px 16px",
                }}>
                  <p style={{ fontSize: 14, lineHeight: 1.5 }}>{m.text}</p>
                  <p style={{ fontSize: 11, color: m.from === "me" ? "rgba(255,255,255,0.6)" : "var(--muted)", marginTop: 4, textAlign: "right" }}>{m.time}</p>
                </div>
              </div>
            ))}
            {messages.length === 0 && (
              <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 40 }}>💬</span>
                <p>Commencez la conversation !</p>
              </div>
            )}
            <div ref={endRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "16px", borderTop: "1px solid var(--border)", display: "flex", gap: 10 }}>
            <input placeholder="Écrire un message..." value={input} onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && sendMsg()}
              style={{ flex: 1 }} />
            <button className="btn-primary" style={{ padding: "10px 20px", flexShrink: 0 }} onClick={sendMsg}>Envoyer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- DASHBOARD ---
const DashboardPage = ({ currentUser, onNavigate }) => {
  const recentExchanges = [
    { user: MOCK_USERS[0], type: "given", skill: "Design UX/UI", hours: 2, date: "15 fév." },
    { user: MOCK_USERS[1], type: "received", skill: "React", hours: 1, date: "12 fév." },
    { user: MOCK_USERS[2], type: "given", skill: "Yoga", hours: 1.5, date: "10 fév." },
  ];

  if (!currentUser) return (
    <div style={{ textAlign: "center", padding: 80 }}>
      <p style={{ color: "var(--muted)" }}>Connectez-vous pour accéder à votre tableau de bord.</p>
      <button className="btn-primary" style={{ marginTop: 20 }} onClick={() => onNavigate("login")}>Se connecter</button>
    </div>
  );

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
      <div className="fade-up" style={{ marginBottom: 32 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, marginBottom: 8 }}>Bonjour, {currentUser.name.split(" ")[0]} 👋</h1>
        <p style={{ color: "var(--muted)" }}>Voici un résumé de votre activité</p>
      </div>

      {/* Stats */}
      <div className="fade-up-d1" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 32 }}>
        {[
          { label: "Heures disponibles", value: currentUser.points, icon: "⏱️", color: "var(--accent)" },
          { label: "Échanges réalisés", value: currentUser.exchanges, icon: "🔁", color: "var(--accent3)" },
          { label: "Avis reçus", value: currentUser.reviews, icon: "⭐", color: "#fbbf24" },
          { label: "Note moyenne", value: currentUser.rating, icon: "🏆", color: "var(--accent2)" },
        ].map((s, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ fontSize: 24, marginBottom: 8 }}>{s.icon}</div>
            <div style={{ fontSize: 32, fontWeight: 800, fontFamily: "Syne", color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Recent exchanges */}
      <div className="card fade-up-d2" style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 20 }}>Échanges récents</h3>
        {recentExchanges.map((ex, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 14, padding: "14px 0", borderBottom: i < recentExchanges.length - 1 ? "1px solid var(--border)" : "none" }}>
            <Avatar user={ex.user} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{ex.user.name}</div>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{ex.skill}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: ex.type === "given" ? "var(--accent2)" : "var(--accent3)" }}>
                {ex.type === "given" ? `-${ex.hours}h` : `+${ex.hours}h`}
              </div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{ex.date}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Suggestions */}
      <div className="card fade-up-d3" style={{ padding: 24 }}>
        <h3 style={{ fontWeight: 700, marginBottom: 16 }}>Partenaires suggérés</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {MOCK_USERS.slice(1, 4).map(u => (
            <div key={u.id} style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <Avatar user={u} size={40} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{u.name}</div>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: 4 }}>
                  {u.offering.slice(0, 2).map(s => <SkillBadge key={s} skill={s} color="accent" />)}
                </div>
              </div>
              <button className="btn-ghost" style={{ padding: "8px 16px", fontSize: 13 }} onClick={() => onNavigate("explore")}>Voir</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================
// NAV
// ============================================================
const Nav = ({ page, currentUser, onNavigate, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={{
      position: "sticky", top: 0, zIndex: 100,
      background: "rgba(10,10,15,0.85)", backdropFilter: "blur(20px)",
      borderBottom: "1px solid var(--border)", padding: "0 24px"
    }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", height: 64, gap: 16 }}>
        {/* Logo */}
        <button style={{ background: "none", display: "flex", alignItems: "center", gap: 10, flex: "none" }} onClick={() => onNavigate("home")}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, var(--accent), var(--accent2))", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🔁</div>
          <span style={{ fontFamily: "Syne", fontWeight: 800, fontSize: 18, color: "var(--text)" }}>Skilléa<span style={{ color: "var(--accent)" }}>.</span></span>
        </button>

        <div style={{ flex: 1 }} />

        {/* Desktop nav */}
        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {[
            { label: "Accueil", key: "home" },
            { label: "Explorer", key: "explore" },
            ...(currentUser ? [
              { label: "Messages", key: "messages" },
              { label: "Dashboard", key: "dashboard" },
            ] : [])
          ].map(item => (
            <button key={item.key} onClick={() => onNavigate(item.key)} style={{
              background: page === item.key ? "var(--surface2)" : "transparent",
              color: page === item.key ? "var(--text)" : "var(--muted)",
              padding: "8px 14px", borderRadius: 8, fontSize: 14,
              fontFamily: "DM Sans, sans-serif", fontWeight: 500,
              border: "1px solid",
              borderColor: page === item.key ? "var(--border)" : "transparent"
            }}>
              {item.label}
            </button>
          ))}
        </div>

        {/* Auth */}
        {currentUser ? (
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ background: "rgba(124,109,250,0.15)", borderRadius: 8, padding: "6px 12px", fontSize: 13, color: "#9d8fff", fontWeight: 600 }}>
              ⏱ {currentUser.points}h
            </div>
            <button onClick={() => onNavigate("my-profile")} style={{ background: "none" }}>
              <Avatar user={currentUser} size={36} />
            </button>
            <button className="btn-ghost" style={{ padding: "8px 14px", fontSize: 13 }} onClick={onLogout}>Déco.</button>
          </div>
        ) : (
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-ghost" style={{ padding: "8px 18px" }} onClick={() => onNavigate("login")}>Connexion</button>
            <button className="btn-primary" style={{ padding: "8px 18px" }} onClick={() => onNavigate("register")}>S'inscrire</button>
          </div>
        )}
      </div>
    </nav>
  );
};

// ============================================================
// APP
// ============================================================
export default function App() {
  const [page, setPage] = useState("home");
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [messageContact, setMessageContact] = useState(null);

  const navigate = (dest, data = null) => {
    if (dest === "profile") setSelectedProfile(data);
    if (dest === "messages" && data) setMessageContact(data);
    else if (dest !== "messages") setMessageContact(null);
    setPage(dest);
    window.scrollTo(0, 0);
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    navigate("dashboard");
  };

  const handleMessage = (user) => {
    navigate("messages", user);
  };

  return (
    <>
      <GlobalStyle />
      <OrbBackground />
      <div style={{ position: "relative", zIndex: 1, minHeight: "100vh" }}>
        <Nav page={page} currentUser={currentUser} onNavigate={navigate} onLogout={() => { setCurrentUser(null); navigate("home"); }} />

        {page === "home" && <LandingPage onNavigate={navigate} />}
        {(page === "login" || page === "register") && <AuthPage mode={page} onNavigate={navigate} onLogin={handleLogin} />}
        {page === "explore" && <ExplorePage onNavigate={navigate} onMessage={handleMessage} />}
        {page === "profile" && <ProfilePage user={selectedProfile} currentUser={currentUser} onMessage={handleMessage} />}
        {page === "my-profile" && <ProfilePage user={null} currentUser={currentUser || MOCK_USERS[0]} onMessage={handleMessage} />}
        {page === "messages" && <MessagesPage currentUser={currentUser} activeContact={messageContact} />}
        {page === "dashboard" && <DashboardPage currentUser={currentUser} onNavigate={navigate} />}

        {/* Footer */}
        <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 24px", textAlign: "center", color: "var(--muted)", fontSize: 14, marginTop: 40 }}>
          <div style={{ marginBottom: 8, fontFamily: "Syne", fontWeight: 700, fontSize: 18, color: "var(--text)" }}>
            🔁 Skilléa
          </div>
          <p>La plateforme d'échange de compétences entre particuliers · Version 1.0</p>
          <p style={{ marginTop: 8, fontSize: 12 }}>Structure évolutive · Prêt pour l'abonnement Premium · MongoDB + Node.js</p>
        </footer>
      </div>
    </>
  );
}
