function decodeHtmlEntities(html: string): string {
  const txt = document.createElement('textarea');
  txt.innerHTML = html;
  return txt.value;
}

export default function convertXmlStringToObject(
  rawHtml: string,
): Record<string, string> {
  const decoded = decodeHtmlEntities(rawHtml);

  const lines = decoded
    .split(/<br\s*\/?>/i) // 1. <br> 기준으로 줄 나누기
    .map((line) => line.replace(/<[^>]*>/g, '').trim()) // 2. 남은 HTML 태그 제거 + 공백 정리
    .filter((line) => line.startsWith('ㅇ')); // 3. "ㅇ"으로 시작하는 정보 줄만 필터링

  const result: Record<string, string> = {};

  lines.forEach((line) => {
    const match = line.match(/^ㅇ\s*(.+?)\s*:\s*(.+)$/); // 4. "ㅇ 키 : 값" 패턴 추출
    if (match) {
      const [, key, value] = match;
      result[key.trim()] = value.trim(); // 5. 객체로 저장
    }
  });

  return result;
}
