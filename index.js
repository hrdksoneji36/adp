import { 
    calculate, 
    getData, 
    postData
 } from "./math";

const App = async () => {

    // get data from provided endpoint
    const operationData = await getData();

    // calculation of data
    const result = calculate(operationData);
    
    // post data
    const { status, data } = await postData({ 
        id: operationData.id,
        result
    });

    console.log('Post request result ->', ' Status:', status, ' Data:', data);

    if(status === 200 && data.toLowerCase() === 'correct') {
        getData();
        console.log('Success');
    } else if(status === 400) {
        console.log('Incorrect value in result; no ID specified; value is invalid');
    } else if(status === 500) {
        console.log('ID cannot be found');
    }
}
App();

// set interval of 2000ms to keep getting result
setInterval(() => {
    App();
}, 2000);