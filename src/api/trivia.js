import axios from 'axios'

export default {
  getCategories () {
    return axios.get('https://opentdb.com/api_category.php')
  },
  getQuestions (params) {
    return axios.get('https://opentdb.com/api.php?amount=5&encode=base64', { params })
  },
  getToken () {
    return axios.get('https://opentdb.com/api_token.php?command=request')
  }
}
