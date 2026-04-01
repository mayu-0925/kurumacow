<?php if(is_mobile()) { //スマートフォンの時は300pxサイズを ?>
<?php if ( function_exists('dynamic_sidebar') && dynamic_sidebar(4) ) : else : ?>
<?php endif; ?>
<?php 
}else{  //PCの時は336pxサイズを
?>
<?php if ( function_exists('dynamic_sidebar') && dynamic_sidebar(3) ) : else : ?>
<?php endif; ?>
<?php
}
?>
