#!/usr/bin/env bash

cd bin/

./docTemplateGenerator.js basal --subType scheduled
./docTemplateGenerator.js basal --subType temp
./docTemplateGenerator.js basal --subType suspend

./docTemplateGenerator.js bolus --subType normal
./docTemplateGenerator.js bolus --subType square
./docTemplateGenerator.js bolus --subType dual/square

./docTemplateGenerator.js bloodKetone

./docTemplateGenerator.js cbg

./docTemplateGenerator.js deviceEvent --subType alarm
./docTemplateGenerator.js deviceEvent --subType calibration
./docTemplateGenerator.js deviceEvent --subType prime
./docTemplateGenerator.js deviceEvent --subType reservoirChange
./docTemplateGenerator.js deviceEvent --subType status
./docTemplateGenerator.js deviceEvent --subType timeChange

./docTemplateGenerator.js pumpSettings

./docTemplateGenerator.js smbg

./docTemplateGenerator.js wizard

cd ../
