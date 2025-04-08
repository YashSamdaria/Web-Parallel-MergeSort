#!/bin/bash

# Navigate to the directory containing this script
cd "$(dirname "$0")"

# Compile the C++ source files
g++ sort/main.cpp sort/mergeSort.cpp sort/parallelMergeSort.cpp -o main

# Check if the compilation was successful
if [ $? -eq 0 ]; then
    # Set execute permission for the compiled binary
    chmod +x main
    echo "Compilation successful. Executable 'main' is ready."
else
    echo "Compilation failed."
    exit 1
fi
