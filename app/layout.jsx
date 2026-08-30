export const metadata = {
  title: '글로벌 스마트 복리 계산기',
  description: '통화별 자산 성장 추이를 직관적으로 확인하세요.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0, padding: 0 }}>{children}</body>
    </html>
  )
}
