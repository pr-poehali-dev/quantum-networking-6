import { useState } from "react";
import { OSOverlay } from "@/components/OSOverlay";

const CATS = ["🐱", "🐈", "😸", "😺", "😻", "🐾", "😽", "🙀", "😹", "🐈‍⬛"];

function generateCats(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: CATS[i % CATS.length],
    top: `${5 + Math.random() * 88}%`,
    left: `${3 + Math.random() * 88}%`,
    animationDelay: `${Math.random() * 4}s`,
    animationDuration: `${2.5 + Math.random() * 2.5}s`,
    fontSize: `${1.4 + Math.random() * 2.2}rem`,
    opacity: 0.55 + Math.random() * 0.45,
    rotate: `${-20 + Math.random() * 40}deg`,
  }));
}

const bgCats = generateCats(50);

// Милые виджеты с котиком
function CatWidget({ emoji, label, color }: { emoji: string; label: string; color: string }) {
  return (
    <div
      className="absolute select-none pointer-events-none rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md"
      style={{
        background: color,
        padding: "8px 14px",
        backdropFilter: "blur(6px)",
        border: "1.5px solid rgba(255,255,255,0.8)",
      }}
    >
      <span style={{ fontSize: "1.5rem" }}>{emoji}</span>
      <span style={{ fontSize: "0.6rem", fontFamily: "'Pacifico', cursive", color: "#e47fa0", whiteSpace: "nowrap" }}>{label}</span>
    </div>
  );
}

const WIDGETS = [
  { emoji: "😻", label: "люблю тебя", color: "rgba(255,220,235,0.85)", top: "8%", left: "4%" },
  { emoji: "🐾", label: "лапки", color: "rgba(255,235,210,0.85)", top: "15%", left: "82%" },
  { emoji: "🐱", label: "мяу!", color: "rgba(230,220,255,0.85)", top: "72%", left: "6%" },
  { emoji: "🎀", label: "милашка", color: "rgba(255,210,230,0.85)", top: "78%", left: "78%" },
  { emoji: "🌸", label: "цветочек", color: "rgba(255,230,240,0.85)", top: "5%", left: "50%" },
  { emoji: "💕", label: "обнимашки", color: "rgba(255,215,240,0.85)", top: "85%", left: "42%" },
  { emoji: "😽", label: "поцелуйчик", color: "rgba(220,240,255,0.85)", top: "45%", left: "88%" },
  { emoji: "🐈", label: "котейка", color: "rgba(240,255,220,0.85)", top: "55%", left: "2%" },
];

export default function HomePage() {
  const [noCount, setNoCount] = useState(0);
  const [loved, setLoved] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [celebCats] = useState(() => generateCats(40));

  const handleNo = () => {
    setNoCount((c) => c + 1);
    setYesScale((s) => s + 0.28);
  };

  const handleYes = () => {
    setLoved(true);
  };

  return (
    <>
      <div
        className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "#ffffff" }}
      >
        {/* Лёгкий нежный градиент поверх белого */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(255,220,240,0.45) 0%, rgba(255,240,250,0.2) 60%, transparent 100%)",
          }}
        />

        {/* Фоновые котики */}
        {bgCats.map((cat) => (
          <div
            key={cat.id}
            className="absolute select-none pointer-events-none"
            style={{
              top: cat.top,
              left: cat.left,
              fontSize: cat.fontSize,
              opacity: cat.opacity,
              transform: `rotate(${cat.rotate})`,
              animation: `floatCat ${cat.animationDuration} ease-in-out ${cat.animationDelay} infinite alternate`,
            }}
          >
            {cat.emoji}
          </div>
        ))}

        {/* Милые виджеты */}
        {!loved && WIDGETS.map((w, i) => (
          <div
            key={i}
            className="absolute select-none pointer-events-none rounded-2xl flex flex-col items-center justify-center gap-1 shadow-md"
            style={{
              top: w.top,
              left: w.left,
              background: w.color,
              padding: "8px 14px",
              border: "1.5px solid rgba(255,255,255,0.9)",
              animation: `floatCat ${3 + i * 0.3}s ease-in-out ${i * 0.4}s infinite alternate`,
            }}
          >
            <span style={{ fontSize: "1.5rem" }}>{w.emoji}</span>
            <span style={{ fontSize: "0.58rem", fontFamily: "'Pacifico', cursive", color: "#e07aa0", whiteSpace: "nowrap" }}>{w.label}</span>
          </div>
        ))}

        {/* Основной контент */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          {!loved ? (
            <>
              {/* Заголовок с сиянием и белой тенью */}
              <div className="relative inline-block">
                {/* Белое свечение фон */}
                <div
                  className="absolute rounded-3xl"
                  style={{
                    inset: "-20px -30px",
                    background: "rgba(255,255,255,0.92)",
                    filter: "blur(18px)",
                    borderRadius: "40px",
                  }}
                />
                {/* Розовое сияние */}
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "-10px -20px",
                    background: "radial-gradient(ellipse, rgba(255,160,200,0.35) 0%, rgba(200,130,255,0.2) 60%, transparent 100%)",
                    filter: "blur(12px)",
                  }}
                />
                <h1
                  className="relative px-8 py-4"
                  style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: "clamp(2.2rem, 6vw, 4rem)",
                    color: "#ff8fab",
                    textShadow:
                      "0 0 30px rgba(255,180,210,0.9), 0 0 60px rgba(255,150,200,0.5), 0 2px 0 rgba(255,255,255,1), 0 4px 16px rgba(255,140,180,0.4)",
                    lineHeight: 1.25,
                  }}
                >
                  Ты мною дорожишь?
                </h1>
              </div>

              {/* Кнопки */}
              <div className="flex items-center gap-6 flex-wrap justify-center mt-2">
                {/* Кнопка ДА */}
                <button
                  onClick={handleYes}
                  className="relative rounded-full text-white font-bold transition-all duration-500 px-8 py-4"
                  style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: `${Math.min(1.1 + (yesScale - 1) * 0.4, 2.2)}rem`,
                    transform: `scale(${yesScale})`,
                    transformOrigin: "center",
                    background: "linear-gradient(135deg, #ff8fab, #ffb3cc)",
                    boxShadow:
                      "0 0 24px rgba(255,143,171,0.7), 0 4px 20px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.4)",
                    textShadow: "0 1px 2px rgba(200,60,100,0.3)",
                  }}
                >
                  Да 🐾
                </button>

                {/* Кнопка НЕТ */}
                {noCount < 8 && (
                  <button
                    onClick={handleNo}
                    className="rounded-full border-2 font-medium px-6 py-3 transition-all duration-300 hover:scale-95 active:scale-90"
                    style={{
                      fontFamily: "'Pacifico', cursive",
                      fontSize: "0.85rem",
                      borderColor: "#ffb3cc",
                      color: "#d07090",
                      background: "rgba(255,255,255,0.85)",
                      boxShadow: "0 2px 12px rgba(255,180,200,0.25)",
                    }}
                  >
                    {noCount === 0
                      ? "Нет"
                      : noCount < 3
                      ? "Нет..."
                      : noCount < 6
                      ? "Ну нет 🙁"
                      : "Точно нет?"}
                  </button>
                )}
              </div>

              {noCount > 0 && (
                <p
                  className="animate-pulse"
                  style={{
                    fontFamily: "'Sacramento', cursive",
                    fontSize: "1.8rem",
                    color: "#ffaac5",
                    textShadow: "0 2px 8px rgba(255,200,220,0.8), 0 0 20px rgba(255,180,210,0.5)",
                  }}
                >
                  {noCount < 3
                    ? "Ты уверен(а)? 🐱"
                    : noCount < 6
                    ? "Котики расстроены... 😿"
                    : "Ладно, последний шанс! 😸"}
                </p>
              )}
            </>
          ) : (
            /* Экран поздравления */
            <div className="flex flex-col items-center gap-6 animate-fade-in">
              {celebCats.slice(0, 25).map((cat) => (
                <div
                  key={cat.id}
                  className="absolute pointer-events-none"
                  style={{
                    top: cat.top,
                    left: cat.left,
                    fontSize: cat.fontSize,
                    animation: `celebCat ${1.5 + Math.random()}s ease-out ${Math.random() * 0.8}s forwards`,
                    opacity: 0,
                  }}
                >
                  {cat.emoji}
                </div>
              ))}

              {/* Заголовок */}
              <div className="relative inline-block">
                <div
                  className="absolute rounded-3xl"
                  style={{
                    inset: "-20px -30px",
                    background: "rgba(255,255,255,0.95)",
                    filter: "blur(18px)",
                  }}
                />
                <div
                  className="absolute rounded-full"
                  style={{
                    inset: "-10px -20px",
                    background: "radial-gradient(ellipse, rgba(255,160,200,0.5) 0%, rgba(200,130,255,0.3) 60%, transparent 100%)",
                    filter: "blur(14px)",
                  }}
                />
                <h1
                  className="relative px-8 py-4"
                  style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: "clamp(2rem, 5.5vw, 3.5rem)",
                    color: "#ff8fab",
                    textShadow:
                      "0 0 30px rgba(255,180,210,0.9), 0 0 60px rgba(255,150,200,0.5), 0 2px 0 rgba(255,255,255,1), 0 4px 16px rgba(255,140,180,0.4)",
                    lineHeight: 1.3,
                  }}
                >
                  Я тебя тоже люблю! 💕
                </h1>
              </div>

              <div
                className="animate-bounce"
                style={{
                  fontSize: "5rem",
                  filter: "drop-shadow(0 0 20px rgba(255, 100, 180, 0.8))",
                }}
              >
                😻
              </div>

              <p
                style={{
                  fontFamily: "'Sacramento', cursive",
                  fontSize: "2.2rem",
                  color: "#ffaac5",
                  textShadow: "0 2px 8px rgba(255,200,220,0.8), 0 0 24px rgba(255,180,210,0.5)",
                }}
              >
                Ты самый лучший котик в моей жизни 🐾
              </p>

              <div className="flex gap-3 flex-wrap justify-center">
                {["😸", "🐱", "😻", "🐾", "😽", "🐈", "💕", "🌸", "😹", "🐈‍⬛", "🎀", "✨"].map((e, i) => (
                  <span
                    key={i}
                    className="text-3xl"
                    style={{
                      animation: `floatCat ${1.8 + i * 0.15}s ease-in-out ${i * 0.1}s infinite alternate`,
                    }}
                  >
                    {e}
                  </span>
                ))}
              </div>

              <button
                onClick={() => {
                  setLoved(false);
                  setNoCount(0);
                  setYesScale(1);
                }}
                className="mt-2 transition-opacity hover:opacity-100 opacity-50"
                style={{
                  fontFamily: "'Pacifico', cursive",
                  fontSize: "0.7rem",
                  color: "#d090a0",
                }}
              >
                Спросить снова 🔁
              </button>
            </div>
          )}
        </div>
      </div>

      <OSOverlay />

      <style>{`
        @keyframes floatCat {
          from { transform: translateY(0px) rotate(-4deg); }
          to   { transform: translateY(-16px) rotate(4deg); }
        }
        @keyframes celebCat {
          0%   { opacity: 0; transform: translateY(-50px) scale(0.4) rotate(-15deg); }
          40%  { opacity: 1; }
          100% { opacity: 0.85; transform: translateY(40px) scale(1.3) rotate(10deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.92); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.7s ease-out forwards;
        }
      `}</style>
    </>
  );
}
