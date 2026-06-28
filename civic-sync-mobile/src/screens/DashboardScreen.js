import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Theme } from '../theme';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function DashboardScreen() {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchReports = async () => {
        try {
            const res = await axios.get('https://civicsync-w9yy.onrender.com/api/reports');
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

    const renderItem = ({ item }) => {
        let chipStyle, chipText;
        if (item.status === 'Pending') { chipStyle = styles.chipPending; chipText = styles.textPending; }
        else if (item.status === 'In Progress') { chipStyle = styles.chipProgress; chipText = styles.textProgress; }
        else { chipStyle = styles.chipResolved; chipText = styles.textResolved; }

        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={[styles.chip, chipStyle]}>
                        <Text style={[styles.chipLabel, chipText]}>{item.status}</Text>
                    </View>
                    <Text style={styles.labelSmall}>{new Date(item.created_at).toLocaleDateString()}</Text>
                </View>
                <Text style={styles.headlineMedium} numberOfLines={1}>{item.title}</Text>
                <Text style={styles.bodyMedium} numberOfLines={2}>{item.description}</Text>
                
                <Text style={{fontSize: 12, color: Theme.colors.error, marginTop: 6, fontWeight: 'bold'}}>
                    SLA Priority: {item.priority}
                </Text>

                <View style={styles.cardFooter}>
                    <TouchableOpacity style={styles.secondaryButton}>
                        <Ionicons name="caret-up" size={14} color={Theme.colors.textPrimary} style={{marginRight: 4}} />
                        <Text style={styles.secondaryButtonText}>Upvote Issue</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Metrics Banner */}
            <View style={styles.metricsRow}>
                <View style={styles.metricItem}>
                    <Text style={styles.headlineLarge}>{data.length}</Text>
                    <Text style={styles.labelSmall}>Active Submissions</Text>
                </View>
                <View style={[styles.metricItem, { borderLeftWidth: 1, borderColor: Theme.colors.outlineVariant }]}>
                    <Text style={styles.headlineLarge}>148</Text>
                    <Text style={styles.labelSmall}>Ward Fixes This Month</Text>
                </View>
            </View>

            <Text style={[styles.headlineMedium, { marginHorizontal: Theme.spacing.margin, marginBottom: Theme.spacing.base }]}>
                Live Community Issues
            </Text>

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

            {/* Floating Action Button */}
            <TouchableOpacity style={styles.fab} onPress={() => navigation.navigate('Report')}>
                <Ionicons name="add" size={20} color={Theme.colors.onPrimary} style={{marginRight: 6}} />
                <Text style={styles.fabText}>New Issue</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Theme.colors.background },
    metricsRow: { flexDirection: 'row', backgroundColor: Theme.colors.surfaceCard, margin: Theme.spacing.margin, borderRadius: Theme.radius.medium, padding: Theme.spacing.medium, ...Theme.shadows.minimal, marginTop: 40 },
    metricItem: { flex: 1, alignItems: 'center' },
    headlineLarge: { fontSize: 36, fontWeight: '800', color: Theme.colors.primary, letterSpacing: -1 },
    headlineMedium: { fontSize: 20, fontWeight: '700', color: Theme.colors.textPrimary, marginVertical: 6, letterSpacing: -0.5 },
    bodyMedium: { fontSize: 14, color: Theme.colors.textSecondary, lineHeight: 22 },
    labelSmall: { fontSize: 12, fontWeight: '600', color: Theme.colors.textSecondary, textTransform: 'uppercase', letterSpacing: 0.5 },
    fab: { position: 'absolute', bottom: 24, right: Theme.spacing.margin, backgroundColor: Theme.colors.primary, paddingHorizontal: 20, paddingVertical: 14, borderRadius: Theme.radius.full, flexDirection: 'row', alignItems: 'center', elevation: 6, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, zIndex: 100 },
    fabText: { color: Theme.colors.onPrimary, fontSize: 15, fontWeight: '700' },
    card: { backgroundColor: Theme.colors.surfaceCard, borderRadius: Theme.radius.medium, padding: Theme.spacing.margin, marginBottom: Theme.spacing.medium, ...Theme.shadows.minimal },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: Theme.spacing.base },
    chip: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: Theme.radius.full },
    chipLabel: { fontSize: 12, fontWeight: '800' },
    chipPending: { backgroundColor: Theme.colors.pendingBg },
    textPending: { color: Theme.colors.pendingText },
    chipProgress: { backgroundColor: Theme.colors.inProgressBg },
    textProgress: { color: Theme.colors.inProgressText },
    chipResolved: { backgroundColor: Theme.colors.resolvedBg },
    textResolved: { color: Theme.colors.resolvedText },
    cardFooter: { marginTop: Theme.spacing.medium, paddingTop: Theme.spacing.base },
    secondaryButton: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', paddingVertical: 8, paddingHorizontal: Theme.spacing.medium, backgroundColor: Theme.colors.surfaceLow, borderRadius: Theme.radius.full },
    secondaryButtonText: { color: Theme.colors.textPrimary, fontSize: 13, fontWeight: '700' }
});
