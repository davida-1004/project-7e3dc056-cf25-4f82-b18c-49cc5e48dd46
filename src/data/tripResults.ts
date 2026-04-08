export const tripResults: Record<string, {
  destination: string;
  flag: string;
  duration: string;
  budget: string;
  info: { label: string; value: string }[];
  mapCenter: { lat: number; lng: number };
  days: {
    day: number;
    slots: { time: string; emoji: string; place: string; desc: string }[];
  }[];
  transportTip: string;
  restaurants: {
    name: string;
    emoji: string;
    rating: number;
    dish: string;
    location: string;
    category: string;
  }[];
  tours: {
    name: string;
    duration: string;
    price: string;
    rating: number;
    desc: string;
    dayRec: string;
    url: string;
  }[];
}> = {
  default: {
    destination: "도쿄 · 오키나와",
    flag: "🇯🇵",
    duration: "6박 7일",
    budget: "약 450만원",
    info: [
      { label: "💴 환율", value: "1엔 = 약 9원" },
      { label: "🛂 비자", value: "무비자 90일" },
      { label: "🌸 최적 시기", value: "3~4월 벚꽃 시즌" },
      { label: "🗣️ 언어 팁", value: "영어 잘 안 통해요" },
    ],
    mapCenter: { lat: 35.6762, lng: 139.6503 },
    days: [
      {
        day: 1,
        slots: [
          { time: "오전", emoji: "✈️", place: "나리타 공항 도착", desc: "공항에서 호텔로 이동" },
          { time: "오후", emoji: "🏨", place: "시부야 호텔 체크인", desc: "짐 풀고 주변 산책" },
          { time: "저녁", emoji: "🍣", place: "스시 오마카세", desc: "신선한 초밥 코스 디너" },
        ],
      },
      {
        day: 2,
        slots: [
          { time: "오전", emoji: "⛩️", place: "메이지 신궁", desc: "도쿄 도심 속 고요한 신사" },
          { time: "오후", emoji: "🛍️", place: "하라주쿠 · 오모테산도", desc: "트렌디한 거리 쇼핑" },
          { time: "저녁", emoji: "🌃", place: "롯폰기 힐즈 전망대", desc: "도쿄 야경 감상" },
        ],
      },
      {
        day: 3,
        slots: [
          { time: "오전", emoji: "🎌", place: "아사쿠사 센소지", desc: "도쿄 대표 관광지" },
          { time: "오후", emoji: "🛒", place: "아메요코 시장", desc: "현지 시장 구경 & 간식" },
          { time: "저녁", emoji: "🍜", place: "라멘 골목", desc: "진한 돈코츠 라멘" },
        ],
      },
      {
        day: 4,
        slots: [
          { time: "오전", emoji: "✈️", place: "오키나와 이동", desc: "국내선으로 나하 공항" },
          { time: "오후", emoji: "🏖️", place: "리조트 체크인", desc: "바다가 보이는 리조트" },
          { time: "저녁", emoji: "🌅", place: "선셋 디너", desc: "해변에서 로맨틱 저녁" },
        ],
      },
      {
        day: 5,
        slots: [
          { time: "오전", emoji: "🐠", place: "츄라우미 수족관", desc: "세계 최대 수족관" },
          { time: "오후", emoji: "🏝️", place: "에메랄드 비치", desc: "투명한 바다에서 수영" },
          { time: "저녁", emoji: "🍖", place: "아구돼지 요리", desc: "오키나와 향토 요리" },
        ],
      },
      {
        day: 6,
        slots: [
          { time: "오전", emoji: "🤿", place: "스노클링 투어", desc: "산호초 스노클링 체험" },
          { time: "오후", emoji: "🏯", place: "슈리성 공원", desc: "류큐 왕국의 역사" },
          { time: "저녁", emoji: "🎶", place: "코쿠사이 거리", desc: "나하 번화가 즐기기" },
        ],
      },
      {
        day: 7,
        slots: [
          { time: "오전", emoji: "🛍️", place: "기념품 쇼핑", desc: "마지막 쇼핑 타임" },
          { time: "오후", emoji: "✈️", place: "귀국", desc: "나하 공항에서 출발" },
          { time: "저녁", emoji: "💕", place: "집", desc: "소중한 추억 정리" },
        ],
      },
    ],
    transportTip: "🚇 도쿄는 스이카 카드 하나면 모든 교통 해결! 오키나와는 렌터카 추천!",
    restaurants: [
      { name: "스시 사이토", emoji: "🍣", rating: 4.8, dish: "오마카세 코스", location: "긴자", category: "저녁" },
      { name: "이치란 라멘", emoji: "🍜", rating: 4.5, dish: "돈코츠 라멘", location: "시부야", category: "점심" },
      { name: "츠키지 소바", emoji: "🥢", rating: 4.3, dish: "수제 소바", location: "츠키지", category: "아침" },
      { name: "아프레소 카페", emoji: "☕", rating: 4.6, dish: "플랫 화이트", location: "오모테산도", category: "아침" },
      { name: "로보숑", emoji: "🍷", rating: 4.9, dish: "프렌치 코스", location: "에비스", category: "로맨틱" },
      { name: "소키소바 명가", emoji: "🍲", rating: 4.4, dish: "오키나와 소키소바", location: "나하", category: "현지 맛집" },
      { name: "야키니쿠 호르몬", emoji: "🥩", rating: 4.5, dish: "와규 구이", location: "신주쿠", category: "저녁" },
      { name: "마루카메 우동", emoji: "🍜", rating: 4.2, dish: "가마타마 우동", location: "시부야", category: "점심" },
    ],
    tours: [
      { name: "도쿄 야경 크루즈", duration: "2시간", price: "₩45,000", rating: 4.7, desc: "도쿄만의 화려한 야경을 즐기는 크루즈", dayRec: "Day 2 저녁 추천", url: "https://www.myrealtip.com" },
      { name: "츠키지 시장 푸드 투어", duration: "3시간", price: "₩60,000", rating: 4.8, desc: "현지 가이드와 함께하는 시장 미식 투어", dayRec: "Day 3 오전 추천", url: "https://www.myrealtip.com" },
      { name: "하코네 온천 당일치기", duration: "10시간", price: "₩85,000", rating: 4.6, desc: "후지산 뷰와 함께하는 온천 힐링", dayRec: "Day 3 종일 추천", url: "https://www.myrealtip.com" },
      { name: "오키나와 스노클링", duration: "4시간", price: "₩55,000", rating: 4.9, desc: "케라마 제도 산호초 스노클링", dayRec: "Day 6 오전 추천", url: "https://www.myrealtip.com" },
      { name: "류큐 문화 체험", duration: "2시간", price: "₩30,000", rating: 4.4, desc: "전통 의상 체험과 시사 만들기", dayRec: "Day 5 오후 추천", url: "https://www.myrealtip.com" },
      { name: "나하 선셋 카약", duration: "1.5시간", price: "₩40,000", rating: 4.7, desc: "바다 위에서 즐기는 로맨틱 선셋", dayRec: "Day 4 저녁 추천", url: "https://www.myrealtip.com" },
    ],
  },
};
