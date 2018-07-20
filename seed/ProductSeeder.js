var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Shopping',{useNewUrlParser:true});
var products = [
    new Product({
    imagePath:'https://upload.wikimedia.org/wikipedia/en/3/31/Codfhbox.jpg',
    title: 'Call of Duty Modern Warfare',
    description: 'The best action thrilling game on here',
    price: 315
    }),
    new Product({
        imagePath:'https://upload.wikimedia.org/wikipedia/en/5/5c/Euro_Truck_Simulator_Box_Art.jpg',
        title: 'Euro Truck Simulator',
        description: 'The best trucking simulator on the market',
        price: 256
    }),
    new Product({
        imagePath:'https://upload.wikimedia.org/wikipedia/en/9/91/Need_for_Speed%2C_Most_Wanted_2012_video_game_Box_Art.jpg',
        title: 'Need For Speed Most Wanted (2015)',
        description: 'The best racing game with HD graphics',
        price: 300
    }),
    new Product({
        imagePath:'https://upload.wikimedia.org/wikipedia/en/e/e5/F1_2017_cover_art.jpg',
        title: 'Formula One Racing (2017)',
        description: 'The best racing game with best F1 Graphics',
        price: 400
    }),
    new Product({
        imagePath:'https://upload.wikimedia.org/wikipedia/en/3/34/Fight_Night_Champion.jpg',
        title: 'Fight Night Champion (2017)',
        description: 'The best Boxing game with best F1 Graphics',
        price: 500
    }),
    new Product({
        imagePath:'https://upload.wikimedia.org/wikipedia/en/0/08/FIFA_17_cover.jpeg',
        title: 'FIFA WorldCup 2017 Tm',
        description: 'The best Football game with best F1 Graphics',
        price: 300
    })
];
var done = 0;
for(var i =0;i<products.length;i++){
    products[i].save(function(err,result) {
        done++;
        if(done === products.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}
