let boxes= document.querySelectorAll(".box");
let reset = document.querySelector("#reset");
let newgame = document.querySelector("#newgame");
let msgContainer = document.querySelector(".msgcontainer");
let msg = document.querySelector("#msg");
let turn = false;
let count = 0;
const winPattern=[
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
];

const resetGame = () => {
    turn = false;
    count = 0;
    enablebtn();
    msgContainer.classList.add("hide");
}

boxes.forEach((box)=>{
    box.addEventListener("click", () =>{
        console.log("box is clicked");
        if(turn){
            box.innerText="o";
            turn = false;
        }else{
            box.innerText="x";
            turn = true;
        }
        box.disabled = true;
        count++;

    let isWinner = checkWinner();

    if (count === 9 && !isWinner) {
      gameDraw();
    }
        
    });
});
const gameDraw = () => {
  msg.innerText = `Game was a Draw.`;
  msgContainer.classList.remove("hide");
  disablebtn();
};

const disablebtn = () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

const enablebtn = () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congartulation the winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const checkWinner = () =>{
    for(let pattern of winPattern){
            let pos1 = boxes[pattern[0]].innerText;
            let pos2 = boxes[pattern[1]].innerText;
            let pos3 = boxes[pattern[2]].innerText;
        if(pos1 !="" && pos2 != "" && pos3 != ""){
            if(pos1 === pos2 && pos2 === pos3){
                console.log("winner",pos2);
                disablebtn();
                showWinner(pos1);
                return true;
            }
        }
    }
}

newgame.addEventListener("click",resetGame);
reset.addEventListener("click",resetGame);
