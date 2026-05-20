const { z } = require('zod');

const applicationCreateSchema = z.object({
  fullName: z.string().trim().min(2, 'Full name must be at least 2 characters.'),
  phone: z.string().trim().regex(/^[0-9+\-()\s]{7,20}$/, 'Enter a valid phone number.'),
  email: z.string().trim().email('Enter a valid email address.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
  companyName: z.string().trim().min(2, 'Company name is required.'),
  isAgency: z.coerce.boolean(),
  notes: z.string().trim().optional().default('')
});

const applicationUpdateSchema = applicationCreateSchema.partial().extend({
  status: z.enum(['new', 'reviewing', 'shortlisted', 'rejected']).optional()
});

const applicationListQuerySchema = z.object({
  search: z.string().trim().optional().default(''),
  status: z.enum(['new', 'reviewing', 'shortlisted', 'rejected', 'all']).optional().default('all')
});

const idParamSchema = z.object({
  id: z.string().min(1, 'Application id is required.')
});

module.exports = {
  applicationCreateSchema,
  applicationUpdateSchema,
  applicationListQuerySchema,
  idParamSchema
};
