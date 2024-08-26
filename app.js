const socket = io();

socket.on('connect', () => {
    console.log('Connected to server');
});

socket.on('game_state', (state) => {
    console.log('Game State:', state);
    updateBoard(state.board);
    updateStatus(`It's ${state.turn}'s turn.`);
});

socket.on('move_result', (result) => {
    console.log('Move Result:', result);
    document.getElementById('status-message').textContent = result;
});

document.getElementById('submit-move').addEventListener('click', () => {
    const move = document.getElementById('move-input').value;
    socket.emit('move', { move });
});

function updateBoard(board) {
    const boardElement = document.getElementById('game-board');
    boardElement.innerHTML = '';
    board.forEach(row => {
        row.forEach(cell => {
            const cellElement = document.createElement('div');
            cellElement.textContent = cell;
            cellElement.className = 'cell';
            boardElement.appendChild(cellElement);
        });
    });
}

function updateStatus(message) {
    document.getElementById('status-message').textContent = message;
}
