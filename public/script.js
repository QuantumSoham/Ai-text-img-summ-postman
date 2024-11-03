const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");
const generateImageButton = document.getElementById("generate-image-button");
const generatedImage = document.getElementById("generated-image");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);
generateImageButton.addEventListener("click", generateImage);

function verifyTextLength(event) {
    const textArea = event.target;
    if (textArea.value.length > 200 && textArea.value.length < 100000)
        submitButton.disabled = false;
    else
        submitButton.disabled = true;
}

function submitData(event) {
    submitButton.classList.add("submit-button--loading");
    const text_to_summarize = textArea.value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "text_to_summarize": text_to_summarize
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("/summarize", requestOptions)
        .then((response) => response.text())
        .then(summary => {
            summarizedTextArea.value = summary;
            submitButton.classList.remove("submit-button--loading");
            generateImageButton.disabled = false; // Enable the image generation button
        })
        .catch((error) => console.error(error.message));
}

function generateImage() {
    generateImageButton.classList.add("submit-button--loading");
    const summarizedText = summarizedTextArea.value;

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "text": summarizedText
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    fetch("/generate-image", requestOptions)
        .then(response => response.blob())
        .then(imageBlob => {
            const imageUrl = URL.createObjectURL(imageBlob);
            generatedImage.src = imageUrl;
            generatedImage.style.display = 'block';
            generateImageButton.classList.remove("submit-button--loading");
        })
        .catch(error => {
            console.error('Error generating image:', error);
            generateImageButton.classList.remove("submit-button--loading");
        });
}

