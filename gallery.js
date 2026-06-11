/**
 * gallery.js
 * JavaScript for the AquaAction Gallery Page (gallery.html)
 * Author: Student 1
 */

// ─────────────────────────────────────────────────────────────
// Gallery data – stores image info for all 6 thumbnails
// ─────────────────────────────────────────────────────────────
var galleryData = [
  {
    src:   'images/gallery1.jpg',
    alt:   'A dry river bed in East Africa during a drought',
    title: 'Water Scarcity in East Africa',
    desc:  'Prolonged droughts across East Africa have left millions without access to safe water sources. Rivers that once sustained communities year-round are now seasonal, forcing women and children to walk hours each day to collect water. Climate change is intensifying the frequency and severity of these droughts, making SDG 6 more urgent than ever.'
  },
  {
    src:   'images/gallery2.jpg',
    alt:   'Polluted urban river with industrial waste',
    title: 'River Pollution in Urban Areas',
    desc:  'Industrial discharge and untreated sewage are among the leading causes of freshwater pollution worldwide. An estimated 80% of all wastewater is returned to the environment without adequate treatment. Rivers near rapidly expanding cities bear the heaviest burden, harming aquatic ecosystems and posing serious public health risks to downstream communities.'
  },
  {
    src:   'images/gallery3.jpg',
    alt:   'Community members around a newly installed water pump',
    title: 'Community Water Pump Installation',
    desc:  'Grassroots water projects are transforming lives across the developing world. A single hand-pump can serve an entire village, freeing children from water collection duties and allowing them to attend school. Organisations such as WaterAid and charity:water have helped millions gain access to safe, clean water through community-led infrastructure projects.'
  },
  {
    src:   'images/gallery4.jpg',
    alt:   'Volunteers collecting plastic waste from a beach',
    title: 'Ocean Plastic Cleanup',
    desc:  'Plastic pollution entering our oceans threatens marine biodiversity and ultimately contaminates the water cycle. Beach clean-up events mobilise volunteers globally, removing tonnes of plastic before it breaks down into microplastics. Students can join or organise local clean-ups — even small efforts make a measurable difference to coastal water quality.'
  },
  {
    src:   'images/gallery5.jpg',
    alt:   'Clean water flowing from a modern tap',
    title: 'Universal Access to Clean Tap Water',
    desc:  'Access to a safe, reliable tap at home is something millions in high-income countries take for granted. Yet for 2.2 billion people globally, this basic right remains out of reach. Achieving SDG 6 means closing this gap — through investment in infrastructure, policy reform, and international cooperation — so that every person can enjoy clean water at home.'
  },
  {
    src:   'images/gallery6.jpg',
    alt:   'A rooftop rainwater harvesting system in a rural community',
    title: 'Rainwater Harvesting',
    desc:  'Rainwater harvesting is one of the oldest and most effective methods of water conservation. By capturing rain from rooftops and storing it in tanks, communities in water-scarce regions can secure a supplementary supply during dry seasons. Modern systems can be low-cost and locally maintained, making them ideal for rural communities in developing countries.'
  }
];


// ─────────────────────────────────────────────────────────────
// Thumbnail hover interaction
// JS toggles 'thumb-hover' class; CSS handles the visual effect
// ─────────────────────────────────────────────────────────────
var thumbItems = document.querySelectorAll('.thumb-item');

thumbItems.forEach(function(item) {

  item.addEventListener('mouseover', function() {
    item.classList.add('thumb-hover');
  });

  item.addEventListener('mouseout', function() {
    item.classList.remove('thumb-hover');
  });

  // Click to open modal
  item.addEventListener('click', function() {
    openModal(parseInt(item.getAttribute('data-id')));
  });

  // Keyboard: Enter or Space also opens modal
  item.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      openModal(parseInt(item.getAttribute('data-id')));
    }
  });

});


// ─────────────────────────────────────────────────────────────
// Open modal and populate with correct data
// ─────────────────────────────────────────────────────────────
function openModal(index) {
  var data    = galleryData[index];
  var overlay = document.getElementById('galleryModal');
  var img     = document.getElementById('modalImg');
  var title   = document.getElementById('modalTitle');
  var desc    = document.getElementById('modalDesc');

  img.src           = data.src;
  img.alt           = data.alt;
  title.textContent = data.title;
  desc.textContent  = data.desc;

  // Reset customisation dropdowns
  document.getElementById('colourScheme').value = 'default';
  document.getElementById('fontStyle').value    = 'default';
  applyCustomisation('default', 'default');

  overlay.classList.add('modal-open');
  document.getElementById('modalCloseBtn').focus();
}


// ─────────────────────────────────────────────────────────────
// Close modal
// ─────────────────────────────────────────────────────────────
function closeModal() {
  document.getElementById('galleryModal').classList.remove('modal-open');
}

document.getElementById('modalCloseBtn').addEventListener('click', closeModal);

// Click outside modal box to close
document.getElementById('galleryModal').addEventListener('click', function(e) {
  if (e.target === this) { closeModal(); }
});

// Escape key to close
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closeModal(); }
});


// ─────────────────────────────────────────────────────────────
// User customisation – colour scheme and font style
// Applied only to the modal content area
// ─────────────────────────────────────────────────────────────
document.getElementById('colourScheme').addEventListener('change', function() {
  applyCustomisation(this.value, document.getElementById('fontStyle').value);
});

document.getElementById('fontStyle').addEventListener('change', function() {
  applyCustomisation(document.getElementById('colourScheme').value, this.value);
});

function applyCustomisation(colour, font) {
  var content = document.getElementById('modalContent');

  var colourMap = {
    'default': { bg: '#ffffff', text: '#1a2e3b', headingColour: '#1a2e3b' },
    'ocean':   { bg: '#e8f4f8', text: '#005f8e', headingColour: '#0077b6' },
    'forest':  { bg: '#eaf5ec', text: '#2d6a4f', headingColour: '#1b4332' },
    'sand':    { bg: '#fdf6ec', text: '#7b5e3a', headingColour: '#a0522d' }
  };

  var fontMap = {
    'default': "'DM Sans', sans-serif",
    'serif':   "'Playfair Display', Georgia, serif",
    'mono':    "'Courier New', Courier, monospace",
    'rounded': "'Trebuchet MS', Tahoma, sans-serif"
  };

  var c = colourMap[colour] || colourMap['default'];
  var f = fontMap[font]     || fontMap['default'];

  content.style.backgroundColor = c.bg;
  content.style.color           = c.text;
  content.style.fontFamily      = f;

  document.getElementById('modalTitle').style.color = c.headingColour;
}