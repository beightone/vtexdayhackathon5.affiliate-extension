// Dependencies
import React, { useState, useContext } from 'react'
import { Affiliate } from '../typings/affiliate'

const initialState: Affiliate = {
  name: '',
  storeName: '',
  email: '',
  slug: '',
  refId: '',
  phone: '',
  isApproved: false,
  document: '',
  documentType: '',
  address: {
    city: '',
    neighborhood: '',
    number: null,
    postalCode: '',
    reference: '',
    street: '',
    state: '',
    country: "Brasil"
  },
  marketing: {
    instagram: '',
    facebook: '',
    whatsapp: '',
    gtmId: '',
  }
}

interface Context {
  fields: Affiliate,
  setFields: React.Dispatch<React.SetStateAction<Affiliate>>
}

const FormContext = React.createContext<Context>({
  fields: initialState,
  setFields: () => {}
})

export function useFormContext() {
  return useContext(FormContext)
}

const FormContextProvider: React.FC = ({ children }) => {
  const [fields, setFields] = useState(initialState)

  return (
    <FormContext.Provider value={{ fields, setFields }}>
      {children}
    </FormContext.Provider>
  )
}

export default FormContextProvider
