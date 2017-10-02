$(document).ready(function() {
    'use strict'
    // global Variables
    var grandTotal;
    var grandTotalval;
    var item_Count = 0;
    var discount_items;
    var type_discount;
    var discount_Total;
    var totalValue;
    // JSON ItemList
    var ItemsList = [{ "id": 9090, "name": "Item1", "price": 200, "discount": 10, "type": "fiction", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },

        { "id": 9091, "name": "Item2", "price": 250, "discount": 15, "type": "literature", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },

        { "id": 9092, "name": "Item3", "price": 320, "discount": 5, "type": "literature", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },

        { "id": 9093, "name": "Item4", "price": 290, "discount": 0, "type": "thriller", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },

        { "id": 9094, "name": "Item1", "price": 500, "discount": 25, "type": "thriller", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },

        { "id": 9095, "name": "Item2", "price": 150, "discount": 5, "type": "literature", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },

        { "id": 9096, "name": "Item3", "price": 700, "discount": 22, "type": "literature", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" },

        { "id": 9097, "name": "Item4", "price": 350, "discount": 18, "type": "fiction", "img_url": "https://store.lexisnexis.com.au/__data/media/catalog/thumb//placeholder.jpg" }
    ];
    // itemList append to table intial to load 4 items
    var items = 4;
    var discount_type = 0;
    for (var i = 0; i < ItemsList.length; i++) {
        if (items % i === 0) {
            $('tbody#items_table').append("<tr><td style='width:20%;'><img src=" + ItemsList[i].img_url +
                " class='img-fluid'/></td><td>" + ItemsList[i].name +
                "</td><td><input type='text' class='form-control update quantity' placeholder='Quantity' autocomplete='off'/></td><td class='price update'>" +
                ItemsList[i].price + "</td><td><span><button id='removeRow' class='btn' class='remove'>X</button></span></td>" +
                "<td style='display:none' class='discount'>" + ItemsList[i].discount + "</td></tr>");
            // type fiction in itemList
            if (ItemsList[i].type === 'fiction') {
                discount_type = discount_type + ItemsList[i].discount;
                $('#type_discount').val(discount_type);
            }
        }
    }

    //cart table row remove
    $(document).on('click', 'button#removeRow', function() {
        var remove_row = $('tbody#items_table tr').length;
        if (remove_row === 1) {
            $('.alert').removeClass('d-none');
        } else {
            $(this).closest('tr').remove();
            // $('#item_each').removeClass('d-none');
            // $("#item_remove").text("Removed in the cart");
            TotalAmount();
        }
    });

    //cart row calculations
    function TotalAmount() {
      $('#item_each').addClass('alert');
        var quantity = $('.quantity');
        var price = $('.price');
        var discount = $('.discount');
        var qty;
        var itemPrice;
        var cartTotal;
        grandTotal = $('#grandTotal');
        totalValue = $('#total');
        grandTotalval = 0;
        discount_Total = 0;
        type_discount = 0;

        ++item_Count;
        $(quantity).each(function(key, value) {
            quantity = $('.quantity:eq(' + key + ')');
            price = $('.price:eq(' + key + ')');
            discount = $('.discount:eq(' + key + ')');
            discount_items = $('#discount_items');
            // quantity 
            qty = quantity.val().trim().replace(/[^0-9$.,]/g, '');
            qty = qty == '' ? '' : qty;
            // item price
           // itemPrice = price.text().trim().replace(/[^0-9$.,]/g, '');
            //itemPrice = itemPrice == '' ? '' : itemPrice;
            // itemPrice + quantity
            grandTotalval = grandTotalval + (parseInt(price.text()) * qty);
            // item discount + quantity
            discount_Total = discount_Total + (parseInt(discount.text()) * qty);
            // final grand cart Toatl
            cartTotal = (grandTotalval - discount_Total) - discount_type;
        });
        // items total value
        grandTotal.val(grandTotalval);
        // item discount value
        discount_items.val(discount_Total);
        // grand total
        totalValue.val(cartTotal);
        $('.itemsCount').text("Items(" + (item_Count) + ")");
    }
    // key up values added to total and grandTotal
    $('#items_table').on('keyup', '.update', function() {
        console.log('keyup inside = ');
        var key = event.keyCode || event.charCode;
        if (key == 8 || key == 46) return false;
        TotalAmount();
    });
});
