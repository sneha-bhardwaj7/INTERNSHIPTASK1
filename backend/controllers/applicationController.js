const bcrypt = require('bcryptjs');
const { Application } = require('../models/Application');
const { ApiError } = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');
const formatApplication = require('../utils/formatApplication');
const {
  applicationCreateSchema,
  applicationListQuerySchema,
  applicationUpdateSchema,
  idParamSchema
} = require('../utils/applicationSchemas');

function buildSearchFilter(search) {
  if (!search) {
    return {};
  }

  return {
    $or: [
      { fullName: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
      { companyName: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } }
    ]
  };
}

const createApplication = asyncHandler(async (request, response) => {
  const body = applicationCreateSchema.parse(request.body);

  const existingApplication = await Application.findOne({ email: body.email });
  if (existingApplication) {
    throw new ApiError(409, "An application with this email already exists.", {
      email: "This email is already registered."
    });
  }

  const passwordHash = await bcrypt.hash(body.password, 10);
  const createdApplication = await Application.create({
    fullName: body.fullName,
    phone: body.phone,
    email: body.email,
    passwordHash,
    companyName: body.companyName,
    isAgency: body.isAgency,
    notes: body.notes || ""
  });

  response.status(201).json({
    message: "Application created successfully.",
    application: formatApplication(createdApplication)
  });
});

const getApplications = asyncHandler(async (request, response) => {
  const { search, status } = applicationListQuerySchema.parse(request.query);
  const filter = buildSearchFilter(search);

  if (status !== "all") {
    filter.status = status;
  }

  const applications = await Application.find(filter).sort({ createdAt: -1 });

  response.json({
    items: applications.map(formatApplication),
    count: applications.length
  });
});

const getApplicationById = asyncHandler(async (request, response) => {
  const { id } = idParamSchema.parse(request.params);
  const application = await Application.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found.");
  }

  response.json({ application: formatApplication(application) });
});

const updateApplication = asyncHandler(async (request, response) => {
  const { id } = idParamSchema.parse(request.params);
  const body = applicationUpdateSchema.parse(request.body);
  const application = await Application.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found.");
  }

  if (body.email && body.email !== application.email) {
    const duplicate = await Application.findOne({ email: body.email });
    if (duplicate) {
      throw new ApiError(409, "An application with this email already exists.", {
        email: "This email is already registered."
      });
    }
  }

  if (typeof body.fullName === "string") application.fullName = body.fullName;
  if (typeof body.phone === "string") application.phone = body.phone;
  if (typeof body.email === "string") application.email = body.email;
  if (typeof body.companyName === "string") application.companyName = body.companyName;
  if (typeof body.isAgency === "boolean") application.isAgency = body.isAgency;
  if (typeof body.status === "string") application.status = body.status;
  if (typeof body.notes === "string") application.notes = body.notes;

  if (typeof body.password === "string") {
    application.passwordHash = await bcrypt.hash(body.password, 10);
  }

  await application.save();

  response.json({
    message: "Application updated successfully.",
    application: formatApplication(application)
  });
});

const deleteApplication = asyncHandler(async (request, response) => {
  const { id } = idParamSchema.parse(request.params);
  const application = await Application.findById(id);

  if (!application) {
    throw new ApiError(404, "Application not found.");
  }

  await application.deleteOne();

  response.json({
    message: "Application deleted successfully."
  });
});

module.exports = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication
};
