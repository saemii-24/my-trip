'use client';
import React from 'react';
import { CategoryScale, ScriptableContext } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart, defaults } from 'chart.js/auto';
import { cn } from '@utils/cn';
import { CurrencyRateResponse } from '@query/useCurrencyGet';
import { lime, gray } from '@constant/color';

Chart.register(CategoryScale);

defaults.font.family = 'pretendard';
defaults.font.weight = 300;
defaults.font.size = 10;
defaults.color = gray['900'];
defaults.maintainAspectRatio = false;
defaults.responsive = true;

interface CurrencyChartProps {
  currencyRateData: CurrencyRateResponse | undefined;
  showAxisLabels?: boolean; // x, y축 숫자 라벨 표시 여부
  showAxisLines?: boolean; // x, y축 테두리 선 표시 여부
  className?: string;
}

const CurrencyChart = ({
  currencyRateData,
  showAxisLabels = true,
  showAxisLines = true,
  className,
}: CurrencyChartProps) => {
  const labels = currencyRateData?.currencyRate.map((item) => Object.keys(item)[0]) ?? [];
  const values =
    currencyRateData?.currencyRate.map((item) => Object.values(item)[0]) ?? [];

  const data = {
    labels,
    datasets: [
      {
        data: values,
        fill: 'start',
        borderColor: lime['500'],
        borderWidth: 1,
        pointRadius: 0,
        pointBackgroundColor: lime['400'],
        backgroundColor: (context: ScriptableContext<'line'>) => {
          const chart = context.chart;
          const { ctx, chartArea } = chart;
          if (!chartArea) return undefined;

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.top,
            0,
            chartArea.bottom,
          );
          gradient.addColorStop(0, lime['400'] + '80');
          gradient.addColorStop(1, lime['400'] + '00');
          return gradient;
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${currencyRateData?.currencyCode} ${Number(context.parsed.y).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          display: showAxisLabels,
          font: { size: 14 },
        },
        grid: {
          color: 'transparent',
          drawBorder: showAxisLines,
        },
        border: {
          display: showAxisLines,
        },
      },
      y: {
        ticks: {
          display: showAxisLabels,
          font: { size: 14 },
        },
        grid: {
          color: 'transparent',
          drawBorder: showAxisLines,
        },
        border: {
          display: showAxisLines,
        },
      },
    },
  };

  return (
    <div className={cn('w-full', className)}>
      <Line data={data} options={options} />
    </div>
  );
};

export default CurrencyChart;
