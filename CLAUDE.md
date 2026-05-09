# 프로젝트 컨텍스트

## 기술 스택
- Vite + React 19 + TypeScript
- Tailwind CSS v3
- 데이터 저장: localStorage (storage.ts 추상화)
- 라우팅: react-router-dom

## 코딩 규칙
- 함수형 컴포넌트만 사용 (클래스 컴포넌트 금지)
- localStorage 직접 호출 금지 → storage.ts 함수만 사용
- 모든 텍스트는 한국어
- 주석은 "왜 이렇게 했는지"를 설명 (코드가 무엇을 하는지는 코드를 보면 됨)
- 인라인 스타일 금지 → Tailwind 클래스만 사용

## 화면 구성
- /       : 할 일 목록 (메인)
- /add    : 할 일 추가 (모달 또는 별도 화면)

## 데이터 모델 (TypeScript interface)
interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: string;  // ISO 날짜
}

## 금지사항
- 외부 라이브러리 추가 시 반드시 사전 확인 받기
- 한 번에 여러 화면 동시 수정 금지
- 테스트되지 않은 코드 커밋 금지
- 영문 변수명에 한국어 발음 사용 금지 (예: hal_il_x → todo ✓)