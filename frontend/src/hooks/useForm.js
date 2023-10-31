import { useCallback, useState } from 'react'

export default function useForm (initialState) {
  const [data, setData] = useState(initialState)
  const [showWarn, setShowWarn] = useState(false)

  const formHandleChange = useCallback((e) => {
    const { name, value } = e.target
    setData(prevData => (
      {
        ...prevData,
        [name]: value
      }
    ))
  }, [])

  const resetForm = () => {
    setData(initialState)
  }

  const validateForm = () => {
    const formValues = Object.values(data)
    const emptyValue = formValues.find(value => value === '')

    setShowWarn(emptyValue === '')
    return !(emptyValue === '')
  }

  return ({
    formHandleChange,
    data,
    resetForm,
    validateForm,
    showWarn
  })
}
