document.addEventListener("DOMContentLoaded", function () {
    const images = ["image1.jpg", "image2.jpg", "image3.jpg"];
    let currentIndex = 0;
    
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const nextImageBtn = document.getElementById("nextImage");
    const closeLightboxBtn = document.getElementById("closeLightbox");
    const openGalleryBtn = document.getElementById("openGallery");
    const audioPlayer = document.getElementById("audioPlayer");
    const playPauseAudioBtn = document.getElementById("playPauseAudio");
    
    function showImage() {
        lightboxImage.src = images[currentIndex];
    }
    
    openGalleryBtn.addEventListener("click", function () {
        lightbox.style.display = "flex";
        showImage();
    });
    
    nextImageBtn.addEventListener("click", function () {
        currentIndex = (currentIndex + 1) % images.length;
        showImage();
    });
    
    closeLightboxBtn.addEventListener("click", function () {
        lightbox.style.display = "none";
    });
    
    playPauseAudioBtn.addEventListener("click", function () {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseAudioBtn.textContent = "Pause";
        } else {
            audioPlayer.pause();
            playPauseAudioBtn.textContent = "Play";
        }
    });

    // Aircraft Slideshow
    let currentSlide = 0;
    let aircraftData = [];

    async function fetchAircraftData() {
        try {
            const response = await fetch('');
            aircraftData = await response.json();
            showSlide(currentSlide);
        } catch (error) {
            console.error('Error fetching aircraft data:', error);
        }
    }

    function showSlide(index) {
        if (aircraftData.length === 0) return;
        const slideImage = document.getElementById("slide-image");
        const description = document.getElementById("description");
        
        slideImage.src = aircraftData[index].image;
        slideImage.alt = aircraftData[index].name;
        description.textContent = aircraftData[index].description;
    }

    document.getElementById("nextAircraft").addEventListener("click", function () {
        currentSlide = (currentSlide + 1) % aircraftData.length;
        showSlide(currentSlide);
    });

    document.getElementById("prevAircraft").addEventListener("click", function () {
        currentSlide = (currentSlide - 1 + aircraftData.length) % aircraftData.length;
        showSlide(currentSlide);
    });

    fetchAircraftData();
});