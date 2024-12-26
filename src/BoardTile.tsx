import styles from './css/BoardTile.module.scss';

let colors = [
  "tile", "two", "four", "eight", "sixteen", "thirtytwo", "sixtyfour",
  "onehundredtwentyeight", "twohundredfiftysix", "fivehundredtwelve",
  "onethousandtwentyfour", "twothousandfourtyeight",
]
export default function BoardTile({ id, value}: {id: number, value: number }) {
  return (
    <div tabIndex={id} className={styles[colors[(value == 0) ? 0 : Math.log2(value)]]}>
      {value != 0 ? value : ""}
    </div>
  )
}