// Enhanced dummy data for batches
const dummyBatches = [{
        id: 'AG1234',
        product: 'Tomatoes',
        farmLocation: 'Green Valley Farms, Iowa',
        harvestDate: '2024-05-15',
        transportInfo: 'Truck #12, EcoTrans Logistics',
        storageTemp: '4°C',
        deliveryStatus: 'Transported',
        lastUpdated: '2024-05-15',
        timeline: [
            { stage: 'Harvested', completed: true, date: '2024-05-15' },
            { stage: 'Transported', completed: true, date: '2024-05-15' },
            { stage: 'Warehoused', completed: false, date: null },
            { stage: 'Delivered', completed: false, date: null }
        ]
    },
    {
        id: 'AG1235',
        product: 'Rice',
        farmLocation: 'Sunrise Fields, California',
        harvestDate: '2024-05-16',
        transportInfo: 'Rail #7, FreshMove',
        storageTemp: '6°C',
        deliveryStatus: 'Warehoused',
        lastUpdated: '2024-05-16',
        timeline: [
            { stage: 'Harvested', completed: true, date: '2024-05-16' },
            { stage: 'Transported', completed: true, date: '2024-05-16' },
            { stage: 'Warehoused', completed: true, date: '2024-05-16' },
            { stage: 'Delivered', completed: false, date: null }
        ]
    },
    {
        id: 'AG1236',
        product: 'Onions',
        farmLocation: 'Golden Harvest, Texas',
        harvestDate: '2024-05-17',
        transportInfo: 'Truck #15, QuickDeliver',
        storageTemp: '5°C',
        deliveryStatus: 'Delivered',
        lastUpdated: '2024-05-17',
        timeline: [
            { stage: 'Harvested', completed: true, date: '2024-05-17' },
            { stage: 'Transported', completed: true, date: '2024-05-17' },
            { stage: 'Warehoused', completed: true, date: '2024-05-17' },
            { stage: 'Delivered', completed: true, date: '2024-05-17' }
        ]
    }
];

function renderLanding() {
    document.getElementById('app').innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <h1 class="headline">Smart & Transparent Agriculture Supply Chain</h1>
                <p class="subheadline">Track your food from farm to fork with real-time transparency.</p>
                <div class="hero-cta">
                    <button class="cta-btn primary" onclick="location.hash='#track'">Track a Batch</button>
                    <button class="cta-btn secondary" onclick="location.hash='#dashboard'">View Dashboard</button>
                </div>
            </div>
            <div class="hero-image">
                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=800&q=80" alt="Modern agriculture supply chain illustration">
                <div class="hero-overlay"></div>
            </div>
        </section>

        <section class="how-it-works" id="how-it-works">
            <h2>How It Works</h2>
            <div class="steps-grid">
                <div class="step-card">
                    <div class="step-icon">🌱</div>
                    <h3>Harvesting</h3>
                    <p>Products are harvested with GPS-tagged data and quality metrics.</p>
                </div>
                <div class="step-card">
                    <div class="step-icon">🚛</div>
                    <h3>Transportation</h3>
                    <p>Tracked via smart devices and sensors throughout the journey.</p>
                </div>
                <div class="step-card">
                    <div class="step-icon">🏬</div>
                    <h3>Warehousing</h3>
                    <p>Stored with temperature and time logs for optimal conditions.</p>
                </div>
                <div class="step-card">
                    <div class="step-icon">🛒</div>
                    <h3>Retail Delivery</h3>
                    <p>Final stage delivery is tracked for complete transparency.</p>
                </div>
            </div>
        </section>

        <section class="features">
            <h2>Platform Features</h2>
            <div class="features-grid">
                <div class="feature-card">
                    <div class="feature-icon">✅</div>
                    <h3>Blockchain-verified Records</h3>
                    <p>Immutable and secure tracking of every step in the supply chain.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📍</div>
                    <h3>Real-time Tracking</h3>
                    <p>Monitor batch locations and conditions in real-time.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📦</div>
                    <h3>End-to-end Transparency</h3>
                    <p>Complete visibility from farm to consumer.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">📱</div>
                    <h3>User-friendly Interface</h3>
                    <p>Intuitive design for easy batch tracking and management.</p>
                </div>
                <div class="feature-card">
                    <div class="feature-icon">🔐</div>
                    <h3>Data Integrity & Security</h3>
                    <p>Advanced security measures to protect supply chain data.</p>
                </div>
            </div>
        </section>

        <section class="testimonials">
            <h2>Trusted by Industry Leaders</h2>
            <div class="testimonials-grid">
                <div class="testimonial-card">
                    <p class="quote">"We can now verify where our food came from — it's a game changer."</p>
                    <div class="author">
                        <span class="company">AgriCo Farms</span>
                        <span class="role">Leading Organic Producer</span>
                    </div>
                </div>
                <div class="testimonial-card">
                    <p class="quote">"The transparency this platform provides has transformed our supply chain."</p>
                    <div class="author">
                        <span class="company">FreshFood Logistics</span>
                        <span class="role">Supply Chain Partner</span>
                    </div>
                </div>
                <div class="testimonial-card">
                    <p class="quote">"Finally, a solution that brings real transparency to agriculture."</p>
                    <div class="author">
                        <span class="company">GreenHarvest Co.</span>
                        <span class="role">Sustainable Farming Leader</span>
                    </div>
                </div>
            </div>
        </section>

        <section class="cta-section">
            <h2>Ready to Transform Your Supply Chain?</h2>
            <p>Join leading agricultural businesses in creating a more transparent future.</p>
            <button class="cta-btn primary" onclick="location.hash='#dashboard'">Get Started Now</button>
        </section>
    `;

    // Add scroll reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    });

    document.querySelectorAll('.step-card, .feature-card, .testimonial-card').forEach((el) => {
        observer.observe(el);
    });
}

function renderBackButton() {
    return `
        <button class="back-btn" onclick="window.history.back()">
            <span class="back-icon">←</span> Back
        </button>
    `;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

function getBatchStatusColor(status) {
    const colors = {
        'Harvested': '#81C784',
        'Transported': '#64B5F6',
        'Warehoused': '#FFB74D',
        'Delivered': '#9575CD'
    };
    return colors[status] || '#757575';
}

function updateDashboardStats() {
    const totalBatches = dummyBatches.length;
    const activeBatches = dummyBatches.filter(b => b.deliveryStatus !== 'Delivered').length;
    const completedBatches = dummyBatches.filter(b => b.deliveryStatus === 'Delivered').length;

    return {
        total: totalBatches,
        active: activeBatches,
        completed: completedBatches
    };
}

function renderDashboard() {
    const stats = updateDashboardStats();
    const stages = [
        { icon: '🌱', label: 'Harvested', color: '#81C784' },
        { icon: '🚛', label: 'Transported', color: '#64B5F6' },
        { icon: '🏬', label: 'Warehoused', color: '#FFB74D' },
        { icon: '🛒', label: 'Delivered', color: '#9575CD' }
    ];

    // Calculate counts for each stage
    const stageCounts = stages.map(stage =>
        dummyBatches.filter(batch =>
            batch.timeline.find(t => t.stage === stage.label && t.completed)
        ).length
    );

    document.getElementById('app').innerHTML = `
        ${renderBackButton()}
        <div class="dashboard-container">
            <div class="dashboard-header">
                <h1>Supply Chain Dashboard</h1>
                <div class="dashboard-actions">
                    <div class="search-container">
                        <input type="text" id="batchSearchInput" placeholder="Enter Batch ID (e.g., AG1234)" class="search-input">
                        <button onclick="handleBatchSearch(event)" class="search-btn">Track</button>
                    </div>
                    <div class="filter-container">
                        <select id="statusFilter" class="filter-select" onchange="filterBatches()">
                            <option value="all">All Status</option>
                            <option value="Harvested">Harvested</option>
                            <option value="Transported">Transported</option>
                            <option value="Warehoused">Warehoused</option>
                            <option value="Delivered">Delivered</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="dashboard-stats">
                <div class="stat-item">
                    <div class="stat-value">${stats.total}</div>
                    <div class="stat-label">Total Batches</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${stats.active}</div>
                    <div class="stat-label">Active Batches</div>
                </div>
                <div class="stat-item">
                    <div class="stat-value">${stats.completed}</div>
                    <div class="stat-label">Completed Batches</div>
                </div>
            </div>

            <div class="summary-cards">
                ${stages.map((stage, i) => `
                    <div class="card" style="--card-color: ${stage.color}">
                        <div class="icon">${stage.icon}</div>
                        <div class="card-title">${stage.label}</div>
                        <div class="card-value">${stageCounts[i]}</div>
                        <div class="card-subtitle">batches</div>
                    </div>
                `).join('')}
            </div>

            <div class="recent-batches">
                <h2>Recent Batches</h2>
                <div class="table-container">
                    <table class="batches-table">
                        <thead>
                            <tr>
                                <th>Batch ID</th>
                                <th>Product</th>
                                <th>Status</th>
                                <th>Last Updated</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${dummyBatches.map(batch => `
                                <tr>
                                    <td>${batch.id}</td>
                                    <td>${batch.product}</td>
                                    <td>
                                        <span class="status-badge ${batch.deliveryStatus.toLowerCase()}" 
                                              style="background-color: ${getBatchStatusColor(batch.deliveryStatus)}20; 
                                                     color: ${getBatchStatusColor(batch.deliveryStatus)};">
                                            ${batch.deliveryStatus}
                                        </span>
                                    </td>
                                    <td>${formatDate(batch.lastUpdated)}</td>
                                    <td>
                                        <button onclick="viewBatchDetails('${batch.id}')" class="view-btn">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `;
}

function filterBatches() {
    const filter = document.getElementById('statusFilter').value;
    const rows = document.querySelectorAll('.batches-table tbody tr');
    
    rows.forEach(row => {
        const status = row.querySelector('.status-badge').textContent;
        row.style.display = filter === 'all' || status === filter ? '' : 'none';
    });
}

function viewBatchDetails(batchId) {
    location.hash = `#track?batch=${batchId}`;
}

function renderProductDetails(batchId = '') {
    let batch = dummyBatches.find(b => b.id === batchId);
    let detailsHtml = '';
    
    if (batch) {
        detailsHtml = `
            <div class="product-details">
                <div class="details-row">
                    <span class="details-icon">🏷️</span>
                    <span class="details-label">Batch ID:</span>
                    <span class="details-value">${batch.id}</span>
                </div>
                <div class="details-row">
                    <span class="details-icon">📍</span>
                    <span class="details-label">Farm Location:</span>
                    <span class="details-value">${batch.farmLocation}</span>
                </div>
                <div class="details-row">
                    <span class="details-icon">🌾</span>
                    <span class="details-label">Harvest Date:</span>
                    <span class="details-value">${formatDate(batch.harvestDate)}</span>
                </div>
                <div class="details-row">
                    <span class="details-icon">🚚</span>
                    <span class="details-label">Transport Info:</span>
                    <span class="details-value">${batch.transportInfo}</span>
                </div>
                <div class="details-row">
                    <span class="details-icon">🌡️</span>
                    <span class="details-label">Storage Temp:</span>
                    <span class="details-value">${batch.storageTemp}</span>
                </div>
                <div class="details-row">
                    <span class="details-icon">📦</span>
                    <span class="details-label">Delivery Status:</span>
                    <span class="details-value">${batch.deliveryStatus}</span>
                </div>
                <div class="timeline">
                    ${batch.timeline.map((step, i) => `
                        <div class="timeline-step">
                            <div class="step-icon" style="background:${step.completed ? getBatchStatusColor(step.stage) : 'var(--light-earth)'};">
                                ${['🌱','🚚','🏬','🛒'][i]}
                            </div>
                            <div class="step-label">${step.stage}</div>
                            ${step.date ? `<div class="step-date">${formatDate(step.date)}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    } else {
        detailsHtml = `
            <div class="product-details">
                <div class="details-row">
                    <span class="details-icon">❌</span>
                    <span class="details-value">Batch ID not found. Please check the ID and try again.</span>
                </div>
            </div>
        `;
    }

    document.getElementById('app').innerHTML = `
        <div class="back-btn" onclick="window.history.back()">
            <span class="back-icon">←</span> Back
        </div>
        <form class="search-bar" onsubmit="return handleBatchSearch(event)">
            <input type="text" id="batchSearchInput" placeholder="Enter Batch ID (e.g., AG1234)" value="${batchId}" required>
            <button type="submit">Search</button>
        </form>
        ${detailsHtml}
    `;
}

function handleBatchSearch(event) {
    event.preventDefault();
    const input = document.getElementById('batchSearchInput');
    if (input && input.value) {
        location.hash = '#track?batch=' + encodeURIComponent(input.value.trim());
    }
    return false;
}

function renderContact() {
    document.getElementById('app').innerHTML = `
        ${renderBackButton()}
        <section class="product-details">
            <h2>Contact Us</h2>
            <p>Email: <a href="mailto:info@agrichain.com">info@agrichain.com</a></p>
            <p>Phone: +1 234 567 8901</p>
            <p>Address: 123 Green Road, Farm City, USA</p>
        </section>
    `;
}

function renderLoginModal() {
    return `
        <div class="modal-overlay" id="loginModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Login</h2>
                    <button class="close-btn" onclick="closeModal('loginModal')">&times;</button>
                </div>
                <form class="auth-form" onsubmit="handleLogin(event)">
                    <div class="form-group">
                        <label for="loginEmail">Email</label>
                        <input type="email" id="loginEmail" required placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="loginPassword">Password</label>
                        <input type="password" id="loginPassword" required placeholder="Enter your password">
                    </div>
                    <button type="submit" class="auth-btn">Login</button>
                    <p class="auth-switch">Don't have an account? <a href="#" onclick="showSignupModal()">Sign up</a></p>
                </form>
            </div>
        </div>
    `;
}

function renderSignupModal() {
    return `
        <div class="modal-overlay" id="signupModal">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Sign Up</h2>
                    <button class="close-btn" onclick="closeModal('signupModal')">&times;</button>
                </div>
                <form class="auth-form" onsubmit="handleSignup(event)">
                    <div class="form-group">
                        <label for="signupName">Full Name</label>
                        <input type="text" id="signupName" required placeholder="Enter your full name">
                    </div>
                    <div class="form-group">
                        <label for="signupEmail">Email</label>
                        <input type="email" id="signupEmail" required placeholder="Enter your email">
                    </div>
                    <div class="form-group">
                        <label for="signupPassword">Password</label>
                        <input type="password" id="signupPassword" required placeholder="Create a password">
                    </div>
                    <div class="form-group">
                        <label for="signupConfirmPassword">Confirm Password</label>
                        <input type="password" id="signupConfirmPassword" required placeholder="Confirm your password">
                    </div>
                    <button type="submit" class="auth-btn">Sign Up</button>
                    <p class="auth-switch">Already have an account? <a href="#" onclick="showLoginModal()">Login</a></p>
                </form>
            </div>
        </div>
    `;
}

function showLoginModal() {
    document.body.insertAdjacentHTML('beforeend', renderLoginModal());
    document.getElementById('loginModal').style.display = 'flex';
}

function showSignupModal() {
    document.body.insertAdjacentHTML('beforeend', renderSignupModal());
    document.getElementById('signupModal').style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.remove();
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    // Here you would typically make an API call to authenticate
    console.log('Login attempt:', { email, password });
    
    // For demo purposes, just close the modal
    closeModal('loginModal');
    // You might want to update the UI to show the user is logged in
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Here you would typically make an API call to register the user
    console.log('Signup attempt:', { name, email, password });
    
    // For demo purposes, just close the modal
    closeModal('signupModal');
    // You might want to show a success message or automatically log them in
}

// Update the navbar HTML to include onclick handlers
function updateNavbar() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const loginBtn = navbar.querySelector('.login-btn');
        const signupBtn = navbar.querySelector('.signup-btn');
        
        if (loginBtn) {
            loginBtn.onclick = showLoginModal;
        }
        if (signupBtn) {
            signupBtn.onclick = showSignupModal;
        }
    }
}

function router() {
    const hash = location.hash || '#home';
    if (hash.startsWith('#dashboard')) {
        renderDashboard();
    } else if (hash.startsWith('#track')) {
        const params = new URLSearchParams(hash.split('?')[1]);
        const batchId = params.get('batch') || '';
        renderProductDetails(batchId);
    } else if (hash.startsWith('#contact')) {
        renderContact();
    } else if (hash === '#home' || hash === '') {
        renderLanding();
    } else {
        renderLanding();
    }
}

// Add event listener for when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateNavbar();
    router();
});

// Add event listener for hash changes
window.addEventListener('hashchange', () => {
    router();
});