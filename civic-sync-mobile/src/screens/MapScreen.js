import React, { useState, useCallback } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import * as Location from 'expo-location';
import { Theme } from '../theme';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function MapScreen() {
    const [markers, setMarkers] = useState([]);
    const [region, setRegion] = useState({
        latitude: 27.4924,
        longitude: 77.6737,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
    });

    useFocusEffect(
        useCallback(() => {
            const fetchData = async () => {
                // Get Live GPS Location
                let { status } = await Location.requestForegroundPermissionsAsync();
                if (status === 'granted') {
                    let loc = await Location.getCurrentPositionAsync({});
                    setRegion({
                        latitude: loc.coords.latitude,
                        longitude: loc.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                    });
                }

                // Fetch Database Pins
                try {
                    const res = await axios.get('https://civicsync-w9yy.onrender.com/api/reports');
                    setMarkers(res.data);
                } catch (error) {
                    console.error(error);
                }
            };
            fetchData();
        }, [])
    );

    const getMarkerColor = (status) => {
        if (status === 'Pending') return Theme.colors.error; // Red
        if (status === 'In Progress') return Theme.colors.primaryContainer; // Blue
        return Theme.colors.resolvedText; // Green
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                region={region}
                showsUserLocation={true}
                showsMyLocationButton={true}
            >
                {markers.map((marker) => {
                    // Safety check if lat/lng are empty
                    if (!marker.lat || !marker.lng) return null;
                    
                    return (
                        <Marker
                            key={marker.id}
                            coordinate={{ latitude: marker.lat, longitude: marker.lng }}
                            title={marker.title}
                            description={`Status: ${marker.status} | Priority: ${marker.priority}`}
                            pinColor={getMarkerColor(marker.status)}
                        />
                    );
                })}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
    fab: {
        position: 'absolute',
        bottom: Theme.spacing.margin,
        right: Theme.spacing.margin,
        backgroundColor: Theme.colors.primary,
        paddingHorizontal: 20,
        paddingVertical: 14,
        borderRadius: Theme.radius.full,
        flexDirection: 'row',
        alignItems: 'center',
        // Level 2 Shadow Specs from your scheme
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 8,
    },
    fabText: { color: Theme.colors.onPrimary, fontWeight: '600', fontSize: 14 }
});
