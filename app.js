//Array of strings saved to variable sports

$(document).ready(function(){
var
 sports = ["Basketball","Soccer","Golf","Football","Badminton"];


  //create buttons for each sport
      function renderButtons() {

        // Emptying prior to adding new sports so that you don't have repeat buttons
        
        $("#sports-view").empty();

  //use the topics in the array and create buttons in HTML (using a loop that appends a button for each string in the array)       
        // Looping through the array of sports
        for (var i = 0; i < sports.length; i++) {
          
          // Then dynamicaly generating buttons for each sport in the array
          var a = $("<button>");

          // Adding a class of sports-btn to the button
          a.addClass("sports-btn");
          
          // Adding a data-attribute
          a.attr("data-name", sports[i]);
          
          // Providing the initial button text
          a.text(sports[i]);

          // Adding the button to the sports-view div
          $("#sports-view").append(a);
        }
      }
 

      // Create a function to display GIFS
function displayGifs(keyword){
  
  //var action = $(this).attr("data-name");
  
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + keyword + "&api_key=MXBDlxNZOyQbCi97F26TItNMLUl6Zc6I&limit=10";
  console.log(queryURL);
  console.log(keyword);

//ajax call
  $.ajax({
      url: queryURL,
      method: 'GET'
  })


  .then(function(response) {
  //Show Gif results
      var results = response.data; 

      for (var i=0; i<results.length; i++){
        //Create div to store GIFS
        var storeGifDiv  = $("<div>"); 
        
         // Getting the rating through the API and appending it to display
        var gifRating = $("<p>").text("Rating: " + results[i].rating);
        storeGifDiv.append(gifRating);
          
        // Getting GIF images
        var gifImage = $("<img>");
        
        // Still image stored in src
        gifImage.attr("src", results[i].images.fixed_height_small_still.url);
           
        //Still image
        gifImage.attr("data-still",results[i].images.fixed_height_small_still.url); 
        
        // Animated image
        gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
        
        
        gifImage.attr("data-state", "still"); 
        
        //add the gif element to the imageDiv
        gifImage.addClass("imageDiv");
        
        
        storeGifDiv.append(gifImage);
        
        $("#image-view").prepend(storeGifDiv);
      }
  });
}




// Document Event Listeners

$(document).on("click", ".imageDiv", function(){
  var state = $(this).attr('data-state');
  if ( state == 'still'){
      $(this).attr('src', $(this).data('animate'));
      $(this).attr('data-state', 'animate');
  }else{
      $(this).attr('src', $(this).data('still'));
      $(this).attr('data-state', 'still');
  }
});
    
 
    renderButtons();

    $(document).on("click", ".sports-btn", function(){
      var buttonName = $(this).attr('data-name');
      displayGifs(buttonName);
    });
        });



