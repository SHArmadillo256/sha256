/* Position cursor glow based on mouse or touch movement */
document.addEventListener('mousemove', updatePosition);
document.addEventListener('touchmove', function(e) {
    e.preventDefault();  // Optional: prevent scrolling when touching the glow
    updatePosition(e.touches[0]);
});

function updatePosition(e) {
    const glow = document.getElementById('cursor-glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
}

/* Randomly create embers around the cursor */
setInterval(function() {
    const ember = document.createElement('div');
    ember.className = 'ember';
    document.body.appendChild(ember);
    ember.style.left = (Math.random() * window.innerWidth) + 'px';
    ember.style.top = (Math.random() * window.innerHeight) + 'px';
    
    setTimeout(() => { ember.remove(); }, 5100);
}, 500);

document.addEventListener('mousemove', function(e) {
    var xPos = e.clientX / window.innerWidth;
    var yPos = e.clientY / window.innerHeight;
    var wallBrightness = Math.max(0, 1 - yPos * 2);
    
    document.getElementById('left-wall').style.backgroundColor = `rgba(0, 0, 0, ${wallBrightness})`;
    document.getElementById('right-wall').style.backgroundColor = `rgba(0, 0, 0, ${wallBrightness})`;
});



function createAtomWithTrail() {
    const atom = document.createElement('div');
    atom.className = 'atom';
    const trail = document.createElement('div');
    trail.className = 'trail';
    
    // Randomly vary the orbit radius and speed
    const radius = 20 + Math.random() * 30; // Radius between 20px and 50px
    const duration = 5 + Math.random() * 5; // Duration between 5s and 10s
    atom.style.transform = `translateX(${radius}px) * rotate(${Math.random() * 360}deg) translateX(50px)`; // Set radius
    
    trail.style.width = `${radius}px`; // Matching trail length to radius
    trail.style.animationDuration = `${duration}s`;
    
    document.getElementById('cursor-glow').appendChild(trail);
    document.getElementById('cursor-glow').appendChild(atom);
}

// Create three embers with trails
createAtomWithTrail();
createAtomWithTrail();
createAtomWithTrail();


document.addEventListener('mousemove', updatePosition2);
document.addEventListener('touchmove', function(e) {
    e.preventDefault();
    updatePosition2(e.touches[0]);
}, { passive: false });

function updatePosition2(e) {
    const glow = document.getElementById('cursor-glow');
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
}