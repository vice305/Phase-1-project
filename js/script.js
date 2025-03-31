document.addEventListener("DOMContentLoaded", function () {
    const images = ["assets/images/geraud-gordias-bNVbyBl870A-unsplash.jpg", "assets/images/luka-slapnicar-yqeXLR81Uj0-unsplash.jpg", "assets/images/merve-sensoy-UEb7vAqYb4U-unsplash.jpg", "assets/images/ern-low-QMAhB9P0RXg-unsplash.jpg", "assets/images/greg-rosenke-0DizjoNOCrw-unsplash.jpg", "assets/images/jakob-rosen--MqeaR_Ft3k-unsplash.jpg","assets/images/jakob-rosen-Emvf_emPMdY-unsplash.jpg", "assets/images/jakob-rosen-j8YKy5lXejM-unsplash.jpg", "assets/images/jakob-rosen-kZfdHrUoB3U-unsplash.jpg", "assets/images/tim-dennert-ID3ZX0BqnS8-unsplash.jpg"];
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
  })
    
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


    let currentSlide = 0;
    let aircraftData = [];

    async function fetchAircraftData() {
        try {
            const response = await fetch('https://flatter-cuties-vpdp.vercel.app/aircrafts');
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
    
        const aircraft = aircraftData[index];
        
        slideImage.src = aircraft.image;
        slideImage.alt = aircraft.name;
        description.innerHTML = `<h2>${aircraft.name}</h2><p>${aircraft.description}</p>`;
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