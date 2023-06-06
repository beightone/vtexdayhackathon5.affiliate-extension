// Dependencies
import React, { ChangeEvent, useMemo } from 'react'
import { Input, EXPERIMENTAL_Select as Select } from 'vtex.styleguide'
import { useDevice } from 'vtex.device-detector'
import InputMask from 'react-input-mask'
import { getStates, getCities } from '@brazilian-utils/brazilian-utils'

// Components
import Grid from '../../Grid'
import FullRow from '../../Grid/FullRow'

// Custom Hooks
import { useFormContext } from '../../../contexts/FormContextProvider'

interface Option {
  label: string
  value: string
}

const Address = () => {
  const { isMobile } = useDevice()
  const { fields, setFields } = useFormContext()

  const {
    street,
    number,
    state,
    city,
    postalCode,
    neighborhood,
    reference,
  } = fields.address

  const states = useMemo(() => {
    return getStates().map(({ name }) => ({
      label: name,
      value: name,
    }))
  }, [])

  const cities = useMemo(() => {
    if (!state) return []

    return getCities(state as any).map((name) => ({
      label: name,
      value: name,
    }))
  }, [state])

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event
    const { id, value } = target

    setFields((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [id]: value,
      },
    }))
  }

  function handlSelectChange(id: string) {
    // eslint-disable-next-line func-names
    return function (option: Option) {
      setFields((prevState) => ({
        ...prevState,
        address: {
          ...prevState.address,
          [id]: option?.value ?? '',
        },
      }))
    }
  }

  return (
    <>
      <h3>Endereço</h3>

      <Grid>
        {!isMobile && (
          <FullRow>
            <div className="w-20">
              <InputMask
                mask="99999-999"
                value={postalCode}
                maskPlaceholder={null}
                onChange={handleInputChange}
              >
                <Input required label="CEP" id="postalCode" />
              </InputMask>
            </div>
          </FullRow>
        )}

        {isMobile && (
          <InputMask
            mask="99999-999"
            value={postalCode}
            maskPlaceholder={null}
            onChange={handleInputChange}
          >
            <Input required label="CEP" id="postalCode" />
          </InputMask>
        )}

        <Input
          required
          id="street"
          label="Rua"
          value={street}
          onChange={handleInputChange}
        />

        <Input
          required
          id="number"
          label="Número"
          value={number}
          onChange={handleInputChange}
        />

        <Input
          required
          id="neighborhood"
          label="Bairro"
          value={neighborhood}
          onChange={handleInputChange}
        />

        <Input
          id="reference"
          label="Ponto de referência"
          value={reference}
          onChange={handleInputChange}
        />

        {/* <Input
          required
          id="city"
          label="Cidade"
          value={city}
          onChange={handleInputChange}
        /> */}

        <Select
          required
          disabled={!state}
          multi={false}
          label="Cidade"
          options={cities}
          value={{
            label: city,
            value: city,
          }}
          onChange={handlSelectChange('city')}
          placeholder="Selecione uma cidade"
        />

        <Select
          required
          multi={false}
          label="Estado"
          options={states}
          value={{
            label: state,
            value: state,
          }}
          placeholder="Selecione um estado"
          onChange={handlSelectChange('state')}
        />

        {/* <Input
          required
          id="state"
          label="Estado"
          value={state}
          onChange={handleInputChange}
        /> */}
      </Grid>
    </>
  )
}

export default Address
