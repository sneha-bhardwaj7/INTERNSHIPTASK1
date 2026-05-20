function formatApplication(application) {
  return {
    id: application._id.toString(),
    fullName: application.fullName,
    email: application.email,
    phone: application.phone,
    companyName: application.companyName,
    isAgency: application.isAgency,
    status: application.status,
    notes: application.notes,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt
  };
}

module.exports = formatApplication;
