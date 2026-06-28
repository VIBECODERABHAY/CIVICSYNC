// Minimalist Theme
export const Theme = {
    colors: {
        background: '#ffffff', // Pure white
        surfaceCard: '#ffffff',
        surfaceLow: '#f8f9fa', // Ultra subtle gray for inputs
        outline: '#e5e5e5', // Almost invisible borders
        outlineVariant: '#f1f1f1',

        textPrimary: '#111111', // Pitch black text
        textSecondary: '#888888', // Soft gray

        primary: '#000000', // Pitch Black for main actions
        onPrimary: '#ffffff',
        primaryContainer: '#f1f1f1',
        onPrimaryContainer: '#000000',

        // Minimalist pastels for status
        pendingText: '#a15c00',
        pendingBg: '#fff4e5',
        inProgressText: '#004c99',
        inProgressBg: '#e5f2ff',
        resolvedText: '#1b5e20',
        resolvedBg: '#e8f5e9',

        error: '#c62828',
        errorBg: '#ffebee',
    },
    spacing: {
        base: 8,
        medium: 16,
        margin: 24, // Generous whitespace
        large: 32,
    },
    radius: {
        small: 12, // Soft inputs
        medium: 20, // Soft cards
        full: 9999,
    },
    shadows: {
        minimal: {
            elevation: 2,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 4 },
            shadowOpacity: 0.04, // Very diffuse shadow
            shadowRadius: 12,
        }
    }
};
