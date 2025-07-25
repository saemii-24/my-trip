import { http, HttpResponse } from 'msw';

// Mock 데이터 - 실제 API 응답 구조에 맞춤
const mockNoticeItems = [
  {
    id: '1',
    title: '외교부 긴급공지: 유럽 여행 시 주의사항',
    file_download_url: 'https://example.com/files/europe-travel-notice.pdf',
    written_dt: '2024-01-15',
    txt_origin_cn:
      '최근 유럽 지역의 기상 악화로 인해 항공편 지연 및 취소가 빈번하게 발생하고 있습니다. 여행 계획이 있으신 분들은 미리 항공사에 문의하여 일정을 확인하시기 바랍니다.',
  },
  {
    id: '2',
    title: '동남아시아 지역 안전 정보 업데이트',
    file_download_url: '',
    written_dt: '2024-01-14',
    txt_origin_cn:
      '태국, 베트남, 인도네시아 등 동남아시아 지역의 최신 안전 정보를 업데이트했습니다. 현지 정세 변화에 따른 주의사항을 숙지하시기 바랍니다.',
  },
  {
    id: '3',
    title: '여권 갱신 절차 변경 안내',
    file_download_url: 'https://example.com/files/passport-renewal-guide.pdf',
    written_dt: '2024-01-13',
    txt_origin_cn: null,
  },
  {
    id: '4',
    title: '코로나19 관련 출입국 규정 업데이트',
    file_download_url: '',
    written_dt: '2024-01-12',
    txt_origin_cn:
      '각국의 코로나19 관련 출입국 규정이 지속적으로 변경되고 있습니다. 출국 전 반드시 목적지 국가의 최신 규정을 확인하시기 바랍니다.',
  },
  {
    id: '5',
    title: '외교부 영사콜센터 운영시간 변경',
    file_download_url: 'https://example.com/files/call-center-hours.pdf',
    written_dt: '2024-01-11',
    txt_origin_cn:
      '외교부 영사콜센터의 운영시간이 변경됩니다. 새로운 운영시간은 평일 오전 9시부터 오후 6시까지입니다.',
  },
  {
    id: '6',
    title: '해외 의료보험 가입 권고사항',
    file_download_url: '',
    written_dt: '2024-01-10',
    txt_origin_cn:
      '해외 여행 시 의료보험 가입을 적극 권장합니다. 특히 장기 체류나 고위험 활동을 계획하신 분들은 반드시 적절한 보험에 가입하시기 바랍니다.',
  },
  {
    id: '7',
    title: '재외국민 등록 의무화 안내',
    file_download_url: 'https://example.com/files/overseas-registration.pdf',
    written_dt: '2024-01-09',
    txt_origin_cn: null,
  },
  {
    id: '8',
    title: '외교부 모바일 앱 업데이트',
    file_download_url: '',
    written_dt: '2024-01-08',
    txt_origin_cn:
      '외교부 공식 모바일 앱이 업데이트되었습니다. 새로운 기능으로는 실시간 안전정보 알림, 영사서비스 신청 등이 추가되었습니다.',
  },
  {
    id: '9',
    title: '여행경보 발령 현황 업데이트',
    file_download_url: '',
    written_dt: '2024-01-07',
    txt_origin_cn:
      '일부 국가에 대한 여행경보가 조정되었습니다. 여행 계획이 있으신 분들은 외교부 여행경보 페이지를 확인하시기 바랍니다.',
  },
  {
    id: '10',
    title: '긴급상황 대응 가이드라인',
    file_download_url: 'https://example.com/files/emergency-guide.pdf',
    written_dt: '2024-01-06',
    txt_origin_cn:
      '해외에서 긴급상황 발생 시 대응 방법에 대한 가이드라인을 제공합니다. 여행 전 숙지하시어 안전한 여행되시기 바랍니다.',
  },
];

export const handlers = [
  // 실제 API 엔드포인트와 응답 구조에 맞춤
  http.get('/api/notice', ({ request }) => {
    const url = new URL(request.url);
    const pageNo = parseInt(url.searchParams.get('pageNo') || '1');
    const numOfRows = parseInt(url.searchParams.get('numOfRows') || '10');

    console.log(`MSW: /api/notice 호출 - pageNo: ${pageNo}, numOfRows: ${numOfRows}`);

    // 페이징 처리
    const startIndex = (pageNo - 1) * numOfRows;
    const endIndex = startIndex + numOfRows;
    const paginatedItems = mockNoticeItems.slice(startIndex, endIndex);

    // 실제 API 응답 구조에 맞춤
    const responseData = {
      response: {
        header: {
          resultCode: '00',
          resultMsg: 'NORMAL SERVICE.',
        },
        body: {
          dataType: 'XML',
          items: {
            item: paginatedItems,
          },
          numOfRows: numOfRows,
          pageNo: pageNo,
          totalCount: mockNoticeItems.length,
        },
      },
    };

    return HttpResponse.json(responseData);
  }),

  // 에러 시나리오 테스트용
  http.get('/api/notice/error', () => {
    console.log('MSW: 에러 응답 시뮬레이션');
    return HttpResponse.json(
      {
        response: {
          header: {
            resultCode: '99',
            resultMsg: 'APPLICATION ERROR',
          },
        },
      },
      { status: 500 },
    );
  }),

  // 빈 데이터 시나리오 테스트용
  http.get('/api/notice/empty', ({ request }) => {
    const url = new URL(request.url);
    const pageNo = parseInt(url.searchParams.get('pageNo') || '1');
    const numOfRows = parseInt(url.searchParams.get('numOfRows') || '10');

    console.log('MSW: 빈 데이터 응답 시뮬레이션');

    return HttpResponse.json({
      response: {
        header: {
          resultCode: '00',
          resultMsg: 'NORMAL SERVICE.',
        },
        body: {
          dataType: 'XML',
          items: {
            item: [],
          },
          numOfRows: numOfRows,
          pageNo: pageNo,
          totalCount: 0,
        },
      },
    });
  }),

  // 로딩 지연 테스트용
  http.get('/api/notice/slow', async ({ request }) => {
    const url = new URL(request.url);
    const pageNo = parseInt(url.searchParams.get('pageNo') || '1');
    const numOfRows = parseInt(url.searchParams.get('numOfRows') || '10');

    console.log('MSW: 느린 응답 시뮬레이션 (2초 지연)');

    // 2초 지연
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const startIndex = (pageNo - 1) * numOfRows;
    const endIndex = startIndex + numOfRows;
    const paginatedItems = mockNoticeItems.slice(startIndex, endIndex);

    return HttpResponse.json({
      response: {
        header: {
          resultCode: '00',
          resultMsg: 'NORMAL SERVICE.',
        },
        body: {
          dataType: 'XML',
          items: {
            item: paginatedItems,
          },
          numOfRows: numOfRows,
          pageNo: pageNo,
          totalCount: mockNoticeItems.length,
        },
      },
    });
  }),
];
