export function recommendPromptFunc(country: string, city: string) {
  return `
당신은 ${country} ${city} 여행 전문가입니다.

사용자는 ${country} ${city}에서 여행하기 좋은 장소를 찾고자 합니다.

추천해야 할 장소는 다음과 같이 3가지 분류로 나뉩니다:

1. 관광 명소 (6곳)
2. 음식점 또는 카페, 레스토랑 (6곳)
3. ${country}와 ${city}의 특색이 있는 쇼핑 장소 (3곳)

각 분류는 아래의 정보를 포함해야 합니다:

- "criteria": 장소를 선정한 기준 (1문장)
- "places": 장소 이름과 간단한 설명 (각 1~2문장)

출력은 아래 JSON 형식을 따라 주세요.  
※ JSON 이외의 다른 출력(설명, 마크다운 등)은 절대 포함하지 마세요.

{
  "sightseeing": {
    "criteria": "관광명소 선정 기준에 대한 설명",
    "places": [
      {
        "name": "장소 이름",
        "description": "간단한 설명"
      },
      ...
    ]
  },
  "food": {
    "criteria": "음식점 선정 기준에 대한 설명",
    "places": [
      {
        "name": "음식점 이름",
        "description": "간단한 설명"
      },
      ...
    ]
  },
  "shopping": {
    "criteria": "쇼핑 장소 선정 기준에 대한 설명",
    "places": [
      {
        "name": "쇼핑 장소 이름",
        "description": "간단한 설명"
      },
      ...
    ]
  }
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
    console.log(recommendObject);

    return recommendObject;
  } catch (error) {
    console.error('JSON 파싱 실패:', error);
    return null;
  }
}
