// 자기소개/이력 데이터 스토어. 데모: localStorage에 저장.
// 추후 이 함수들 내부를 실제 API 호출로 교체하면 화면 수정 없이 백엔드에 붙는다.
// board 패턴(boardStore) 미러 — 단, 조회수 개념은 없다.

const STORAGE_KEY = 'myfornt.profile.docs';

/** 자기소개 문서 유형. 폼 페이지에서 select 옵션으로 재사용한다. */
export type ProfileDocType = '자기소개' | '자기소개서' | '이력' | '기타';

export const PROFILE_DOC_TYPES: ProfileDocType[] = ['자기소개', '자기소개서', '이력', '기타'];

export interface ProfileDoc {
  id: string;
  title: string;
  docType: ProfileDocType;
  content: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface ProfileDocInput {
  title: string;
  docType: ProfileDocType;
  content: string;
}

const seedDocs = (): ProfileDoc[] => {
  const now = Date.now();
  const iso = (offsetMs: number) => new Date(now - offsetMs).toISOString();
  return [
    {
      id: crypto.randomUUID(),
      title: '한 줄 자기소개',
      docType: '자기소개',
      content:
        '마이크로서비스 아키텍처와 프론트엔드 템플릿화를 즐기는 개발자입니다. 반복되는 화면 패턴을 스캐폴딩으로 자동화하는 데 관심이 많습니다.',
      createdAt: iso(1000 * 60 * 60 * 24 * 3),
      updatedAt: iso(1000 * 60 * 60 * 24 * 3),
    },
    {
      id: crypto.randomUUID(),
      title: '경력 요약',
      docType: '이력',
      content:
        'React 19 + MUI v9 기반 웹 셸 템플릿 설계 및 유지보수. Keycloak OIDC 인증 연동, API 게이트웨이 통합 라우팅 구성 경험.',
      createdAt: iso(1000 * 60 * 60 * 24),
      updatedAt: iso(1000 * 60 * 60 * 24),
    },
  ];
};

function read(): ProfileDoc[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedDocs();
      write(seeded);
      return seeded;
    }
    return JSON.parse(raw) as ProfileDoc[];
  } catch {
    return [];
  }
}

function write(items: ProfileDoc[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/** 최신순(createdAt DESC) 전체 목록 */
export function listProfileDocs(): ProfileDoc[] {
  return read().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getProfileDoc(id: string): ProfileDoc | undefined {
  return read().find((x) => x.id === id);
}

export function createProfileDoc(input: ProfileDocInput): ProfileDoc {
  const items = read();
  const nowIso = new Date().toISOString();
  const item: ProfileDoc = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    docType: input.docType,
    content: input.content.trim(),
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  write([item, ...items]);
  return item;
}

export function updateProfileDoc(id: string, input: ProfileDocInput): ProfileDoc | undefined {
  const items = read();
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return undefined;
  const updated: ProfileDoc = {
    ...items[idx],
    title: input.title.trim(),
    docType: input.docType,
    content: input.content.trim(),
    updatedAt: new Date().toISOString(),
  };
  items[idx] = updated;
  write(items);
  return updated;
}

export function deleteProfileDoc(id: string): void {
  write(read().filter((x) => x.id !== id));
}
