#!/bin/bash          
phonegap local plugin remove "$1"; phonegap local plugin add "../plugins/$1"
