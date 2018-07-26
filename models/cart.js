module.exports = function Cart(initItems){
   this.items = initItems.items || {};
   this.totalQuantity = initItems.totalQuantity || 0;
   this.totalPrice = initItems.totalPrice || 0;

   this.add = function(item,id){
       var storedItem = this.items[id];
       if(!storedItem){
           storedItem = this.items[id] = {item:item,quantity:0,price:0};
           storedItem.quantity++;
           storedItem.price = storedItem.item.price * storedItem.quantity;
           this.totalQuantity++;
           this.totalPrice += storedItem.item.price;
       }
   };
   this.generateItemsArray = function(){
       var itemsArray = [];
       for(var id in this.items) {
           itemsArray.push(this.items[id]);
       }
       return itemsArray;
   }
};