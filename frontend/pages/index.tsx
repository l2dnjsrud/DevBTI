import Head from 'next/head'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Dev Personality Test</title>
        <meta name="description" content="개발자 성격/역량 진단 서비스" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            개발자 성격 진단 테스트
          </h1>
          <p className="text-xl text-gray-700 mb-10">
            MBTI처럼 가볍게 시작해서 데이터 기반 분석으로 확장하는 개발자 전용 진단 서비스
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/test">
              <a className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300 text-center">
                테스트 시작하기
              </a>
            </Link>
            <a href="#" className="bg-white hover:bg-gray-100 text-indigo-600 border border-indigo-600 font-bold py-3 px-8 rounded-lg text-lg transition duration-300 text-center">
              샘플 결과 보기
            </a>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">밈 요소</h3>
            <p className="text-gray-700">
              재미있는 밈 요소로 테스트를 더 즐겁게! 실제 개발 상황을 유머러스하게 표현한 선택지를 만나보세요.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">데이터 분석</h3>
            <p className="text-gray-700">
              단순한 유형 분류가 아닌, 수식 기반 분석을 통해 당신의 개발 역량과 성장 포인트를 정확히 파악합니다.
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-xl font-bold mb-3 text-indigo-600">성장 전략</h3>
            <p className="text-gray-700">
              개인 맞춤형 개선 전략과 성장 곡선 시뮬레이션으로 당신의 다음 단계를 제안합니다.
            </p>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-gray-600">
        <p>© 2025 Dev Personality Test. 개발자를 위한 성격 진단 서비스.</p>
      </footer>
    </div>
  )
}