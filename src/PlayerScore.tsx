import styles from './css/PlayerScore.module.scss'
export default function PlayerScore({ current, highest }) {
  return (
    <div className={styles.wrapper}>
      <div>Score: {current}</div>
      <div>Best: {highest}</div>
    </div>
  )
}