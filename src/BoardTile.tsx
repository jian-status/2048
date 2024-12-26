import styles from './css/BoardTile.module.scss';

let colors = [
  ".two", ".four", ".eight", ".sixteen", ".thirtytwo", ".sixtyfour",
  ".onehundredtwentyeight", ".twohundredfiftysix", ".fivehundredtwelve",
  ".onethousandtwentyfour", ".twothousandfourtyeight",
]
export default function BoardTile({ id, value}: {id: number, value: number }) {
  return (
    <div tabIndex={id} key={id} className={`${colors[Math.log2(value)]} ` + styles.tile}>
      {value}
    </div>
  )
}