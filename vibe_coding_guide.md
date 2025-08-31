# AI용 바이브코딩 가이드라인 (AI Vibe Coding Guidelines)

AI 개발 도구가 웹/앱 개발 시 준수해야 할 **구체적이고 실행 가능한** 코딩 규칙과 아키텍처 가이드라인.

---

## 🎯 AI 개발 지시사항 (AI Development Instructions)

### 📏 코드 작성 기본 규칙

#### 1. 함수/컴포넌트 크기 제한
```typescript
// ✅ 좋은 예: 한 가지 역할, 20줄 이내
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// ❌ 나쁜 예: 여러 역할, 긴 함수
function processUserData(userData: any) {
  // 50줄 이상의 복잡한 로직...
}
```

**AI 실행 규칙:**
- 함수는 **최대 25줄** 이내로 작성
- 하나의 함수는 **단 하나의 책임**만 가져야 함
- 25줄 초과 시 자동으로 **함수 분할** 제안

#### 2. 컴포넌트 구조 규칙
```typescript
// ✅ 좋은 예: 명확한 props 타입, 단일 책임
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'danger'
  size: 'sm' | 'md' | 'lg'
  onClick: () => void
  children: React.ReactNode
  disabled?: boolean
}

function Button({ variant, size, onClick, children, disabled = false }: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant} btn-${size} ${disabled ? 'opacity-50' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
```

**AI 실행 규칙:**
- 모든 props에 **TypeScript 타입** 필수
- props는 **최대 8개** 이내
- 8개 초과 시 **객체로 그룹핑** 제안
- `children`, `className`, `style` props는 개수에서 제외

#### 3. 파일 구조 및 네이밍
```
✅ 올바른 파일 구조:
/components
  /ui
    Button.tsx
    Input.tsx
    Modal.tsx
  /forms
    LoginForm.tsx
    SignupForm.tsx

✅ 올바른 네이밍:
- 컴포넌트: PascalCase (Button.tsx)
- 함수/변수: camelCase (getUserData)
- 상수: UPPER_SNAKE_CASE (API_BASE_URL)
- 타입/인터페이스: PascalCase (UserData, ButtonProps)
```

**AI 실행 규칙:**
- 파일명은 **항상 컴포넌트명과 일치**
- 하나의 파일에는 **하나의 메인 컴포넌트**만 export
- 유틸 함수는 별도 `/utils` 폴더에 분리

---

## 🏗️ 아키텍처 패턴 (Architecture Patterns)

### 1. 폴더 구조 강제 규칙
```
프로젝트는 반드시 다음 구조를 따라야 함:

/src
├─ components/          # 재사용 컴포넌트
│  ├─ ui/              # 기본 UI 컴포넌트 (Button, Input 등)
│  └─ layout/          # 레이아웃 컴포넌트 (Header, Sidebar 등)
├─ features/           # 기능별 모듈
│  ├─ auth/           # 인증 관련
│  ├─ dashboard/      # 대시보드 관련
│  └─ [feature-name]/
├─ services/          # API 호출, 외부 서비스
├─ hooks/            # 커스텀 훅
├─ utils/            # 헬퍼 함수
├─ types/            # TypeScript 타입 정의
└─ constants/        # 상수 정의
```

### 2. API 호출 패턴
```typescript
// ✅ 올바른 API 서비스 패턴
// services/userService.ts
interface User {
  id: string
  email: string
  name: string
}

interface CreateUserRequest {
  email: string
  name: string
  password: string
}

export const userService = {
  async getUser(id: string): Promise<User> {
    const response = await fetch(`/api/users/${id}`)
    if (!response.ok) throw new Error('Failed to fetch user')
    return response.json()
  },
  
  async createUser(data: CreateUserRequest): Promise<User> {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
    if (!response.ok) throw new Error('Failed to create user')
    return response.json()
  }
}
```

**AI 실행 규칙:**
- 모든 API 호출은 **별도 service 파일**에 분리
- 요청/응답 타입은 **interface로 명시적 정의**
- 에러 핸들링 **필수 포함**

### 3. 상태 관리 패턴
```typescript
// ✅ 올바른 커스텀 훅 패턴
// hooks/useUser.ts
export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  useEffect(() => {
    async function fetchUser() {
      try {
        setLoading(true)
        setError(null)
        const userData = await userService.getUser(userId)
        setUser(userData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error')
      } finally {
        setLoading(false)
      }
    }
    
    if (userId) fetchUser()
  }, [userId])
  
  return { user, loading, error }
}
```

**AI 실행 규칙:**
- 비즈니스 로직은 **커스텀 훅으로 추출**
- 로딩/에러 상태 **필수 포함**
- 훅 이름은 **use-** 접두사 필수

---

## 🎨 UI/UX 구현 규칙

### 1. 컴포넌트 설계 원칙
```typescript
// ✅ 재사용 가능한 컴포넌트 설계
interface CardProps {
  title: string
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
}

function Card({ title, children, actions, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {actions && <div className="flex gap-2">{actions}</div>}
      </div>
      <div>{children}</div>
    </div>
  )
}
```

### 2. 스타일링 규칙
**AI 실행 규칙:**
- **Tailwind CSS** 우선 사용
- 인라인 스타일 금지, className으로만 스타일링
- 커스텀 CSS는 **컴포넌트별 모듈화**
- 반응형 디자인 **필수 적용** (`sm:`, `md:`, `lg:` 활용)

### 3. 접근성 규칙
```typescript
// ✅ 접근성이 고려된 컴포넌트
function Modal({ isOpen, onClose, title, children }: ModalProps) {
  return isOpen ? (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
        <h2 id="modal-title" className="text-xl font-bold mb-4">{title}</h2>
        {children}
      </div>
    </div>
  ) : null
}
```

**AI 실행 규칙:**
- `role`, `aria-*` 속성 **필수 추가**
- 키보드 네비게이션 **지원**
- 의미론적 HTML 태그 **우선 사용**

---

## 🔧 코드 품질 규칙

### 1. TypeScript 엄격 모드
```typescript
// ✅ 올바른 타입 정의
interface APIResponse<T> {
  data: T
  status: 'success' | 'error'
  message?: string
}

// ✅ 제네릭 활용
function createAPIClient<T>() {
  return {
    get: (url: string): Promise<APIResponse<T>> => fetch(url).then(res => res.json()),
    post: (url: string, data: T): Promise<APIResponse<T>> => 
      fetch(url, { method: 'POST', body: JSON.stringify(data) }).then(res => res.json())
  }
}
```

**AI 실행 규칙:**
- `any` 타입 **사용 금지**
- 모든 함수에 **명시적 반환 타입**
- `interface` 우선, `type` 보조 사용
- 유니온 타입으로 **명확한 상태 표현**

### 2. 에러 핸들링 패턴
```typescript
// ✅ 체계적인 에러 처리
class APIError extends Error {
  constructor(
    message: string,
    public status: number,
    public code: string
  ) {
    super(message)
    this.name = 'APIError'
  }
}

async function fetchWithErrorHandling<T>(url: string): Promise<T> {
  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new APIError(
        `HTTP Error: ${response.status}`,
        response.status,
        'HTTP_ERROR'
      )
    }
    
    return await response.json()
  } catch (error) {
    if (error instanceof APIError) throw error
    
    throw new APIError(
      'Network error occurred',
      0,
      'NETWORK_ERROR'
    )
  }
}
```

### 3. 성능 최적화 규칙
```typescript
// ✅ 메모화 적절한 사용
const ExpensiveComponent = React.memo(({ data, onUpdate }: Props) => {
  const processedData = useMemo(() => {
    return data.map(item => expensiveProcessing(item))
  }, [data])
  
  const handleUpdate = useCallback((id: string) => {
    onUpdate(id)
  }, [onUpdate])
  
  return <div>{/* 렌더링 로직 */}</div>
})
```

**AI 실행 규칙:**
- 복잡한 계산은 **useMemo** 사용
- 함수 props는 **useCallback** 사용
- 리스트 렌더링 시 **key** 속성 필수
- 조건부 렌더링에서 **short-circuit** 패턴 사용

---

## 📊 데이터베이스 & API 설계

### 1. API 엔드포인트 규칙
```typescript
// ✅ RESTful API 설계
GET    /api/users           # 사용자 목록
GET    /api/users/:id       # 특정 사용자
POST   /api/users           # 사용자 생성
PUT    /api/users/:id       # 사용자 전체 수정
PATCH  /api/users/:id       # 사용자 부분 수정
DELETE /api/users/:id       # 사용자 삭제

// ✅ 중첩 리소스
GET    /api/users/:id/posts # 특정 사용자의 게시물
POST   /api/users/:id/posts # 특정 사용자의 게시물 생성
```

### 2. 데이터 검증 규칙
```typescript
// ✅ Zod를 활용한 검증
import { z } from 'zod'

const CreateUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  age: z.number().int().min(18, 'Must be 18 or older'),
  role: z.enum(['admin', 'user']).default('user')
})

type CreateUserData = z.infer<typeof CreateUserSchema>
```

**AI 실행 규칙:**
- 모든 입력 데이터는 **스키마 검증** 필수
- API 응답 형식 **일관성 유지**
- 에러 응답에는 **명확한 메시지** 포함

---

## ✅ AI 실행 체크리스트

### 코드 작성 시 반드시 확인할 항목:

#### 기본 구조
- [ ] 함수가 25줄 이내인가?
- [ ] 하나의 책임만 가지고 있는가?
- [ ] TypeScript 타입이 명시되어 있는가?
- [ ] 파일명과 컴포넌트명이 일치하는가?

#### 컴포넌트
- [ ] Props 타입이 정의되어 있는가?
- [ ] Props가 8개 이내인가?
- [ ] 접근성 속성이 포함되어 있는가?
- [ ] 반응형 디자인이 적용되어 있는가?

#### API & 데이터
- [ ] 에러 핸들링이 포함되어 있는가?
- [ ] 로딩 상태가 관리되고 있는가?
- [ ] 입력값 검증이 되어 있는가?
- [ ] 타입 안전성이 보장되는가?

#### 성능
- [ ] 불필요한 리렌더링을 방지하고 있는가?
- [ ] 복잡한 계산은 메모화되어 있는가?
- [ ] 리스트에 key 속성이 있는가?

---

## 🚫 AI 금지 패턴 (AI Forbidden Patterns)

### 절대 하지 말아야 할 것들:

```typescript
// ❌ 절대 금지
any 타입 사용
console.log 프로덕션 코드에 남기기
하드코딩된 값 (magic numbers/strings)
인라인 스타일 사용
에러 처리 없는 async 함수
Props drilling 3단계 초과
거대한 컴포넌트 (100줄 초과)
```

```typescript
// ❌ 나쁜 예시들
function badFunction(data: any) { // any 사용 금지
  console.log(data) // 디버그 로그 남김 금지
  return data.someProperty || 'default' // 하드코딩 금지
}

const BadComponent = () => {
  return <div style={{color: 'red'}}>Bad</div> // 인라인 스타일 금지
}
```

---

이 가이드라인을 따라 **일관성 있고 유지보수 가능한** 코드를 작성하세요.