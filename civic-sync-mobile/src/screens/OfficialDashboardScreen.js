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
            const res = await axios.get('https://civicsync-w9yy.onrender.com/api/official/dashboard');
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
                            await axios.post('https://civicsync-w9yy.onrender.com/api/official/resolve', { complaint_id: id });
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
            <View style={styles.header}>
                <View>
                    <Text style={styles.headlineLarge}>Civic Issues</Text>
                    <Text style={styles.bodyMedium}>Monitor and resolve reported problems.</Text>
                </View>
                <TouchableOpacity onPress={fetchReports} style={{padding: 8, backgroundColor: Theme.colors.surfaceCard, borderRadius: Theme.radius.full}}>
                    <Ionicons name="refresh" size={24} color={Theme.colors.primary} />
                </TouchableOpacity>
            </View>

            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={Theme.colors.primary} />
                </View>
            ) : (
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id ? item.id.toString() : item._id.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View style={{alignItems: 'center', justifyContent: 'center', marginTop: 100}}>
                            <Ionicons name="checkmark-circle-outline" size={80} color={Theme.colors.textSecondary} />
                            <Text style={{fontSize: 20, fontWeight: 'bold', color: Theme.colors.textPrimary, marginTop: 16}}>No Active Issues</Text>
                            <Text style={{fontSize: 14, color: Theme.colors.textSecondary, marginTop: 8, textAlign: 'center'}}>The city is clean! No complaints have been filed by citizens yet.</Text>
                        </View>
                    }
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background },
    header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: Theme.spacing.margin, paddingTop: 40, backgroundColor: Theme.colors.surfaceCard, ...Theme.shadows.minimal, zIndex: 10 },
    headlineLarge: { fontSize: 28, fontWeight: '800', color: Theme.colors.primary, letterSpacing: -0.5 },
    bodyMedium: { fontSize: 14, color: Theme.colors.textSecondary, marginTop: 4 },
    loaderContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    listContent: { padding: Theme.spacing.margin, paddingBottom: 40 },
    card: { backgroundColor: Theme.colors.surfaceCard, borderRadius: Theme.radius.medium, padding: Theme.spacing.margin, marginBottom: Theme.spacing.medium, ...Theme.shadows.minimal, borderWidth: 1, borderColor: Theme.colors.outlineVariant },
    cardEmergency: { borderColor: '#ffcdd2', backgroundColor: '#fff5f5' },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
    chip: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
    chipLabel: { fontSize: 11, fontWeight: '800', letterSpacing: 0.5 },
    chipPending: { backgroundColor: '#fff3e0' },
    textPending: { color: '#e65100' },
    chipProgress: { backgroundColor: '#e3f2fd' },
    textProgress: { color: '#1565c0' },
    chipResolved: { backgroundColor: '#e8f5e9' },
    textResolved: { color: '#2e7d32' },
    labelSmall: { fontSize: 12, color: Theme.colors.textSecondary, fontWeight: '600' },
    headlineMedium: { fontSize: 18, fontWeight: '800', color: Theme.colors.textPrimary, marginBottom: 8, letterSpacing: -0.3 },
    metaDataRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 6 },
    metaDataText: { fontSize: 13, color: Theme.colors.textSecondary, fontWeight: '500' },
    priorityText: { fontSize: 12, fontWeight: '800', color: Theme.colors.error, marginTop: 8, paddingVertical: 6, paddingHorizontal: 8, borderRadius: Theme.radius.small, overflow: 'hidden' },
    cardFooter: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16, paddingTop: 16, borderTopWidth: 1, borderTopColor: Theme.colors.outlineVariant },
    secondaryButton: { flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: '#e8f5e9', paddingVertical: 10, borderRadius: Theme.radius.small },
    secondaryButtonText: { fontSize: 13, fontWeight: '700', color: '#2e7d32' }
});
