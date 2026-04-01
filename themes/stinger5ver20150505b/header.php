<!DOCTYPE html>
<!--[if lt IE 7]> <html class="ie6" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]> <html class="i7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]> <html class="ie" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!--> <html <?php language_attributes(); ?>> <!--<![endif]-->
<head>
<meta charset="<?php bloginfo('charset'); ?>" />
<meta name="viewport" content="width=device-width,initial-scale=1.0,user-scalable=no">
<meta name="format-detection" content="telephone=no" />
<?php if(is_category()): ?>
<?php elseif(is_archive()): ?>
<meta name="robots" content="noindex,follow">
<?php elseif(is_search()): ?>
<meta name="robots" content="noindex,follow">
<?php elseif(is_tag()): ?>
<meta name="robots" content="noindex,follow">
<?php elseif(is_paged()): ?>
<meta name="robots" content="noindex,follow">
<?php endif; ?>
<title>
<?php
global $page, $paged;
if(is_front_page()):
elseif(is_single()):
wp_title('|',true,'right');
elseif(is_page()):
wp_title('|',true,'right');
elseif(is_archive()):
wp_title('|',true,'right');
elseif(is_search()):
wp_title('|',true,'right');
elseif(is_404()):
echo'404 |';
endif;
bloginfo('name');
if($paged >= 2 || $page >= 2):
echo'-'.sprintf('%sページ',
max($paged,$page));
endif;
?>
</title>
<link rel="stylesheet" href="<?php bloginfo('template_directory'); ?>/css/normalize.css">
<link rel="stylesheet" href="<?php echo get_stylesheet_uri(); ?>" type="text/css" media="screen" />
<link rel="alternate" type="application/rss+xml" title="<?php bloginfo('name'); ?> RSS Feed" href="<?php bloginfo('rss2_url'); ?>" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/images/logo.ico" />
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet">
<!--[if lt IE 9]>
<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
<script src="<?php bloginfo('template_directory'); ?>/js/html5shiv.js"></script>
<![endif]-->
<?php wp_head(); ?>
<?php if(is_mobile()) { ?>
<link rel="apple-touch-icon-precomposed" href="<?php echo get_template_directory_uri(); ?>/images/apple-touch-icon-precomposed.png" />
<?php } else { ?>
<?php } ?>
</head>
<body <?php body_class(); ?>>
<!-- アコーディオン -->
<nav id="s-navi" class="pcnone">
  <dl class="acordion">
    <dt class="trigger">
      <p><span class="op"><i class="fa fa-bars"></i>&nbsp; MENU</span></p>
    </dt>
    <dd class="acordion_tree">
      <ul>
        <?php wp_nav_menu(array('theme_location' => 'navbar'));?>
      </ul>
      <div class="clear"></div>
    </dd>
  </dl>
</nav>
<!-- /アコーディオン -->
<div id="wrapper">
<header> 
  <!-- ロゴ又はブログ名 -->
  <p class="sitename"><a href="<?php echo home_url(); ?>/">
    <?php if (get_option('stinger_logo_image')): //ロゴ画像がある時 ?>
    <img alt="<?php bloginfo( 'name' ); ?>" src="<?php echo esc_url(get_option('stinger_logo_image')); ?>" />
    <?php else: //ロゴ画像が無い時 ?>
    <?php bloginfo( 'name' ); ?>
    <?php endif; ?>
    </a></p>
  <!-- キャプション -->
  <?php if (is_home()) { ?>
  <h1 class="descr">
    <?php bloginfo('description'); ?>
  </h1>
  <?php } else { ?>
  <p class="descr">
    <?php bloginfo('description'); ?>
  </p>
  <?php } ?>
  
  <!--
カスタムヘッダー画像
-->
  <div id="gazou">
    <?php if(get_header_image()): ?>
    <p id="headimg"><img src="<?php header_image(); ?>" alt="*" width="<?php echo HEADER_IMAGE_WIDTH; ?>" height="<?php echo HEADER_IMAGE_HEIGHT; ?>" /></p>
    <?php endif; ?>
  </div>
  <!-- /gazou --> 
  <!--
メニュー
-->
  <nav class="smanone clearfix">
    <?php
$defaults = array(
	'theme_location'  => 'navbar',
);
wp_nav_menu( $defaults );
?>
  </nav>
</header>
