function adjustTextSize() {
    const container = document.getElementById("container");
    const text = document.getElementById("text");

    text.style.fontSize = "50px";
    text.style.lineHeight = "normal";

    const textClone = text.cloneNode(true);
    textClone.style.visibility = "hidden";
    textClone.style.position = "absolute";
    textClone.style.lineHeight = "normal";
    textClone.style.width = container.clientWidth + "px";
    container.appendChild(textClone);

    let fontSize = parseInt(window.getComputedStyle(text).fontSize, 10);
    const containerHeight = container.clientHeight;
    const containerWidth = container.clientWidth;
    let textHeight, textWidth;

    do {
        textHeight = textClone.scrollHeight;
        textWidth = textClone.scrollWidth;

        if (textHeight > containerHeight || textWidth > containerWidth) {
            fontSize -= 1;
            textClone.style.fontSize = fontSize + "px";
        } else {
            break;
        }
    } while (fontSize > 0);

    text.style.fontSize = fontSize + "px";
    textClone.style.fontSize = fontSize + "px";
    textHeight = textClone.scrollHeight;
    const newLineHeight = containerHeight / (textHeight / fontSize);
    text.style.lineHeight = (newLineHeight > fontSize ? newLineHeight : fontSize) + "px";
    container.removeChild(textClone);
}

function updateText() {
    const textInput = document.getElementById("textInput");
    const text = document.getElementById("text");

    text.textContent = textInput.value;
    adjustTextSize();
}

// js/text.js

// Fungsi untuk memperbarui teks di dalam kontainer 'brat'
function updateText() {
    const textInput = document.getElementById('textInput').value;
    const textElement = document.getElementById('text');
    // Jika input kosong, kembalikan ke teks default 'brat'
    textElement.innerText = textInput || 'brat';
}

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('downloadBtn');

    // Jika tombol download ditemukan, tambahkan event listener
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            const elementToCapture = document.getElementById('container');

            // Gunakan html2canvas untuk menangkap elemen
            html2canvas(elementToCapture, {
                backgroundColor: '#ABE085', // Pastikan warna latar sesuai
                scale: 2 // Tingkatkan skala untuk gambar yang lebih tajam (resolusi lebih tinggi)
            }).then(canvas => {
                // Buat elemen <a> sementara untuk memicu download
                const link = document.createElement('a');
                link.download = 'brat-image.png'; // Nama file saat diunduh
                link.href = canvas.toDataURL();
                link.click();
            }).catch(error => {
                console.error('Terjadi kesalahan saat membuat gambar!', error);
                alert('Gagal membuat gambar. Silakan coba lagi.');
            });
        });
    }
});

window.onload = adjustTextSize;
window.onresize = adjustTextSize;