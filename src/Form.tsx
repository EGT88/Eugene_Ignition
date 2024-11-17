// React
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

// Chakra UI
import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputAddon,
  InputGroup,
  Stack,
  VStack,
} from '@chakra-ui/react'

//React Icons
import { FaDollarSign } from 'react-icons/fa6'

// Local Components
import { Field } from './components/ui/atom/field'
import { RadioField } from './components/ui/atom/radio'

// ZOD
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './schema'

export const Form = () => {
  type FormValues = z.infer<typeof formSchema>

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { price: { type: 'range' } },
  })

  React.useEffect(() => {
    if (watch('price.type') === 'fixed') {
      setValue('price.amount', undefined) // Placeholder of input is used as `amount` as it's declared as optional in the schema.
    }
  }, [watch('price.type')])

  const priceTypeValue = watch('price.type')

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('Form Submitted', data)
  }

  return (
    <Center minHeight="100vh" minWidth="100vw" bg="gray.50" padding="4">
      <Box as="form" onSubmit={handleSubmit(onSubmit)} minW="lg">
        <Stack gap="4" align="flex-start" maxW="lg">
          {/* Name Input */}
          <Field
            label="Name"
            invalid={!!errors.name}
            errorText={errors.name?.message}
          >
            <Input
              data-testid="name"
              {...register('name', {
                required: 'Name must contain at least 1 character(s)',
              })}
            />
          </Field>
          {/* Email Input */}
          <Field
            label="Email"
            invalid={!!errors.email}
            errorText={errors.email?.message}
          >
            <Input
              data-testid="email"
              {...register('email', {
                required: 'Email is required',
              })}
            />
          </Field>
          {/* Fixed / Range Radio Selection*/}
          <RadioField
            data-testid="radio"
            label="Price Type"
            radioColor="blue.500"
            options={[
              { label: 'Fixed', value: 'fixed', testId: 'fixed-type' },
              { label: 'Range', value: 'range', testId: 'range-type' },
            ]}
            defaultValue="2"
            value={priceTypeValue}
            onChange={(value: string) =>
              setValue('price.type', value as 'fixed' | 'range')
            }
            errorText={errors.price?.message}
          />
          {priceTypeValue === 'fixed' ? (
            // Fixed Price Input
            <FormControl flex="1">
              <FormLabel>Fixed Price</FormLabel>
              <InputGroup>
                <InputAddon>
                  <FaDollarSign />
                </InputAddon>
                <Input
                  data-testid="fixed-amount"
                  placeholder="Enter a fixed price"
                  {...register('price.amount', {
                    valueAsNumber: true,
                  })}
                />
              </InputGroup>
              {errors?.price?.amount && (
                <p style={{ color: 'red' }}>{errors?.price?.amount.message}</p>
              )}
            </FormControl>
          ) : (
            // Range Inputs
            <VStack align="start" width="full" spacing="4">
              <HStack gap="10" width="full">
                {/* Min Input */}
                <FormControl flex="1">
                  <FormLabel>Min</FormLabel>
                  <InputGroup>
                    <InputAddon>
                      <FaDollarSign />
                    </InputAddon>
                    <Input
                      data-testid="min-amount"
                      placeholder=""
                      {...register('price.amount.min', {
                        valueAsNumber: true,
                      })}
                    />
                  </InputGroup>
                  {(errors?.price?.amount as any)?.min && (
                    <p style={{ color: 'red' }}>
                      {(errors?.price?.amount as any)?.min.message}
                    </p>
                  )}
                </FormControl>

                {/* Max Input */}
                <FormControl flex="1">
                  <FormLabel>Max</FormLabel>
                  <InputGroup>
                    <InputAddon>
                      <FaDollarSign />
                    </InputAddon>
                    <Input
                      data-testid="max-amount"
                      placeholder=""
                      {...register('price.amount.max', {
                        valueAsNumber: true,
                      })}
                    />
                  </InputGroup>
                  {(errors?.price?.amount as any)?.max && (
                    <p style={{ color: 'red' }}>
                      {(errors?.price?.amount as any)?.max.message}
                    </p>
                  )}
                </FormControl>
              </HStack>
            </VStack>
          )}

          <Button
            data-testid="submit-button"
            type="submit"
            width="full"
            colorScheme="blue"
          >
            Submit
          </Button>
        </Stack>
      </Box>
    </Center>
  )
}
