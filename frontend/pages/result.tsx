import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Button } from 'flowbite-react'
import { HiOutlineRefresh, HiOutlineShare } from 'react-icons/hi'

export default function Result() {
  const [result, setResult] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  // Sample result data (in a real app, you would fetch this from an API)
  const sampleResult = {
    archetype: "전략가형 🧠",
    strengths: ["설계와 문제 해결에 강점", "새로운 기술에 대한 높은 적응력"],
    weaknesses: ["협업 적응력 낮음", "문서화에 대한 관심 부족"],
    recommendations: [
      "작은 개인 프로젝트로 아키텍처 설계 경험 쌓기",
      "코드 리뷰 시 의도 설명 훈련",
      "기술 문서 작성 워크숍 참여"
    ],
    score: {
      C: 72,
      P: 68,
      A: 55,
      L: 80,
      M: 60,
      total: 67
    }
  }

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setResult(sampleResult)
      setLoading(false)
    }, 500)
  }, [])

  const categories = [
    { id: 'C', name: 'Coding', description: '코딩 실력', color: 'blue' },
    { id: 'P', name: 'Problem Solving', description: '문제 해결 능력', color: 'green' },
    { id: 'A', name: 'Architecture', description: '아키텍처 설계', color: 'purple' },
    { id: 'L', name: 'Learning', description: '학습 능력', color: 'yellow' },
    { id: 'M', name: 'Mindset', description: '개발 마인드셋', color: 'red' }
  ]

  const getColorClass = (value: number) => {
    if (value >= 80) return 'bg-green-500'
    if (value >= 60) return 'bg-blue-500'
    if (value >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">결과를 분석하는 중...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">결과를 찾을 수 없습니다</h2>
          <p className="text-gray-700">테스트를 먼저 진행해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head>
        <title>DevBTI 결과 | 개발자 성격/역량 진단</title>
        <meta name="description" content="개발자 성격/역량 진단 결과" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              당신의 개발자 유형은
            </h1>
            <div className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 rounded-full px-8 py-4 shadow-lg">
              <span className="text-2xl font-bold text-white">
                {result.archetype}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Score Analysis */}
            <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                역량 분석
              </h2>
              
              <div className="space-y-5">
                {categories.map(category => (
                  <div key={category.id}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium text-gray-700">
                        {category.name}
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {result.score[category.id as keyof typeof result.score]}점
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className={`h-2.5 rounded-full ${getColorClass(result.score[category.id as keyof typeof result.score])}`} 
                        style={{ width: `${result.score[category.id as keyof typeof result.score]}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      {category.description}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths and Weaknesses */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-green-600 mb-4 pb-2 border-b border-gray-200">
                  강점
                </h2>
                <ul className="space-y-3">
                  {result.strengths.map((strength: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2 mt-1">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6">
                <h2 className="text-xl font-bold text-orange-600 mb-4 pb-2 border-b border-gray-200">
                  보완할 점
                </h2>
                <ul className="space-y-3">
                  {result.weaknesses.map((weakness: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2 mt-1">→</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 mb-12">
            <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
              개선 전략
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.recommendations.map((recommendation: string, index: number) => (
                <div 
                  key={index} 
                  className="border border-blue-200 rounded-lg p-4 bg-blue-50"
                >
                  <div className="text-blue-600 font-bold mb-2">전략 {index + 1}</div>
                  <p className="text-gray-700 text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3">
              <HiOutlineRefresh className="mr-2 h-5 w-5" />
              다시 테스트하기
            </Button>
            <Button className="flex items-center justify-center bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-3">
              <HiOutlineShare className="mr-2 h-5 w-5" />
              결과 공유하기
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}