
const game = buildMySnake(600, 600, 20, document.getElementById('snakeGame'));

addEventListener('load', st);
addEventListener('click', handleClick);

function handleClick(event) {
    if (event == undefined) {
        throw "Invalid Argument";
    }
    if (event.defaultPrevented) {
        throw "Event prevented";
    }
    var idStr = event.target.id;
    if (idStr == "speed") {
        game.timer = (5e3 / (game.cs / 2));
        start();
    }
}

function buildMySnake(x, y, cs, canvas) {
    const mySnake = {
        direction: [0, 0],
        launched: false,
        hasStarted: false,
        timer: (1e3 / (cs / 2)),
        runningTime: 0,
        cs: cs,
        xC: ((x - (x % cs)) / cs),
        yC: ((y - (y % cs)) / cs)
    };

    mySnake.apple = [Math.floor(Math.random() * mySnake.xC), Math.floor(Math.random() * mySnake.yC)],
        mySnake.snake = new (class {
            constructor(x0, y0) {
                this.pos = [[x0, y0], [x0 + 1, y0], [x0 + 2, y0]];
            }
        })((mySnake.xC - (mySnake.xC % 2)) / 2 - 1, (mySnake.yC - (mySnake.yC % 2)) / 2 - 1)

    return mySnake;
}

function st() {
    if (!(document.getElementById('snakeGame')).getContext("2d")) throw 'nope';
    game.ctx = (document.getElementById('snakeGame')).getContext("2d");
    start();
}

const arraysMatch = function (arr1, arr2) {
    if (arr1.length !== arr2.length) return false;

    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
};

// The game start method
async function start() {
    // Sey that the game has been started
    game.launched = true;

    // Initialize keys and background
    init();

    // Auto-Restart
    while (1) {
        // While the game still runs
        while (game.launched) {
            // Wait for the next frame
            await wait(game.timer);
            // Run the frame handler
            run();
        }
    }
}

function init() {
    // Background rect
    game.ctx.fillStyle = '#222222';
    game.ctx.fillRect(0, 0, 600, 600);
    // Every time a key is down
    addEventListener('keydown', function (e) {
        // The movements (ordered so I can do some maths c:)
        const moves = ['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'];
        // if the key pressed is a valid move key
        if (moves.includes(e.key)) {
            // The move index
            const move = moves.indexOf(e.key);
            if (move % 2 === 0) {
                // Movement: up or down

                if (game.direction[0] !== 0 || !game.hasStarted) {
                    // Change the y direction
                    game.direction[1] = move === 0 ? -1 : 1;
                    game.direction[0] = 0;
                    // Set game to started if it is not
                    if (!game.hasStarted) game.hasStarted = true;
                }
            } else if (move % 2 === 1) {
                // Movement: left or right
                if (game.direction[1] !== 0 || !game.hasStarted) {
                    // Change the x direction
                    game.direction[0] = move === 1 ? -1 : 1;
                    game.direction[1] = 0;
                    // Set game to started if it is not
                    if (!game.hasStarted) game.hasStarted = true;
                }
            }
        }
    });
}

// Method that run on each frame
function run() {
    if (game.hasStarted) {
        // Move handler
        const positions = game.snake.pos.splice(0, game.snake.pos.length - 1);
        game.snake.pos = [positions[0].map((p, i) => p += game.direction[i]), ...positions];

        if (arraysMatch(game.snake.pos[0], game.apple)) {
            // Apple Eaten?
            game.snake.pos.push(game.apple);
            game.apple = [Math.floor(Math.random() * game.xC), Math.floor(Math.random() * game.yC)];
        } else if (Array.from(game.snake.pos).splice(1, game.snake.pos.length).map(p => arraysMatch(p, game.snake.pos[0])).includes(true)) {
            // Self hit?
            alert(`You lose! Your total score was ${game.snake.pos.length - 3}!`);
            game.hasStarted = false;
            reset();
        }

        if (game.snake.pos[0].map((p, i) => i === 0 ? p < 0 || p > game.xC - 1 : p < 0 || p > game.yC - 1).includes(true)) {
            // Wall hit?
            alert(`You lose! Your total score was ${game.snake.pos.length - 3}!`);
            game.hasStarted = false;
            reset();
        }

        // Update game running time
        game.runningTime += game.timer;

        // Change HTML texts
        document.getElementById('score').innerHTML = `You have ${game.snake.pos.length - 3} points.`;
        document.getElementById('time').innerHTML = `Time: ${(game.runningTime / game.timer).toFixed(1)}s`;
    }

    // Draw the canvas
    return draw();
}

function draw() {
    // Some constant info
    const { ctx, cs } = game;

    // For each block in the x line
    for (let xC = 0; xC < game.xC; xC++) {
        // For each block in the y line
        for (let yC = 0; yC < game.yC; yC++) {
            // Location of the block
            const pos = [xC, yC];
            // Block draw offset
            const offset = 3;
            if (game.snake.pos.map(p => arraysMatch(p, pos)).includes(true)) {
                // If the current block is a part of the snake
                if (game.snake.pos.map(p => arraysMatch(p, pos)).indexOf(true) !== 0) ctx.fillStyle = '#41ff41';
                else ctx.fillStyle = '#ffaa41';
                ctx.fillRect(xC * cs + offset, yC * cs + offset, cs - 2 * offset, cs - 2 * offset);
            } else if (arraysMatch(game.apple, pos)) {
                // If the current block is an apple
                ctx.fillStyle = '#ff4141';
                ctx.fillRect(xC * cs + offset, yC * cs + offset, cs - 2 * offset, cs - 2 * offset);
            } else {
                // If the current block is nothing special
                ctx.fillStyle = '#333333';
                ctx.fillRect(xC * cs + offset, yC * cs + offset, cs - 2 * offset, cs - 2 * offset);
            }
        }
    }
}

// Method to use rather than using intervals, very useful btw
async function wait(t) {
    return new Promise(resolve => setTimeout(() => resolve(), t));
}

// Method used to reset the whole game
function reset() {
    game.apple = [Math.floor(Math.random() * game.xC), Math.floor(Math.random() * game.yC)];

    game.snake = new (class {
        constructor(x0, y0) {
            this.pos = [[x0, y0], [x0 + 1, y0], [x0 + 2, y0]];
        }
    })((game.xC - (game.xC % 2)) / 2 - 1, (game.yC - (game.yC % 2)) / 2 - 1);

    // Reset game time
    game.runningTime = 0;

    // Set score text
    document.getElementById('score').innerHTML = `You have 0 points.`;
    // Set start text
    document.getElementById('time').innerHTML = `Press any arrow key to start moving!`;
}
//}


// this.snake.pos = 3 cubes of the snake


// delete game in all function