// Dependencies
import React from 'react'

// Styles
import styles from './style.css'

const Grid: React.FC = ({ children }) => (
  <div className={styles.grid}>{children}</div>
)

export default Grid
