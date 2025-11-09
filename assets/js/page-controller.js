// --- DATABASE DOKTER ---
// Di aplikasi sungguhan, ini akan datang dari database/API.
// Kita gunakan jam dalam format 24 jam (angka) agar mudah dibandingkan.

const carouselData = {
            pencegahan: [
                'https://via.placeholder.com/800x1000/8EC5FC/000000?text=ABSTINENCE+%26+AWARENESS',
                'https://via.placeholder.com/800x1000/B4A7D6/000000?text=BE+FAITHFUL',
                'https://via.placeholder.com/800x1000/DDA15E/000000?text=LANGKAH+PENCEGAHAN+IMS'
            ],
            penanganan: [
                'https://via.placeholder.com/800x1000/FAA0A0/000000?text=PENANGANAN+IMS+1',
                'https://via.placeholder.com/800x1000/B0D9B1/000000?text=PENANGANAN+IMS+2',
                'https://via.placeholder.com/800x1000/D4A5A5/000000?text=PENANGANAN+IMS+3'
            ]
        };

        let currentSlide = {
            pencegahan: 0,
            penanganan: 0
        };

        let touchStartX = 0;
        let touchEndX = 0;

        function toggleCarousel(carouselId) {
            const carousel = document.getElementById(carouselId);
            const bookletItem = document.getElementById('booklet-' + carouselId.replace('carousel-', ''));
            
            if (carousel.classList.contains('show')) {
                carousel.classList.remove('show');
                bookletItem.classList.remove('active');
            } else {
                carousel.classList.add('show');
                bookletItem.classList.add('active');
                
                // Initialize carousel
                const type = carouselId.replace('carousel-', '');
                updateCarouselImage(type);
                
                // Add touch events for swipe
                const slideElement = document.getElementById('slide-' + type);
                slideElement.addEventListener('touchstart', handleTouchStart, false);
                slideElement.addEventListener('touchend', (e) => handleTouchEnd(e, type), false);
            }
        }

        function updateCarouselImage(type) {
            const imgElement = document.getElementById('carousel-image-' + type);
            const counter = document.getElementById('counter-' + type);
            const totalSlides = carouselData[type].length;
            
            imgElement.src = carouselData[type][currentSlide[type]];
            counter.textContent = `${currentSlide[type] + 1} / ${totalSlides}`;
        }

        function nextSlide(type) {
            const totalSlides = carouselData[type].length;
            currentSlide[type] = (currentSlide[type] + 1) % totalSlides;
            updateCarouselImage(type);
        }

        function prevSlide(type) {
            const totalSlides = carouselData[type].length;
            currentSlide[type] = (currentSlide[type] - 1 + totalSlides) % totalSlides;
            updateCarouselImage(type);
        }

        function handleTouchStart(e) {
            touchStartX = e.changedTouches[0].screenX;
        }

        function handleTouchEnd(e, type) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe(type);
        }

        function handleSwipe(type) {
            const swipeThreshold = 50;
            
            if (touchEndX < touchStartX - swipeThreshold) {
                // Swipe left - next slide
                nextSlide(type);
            }
            
            if (touchEndX > touchStartX + swipeThreshold) {
                // Swipe right - previous slide
                prevSlide(type);
            }
        }

const doctorsData = [
    {
        name: "dr. Robby",
        specialty: "Spesialis Kulit & Kelamin",
        scheduleStart: 8, // Jam 8 Pagi
        scheduleEnd: 16   // Jam 4 Sore (16:00)
    },
    {
        name: "dr. Alexa",
        specialty: "Spesialis Kandungan",
        scheduleStart: 16, // Jam 4 Sore
        scheduleEnd: 20   // Jam 8 Malam (20:00)
    },
    {
        name: "dr. Budi",
        specialty: "Psikolog Klinis",
        scheduleStart: 10, // Jam 10 Pagi
        scheduleEnd: 17   // Jam 5 Sore (17:00)
    },
    {
        name: "dr. Citra",
        specialty: "Konselor IMS",
        scheduleStart: 19, // Jam 7 Malam
        scheduleEnd: 22   // Jam 10 Malam (22:00)
    }
];

// --- FUNGSI UNTUK MERENDER DAFTAR DOKTER ---
function renderDoctorList() {
    const container = document.getElementById('doctor-list-container');
    if (!container) return; // Pengaman jika elemen tidak ditemukan

    // 1. Dapatkan jam sekarang (0-23)
    const currentHour = new Date().getHours();

    // 2. Proses data dokter: cek status & siapkan data
    const processedDoctors = doctorsData.map(doc => {
        const isOnline = currentHour >= doc.scheduleStart && currentHour < doc.scheduleEnd;

        return {
            ...doc,
            isOnline: isOnline,
            statusText: isOnline ? 'Online' : 'Offline',
            statusClass: isOnline ? 'status-online' : 'status-offline',
            scheduleText: isOnline ? 'Konsultasi sekarang!' : `Online pada ${doc.scheduleStart}:00 - ${doc.scheduleEnd}:00`
        };
    });

    // 3. Urutkan daftar: yang online (true) ke atas
    const sortedDoctors = processedDoctors.sort((a, b) => b.isOnline - a.isOnline);

    // 4. Buat HTML untuk setiap dokter
    const html = sortedDoctors.map(doc => {
        const onClickAction = doc.isOnline 
            ? `alert('Menghubungi ${doc.name}...')`
            : `alert('${doc.name} baru tersedia pukul ${doc.scheduleStart}:00 - ${doc.scheduleEnd}:00')`;

        return `
            <div class="doctor-card" onclick="${onClickAction}"><div class="doctor-info"><span class="doctor-status ${doc.statusClass}">${doc.statusText}</span><div class="doctor-schedule">${doc.scheduleText}</div><div class="doctor-name">${doc.name}</div></div><div class="doctor-avatar"><i class="fas fa-user-md"></i></div></div>
        `;
    }).join('');

    // 5. Masukkan HTML ke dalam wadah
    container.innerHTML = html;
}


// --- KODE NAVIGASI ANDA ---
function navigateTo(page) {
    // Hide all pages
    document.querySelectorAll('.page-content').forEach(p => {
        p.classList.add('hidden');
    });

    // Show selected page
    const targetPage = document.getElementById('page-' + page);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }

    // --- MODIFIKASI DIMULAI DARI SINI ---
    // Jika halaman yang dituju adalah 'daftar-dokter',
    // panggil fungsi untuk merender daftar dokternya.
    if (page === 'daftar-dokter') {
        renderDoctorList();
    }
    // --- MODIFIKASI SELESAI ---

    // Update active nav
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });

    // Set active based on page
    const navItems = document.querySelectorAll('.nav-item');
    
    if (page === 'beranda') {
        navItems[0].classList.add('active');
    } else if (page === 'modul' || page === 'pengaduan' || page === 'konsultasi' || 
               page === 'form-gejala' || page === 'hasil-laporan' || page === 'daftar-dokter') {
        // Ini adalah item 'Panduan' (indeks ke-1 atau array[1])
        if (navItems[1]) {
             navItems[1].classList.add('active');
        }
    } else if (page === 'pengaturan') {
        if (navItems[2]) {
            navItems[2].classList.add('active');
        }
    }

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Handle form submission
document.addEventListener('DOMContentLoaded', function() {
    // Tampilkan halaman 'beranda' saat pertama kali load
    navigateTo('beranda');

    const formGejala = document.getElementById('formGejala');
    if (formGejala) {
        formGejala.addEventListener('submit', function(e) {
            e.preventDefault();
            const gejala = document.getElementById('gejalaInput').value;
            
            if (gejala.trim()) {
                // Simulate submission
                alert('Laporan gejala berhasil dikirim!');
                // Navigate to hasil laporan
                navigateTo('hasil-laporan');
                // Clear form
                document.getElementById('gejalaInput').value = '';
            }
        });
    }

    // Menu icon handler
    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.addEventListener('click', function() {
            alert('Menu sidebar akan ditambahkan di versi berikutnya');
        });
    }

    // --- PENTING ---
    // Ganti event listener 'onclick' di HTML dengan yang di JS
    // Ini adalah praktik yang lebih baik (Separation of Concerns)

    // Navigasi Bottom Bar
    const navItems = document.querySelectorAll('.nav-item');
    if (navItems.length > 0) {
        navItems[0].onclick = () => navigateTo('beranda');
        navItems[1].onclick = () => navigateTo('modul'); // Arahkan ke 'modul' sebagai halaman default 'Panduan'
        navItems[2].onclick = () => navigateTo('pengaturan');
    }
    
    // Navigasi Halaman Utama (Homepage)
    const featureModul = document.querySelector('.feature-card[onclick*="modul"]');
    const featurePengaduan = document.querySelector('.feature-card[onclick*="pengaduan"]');
    const featureKonsultasi = document.querySelector('.feature-card[onclick*="konsultasi"]');
    
    if (featureModul) featureModul.onclick = () => navigateTo('modul');
    if (featurePengaduan) featurePengaduan.onclick = () => navigateTo('pengaduan');
    if (featureKonsultasi) featureKonsultasi.onclick = () => navigateTo('konsultasi');

    // ... (Tambahkan event listener lain di sini jika Anda hapus 'onclick' dari HTML)
    // Contoh:
    // const btnLapor = document.querySelector('.card-btn[onclick*="form-gejala"]');
    // if (btnLapor) btnLapor.onclick = () => navigateTo('form-gejala');
});