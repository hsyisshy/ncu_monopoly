aaa = [
    { name: '紫萱', value: 100, time: '2024-04-24T19:16:11.000Z' },
    { name: '越南人', value: 87, time: '2024-04-24T19:17:11.000Z' },
    { name: '謝圓真', value: 8787, time: '2024-04-25T20:00:19.000Z' },
    { name: '謝圓真', value: 8787, time: '2024-03-25T20:00:19.000Z' },
    { name: '謝圓真', value: 8787, time: '2024-03-21T20:00:19.000Z' }
  ]
console.log(   aaa.slice(0,5).sort( function(row1, row2) {
    var k1 = row1["value"], k2 = row2["value"];
    return (k2 > k1) ? 1 : ( (k1 > k2) ? -1 : 0 );
} )

)