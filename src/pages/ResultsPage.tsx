import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "@/context/TripContext";
import { getRegionMeta } from "@/data/tripResults";
import { buildPersonalizedTripPlan } from "@/lib/personalizedTrip";
import RouteMap from "@/components/RouteMap";
import ShareSheet from "@/components/ShareSheet";

const ResultsPage = () => {
  const navigate = useNavigate();
  const { answers } = useTrip();
  const [showShare, setShowShare] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);

  const data = buildPersonalizedTripPlan(answers);
  const regionMeta = getRegionMeta(answers.region || "🇪🇺 유럽");
  const routeQuery = encodeURIComponent(data.routePoints.map((point) => `${point.city} ${point.country}`).join(" -> "));
  const visibleDay = data.days[selectedDay] || data.days[0];

  useEffect(() => {
    if (selectedDay >= data.days.length) {
      setSelectedDay(0);
    }
  }, [data.days.length, selectedDay]);

  const displayDuration = data.duration;
  const displayDestination = data.destination;

  return (
    <div className="mobile-container min-h-screen pb-32 bg-background">
      {/* Section A — Summary Card */}
      <div className="mx-4 mt-6 p-6 rounded-3xl bg-primary/10 border border-primary/20">
        <div className="text-3xl mb-2">{data.flag}</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {displayDestination}
        </h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>📅 {displayDuration}</span>
          <span>💰 {data.budget}</span>
        </div>
        <p className="text-xs text-muted-foreground mt-3">
          신혼부부 인기 코스: {regionMeta.honeymoonCourse}
        </p>
        <p className="text-xs text-muted-foreground mt-2">{data.summaryNote}</p>
      </div>

      {/* Section B — Info Chips */}
      <div className="px-4 mt-6">
        {(data.selectedCountries.length > 0 || data.selectedCities.length > 0) && (
          <div className="mb-3 rounded-2xl bg-card border border-border p-4 space-y-2">
            {data.selectedCountries.length > 0 && (
              <p className="text-sm text-foreground">
                <span className="font-semibold">선택한 나라</span>
                <span className="text-muted-foreground"> {data.selectedCountries.join(", ")}</span>
              </p>
            )}
            {data.selectedCities.length > 0 && (
              <p className="text-sm text-foreground">
                <span className="font-semibold">선택한 도시 코스</span>
                <span className="text-muted-foreground"> {data.selectedCities.join(", ")}</span>
              </p>
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {data.info.map((item, i) => (
            <div key={i} className="px-3 py-2 rounded-xl bg-card border border-border text-sm">
              <span className="font-medium">{item.label}</span>
              <span className="text-muted-foreground ml-1">{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Section C — Map */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold text-foreground mb-3">🗺️ 여행 동선</h2>
        <RouteMap points={data.routePoints} />
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${routeQuery}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-primary/40"
          >
            전체 루트 지도에서 보기
          </a>
        </div>
        <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
          {data.days.map((d, i) => (
            <button
              key={i}
              onClick={() => setSelectedDay(i)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap min-h-[44px] transition-colors ${
                selectedDay === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              Day {d.day}
            </button>
          ))}
        </div>
      </div>

      {/* Section D — Timeline */}
      <div className="px-4 mt-6">
        <h2 className="text-lg font-bold text-foreground mb-4">📋 일정 타임라인</h2>
        <div key={visibleDay.day} className="mb-6">
          <h3 className="text-base font-semibold text-primary mb-3">Day {visibleDay.day}</h3>
          <div className="relative pl-6 border-l-2 border-primary/20 space-y-4">
            {visibleDay.slots.map((slot, si) => (
              <div key={si} className="relative">
                <div className="absolute -left-[25px] w-3 h-3 rounded-full bg-primary" />
                <div className="bg-card border border-border rounded-2xl p-4">
                  <div className="text-xs text-muted-foreground font-medium mb-1">{slot.time}</div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl">{slot.emoji}</span>
                    <span className="font-semibold text-foreground">{slot.place}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{slot.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Section E — Transport Tip */}
      <div className="mx-4 mt-4 p-5 rounded-2xl bg-accent/10 border border-accent/20">
        <p className="text-sm font-medium text-foreground">{data.transportTip}</p>
      </div>

      {/* Navigation to sub-pages */}
      <div className="px-4 mt-6 space-y-3">
        <button
          onClick={() => navigate("/restaurants")}
          className="w-full p-4 rounded-2xl bg-card border border-border text-left hover:border-primary/40 transition-colors min-h-[56px]"
        >
          <span className="text-lg">🍽️ 맛집 추천 보기</span>
        </button>
        <button
          onClick={() => navigate("/tours")}
          className="w-full p-4 rounded-2xl bg-card border border-border text-left hover:border-primary/40 transition-colors min-h-[56px]"
        >
          <span className="text-lg">🎒 현지 투어 보기</span>
        </button>
      </div>

      {/* Section F — Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border p-4">
        <div className="max-w-[430px] mx-auto flex gap-3">
          <button
            onClick={() => navigate("/onboarding")}
            className="flex-1 h-12 rounded-2xl border-2 border-border text-foreground font-medium hover:bg-muted transition-colors text-sm"
          >
            🔄 조건 다시 설정하기
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="flex-1 h-12 rounded-2xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity text-sm"
          >
            공유하기
          </button>
        </div>
      </div>

      {showShare && <ShareSheet onClose={() => setShowShare(false)} />}
    </div>
  );
};

export default ResultsPage;
