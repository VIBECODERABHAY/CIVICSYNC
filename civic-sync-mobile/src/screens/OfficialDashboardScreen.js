import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator, Alert, Linking } from 'react-native';
import { Theme } from '../theme';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function OfficialDashboardScreen() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            const res = await axios.get('https://8c49-2401-4900-883f-b678-ddde-4fd9-f965-210f.ngrok-free.app/api/official/dashboard');
            setData(res.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchReports();
    }, []);

    const markResolved = async (id) => {
        Alert.alert(
            "Mark Resolved",
            "Are you sure you want to mark this issue as resolved and notify the citizen?",
            [
                { text: "Cancel", style: "cancel" },
                { 
                    text: "Resolve", 
                    onPress: async () => {
                        try {
                            await axios.post('https://8c49-2401-4900-883f-b678-ddde-4fd9-f965-210f.ngrok-free.app/api/official/resolve', { complaint_id: id });
                            Alert.alert('Success', 'Issue marked as resolved.');
                            fetchReports();
                        } catch(e) {
                            Alert.alert('Error', 'Failed to resolve issue.');
                        }
                    } 
                }
            ]
        );
    };

    const renderItem = ({ item }) => {
        let chipStyle, chipText;
        if (item.status === 'Pending') { chipStyle = styles.chipPending; chipText = styles.textPending; }
        else if (item.status === 'Assigned') { chipStyle = styles.chipProgress; chipText = styles.textProgress; }
        else { chipStyle = styles.chipResolved; chipText = styles.textResolved; }
        
        const isEmergency = item.title === 'Emergency';

        return (
            <View style={[styles.card, isEmergency && styles.cardEmergency]}>
                <View style={styles.cardHeader}>
                    <View style={[styles.chip, chipStyle, isEmergency && {backgroundColor: Theme.colors.error}]}>
                        <Text style={[styles.chipLabel, chipText, isEmergency && {color: Theme.colors.onError}]}>
                            {isEmergency ? 'EMERGENCY' : item.status}
                        </Text>
                    </View>
                    <Text style={styles.labelSmall}>{new Date(item.created_at).toLocaleDateString()}</Text>
                </View>
                
                <Text style={styles.headlineMedium} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.bodyMedium} numberOfLines={2}>{item.description}</Text>
                
                <View style={styles.metaDataRow}>
                    <Text style={styles.metaDataText}>📍 {item.address}</Text>
                </View>

                <View style={styles.metaDataRow}>
                    <Text style={styles.metaDataText}>👤 Reporter ID: {item.user_id || 'Anonymous'}</Text>
                </View>
                
                <Text style={styles.priorityText}>
                    🚨 AI SLA Deadline: {item.priority}
                </Text>

                {item.status !== 'Resolved' && (
                    <View style={styles.cardFooter}>
                        <TouchableOpacity style={styles.secondaryButton} onPress={() => markResolved(item.id)}>
                            <Ionicons name="checkmark-circle" size={16} color={Theme.colors.resolvedText} style={{marginRight: 6}} />
                            <Text style={styles.secondaryButtonText}>Mark Resolved</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={[styles.secondaryButton, {marginLeft: 10, backgroundColor: Theme.colors.surfaceCard, borderWidth: 1, borderColor: Theme.colors.primary}]} onPress={() => Alert.alert('Assigned', 'Work order sent to field team.')}>
                            <Ionicons name="briefcase" size={16} color={Theme.colors.primary} style={{marginRight: 6}} />
                            <Text style={[styles.secondaryButtonText, {color: Theme.colors.primary}]}>Assign</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerArea}>
                <Text style={styles.headerTitle}>Nagar Nigam Portal</Text>
                <Text style={styles.headerSubtitle}>Official Command Center</Text>
            </View>

            {loading ? <ActivityIndicator size="large" color={Theme.colors.primary} style={{marginTop: 50}} /> : (
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    contentContainerStyle={{ paddingHorizontal: Theme.spacing.margin, paddingBottom: Theme.spacing.large }}
                    refreshing={loading}
                    onRefresh={fetchReports}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background },
    headerArea: { padding: Theme.spacing.margin, paddingTop: 40, backgroundColor: Theme.colors.surfaceCard, marginBottom: Theme.spacing.base, borderBottomWidth: 1, borderBottomColor: Theme.colors.outlineVariant },
    headerTitle: { fontSize: 24, fontWeight: '800', color: Theme.colors.primary },
    headerSubtitle: { fontSize: 14, color: Theme.colors.textSecondary, marginTop: 4 },
    headlineMedium: { fontSize: 20, fontWeight: '700', color: Theme.colors.textPrimary, marginVertical: 6, letterSpacing: -0.5 },
    bodyMedium: { fontSize: 14, color: Theme.colors.textSecondary, lineHeight: 22 },
    labelSmall: { fontSize: 12, fontWeight: '600', color: Theme.colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
    card: { backgroundColor: Theme.colors.surfaceCard, borderRadius: Theme.radius.medium, padding: Theme.spacing.margin, marginBottom: Theme.spacing.medium, ...Theme.shadows.minimal },
    cardEmergency: { borderWidth: 2, borderColor: Theme.colors.error, backgroundColor: '#fff5f5' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Theme.spacing.base },
    chip: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: Theme.radius.full },
    chipLabel: { fontSize: 12, fontWeight: '800' },
    chipPending: { backgroundColor: Theme.colors.pendingBg },
    textPending: { color: Theme.colors.pendingText },
    chipProgress: { backgroundColor: Theme.colors.inProgressBg },
    textProgress: { color: Theme.colors.inProgressText },
    chipResolved: { backgroundColor: Theme.colors.resolvedBg },
    textResolved: { color: Theme.colors.resolvedText },
    metaDataRow: { marginTop: 6, flexDirection: 'row', alignItems: 'center' },
    metaDataText: { fontSize: 13, color: Theme.colors.textSecondary, fontWeight: '600' },
    priorityText: { fontSize: 13, color: Theme.colors.error, marginTop: 12, fontWeight: 'bold' },
    cardFooter: { marginTop: Theme.spacing.medium, paddingTop: Theme.spacing.base, flexDirection: 'row' },
    secondaryButton: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, paddingHorizontal: Theme.spacing.medium, backgroundColor: '#e8f5e9', borderRadius: Theme.radius.small },
    secondaryButtonText: { color: Theme.colors.resolvedText, fontSize: 14, fontWeight: '700' }
});
