import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Button, Card, Badge } from 'flowbite-react'
import { HiOutlineRefresh, HiOutlineShare, HiOutlineChartBar, HiOutlineLightningBolt } from 'react-icons/hi'
import { Result as ResultType } from '../services/apiService'

export default function Result() {
  const [result, setResult] = useState<ResultType | null>(null)
  const [loading, setLoading] = useState(true)

  // Sample result data (in a real app, you would fetch this from an API)
  const sampleResult: ResultType = {
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">결과를 분석하는 중...</p>
        </div>
      </div>
    )
  }

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">결과를 찾을 수 없습니다</h2>
          <p className="text-gray-700">테스트를 먼저 진행해주세요.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Dev Personality Test 결과</title>
        <meta name="description" content="개발자 성격/역량 진단 결과" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              당신의 개발자 유형은
            </h1>
            <div className="inline-block bg-white rounded-full px-6 py-3 shadow-lg">
              <span className="text-2xl font-bold text-indigo-600">
                {result.archetype}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Score Analysis */}
            <Card className="shadow-lg">
              <div className="flex items-center mb-4">
                <HiOutlineChartBar className="h-6 w-6 text-indigo-600 mr-2" />
                <h2 className="text-xl font-bold text-gray-900">역량 분석</h2>
              </div>
              
              <div className="space-y-4">
                {categories.map(category => (
                  <div key={category.id} className="flex items-center">
                    <div className="w-24 text-sm font-medium text-gray-700">
                      {category.name}
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="flex items-center">
                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div 
                            className={`bg-${category.color}-600 h-2.5 rounded-full`} 
                            style={{ width: `${result.score[category.id as keyof typeof result.score]}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-sm font-medium text-gray-700 w-10">
                          {result.score[category.id as keyof typeof result.score]}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {category.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Strengths and Weaknesses */}
            <div className="space-y-6">
              <Card className="shadow-lg">
                <div className="flex items-center mb-4">
                  <HiOutlineLightningBolt className="h-6 w-6 text-green-600 mr-2" />
                  <h2 className="text-xl font-bold text-green-600">강점</h2>
                </div>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              <Card className="shadow-lg">
                <div className="flex items-center mb-4">
                  <HiOutlineRefresh className="h-6 w-6 text-orange-600 mr-2" />
                  <h2 className="text-xl font-bold text-orange-600">보완할 점</h2>
                </div>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2">→</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>

          {/* Recommendations */}
          <Card className="mb-8 shadow-lg">
            <div className="flex items-center mb-4">
              <HiOutlineLightBulb className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-bold text-gray-900">개선 전략</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.recommendations.map((recommendation, index) => (
                <Card key={index} className="border border-purple-200">
                  <div className="text-purple-600 font-bold mb-2">전략 {index + 1}</div>
                  <p className="text-gray-700">{recommendation}</p>
                </Card>
              ))}
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="flex items-center justify-center">
              <HiOutlineRefresh className="mr-2 h-5 w-5" />
              다시 테스트하기
            </Button>
            <Button color="light" className="flex items-center justify-center">
              <HiOutlineShare className="mr-2 h-5 w-5" />
              결과 공유하기
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}