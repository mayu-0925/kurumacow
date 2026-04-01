<div id="side">
<aside>
<!--
<?php if (is_404()) { ?>
<?php } else { ?>
  <div class="ad">
    <?php if ( function_exists('dynamic_sidebar') && dynamic_sidebar(4) ) : else : //アドセンス ?>
    <?php endif; ?>
  </div>
<?php } ?>
-->
  <!-- RSSボタンです -->
  <!-- <div class="rssbox"> <a href="<?php echo home_url(); ?>/?feed=rss2"><i class="fa fa-rss-square"></i>&nbsp;購読する</a> </div> -->
  <!-- RSSボタンここまで -->
 <!-- 最近のエントリ -->
  <!--
  <h4 class="menu_underh2"> NEW POST</h4>
  <?php get_template_part('newpost');?>
  -->
  <!-- /最近のエントリ -->
  <div id="mybox">
    <?php if ( function_exists('dynamic_sidebar') && dynamic_sidebar(1) ) : else : //サイドウイジェット読み込み ?>
    <?php endif; ?>
  </div>

  <!-- スマホだけのアドセンス -->
<?php if (is_404()) { ?>
<?php } else { ?>
  <?php if(is_mobile()) { //スマホの場合 ?>
  <div style="padding-top:10px;">
    <?php get_template_part('ad'); //アドセンス読み込み ?>
  </div>
  <?php } else { //PCの場合 ?>
  <?php } ?>
<?php } ?>
  <!-- /スマホだけのアドセンス -->
  <div id="scrollad">
      <?php get_template_part('scroll-ad'); //追尾式広告 ?>
  </div>
</aside>
</div>