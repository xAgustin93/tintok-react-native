import React from "react";
import { View } from "react-native";
import { Input, Button } from "react-native-elements";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User } from "../../api";
import { useAuth } from "../../hooks";

const user = new User();

export function ChangeInstagram(props) {
  const {
    route: { params },
    navigation,
  } = props;
  const { accessToken } = useAuth();

  const formik = useFormik({
    initialValues: {
      instagram: params.instagram,
    },
    validationSchema: Yup.object({
      instagram: Yup.string(),
    }),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        await user.updateUser(accessToken, { instagram: formValue.instagram });
        navigation.goBack();
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <View style={{ marginHorizontal: 20 }}>
      <Input
        placeholder="Nombre en instagram"
        autoCapitalize="none"
        value={formik.values.instagram}
        onChangeText={(text) => formik.setFieldValue("instagram", text)}
      />
      <Button
        title="Guardar"
        style={{ marginTop: 10 }}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  );
}
