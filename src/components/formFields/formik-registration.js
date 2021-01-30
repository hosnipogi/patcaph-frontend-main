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
  firstname: Yup.string().required("Required"),
  middlename: Yup.string().required("Required"),
  surname: Yup.string().required("Required"),
  address: Yup.string().required("Required"),
  contactNumber: Yup.string().required("Required"),
  gender: Yup.string().required("Required"),
  civilStatus: Yup.string().required("Required"),
  birthday: Yup.date().required("Required").typeError("Enter a valid date"),
  birthplace: Yup.string().required("Required"),
  wiresign: Yup.string()
    .min(2, "Must be at least 2 characters")
    .max(2)
    .required("Required"),
  dateEmployed: Yup.date().required("Required").typeError("Enter a valid date"),
  licenseNumber: Yup.string()
    .required("Required")
    .max(6, "Must be at most 6 digits")
    .min(6, "Must be at least 6 digits"),
  ATCLicenseExpiry: Yup.date()
    .required("Required")
    .typeError("Enter a valid date"),
  medicalLicenseExpiry: Yup.date()
    .required("Required")
    .typeError("Enter a valid date"),
  facility: Yup.array(
    Yup.object({
      facility: Yup.string()
        .required("Required")
        .test(val => !/^Select/.test(val)),
      area: Yup.string()
        .required("Required")
        .test(val => !/^Select/.test(val)),
      from: Yup.date().required("Required").typeError("Enter a valid date"),
      to: Yup.date().required("Required").typeError("Enter a valid date"),
      designation: Yup.string()
        .required("Required")
        .test(val => !/^Select/.test(val)),
    })
  )
    .required("Required")
    .min(1),
  batch: Yup.string()
    .required("Required")
    .test(val => !/^Select/.test(val)),
  photo: Yup.object({ file: Yup.mixed().required("Required") }).nullable(),
})
