'use client';
import { useState } from 'react';

export default function CompoundCalculator() {
  const [currency, setCurrency] = useState('KRW'); // 기본 통화: 원화
  const [principal, setPrincipal] = useState(10000000); 
  const [monthlyContribution, setMonthlyContribution] = useState(500000); 
  const [years, setYears] = useState(10); 
  const [annualRate, setAnnualRate] = useState(8); 

  // 복리 계산 로직
  const calculateCompoundInterest = () => {
    let totalBalance = Number(principal);
    let totalInvested = Number(principal);
    const months = Number(years) * 12;
    const monthlyRate = Number(annualRate) / 100 / 12;

    for (let i = 0; i < months; i++) {
      totalBalance = totalBalance * (1 + monthlyRate) + Number(monthlyContribution);
      totalInvested += Number(monthlyContribution);
    }

    const totalInterest = totalBalance - totalInvested;

    return { totalBalance, totalInvested, totalInterest };
  };

  const { totalBalance, totalInvested, totalInterest } = calculateCompoundInterest();

  // 선택된 통화에 맞춘 금액 포맷팅 (기호 및 소수점 자동 처리)
  const formatCurrency = (amount) => {
    const locales = { KRW: 'ko-KR', USD: 'en-US', JPY: 'ja-JP' };
    const maxFractions = currency === 'USD' ? 2 : 0; 
    
    return new Intl.NumberFormat(locales[currency], {
      style: 'currency',
      currency: currency,
      maximumFractionDigits: maxFractions,
    }).format(amount);
  };

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
        
        <header style={{ backgroundColor: '#0070f3', color: '#fff', padding: '30px', textAlign: 'center' }}>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '28px' }}>글로벌 스마트 복리 계산기</h1>
          <p style={{ margin: 0, opacity: 0.9, fontSize: '15px' }}>통화별 자산 성장 추이를 직관적으로 확인하세요.</p>
        </header>

        <div style={{ padding: '30px', display: 'flex', flexWrap: 'wrap', gap: '30px' }}>
          
          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* 통화 선택 드롭다운 */}
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>통화 단위 선택</label>
              <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', outline: 'none', backgroundColor: '#fff', cursor: 'pointer' }}
              >
                <option value="KRW">🇰🇷 원화 (KRW)</option>
                <option value="USD">🇺🇸 달러 (USD)</option>
                <option value="JPY">🇯🇵 엔화 (JPY)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>초기 투자금</label>
              <input 
                type="number" 
                value={principal} 
                onChange={(e) => setPrincipal(e.target.value)} 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', outline: 'none' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>월 추가 적립액</label>
              <input 
                type="number" 
                value={monthlyContribution} 
                onChange={(e) => setMonthlyContribution(e.target.value)} 
                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', outline: 'none' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>투자 기간 (년)</label>
                <input 
                  type="number" 
                  value={years} 
                  onChange={(e) => setYears(e.target.value)} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', outline: 'none' }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: '14px', fontWeight: 'bold', color: '#4b5563', marginBottom: '8px' }}>연 목표 수익률 (%)</label>
                <input 
                  type="number" 
                  value={annualRate} 
                  step="0.1"
                  onChange={(e) => setAnnualRate(e.target.value)} 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '16px', outline: 'none' }}
                />
              </div>
            </div>
          </div>

          <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px', backgroundColor: '#f9fafb', padding: '25px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#111' }}>예상 수익 결과</h2>
            
            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #10b981', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#6b7280' }}>최종 예상 자산</p>
              <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{formatCurrency(totalBalance)}</p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3b82f6', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#6b7280' }}>원금 총액 (초기 투자금 + 누적 적립액)</p>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#3b82f6' }}>{formatCurrency(totalInvested)}</p>
            </div>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #f59e0b', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: '#6b7280' }}>순수 복리 이자 수익</p>
              <p style={{ margin: 0, fontSize: '20px', fontWeight: 'bold', color: '#f59e0b' }}>{formatCurrency(totalInterest)}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
