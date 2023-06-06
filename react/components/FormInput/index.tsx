// Dependencies
import React from 'react'

// Styles
import styles from './style.css'

interface FormInputProps {
  id: string
  label: string
}

const FormInput: React.FC<FormInputProps> = ({ id, label, ...props }) => {
  return (
    <div className={styles.formInputContainer}>
      <label htmlFor={id} className={styles.formLabel}>
        {label}
      </label>

      <input
        id={id}
        {...props}
        className={styles.formInputLabel}
      />
    </div>
  )
}

export default FormInput
