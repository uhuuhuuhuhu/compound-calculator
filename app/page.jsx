'use client';
import { useState } from 'react';

const TRANSLATIONS = {
  KO: {
    brandName: '복리플로우',
    title: '일복리 · 복리 계산기',
    subtitle: '코인 일복리 / 주식 연복리 / 회차별 자산 성장 스케줄',
    langBtn: 'English',
    presetTitle: '🔥 인기 시뮬레이션 클릭해보기',
    preset1: '🚀 코인 하루 1% (30일)',
    preset2: '📈 미국주식 연 8% (10년)',
    preset3: '💰 월 2% 단타 (12개월)',
    currency: '통화 단위 선택',
    periodType: '계산 주기 (기간)',
    periodValue: '투자 기간',
    rateValue: '수익률 (%)',
    principal: '초기 투자금',
    contribution: '주기별 추가 적립액',
    summaryTitle: '최종 예상 결과',
    totalBalance: '최종 예상 자산',
    totalInvested: '원금 총액',
    totalInterest: '순수 복리 이자',
    scheduleTitle: '회차별 자산 변동 스케줄',
    colPeriod: '회차',
    colInterest: '발생 이자',
    colTotal: '누적 자산',
    day: '일 (Daily)',
    month: '월 (Monthly)',
    year: '년 (Yearly)',
    rateDaily: '일 이율 (%)',
    rateMonthly: '월 이율 (%)',
    rateAnnual: '연 이율 (%)',
    contribDaily: '매일 추가 적립액',
    contribMonthly: '매월 추가 적립액',
    contribYearly: '매년 추가 적립액',
    dayUnit: '일차',
    monthUnit: '개월차',
    yearUnit: '년차',
  },
  EN: {
    brandName: 'CompoundFlow',
    title: 'Daily & Yearly Compound Calculator',
    subtitle: 'Daily, Monthly & Yearly Compound Growth & Breakdown Schedule',
    langBtn: '한국어',
    presetTitle: '🔥 Quick Investment Scenarios',
    preset1: '🚀 Crypto 1%/Day (30D)',
    preset2: '📈 S&P500 8%/Yr (10Y)',
    preset3: '💰 Monthly 2% (12M)',
    currency: 'Select Currency',
    periodType: 'Period Unit',
    periodValue: 'Duration',
    rateValue: 'Interest Rate (%)',
    principal: 'Initial Principal',
    contribution: 'Additional Deposit',
    summaryTitle: 'Investment Summary',
    totalBalance: 'Future Value',
    totalInvested: 'Total Principal',
    totalInterest: 'Total Interest',
    scheduleTitle: 'Growth Schedule Breakdown',
    colPeriod: 'Period',
    colInterest: 'Interest',
    colTotal: 'Total Balance',
    day: 'Day',
    month: 'Month',
    year: 'Year',
    rateDaily: 'Daily Rate (%)',
    rateMonthly: 'Monthly Rate (%)',
    rateAnnual: 'Annual Rate (%)',
    contribDaily: 'Daily Deposit',
    contribMonthly: 'Monthly Deposit',
    contribYearly: 'Yearly Deposit',
    dayUnit: 'Day',
    monthUnit: 'Mo',
    yearUnit: 'Yr',
  }
};

const CURRENCIES = [
  { code: 'KRW', label: '🇰🇷 KRW (원)', locale: 'ko-KR', fraction: 0 },
  { code: 'USD', label: '🇺🇸 USD ($)', locale: 'en-US', fraction: 2 },
  { code: 'EUR', label: '🇪🇺 EUR (€)', locale: 'de-DE', fraction: 2 },
  { code: 'JPY', label: '🇯🇵 JPY (¥)', locale: 'ja-JP', fraction: 0 },
  { code: 'GBP', label: '🇬🇧 GBP (£)', locale: 'en-GB', fraction: 2 },
  { code: 'CAD', label: '🇨🇦 CAD ($)', locale: 'en-CA', fraction: 2 },
  { code: 'AUD', label: '🇦🇺 AUD ($)', locale: 'en-AU', fraction: 2 },
  { code: 'CNY', label: '🇨🇳 CNY (¥)', locale: 'zh-CN', fraction: 2 },
];

export default function CompoundCalculator() {
  const [lang, setLang] = useState('KO');
  const [currency, setCurrency] = useState('KRW');
  const [periodType, setPeriodType] = useState('day');
  const [periodValue, setPeriodValue] = useState(30);
  const [rateValue, setRateValue] = useState(1);
  const [principal, setPrincipal] = useState(1000000);
  const [contribution, setContribution] = useState(0);

  const t = TRANSLATIONS[lang];

  const applyPreset = (type, period, rate, initPrincipal, contrib = 0) => {
    setPeriodType(type);
    setPeriodValue(period);
    setRateValue(rate);
    setPrincipal(initPrincipal);
    setContribution(contrib);
  };

  const calculateSchedule = () => {
    let currentBalance = Number(principal) || 0;
    let currentInvested = Number(principal) || 0;
    const periods = Math.min(Math.max(1, Number(periodValue) || 1), 3650);
    const ratePerPeriod = (Number(rateValue) || 0) / 100;

    const schedule = [];
    const contribNum = Number(contribution) || 0;

    for (let i = 1; i <= periods; i++) {
      const interest = currentBalance * ratePerPeriod;
      currentBalance += interest + contribNum;
      currentInvested += contribNum;

      schedule.push({
        period: i,
        interest: interest,
        totalBalance: currentBalance,
        totalInvested: currentInvested,
      });
    }

    const totalBalance = currentBalance;
    const totalInvested = currentInvested;
    const totalInterest = totalBalance - totalInvested;

    return { schedule, totalBalance, totalInvested, totalInterest };
  };

  const { schedule, totalBalance, totalInvested, totalInterest } = calculateSchedule();

  const formatCurrency = (amount) => {
    const curObj = CURRENCIES.find((c) => c.code === currency) || CURRENCIES[0];
    return new Intl.NumberFormat(curObj.locale, {
      style: 'currency',
      currency: curObj.code,
      maximumFractionDigits: curObj.fraction,
    }).format(amount);
  };

  const getUnitLabel = () => {
    if (periodType === 'day') return t.dayUnit;
    if (periodType === 'month') return t.monthUnit;
    return t.yearUnit;
  };

  const getRateLabel = () => {
    if (periodType === 'day') return t.rateDaily;
    if (periodType === 'month') return t.rateMonthly;
    return t.rateAnnual;
  };

  const getContribLabel = () => {
    if (periodType === 'day') return t.contribDaily;
    if (periodType === 'month') return t.contribMonthly;
    return t.contribYearly;
  };

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '30px 15px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 10px 25px -5px rgba(0,0,0,0.08), 0 8px 10px -6px rgba(0,0,0,0.01)', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
        
        {/* 헤더: 직관적인 명칭 전면 배치 */}
        <header style={{ backgroundColor: '#0f172a', color: '#fff', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '28px', backgroundColor: '#2563eb', padding: '6px 12px', borderRadius: '12px', boxShadow: '0 2px 8px rgba(37,99,235,0.4)' }}>📈</span>
              <div>
                <span style={{ fontSize: '11px', fontWeight: 'bold', color: '#60a5fa', letterSpacing: '1px', textTransform: 'uppercase' }}>{t.brandName}</span>
                <h1 style={{ margin: 0, fontSize: '22px', fontWeight: '800', color: '#ffffff' }}>{t.title}</h1>
              </div>
            </div>
            <p style={{ margin: '8px 0 0 0', color: '#94a3b8', fontSize: '13px' }}>{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(lang === 'KO' ? 'EN' : 'KO')}
            style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: '600', transition: 'all 0.2s' }}
          >
            🌐 {t.langBtn}
          </button>
        </header>

        <div style={{ padding: '30px' }}>

          {/* 인기 시뮬레이션 퀵 버튼 */}
          <div style={{ marginBottom: '25px', backgroundColor: '#f0f9ff', padding: '15px 20px', borderRadius: '14px', border: '1px solid #bae6fd' }}>
            <span style={{ fontSize: '13px', fontWeight: 'bold', color: '#0369a1', display: 'block', marginBottom: '10px' }}>{t.presetTitle}</span>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button
                onClick={() => applyPreset('day', 30, 1, 1000000, 0)}
                style={{ backgroundColor: '#fff', border: '1px solid #0284c7', color: '#0369a1', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              >
                {t.preset1}
              </button>
              <button
                onClick={() => applyPreset('year', 10, 8, 10000000, 500000)}
                style={{ backgroundColor: '#fff', border: '1px solid #0284c7', color: '#0369a1', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              >
                {t.preset2}
              </button>
              <button
                onClick={() => applyPreset('month', 12, 2, 5000000, 100000)}
                style={{ backgroundColor: '#fff', border: '1px solid #0284c7', color: '#0369a1', padding: '8px 14px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}
              >
                {t.preset3}
              </button>
            </div>
          </div>
          
          {/* 입력 필드 레이아웃 */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            
            {/* 통화 선택 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>{t.currency}</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', backgroundColor: '#fff' }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>

            {/* 계산 주기 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>{t.periodType}</label>
              <div style={{ display: 'flex', gap: '5px' }}>
                {['day', 'month', 'year'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPeriodType(type)}
                    style={{
                      flex: 1,
                      padding: '11px 5px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
                      backgroundColor: periodType === type ? '#2563eb' : '#fff',
                      color: periodType === type ? '#fff' : '#334155',
                      fontWeight: '700',
                      fontSize: '13px',
                      cursor: 'pointer',
                    }}
                  >
                    {t[type]}
                  </button>
                ))}
              </div>
            </div>

            {/* 초기 투자금 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>{t.principal}</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            {/* 수익률 값 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#2563eb', marginBottom: '6px' }}>
                {getRateLabel()}
              </label>
              <input
                type="number"
                step="0.01"
                value={rateValue}
                onChange={(e) => setRateValue(e.target.value)}
                style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '2px solid #2563eb', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            {/* 기간 값 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>{t.periodValue} ({t[periodType]})</label>
              <input
                type="number"
                value={periodValue}
                onChange={(e) => setPeriodValue(e.target.value)}
                style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

            {/* 주기별 적립액 */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>{getContribLabel()}</label>
              <input
                type="number"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                style={{ width: '100%', padding: '11px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>

          </div>

          {/* 결과 요약 카드 */}
          <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#0f172a', fontWeight: '700' }}>{t.summaryTitle}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{t.totalBalance}</span>
                <p style={{ margin: '6px 0 0 0', fontSize: '20px', fontWeight: '800', color: '#059669' }}>{formatCurrency(totalBalance)}</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{t.totalInvested}</span>
                <p style={{ margin: '6px 0 0 0', fontSize: '18px', fontWeight: '700', color: '#2563eb' }}>{formatCurrency(totalInvested)}</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '10px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{t.totalInterest}</span>
                <p style={{ margin: '6px 0 0 0', fontSize: '18px', fontWeight: '700', color: '#d97706' }}>{formatCurrency(totalInterest)}</p>
              </div>
            </div>
          </div>

          {/* 스케줄 표 */}
          <div>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '15px', color: '#0f172a', fontWeight: '700' }}>{t.scheduleTitle}</h2>
            <div style={{ maxHeight: '350px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '10px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f1f5f9', color: '#475569' }}>
                  <tr>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>{t.colPeriod}</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>{t.colInterest}</th>
                    <th style={{ padding: '12px 16px', borderBottom: '1px solid #e2e8f0' }}>{t.colTotal}</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.period} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#334155' }}>
                        {row.period} {getUnitLabel()}
                      </td>
                      <td style={{ padding: '12px 16px', color: '#d97706', fontWeight: '600' }}>+{formatCurrency(row.interest)}</td>
                      <td style={{ padding: '12px 16px', fontWeight: '700', color: '#059669' }}>{formatCurrency(row.totalBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
