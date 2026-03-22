import { useState } from "react";
import { OSOverlay } from "@/components/OSOverlay";

// Три разных котика по одному
const CAT_IMGS = [
  "https://cdn.poehali.dev/projects/c5bbe236-1c46-486c-8e5e-972057289e8b/files/13aad504-b24f-455a-9c0f-6f690ddd4c36.jpg",
  "https://cdn.poehali.dev/projects/c5bbe236-1c46-486c-8e5e-972057289e8b/files/e304be7b-10b5-4d1c-afbd-1f1a91375f07.jpg",
  "https://cdn.poehali.dev/projects/c5bbe236-1c46-486c-8e5e-972057289e8b/files/3ebcb049-efd0-4548-bfd9-9c1be5c13fa2.jpg",
];

// Пиксельная клубника SVG
function PixelStrawberry({ size = 22 }: { size?: number }) {
  const s = size / 16;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: "pixelated" }}>
      {/* Листики */}
      <rect x="5" y="1" width="2" height="2" fill="#4caf50" />
      <rect x="9" y="1" width="2" height="2" fill="#4caf50" />
      <rect x="7" y="0" width="2" height="3" fill="#66bb6a" />
      <rect x="4" y="2" width="8" height="1" fill="#66bb6a" />
      {/* Тело */}
      <rect x="4" y="3" width="8" height="1" fill="#ff5252" />
      <rect x="3" y="4" width="10" height="1" fill="#ff5252" />
      <rect x="3" y="5" width="10" height="1" fill="#ff5252" />
      <rect x="3" y="6" width="10" height="1" fill="#ff1744" />
      <rect x="4" y="7" width="8" height="1" fill="#ff1744" />
      <rect x="4" y="8" width="8" height="1" fill="#ff1744" />
      <rect x="5" y="9" width="6" height="1" fill="#d50000" />
      <rect x="5" y="10" width="6" height="1" fill="#d50000" />
      <rect x="6" y="11" width="4" height="1" fill="#d50000" />
      <rect x="7" y="12" width="2" height="1" fill="#b71c1c" />
      {/* Семечки */}
      <rect x="5" y="5" width="1" height="1" fill="#fff9c4" />
      <rect x="8" y="4" width="1" height="1" fill="#fff9c4" />
      <rect x="11" y="5" width="1" height="1" fill="#fff9c4" />
      <rect x="4" y="7" width="1" height="1" fill="#fff9c4" />
      <rect x="7" y="7" width="1" height="1" fill="#fff9c4" />
      <rect x="10" y="7" width="1" height="1" fill="#fff9c4" />
      <rect x="6" y="9" width="1" height="1" fill="#fff9c4" />
      <rect x="9" y="9" width="1" height="1" fill="#fff9c4" />
    </svg>
  );
}

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

// --- статичные массивы (вне компонента, чтоб не пересчитывались) ---

const SAKURA_PETALS = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  size: 9 + Math.random() * 16,
  duration: `${4 + Math.random() * 6}s`,
  delay: `${Math.random() * 9}s`,
  color: ["#ffb7d5","#ffc9df","#ff8fab","#ffd6e8","#e8a0bf","#ffcce8","#f9a8c9"][i % 7],
  sway: Math.round(20 + Math.random() * 90),
}));

// Клубнички: много, разные размеры, по всему экрану
const STRAWBERRIES = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  top: `${4 + Math.random() * 88}%`,
  left: `${2 + Math.random() * 92}%`,
  size: Math.round(18 + Math.random() * 22),
  duration: `${2.8 + Math.random() * 3}s`,
  delay: `${Math.random() * 5}s`,
}));

// Сердечки (немного)
const BG_HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  top: `${5 + Math.random() * 88}%`,
  left: `${3 + Math.random() * 90}%`,
  size: 14 + Math.random() * 20,
  color: ["#e8527a","#ff8fab","#c94b7b","#ff6b9d","#ffb3cc"][i % 5],
  duration: `${3 + Math.random() * 3}s`,
  delay: `${Math.random() * 4}s`,
}));

// Котики: по одному, разные картинки, без фигур, НА ЗАДНЕМ ПЛАНЕ (z-index < текста)
const CHIBIS = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  top: `${5 + Math.random() * 82}%`,
  left: `${2 + Math.random() * 88}%`,
  size: Math.round(56 + Math.random() * 44),
  delay: `${Math.random() * 4}s`,
  duration: `${3 + Math.random() * 2.5}s`,
  img: CAT_IMGS[i % CAT_IMGS.length],
}));

// Виджеты
const WIDGETS = [
  { emoji: "😻", label: "люблю тебя", color: "rgba(255,220,235,0.88)", top: "7%",  left: "3%" },
  { emoji: "🐾", label: "лапки",      color: "rgba(255,235,210,0.88)", top: "13%", left: "80%" },
  { emoji: "🌸", label: "цветочек",   color: "rgba(255,230,240,0.88)", top: "4%",  left: "46%" },
  { emoji: "💕", label: "обнимашки",  color: "rgba(255,215,240,0.88)", top: "84%", left: "40%" },
  { emoji: "😽", label: "поцелуйчик", color: "rgba(220,235,255,0.88)", top: "78%", left: "5%" },
  { emoji: "🎀", label: "милашка",    color: "rgba(255,210,230,0.88)", top: "75%", left: "80%" },
];

const CELEB_CATS = Array.from({ length: 24 }, (_, i) => ({
  id: i,
  top: `${Math.random() * 90}%`,
  left: `${Math.random() * 90}%`,
  size: Math.round(50 + Math.random() * 40),
  delay: `${Math.random() * 0.8}s`,
  dur: `${1.2 + Math.random() * 0.8}s`,
  img: CAT_IMGS[i % CAT_IMGS.length],
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
          background: "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(255,195,220,0.28) 0%, transparent 80%)",
        }} />

        {/* Котики — самый нижний слой z-5 */}
        {CHIBIS.map((c) => (
          <div key={c.id} className="absolute select-none pointer-events-none" style={{
            zIndex: 2,
            top: c.top, left: c.left, width: c.size, height: c.size,
            animation: `floatItem ${c.duration} ease-in-out ${c.delay} infinite alternate`,
          }}>
            <img
              src={c.img}
              alt=""
              style={{
                width: "100%", height: "100%",
                objectFit: "contain",
                mixBlendMode: "multiply",
                opacity: 0.88,
                filter: "drop-shadow(0 3px 8px rgba(220,80,130,0.22))",
              }}
            />
          </div>
        ))}

        {/* Клубнички z-10 */}
        {STRAWBERRIES.map((s) => (
          <div key={s.id} className="absolute select-none pointer-events-none" style={{
            zIndex: 10,
            top: s.top, left: s.left,
            animation: `floatItem ${s.duration} ease-in-out ${s.delay} infinite alternate`,
          }}>
            <PixelStrawberry size={s.size} />
          </div>
        ))}

        {/* Сердечки z-10 */}
        {BG_HEARTS.map((h) => (
          <div key={h.id} className="absolute select-none pointer-events-none" style={{
            zIndex: 10,
            top: h.top, left: h.left,
            animation: `floatItem ${h.duration} ease-in-out ${h.delay} infinite alternate`,
          }}>
            <PixelHeart size={h.size} color={h.color} />
          </div>
        ))}

        {/* Падающая сакура z-20 */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 20 }}>
          {SAKURA_PETALS.map((p) => (
            <div key={p.id} className="absolute top-0" style={{
              left: p.left,
              animation: `sakuraFall ${p.duration} linear ${p.delay} infinite`,
              ["--sway" as string]: `${p.sway}px`,
            }}>
              <PixelSakura size={p.size} color={p.color} />
            </div>
          ))}
        </div>

        {/* Виджеты z-25 */}
        {!loved && WIDGETS.map((w, i) => (
          <div key={i} className="absolute select-none pointer-events-none rounded-2xl flex flex-col items-center justify-center gap-1" style={{
            zIndex: 25,
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

        {/* Основной контент — самый верхний z-50 */}
        <div className="relative flex flex-col items-center gap-8 px-6 text-center" style={{ zIndex: 50 }}>
          {!loved ? (
            <>
              {/* Заголовок */}
              <div className="relative inline-block">
                <div className="absolute rounded-3xl" style={{
                  inset: "-28px -40px",
                  background: "rgba(255,255,255,0.97)",
                  filter: "blur(24px)",
                }} />
                <div className="absolute rounded-full" style={{
                  inset: "-10px -20px",
                  background: "radial-gradient(ellipse, rgba(220,80,130,0.22) 0%, transparent 80%)",
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
                  zIndex: 5,
                  top: cat.top, left: cat.left,
                  width: cat.size, height: cat.size,
                  animation: `celebItem ${cat.dur} ease-out ${cat.delay} forwards`,
                  opacity: 0,
                }}>
                  <img src={cat.img} alt="" style={{
                    width: "100%", height: "100%",
                    objectFit: "contain",
                    mixBlendMode: "multiply",
                    filter: "drop-shadow(0 3px 8px rgba(220,80,130,0.25))",
                  }} />
                </div>
              ))}

              <div className="relative inline-block" style={{ zIndex: 50 }}>
                <div className="absolute rounded-3xl" style={{
                  inset: "-28px -40px",
                  background: "rgba(255,255,255,0.97)",
                  filter: "blur(24px)",
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

              <div className="animate-bounce" style={{ fontSize: "5rem", filter: "drop-shadow(0 0 20px rgba(200,60,120,0.5))", zIndex: 50 }}>
                😻
              </div>

              <p style={{
                fontFamily: "'Sacramento', cursive",
                fontSize: "2.6rem",
                color: "#b8305a",
                textShadow: "0 2px 0 rgba(255,255,255,1), 0 4px 14px rgba(200,60,100,0.18)",
                position: "relative",
                zIndex: 50,
              }}>
                Ты самый лучший котик в моей жизни 🐾
              </p>

              <div className="flex gap-4 flex-wrap justify-center items-center" style={{ zIndex: 50, position: "relative" }}>
                {[20, 24, 18, 22, 16, 26, 18, 20, 14, 22].map((size, i) => (
                  <div key={i} style={{ animation: `floatItem ${1.8 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate` }}>
                    {i % 2 === 0
                      ? <PixelHeart size={size} color={["#d63c68","#ff7aa0","#c0365e","#e8527a"][i % 4]} />
                      : <PixelStrawberry size={size + 4} />}
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setLoved(false); setNoCount(0); setYesScale(1); }}
                className="mt-2 opacity-50 hover:opacity-100 transition-opacity"
                style={{ fontFamily: "'Pacifico', cursive", fontSize: "0.7rem", color: "#b8305a", position: "relative", zIndex: 50 }}
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
          0%   { opacity: 0; transform: scale(0.3) rotate(-15deg); }
          50%  { opacity: 1; }
          100% { opacity: 0.88; transform: scale(1.1) rotate(6deg); }
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
