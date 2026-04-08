import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "@/context/TripContext";
import { buildPersonalizedTripPlan } from "@/lib/personalizedTrip";
import { ChevronLeft } from "lucide-react";

const categories = ["전체", "아침", "점심", "저녁", "로맨틱", "현지 맛집"];

const RestaurantsPage = () => {
  const [filter, setFilter] = useState("전체");
  const navigate = useNavigate();
  const { answers } = useTrip();
  const data = buildPersonalizedTripPlan(answers);

  const filtered = filter === "전체"
    ? data.restaurants
    : data.restaurants.filter((r) => r.category === filter);

  return (
    <div className="mobile-container min-h-screen pb-8 bg-background">
      <div className="flex items-center gap-3 px-4 pt-6 pb-4">
        <button onClick={() => navigate("/results")} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-xl font-bold">🍽️ 이런 맛집 어때요?</h1>
          <p className="text-sm text-muted-foreground">{data.selectedCities.join(", ")} 기준 추천</p>
        </div>
      </div>

      <div className="px-4 flex gap-2 overflow-x-auto pb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap min-h-[44px] transition-colors ${
              filter === cat
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="px-4 space-y-3">
        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            이 지역 맛집 정보를 열심히 준비 중이에요 🙏
          </div>
        ) : (
          filtered.map((r, i) => (
            <div key={i} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{r.emoji}</span>
                  <h3 className="font-bold text-foreground">{r.name}</h3>
                </div>
                <span className="text-sm text-muted-foreground">⭐ {r.rating}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">🍽️ {r.dish}</p>
              <p className="text-sm text-muted-foreground">📍 {r.location}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RestaurantsPage;
