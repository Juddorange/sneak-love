// function filterTag(tagid) {
//   const id = document.getAttribute("data-id-tag")
// 	axios
// 		.get(`http://localhost:4000/sneacker-tag/${id.}`)
// 		.then((ApiRes) => {
// 			ApiRes.data.forEach((element) => {});
// 		})
// 		.catch();
// }

const divproducts = document.getElementById('products_grid');
document.querySelector('.tag-list').querySelectorAll('input').forEach((i) => {
	i.onchange = function({ target }) {
		// console.log(this.parentElement.parentElement.querySelectorAll('input'));
		let tagarr = [];

		this.parentElement.parentElement.querySelectorAll('input').forEach((input) => {
			if (input.checked) {
				tagarr.push(input.name);
			}
		});

		axios
			.post('http://localhost:4000/sneakers/tags', { tags: tagarr })
			.then((res) => {
				console.log(res);
				divproducts.innerHTML = '';
				res.data.forEach((shoes) => {
					divproducts.innerHTML += `<a href="/one-product/${shoes._id}" class="product-item-wrapper">
		        <div class="product-img">
		            <img src="${shoes.picPath}" alt="${shoes.picName} : what a nice pair of kicks">
		        </div>
		        <p class="product-name">${shoes.name}</p>
		        <p class="product-cat">${shoes.category}</p>
		        <p class="product-price">${shoes.price}</p>
		        <p class="product-cat" data-id-tag="${shoes.id_tags}"></p>
		    </a>`;
				});
			})
			.catch((err) => console.log(err));
	};

	// if (tagarr.length === 0) {
	// 	axios
	// 		.get()
	// 		.then((res) => {
	// 			console.log(res);
	// 			divproducts.innerHTML = '';
	// 			res.data.forEach((shoes) => {
	// 				divproducts.innerHTML += `<a href="/one-product/${shoes._id}" class="product-item-wrapper">
	//           <div class="product-img">
	//               <img src="${shoes.picPath}" alt="${shoes.picName} : what a nice pair of kicks">
	//           </div>
	//           <p class="product-name">${shoes.name}</p>
	//           <p class="product-cat">${shoes.category}</p>
	//           <p class="product-price">${shoes.price}</p>
	//           <p class="product-cat" data-id-tag="${shoes.id_tags}"></p>
	//       </a>`;
	// 			});
	// 		})
	// 		.catch((err) => console.log(err));
	// }
});
