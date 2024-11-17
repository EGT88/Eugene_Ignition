import {
  FormControl,
  FormLabel,
  FormErrorMessage,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface FieldProps {
  label: string
  errorText?: string
  invalid?: boolean
  children: ReactNode
}

export const Field = ({ label, errorText, ...boxProps }: FieldProps) => {
  return (
    <FormControl isInvalid={!!errorText} {...boxProps}>
      <FormLabel>{label}</FormLabel>
      {boxProps.children}
      {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
    </FormControl>
  )
}
