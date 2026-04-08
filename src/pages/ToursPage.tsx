import { useNavigate } from "react-router-dom";
import { tripResults } from "@/data/tripResults";
import { ChevronLeft } from "lucide-react";

const data = tripResults.default;

const ToursPage = () => {
  const navigate = useNavigate();

  return (
    <div className="mobile-container min-h-screen pb-8 bg-background">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <button onClick={() => navigate("/results")} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold">🎒 현지 인기 투어</h1>
      </div>

      {/* Tour Cards */}
      <div className="px-4 space-y-4">
        {data.tours.map((tour, i) => (
          <div key={i} className="bg-card border border-border rounded-2xl p-5">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-bold text-foreground text-lg">{tour.name}</h3>
              <span className="text-sm text-muted-foreground">⭐ {tour.rating}</span>
            </div>
            <div className="flex gap-3 text-sm text-muted-foreground mb-2">
              <span>⏱️ {tour.duration}</span>
              <span>💰 {tour.price}</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{tour.desc}</p>
            <div className="flex items-center justify-between">
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                {tour.dayRec}
              </span>
              <a
                href={tour.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-accent hover:underline"
              >
                마이리얼트립에서 보기 →
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToursPage;
