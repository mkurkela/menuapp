#!/bin/bash

robot --version
which robot

python3 -m robot --pythonpath libs $@
