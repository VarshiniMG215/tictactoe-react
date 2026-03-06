const { useState } = React;

function App() {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);

    const checkWinner = (squares) => {
        const lines = [
            [0,1,2], [3,4,5], [6,7,8], 
            [0,3,6], [1,4,7], [2,5,8], 
            [0,4,8], [2,4,6]
        ];
        for (let [a, b, c] of lines) {
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
        }
        return null;
    };

    const winner = checkWinner(board);
    const status = winner ? `Winner: ${winner}` : `Next: ${isXNext ? 'X' : 'O'}`;

    const handleClick = (i) => {
        if (board[i] || winner) return;
        const newBoard = [...board];
        newBoard[i] = isXNext ? 'X' : 'O';
        setBoard(newBoard);
        setIsXNext(!isXNext);
    };

    return (
        <div className="game">
            <div className="status">{status}</div>
            <div className="grid">
                {board.map((val, i) => (
                    <button key={i} className={`cell ${val}`} onClick={() => handleClick(i)}>
                        {val}
                    </button>
                ))}
            </div>
            <button className="reset-btn" onClick={() => setBoard(Array(9).fill(null))}>
                Restart Game
            </button>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);