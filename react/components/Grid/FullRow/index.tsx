// Dependendencies
import React from 'react'

// Styles
import styles from './style.css'

const FullRow: React.FC = ({ children }) => {
  return (
    <div className={styles.fullRow}>
      {children}
    </div>
  )
}

export default FullRow
