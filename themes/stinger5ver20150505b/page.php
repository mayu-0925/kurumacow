<?php get_header(); ?>

<div id="content" class="clearfix">
  <div id="contentInner">
    <main>
      <div class="post"> 
        <!--ぱんくず -->
        <div id="breadcrumb"><a href="<?php echo home_url(); ?>">HOME</a>&nbsp;>&nbsp;
          <?php foreach ( array_reverse(get_post_ancestors($post->ID)) as $parid ) { ?>
          <a href="<?php echo get_page_link( $parid );?>" title="<?php echo get_page($parid)->post_title; ?>"> <?php echo get_page($parid)->post_title; ?></a>&nbsp;>&nbsp;
          <?php } ?>
        </div>
        <!--/ ぱんくず -->
        <article>
            <!--ループ開始 -->
            <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <h1 class="entry-title">
              <?php the_title(); //タイトル ?>
            </h1>
            <?php the_content(); //本文 ?>
        </article>
        <?php wp_link_pages(); ?>
        <div class="blog_info contentsbox">
          <p>公開日：
            <time class="entry-date" datetime="<?php the_time('c') ;?>">
              <?php the_time('Y/m/d') ;?>
            </time>
            <br>
            <?php if ($mtime = get_mtime('Y/m/d')) echo '最終更新日：' , $mtime; ?>
          </p>
        </div>
        <?php endwhile; else: ?>
        <p>記事がありません</p>
        <?php endif; ?>
        <!--ループ終了 --> 
        
      </div>
      <!--/post--> 
    </main>
  </div>
  <!-- /#contentInner -->
  <?php get_sidebar(); ?>
</div>
<!--/#content -->
<?php get_footer(); ?>
