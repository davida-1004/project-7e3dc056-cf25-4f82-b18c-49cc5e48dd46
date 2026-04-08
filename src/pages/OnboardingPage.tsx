import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTrip } from "@/context/TripContext";
import {
  getCountriesForRegion,
  getRecommendedCountryRange,
  getRegionMeta,
} from "@/data/tripResults";
import { ChevronLeft } from "lucide-react";

interface QuestionConfig {
  key: "budget" | "duration" | "mood" | "region";
  title: string;
  options?: string[];
}

const questions: QuestionConfig[] = [
  {
    key: "budget",
    title: "총 예산이 얼마인가요?",
    options: ["~300만원", "300~500만원", "500~800만원", "800만원 이상"],
  },
  {
    key: "duration",
    title: "여행 기간을 자유롭게 정해보세요",
  },
  {
    key: "mood",
    title: "어떤 분위기를 원하세요?",
    options: ["🏖 리조트 휴양", "🏙 도시 관광", "🌿 자연·액티비티", "🎨 문화·미식"],
  },
  {
    key: "region",
    title: "여행 지역과 나라, 도시를 골라보세요",
    options: ["🇪🇺 유럽", "🌴 동남아", "🗾 일본·오키나와", "🏝 몰디브·하와이", "🗽 미주"],
  },
];

const MIN_DAYS = 3;
const MAX_DAYS = 30;
const MIN_BUDGET = 200;
const MAX_BUDGET = 2000;

const formatBudget = (amount: number) => `${amount.toLocaleString()}만원`;
const formatBudgetLabel = (amount: number) => (amount > 0 ? formatBudget(amount) : "미정");

const formatDuration = (days: number) => {
  if (days >= 14 && days % 7 === 0) {
    return `${days / 7}주`;
  }

  if (days > 7) {
    return `${days}일 (${(days / 7).toFixed(1)}주)`;
  }

  return `${days}일`;
};

const OnboardingPage = () => {
  const [step, setStep] = useState(0);
  const [budgetDraft, setBudgetDraft] = useState("");
  const [durationDraft, setDurationDraft] = useState("");
  const budgetInputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const { answers, setAnswers } = useTrip();

  const current = questions[step];
  const currentRegion = answers.region || questions[3].options?.[0] || "🇪🇺 유럽";
  const regionMeta = getRegionMeta(currentRegion);
  const countries = getCountriesForRegion(currentRegion);

  const selectedValue = answers[current.key];
  const budgetAmount = answers.budgetAmount ?? 500;
  const durationDays = answers.durationDays ?? 7;

  useEffect(() => {
    setBudgetDraft(answers.budgetAmount > 0 ? String(answers.budgetAmount) : "");
  }, [answers.budgetAmount]);

  useEffect(() => {
    setDurationDraft(answers.durationDays > 0 ? String(answers.durationDays) : "");
  }, [answers.durationDays]);
  const countryCountGuide = getRecommendedCountryRange(durationDays);

  const goNext = () => {
    if (step < questions.length - 1) {
      setTimeout(() => setStep(step + 1), 120);
      return;
    }

    navigate("/loading");
  };

  const handleOptionSelect = (value: string) => {
    setAnswers((prev) => ({
      ...prev,
      [current.key]: value,
    }));
    goNext();
  };

  const handleBudgetChange = (amount: number) => {
    const safeAmount = Math.max(MIN_BUDGET, Math.min(MAX_BUDGET, amount));
    setAnswers((prev) => ({
      ...prev,
      budget: formatBudget(safeAmount),
      customBudget: formatBudget(safeAmount),
      budgetAmount: safeAmount,
    }));
  };

  const handleBudgetPresetClick = (amount: number) => {
    handleBudgetChange(amount);
    requestAnimationFrame(() => {
      budgetInputRef.current?.focus();
      budgetInputRef.current?.select();
    });
  };

  const handleBudgetInput = (value: string) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    setBudgetDraft(sanitized);

    if (!sanitized) {
      setAnswers((prev) => ({
        ...prev,
        budget: "",
        customBudget: "",
        budgetAmount: 0,
      }));
      return;
    }

    const parsed = Number(sanitized);
    if (!Number.isFinite(parsed) || parsed === 0) return;
    setAnswers((prev) => ({
      ...prev,
      budget: formatBudget(parsed),
      customBudget: formatBudget(parsed),
      budgetAmount: parsed,
    }));
  };

  const handleDurationChange = (days: number) => {
    const safeDays = Math.max(MIN_DAYS, Math.min(MAX_DAYS, days));
    setAnswers((prev) => ({
      ...prev,
      duration: formatDuration(safeDays),
      customDuration: `${safeDays}일`,
      durationDays: safeDays,
    }));
  };

  const handleDurationInput = (value: string) => {
    const sanitized = value.replace(/[^0-9]/g, "");
    setDurationDraft(sanitized);

    if (!sanitized) {
      setAnswers((prev) => ({
        ...prev,
        duration: "",
        customDuration: "",
        durationDays: 0,
      }));
      return;
    }

    const parsed = Number(sanitized);
    if (!Number.isFinite(parsed) || parsed === 0) return;

    handleDurationChange(parsed);
  };

  const handleRegionSelect = (region: string) => {
    setAnswers((prev) => ({
      ...prev,
      region,
      customRegion: "",
      selectedCountries: [],
      selectedCities: [],
    }));
  };

  const toggleCountry = (countryName: string) => {
    setAnswers((prev) => {
      const isSelected = prev.selectedCountries.includes(countryName);
      const nextCountries = isSelected
        ? prev.selectedCountries.filter((name) => name !== countryName)
        : [...prev.selectedCountries, countryName];

      const nextCities = isSelected
        ? prev.selectedCities.filter((city) => {
            const country = countries.find((item) => item.name === countryName);
            return !country?.cities.includes(city);
          })
        : prev.selectedCities;

      return {
        ...prev,
        selectedCountries: nextCountries,
        selectedCities: nextCities,
      };
    });
  };

  const toggleCity = (city: string, countryName: string) => {
    setAnswers((prev) => {
      const nextCountries = prev.selectedCountries.includes(countryName)
        ? prev.selectedCountries
        : [...prev.selectedCountries, countryName];

      const nextCities = prev.selectedCities.includes(city)
        ? prev.selectedCities.filter((name) => name !== city)
        : [...prev.selectedCities, city];

      return {
        ...prev,
        selectedCountries: nextCountries,
        selectedCities: nextCities,
      };
    });
  };

  const handleBack = () => {
    if (step === 0) {
      navigate("/");
      return;
    }

    setStep(step - 1);
  };

  const canContinueBudget = Boolean(answers.customBudget || answers.budget);
  const canContinueDuration = Boolean(answers.customDuration || answers.duration);
  const canContinueRegion = Boolean(answers.region && answers.selectedCountries.length > 0);

  return (
    <div className="mobile-container min-h-screen flex flex-col px-6 py-8">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={handleBack} className="p-2 -ml-2 rounded-full hover:bg-muted transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center">
          <ChevronLeft className="w-6 h-6 text-foreground" />
        </button>
        <span className="text-sm text-muted-foreground font-medium">Step {step + 1} / {questions.length}</span>
      </div>

      <div className="w-full h-2 bg-muted rounded-full mb-10 overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((step + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div key={step} className="flex-1 animate-slide-in pb-8">
        <h2 className="text-2xl font-bold text-foreground mb-3">{current.title}</h2>

        {current.key === "duration" && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              처음부터 자유롭게 정할 수 있게 바꿨어요. 숫자로 직접 입력하거나, 아래 슬라이더를 한 줄로 밀어서 조절해보세요.
            </p>

            <div className="rounded-3xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">직접 입력</p>
                  <input
                    type="number"
                    min={MIN_DAYS}
                    max={MAX_DAYS}
                    value={durationDraft}
                    onChange={(e) => handleDurationInput(e.target.value)}
                    className="w-28 rounded-2xl border-2 border-primary/30 bg-background px-4 py-3 text-xl font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                  />
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">현재 설정</p>
                  <p className="text-2xl font-bold text-foreground">{durationDays > 0 ? formatDuration(durationDays) : "미정"}</p>
                </div>
              </div>

              <input
                type="range"
                min={MIN_DAYS}
                max={MAX_DAYS}
                step={1}
                value={durationDays > 0 ? durationDays : 7}
                onChange={(e) => handleDurationChange(Number(e.target.value))}
                className="w-full accent-primary"
              />

            </div>

            <button
              onClick={goNext}
              disabled={!canContinueDuration}
              className="w-full rounded-2xl bg-primary px-5 py-4 text-base font-medium text-primary-foreground transition-opacity disabled:opacity-40"
            >
              이 기간으로 다음 단계 보기
            </button>
          </div>
        )}

        {current.key === "budget" && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              처음 단계에서 예산부터 편하게 잡아볼 수 있어요. 금액을 직접 입력하거나 슬라이더로 맞춰보세요.
            </p>

            <div className="rounded-3xl border border-border bg-card p-5 space-y-4">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">직접 입력</p>
                  <div className="flex items-center gap-2">
                    <input
                      ref={budgetInputRef}
                      type="number"
                      min={MIN_BUDGET}
                      max={MAX_BUDGET}
                      value={budgetDraft}
                      onChange={(e) => handleBudgetInput(e.target.value)}
                      className="w-32 rounded-2xl border-2 border-primary/30 bg-background px-4 py-3 text-xl font-semibold text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                    <span className="text-sm font-medium text-muted-foreground">만원</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground mb-1">현재 예산</p>
                  <p className="text-2xl font-bold text-foreground">{formatBudgetLabel(budgetAmount)}</p>
                </div>
              </div>

              <input
                type="range"
                min={MIN_BUDGET}
                max={MAX_BUDGET}
                step={50}
                value={Math.min(Math.max(budgetAmount || MIN_BUDGET, MIN_BUDGET), MAX_BUDGET)}
                onChange={(e) => handleBudgetChange(Number(e.target.value))}
                className="w-full accent-primary"
              />

              <div className="flex flex-wrap gap-2">
                {[300, 500, 800, 1200, 1600].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleBudgetPresetClick(preset)}
                    className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                      budgetAmount === preset
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background text-foreground"
                    }`}
                  >
                    {formatBudget(preset)}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={goNext}
              disabled={!canContinueBudget}
              className="w-full rounded-2xl bg-primary px-5 py-4 text-base font-medium text-primary-foreground transition-opacity disabled:opacity-40"
            >
              이 예산으로 다음 단계 보기
            </button>
          </div>
        )}

        {current.key === "mood" && current.options && (
          <div className="space-y-3">
            {current.options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionSelect(option)}
                className={`w-full text-left p-5 rounded-2xl text-lg font-medium transition-all min-h-[56px] border-2 ${
                  selectedValue === option
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/40"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {current.key === "region" && current.options && (
          <div className="space-y-5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              먼저 지역을 고르고, 그 안에서 원하는 나라와 도시를 여러 개 체크해보세요. 여행 기간은 현재 {formatDuration(durationDays)} 기준입니다.
            </p>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {current.options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleRegionSelect(option)}
                  className={`px-4 py-3 rounded-full text-sm font-medium whitespace-nowrap border transition-colors ${
                    answers.region === option
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="rounded-3xl border border-primary/20 bg-primary/10 p-5 space-y-3">
              <div>
                <p className="text-sm text-primary font-semibold mb-1">신혼부부 인기 코스</p>
                <p className="text-base font-semibold text-foreground">{regionMeta.honeymoonCourse}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                <span className="rounded-full bg-background px-3 py-1 border border-border">{countryCountGuide}</span>
                <span className="rounded-full bg-background px-3 py-1 border border-border">{regionMeta.countryAdvice}</span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">나라 선택</h3>
                <span className="text-sm text-muted-foreground">복수 선택 가능</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {countries.map((country) => {
                  const isSelected = answers.selectedCountries.includes(country.name);

                  return (
                    <button
                      key={country.name}
                      onClick={() => toggleCountry(country.name)}
                      className={`rounded-3xl border p-4 text-left transition-all shadow-sm ${
                        isSelected
                          ? "border-primary bg-primary/10 shadow-primary/10"
                          : "border-border bg-card hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold text-foreground">{country.emoji} {country.name}</p>
                          <p className="mt-1 text-sm text-muted-foreground">
                            많이 가는 코스: {country.cities.slice(0, 3).join(" - ")}
                          </p>
                        </div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            isSelected
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted text-muted-foreground"
                          }`}
                        >
                          {isSelected ? "선택됨" : "선택하기"}
                        </span>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {country.cities.map((city) => (
                          <span key={city} className="rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground">
                            {city}
                          </span>
                        ))}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-foreground">도시 코스 선택</h3>
                <span className="text-sm text-muted-foreground">나라를 고르면 도시가 더 선명해져요</span>
              </div>
              <div className="space-y-3">
                {(answers.selectedCountries.length > 0
                  ? countries.filter((country) => answers.selectedCountries.includes(country.name))
                  : countries
                ).map((country) => (
                  <div key={country.name} className="rounded-3xl border border-border bg-card p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="font-semibold text-foreground">{country.emoji} {country.name}</p>
                        <p className="text-sm text-muted-foreground">
                          추천 도시 흐름: {country.cities.slice(0, 3).join(" - ")}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {country.cities.map((city) => {
                        const isSelected = answers.selectedCities.includes(city);

                        return (
                          <button
                            key={`${country.name}-${city}`}
                            onClick={() => toggleCity(city, country.name)}
                            className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-background text-foreground hover:border-primary/30"
                            }`}
                          >
                            {city}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-4 text-sm text-muted-foreground leading-relaxed">
              선택한 나라 {answers.selectedCountries.length}개
              {answers.selectedCountries.length > 0 ? `: ${answers.selectedCountries.join(", ")}` : ""}
              <br />
              선택한 도시 {answers.selectedCities.length}개
              {answers.selectedCities.length > 0 ? `: ${answers.selectedCities.join(", ")}` : ""}
            </div>

            <button
              onClick={goNext}
              disabled={!canContinueRegion}
              className="w-full rounded-2xl bg-primary px-5 py-4 text-base font-medium text-primary-foreground transition-opacity disabled:opacity-40"
            >
              이 조합으로 일정 추천 받기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OnboardingPage;
