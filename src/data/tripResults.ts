export interface TripResult {
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
}

export interface CountryOption {
  name: string;
  emoji: string;
  cities: string[];
}

export interface RegionOption {
  honeymoonCourse: string;
  countryAdvice: string;
  countries: CountryOption[];
}

export const regionOptions: Record<string, RegionOption> = {
  "🇪🇺 유럽": {
    honeymoonCourse: "파리, 인터라켄, 루체른 코스로 많이 가요!",
    countryAdvice: "1주면 2개국, 2주면 3~4개국까지 여유 있게 묶기 좋아요.",
    countries: [
      { name: "프랑스", emoji: "🇫🇷", cities: ["파리", "니스", "몽생미셸", "리옹"] },
      { name: "스위스", emoji: "🇨🇭", cities: ["인터라켄", "루체른", "취리히", "체르마트"] },
      { name: "이탈리아", emoji: "🇮🇹", cities: ["로마", "피렌체", "베네치아", "아말피"] },
      { name: "오스트리아", emoji: "🇦🇹", cities: ["비엔나", "잘츠부르크", "할슈타트"] },
      { name: "스페인", emoji: "🇪🇸", cities: ["바르셀로나", "세비야", "마드리드"] },
    ],
  },
  "🌴 동남아": {
    honeymoonCourse: "발리, 우붓, 누사페니다 조합이 특히 인기예요!",
    countryAdvice: "휴양 중심이면 1~2개국, 투어를 넓히면 3개국도 충분히 가능해요.",
    countries: [
      { name: "인도네시아", emoji: "🇮🇩", cities: ["발리", "우붓", "누사페니다", "길리"] },
      { name: "태국", emoji: "🇹🇭", cities: ["방콕", "푸켓", "끄라비", "치앙마이"] },
      { name: "베트남", emoji: "🇻🇳", cities: ["다낭", "호이안", "나트랑", "푸꾸옥"] },
      { name: "싱가포르", emoji: "🇸🇬", cities: ["마리나베이", "센토사", "차이나타운"] },
      { name: "말레이시아", emoji: "🇲🇾", cities: ["코타키나발루", "쿠알라룸푸르", "랑카위"] },
    ],
  },
  "🗾 일본·오키나와": {
    honeymoonCourse: "도쿄, 교토, 오키나와처럼 도시와 휴양을 섞어 많이 가요!",
    countryAdvice: "1주면 2도시, 2주면 본토와 오키나와를 함께 넣기 좋아요.",
    countries: [
      { name: "일본", emoji: "🇯🇵", cities: ["도쿄", "교토", "오사카", "삿포로", "후쿠오카"] },
      { name: "오키나와", emoji: "🏝️", cities: ["나하", "온나손", "차탄", "미야코지마"] },
      { name: "홋카이도", emoji: "❄️", cities: ["오타루", "후라노", "비에이"] },
    ],
  },
  "🏝 몰디브·하와이": {
    honeymoonCourse: "몰디브 수상빌라나 하와이 섬 호핑 코스를 많이 선택해요!",
    countryAdvice: "휴양형 지역이라 1개 지역 집중 또는 2개 섬 조합이 가장 만족도가 높아요.",
    countries: [
      { name: "몰디브", emoji: "🇲🇻", cities: ["말레", "마푸시", "바아환초", "아리환초"] },
      { name: "하와이", emoji: "🇺🇸", cities: ["호놀룰루", "마우이", "카우아이", "빅아일랜드"] },
      { name: "보라카이", emoji: "🇵🇭", cities: ["화이트비치", "불라복", "디니위드"] },
    ],
  },
  "🗽 미주": {
    honeymoonCourse: "뉴욕과 칸쿤, 또는 LA와 하와이 연계 코스가 많아요!",
    countryAdvice: "거리 이동이 길어서 1주면 1~2개국, 2주면 3개 도시 이상도 가능합니다.",
    countries: [
      { name: "미국", emoji: "🇺🇸", cities: ["뉴욕", "LA", "샌프란시스코", "라스베이거스"] },
      { name: "멕시코", emoji: "🇲🇽", cities: ["칸쿤", "툴룸", "멕시코시티", "플라야 델 카르멘"] },
      { name: "캐나다", emoji: "🇨🇦", cities: ["밴쿠버", "퀘벡", "토론토", "밴프"] },
      { name: "페루", emoji: "🇵🇪", cities: ["리마", "쿠스코", "마추픽추"] },
    ],
  },
};

export const tripResults: Record<string, TripResult> = {
  "🇪🇺 유럽": {
    destination: "파리 · 스위스",
    flag: "🇫🇷🇨🇭",
    duration: "8박 9일",
    budget: "약 650만원",
    info: [
      { label: "💶 환율", value: "1유로 = 약 1,450원" },
      { label: "🛂 비자", value: "무비자 90일 (쉥겐)" },
      { label: "🌷 최적 시기", value: "5~6월 봄" },
      { label: "🗣️ 언어 팁", value: "영어 대부분 통해요" },
    ],
    mapCenter: { lat: 48.8566, lng: 2.3522 },
    days: [
      { day: 1, slots: [
        { time: "오전", emoji: "✈️", place: "샤를 드골 공항 도착", desc: "공항에서 시내 이동" },
        { time: "오후", emoji: "🏨", place: "마레 지구 호텔 체크인", desc: "파리 감성 가득한 거리 산책" },
        { time: "저녁", emoji: "🍷", place: "세느강 디너 크루즈", desc: "에펠탑 야경과 함께하는 저녁" },
      ]},
      { day: 2, slots: [
        { time: "오전", emoji: "🗼", place: "에펠탑", desc: "파리의 상징, 전망대 관람" },
        { time: "오후", emoji: "🎨", place: "오르세 미술관", desc: "인상주의 명작 감상" },
        { time: "저녁", emoji: "🥐", place: "몽마르트 언덕", desc: "사크레쾨르 성당 & 야경" },
      ]},
      { day: 3, slots: [
        { time: "오전", emoji: "🖼️", place: "루브르 박물관", desc: "모나리자를 직접 만나기" },
        { time: "오후", emoji: "🛍️", place: "샹젤리제 거리", desc: "명품 쇼핑 & 카페 타임" },
        { time: "저녁", emoji: "🍽️", place: "르 마레 레스토랑", desc: "프렌치 코스 디너" },
      ]},
      { day: 4, slots: [
        { time: "오전", emoji: "🏰", place: "베르사유 궁전", desc: "당일치기 궁전 투어" },
        { time: "오후", emoji: "🌳", place: "베르사유 정원", desc: "아름다운 프랑스식 정원" },
        { time: "저녁", emoji: "🥘", place: "라틴 쿼터 비스트로", desc: "현지 프렌치 비스트로" },
      ]},
      { day: 5, slots: [
        { time: "오전", emoji: "🚄", place: "TGV로 스위스 이동", desc: "파리 → 인터라켄" },
        { time: "오후", emoji: "🏔️", place: "인터라켄 도착", desc: "알프스 뷰 호텔 체크인" },
        { time: "저녁", emoji: "🧀", place: "스위스 퐁뒤 디너", desc: "치즈 퐁뒤 체험" },
      ]},
      { day: 6, slots: [
        { time: "오전", emoji: "🏔️", place: "융프라우 정상", desc: "유럽의 지붕, 만년설 감상" },
        { time: "오후", emoji: "🌊", place: "브리엔츠 호수", desc: "에메랄드빛 호수 크루즈" },
        { time: "저녁", emoji: "🍫", place: "초콜릿 공방", desc: "스위스 초콜릿 만들기" },
      ]},
      { day: 7, slots: [
        { time: "오전", emoji: "🚂", place: "루체른 이동", desc: "골든패스 파노라마 열차" },
        { time: "오후", emoji: "🌉", place: "카펠교 & 구시가지", desc: "루체른 대표 명소 산책" },
        { time: "저녁", emoji: "🍝", place: "호숫가 레스토랑", desc: "루체른 호수 뷰 디너" },
      ]},
      { day: 8, slots: [
        { time: "오전", emoji: "⛰️", place: "필라투스 산", desc: "세계에서 가장 가파른 톱니바퀴 열차" },
        { time: "오후", emoji: "🛍️", place: "기념품 쇼핑", desc: "스위스 시계 & 초콜릿" },
        { time: "저녁", emoji: "🥂", place: "페어웰 디너", desc: "마지막 밤 로맨틱 디너" },
      ]},
      { day: 9, slots: [
        { time: "오전", emoji: "✈️", place: "취리히 공항 출발", desc: "집으로 귀국" },
        { time: "오후", emoji: "💕", place: "집", desc: "소중한 추억 정리" },
        { time: "저녁", emoji: "📸", place: "추억 정리", desc: "사진 정리 & 후기 작성" },
      ]},
    ],
    transportTip: "🚄 유럽은 유레일패스가 필수! TGV, ICE로 도시 간 이동이 편해요. 스위스는 스위스 트래블 패스 추천!",
    restaurants: [
      { name: "르 쥘 베른", emoji: "🗼", rating: 4.8, dish: "에펠탑 미슐랭 코스", location: "에펠탑 2층", category: "로맨틱" },
      { name: "앙젤리나", emoji: "🍫", rating: 4.6, dish: "핫초코 & 몽블랑", location: "리볼리 거리", category: "아침" },
      { name: "르 콩트와르 뒤 팡테옹", emoji: "🥖", rating: 4.5, dish: "프렌치 브런치", location: "라틴 쿼터", category: "점심" },
      { name: "핑크 맘마", emoji: "🍕", rating: 4.4, dish: "트러플 파스타", location: "마레 지구", category: "저녁" },
      { name: "하이디 슈텁리", emoji: "🧀", rating: 4.7, dish: "스위스 퐁뒤", location: "인터라켄", category: "현지 맛집" },
      { name: "올드 스위스 하우스", emoji: "🥩", rating: 4.6, dish: "비너 슈니첼", location: "루체른", category: "저녁" },
      { name: "카페 드 플로르", emoji: "☕", rating: 4.3, dish: "크루아상 & 에스프레소", location: "생제르맹", category: "아침" },
      { name: "슈슈 크레페", emoji: "🥞", rating: 4.5, dish: "누텔라 크레페", location: "몽마르트", category: "점심" },
    ],
    tours: [
      { name: "세느강 디너 크루즈", duration: "2.5시간", price: "₩120,000", rating: 4.8, desc: "에펠탑 야경과 프렌치 디너", dayRec: "Day 1 저녁 추천", url: "https://www.myrealtip.com" },
      { name: "베르사유 궁전 가이드 투어", duration: "5시간", price: "₩85,000", rating: 4.7, desc: "한국어 가이드와 함께하는 궁전 투어", dayRec: "Day 4 종일 추천", url: "https://www.myrealtip.com" },
      { name: "몽생미셸 당일치기", duration: "12시간", price: "₩150,000", rating: 4.9, desc: "프랑스 대표 세계문화유산 방문", dayRec: "Day 3 종일 추천", url: "https://www.myrealtip.com" },
      { name: "융프라우 VIP 투어", duration: "8시간", price: "₩200,000", rating: 4.9, desc: "전용 가이드와 알프스 정복", dayRec: "Day 6 오전 추천", url: "https://www.myrealtip.com" },
      { name: "루체른 호수 크루즈", duration: "3시간", price: "₩60,000", rating: 4.6, desc: "알프스를 배경으로 한 호수 유람", dayRec: "Day 7 오후 추천", url: "https://www.myrealtip.com" },
      { name: "스위스 초콜릿 클래스", duration: "2시간", price: "₩55,000", rating: 4.5, desc: "나만의 스위스 초콜릿 만들기", dayRec: "Day 6 저녁 추천", url: "https://www.myrealtip.com" },
    ],
  },
  "🌴 동남아": {
    destination: "발리 · 우붓",
    flag: "🇮🇩",
    duration: "5박 6일",
    budget: "약 250만원",
    info: [
      { label: "💵 환율", value: "1만 루피아 = 약 850원" },
      { label: "🛂 비자", value: "도착비자 30일" },
      { label: "☀️ 최적 시기", value: "4~10월 건기" },
      { label: "🗣️ 언어 팁", value: "관광지 영어 OK" },
    ],
    mapCenter: { lat: -8.4095, lng: 115.1889 },
    days: [
      { day: 1, slots: [
        { time: "오전", emoji: "✈️", place: "응우라라이 공항 도착", desc: "발리 공항에서 리조트 이동" },
        { time: "오후", emoji: "🏨", place: "스미냑 리조트 체크인", desc: "풀빌라에서 휴식" },
        { time: "저녁", emoji: "🌅", place: "스미냑 비치 선셋", desc: "해변 바에서 칵테일" },
      ]},
      { day: 2, slots: [
        { time: "오전", emoji: "🏊", place: "리조트 풀 타임", desc: "인피니티 풀에서 여유롭게" },
        { time: "오후", emoji: "💆", place: "발리니즈 스파", desc: "커플 스파 마사지" },
        { time: "저녁", emoji: "🍹", place: "포테이토 헤드 비치클럽", desc: "발리 대표 비치클럽" },
      ]},
      { day: 3, slots: [
        { time: "오전", emoji: "🚗", place: "우붓 이동", desc: "우붓 라이스 테라스" },
        { time: "오후", emoji: "🌿", place: "테갈랄랑 라이스 테라스", desc: "계단식 논 감상 & 스윙" },
        { time: "저녁", emoji: "🍛", place: "우붓 로컬 와룽", desc: "나시고렝 & 미고렝" },
      ]},
      { day: 4, slots: [
        { time: "오전", emoji: "🐒", place: "몽키 포레스트", desc: "원숭이 숲 산책" },
        { time: "오후", emoji: "⛩️", place: "울루와뚜 사원", desc: "절벽 위 힌두 사원" },
        { time: "저녁", emoji: "🔥", place: "케착 댄스 공연", desc: "일몰과 전통 공연" },
      ]},
      { day: 5, slots: [
        { time: "오전", emoji: "🤿", place: "누사페니다 스노클링", desc: "만타레이 포인트" },
        { time: "오후", emoji: "🏖️", place: "크링킹 비치", desc: "인스타 핫플 해변" },
        { time: "저녁", emoji: "🦐", place: "짐바란 씨푸드 BBQ", desc: "해변 위 해산물 바비큐" },
      ]},
      { day: 6, slots: [
        { time: "오전", emoji: "🛍️", place: "기념품 쇼핑", desc: "우붓 아트마켓" },
        { time: "오후", emoji: "✈️", place: "귀국", desc: "공항으로 이동" },
        { time: "저녁", emoji: "💕", place: "집", desc: "소중한 추억 정리" },
      ]},
    ],
    transportTip: "🛵 발리는 그랩(Grab) 앱이 필수! 우붓은 개인 드라이버 하루 대절(약 5만원)이 편해요.",
    restaurants: [
      { name: "로카보레", emoji: "🌿", rating: 4.8, dish: "팜투테이블 코스", location: "우붓", category: "로맨틱" },
      { name: "와룽 비아비아", emoji: "🍛", rating: 4.5, dish: "나시짬뿌르", location: "스미냑", category: "점심" },
      { name: "사라스와티 카페", emoji: "☕", rating: 4.4, dish: "연꽃 정원 브런치", location: "우붓", category: "아침" },
      { name: "짐바란 베이 씨푸드", emoji: "🦞", rating: 4.7, dish: "그릴드 랍스터", location: "짐바란", category: "저녁" },
      { name: "모텔 멕시꼴라", emoji: "🌮", rating: 4.3, dish: "타코 & 마가리타", location: "짱구", category: "점심" },
      { name: "비쿠 카페", emoji: "🥑", rating: 4.6, dish: "아보카도 토스트", location: "스미냑", category: "아침" },
      { name: "사르딘", emoji: "🍝", rating: 4.7, dish: "트러플 파스타", location: "스미냑", category: "로맨틱" },
      { name: "이부 오카", emoji: "🐷", rating: 4.5, dish: "바비 굴링 (돼지구이)", location: "우붓", category: "현지 맛집" },
    ],
    tours: [
      { name: "누사페니다 스노클링 투어", duration: "8시간", price: "₩45,000", rating: 4.8, desc: "만타레이와 함께 스노클링", dayRec: "Day 5 종일 추천", url: "https://www.myrealtip.com" },
      { name: "우붓 라이스테라스 & 스윙", duration: "4시간", price: "₩30,000", rating: 4.6, desc: "인생샷 보장 정글 스윙", dayRec: "Day 3 오전 추천", url: "https://www.myrealtip.com" },
      { name: "발리 선라이즈 트레킹", duration: "6시간", price: "₩35,000", rating: 4.9, desc: "바투르 화산 일출 트레킹", dayRec: "Day 4 새벽 추천", url: "https://www.myrealtip.com" },
      { name: "커플 스파 패키지", duration: "3시간", price: "₩80,000", rating: 4.7, desc: "플라워 바스 & 마사지", dayRec: "Day 2 오후 추천", url: "https://www.myrealtip.com" },
      { name: "울루와뚜 케착댄스", duration: "3시간", price: "₩25,000", rating: 4.5, desc: "일몰과 전통 댄스 공연", dayRec: "Day 4 저녁 추천", url: "https://www.myrealtip.com" },
      { name: "화이트 워터 래프팅", duration: "4시간", price: "₩40,000", rating: 4.6, desc: "아융강 래프팅 어드벤처", dayRec: "Day 3 오후 추천", url: "https://www.myrealtip.com" },
    ],
  },
  "🗾 일본·오키나와": {
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
      { day: 1, slots: [
        { time: "오전", emoji: "✈️", place: "나리타 공항 도착", desc: "공항에서 호텔로 이동" },
        { time: "오후", emoji: "🏨", place: "시부야 호텔 체크인", desc: "짐 풀고 주변 산책" },
        { time: "저녁", emoji: "🍣", place: "스시 오마카세", desc: "신선한 초밥 코스 디너" },
      ]},
      { day: 2, slots: [
        { time: "오전", emoji: "⛩️", place: "메이지 신궁", desc: "도쿄 도심 속 고요한 신사" },
        { time: "오후", emoji: "🛍️", place: "하라주쿠 · 오모테산도", desc: "트렌디한 거리 쇼핑" },
        { time: "저녁", emoji: "🌃", place: "롯폰기 힐즈 전망대", desc: "도쿄 야경 감상" },
      ]},
      { day: 3, slots: [
        { time: "오전", emoji: "🎌", place: "아사쿠사 센소지", desc: "도쿄 대표 관광지" },
        { time: "오후", emoji: "🛒", place: "아메요코 시장", desc: "현지 시장 구경 & 간식" },
        { time: "저녁", emoji: "🍜", place: "라멘 골목", desc: "진한 돈코츠 라멘" },
      ]},
      { day: 4, slots: [
        { time: "오전", emoji: "✈️", place: "오키나와 이동", desc: "국내선으로 나하 공항" },
        { time: "오후", emoji: "🏖️", place: "리조트 체크인", desc: "바다가 보이는 리조트" },
        { time: "저녁", emoji: "🌅", place: "선셋 디너", desc: "해변에서 로맨틱 저녁" },
      ]},
      { day: 5, slots: [
        { time: "오전", emoji: "🐠", place: "츄라우미 수족관", desc: "세계 최대 수족관" },
        { time: "오후", emoji: "🏝️", place: "에메랄드 비치", desc: "투명한 바다에서 수영" },
        { time: "저녁", emoji: "🍖", place: "아구돼지 요리", desc: "오키나와 향토 요리" },
      ]},
      { day: 6, slots: [
        { time: "오전", emoji: "🤿", place: "스노클링 투어", desc: "산호초 스노클링 체험" },
        { time: "오후", emoji: "🏯", place: "슈리성 공원", desc: "류큐 왕국의 역사" },
        { time: "저녁", emoji: "🎶", place: "코쿠사이 거리", desc: "나하 번화가 즐기기" },
      ]},
      { day: 7, slots: [
        { time: "오전", emoji: "🛍️", place: "기념품 쇼핑", desc: "마지막 쇼핑 타임" },
        { time: "오후", emoji: "✈️", place: "귀국", desc: "나하 공항에서 출발" },
        { time: "저녁", emoji: "💕", place: "집", desc: "소중한 추억 정리" },
      ]},
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
  "🏝 몰디브·하와이": {
    destination: "몰디브",
    flag: "🇲🇻",
    duration: "5박 6일",
    budget: "약 700만원",
    info: [
      { label: "💵 환율", value: "1달러 = 약 1,350원" },
      { label: "🛂 비자", value: "도착비자 30일 무료" },
      { label: "☀️ 최적 시기", value: "11~4월 건기" },
      { label: "🗣️ 언어 팁", value: "리조트 영어 완벽 OK" },
    ],
    mapCenter: { lat: 4.1755, lng: 73.5093 },
    days: [
      { day: 1, slots: [
        { time: "오전", emoji: "✈️", place: "말레 공항 도착", desc: "수상비행기로 리조트 이동" },
        { time: "오후", emoji: "🏨", place: "수상빌라 체크인", desc: "바다 위 빌라에서 감동" },
        { time: "저녁", emoji: "🍽️", place: "웰컴 디너", desc: "해변 캔들라이트 디너" },
      ]},
      { day: 2, slots: [
        { time: "오전", emoji: "🤿", place: "스노클링", desc: "산호초 & 열대어 감상" },
        { time: "오후", emoji: "💆", place: "수상 스파", desc: "바다 위에서 커플 마사지" },
        { time: "저녁", emoji: "🌅", place: "선셋 크루즈", desc: "돌고래 워칭 크루즈" },
      ]},
      { day: 3, slots: [
        { time: "오전", emoji: "🏊", place: "인피니티 풀", desc: "바다와 이어지는 풀" },
        { time: "오후", emoji: "🚣", place: "카약 투어", desc: "투명 카약으로 산호초 위를" },
        { time: "저녁", emoji: "🦞", place: "수중 레스토랑", desc: "바닷속에서 디너" },
      ]},
      { day: 4, slots: [
        { time: "오전", emoji: "🐠", place: "다이빙 체험", desc: "초보자 체험 다이빙" },
        { time: "오후", emoji: "📸", place: "수중 포토슈팅", desc: "커플 수중 사진 촬영" },
        { time: "저녁", emoji: "🍷", place: "프라이빗 비치 디너", desc: "단둘만의 해변 디너" },
      ]},
      { day: 5, slots: [
        { time: "오전", emoji: "🎣", place: "낚시 투어", desc: "전통 방식 낚시 체험" },
        { time: "오후", emoji: "🏖️", place: "샌드뱅크 투어", desc: "무인도 모래톱 방문" },
        { time: "저녁", emoji: "🌟", place: "야광 플랑크톤", desc: "밤바다 빛나는 플랑크톤" },
      ]},
      { day: 6, slots: [
        { time: "오전", emoji: "🛍️", place: "리조트 기념품", desc: "마지막 쇼핑" },
        { time: "오후", emoji: "✈️", place: "귀국", desc: "수상비행기 → 말레 공항" },
        { time: "저녁", emoji: "💕", place: "집", desc: "꿈같은 추억 정리" },
      ]},
    ],
    transportTip: "🛩️ 몰디브는 수상비행기 or 스피드보트로 리조트 이동! 리조트 예약 시 트랜스퍼 포함 확인하세요.",
    restaurants: [
      { name: "이타 수중 레스토랑", emoji: "🐠", rating: 4.9, dish: "수중 코스 디너", location: "리조트 내", category: "로맨틱" },
      { name: "비치 그릴", emoji: "🥩", rating: 4.6, dish: "씨푸드 그릴 플래터", location: "메인 비치", category: "저녁" },
      { name: "선라이즈 카페", emoji: "☕", rating: 4.4, dish: "열대 과일 스무디볼", location: "풀사이드", category: "아침" },
      { name: "누들 바", emoji: "🍜", rating: 4.3, dish: "해산물 누들", location: "리조트 내", category: "점심" },
      { name: "풀 바 & 그릴", emoji: "🍔", rating: 4.5, dish: "랍스터 버거", location: "인피니티풀", category: "점심" },
      { name: "트리탑 다이닝", emoji: "🌴", rating: 4.8, dish: "몰디브 전통 코스", location: "리조트 내", category: "현지 맛집" },
    ],
    tours: [
      { name: "돌고래 선셋 크루즈", duration: "2시간", price: "₩80,000", rating: 4.8, desc: "돌고래 떼와 함께하는 선셋", dayRec: "Day 2 저녁 추천", url: "https://www.myrealtip.com" },
      { name: "체험 스쿠버 다이빙", duration: "3시간", price: "₩120,000", rating: 4.9, desc: "초보도 OK! 열대어와 함께", dayRec: "Day 4 오전 추천", url: "https://www.myrealtip.com" },
      { name: "샌드뱅크 피크닉", duration: "4시간", price: "₩150,000", rating: 4.7, desc: "무인도에서 단둘이 피크닉", dayRec: "Day 5 오후 추천", url: "https://www.myrealtip.com" },
      { name: "수중 포토 패키지", duration: "1.5시간", price: "₩200,000", rating: 4.6, desc: "전문 수중 사진작가와 촬영", dayRec: "Day 4 오후 추천", url: "https://www.myrealtip.com" },
      { name: "전통 낚시 체험", duration: "2시간", price: "₩50,000", rating: 4.4, desc: "몰디브 전통 방식 낚시", dayRec: "Day 5 오전 추천", url: "https://www.myrealtip.com" },
      { name: "야광 플랑크톤 투어", duration: "1시간", price: "₩60,000", rating: 4.8, desc: "밤바다의 신비로운 빛", dayRec: "Day 5 저녁 추천", url: "https://www.myrealtip.com" },
    ],
  },
  "🗽 미주": {
    destination: "뉴욕 · 칸쿤",
    flag: "🇺🇸🇲🇽",
    duration: "7박 8일",
    budget: "약 600만원",
    info: [
      { label: "💵 환율", value: "1달러 = 약 1,350원" },
      { label: "🛂 비자", value: "ESTA 필요 (미국)" },
      { label: "🌞 최적 시기", value: "9~11월 가을" },
      { label: "🗣️ 언어 팁", value: "영어 필수, 칸쿤은 스페인어" },
    ],
    mapCenter: { lat: 40.7128, lng: -74.006 },
    days: [
      { day: 1, slots: [
        { time: "오전", emoji: "✈️", place: "JFK 공항 도착", desc: "맨해튼으로 이동" },
        { time: "오후", emoji: "🏨", place: "타임스퀘어 호텔 체크인", desc: "뉴욕의 심장부" },
        { time: "저녁", emoji: "🥩", place: "피터루거 스테이크", desc: "뉴욕 최고의 스테이크" },
      ]},
      { day: 2, slots: [
        { time: "오전", emoji: "🗽", place: "자유의 여신상", desc: "페리 타고 리버티 섬" },
        { time: "오후", emoji: "🌉", place: "브루클린 브리지", desc: "걸어서 건너는 다리" },
        { time: "저녁", emoji: "🎭", place: "브로드웨이 뮤지컬", desc: "위키드 or 오페라의 유령" },
      ]},
      { day: 3, slots: [
        { time: "오전", emoji: "🌳", place: "센트럴 파크", desc: "뉴욕의 허파, 산책" },
        { time: "오후", emoji: "🖼️", place: "메트로폴리탄 미술관", desc: "세계 3대 박물관" },
        { time: "저녁", emoji: "🍕", place: "리틀 이탈리아", desc: "뉴욕 피자 & 파스타" },
      ]},
      { day: 4, slots: [
        { time: "오전", emoji: "🏙️", place: "엠파이어 스테이트 빌딩", desc: "맨해튼 360도 전망" },
        { time: "오후", emoji: "🛍️", place: "5번가 쇼핑", desc: "명품 쇼핑 스트리트" },
        { time: "저녁", emoji: "🍸", place: "루프탑 바", desc: "맨해튼 야경 칵테일" },
      ]},
      { day: 5, slots: [
        { time: "오전", emoji: "✈️", place: "칸쿤 이동", desc: "뉴욕 → 칸쿤 비행" },
        { time: "오후", emoji: "🏖️", place: "리조트 체크인", desc: "올인클루시브 리조트" },
        { time: "저녁", emoji: "🌮", place: "멕시칸 디너", desc: "타코 & 마가리타" },
      ]},
      { day: 6, slots: [
        { time: "오전", emoji: "🏊", place: "카리브해 수영", desc: "터콰이즈빛 바다" },
        { time: "오후", emoji: "🏛️", place: "치첸이트사", desc: "마야 피라미드 투어" },
        { time: "저녁", emoji: "🍹", place: "비치 파티", desc: "칸쿤 나이트라이프" },
      ]},
      { day: 7, slots: [
        { time: "오전", emoji: "🤿", place: "세노테 스노클링", desc: "신비로운 석회암 동굴" },
        { time: "오후", emoji: "💆", place: "스파 타임", desc: "커플 마사지" },
        { time: "저녁", emoji: "🌅", place: "선셋 세일링", desc: "카리브해 선셋 크루즈" },
      ]},
      { day: 8, slots: [
        { time: "오전", emoji: "🛍️", place: "면세점 쇼핑", desc: "마지막 쇼핑" },
        { time: "오후", emoji: "✈️", place: "귀국", desc: "칸쿤 공항 출발" },
        { time: "저녁", emoji: "💕", place: "집", desc: "추억 정리" },
      ]},
    ],
    transportTip: "🚇 뉴욕은 메트로카드로 지하철 무제한! 칸쿤은 리조트 셔틀 or ADO 버스 이용.",
    restaurants: [
      { name: "피터루거 스테이크", emoji: "🥩", rating: 4.8, dish: "포터하우스 스테이크", location: "브루클린", category: "저녁" },
      { name: "조스 피자", emoji: "🍕", rating: 4.6, dish: "뉴욕 스타일 피자", location: "그리니치빌리지", category: "점심" },
      { name: "러스앤도터스", emoji: "🥯", rating: 4.7, dish: "베이글 & 스모크 살몬", location: "로어 이스트사이드", category: "아침" },
      { name: "르 베르나딘", emoji: "🐟", rating: 4.9, dish: "미슐랭 3스타 해산물", location: "미드타운", category: "로맨틱" },
      { name: "하르투도 타코", emoji: "🌮", rating: 4.5, dish: "알 파스토르 타코", location: "칸쿤", category: "현지 맛집" },
      { name: "리조트 뷔페", emoji: "🍽️", rating: 4.3, dish: "올인클루시브 뷔페", location: "리조트 내", category: "아침" },
    ],
    tours: [
      { name: "자유의 여신상 크루즈", duration: "3시간", price: "₩35,000", rating: 4.7, desc: "페리로 리버티 섬 방문", dayRec: "Day 2 오전 추천", url: "https://www.myrealtip.com" },
      { name: "브로드웨이 뮤지컬", duration: "2.5시간", price: "₩150,000", rating: 4.9, desc: "세계 최고의 뮤지컬 관람", dayRec: "Day 2 저녁 추천", url: "https://www.myrealtip.com" },
      { name: "치첸이트사 당일 투어", duration: "12시간", price: "₩80,000", rating: 4.8, desc: "세계 7대 불가사의 방문", dayRec: "Day 6 종일 추천", url: "https://www.myrealtip.com" },
      { name: "세노테 스노클링", duration: "4시간", price: "₩50,000", rating: 4.7, desc: "마야 성수 동굴 스노클링", dayRec: "Day 7 오전 추천", url: "https://www.myrealtip.com" },
      { name: "헬리콥터 야경 투어", duration: "30분", price: "₩300,000", rating: 4.8, desc: "맨해튼 상공 헬기 투어", dayRec: "Day 4 저녁 추천", url: "https://www.myrealtip.com" },
      { name: "칸쿤 선셋 세일링", duration: "3시간", price: "₩70,000", rating: 4.6, desc: "카리브해 선셋 요트", dayRec: "Day 7 저녁 추천", url: "https://www.myrealtip.com" },
    ],
  },
};

export function getResultForRegion(region: string): TripResult {
  return tripResults[region] || tripResults["🇪🇺 유럽"];
}

export function getCountriesForRegion(region: string): CountryOption[] {
  return regionOptions[region]?.countries || regionOptions["🇪🇺 유럽"].countries;
}

export function getRegionMeta(region: string): RegionOption {
  return regionOptions[region] || regionOptions["🇪🇺 유럽"];
}

export function getRecommendedCountryRange(days: number): string {
  if (days <= 6) return "추천: 1~2개 나라";
  if (days <= 10) return "추천: 2~3개 나라";
  if (days <= 15) return "추천: 3~4개 나라";
  return "추천: 4개 이상도 가능";
}
