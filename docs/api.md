# API Documentation

## Overview

This document describes the API endpoints for the Dev Personality Test application.

## Base URL

```
/api
```

## Endpoints

### Get Questions

```
GET /api/questions
```

Returns the list of questions for the personality test.

**Response:**
```json
{
  "questions": [
    {
      "id": "Q1",
      "text": "나는 버그를 해결할 때 원인을 끝까지 추적한다.",
      "type": "likert",
      "scale": ["전혀 아니다", "아니다", "보통이다", "그렇다", "매우 그렇다"],
      "category": "P"
    }
  ]
}
```

### Submit Answers

```
POST /api/submit
```

Submits the user's answers and returns the calculated results.

**Request:**
```json
{
  "userId": "user-123",
  "answers": [
    {
      "id": "Q1",
      "value": 4
    }
  ],
  "meta": {
    "role": "backend",
    "experience": "junior"
  }
}
```

**Response:**
```json
{
  "score": {
    "C": 72,
    "P": 68,
    "A": 55,
    "L": 80,
    "M": 60,
    "total": 67
  },
  "archetype": "전략가형 🧠"
}
```

### Get Result

```
GET /api/result/{userId}
```

Returns the previously calculated result for a user.

**Response:**
```json
{
  "archetype": "전략가형 🧠",
  "strengths": ["설계와 문제 해결에 강점"],
  "weaknesses": ["협업 적응력 낮음"],
  "recommendations": [
    "작은 개인 프로젝트로 아키텍처 설계 경험 쌓기"
  ],
  "charts": {
    "radar": [72, 68, 55, 80, 60],
    "histogram": { "C": {"percentile": 80, "avg": 65} }
  }
}
```