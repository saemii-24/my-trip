'use client';

import { useState } from 'react';
import Table from '@components/public/Advisory/Table';
import useNoticeGet from '@query/useNoticeGet';
import Container from './Container';
import { Download, Megaphone } from 'lucide-react';
import Link from 'next/link';
import formatDate from '@utils/formatDate';

interface NoticeProps {
  pagination?: boolean;
  numOfRows?: number;
}

export default function Notice({ pagination = true, numOfRows = 10 }: NoticeProps) {
  const [page, setPage] = useState(1);
  const { noticeData, noticeIsLoading, noticeTotalCount } = useNoticeGet(page, numOfRows);

  console.log(numOfRows);

  if (noticeIsLoading || !noticeData) {
    return <div className='p-4'>로딩 중...</div>;
  }

  const totalPages = noticeTotalCount ? Math.ceil(noticeTotalCount / numOfRows) : 1;

  return (
    <div className='w-full p-4 py-[150px]'>
      <Container>
        <div className='flex w-full justify-between'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 max-w-[55%] !leading-[130%] text-start'>
            <Megaphone className='size-[62px] translate-y-[-8px] text-green-500 inline-block' />
            <span className='ml-4'>외교부 공지사항</span>
          </h1>
          <div className='text-lg leading-[160%]'>
            외교부에서 제공하는 출국 전<br /> 참고해야 할 공지사항을 확인하세요.
          </div>
        </div>
        <div className='w-full overflow-x-auto  rounded-md'>
          <Table className='grid-cols-[1fr_140px_300px]'>
            <Table.Row>
              {/* <Table.Th>No</Table.Th> */}
              <Table.Th>제목</Table.Th>
              <Table.Th>자료</Table.Th>
              <Table.Th className='text-right'>작성일</Table.Th>
            </Table.Row>
            {noticeTotalCount &&
              noticeData.map((item: any, index: number) => (
                <Table.Row key={item.title}>
                  {/* <Table.Td>
                    {noticeTotalCount - ((page - 1) * numOfRows + index)}
                  </Table.Td> */}
                  <Table.Td>{item.title}</Table.Td>
                  <Table.Td>
                    {item.file_download_url && (
                      <Link
                        href={item.file_download_url}
                        alt={item.title + '자료'}
                        className='size-10 bg-green-400 center-flex rounded-full'
                      >
                        <Download />
                      </Link>
                    )}
                  </Table.Td>
                  <Table.Td className='text-right'>
                    {formatDate(item.written_dt)}
                  </Table.Td>
                </Table.Row>
              ))}
          </Table>
        </div>
        {pagination && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
      </Container>
    </div>
  );
}
