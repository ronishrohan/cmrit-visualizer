const Description = () => {
  return (
    <div className="py-12 h-fit w-full flex justify-center items-center">
      <div className="w-[1200px] min-h-dvh  h-fit ">
        <div className="text-4xl  font-semibold">Counting Sort</div>
        <div className="my-4">
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
        <div className="my-4">
          <div className="text-2xl font-semibold underline">Code</div>
          <div className="text-xl font-mono bg-black text-white p-4 rounded-md">
            <pre>
              <code>
                {`#include <stdio.h>
#include <string.h>

#define MAX_VALUE 1000

void countingSort(int arr[], int size) {
    int output[size];
    int count[MAX_VALUE + 1];

    memset(count, 0, sizeof(count));

    for (int i = 0; i < size; i++) {
        count[arr[i]]++;
    }

    for (int i = 1; i <= MAX_VALUE; i++) {
        count[i] += count[i - 1];
    }

    for (int i = size - 1; i >= 0; i--) {
        output[count[arr[i]] - 1] = arr[i];
        count[arr[i]]--;
    }

    for (int i = 0; i < size; i++) {
        arr[i] = output[i];
    }
}

void printArray(int arr[], int size) {
    for (int i = 0; i < size; i++) {
        printf("%d ", arr[i]);
    }
    printf("\\n");
}

int main() {
    int arr[] = {4, 2, 2, 8, 3, 3, 1};
    int size = sizeof(arr) / sizeof(arr[0]);

    printf("Original array: ");
    printArray(arr, size);

    countingSort(arr, size);

    printf("Sorted array: ");
    printArray(arr, size);

    return 0;
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
