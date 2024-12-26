import BoardTile from "./BoardTile";

type TypeTiles = JSX.Element[][];

let board = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
]
let game: TypeTiles = [];

function onKeyDown(event: any) {
  let key = event.keyCode;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      let tile = board[row][col];
      if (key == 37) {       // left
        if (col == 0) break; // border tile
        else {
          let left_tile = board[row][col - 1];
          if (left_tile == tile) {
            left_tile *= 2;
          }
          else if (left_tile == 0) {
            left_tile = tile;
          }
          else { // break to avoid tile = 0;
            break;
          }
          tile = 0;
        }
      }
      else if (key == 38) {  // up
        if (row == 0) break; // border tile
        else {
          let top_tile = board[row - 1][col];
          if (top_tile == tile) {
            top_tile *= 2;
          } 
          else if (top_tile == 0) {
            top_tile = tile;
          }
          else { // break to avoid tile = 0;
            break;
          }
          tile = 0;
        }
      } 
      else if (key == 39) {  // right
        if (col == 2) break; // border tile
        else {
          let right_tile = board[row][col + 1];
          if (right_tile == tile) {
            right_tile *= 2;
          }
          else if (right_tile == 0) {
            right_tile = tile;
          }
          else { // break to avoid tile = 0;
            break;
          }
          tile = 0;
        }
      } 
      else if (key == 40) {  // down
        if (row == 2) break; // border tile
        else {
          let bottom_tile = board[row + 1][col];
          if (bottom_tile == tile) {
            bottom_tile *= 2;
          }
          else if (bottom_tile == 0) {
            bottom_tile = tile;
          }
          else { // break to avoid tile = 0;
            break;
          }
          tile = 0;
        }
      }
    }
  }
  game = [];
  for (let row = 0; row < 4; row++) {
    let row_of_tiles = [];
    for (let col = 0; col < 4; col++) {
      row_of_tiles.push(<BoardTile id={row + col} value={board[row][col]}/>)
    }
    game.push(row_of_tiles);
  }
  event.stopPropagation();
}

export default function App () {
  // start of game
  // general: Math.floor(Math.random() * (max - min + 1)) + min
  let tile1_x = Math.floor(Math.random() * (3));
  let tile1_y = Math.floor(Math.random() * (3));
  let tile2_x = Math.floor(Math.random() * (3));
  let tile2_y = Math.floor(Math.random() * (3));
  let tile1_start = Math.floor(Math.random() * 8);
  let tile2_start = Math.floor(Math.random() * 8);

  if (tile1_start == 9) { tile1_start = 4; } // 10% of time will start with 4 
  else { tile1_start = 2; } // 90% of time will start with 2
  if (tile2_start == 9) { tile2_start = 4; }
  else { tile2_start = 2; }

  board[tile1_x][tile1_y] = tile1_start;
  board[tile2_x][tile2_y] = tile2_start;
  console.log("HELLO")
  // game loop
  for (let row = 0; row < 4; row++) {
    let row_of_tiles = [];
    for (let col = 0; col < 4; col++) {
      row_of_tiles.push(<BoardTile id={row + col} value={board[row][col]}/>)
    }
    game.push(row_of_tiles);
  }
  return (
    <div id="bg">
      <div id="board" onKeyDown={(e) => onKeyDown(e)}>
        {game.flat()}
      </div>
    </div>
  )
}