<div class="sns">
    <ul class="snsb clearfix">
      <li> <a href="https://twitter.com/share" class="twitter-share-button" data-count="vertical" data-via="" data-url="<?php echo home_url(); ?>" data-text="<?php bloginfo( 'name' ); ?>">Tweet</a><script type="text/javascript" src="//platform.twitter.com/widgets.js"></script> 
      </li>
      <li>
        <iframe src="http://www.facebook.com/plugins/like.php?href=<?php echo home_url(); ?>&amp;layout=box_count&amp;show_faces=false&amp;width=50&amp;action=like&amp;colorscheme=light&amp;height=62" scrolling="no" frameborder="0" style="border:none; overflow:hidden; width:70px; height:62px;" allowTransparency="true"></iframe>
      </li>
      <li><script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>
        <g:plusone size="tall" href="<?php the_permalink(); ?>"></g:plusone>
      </li>
      <li> <a href="http://b.hatena.ne.jp/entry/<?php echo home_url(); ?>" class="hatena-bookmark-button" data-hatena-bookmark-title="<?php bloginfo( 'name' ); ?>" data-hatena-bookmark-layout="vertical" title="このエントリーをはてなブックマークに追加"><img src="http://b.st-hatena.com/images/entry-button/button-only.gif" alt="このエントリーをはてなブックマークに追加" width="20" height="20" style="border: none;" /></a><script type="text/javascript" src="http://b.st-hatena.com/js/bookmark_button.js" charset="utf-8" async="async"></script> 
      </li>
    </ul>
  </div>