import { useState } from 'react'
import Head from 'next/head'

export default function Test() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<{[key: string]: number | string}>({})

  // Sample questions based on the documentation
  const questions = [
    {
      id: "Q1",
      text: "나는 버그를 해결할 때 원인을 끝까지 추적한다.",
      type: "likert",
      scale: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"]
    },
    {
      id: "Q2",
      text: "새로운 기술을 배울 때 문서를 먼저 읽고 이해하려고 노력한다.",
      type: "likert",
      scale: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"]
    },
    {
      id: "Q3",
      text: "팀원이 마감 하루 전에 기능 추가를 요청한다. 어떻게 할까?",
      type: "sjt",
      options: [
        "협의 후 조정", 
        "팀장에게 escalation", 
        "무리해서라도 시도", 
        "git push --force 🚨"
      ]
    }
  ]

  const handleAnswer = (value: number | string) => {
    setAnswers({
      ...answers,
      [questions[currentQuestion].id]: value
    })
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      // Submit test
      console.log("Test completed:", answers)
    }
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Dev Personality Test</title>
        <meta name="description" content="개발자 성격/역량 진단 테스트" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-indigo-600">
                질문 {currentQuestion + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-indigo-600">
                {Math.round(progress)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-indigo-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {questions[currentQuestion].text}
            </h2>

            {questions[currentQuestion].type === "likert" && (
              <div className="space-y-3">
                {(questions[currentQuestion] as any).scale.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index + 1)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full border border-gray-300 mr-4 flex items-center justify-center">
                        {answers[questions[currentQuestion].id] === index + 1 && (
                          <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {questions[currentQuestion].type === "sjt" && (
              <div className="space-y-3">
                {(questions[currentQuestion] as any).options.map((option: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-4 rounded-lg border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 transition duration-200"
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full border border-gray-300 mr-4 flex items-center justify-center">
                        {answers[questions[currentQuestion].id] === option && (
                          <div className="w-3 h-3 rounded-full bg-indigo-600"></div>
                        )}
                      </div>
                      <span className="text-gray-800">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}