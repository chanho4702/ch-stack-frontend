// 게시판 데이터 스토어. 데모 인증과 동일하게 localStorage 에 저장합니다.
// 추후 이 함수들 내부를 실제 API 호출로 교체하면 됩니다.

const STORAGE_KEY = 'myfornt.board.posts';

export interface Post {
  id: string;
  title: string;
  author: string;
  content: string;
  views: number;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

export interface PostInput {
  title: string;
  author: string;
  content: string;
}

const seedPosts = (): Post[] => {
  const now = Date.now();
  const make = (i: number, title: string, author: string, content: string): Post => ({
    id: crypto.randomUUID(),
    title,
    author,
    content,
    views: Math.floor(Math.random() * 50),
    createdAt: new Date(now - i * 86_400_000).toISOString(),
    updatedAt: new Date(now - i * 86_400_000).toISOString(),
  });
  return [
    make(
      0,
      '게시판에 오신 것을 환영합니다 🎉',
      '관리자',
      '이 게시판은 myFornt MSA 프론트 템플릿의 기본 CRUD 예제입니다.\n\n글 등록/조회/수정/삭제, 검색, 페이지네이션, 조회수 기능이 들어 있습니다. 데이터는 브라우저 localStorage 에 저장되니 새로고침해도 유지됩니다.',
    ),
    make(
      1,
      '글쓰기 버튼으로 새 글을 등록해보세요',
      'Riley Carter',
      '우측 상단의 "글쓰기" 버튼을 누르면 작성 폼으로 이동합니다. 제목과 내용은 필수입니다.',
    ),
    make(
      2,
      '제목으로 검색할 수 있어요',
      'dev',
      '목록 상단 검색창에 키워드를 입력하면 제목 기준으로 필터링됩니다.',
    ),
    make(
      3,
      'MUI Table 기반 심플 게시판',
      'dev',
      '목록은 MUI Table 로 구현되어 있어 컬럼을 추가하거나 스타일을 바꾸기 쉽습니다.',
    ),
  ];
};

function read(): Post[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedPosts();
      write(seeded);
      return seeded;
    }
    return JSON.parse(raw) as Post[];
  } catch {
    return [];
  }
}

function write(posts: Post[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

/** 최신순(작성일 내림차순) 전체 목록 */
export function listPosts(): Post[] {
  return read().sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );
}

export function getPost(id: string): Post | undefined {
  return read().find((p) => p.id === id);
}

export function createPost(input: PostInput): Post {
  const posts = read();
  const nowIso = new Date().toISOString();
  const post: Post = {
    id: crypto.randomUUID(),
    title: input.title.trim(),
    author: input.author.trim() || '익명',
    content: input.content.trim(),
    views: 0,
    createdAt: nowIso,
    updatedAt: nowIso,
  };
  write([post, ...posts]);
  return post;
}

export function updatePost(id: string, input: PostInput): Post | undefined {
  const posts = read();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) {
    return undefined;
  }
  const updated: Post = {
    ...posts[idx],
    title: input.title.trim(),
    author: input.author.trim() || '익명',
    content: input.content.trim(),
    updatedAt: new Date().toISOString(),
  };
  posts[idx] = updated;
  write(posts);
  return updated;
}

export function deletePost(id: string): void {
  write(read().filter((p) => p.id !== id));
}

export function incrementViews(id: string): void {
  const posts = read();
  const idx = posts.findIndex((p) => p.id === id);
  if (idx === -1) {
    return;
  }
  posts[idx] = { ...posts[idx], views: posts[idx].views + 1 };
  write(posts);
}
