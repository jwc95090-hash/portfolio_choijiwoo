# 최지우 UI/UX 웹디자인 포트폴리오

> **사용자의 문제를 구조로 해결하고, 기획 의도를 반응형 웹으로 구현하는 신입 UI/UX 디자이너 최지우의 포트폴리오입니다.**  
> Figma 기반 UX/UI 설계와 HTML·CSS·JavaScript 퍼블리싱을 하나의 작업 흐름으로 연결했습니다.

[포트폴리오 사이트](https://jwc95090-hash.github.io/portfolio_choijiwoo/) · [TRIPPICK 프로젝트](https://jwc95090-hash.github.io/portfolio_choijiwoo/trippick-portfolio.html) · [당근부동산 프로젝트](https://jwc95090-hash.github.io/portfolio_choijiwoo/karrot-portfolio.html)

<img src="./assets/images/portfolio-cover.jpg" alt="최지우 UI/UX 웹디자인 포트폴리오 대표 이미지" width="900">

## 포트폴리오 한눈에 보기

| 구분 | 내용 |
|---|---|
| 목표 | UX 사고 과정과 실제 웹 구현 역량을 함께 보여주는 개인 포트폴리오 |
| 역할 | UX 리서치, UI 디자인, 프로토타입, 퍼블리싱, 인터랙션 구현 |
| 핵심 기술 | HTML5, CSS3, Vanilla JavaScript |
| 디자인 도구 | Figma, Photoshop, Illustrator |
| 배포 | GitHub Pages |

## 주요 프로젝트

### 1. TRIPPICK — 캠핑 예약·가이드 플랫폼

초보 캠퍼가 캠핑장 탐색부터 비교·예약·준비까지 한 흐름에서 해결하도록 설계한 반응형 웹 서비스입니다.

- [서비스 체험](https://jwc95090-hash.github.io/trippick-site/)
- [UX/UI 포트폴리오](https://jwc95090-hash.github.io/portfolio_choijiwoo/trippick-portfolio.html)
- [GitHub 저장소](https://github.com/jwc95090-hash/trippick-site)
- 핵심 경험: 검색·필터·지도·최대 3곳 비교, 예약·결제, 가이드 콘텐츠
- 구현: 고캠핑 공공데이터, Supabase, Toss Payments, Cloudflare Worker
- 반응형 범위: 360px 모바일부터 1920px 와이드 데스크톱

### 2. TRIPPICK HOST — 호스트 운영 콘솔

예약·상담·매출·리뷰 정보를 업무 우선순위에 따라 확인하는 공개 포트폴리오 데모입니다.

- [호스트센터 체험](https://jwc95090-hash.github.io/trippick-site/trippick-host/admin-camp.html)
- [소스 코드](https://github.com/jwc95090-hash/trippick-site/tree/main/trippick-host)
- 공개 데모와 실제 운영 권한의 범위를 명확히 구분했습니다.

### 3. 당근부동산 앱 리디자인

동네 기반 부동산 탐색에서 거래 유형·신뢰 정보·비교 기준을 빠르게 파악하도록 정보 위계를 재설계한 UX/UI 프로젝트입니다.

- [UX/UI 포트폴리오](https://jwc95090-hash.github.io/portfolio_choijiwoo/karrot-portfolio.html)
- 핵심 과정: 데스크 리서치, 경쟁 분석, 페르소나, 여정맵, IA, 와이어프레임, 사용성 검증
- 핵심 결과: 직거래·중개 구분, 신뢰 정보 강화, 매물 비교와 탐색 흐름 개선

## 디자인과 구현 방향

### 과정과 결과를 함께 보여주기

프로젝트 카드에서는 문제와 역할을 빠르게 파악하게 하고, 별도 HTML 포트폴리오에서는 리서치부터 결과 화면까지 긴 호흡으로 확인하도록 구성했습니다.

### 정보 위계 우선

큰 제목, 짧은 요약, 핵심 행동 링크 순으로 시선을 유도했습니다. 채용담당자가 프로젝트 성격·기여도·결과물을 빠르게 확인할 수 있도록 프로젝트별 링크를 분리했습니다.

### 구현 가능한 디자인

Figma 화면에 머물지 않고 시맨틱 HTML, 반응형 CSS, JavaScript 인터랙션으로 직접 구현했습니다. 반복 요소는 공통 스타일로 묶고 모바일·키보드 사용성까지 함께 점검했습니다.

## 구현 포인트

- CSS Grid와 Flexbox 기반 반응형 레이아웃
- 라이트·다크 테마 전환
- 스크롤 기반 등장 효과와 커스텀 인터랙션
- 디자인 작업 이미지 라이트박스
- 모바일 내비게이션과 접근 가능한 상태값
- 본문 바로가기, 키보드 포커스, 시맨틱 영역
- 프로젝트별 긴 이미지를 원본 비율로 보여주는 반응형 HTML 뷰어

## 기술 스택

| 영역 | 기술 |
|---|---|
| Markup | HTML5, Semantic HTML |
| Styling | CSS3, Flexbox, Grid, CSS Variables, Responsive Design |
| Interaction | Vanilla JavaScript |
| Design | Figma, Photoshop, Illustrator |
| Version / Deploy | GitHub, GitHub Pages |

## 폴더 구조

```text
portfolio_choijiwoo/
├── index.html
├── trippick-portfolio.html
├── karrot-portfolio.html
├── assets/
│   ├── icons/favicon.svg
│   ├── images/
│   │   ├── portfolio-cover.jpg
│   │   └── work-01.jpg ~ work-09.jpg
│   └── projects/
│       ├── trippick-case-study.jpg
│       └── karrot-case-study.jpg
├── css/style.css
├── js/script.js
├── README.md
└── .gitignore
```

### 정리 기준

- 이미지·아이콘·프로젝트 결과물을 `assets/` 아래 역할별로 분리했습니다.
- CSS와 JavaScript를 각각 `css/`, `js/`로 이동했습니다.
- 개인 편집기 설정인 `.vscode/`와 사용하지 않는 이전 포트폴리오 이미지를 제거했습니다.
- 모든 HTML·Open Graph 참조를 새 경로로 함께 변경해 GitHub Pages 배포 경로를 유지했습니다.
- 긴 프로젝트 JPG와 갤러리 이미지를 화면 용도에 맞게 리사이즈·압축했습니다. 다음 단계에서는 WebP/AVIF 또는 실제 HTML 섹션 전환을 검토합니다.

## 트러블슈팅과 배운 점

| 문제 | 해결 | 배운 점 |
|---|---|---|
| 긴 프로젝트 JPG가 화면 크기에 따라 잘림 | 전용 HTML 뷰어에서 원본 비율과 유동 너비 적용 | 결과물의 내용뿐 아니라 보는 경험도 설계해야 함 |
| 애니메이션이 많은 화면의 피로도 | 모션 강도를 조절하고 키보드 포커스 상태 보완 | 시각적 효과는 정보 전달을 방해하지 않아야 함 |
| 모바일 메뉴 상태가 보조기기에 전달되지 않음 | `aria-expanded`, `aria-controls`, 레이블 동기화 | 화면 상태와 접근성 상태를 함께 관리해야 함 |
| 프로젝트 링크가 실제 파일과 맞지 않음 | 배포된 HTML과 저장소 경로를 기준으로 링크 재정리 | README도 제품의 첫 화면처럼 관리해야 함 |



## 로컬 실행과 GitHub Pages

```bash
python -m http.server 8000
```

브라우저에서 `http://localhost:8000`을 엽니다.

GitHub Pages 배포 방법:

1. 저장소 **Settings → Pages**로 이동
2. **Deploy from a branch** 선택
3. Branch를 `main`, Folder를 `/ (root)`로 지정
4. 저장 후 생성된 공개 URL 확인

현재 저장소는 이미 GitHub Pages로 배포되어 있습니다.

## Contact

- Email: [jwc95090@gmail.com](mailto:jwc95090@gmail.com)
- GitHub: [@jwc95090-hash](https://github.com/jwc95090-hash)
