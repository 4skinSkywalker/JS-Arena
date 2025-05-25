function solution({nums, m}){
    let n = nums.length
    
    // Initialize arrays to store the prefix products and suffix products
    let prefix_products = new Array(n).fill(1)
    let suffix_products = new Array(n).fill(1)
    
    // Calculate prefix products
    for(let i = 1; i < n; i++){
        prefix_products[i] = (prefix_products[i - 1] * nums[i - 1]) % m
    }
    
    // Calculate suffix products
    for(let i = n - 2; i >= 0; i--){
        suffix_products[i] = (suffix_products[i + 1] * nums[i + 1]) % m
    }
    
    // Calculate the sum of products
    let g_value = 0
    for(let i = 0; i < n; i++){
        g_value = (g_value + prefix_products[i] * suffix_products[i]) % m
    }
    
    return g_value
}

module.exports = solution;