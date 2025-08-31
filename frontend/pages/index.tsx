import Head from 'next/head'
import Link from 'next/link'
import { Button } from 'flowbite-react'
import { FaChartLine, FaUsers, FaLightbulb, FaSmile, FaExclamationTriangle, FaClipboardList } from 'react-icons/fa'

export default function Home() {
  const archetypes = [
    { id: 'code-crafter', name: '코드 장인형', icon: '🔨' },
    { id: 'strategist', name: '전략가형', icon: '🧠' },
    { id: 'team-leader', name: '팀워크 리더형', icon: '🤝' },
    { id: 'growth-curve', name: '성장 곡선형', icon: '🚀' },
    { id: 'burnout-risk', name: '번아웃 위험형', icon: '🔥' },
    { id: 'multiplayer', name: '멀티플레이어형', icon: '⚡' },
    { id: 'experimenter', name: '실험가형', icon: '🧪' },
    { id: 'goal-oriented', name: '목표 지향형', icon: '🎯' },
  ]

  const features = [
    {
      title: '수식 기반 분석',
      description: '가중 평균, 기하 평균, 일반화 평균을 활용한 정밀한 역량 측정',
      icon: <FaChartLine className="text-blue-500 text-xl" />
    },
    {
      title: '개발자 전용 유형',
      description: '코드 장인형, 전략가형, 팀워크 리더형 등 개발자 특화 아키타입',
      icon: <FaUsers className="text-blue-500 text-xl" />
    },
    {
      title: '성장 곡선 시뮬레이션',
      description: '현재 역량 대비 개선 포인트와 성장 가능성 예측',
      icon: <FaLightbulb className="text-blue-500 text-xl" />
    },
    {
      title: '재미있는 밈 요소',
      description: '진지한 분석과 유머를 결합한 공유하고 싶은 결과',
      icon: <FaSmile className="text-blue-500 text-xl" />
    },
    {
      title: '번아웃 리스크 측정',
      description: '현재 상태 기반 번아웃 위험도 분석 및 예방 전략 제시',
      icon: <FaExclamationTriangle className="text-blue-500 text-xl" />
    },
    {
      title: '25문항 정밀 진단',
      description: '5개 영역별 세심한 질문으로 정확한 성향 파악',
      icon: <FaClipboardList className="text-blue-500 text-xl" />
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50">
      <Head>
        <title>DevBTI | 개발자 성격/역량 진단</title>
        <meta name="description" content="개발자 성격/역량 진단 서비스" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h1 className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-700 mb-6">
            DevBTI
          </h1>
          <p className="text-2xl text-gray-800 mb-4 font-medium">
            개발자를 위한 성격/역량 진단 서비스
          </p>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            MBTI처럼 가볍게 시작하되, 개발자 전용 데이터 기반 분석으로 확장하는 서비스입니다. 재미 + 전문성 + 확장성을 모두 잡았어요! 🚀
          </p>
          <div className="flex justify-center">
            <Link href="/test" legacyBehavior>
              <Button className="px-8 py-4 text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white rounded-full shadow-lg transform transition duration-300 hover:scale-105">
                검사 시작하기
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto mb-24">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <div className="mr-4 p-3 bg-blue-50 rounded-lg">
                  {feature.icon}
                </div>
                <div className="text-2xl font-bold text-blue-600">0{index + 1}</div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Archetypes Preview */}
        <div className="max-w-4xl mx-auto mb-24">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            개발자 아키타입 미리보기
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {archetypes.map((archetype) => (
              <div 
                key={archetype.id} 
                className="bg-white border-2 border-gray-200 rounded-xl px-6 py-3 text-lg font-bold text-gray-800 hover:border-blue-500 hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1"
              >
                <span className="text-2xl mr-2">{archetype.icon}</span>
                {archetype.name}
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            어떻게 작동하나요?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-2xl mx-auto mb-6 shadow-md">
                1
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">25문항 응답</h3>
              <p className="text-gray-600 text-lg">
                리커트 척도와 상황 선택형 질문에 답하기
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-2xl mx-auto mb-6 shadow-md">
                2
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">수식 기반 분석</h3>
              <p className="text-gray-600 text-lg">
                가중 평균과 기하 평균으로 정밀 계산
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 flex items-center justify-center text-blue-600 font-bold text-2xl mx-auto mb-6 shadow-md">
                3
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">맞춤 결과 확인</h3>
              <p className="text-gray-600 text-lg">
                유형 + 레이더 차트 + 개선 전략 제공
              </p>
            </div>
          </div>
        </div>
      </main>

      <footer className="py-10 text-center text-gray-600 border-t border-gray-200 mt-16 bg-white">
        <p className="text-lg">© 2025 Dev Personality Test. 개발자를 위한 성격 진단 서비스.</p>
      </footer>
    </div>
  )
}