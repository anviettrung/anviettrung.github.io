---
layout: post
title: "Blog's tips/trick"
date: 2018-06-16
tags: [tips, web]
---
<!--excerpt.start-->
<!--excerpt.end-->
## Add excerpt to post
Automation: 25 first words in post (include words in header, so careful). You can change number of words by setting the FrontMatter variable 
`truncate_words`.

By hand (Recommended): Let excerpt is in `<!--excerpt.start-->` and 
`<!--excerpt.end-->`

Solution source: [Detail][How to add excerpt]

## Custom FrontMatter variables in layout
Use `layout.my_var` instead of `page.my_var` because YAML FrontMatter var weren't read inside a layout file.
[Detail][How to custom FM var]

## Embed a Youtube video
Open a Youtube's video. Click **Share -> Embed**, copy HTML code and paste it directly in markdown. 

Example:
```html
<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/lFUlliTQEfk?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
```

#### Reponsive video
To fit a video size to screen, add a `class="video"` in tag `iframe`. After that, put all of it in a `div` with `class="youtube-video"`. 

Example:
```html
<div class="youtube-video">
  <iframe class="video" width="560" height="315" src="https://www.youtube-nocookie.com/embed/lFUlliTQEfk?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div> 
```

Result:
<div class="youtube-video">
  <iframe class="video" width="560" height="315" src="https://www.youtube-nocookie.com/embed/lFUlliTQEfk?rel=0" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
</div>

[How to add excerpt]: http://frontendcollisionblog.com/jekyll/snippet/2015/03/23/how-to-show-a-summary-of-your-post-with-jekyll.html
[How to custom FM var]: https://github.com/jekyll/jekyll/issues/4123