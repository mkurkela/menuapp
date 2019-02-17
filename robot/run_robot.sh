#!/bin/bash

robot --version

export DISPLAY=:0

python3 -m robot --pythonpath libs $@
