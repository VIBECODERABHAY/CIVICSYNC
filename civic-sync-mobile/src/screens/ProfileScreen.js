import React, { useContext } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity } from 'react-native';
import { Theme } from '../theme';
import { AuthContext } from '../../App';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
    const { user, logout } = useContext(AuthContext);
    
    // Mock score logic based on complaints filed
    const pointsPerComplaint = 50;
    const complaintsFiled = user?.complaints_filed || 0;
    const civicScore = complaintsFiled * pointsPerComplaint;
    
    let rank = 'Bronze Citizen';
    if (civicScore >= 500) rank = 'Gold Citizen';
    else if (civicScore >= 200) rank = 'Silver Citizen';

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.avatarCircle}>
                    <Ionicons name="person" size={40} color={Theme.colors.onPrimary} />
                </View>
                <Text style={styles.headlineLarge}>{user?.name || 'Citizen'}</Text>
                <Text style={styles.bodyMedium}>{user?.email}</Text>
                {user?.aadhaar_no && (
                    <Text style={styles.kycTag}>
                        <Ionicons name="shield-checkmark" size={12} color="#1b5e20" /> KYC Verified
                    </Text>
                )}
            </View>

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

            <TouchableOpacity style={styles.logoutButton} onPress={logout}>
                <Ionicons name="log-out-outline" size={20} color={Theme.colors.error} style={{marginRight: 8}} />
                <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background, padding: Theme.spacing.margin },
    header: { alignItems: 'center', marginTop: 40, marginBottom: Theme.spacing.large },
    avatarCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: Theme.colors.primary, justifyContent: 'center', alignItems: 'center', marginBottom: Theme.spacing.medium, ...Theme.shadows.minimal },
    headlineLarge: { fontSize: 28, fontWeight: '800', color: Theme.colors.textPrimary, letterSpacing: -0.5 },
    bodyMedium: { fontSize: 14, color: Theme.colors.textSecondary, marginTop: 4 },
    kycTag: { marginTop: 8, backgroundColor: '#e8f5e9', color: '#1b5e20', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, fontSize: 11, fontWeight: 'bold', overflow: 'hidden' },
    statsCard: { flexDirection: 'row', backgroundColor: Theme.colors.surfaceCard, borderRadius: Theme.radius.medium, padding: Theme.spacing.margin, ...Theme.shadows.minimal, marginBottom: Theme.spacing.large },
    statItem: { flex: 1, alignItems: 'center' },
    divider: { width: 1, backgroundColor: Theme.colors.outlineVariant },
    statValue: { fontSize: 24, fontWeight: '800', color: Theme.colors.textPrimary, marginTop: 8 },
    statLabel: { fontSize: 12, fontWeight: '600', color: Theme.colors.textSecondary, textTransform: 'uppercase', marginTop: 4 },
    rankContainer: { backgroundColor: Theme.colors.surfaceLow, padding: Theme.spacing.margin, borderRadius: Theme.radius.small, alignItems: 'center', marginBottom: 40 },
    rankTitle: { fontSize: 16, color: Theme.colors.textPrimary },
    rankSubtitle: { fontSize: 12, color: Theme.colors.textSecondary, marginTop: 4 },
    logoutButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 14, backgroundColor: Theme.colors.errorBg, borderRadius: Theme.radius.full },
    logoutText: { color: Theme.colors.error, fontSize: 15, fontWeight: '700' }
});
