function inIframe() {
    try {return window.self !== window.top; 
    } 
    catch (e){ 
        return true; } 
}

var colors = ['#16a085','#383A3F', '#27ae60', '#2c3e50', '#f39c12', '#e74c3c', '#9b59b6', '#FB6964', '#342224', "#472E32", "#BDBB99", "#77B1A9", "#73A857"];

var quoteForShare="";

var currentQuote = '', currentAuthor = '', currentColor="";

var url="http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?";

//Function for getting new quote
$(document).ready(function(){
    $("#new-quote").on("click", function(){
     
   
     $.getJSON(url,function(jsonData){
        quoteForShare=getQuoteForShare(jsonData);
         //Changing text
        changeText(jsonData);
        changeAuthor(jsonData);
        }); 
        
        //Color change
        changeColor();
     
        
        
    });
    
    //Function for sharing quote on twitter
    $("#tweet-quote").on("click", function(){
        window.open("https://twitter.com/intent/tweet?text="+  quoteForShare); 
    });
    
    
    $("#facebook-quote").on("click",function(){
       FB.ui({
       method: 'feed',
       href: 'https://developers.facebook.com/docs/',
       caption: 'An example caption',
       }, function(response){});
        
    });
});




function changeColor(){
     var indexOfColor = Math.floor(Math.random() * colors.length);
      //Condition that makes sure that colors are not the same twice
      while(indexOfColor===currentColor){
            indexOfColor = Math.floor(Math.random() * colors.length);
        }
        
     currentColor=indexOfColor;
      $("body").animate({
        backgroundColor: colors[indexOfColor],
        color: colors[indexOfColor]
      }, 1000);
      $(".button").animate({
        backgroundColor: colors[indexOfColor]
      }, 1000);
    
}

function changeText(data){
     $(".quote-text").animate({
          opacity: 0
        }, 360,
        function() {
          $(this).animate({
            opacity: 1
          }, 400);
          $('#quote').text(data.quoteText);
        });

}

function changeAuthor(data){
      $(".quote-author").animate({
          opacity: 0
        }, 360,
        function() {
          $(this).animate({
            opacity: 1
          }, 400);
          $('#author').html(data.quoteAuthor);
        });

}

function getQuoteForShare(data){
   var quote='"'+ data.quoteText+'" -' + data.quoteAuthor;
   return quote;
}




