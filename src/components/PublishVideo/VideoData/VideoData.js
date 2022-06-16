import React from "react";
import { View, Pressable } from "react-native";
import { Text, Input, Image } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./VideoData.styles";

export function VideoData(props) {
  const { formik } = props;

  const selectdImageVideo = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.cancelled) {
      formik.setFieldValue("imageUri", result.uri);
    }
  };

  return (
    <View style={styles.content}>
      <Input
        placeholder="Describre tu video"
        containerStyle={styles.inpuContainer}
        inputContainerStyle={styles.inpuContainer}
        inputStyle={styles.input}
        multiline
        onChangeText={(text) => formik.setFieldValue("description", text)}
      />

      <Pressable style={styles.imageContainer} onPress={selectdImageVideo}>
        <Image
          source={{ uri: formik.values.imageUri || null }}
          style={styles.image}
        />
        <Text style={styles.imageText}>Seleccionar portada</Text>
      </Pressable>
    </View>
  );
}
