# SVG Icon Generator

PPT에 바로 붙여 넣을 수 있는 **stroke 기반 SVG 아이콘 세트 생성기**입니다.
React + Vite + Tailwind 로 만든 웹앱이며, Electron 으로 감싸 Windows 설치 파일(.exe)도
바로 만들 수 있습니다.

---

## 1. 사전 준비

- **Node.js 18 이상** (권장 20+) — <https://nodejs.org/ko>
- Windows 10/11

설치 후 터미널(파워셸)에서 버전 확인:

```bash
node -v
npm -v
```

---

## 2. 의존성 설치 (한 번만)

프로젝트 폴더에서:

```bash
npm install
```

> `electron` 다운로드 때문에 처음 한번은 시간이 좀 걸립니다.

---

## 3. 웹앱(브라우저)으로 실행

```bash
npm run dev
```

콘솔에 표시되는 주소(`http://localhost:5173`)를 브라우저로 열면 끝.
옵션을 바꾸면 미리보기가 즉시 갱신됩니다.

---

## 4. 데스크톱 앱(개발 모드)으로 실행

```bash
npm run electron:dev
```

- Vite 개발 서버가 먼저 뜨고, 준비되면 Electron 창이 자동으로 열립니다.
- 코드를 저장하면 React 핫 리로드가 그대로 동작합니다.
- 우측에 DevTools 가 분리되어 함께 열립니다.

---

## 5. 웹앱 정적 빌드

```bash
npm run build
```

`dist-app/` 폴더에 정적 파일이 생성됩니다.
이 폴더만 정적 호스팅(예: Netlify, Vercel)에 올려도 동작합니다.

---

## 6. Windows 설치파일(.exe) 생성

```bash
npm run dist
```

빌드가 끝나면 **`dist/` 폴더 안에 `SVG Icon Generator-Setup-1.0.0.exe`** 가 생깁니다.
이 파일을 더블클릭하면 설치 마법사가 뜨고, 설치 위치를 선택할 수 있습니다.

> 빌드 도중 Windows Defender / SmartScreen 이 잠깐 경고할 수 있는데
> 코드 서명을 하지 않아서 그렇습니다. 본인 PC에서는 그대로 진행하셔도 됩니다.

---

## 7. 폴더 구조

```
svg-icon-generator/
├── electron/                Electron main / preload (CommonJS)
│   ├── main.cjs
│   └── preload.cjs
├── src/
│   ├── components/          UI 컴포넌트
│   │   ├── Sidebar.tsx
│   │   ├── OptionPanel.tsx
│   │   ├── CombinedPreview.tsx
│   │   ├── SelectedIconPreview.tsx
│   │   └── MasterDataTable.tsx
│   ├── lib/                 도메인 로직
│   │   ├── iconLibrary.ts   ~40개 SVG 아이콘 원본
│   │   ├── svgGenerator.ts  통합 SVG / 단일 SVG 렌더링
│   │   ├── download.ts      파일 저장 / ZIP / 클립보드
│   │   ├── storage.ts       localStorage 어댑터
│   │   ├── initialData.ts   기준정보 초기 데이터
│   │   └── validation.ts    HEX, 중복, 기본값 검증
│   ├── pages/
│   │   ├── IconGenerator.tsx
│   │   └── MasterData.tsx
│   ├── types/index.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css            Tailwind directives
├── index.html
├── package.json             scripts + electron-builder 설정
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
└── tsconfig.json
```

---

## 8. 사용 방법

### 8-1. 아이콘 생성

1. 좌측에서 **주제 / 개수 / 색상 / 라벨 언어 / 스타일** 등 선택
2. 우측 상단에 통합 SVG 가 즉시 미리보기로 표시
3. 마우스를 통합 SVG 위에 올리면 우측 하단에 큰 미리보기와 SVG 코드가 표시됨
4. 옵션이 마음에 들면 **생성** 버튼 클릭 → **다운로드** 버튼 활성화
5. 다운로드 방식(통합 / 선택 / ZIP) 에 따라 파일 저장

### 8-2. 기준정보관리

- **주제 / 색상 / 라벨 언어 / 아이콘 스타일 / 다운로드 / 배치** 6개 탭
- 엑셀처럼 셀을 직접 수정 (한국어 / 영어 / 일본어 / 중국어 / value / 설명 / 순서 / 기본값)
- **사용** 체크박스로 Select 노출 여부 제어
- **기본값** 라디오 버튼으로 카테고리당 기본 1개만 지정 가능
- **▲ ▼** 버튼으로 행 순서 조정, **⧉** 복제, **✕** 삭제
- 우측 상단 **+ 행 추가** 로 새 옵션 추가
- 색상 탭에서는 Primary / Secondary HEX 컬러 피커 제공
- 스타일 탭에서는 strokeWidth / duotone 메타값 직접 편집
- **검증 오류**(value 중복, HEX 형식 오류, 기본값 2개 이상)는 표 하단에 안내됨
- **초기 데이터로 복원** 버튼으로 언제든 리셋 가능

### 8-3. SVG 규격

- `viewBox="0 0 64 64"` · 투명 배경 · stroke 중심 · `linecap=round`
- PPT, Keynote, Figma, Illustrator 등 모두 호환
- ZIP 다운로드 시: `combined.svg` + `icons/<id>.svg` 들 포함

---

## 9. 자주 묻는 문제

| 문제 | 해결 |
| --- | --- |
| `npm install` 이 멈춤 | 회사 프록시 / 백신 영향. `npm config set registry https://registry.npmjs.org/` 후 재시도 |
| `electron:dev` 가 흰 화면 | Vite 가 5173 포트로 떠 있는지 확인. 포트가 다른 앱에 점유되었으면 포트 변경 필요 |
| `dist` 폴더에 .exe 가 없음 | `npm run dist` 가 끝까지 성공했는지 확인. 빌드 로그의 마지막 줄에 산출물 경로가 찍힙니다 |
| HEX 입력이 빨갛게 표시 | `#RRGGBB` 형식만 허용 (예: `#2563EB`). 3자리 단축형은 미지원 |
| 색상이 적용 안 됨 | 색상 탭의 해당 항목 **사용** 이 체크되어 있는지, **Primary HEX** 가 비어있지 않은지 확인 |

---

## 10. 라이선스

내부 사용 목적의 샘플 프로젝트입니다. 자유롭게 수정/배포하세요.
