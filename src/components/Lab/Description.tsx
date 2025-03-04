import { Link, useNavigate } from "react-router-dom";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark as theme } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";

const code = `#include <stdio.h>

#define MAX 1000 // Maximum value an element can take

void countingSort(int arr[], int n) {
    int count[MAX + 1] = {0}; // Initialize count array with 0
    int output[n]; // Output array

    // Step 1: Count occurrences of each element
    for (int i = 0; i < n; i++) {
        count[arr[i]]++;
    }

    // Step 2: Modify count array to store cumulative sum
    for (int i = 1; i <= MAX; i++) {
        count[i] += count[i - 1];
    }

    // Step 3: Place elements in output array based on count array
    for (int i = n - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    // Step 4: Copy sorted elements back to original array
    for (int i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

// Function to print the array
void printArray(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

// Driver code
int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    printArray(arr, n);

    countingSort(arr, n);

    printf("Sorted array: ");
    printArray(arr, n);

    return 0;
}
`;

const Description = () => {
  const navigate = useNavigate();
  return (
    <div className="py-12 h-fit w-full flex justify-center items-center">
      <div className="w-[1200px] min-h-dvh  h-fit ">
        <div className="text-4xl  font-semibold flex justify-between">
          <div>Counting Sort</div>{" "}
          <Button
            onClick={() => navigate("/lab/counting-sort/simulate")}
            className="text-xl !h-fit px-4 py-2"
          >
            Simulate it <ArrowRight />
          </Button>
        </div>
        <div className="my-6">
          <div className="text-2xl font-semibold underline">Introduction</div>
          <p className="text-xl">
            Counting Sort is a non-comparative sorting algorithm that arranges
            elements by counting the occurrences of each unique value in the
            input array. It works by using an auxiliary array (count array) to
            store the frequency of each element within a specific range. After
            calculating the cumulative count, the algorithm places each element
            in its correct position in the output array. Since it relies on
            counting rather than comparisons, Counting Sort is particularly
            effective for sorting integers or elements within a limited range.
            However, it is less efficient for datasets with a large range of
            values or non-integer data.
          </p>
        </div>
        <div className="my-6">
          <div className="text-2xl font-semibold underline">Code</div>
          <SyntaxHighlighter language="javascript" style={theme}>
            {code}
          </SyntaxHighlighter>
        </div>
        <div className="my-6">
          <div className="text-2xl font-semibold underline">
            Time Complexity
          </div>
          <div className="min-h-[200px] h-fit flex flex-col gap-2 w-full items-center justify-center">
            <p className="mb-4">
              Since Counting Sort does not compare elements, it is a
              non-comparison-based sorting algorithm. It works best when 𝑘 k is
              not significantly larger than 𝑛 n. However, it is not suitable for
              sorting large numbers with a wide range, as it requires extra
              space proportional to 𝑘 k.
            </p>
            <div className="text-2xl font-bold">Best Case: O(n + k)</div>
            <div className="text-2xl font-bold">Average Case: O(n + k)</div>

            <div className="text-2xl font-bold">Worst Case: O(n + k)</div>
          </div>
        </div>
        <div className="my-6 ">
          <div className="text-2xl font-semibold underline">
            Real World Applications
          </div>
          <ul>
            <li>
              <strong>Grading System:</strong> Sorting student exam scores
              efficiently.
            </li>
            <li>
              <strong>Sorting Student Attendance Data:</strong> Organizing
              attendance records based on days attended.
            </li>
            <li>
              <strong>Electoral Vote Counting:</strong> Counting and sorting
              votes in student elections.
            </li>
            <li>
              <strong>Library Book Management:</strong> Sorting books based on
              unique numeric IDs.
            </li>
            <li>
              <strong>Sorting Student Age Groups:</strong> Arranging students by
              age in a school.
            </li>
            <li>
              <strong>Frequency Analysis in NLP:</strong> Counting occurrences
              of words or letters in a document.
            </li>
            <li>
              <strong>Sorting Roll Numbers:</strong> Efficiently organizing roll
              numbers for attendance sheets.
            </li>
            <li>
              <strong>Arranging Students by Marks:</strong> Ranking students
              based on objective test scores.
            </li>
          </ul>
        </div>
        <Link to="/lab/counting-sort/simulate" className="text-xl underline ">
          Simulate
        </Link>
      </div>
    </div>
  );
};

export default Description;
