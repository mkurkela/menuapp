#!/bin/bash

robot --version
which robot

robot --pythonpath libs $@
