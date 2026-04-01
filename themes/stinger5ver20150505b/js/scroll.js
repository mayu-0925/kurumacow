/*--------------------------------
広告のフロート
-------------------------------*/
(function(jquery) {
     jquery(document).ready(function() {
          /*
          Ads Sidewinder
          by Hamachiya2. http://d.hatena.ne.jp/Hamachiya2/20120820/adsense_sidewinder
          */
          var main = jQuery('main'); // メインカラムのID
          var side = jQuery('#side aside'); // サイドバーのID
          var wrapper = jQuery('#scrollad'); // 広告を包む要素のID

if (main.length === 0 || side.length === 0 || wrapper.length === 0) {
return;
}

          var w = jquery(window);
          var wrapperHeight = wrapper.outerHeight();
          var wrapperTop = wrapper.offset().top;
          var sideLeft = side.offset().left;

          var sideMargin = {
               top: side.css('margin-top') ? side.css('margin-top') : 0,
               right: side.css('margin-right') ? side.css('margin-right') : 0,
               bottom: side.css('margin-bottom') ? side.css('margin-bottom') : 0,
               left: side.css('margin-left') ? side.css('margin-left') : 0
          };

          var winLeft;
          var pos;

          var scrollAdjust = function() {
               sideHeight = side.outerHeight();
               mainHeight = main.outerHeight();
               mainAbs = main.offset().top + mainHeight;
               var winTop = w.scrollTop();
               winLeft = w.scrollLeft();
               var winHeight = w.height();
               var nf = (winTop > wrapperTop) && (mainHeight > sideHeight) ? true : false;
               pos = !nf ? 'static' : (winTop + wrapperHeight) > mainAbs ? 'absolute' : 'fixed';
               if (pos === 'fixed') {
                    side.css({
                         position: pos,
                         top: '',
                         bottom: winHeight - wrapperHeight,
                         left: sideLeft - winLeft,
                         margin: 0
                    });

               } else if (pos === 'absolute') {
                    side.css({
                         position: pos,
                         top: mainAbs - sideHeight,
                         bottom: '',
                         left: sideLeft,
                         margin: 0
                    });

               } else {
                    side.css({
                         position: pos,
                         marginTop: sideMargin.top,
                         marginRight: sideMargin.right,
                         marginBottom: sideMargin.bottom,
                         marginLeft: sideMargin.left
                    });
               }
          };

          var resizeAdjust = function() {
               side.css({
                    position:'static',
                    marginTop: sideMargin.top,
                    marginRight: sideMargin.right,
                    marginBottom: sideMargin.bottom,
                    marginLeft: sideMargin.left
               });
               sideLeft = side.offset().left;
               winLeft = w.scrollLeft();
               if (pos === 'fixed') {
                    side.css({
                         position: pos,
                         left: sideLeft - winLeft,
                         margin: 0
                    });

               } else if (pos === 'absolute') {
                    side.css({
                         position: pos,
                         left: sideLeft,
                         margin: 0
                    });
               }
          };
          w.on('load', scrollAdjust);
          w.on('scroll', scrollAdjust);
          w.on('resize', resizeAdjust);
     });
})(jQuery);