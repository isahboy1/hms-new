import {notify} from 'react-notify-toast';

/**
 * _fetchData()
 * helper function that fetches data from the database using a 
 * specified route and performs the callback function on the returned data
 * @params route (string) => the api route
 * @params callback (func) => the action to perform on that data
 *      that is being returned
 */
const _fetchData = ({ route, callback}) => {
    fetch(`http://localhost:4000/${route}`, {
            method: 'GET'
        }).then(function(response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            // console.log(data)
           callback(data);
        }).catch(err => {
            return err;
        })
};

/**
 * _postData()
 * An helper function that posts data to the database
 * @params route (string) => the api route to submit on 
 * @params data (object) => item to be submitted
 * @params callback => optional callback function
 */
const _postData = ({ route, data, callback }) => {
    fetch(`http://localhost:4000/${route}`, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data)}).then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
    }).then(function(data) {
        console.log(data);
        if(data === "success"){
            if (callback) callback() 
         }    
    }).catch(function(err) {
        return err;
    });
};


/**
 * _deleteData()
 * An helper function that deletes data from the database
 * @params route (String) => the api route
 * @params data (object) => object containing the details of 
 * the item to be deleted
 * @params callback (func) => optional callback
 */
const _deleteData = ({ route, data, callback }) => {
    fetch(`http://localhost:4000/${route}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(function(response) {
            if (response.status >= 400) {
              throw new Error("Bad response from server");
            }
            return response.json();
        }).then(function(data) {
            console.log(data)
            if(data === "success"){
                if (callback) callback();  
            }
        }).catch(function(err) {
            return err;
        });
};

const _updateData = ({ route, data, callback }) => {
    fetch(`http://localhost:4000/${route}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(function(response) {
        // if the status of the response is greater than 400, then error is returned
        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        return response.json()
    }).then(function(data) {
        console.log(data)
        if (data === "success") {
            if (callback) callback();
        }
    }).catch(function(err) {
        return err;
    });
};

const toCamelCase = (str) => {
    return str[0].toUpperCase() + str.substr(1);
}

const _customNotify = (msg) => {
    let myColor = { background: '#239', text: "#FFFFFF" }
    notify.show(msg, "custom", 3000, myColor);
}

const _warningNotify = (msg) => {
    let myColor = { background: '#f11', text: "#FFFFFF" }
    notify.show(msg, "custom", 3000, myColor);
}

const _convertArrOfObjToArr = (arr) => {
    let result = [];
    for(let o of arr) {
        result.push(Object.values(o));
    }
    return result;
}

export {
    _fetchData,
    _postData,
    _deleteData,
    _updateData,
    toCamelCase,
    _customNotify,
    _warningNotify,
    _convertArrOfObjToArr,
}