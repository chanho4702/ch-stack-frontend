---
name: add-feature-screen
description: myFront 템플릿에 새 기능 화면을 생성-검증 에이전트 팀(feature-builder + integration-qa)으로 추가하는 오케스트레이터. "새 기능/화면/페이지 추가", "CRUD 화면 만들어줘", "게시판처럼 ~ 만들어줘", "~ 목록/상세/등록 화면", 그리고 후속 요청("다시 실행", "재실행", "수정", "보완", "이전 결과 기반으로", "~ 화면만 다시") 시 반드시 이 스킬로 팀을 구성해 진행한다. 단순 질문(파일 위치, 사용법)은 직접 응답 가능.
---

# 오케스트레이터: 기능 화면 추가 (myFront)

myFront(React 19 + MUI v9 + Vite)에 새 기능 화면을 **생성-검증 에이전트 팀**으로 추가한다.
빌더가 board 패턴으로 구현하고, QA가 모듈별로 경계면을 교차검증한다. 리더(이 세션)는 스펙을
확정하고 팀을 조율하며 결과를 종합한다.

**실행 모드:** 에이전트 팀 (feature-builder + integration-qa). 모든 Agent 호출은 `model: "opus"`.

## Phase 0 — 컨텍스트 확인 (실행 모드 판별)

작업 디렉토리의 `_workspace/` 존재 여부로 분기한다:

- `_workspace/` 없음 → **초기 실행** (아래 Phase 1부터)
- `_workspace/` 있음 + 사용자가 **부분 수정** 요청 → **부분 재실행**: 해당 모듈만 빌더에
  재할당, 나머지는 보존. 이전 `qa_report.md`를 QA에게 컨텍스트로 전달.
- `_workspace/` 있음 + **새 기능** 요청 → **새 실행**: 기존 `_workspace/`를
  `_workspace_prev/`로 옮기고 초기 실행.

## Phase 1 — 스펙 확정 (리더 직접)

사용자 요청에서 다음을 확정한다. 모호하면 사용자에게 1~2개 핵심 질문만 한다:

- **기능명** `<feature>`(경로용, 소문자) + **컴포넌트 접두사** `<Feature>` + 메뉴 라벨(한글)
- **엔티티 필드** — `<Entity>`가 가질 도메인 필드(이름·타입). 타임스탬프/ID는 자동.
- **필요한 화면** — 목록 / 상세 / 폼(생성·수정) 중 어떤 것. 기본은 board와 동일한 4화면.
- 특수 동작(조회수, 상태 토글 등) 유무.

확정한 스펙을 `_workspace/01_spec.md`에 기록한다. 코딩 경험이 적은 사용자에겐 용어를 풀어
설명한다("store = 데이터를 읽고 쓰는 함수 모음").

## Phase 2 — 팀 구성 및 작업 할당

`TeamCreate`로 팀을 만들고(멤버: feature-builder, integration-qa), `TaskCreate`로 작업을
의존 관계와 함께 등록한다. 팀원 정의는 `.claude/agents/`에 있으며 둘 다 `general-purpose`
빌트인 타입 + `model: "opus"`로 스폰한다.

작업 분해(점진적 QA가 핵심 — 모듈마다 빌드→검증을 교차):

| # | 담당 | 작업 | 의존 |
|---|------|------|------|
| T1 | feature-builder | `<feature>Store.ts` 생성 (`feature-scaffold` 스킬) | - |
| T2 | integration-qa | 스토어 shape·시그니처 검증 (`integration-check`) | T1 |
| T3 | feature-builder | 목록/상세/폼 페이지 생성 (필요 화면만) | T2 |
| T4 | integration-qa | store↔페이지 소비 교차검증 | T3 |
| T5 | feature-builder | 4곳 배선(라우트·메뉴·브레드크럼) | T4 |
| T6 | integration-qa | 라우트↔메뉴↔브레드크럼 + context/templates 불변 + `tsc -b` | T5 |

## Phase 3 — 실행 (점진적 생성-검증 루프)

- 빌더는 각 모듈 완성 시 QA에 `SendMessage`로 알리고, QA는 즉시 검증해 결과를 돌려준다.
- QA가 불일치(파일:라인 + 수정안)를 보고하면 빌더가 그 라운드에서 바로 고친다.
- 리더는 `TaskUpdate`로 진행을 모니터링한다. 한 라운드가 통과해야 다음 모듈로 넘어간다.

## Phase 4 — 종합 및 보고

- 최종 `npx tsc -b` 통과 확인 (QA의 T6 결과).
- 생성/수정 파일 목록 + 새 화면 진입 경로(`/app/<feature>`)를 사용자에게 보고.
- 중간 산출물(`_workspace/`)은 보존한다(후속 작업·감사용).

## Phase 5 — 피드백 및 진화

실행 후 "결과나 워크플로우에서 바꾸고 싶은 점이 있나요?"를 한 번 묻는다. 피드백 유형별 반영:
품질→해당 스킬, 역할→에이전트 정의, 순서/팀→이 오케스트레이터, 트리거 누락→description.
변경은 `CLAUDE.md`의 하네스 변경 이력 테이블에 기록한다.

## 데이터 전달 프로토콜

- **태스크 기반**(`TaskCreate`/`TaskUpdate`) — 진행·의존 관리
- **메시지 기반**(`SendMessage`) — 빌더↔QA 실시간 검증 핑퐁
- **파일 기반** — `_workspace/01_spec.md`(스펙), `_workspace/qa_report.md`(QA 누적 보고).
  최종 산출물은 `src/app/<feature>/` 및 배선 파일에 직접 출력.

## 에러 핸들링

- 검증 실패는 같은 라운드에서 빌더가 1회 수정 시도. 재실패 시 해당 항목을 보고서에 "미해결"로
  명시하고 다음으로 진행한다(은폐 금지).
- `tsc -b` 실행 불가(환경 문제)면 정적 교차검증은 계속하고 "타입 검증 미실행"을 보고에 명시.
- QA↔빌더 의견 충돌은 코드 라인 근거로 토론, 미해결이면 리더가 판단해 사용자에게 노출.

## 팀 크기

소~중규모(화면 4개 + 배선 = 약 8~12 작업) → 2명(빌더·QA)이 적정. 더 늘리지 않는다.

## 테스트 시나리오

**정상 흐름:** "공지사항(notice) 목록·상세·작성 화면 만들어줘. 필드는 제목·내용·중요도."
→ Phase 1에서 `<feature>=notice`, 필드 확정 → 팀 생성 → 빌더가 noticeStore 생성 → QA가
shape 검증 통과 → 빌더가 3페이지 생성 → QA가 store↔페이지 검증 → 빌더가 4곳 배선 → QA가
경계면+`tsc -b` 통과 → `/app/notice` 진입 보고.

**에러 흐름:** 빌더가 `Notice.priority` 필드를 만들었는데 목록 페이지가 `notice.importance`로
읽음 → QA가 T4에서 "DetailPage:L42 — 기대 `priority` vs 실제 `importance`" 보고 → 빌더가
같은 라운드에서 페이지를 `priority`로 수정 → QA 재검증 통과 → 다음 모듈 진행.
