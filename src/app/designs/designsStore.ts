// 설계 문서 데이터 스토어. 데모: localStorage에 저장.
// 추후 이 함수들 내부를 실제 API 호출로 교체하면 화면 수정 없이 백엔드에 붙는다.
// board 패턴(boardStore) 미러 — 단, 조회수 개념은 없다.

const STORAGE_KEY = 'myfornt.designs.docs';

/** 설계 문서 분류. 폼 페이지에서 select 옵션으로 재사용한다. */
export type DesignCategory = '아키텍처' | 'API' | 'DB' | '인프라' | '기타';

export const DESIGN_CATEGORIES: DesignCategory[] = ['아키텍처', 'API', 'DB', '인프라', '기타'];

export interface DesignDoc {
  id: string;
  title: string;
  category: DesignCategory;
  content: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface DesignDocInput {
  title: string;
  category: DesignCategory;
  content: string;
}

const seedDocs = (): DesignDoc[] => {
  const now = Date.now();
  const iso = (offsetMs: number) => new Date(now - offsetMs).toISOString();
  return [
    {
      id: crypto.randomUUID(),
      title: '게이트웨이 라우팅 설계',
      category: '아키텍처',
      content:
        'API 게이트웨이(:8000)가 /api/** 경로를 각 마이크로서비스로 라우팅한다. 인증은 Bearer 토큰 전용이며 쿠키를 사용하지 않는다.',
      createdAt: iso(1000 * 60 * 60 * 24 * 2),
      updatedAt: iso(1000 * 60 * 60 * 24 * 2),
    },
    {
      id: crypto.randomUUID(),
      title: 'board-service 테이블 스키마',
      category: 'DB',
      content:
        'posts 테이블: id(PK, bigint), title, content, author_id, created_at, updated_at. 작성자 이름은 조회 시 user-service 에서 조인 없이 토큰 정보로 채운다.',
      createdAt: iso(1000 * 60 * 60 * 24),
      updatedAt: iso(1000 * 60 * 60 * 24),
    },
  ];
};

function read(): DesignDoc[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedDocs();
      write(seeded);
      return seeded;
    }
    return JSON.parse(raw) as DesignDoc[];
  } catch {
    return [];
  }
}

function write(items: DesignDoc[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/** 최신순(createdAt DESC) 전체 목록 */
export function listDesigns(): DesignDoc[] {
  return read().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getDesign(id: string): DesignDoc | undefined {
  return read().find((x) => x.id === id);
}

export function createDesign(input: DesignDocInput): DesignDoc {
  const items = read();
  const nowIso = new Date().toISOString();
  const item: DesignDoc = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    category: input.category,
    content: input.content.trim(),
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  write([item, ...items]);
  return item;
}

export function updateDesign(id: string, input: DesignDocInput): DesignDoc | undefined {
  const items = read();
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return undefined;
  const updated: DesignDoc = {
    ...items[idx],
    title: input.title.trim(),
    category: input.category,
    content: input.content.trim(),
    updatedAt: new Date().toISOString(),
  };
  items[idx] = updated;
  write(items);
  return updated;
}

export function deleteDesign(id: string): void {
  write(read().filter((x) => x.id !== id));
}
