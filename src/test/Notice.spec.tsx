import Notice from '@components/public/Notice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, waitFor } from '@testing-library/react';
import { screen, configure } from '@testing-library/react';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false, // 테스트에서는 재시도 비활성화
        staleTime: 0,
      },
    },
  });

const renderWithQueryClient = (component: React.ReactElement) => {
  const testQueryClient = createTestQueryClient();
  return render(
    <QueryClientProvider client={testQueryClient}>{component}</QueryClientProvider>,
  );
};

describe('Notice 컴포넌트', () => {
  describe('기본 렌더링', () => {
    it('제목과 설명이 올바르게 렌더링된다', async () => {
      renderWithQueryClient(<Notice />);

      // 로딩이 끝날 때까지 기다림
      await waitFor(() => {
        expect(screen.queryByText('로딩 중...')).not.toBeInTheDocument();
      });

      // 그 다음 컨텐츠 확인
      expect(screen.getByText('외교부 공지사항')).toBeInTheDocument();
    });

    it('테이블 헤더가 올바르게 렌더링된다', () => {});

    it('Megaphone 아이콘이 표시된다', () => {});
  });

  describe('데이터 로딩 및 표시', () => {
    it('로딩 중일 때 로딩 메시지가 표시된다', () => {});

    it('MSW mock 데이터가 올바르게 렌더링된다', async () => {});

    it('첨부파일 링크가 올바르게 렌더링된다', async () => {});

    it('첨부파일이 없는 항목은 링크가 표시되지 않는다', async () => {});

    it('날짜가 올바르게 포맷되어 표시된다', async () => {});
  });

  describe('상세 내용 토글 기능', () => {
    it('txt_origin_cn이 있는 항목에만 토글 버튼이 표시된다', async () => {});

    it('토글 버튼 클릭 시 상세 내용이 표시된다', async () => {});

    it('열린 항목을 다시 클릭하면 닫힌다', async () => {});

    it('하나의 항목만 열림 상태를 유지한다', async () => {});

    it('ChevronUp/ChevronDown 아이콘이 상태에 따라 변경된다', async () => {});
  });

  describe('페이지네이션', () => {
    it('pagination이 true일 때 페이지네이션이 렌더링된다', async () => {});

    it('pagination이 false일 때 페이지네이션이 렌더링되지 않는다', async () => {});

    it('totalPages가 올바르게 계산된다', async () => {});

    it('페이지 변경 시 새로운 데이터를 로드한다', async () => {});
  });

  describe('Props 처리', () => {
    it('numOfRows prop이 올바르게 전달된다', async () => {});

    it('기본값이 올바르게 설정된다', () => {});
  });

  describe('에러 처리', () => {
    it('API 에러 시 적절히 처리된다', async () => {});

    it('noticeData가 null일 때 로딩 메시지를 표시한다', () => {});
  });

  describe('접근성', () => {
    it('키보드로 토글 버튼에 접근할 수 있다', async () => {});

    it('첨부파일 링크가 새 탭에서 열린다', async () => {});
  });
});
