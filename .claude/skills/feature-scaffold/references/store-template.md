# 스토어 템플릿 (boardStore 기반)

`src/app/<feature>/<feature>Store.ts`. board의 `boardStore.ts`가 정답지다. localStorage에
저장하고, 함수 내부만 추후 API로 교체할 수 있게 export 시그니처를 안정적으로 유지한다.

```ts
// <feature> 데이터 스토어. 데모: localStorage에 저장.
// 추후 이 함수들 내부를 실제 API 호출로 교체하면 화면 수정 없이 백엔드에 붙는다.

const STORAGE_KEY = 'myfornt.<feature>.items';

export interface <Entity> {
  id: string;
  // ... 도메인 필드 (board: title, author, content, views)
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface <Entity>Input {
  // 생성/수정 시 사용자가 채우는 필드만 (id/타임스탬프 제외)
}

const seedItems = (): <Entity>[] => {
  const now = Date.now();
  // crypto.randomUUID()로 id, new Date(...).toISOString()로 날짜
  return [/* 초기 더미 2~4개 */];
};

function read(): <Entity>[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedItems();
      write(seeded);
      return seeded;
    }
    return JSON.parse(raw) as <Entity>[];
  } catch {
    return [];
  }
}

function write(items: <Entity>[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

/** 최신순 전체 목록 */
export function list<Entity>s(): <Entity>[] {
  return read().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function get<Entity>(id: string): <Entity> | undefined {
  return read().find((x) => x.id === id);
}

export function create<Entity>(input: <Entity>Input): <Entity> {
  const items = read();
  const nowIso = new Date().toISOString();
  const item: <Entity> = {
    id: crypto.randomUUID(),
    // ...input (trim 등 정규화),
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  write([item, ...items]);
  return item;
}

export function update<Entity>(id: string, input: <Entity>Input): <Entity> | undefined {
  const items = read();
  const idx = items.findIndex((x) => x.id === id);
  if (idx === -1) return undefined;
  const updated: <Entity> = { ...items[idx], /* ...input */, updatedAt: new Date().toISOString() };
  items[idx] = updated;
  write(items);
  return updated;
}

export function delete<Entity>(id: string): void {
  write(read().filter((x) => x.id !== id));
}
```

## 규칙

- `id`는 `crypto.randomUUID()`. 날짜는 ISO 문자열로 저장하고 화면에서 `toLocaleString('ko-KR')`.
- `create`/`update`에서 문자열 입력은 `.trim()`으로 정규화 (board: 작성자 빈 값 → `'익명'`).
- export 함수명은 `list<Entity>s` / `get<Entity>` 등 board 네이밍을 따른다. 페이지가 이 이름을
  그대로 import하므로 일관성이 중요하다.
- `STORAGE_KEY`는 기능마다 고유해야 한다 (`myfornt.<feature>.*`).
