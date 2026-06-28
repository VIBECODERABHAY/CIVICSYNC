@echo off
echo =======================================
echo     Starting CivicSync Servers...
echo =======================================

echo [1/3] Starting Backend Server on port 5000...
start "CivicSync Backend" cmd /k "cd backend && node server.js"

echo [2/3] Starting Expo Frontend...
start "CivicSync Mobile" cmd /k "cd civic-sync-mobile && npx expo start -c"

echo [3/3] Starting Website Portal...
start "CivicSync Web" cmd /k "cd website && npm run dev"

echo Done! Three new terminal windows have been opened for your servers.
