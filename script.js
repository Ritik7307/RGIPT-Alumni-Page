
        document.addEventListener('DOMContentLoaded', function () {
            // --- Mobile Menu Toggle ---
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });

            // --- Image Slider Logic ---
            let currentSlide = 0;
            const slides = document.querySelectorAll('.slider-image');
            const slideCount = slides.length;

            function showSlide(n) {
                slides.forEach(slide => slide.classList.remove('active'));
                if (slides[n]) {
                    slides[n].classList.add('active');
                }
            }

            function nextSlide() {
                currentSlide = (currentSlide + 1) % slideCount;
                showSlide(currentSlide);
            }
            
            if (slideCount > 0) {
                setInterval(nextSlide, 4000); // Change image every 4 seconds
            }

            // --- Page Navigation Logic ---
            const navLinks = document.querySelectorAll('.nav-link');
            const pages = document.querySelectorAll('.page-content');

            function showPage(pageId) {
                pages.forEach(page => {
                    if (page.id === pageId) {
                        page.classList.remove('hidden');
                    } else {
                        page.classList.add('hidden');
                    }
                });
                window.scrollTo(0, 0);
                // Close mobile menu after navigation
                mobileMenu.classList.add('hidden');
            }

            navLinks.forEach(link => {
                link.addEventListener('click', function (e) {
                    e.preventDefault();
                    const pageId = this.getAttribute('data-page');
                    if(pageId) {
                        showPage(pageId);
                    }
                });
            });

            // --- Committee Tab Logic ---
            const associationBtn = document.getElementById('association-btn');
            const affairBtn = document.getElementById('affair-btn');
            const associationContent = document.getElementById('association-content');
            const affairContent = document.getElementById('affair-content');

            if (associationBtn) {
                associationBtn.addEventListener('click', () => {
                    associationBtn.classList.add('border-b-4', 'border-sky-600', 'text-sky-600');
                    associationBtn.classList.remove('text-gray-500');
                    affairBtn.classList.remove('border-b-4', 'border-sky-600', 'text-sky-600');
                    affairBtn.classList.add('text-gray-500');
                    associationContent.classList.remove('hidden');
                    affairContent.classList.add('hidden');
                });
                affairBtn.addEventListener('click', () => {
                    affairBtn.classList.add('border-b-4', 'border-sky-600', 'text-sky-600');
                    affairBtn.classList.remove('text-gray-500');
                    associationBtn.classList.remove('border-b-4', 'border-sky-600', 'text-sky-600');
                    associationBtn.classList.add('text-gray-500');
                    affairContent.classList.remove('hidden');
                    associationContent.classList.add('hidden');
                });
            }
            
            // --- Contribution Form Logic ---
            const donationTypeRadios = document.querySelectorAll('input[name="donationType"]');
            const nameFieldGroup = document.getElementById('name-field-group');
            const batchFieldGroup = document.getElementById('batch-field-group');
            const nameInput = document.getElementById('full-name');
            const batchInput = document.getElementById('batch');
            const anonymousNote = document.getElementById('anonymous-note');

            function toggleAnonymousFields() {
                const selectedValue = document.querySelector('input[name="donationType"]:checked').value;
                const isAnonymous = selectedValue === 'anonymous';
                nameFieldGroup.classList.toggle('field-hidden', isAnonymous);
                batchFieldGroup.classList.toggle('field-hidden', isAnonymous);
                if (nameInput) nameInput.required = !isAnonymous;
                if (batchInput) batchInput.required = !isAnonymous;
                if (anonymousNote) anonymousNote.classList.toggle('hidden', !isAnonymous);
            }

            donationTypeRadios.forEach(radio => {
                radio.addEventListener('change', toggleAnonymousFields);
            });
            toggleAnonymousFields(); // Initial call

            const form = document.getElementById('contribution-form-element');
            if (form) {
                form.addEventListener('submit', (event) => {
                    event.preventDefault();
                    if (form.checkValidity()) {
                        alert('Thank you for your generous contribution to RGIPT! Your support truly makes a difference.');
                        form.reset();
                        setTimeout(toggleAnonymousFields, 0);
                    } else {
                        form.reportValidity();
                    }
                });

                form.addEventListener('reset', () => {
                    setTimeout(toggleAnonymousFields, 0);
                });
            }


            // Show home page by default
            showPage('home');
        });

        function alumniDirectory() {
            // AlpineJS function for directory
            return {
                isModalOpen: false,
                photoPreviewUrl: null, 
                newAlumnus: { name: '', email: '', passingYear: '', branch: '', linkedin: '', photoFile: null },
                alumni: [
                    { id: 1, name: 'Jane Doe', email: 'jane.doe@example.com', passingYear: 2018, branch: 'Computer Science', linkedin: 'https://linkedin.com/in/janedoe', photo: 'https://i.pravatar.cc/150?u=jane.doe@example.com' },
                    { id: 2, name: 'John Smith', email: 'john.smith@example.com', passingYear: 2019, branch: 'Mechanical Eng.', linkedin: 'https://linkedin.com/in/johnsmith', photo: 'https://i.pravatar.cc/150?u=john.smith@example.com' },
                    { id: 3, name: 'Priya Sharma', email: 'priya.sharma@example.com', passingYear: 2017, branch: 'Electronics', linkedin: 'https://linkedin.com/in/priyasharma', photo: 'https://i.pravatar.cc/150?u=priya.sharma@example.com' }
                ],
                handlePhotoChange(event) {
                    const file = event.target.files[0];
                    if (file) {
                        this.newAlumnus.photoFile = file;
                        this.photoPreviewUrl = URL.createObjectURL(file);
                    }
                },
                handleSubmit() {
                    const finalPhotoUrl = this.photoPreviewUrl || `https://i.pravatar.cc/150?u=${this.newAlumnus.email}`;
                    const newPerson = {
                        id: Date.now(), 
                        name: this.newAlumnus.name,
                        email: this.newAlumnus.email,
                        passingYear: this.newAlumnus.passingYear,
                        branch: this.newAlumnus.branch,
                        linkedin: this.newAlumnus.linkedin,
                        photo: finalPhotoUrl
                    };
                    this.alumni.unshift(newPerson);
                    this.isModalOpen = false;
                    this.newAlumnus = { name: '', email: '', passingYear: '', branch: '', linkedin: '', photoFile: null };
                    this.photoPreviewUrl = null;
                }
            }
        }
  