// MEDIA
let rollingSound = new Audio('asset/dadu.mp3')
let winSound = new Audio('asset/win.mp3')
let clickBtn = new Audio('asset/clickBtn.mp3')

// ADD PLAYER
let players = [];

let maxPlayers = 4

function createPlayer(id, playerName) {
    players.push({ id: id, playerName: playerName});
    positions.push(0)
}

document.getElementById("addPlayerBtn").addEventListener("click", function () {
    clickBtn.play()
    if (players.length < maxPlayers) {
        let id = "P" + (players.length + 1);
        let playerName = prompt('Silahkan input username!')
        if (playerName) {
            createPlayer(id, playerName);
            Swal.fire({
                title: `${playerName} added as a player!!`,
                icon: "success"
              });
        }
    } else {
        Swal.fire({
            title: `Player is Full`,
            icon: "warning"
          })
        let button = document.getElementById("addPlayerBtn")
        button.disabled = true
    }

    switch(players.length){
        case 1:
            document.getElementById(`P1`).style.opacity = 1
            document.getElementById(`P2`).style.opacity = 0
            document.getElementById(`P3`).style.opacity = 0
            document.getElementById(`P4`).style.opacity = 0
        break;
        case 2:
            document.getElementById(`P1`).style.opacity = 1
            document.getElementById(`P2`).style.opacity = 1
            document.getElementById(`P3`).style.opacity = 0
            document.getElementById(`P4`).style.opacity = 0
        break;
        case 3:
            document.getElementById(`P1`).style.opacity = 1
            document.getElementById(`P2`).style.opacity = 1
            document.getElementById(`P3`).style.opacity = 1
            document.getElementById(`P4`).style.opacity = 0
        break;
        case 4:
            document.getElementById(`P1`).style.opacity = 1
            document.getElementById(`P2`).style.opacity = 1
            document.getElementById(`P3`).style.opacity = 1
            document.getElementById(`P4`).style.opacity = 1
        break;
    }
    clickBtn.play()
});


// ROLE PLAY
let positions = []
let ketentuan = [
    tangga = {
        1: 38, 4: 14, 8: 30, 21: 42, 28: 76, 50: 67, 71: 92, 80: 99
    },
    ular = {
        32: 10, 36: 6, 48: 26, 62: 18, 88: 24, 95: 56, 97: 78
    }
]

// FUNGSI PLAYER
function play(playerIndex, correction, angka) {
    let tangga = ketentuan[0];
    let ular = ketentuan[1];
    let box = 0;

    positions[playerIndex] += angka;

    for (let i in tangga) {
        let naik = tangga[i];
        if (positions[playerIndex] === +i) {
            positions[playerIndex] = naik;
        }
    }

    for (let i in ular) {
        let turun = ular[i];
        if (positions[playerIndex] === +i) {
            positions[playerIndex] = turun;
        }
    }

    if (positions[playerIndex] > 100) {
        positions[playerIndex] -= angka;
    }
    box = positions[playerIndex];

    // KETENTUAN BOX
    if (box === 100) {
        winSound.play()
        Swal.fire({
            title: `${players[playerIndex].playerName} Won!!`,
            icon: "info"
          });
        document.getElementById("won").innerText = players[playerIndex].playerName;
        document.getElementById(`${players[playerIndex].id}`).style.left = `${(0) * 60.5}px`
        document.getElementById(`${players[playerIndex].id}`).style.top = `${(-row + 1) * 62 - correction}px`
    } else if (box < 10) {
        document.getElementById(`${players[playerIndex].id}`).style.top = `${-0 * 62 - correction}px`
        document.getElementById(`${players[playerIndex].id}`).style.left = `${(box - 1) * 60.5}px`
    } else {
        let numarr = Array.from(String(box)); // angka convert ke string dan diubah ke array per-string => 10 = ['1','0']
        let row = numarr.shift(); //['0'] => baris
        let col = numarr.pop(); //['1'] => kolom

        if (+row % 2 === 1) {
            if (+col === 0) {
                document.getElementById(`${players[playerIndex].id}`).style.left = `${(9) * 60.5}px`
                document.getElementById(`${players[playerIndex].id}`).style.top = `${(-row + 1) * 62 - correction}px`
            } else {
                document.getElementById(`${players[playerIndex].id}`).style.left = `${(9 - (col - 1)) * 60.5}px`
                document.getElementById(`${players[playerIndex].id}`).style.top = `${-row * 62 - correction}px`
            }
        } else if (+row % 2 === 0) {
            if (+col === 0) {
                document.getElementById(`${players[playerIndex].id}`).style.left = `${(0) * 60.5}px`
                document.getElementById(`${players[playerIndex].id}`).style.top = `${(-row + 1) * 62 - correction}px`
            } else {
                document.getElementById(`${players[playerIndex].id}`).style.left = `${(col - 1) * 60.5}px`;
                document.getElementById(`${players[playerIndex].id}`).style.top = `${-row * 62 - correction}px`
            }
        }
    }
}

// FUNGSI DADU
let turn = 0;
function dadu() {
    clickBtn.play()
    if (players.length === 0) { // must input player
        Swal.fire({
            title: "Player Not  Found?",
            text: "Please insert your username",
            icon: "question"
          });
    } else { // playing
        rollingSound.play();
        let angka = Math.floor(Math.random() * 6) + 1;
        document.getElementById("angka").innerText = angka; // Display angka dadu di HTML

        document.getElementById('turn-player').innerText = `${players[turn].id}\n${players[turn].playerName}`; // "P1"
        play(turn, turn * 45, angka);
        turn++;

        if (turn >= players.length) {
            turn = 0;
        }
        console.log(turn);
    }
    if (players.length > 0) { // disable add player
        let button = document.getElementById("addPlayerBtn")
        button.disabled = true;
    }
}

function reset(){
    location.reload()
}

if (players.length === 0){
    document.getElementById(`P1`).style.opacity = 0
    document.getElementById(`P2`).style.opacity = 0
    document.getElementById(`P3`).style.opacity = 0
    document.getElementById(`P4`).style.opacity = 0
}