export default {
  getCategories () {
    return this.$http.get('https://opentdb.com/api_category.php')
  },
  getQuestions (params) {
    return this.$http.get('https://opentdb.com/api.php?amount=3&encode=base64', { params })
  },
  getToken () {
    return this.$http.get('https://opentdb.com/api_token.php?command=request')
  }
}
