// Dependencies
import React, { ChangeEvent } from 'react'
import { Input, EXPERIMENTAL_Select as Select } from 'vtex.styleguide'
import InputMask from 'react-input-mask'

// Components
import Grid from '../../Grid'

// Custom Hooks
import { useFormContext } from '../../../contexts/FormContextProvider'

const documentOptions = [
  {
    label: 'CPF',
    value: 'CPF',
  },
  {
    label: 'CNPJ',
    value: 'CNPJ',
  },
]

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

    let newValue = value

    if (['slug', 'refId'].includes(id)) {
      newValue = value.replace(/\s/, '-')
    }

    setFields((prevState) => ({
      ...prevState,
      [id]: newValue,
    }))
  }

  function handleDocumentTypeChange(option: typeof documentOptions[0]) {
    setFields((prevState) => ({
      ...prevState,
      documentType: option?.value ?? '',
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

        <InputMask
          value={phone}
          mask="(99) \9 9999-9999"
          maskPlaceholder={null}
          onChange={handleInputChange}
        >
          <Input prefix="+55" required id="phone" label="Telefone" />
        </InputMask>

        <Input
          required
          id="slug"
          value={slug}
          label="Identificador da URL"
          onChange={handleInputChange}
          helpText="Exemplo: minha-loja"
        />

        <Input
          required
          id="refId"
          value={refId}
          label="Identificador único"
          onChange={handleInputChange}
        />

        <Select
          required
          multi={false}
          value={{
            label: documentType,
            value: documentType,
          }}
          label="Tipo de documento"
          options={documentOptions}
          onChange={handleDocumentTypeChange}
          placeholder="Selecione o tipo de documento"
        />

        <InputMask
          value={document}
          maskPlaceholder={null}
          onChange={handleInputChange}
          placeholder={
            documentType &&
            (documentType === 'CPF' ? '999.999.999-99' : '99.999.999/9999-99')
          }
          mask={
            documentType === 'CPF' ? '999.999.999-99' : '99.999.999/9999-99'
          }
        >
          <Input required id="document" label="Documento" />
        </InputMask>
      </Grid>
    </>
  )
}

export default General
