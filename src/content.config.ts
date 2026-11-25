import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/posts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    category: z.enum(['art', 'script', 'guide', 'game']),
    featured_image: z.string().optional(),
    truncate_words: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    year: z.number(),
    /** Vai trò của bạn trong dự án, ví dụ "Solo dev", "Gameplay programmer". */
    role: z.string().optional(),
    tags: z.array(z.string()).default([]),
    /** Ảnh bìa đặt trong public/, ví dụ "/projects/ten-du-an.png". */
    cover: z.string().optional(),
    links: z.array(z.object({ label: z.string(), href: z.string() })).default([]),
    /** Hiện ở trang chủ. */
    featured: z.boolean().default(false),
    /** Thứ tự sắp xếp, số nhỏ lên trước. Bỏ trống thì xếp theo năm. */
    order: z.number().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
