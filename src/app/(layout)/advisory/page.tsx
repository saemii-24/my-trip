'use client';

import { useState } from 'react';
import Table from '@components/public/Advisory/Table';
import useTravelAdvisoryListGet from '@query/useTravelAdvisoryListGet';
import { TravelAdvisoryItemGetType } from '@type/queryReturnType';
import Pagination from '@components/public/Advisory/Pagination';

const ITEMS_PER_PAGE = 10;

export default function Advisory() {
  const [page, setPage] = useState(1);
  const { travelAdvisoryTotalCount, travelAdvisoryData, travelAdvisoryIsLoading } =
    useTravelAdvisoryListGet('미합중국', page);

  if (travelAdvisoryIsLoading || !travelAdvisoryData) {
    return <div className='p-4'>로딩 중...</div>;
  }

  const totalPages = travelAdvisoryTotalCount
    ? Math.ceil(travelAdvisoryTotalCount / ITEMS_PER_PAGE)
    : 1;

  const sortedData: TravelAdvisoryItemGetType[] = [...travelAdvisoryData].sort(
    (a, b) => b.sfty_notice_origin_id - a.sfty_notice_origin_id,
  );

  return (
    <div className='w-full p-4'>
      <div className='w-full overflow-x-auto border rounded-md'>
        <Table className='grid-cols-[60px_1fr_140px]'>
          <Table.Row>
            <Table.Th>No</Table.Th>
            <Table.Th>제목</Table.Th>
            <Table.Th className='text-right'>작성일</Table.Th>
          </Table.Row>

          {travelAdvisoryTotalCount &&
            sortedData.map((item, index) => (
              <Table.Row key={item.sfty_notice_id}>
                <Table.Td>
                  {travelAdvisoryTotalCount - ((page - 1) * ITEMS_PER_PAGE + index)}
                </Table.Td>
                <Table.Td>{item.title}</Table.Td>
                <Table.Td className='text-right'>{item.wrt_dt}</Table.Td>
              </Table.Row>
            ))}
        </Table>
      </div>
      <Pagination page={page} setPage={setPage} totalPages={totalPages} />
    </div>
  );
}
