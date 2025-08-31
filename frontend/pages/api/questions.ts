import { NextApiRequest, NextApiResponse } from 'next'

// Sample questions data
const questions = [
  {
    id: "Q1",
    text: "나는 버그를 해결할 때 원인을 끝까지 추적한다.",
    type: "likert",
    scale: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
    category: "P"
  },
  {
    id: "Q2",
    text: "새로운 기술을 배울 때 문서를 먼저 읽고 이해하려고 노력한다.",
    type: "likert",
    scale: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
    category: "L"
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
    ],
    category: "A"
  },
  {
    id: "Q4",
    text: "코드 리뷰 시 다른 사람의 코드를 이해하려고 노력한다.",
    type: "likert",
    scale: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
    category: "M"
  },
  {
    id: "Q5",
    text: "새로운 프로젝트를 시작할 때 아키텍처 설계부터 한다.",
    type: "likert",
    scale: ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
    category: "A"
  }
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    res.status(200).json({ questions })
  } else {
    res.status(405).json({ message: 'Method Not Allowed' })
  }
}