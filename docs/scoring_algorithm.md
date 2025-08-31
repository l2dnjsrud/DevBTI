# Scoring Algorithm Documentation

## Overview

The Dev Personality Test uses a multi-dimensional scoring system to evaluate different aspects of a developer's personality and skills.

## Scoring Dimensions

1. **C - Coding (코딩 실력)**
   - Technical implementation skills
   - Code quality and best practices
   - Proficiency with tools and languages

2. **P - Problem Solving (문제 해결 능력)**
   - Analytical thinking
   - Debugging and troubleshooting
   - Approach to complex challenges

3. **A - Architecture (아키텍처 설계)**
   - System design skills
   - Planning and foresight
   - Scalability considerations

4. **L - Learning (학습 능력)**
   - Adaptability to new technologies
   - Knowledge acquisition speed
   - Continuous improvement mindset

5. **M - Mindset (개발 마인드셋)**
   - Collaboration and communication
   - Professionalism and responsibility
   - Growth and resilience

## Calculation Methods

### Weighted Average
For most questions, we use a weighted average where different dimensions receive different weights based on the question's focus.

### Geometric Mean
For bottleneck detection, we use geometric mean to identify areas where a low score in one dimension affects the overall performance.

### Generalized Mean (ρ)
A parameterized mean that can adjust between lenient and strict evaluation modes.

## Archetype Mapping

Based on the scores, users are categorized into one of several archetypes:

1. **코드 장인형 (Code Artisan) 🔨**
   - High C and L scores
   - Focus on technical excellence

2. **전략가형 (Strategist) 🧠**
   - High A and P scores
   - Strong analytical and design skills

3. **팀워크 리더형 (Team Leader) 🤝**
   - High M score
   - Excellent collaboration skills

4. **성장 곡선형 (Growth Curve) 🚀**
   - High L score
   - Rapid learning and adaptation

5. **번아웃 위험형 (Burnout Risk) 🔥**
   - Imbalanced scores with high stress indicators

6. **멀티플레이어형 (Multiplayer) ⚡**
   - Well-balanced across all dimensions

7. **실험가형 (Experimenter) 🧪**
   - High L and P scores
   - Innovation and experimentation focus