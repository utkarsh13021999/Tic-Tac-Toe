const playerinfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtnelement = document.querySelector(".btn");
var currentPlayer;
var player_grid;

function initgame()
{
    currentPlayer = "X";
    playerinfo.innerHTML = `Current Player - ${currentPlayer}`;
    player_grid = ["","","","","","","","",""];
    //UI pe sab hatane hai
    boxes.forEach((box,index)=>{
        box.innerText = "";
        boxes[index].style.pointerEvents = "all"; // isse jo pointer events me change kiye the
        box.classList = `box box${index}`;  // green color hatana hai 
    });
    newGameBtnelement.classList.remove("active");  
}
 initgame();

 var winning_grid =
 [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
 ];
 
 function handleClick(index)
 {
    // grid me store karega 
    player_grid[index] = currentPlayer;
    // UI ke grid pe show karega 
    boxes[index].innerText = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // current player change karega and UI pe show krega ]
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }
    playerinfo.innerHTML = `Current Player - ${currentPlayer}`;
    // check karega ki game over hua ya nhi!
    checkGameOver();
 }
function checkGameOver()
{
    // check karega ki kitne inputs aagye hai user se
    var no_of_inputs = 0;
    player_grid.forEach((val)=>{
        if(val!="")
        no_of_inputs++;
    })
    // agar vo inputs winning grid se match kar rhe hai
    var answer = ""; 
    winning_grid.forEach((winval)=>
    {

        if( (player_grid[winval[0]]!=="" || player_grid[winval[1]]!=="" || player_grid[winval[2]]!=="") &&
       ( player_grid[winval[0]]===player_grid[winval[1]] &&  player_grid[winval[1]]===player_grid[winval[2]] 
        ) )
        {
            // game jeetgya banda 
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
             answer  = player_grid[winval[0]];
            playerinfo.innerHTML = `Winner Player - ${answer}`;
            newGameBtnelement.classList.add("active");
            
            boxes[winval[0]].classList.add("win");
            boxes[winval[1]].classList.add("win");
            boxes[winval[2]].classList.add("win");
            return;
        }
        else 
        {
            // game continues
        }
    })
    // if(answer!="")
    // {
    //     playerinfo.innerHTML = `Winner Player - ${answer}`;
    //     newGameBtnelement.classList.add("active");
       
    // }
    // else game draw hogya 
    if(no_of_inputs == 9 && answer=="")
    {
        playerinfo.innerHTML = `Game Tied !`;
        newGameBtnelement.classList.add("active");
    }
    
}
boxes.forEach((box,index)=>
{
    box.addEventListener("click",()=>{
        handleClick(index);
    });
});
newGameBtnelement.addEventListener("click",()=>
{
    initgame();
}
);