// 게시판 데이터 레이어 — board-service(:9100) REST 호출.
//
// 인증: board API 호출은 별도 인증 인스턴스를 만들지 않고, 기존 authClient(:9000)가
// 메모리에 들고 있는 access token 을 공유한다. 읽기(GET)는 public 이라 토큰 없이도 되고,
// 쓰기(POST/PUT/DELETE)만 Bearer 를 붙이며 401 이면 1회 refresh 후 재시도한다.
// board-service 는 쿠키를 안 쓰므로 credentials:'include' 를 쓰지 않는다(Bearer 전용).

import { authClient } from '../../auth';

const BASE = (import.meta.env.VITE_BOARD_API_BASE as string).replace(/\/+$/, '');

/** board-service 응답/요청 계약. id 는 숫자, 작성자는 토큰에서 서버가 박는다(authorName). */
export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  authorName: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}

/** 목록용 요약 DTO(PostSummaryResponse). */
export interface PostSummary {
  id: number;
  title: string;
  authorName: string;
  createdAt: string; // ISO
}

export interface PostInput {
  title: string;
  content: string;
}

/** Spring Data Page 응답(필요한 필드만). */
export interface Page<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  number: number; // 현재 페이지(0-base)
  size: number;
}

/** 상태코드를 들고 다니는 에러 — 페이지에서 404/403 을 구분해 처리한다. */
export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
    this.name = 'ApiError';
  }
}

async function boardFetch(path: string, init: RequestInit = {}): Promise<Response> {
  const doFetch = () => {
    const headers = new Headers(init.headers);
    const at = authClient.getAccessToken();
    if (at) headers.set('Authorization', `Bearer ${at}`);
    return fetch(`${BASE}${path}`, { ...init, headers });
  };
  let res = await doFetch();
  if (res.status === 401 && (await authClient.tryRefresh())) {
    res = await doFetch();
  }
  return res;
}

function jsonInit(method: string, body: unknown): RequestInit {
  return {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  };
}

/** 최신순(createdAt DESC, 서버 기본 정렬) 페이지 조회. page 는 0-base. */
export async function listPosts(page: number, size = 10): Promise<Page<PostSummary>> {
  const res = await boardFetch(`/api/posts?page=${page}&size=${size}`);
  if (!res.ok) throw new ApiError(res.status, '목록을 불러오지 못했습니다.');
  return (await res.json()) as Page<PostSummary>;
}

export async function getPost(id: number): Promise<Post> {
  const res = await boardFetch(`/api/posts/${id}`);
  if (res.status === 404) throw new ApiError(404, '존재하지 않는 글입니다.');
  if (!res.ok) throw new ApiError(res.status, '글을 불러오지 못했습니다.');
  return (await res.json()) as Post;
}

export async function createPost(input: PostInput): Promise<Post> {
  const res = await boardFetch('/api/posts', jsonInit('POST', input));
  if (res.status === 401) throw new ApiError(401, '로그인이 필요합니다.');
  if (!res.ok) throw new ApiError(res.status, '등록에 실패했습니다.');
  return (await res.json()) as Post;
}

export async function updatePost(id: number, input: PostInput): Promise<Post> {
  const res = await boardFetch(`/api/posts/${id}`, jsonInit('PUT', input));
  if (res.status === 403) throw new ApiError(403, '수정 권한이 없습니다.');
  if (res.status === 404) throw new ApiError(404, '존재하지 않는 글입니다.');
  if (!res.ok) throw new ApiError(res.status, '수정에 실패했습니다.');
  return (await res.json()) as Post;
}

export async function deletePost(id: number): Promise<void> {
  const res = await boardFetch(`/api/posts/${id}`, { method: 'DELETE' });
  if (res.status === 403) throw new ApiError(403, '삭제 권한이 없습니다.');
  if (res.status !== 204 && !res.ok) throw new ApiError(res.status, '삭제에 실패했습니다.');
}
