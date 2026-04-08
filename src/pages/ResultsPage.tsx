import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { tripResults } from "@/data/tripResults";
import ShareSheet from "@/components/ShareSheet";

const data = tripResults.default;

const ResultsPage = () => {
  const navigate = useNavigate();
  const [showShare, setShowShare] = useState(false);
  const [selectedDay, setSelectedDay] = useState(0);
  const [mapError, setMapError] = useState(false);

  return (
    <div className="mobile-container min-h-screen pb-32 bg-background">
      {/* Section A — Summary Card */}
      <div className="mx-4 mt-6 p-6 rounded-3xl bg-primary/10 border border-primary/20">
        <div className="text-3xl mb-2">{data.flag}</div>
        <h1 className="text-2xl font-bold text-foreground mb-2">{data.destination}</h1>
        <div className="flex gap-4 text-sm text-muted-foreground">
          <span>📅 {data.duration}</span>
          <span>💰 {data.budget}</span>
        </div>
      </div>

      {/* Section B — Info Chips */}
      <div className="px-4 mt-6">
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
        {mapError ? (
          <div className="rounded-2xl bg-muted p-8 text-center">
            <p className="text-muted-foreground">지도를 불러오지 못했어요. 새로고침 해주세요 🙏</p>
          </div>
        ) : (
          <div className="rounded-2xl overflow-hidden border border-border">
            <iframe
              title="여행 지도"
              width="100%"
              height="250"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/view?key=placeholder&center=${data.mapCenter.lat},${data.mapCenter.lng}&zoom=10`}
              onError={() => setMapError(true)}
            />
          </div>
        )}
        {/* Day chips */}
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
        {data.days.map((day) => (
          <div key={day.day} className="mb-6">
            <h3 className="text-base font-semibold text-primary mb-3">Day {day.day}</h3>
            <div className="relative pl-6 border-l-2 border-primary/20 space-y-4">
              {day.slots.map((slot, si) => (
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
        ))}
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
