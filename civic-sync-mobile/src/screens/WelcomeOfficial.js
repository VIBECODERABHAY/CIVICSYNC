import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import React from 'react';

export default function WelcomeOfficial() {
  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="flex-1">
        <ScrollView className="flex-1" contentContainerStyle={{flexGrow: 1}}>
          
          {/* TopAppBar */}
          <View className="w-full bg-surface border-b border-outline-variant flex-row items-center justify-between px-4 h-16 z-50">
            <View className="flex-row items-center gap-2">
              {/* Note: In a real app we'd use Expo Vector Icons, using a text placeholder for now */}
              <Text className="text-primary font-bold text-lg">🏦</Text>
              <Text className="font-bold text-primary text-xl">CivicSync</Text>
            </View>
            <TouchableOpacity className="p-2 rounded-full hover:bg-surface-container-low">
              <Text className="text-xl text-on-surface-variant">🔔</Text>
            </TouchableOpacity>
          </View>

          {/* Official Government Blue Banner */}
          <View className="bg-primary w-full py-8 px-4 shadow-md items-center relative z-10">
            <Text className="text-on-primary text-4xl mb-4">🏛️</Text>
            <Text className="font-bold text-on-primary text-2xl mb-2 text-center">Secure Citizen Portal</Text>
            <Text className="text-inverse-primary text-base text-center max-w-sm">
              Access your civic records, file official reports, and interact with state services securely through the unified CivicSync platform.
            </Text>
          </View>

          {/* Main Content Area: Login Forms */}
          <View className="flex-1 items-center justify-start px-4 py-8 -mt-6 z-20">
            
            {/* Citizen Portal Card */}
            <View className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-6 w-full max-w-md mb-6 flex-col gap-6">
              <View className="border-b border-outline-variant pb-4 mb-2">
                <Text className="font-bold text-on-surface text-xl">Citizen Login</Text>
                <Text className="text-on-surface-variant mt-1 text-sm">Authenticate using your National ID to access civilian services.</Text>
              </View>

              <View className="flex-col gap-5">
                <View className="flex-col gap-1">
                  <Text className="font-bold text-on-surface text-sm">National ID Number</Text>
                  <TextInput 
                    className="h-12 px-4 rounded border border-outline bg-surface text-on-surface text-sm"
                    placeholder="e.g., 123-456-789"
                    placeholderTextColor="#767683"
                  />
                </View>
                <View className="flex-col gap-1">
                  <Text className="font-bold text-on-surface text-sm">Password</Text>
                  <TextInput 
                    className="h-12 px-4 rounded border border-outline bg-surface text-on-surface text-sm"
                    placeholder="••••••••"
                    secureTextEntry
                    placeholderTextColor="#767683"
                  />
                </View>
                
                <TouchableOpacity className="mt-4 h-12 w-full bg-primary rounded items-center justify-center shadow-sm">
                  <Text className="text-on-primary font-bold text-sm">Login to Citizen Portal</Text>
                </TouchableOpacity>
              </View>

              {/* Registration Banner */}
              <View className="bg-surface-container-low rounded-lg p-5 border border-outline-variant items-center gap-2 mt-4">
                <Text className="text-on-surface-variant text-2xl">📝</Text>
                <Text className="font-bold text-on-surface text-sm">Need an Account?</Text>
                <Text className="text-on-surface-variant mb-2 text-center text-xs">
                  Registering as a civilian grants you access to reporting tools and direct communication.
                </Text>
                <TouchableOpacity className="h-10 px-6 border-2 border-primary rounded items-center justify-center w-full">
                  <Text className="text-primary font-bold text-sm">Register as Civilian</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Official Portal Card */}
            <View className="bg-surface-container-lowest border border-outline-variant rounded-xl shadow-sm p-6 w-full max-w-md flex-col gap-6">
              <View className="border-b border-outline-variant pb-4 mb-2">
                <Text className="font-bold text-on-surface text-xl">Official Login</Text>
                <Text className="text-on-surface-variant mt-1 text-sm">Restricted access for authorized personnel only.</Text>
              </View>

              <View className="flex-col gap-5">
                <View className="flex-col gap-1">
                  <Text className="font-bold text-on-surface text-sm">Agency ID</Text>
                  <TextInput 
                    className="h-12 px-4 rounded border border-outline bg-surface text-on-surface text-sm"
                    placeholder="Agency-issued ID"
                    placeholderTextColor="#767683"
                  />
                </View>
                <View className="flex-col gap-1">
                  <Text className="font-bold text-on-surface text-sm">Secure PIN</Text>
                  <TextInput 
                    className="h-12 px-4 rounded border border-outline bg-surface text-on-surface text-sm text-center tracking-widest"
                    placeholder="••••"
                    secureTextEntry
                    keyboardType="numeric"
                    placeholderTextColor="#767683"
                  />
                </View>
                <TouchableOpacity className="mt-4 h-12 w-full bg-surface border border-outline rounded items-center justify-center">
                  <Text className="text-on-surface font-bold text-sm">Login as Official</Text>
                </TouchableOpacity>
              </View>

              <View className="mt-2 bg-error-container p-3 rounded flex-row gap-2 items-start">
                <Text className="text-error text-lg">⚠️</Text>
                <Text className="text-on-error-container text-xs flex-1">
                  Unauthorized access attempts to the Official Portal are logged and subject to legal prosecution.
                </Text>
              </View>
            </View>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
