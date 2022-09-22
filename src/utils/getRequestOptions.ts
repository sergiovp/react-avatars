const token = process.env.REACT_APP_API_TOKEN;

function getRequestOptions(base64Image: string) {
    return {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
            'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
            name: 'avatar',
            img: base64Image,
            body: 'b4cd1f90-5950-46fb-b85a-3f235fd2bc8b',
        }),
    };
}

export default getRequestOptions;
