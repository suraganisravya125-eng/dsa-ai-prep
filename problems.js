// problems.js — DSA Problem Bank with code templates

const PROBLEMS = [
  {
    id: 1,
    name: "Two Sum",
    difficulty: "easy",
    topic: "Arrays & Hashing",
    tags: ["array", "hashmap", "O(n)"],
    description: "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. You may assume exactly one solution exists, and you cannot use the same element twice.",
    examples: "Input: nums = [2,7,11,15], target = 9 → Output: [0,1]",
    templates: {
      python: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Your solution here
    # Hint: Think about using a hashmap to store seen values
    seen = {}
    for i, num in enumerate(nums):
        pass  # complete this
    return []

# Test
print(two_sum([2,7,11,15], 9))   # [0,1]
print(two_sum([3,2,4], 6))        # [1,2]`,
      java: `import java.util.*;

public class TwoSum {
    public int[] twoSum(int[] nums, int target) {
        // Your solution here
        Map<Integer, Integer> seen = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            // complete this
        }
        return new int[]{};
    }

    public static void main(String[] args) {
        TwoSum sol = new TwoSum();
        System.out.println(Arrays.toString(sol.twoSum(new int[]{2,7,11,15}, 9)));
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    // Your solution here
    unordered_map<int, int> seen;
    for (int i = 0; i < nums.size(); i++) {
        // complete this
    }
    return {};
}

int main() {
    vector<int> nums = {2, 7, 11, 15};
    auto result = twoSum(nums, 9);
    cout << result[0] << ", " << result[1] << endl;
}`
    }
  },
  {
    id: 2,
    name: "Valid Parentheses",
    difficulty: "easy",
    topic: "Stack",
    tags: ["stack", "string", "O(n)"],
    description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. Open brackets must be closed by the same type and in correct order.",
    examples: "Input: '()[]{}' → true | Input: '([)]' → false",
    templates: {
      python: `def is_valid(s: str) -> bool:
    # Use a stack to match brackets
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for char in s:
        pass  # complete this
    return len(stack) == 0

print(is_valid("()[]{}"))  # True
print(is_valid("([)]"))    # False`,
      java: `import java.util.*;

public class ValidParentheses {
    public boolean isValid(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            // complete this
        }
        return stack.isEmpty();
    }
}`,
      cpp: `#include <iostream>
#include <stack>
#include <string>
using namespace std;

bool isValid(string s) {
    stack<char> st;
    for (char c : s) {
        // complete this
    }
    return st.empty();
}

int main() {
    cout << isValid("()[]{}") << endl; // 1
    cout << isValid("([)]") << endl;   // 0
}`
    }
  },
  {
    id: 3,
    name: "Binary Search",
    difficulty: "easy",
    topic: "Binary Search",
    tags: ["binary search", "array", "O(log n)"],
    description: "Given an array of integers sorted in ascending order, and a target integer, return the index if the target is found. If not, return -1. You must write an algorithm with O(log n) runtime complexity.",
    examples: "Input: nums=[-1,0,3,5,9,12], target=9 → Output: 4",
    templates: {
      python: `def binary_search(nums: list[int], target: int) -> int:
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        # complete this
        pass
    return -1

print(binary_search([-1,0,3,5,9,12], 9))  # 4
print(binary_search([-1,0,3,5,9,12], 2))  # -1`,
      java: `public class BinarySearch {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            // complete this
        }
        return -1;
    }
}`,
      cpp: `#include <iostream>
#include <vector>
using namespace std;

int search(vector<int>& nums, int target) {
    int left = 0, right = nums.size() - 1;
    while (left <= right) {
        int mid = left + (right - left) / 2;
        // complete this
    }
    return -1;
}`
    }
  },
  {
    id: 4,
    name: "Maximum Subarray",
    difficulty: "medium",
    topic: "Dynamic Programming",
    tags: ["dp", "kadane's", "array"],
    description: "Given an integer array nums, find the subarray with the largest sum and return its sum. (Kadane's Algorithm is the key insight here.)",
    examples: "Input: [-2,1,-3,4,-1,2,1,-5,4] → Output: 6 (subarray [4,-1,2,1])",
    templates: {
      python: `def max_subarray(nums: list[int]) -> int:
    # Kadane's Algorithm
    max_sum = nums[0]
    current = nums[0]
    for num in nums[1:]:
        # complete this
        pass
    return max_sum

print(max_subarray([-2,1,-3,4,-1,2,1,-5,4]))  # 6`,
      java: `public class MaxSubarray {
    public int maxSubArray(int[] nums) {
        int maxSum = nums[0], current = nums[0];
        for (int i = 1; i < nums.length; i++) {
            // Kadane's: complete this
        }
        return maxSum;
    }
}`,
      cpp: `#include <iostream>
#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int maxSum = nums[0], current = nums[0];
    for (int i = 1; i < nums.size(); i++) {
        // Kadane's: complete this
    }
    return maxSum;
}`
    }
  },
  {
    id: 5,
    name: "Linked List Cycle",
    difficulty: "medium",
    topic: "Linked List",
    tags: ["linked list", "fast-slow pointer", "Floyd's"],
    description: "Given the head of a linked list, determine if the linked list has a cycle in it using O(1) extra memory. Use Floyd's cycle detection (fast & slow pointer).",
    examples: "Input: 3→1→2→4→(back to 1) → Output: true",
    templates: {
      python: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def has_cycle(head) -> bool:
    # Floyd's Tortoise & Hare
    slow, fast = head, head
    while fast and fast.next:
        slow = slow.next
        fast = fast.next.next
        if slow == fast:
            return True
    return False`,
      java: `public class LinkedListCycle {
    class ListNode {
        int val; ListNode next;
        ListNode(int val) { this.val = val; }
    }

    public boolean hasCycle(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            if (slow == fast) return true;
        }
        return false;
    }
}`,
      cpp: `struct ListNode {
    int val; ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

bool hasCycle(ListNode* head) {
    ListNode* slow = head;
    ListNode* fast = head;
    while (fast && fast->next) {
        slow = slow->next;
        fast = fast->next->next;
        if (slow == fast) return true;
    }
    return false;
}`
    }
  },
  {
    id: 6,
    name: "Lowest Common Ancestor",
    difficulty: "medium",
    topic: "Binary Tree",
    tags: ["BST", "recursion", "tree"],
    description: "Given a binary search tree and two nodes p and q, find their lowest common ancestor. The LCA is defined as the lowest node that has both p and q as descendants.",
    examples: "BST: [6,2,8,0,4,7,9], p=2, q=8 → LCA=6",
    templates: {
      python: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def lowest_common_ancestor(root, p, q):
    if not root:
        return None
    # BST property: if both < root, go left; both > root, go right
    if p.val < root.val and q.val < root.val:
        return lowest_common_ancestor(root.left, p, q)
    elif p.val > root.val and q.val > root.val:
        return lowest_common_ancestor(root.right, p, q)
    return root`,
      java: `public class LCA {
    class TreeNode {
        int val; TreeNode left, right;
        TreeNode(int val) { this.val = val; }
    }

    public TreeNode lowestCommonAncestor(TreeNode root, TreeNode p, TreeNode q) {
        if (root == null) return null;
        if (p.val < root.val && q.val < root.val)
            return lowestCommonAncestor(root.left, p, q);
        if (p.val > root.val && q.val > root.val)
            return lowestCommonAncestor(root.right, p, q);
        return root;
    }
}`,
      cpp: `struct TreeNode {
    int val; TreeNode *left, *right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

TreeNode* lowestCommonAncestor(TreeNode* root, TreeNode* p, TreeNode* q) {
    if (!root) return nullptr;
    if (p->val < root->val && q->val < root->val)
        return lowestCommonAncestor(root->left, p, q);
    if (p->val > root->val && q->val > root->val)
        return lowestCommonAncestor(root->right, p, q);
    return root;
}`
    }
  },
  {
    id: 7,
    name: "Coin Change",
    difficulty: "medium",
    topic: "Dynamic Programming",
    tags: ["dp", "bottom-up", "greedy won't work"],
    description: "Given an array of coin denominations and an amount, return the minimum number of coins needed to make up that amount. Return -1 if it's not possible.",
    examples: "coins=[1,5,11], amount=15 → 3 (5+5+5). coins=[1,5,11], amount=15 → also consider 11+4?",
    templates: {
      python: `def coin_change(coins: list[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i:
                dp[i] = min(dp[i], dp[i - coin] + 1)
    return dp[amount] if dp[amount] != float('inf') else -1

print(coin_change([1,5,11], 15))  # 3`,
      java: `import java.util.Arrays;

public class CoinChange {
    public int coinChange(int[] coins, int amount) {
        int[] dp = new int[amount + 1];
        Arrays.fill(dp, amount + 1);
        dp[0] = 0;
        for (int i = 1; i <= amount; i++) {
            for (int coin : coins) {
                if (coin <= i)
                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);
            }
        }
        return dp[amount] > amount ? -1 : dp[amount];
    }
}`,
      cpp: `#include <vector>
#include <algorithm>
using namespace std;

int coinChange(vector<int>& coins, int amount) {
    vector<int> dp(amount + 1, amount + 1);
    dp[0] = 0;
    for (int i = 1; i <= amount; i++) {
        for (int coin : coins) {
            if (coin <= i)
                dp[i] = min(dp[i], dp[i - coin] + 1);
        }
    }
    return dp[amount] > amount ? -1 : dp[amount];
}`
    }
  },
  {
    id: 8,
    name: "Number of Islands",
    difficulty: "medium",
    topic: "Graph / BFS / DFS",
    tags: ["graph", "DFS", "BFS", "matrix"],
    description: "Given an m×n 2D binary grid representing a map of '1's (land) and '0's (water), return the number of islands. An island is surrounded by water and formed by connecting adjacent lands horizontally/vertically.",
    examples: "Grid with 3 separate clusters of 1s → Output: 3",
    templates: {
      python: `def num_islands(grid: list[list[str]]) -> int:
    def dfs(r, c):
        if r < 0 or c < 0 or r >= len(grid) or c >= len(grid[0]) or grid[r][c] == '0':
            return
        grid[r][c] = '0'  # mark visited
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)

    count = 0
    for r in range(len(grid)):
        for c in range(len(grid[0])):
            if grid[r][c] == '1':
                dfs(r, c)
                count += 1
    return count`,
      java: `public class NumberOfIslands {
    public int numIslands(char[][] grid) {
        int count = 0;
        for (int r = 0; r < grid.length; r++)
            for (int c = 0; c < grid[0].length; c++)
                if (grid[r][c] == '1') { dfs(grid, r, c); count++; }
        return count;
    }
    void dfs(char[][] grid, int r, int c) {
        if (r<0||c<0||r>=grid.length||c>=grid[0].length||grid[r][c]=='0') return;
        grid[r][c] = '0';
        dfs(grid,r+1,c); dfs(grid,r-1,c); dfs(grid,r,c+1); dfs(grid,r,c-1);
    }
}`,
      cpp: `#include <vector>
using namespace std;

void dfs(vector<vector<char>>& grid, int r, int c) {
    if (r<0||c<0||r>=(int)grid.size()||c>=(int)grid[0].size()||grid[r][c]=='0') return;
    grid[r][c]='0';
    dfs(grid,r+1,c); dfs(grid,r-1,c); dfs(grid,r,c+1); dfs(grid,r,c-1);
}

int numIslands(vector<vector<char>>& grid) {
    int count = 0;
    for (int r=0;r<grid.size();r++)
        for (int c=0;c<grid[0].size();c++)
            if (grid[r][c]=='1') { dfs(grid,r,c); count++; }
    return count;
}`
    }
  },
  {
    id: 9,
    name: "Trapping Rain Water",
    difficulty: "hard",
    topic: "Two Pointers",
    tags: ["two pointers", "stack", "array", "hard"],
    description: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.",
    examples: "Input: [0,1,0,2,1,0,1,3,2,1,2,1] → Output: 6",
    templates: {
      python: `def trap(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    max_left = max_right = water = 0
    while left < right:
        if height[left] < height[right]:
            if height[left] >= max_left:
                max_left = height[left]
            else:
                water += max_left - height[left]
            left += 1
        else:
            if height[right] >= max_right:
                max_right = height[right]
            else:
                water += max_right - height[right]
            right -= 1
    return water

print(trap([0,1,0,2,1,0,1,3,2,1,2,1]))  # 6`,
      java: `public class TrappingRainWater {
    public int trap(int[] height) {
        int left = 0, right = height.length - 1;
        int maxLeft = 0, maxRight = 0, water = 0;
        while (left < right) {
            if (height[left] < height[right]) {
                if (height[left] >= maxLeft) maxLeft = height[left];
                else water += maxLeft - height[left];
                left++;
            } else {
                if (height[right] >= maxRight) maxRight = height[right];
                else water += maxRight - height[right];
                right--;
            }
        }
        return water;
    }
}`,
      cpp: `#include <vector>
using namespace std;

int trap(vector<int>& height) {
    int left=0, right=height.size()-1;
    int maxLeft=0, maxRight=0, water=0;
    while (left < right) {
        if (height[left] < height[right]) {
            if (height[left] >= maxLeft) maxLeft = height[left];
            else water += maxLeft - height[left];
            left++;
        } else {
            if (height[right] >= maxRight) maxRight = height[right];
            else water += maxRight - height[right];
            right--;
        }
    }
    return water;
}`
    }
  },
  {
    id: 10,
    name: "Word Ladder",
    difficulty: "hard",
    topic: "BFS / Graph",
    tags: ["BFS", "graph", "string", "hard"],
    description: "Given two words beginWord and endWord, and a word list, return the number of words in the shortest transformation sequence from beginWord to endWord. Each step changes exactly one letter and the new word must exist in the word list.",
    examples: "beginWord='hit', endWord='cog', wordList=['hot','dot','dog','lot','log','cog'] → 5",
    templates: {
      python: `from collections import deque

def ladder_length(begin_word: str, end_word: str, word_list: list[str]) -> int:
    word_set = set(word_list)
    if end_word not in word_set:
        return 0
    queue = deque([(begin_word, 1)])
    visited = {begin_word}
    while queue:
        word, steps = queue.popleft()
        for i in range(len(word)):
            for c in 'abcdefghijklmnopqrstuvwxyz':
                next_word = word[:i] + c + word[i+1:]
                if next_word == end_word:
                    return steps + 1
                if next_word in word_set and next_word not in visited:
                    visited.add(next_word)
                    queue.append((next_word, steps + 1))
    return 0`,
      java: `import java.util.*;

public class WordLadder {
    public int ladderLength(String beginWord, String endWord, List<String> wordList) {
        Set<String> wordSet = new HashSet<>(wordList);
        if (!wordSet.contains(endWord)) return 0;
        Queue<String> q = new LinkedList<>();
        q.offer(beginWord); int steps = 1;
        Set<String> visited = new HashSet<>(); visited.add(beginWord);
        while (!q.isEmpty()) {
            for (int size = q.size(); size > 0; size--) {
                String word = q.poll();
                char[] chars = word.toCharArray();
                for (int i = 0; i < chars.length; i++) {
                    char orig = chars[i];
                    for (char c = 'a'; c <= 'z'; c++) {
                        chars[i] = c;
                        String next = new String(chars);
                        if (next.equals(endWord)) return steps + 1;
                        if (wordSet.contains(next) && !visited.contains(next)) {
                            visited.add(next); q.offer(next);
                        }
                    }
                    chars[i] = orig;
                }
            }
            steps++;
        }
        return 0;
    }
}`,
      cpp: `// See Python solution for reference — C++ uses unordered_set + queue similarly
#include <string>
#include <vector>
#include <unordered_set>
#include <queue>
using namespace std;

int ladderLength(string beginWord, string endWord, vector<string>& wordList) {
    unordered_set<string> wordSet(wordList.begin(), wordList.end());
    if (!wordSet.count(endWord)) return 0;
    queue<string> q; q.push(beginWord);
    unordered_set<string> visited; visited.insert(beginWord);
    int steps = 1;
    while (!q.empty()) {
        for (int sz = q.size(); sz > 0; sz--) {
            string word = q.front(); q.pop();
            for (int i = 0; i < word.size(); i++) {
                char orig = word[i];
                for (char c = 'a'; c <= 'z'; c++) {
                    word[i] = c;
                    if (word == endWord) return steps + 1;
                    if (wordSet.count(word) && !visited.count(word)) {
                        visited.insert(word); q.push(word);
                    }
                }
                word[i] = orig;
            }
        }
        steps++;
    }
    return 0;
}`
    }
  }
];
