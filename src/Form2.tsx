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
  Input,
  InputAddon,
  InputGroup,
  Stack,
  Text,
} from '@chakra-ui/react'

//React Icons
import { FaDollarSign } from 'react-icons/fa6'
import { CgProfile } from 'react-icons/cg'
import { MdOutlineEmail } from 'react-icons/md'

// Local Components
import { Field } from './components/ui/atom/field'
import { RadioField } from './components/ui/atom/radio'

// Local Images
import { Illustration, Logo } from './assets/images/index'

// ZOD
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchema } from './schema'

export const Form2 = () => {
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
    } else {
      setValue('price.amount', { min: 1, max: 10 })
    }
  }, [watch('price.type')])

  const priceTypeValue = watch('price.type')

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log('Form Submitted', data)
  }

  return (
    <Center minHeight="100vh" minWidth="100vw" bg="white">
      <Box as="form" onSubmit={handleSubmit(onSubmit)} minW="xl">
        <Stack direction="row" spacing="120px" w="full">
          {/* Left Hand Side: Input */}
          <Stack gap="12" align="flex-start" maxW="lg">
            <Stack gap="2" align="flex-start" maxW="lg">
              <Logo />
              <Text fontWeight="medium">Coding Exercise By Eugene Tan</Text>
            </Stack>
            <Stack gap="6" align="flex-start" maxW="lg">
              <Stack gap="2" align="flex-start" direction="row" width="full">
                {/* Name Input */}
                <Field
                  label="Name"
                  invalid={!!errors.name}
                  errorText={errors.name?.message}
                >
                  <InputGroup>
                    <InputAddon bg="transparent">
                      <CgProfile />
                    </InputAddon>
                    <Input
                      data-testid="name"
                      {...register('name', {
                        required: 'Name must contain at least 1 character(s)',
                      })}
                    />
                  </InputGroup>
                </Field>

                {/* Email Input */}
                <Field
                  label="Email"
                  invalid={!!errors.email}
                  errorText={errors.email?.message}
                >
                  <InputGroup>
                    <InputAddon bg="transparent">
                      <MdOutlineEmail />
                    </InputAddon>
                    <Input
                      data-testid="email"
                      {...register('email', {
                        required: 'Email is required',
                      })}
                    />
                  </InputGroup>
                </Field>
              </Stack>
              {/* Fixed / Range Radio Selection*/}
              <RadioField
                data-testid="radio"
                label="Price Type"
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
                radioColor="ignitionPrimary.900"
              />
              {priceTypeValue === 'fixed' ? (
                // Fixed Price Input
                <FormControl flex="1">
                  <FormLabel>Fixed Price</FormLabel>
                  <InputGroup>
                    <InputAddon bg="transparent">
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
                    <p style={{ color: 'red' }}>
                      {errors?.price?.amount.message}
                    </p>
                  )}
                </FormControl>
              ) : (
                // Range Inputs
                <Stack gap="2" align="flex-start" direction="row" width="full">
                  {/* Min Input */}
                  <FormControl flex="1">
                    <FormLabel>Min</FormLabel>
                    <InputGroup>
                      <InputAddon bg="transparent">
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
                      <InputAddon bg="transparent">
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
                </Stack>
              )}
            </Stack>

            <Button
              data-testid="submit-button"
              type="submit"
              width="full"
              bg="ignitionPrimary.900"
              _hover={{ bg: 'ignitionPrimary.800' }}
              size="lg"
              color="white"
            >
              Submit
            </Button>
          </Stack>
          {/* Right Hand Side */}
          <Stack
            align="center" // Horizontal center
            justify="center" // Vertical center
          >
            <Illustration />
          </Stack>
        </Stack>
      </Box>
    </Center>
  )
}
