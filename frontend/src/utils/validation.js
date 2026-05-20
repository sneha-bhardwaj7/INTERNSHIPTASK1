export function validateApplicationForm(values) {
  const errors = {};
  const emailPattern = /^\S+@\S+\.\S+$/;
  const phonePattern = /^[0-9+\-()\s]{7,20}$/;

  if (!values.fullName.trim()) errors.fullName = "Full name is required.";
  if (!values.phone.trim()) {
    errors.phone = "Phone number is required.";
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Enter a valid phone number.";
  }

  if (!values.email.trim()) {
    errors.email = "Email address is required.";
  } else if (!emailPattern.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }

  if (!values.companyName.trim()) errors.companyName = "Company name is required.";
  if (!["yes", "no"].includes(values.isAgency)) errors.isAgency = "Choose whether you are an agency.";

  return errors;
}
