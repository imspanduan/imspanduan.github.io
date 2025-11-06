function navigateTo(page) {
            // Hide all pages
            document.querySelectorAll('.page-content').forEach(p => {
                p.classList.add('hidden');
            });

            // Show selected page
            document.getElementById('page-' + page).classList.remove('hidden');

            // Update active nav
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });

            // Set active based on page
            if (page === 'beranda') {
                document.querySelector('.nav-item[onclick*="beranda"]').classList.add('active');
            } else if (page === 'panduan' || page === 'pengaduan' || page === 'konsultasi') {
                document.querySelector('.nav-item[onclick*="panduan"]').classList.add('active');
            } else if (page === 'pengaturan') {
                document.querySelector('.nav-item[onclick*="pengaturan"]').classList.add('active');
            }

            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }