import axios from 'axios'

function api(endpoint, data, token) {
    axios.post('https://cse120-course-planner.herokuapp.com/api/' + endpoint, data)
}