// Sample product data with brands and prices
const PRODUCTS = [
  {category:'Makeup', brand:'Blossom', name:'Velvet Lipstick', price:18, image:'images/blossom-lipstick.svg'},
  {category:'Makeup', brand:'Blossom', name:'Radiant Cushion', price:32, image:'images/radiant-cushion.svg'},
  {category:'Makeup', brand:'PureGlow', name:'Eye Palette', price:28, image:'images/eye-palette.svg'},
  {category:'Skincare', brand:'PureGlow', name:'Hydra Boost Serum', price:45, image:'images/hydra-boost.svg'},
  {category:'Skincare', brand:'Luma', name:'Daily Moisturizer', price:30, image:'images/daily-moisturizer.svg'},
  {category:'Fragrance', brand:'AeroScent', name:'Floral Breeze EDP', price:65, image:'images/floral-breeze.svg'},
  {category:'Fragrance', brand:'Blossom', name:'Summer Mist', price:35, image:'images/summer-mist.svg'},
  {category:'Hair', brand:'HairLove', name:'Repair Shampoo', price:22, image:'images/repair-shampoo.svg'},
  {category:'Hair', brand:'HairLove', name:'Nourish Mask', price:26, image:'images/nourish-mask.svg'},
  {category:'Skincare', brand:'Luma', name:'Gentle Cleanser', price:18, image:'images/gentle-cleanser.svg'}
];

function qsParam(name){
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function groupByBrand(items){
  const map = {};
  items.forEach(it=>{
    if(!map[it.brand]) map[it.brand]=[];
    map[it.brand].push(it);
  });
  return map;
}

function formatCurrency(n){return '$'+n.toFixed(2)}

function renderBrands(){
  const root = document.getElementById('brands-root');
  if(!root) return;
  const category = qsParam('category');
  let items = PRODUCTS.slice();
  const title = document.getElementById('page-title');
  const summary = document.getElementById('summary');
  if(category){
    items = items.filter(i=>i.category.toLowerCase()===category.toLowerCase());
    title.textContent = category + ' — Brands & Prices';
    summary.textContent = `Showing brands and prices for ${category}.`;
  } else {
    title.textContent = 'Brands & Prices';
    summary.textContent = 'Showing all categories. Use the home page to filter by category.';
  }

  const byBrand = groupByBrand(items);
  if(Object.keys(byBrand).length===0){
    root.innerHTML = '<p>No products found for this category.</p>';
    return;
  }

  root.innerHTML = '';
  Object.keys(byBrand).forEach(brand=>{
    const card = document.createElement('div');
    card.className='brand-card';
    const titleRow = document.createElement('div');
    titleRow.className='brand-title';
    const h3 = document.createElement('h3');
    h3.textContent = brand;
    const minPrice = Math.min(...byBrand[brand].map(p=>p.price));
    const priceTag = document.createElement('div');
    priceTag.textContent = 'from '+formatCurrency(minPrice);
    titleRow.appendChild(h3);
    titleRow.appendChild(priceTag);
    card.appendChild(titleRow);

    const list = document.createElement('div');
    list.className='product-list';
    byBrand[brand].forEach(p=>{
      const item = document.createElement('div');
      item.className='product-item';
      const left = document.createElement('div'); left.textContent = p.name;
      const right = document.createElement('div'); right.textContent = formatCurrency(p.price);
      item.appendChild(left); item.appendChild(right);
      list.appendChild(item);
    });
    card.appendChild(list);
    root.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', ()=>{
  renderBrands();
});
