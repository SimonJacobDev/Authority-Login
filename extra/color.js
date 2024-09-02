document.querySelectorAll('.color-box').forEach(box => {
    const color = box.getAttribute('data-color');
    box.style.backgroundColor = color;
});
