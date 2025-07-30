'use client';

import { useState } from 'react';
import Table from '@components/public/Advisory/Table';
import useNoticeGet from '@query/useNoticeGet';
import Container from './Container';
import { ChevronDown, ChevronUp, Megaphone } from 'lucide-react';
import Link from 'next/link';
import formatDate from '@utils/formatDate';
import Pagination from './Advisory/Pagination';
import { cn } from '@utils/cn';
import parseSentence from '@utils/parseSentece';

interface NoticeProps {
  pagination?: boolean;
  numOfRows?: number;
}

export default function Notice({ pagination = true, numOfRows = 8 }: NoticeProps) {
  const [page, setPage] = useState(1);
  const { noticeData, noticeIsLoading, noticeTotalCount } = useNoticeGet(page, numOfRows);
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  if (noticeIsLoading || !noticeData) {
    return <div className='p-4'>로딩 중...</div>;
  }

  const totalPages = noticeTotalCount ? Math.ceil(noticeTotalCount / numOfRows) : 1;

  return (
    <div className='w-full p-4 py-[150px] bg-zinc-50 mt-[150px]'>
      <Container>
        <div className='flex w-full justify-between'>
          <h1 className='text-4xl md:text-6xl font-bold mb-4 max-w-[55%] !leading-[130%] text-start'>
            <Megaphone className='size-[62px] translate-y-[-8px] text-green-500 inline-block' />
            <span className='ml-4'>외교부 공지사항</span>
          </h1>
          <div className='text-lg leading-[160%]'>
            외교부에서 제공하는 출국 전
            <br />
            참고해야 할 공지사항을 확인하세요.
          </div>
        </div>

        <div className='w-full overflow-x-auto rounded-md'>
          <Table>
            <Table.Group className='border-b border-zinc-600'>
              <Table.Th>Title</Table.Th>
              <Table.Th>File</Table.Th>
              <Table.Th>Date</Table.Th>
              <Table.Th>More</Table.Th>
            </Table.Group>

            {noticeData.map((item: any, index: number) => {
              const id = `${page}-${index}`;
              const isOpen = openId === id;

              return (
                <Table key={id}>
                  <Table.Group>
                    <Table.Td>{item.title}</Table.Td>
                    <Table.Td>
                      {item.file_download_url && (
                        <Link
                          href={item.file_download_url}
                          target='_blank'
                          className='flex-center text-lg border border-zinc-200 py-1 px-3 rounded-full hover:text-green-500'
                        >
                          첨부파일
                        </Link>
                      )}
                    </Table.Td>
                    <Table.Td>{formatDate(item.written_dt)}</Table.Td>
                    <Table.Td>
                      {item.txt_origin_cn && (
                        <button
                          data-testid={`more-button`}
                          onClick={() => toggle(id)}
                          className='size-12  bg-zinc-100 hover:bg-green-500 rounded-full flex-center'
                        >
                          {isOpen ? <ChevronUp /> : <ChevronDown />}
                        </button>
                      )}
                    </Table.Td>
                  </Table.Group>

                  {isOpen && item.txt_origin_cn && (
                    <Table.ExpandRow>{parseSentence(item.txt_origin_cn)}</Table.ExpandRow>
                  )}
                </Table>
              );
            })}
          </Table>
        </div>

        {pagination && (
          <Pagination page={page} setPage={setPage} totalPages={totalPages} />
        )}
      </Container>
    </div>
  );
}
