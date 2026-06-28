import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as Location from 'expo-location';
import { Theme } from '../theme';
import { AuthContext } from '../../App';

export default function ReportScreen() {
    const [permission, requestPermission] = useCameraPermissions();
    const [selectedCategory, setSelectedCategory] = useState('Spitting Tambaku');
    const [customIssue, setCustomIssue] = useState('');
    const [expectedTimeframe, setExpectedTimeframe] = useState('7 Days');
    const [tambakuContext, setTambakuContext] = useState('');
    const { user } = useContext(AuthContext);
    const [location, setLocation] = useState(null);
    const [address, setAddress] = useState('Acquiring GPS Signal...');
    const cameraRef = React.useRef(null);
    const [photoBase64, setPhotoBase64] = useState(null);

    React.useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setAddress('Location permission denied');
                return;
            }

            let loc = await Location.getCurrentPositionAsync({});
            setLocation(loc.coords);
            
            let geocode = await Location.reverseGeocodeAsync({
                latitude: loc.coords.latitude,
                longitude: loc.coords.longitude
            });

            if (geocode.length > 0) {
                const place = geocode[0];
                setAddress(`${place.name || place.street || ''}, ${place.city || place.subregion || ''}, ${place.region || ''}`);
            } else {
                setAddress(`${loc.coords.latitude.toFixed(4)}, ${loc.coords.longitude.toFixed(4)}`);
            }
        })();
    }, []);

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const photo = await cameraRef.current.takePictureAsync({ base64: true, quality: 0.5 });
                setPhotoBase64(photo.base64);
                Alert.alert("Captured!", "Photo successfully locked in.");
            } catch (error) {
                Alert.alert("Camera Error", "Failed to take picture.");
            }
        }
    };

    const submitReport = async (payload) => {
        try {
            const response = await fetch('https://8c49-2401-4900-883f-b678-ddde-4fd9-f965-210f.ngrok-free.app/api/reports/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            
            if (selectedCategory === 'Emergency') {
                Alert.alert('🚨 EMERGENCY REPORTED', 'Please Call Police (Dial 112) or Ambulance Immediately Now!');
            } else if (data.fineIssued) {
                Alert.alert('✅ Report Verified by AI', `A fine of ₹${data.fineAmount} has been automatically issued to the offender's linked Aadhaar.`);
            } else {
                Alert.alert('Success!', 'Your report has been submitted and verified by AI.');
            }
            
            setPhotoBase64(null); // Reset
            setSelectedCategory('Spitting Tambaku');
            setCustomIssue('');
        } catch (error) {
            Alert.alert("Error", "Failed to submit report. Ensure the backend is running.");
        }
    };

    const handleFormSubmit = () => {
        if (!location) {
            Alert.alert("GPS Error", "Still acquiring your location. Please wait a moment.");
            return;
        }

        let finalDescription = `Geo-tagged report for ${selectedCategory}`;
        if (selectedCategory === 'Spitting Tambaku' && tambakuContext) {
            finalDescription += ` | Specific Location Context: ${tambakuContext}`;
        }
        
        const finalTitle = selectedCategory === 'Other' ? (customIssue || 'Other Issue') : selectedCategory;
        
        finalDescription += ` | Expected Fix: ${expectedTimeframe}`;

        const payload = {
            user_id: user ? user.id : 1, // Pull real user id from login
            title: finalTitle,
            description: finalDescription,
            address: address,
            lat: location.latitude,
            lng: location.longitude,
            image_base64: photoBase64
        };
        submitReport(payload);
    };

    if (!permission) return <View />;
    if (!permission.granted) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.bodyMedium}>We need high-precision camera access to verify geo-tagged potholes.</Text>
                <TouchableOpacity style={styles.primaryButton} onPress={requestPermission}>
                    <Text style={styles.primaryButtonText}>Grant Camera Permission</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* 60% Camera Top Viewframe */}
            <CameraView style={styles.cameraView} ref={cameraRef}>
                <View style={styles.cameraOverlay}>
                    <TouchableOpacity style={styles.shutterButton} onPress={takePicture}>
                        <View style={styles.innerShutter} />
                    </TouchableOpacity>
                    {photoBase64 && <Text style={{ color: '#fff', marginTop: 10, fontWeight: 'bold' }}>✅ Photo Attached</Text>}
                </View>
            </CameraView>

            {/* Lower Auto-filling Metadata Form */}
            <ScrollView style={styles.formSheet} contentContainerStyle={{ paddingBottom: 40 }} keyboardShouldPersistTaps="handled">
                <Text style={styles.headlineMedium}>Confirm Details</Text>

                <Text style={styles.labelLarge}>Detected Geo-Location (Locked via GPS)</Text>
                <View style={styles.disabledInput}>
                    <Text style={styles.disabledInputText} numberOfLines={1}>📍 {address}</Text>
                </View>

                <Text style={styles.labelLarge}>Issue Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryRow}>
                    {['Spitting Tambaku', 'Pothole', 'Garbage', 'Streetlight', 'Water Leak', 'Emergency', 'Other'].map((cat) => (
                        <TouchableOpacity 
                            key={cat} 
                            style={[styles.categoryPill, selectedCategory === cat && styles.categoryPillActive]}
                            onPress={() => setSelectedCategory(cat)}
                        >
                            <Text style={[styles.categoryText, selectedCategory === cat && styles.categoryTextActive]}>{cat}</Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {selectedCategory === 'Other' && (
                    <View style={{marginBottom: Theme.spacing.large}}>
                        <Text style={styles.labelLarge}>Specify Other Issue</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Describe your specific issue type..."
                            value={customIssue}
                            onChangeText={setCustomIssue}
                            placeholderTextColor={Theme.colors.textSecondary}
                        />
                    </View>
                )}

                <Text style={styles.labelLarge}>Expected Fix Time</Text>
                <View style={styles.categoryRow}>
                    {['24 Hours', '3 Days', '7 Days', '1 Month'].map((time) => (
                        <TouchableOpacity 
                            key={time} 
                            style={[styles.categoryPill, expectedTimeframe === time && styles.categoryPillActive]}
                            onPress={() => setExpectedTimeframe(time)}
                        >
                            <Text style={[styles.categoryText, expectedTimeframe === time && styles.categoryTextActive]}>{time}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {selectedCategory === 'Spitting Tambaku' && (
                    <View style={{marginBottom: Theme.spacing.large}}>
                        <Text style={styles.labelLarge}>Location Detail (e.g. Metro Station Pillar 4)</Text>
                        <TextInput
                            style={styles.inputField}
                            placeholder="Where exactly did they spit?"
                            placeholderTextColor={Theme.colors.textSecondary}
                            value={tambakuContext}
                            onChangeText={setTambakuContext}
                        />
                    </View>
                )}

                <TouchableOpacity style={styles.primaryButton} onPress={handleFormSubmit}>
                    <Text style={styles.primaryButtonText}>Submit File to Nagar Nigam</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background },
    fallbackContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: Theme.spacing.margin },
    cameraView: { flex: 6, width: '100%' },
    cameraOverlay: { flex: 1, backgroundColor: 'transparent', justifyContent: 'flex-end', alignItems: 'center', paddingBottom: Theme.spacing.large },
    shutterButton: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#ffffff', justifyContent: 'center', alignItems: 'center' },
    innerShutter: { width: 60, height: 60, borderRadius: 30, backgroundColor: Theme.colors.primary },
    formSheet: { flex: 4, backgroundColor: Theme.colors.surfaceCard, borderTopLeftRadius: Theme.radius.medium, borderTopRightRadius: Theme.radius.medium, padding: Theme.spacing.margin, ...Theme.shadows.minimal },
    headlineMedium: { fontSize: 24, fontWeight: '700', color: Theme.colors.textPrimary, marginBottom: Theme.spacing.medium, letterSpacing: -0.5 },
    labelLarge: { fontSize: 13, fontWeight: '600', color: Theme.colors.textSecondary, marginBottom: Theme.spacing.base, textTransform: 'uppercase', letterSpacing: 0.5 },
    disabledInput: { height: 52, backgroundColor: Theme.colors.surfaceLow, borderRadius: Theme.radius.small, justifyContent: 'center', paddingHorizontal: Theme.spacing.medium, marginBottom: Theme.spacing.medium },
    disabledInputText: { color: Theme.colors.textPrimary, fontSize: 15, fontWeight: '500' },
    categoryRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginBottom: Theme.spacing.large },
    categoryPill: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: Theme.colors.surfaceLow, borderRadius: Theme.radius.full },
    categoryPillActive: { backgroundColor: Theme.colors.primary },
    categoryText: { color: Theme.colors.textSecondary, fontWeight: '600', fontSize: 14 },
    categoryTextActive: { color: Theme.colors.onPrimary, fontWeight: '700' },
    inputField: { height: 52, backgroundColor: Theme.colors.surfaceLow, borderRadius: Theme.radius.small, paddingHorizontal: Theme.spacing.medium, fontSize: 16, color: Theme.colors.textPrimary },
    primaryButton: { height: 56, backgroundColor: Theme.colors.primary, borderRadius: Theme.radius.full, justifyContent: 'center', alignItems: 'center', ...Theme.shadows.minimal },
    primaryButtonText: { color: Theme.colors.onPrimary, fontSize: 14, fontWeight: '600' }
});
