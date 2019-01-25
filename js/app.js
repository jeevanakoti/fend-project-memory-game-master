
 /*
 * Create a list that holds all of your cards
 */
list=["fa fa-diamond","fa fa-paper-plane-o","fa fa-anchor","fa fa-bolt","fa fa-cube","fa fa-anchor","fa fa-leaf","fa fa-bicycle","fa fa-diamond","fa fa-bomb","fa fa-leaf","fa fa-bomb",
"fa fa-bolt",
"fa fa-bicycle",
"fa fa-paper-plane-o",
"fa fa-cube"];
var matchedCards=[];
var cardsShuffle=[];
var openPic=[];
var tilesFlipped=0;
var numOfmoves=0;
var credits=0;
var second = 0, minute = 0, hour = 0 ;
var starRate;
/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */
document.onload=restart();

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) 
{
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
/*THE RESTART FUNCTION */
function restart()
{
        //reset cards and moves
        openPic=[];
        var cardsShuffle=shuffle(list);
        $(".card i").each(function(index)
        {
            $(this).attr('class',cardsShuffle[index]);
            $('.deck li').attr("class","card");
            numOfmoves=0;
            $('.moves').text(numOfmoves);
            credits=0;
            $('.score').text(credits);
        })
        //reset timer
        second = 0;
        minute = 0; 
        hour = 0;
        var timer = document.querySelector(".time");
        timer.innerHTML = "0 mins 0 secs";
        clearInterval(Interval);
        //star reseting
        var star1 =$('.stars').find('li').eq(2);
        star1.css('color','black');
        var star2 =$('.stars').find('li').eq(1);
        star2.css('color','black');
        var star3 =$('.stars').find('li').eq(0);
        star3.css('color','black');        
       

}

 //CALLING THE RESTART FUNCTION

$('.restart').on('click',function()
 {
        restart();
 });


// WHEN THE PLAYER CLICKS THE CARD THIS IS INITIATED
$('.deck ,.card').on('click','.card',function(event)
{
  
 if($(this).attr('class')==='card' && openPic.length<2)
    {
       if(openPic.length===0)
       {
                $(this).addClass('open  show card');
                openPic.push($(this).children().attr('class'));

        }
        else if(openPic.length===1) 
        {
                $(this).addClass('open show card');
                openPic.push($(this).children().attr('class'));

                //comparing two cards 
                if(openPic[0]===openPic[1])
                {
                    $('.card').filter($('.open')).toggleClass('open match');
                    tilesFlipped=tilesFlipped + 2;
                    numOfmoves=numOfmoves+1;
                    $('.moves').text(numOfmoves);
                    openPic=[];
                    credits=credits+1;
                    $('.score').text(credits);
                    
                }
                else
                {
                    // FLIPBACK FUNCTION WHEN CARDS ARE NOT MATCHED 
                    function flipBack () 
                     {
                          $('.card').filter($('.open')).attr('class',"card");
                          openPic = [];
                          numOfmoves=numOfmoves+1;
                          $('.moves').text(numOfmoves);
                     }
                    setTimeout(flipBack, 600);
                }
        }
            //starting the time when one move is made
            if(numOfmoves == 0 )
            {  
                clearInterval(Interval);
                second = 0;
                minute = 0; 
                hour = 0;
                Timer();
                        
            }
            if (numOfmoves > 16 && numOfmoves < 25) 
            { console.log(numOfmoves);
                var star3 =$('.stars').find('li').eq(2);
                star3.css('color','white');
                starRate=2;
            }
            if (numOfmoves > 25) 
            {
                var star2 =$('.stars').find('li').eq(1);
                star2.css('color','white');
                starRate=1;
            }
            //when credits is 8 then it will give you a sweet alert
            if(credits===8){
              congrats();
              swal(
                {
                    allowEscapeKey: false,
                    allowOutsideClick: false,
                    title: 'Congratulations! You Won!',
                    text: 'With ' + numOfmoves + ' moves.\n' + credits + ' Score.\n ' + minute + '  minute.\n' + second + '   Seconds.\n'+ starRate +'   stars.\n Woooooo!',
                    type: 'success',
                    button:{
                        text:'PlayAgain!',
                        click:restart()
                    }
                    
                });
               
            }    

     }
    
});

// congrats function which is used to clear time interval
function congrats()
{

    clearInterval(Interval);
}    
 
 //Timer function for calculating time   
var timer = document.querySelector(".time");
var Interval;
function Timer()
  {
            Interval = setInterval(function()
            {
                timer.innerHTML = minute+"mins "+second+"secs";
                second=second+1;
                if(second == 60)
                {
                    minute++;
                    second=0;
                }
                if(minute == 60)
                {
                    hour++;
                    minute = 0;
                }
            },1000);
  }

   


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
