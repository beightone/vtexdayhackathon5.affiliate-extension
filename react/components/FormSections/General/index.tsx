// Dependencies
import React, { ChangeEvent } from 'react'
import { Input } from 'vtex.styleguide'

// Components
import Grid from '../../Grid'

// Custom Hooks
import { useFormContext } from '../../../contexts/FormContextProvider'

const General = () => {
  const { fields, setFields } = useFormContext()
  const {
    name,
    storeName,
    email,
    phone,
    slug,
    refId,
    documentType,
    document,
  } = fields

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event
    const { id, value } = target

    setFields((prevState) => ({
      ...prevState,
      [id]: value,
    }))
  }

  return (
    <>
      <h3>Informações gerais</h3>

      <Grid>
        <Input
          required
          id="name"
          label="Nome"
          value={name}
          onChange={handleInputChange}
        />

        <Input
          required
          id="storeName"
          value={storeName}
          label="Nome da loja"
          onChange={handleInputChange}
        />

        <Input
          required
          id="email"
          type="email"
          label="Email"
          value={email}
          onChange={handleInputChange}
        />

        <Input
          required
          id="phone"
          value={phone}
          label="Telefone"
          onChange={handleInputChange}
        />

        <Input
          required
          id="slug"
          value={slug}
          label="Identificador da URL"
          onChange={handleInputChange}
        />

        <Input
          required
          id="refId"
          value={refId}
          label="Identificador único"
          onChange={handleInputChange}
        />

        <Input
          required
          id="documentType"
          value={documentType}
          label="Tipo de documento"
          onChange={handleInputChange}
        />

        <Input
          required
          id="document"
          value={document}
          label="Documento"
          onChange={handleInputChange}
        />
      </Grid>
    </>
  )
}

export default General
