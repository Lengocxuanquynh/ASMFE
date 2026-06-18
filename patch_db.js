const fs = require('fs');
const path = './src/assets/data/db.json';
const data = JSON.parse(fs.readFileSync(path, 'utf8'));
if (!data.products) {
  data.products = [
    {
      "id": "1",
      "name": "Cà phê sữa đá",
      "price": 25000,
      "description": "Cà phê sữa đá truyền thống",
      "categoryId": "3",
      "image": "https://images.unsplash.com/photo-1541167760496-1628856ab772"
    },
    {
      "id": "2",
      "name": "Bạc xỉu",
      "price": 29000,
      "description": "Bạc xỉu đá thơm béo",
      "categoryId": "aAhDy5i-_S4",
      "image": "https://images.unsplash.com/photo-1579888944880-d98341245702"
    }
  ];
  fs.writeFileSync(path, JSON.stringify(data, null, 2));
  console.log("Added products to db.json");
} else {
  console.log("products already exists");
}
