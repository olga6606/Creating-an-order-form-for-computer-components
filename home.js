//Creating a variable for id shop and using getElementById method to get the element with id shop
let shop = document.getElementById("shop");

/*Creating a basket to store there the item that are selected and pushing the basket inside the local storage. 
Method getItem is used to get an item from the local storage. 
If there isn't any data in the local storage, we have a reference to an empty array.*/
let basket = JSON.parse(localStorage.getItem("data")) || [];

//Creating variables for a label and for a shopping cart
let label = document.getElementById("label");
let ShoppingCart = document.getElementById("shopping-cart");

//Creating an array to automate filling in the product cards with the given data
let shopItemsData = [
  {
    id: "first",
    name: "Logitech Wireless Mouse",
    price: 50,
    img: "img/mouse.JPEG",
  },
  {
    id: "second",
    name: "Sven All-in-1 Card Reader",
    price: 40,
    img: "img/card-reader.JPEG",
  },
  {
    id: "third",
    name: "Earbud Headphones",
    price: 15,
    img: "img/small-headphones.JPEG",
  },
  {
    id: "fourth",
    name: "3Q 500 Gb Hard Disk Drive",
    price: 60,
    img: "img/hard-disk-drive.JPEG",
  },
];

//Defining an arrow function  
let generateShop = () => {
    return (shop.innerHTML = shopItemsData
      //Using a map function and passing 'x' as an argument to target every data item one by one
      .map((x) => { 
        //Listing down all the characteristics for a product card not to write .x every time
        let { id, name, price, img } = x;
        //Checking all the id one by one and if there isn't any id stored in the basket, an empty array is returned
        let search = basket.find((x) => x.id === id) || [];
        return `
        <div id=product-id-${id} class="item">
              <img width="100%" src=${img} alt="the picture is taken by Olga Mikhaltsova">
              <h2>${name}</h2>
                <p class="price">EUR ${price} </p>
                <div class="buttons" > 
                   <button onclick="decrement(${id})" class="minus">-</button>
                   <div id=${id} class="quantity">  
                   ${search.item === undefined ? 0 : search.item}
                   </div> 
                   <button onclick="increment(${id})" class="plus">+</button>
                </div>
        </div>  
          
          `;
        })
        //Using join method to concatenate all the elements in an array and get rid of the commas between the elements
        .join(""));
      };

      //Calling the function
      generateShop(); 

      //Creating a function for increasing the number
      let increment = (id) => {
        
        let selectedItem = id;

        //Search function checks whether an item is in the basket or not
        let search = basket.find((x) => x.id === selectedItem.id);
        
        //If the searched object is not found, it will be pushed inside the basket
        if (search === undefined) {
          //Adding new items to the basket, namely their id and the quantity
          basket.push({
            id: selectedItem.id,
            item: 1,
          });
          //If the item is already in the basket, the quantity will be increased
        } else {
          search.item += 1;
        }
      
        
        update(selectedItem.id);
        //Using a method setItem to set the item inside the local storage
        localStorage.setItem("data", JSON.stringify(basket));
      };

      //Creating a function for decreasing the number
      let decrement = (id) => {
        let selectedItem = id;
        let search = basket.find((x) => x.id === selectedItem.id);
        //When the search is undefined, the function should not work
        if (search === undefined) return;
        //Stopping the function from working if the number of items equals to 0
        else if (search.item === 0) return;
        else {
          search.item -= 1;
        }
        update(selectedItem.id);
        //Checking the items one by one and selecting only those which are not equal to 0
        basket = basket.filter((x) => x.item !== 0);
        //Saving the updated data nack to the local storage
        localStorage.setItem("data", JSON.stringify(basket));
      };

      //Creating a function for updating the number
      let update = (id) => {
        //The number is updated only if the item is found in the basket
        let search = basket.find((x) => x.id === id);
        document.getElementById(id).innerHTML = search.item;
        calculation();
      };

      //Creating a function that will sum up all the numbers and display them in the shopping cart  
      let calculation = () => {
        let cartIcon = document.getElementById("cartAmount");
        //Making the function target all the objects one by one and adding the next numbers to the previos ones, the calculation is started from 0
        cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
      };
      
      //Envoking the function 
      calculation();

////////////////////////////////////////////////////////////////////////

//Creating a function that will check whether the basket is empty or not
     let generateCartItems = () => {
        //If the basket is not empty, each data item is targeted one by one
        if (basket.length !== 0) {
          return (ShoppingCart.innerHTML = basket
            .map((x) => {
              //A line below allows us to use "id" separately from "item"
              let { id, item } = x;
              /*Matching id from the basket with the id from the database 
              and returning it if it matches or returning an empty array*/
              let search = shopItemsData.find((y) => y.id === id) || [];
              return `
            <div class="cart-item">
              <img width="170" src=${search.img} alt="" />
              <div class="details">
      
                <div class="title-price-x">
                    <h4 class="title-price">
                      <p>${search.name}</p>
                      <p class="cart-item-price">EUR ${search.price}</p>
                    </h4>
                    <button onclick="removeItem(${id})" class="remove-sign">×</button>
                   
                </div>

                <div class="buttonsForCart" > 
                  <button onclick="decrementForCart(${id})" class="minus">-</button>
                  <div id=${id} class="quantity">${item}</div> 
                  <button onclick="incrementForCart(${id})" class="plus">+</button>
                </div>

      
                <h4>EUR ${item * search.price}</h4>
              </div>
            </div>
            `;
            })
            //Using join method to concatenate all the elements in an array and get rid of the commas between the elements
            .join(""));
           
        } 
      };
      
      generateCartItems();
      
      //Increasing the number of items in the shopping cart
      let incrementForCart = (id) => {
        let selectedItem = id;
        let search = basket.find((x) => x.id === selectedItem.id);
      
        if (search === undefined) {
          basket.push({
            id: selectedItem.id,
            item: 1,
          });
        } else {
          search.item += 1;
        }
        
        //Rerendering the cart items
        generateCartItems();
        updateForCart(selectedItem.id);
        localStorage.setItem("data", JSON.stringify(basket));
      };

      //Decreasing the number of items in the shopping cart
      let decrementForCart = (id) => {
        let selectedItem = id;
        let search = basket.find((x) => x.id === selectedItem.id);
      
        if (search === undefined) return;
        else if (search.item === 0) return;
        else {
          search.item -= 1;
        }

        updateForCart(selectedItem.id);
        //Filtering out all the objects which have 0 quantity
        basket = basket.filter((x) => x.item !== 0);
        //Rerendering the cart items
        generateCartItems();
        localStorage.setItem("data", JSON.stringify(basket));
      };
      
      //Updating the number of items in the shopping cart
      let updateForCart = (id) => {
        let search = basket.find((x) => x.id === id);
        document.getElementById(id).innerHTML = search.item;
        calculation();
        //Invoiking the TotalAmount function
        TotalAmount();
      };
      
      //Creating a function to remove an entire card
      let removeItem = (id) => {
        let selectedItem = id;
        //Removing an item from the local storage and updating the basket
        basket = basket.filter((x) => x.id !== selectedItem.id);
        //Rerending items
        generateCartItems();
        //Invoiking the TotalAmount function
        TotalAmount();
        //Updating the number of items in the cart after removing a whole card 
        calculation();
        localStorage.setItem("data", JSON.stringify(basket));
      };
      
      
      
      //Creating a function to calculate the total amount of the bill
      let TotalAmount = () => {
        if (basket.length !== 0) {
          let amount = basket
            .map((x) => {
              //Separating "id" from "item"
              let { item, id } = x;
              //Using id to match against the database
              let search = shopItemsData.find((y) => y.id === id) || [];
              //The total amount is calculated
              return item * search.price;
            })
            //Summarising all the amounts
            .reduce((x, y) => x + y, 0);
            
          //Displaying a total bill and two buttons that help to get a checkout and clear the cart
          label.innerHTML = `
          <h2>Total Bill : EUR ${amount}</h2>
          <button class="checkout">Checkout</button>
          `;
        } else return;
      };
      
      //Envoking the function 
      TotalAmount();
