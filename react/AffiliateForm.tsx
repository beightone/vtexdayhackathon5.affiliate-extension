// Dependencies
import React, { useEffect, FormEvent } from 'react'
import { Card, Button } from 'vtex.styleguide'
import { useMutation } from 'react-apollo'

// Styles
import styles from './style.css'

// Graphql
import addAffiliateMutation from './graphql/addAffiliate.graphql'

// Provider
import FormContextProvider, { useFormContext } from './contexts/FormContextProvider'

// Components
import General from './components/FormSections/General'
import Address from './components/FormSections/Address'
import Social from './components/FormSections/Social'

const AffiliateForm = () => {
  const { fields } = useFormContext()

  const [addAffiliate, { loading, error }] = useMutation(addAffiliateMutation)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addAffiliate({
      variables: {
        newAffiliate: fields
      }
    })
  }

  useEffect(() => {
    error && console.log({ error })
  }, [error])

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className="mw8 center mv8">
        <Card>
          <General />
          <Address />
          <Social/>

          <div className="mt6">
            <Button isLoading={loading} disabled={loading} type="submit">
              Enviar
            </Button>
          </div>
        </Card>
      </div>
    </form>
  )
}

const AffiliateFormWrapper: React.FC = () => (
  <FormContextProvider>
    <AffiliateForm />
  </FormContextProvider>
)

export default AffiliateFormWrapper
