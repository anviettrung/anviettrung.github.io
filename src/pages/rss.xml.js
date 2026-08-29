import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { getExcerpt, postHref } from '../lib/posts';

export async function GET(context) {
  const posts = await getCollection('posts');
  return rss({
    title: "An's blog",
    description: 'Những ghi chép của An Việt Trung',
    site: context.site,
    items: posts
      .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf())
      .map((post) => ({
        title: post.data.title,
        pubDate: post.data.date,
        description: getExcerpt(post.body ?? '', post.data.truncate_words),
        link: postHref(post.id, post.data.date),
      })),
  });
}
