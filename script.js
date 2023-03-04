window.onload = function() {
    fetch('https://api.github.com/repos/fractial/pages/contents/upload/input.txt')
        .then(response => response.json())
        .then(data => {
            const encodedContent = data.content;
            const decodedContent = atob(encodedContent);
            const contentDiv = document.getElementById('content');
            console.log(contentDiv)
            contentDiv.innerHTML = decodedContent;
        });
}

function saveToGitHub(event) {
    event.preventDefault(); // prevent form submission

    // get input value
    const input = document.getElementById('input-textbox');
    const inputValue = input.value;

    // create file content
    const fileContent = `Input value: ${inputValue}`;

    // retrieve existing file content and SHA using API
    const url = 'https://api.github.com/repos/fractial/pages/contents/upload/input.txt';
    const options = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer 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',
            'Content-Type': 'application/json'
        }
    };

    fetch(url, options)
        .then(response => response.json())
        .then(data => {
            // update file content on GitHub using API
            const updateUrl = 'https://api.github.com/repos/fractial/pages/contents/upload/input.txt';
            const updateOptions = {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer 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',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: 'Updated input.txt',
                    content: btoa(fileContent),
                    sha: data.sha
                })
            };

            return fetch(updateUrl, updateOptions);
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
}