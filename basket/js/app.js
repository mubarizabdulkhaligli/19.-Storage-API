function color(event) {
    let heart = event.target;
    heart.classList.toggle('fa-regular');
    heart.classList.toggle('fa-solid');
  }
  
  let hearts = document.querySelectorAll('.fav-heart');
  hearts.forEach((heart) => {
    heart.addEventListener('click', color);
  });
  
  if(localStorage.getItem('products')=== null)
  {
    localStorage.setItem('products', JSON.stringify([]));
  }

  let add_buttons = document.querySelectorAll('.add-button')

  for(let add_button of add_buttons){
    add_button.onclick = function(e){
      e.preventDefault();
      let id = this.parentElement.parentElement.parentElement.id;
      let src = this.parentElement.parentElement.previousElementSibling.children[0].src
      let pr_name = this.parentElement.parentElement.children[0].children[0].innerHTML
      let pr_price = this.parentElement.parentElement.children[0].children[1].innerHTML

      let products_list = JSON.parse(localStorage.getItem('products'))

      let exist_product = products_list.find(prd => prd.Id === id)

      if(exist_product === undefined)
      {
        products_list.push({
          Id: id,
          Image: src,
          Name: pr_name,
          Price: pr_price,
          Count: 1
        })
        document.querySelector('.alertbox').style.right = '5%'
        document.querySelector('.alertbox').innerHTML = "Added"

      }
      else{
        exist_product.Count+=1;
        document.querySelector('.alertbox').style.right = '5%'
        document.querySelector('.alertbox').innerHTML = "One more added"
      }

      

      localStorage.setItem('products', JSON.stringify(products_list))

      setTimeout(function() {
        document.querySelector('.alertbox').style.right = '-50%'
      }, 1000);
      

      ShowCount()
      
    }
  }

  function ShowCount(){
    let products_list = JSON.parse(localStorage.getItem('products'))
    document.querySelector('.count').innerHTML = products_list.length;

    if(products_list.length>0)
    {
      let adding_product_count = document.querySelector('.count-adding-product')
      adding_product_count.classList.remove('d-none')
    }

  }

  ShowCount();
  