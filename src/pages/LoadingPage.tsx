import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const messages = [
  "✈️ 두 분의 여행을 준비하고 있어요...",
  "🗺️ 최적의 동선을 그리고 있어요...",
  "🍽️ 분위기 좋은 맛집을 찾고 있어요...",
  "💍 완벽한 신혼여행을 완성하고 있어요...",
];

const LoadingPage = () => {
  const [msgIndex, setMsgIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setMsgIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    const timer = setTimeout(() => {
      navigate("/results");
    }, 3000);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [navigate]);

  return (
    <div className="mobile-container min-h-screen flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Pulsing background */}
      <div className="absolute inset-0 gradient-hero animate-pulse-soft" />

      <div className="relative z-10 text-center space-y-8">
        <div className="text-7xl animate-float">✈️</div>
        <p className="text-xl font-medium text-foreground leading-relaxed min-h-[60px] transition-opacity duration-300">
          {messages[msgIndex]}
        </p>
        <div className="flex gap-2 justify-center">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full bg-primary animate-pulse-soft"
              style={{ animationDelay: `${i * 0.3}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
