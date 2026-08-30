'use client';
import { useState } from 'react';

const TRANSLATIONS = {
  KO: {
    title: '글로벌 멀티 복리 계산기',
    subtitle: '일/월/년 단위 복리 성장 및 회차별 자산 변동 스케줄',
    langBtn: 'English',
    currency: '통화 단위 선택',
    periodType: '기간 단위',
    periodValue: '투자 기간',
    principal: '초기 투자금',
    contribution: '주기별 추가 적립액',
    annualRate: '연 수익률 (%)',
    summaryTitle: '최종 예상 결과',
    totalBalance: '최종 예상 자산',
    totalInvested: '원금 총액',
    totalInterest: '순수 복리 이자',
    scheduleTitle: '회차별 자산 변동 스케줄',
    colPeriod: '회차',
    colContribution: '추가 적립',
    colInterest: '발생 이자',
    colTotal: '누적 자산',
    day: '일',
    month: '월',
    year: '년',
    dayUnit: '일차',
    monthUnit: '개월차',
    yearUnit: '년차',
  },
  EN: {
    title: 'Global Compound Calculator',
    subtitle: 'Track daily, monthly, and yearly compound growth schedule',
    langBtn: '한국어',
    currency: 'Select Currency',
    periodType: 'Period Unit',
    periodValue: 'Investment Duration',
    principal: 'Initial Principal',
    contribution: 'Addition per Period',
    annualRate: 'Annual Rate (%)',
    summaryTitle: 'Investment Summary',
    totalBalance: 'Future Value',
    totalInvested: 'Total Principal',
    totalInterest: 'Total Interest',
    scheduleTitle: 'Growth Schedule Breakdown',
    colPeriod: 'Period',
    colContribution: 'Contribution',
    colInterest: 'Interest',
    colTotal: 'Total Balance',
    day: 'Day',
    month: 'Month',
    year: 'Year',
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
  const [periodType, setPeriodType] = useState('year');
  const [periodValue, setPeriodValue] = useState(10);
  const [principal, setPrincipal] = useState(10000000);
  const [contribution, setContribution] = useState(500000);
  const [annualRate, setAnnualRate] = useState(8);

  const t = TRANSLATIONS[lang];

  const calculateSchedule = () => {
    let currentBalance = Number(principal) || 0;
    let currentInvested = Number(principal) || 0;
    const periods = Math.min(Math.max(1, Number(periodValue) || 1), 3650);

    let ratePerPeriod = 0;
    const rateNum = Number(annualRate) || 0;
    if (periodType === 'day') ratePerPeriod = rateNum / 100 / 365;
    else if (periodType === 'month') ratePerPeriod = rateNum / 100 / 12;
    else ratePerPeriod = rateNum / 100;

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

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '40px 15px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', overflow: 'hidden' }}>
        
        <header style={{ backgroundColor: '#0f172a', color: '#fff', padding: '25px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 'bold' }}>{t.title}</h1>
            <p style={{ margin: '5px 0 0 0', opacity: 0.8, fontSize: '14px' }}>{t.subtitle}</p>
          </div>
          <button
            onClick={() => setLang(lang === 'KO' ? 'EN' : 'KO')}
            style={{ backgroundColor: '#ffffff20', color: '#fff', border: '1px solid #ffffff40', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}
          >
            🌐 {t.langBtn}
          </button>
        </header>

        <div style={{ padding: '30px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px' }}>{t.currency}</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px' }}
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px' }}>{t.periodType}</label>
              <div style={{ display: 'flex', gap: '5px' }}>
                {['day', 'month', 'year'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setPeriodType(type)}
                    style={{
                      flex: 1,
                      padding: '10px',
                      borderRadius: '8px',
                      border: '1px solid #d1d5db',
                      backgroundColor: periodType === type ? '#2563eb' : '#fff',
                      color: periodType === type ? '#fff' : '#374151',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                    }}
                  >
                    {t[type]}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px' }}>{t.principal}</label>
              <input
                type="number"
                value={principal}
                onChange={(e) => setPrincipal(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px' }}>{t.contribution}</label>
              <input
                type="number"
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px' }}>{t.periodValue} ({t[periodType]})</label>
              <input
                type="number"
                value={periodValue}
                onChange={(e) => setPeriodValue(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', boxSizing: 'border-box' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 'bold', color: '#4b5563', marginBottom: '6px' }}>{t.annualRate}</label>
              <input
                type="number"
                step="0.1"
                value={annualRate}
                onChange={(e) => setAnnualRate(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '15px', boxSizing: 'border-box' }}
              />
            </div>

          </div>

          <div style={{ backgroundColor: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '30px' }}>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#1e293b' }}>{t.summaryTitle}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{t.totalBalance}</span>
                <p style={{ margin: '5px 0 0 0', fontSize: '20px', fontWeight: 'bold', color: '#059669' }}>{formatCurrency(totalBalance)}</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{t.totalInvested}</span>
                <p style={{ margin: '5px 0 0 0', fontSize: '18px', fontWeight: 'bold', color: '#2563eb' }}>{formatCurrency(totalInvested)}</p>
              </div>
              <div style={{ backgroundColor: '#fff', padding: '15px', borderRadius: '8px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
                <span style={{ fontSize: '12px', color: '#64748b' }}>{t.totalInterest}</span>
                <p style={{ margin: '5px 0 0 0', fontSize: '18px', fontWeight: 'bold', color: '#d97706' }}>{formatCurrency(totalInterest)}</p>
              </div>
            </div>
          </div>

          <div>
            <h2 style={{ margin: '0 0 15px 0', fontSize: '16px', color: '#1e293b' }}>{t.scheduleTitle}</h2>
            <div style={{ maxHeight: '350px', overflowY: 'auto', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
                <thead style={{ position: 'sticky', top: 0, backgroundColor: '#f1f5f9', color: '#475569' }}>
                  <tr>
                    <th style={{ padding: '10px 15px', borderBottom: '1px solid #e2e8f0' }}>{t.colPeriod}</th>
                    <th style={{ padding: '10px 15px', borderBottom: '1px solid #e2e8f0' }}>{t.colInterest}</th>
                    <th style={{ padding: '10px 15px', borderBottom: '1px solid #e2e8f0' }}>{t.colTotal}</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((row) => (
                    <tr key={row.period} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '10px 15px', fontWeight: 'bold', color: '#334155' }}>
                        {row.period} {getUnitLabel()}
                      </td>
                      <td style={{ padding: '10px 15px', color: '#d97706' }}>+{formatCurrency(row.interest)}</td>
                      <td style={{ padding: '10px 15px', fontWeight: 'bold', color: '#059669' }}>{formatCurrency(row.totalBalance)}</td>
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
