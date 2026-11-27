const downloadBtn = document.getElementById('save-cv-btn');
const resumeBtn = document.getElementById('save-resume-btn');

downloadBtn.addEventListener("click", () => {
    SaveAsCVPdf();
})
resumeBtn.addEventListener("click", () => {
    SaveAsResumePdf();
})
function SaveAsCVPdf(){
    document.title = ("KilianKolb_CV" + new Date().getFullYear());

    let resumeOnlyElements = document.getElementsByClassName("resume_only");
    
    downloadBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');

    for(var i = 0; i < resumeOnlyElements.length; i++){
        resumeOnlyElements[i].classList.add('hidden');
    }

    window.print();

    for(var i = 0; i < resumeOnlyElements.length; i++){
        resumeOnlyElements[i].classList.remove('hidden');
    }
    downloadBtn.classList.remove('hidden');
    resumeBtn.classList.remove('hidden');
}

function SaveAsResumePdf(){
    document.title = ("KilianKolb_Resume" + new Date().getFullYear());

    let cvOnlyElements = document.getElementsByClassName("cv_only");
    
    downloadBtn.classList.add('hidden');
    resumeBtn.classList.add('hidden');

    for(var i = 0; i < cvOnlyElements.length; i++){
        cvOnlyElements[i].classList.add('hidden');
    }

    window.print();

    for(var i = 0; i < cvOnlyElements.length; i++){
        cvOnlyElements[i].classList.remove('hidden');
    }
    downloadBtn.classList.remove('hidden');
    resumeBtn.classList.remove('hidden');

}