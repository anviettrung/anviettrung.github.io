import rss from '@astrojs/rss';
import { site } from '../site.config';
import { getPosts, getExcerpt, postHref } from '../lib/posts';

export async function GET(context) {
  const posts = await getPosts();
  return rss({
    title: site.name,
    description: site.description,
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: getExcerpt(post.body ?? '', post.data.truncate_words),
      link: postHref(post.id, post.data.date),
      categories: post.data.tags,
    })),
  });
}
