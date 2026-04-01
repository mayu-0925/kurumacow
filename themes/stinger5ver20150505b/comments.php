<div id="comments">
  <?php
if(have_comments()):
?>
  <h3 id="resp">Comment</h3>
  <ol class="commets-list">
    <?php wp_list_comments('avatar_size=55'); ?>
  </ol>
  <?php
endif;

$args=array('title_reply' => 'Message',
'
lavel_submit' => ('Submit Comment')
);
comment_form($args);
?>
</div>
<!-- END singer -->