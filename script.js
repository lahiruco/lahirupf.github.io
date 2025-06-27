// 3D Mouse Follower Effect
document.addEventListener('DOMContentLoaded', function() {
    const mouseFollower = document.querySelector('.mouse-follower');
    const heroMouseFollower = document.querySelector('.hero-mouse-follower');
    const heroMouseTrail = document.querySelector('.hero-mouse-trail');
    const hero = document.querySelector('.hero');
    const floatingElements = document.querySelectorAll('.floating-element');
    
    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let heroFollowerX = 0;
    let heroFollowerY = 0;
    let trailX = 0;
    let trailY = 0;
    
    // Typewriter Effect for Rotating Titles with Background Sync
    const typewriterText = document.getElementById('typewriter-text');
    const backgroundImages = document.querySelectorAll('.background-image');
    const titles = [
        "Automobile Technician",
        "UI/UX Designer",
        "AI & Python Developer",
        "Creative Problem Solver",
        "Tech Explorer"
    ];
    
    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // milliseconds per character
    let deletingSpeed = 50; // milliseconds per character when deleting
    let pauseTime = 2000; // pause time between titles (2 seconds)
    
    function changeBackground(title) {
        // Remove active class from all background images
        backgroundImages.forEach(img => img.classList.remove('active'));
        
        // Add active class to the matching background image
        const matchingImage = document.querySelector(`[data-title="${title}"]`);
        if (matchingImage) {
            matchingImage.classList.add('active');
        }
    }
    
    function typeWriter() {
        const currentTitle = titles[currentTitleIndex];
        
        if (isDeleting) {
            // Delete characters
            typewriterText.textContent = currentTitle.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            
            if (currentCharIndex === 0) {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                setTimeout(typeWriter, 500); // pause before typing next title
                return;
            }
            
            setTimeout(typeWriter, deletingSpeed);
        } else {
            // Type characters
            typewriterText.textContent = currentTitle.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            
            // Change background when starting to type a new title
            if (currentCharIndex === 1) {
                changeBackground(currentTitle);
            }
            
            if (currentCharIndex === currentTitle.length) {
                // Finished typing current title
                setTimeout(() => {
                    isDeleting = true;
                    typeWriter();
                }, pauseTime); // pause before deleting
                return;
            }
            
            setTimeout(typeWriter, typingSpeed);
        }
    }
    
    // Start the typewriter effect
    setTimeout(typeWriter, 1000); // Start after 1 second
    
    console.log('Typewriter effect with background sync initialized with', titles.length, 'titles');
    console.log('First title:', titles[0]);
    
    // Mouse movement tracking
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // Update main mouse follower position
        if (mouseFollower) {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            mouseFollower.style.left = followerX - 10 + 'px';
            mouseFollower.style.top = followerY - 10 + 'px';
        }
        
        // Update hero-specific mouse followers
        if (heroMouseFollower && heroMouseTrail) {
            heroFollowerX += (mouseX - heroFollowerX) * 0.08;
            heroFollowerY += (mouseY - heroFollowerY) * 0.08;
            
            trailX += (mouseX - trailX) * 0.15;
            trailY += (mouseY - trailY) * 0.15;
            
            heroMouseFollower.style.left = heroFollowerX - 15 + 'px';
            heroMouseFollower.style.top = heroFollowerY - 15 + 'px';
            
            heroMouseTrail.style.left = trailX - 4 + 'px';
            heroMouseTrail.style.top = trailY - 4 + 'px';
        }
        
        // Enhanced parallax effect for floating elements
        floatingElements.forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed')) || 0.5;
            const x = (window.innerWidth - mouseX * speed) / 100;
            const y = (window.innerHeight - mouseY * speed) / 100;
            
            element.style.transform = `translateX(${x}px) translateY(${y}px)`;
        });
    });
    
    // Hide mouse followers when leaving window
    document.addEventListener('mouseleave', () => {
        if (mouseFollower) mouseFollower.style.opacity = '0';
        if (heroMouseFollower) heroMouseFollower.style.opacity = '0';
        if (heroMouseTrail) heroMouseTrail.style.opacity = '0';
    });
    
    // Show mouse followers when entering window
    document.addEventListener('mouseenter', () => {
        if (mouseFollower) mouseFollower.style.opacity = '1';
        if (heroMouseFollower) heroMouseFollower.style.opacity = '1';
        if (heroMouseTrail) heroMouseTrail.style.opacity = '1';
    });
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Mobile menu toggle
    const navToggle = document.querySelector('.nav-toggle');
    const mobileNavLinks = document.querySelector('.nav-links');
    
    if (navToggle && mobileNavLinks) {
        navToggle.addEventListener('click', () => {
            mobileNavLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNavLinks.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar background on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    const sections = document.querySelectorAll('.section');
    const cards = document.querySelectorAll('.glass');
    
    sections.forEach(section => observer.observe(section));
    cards.forEach(card => observer.observe(card));
    
    // Add CSS classes for animations
    const style = document.createElement('style');
    style.textContent = `
        .navbar.scrolled {
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        }
        
        .nav-links.active {
            display: flex;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: rgba(15, 23, 42, 0.95);
            backdrop-filter: blur(20px);
            flex-direction: column;
            padding: 2rem;
            gap: 1rem;
        }
        
        .nav-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .nav-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .nav-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        .animate-in {
            animation: fadeInUp 0.6s ease-out forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        @media (max-width: 768px) {
            .nav-links {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // About Me Profile Photo Mouse Sync
    const profilePhoto = document.getElementById('about-profile-photo');
    const aboutSection = document.querySelector('.about-section');
    
    if (profilePhoto && aboutSection) {
        let isInAboutSection = false;
        
        // Check if mouse is in about section
        aboutSection.addEventListener('mouseenter', () => {
            isInAboutSection = true;
            profilePhoto.classList.add('mouse-sync');
        });
        
        aboutSection.addEventListener('mouseleave', () => {
            isInAboutSection = false;
            profilePhoto.classList.remove('mouse-sync');
            // Reset photo position
            profilePhoto.style.transform = 'scale(1) rotateX(0deg) rotateY(0deg)';
        });
        
        // Mouse movement within about section
        aboutSection.addEventListener('mousemove', (e) => {
            if (!isInAboutSection) return;
            
            const rect = aboutSection.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // Calculate center of the section
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate distance from center
            const deltaX = x - centerX;
            const deltaY = y - centerY;
            
            // Convert to rotation angles (max 15 degrees)
            const rotateX = (deltaY / centerY) * -15;
            const rotateY = (deltaX / centerX) * 15;
            
            // Apply 3D transform
            profilePhoto.style.transform = `
                scale(1.02) 
                rotateX(${rotateX}deg) 
                rotateY(${rotateY}deg)
                perspective(1000px)
            `;
            
            // Add subtle shadow based on mouse position
            const shadowX = (deltaX / centerX) * 20;
            const shadowY = (deltaY / centerY) * 20;
            profilePhoto.style.boxShadow = `
                ${shadowX}px ${shadowY}px 30px rgba(59, 130, 246, 0.3),
                0 10px 30px rgba(0, 0, 0, 0.2)
            `;
        });
    }
    
    // Blog Image Slider
    initBlogSlider();
});

// Performance optimization: Throttle mouse events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to mouse events for better performance
const throttledMouseMove = throttle((e) => {
    // Mouse movement logic here
}, 16); // ~60fps

document.addEventListener('mousemove', throttledMouseMove);

// Blog Image Slider
function initBlogSlider() {
  const slider = document.querySelector('.blog-slider');
  if (!slider) return;
  const track = slider.querySelector('.slider-track');
  const imageWraps = track.querySelectorAll('.slider-image-wrap');
  let current = 0;
  const total = imageWraps.length;
  let autoFlipInterval = null;
  let autoFlipPaused = false;

  function setActiveClasses() {
    imageWraps.forEach((wrap, i) => {
      wrap.classList.remove('active', 'flipping-next', 'flipping-prev');
      wrap.style.zIndex = i === current ? 2 : 1;
      if (i === current) wrap.classList.add('active');
    });
  }

  function flipTo(newIndex, direction) {
    if (newIndex === current) return;
    const oldIndex = current;
    const oldWrap = imageWraps[oldIndex];
    const newWrap = imageWraps[newIndex];
    oldWrap.classList.remove('active');
    oldWrap.classList.add(direction === 'next' ? 'flipping-next' : 'flipping-prev');
    newWrap.classList.add('active');
    newWrap.style.zIndex = 3;
    setTimeout(() => {
      oldWrap.classList.remove('flipping-next', 'flipping-prev');
      newWrap.style.zIndex = 2;
      setActiveClasses();
    }, 600);
    current = newIndex;
  }

  function updateSlider() {
    setActiveClasses();
  }

  // Auto flip logic
  function startAutoFlip() {
    if (autoFlipInterval) clearInterval(autoFlipInterval);
    autoFlipInterval = setInterval(() => {
      if (!autoFlipPaused) {
        const next = (current + 1) % total;
        flipTo(next, 'next');
      }
    }, 3000);
  }
  function pauseAutoFlip() {
    autoFlipPaused = true;
    if (autoFlipInterval) clearInterval(autoFlipInterval);
  }
  function resumeAutoFlip() {
    autoFlipPaused = false;
    startAutoFlip();
  }

  // Drag/swipe support
  let startX = 0;
  let currentX = 0;
  let isDragging = false;

  function onDragMove(clientX) {
    // No-op for book flip
  }

  function onDragEnd(clientX) {
    const dx = clientX - startX;
    if (Math.abs(dx) > 50) {
      if (dx < 0 && current < total - 1) {
        flipTo(current + 1, 'next');
      } else if (dx > 0 && current > 0) {
        flipTo(current - 1, 'prev');
      }
    }
    isDragging = false;
    document.body.style.userSelect = '';
    setTimeout(resumeAutoFlip, 1000);
  }

  // Mouse events
  track.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    currentX = e.clientX;
    document.body.style.userSelect = 'none';
    pauseAutoFlip();
  });
  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    currentX = e.clientX;
    onDragMove(currentX);
  });
  window.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    onDragEnd(e.clientX);
  });

  // Touch events
  track.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentX = startX;
    track.style.transition = 'none';
    pauseAutoFlip();
  });
  track.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    currentX = e.touches[0].clientX;
    onDragMove(currentX);
  });
  track.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    onDragEnd(e.changedTouches[0].clientX);
  });

  // Responsive: update on window resize
  window.addEventListener('resize', updateSlider);

  updateSlider();
  startAutoFlip();

  // Reaction buttons logic
  imageWraps.forEach((wrap) => {
    const buttons = wrap.querySelectorAll('.reaction-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', function () {
        // Only one active per image
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        // Increment count
        let span = btn.querySelector('span');
        let count = parseInt(span.textContent, 10) || 0;
        // If already active, don't increment again
        if (!btn.dataset.clicked) {
          count++;
          span.textContent = count;
          btn.dataset.clicked = 'true';
        }
        // Remove clicked from others
        buttons.forEach(b => { if (b !== btn) b.dataset.clicked = ''; });
      });
    });
  });
} 