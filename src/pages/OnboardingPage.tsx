import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "@/context/TripContext";
import { ChevronLeft } from "lucide-react";

interface QuestionConfig {
  key: "budget" | "duration" | "mood" | "region";
  title: string;
  options: string[];
  allowCustom?: boolean;
  customPlaceholder?: string;
  customKey?: "customDuration" | "customRegion";
}

const questions: QuestionConfig[] = [
  {
    key: "budget",
    title: "총 예산이 얼마인가요?",
    options: ["~300만원", "300~500만원", "500~800만원", "800만원 이상"],
  },
  {
    key: "duration",
    title: "여행 기간은 얼마나 생각하세요?",
    options: ["5일 이하", "6~8일", "9~12일", "2주 이상"],
    allowCustom: true,
    customPlaceholder: "예: 10일, 3주 등 직접 입력",
    customKey: "customDuration",
  },
  {
    key: "mood",
    title: "어떤 분위기를 원하세요?",
    options: ["🏖 리조트 휴양", "🏙 도시 관광", "🌿 자연·액티비티", "🎨 문화·미식"],
  },
  {
    key: "region",
    title: "선호하는 여행 지역은?",
    options: ["🇪🇺 유럽", "🌴 동남아", "🗾 일본·오키나와", "🏝 몰디브·하와이", "🗽 미주"],
    allowCustom: true,
    customPlaceholder: "예: 이탈리아, 그리스 등 직접 입력",
    customKey: "customRegion",
  },
];

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customValue, setCustomValue] = useState("");
  const { answers, setAnswers } = useTrip();
  const navigate = useNavigate();

  const current = questions[step];

  const handleSelect = (value: string) => {
    setShowCustomInput(false);
    setCustomValue("");
    setAnswers((prev) => ({
      ...prev,
      [current.key]: value,
      ...(current.customKey ? { [current.customKey]: "" } : {}),
    }));
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 150);
    } else {
      navigate("/loading");
    }
  };

  const handleCustomSubmit = () => {
    if (!customValue.trim()) return;
    setAnswers((prev) => ({
      ...prev,
      [current.key]: "직접 입력",
      ...(current.customKey ? { [current.customKey]: customValue.trim() } : {}),
    }));
    setShowCustomInput(false);
    setCustomValue("");
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 150);
    } else {
      navigate("/loading");
    }
  };

  const handleBack = () => {
    setShowCustomInput(false);
    setCustomValue("");
    if (step === 0) {
      navigate("/");
    } else {
      setStep(step - 1);
    }
  };

  const selectedValue = answers[current.key];

  return (
    <div className="mobile-container min-h-screen flex flex-col px-6 py-8">
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <span className="text-sm text-muted-foreground font-medium">Step {step + 1} / {questions.length}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full h-2 bg-muted rounded-full mb-10 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question */}
      <div key={step} className="flex-1 animate-slide-in">
        <h2 className="text-2xl font-bold text-foreground mb-8">{current.title}</h2>

        <div className="space-y-3">
          {current.options.map((option) => (
            <button
              key={option}
              onClick={() => handleSelect(option)}
              className={`w-full text-left p-5 rounded-2xl text-lg font-medium transition-all min-h-[56px] border-2 ${
                selectedValue === option
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card text-foreground hover:border-primary/40"
              }`}
            >
              {option}
            </button>
          ))}

          {/* Custom input toggle */}
          {current.allowCustom && !showCustomInput && (
            <button
              onClick={() => setShowCustomInput(true)}
              className="w-full text-left p-5 rounded-2xl text-lg font-medium transition-all min-h-[56px] border-2 border-dashed border-border bg-card text-muted-foreground hover:border-primary/40"
            >
              ✏️ 직접 입력하기
            </button>
          )}

          {/* Custom input field */}
          {current.allowCustom && showCustomInput && (
            <div className="space-y-3 animate-slide-in">
              <input
                type="text"
                value={customValue}
                onChange={(e) => setCustomValue(e.target.value)}
                placeholder={current.customPlaceholder}
                autoFocus
                onKeyDown={(e) => e.key === "Enter" && handleCustomSubmit()}
                className="w-full p-5 rounded-2xl text-lg font-medium border-2 border-primary bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
              />
              <div className="flex gap-3">
                <button
                  onClick={() => { setShowCustomInput(false); setCustomValue(""); }}
                  className="flex-1 p-4 rounded-2xl text-base font-medium border-2 border-border bg-card text-muted-foreground hover:bg-muted transition-colors min-h-[48px]"
                >
                  취소
                </button>
                <button
                  onClick={handleCustomSubmit}
                  disabled={!customValue.trim()}
                  className="flex-1 p-4 rounded-2xl text-base font-medium bg-primary text-primary-foreground hover:opacity-90 transition-opacity min-h-[48px] disabled:opacity-40"
                >
                  확인
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
