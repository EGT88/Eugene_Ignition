import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  RadioGroup,
  Radio,
  Stack,
} from '@chakra-ui/react'

interface RadioFieldProps {
  label: string
  options: { label: string; value: string; testId: string }[] // Options for the radio buttons
  errorText?: string // Validation error message
  value?: string
  onChange: (value: string) => void // Callback to set the selected value
  defaultValue: string
  testId?: string
  radioColor?: string
}

export const RadioField = ({
  label,
  options,
  errorText,
  value,
  onChange,
  defaultValue,
  testId,
  radioColor = 'blue',
}: RadioFieldProps) => (
  <FormControl isInvalid={!!errorText}>
    <FormLabel>{label}</FormLabel>
    <RadioGroup
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
      data-testid={testId}
    >
      <Stack direction="row">
        {options.map((option) => (
          <Radio
            key={option.value}
            value={option.value}
            data-testid={option.testId}
            sx={{
              _checked: {
                bg: radioColor,
              },
            }}
          >
            {option.label}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
    {errorText && <FormErrorMessage>{errorText}</FormErrorMessage>}
  </FormControl>
)
