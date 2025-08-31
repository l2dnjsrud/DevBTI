import Head from 'next/head'

export default function Result() {
  // Sample result data
  const result = {
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
      M: 60
    }
  }

  const categories = [
    { id: 'C', name: 'Coding', description: '코딩 실력' },
    { id: 'P', name: 'Problem Solving', description: '문제 해결 능력' },
    { id: 'A', name: 'Architecture', description: '아키텍처 설계' },
    { id: 'L', name: 'Learning', description: '학습 능력' },
    { id: 'M', name: 'Mindset', description: '개발 마인드셋' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Dev Personality Test 결과</title>
        <meta name="description" content="개발자 성격/역량 진단 결과" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Radar chart placeholder */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">역량 분석</h2>
              <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <p className="text-gray-500">레이더 차트 (구현 예정)</p>
              </div>
              <div className="mt-4 space-y-2">
                {categories.map(category => (
                  <div key={category.id} className="flex justify-between items-center">
                    <span className="text-gray-700">
                      {category.name} <span className="text-sm text-gray-500">({category.description})</span>
                    </span>
                    <span className="font-medium">
                      {result.score[category.id as keyof typeof result.score]}점
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strengths and weaknesses */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-green-600 mb-4">강점</h2>
                <ul className="space-y-2">
                  {result.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-orange-600 mb-4">보완할 점</h2>
                <ul className="space-y-2">
                  {result.weaknesses.map((weakness, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-orange-500 mr-2">→</span>
                      <span className="text-gray-700">{weakness}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">개선 전략</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {result.recommendations.map((recommendation, index) => (
                <div key={index} className="border border-indigo-200 rounded-lg p-4">
                  <div className="text-indigo-600 font-bold mb-2">전략 {index + 1}</div>
                  <p className="text-gray-700">{recommendation}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Share button */}
          <div className="mt-8 text-center">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition duration-300">
              결과 공유하기
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}