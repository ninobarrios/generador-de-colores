document.getElementById('dropArea').addEventListener('click', function () {
    document.getElementById('imageUpload').click();
});

document.getElementById('imageUpload').addEventListener('change', function (event) {
    const file = event.target.files[0];
    processImageFile(file);
});

document.getElementById('loadUrlButton').addEventListener('click', function () {
    const url = document.getElementById('urlInput').value;
    processImageUrl(url);
});
const dropArea = document.getElementById('dropArea');
dropArea.addEventListener('dragover', function (event) {
    event.preventDefault();
    dropArea.classList.add('hover');
});

dropArea.addEventListener('dragleave', function () {
    dropArea.classList.remove('hover');
});

dropArea.addEventListener('drop', function (event) {
    event.preventDefault();
    dropArea.classList.remove('hover');
    const file = event.dataTransfer.files[0];
    processImageFile(file);
});

function processImageFile(file) {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        const img = new Image();
        img.onload = function () {
            const colorThief = new ColorThief();
            const palette = colorThief.getPalette(img, 5);
            displayPalette(palette);
            updateNavbar(palette);

            const dropArea = document.getElementById('dropArea');
            dropArea.innerHTML = ''; 
            const imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.style.maxWidth = '100%';
            imgElement.style.maxHeight = '100%';
            imgElement.style.objectFit = 'contain'; 
            dropArea.appendChild(imgElement);
        }
        img.src = e.target.result;
    };
    reader.readAsDataURL(file);
}
function processImageUrl(url) {
    if (!url) return;

    const imgElement = new Image();
    imgElement.crossOrigin = 'Anonymous'; 
    imgElement.onload = function () {
        const dropArea = document.getElementById('dropArea');
        dropArea.innerHTML = ''; 
        const imgElementDisplay = document.createElement('img');
        imgElementDisplay.src = url;
        imgElementDisplay.style.maxWidth = '100%';
        imgElementDisplay.style.maxHeight = '100%';
        imgElementDisplay.style.objectFit = 'contain'; 
        dropArea.appendChild(imgElementDisplay);

        const colorThief = new ColorThief();
        const palette = colorThief.getPalette(imgElement, 5);
        displayPalette(palette);
        updateNavbar(palette);
    };

    imgElement.onerror = function () {
        alert('No se pudo cargar la imagen desde la URL proporcionada.');
    };

    imgElement.src = url;
}

function displayPalette(colors) {
    const colorPalette = document.getElementById('colorPalette');
    colorPalette.innerHTML = '';

    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
        colorBox.classList.add('colorBox');
        colorPalette.appendChild(colorBox);
    });
}


function updateNavbar(colors) {
    const navbar = document.getElementById('navbar');
    const links = navbar.querySelectorAll('a');
    const logo = navbar.querySelector('.logo');
    const searchButton = navbar.querySelector('.search-container button');

    if (colors.length >= 2) {
        const navbarColor = `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`;
        navbar.style.backgroundColor = navbarColor;
        navbar.style.color = getContrastingTextColor(navbarColor);

        logo.style.color = getContrastingTextColor(navbarColor);

        links.forEach((link, index) => {
            const bgColor = `rgb(${colors[index + 1][0]}, ${colors[index + 1][1]}, ${colors[index + 1][2]})`;
            link.style.backgroundColor = bgColor;
            link.style.color = getContrastingTextColor(bgColor);
        });

        searchButton.style.backgroundColor = getContrastingTextColor(navbarColor);
        searchButton.style.color = navbarColor;
    }
}

function getContrastingTextColor(rgb) {
    const color = rgb.match(/\d+/g).map(Number);
    const luminance = (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255;
    return luminance > 0.5 ? '#000' : '#fff';
}

document.getElementById('copyButton').addEventListener('click', function () {
    const colorBoxes = document.querySelectorAll('.colorBox');
    const colorCodes = Array.from(colorBoxes).map(box => box.style.backgroundColor).join(', ');

    navigator.clipboard.writeText(colorCodes).then(() => {
        alert('Códigos de colores copiados al portapapeles');
    }).catch(err => {
        console.error('Error al copiar los códigos de colores: ', err);
    });
});


function getContrastingTextColor(rgb) {
    const color = rgb.match(/\d+/g).map(Number);
    const luminance = (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255;
    return luminance > 0.5 ? '#000' : '#fff';
}



document.addEventListener('DOMContentLoaded', function () {
    const card = document.getElementById('card');

    document.getElementById('loadUrlButton').addEventListener('click', function () {
        const url = document.getElementById('urlInput').value;
        processImageUrl(url);
    });

    const dropArea = document.getElementById('dropArea');
    dropArea.addEventListener('click', function () {
        document.getElementById('imageUpload').click();
    });

    dropArea.addEventListener('dragover', function (event) {
        event.preventDefault();
        dropArea.classList.add('hover');
    });

    dropArea.addEventListener('dragleave', function () {
        dropArea.classList.remove('hover');
    });

    dropArea.addEventListener('drop', function (event) {
        event.preventDefault();
        dropArea.classList.remove('hover');
        const file = event.dataTransfer.files[0];
        processImageFile(file);
    });

    function processImageUrl(url) {
        if (!url) return;

        const imgElement = new Image();
        imgElement.crossOrigin = 'Anonymous'; 
        imgElement.onload = function () {
            const colorThief = new ColorThief();
            const palette = colorThief.getPalette(imgElement, 5);
            applyColors(palette);
        };

        imgElement.onerror = function () {
            alert('No se pudo cargar la imagen desde la URL proporcionada.');
        };

        imgElement.src = url;
    }

    function processImageFile(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = new Image();
            imgElement.onload = function () {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(imgElement, 5);
                applyColors(palette);
            };

            imgElement.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    function applyColors(colors) {
        if (colors.length < 2) return;

        const mainColor = `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`;
        const accentColor = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`;

        card.style.backgroundColor = '#fff'; 

        const header = card.querySelector('.card-header');
        header.style.backgroundColor = accentColor;

        const button = card.querySelector('.button');
        button.style.backgroundColor = accentColor;
        button.style.color = getContrastingTextColor(accentColor);

        ensureTextContrast();
    }

    function ensureTextContrast() {
        const textElements = card.querySelectorAll('.text-content');
        textElements.forEach(element => {
            const backgroundColor = getComputedStyle(element.parentElement).backgroundColor;
            element.style.color = getContrastingTextColor(backgroundColor);
        });
    }

    function isLightColor(color) {
        const rgb = color.match(/\d+/g).map(Number);
        const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
        return brightness > 155; 
    }


    function getContrastingTextColor(rgb) {
        const color = rgb.match(/\d+/g).map(Number);
        const luminance = (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255;
        return luminance > 0.5 ? '#000' : '#fff';
    }

    document.getElementById('copyButton').addEventListener('click', function () {
        const colorBoxes = document.querySelectorAll('.colorBox');
        const colorCodes = Array.from(colorBoxes).map(box => box.style.backgroundColor).join(', ');

        navigator.clipboard.writeText(colorCodes).then(() => {
            alert('Códigos de colores copiados al portapapeles');
        }).catch(err => {
            console.error('Error al copiar los códigos de colores: ', err);
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const card = document.getElementById('card');
    const colorPalette = document.getElementById('colorPalette');
    const coloresGuardados = document.querySelectorAll('.coloresguardados .contenidoguardado');

    let savedImage = null;
    let savedPalette = [];

    document.getElementById('loadUrlButton').addEventListener('click', function () {
        const url = document.getElementById('urlInput').value;
        processImageUrl(url);
    });

    const dropArea = document.getElementById('dropArea');
    dropArea.addEventListener('click', function () {
        document.getElementById('imageUpload').click();
    });

    dropArea.addEventListener('dragover', function (event) {
        event.preventDefault();
        dropArea.classList.add('hover');
    });

    dropArea.addEventListener('dragleave', function () {
        dropArea.classList.remove('hover');
    });

    dropArea.addEventListener('drop', function (event) {
        event.preventDefault();
        dropArea.classList.remove('hover');
        const file = event.dataTransfer.files[0];
        processImageFile(file);
    });

    function processImageUrl(url) {
        if (!url) return;

        const imgElement = new Image();
        imgElement.crossOrigin = 'Anonymous'; 
        imgElement.onload = function () {
            const colorThief = new ColorThief();
            const palette = colorThief.getPalette(imgElement, 5);
            displayPalette(palette);
            savedImage = imgElement.src;
            savedPalette = palette;
        };

        imgElement.onerror = function () {
            alert('No se pudo cargar la imagen desde la URL proporcionada.');
        };

        imgElement.src = url;
    }

    function processImageFile(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = new Image();
            imgElement.onload = function () {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(imgElement, 5);
                displayPalette(palette);
                savedImage = e.target.result;
                savedPalette = palette;
            };

            imgElement.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    function displayPalette(colors) {
        colorPalette.innerHTML = '';

        colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            colorBox.classList.add('colorBox');
            colorPalette.appendChild(colorBox);
        });
    }

    document.getElementById('saveButton').addEventListener('click', function () {
        if (savedImage && savedPalette.length > 0) {
            const nextGuardado = Array.from(coloresGuardados).find(guardado => !guardado.hasChildNodes());
            if (nextGuardado) {
                const imgElement = document.createElement('img');
                imgElement.src = savedImage;
                imgElement.alt = 'Imagen guardada';
                nextGuardado.appendChild(imgElement);

                savedPalette.forEach(color => {
                    const colorBox = document.createElement('div');
                    colorBox.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
                    colorBox.classList.add('colorBox');
                    nextGuardado.appendChild(colorBox);
                });

                alert('Imagen y paleta de colores guardados correctamente.');
                savedImage = null;
                savedPalette = [];
            } else {
                alert('No hay suficientes espacios de almacenamiento disponibles.');
            }
        } else {
            alert('No se ha seleccionado ninguna imagen o no se ha extraído la paleta de colores.');
        }
    });

    document.getElementById('copyButton').addEventListener('click', function () {
        const colorBoxes = document.querySelectorAll('.colorBox');
        const colorCodes = Array.from(colorBoxes).map(box => box.style.backgroundColor).join(', ');

        navigator.clipboard.writeText(colorCodes).then(() => {
            alert('Códigos de colores copiados al portapapeles');
        }).catch(err => {
            console.error('Error al copiar los códigos de colores: ', err);
        });
    });
});


document.addEventListener('DOMContentLoaded', function () {
    const card = document.getElementById('card');
    const coloresGuardadosContainer = document.getElementById('coloresGuardados');
    const dropArea = document.getElementById('dropArea');
    const imageUploadInput = document.getElementById('imageUpload');
    const urlInput = document.getElementById('urlInput');
    const guardarButton = document.getElementById('guardarButton');
    const descartarButton = document.getElementById('descartarButton');
    const checkboxes = [];

    let currentImage;
    let currentPalette;

    dropArea.addEventListener('click', function () {
        imageUploadInput.click();
    });

    dropArea.addEventListener('dragover', function (event) {
        event.preventDefault();
        dropArea.classList.add('hover');
    });

    dropArea.addEventListener('dragleave', function () {
        dropArea.classList.remove('hover');
    });

    dropArea.addEventListener('drop', function (event) {
        event.preventDefault();
        dropArea.classList.remove('hover');
        const file = event.dataTransfer.files[0];
        processImageFile(file);
    });

    guardarButton.addEventListener('click', function () {
        const url = urlInput.value;
        const file = imageUploadInput.files[0];

        if (file) {
            processImageFile(file);
            saveImageAndPalette();
        } else if (url) {
            processImageUrl(url);
            saveImageAndPalette();
        } else {
        }
    });

    descartarButton.addEventListener('click', function () {
        const checkboxesChecked = checkboxes.filter(checkbox => checkbox.checked);
        checkboxesChecked.forEach(checkbox => {
            const savedItemContainer = checkbox.parentElement.parentElement;
            coloresGuardadosContainer.removeChild(savedItemContainer);
        });

        checkboxes.length = 0;
    });

    function processImageUrl(url) {
        if (!url) return;

        const imgElement = new Image();
        imgElement.crossOrigin = 'Anonymous';
        imgElement.onload = function () {
            const colorThief = new ColorThief();
            const palette = colorThief.getPalette(imgElement, 5);
            currentImage = imgElement.src;
            currentPalette = palette;
            displayPalette(palette, imgElement.src);
        };

        imgElement.onerror = function () {
            alert('No se pudo cargar la imagen desde la URL proporcionada.');
        };

        imgElement.src = url;
    }

    function processImageFile(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = new Image();
            imgElement.onload = function () {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(imgElement, 5);
                currentImage = e.target.result;
                currentPalette = palette;
                displayPalette(palette, e.target.result);
            };

            imgElement.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    function displayPalette(colors, imageUrl) {
        const savedItemContainer = document.createElement('div');
        savedItemContainer.classList.add('contenidoguardado');

        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.style.maxWidth = '100%';
        imgElement.style.height = 'auto';
        savedItemContainer.appendChild(imgElement);

        const checkboxContainer = document.createElement('div');
        checkboxContainer.classList.add('checkbox-container');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkboxContainer.appendChild(checkbox);
        savedItemContainer.appendChild(checkboxContainer);

        checkbox.addEventListener('change', function () {
            if (this.checked) {
                checkboxes.push(this);
            } else {
                const index = checkboxes.indexOf(this);
                checkboxes.splice(index, 1);
            }
        });

        colors.forEach(color => {
            const colorBox = document.createElement('div');
            colorBox.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            colorBox.classList.add('colorBox');
            savedItemContainer.appendChild(colorBox);
        });

        coloresGuardadosContainer.appendChild(savedItemContainer);
    }

    function saveImageAndPalette() {
        if (currentImage && currentPalette) {
            alert('Imagen y paleta guardadas correctamente.');
        }
    }

    document.getElementById('copyButton').addEventListener('click', function () {
        const colorBoxes = document.querySelectorAll('.colorBox');
        const colorCodes = Array.from(colorBoxes).map(box => box.style.backgroundColor).join(', ');

        navigator.clipboard.writeText(colorCodes).then(() => {
            alert('Códigos de colores copiados al portapapeles');
        }).catch(err => {
            console.error('Error al copiar los códigos de colores: ', err);
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const card = document.getElementById('card');
    const cardHeader = document.getElementById('cardHeader');
    const cardTitle = document.getElementById('cardTitle');

    document.getElementById('loadUrlButton').addEventListener('click', function () {
        const url = document.getElementById('urlInput').value;
        processImageUrl(url);
    });

    const dropArea = document.getElementById('dropArea');
    dropArea.addEventListener('click', function () {
        document.getElementById('imageUpload').click();
    });

    dropArea.addEventListener('dragover', function (event) {
        event.preventDefault();
        dropArea.classList.add('hover');
    });

    dropArea.addEventListener('dragleave', function () {
        dropArea.classList.remove('hover');
    });

    dropArea.addEventListener('drop', function (event) {
        event.preventDefault();
        dropArea.classList.remove('hover');
        const file = event.dataTransfer.files[0];
        processImageFile(file);
    });

    function processImageUrl(url) {
        if (!url) return;

        const imgElement = new Image();
        imgElement.crossOrigin = 'Anonymous';
        imgElement.onload = function () {
            const colorThief = new ColorThief();
            const palette = colorThief.getPalette(imgElement, 5);
            applyColors(palette);
        };

        imgElement.onerror = function () {
            alert('No se pudo cargar la imagen desde la URL proporcionada.');
        };

        imgElement.src = url;
    }

    function processImageFile(file) {
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function (e) {
            const imgElement = new Image();
            imgElement.onload = function () {
                const colorThief = new ColorThief();
                const palette = colorThief.getPalette(imgElement, 5);
                applyColors(palette);
            };

            imgElement.src = e.target.result;
        };

        reader.readAsDataURL(file);
    }

    function applyColors(colors) {
        if (colors.length < 2) return;

        const mainColor = `rgb(${colors[0][0]}, ${colors[0][1]}, ${colors[0][2]})`;
        const accentColor = `rgb(${colors[1][0]}, ${colors[1][1]}, ${colors[1][2]})`;

        card.style.backgroundColor = '#fff';
        cardHeader.style.backgroundColor = accentColor;
        cardTitle.style.color = getContrastingTextColor(accentColor);

        const button = card.querySelector('.button');
        button.style.backgroundColor = accentColor;
        button.style.color = getContrastingTextColor(accentColor);
    }

    function getContrastingTextColor(rgb) {
        const color = rgb.match(/\d+/g).map(Number);
        const luminance = (0.299 * color[0] + 0.587 * color[1] + 0.114 * color[2]) / 255;
        return luminance > 0.5 ? '#000' : '#fff';
    }
});
