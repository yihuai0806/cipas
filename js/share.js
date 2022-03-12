$(function(){
    //social share
     window.fbAsyncInit = function() {
        FB.init({
            appId      : '1235742279860141',
            xfbml      : true,
            version    : 'v3.0'
        });
        FB.AppEvents.logPageView();
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
    
    setShareBtns();
    
    function setShareBtns() {
        $('.btn_FB').click(function () {
            FB.ui(
                {
                    method: 'share',
                    href: $(this).attr('data-href') + '?utm_source=site.facebook&utm_medium=share&utm_campaign=fbuser'
                }, function (response) { });
            return false;
        });
        $('.btn_LINE').click(function () {
            ga('send', 'event', 'button-ui', 'share', 'Line分享');
            //var lineUrl = encodeURIComponent('http://line.me/R/msg/text/' + $(this).attr('data-href') + '?utm_source=LINE&utm_medium=share&utm_campaign=lineuser');
            //line share 使用全型"｜"分隔, 其它地方都用空白和半型" | "分隔
    
            var url = $(this).attr('data-href').replace(" | ", "｜");
            url += (url.indexOf("?") === -1) ? "?" : "&";
            var title = $(this).attr('data-title');
    
            shareLineWithShortUrl(title, url);
            return false;
        });
        $('.btn_twitter').click(function(){
            var dataHref = $(this).attr('data-href');
            var dataTitle = $(this).attr('data-title');
            var twitterhref = 'https://twitter.com/intent/tweet?text=' + dataTitle + '&url=' + dataHref;
            window.open(twitterhref, 'window', 'width=550, height=450,personalbar=0,toolbar=0,scrollbars=1,resizable=1'); return false;
        });
        if ($('.btn_copy').length) {
            var clipboard = new ClipboardJS('.btn_copy');
            $('.btn_copy').click(function () {
                var clipboard = new ClipboardJS('.btn_copy');
            });
        }
    }
    
    //動態生成分享的短網址 開始
    function shareLineWithShortUrl(title, longUrlWithoutUtm) {
        var longUrl = encodeURIComponent(longUrlWithoutUtm + "utm_source=LINE&utm_medium=share&utm_campaign=lineuser");
        //console.log('btn_LINE click:' + longUrl);
    
        $.ajax({
            url: 'https://api-ssl.bitly.com/v3/shorten?access_token=4ad3b281a1e3c2ae3397c94bd21e6eba95fc25cc&longUrl=' + longUrl,
            method: 'get',
            async: false,
            success: function (result) {
                //alert('succes: ' + JSON.stringify(result));
                window.location.href = "http://line.me/R/msg/text/?" + encodeURIComponent(title) + "%0D%0A" + result.data.url;
            },
            error: function (result) {
                //alert('err:' + JSON.stringify(result));
                window.location.href = "http://line.me/R/msg/text/?" + encodeURIComponent(title) + "%0D%0A" + longUrl;
            }
        });
    };
    
});