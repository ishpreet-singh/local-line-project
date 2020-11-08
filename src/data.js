// export var products = [
//     {
//         "province": "ON",
//         "city": "Ottawa",
//         "country": "Canada",
//         "business_name": "Cole's Cappuccino"
//     },
//     {
//         "province": "ON",
//         "city": "Waterloo",
//         "country": "Canada",
//         "business_name": "Jen's Jello"
//     },
//     {
//         "province": "ON",
//         "city": "Kingston",
//         "country": "Canada",
//         "business_name": "Brock's Bakery"
//     },
//     {
//         "province": "ON",
//         "city": "Toronto",
//         "country": "Canada",
//         "business_name": "Matty's Mango"
//     }
// ];

export var products = [
    {
      "province":"ON",
      "city":"Ottawa",
      "customer_info":{
        "last_delivery_date":null,
        "orders_this_month":0,
        "buyer_average_order":0.0
      },
      "country":"Canada",
      "business_name":"Cole's Cappuccino"
    },
    {
      "province":"ON",
      "city":"Waterloo",
      "customer_info":{
        "last_delivery_date":"2018-04-30T12:00:00-00:00",
        "orders_this_month":1,
        "buyer_average_order":5.0
      },
      "country":"Canada",
      "business_name":"Jen's Jello"
    },
    {
      "province":"ON",
      "city":"Kingston",
      "customer_info":{
        "last_delivery_date":"2015-03-14T12:00:00-00:00",
        "orders_this_month":1,
        "buyer_average_order":2.5
      },
      "country":"Canada",
      "business_name":"Brock's Bakery"
    },
    {
      "province":"ON",
      "city":"Toronto",
      "customer_info":{
        "last_delivery_date":"2018-05-04T12:00:00-00:00",
        "orders_this_month":5,
        "buyer_average_order":4.0
      },
      "country":"Canada",
      "business_name":"Matty's Mango"
    }
  ]

export var columns = [{
    dataField: 'province',
    text: 'Province'
}, {
    dataField: 'city',
    text: 'City'
}, {
    dataField: 'country',
    text: 'Country'
}, {
    dataField: 'business_name',
    text: 'Business Name'
}, {
    dataField: 'button',
    text: ''
}];