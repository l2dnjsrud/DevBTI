import { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId, answers, meta } = req.body
    
    // In a real application, you would:
    // 1. Validate the data
    // 2. Save to database
    // 3. Calculate scores
    // 4. Determine archetype
    
    // For now, we'll return mock data
    const result = {
      score: {
        C: 72,
        P: 68,
        A: 55,
        L: 80,
        M: 60,
        total: 67
      },
      archetype: "전략가형 🧠",
      strengths: ["설계와 문제 해결에 강점", "새로운 기술에 대한 높은 적응력"],
      weaknesses: ["협업 적응력 낮음", "문서화에 대한 관심 부족"],
      recommendations: [
        "작은 개인 프로젝트로 아키텍처 설계 경험 쌓기",
        "코드 리뷰 시 의도 설명 훈련",
        "기술 문서 작성 워크숍 참여"
      ]
    }
    
    res.status(200).json(result)
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}