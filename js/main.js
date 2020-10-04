// $(document).ready(function(){

// var inputOptionTwoArtistName = $("#optionTwoArtistName").val();
// var inputOptionOneArtistName = $("#optionOneArtistName").val();

// $("#optionOneSongName").focusout(function(){
//     var inputOptionOneSongName = $("#optionOneSongName").val();
//     var inputOptionOneArtistName = $("#optionOneArtistName").val();
//     var indexNumber = 0;
//     var optionOneURL = "https://deezerdevs-deezer.p.rapidapi.com/search?q=" + inputOptionOneSongName + "&index=" + indexNumber + "&limit=100";
//     $.ajax({
//         async: true,
//         crossDomain: true,
//         url: optionOneURL,
//         dataType: 'json',
//         method: "GET",
//         headers: {
//             "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
//             "x-rapidapi-key": "853258e411msha6bf1fdd44adf7ep13c521jsn751b7f1f296a"
//         },
    
//         success: function(data){
//             console.log(data);
//             $.each(data, function(index, value) {
//                 console.log(value);
//                 var artistName = value.id;
//                 var q1 = (vehicles.map(function(vehicle, i){

//                     //         return{
//                     //            model: vehicle.model,
//                     //            index: i
//                     //         }
                    
//                     //     }));
//                 console.log(artistName);
//                 var markUp = "<tr><td>" + inputOptionOneSongName + "</td><td>" + inputOptionOneArtistName + "</td></tr>";
//                 if( artistName === inputOptionOneArtistName) {
//                     ("#optionOneResult tbody").append(markUp);
//                 }
//             })

            
//         } 
//     });
// })

// $("#optionOneArtistName").focusout(function(){
   
// })

// })//end of ready function




$(document).ready(function(){

    
    
    
    $("#optionOneSongName").focusout( function(){
        var inputSongName = $("#optionOneSongName").val();    
        console.log(inputSongName);
        var newURL = "http://api.deezer.com/search?q=track:\'" + inputSongName + "\'&output=jsonp";
        console.log(newURL);
    })

    $("#optionOneArtistName").focusout(function(){
        var inputArtistName = $('#optionOneArtistName').val();
        console.log(inputArtistName);
    })
    
    

    

    $("#submitButton").click(function(){
        var inputSongName = $("#optionOneSongName").val();
        var inputArtistName = $("#optionOneArtistName").val();
        var inputArtistNameLowerCase = inputArtistName.toLowerCase();

        var trackSettings = {
            "async": true,
            "url": "http://api.deezer.com/search?q=track:\'" + inputSongName + "\'&output=jsonp",
            //"url": "http://api.deezer.com/search?q=track:'biking'&output=jsonp",
            
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                        format:"json"
                    },
        }
        $.ajax(trackSettings).done(function (response) {
            console.log(response);

            $.each(response.data, function(index, item) {
                var songTitle = response.data[index].title;
               
                var artistName = response.data[index].artist.name;
                var artistNameLowerCase = artistName.toLowerCase();
                
                var albumID = response.data[index].album.id;

                if (artistNameLowerCase == inputArtistNameLowerCase){
                    $("#userTable tbody").append("<tr><td>"+ songTitle+"</td><td>"+ artistName + "</td><td>"+ albumID +"</td><td><button type=\"checkbox\" class=\"addButton\">Find Genres</button></td><td></td></tr>");    
                    $('td:nth-child(4)').addClass('addButton');
                }

                
            })
        });

        
        $('#optionOneSongName').val('');

        $('#optionOneArtistName').each(function() {
            $(this).val("");
        });
    
    })

    

    $('#userTable').on('click','.addButton', function(){ 
        
        var currentRow=$(this).closest("tr"); 
        var albumID =currentRow.find("td:eq(2)").text();
        console.log(albumID);

        

        var genresSettings = {
            "async": true,
            "url": "http://api.deezer.com/album/" + albumID + "&output=jsonp",
            //"url": "http://api.deezer.com/album/104660182&output=jsonp",
            jsonp: "callback",
            dataType: "jsonp",
            data: {
                        format:"json"
                    },
        }

        $.ajax(genresSettings).done(function (response) {
            console.log(response);

            $.each(response.genres.data, function(index, item) {
                
                var genreName = response.genres.data[index].name;
                console.log(genreName);

                currentRow.find("td:last").html("");
                currentRow.find("td:eq(4)").append(genreName);
                
                
                
            })

            


        });

        
  
    });


    //-------------Calculate Button--------------------------
    $("#calculateButton").click(function(){
        $("#result").html("");
        var myTableArray = [];
        var genresResult =[];

        $("#userTable tr").each(function() { 
                var rowNumber = $(this).find('td');
                var arrayOfThisRow = [];

                if (rowNumber.length > 0) {
                            rowNumber.each(function() { 
                                                        arrayOfThisRow.push($(this).text());                     
                                                    });           
                            //$("#result").append(arrayOfThisRow[4]+ '<br>');
                            genresResult.push(arrayOfThisRow[4]);
                            console.log(genresResult);           
                            myTableArray.push(arrayOfThisRow);
                            console.log(myTableArray);
                };

        });
        
        var africanMusicCount = genresResult.count("African Music");
        $("#result").append('African Music: ' + africanMusicCount + '</br>');

        var asianMusicCount = genresResult.count("Asian Music");
        $("#result").append('Asian Music: ' + asianMusicCount + '</br>');

        var bluesCount = genresResult.count("Blues");
        $("#result").append('Blues: ' + bluesCount + '</br>');

        var brazilianMusicCount = genresResult.count("Brazilian Music");
        $("#result").append('Brazilian Music: ' + brazilianMusicCount + '</br>');

        var classicalCount = genresResult.count("Classical");
        $("#result").append('Classical: ' + classicalCount + '</br>');

        var countryCount = genresResult.count("Country");
        $("#result").append('Country: ' + countryCount + '</br>');

        var danceCount = genresResult.count("Dance & EDM");
        $("#result").append('Dance & EDM: ' + danceCount + '</br>');

        var electronicCount = genresResult.count("Electronic");
        $("#result").append('Electronic: ' + electronicCount + '</br>');

        var folkCount = genresResult.count("Folk & singer-songwriter");
        $("#result").append('Folk & singer-songwriter: ' + folkCount + '</br>');

        var popCount = genresResult.count("Pop");
        $("#result").append('Pop: ' + popCount + '</br>');

        var indieCount = genresResult.count("Indie");
        $("#result").append('Indie: ' + indieCount + '</br>');

        var jazzCount = genresResult.count("Jazz");
        $("#result").append('Jazz: ' + jazzCount + '</br>');

        var kpopCount = genresResult.count("K-pop");
        $("#result").append('K-pop: ' + kpopCount + '</br>');

        var latinMusicCount = genresResult.count("Latin Music");
        $("#result").append('Latin Music: ' + latinMusicCount + '</br>');

        var metalCount = genresResult.count("Metal");
        $("#result").append('Metal: ' + metalCount + '</br>');

        var randbCount = genresResult.count("R&B");
        $("#result").append('R&B: ' + randbCount + '</br>');

        var rapCount = genresResult.count("Rap/Hip Hop");
        $("#result").append('Rap/Hip Hop: ' + rapCount + '</br>');

        var reggaeCount = genresResult.count("Reggae");
        $("#result").append('Reggae: ' + reggaeCount + '</br>');

        var rockCount = genresResult.count("Rock");
        $("#result").append('Rock: ' + rockCount + '</br>');

        var soulandfunkCount = genresResult.count("Soul & Funk");
        $("#result").append('Soul & Funk: ' + soulandfunkCount + '</br>');

        var soundtracksCount = genresResult.count("Soundtracks");
        $("#result").append('Soundtracks: ' + soundtracksCount + '</br>');

       
        

        // // console.log(myTableArray); 
        // $.each(myTableArray, function(index, value){
        //     var genresIndex = index + 4;
        //     var genreResult = value;
        //     $("#result").append(index + ": " + value + '<br>');
        // });

       
       


    
    
        
        // Indie, Jazz, K-pop, Latin music, Metal, Pop, R&B, Rap, Reggae, Rock, Soul & Funk and Soundtracks
        //$("#result").append(myTableArray[0][4]);

        

       

        

        
    });


    
           
        
    











})

