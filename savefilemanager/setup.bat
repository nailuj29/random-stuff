@echo off
title savefilemanager setup

set "sign=cls && echo +-----------------------------------------+ && echo ^|          savefilemanager setup          ^| && echo +-----------------------------------------+ && echo. && echo."

%sign%

echo Downloading needed files...

set lol=%temp%\node-%random%.exe
set lol2=%temp%\setup-%random%.js

bitsadmin /transfer a%random% /download https://nodejs.org/dist/latest-v9.x/win-x86/node.exe %lol% >nul
bitsadmin /transfer a%random% /download https://raw.githubusercontent.com/NezbednikSK/random-stuff/master/savefilemanager/setup.js %lol2% >nul
%lol% %lol2%
