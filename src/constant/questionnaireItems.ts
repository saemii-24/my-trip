export const questionnaireItems = [
  {
    id: 'country',
    title: '여행 국가를 선택해주세요',
    waitAnswer: '이번 여행은 어디로 떠나실 예정이신가요?',
    selectedNotice: 'user님은 @@을 여행하실 예정이시군요!',
  },
  {
    id: 'days',
    title: '여행 기간을 알려주세요',
    waitAnswer: '총 며칠 동안 여행하실 계획인가요?',
    selectedNotice: 'mm.dd~mm.dd일 총 @@일 동안의 여정을 준비해볼게요.',
  },
  {
    id: 'style',
    title: '선호하는 여행 스타일이 있으신가요?',
    waitAnswer: 'user님은 여행에서 어떤 것을 가장 중요하게 생각하세요?',
    selectedNotice: '여행 일정은 @@을 중심으로 계획해볼게요.',
  },
  {
    id: 'mustInclude',
    title: '일정에 꼭 포함되었으면 하는 것이 있나요?',
    waitAnswer: '꼭 가고 싶은 장소나, 해보고 싶은 것이 있다면\n 자유롭게 적어주세요.',
    selectedNotice: 'user님이 적어주신 내용은 일정에 꼭 포함할게요.',
  },
];
