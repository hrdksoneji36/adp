import fetch from 'node-fetch';

const API_BASE_URL = 'https://interview.adpeai.com/api/v1';

// to convert string operator to math operator
export const getOperator = (operator) => {
    switch(operator) {
        case 'division':
            return '/';
        case 'multiplication':
            return '*';
        case 'addition':
            return '+';
        case 'subtraction':
            return '-';
        case 'remainder':
            return '%';
    }
};

// to calculate result of left, right with respect to operator
export const calculate = (data) => {
    const left = parseFloat(data.left);
    const right = parseFloat(data.right);
    const operator = getOperator(data.operation);

    const result = eval(`
        ${left}
        ${operator}
        ${right}
    `);

    console.log('Get request result ->', ' Left:', left, ', Right:', right, ', Operator:', data.operation, ', Result:', result);

    return parseFloat(result.toFixed(2));
};

// get response from end point for calculation
export const getData = async() => {
    try {
        const response = await fetch(`${API_BASE_URL}/get-task`);
        const responseData = await response.json();
        return responseData;
    } catch(error) {
        console.log('Error get-task' + error);
    }
}

// post data(id and result) to provided end point
export const postData = async(data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/submit-task`, { 
            method: 'POST',       
            headers: {
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(data)
        });
        const responseData = await response.text();
        return {
            status: response.status,
            data: responseData
        };
    } catch(error) {
        console.log('Error submit-task' + error);
    }
};
