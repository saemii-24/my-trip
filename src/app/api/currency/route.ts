import { NextRequest, NextResponse } from 'next/server';
import * as cheerio from 'cheerio';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const currencyCode = searchParams.get('currencyCode')?.toUpperCase();

  if (!currencyCode) {
    return NextResponse.json(
      { error: 'currencyCode query param is required.' },
      { status: 400 },
    );
  }

  try {
    const res = await fetch(
      `https://finance.naver.com/marketindex/exchangeDailyQuote.nhn?marketindexCd=FX_${currencyCode}KRW`,
      { cache: 'no-store' },
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
