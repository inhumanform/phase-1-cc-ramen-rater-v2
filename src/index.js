// index.js

// Callbacks
const handleClick = (ramen) => {
  const ramenDetail = document.getElementById('ramen-detail');
  ramenDetail.innerHTML= ''
  const detailImage = document.createElement('img');
  detailImage.classList.add('detail-image')
  const name = document.createElement('h2');
  const restaurant = document.createElement('h3');
  name.classList.add('name')
  restaurant.classList.add('restaurant');
  ramenDetail.append(name);
  ramenDetail.append(restaurant);
  const ratingDisplay = document.getElementById('rating-display');
  const commentDisplay = document.getElementById('comment-display');

  detailImage.src = ramen.image;
  detailImage.alt = ramen.name;
  name.textContent = ramen.name;
  restaurant.textContent = ramen.restaurant;
  ratingDisplay.textContent = ramen.rating;
  commentDisplay.textContent = ramen.comment;
  
  ramenDetail.appendChild(detailImage);
};

const addSubmitListener = () => {
  const form = document.getElementById('new-ramen');
  if (form) {
    form.addEventListener('submit', event => {
      event.preventDefault();
      const newRamen = {
        name: form['name'].value,
        restaurant: form['restaurant'].value,
        image: form['image'].value,
        rating: form['rating'].value,
        comment: form['new-comment'].value
      };
      fetch('http://localhost:3000/ramens', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newRamen)
      })
        .then(response => response.json())
        .then(newRamen => {
          const menu = document.getElementById('ramen-menu');
          if (menu) {
            const img = document.createElement('img');
            img.src = newRamen.image;
            img.alt = newRamen.name;
            img.addEventListener('click', () => handleClick(newRamen));
            menu.appendChild(img);
          } else {
            console.error('Menu not found');
          }
        });
    });
  } else {
    console.error('Form not found');
  }
}

const displayRamens = () => {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const menu = document.getElementById('ramen-menu');
      handleClick(ramens[0])
      ramens.forEach(ramen => {
        const menuImage = document.createElement('img');
        menuImage.src = ramen.image;
        menuImage.alt = ramen.name;
        menu.appendChild(menuImage);
        menuImage.addEventListener('click', () => handleClick(ramen));
      });
    });
}

function setupEditFormListener() {
  const editForm = document.getElementById('edit-ramen');
  editForm.addEventListener('submit', event => {
    event.preventDefault();
    const ratingDisplay = document.getElementById('rating-display');
    const commentDisplay = document.getElementById('comment-display');
    ratingDisplay.textContent = editForm['rating'].value;
    commentDisplay.textContent = editForm['new-comment'].value;
  });
}

const main = () => {
  displayRamens();
  addSubmitListener();
  setupEditFormListener();

}


main()

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  setupEditFormListener,
  main,
};
