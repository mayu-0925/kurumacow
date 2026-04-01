<div id="search">
  <form method="get" id="searchform" action="<?php echo home_url(); ?>/">
    <label class="hidden" for="s">
      <?php _e('', 'kubrick'); ?>
    </label>
    <input type="text" value="<?php the_search_query(); ?>"  name="s" id="s" />
    <input type="image" src="<?php echo get_template_directory_uri(); ?>/images/search.png" alt="検索" id="searchsubmit"  value="<?php _e('Search', 'kubrick'); ?>" />
  </form>
</div>
<!-- /stinger --> 
