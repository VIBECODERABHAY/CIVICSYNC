@echo off
echo =======================================
echo     Starting CivicSync Servers...
echo =======================================

echo [1/2] Starting Expo Frontend (Mobile App)...
start "CivicSync Mobile" cmd /k "cd civic-sync-mobile && npx expo start -c --tunnel"

echo [2/2] Starting Website Portal...
start "CivicSync Web" cmd /k "cd website && npm run dev"

echo Done! Two new terminal windows have been opened for your apps.
