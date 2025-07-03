'use client';
import React from 'react';
import { CategoryScale, ScriptableContext } from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Chart, defaults } from 'chart.js/auto';
import { cn } from '@utils/cn';
import useCurrencyGet from '@query/useCurrencyGet';
import { lime, gray } from '@constant/color';

// 🔸 Chart.js에 카테고리 스케일 등록 (x축을 범주형 데이터로 표시)
Chart.register(CategoryScale);

// 🔸 Chart.js의 기본 스타일 설정
defaults.font.family = 'pretendard'; // 🔹 기본 폰트 설정
defaults.font.weight = 300; // 🔹 글자 두께
defaults.font.size = 10; // 🔹 폰트 크기
defaults.color = gray['900']; // 🔹 기본 글자 색상
defaults.maintainAspectRatio = false; // 🔹 반응형 비율 유지 해제 (화면 크기에 맞춰 조정)
defaults.responsive = true; // 🔹 반응형 차트 활성화

const LineChart = () => {
  // 🔸 선택된 탭의 인덱스 (0: 전체, 1: 이용 건수, 2: 재방문 건수, 3: 이탈 건수)

  const currencyCode = 'JPY';
  const { currencyRateData } = useCurrencyGet(currencyCode);

  const labels = currencyRateData?.map((item) => Object.keys(item)[0]) ?? [];
  const values = currencyRateData?.map((item) => Object.values(item)[0]) ?? [];

  const data = {
    labels,
    datasets: [
      {
        label: 'JPY',
        data: values,
        fill: 'start',
        borderColor: lime['500'],
        borderWidth: 1,
        // tension: 0.3,
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

  // 🔸 차트 데이터 구성 (선택된 탭에 따라 표시할 데이터 변경)
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: (context: any) =>
            `${currencyCode} ${Number(context.parsed.y).toFixed(2)}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { font: { size: 14 } }, // ✏️ x축 글자 크기 설정
        border: { color: '#EEEDED' },
        // grid: { color: '#EEEDED' }, // ✏️ x축 그리드 색상 설정
        grid: { color: 'transparent' },
      },
      y: {
        ticks: { font: { size: 14 } }, // ✏️ y축 글자 크기 설정
        border: { color: '#EEEDED' },
        // grid: { color: '#EEEDED' }, // ✏️ y축 그리드 색상 설정
        grid: { color: 'transparent' },
      },
    },
  };

  return (
    <div className={cn('h-[250px]')}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
