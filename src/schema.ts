import * as z from 'zod'

// Create zod validation schema for the form
// export const formSchema = z
//   .object({
//     name: z
//       .string()
//       .min(1, 'Name must contain at least 1 character(s)')
//       .max(10, 'Name must contain at most 10 character(s)'),
//     email: z.string().email('Invalid email'),
//     priceType: z.string().min(1, 'Price Type is required'),
//     fixedAmount: z
//       .number()
//       .nonnegative('Fixed Price must be a positive number'),
//     min: z.number().nonnegative('Min must be a positive number'),
//     max: z.number().nonnegative('Max must be a positive number'),
//   })
//   .refine((data) => data.min <= data.max, {
//     path: ['max'],
//     message: 'Min must be less than max',
//   })

export const formSchema = z.object({
  name: z
    .string()
    .min(1, 'Name must contain at least 1 character(s)')
    .max(10, 'Name must contain at most 10 character(s)'),
  email: z.string().email('Invalid email'),
  price: z
    .discriminatedUnion('type', [
      z.object({
        type: z.literal('fixed'),
        amount: z
          .number()
          .min(1, 'Amount must be a positive number')
          .optional(), // Allow undefined initially,
      }),
      z.object({
        type: z.literal('range'),
        amount: z
          .object({
            min: z.number().min(1, 'Min must be a positive number'),
            max: z.number().min(1, 'Max must be a positive number'),
          })
          .superRefine((data, ctx) => {
            if (data.max < data.min) {
              ctx.addIssue({
                path: [''],
                code: z.ZodIssueCode.custom,
                message: 'Min must be less than max',
              })
            }
          }),
      }),
    ])
    .optional(),
})
