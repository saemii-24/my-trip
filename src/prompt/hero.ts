interface HeroPromptType {
  country: string;
  description: string;
}

export default function heroPromptFunc({ country, description }: HeroPromptType): string {
  const newPrompt = `
"${country}"를 주제로 한 멋진 풍경 사진이에요.
이미지의 설명은 다음과 같아요: "${description}".

이 이미지를 바탕으로 여행 웹사이트의 Hero Section에 어울리는
감성적인 한 줄 제목(Title)과 짧은 설명문(Content)을 만들어주세요.

1. 전체적인 말투 예시는 다음과 같아요.
❌잘못된 말투: 영화 속 주인공처럼, 잊지 못할 방콕의 야경을 만끽하세요. 잊혀지지 않을 밤의 향연이 당신을 기다립니다.
👍잘못된 말투: 영화 속 주인공처럼, 잊지 못할 방콕의 야경을 만끽하세요. 잊혀지지 않을 밤의 향연이 여러분을 기다릴거에요.

2. 형식은 아래처럼 써 주세요. 하이픈(-) 없이 깔끔하게!
이때 Content가 두 문장이라면 문장이 끝나는 지점에서 줄바꿈 처리(\n) 해주세요.

Title: [짧고 시적인 한 문장, 부드러운 말투로]
Content: [감성적인 설명문 한두 문장, 따뜻하고 자연스러운 말투로]

반드시 한국어로 작성해 주세요. 다른 말은 하지 말고 위 형식 그대로 응답해 주세요.
`;
  return newPrompt;
}
