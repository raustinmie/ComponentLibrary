import { useEffect } from 'react';

export default function CuratorFeed() {
  useEffect(() => {
    const script = document.createElement('script');
    script.innerHTML = `
(function () {
    // Loader
    var loader=new function(){this.rC=-1,this.r=[],this.add=function(t){this.r.push(t)},this.addTag=function(t,e){var i=document.getElementsByTagName("head")[0],s=t.indexOf(".js")>0?"script":"link",n=document.createElement(s);i.appendChild(n),n.onload=e,n.charset="UTF-8","script"===s?(n.type="text/javascript",n.src=t):"link"===s&&(n.rel="stylesheet",n.href=t)},this.loadNext=function(){if(this.rC++,this.rC>=this.r.length)this.done();else{var t=this.r[this.rC];this.addTag(t,this.loadNext.bind(this))}},this.done=function(){this.onResourcesLoaded(window.Curator)},this.load=function(t){this.onResourcesLoaded=t,this.loadNext()}};

    // Config
    var config = {"type":"Waterfall","post":{"animate":true,"maxHeight":0,"showTitles":true,"showShare":true,"showComments":false,"showLikes":false,"autoPlayVideos":false,"clickAction":"open-popup","clickReadMoreAction":"open-popup","maxLines":0},"widget":{"template":"widget-waterfall","colWidth":250,"colGutter":0,"showLoadMore":true,"continuousScroll":false,"postsPerPage":12,"animate":false,"progressiveLoad":false,"lazyLoad":false,"verticalSpacing":20,"horizontalSpacing":20,"autoLoadNew":false,"lazyLoadType":"none","gridMobile":true,"gridMobileRows":3},"lang":"en","container":"#curator-feed-new-layout","debug":0,"hidePoweredBy":false,"embedSource":"","forceHttps":false,"feed":{"id":"05d50158-0839-4690-831b-1792a28716c3","apiEndpoint":"https:\/\/api.curator.io","postsPerPage":12,"params":{},"limit":25},"popup":{"template":"popup","templateWrapper":"popup-wrapper","autoPlayVideos":false,"deepLink":false},"filter":{"template":"filter","showNetworks":false,"showSources":false,"showAll":false,"default":"all","limitPosts":false,"limitPostNumber":0,"period":""},"theme":"sydney"};
    var colours = {"widgetBgColor":"transparent","bgColor":"#ffffff","borderColor":"#cccccc","iconColor":"#222222","textColor":"#222222","linkColor":"#595959","dateColor":"#000000","footerColor":"#ffffff","tabIndexColor":"#cccccc","buttonColor":"#dddddd","popupBgColor":"#ffffff","popupLetterboxColor":"#F5F5F5","popupTextColor":"#222222","popupLinkColor":"#595959","popupIconColor":"#222222","popupDateColor":"#222222","shareBgColor":"#ffffff","shareTextColor":"#222222","shareIconColor":"#222222"};
    var styles = {};

    // Bootstrap
    function loaderCallback () {
        window.Curator.loadWidget(config, colours, styles);
    }

    // Run Loader
    loader.add('https://cdn.curator.io/6.0/curator.embed.css');
    loader.add('https://cdn.curator.io/published-css/05d50158-0839-4690-831b-1792a28716c3.css');

    loader.add('https://cdn.curator.io/6.0/curator.embed.js');

    

    loader.load(loaderCallback);
})();

    `;
    script.type = 'text/javascript';
    document.body.appendChild(script);
  }, []);

  return (
    <div id="curator-feed-new-layout" style={{ width: '100%' }} />
  );
}