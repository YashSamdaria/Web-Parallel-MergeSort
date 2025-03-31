#include <iostream>
#include <vector>
#include <string>
#include <chrono>
#include <cstdlib>
#include "mergeSort.hpp"
#include "parallelMergeSort.hpp"

int main(int argc, char *argv[]) {
    if (argc != 3) {
        std::cerr << "Usage: main.exe <size> <order>" << std::endl;
        return 1;
    }

    int SIZE = std::stoi(argv[1]);  
    std::string order = argv[2];    

    if (order != "ascending" && order != "descending" && order != "random") {
        std::cerr << "Invalid order. Use 'ascending', 'descending', or 'random'." << std::endl;
        return 1;
    }

    std::vector<int> nums(SIZE);
    std::vector<int> nums1(SIZE);

    if (order == "ascending") {
        for (int i = 0; i < SIZE; ++i) nums[i] = nums1[i] = i;
    } else if (order == "descending") {
        for (int i = 0; i < SIZE; ++i) nums[i] = nums1[i] = SIZE - i;
    } else {
        srand(time(0));
        for (int i = 0; i < SIZE; ++i) nums[i] = nums1[i] = rand() % 1000000;
    }

    MergeSort mergesort(&nums);
    auto start = std::chrono::high_resolution_clock::now();
    mergesort.sort();
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> mergeSortDuration = end - start;

    ParallelMergeSort mergesort1(&nums1);
    start = std::chrono::high_resolution_clock::now();
    mergesort1.sort();
    end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> parallelMergeSortDuration = end - start;

    std::cout << "MergeSort time taken: " << mergeSortDuration.count() << " seconds" << std::endl;
    std::cout << "Parallel MergeSort time taken: " << parallelMergeSortDuration.count() << " seconds" << std::endl;

    return 0;
}
