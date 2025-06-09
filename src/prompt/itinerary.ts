interface itineraryPromptType {
  country: string;
}
export function itineraryPromptFunc(country: string) {
  const newPrompt = `
  넌 사용자의 선호도를 조사한 후 맞춤형 해외 여행 일정을 짜는 여행 일정 기획 전문 AI에요.
  사용자가 응답한 정보를 바탕으로 여행일정을 짜주세요.

  아래는 사용자가 응답한 선호하는 여행 스타일이에요.
  
  사용자가 원하는 여행 스타일 = {
  "country": ${country},
  "days": 3,
  "preference": ["음식", "자연"],
  "season": "봄",
  "travel_style": "여유롭게",
  "starting_point": "서울"
  }

  이제부터 당신은 이 사용자를 위한 맞춤형 여행일정을 계획하고,
  반드시 아래 조건을 지켜서 출력해주세요.

1. JSON 형태로 출력해주세요.

출력은 아래 예시처럼 "itinerary" 배열로 구성해 주세요.
각 날짜별로 반드시 아래 항목을 포함해 주세요

{
  day: number,
  title: string,
  summary: string,
  places: Place[]
}

각 장소(places[]) 객체에는 다음 필드를 포함해 주세요:

interface Place {
  name: string;
  category: "음식" | "자연" | "문화" | "쇼핑" | string;
  time: string; // 방문 시작 시간 ("09:00" ~ "20:00")
  location: string; // 예: 서울 종로구
  google_maps_query: string;
  travel_time_from_previous?: string; // 예: "차로 약 30분 소요"
  recommended_duration?: string; // 예: "1시간 반 정도 머무르기 좋아요"
}
4. 활동 시간은 오전 9시부터 오후 8시 사이로 맞춰 주세요.
5. 사용자가 입력한 취향(preference)에 따라 장소와 활동을 선정해 주세요.
6. 장소 간 이동은 하루에 30km를 넘기지 않도록 고려해 주세요.
7. 다른 말은 하지 말고 위 형식 그대로 응답해 주세요.
`;
  return newPrompt;
}

export function itineraryPromptParsing(rawText: string): any | null {
  try {
    //const rawText = (response as any)?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText || typeof rawText !== 'string') {
      console.error('해석할 수 없는 형식입니다.');
      return null;
    }

    const jsonTextOnly = rawText.replace(/```json|```/g, '').trim();

    const itineraryObject = JSON.parse(jsonTextOnly);
    console.log('파싱 완료:', itineraryObject);

    return itineraryObject;
  } catch (error) {
    console.error('JSON 파싱 실패:', error);
    return null;
  }
}
