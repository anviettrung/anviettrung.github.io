# anviettrung.github.io

Trang cá nhân của An Việt Trung. Astro 7 + Tailwind CSS 4 + MDX, tìm kiếm bằng Pagefind,
deploy lên GitHub Pages qua GitHub Actions mỗi lần push lên `master`.

Bản Jekyll cũ (2018–2020) được lưu ở repo archived `anviettrung/blog-jekyll-archive`.

## Sửa nội dung ở đâu

| Muốn sửa | File |
|---|---|
| Tên, giới thiệu, liên kết, menu, mục "Hiện tại", trang Giới thiệu | `src/site.config.ts` |
| Dự án | `src/content/projects/*.md` (mỗi dự án một file) |
| Bài viết | `src/content/posts/*.md` hoặc `.mdx` |
| Ảnh | `public/` (gọi bằng đường dẫn bắt đầu bằng `/`) |
| Màu, font | `src/styles/global.css` (biến `--bg`, `--accent`…) |

Các chỗ còn trong ngoặc vuông `[...]` là nội dung mẫu cần thay.

## Lệnh

```sh
npm install
npm run dev        # chạy thử ở http://localhost:4321
npm run build      # build ra dist/ + tạo chỉ mục tìm kiếm
npm run preview    # xem bản build (tìm kiếm chỉ chạy ở đây, không chạy ở dev)
npm run new-post -- "Tiêu đề bài" --category game --tags unity,mobile
```

`category` là một trong `art`, `script`, `guide`, `game`. Thêm `draft: true` vào frontmatter
để ẩn bài hoặc dự án.

URL bài viết giữ kiểu cũ `/YYYY/MM/DD/slug/` để link ngoài không bị gãy.
