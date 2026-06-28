import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  KeyboardAvoidingView, 
  Platform,
  StyleSheet,
  Alert
} from 'react-native';
import axios from 'axios';
import { AuthContext } from '../../App';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'react-native';

const theme = {
  colors: {
    primary: "#000666",
    onPrimary: "#ffffff",
    surface: "#f9f9f9",
    onSurface: "#1a1c1c",
    surfaceBright: "#f9f9f9",
    surfaceContainerLowest: "#ffffff",
    surfaceContainerLow: "#f3f3f3",
    onSurfaceVariant: "#454652",
    outline: "#767683",
    outlineVariant: "#c6c5d4",
    error: "#ba1a1a",
    onError: "#ffffff",
    errorContainer: "#ffdad6",
    primaryContainer: "#1a237e",
    onPrimaryContainer: "#8690ee",
  }
};

export default function NewReportOfficial() {
  const { user } = React.useContext(AuthContext);
  const [issueType, setIssueType] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageUri, setImageUri] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  
  // GPS State
  const [coordinate, setCoordinate] = useState({ latitude: 28.6139, longitude: 77.2090 });
  const [mapReady, setMapReady] = useState(false);

  // Fetch live GPS when form opens
  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;
      
      try {
        let loc = await Location.getCurrentPositionAsync({});
        setCoordinate({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        });
        setMapReady(true);
      } catch (e) {
        console.warn("Could not fetch location for form");
      }
    })();
  }, []);

  const pickImage = async () => {
    // Request permission first
    let { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Denied', 'Sorry, we need camera permissions to make this work!');
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
      base64: true, // Crucial for Gemini backend
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setImageBase64(result.assets[0].base64);
    }
  };

  const handleSubmit = async () => {
    if (!issueType || !address) {
      Alert.alert('Validation Error', 'Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await axios.post('https://civicsync-w9yy.onrender.com/api/reports/submit', {
        user_id: user ? user.id : 1, // Fallback safely just in case
        title: issueType,
        description: description,
        address: address,
        lat: coordinate.latitude,
        lng: coordinate.longitude,
        image_base64: imageBase64 // Real Base64 to trigger Gemini AI!
      }, {
        headers: { 'Bypass-Tunnel-Reminder': 'true' }
      });
      
      Alert.alert('Success!', 'Your report has been submitted and verified by AI.');
      setIssueType('');
      setAddress('');
      setDescription('');
      setImageUri(null);
      setImageBase64(null);
    } catch (error) {
      Alert.alert('Error', `Failed to submit report. ${error.message}`);
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* TopAppBar */}
      <View style={styles.appBar}>
        <View style={styles.rowGap2}>
          <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 18 }}>🏦</Text>
          <Text style={{ fontWeight: 'bold', color: theme.colors.primary, fontSize: 20 }}>CivicSync</Text>
        </View>
        <TouchableOpacity style={styles.iconButton}>
          <Text style={{ fontSize: 20, color: theme.colors.onSurfaceVariant }}>🔔</Text>
        </TouchableOpacity>
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.flex1}>
        <ScrollView style={styles.flex1} contentContainerStyle={styles.scrollContent}>
          
          <View style={{ marginBottom: 32 }}>
            <Text style={styles.headerTitle}>Infrastructure Report</Text>
            <Text style={styles.headerSubtitle}>Please provide accurate details to help us address the issue efficiently.</Text>
          </View>

          {/* Form Container */}
          <View style={styles.formContainer}>
            
            {/* Issue Type */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Issue Type <Text style={{ color: theme.colors.error }}>*</Text></Text>
              <View style={styles.inputWrapper}>
                <TextInput 
                  style={styles.textInput}
                  placeholder="e.g. Pothole, Streetlight Outage..."
                  placeholderTextColor="#767683"
                  value={issueType}
                  onChangeText={setIssueType}
                />
              </View>
            </View>

            {/* Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Location / Address <Text style={{ color: theme.colors.error }}>*</Text></Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.inputIconLeft}>📍</Text>
                <TextInput 
                  style={[styles.textInput, { paddingLeft: 40 }]}
                  placeholder="e.g., 123 Main St..."
                  placeholderTextColor="#767683"
                  value={address}
                  onChangeText={setAddress}
                />
              </View>
            </View>

            {/* Description */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Detailed Description</Text>
              <TextInput 
                style={[styles.textInput, { height: 96 }]}
                placeholder="Describe the severity and exact location of the issue..."
                placeholderTextColor="#767683"
                multiline
                textAlignVertical="top"
                value={description}
                onChangeText={setDescription}
              />
              <Text style={styles.helperText}>Max 500 characters.</Text>
            </View>

            {/* Map Pin Drop */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Pin Exact Location <Text style={{ color: theme.colors.error }}>*</Text></Text>
              <Text style={styles.helperText}>Hold and drag the red pin to mark the exact spot.</Text>
              <View style={styles.mapContainer}>
                <MapView
                  style={styles.miniMap}
                  showsUserLocation={true}
                  region={{
                    latitude: coordinate.latitude,
                    longitude: coordinate.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                >
                  <Marker
                    draggable
                    coordinate={coordinate}
                    onDragEnd={(e) => setCoordinate(e.nativeEvent.coordinate)}
                    title="Drag to exact issue spot"
                  />
                </MapView>
              </View>
            </View>

            {/* Upload Photo */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Photo Evidence</Text>
              <TouchableOpacity style={styles.uploadBox} onPress={pickImage}>
                {imageUri ? (
                  <Image source={{ uri: imageUri }} style={styles.previewImage} />
                ) : (
                  <>
                    <Text style={{ fontSize: 36, marginBottom: 16, color: theme.colors.onSurfaceVariant }}>📷</Text>
                    <Text style={{ color: theme.colors.primary, fontWeight: 'bold', fontSize: 14 }}>Tap to take a photo</Text>
                    <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 12, marginTop: 8 }}>Gemini AI will analyze it</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>

            {/* Submit Button */}
            <TouchableOpacity 
              style={[styles.submitButton, isSubmitting && { opacity: 0.7 }]} 
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              <Text style={styles.submitButtonText}>
                {isSubmitting ? 'Submitting...' : 'Submit Complaint'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Emergency SOS */}
          <View style={styles.emergencyBox}>
            <Text style={{ color: theme.colors.error, fontSize: 30, marginBottom: 8 }}>⚠️</Text>
            <Text style={{ fontWeight: 'bold', color: theme.colors.onSurface, fontSize: 20, marginBottom: 8 }}>Emergency Situation?</Text>
            <Text style={{ color: theme.colors.onSurfaceVariant, fontSize: 14, marginBottom: 24, textAlign: 'center' }}>
              If this infrastructure issue poses an immediate threat to life or property, do not use this form.
            </Text>
            <TouchableOpacity style={styles.emergencyButton}>
              <Text style={{ color: theme.colors.onError, fontSize: 18, marginRight: 8 }}>📞</Text>
              <Text style={{ color: theme.colors.onError, fontWeight: 'bold', fontSize: 16 }}>EMERGENCY SOS</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: theme.colors.surface },
  appBar: {
    width: '100%',
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.outlineVariant,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    height: 64,
    zIndex: 50,
  },
  rowGap2: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconButton: { padding: 8, borderRadius: 9999 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 32, paddingBottom: 100 },
  headerTitle: { fontWeight: 'bold', color: theme.colors.onSurface, fontSize: 24, marginBottom: 8 },
  headerSubtitle: { color: theme.colors.onSurfaceVariant, fontSize: 14 },
  formContainer: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderColor: theme.colors.outlineVariant,
    borderWidth: 1,
    borderRadius: 12,
    padding: 24,
    gap: 24,
    flexDirection: 'column',
  },
  inputGroup: { flexDirection: 'column', gap: 8 },
  label: { fontWeight: 'bold', color: theme.colors.onSurface, fontSize: 14 },
  inputWrapper: { position: 'relative', justifyContent: 'center' },
  textInput: {
    width: '100%',
    backgroundColor: theme.colors.surfaceBright,
    borderColor: theme.colors.outline,
    borderWidth: 1,
    color: theme.colors.onSurface,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputIconLeft: { position: 'absolute', left: 16, zIndex: 10, color: theme.colors.outline },
  helperText: { color: theme.colors.onSurfaceVariant, fontSize: 12 },
  uploadBox: {
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: theme.colors.outlineVariant,
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: theme.colors.surface,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
  mapContainer: {
    height: 180,
    width: '100%',
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.outlineVariant,
    marginTop: 8,
  },
  miniMap: {
    width: '100%',
    height: '100%',
  },
  submitButton: {
    marginTop: 16,
    width: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButtonText: { color: theme.colors.onPrimary, fontWeight: 'bold', fontSize: 16 },
  emergencyBox: {
    marginTop: 32,
    borderWidth: 1,
    borderColor: theme.colors.errorContainer,
    backgroundColor: theme.colors.errorContainer,
    borderRadius: 12,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.9,
  },
  emergencyButton: {
    backgroundColor: theme.colors.error,
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    maxWidth: 320,
  }
});
