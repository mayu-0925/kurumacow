<?php get_header(); ?>

<div id="content" class="clearfix">
  <div id="contentInner">
    <main>
      <article>
        <div class="post"> 
          <!--ぱんくず -->
          <div id="breadcrumb">
            <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> <a href="<?php echo home_url(); ?>" itemprop="url"> <span itemprop="title">ホーム</span> </a> &gt; </div>
            <?php $postcat = get_the_category(); ?>
            <?php $catid = $postcat[0]->cat_ID; ?>
            <?php $allcats = array($catid); ?>
            <?php 
while(!$catid==0) {
    $mycat = get_category($catid);
    $catid = $mycat->parent;
    array_push($allcats, $catid);
}
array_pop($allcats);
$allcats = array_reverse($allcats);
?>
            <?php foreach($allcats as $catid): ?>
            <div itemscope itemtype="http://data-vocabulary.org/Breadcrumb"> <a href="<?php echo get_category_link($catid); ?>" itemprop="url"> <span itemprop="title"><?php echo get_cat_name($catid); ?></span> </a> &gt; </div>
            <?php endforeach; ?>
          </div>
          <!--/ ぱんくず -->

            <h1 class="entry-title"> Hello! my name is 404 </h1>
            <p>お探しのページはありませんでした！申し訳ありません。</p>

        </div>
        <!--/post--> 
      </article>
    </main>
  </div>
  <!-- /#contentInner -->
  <?php get_sidebar(); ?>
</div>
<!--/#content -->
<?php get_footer(); ?>
