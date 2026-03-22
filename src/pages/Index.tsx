import { useState, useEffect } from "react";
import { OSOverlay } from "@/components/OSOverlay";
import { Dock } from "@/components/Dock";

const CATS = ["🐱", "🐈", "😸", "😺", "😻", "🐾", "😽", "🙀", "😹", "🐈‍⬛"];

function FloatingCat({ emoji, style }: { emoji: string; style: React.CSSProperties }) {
  return (
    <div
      className="absolute select-none pointer-events-none animate-bounce-slow"
      style={{ fontSize: "2rem", ...style }}
    >
      {emoji}
    </div>
  );
}

function generateCats(count: number) {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    emoji: CATS[i % CATS.length],
    top: `${Math.random() * 90}%`,
    left: `${Math.random() * 90}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${2 + Math.random() * 2}s`,
    fontSize: `${1.2 + Math.random() * 1.8}rem`,
    opacity: 0.6 + Math.random() * 0.4,
  }));
}

const bgCats = generateCats(30);

export default function HomePage() {
  const [noCount, setNoCount] = useState(0);
  const [loved, setLoved] = useState(false);
  const [yesScale, setYesScale] = useState(1);
  const [celebCats] = useState(() => generateCats(40));

  const handleNo = () => {
    setNoCount((c) => c + 1);
    setYesScale((s) => s + 0.3);
  };

  const handleYes = () => {
    setLoved(true);
  };

  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #fff0f6 0%, #ffe4f0 40%, #f8e1ff 100%)" }}
      >
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
              animationDelay: cat.animationDelay,
              animationDuration: cat.animationDuration,
              animation: `floatCat ${cat.animationDuration} ease-in-out ${cat.animationDelay} infinite alternate`,
            }}
          >
            {cat.emoji}
          </div>
        ))}

        {/* Основной контент */}
        <div className="relative z-10 flex flex-col items-center gap-8 px-6 text-center">
          {!loved ? (
            <>
              {/* Заголовок с сиянием */}
              <div className="relative inline-block">
                {/* Glow слои */}
                <div
                  className="absolute inset-0 blur-2xl opacity-60 rounded-full"
                  style={{ background: "radial-gradient(ellipse, #ff85c8 0%, #c77dff 60%, transparent 100%)" }}
                />
                <div
                  className="absolute inset-0 blur-md opacity-40 rounded-full"
                  style={{ background: "radial-gradient(ellipse, #ffb3de 0%, #e0aaff 70%, transparent 100%)" }}
                />
                <h1
                  className="relative text-5xl md:text-6xl px-8 py-4"
                  style={{
                    fontFamily: "'Pacifico', cursive",
                    background: "linear-gradient(135deg, #ff4da6 0%, #c44dff 50%, #ff4da6 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 2px 12px rgba(196, 77, 255, 0.5))",
                    lineHeight: 1.2,
                  }}
                >
                  Ты мною дорожишь?
                </h1>
              </div>

              {/* Кнопки */}
              <div className="flex items-center gap-6 flex-wrap justify-center mt-4">
                {/* Кнопка ДА */}
                <button
                  onClick={handleYes}
                  className="relative rounded-full text-white font-bold shadow-lg transition-all duration-500 px-8 py-4"
                  style={{
                    fontFamily: "'Pacifico', cursive",
                    fontSize: `${1 + (yesScale - 1) * 0.5}rem`,
                    transform: `scale(${yesScale})`,
                    transformOrigin: "center",
                    background: "linear-gradient(135deg, #ff4da6, #c44dff)",
                    boxShadow: "0 0 24px rgba(255, 77, 166, 0.6), 0 4px 20px rgba(0,0,0,0.15)",
                  }}
                >
                  <span className="relative z-10">Да 🐾</span>
                  {/* Кнопка-сияние */}
                  <div
                    className="absolute inset-0 rounded-full blur-md opacity-50"
                    style={{ background: "linear-gradient(135deg, #ff4da6, #c44dff)" }}
                  />
                </button>

                {/* Кнопка НЕТ */}
                {noCount < 8 && (
                  <button
                    onClick={handleNo}
                    className="rounded-full border-2 font-medium px-6 py-3 transition-all duration-300 hover:scale-95 active:scale-90"
                    style={{
                      fontFamily: "'Pacifico', cursive",
                      fontSize: "0.9rem",
                      borderColor: "#d1a0d8",
                      color: "#a060b0",
                      background: "rgba(255,255,255,0.6)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    {noCount === 0 ? "Нет" : noCount < 3 ? "Нет..." : noCount < 6 ? "Ну нет 🙁" : "Точно нет?"}
                  </button>
                )}
              </div>

              {noCount > 0 && (
                <p
                  className="text-pink-400 animate-pulse"
                  style={{ fontFamily: "'Sacramento', cursive", fontSize: "1.6rem" }}
                >
                  {noCount < 3 ? "Ты уверен(а)? 🐱" : noCount < 6 ? "Котики расстроены... 😿" : "Ладно, последний шанс! 😸"}
                </p>
              )}
            </>
          ) : (
            /* Экран поздравления */
            <div className="flex flex-col items-center gap-6 animate-fade-in">
              {/* Дождь из котиков */}
              {celebCats.slice(0, 20).map((cat) => (
                <div
                  key={cat.id}
                  className="absolute"
                  style={{
                    top: cat.top,
                    left: cat.left,
                    fontSize: cat.fontSize,
                    animation: `celebCat ${1.5 + Math.random()}s ease-out forwards`,
                    opacity: 0,
                  }}
                >
                  {cat.emoji}
                </div>
              ))}

              {/* Заголовок поздравления */}
              <div className="relative inline-block">
                <div
                  className="absolute inset-0 blur-3xl opacity-70 rounded-full scale-150"
                  style={{ background: "radial-gradient(ellipse, #ff85c8 0%, #c77dff 60%, transparent 100%)" }}
                />
                <h1
                  className="relative text-4xl md:text-5xl px-8 py-4"
                  style={{
                    fontFamily: "'Pacifico', cursive",
                    background: "linear-gradient(135deg, #ff4da6 0%, #c44dff 50%, #ff85c8 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    filter: "drop-shadow(0 2px 16px rgba(196, 77, 255, 0.6))",
                    lineHeight: 1.3,
                  }}
                >
                  Я тебя тоже люблю! 💕
                </h1>
              </div>

              <div
                className="text-6xl animate-bounce"
                style={{ filter: "drop-shadow(0 0 16px rgba(255, 100, 180, 0.8))" }}
              >
                😻
              </div>

              <p
                className="text-2xl text-pink-500"
                style={{ fontFamily: "'Sacramento', cursive", fontSize: "2rem" }}
              >
                Ты самый лучший котик в моей жизни 🐾
              </p>

              <div className="flex gap-3 flex-wrap justify-center text-3xl">
                {["😸", "🐱", "😻", "🐾", "😽", "🐈", "💕", "🌸", "😹", "🐈‍⬛"].map((e, i) => (
                  <span
                    key={i}
                    style={{
                      animation: `floatCat ${1.5 + i * 0.2}s ease-in-out ${i * 0.1}s infinite alternate`,
                    }}
                  >
                    {e}
                  </span>
                ))}
              </div>

              <button
                onClick={() => { setLoved(false); setNoCount(0); setYesScale(1); }}
                className="mt-4 text-pink-400 underline text-sm opacity-60 hover:opacity-100 transition-opacity"
                style={{ fontFamily: "'Pacifico', cursive", fontSize: "0.75rem" }}
              >
                Спросить снова 🔁
              </button>
            </div>
          )}
        </div>

        {/* Dock */}
        <div className="absolute bottom-4 z-10 w-full flex justify-center">
          <Dock />
        </div>
      </div>

      <OSOverlay />

      <style>{`
        @keyframes floatCat {
          from { transform: translateY(0px) rotate(-5deg); }
          to   { transform: translateY(-18px) rotate(5deg); }
        }
        @keyframes celebCat {
          0%   { opacity: 0; transform: translateY(-40px) scale(0.5); }
          30%  { opacity: 1; }
          100% { opacity: 0.8; transform: translateY(30px) scale(1.2); }
        }
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.9); }
          to   { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease-out forwards;
        }
      `}</style>
    </>
  );
}
