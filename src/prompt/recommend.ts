export function recommendPromptFunc(country: string, city: string) {
  return `
당신은 ${country} ${city} 여행 전문가입니다.

사용자는 ${country} ${city}에서 여행하기 좋은 장소를 찾고자 합니다.

추천해야 할 장소는 다음과 같이 3가지 분류로 나뉩니다:

1. 관광 명소 (6곳)
2. 음식점 또는 카페, 레스토랑 (3곳)
3. 쇼핑 장소 (3곳)

각 항목은 장소 이름과 간단한 설명을 포함해 주세요.
설명은 1~2문장 분량으로 해당 장소의 특징이나 추천 이유를 알려 주세요.

다음과 같은 JSON 형식으로 출력해 주세요. 
이떄 반드시 설명 없이 JSON만 출력하도록 합니다.

{
  "sightseeing": [
    {
      "name": "장소 이름",
      "description": "간단한 설명"
    },
    ...
  ],
  "food": [
    {
      "name": "음식점 이름",
      "description": "간단한 설명"
    },
    ...
  ],
  "shopping": [
    {
      "name": "쇼핑 장소 이름",
      "description": "간단한 설명"
    },
    ...
  ]
}

※ 모든 항목은 문자열로 작성해 주세요.
※ 설명은 마크다운 없이 평문으로 작성해 주세요.
※ 위치는: ${country}, ${city}
  `.trim();
}

export function recommendPromptParsing(rawText: string): any | null {
  try {
    if (!rawText || typeof rawText !== 'string') {
      console.error('해석할 수 없는 형식입니다.');
      return null;
    }

    const jsonTextOnly = rawText.replace(/```json|```/g, '').trim();

    const recommendObject = JSON.parse(jsonTextOnly);

    return recommendObject;
  } catch (error) {
    console.error('JSON 파싱 실패:', error);
    return null;
  }
}
