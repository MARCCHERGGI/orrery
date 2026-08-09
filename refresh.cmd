@echo off
rem Scheduled fleet refresh: regenerate data/fleet.json from warden health, push to GitHub.
rem The live page pulls data from raw.githubusercontent.com — a push IS the publish.
rem No vercel deploy here: data freshness must never spend deploy quota.
cd /d C:\Users\hergi\OneDrive\Documents\Playground\orrery
echo [%date% %time%] refresh start >> refresh.log
node gen-data.mjs >> refresh.log 2>&1 || (echo [%date% %time%] gen-data FAILED >> refresh.log & exit /b 1)
git diff --quiet -- data/fleet.json && (echo [%date% %time%] no change >> refresh.log & exit /b 0)
git add data/fleet.json >> refresh.log 2>&1
git commit -m "data: scheduled fleet refresh" >> refresh.log 2>&1
git push origin main >> refresh.log 2>&1
echo [%date% %time%] pushed >> refresh.log
