import type { TripAnswers } from "@/context/TripContext";
import {
  getCountriesForRegion,
  getRegionMeta,
  getResultForRegion,
  type TripResult,
} from "@/data/tripResults";

export interface PersonalizedTripPlan extends TripResult {
  summaryNote: string;
  selectedCountries: string[];
  selectedCities: string[];
  routePoints: {
    city: string;
    country: string;
    lat: number;
    lng: number;
    order: number;
  }[];
}

interface CityProfile {
  country: string;
  lat: number;
  lng: number;
  highlights: string[];
  brunch: string;
  signatureDish: string;
  romanticSpot: string;
  tourHighlight: string;
  shoppingStreet: string;
  transportTip: string;
}

const cityProfiles: Record<string, CityProfile> = {
  파리: {
    country: "프랑스",
    lat: 48.8566,
    lng: 2.3522,
    highlights: ["에펠탑", "세느강", "마레지구"],
    brunch: "버터 향 가득한 브런치와 카페 크림",
    signatureDish: "프렌치 코스와 와인 페어링",
    romanticSpot: "세느강 야경 크루즈",
    tourHighlight: "루브르와 몽마르트 감성 투어",
    shoppingStreet: "샹젤리제와 르마레 편집숍",
    transportTip: "지하철과 도보 조합이 가장 효율적이에요.",
  },
  니스: {
    country: "프랑스",
    lat: 43.7102,
    lng: 7.262,
    highlights: ["프롬나드 데장글레", "올드타운", "해변"],
    brunch: "지중해식 브런치 플래터",
    signatureDish: "니수아즈 샐러드와 해산물",
    romanticSpot: "해변 선셋 산책",
    tourHighlight: "에즈와 모나코 데이투어",
    shoppingStreet: "올드타운 골목 부티크",
    transportTip: "해변과 구시가지는 천천히 걸어보세요.",
  },
  인터라켄: {
    country: "스위스",
    lat: 46.6863,
    lng: 7.8632,
    highlights: ["융프라우", "브리엔츠 호수", "하더쿨름"],
    brunch: "알프스 뷰 브런치와 핫초코",
    signatureDish: "치즈 퐁뒤와 로슈티",
    romanticSpot: "호수 보트와 산악열차",
    tourHighlight: "융프라우 정상 VIP 투어",
    shoppingStreet: "호헨베크 거리 기념품 숍",
    transportTip: "스위스 패스가 있으면 이동이 훨씬 편해요.",
  },
  루체른: {
    country: "스위스",
    lat: 47.0502,
    lng: 8.3093,
    highlights: ["카펠교", "루체른 호수", "필라투스"],
    brunch: "호숫가 베이커리 브런치",
    signatureDish: "스위스 전통 그릴 플래터",
    romanticSpot: "루체른 호수 선셋 크루즈",
    tourHighlight: "필라투스 톱니바퀴 열차 투어",
    shoppingStreet: "구시가지 시계와 초콜릿 숍",
    transportTip: "도심은 도보, 근교는 유람선과 열차가 좋아요.",
  },
  로마: {
    country: "이탈리아",
    lat: 41.9028,
    lng: 12.4964,
    highlights: ["콜로세움", "트레비분수", "트라스테베레"],
    brunch: "에스프레소와 코르네토 브런치",
    signatureDish: "카르보나라와 티본 스테이크",
    romanticSpot: "야간 바티칸 산책",
    tourHighlight: "고대 로마 워킹 투어",
    shoppingStreet: "스페인 계단 주변 쇼핑 거리",
    transportTip: "주요 명소가 가까워 도보 동선이 좋습니다.",
  },
  바르셀로나: {
    country: "스페인",
    lat: 41.3874,
    lng: 2.1686,
    highlights: ["사그라다 파밀리아", "구엘공원", "바르셀로네타"],
    brunch: "타파스 브런치와 상그리아",
    signatureDish: "빠에야와 감바스",
    romanticSpot: "벙커스 야경 포인트",
    tourHighlight: "가우디 건축 투어",
    shoppingStreet: "그라시아 거리 쇼핑",
    transportTip: "메트로와 택시를 섞으면 동선이 편해요.",
  },
  발리: {
    country: "인도네시아",
    lat: -8.4095,
    lng: 115.1889,
    highlights: ["스미냑", "울루와뚜", "짱구"],
    brunch: "트로피컬 스무디볼 브런치",
    signatureDish: "발리식 씨푸드 그릴",
    romanticSpot: "울루와뚜 선셋",
    tourHighlight: "사원과 비치클럽 투어",
    shoppingStreet: "스미냑 편집숍 거리",
    transportTip: "기사 포함 차량 투어가 가장 편해요.",
  },
  우붓: {
    country: "인도네시아",
    lat: -8.5069,
    lng: 115.2625,
    highlights: ["뜨갈랄랑", "몽키포레스트", "정글 리조트"],
    brunch: "정글뷰 브런치와 커피",
    signatureDish: "나시고렝과 사테",
    romanticSpot: "정글 인피니티풀",
    tourHighlight: "라이스테라스 포토 투어",
    shoppingStreet: "우붓 아트마켓",
    transportTip: "우붓은 차량 이동 시간을 넉넉히 잡는 게 좋아요.",
  },
  방콕: {
    country: "태국",
    lat: 13.7563,
    lng: 100.5018,
    highlights: ["짜오프라야", "왓아룬", "아이콘시암"],
    brunch: "태국식 브런치와 밀크티",
    signatureDish: "똠얌과 팟타이",
    romanticSpot: "루프탑 바 야경",
    tourHighlight: "수상시장과 왕궁 투어",
    shoppingStreet: "시암과 아속 쇼핑몰",
    transportTip: "BTS와 택시를 함께 쓰면 좋아요.",
  },
  다낭: {
    country: "베트남",
    lat: 16.0544,
    lng: 108.2022,
    highlights: ["미케비치", "바나힐", "한시장"],
    brunch: "반미와 코코넛커피 브런치",
    signatureDish: "해산물 BBQ와 쌀국수",
    romanticSpot: "한강 야경 크루즈",
    tourHighlight: "호이안 야경 투어",
    shoppingStreet: "한시장과 빈컴플라자",
    transportTip: "그랩 호출로 이동하면 부담이 적어요.",
  },
  도쿄: {
    country: "일본",
    lat: 35.6762,
    lng: 139.6503,
    highlights: ["시부야", "긴자", "아사쿠사"],
    brunch: "일본식 팬케이크 브런치",
    signatureDish: "오마카세와 와규",
    romanticSpot: "도쿄 베이 야경",
    tourHighlight: "아사쿠사와 스카이트리 투어",
    shoppingStreet: "긴자와 오모테산도",
    transportTip: "지하철 패스 하나면 이동이 훨씬 편해요.",
  },
  교토: {
    country: "일본",
    lat: 35.0116,
    lng: 135.7681,
    highlights: ["기온", "아라시야마", "청수사"],
    brunch: "말차 디저트 브런치",
    signatureDish: "가이세키와 유도후",
    romanticSpot: "아라시야마 대나무숲 산책",
    tourHighlight: "기온 감성 워킹 투어",
    shoppingStreet: "니시키시장과 산넨자카",
    transportTip: "버스 혼잡 시간만 피하면 천천히 보기 좋아요.",
  },
  오사카: {
    country: "일본",
    lat: 34.6937,
    lng: 135.5023,
    highlights: ["도톤보리", "우메다", "오사카성"],
    brunch: "타마고산도와 커피",
    signatureDish: "오코노미야키와 쿠시카츠",
    romanticSpot: "우메다 스카이빌딩 야경",
    tourHighlight: "유니버설 또는 먹방 투어",
    shoppingStreet: "신사이바시와 난바",
    transportTip: "난카이와 JR 노선을 잘 섞으면 편해요.",
  },
  나하: {
    country: "오키나와",
    lat: 26.2124,
    lng: 127.6809,
    highlights: ["코쿠사이 거리", "아메리칸빌리지", "선셋비치"],
    brunch: "오키나와 소바 브런치",
    signatureDish: "아구돼지 샤브와 스테이크",
    romanticSpot: "선셋비치 드라이브",
    tourHighlight: "스노클링과 카약 투어",
    shoppingStreet: "코쿠사이 거리 기념품 숍",
    transportTip: "오키나와는 렌터카가 가장 좋아요.",
  },
  호놀룰루: {
    country: "하와이",
    lat: 21.3099,
    lng: -157.8581,
    highlights: ["와이키키", "다이아몬드헤드", "카카아코"],
    brunch: "아사이볼 브런치",
    signatureDish: "프라임 립과 포케",
    romanticSpot: "와이키키 선셋 산책",
    tourHighlight: "오아후 섬 일주 투어",
    shoppingStreet: "알라모아나 쇼핑센터",
    transportTip: "와이키키는 도보, 외곽은 렌터카가 편합니다.",
  },
  말레: {
    country: "몰디브",
    lat: 4.1755,
    lng: 73.5093,
    highlights: ["수상빌라", "샌드뱅크", "라군"],
    brunch: "리조트 플로팅 브런치",
    signatureDish: "랍스터 디너와 열대 과일",
    romanticSpot: "프라이빗 비치 디너",
    tourHighlight: "돌고래 선셋 크루즈",
    shoppingStreet: "리조트 부티크",
    transportTip: "리조트 트랜스퍼 시간을 꼭 함께 확인하세요.",
  },
  뉴욕: {
    country: "미국",
    lat: 40.7128,
    lng: -74.006,
    highlights: ["센트럴파크", "브루클린", "타임스퀘어"],
    brunch: "뉴욕 브런치와 베이글",
    signatureDish: "스테이크와 오이스터",
    romanticSpot: "브루클린 브리지 야경",
    tourHighlight: "헬기 또는 리버 크루즈 투어",
    shoppingStreet: "소호와 5번가",
    transportTip: "지하철과 도보만으로도 핵심 코스를 다닐 수 있어요.",
  },
  칸쿤: {
    country: "멕시코",
    lat: 21.1619,
    lng: -86.8515,
    highlights: ["호텔존", "이슬라무헤레스", "세노테"],
    brunch: "트로피컬 과일 브런치",
    signatureDish: "타코와 씨푸드 플래터",
    romanticSpot: "카리브해 선셋 세일링",
    tourHighlight: "세노테와 치첸이트사 투어",
    shoppingStreet: "라이스라 쇼핑빌리지",
    transportTip: "리조트 셔틀과 택시 요금을 미리 확인하세요.",
  },
  밴쿠버: {
    country: "캐나다",
    lat: 49.2827,
    lng: -123.1207,
    highlights: ["스탠리파크", "개스타운", "그랜빌아일랜드"],
    brunch: "브런치 플래터와 메이플 라떼",
    signatureDish: "연어 스테이크와 파스타",
    romanticSpot: "씨월 방면 선셋 드라이브",
    tourHighlight: "휘슬러 당일 투어",
    shoppingStreet: "롭슨 스트리트",
    transportTip: "스카이트레인과 버스 연계가 좋아요.",
  },
  취리히: {
    country: "스위스",
    lat: 47.3769,
    lng: 8.5417,
    highlights: ["반호프 거리", "리마트강", "취리히호"],
    brunch: "취리히 감성 브런치와 커피",
    signatureDish: "송아지 요리와 스위스 와인",
    romanticSpot: "취리히호 산책",
    tourHighlight: "구시가지 워킹 투어",
    shoppingStreet: "반호프 거리",
    transportTip: "트램 노선이 잘 되어 있어 이동이 편해요.",
  },
  체르마트: {
    country: "스위스",
    lat: 46.0207,
    lng: 7.7491,
    highlights: ["마터호른", "고르너그라트", "산악열차"],
    brunch: "알프스 뷰 브런치",
    signatureDish: "라클렛과 스테이크",
    romanticSpot: "마터호른 전망 포인트",
    tourHighlight: "고르너그라트 열차 투어",
    shoppingStreet: "반호프 거리 부티크",
    transportTip: "차 없는 마을이라 도보와 전기택시 중심이에요.",
  },
  피렌체: {
    country: "이탈리아",
    lat: 43.7696,
    lng: 11.2558,
    highlights: ["두오모", "우피치", "아르노강"],
    brunch: "토스카나식 브런치",
    signatureDish: "비스테카 알라 피오렌티나",
    romanticSpot: "미켈란젤로 광장 야경",
    tourHighlight: "르네상스 아트 투어",
    shoppingStreet: "비아 데이 칼차이우올리",
    transportTip: "구시가지는 대부분 도보로 충분해요.",
  },
  베네치아: {
    country: "이탈리아",
    lat: 45.4408,
    lng: 12.3155,
    highlights: ["산마르코 광장", "곤돌라", "리알토"],
    brunch: "운하 뷰 브런치",
    signatureDish: "해산물 리조또",
    romanticSpot: "곤돌라 선셋 코스",
    tourHighlight: "무라노 부라노 섬 투어",
    shoppingStreet: "리알토 주변 부티크",
    transportTip: "바포레토와 도보 조합이 가장 좋아요.",
  },
  비엔나: {
    country: "오스트리아",
    lat: 48.2082,
    lng: 16.3738,
    highlights: ["쇤브룬", "벨베데레", "오페라하우스"],
    brunch: "비엔나 카페 브런치",
    signatureDish: "비너슈니첼",
    romanticSpot: "클래식 공연 데이트",
    tourHighlight: "궁전과 미술관 투어",
    shoppingStreet: "케른트너 거리",
    transportTip: "트램과 지하철로 주요 포인트를 쉽게 갈 수 있어요.",
  },
  잘츠부르크: {
    country: "오스트리아",
    lat: 47.8095,
    lng: 13.055,
    highlights: ["호엔잘츠부르크", "미라벨 정원", "구시가지"],
    brunch: "잘츠부르크 베이커리 브런치",
    signatureDish: "오스트리아식 플래터",
    romanticSpot: "미라벨 정원 산책",
    tourHighlight: "사운드 오브 뮤직 투어",
    shoppingStreet: "게트라이데 거리",
    transportTip: "도시가 아담해서 천천히 걷기 좋습니다.",
  },
  할슈타트: {
    country: "오스트리아",
    lat: 47.5613,
    lng: 13.6493,
    highlights: ["호숫가 마을", "전망대", "소금광산"],
    brunch: "호수 앞 브런치",
    signatureDish: "알프스 가정식",
    romanticSpot: "호수 반영 포토스팟",
    tourHighlight: "소금광산과 전망대 코스",
    shoppingStreet: "마을 중앙 기념품 거리",
    transportTip: "기차와 페리 연결 시간을 잘 맞추는 게 좋아요.",
  },
  마드리드: {
    country: "스페인",
    lat: 40.4168,
    lng: -3.7038,
    highlights: ["프라도", "레티로 공원", "그란비아"],
    brunch: "초콜라테 콘 추로스 브런치",
    signatureDish: "이베리코와 타파스",
    romanticSpot: "레티로 보트 데이트",
    tourHighlight: "왕궁과 미술관 투어",
    shoppingStreet: "그란비아",
    transportTip: "메트로망이 좋아서 이동이 편안해요.",
  },
  세비야: {
    country: "스페인",
    lat: 37.3891,
    lng: -5.9845,
    highlights: ["스페인 광장", "알카사르", "산타크루스"],
    brunch: "세비야식 브런치와 오렌지 주스",
    signatureDish: "타파스와 하몽",
    romanticSpot: "플라멩코 디너",
    tourHighlight: "알카사르와 구시가지 투어",
    shoppingStreet: "시에르페스 거리",
    transportTip: "도심은 도보 이동 비중이 높아요.",
  },
  푸켓: {
    country: "태국",
    lat: 7.8804,
    lng: 98.3923,
    highlights: ["빠통", "올드타운", "피피섬"],
    brunch: "비치 브런치 플래터",
    signatureDish: "태국식 해산물 커리",
    romanticSpot: "피피섬 선셋 크루즈",
    tourHighlight: "섬 호핑 투어",
    shoppingStreet: "푸켓 올드타운",
    transportTip: "기사 포함 차량이나 그랩이 편합니다.",
  },
  끄라비: {
    country: "태국",
    lat: 8.0863,
    lng: 98.9063,
    highlights: ["라일레이", "아오낭", "홍섬"],
    brunch: "오션뷰 브런치",
    signatureDish: "씨푸드 플래터",
    romanticSpot: "라일레이 비치 선셋",
    tourHighlight: "홍섬 보트 투어",
    shoppingStreet: "아오낭 워킹 스트리트",
    transportTip: "롱테일보트 시간을 미리 확인해두면 좋아요.",
  },
  치앙마이: {
    country: "태국",
    lat: 18.7883,
    lng: 98.9853,
    highlights: ["도이수텝", "올드시티", "님만해민"],
    brunch: "카페 골목 브런치",
    signatureDish: "카오쏘이",
    romanticSpot: "산 전망 카페 데이트",
    tourHighlight: "사원과 야시장 투어",
    shoppingStreet: "님만해민",
    transportTip: "올드시티는 도보, 외곽은 차량 이동이 편해요.",
  },
  호이안: {
    country: "베트남",
    lat: 15.8801,
    lng: 108.338,
    highlights: ["올드타운", "투본강", "안방비치"],
    brunch: "반쎄오 브런치",
    signatureDish: "화이트로즈와 까오러우",
    romanticSpot: "야간 소원배",
    tourHighlight: "랜턴 야경 투어",
    shoppingStreet: "올드타운 수공예 거리",
    transportTip: "도심은 걷거나 자전거로 즐기기 좋아요.",
  },
  나트랑: {
    country: "베트남",
    lat: 12.2388,
    lng: 109.1967,
    highlights: ["해변", "빈원더스", "포나가르"],
    brunch: "오션뷰 브런치",
    signatureDish: "랍스터와 해산물 쌀국수",
    romanticSpot: "비치 선셋 디너",
    tourHighlight: "섬 투어와 머드스파",
    shoppingStreet: "쩐푸 거리",
    transportTip: "리조트 셔틀과 그랩을 섞으면 편해요.",
  },
  싱가포르: {
    country: "싱가포르",
    lat: 1.3521,
    lng: 103.8198,
    highlights: ["마리나베이", "가든스바이더베이", "센토사"],
    brunch: "카야 토스트 브런치",
    signatureDish: "칠리크랩과 사테",
    romanticSpot: "마리나베이 야경",
    tourHighlight: "센토사와 가든스 투어",
    shoppingStreet: "오차드 로드",
    transportTip: "MRT 하나로 거의 다 연결돼요.",
  },
  코타키나발루: {
    country: "말레이시아",
    lat: 5.9804,
    lng: 116.0735,
    highlights: ["탄중아루", "섬 투어", "선셋 포인트"],
    brunch: "리조트 브런치",
    signatureDish: "씨푸드 BBQ",
    romanticSpot: "탄중아루 선셋",
    tourHighlight: "사피섬 호핑 투어",
    shoppingStreet: "이마고 몰",
    transportTip: "짧은 이동이 많아 택시나 그랩이 편합니다.",
  },
  삿포로: {
    country: "일본",
    lat: 43.0618,
    lng: 141.3545,
    highlights: ["오도리공원", "맥주박물관", "스스키노"],
    brunch: "홋카이도 브런치 플레이트",
    signatureDish: "징기스칸과 스프카레",
    romanticSpot: "야경 전망대",
    tourHighlight: "오타루 근교 투어",
    shoppingStreet: "다누키코지",
    transportTip: "지하철과 JR 조합이 가장 편합니다.",
  },
  후쿠오카: {
    country: "일본",
    lat: 33.5902,
    lng: 130.4017,
    highlights: ["텐진", "모모치", "캐널시티"],
    brunch: "멘타이코 브런치",
    signatureDish: "하카타 라멘과 모츠나베",
    romanticSpot: "모모치 해변 산책",
    tourHighlight: "유후인 데이투어",
    shoppingStreet: "텐진 지하상가",
    transportTip: "도심 압축형이라 도보+지하철이 효율적이에요.",
  },
  마우이: {
    country: "하와이",
    lat: 20.7984,
    lng: -156.3319,
    highlights: ["로드투하나", "카아나팔리", "할레아칼라"],
    brunch: "오션프런트 브런치",
    signatureDish: "하와이안 씨푸드 그릴",
    romanticSpot: "선셋 비치 워크",
    tourHighlight: "로드 투 하나 드라이브",
    shoppingStreet: "와일레아 숍스",
    transportTip: "섬 자체 이동은 렌터카가 가장 좋아요.",
  },
  카우아이: {
    country: "하와이",
    lat: 22.0964,
    lng: -159.5261,
    highlights: ["나팔리코스트", "포이푸", "와이메아 캐니언"],
    brunch: "트로피컬 브런치",
    signatureDish: "가든 아일랜드 다이닝",
    romanticSpot: "나팔리코스트 보트 데이트",
    tourHighlight: "헬리콥터 또는 캐니언 투어",
    shoppingStreet: "포이푸 쇼핑 빌리지",
    transportTip: "이동 거리가 길어서 차량 동선을 미리 짜는 게 좋아요.",
  },
  LA: {
    country: "미국",
    lat: 34.0522,
    lng: -118.2437,
    highlights: ["산타모니카", "베벌리힐스", "그리피스"],
    brunch: "캘리포니아 브런치",
    signatureDish: "스테이크와 타코",
    romanticSpot: "그리피스 선셋 뷰",
    tourHighlight: "할리우드와 해변 드라이브",
    shoppingStreet: "로데오 드라이브",
    transportTip: "LA는 렌터카 중심으로 보는 게 가장 편해요.",
  },
  샌프란시스코: {
    country: "미국",
    lat: 37.7749,
    lng: -122.4194,
    highlights: ["금문교", "피셔맨스워프", "소살리토"],
    brunch: "샌프란 브런치와 커피",
    signatureDish: "클램차우더와 씨푸드",
    romanticSpot: "소살리토 선셋",
    tourHighlight: "금문교와 알카트라즈 코스",
    shoppingStreet: "유니언스퀘어",
    transportTip: "케이블카와 차량 이동을 섞으면 좋아요.",
  },
  라스베이거스: {
    country: "미국",
    lat: 36.1699,
    lng: -115.1398,
    highlights: ["스트립", "벨라지오", "그랜드캐니언"],
    brunch: "호텔 브런치 뷔페",
    signatureDish: "프라임 립과 칵테일",
    romanticSpot: "벨라지오 분수 야경",
    tourHighlight: "그랜드캐니언 데이투어",
    shoppingStreet: "크리스탈 숍스",
    transportTip: "스트립은 도보, 외곽은 차량 이동이 편해요.",
  },
};

const defaultProfile = (city: string, country: string): CityProfile => ({
  country,
  lat: getResultForRegion("🇪🇺 유럽").mapCenter.lat,
  lng: getResultForRegion("🇪🇺 유럽").mapCenter.lng,
  highlights: ["대표 명소", "감성 거리", "로컬 스폿"],
  brunch: `${city} 스타일 브런치`,
  signatureDish: `${city} 대표 다이닝`,
  romanticSpot: `${city} 선셋 코스`,
  tourHighlight: `${city} 워킹 투어`,
  shoppingStreet: `${city} 쇼핑 스트리트`,
  transportTip: `${city}에서는 중심지 기준 이동 동선을 짜는 게 편해요.`,
});

const unique = <T,>(values: T[]) => [...new Set(values)];

export const defaultTripAnswers: TripAnswers = {
  budget: "",
  customBudget: "",
  budgetAmount: 500,
  duration: "",
  customDuration: "",
  durationDays: 7,
  mood: "",
  region: "",
  customRegion: "",
  selectedCountries: [],
  selectedCities: [],
};

const clampDays = (days: number) => Math.max(3, Math.min(days || 7, 14));

const getSelectedCountries = (answers: TripAnswers) => {
  if (answers.selectedCountries.length > 0) return unique(answers.selectedCountries);

  const fallbackRegion = answers.region || "🇪🇺 유럽";
  return getCountriesForRegion(fallbackRegion).slice(0, 2).map((country) => country.name);
};

const getSelectedCities = (answers: TripAnswers, countries: ReturnType<typeof getCountriesForRegion>) => {
  if (answers.selectedCities.length > 0) return unique(answers.selectedCities);

  if (answers.selectedCountries.length > 0) {
    return answers.selectedCountries
      .map((countryName) => countries.find((country) => country.name === countryName)?.cities[0])
      .filter((city): city is string => Boolean(city));
  }

  return countries.slice(0, 2).map((country) => country.cities[0]);
};

const buildFlag = (countries: string[], region: string) => {
  const regionCountries = getCountriesForRegion(region || "🇪🇺 유럽");
  const emojis = countries
    .map((countryName) => regionCountries.find((country) => country.name === countryName)?.emoji)
    .filter((emoji): emoji is string => Boolean(emoji));

  return emojis.slice(0, 3).join("") || getResultForRegion(region).flag;
};

const getProfile = (city: string, country: string) => cityProfiles[city] || defaultProfile(city, country);

const buildDaySlots = (city: string, country: string, day: number, totalDays: number) => {
  const profile = getProfile(city, country);

  if (day === 1) {
    return [
      { time: "오전", emoji: "✈️", place: `${city} 도착`, desc: `${country} 첫 일정 시작과 공항 이동` },
      { time: "오후", emoji: "🏨", place: `${profile.highlights[0]} 체크`, desc: `${profile.highlights[0]} 근처 숙소에 짐 풀기` },
      { time: "저녁", emoji: "🥂", place: profile.romanticSpot, desc: "첫날 분위기 잡기 좋은 허니문 코스" },
    ];
  }

  if (day === totalDays) {
    return [
      { time: "오전", emoji: "🛍️", place: profile.shoppingStreet, desc: "마지막 쇼핑과 기념품 고르기" },
      { time: "오후", emoji: "✈️", place: `${city} 출발`, desc: "공항 또는 다음 도시로 이동" },
      { time: "저녁", emoji: "💕", place: "추억 정리", desc: "사진과 영상을 함께 정리하는 시간" },
    ];
  }

  const highlightA = profile.highlights[(day - 2) % profile.highlights.length];
  const highlightB = profile.highlights[(day - 1) % profile.highlights.length];

  return [
    { time: "오전", emoji: "☀️", place: `${highlightA} 브런치`, desc: profile.brunch },
    { time: "오후", emoji: "📍", place: `${profile.tourHighlight}`, desc: `${highlightB}와 함께 여유 있게 둘러보기` },
    { time: "저녁", emoji: "🌙", place: profile.romanticSpot, desc: `${profile.signatureDish}로 하루 마무리` },
  ];
};

const buildDays = (cities: string[], countries: string[], totalDays: number) => {
  return Array.from({ length: totalDays }, (_, index) => {
    const city = cities[index % cities.length];
    const country = countries[index % countries.length] || countries[0];

    return {
      day: index + 1,
      slots: buildDaySlots(city, country, index + 1, totalDays),
    };
  });
};

const buildRestaurants = (cities: string[], countries: string[]) => {
  return cities.flatMap((city, cityIndex) => {
    const country = countries[cityIndex % countries.length] || countries[0];
    const profile = getProfile(city, country);

    return [
      { name: `${city} 로맨틱 다이닝`, emoji: "🍷", rating: 4.9, dish: profile.signatureDish, location: profile.romanticSpot, category: "로맨틱" },
      { name: `${city} 브런치 하우스`, emoji: "🥐", rating: 4.6, dish: profile.brunch, location: `${profile.highlights[0]} 근처`, category: "아침" },
      { name: `${city} 로컬 키친`, emoji: "🍽️", rating: 4.7, dish: `${country} 인기 메뉴`, location: `${profile.highlights[1] || profile.highlights[0]} 주변`, category: "현지 맛집" },
      { name: `${city} 선셋 테이블`, emoji: "🌅", rating: 4.8, dish: `뷰와 함께하는 ${profile.signatureDish}`, location: profile.romanticSpot, category: "저녁" },
    ];
  });
};

const buildTours = (cities: string[], countries: string[]) => {
  return cities.flatMap((city, cityIndex) => {
    const country = countries[cityIndex % countries.length] || countries[0];
    const profile = getProfile(city, country);

    return [
      { name: `${city} 하이라이트 워킹 투어`, duration: "3시간", price: "₩45,000", rating: 4.7, desc: `${profile.highlights.join(", ")} 중심으로 둘러보는 코스`, dayRec: `Day ${Math.min(cityIndex + 1, cities.length)} 오전 추천`, url: "https://www.myrealtip.com" },
      { name: `${city} 로맨틱 선셋 코스`, duration: "2시간", price: "₩70,000", rating: 4.8, desc: `${profile.romanticSpot} 감성을 즐기는 허니문 투어`, dayRec: `Day ${Math.min(cityIndex + 1, cities.length)} 저녁 추천`, url: "https://www.myrealtip.com" },
      { name: `${city} 미식 탐방`, duration: "4시간", price: "₩65,000", rating: 4.6, desc: `${profile.signatureDish}와 현지 디저트를 함께 맛보는 코스`, dayRec: `Day ${Math.min(cityIndex + 2, cities.length + 1)} 오후 추천`, url: "https://www.myrealtip.com" },
    ];
  });
};

export function buildPersonalizedTripPlan(answers: TripAnswers): PersonalizedTripPlan {
  const region = answers.region || "🇪🇺 유럽";
  const base = getResultForRegion(region);
  const countriesForRegion = getCountriesForRegion(region);
  const regionMeta = getRegionMeta(region);
  const selectedCountries = getSelectedCountries(answers);
  const selectedCities = getSelectedCities(answers, countriesForRegion);
  const totalDays = clampDays(answers.durationDays);
  const destination = selectedCities.join(" · ") || selectedCountries.join(" · ") || base.destination;

  const routePoints = selectedCities.map((city, index) => {
    const country = selectedCountries[index % selectedCountries.length] || countriesForRegion.find((item) => item.cities.includes(city))?.name || "대표 국가";
    const profile = getProfile(city, country);
    return {
      city,
      country,
      lat: profile.lat,
      lng: profile.lng,
      order: index + 1,
    };
  });

  const transportTips = unique(routePoints.map((point) => getProfile(point.city, point.country).transportTip));

  return {
    ...base,
    destination,
    flag: buildFlag(selectedCountries, region),
    budget: answers.customBudget || answers.budget || base.budget,
    duration: answers.customDuration || answers.duration || `${totalDays}일`,
    mapCenter: routePoints[0] ? { lat: routePoints[0].lat, lng: routePoints[0].lng } : base.mapCenter,
    days: buildDays(selectedCities, selectedCountries, totalDays),
    transportTip: `${transportTips.join(" ")} ${regionMeta.countryAdvice}`,
    restaurants: buildRestaurants(selectedCities, selectedCountries).slice(0, 12),
    tours: buildTours(selectedCities, selectedCountries).slice(0, 12),
    info: [
      { label: "🗓️ 여행 길이", value: `${totalDays}일 기준 맞춤 설계` },
      { label: "🌍 선택 나라", value: `${selectedCountries.length}개` },
      { label: "🏙️ 도시 코스", value: selectedCities.join(", ") },
      { label: "💞 허니문 포인트", value: regionMeta.honeymoonCourse },
      ...base.info.slice(0, 2),
    ],
    selectedCountries,
    selectedCities,
    routePoints,
    summaryNote:
      totalDays >= 10
        ? `긴 일정이라 ${selectedCities.join(", ")} 순서로 천천히 이동하는 허니문 루트로 구성했어요.`
        : `${regionMeta.honeymoonCourse} 감성을 살리면서 ${selectedCities.join(", ")} 중심으로 압축 구성했어요.`,
  };
}

export function serializeTripAnswers(answers: TripAnswers) {
  return encodeURIComponent(btoa(JSON.stringify(answers)));
}

export function deserializeTripAnswers(encoded: string | null): TripAnswers | null {
  if (!encoded) return null;

  try {
    const parsed = JSON.parse(atob(decodeURIComponent(encoded))) as Partial<TripAnswers>;
    return {
      ...defaultTripAnswers,
      ...parsed,
      customBudget: typeof parsed.customBudget === "string" ? parsed.customBudget : defaultTripAnswers.customBudget,
      budgetAmount: typeof parsed.budgetAmount === "number" ? parsed.budgetAmount : defaultTripAnswers.budgetAmount,
      selectedCountries: Array.isArray(parsed.selectedCountries) ? parsed.selectedCountries : [],
      selectedCities: Array.isArray(parsed.selectedCities) ? parsed.selectedCities : [],
      durationDays: typeof parsed.durationDays === "number" ? parsed.durationDays : defaultTripAnswers.durationDays,
    };
  } catch {
    return null;
  }
}

export function buildShareUrl(answers: TripAnswers) {
  const url = new URL(`${window.location.origin}/results`);
  url.searchParams.set("trip", serializeTripAnswers(answers));
  return url.toString();
}

export function buildShareText(answers: TripAnswers) {
  const plan = buildPersonalizedTripPlan(answers);
  return [
    "우리 허니문 플랜 공유해요",
    `여행지: ${plan.destination}`,
    `기간: ${plan.duration}`,
    `나라: ${plan.selectedCountries.join(", ")}`,
    `도시 코스: ${plan.selectedCities.join(", ")}`,
    `포인트: ${plan.summaryNote}`,
  ].join("\n");
}
