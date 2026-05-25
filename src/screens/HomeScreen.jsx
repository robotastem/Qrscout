import React, { useEffect, useState } from "react";
import {
  View,
 Text,
  SafeAreaView,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
  Animated,
} from "react-native";

import { Camera, useCameraDevices } from "react-native-vision-camera";
import { scanBarcodes, BarcodeFormat } from "vision-camera-code-scanner";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function HomeScreen() {
  const devices = useCameraDevices();
  const device = devices.back;

  const [hasPermission, setHasPermission] = useState(false);
  const [scanResult, setScanResult] = useState("");
  const [isScanning, setIsScanning] = useState(true);

  const scanLine = new Animated.Value(0);

  useEffect(() => {
    requestCameraPermission();
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scanLine, {
          toValue: 220,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(scanLine, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA
      );

      setHasPermission(
        granted === PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      const permission = await Camera.requestCameraPermission();
      setHasPermission(permission === "authorized");
    }
  };

  const frameProcessor = async (frame) => {
    "worklet";

    const barcodes = scanBarcodes(frame, [BarcodeFormat.QR_CODE]);

    if (barcodes.length > 0 && isScanning) {
      const value = barcodes[0]?.displayValue;

      if (value) {
        setIsScanning(false);
        setScanResult(value);
      }
    }
  };

  if (!device || !hasPermission) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "#020617",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ color: "white", fontSize: 18 }}>
          Loading Camera...
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#020617",
      }}
    >
      {/* Header */}
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 20,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View>
          <Text
            style={{
              color: "#38BDF8",
              fontSize: 14,
              fontWeight: "700",
              letterSpacing: 2,
            }}
          >
            QR SCANNER
          </Text>

          <Text
            style={{
              color: "white",
              fontSize: 30,
              fontWeight: "800",
              marginTop: 6,
            }}
          >
            Scan QR Code
          </Text>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            height: 50,
            borderRadius: 16,
            backgroundColor: "#0F172A",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons
            name="settings-outline"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Camera */}
      <View
        style={{
          flex: 1,
          margin: 20,
          borderRadius: 30,
          overflow: "hidden",
          borderWidth: 2,
          borderColor: "#1E293B",
        }}
      >
        <Camera
          style={{ flex: 1 }}
          device={device}
          isActive={true}
          frameProcessor={frameProcessor}
          frameProcessorFps={5}
        />

        {/* Dark Overlay */}
        <View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0,0,0,0.3)",
          }}
        >
          {/* Scanner Box */}
          <View
            style={{
              width: 260,
              height: 260,
              borderWidth: 3,
              borderColor: "#38BDF8",
              borderRadius: 24,
              overflow: "hidden",
            }}
          >
            {/* Scan Line */}
            <Animated.View
              style={{
                width: "100%",
                height: 3,
                backgroundColor: "#38BDF8",
                transform: [{ translateY: scanLine }],
                shadowColor: "#38BDF8",
                shadowOpacity: 1,
                shadowRadius: 10,
                elevation: 10,
              }}
            />
          </View>

          <Text
            style={{
              color: "white",
              marginTop: 30,
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            Place QR code inside frame
          </Text>

          <Text
            style={{
              color: "#CBD5E1",
              marginTop: 8,
              fontSize: 14,
            }}
          >
            Scanning automatically...
          </Text>
        </View>
      </View>

      {/* Result Card */}
      <View
        style={{
          marginHorizontal: 20,
          marginBottom: 25,
          backgroundColor: "#0F172A",
          borderRadius: 24,
          padding: 20,
          borderWidth: 1,
          borderColor: "#1E293B",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 15,
          }}
        >
          <Ionicons
            name="qr-code-outline"
            size={24}
            color="#38BDF8"
          />

          <Text
            style={{
              color: "white",
              fontSize: 18,
              fontWeight: "700",
              marginLeft: 10,
            }}
          >
            Scan Result
          </Text>
        </View>

        <Text
          style={{
            color: scanResult ? "white" : "#64748B",
            fontSize: 15,
            lineHeight: 22,
          }}
        >
          {scanResult || "No QR code scanned yet"}
        </Text>

        {!isScanning && (
          <TouchableOpacity
            onPress={() => {
              setIsScanning(true);
              setScanResult("");
            }}
            style={{
              backgroundColor: "#38BDF8",
              marginTop: 20,
              paddingVertical: 15,
              borderRadius: 18,
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "#020617",
                fontSize: 16,
                fontWeight: "800",
              }}
            >
              Scan Again
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}