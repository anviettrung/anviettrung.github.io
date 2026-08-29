#!/usr/bin/env node
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const CATEGORIES = ['art', 'script', 'guide', 'game'];

function parseArgs(argv) {
  const args = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === '--tags') {
      args.tags = argv[++i];
    } else if (arg === '--category') {
      args.category = argv[++i];
    } else if (arg === '--date') {
      args.date = argv[++i];
    } else {
      args._.push(arg);
    }
  }
  return args;
}

function slugify(title) {
  const COMBINING_MARKS = new RegExp('[\\u0300-\\u036f]', 'g');
  return title
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .normalize('NFD')
    .replace(COMBINING_MARKS, '')
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function todayLocal() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  const title = args._.join(' ').trim();

  if (!title) {
    console.error('Usage: npm run new-post -- "Tiêu đề bài viết" --category art [--tags foo,bar] [--date YYYY-MM-DD]');
    process.exit(1);
  }

  if (!args.category || !CATEGORIES.includes(args.category)) {
    console.error(`--category is required and must be one of: ${CATEGORIES.join(', ')}`);
    process.exit(1);
  }

  const date = args.date ?? todayLocal();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    console.error('--date must be in YYYY-MM-DD format');
    process.exit(1);
  }

  const slug = slugify(title);
  if (!slug) {
    console.error('Could not derive a slug from that title — try a title with some letters/numbers in it.');
    process.exit(1);
  }

  const tags = args.tags
    ? args.tags.split(',').map((t) => t.trim()).filter(Boolean)
    : [];

  const __dirname = path.dirname(fileURLToPath(import.meta.url));
  const postsDir = path.join(__dirname, '..', 'src', 'content', 'posts');
  const filename = `${date}-${slug}.md`;
  const filepath = path.join(postsDir, filename);

  if (existsSync(filepath)) {
    console.error(`A post already exists at src/content/posts/${filename} — pick a different title or date.`);
    process.exit(1);
  }

  mkdirSync(postsDir, { recursive: true });

  const tagsYaml = tags.length > 0 ? `[${tags.join(', ')}]` : '[]';
  const content = `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date}
tags: ${tagsYaml}
category: ${args.category}
---
<!--excerpt.start-->

<!--excerpt.end-->

##
`;

  writeFileSync(filepath, content, 'utf8');
  console.log(`Created src/content/posts/${filename}`);
}

main();
