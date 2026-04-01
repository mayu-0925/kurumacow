/*--------------------------------
フッターを最下部に
-------------------------------*/
/*--------------------------------------------------------------------------*
* 
*  footerFixed.js
* 
*  MIT-style license.
* 
*  2007 Kazuma Nishihata [to-R]
*  http://blog.webcreativepark.net
* 
*--------------------------------------------------------------------------*/

new function(){
    
     var footerId = "footer";
     //メイン
     function footerFixed(){
          //ドキュメントの高さ
          var dh = document.getElementsByTagName("body")[0].clientHeight;
          //フッターのtopからの位置
          document.getElementById(footerId).style.top = "0px";
          var ft = document.getElementById(footerId).offsetTop;
          //フッターの高さ
          var fh = document.getElementById(footerId).offsetHeight;
          //ウィンドウの高さ
          if (window.innerHeight){
               var wh = window.innerHeight;
          }else if(document.documentElement && document.documentElement.clientHeight != 0){
               var wh = document.documentElement.clientHeight;
          }
          if(ft+fh<wh){
               document.getElementById(footerId).style.position = "relative";
               document.getElementById(footerId).style.top = (wh-fh-ft-1)+"px";
          }
     }
    
     //文字サイズ
     function checkFontSize(func){
    
          //判定要素の追加    
          var e = document.createElement("div");
          var s = document.createTextNode("S");
          e.appendChild(s);
          e.style.visibility="hidden"
          e.style.position="absolute"
          e.style.top="0"
          document.body.appendChild(e);
          var defHeight = e.offsetHeight;
         
          //判定関数
          function checkBoxSize(){
               if(defHeight != e.offsetHeight){
                    func();
                    defHeight= e.offsetHeight;
               }
          }
          setInterval(checkBoxSize,1000)
     }
    
     //イベントリスナー
     function addEvent(elm,listener,fn){
          try{
               elm.addEventListener(listener,fn,false);
          }catch(e){
               elm.attachEvent("on"+listener,fn);
          }
     }

     addEvent(window,"load",footerFixed);
     addEvent(window,"load",function(){
          checkFontSize(footerFixed);
     });
     addEvent(window,"resize",footerFixed);
    
}

/*-------------
ページスクロール
-----------*/

jQuery(function() {
    var pageTop = jQuery('#page-top');
    pageTop.hide();
    //スクロールが400に達したら表示
    jQuery(window).scroll(function () {
        if(jQuery(this).scrollTop() > 400) {
            pageTop.fadeIn();
        } else {
            pageTop.fadeOut();
        }
    });
    //スクロールしてトップ
        pageTop.click(function () {
        jQuery('body,html').animate({
            scrollTop: 0
        }, 800);
        return false;
        });
  });

/*---------------------------
ｱｺｰﾃﾞｨｵﾝ
------------------------------*/

jQuery(document).ready(function(){
  //acordion_treeを一旦非表示に
  jQuery(".acordion_tree").css("display","none");
  //triggerをクリックすると以下を実行
  jQuery(".trigger").click(function(){
    //もしもクリックしたtriggerの直後の.acordion_treeが非表示なら
    if(jQuery("+.acordion_tree",this).css("display")=="none"){
         //classにactiveを追加
         jQuery(this).addClass("active");
         //直後のacordion_treeをスライドダウン
         jQuery("+.acordion_tree",this).slideDown("normal");
  }else{
    //classからactiveを削除
    jQuery(this).removeClass("active");
    //クリックしたtriggerの直後の.acordion_treeが表示されていればスライドアップ
    jQuery("+.acordion_tree",this).slideUp("normal");
  }
  });
});

/*---------------------------
ドロップダウン
------------------------------*/

jQuery(document).ready(function(){
    jQuery(".menu ul.children").hide();
    jQuery("li.page_item").hover(function() {
        jQuery("ul.children",this).slideDown("slow");
    },
    function() {
        jQuery("ul.children",this).slideUp("slow");
    });
});