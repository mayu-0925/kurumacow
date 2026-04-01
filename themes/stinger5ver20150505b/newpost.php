<div id="kanren">
  <?php
$args = array(
    'posts_per_page' => 5,
);
$st_query = new WP_Query($args);
?>
  <?php if( $st_query->have_posts() ): ?>
  <?php while ($st_query->have_posts()) : $st_query->the_post(); ?>
  <dl class="clearfix">
    <dt> <a href="<?php the_permalink() ?>">
      <?php if ( has_post_thumbnail() ): // サムネイルを持っているときの処理 ?>
      <?php the_post_thumbnail( 'thumb150' ); ?>
      <?php else: // サムネイルを持っていないときの処理 ?>
      <img src="<?php echo get_template_directory_uri(); ?>/images/no-img.png" alt="no image" title="no image" width="100" height="100" />
      <?php endif; ?>
      </a> </dt>
    <dd>
      <h5><a href="<?php the_permalink(); ?>" >
        <?php the_title(); ?>
        </a></h5>
      <div class="smanone">
        <?php the_excerpt(); //スマートフォンには表示しない抜粋文 ?>
      </div>
    </dd>
  </dl>
  <?php endwhile; ?>
  <?php else: ?>
  <p>新しい記事はありません</p>
  <?php endif; ?>
  <?php wp_reset_postdata(); ?>
</div>
