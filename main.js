const barcodes = [
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000000',
    'ITEM000001',
    'ITEM000001',
    'ITEM000004'
];

function printReceipt(barcodes) {
    var barcodeStatist= countBarcodes(barcodes);
    var receipt=createReceipt(createMenus(barcodeStatist));
    console.log(receipt);
}

function countBarcodes(barcodes){
    var barcodeStatist={};
    barcodes.forEach(element => {
        barcodeStatist[element] = barcodeStatist[element]+1 || 1;
    });
    return barcodeStatist;
}

function createMenus(barcodeStatist){
    var mealDatas=loadMealDatas();
    var meal;
    var menus=[];
    for(barcode in barcodeStatist){
        meal=mealDatas.find(element =>{
            return barcode==element.barcode;
        })
        if(meal!=undefined){
            var menu={'barcode':meal.barcode,'name':meal.name,'price':meal.price,'amount':barcodeStatist[barcode]};
            menus.push(menu);
        }
    }
    return menus;
}

function createReceipt(menus){
    var totalPrice=0;
    var receipt="\n***<store earning no money>Receipt ***\n";
    menus.forEach(element=>{
        receipt +=`Name: ${element.name}, Quantity: ${element.amount}, Unit price: ${element.price} (yuan), Subtotal: ${element.price*element.amount} (yuan)\n`;
        totalPrice +=element.price*element.amount;
    })
    receipt +=`----------------------\nTotal: ${totalPrice} (yuan)\n**********************`;
    return receipt;
}

function loadMealDatas(){
    return [
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
     ];
}

module.exports = {
    printReceipt,countBarcodes
};