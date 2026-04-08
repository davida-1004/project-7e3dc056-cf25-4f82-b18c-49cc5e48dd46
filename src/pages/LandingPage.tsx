import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const LandingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  if (new URLSearchParams(location.search).get("trip")) {
    return <Navigate to={`/results${location.search}`} replace />;
  }

  return (
    <div className="mobile-container flex flex-col items-center justify-center min-h-screen px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-hero-strong opacity-10" />
      
      {/* Floating decorations */}
      <div className="absolute top-20 left-8 text-4xl animate-float opacity-40">✈️</div>
      <div className="absolute top-32 right-10 text-3xl animate-float opacity-30" style={{ animationDelay: "1s" }}>🏝️</div>
      <div className="absolute bottom-40 left-12 text-3xl animate-float opacity-30" style={{ animationDelay: "0.5s" }}>💍</div>
      <div className="absolute bottom-28 right-8 text-4xl animate-float opacity-40" style={{ animationDelay: "1.5s" }}>🌴</div>
      <div className="absolute top-1/2 right-6 text-2xl animate-float opacity-20" style={{ animationDelay: "2s" }}>🌊</div>

      {/* Content */}
      <div className="relative z-10 text-center space-y-6">
        <div className="text-6xl mb-4">💕</div>
        <h1 className="text-3xl font-bold leading-tight text-foreground">
          우리 둘만의 완벽한 신혼여행,
          <br />
          <span className="text-primary">5분이면 완성</span>
        </h1>
        <p className="text-muted-foreground text-lg leading-relaxed">
          예산·기간·취향만 말해주세요.
          <br />
          나머지는 저희가 할게요.
        </p>
        <Button
          onClick={() => navigate("/onboarding")}
          className="mt-8 w-full max-w-xs h-14 text-lg font-semibold rounded-2xl bg-primary text-primary-foreground hover:opacity-90 transition-opacity shadow-lg"
        >
          지금 바로 시작하기
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
