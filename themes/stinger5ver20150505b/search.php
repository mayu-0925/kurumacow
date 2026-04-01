<?php get_header(); ?>

<div id="content" class="clearfix">
  <div id="contentInner">
    <main>
      <article>
        <section>
          <h2> <!--検索結果数--> 
            「<?php echo esc_html($s); ?>」の検索結果 <?php echo $wp_query->found_posts; ?> 件 </h2>
          <!--検索結果数終わり-->
          <?php get_template_part('itiran');?>
        </section>
        <!--/section--> 
        <!--ページナビ-->
        <?php if (function_exists("pagination")) {
pagination($wp_query->max_num_pages);
} ?>
      </article>
    </main>
  </div>
  <!-- /#contentInner -->
  <?php get_sidebar(); ?>
</div>
<!--/#content -->
<?php get_footer(); ?>
