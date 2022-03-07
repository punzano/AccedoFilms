const onResponseError = (response, data) => {
    if (response.status !== 200) {
        console.log('error: ', response.status);
    }

    const error = (data && data.message) || response.statusText;
    return Promise.reject(error);
};

const handleResponse = (response) => (
    response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            onResponseError(response, data);
        }

        return data;
    })
);

const getFilms = () => {
    const requestOptions = {
        method: 'GET',
    };

    return fetch('https://test-data-interviews.s3.eu-west-1.amazonaws.com/accedoTest.json', requestOptions)
        .then(handleResponse)
};

export const filmsService = {
    getFilms,
};