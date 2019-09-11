#!/bin/bash

# commented if run on linux
GOTO Windows

# Linux
./bin/app.sh gradletest
exit

:Windows
./bin/app.bat gradletest
exit

