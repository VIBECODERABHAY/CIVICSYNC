import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ScrollView, Image } from 'react-native';
import { Theme } from '../theme';
import axios from 'axios';
import { AuthContext } from '../../App';

export default function AuthScreen({ navigation }) {
    const [userRole, setUserRole] = useState('citizen'); // 'citizen' or 'official'
    const [isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isDigilockerLoading, setIsDigilockerLoading] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [aadhaar, setAadhaar] = useState('');
    
    // Official State
    const [officialId, setOfficialId] = useState('');

    const { login } = useContext(AuthContext);

    const handleDigilockerAuth = () => {
        setIsDigilockerLoading(true);
        // Simulate OAuth Network Delay
        setTimeout(() => {
            setName('Abhay Kumar');
            setAadhaar('849281740921');
            setIsDigilockerLoading(false);
            Alert.alert("✅ KYC Verified", "Successfully securely fetched details from Govt of India DigiLocker.");
        }, 2000);
    };

    const handleCitizenSubmit = async () => {
        setIsLoading(true);
        try {
            if (isLogin) {
                const res = await axios.post('https://civicsync-w9yy.onrender.com/api/auth/civilian/login', { email, password });
                login(res.data.user);
            } else {
                if (!name || !email || !password || !aadhaar) {
                    Alert.alert('Error', 'Please fill in all fields.');
                    setIsLoading(false);
                    return;
                }
                if (aadhaar.length !== 12) {
                    Alert.alert('Error', 'Aadhaar number must be exactly 12 digits.');
                    setIsLoading(false);
                    return;
                }
                const res = await axios.post('https://civicsync-w9yy.onrender.com/api/auth/civilian/register', { 
                    name, email, password, aadhaar_no: aadhaar 
                });
                login(res.data.user);
            }
        } catch (error) {
            let errorMsg = 'Authentication failed.';
            if (error.response && error.response.data && error.response.data.error) {
                errorMsg = error.response.data.error; // Get actual error from backend
            } else if (error.message) {
                errorMsg = error.message; // Network error or something else
            }
            Alert.alert('Error', errorMsg);
        } finally {
            setIsLoading(false);
        }
    };

    const handleOfficialSubmit = async () => {
        setIsLoading(true);
        try {
            const res = await axios.post('https://civicsync-w9yy.onrender.com/api/auth/official/login', { 
                email: officialId, 
                password: password 
            });
            login(res.data.user);
        } catch (error) {
            let errorMsg = 'Access Denied.';
            if (error.response && error.response.data && error.response.data.error) {
                errorMsg = error.response.data.error;
            }
            Alert.alert('Authentication Failed', errorMsg + "\n\nRegister via the Official Web Portal first.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
                <View style={styles.headerArea}>
                    <Image source={require('../../assets/icon.png')} style={{width: 90, height: 90, marginBottom: 16, borderRadius: 22}} />
                    <Text style={styles.brandLogo}>CivicSync</Text>
                    <Text style={styles.headlineLarge}>Welcome to CivicSync</Text>
                    <Text style={styles.bodyMedium}>Empowering citizens, transforming cities.</Text>
                </View>

                {/* Role Segmented Controller */}
                <View style={styles.segmentContainer}>
                    <TouchableOpacity
                        style={[styles.segmentTab, userRole === 'citizen' && styles.segmentTabActive]}
                        onPress={() => setUserRole('citizen')}
                    >
                        <Text style={[styles.segmentText, userRole === 'citizen' && styles.segmentTextActive]}>Citizen</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.segmentTab, userRole === 'official' && styles.segmentTabActive]}
                        onPress={() => setUserRole('official')}
                    >
                        <Text style={[styles.segmentText, userRole === 'official' && styles.segmentTextActive]}>Nagar Nigam</Text>
                    </TouchableOpacity>
                </View>

                {/* Dynamic Form Area */}
                <View style={styles.formContainer}>
                    {userRole === 'citizen' ? (
                        <View>
                            {!isLogin && (
                                <TouchableOpacity 
                                    style={styles.digilockerButton} 
                                    onPress={handleDigilockerAuth}
                                    disabled={isDigilockerLoading}
                                >
                                    <Text style={styles.digilockerText}>
                                        {isDigilockerLoading ? "Authenticating with DigiLocker..." : "🔒 Fetch KYC from DigiLocker"}
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {!isLogin && (
                                <>
                                    <Text style={styles.labelLarge}>Full Name</Text>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder="John Doe"
                                        value={name}
                                        onChangeText={setName}
                                        placeholderTextColor={Theme.colors.textSecondary}
                                    />
                                </>
                            )}

                            <Text style={styles.labelLarge}>Email Address</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="name@example.com"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={email}
                                onChangeText={setEmail}
                                placeholderTextColor={Theme.colors.textSecondary}
                            />

                            <Text style={styles.labelLarge}>Password</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="••••••••"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={Theme.colors.textSecondary}
                            />

                            {!isLogin && (
                                <>
                                    <Text style={styles.labelLarge}>Aadhaar Number (KYC)</Text>
                                    <TextInput
                                        style={styles.inputField}
                                        placeholder="XXXX-XXXX-XXXX"
                                        keyboardType="numeric"
                                        maxLength={12}
                                        value={aadhaar}
                                        onChangeText={setAadhaar}
                                        placeholderTextColor={Theme.colors.textSecondary}
                                    />
                                </>
                            )}

                            <TouchableOpacity style={styles.primaryButton} onPress={handleCitizenSubmit} disabled={isLoading}>
                                <Text style={styles.primaryButtonText}>{isLoading ? 'Please wait...' : (isLogin ? 'Log In' : 'Sign Up')}</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{marginTop: 16, alignItems: 'center'}} onPress={() => setIsLogin(!isLogin)}>
                                <Text style={{color: Theme.colors.primary, fontWeight: '600'}}>
                                    {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View>
                            <Text style={styles.labelLarge}>Official Email</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="e.g. officer@nagarnigam.in"
                                value={officialId}
                                onChangeText={setOfficialId}
                                autoCapitalize="none"
                                placeholderTextColor={Theme.colors.textSecondary}
                            />

                            <Text style={styles.labelLarge}>Password</Text>
                            <TextInput
                                style={styles.inputField}
                                placeholder="••••••••"
                                secureTextEntry
                                value={password}
                                onChangeText={setPassword}
                                placeholderTextColor={Theme.colors.textSecondary}
                            />

                            <TouchableOpacity style={styles.primaryButton} onPress={handleOfficialSubmit} disabled={isLoading}>
                                <Text style={styles.primaryButtonText}>{isLoading ? 'Authenticating...' : 'Secure Login'}</Text>
                            </TouchableOpacity>
                            <Text style={styles.securitySubtext}>
                                Authorized government personnel only. All login attempts are logged for security purposes.
                            </Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background },
    scrollContent: { paddingHorizontal: Theme.spacing.margin, paddingVertical: 60, justifyContent: 'center' },
    headerArea: { alignItems: 'center', marginBottom: Theme.spacing.large },
    brandLogo: { fontSize: 24, fontWeight: '900', color: Theme.colors.primary, marginBottom: Theme.spacing.base, letterSpacing: -1 },
    headlineLarge: { fontSize: 36, fontWeight: '800', lineHeight: 42, color: Theme.colors.textPrimary, textAlign: 'center', letterSpacing: -1 },
    bodyMedium: { fontSize: 15, color: Theme.colors.textSecondary, marginTop: Theme.spacing.base, textAlign: 'center' },
    segmentContainer: { flexDirection: 'row', backgroundColor: Theme.colors.surfaceLow, padding: 4, borderRadius: Theme.radius.full, marginBottom: Theme.spacing.large },
    segmentTab: { flex: 1, paddingVertical: 12, alignItems: 'center', borderRadius: Theme.radius.full },
    segmentTabActive: { backgroundColor: Theme.colors.surfaceCard, ...Theme.shadows.minimal },
    segmentText: { fontSize: 14, fontWeight: '600', color: Theme.colors.textSecondary },
    segmentTextActive: { fontWeight: '700', color: Theme.colors.textPrimary },
    formContainer: { width: '100%' },
    labelLarge: { fontSize: 13, fontWeight: '700', color: Theme.colors.textSecondary, marginBottom: Theme.spacing.base, textTransform: 'uppercase', letterSpacing: 0.5 },
    inputField: { height: 52, backgroundColor: Theme.colors.surfaceLow, borderRadius: Theme.radius.small, paddingHorizontal: Theme.spacing.medium, marginBottom: Theme.spacing.medium, fontSize: 16, color: Theme.colors.textPrimary },
    primaryButton: { height: 56, backgroundColor: Theme.colors.primary, borderRadius: Theme.radius.full, justifyContent: 'center', alignItems: 'center', marginTop: Theme.spacing.base, ...Theme.shadows.minimal },
    primaryButtonText: { color: Theme.colors.onPrimary, fontSize: 15, fontWeight: '700' },
    digilockerButton: { height: 50, backgroundColor: '#1A365D', borderRadius: Theme.radius.small, justifyContent: 'center', alignItems: 'center', marginBottom: Theme.spacing.large, borderWidth: 1, borderColor: '#2B6CB0' },
    digilockerText: { color: '#E2E8F0', fontSize: 14, fontWeight: '700' },
    securitySubtext: { fontSize: 13, color: Theme.colors.textSecondary, textAlign: 'center', marginTop: Theme.spacing.medium, lineHeight: 18 }
});
