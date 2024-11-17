import { InputGroup, Input, InputAddon, Stack } from '@chakra-ui/react'

export const InputWithAddon = () => (
  <Stack gap="10">
    <InputGroup>
      <InputAddon></InputAddon>
      <Input placeholder="" />
    </InputGroup>

    <InputGroup>
      <Input placeholder="" />
      <InputAddon></InputAddon>
    </InputGroup>
  </Stack>
)
