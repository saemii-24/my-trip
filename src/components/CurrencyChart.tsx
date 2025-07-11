'use client';
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { defaults } from 'chart.js/auto';
import { cn } from '@utils/cn';
import { CurrencyRateResponse } from '@query/useCurrencyGet';
import { green, gray } from '@constant/color';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { Equal, TrendingDown, TrendingUp } from 'lucide-react';

// Register everything
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  annotationPlugin,
);

defaults.font.family = '__suit_6d528b, __suit_Fallback_6d528b, sans-serif';
defaults.font.weight = 300;
defaults.font.size = 16;
defaults.color = gray['900'];
defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface CurrencyChartProps {
  currencyRateData: CurrencyRateResponse | undefined;
  showAxisLabels?: boolean;
  showAxisLines?: boolean;
  className?: string;
}

const CurrencyChart = ({ currencyRateData, className }: CurrencyChartProps) => {
  const originLables =
    currencyRateData?.currencyRate.map((item) => Object.keys(item)[0]) ?? []; //full date
  const originValues =
    currencyRateData?.currencyRate.map((item) => Object.values(item)[0]) ?? [];

  const labels =
    currencyRateData?.currencyRate.map((item) => Object.keys(item)[0]).slice(1) ?? []; //full date
  const values =
    currencyRateData?.currencyRate.map((item) => Object.values(item)[0]).slice(1) ?? [];

  const [hoverLabel, setHoverLabel] = useState<string | null>(labels[labels.length - 1]);
  const [hoverValue, setHoverValue] = useState<number | null>(
    Number(values[values.length - 1]),
  );

  const compare = useMemo(() => {
    if (!hoverLabel) return null;

    const index = originLables.indexOf(hoverLabel);
    const currentValue = Number(originValues[index]);
    const prevValue = Number(originValues[index - 1]);

    if (index <= 0 || prevValue === undefined || isNaN(prevValue)) return null;

    const change = currentValue - prevValue;
    const rate = Math.abs((change / Math.abs(prevValue)) * 100).toFixed(2);

    if (change > 0) {
      return {
        currentDay: hoverLabel,
        prevDay: originLables[index - 1],
        change: 'increase',
        rate,
      };
    } else if (change < 0) {
      return {
        currentDay: hoverLabel,
        prevDay: originLables[index - 1],
        change: 'decrease',
        rate: rate,
      };
    } else {
      return {
        currentDay: hoverLabel,
        prevDay: originLables[index - 1],
        change: 'no change',
        rate: `0.00`,
      };
    }
  }, [hoverLabel, originLables, values]);

  console.log(compare);
  const data = {
    labels: labels,
    datasets: [
      {
        data: values,
        fill: 'start',
        borderColor: green['500'],
        borderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        point: false,
        pointBackgroundColor: green['500'],
        backgroundColor: 'transparent',
      },
    ],
  };

  const options = useMemo(
    () => ({
      responsive: true,
      interaction: {
        mode: 'index' as const,
        intersect: false,
      },
      elements: {
        point: {
          radius: 0,
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          enabled: true,
          backgroundColor: '#111827',
          titleColor: '#ffffff',
          bodyColor: '#e5e7eb',
          // borderColor: '#4ade80',
          borderWidth: 1,
          cornerRadius: 6,
          padding: 10,
          displayColors: false,
          titleFont: {
            size: 18,
            weight: 600,
          },

          callbacks: {
            title: (context: any) => {
              //툴팁 x축 y축 레이블 순서 교체
              const value = context[0].parsed.y.toFixed(2);
              return `KRW ${value}`;
            },
            label: (context: any) => {
              const index = context.dataIndex;
              return `${labels[index]}`;
            },
          },
        },
        annotation: {
          annotations: {
            ...(hoverLabel && {
              verticalLine: {
                type: 'line',
                scaleID: 'x',
                value: hoverLabel,
                borderColor: '#4ade80',
                borderWidth: 1,
                borderDash: [4, 4],
              },
            }),
            ...(hoverValue !== null && {
              horizontalLine: {
                type: 'line',
                scaleID: 'y',
                value: hoverValue,
                borderColor: '#4ade80',
                borderWidth: 1,
                borderDash: [4, 4],
                label: {
                  enabled: true,
                  content: `${currencyRateData?.currencyCode} ${hoverValue.toFixed(2)}`,
                  position: 'start',
                  backgroundColor: '#4ade80',
                  color: '#fff',
                  font: {
                    weight: 'bold',
                  },
                  xAdjust: 6,
                  yAdjust: -4,
                },
              },
            }),
          },
        },
      },
      onHover: (_: any, elements: any[]) => {
        if (!elements?.length) return;
        const index = elements[0].index;
        setHoverLabel(labels[index]);
        setHoverValue(Number(values[index]));
      },
      scales: {
        x: {
          ticks: {
            align: 'center',
            callback: (value: string | number) => {
              return labels[Number(value)].slice(5);
            },
            display: true,
            padding: 20,
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
        y: {
          ticks: {
            align: 'center',
            crossAlign: 'start', //text-align
            display: true,
            padding: 6,
          },
          grid: {
            display: false,
          },
          border: {
            display: false,
          },
        },
      },
    }),
    [hoverLabel],
  );

  return (
    <div className={cn('flex gap-20 ', className)}>
      {/* Left Detail Card */}
      <div className='flex flex-col justify-center w-[300px] border-r  border-zinc-100 bg-white '>
        <p className='text-lg font-semi text-gray-500'>{hoverLabel ?? '-'} 기준 환율</p>
        <p className='text-[44px] font-semibold '>TWD 1.00</p>
        <div className='bg-zinc-100 rounded-full size-10 flex-center shrink-0'>
          <Equal />
        </div>
        <p className='text-[44px] font-semibold '>
          {hoverValue ? `KRW ${hoverValue.toFixed(2)}` : '-'}
        </p>

        <div className='flex gap-2 items-center'>
          <p className='text-lg font-semi text-gray-500'>전날 대비</p>
          <div className='text-lg font-bold'>
            {compare?.change === 'increase' && (
              <div className='flex gap-2 items-center text-red-500'>
                <TrendingUp strokeWidth={1.7} />
                {compare.rate}
              </div>
            )}
            {compare?.change === 'decrease' && (
              <div className='flex gap-2 items-center text-green-500'>
                <TrendingDown strokeWidth={1.7} />
                {compare.rate}
              </div>
            )}
            {compare?.change === 'no change' && (
              <div className='text-gray-600'>
                <span className='text-gray-600'> - </span>
                {compare.rate}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className='flex-1 min-w-0 h-[300px]'>
        {/* @ts-ignore */}
        <Line data={data} options={options} />
      </div>
    </div>
  );
};

export default CurrencyChart;
