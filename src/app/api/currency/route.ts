import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

const changeMonthToPage = {
  '1month': 3,
  '3month': 7,
  '12month': 25,
};

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currencyCode = searchParams.get('currencyCode')?.toUpperCase();
  const day = searchParams.get('day') || '1';

  if (!currencyCode) {
    return NextResponse.json(
      { error: 'currencyCode query param is required.' },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      `https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_${currencyCode}KRW&page=${day}`,
      { cache: 'force-cache' },
    );
    const html = await res.text();
    const $ = cheerio.load(html);

    const result: { [key: string]: number }[] = [];

    $('table.tbl_exchange tbody tr').each((_, el) => {
      const date = $(el).find('td').eq(0).text().trim();
      const rateText = $(el).find('td').eq(1).text().trim();

      if (date && rateText) {
        const rate = parseFloat(rateText.replace(/,/g, ''));
        result.push({ [date]: rate });
      }
    });

    //여기서 찾아지는 값은 {'2025.07.04':'100'}[] 임

    if (day !== '1') {
      const newDate = new Date();
      const year = newDate.getFullYear();
      const month = newDate.getMonth();
      const day = newDate.getDay();
      const today = `${year}.${month}.${day}`;
      console.log(today);
    }

    if (result.length === 0) {
      return NextResponse.json({ error: 'no exchange rate data' }, { status: 404 });
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch exchange rate data' },
      { status: 500 },
    );
  }
}
