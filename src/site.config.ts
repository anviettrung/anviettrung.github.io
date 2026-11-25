/**
 * Toàn bộ thông tin cá nhân của site nằm ở đây.
 * Sửa file này để đổi tên, giới thiệu, liên kết, trang About.
 * Dự án nằm ở src/content/projects/, bài viết ở src/content/posts/.
 */

export const site = {
  name: 'An Việt Trung',
  shortName: 'An',
  title: 'An Việt Trung',
  description: 'Game developer. Ghi chép về làm game, 3D và scripting.',
  /** Dòng ngắn dưới tên ở trang chủ. */
  role: 'Game developer · 3D · Scripting',
  /** Đoạn giới thiệu ở trang chủ. */
  intro:
    'Mình là An, làm game là chính, thỉnh thoảng dựng 3D và viết script khi không tìm ra tool nào làm sẵn việc mình cần. Đây là nơi giữ lại các dự án và những gì mày mò được.',
  /** Ảnh đại diện: đặt file vào public/ rồi ghi đường dẫn, ví dụ '/avatar.jpg'. Để trống thì hiện chữ viết tắt. */
  avatar: '',
  initials: 'AT',
  email: 'an.viettrung.m@gmail.com',
  locale: 'vi',
};

export const socials: { label: string; href: string }[] = [
  { label: 'GitHub', href: 'https://github.com/anviettrung' },
  { label: 'Email', href: `mailto:${site.email}` },
  { label: 'RSS', href: '/rss.xml' },
];

export const nav = [
  { label: 'Dự án', href: '/projects/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Giới thiệu', href: '/about/' },
];

/** Mục "Hiện tại" ở trang chủ: đang làm gì, đang học gì. Để mảng rỗng thì ẩn. */
export const now: string[] = [
  '[Đang làm gì — sửa trong src/site.config.ts]',
  '[Đang học / đang vọc gì]',
];

export const about = {
  /** Mỗi phần tử là một đoạn văn. */
  bio: [
    '[Đoạn giới thiệu bản thân: bạn là ai, làm gì, quan tâm tới điều gì.]',
    '[Đoạn thứ hai: con đường đến với làm game, điều bạn thích ở công việc này.]',
  ],
  experience: [
    { period: '20xx — nay', role: '[Chức danh]', org: '[Công ty]', note: '[Một dòng mô tả việc chính]' },
    { period: '20xx — 20xx', role: '[Chức danh]', org: '[Công ty]', note: '[Một dòng mô tả việc chính]' },
  ],
  education: [{ period: '20xx — 20xx', role: '[Ngành học]', org: 'HUST', note: '' }],
  skills: [
    { group: 'Game', items: ['Unity', 'C#', '[...]'] },
    { group: '3D & Art', items: ['Blender', 'Photoshop', '[...]'] },
    { group: 'Khác', items: ['JavaScript / TypeScript', '[...]'] },
  ],
};
