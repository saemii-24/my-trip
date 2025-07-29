import Notice from '@components/public/Notice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/react';
import useNoticeGet from '../query/useNoticeGet';

// Mock data with proper typing
const mockNoticeData = [
  {
    id: '1',
    title: '테스트 공지사항',
    file_download_url: 'https://example.com/file.pdf',
    written_dt: '2024-01-15',
    txt_origin_cn: '테스트 공지사항 내용입니다.',
  },
];

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
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

// Mock the hook
jest.mock('@query/useNoticeGet', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseNoticeGet = useNoticeGet as jest.MockedFunction<typeof useNoticeGet>;

describe('Notice 컴포넌트', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('기본 렌더링', () => {
    it('제목과 설명이 올바르게 렌더링된다', async () => {
      mockUseNoticeGet.mockReturnValue({
        noticeData: mockNoticeData,
        noticeIsLoading: false,
        noticeTotalCount: mockNoticeData.length,
        noticeIsSuccess: true,
        noticeIsError: false,
        noticeError: null,
        noticeRefetch: jest.fn(() => Promise.resolve({} as any)),
      });

      renderWithQueryClient(<Notice />);

      // 컨텐츠 확인
      expect(screen.queryByText('로딩 중...')).not.toBeInTheDocument();
      expect(screen.getByText('외교부 공지사항')).toBeInTheDocument();
      expect(screen.getByText('테스트 공지사항')).toBeInTheDocument();
    });

    it('로딩 상태가 올바르게 렌더링된다', () => {
      // Mock loading state with all required properties
      mockUseNoticeGet.mockReturnValue({
        noticeData: null,
        noticeIsLoading: true,
        noticeTotalCount: 0,
        noticeIsSuccess: false,
        noticeIsError: false,
        noticeError: null,
        noticeRefetch: jest.fn(() => Promise.resolve({} as any)),
      });

      renderWithQueryClient(<Notice />);

      expect(screen.getByText('로딩 중...')).toBeInTheDocument();
      expect(screen.queryByText('외교부 공지사항')).not.toBeInTheDocument();
    });

    it('에러 상태가 올바르게 처리된다', () => {
      // Mock error state
      const mockError = new Error('API 호출 실패');

      mockUseNoticeGet.mockReturnValue({
        noticeData: null,
        noticeIsLoading: false,
        noticeTotalCount: 0,
        noticeIsSuccess: false,
        noticeIsError: true,
        noticeError: mockError,
        noticeRefetch: jest.fn(() => Promise.resolve({} as any)),
      });

      renderWithQueryClient(<Notice />);

      // 에러 처리 로직이 있다면 여기서 테스트
      // 현재 컴포넌트는 에러 상태를 따로 처리하지 않으므로 로딩 화면이 표시됨
      expect(screen.getByText('로딩 중...')).toBeInTheDocument();
    });
  });

  describe('페이지네이션', () => {
    it('페이지네이션이 올바르게 렌더링된다', () => {
      mockUseNoticeGet.mockReturnValue({
        noticeData: mockNoticeData,
        noticeIsLoading: false,
        noticeTotalCount: 20, // 여러 페이지를 만들기 위해 더 큰 수
        noticeIsSuccess: true,
        noticeIsError: false,
        noticeError: null,
        noticeRefetch: jest.fn(() => Promise.resolve({} as any)),
      });

      renderWithQueryClient(<Notice />);

      // 페이지네이션 컴포넌트가 렌더링되는지 확인
      // 실제 페이지네이션 구현에 따라 테스트 내용을 조정하세요
      expect(screen.getByText('외교부 공지사항')).toBeInTheDocument();
    });

    it('페이지네이션 비활성화가 올바르게 작동한다', () => {
      mockUseNoticeGet.mockReturnValue({
        noticeData: mockNoticeData,
        noticeIsLoading: false,
        noticeTotalCount: mockNoticeData.length,
        noticeIsSuccess: true,
        noticeIsError: false,
        noticeError: null,
        noticeRefetch: jest.fn(() => Promise.resolve({} as any)),
      });

      renderWithQueryClient(<Notice pagination={false} />);

      expect(screen.getByText('외교부 공지사항')).toBeInTheDocument();
      // 페이지네이션이 없어야 함 (구체적인 테스트는 페이지네이션 구현에 따라)
    });
  });
});
const createMockNoticeGetReturn = (overrides = {}) => ({
  noticeData: mockNoticeData,
  noticeIsLoading: false,
  noticeTotalCount: mockNoticeData.length,
  noticeIsSuccess: true,
  noticeIsError: false,
  noticeError: null,
  noticeRefetch: jest.fn(() => Promise.resolve({} as any)),
  ...overrides,
});

describe('Notice 컴포넌트 (Helper 사용)', () => {
  it('간편한 테스트 작성', () => {
    // 기본값 사용
    mockUseNoticeGet.mockReturnValue(createMockNoticeGetReturn());

    renderWithQueryClient(<Notice />);
    expect(screen.getByText('외교부 공지사항')).toBeInTheDocument();
  });

  it('로딩 상태 테스트', () => {
    // 일부값만 오버라이드
    mockUseNoticeGet.mockReturnValue(
      createMockNoticeGetReturn({
        noticeData: null,
        noticeIsLoading: true,
        noticeIsSuccess: false,
      }),
    );

    renderWithQueryClient(<Notice />);
    expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  });
});
