// Dependencies
import React, { ChangeEvent } from 'react'
import { Input } from 'vtex.styleguide'
import { useDevice } from 'vtex.device-detector'

// Components
import Grid from '../../Grid'
import FullRow from '../../Grid/FullRow'

// Custom Hooks
import { useFormContext } from '../../../contexts/FormContextProvider'

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

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event
    const { id, value } = target


    setFields((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [id]: value
      }
    }))
  }

  return (
    <>
      <h3>Endereço</h3>

      <Grid>
        {!isMobile && (
          <FullRow>
            <div className="w-10">
              <Input
                required
                label="CEP"
                id="postalCode"
                value={postalCode}
                onChange={handleInputChange}
              />
            </div>
          </FullRow>
        )}

        {isMobile && (
          <Input
            required
            label="CEP"
            id="postalCode"
            value={postalCode}
            onChange={handleInputChange}
          />
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

        <Input
          required
          id="city"
          label="Cidade"
          value={city}
          onChange={handleInputChange}
        />

        <Input
          required
          id="state"
          label="Estado"
          value={state}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  )
}

export default Address
