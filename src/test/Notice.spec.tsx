import Notice from '@components/public/Notice';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import useNoticeGet, { NoticeItem } from '@query/useNoticeGet';

//렌더링에 사용할 가상의 데이터
const mockNoticeData: NoticeItem[] = [
  {
    id: '1',
    title: '테스트 공지사항 1',
    file_download_url: 'https://example.com/file1.pdf',
    written_dt: '2024-01-15',
    txt_origin_cn: '테스트 공지사항 1 내용입니다.',
  },
  {
    id: '2',
    title: '테스트 공지사항 2',
    file_download_url: '',
    written_dt: '2024-01-14',
    txt_origin_cn: '테스트 공지사항 2 내용입니다.',
  },
  {
    id: '3',
    title: '테스트 공지사항 3',
    file_download_url: 'https://example.com/file3.pdf',
    written_dt: '2024-01-13',
    txt_origin_cn: null,
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

//query mocking
//alias 사용할 때 오류 발생함
jest.mock('../query/useNoticeGet', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockUseNoticeGet = useNoticeGet as jest.MockedFunction<typeof useNoticeGet>;

const createSuccessfulMockReturn = (
  overrides: Partial<ReturnType<typeof useNoticeGet>> = {},
) => ({
  noticeData: mockNoticeData as NoticeItem[],
  noticeIsLoading: false, //로딩 중이 아님을 명시함
  noticeTotalCount: mockNoticeData.length,
  noticeIsSuccess: true,
  noticeIsError: false,
  noticeError: null,
  noticeRefetch: jest.fn(() => Promise.resolve({} as any)),
  ...overrides,
});

describe('Notice 컴포넌트', () => {
  // 모든 기본 렌더링 테스트에서 성공 상태로 mock 설정
  beforeEach(() => {
    mockUseNoticeGet.mockReturnValue(createSuccessfulMockReturn());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('기본 렌더링', () => {
    it('제목과 설명이 올바르게 렌더링된다', () => {
      renderWithQueryClient(<Notice />);

      // 메인 제목 확인
      expect(screen.getByText('외교부 공지사항')).toBeInTheDocument();

      // 설명 텍스트 확인 (줄바꿈이 있으므로 부분 매칭 사용)
      expect(screen.getByText(/외교부에서 제공하는 출국 전/)).toBeInTheDocument();
      expect(screen.getByText(/참고해야 할 공지사항을 확인하세요/)).toBeInTheDocument();

      // 로딩 상태가 아님을 확인
      expect(screen.queryByText('로딩 중...')).not.toBeInTheDocument();
    });

    it('테이블 헤더가 올바르게 렌더링된다', () => {
      renderWithQueryClient(<Notice />);

      // 테이블 헤더들 확인
      expect(screen.getByText('Title')).toBeInTheDocument();
      expect(screen.getByText('File')).toBeInTheDocument();
      expect(screen.getByText('Date')).toBeInTheDocument();
      expect(screen.getByText('More')).toBeInTheDocument();
    });

    it('공지사항 데이터가 올바르게 렌더링된다', () => {
      renderWithQueryClient(<Notice />);

      // Mock 데이터의 제목이 올바르게 표시되는지 확인한다.
      expect(screen.getByText('테스트 공지사항 1')).toBeInTheDocument();
      expect(screen.getByText('테스트 공지사항 2')).toBeInTheDocument();
      expect(screen.getByText('테스트 공지사항 3')).toBeInTheDocument();
    });

    it('첨부파일 링크가 올바르게 렌더링된다', () => {
      renderWithQueryClient(<Notice />);

      // 첨부파일이 있는 항목의 링크를 통해 첨부파일이 렌더링 된 갯수를 확인
      const attachmentLinks = screen.queryAllByText('첨부파일');
      expect(attachmentLinks).toHaveLength(2); // mockData에서 파일이 있는 항목 개수

      if (attachmentLinks.length > 0) {
        // 첫 번째 링크 속성 확인
        const firstLink = attachmentLinks[0].closest('a');
        expect(firstLink).toHaveAttribute('href', 'https://example.com/file1.pdf');
        expect(firstLink).toHaveAttribute('target', '_blank');
      }
    });

    it('More 버튼이 올바르게 렌더링된다', () => {
      renderWithQueryClient(<Notice />);

      // txt_origin_cn이 있는 항목들은 more-button이 표시되어야 한다.
      const moreButtons = screen.getAllByTestId('more-button');
      // txt_origin_cn이 null이 아닌 항목들에 대해서만 버튼이 표시됨 (2개)
      expect(moreButtons.length).toBe(2);
    });
  });

  describe('props 테스트', () => {
    it('pagination=false일 때 페이지네이션이 표시되지 않는다', () => {
      renderWithQueryClient(<Notice pagination={false} />);

      // 페이지네이션이 없어도 메인 컨텐츠는 표시되어야 함
      expect(screen.getByText('외교부 공지사항')).toBeInTheDocument();
      expect(screen.getByText('테스트 공지사항 1')).toBeInTheDocument();
    });

    it('numOfRows prop이 올바르게 전달된다', () => {
      renderWithQueryClient(<Notice numOfRows={5} />);

      // useNoticeGet이 올바른 파라미터로 호출되었는지 확인
      expect(mockUseNoticeGet).toHaveBeenCalledWith(1, 5);

      // 메인 컨텐츠는 정상 표시
      expect(screen.getByText('외교부 공지사항')).toBeInTheDocument();
    });
  });

  describe('로딩 상태 테스트', () => {
    it('로딩 중일 때 로딩 메시지가 표시된다', () => {
      // 이 테스트만 로딩 상태로 오버라이드
      mockUseNoticeGet.mockReturnValue(
        createSuccessfulMockReturn({
          noticeData: [],
          noticeIsLoading: true, //로딩 상태임을 명시
        }),
      );

      renderWithQueryClient(<Notice />);

      expect(screen.getByText('로딩 중...')).toBeInTheDocument();
      expect(screen.queryByText('외교부 공지사항')).not.toBeInTheDocument();
    });

    it('데이터가 null일 때 안내 문구를 표시한다.', () => {
      mockUseNoticeGet.mockReturnValue(
        createSuccessfulMockReturn({
          noticeData: [],
          noticeIsLoading: false, // 로딩은 끝났지만 데이터가 null
        }),
      );

      renderWithQueryClient(<Notice />);

      //TODO: 안내 문구 추가 필요
    });
  });
});
