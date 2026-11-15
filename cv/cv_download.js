const downloadBtn = document.getElementById('save-cv-btn');
const page = document.getElementById('main-page');
downloadBtn.addEventListener("click", () => {
    SaveAsPdf();
})

function SaveAsPdf(){
    // var opt = {
    //   margin:       [0,-1],
    //   filename:     'test.pdf',
    //   image:        { type: 'pdf', quality: 0.98 },
    //   html2canvas:  { scale: 2 },
    //   jsPDF:        { unit: 'in', format: 'A4', orientation: 'portrait' },
    //   pagebreak: { mode: 'avoid-all'}
    // };

    // // New Promise-based usage:
    
    downloadBtn.classList.add('hidden');

    // html2pdf().set(opt).from(page).save();
    
    // setTimeout(function () {
    //     downloadBtn.classList.remove('hidden');
    // }, 1);
    window.print();
    downloadBtn.classList.remove('hidden');
}