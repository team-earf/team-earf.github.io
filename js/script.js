// Navbar Stuff
const navLinksText = document.querySelectorAll('#navbar-list li').textContent;
const items = document.querySelectorAll('#navbar-list li');

// Post Section Stuff
const postsList = document.getElementById('posts-list');
const postSectionLabel = document.getElementById('post-section-label');
const postContainers = document.getElementsByClassName('post-container');

// Piano Images
const pianoImg = document.getElementById('piano-img');
const pianoNotTalkAnimation = "https://drive.google.com/uc?id=1ZbvtB0LmFPtMNOAVdE-XMXsrCkMILGHO";
const pianoTalkAnimation = "https://drive.google.com/uc?id=1XeymKoK5YkuXdimRAoIgQb3YrI1vLv1P";

const speechBubble = document.getElementById('speech-bubble-img');
const speechBubbleText = document.getElementById('speech-bubble-text');

const imagesToPreload = document.getElementsByClassName('post-image');
const pianoTalkingImages = [pianoTalkAnimation, pianoNotTalkAnimation, speechBubble]

function preloadImages(list) {
  for (let i = 0; i < list.length; i++) {
    const img = new Image();
    img.src = list[i];
  }
}

preloadImages(imagesToPreload);
preloadImages(pianoTalkingImages);

// Navbar Text Wave Animation
items.forEach(item => {
  let requestId;
  const link = item.querySelector('a');
  const originalText = link.textContent;
  let isAnimating = false; // to keep track of animation state

  function waveAnimation() {
    let waveIndex = 0;

    function animate() {
      waveIndex++;
      if (waveIndex > originalText.length) {
        waveIndex = 0;
      }

      const waveText = originalText.split('').map((char, index) => {
        if (index === waveIndex - 1) {
          return char.toUpperCase();
        } else {
          return char.toLowerCase();
        }
      }).join('');

      link.textContent = waveText;

      if (isAnimating) {
        requestId = requestAnimationFrame(() => {
          setTimeout(animate, 125); // add a delay of 125ms
        });
      } else {
        link.textContent = originalText; // animation stopped, revert to original text
      }
    }

    animate();
  }

  item.addEventListener('mouseenter', () => {
    isAnimating = true;
    waveAnimation();
  });

  item.addEventListener('mouseleave', () => {
    isAnimating = false;
    cancelAnimationFrame(requestId);
    link.textContent = originalText;
  });
});

// Piano Talking Animations

// Bringing up Piano when hovering over Posts List
postsList.addEventListener('mouseenter', function() {
  postsList.style.transition = 'margin-bottom 0.5s';
  postsList.style.marginBottom = '150px';
  
  postSectionLabel.style.transition = 'margin-bottom 0.5s';
  postSectionLabel.style.marginBottom = '150px';
  
  pianoImg.style.transition = 'bottom 0.5s';
  pianoImg.style.bottom = '55%';
  pianoImg.style.left = '50%';
  pianoImg.style.transform = 'translateX(-50%)';
  pianoImg.style.visibility = 'visible';
  
  speechBubble.style.transition = 'bottom 0.5s, left 0.5s';
  speechBubble.style.bottom = '65%';
  speechBubble.style.right = 'calc(50% + 100px)';

  speechBubbleText.style.transition = 'bottom 0.5s, left 0.5s';
  speechBubbleText.style.bottom = '78%';
  speechBubbleText.style.right = 'calc(50% + 120px)';
});



// Bringing it back down
postsList.addEventListener('mouseleave', function() {
  postsList.style.transition = 'margin-bottom 0.5s';
  postsList.style.marginBottom = '0';
  
  postSectionLabel.style.transition = 'margin-bottom 0.5s';
  postSectionLabel.style.marginBottom = '0';

  pianoImg.style.transition = 'bottom 0.5s';
  pianoImg.style.bottom = '20%';

  speechBubble.style.transition = 'bottom 0.5s';
  speechBubble.style.bottom = '20%';

  speechBubbleText.style.transition = 'bottom 0.5s';
  speechBubbleText.style.bottom = '20%';
});

for (let i = 0; i < postContainers.length; i++) {
  postContainers[i].addEventListener('mouseenter', function() {
    console.log('function started');
    pianoImg.src = pianoTalkAnimation;
    speechBubble.style.visibility = 'visible';
    speechBubbleText.style.visibility = 'visible';
  });
}

for (let i = 0; i < postContainers.length; i++) {
  postContainers[i].addEventListener('mouseleave', function() {
    console.log('function started');
    pianoImg.src = pianoNotTalkAnimation;
    speechBubble.style.visibility = 'hidden';
    speechBubbleText.style.visibility = 'hidden';
  });
}