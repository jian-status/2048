import BoardTile from "./BoardTile";
import { useState, useRef, useEffect } from "react";

type TypeTiles = JSX.Element[][];

let game: TypeTiles = [];

function resetBoard(setBoard, tile_count, score) {
  setBoard([]);
  tile_count.current = 2;
  score.current = 0;
}
function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function onKeyDown(event: any, board: any, setBoard: any, tile_count: any, score: any) {
  if (tile_count.current == 16) return;
  let new_board = board.map(inner => inner.slice()); // deep copy 2d array
  let key = event.keyCode;

  if (key == 37) {       // left
    for (let row = 0; row < 4; row++) {
      for (let col = 1; col < 4; col++) { // skip col == 0 since it's a border tile
        if (new_board[row][col - 1] == new_board[row][col] && new_board[row][col] != 0) { // merge tiles
          new_board[row][col - 1] *= 2;
          tile_count.current--;
          score.current += new_board[row][col - 1];
        }
        else if (new_board[row][col - 1] == 0) { // move tile left
          new_board[row][col - 1] = new_board[row][col];

        }
        else { // cant move (blocked by tile with different value)
          continue;
        }
        new_board[row][col] = 0;
      }
    }
  }
  else if (key == 38) {  // up
    for (let col = 0; col < 4; col++) {
      for (let row = 1; row < 4; row++) { // skip row == 0 since it's a border tile
        if (new_board[row - 1][col] == new_board[row][col] && new_board[row][col] != 0) {
          new_board[row - 1][col] *= 2;
          tile_count.current--;
          score.current += new_board[row - 1][col];
        } 
        else if (new_board[row - 1][col] == 0) {
          new_board[row - 1][col] = new_board[row][col];
        }
        else {
          continue;
        }
        new_board[row][col] = 0;
        
      }
    }
  } 
  else if (key == 39) {  // right
    for (let row = 0; row < 4; row++) {
      for (let col = 2; col >= 0; col--) { // skip col == 3 since it's a border tile
        if (new_board[row][col + 1] == new_board[row][col] && new_board[row][col] != 0) {
          new_board[row][col + 1] *= 2;
          tile_count.current--;
          score.current += new_board[row][col + 1];
        }
        else if (new_board[row][col + 1] == 0) {
          new_board[row][col + 1] = new_board[row][col];
        }
        else {
          continue;
        }
        new_board[row][col] = 0;
        
      }
    }
  } 
  else if (key == 40) {  // down
    for (let row = 2; row >= 0; row--) { // skip row == 3 since it's a border tile
      for (let col = 0; col < 4; col++) {
        if (new_board[row + 1][col] == new_board[row][col] && new_board[row][col] != 0) {
          new_board[row + 1][col] *= 2;
          tile_count.current--;
          score.current += new_board[row + 1][col];
        }
        else if (new_board[row + 1][col] == 0) {
          new_board[row + 1][col] = new_board[row][col];
        }
        else { // continue to avoid tile = 0;
          continue;
        }
        new_board[row][col] = 0;
        
      }
    }
  }
  // add new tile
  let tile_x;
  let tile_y;
  while (tile_x == undefined || tile_y == undefined || new_board[tile_x][tile_y] != 0){
    tile_x = rand(0, 3);
    tile_y = rand(0, 3);
  }
  tile_count.current++;
  new_board[tile_x][tile_y] = 2;

  // save board

  setBoard(new_board);
}

export default function App () {
  const [board, setBoard] = useState([]);
  const tile_count = useRef(2);
  const score = useRef(0);
  const highest_score = useRef(0);

  // start of game
  if (board.length == 0) {
    let temp_board = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0]
    ];
    let tile1_x = rand(0, 3);
    let tile1_y = rand(0, 3);
    let tile1_start = rand(0, 9);
    let tile2_start = rand(0, 9);
    let tile2_x;
    let tile2_y;
    while (tile2_x == undefined || tile1_x == tile2_x && tile1_y == tile2_y) { // we want to always start with 2 tiles
      tile2_x = rand(0, 3);
      tile2_y = rand(0, 3);
    }
    if (tile1_start == 9) { tile1_start = 4; } // 10% of time will start with 4 
    else { tile1_start = 2; } // 90% of time will start with 2
    if (tile2_start == 9) { tile2_start = 4; }
    else { tile2_start = 2; }

    temp_board[tile1_x][tile1_y] = tile1_start;

    temp_board[tile2_x][tile2_y] = tile2_start;
    setBoard(temp_board);
  }
  else {
    // game loop
    game = []
    for (let row = 0; row < 4; row++) {
      let row_of_tiles = [];
      for (let col = 0; col < 4; col++) {
        row_of_tiles.push(<BoardTile id={row*4 + col} key={row*4 + col} value={board[row][col]}/>)
      }
      game.push(row_of_tiles);
    }
  }
  if (tile_count.current == 16 && score.current > highest_score.current) {
    highest_score.current = score.current;
  }
  return (
    <div id="bg">
      {tile_count.current != 16 ? "" : <div>Game over</div>}
      <div>
        <div>Score: {score.current}</div>
        <div>Highest Score: {highest_score.current}</div>
      </div>
      <div id="board" onKeyDown={(e) => onKeyDown(e, board, setBoard, tile_count, score)}>
        {game.flat()}
      </div>
      <button onClick={() => resetBoard(setBoard, tile_count, score)}>reset</button>
    </div>
  )
}