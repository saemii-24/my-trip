module.exports = {
  types: [
    { value: '🎉 init', name: '🎉 init:      첫 번째 커밋' },
    { value: '🚀 feat', name: '🚀 feat:     새로운 기능' },
    { value: '🐛 fix', name: '🐛 fix:      버그 수정' },
    { value: '♻️ refactor', name: '♻️ refactor: 리팩토링' },
    { value: '📝 docs', name: '📝 docs:     문서 수정' },
    { value: '🎨 style', name: '🎨 style:    코드 스타일 수정 (포맷팅 등)' },
    { value: '🚀 chore', name: '🚀 chore:    빌드/배포 관련 작업' },
    { value: '✅ test', name: '✅ test:     테스트 코드 추가/수정' },
    { value: '🔧 config', name: '🔧 config:   설정 파일 변경' }
  ],
  messages: {
    type: '어떤 종류의 변경인가요?:',
    scope: '변경 범위(옵션):',
    subject: '제목:\n',
    body: '본문 (Optional):\n',
    footer: '이슈 번호(Optional):',
    confirmCommit: '이 커밋 메시지로 커밋할까요?'
  },
  skipQuestions: ['breaking', 'scope'], 
  footerPrefix: '',
};
