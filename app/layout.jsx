export const metadata = {
  title: '일복리계산기 | 코인·주식 맞춤 복리 계산기 - 복리플로우',
  description: '코인 일복리, 주식 연복리, 적립식 투자까지! 1일/1달/1년 단위 복리 이자와 회차별 자산 변화를 1초 만에 시뮬레이션 해보세요.',
  openGraph: {
    title: '일복리계산기 - 복리플로우 📈',
    description: '내 자산은 30일 뒤 얼마가 될까? 실시간 일복리 시뮬레이션',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
