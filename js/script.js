// Navbar Stuff
const navLinksText = document.querySelectorAll('#navbar-list li').textContent;

const items = document.querySelectorAll('#navbar-list li');

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
          setTimeout(animate, 125); // add a delay of 100ms
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



// Sidebar Status
const statusText = document.querySelector('#status-text');
statusText.textContent = "Still reworking how I want the site to look, I'm obviously not a web designer 😂. I'll be using this for various things";