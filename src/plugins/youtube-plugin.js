const YoutubePlugin = {

  install(Vue, options) {
 
   Vue.prototype.$getYoutubeData =  function (method, params) {  
        console.log(params)
       var xhr = new XMLHttpRequest();
        var urlParams = "?"
        for(var attr in params){
            urlParams += attr +"="+params[attr]+ "&";
        }

        urlParams = urlParams.substring(0, urlParams.length-1);

        var youtubeUrl = 'https://www.googleapis.com/youtube/v3/'+ method + urlParams + "&key="+ options.apiKey;

        xhr.open('GET', youtubeUrl ,false);
        xhr.send(null);
        if(xhr.status == 200){
           console.log(JSON.parse(xhr.responseText));
           return JSON.parse(xhr.responseText)           
        }
    }
    
  }

}


export default YoutubePlugin;
