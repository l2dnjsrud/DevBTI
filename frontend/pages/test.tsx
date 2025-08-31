import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from 'flowbite-react'
import { HiArrowLeft, HiArrowRight } from 'react-icons/hi'
import { useQuestions } from '../hooks/useQuestions'
import { useTest } from '../hooks/useTest'

export default function Test() {
  const router = useRouter()
  const { questions, loading, error } = useQuestions()
  const {
    answers,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    setAnswer,
    submitTest
  } = useTest(questions)

  const handleAnswer = (value: number | string) => {
    if (questions.length === 0) return
    
    setAnswer(questions[currentQuestionIndex].id, value)
    
    // Move to next question or submit if last question
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    } else {
      // Submit test (in a real app, you would handle the result)
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    // In a real app, you would use a proper user ID
    const result = await submitTest('anonymous-user')
    if (result) {
      // Navigate to results page
      router.push('/result')
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1)
    }
  }

  // If we're at the last question, auto-submit
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
      handleSubmit()
    }
  }, [currentQuestionIndex, questions.length])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">질문지를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md border border-gray-200">
          <h2 className="text-xl font-bold text-red-600 mb-4">오류 발생</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()}>
            다시 시도
          </Button>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-4">질문지가 없습니다</h2>
          <p className="text-gray-700">관리자에게 문의하세요.</p>
        </div>
      </div>
    )
  }

  // Check if we've completed all questions
  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">결과를 분석하는 중...</p>
        </div>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]
  const progressValue = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Head>
        <title>DevBTI | 개발자 성격/역량 진단 테스트</title>
        <meta name="description" content="개발자 성격/역량 진단 테스트" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-blue-600">
                질문 {currentQuestionIndex + 1} / {questions.length}
              </span>
              <span className="text-sm font-medium text-blue-600">
                {Math.round(progressValue)}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${progressValue}%` }}
              ></div>
            </div>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-8 mb-8">
            <div className="text-sm text-blue-600 font-medium mb-2">
              질문 {currentQuestionIndex + 1}
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              {currentQuestion.text}
            </h2>

            <div className="space-y-3">
              {currentQuestion.type === 'likert' && currentQuestion.scale?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index + 1)}
                  className={`w-full text-left py-3 px-4 rounded-lg border transition-colors ${
                    answers[currentQuestion.id] === index + 1 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-gray-800">{option}</span>
                </button>
              ))}
              
              {currentQuestion.type === 'sjt' && currentQuestion.options?.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left py-3 px-4 rounded-lg border transition-colors ${
                    answers[currentQuestion.id] === option 
                      ? 'bg-blue-50 border-blue-500 text-blue-700' 
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <span className="text-gray-800">{option}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-between">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestionIndex === 0}
              color="light"
              className="flex items-center border border-gray-300"
            >
              <HiArrowLeft className="mr-2 h-5 w-5" />
              이전
            </Button>
            
            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                onClick={() => {
                  // If no answer selected, move to next question
                  if (!answers[currentQuestion.id]) {
                    setCurrentQuestionIndex(currentQuestionIndex + 1)
                  }
                }}
                className="flex items-center bg-blue-600 hover:bg-blue-700"
              >
                다음
                <HiArrowRight className="ml-2 h-5 w-5" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="flex items-center bg-blue-600 hover:bg-blue-700"
              >
                제출하기
                <HiArrowRight className="ml-2 h-5 w-5" />
              </Button>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}