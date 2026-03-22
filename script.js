document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================
       0. Page Loader & Cursor
       ========================== */
    const pageLoader = document.getElementById("page-loader");
    setTimeout(() => {
        pageLoader.classList.add("hidden");
    }, 1200);

    const cursor = document.getElementById("custom-cursor");
    const cursorFollower = document.getElementById("custom-cursor-follower");

    if (window.innerWidth > 900) {
        document.addEventListener("mousemove", (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            // Follower uses slight lag for smooth effect
            setTimeout(() => {
                cursorFollower.style.left = e.clientX + 'px';
                cursorFollower.style.top = e.clientY + 'px';
            }, 60);
        });

        // Hover effect on interactive elements
        const hoverTargets = document.querySelectorAll("a, button, .hover-target");
        hoverTargets.forEach(target => {
            target.addEventListener("mouseenter", () => {
                document.body.classList.add("hovering");
            });
            target.addEventListener("mouseleave", () => {
                document.body.classList.remove("hovering");
            });
        });
    }

    /* ==========================
       1. Theme Toggle (Dark Mode)
       ========================== */
    const themeToggles = document.querySelectorAll(".theme-toggle");
    const currentTheme = localStorage.getItem("theme");
    
    // Setup initial theme
    if (currentTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
    
    themeToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            document.body.classList.toggle("dark-mode");
            localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
        });
    });

    /* ==========================
       2. Sticky Header Logic
       ========================== */
    const stickyHeader = document.getElementById("sticky-header");
    const firstFoldThreshold = window.innerHeight * 0.7;

    window.addEventListener("scroll", () => {
        if (window.scrollY > firstFoldThreshold) {
            stickyHeader.classList.add("is-sticky");
        } else {
            stickyHeader.classList.remove("is-sticky");
        }
    });

    /* ==========================
       3. Image Carousel logic
       ========================== */
    const mainImage = document.getElementById("main-image");
    const thumbnails = document.querySelectorAll(".thumbnail");
    let currentLargeImageSrc = thumbnails.length ? thumbnails[0].querySelector("img").getAttribute("data-large") : "";

    thumbnails.forEach((thumbnail) => {
        thumbnail.addEventListener("click", () => {
            thumbnails.forEach(t => t.classList.remove("active"));
            thumbnail.classList.add("active");
            
            const imgEl = thumbnail.querySelector("img");
            mainImage.src = imgEl.getAttribute("src");
            currentLargeImageSrc = imgEl.getAttribute("data-large");
        });
    });

    /* ==========================
       4. Image Zoom logic
       ========================== */
    const zoomBox = document.getElementById("zoom-box");
    const zoomedLens = document.getElementById("zoomed-lens");
    const zoomResult = document.getElementById("zoom-result");

    if (zoomBox && zoomedLens && zoomResult) {
        let isZooming = false;
        
        zoomBox.addEventListener("click", () => {
            if (window.innerWidth >= 900) {
                isZooming = !isZooming;
                if(isZooming) {
                    zoomedLens.style.display = "block";
                    zoomResult.style.display = "block";
                    zoomResult.style.backgroundImage = `url('${currentLargeImageSrc}')`;
                    // Setting an initial background size approximation before mousemove completes it
                    zoomResult.style.backgroundSize = `${mainImage.clientWidth * 2}px ${mainImage.clientHeight * 2}px`;
                } else {
                    zoomedLens.style.display = "none";
                    zoomResult.style.display = "none";
                }
            }
        });

        zoomBox.addEventListener("mouseleave", () => {
            isZooming = false;
            zoomedLens.style.display = "none";
            zoomResult.style.display = "none";
        });

        zoomBox.addEventListener("mousemove", (e) => {
            if (!isZooming || window.innerWidth < 900) return;

            const rect = mainImage.getBoundingClientRect();
            let x = e.clientX - rect.left;
            let y = e.clientY - rect.top;

            const lensWidth = zoomedLens.offsetWidth;
            const lensHeight = zoomedLens.offsetHeight;

            let calculatedLeft = Math.max(0, Math.min(x - (lensWidth / 2), mainImage.clientWidth - lensWidth));
            let calculatedTop = Math.max(0, Math.min(y - (lensHeight / 2), mainImage.clientHeight - lensHeight));

            zoomedLens.style.left = `${calculatedLeft}px`;
            zoomedLens.style.top = `${calculatedTop}px`;

            const cx = zoomResult.offsetWidth / lensWidth;
            const cy = zoomResult.offsetHeight / lensHeight;

            zoomResult.style.backgroundSize = `${mainImage.clientWidth * cx}px ${mainImage.clientHeight * cy}px`;
            zoomResult.style.backgroundPosition = `-${calculatedLeft * cx}px -${calculatedTop * cy}px`;
        });
    }

    /* ==========================
       5. Product Options & Qty
       ========================== */
    const btnMinus = document.querySelector(".qty-btn.minus");
    const btnPlus = document.querySelector(".qty-btn.plus");
    const qtyInput = document.querySelector(".qty-input");

    if (btnMinus && btnPlus && qtyInput) {
        btnMinus.addEventListener("click", () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            if (val > 1) qtyInput.value = val - 1;
        });
        btnPlus.addEventListener("click", () => {
            let val = parseInt(qtyInput.value, 10) || 1;
            qtyInput.value = val + 1;
        });
    }

    const colorBtns = document.querySelectorAll(".color-btn");
    colorBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            colorBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

    const radioLabels = document.querySelectorAll(".radio-label");
    radioLabels.forEach(label => {
        label.addEventListener("click", () => {
            radioLabels.forEach(l => l.classList.remove("active"));
            label.classList.add("active");
            label.querySelector("input").checked = true;
        });
    });

    /* ==========================
       6. Tab System Logic
       ========================== */
    const tabBtns = document.querySelectorAll(".tab-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    tabBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            tabBtns.forEach(b => b.classList.remove("active"));
            tabContents.forEach(c => c.classList.remove("active"));
            
            btn.classList.add("active");
            document.getElementById(btn.dataset.tab).classList.add("active");
        });
    });

    /* ==========================
       7. Scroll Animation (Observer)
       ========================== */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

    const scrollLinks = document.querySelectorAll(".scroll-to");
    scrollLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const targetId = link.dataset.target;
            const targetEl = document.getElementById(targetId);
            if(targetEl) {
                window.scrollTo({
                    top: targetEl.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });

    /* ==========================
       8. Shopping Cart Features
       ========================== */
    let cart = JSON.parse(localStorage.getItem('sonic_cart') || '[]');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCartBtn = document.getElementById('close-cart');
    const cartTriggers = document.querySelectorAll('.cart-trigger');
    const cartBadges = document.querySelectorAll('.cart-badge');
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotalPriceEl = document.getElementById('cart-total-price');
    const toastNotification = document.getElementById('toast-notification');

    function updateCartUI() {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartBadges.forEach(b => b.textContent = totalItems);
        
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p class="empty-cart-msg">Your cart is empty.</p>';
            cartTotalPriceEl.textContent = '$0.00';
            return;
        }

        let total = 0;
        cartItemsContainer.innerHTML = cart.map((item, index) => {
            total += item.price * item.quantity;
            return `
                <div class="cart-item">
                    <img src="${item.img}" alt="${item.name}" class="cart-item-img">
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.name}</h4>
                        <div class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity}</div>
                        <span class="cart-item-remove hover-target" data-index="${index}">Remove</span>
                    </div>
                </div>
            `;
        }).join('');

        cartTotalPriceEl.textContent = `$${total.toFixed(2)}`;

        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const idx = parseInt(e.target.getAttribute('data-index'));
                cart.splice(idx, 1);
                saveAndRenderCart();
            });
        });
    }

    function saveAndRenderCart() {
        localStorage.setItem('sonic_cart', JSON.stringify(cart));
        updateCartUI();
    }

    function openCart() {
        cartSidebar.classList.add('open');
        cartOverlay.classList.add('active');
    }

    function closeCart() {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('active');
    }

    function showToast(message) {
        toastNotification.textContent = message;
        toastNotification.classList.add('show');
        setTimeout(() => {
            toastNotification.classList.remove('show');
        }, 3000);
    }

    cartTriggers.forEach(t => t.addEventListener('click', openCart));
    closeCartBtn.addEventListener('click', closeCart);
    cartOverlay.addEventListener('click', closeCart);

    updateCartUI();

    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Find closest button if SVG path was clicked
            const targetBtn = e.target.closest('button') || e.target;
            const product = targetBtn.dataset;
            let qty = 1;

            if (product.id === 'p1' && qtyInput) {
                qty = parseInt(qtyInput.value, 10) || 1;
            }

            const existingItem = cart.find(i => i.id === product.id);
            if (existingItem) {
                existingItem.quantity += qty;
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    price: parseFloat(product.price),
                    img: product.img,
                    quantity: qty
                });
            }

            saveAndRenderCart();
            
            if(targetBtn.classList.contains('cart-anime-trigger')) {
                openCart();
            } else {
                showToast(`Added to cart!`);
                openCart();
            }
        });
    });
});
