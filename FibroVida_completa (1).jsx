import { useState, useEffect } from "react";

const palette = {
  bg: "#FAF7F2",
  card: "#FFFFFF",
  purple: "#9B7FD4",
  purpleLight: "#EDE7F6",
  purpleDark: "#6A4DA8",
  beige: "#F5EFE6",
  beigeDeep: "#E8DDD0",
  text: "#3D2E4E",
  textMuted: "#7B6A8A",
  lavender: "#C9B8E8",
  rose: "#F2C4CE",
  shadow: "rgba(155,127,212,0.12)",
  ciruela: "#7B3F6E",
  cirelaLight: "#F5EAF3",
  agua: "#185FA5",
  aguaLight: "#E8F4FB",
};

const TABS = [
  { id: "home", label: "Inicio", icon: "🏠" },
  { id: "tracker", label: "Registro", icon: "📊" },
  { id: "guide", label: "Guía", icon: "💡" },
  { id: "edu", label: "Aprende", icon: "📖" },
  { id: "care", label: "Autocuidado", icon: "🌻" },
  { id: "mental", label: "Salud Mental", icon: "🧠" },
  { id: "plan", label: "Plan 7 días", icon: "📅" },
  { id: "soul", label: "Apoyo", icon: "💜" },
  { id: "citas", label: "Mis Citas", icon: "🗓️" },
  { id: "meds", label: "Medicamentos", icon: "💊" },
  { id: "agua", label: "Hidratación", icon: "💧" },
  { id: "diario", label: "Diario", icon: "📔" },
  { id: "fe", label: "Mi Fe", icon: "🕊️" },
  { id: "recursos", label: "Recursos", icon: "🔗" },
];

const affirmations = [
  "No eres débil, estás luchando cada día 💜",
  "Tu cuerpo merece cuidado, no presión",
  "Está bien descansar. Descansar es sanar.",
  "Eres más fuerte de lo que crees",
  "Un día a la vez. Hoy es suficiente.",
  "Tu dolor es real. Tu valentía también.",
  "Mereces compasión, especialmente de ti misma",
];

const moodEmojis = ["😰","😔","😐","🙂","😊"];
const moodLabels = ["Muy bajo","Bajo","Regular","Bien","Muy bien"];
const MONTHS = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
const DAYS_SHORT = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

const versiculos = [
  { ref: "Filipenses 4:13", texto: "Todo lo puedo en Cristo que me fortalece." },
  { ref: "Salmos 34:18", texto: "El Señor está cerca de los quebrantados de corazón y salva a los de espíritu abatido." },
  { ref: "Isaías 41:10", texto: "No temas, porque yo estoy contigo; no desmayes, porque yo soy tu Dios." },
  { ref: "2 Corintios 12:9", texto: "Te basta mi gracia, pues mi poder se perfecciona en la debilidad." },
  { ref: "Salmos 46:1", texto: "Dios es nuestro amparo y fortaleza, nuestra ayuda segura en momentos de angustia." },
  { ref: "Mateo 11:28", texto: "Vengan a mí todos los que están cansados y agobiados, y yo les daré descanso." },
  { ref: "Salmos 147:3", texto: "Él sana a los quebrantados de corazón y venda sus heridas." },
];

const oraciones = [
  { titulo: "Para los días de dolor intenso", texto: "Señor, hoy mi cuerpo duele y me siento sin fuerzas. Te pido que seas mi fortaleza cuando la mía se acaba. Recuérdame que no estoy sola, que Tu mano me sostiene incluso cuando no la puedo sentir. Amén." },
  { titulo: "Para encontrar paz en el descanso", texto: "Padre, ayúdame a descansar sin culpa. Que en este momento de quietud pueda sentir Tu presencia y renovar mis fuerzas. Que mi descanso sea sagrado, porque Tú también descansaste. Amén." },
  { titulo: "Para los momentos de incertidumbre", texto: "Dios mío, no sé qué traerá mañana ni cómo estará mi cuerpo. Pero confío en que Tú tienes planes de bien para mí. Ayúdame a soltar el miedo y abrazar Tu paz que sobrepasa todo entendimiento. Amén." },
  { titulo: "Gratitud en medio del dolor", texto: "Señor, gracias porque aun en medio del dolor, hay cosas buenas en mi vida. Abre mis ojos para verlas. Que mi corazón pueda dar gracias incluso en los días difíciles. Amén." },
];

const recursos = [
  { categoria: "Fibromialgia", color: "#9B7FD4", items: [
    { nombre: "Fibromialgia News Today", desc: "Noticias e investigaciones actualizadas sobre fibromialgia", url: "https://fibromyalgianewstoday.com" },
    { nombre: "National Fibromyalgia Association", desc: "Organización de apoyo e información en inglés", url: "https://www.fmaware.org" },
    { nombre: "Sociedad Española de Reumatología", desc: "Guías y recursos sobre fibromialgia en español", url: "https://www.ser.es" },
  ]},
  { categoria: "Apoyo emocional", color: "#C9B8E8", items: [
    { nombre: "Insight Timer", desc: "App gratuita de meditación y mindfulness", url: "https://insighttimer.com" },
    { nombre: "Calm", desc: "Meditaciones guiadas, música y técnicas de relajación", url: "https://www.calm.com" },
    { nombre: "Headspace en español", desc: "Mindfulness accesible para principiantes", url: "https://www.headspace.com/es" },
  ]},
  { categoria: "Comunidad", color: "#7B3F6E", items: [
    { nombre: "Somar25 — Comunidad", desc: "Recursos, guías y comunidad en español para mujeres con dolor crónico", url: "https://somar25.com" },
    { nombre: "Grupo Fibromialgia en Facebook", desc: "Comunidad de apoyo en español para mujeres con fibromialgia", url: "https://facebook.com" },
  ]},
  { categoria: "Alimentación y bienestar", color: "#6A4DA8", items: [
    { nombre: "Dieta antiinflamatoria", desc: "Guía de alimentos que pueden reducir la inflamación y el dolor", url: "https://www.healthline.com/nutrition/anti-inflammatory-diet-101" },
    { nombre: "Yoga suave para dolor crónico", desc: "Rutinas de yoga adaptadas para fibromialgia", url: "https://www.youtube.com" },
  ]},
];

const plan7dias = [
  { dia: 1, titulo: "Conócete sin juicio", color: "#9B7FD4", pasos: ["Escribe cómo te sientes hoy en un cuaderno sin filtros", "Identifica tus 3 principales síntomas de esta semana", "Haz 5 minutos de respiración profunda por la mañana", "Bebe 6–8 vasos de agua durante el día"], tip: "No te presiones. El objetivo es observar, no cambiar nada todavía." },
  { dia: 2, titulo: "Descansa con intención", color: "#C9B8E8", pasos: ["Planifica 2 momentos de descanso de 15 min en tu día", "Apaga el teléfono 30 min antes de dormir", "Usa una bolsa de calor en el área de mayor tensión", "Date permiso de decir 'hoy no puedo' sin culpa"], tip: "El descanso no es pereza. Es medicina." },
  { dia: 3, titulo: "Mueve tu cuerpo suavemente", color: "#6A4DA8", pasos: ["Realiza 5 min de estiramiento al despertar (sin forzar)", "Da un paseo corto de 10 min si tu cuerpo lo permite", "Practica la rutina de autocuidado de la app", "Anota cómo se sintió tu cuerpo después del movimiento"], tip: "Cualquier movimiento suave cuenta. No necesitas 'hacer ejercicio'." },
  { dia: 4, titulo: "Nutre tu cuerpo", color: "#E8B4D0", pasos: ["Come 3 comidas completas sin saltarte ninguna", "Incluye frutas o verduras en al menos 2 comidas", "Evita el azúcar y el café en exceso hoy", "Prepara una infusión calmante: manzanilla, lavanda o jengibre"], tip: "Lo que comes afecta tu dolor. Pequeños cambios suman mucho." },
  { dia: 5, titulo: "Cuida tu mente", color: "#9B7FD4", pasos: ["Lee 3 afirmaciones en voz alta frente al espejo", "Escucha música suave o sonidos de naturaleza por 10 min", "Haz una lista de 5 cosas que te dieron alegría esta semana", "Limita el tiempo en redes sociales a 30 minutos"], tip: "Tu mente también necesita pausas. Dáselas con amor." },
  { dia: 6, titulo: "Conecta con apoyo", color: "#C9B8E8", pasos: ["Habla con alguien de confianza sobre cómo te sientes", "Busca un grupo online de mujeres con fibromialgia", "Escribe una carta de compasión hacia ti misma", "Comparte algo positivo con alguien cercano"], tip: "No tienes que vivir esto sola. La conexión también sana." },
  { dia: 7, titulo: "Celebra tu semana", color: "#6A4DA8", pasos: ["Revisa tu registro de síntomas: ¿qué mejoró?", "Anota 3 logros de esta semana, por pequeños que sean", "Date un momento especial: un baño relajante, música, una taza de té", "Planifica tu semana siguiente con compasión y realismo"], tip: "Llegar al día 7 ya es un logro. Celebra cada paso." },
];

const mentalSections = [
  { icon: "🫂", title: "El duelo por tu salud", content: "Es completamente válido sentir tristeza, enojo o frustración por los cambios que la fibromialgia trajo a tu vida. Este duelo es real y merece ser reconocido, no ignorado." },
  { icon: "🌊", title: "Manejo de la ansiedad", content: "El dolor crónico y la ansiedad se retroalimentan. Cuando sientes ansiedad crecer, prueba: nombrar 5 cosas que ves, 4 que tocas, 3 que escuchas. Este ejercicio ancla tu mente al presente." },
  { icon: "🧡", title: "Autocompasión práctica", content: "Trátate como tratarías a una amiga querida que está sufriendo. No con exigencia, sino con ternura. La autocompasión no es debilidad: es la base de la recuperación." },
  { icon: "🛑", title: "Decir no sin culpa", content: "Establecer límites es un acto de autocuidado. Puedes decir: 'Hoy no puedo, pero me importas'. No necesitas explicar ni justificar tu dolor ante nadie." },
  { icon: "📓", title: "Journaling emocional", content: "Escribir libera. Cada noche, anota: ¿Qué sentí hoy? ¿Qué necesitaba mi cuerpo? ¿Qué hice bien? No hay respuestas correctas, solo honestidad contigo misma." },
  { icon: "🌙", title: "Rituales para la noche", content: "Antes de dormir: apaga pantallas, pon música suave, escribe un pensamiento positivo del día y aplica calor en cuello o pies. El sueño reparador comienza con una mente tranquila." },
];

const s = {
  app: { fontFamily: "'Segoe UI', system-ui, sans-serif", background: palette.bg, minHeight: "100vh", color: palette.text, maxWidth: 480, margin: "0 auto", paddingBottom: 80 },
  nav: { position: "sticky", top: 0, background: "#FDF9F4", borderBottom: `1px solid ${palette.lavender}`, zIndex: 50, padding: "10px 0 6px" },
  navTitle: { textAlign: "center", fontSize: 13, fontWeight: 600, color: palette.purple, letterSpacing: 1 },
  navTabs: { display: "flex", overflowX: "auto", padding: "6px 8px 0", gap: 4, scrollbarWidth: "none" },
  tab: (active) => ({ background: active ? palette.purple : "transparent", color: active ? "#fff" : palette.textMuted, border: "none", borderRadius: 20, padding: "5px 10px", fontSize: 11, fontWeight: 500, cursor: "pointer", transition: "all 0.2s", whiteSpace: "nowrap", flexShrink: 0 }),
  section: { padding: "20px 16px 0" },
  card: { background: palette.card, borderRadius: 18, padding: "18px 16px", marginBottom: 14, boxShadow: `0 2px 12px ${palette.shadow}`, border: `1px solid ${palette.purpleLight}` },
  cardGrad: { background: "linear-gradient(135deg, #9B7FD4 0%, #C9B8E8 100%)", borderRadius: 18, padding: "22px 18px", marginBottom: 14, color: "#fff" },
  h1: { fontSize: 22, fontWeight: 700, color: palette.text, margin: 0 },
  h2: { fontSize: 17, fontWeight: 600, color: palette.text, margin: "0 0 10px" },
  h3: { fontSize: 15, fontWeight: 600, color: palette.purpleDark, margin: "0 0 6px" },
  p: { fontSize: 14, lineHeight: 1.7, color: palette.textMuted, margin: "4px 0" },
  tag: { display: "inline-block", background: palette.purpleLight, color: palette.purpleDark, borderRadius: 20, padding: "3px 10px", fontSize: 12, fontWeight: 500, margin: "3px 3px 0 0" },
  btn: { background: palette.purple, color: "#fff", border: "none", borderRadius: 24, padding: "11px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%", marginTop: 8 },
  btnOutline: { background: "transparent", color: palette.purple, border: `1.5px solid ${palette.purple}`, borderRadius: 24, padding: "10px 20px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%", marginTop: 8 },
  btnCiruela: { background: palette.ciruela, color: "#fff", border: "none", borderRadius: 24, padding: "11px 22px", fontSize: 14, fontWeight: 600, cursor: "pointer", width: "100%", marginTop: 8 },
  slider: { width: "100%", accentColor: palette.purple, marginTop: 6 },
  input: { width: "100%", border: `1.5px solid ${palette.lavender}`, borderRadius: 10, padding: "9px 12px", fontSize: 14, color: palette.text, background: palette.bg, boxSizing: "border-box", outline: "none" },
  divider: { border: "none", borderTop: `1px solid ${palette.purpleLight}`, margin: "12px 0" },
};

function Sunflower() {
  return (
    <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg" style={{display:"block",margin:"0 auto 8px"}}>
      {[0,45,90,135,180,225,270,315].map((deg,i)=>(
        <ellipse key={i} cx="27" cy="27" rx="5" ry="11" fill="#F5C842" transform={`rotate(${deg} 27 27) translate(0,-14)`} opacity="0.9"/>
      ))}
      {[22.5,67.5,112.5,157.5,202.5,247.5,292.5,337.5].map((deg,i)=>(
        <ellipse key={i} cx="27" cy="27" rx="4" ry="9" fill="#F7D96E" transform={`rotate(${deg} 27 27) translate(0,-13)`} opacity="0.7"/>
      ))}
      <circle cx="27" cy="27" r="10" fill="#5C3317"/>
      <circle cx="27" cy="27" r="7" fill="#7A4520"/>
      {[0,60,120,180,240,300].map((deg,i)=>{
        const r=4.5, x=27+r*Math.cos(deg*Math.PI/180), y=27+r*Math.sin(deg*Math.PI/180);
        return <circle key={i} cx={x} cy={y} r="1.2" fill="#3D1F0A" opacity="0.8"/>;
      })}
    </svg>
  );
}

function SliderRow({ label, value, onChange }) {
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
        <span style={{ fontSize: 13, color: palette.textMuted }}>{label}</span>
        <span style={{ fontSize: 14, fontWeight: 600, color: palette.purple }}>{value}/10</span>
      </div>
      <input type="range" min={1} max={10} value={value} onChange={e => onChange(Number(e.target.value))} style={s.slider} />
    </div>
  );
}

function MoodSelector({ value, onChange }) {
  return (
    <div>
      <span style={{ fontSize: 13, color: palette.textMuted, display: "block", marginBottom: 8 }}>Estado de ánimo</span>
      <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
        {moodEmojis.map((em, i) => (
          <button key={i} onClick={() => onChange(i)} style={{ background: value === i ? palette.purpleLight : "transparent", border: `1.5px solid ${value === i ? palette.purple : palette.lavender}`, borderRadius: 12, padding: "6px 8px", cursor: "pointer", fontSize: 22 }}>{em}</button>
        ))}
      </div>
      {value !== null && <p style={{ textAlign: "center", fontSize: 12, color: palette.purple, marginTop: 4 }}>{moodLabels[value]}</p>}
    </div>
  );
}

function BarChart({ logs }) {
  if (!logs.length) return <p style={{ ...s.p, textAlign: "center", padding: 16 }}>Aún no hay registros. ¡Empieza hoy!</p>;
  const last7 = logs.slice(-7);
  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8, padding: "8px 4px 0" }}>
        {last7.map((log, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
            <div style={{ width: "100%", background: palette.purple, borderRadius: "5px 5px 0 0", height: log.pain * 12, minHeight: 8 }} />
            <div style={{ width: "100%", background: palette.lavender, borderRadius: "5px 5px 0 0", height: log.fatigue * 10, minHeight: 6 }} />
            <span style={{ fontSize: 10, color: palette.textMuted }}>{log.date}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 12, marginTop: 10, justifyContent: "center" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: palette.textMuted }}><span style={{ width: 10, height: 10, borderRadius: 2, background: palette.purple, display: "inline-block" }} /> Dolor</span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: palette.textMuted }}><span style={{ width: 10, height: 10, borderRadius: 2, background: palette.lavender, display: "inline-block" }} /> Fatiga</span>
      </div>
    </div>
  );
}

function CTACard() {
  return (
    <div style={{ background: "linear-gradient(135deg, #EDE7F6 0%, #F9E8F0 100%)", borderRadius: 18, padding: "20px 16px", marginBottom: 14, textAlign: "center", border: `1.5px solid ${palette.lavender}` }}>
      <Sunflower />
      <h3 style={{ ...s.h3, color: palette.purpleDark, fontSize: 16 }}>Guía recomendada</h3>
      <p style={{ ...s.p, fontWeight: 600, color: palette.text, fontSize: 15 }}>Más Fuerte que el Dolor 💜</p>
      <p style={s.p}>Una guía digital completa para vivir mejor con fibromialgia. Estrategias prácticas, rutinas suaves y apoyo emocional.</p>
      <a href="https://somar25.com" target="_blank" rel="noopener noreferrer" style={{ display: "block", textDecoration: "none" }}>
        <button style={{ ...s.btn, marginTop: 10 }}>Ver guía 💜</button>
      </a>
      <p style={{ fontSize: 11, color: palette.textMuted, marginTop: 6 }}>Disponible en Beacons · Hotmart</p>
    </div>
  );
}

const routineSteps = [
  { icon: "🫁", title: "Respira profundo", desc: "Inhala 4 seg, sostén 4 seg, exhala 6 seg. Repite 5 veces." },
  { icon: "🙆‍♀️", title: "Estira el cuello", desc: "Inclina suavemente la cabeza a cada lado. Sostén 20 segundos sin forzar." },
  { icon: "🧘‍♀️", title: "Escaneo corporal", desc: "Cierra los ojos. Recorre mentalmente tu cuerpo de pies a cabeza. Respira hacia las tensiones." },
  { icon: "🤲", title: "Masaje de manos", desc: "Presiona suavemente cada dedo. Frota tus palmas. Las manos acumulan mucha tensión silenciosa." },
  { icon: "🌻", title: "Momento de gratitud", desc: "Nombra 3 cosas pequeñas por las que hoy puedes sentir gratitud." },
];

// ── MINI CALENDAR ──────────────────────────────────────────────────────────────
function MiniCalendar({ events, currentCal, onChangeMonth }) {
  const y = currentCal.getFullYear();
  const m = currentCal.getMonth();
  const first = new Date(y, m, 1).getDay();
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const today = new Date();
  const eventDays = events
    .filter(e => { const d = new Date(e.date); return d.getFullYear() === y && d.getMonth() === m; })
    .map(e => new Date(e.date).getDate());

  const cells = [];
  for (let i = 0; i < first; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <button onClick={() => onChangeMonth(-1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: palette.textMuted, padding: "2px 8px" }}>‹</button>
        <span style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>{MONTHS[m]} {y}</span>
        <button onClick={() => onChangeMonth(1)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: palette.textMuted, padding: "2px 8px" }}>›</button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 3 }}>
        {DAYS_SHORT.map(d => <div key={d} style={{ textAlign: "center", fontSize: 10, fontWeight: 600, color: palette.textMuted, paddingBottom: 4 }}>{d}</div>)}
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const isToday = today.getFullYear() === y && today.getMonth() === m && today.getDate() === d;
          const hasEv = eventDays.includes(d);
          return (
            <div key={i} style={{ textAlign: "center", padding: "5px 2px", borderRadius: 7, fontSize: 12,
              background: isToday ? palette.ciruela : hasEv ? palette.cirelaLight : "transparent",
              color: isToday ? "#fff" : hasEv ? palette.ciruela : palette.text,
              fontWeight: (isToday || hasEv) ? 600 : 400 }}>
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("home");
  const [pain, setPain] = useState(5);
  const [fatigue, setFatigue] = useState(5);
  const [mood, setMood] = useState(2);
  const [logs, setLogs] = useState([]);
  const [saved, setSaved] = useState(false);
  const [affIdx, setAffIdx] = useState(0);
  const [note, setNote] = useState("");
  const [routineStep, setRoutineStep] = useState(0);
  const [planDay, setPlanDay] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});

  // Citas
  const [events, setEvents] = useState([
    { id: 1, name: "Reumatóloga", date: "2026-04-15", hora: "10:00", nota: "Llevar últimos estudios" },
    { id: 2, name: "Análisis de sangre", date: "2026-04-22", hora: "08:30", nota: "" },
  ]);
  const [currentCal, setCurrentCal] = useState(new Date(2026, 3, 1));
  const [citaNombre, setCitaNombre] = useState("");
  const [citaFecha, setCitaFecha] = useState("");
  const [citaHora, setCitaHora] = useState("");
  const [citaNota, setCitaNota] = useState("");

  // Medicamentos
  const [meds, setMeds] = useState([
    { id: 1, name: "Pregabalina 75mg", freq: 2, hora: "08:00", nota: "Con comida" },
    { id: 2, name: "Amitriptilina 10mg", freq: 1, hora: "21:00", nota: "Antes de dormir" },
  ]);
  const [medNombre, setMedNombre] = useState("");
  const [medFreq, setMedFreq] = useState(1);
  const [medHora, setMedHora] = useState("08:00");
  const [medNota, setMedNota] = useState("");

  // Agua
  const [waterCount, setWaterCount] = useState(3);
  const [waterGoal, setWaterGoal] = useState(8);

  // Diario
  const [diarioEntradas, setDiarioEntradas] = useState([
    { id: 1, fecha: "2026-04-10", dolor: 6, fatiga: 7, sintomas: ["Dolor muscular","Niebla mental"], texto: "Hoy fue un día difícil pero logré descansar un poco por la tarde.", mood: 2 },
  ]);
  const [diarioTexto, setDiarioTexto] = useState("");
  const [diarioDolor, setDiarioDolor] = useState(5);
  const [diarioFatiga, setDiarioFatiga] = useState(5);
  const [diarioMood, setDiarioMood] = useState(2);
  const [diarioSintomas, setDiarioSintomas] = useState([]);
  const [diarioGuardado, setDiarioGuardado] = useState(false);
  const [verEntrada, setVerEntrada] = useState(null);

  // Fe
  const [versiculoIdx, setVersiculoIdx] = useState(0);
  const [oracionAbierta, setOracionAbierta] = useState(null);

  useEffect(() => {
    const t = setInterval(() => setAffIdx(i => (i + 1) % affirmations.length), 4000);
    return () => clearInterval(t);
  }, []);

  const saveLog = () => {
    const d = new Date();
    setLogs(prev => [...prev, { pain, fatigue, mood, date: `${d.getDate()}/${d.getMonth()+1}`, note }]);
    setSaved(true); setNote("");
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleStep = (dayIdx, stepIdx) => {
    const key = `${dayIdx}-${stepIdx}`;
    setCompletedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const dayProgress = (dayIdx) => {
    const day = plan7dias[dayIdx];
    const done = day.pasos.filter((_, i) => completedSteps[`${dayIdx}-${i}`]).length;
    return Math.round((done / day.pasos.length) * 100);
  };

  const addCita = () => {
    if (!citaNombre || !citaFecha) return;
    setEvents(prev => [...prev, { id: Date.now(), name: citaNombre, date: citaFecha, hora: citaHora || "00:00", nota: citaNota }]);
    setCitaNombre(""); setCitaFecha(""); setCitaHora(""); setCitaNota("");
  };

  const calcTimes = (hora, freq) => {
    const [h, min] = hora.split(":").map(Number);
    const gap = freq > 1 ? Math.floor(24 / freq) : 24;
    return Array.from({ length: freq }, (_, i) => {
      const hh = (h + gap * i) % 24;
      return `${String(hh).padStart(2,"0")}:${String(min).padStart(2,"0")}`;
    });
  };

  const addMed = () => {
    if (!medNombre) return;
    setMeds(prev => [...prev, { id: Date.now(), name: medNombre, freq: medFreq, hora: medHora, nota: medNota }]);
    setMedNombre(""); setMedNota("");
  };

  const sintomasOpciones = ["Dolor muscular","Dolor articular","Fatiga extrema","Niebla mental","Insomnio","Dolor de cabeza","Sensibilidad al tacto","Ansiedad","Tristeza","Náuseas","Hormigueo","Rigidez matutina"];

  const guardarDiario = () => {
    const hoy = new Date();
    const fecha = hoy.toISOString().split("T")[0];
    setDiarioEntradas(prev => [{ id: Date.now(), fecha, dolor: diarioDolor, fatiga: diarioFatiga, sintomas: diarioSintomas, texto: diarioTexto, mood: diarioMood }, ...prev]);
    setDiarioTexto(""); setDiarioSintomas([]); setDiarioDolor(5); setDiarioFatiga(5); setDiarioMood(2);
    setDiarioGuardado(true);
    setTimeout(() => setDiarioGuardado(false), 2000);
  };

  const toggleSintoma = (s) => setDiarioSintomas(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s]);

  const waterPct = Math.min(waterCount / waterGoal, 1);
  const circ = 326.7;
  const dashOffset = circ * (1 - waterPct);

  return (
    <div style={s.app}>
      <nav style={s.nav}>
        <div style={s.navTitle}>🌻 FIBROVIDA 🌻</div>
        <div style={s.navTabs}>
          {TABS.map(t => (
            <button key={t.id} style={s.tab(tab === t.id)} onClick={() => setTab(t.id)}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>
      </nav>

      {/* HOME */}
      {tab === "home" && (
        <div style={s.section}>
          <div style={{ ...s.cardGrad, textAlign: "center" }}>
            <Sunflower />
            <h1 style={{ ...s.h1, color: "#fff", fontSize: 20, marginBottom: 8 }}>Tu dolor es real, y no estás sola 💜</h1>
            <p style={{ ...s.p, color: "rgba(255,255,255,0.88)", fontSize: 13 }}>Esta es tu app de compañía, guía y descanso. Aquí encontrarás apoyo para cada día.</p>
          </div>
          <div style={{ ...s.card, background: palette.beige }}>
            <h2 style={s.h2}>¿Qué es la fibromialgia?</h2>
            <p style={s.p}>La fibromialgia es una condición real del sistema nervioso central que causa dolor crónico generalizado, fatiga profunda y sensibilidad aumentada. <strong>No es imaginación. No es debilidad.</strong> Es una condición médica reconocida que afecta a millones de mujeres.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
            {[
              { icon: "📊", label: "Registrar síntomas", target: "tracker" },
              { icon: "💡", label: "Guía de crisis", target: "guide" },
              { icon: "🗓️", label: "Mis citas", target: "citas" },
              { icon: "💊", label: "Medicamentos", target: "meds" },
              { icon: "💧", label: "Hidratación", target: "agua" },
              { icon: "📔", label: "Diario", target: "diario" },
              { icon: "🕊️", label: "Mi fe", target: "fe" },
              { icon: "🔗", label: "Recursos", target: "recursos" },
              { icon: "📅", label: "Plan 7 días", target: "plan" },
            ].map(btn => (
              <button key={btn.target} onClick={() => setTab(btn.target)} style={{ background: palette.card, border: `1.5px solid ${palette.lavender}`, borderRadius: 14, padding: "16px 8px", cursor: "pointer", textAlign: "center" }}>
                <div style={{ fontSize: 24 }}>{btn.icon}</div>
                <div style={{ fontSize: 12, fontWeight: 600, color: palette.text, marginTop: 4 }}>{btn.label}</div>
              </button>
            ))}
          </div>
          <CTACard />
        </div>
      )}

      {/* TRACKER */}
      {tab === "tracker" && (
        <div style={s.section}>
          <h1 style={s.h1}>Registro de síntomas</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Escucha a tu cuerpo. Registrar te ayuda a entender tus patrones.</p>
          <div style={s.card}>
            <h2 style={{ ...s.h2, marginBottom: 16 }}>¿Cómo estás hoy?</h2>
            <SliderRow label="Nivel de dolor" value={pain} onChange={setPain} />
            <SliderRow label="Nivel de fatiga" value={fatigue} onChange={setFatigue} />
            <hr style={s.divider} />
            <MoodSelector value={mood} onChange={setMood} />
            <hr style={s.divider} />
            <label style={{ fontSize: 13, color: palette.textMuted }}>Nota opcional</label>
            <textarea value={note} onChange={e => setNote(e.target.value)} placeholder="¿Algo especial hoy?" rows={2} style={{ ...s.input, marginTop: 6, resize: "none" }} />
            <button style={s.btn} onClick={saveLog}>{saved ? "✓ Guardado" : "Guardar registro"}</button>
          </div>
          {logs.length > 0 && (
            <div style={s.card}>
              <h2 style={s.h2}>Tu historial reciente</h2>
              <BarChart logs={logs} />
              <hr style={s.divider} />
              <div style={{ maxHeight: 200, overflowY: "auto" }}>
                {[...logs].reverse().slice(0,5).map((log,i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: i<4 ? `1px solid ${palette.purpleLight}` : "none" }}>
                    <span style={{ fontSize: 13, color: palette.textMuted }}>{log.date}</span>
                    <div style={{ display: "flex", gap: 6 }}>
                      <span style={s.tag}>Dolor {log.pain}</span>
                      <span style={{ ...s.tag, background: "#F0EBF8" }}>Fatiga {log.fatigue}</span>
                      <span style={{ fontSize: 18 }}>{moodEmojis[log.mood]}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* GUIDE */}
      {tab === "guide" && (
        <div style={s.section}>
          <h1 style={s.h1}>Guía de apoyo diario</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Para los días difíciles y los momentos de crisis.</p>
          <div style={{ ...s.card, borderLeft: "4px solid #D4547E", borderRadius: 18 }}>
            <h2 style={{ ...s.h2, color: "#993556" }}>🚨 Durante una crisis</h2>
            {[["🛌","Para. Descansa sin culpa","Tu cuerpo pide pausa. Eso está bien."],["❄️🔥","Aplica calor suave","Una bolsa de agua caliente en las zonas de dolor puede aliviar la tensión muscular."],["📵","Reduce estimulación","Bajar las luces, silenciar el teléfono y alejarte del ruido ayuda a calmar el sistema nervioso."],["💧","Hidrátate despacio","Pequeños sorbos de agua tibia. El cuerpo agradece la hidratación constante."],["🤍","No te exijas","Una crisis no es un fracaso. Es señal de que tu cuerpo necesita más amor."]].map(([icon,title,desc]) => (
              <div key={title} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${palette.purpleLight}` }}>
                <span style={{ fontSize: 22, flexShrink: 0 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14, color: palette.text }}>{title}</div>
                  <div style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={s.card}>
            <h2 style={s.h2}>💆‍♀️ Tips para el día a día</h2>
            {["Descansa sin culpa — el descanso ES productividad","Reduce actividades cuando sientas señales tempranas","Usa calor terapéutico en cuello, hombros y espalda","Estira suavemente al despertar (5 minutos son suficientes)","Mantente hidratada durante todo el día","Comunica tus límites sin disculparte por ellos","Escribe cómo te sientes — libera la carga emocional"].map(tip => (
              <div key={tip} style={{ display: "flex", gap: 8, padding: "7px 0", borderBottom: `1px solid ${palette.purpleLight}` }}>
                <span style={{ color: palette.purple, fontWeight: 700 }}>✔️</span>
                <span style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EDU */}
      {tab === "edu" && (
        <div style={s.section}>
          <h1 style={s.h1}>Educación sobre fibromialgia</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Entender tu condición es parte de sanar.</p>
          <div style={s.card}>
            <h2 style={s.h2}>🧠 ¿Qué está pasando en tu cuerpo?</h2>
            <p style={s.p}>La fibromialgia ocurre cuando el sistema nervioso central amplifica las señales de dolor. Es como si el "volumen del dolor" estuviera demasiado alto. No es daño en los tejidos, sino una hipersensibilización del sistema nervioso.</p>
          </div>
          <div style={s.card}>
            <h2 style={s.h2}>📋 Síntomas comunes</h2>
            {[["🔴","Dolor crónico generalizado","Dolor difuso en músculos y articulaciones, frecuentemente en todo el cuerpo"],["🧠","Niebla mental (brain fog)","Dificultad para concentrarse, recordar cosas o pensar con claridad"],["😴","Fatiga profunda","Cansancio que no mejora con el sueño, incluso después de descansar"],["⚡","Sensibilidad aumentada","Mayor sensibilidad al tacto, la luz, el ruido, los olores o la temperatura"],["😴","Sueño no reparador","Dormir sin sentir descanso, despertarse agotada"],["💙","Síntomas emocionales","Ansiedad, tristeza, irritabilidad relacionados con el dolor crónico"]].map(([icon,title,desc]) => (
              <div key={title} style={{ display: "flex", gap: 10, padding: "9px 0", borderBottom: `1px solid ${palette.purpleLight}` }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 13, color: palette.text }}>{title}</div>
                  <div style={{ fontSize: 12, color: palette.textMuted }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={s.card}>
            <h2 style={s.h2}>⚠️ Posibles desencadenantes</h2>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Estrés emocional","Mal sueño","Sobreactividad","Cambios climáticos","Infecciones","Cambios hormonales","Posturas sostenidas","Esfuerzo físico excesivo"].map(t => (
                <span key={t} style={s.tag}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CARE */}
      {tab === "care" && (
        <div style={s.section}>
          <h1 style={s.h1}>Rutina de autocuidado 🌻</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Una rutina suave de 5–10 minutos para nutrir tu cuerpo y tu mente.</p>
          <div style={{ ...s.card, background: palette.purpleLight }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
              <h2 style={{ ...s.h2, margin: 0, color: palette.purpleDark }}>Paso {routineStep+1} de {routineSteps.length}</h2>
              <span style={{ fontSize: 11, color: palette.purple, fontWeight: 600 }}>{Math.round(((routineStep+1)/routineSteps.length)*100)}%</span>
            </div>
            <div style={{ height: 4, background: palette.lavender, borderRadius: 4, marginBottom: 16 }}>
              <div style={{ height: 4, background: palette.purple, borderRadius: 4, width: `${((routineStep+1)/routineSteps.length)*100}%`, transition: "width 0.4s" }} />
            </div>
            <div style={{ textAlign: "center", padding: "10px 0" }}>
              <div style={{ fontSize: 48, marginBottom: 10 }}>{routineSteps[routineStep].icon}</div>
              <h3 style={{ ...s.h3, fontSize: 18, color: palette.purpleDark }}>{routineSteps[routineStep].title}</h3>
              <p style={{ ...s.p, fontSize: 14, color: palette.textMuted, marginTop: 8 }}>{routineSteps[routineStep].desc}</p>
            </div>
            <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
              <button style={{ ...s.btnOutline, flex: 1, marginTop: 0, opacity: routineStep===0 ? 0.4 : 1 }} onClick={() => setRoutineStep(x => Math.max(0,x-1))} disabled={routineStep===0}>← Anterior</button>
              {routineStep < routineSteps.length-1
                ? <button style={{ ...s.btn, flex: 1, marginTop: 0 }} onClick={() => setRoutineStep(x => x+1)}>Siguiente →</button>
                : <button style={{ ...s.btn, flex: 1, marginTop: 0, background: "#6A4DA8" }} onClick={() => setRoutineStep(0)}>🌻 Reiniciar</button>
              }
            </div>
          </div>
        </div>
      )}

      {/* MENTAL HEALTH */}
      {tab === "mental" && (
        <div style={s.section}>
          <h1 style={s.h1}>Salud emocional 🧠</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Cuida tu mente y corazón. Tu bienestar emocional es tan importante como el físico.</p>
          <div style={{ ...s.cardGrad, textAlign: "center" }}>
            <div style={{ fontSize: 32, marginBottom: 6 }}>🫀</div>
            <p style={{ color: "#fff", fontSize: 15, fontWeight: 500, lineHeight: 1.6, margin: 0 }}>El dolor emocional y el físico comparten los mismos caminos en el cerebro. Cuidar tu mente alivia tu cuerpo.</p>
          </div>
          {mentalSections.map(sec => (
            <div key={sec.title} style={s.card}>
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <span style={{ fontSize: 28, flexShrink: 0 }}>{sec.icon}</span>
                <div>
                  <h3 style={s.h3}>{sec.title}</h3>
                  <p style={s.p}>{sec.content}</p>
                </div>
              </div>
            </div>
          ))}
          <div style={{ ...s.card, background: palette.beige }}>
            <h2 style={s.h2}>🌿 Cuándo buscar ayuda profesional</h2>
            <p style={s.p}>Si sientes tristeza profunda, ansiedad constante o pensamientos negativos frecuentes, hablar con un psicólogo especializado en dolor crónico puede cambiar tu vida. Pedir ayuda es un acto de valentía, no de debilidad.</p>
            <div style={{ marginTop: 10, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {["Terapia cognitivo-conductual","Mindfulness","Terapia de aceptación","Grupos de apoyo"].map(t => <span key={t} style={s.tag}>{t}</span>)}
            </div>
          </div>
        </div>
      )}

      {/* PLAN 7 DIAS */}
      {tab === "plan" && (
        <div style={s.section}>
          <h1 style={s.h1}>Plan de acción 7 días 📅</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Un plan paso a paso, gentil y realista, diseñado para tu ritmo.</p>
          <div style={{ display: "flex", gap: 6, overflowX: "auto", marginBottom: 14, paddingBottom: 4, scrollbarWidth: "none" }}>
            {plan7dias.map((d, i) => (
              <button key={i} onClick={() => setPlanDay(i)} style={{ flexShrink: 0, background: planDay===i ? palette.purple : palette.card, color: planDay===i ? "#fff" : palette.textMuted, border: `1.5px solid ${planDay===i ? palette.purple : palette.lavender}`, borderRadius: 12, padding: "8px 12px", cursor: "pointer", textAlign: "center", minWidth: 52 }}>
                <div style={{ fontSize: 11, fontWeight: 600 }}>Día</div>
                <div style={{ fontSize: 18, fontWeight: 700 }}>{i+1}</div>
                {dayProgress(i) === 100 && <div style={{ fontSize: 10 }}>✓</div>}
              </button>
            ))}
          </div>
          {(() => {
            const day = plan7dias[planDay];
            const prog = dayProgress(planDay);
            return (
              <div>
                <div style={{ ...s.card, borderLeft: `4px solid ${day.color}`, borderRadius: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600 }}>DÍA {planDay+1}</span>
                    <span style={{ fontSize: 12, color: palette.purple, fontWeight: 600 }}>{prog}% completado</span>
                  </div>
                  <h2 style={{ ...s.h2, color: day.color }}>{day.titulo}</h2>
                  <div style={{ height: 4, background: palette.purpleLight, borderRadius: 4, marginBottom: 14 }}>
                    <div style={{ height: 4, background: day.color, borderRadius: 4, width: `${prog}%`, transition: "width 0.4s" }} />
                  </div>
                  {day.pasos.map((paso, i) => {
                    const done = !!completedSteps[`${planDay}-${i}`];
                    return (
                      <div key={i} onClick={() => toggleStep(planDay, i)} style={{ display: "flex", gap: 12, padding: "10px 0", borderBottom: `1px solid ${palette.purpleLight}`, cursor: "pointer", alignItems: "flex-start" }}>
                        <div style={{ width: 22, height: 22, borderRadius: 6, border: `2px solid ${done ? day.color : palette.lavender}`, background: done ? day.color : "transparent", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>
                          {done && <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>}
                        </div>
                        <span style={{ fontSize: 14, color: done ? palette.textMuted : palette.text, textDecoration: done ? "line-through" : "none", lineHeight: 1.5 }}>{paso}</span>
                      </div>
                    );
                  })}
                  <div style={{ background: palette.purpleLight, borderRadius: 12, padding: "10px 14px", marginTop: 12 }}>
                    <span style={{ fontSize: 12, color: palette.purpleDark, fontStyle: "italic" }}>💜 {day.tip}</span>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{ ...s.btnOutline, flex: 1, opacity: planDay===0 ? 0.4 : 1 }} onClick={() => setPlanDay(d => Math.max(0,d-1))} disabled={planDay===0}>← Día anterior</button>
                  {planDay < 6
                    ? <button style={{ ...s.btn, flex: 1 }} onClick={() => setPlanDay(d => Math.min(6,d+1))}>Día siguiente →</button>
                    : <button style={{ ...s.btn, flex: 1, background: "#6A4DA8" }} onClick={() => setPlanDay(0)}>🌻 Reiniciar plan</button>
                  }
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* SOUL */}
      {tab === "soul" && (
        <div style={s.section}>
          <h1 style={s.h1}>Apoyo emocional 💜</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Porque tu mente también necesita cuidado.</p>
          <div style={{ ...s.cardGrad, textAlign: "center", minHeight: 110, display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <div style={{ fontSize: 26, marginBottom: 8 }}>💜</div>
            <p style={{ fontSize: 16, fontWeight: 500, color: "#fff", lineHeight: 1.6, margin: 0 }}>"{affirmations[affIdx]}"</p>
          </div>
          <div style={s.card}>
            <h2 style={s.h2}>🌟 Afirmaciones para ti</h2>
            {affirmations.map((aff,i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${palette.purpleLight}`, display: "flex", gap: 10 }}>
                <span style={{ color: palette.purple }}>💜</span>
                <span style={{ fontSize: 14, color: palette.textMuted, lineHeight: 1.6 }}>{aff}</span>
              </div>
            ))}
          </div>
          <div style={{ ...s.card, background: palette.beige }}>
            <h2 style={s.h2}>🤝 Recuerda</h2>
            <p style={s.p}>Vivir con dolor crónico es agotador, y a veces incomprendido. Pero no estás sola. Millones de mujeres en el mundo comparten tu experiencia.</p>
            <p style={{ ...s.p, marginTop: 8 }}>Si sientes que necesitas apoyo profesional, hablar con un psicólogo especializado en dolor crónico puede ser muy beneficioso. <strong>Pedir ayuda es un acto de valentía.</strong></p>
          </div>
          <CTACard />
        </div>
      )}

      {/* ── CITAS ─────────────────────────────────────────────────────────── */}
      {tab === "citas" && (
        <div style={s.section}>
          <h1 style={s.h1}>Mis citas médicas 🗓️</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Organiza tus consultas y nunca olvides una cita.</p>

          <div style={s.card}>
            <MiniCalendar events={events} currentCal={currentCal} onChangeMonth={d => setCurrentCal(prev => new Date(prev.getFullYear(), prev.getMonth() + d, 1))} />
          </div>

          <div style={{ fontSize: 13, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", letterSpacing: 0.5, margin: "4px 0 8px" }}>Próximas citas</div>
          {events.length === 0 && <p style={{ ...s.p, textAlign: "center", padding: 16 }}>No tienes citas guardadas aún.</p>}
          {[...events].sort((a,b) => a.date.localeCompare(b.date)).map(ev => {
            const d = new Date(ev.date + "T12:00:00");
            const label = d.toLocaleDateString("es-MX", { day: "numeric", month: "long" });
            return (
              <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 12, background: palette.card, border: `1px solid ${palette.purpleLight}`, marginBottom: 8, boxShadow: `0 1px 6px ${palette.shadow}` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: palette.ciruela, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>{ev.name}</div>
                  <div style={{ fontSize: 12, color: palette.textMuted }}>{label} · {ev.hora}{ev.nota ? ` · ${ev.nota}` : ""}</div>
                </div>
                <button onClick={() => setEvents(prev => prev.filter(e => e.id !== ev.id))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: palette.textMuted, padding: "2px 6px", borderRadius: 6 }}>✕</button>
              </div>
            );
          })}

          <div style={{ ...s.card, marginTop: 8 }}>
            <h2 style={s.h2}>Agregar cita</h2>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Médico o tipo de cita</label>
              <input style={s.input} value={citaNombre} onChange={e => setCitaNombre(e.target.value)} placeholder="Ej: Reumatóloga Dra. López" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Fecha</label>
                <input type="date" style={s.input} value={citaFecha} onChange={e => setCitaFecha(e.target.value)} />
              </div>
              <div>
                <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Hora</label>
                <input type="time" style={s.input} value={citaHora} onChange={e => setCitaHora(e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Nota (opcional)</label>
              <input style={s.input} value={citaNota} onChange={e => setCitaNota(e.target.value)} placeholder="Ej: Llevar estudios anteriores" />
            </div>
            <button style={s.btnCiruela} onClick={addCita}>Guardar cita</button>
          </div>
        </div>
      )}

      {/* ── MEDICAMENTOS ──────────────────────────────────────────────────── */}
      {tab === "meds" && (
        <div style={s.section}>
          <h1 style={s.h1}>Mis medicamentos 💊</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Registra tus medicamentos y visualiza tus horarios del día.</p>

          {meds.length === 0 && <p style={{ ...s.p, textAlign: "center", padding: 16 }}>No tienes medicamentos guardados.</p>}
          {meds.map(med => {
            const times = calcTimes(med.hora, med.freq);
            return (
              <div key={med.id} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 14px", borderRadius: 14, background: palette.card, border: `1px solid ${palette.purpleLight}`, marginBottom: 10, boxShadow: `0 1px 6px ${palette.shadow}` }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: palette.purpleLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>💊</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>{med.name}</div>
                  <div style={{ fontSize: 12, color: palette.textMuted, marginBottom: 6 }}>{med.freq}x al día{med.nota ? ` · ${med.nota}` : ""}</div>
                  <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                    {times.map(t => (
                      <span key={t} style={{ fontSize: 11, background: palette.purpleLight, color: palette.purpleDark, padding: "2px 9px", borderRadius: 10, fontWeight: 600 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setMeds(prev => prev.filter(m => m.id !== med.id))} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: palette.textMuted, padding: "2px 4px" }}>✕</button>
              </div>
            );
          })}

          <div style={s.card}>
            <h2 style={s.h2}>Agregar medicamento</h2>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Nombre del medicamento</label>
              <input style={s.input} value={medNombre} onChange={e => setMedNombre(e.target.value)} placeholder="Ej: Pregabalina 75mg" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
              <div>
                <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Veces al día</label>
                <select style={s.input} value={medFreq} onChange={e => setMedFreq(Number(e.target.value))}>
                  <option value={1}>1 vez</option>
                  <option value={2}>2 veces</option>
                  <option value={3}>3 veces</option>
                  <option value={4}>4 veces</option>
                </select>
              </div>
              <div>
                <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Primera toma</label>
                <input type="time" style={s.input} value={medHora} onChange={e => setMedHora(e.target.value)} />
              </div>
            </div>
            <div style={{ marginBottom: 10 }}>
              <label style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, display: "block", marginBottom: 4 }}>Instrucción (opcional)</label>
              <input style={s.input} value={medNota} onChange={e => setMedNota(e.target.value)} placeholder="Ej: Con comida" />
            </div>
            <button style={{ ...s.btn, background: palette.purpleDark }} onClick={addMed}>Guardar medicamento</button>
          </div>
        </div>
      )}

      {/* ── HIDRATACIÓN ───────────────────────────────────────────────────── */}
      {tab === "agua" && (
        <div style={s.section}>
          <h1 style={s.h1}>Mi hidratación 💧</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Mantenerse hidratada ayuda a reducir la fatiga y el dolor muscular.</p>

          <div style={{ ...s.card, textAlign: "center" }}>
            <h2 style={{ ...s.h2, marginBottom: 16 }}>Vasos de agua hoy</h2>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <div style={{ position: "relative", width: 140, height: 140 }}>
                <svg width="140" height="140" viewBox="0 0 140 140" style={{ transform: "rotate(-90deg)" }}>
                  <circle cx="70" cy="70" r="52" fill="none" stroke={palette.purpleLight} strokeWidth="12" />
                  <circle cx="70" cy="70" r="52" fill="none" stroke={palette.agua} strokeWidth="12"
                    strokeDasharray={circ} strokeDashoffset={dashOffset} strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 0.4s" }} />
                </svg>
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", textAlign: "center" }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: palette.agua }}>{waterCount}</div>
                  <div style={{ fontSize: 11, color: palette.textMuted }}>de {waterGoal} vasos</div>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
              <button onClick={() => setWaterCount(c => Math.max(0, c - 1))} style={{ ...s.btnOutline, width: "auto", padding: "10px 22px", marginTop: 0 }}>− Quitar</button>
              <button onClick={() => setWaterCount(c => Math.min(waterGoal + 3, c + 1))} style={{ ...s.btn, width: "auto", padding: "10px 22px", marginTop: 0, background: palette.agua }}>+ Vaso 💧</button>
            </div>
            {waterCount >= waterGoal && (
              <div style={{ marginTop: 14, background: "#E8F4FB", borderRadius: 12, padding: "10px 14px" }}>
                <span style={{ fontSize: 13, color: palette.agua, fontWeight: 600 }}>🎉 ¡Meta cumplida! Muy bien, cariño.</span>
              </div>
            )}
          </div>

          <div style={s.card}>
            <h2 style={s.h2}>Meta diaria de vasos</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <input type="range" min={4} max={12} step={1} value={waterGoal} onChange={e => setWaterGoal(Number(e.target.value))} style={{ ...s.slider, flex: 1 }} />
              <span style={{ fontSize: 16, fontWeight: 600, color: palette.agua, minWidth: 70 }}>{waterGoal} vasos</span>
            </div>
            <p style={{ ...s.p, marginTop: 6 }}>Equivale a aprox. {waterGoal * 200} ml al día.</p>
          </div>

          <div style={{ ...s.card, background: "#E8F4FB", border: `1px solid #B5D4F4` }}>
            <h2 style={{ ...s.h2, color: palette.agua }}>💡 ¿Por qué es importante hidratarse?</h2>
            {["La deshidratación aumenta la sensibilidad al dolor","Beber agua ayuda a reducir la fatiga muscular","Una buena hidratación mejora la concentración y la niebla mental","Distribuye tus vasos a lo largo del día, no todos juntos"].map(tip => (
              <div key={tip} style={{ display: "flex", gap: 8, padding: "6px 0", borderBottom: `1px solid #B5D4F4` }}>
                <span style={{ color: palette.agua }}>💧</span>
                <span style={{ fontSize: 13, color: "#0C447C", lineHeight: 1.6 }}>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── DIARIO DE SÍNTOMAS ────────────────────────────────────────────── */}
      {tab === "diario" && (
        <div style={s.section}>
          <h1 style={s.h1}>Mi diario de síntomas 📔</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Registra cómo te sientes cada día. Con el tiempo verás tus patrones y podrás compartirlo con tu médico.</p>

          {verEntrada ? (
            <div style={s.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: palette.textMuted }}>{new Date(verEntrada.fecha + "T12:00:00").toLocaleDateString("es-MX", { weekday: "long", day: "numeric", month: "long" })}</span>
                <button onClick={() => setVerEntrada(null)} style={{ background: "none", border: "none", cursor: "pointer", color: palette.purple, fontSize: 13, fontWeight: 600 }}>← Volver</button>
              </div>
              <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                {[["Dolor", verEntrada.dolor], ["Fatiga", verEntrada.fatiga]].map(([lbl, val]) => (
                  <div key={lbl} style={{ flex: 1, background: palette.purpleLight, borderRadius: 10, padding: "10px", textAlign: "center" }}>
                    <div style={{ fontSize: 11, color: palette.textMuted }}>{lbl}</div>
                    <div style={{ fontSize: 22, fontWeight: 700, color: palette.purpleDark }}>{val}/10</div>
                  </div>
                ))}
                <div style={{ flex: 1, background: palette.purpleLight, borderRadius: 10, padding: "10px", textAlign: "center" }}>
                  <div style={{ fontSize: 11, color: palette.textMuted }}>Ánimo</div>
                  <div style={{ fontSize: 22 }}>{moodEmojis[verEntrada.mood]}</div>
                </div>
              </div>
              {verEntrada.sintomas.length > 0 && (
                <div style={{ marginBottom: 10 }}>
                  <div style={{ fontSize: 12, color: palette.textMuted, fontWeight: 600, marginBottom: 6 }}>Síntomas del día</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {verEntrada.sintomas.map(sm => <span key={sm} style={s.tag}>{sm}</span>)}
                  </div>
                </div>
              )}
              {verEntrada.texto && <p style={{ ...s.p, background: palette.beige, borderRadius: 10, padding: "10px 12px", fontStyle: "italic" }}>"{verEntrada.texto}"</p>}
            </div>
          ) : (
            <>
              <div style={s.card}>
                <h2 style={s.h2}>¿Cómo estás hoy?</h2>
                <SliderRow label="Nivel de dolor" value={diarioDolor} onChange={setDiarioDolor} />
                <SliderRow label="Nivel de fatiga" value={diarioFatiga} onChange={setDiarioFatiga} />
                <hr style={s.divider} />
                <MoodSelector value={diarioMood} onChange={setDiarioMood} />
                <hr style={s.divider} />
                <div style={{ fontSize: 13, color: palette.textMuted, fontWeight: 600, marginBottom: 8 }}>Síntomas de hoy</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 12 }}>
                  {sintomasOpciones.map(op => (
                    <button key={op} onClick={() => toggleSintoma(op)} style={{ background: diarioSintomas.includes(op) ? palette.purple : "transparent", color: diarioSintomas.includes(op) ? "#fff" : palette.textMuted, border: `1.5px solid ${diarioSintomas.includes(op) ? palette.purple : palette.lavender}`, borderRadius: 20, padding: "5px 12px", fontSize: 12, cursor: "pointer", fontWeight: 500 }}>{op}</button>
                  ))}
                </div>
                <label style={{ fontSize: 13, color: palette.textMuted, fontWeight: 600 }}>Nota del día</label>
                <textarea value={diarioTexto} onChange={e => setDiarioTexto(e.target.value)} placeholder="¿Cómo fue tu día? ¿Qué te ayudó? ¿Qué fue difícil?" rows={3} style={{ ...s.input, marginTop: 6, resize: "none" }} />
                <button style={s.btn} onClick={guardarDiario}>{diarioGuardado ? "✓ Guardado con amor 💜" : "Guardar entrada"}</button>
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", letterSpacing: 0.5, margin: "4px 0 10px" }}>Entradas anteriores</div>
              {diarioEntradas.length === 0 && <p style={{ ...s.p, textAlign: "center" }}>Aún no hay entradas. ¡Empieza hoy!</p>}
              {diarioEntradas.map(entrada => (
                <div key={entrada.id} onClick={() => setVerEntrada(entrada)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, background: palette.card, border: `1px solid ${palette.purpleLight}`, marginBottom: 8, cursor: "pointer", boxShadow: `0 1px 6px ${palette.shadow}` }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: palette.purpleLight, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>{moodEmojis[entrada.mood]}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: palette.text }}>{new Date(entrada.fecha + "T12:00:00").toLocaleDateString("es-MX", { weekday: "short", day: "numeric", month: "short" })}</div>
                    <div style={{ fontSize: 11, color: palette.textMuted }}>Dolor {entrada.dolor}/10 · Fatiga {entrada.fatiga}/10{entrada.sintomas.length > 0 ? ` · ${entrada.sintomas.length} síntomas` : ""}</div>
                  </div>
                  <span style={{ fontSize: 12, color: palette.purple }}>Ver →</span>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* ── MI FE ─────────────────────────────────────────────────────────── */}
      {tab === "fe" && (
        <div style={s.section}>
          <h1 style={s.h1}>Mi fe 🕊️</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Tu fe es un pilar de fortaleza. Versículos, oraciones y palabras de esperanza para cada día.</p>

          <div style={{ background: "linear-gradient(135deg, #7B3F6E 0%, #9B7FD4 100%)", borderRadius: 18, padding: "24px 18px", marginBottom: 14, textAlign: "center", color: "#fff" }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>🕊️</div>
            <p style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.7, margin: "0 0 12px", fontStyle: "italic" }}>"{versiculos[versiculoIdx].texto}"</p>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.8)", margin: 0 }}>— {versiculos[versiculoIdx].ref}</p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 14 }}>
              <button onClick={() => setVersiculoIdx(i => (i - 1 + versiculos.length) % versiculos.length)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 20, color: "#fff", padding: "7px 16px", cursor: "pointer", fontSize: 13 }}>← Anterior</button>
              <button onClick={() => setVersiculoIdx(i => (i + 1) % versiculos.length)} style={{ background: "rgba(255,255,255,0.2)", border: "none", borderRadius: 20, color: "#fff", padding: "7px 16px", cursor: "pointer", fontSize: 13 }}>Siguiente →</button>
            </div>
          </div>

          <div style={s.card}>
            <h2 style={s.h2}>📖 Versículos para el dolor</h2>
            {versiculos.map((v, i) => (
              <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${palette.purpleLight}` }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: palette.ciruela, marginBottom: 3 }}>{v.ref}</div>
                <div style={{ fontSize: 13, color: palette.textMuted, lineHeight: 1.6, fontStyle: "italic" }}>"{v.texto}"</div>
              </div>
            ))}
          </div>

          <div style={s.card}>
            <h2 style={s.h2}>🙏 Oraciones para ti</h2>
            <p style={{ ...s.p, marginBottom: 12 }}>Toca una oración para leerla.</p>
            {oraciones.map((or, i) => (
              <div key={i}>
                <div onClick={() => setOracionAbierta(oracionAbierta === i ? null : i)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: `1px solid ${palette.purpleLight}`, cursor: "pointer" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>{or.titulo}</span>
                  <span style={{ fontSize: 14, color: palette.purple }}>{oracionAbierta === i ? "▲" : "▼"}</span>
                </div>
                {oracionAbierta === i && (
                  <div style={{ background: palette.beige, borderRadius: 10, padding: "12px 14px", margin: "8px 0 4px", fontSize: 14, color: palette.textMuted, lineHeight: 1.8, fontStyle: "italic" }}>{or.texto}</div>
                )}
              </div>
            ))}
          </div>

          <div style={{ ...s.card, background: "linear-gradient(135deg, #F5EAF3 0%, #EDE7F6 100%)", border: `1px solid ${palette.lavender}` }}>
            <h2 style={{ ...s.h2, color: palette.ciruela }}>💜 Una palabra para hoy</h2>
            <p style={s.p}>Dios no prometió que el camino sería fácil, pero sí prometió que nunca lo caminarías sola. Tu dolor no te define — tu fe, tu valentía y tu amor propio sí.</p>
            <p style={{ ...s.p, marginTop: 8, fontWeight: 600, color: palette.purpleDark }}>Hoy eres suficiente. Mañana también lo serás. 🕊️</p>
          </div>
        </div>
      )}

      {/* ── RECURSOS ──────────────────────────────────────────────────────── */}
      {tab === "recursos" && (
        <div style={s.section}>
          <h1 style={s.h1}>Recursos útiles 🔗</h1>
          <p style={{ ...s.p, marginBottom: 16 }}>Una colección de recursos seleccionados para acompañarte en tu camino con la fibromialgia.</p>
          {recursos.map(cat => (
            <div key={cat.categoria} style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: cat.color, flexShrink: 0 }} />
                <span style={{ fontSize: 12, fontWeight: 600, color: palette.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>{cat.categoria}</span>
              </div>
              {cat.items.map(item => (
                <a key={item.nombre} href={item.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 14, background: palette.card, border: `1px solid ${palette.purpleLight}`, marginBottom: 8, boxShadow: `0 1px 6px ${palette.shadow}` }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: cat.color + "22", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16 }}>🔗</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: palette.text }}>{item.nombre}</div>
                      <div style={{ fontSize: 12, color: palette.textMuted }}>{item.desc}</div>
                    </div>
                    <span style={{ fontSize: 14, color: cat.color }}>→</span>
                  </div>
                </a>
              ))}
            </div>
          ))}
          <CTACard />
        </div>
      )}
    </div>
  );
}
