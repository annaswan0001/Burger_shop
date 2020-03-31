import axios from 'axios'

const instance= axios.create({
    baseURL: "https://burgershop-588e7.firebaseio.com/"
})

export default instance;