import * as Yup from "yup"

export const initialValues = {
  firstname: "",
  middlename: "",
  surname: "",
  address: "",
  contactNumber: "",
  gender: "",
  civilStatus: "",
  birthday: "",
  birthplace: "",
  wiresign: "",
  dateEmployed: "",
  licenseNumber: "",
  ATCLicenseExpiry: "",
  medicalLicenseExpiry: "",
  facility: [
    {
      facility: "",
      area: "",
      from: "",
      to: "",
      designation: "",
    },
  ],
  batch: "",
  photo: undefined,
}

export const validationSchema = Yup.object({
  firstname: Yup.string().required("⚠️"),
  middlename: Yup.string().required("⚠️"),
  surname: Yup.string().required("⚠️"),
  address: Yup.string().required("⚠️"),
  contactNumber: Yup.string().required("⚠️"),
  gender: Yup.string().required("⚠️"),
  civilStatus: Yup.string().required("⚠️"),
  birthday: Yup.date().required("⚠️").typeError("Enter a valid date"),
  birthplace: Yup.string().required("⚠️"),
  wiresign: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(2)
    .required("⚠️"),
  dateEmployed: Yup.date().required("⚠️").typeError("Enter a valid date"),
  licenseNumber: Yup.string()
    .required("⚠️")
    .max(6, "Must be at most 6 digits")
    .min(6, "Must be at least 6 digits"),
  ATCLicenseExpiry: Yup.date().required("⚠️").typeError("Enter a valid date"),
  medicalLicenseExpiry: Yup.date()
    .required("⚠️")
    .typeError("Enter a valid date"),
  facility: Yup.array(
    Yup.object({
      facility: Yup.string().required("⚠️"),
      area: Yup.string().required("⚠️"),
      from: Yup.date().required("⚠️").typeError("Enter a valid date"),
      to: Yup.date().required("⚠️").typeError("Enter a valid date"),
      designation: Yup.string().required("⚠️"),
    })
  )
    .required("⚠️")
    .min(1),
  batch: Yup.string().required("⚠️"),
  photo: Yup.object({ file: Yup.mixed().required() }).nullable(),
})
