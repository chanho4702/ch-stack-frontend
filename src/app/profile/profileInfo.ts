// 블로그형 프로필 히어로에 쓰는 개인 정보 플레이스홀더.
// 실제 값(이름·링크 등)은 사용자가 직접 채운다. 추측/자동 기입 금지.

export interface ProfileLink {
  label: string;
  url: string;
}

export interface ProfileInfo {
  name: string;
  tagline: string;
  bio: string;
  links: ProfileLink[];
}

export const profileInfo: ProfileInfo = {
  name: '이름을 입력하세요',
  tagline: '한 줄 태그라인을 입력하세요',
  bio: '자기소개 한 줄을 입력하세요.',
  links: [
    { label: 'GitHub', url: 'https://github.com/' },
    { label: 'Email', url: 'mailto:example@example.com' },
  ],
};
