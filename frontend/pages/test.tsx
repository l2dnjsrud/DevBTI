import { useEffect } from 'react'
import Head from 'next/head'
import { ProgressBar } from '../components/ui/ProgressBar'
import { QuestionCard } from '../components/QuestionCard'
import { useQuestions } from '../hooks/useQuestions'
import { useTest } from '../hooks/useTest'
import { useRouter } from 'next/router'

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

  // If we're at the last question, auto-submit
  useEffect(() => {
    if (questions.length > 0 && currentQuestionIndex >= questions.length) {
      handleSubmit()
    }
  }, [currentQuestionIndex, questions.length])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">질문지를 불러오는 중...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg max-w-md">
          <h2 className="text-xl font-bold text-red-600 mb-4">오류 발생</h2>
          <p className="text-gray-700 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg"
          >
            다시 시도
          </button>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">결과를 분석하는 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Head>
        <title>Dev Personality Test</title>
        <meta name="description" content="개발자 성격/역량 진단 테스트" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Progress bar */}
          <ProgressBar current={currentQuestionIndex + 1} total={questions.length} className="mb-8" />

          {/* Question card */}
          <QuestionCard 
            question={questions[currentQuestionIndex]} 
            onAnswer={handleAnswer}
            initialValue={answers[questions[currentQuestionIndex].id]}
          />
        </div>
      </main>
    </div>
  )
}