import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

import AppButton from "../components/AppButton";
import Header from "../components/Header";
import ScreenWrapper from "../components/ScreenWrapper";
import AppTextInput from "../components/TextInput";

import apiService from "../utils/apiService";

export default function ChangeMPIN() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [oldMPIN, setOldMPIN] = useState("");
  const [newMPIN, setNewMPIN] = useState("");
  const [confirmMPIN, setConfirmMPIN] = useState("");

  const handleChangeMPIN = async () => {
    if (!oldMPIN || !newMPIN || !confirmMPIN) {
      Alert.alert("Error", "Please fill all fields");
      return;
    }

    if (newMPIN.length !== 4) {
      Alert.alert("Error", "MPIN must be 4 digits");
      return;
    }

    if (newMPIN !== confirmMPIN) {
      Alert.alert("Error", "New MPIN and Confirm MPIN do not match");
      return;
    }

    try {
      setLoading(true);

      const user = JSON.parse(await AsyncStorage.getItem("user"));

      const response = await apiService.changeMPIN(
        user.id,
        oldMPIN,
        newMPIN
      );

      Alert.alert("Success", response.message);

      router.back();

    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenWrapper padding="md">

      <Header
        title="Change MPIN"
        subtitle="Update your MPIN"
      />

      <View style={styles.container}>

        <AppTextInput
          label="Current MPIN"
          value={oldMPIN}
          onChangeText={setOldMPIN}
          secureTextEntry
          keyboardType="number-pad"
          maxLength={4}
        />

        <AppTextInput
          label="New MPIN"
          value={newMPIN}
          onChangeText={setNewMPIN}
          secureTextEntry
          keyboardType="number-pad"
          maxLength={4}
        />

        <AppTextInput
          label="Confirm MPIN"
          value={confirmMPIN}
          onChangeText={setConfirmMPIN}
          secureTextEntry
          keyboardType="number-pad"
          maxLength={4}
        />

        <AppButton
          title="Change MPIN"
          loading={loading}
          fullWidth
          onPress={handleChangeMPIN}
        />

      </View>

    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    gap: 20,
  },
});