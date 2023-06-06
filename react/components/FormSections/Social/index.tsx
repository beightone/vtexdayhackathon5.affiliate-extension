// Dependencies
import React, { ChangeEvent } from 'react'
import { Input } from 'vtex.styleguide'

// Components
import Grid from '../../Grid'

// Custom Hooks
import { useFormContext } from '../../../contexts/FormContextProvider'

const Social = () => {
  const { fields, setFields } = useFormContext()
  const {
    instagram,
    facebook,
    whatsapp,
    gtmId
  } = fields.marketing

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event
    const { id, value } = target


    setFields((prevState) => ({
      ...prevState,
      marketing: {
        ...prevState.marketing,
        [id]: value
      }
    }))
  }

  return (
    <>
      <h3>Redes sociais</h3>

      <Grid>
        <Input
          id="instagram"
          label="Instagram"
          value={instagram}
          onChange={handleInputChange}
        />

        <Input
          id="facebook"
          label="Facebook"
          value={facebook}
          onChange={handleInputChange}
        />

        <Input
          id="whatsapp"
          label="WhatsApp"
          value={whatsapp}
          onChange={handleInputChange}
        />

        <Input
          id="gtmId"
          label="ID do GTM"
          value={gtmId}
          onChange={handleInputChange}
        />
      </Grid>
    </>
  )
}

export default Social
