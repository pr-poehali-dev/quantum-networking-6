import { useState } from "react";
import { OSOverlay } from "@/components/OSOverlay";

const CHIBI_CAT_IMG = "https://cdn.poehali.dev/projects/c5bbe236-1c46-486c-8e5e-972057289e8b/files/ca6d9bf3-3c1a-4b0d-87c1-f63d6ccc710e.jpg";

// Пиксельное сердечко SVG
function PixelHeart({ size = 16, color = "#e8527a" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }} fill={color}>
      <rect x="1" y="2" width="2" height="1" /><rect x="3" y="1" width="2" height="1" />
      <rect x="7" y="2" width="2" height="1" /><rect x="5" y="1" width="2" height="1" />
      <rect x="1" y="3" width="8" height="2" /><rect x="2" y="5" width="6" height="2" />
      <rect x="3" y="7" width="4" height="1" /><rect x="4" y="8" width="2" height="1" />
    </svg>
  );
}

// Пиксельный лепесток сакуры
function PixelSakura({ size = 14, color = "#ffb7d5" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" style={{ imageRendering: "pixelated" }} fill={color}>
      <rect x="4" y="0" width="2" height="2" />
      <rect x="3" y="2" width="4" height="2" />
      <rect x="2" y="3" width="6" height="3" />
      <rect x="3" y="6" width="4" height="2" />
      <rect x="4" y="8" width="2" height="1" />
    </svg>
  );
}

// Пиксельная звёздочка
function PixelStar({ size = 12, color = "#ffcce0" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 9 9" style={{ imageRendering: "pixelated" }} fill={color}>
      <rect x="4" y="0" width="1" height="2" />
      <rect x="4" y="7" width="1" height="2" />
      <rect x="0" y="4" width="2" height="1" />
      <rect x="7" y="4" width="2" height="1" />
      <rect x="2" y="2" width="1" height="1" />
      <rect x="6" y="2" width="1" height="1" />
      <rect x="2" y="6" width="1" height="1" />
      <rect x="6" y="6" width="1" height="1" />
      <rect x="3" y="3" width="3" height="3" />
    </svg>
  );
}

// Падающие лепестки сакуры
const SAKURA_PETALS = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: 10 + Math.random() * 14,
  duration: `${5 + Math.random() * 5}s`,
  delay: `${Math.random() * 7}s`,
  color: ["#ffb7d5", "#ffc9df", "#ff8fab", "#ffd6e8", "#e8a0bf"][i % 5],
  sway: Math.round(30 + Math.random() * 70),
}));

// Пиксельные сердечки на фоне
const BG_HEARTS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  top: `${5 + Math.random() * 88}%`,
  left: `${3 + Math.random() * 90}%`,
  size: 14 + Math.random() * 24,
  color: ["#e8527a", "#ff8fab", "#ffb3cc", "#c94b7b", "#ff6b9d"][i % 5],
  duration: `${3 + Math.random() * 3}s`,
  delay: `${Math.random() * 4}s`,
}));

// Пиксельные звёздочки на фоне
const BG_STARS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 92}%`,
  size: 10 + Math.random() * 16,
  duration: `${2.5 + Math.random() * 3}s`,
  delay: `${Math.random() * 5}s`,
}));

// Чиби-котики
const CHIBIS = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  top: `${8 + Math.random() * 78}%`,
  left: `${4 + Math.random() * 88}%`,
  size: Math.round(44 + Math.random() * 36),
  delay: `${Math.random() * 4}s`,
  duration: `${3 + Math.random() * 2.5}s`,
}));

// Виджеты
const WIDGETS = [
  { emoji: "😻", label: "люблю тебя", color: "rgba(255,220,235,0.92)", top: "7%", left: "3%" },
  { emoji: "🐾", label: "лапки", color: "rgba(255,235,210,0.92)", top: "13%", left: "80%" },
  { emoji: "🌸", label: "цветочек", color: "rgba(255,230,240,0.92)", top: "4%", left: "46%" },
  { emoji: "💕", label: "обнимашки", color: "rgba(255,215,240,0.92)", top: "84%", left: "40%" },
  { emoji: "😽", label: "поцелуйчик", color: "rgba(220,235,255,0.92)", top: "78%", left: "5%" },
  { emoji: "🎀", label: "милашка", color: "rgba(255,210,230,0.92)", top: "75%", left: "80%" },
];

const CELEB_CATS = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 90}%`,
  size: Math.round(40 + Math.random() * 34),
  delay: `${Math.random() * 0.8}s`,
  dur: `${1.2 + Math.random() * 0.8}s`,
}));

export default function HomePage() {
  const [noCount, setNoCount] = useState(0);
  const [loved, setLoved] = useState(false);
  const [yesScale, setYesScale] = useState(1);

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "#fff5f8" }}
      >
        {/* Нежный градиент */}
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(255,195,220,0.3) 0%, transparent 80%)",
        }} />

        {/* Падающая пиксельная сакура */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-20">
          {SAKURA_PETALS.map((p) => (
            <div
              key={p.id}
              className="absolute top-0"
              style={{
                left: p.left,
                animation: `sakuraFall ${p.duration} linear ${p.delay} infinite`,
                ["--sway" as string]: `${p.sway}px`,
              }}
            >
              <PixelSakura size={p.size} color={p.color} />
            </div>
          ))}
        </div>

        {/* Пиксельные сердечки */}
        {BG_HEARTS.map((h) => (
          <div key={h.id} className="absolute select-none pointer-events-none z-10" style={{
            top: h.top, left: h.left,
            animation: `floatItem ${h.duration} ease-in-out ${h.delay} infinite alternate`,
          }}>
            <PixelHeart size={h.size} color={h.color} />
          </div>
        ))}

        {/* Пиксельные звёздочки */}
        {BG_STARS.map((s) => (
          <div key={s.id} className="absolute select-none pointer-events-none z-10" style={{
            top: s.top, left: s.left,
            animation: `floatItem ${s.duration} ease-in-out ${s.delay} infinite alternate`,
          }}>
            <PixelStar size={s.size} color="#ffb0cc" />
          </div>
        ))}

        {/* Чиби-котики */}
        {CHIBIS.map((c) => (
          <div key={c.id} className="absolute select-none pointer-events-none z-10" style={{
            top: c.top, left: c.left, width: c.size, height: c.size,
            animation: `floatItem ${c.duration} ease-in-out ${c.delay} infinite alternate`,
          }}>
            <img
              src={CHIBI_CAT_IMG}
              alt=""
              style={{
                width: "100%", height: "100%",
                objectFit: "cover",
                borderRadius: "50%",
                opacity: 0.8,
                filter: "drop-shadow(0 2px 6px rgba(220,80,130,0.25))",
              }}
            />
          </div>
        ))}

        {/* Виджеты */}
        {!loved && WIDGETS.map((w, i) => (
          <div key={i} className="absolute select-none pointer-events-none rounded-2xl flex flex-col items-center justify-center gap-1 z-10" style={{
            top: w.top, left: w.left,
            background: w.color,
            padding: "8px 14px",
            border: "1.5px solid rgba(255,255,255,0.95)",
            boxShadow: "0 4px 16px rgba(220,100,150,0.15)",
            animation: `floatItem ${3.5 + i * 0.3}s ease-in-out ${i * 0.35}s infinite alternate`,
          }}>
            <span style={{ fontSize: "1.5rem" }}>{w.emoji}</span>
            <span style={{ fontSize: "0.58rem", fontFamily: "'Pacifico', cursive", color: "#c04070", whiteSpace: "nowrap" }}>{w.label}</span>
          </div>
        ))}

        {/* Основной контент */}
        <div className="relative z-30 flex flex-col items-center gap-8 px-6 text-center">
          {!loved ? (
            <>
              {/* Заголовок с белой тенью */}
              <div className="relative inline-block">
                <div className="absolute rounded-3xl" style={{
                  inset: "-24px -36px",
                  background: "rgba(255,255,255,0.96)",
                  filter: "blur(22px)",
                }} />
                <div className="absolute rounded-full" style={{
                  inset: "-8px -18px",
                  background: "radial-gradient(ellipse, rgba(220,80,130,0.25) 0%, rgba(255,160,200,0.15) 60%, transparent 100%)",
                  filter: "blur(10px)",
                }} />
                <h1 className="relative px-8 py-4" style={{
                  fontFamily: "'Pacifico', cursive",
                  fontSize: "clamp(2.2rem, 6vw, 4rem)",
                  color: "#c0365e",
                  textShadow: "0 2px 0 rgba(255,255,255,1), 0 4px 18px rgba(200,50,100,0.2)",
                  lineHeight: 1.25,
                }}>
                  Ты мною дорожишь?
                </h1>
              </div>

              {/* Кнопки */}
              <div className="flex items-center gap-6 flex-wrap justify-center mt-2">
                <button
                  onClick={() => setLoved(true)}
                  className="relative rounded-full text-white transition-all duration-500 px-8 py-4"
                  style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: `${Math.min(1.05 + (yesScale - 1) * 0.4, 2.2)}rem`,
                    transform: `scale(${yesScale})`,
                    transformOrigin: "center",
                    background: "linear-gradient(135deg, #d63c68, #ff7aa0)",
                    boxShadow: "0 0 28px rgba(200,50,100,0.45), 0 4px 14px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.35)",
                  }}
                >
                  Да 🐾
                </button>

                {noCount < 8 && (
                  <button
                    onClick={() => { setNoCount(c => c + 1); setYesScale(s => s + 0.28); }}
                    className="rounded-full border-2 transition-all duration-300 hover:scale-95 active:scale-90 px-6 py-3"
                    style={{
                      fontFamily: "'Pacifico', cursive",
                      fontSize: "0.85rem",
                      borderColor: "#e090aa",
                      color: "#b03060",
                      background: "rgba(255,255,255,0.92)",
                      boxShadow: "0 2px 10px rgba(220,100,150,0.15)",
                    }}
                  >
                    {noCount === 0 ? "Нет" : noCount < 3 ? "Нет..." : noCount < 6 ? "Ну нет 🙁" : "Точно нет?"}
                  </button>
                )}
              </div>

              {noCount > 0 && (
                <p className="animate-pulse" style={{
                  fontFamily: "'Sacramento', cursive",
                  fontSize: "2.4rem",
                  color: "#b8305a",
                  textShadow: "0 2px 0 rgba(255,255,255,1), 0 4px 12px rgba(200,60,100,0.18)",
                }}>
                  {noCount < 3 ? "Ты уверен(а)? 🐱" : noCount < 6 ? "Котики расстроены... 😿" : "Ладно, последний шанс! 😸"}
                </p>
              )}
            </>
          ) : (
            /* Экран поздравления */
            <div className="flex flex-col items-center gap-6 animate-fade-in">
              {CELEB_CATS.map((cat) => (
                <div key={cat.id} className="absolute pointer-events-none" style={{
                  top: cat.top, left: cat.left,
                  width: cat.size, height: cat.size,
                  animation: `celebItem ${cat.dur} ease-out ${cat.delay} forwards`,
                  opacity: 0,
                }}>
                  <img src={CHIBI_CAT_IMG} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "50%" }} />
                </div>
              ))}

              <div className="relative inline-block">
                <div className="absolute rounded-3xl" style={{
                  inset: "-24px -36px",
                  background: "rgba(255,255,255,0.96)",
                  filter: "blur(22px)",
                }} />
                <div className="absolute rounded-full" style={{
                  inset: "-8px -18px",
                  background: "radial-gradient(ellipse, rgba(220,80,130,0.3) 0%, rgba(255,160,200,0.15) 60%, transparent 100%)",
                  filter: "blur(12px)",
                }} />
                <h1 className="relative px-8 py-4" style={{
                  fontFamily: "'Pacifico', cursive",
                  fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
                  color: "#c0365e",
                  textShadow: "0 2px 0 rgba(255,255,255,1), 0 4px 18px rgba(200,50,100,0.2)",
                  lineHeight: 1.3,
                }}>
                  Я тебя тоже люблю! 💕
                </h1>
              </div>

              <div className="animate-bounce" style={{ fontSize: "5rem", filter: "drop-shadow(0 0 20px rgba(200,60,120,0.5))" }}>
                😻
              </div>

              <p style={{
                fontFamily: "'Sacramento', cursive",
                fontSize: "2.6rem",
                color: "#b8305a",
                textShadow: "0 2px 0 rgba(255,255,255,1), 0 4px 14px rgba(200,60,100,0.18)",
              }}>
                Ты самый лучший котик в моей жизни 🐾
              </p>

              <div className="flex gap-4 flex-wrap justify-center items-center">
                {[20, 24, 18, 22, 16, 26, 18, 20, 14, 22].map((size, i) => (
                  <div key={i} style={{ animation: `floatItem ${1.8 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate` }}>
                    {i % 2 === 0
                      ? <PixelHeart size={size} color={["#d63c68","#ff7aa0","#c0365e","#e8527a"][i % 4]} />
                      : <PixelStar size={size} color="#ffb0cc" />}
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setLoved(false); setNoCount(0); setYesScale(1); }}
                className="mt-2 opacity-50 hover:opacity-100 transition-opacity"
                style={{ fontFamily: "'Pacifico', cursive", fontSize: "0.7rem", color: "#b8305a" }}
              >
                Спросить снова 🔁
              </button>
            </div>
          )}
        </div>
      </div>

      <OSOverlay />

      <style>{`
        @keyframes floatItem {
          from { transform: translateY(0px) rotate(-3deg); }
          to   { transform: translateY(-14px) rotate(3deg); }
        }
        @keyframes sakuraFall {
          0%   { transform: translateY(-20px) translateX(0px) rotate(0deg); opacity: 0; }
          8%   { opacity: 1; }
          92%  { opacity: 0.85; }
          100% { transform: translateY(105vh) translateX(var(--sway)) rotate(360deg); opacity: 0; }
        }
        @keyframes celebItem {
          0%   { opacity: 0; transform: scale(0.3) rotate(-20deg); }
          50%  { opacity: 1; }
          100% { opacity: 0.85; transform: scale(1.15) rotate(8deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in { animation: fade-in 0.7s ease-out forwards; }
      `}</style>
    </>
  );
}
