import React, { useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { Theme } from '../theme';
import { AuthContext } from '../../App';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const { user, logout } = useContext(AuthContext);
    
    // Determine if user is official based on role
    const isOfficial = user?.role === 'official';

    // Citizen logic
    const pointsPerComplaint = 50;
    const complaintsFiled = user?.complaints_filed || 0;
    const civicScore = complaintsFiled * pointsPerComplaint;
    let rank = 'Bronze Citizen';
    if (civicScore >= 500) rank = 'Gold Citizen';
    else if (civicScore >= 200) rank = 'Silver Citizen';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.header}>
                    <View style={[styles.avatarCircle, isOfficial && { backgroundColor: Theme.colors.secondary }]}>
                        <Ionicons name={isOfficial ? "briefcase" : "person"} size={40} color={Theme.colors.onPrimary} />
                    </View>
                    <Text style={styles.headlineLarge}>{user?.name || (isOfficial ? 'Nagar Nigam Officer' : 'Citizen')}</Text>
                    <Text style={styles.bodyMedium}>{user?.email}</Text>
                    
                    {isOfficial ? (
                        <Text style={[styles.kycTag, { backgroundColor: '#e3f2fd', color: '#1565c0' }]}>
                            <Ionicons name="business" size={12} color="#1565c0" /> {user?.agency_id ? `Agency ID: ${user.agency_id}` : 'Authority Verified'}
                        </Text>
                    ) : (
                        user?.aadhaar_no && (
                            <Text style={styles.kycTag}>
                                <Ionicons name="shield-checkmark" size={12} color="#1b5e20" /> KYC Verified
                            </Text>
                        )
                    )}
                </View>

                {isOfficial ? (
                    // OFFICIAL UI
                    <>
                        <View style={styles.statsCard}>
                            <View style={styles.statItem}>
                                <Ionicons name="construct" size={28} color="#FF9800" />
                                <Text style={styles.statValue}>12</Text>
                                <Text style={styles.statLabel}>Tasks Assigned</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.statItem}>
                                <Ionicons name="checkmark-done-circle" size={28} color="#4CAF50" />
                                <Text style={styles.statValue}>45</Text>
                                <Text style={styles.statLabel}>Tasks Resolved</Text>
                            </View>
                        </View>

                        <Text style={styles.sectionTitle}>Command Center Controls</Text>
                        <View style={styles.controlsGrid}>
                            <TouchableOpacity style={styles.controlBox} onPress={() => alert('Dispatching Field Team for Maintenance...')}>
                                <View style={[styles.iconBox, { backgroundColor: '#fff3e0' }]}>
                                    <Ionicons name="car-sport" size={24} color="#f57c00" />
                                </View>
                                <Text style={styles.controlText}>Dispatch Team</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.controlBox} onPress={() => alert('Opening inventory for Light Delivery & Fixes...')}>
                                <View style={[styles.iconBox, { backgroundColor: '#e3f2fd' }]}>
                                    <Ionicons name="bulb" size={24} color="#1976d2" />
                                </View>
                                <Text style={styles.controlText}>Inventory</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.controlBox} onPress={() => alert('Opening IT Support Ticket...')}>
                                <View style={[styles.iconBox, { backgroundColor: '#fce4ec' }]}>
                                    <Ionicons name="headset" size={24} color="#c2185b" />
                                </View>
                                <Text style={styles.controlText}>IT Support</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.controlBox} onPress={() => alert('Managing Contractor Work Orders...')}>
                                <View style={[styles.iconBox, { backgroundColor: '#e8f5e9' }]}>
                                    <Ionicons name="document-text" size={24} color="#388e3c" />
                                </View>
                                <Text style={styles.controlText}>Work Orders</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    // CITIZEN UI
                    <>
                        <View style={styles.statsCard}>
                            <View style={styles.statItem}>
                                <Ionicons name="medal" size={28} color="#FFD700" />
                                <Text style={styles.statValue}>{civicScore}</Text>
                                <Text style={styles.statLabel}>Civic Score</Text>
                            </View>
                            <View style={styles.divider} />
                            <View style={styles.statItem}>
                                <Ionicons name="document-text" size={28} color={Theme.colors.primary} />
                                <Text style={styles.statValue}>{complaintsFiled}</Text>
                                <Text style={styles.statLabel}>Reports Filed</Text>
                            </View>
                        </View>

                        <View style={styles.rankContainer}>
                            <Text style={styles.rankTitle}>Current Rank: <Text style={{fontWeight: '800'}}>{rank}</Text></Text>
                            <Text style={styles.rankSubtitle}>
                                {rank === 'Bronze Citizen' ? 'File 4 more reports to level up!' : 'Keep making your city better!'}
                            </Text>
                        </View>
                    </>
                )}

                <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                    <Ionicons name="log-out-outline" size={20} color={Theme.colors.error} style={{marginRight: 8}} />
                    <Text style={styles.logoutText}>Log Out</Text>
                </TouchableOpacity>
                <View style={{height: 40}} />
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background, padding: Theme.spacing.margin },
    header: { alignItems: 'center', marginTop: 40, marginBottom: Theme.spacing.large },
    avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: Theme.colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: Theme.spacing.medium, ...Theme.shadows.minimal },
    headlineLarge: { fontSize: 28, fontWeight: '800', color: Theme.colors.textPrimary, letterSpacing: -0.5 },
    bodyMedium: { fontSize: 14, color: Theme.colors.textSecondary, marginTop: 4 },
    kycTag: { marginTop: 8, backgroundColor: '#e8f5e9', color: '#1b5e20', paddingHorizontal: 10, paddingVertical: 5, borderRadius: 12, fontSize: 12, fontWeight: 'bold', overflow: 'hidden' },
    statsCard: { flexDirection: 'row', backgroundColor: Theme.colors.surfaceCard, borderRadius: Theme.radius.medium, padding: Theme.spacing.margin, ...Theme.shadows.minimal, marginBottom: Theme.spacing.large },
    statItem: { flex: 1, alignItems: 'center' },
    divider: { width: 1, backgroundColor: Theme.colors.outlineVariant },
    statValue: { fontSize: 24, fontWeight: '800', color: Theme.colors.textPrimary, marginTop: 8 },
    statLabel: { fontSize: 12, fontWeight: '600', color: Theme.colors.textSecondary, textTransform: 'uppercase', marginTop: 4 },
    rankContainer: { backgroundColor: Theme.colors.surfaceLow, padding: Theme.spacing.margin, borderRadius: Theme.radius.small, alignItems: 'center', marginBottom: 30 },
    rankTitle: { fontSize: 16, color: Theme.colors.textPrimary },
    rankSubtitle: { fontSize: 12, color: Theme.colors.textSecondary, marginTop: 4 },
    sectionTitle: { fontSize: 16, fontWeight: '700', color: Theme.colors.textPrimary, marginBottom: 12, marginTop: 10 },
    controlsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 30 },
    controlBox: { width: '48%', backgroundColor: '#fff', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 16, ...Theme.shadows.minimal, borderWidth: 1, borderColor: Theme.colors.outlineVariant },
    iconBox: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
    controlText: { fontSize: 13, fontWeight: '700', color: Theme.colors.textPrimary, textAlign: 'center' },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, backgroundColor: Theme.colors.errorBg, borderRadius: Theme.radius.full },
    logoutText: { color: Theme.colors.error, fontSize: 15, fontWeight: '700' }
});
