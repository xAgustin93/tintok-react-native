import * as Yup from "yup";

export function initialValues(videoUri) {
  return {
    videoUri,
    description: "",
    imageUri: "",
  };
}

export function validationSchema() {
  return Yup.object({
    videoUri: Yup.string().required("Es obligatorio"),
    description: Yup.string().required("Es obligatorio"),
    imageUri: Yup.string().required("Es obligatorio"),
  });
}
