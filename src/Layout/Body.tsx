import React, { useState } from 'react';
import { Range } from 'react-range';

const Body: React.FC = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100 });
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [keywordInput, setKeywordInput] = useState('');
  const [keywords, setKeywords] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<number | null>(null);

  const handleCheckboxChange = (item: string) => {
    const updatedItems = selectedItems.includes(item)
      ? selectedItems.filter((i) => i !== item)
      : [...selectedItems, item];
    setSelectedItems(updatedItems);
  };

  const handlePriceChange = (values: number[]) => {
    const [min, max] = values;
    setPriceRange({ min, max });
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const handleKeywordSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && keywordInput.trim()) {
      setKeywords((prev) => [...prev, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords((prev) => prev.filter((k) => k !== keyword));
  };

  const handleTypeSelect = (type: number) => {
    setSelectedType(selectedType === type ? null : type);
  };

  return (
    <div className="flex flex-col md:flex-row mt-10">
      <div className="relative bg-white shadow-lg rounded-lg p-4">
        <button
          className="md:hidden absolute top-2 left-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={toggleNavbar}
        >
          {isNavbarOpen ? 'Close' : 'Filters'}
        </button>
        <div className={`bg-white text-gray-800 h-auto w-full md:w-64 p-6 mt-6 flex flex-col rounded-lg shadow-md ${isNavbarOpen ? 'block' : 'hidden md:block'}`}>

          <div>
            <input
              type="text"
              placeholder="Add keyword..."
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyDown={handleKeywordSubmit}
              className="mb-4 p-2 border border-gray-300 rounded-2xl w-full"
            />
            <div className="flex flex-wrap mb-4">
              {keywords.map((keyword) => (
                <span key={keyword} className="bg-gray-200 text-gray-800 rounded-full px-2 py-1 mr-2 mb-2 flex items-center">
                  {keyword}
                  <button onClick={() => removeKeyword(keyword)} className="ml-2 text-red-500">✖</button>
                </span>
              ))}
            </div>
          </div>

          <h3 className="text-lg font-semibold mt-4 text-black">Price Range</h3>
          <div className="flex flex-col mt-4">
            <Range
              values={[priceRange.min, priceRange.max]}
              step={1}
              min={0}
              max={100}
              onChange={handlePriceChange}
              renderTrack={({ props, children }) => (
                <div {...props} className="h-1 bg-gray-300 rounded-lg">
                  <div style={{
                    position: 'absolute',
                    left: `${(priceRange.min / 100) * 100}%`,
                    right: `${100 - (priceRange.max / 100) * 100}%`,
                    height: '100%',
                    backgroundColor: 'green',
                    borderRadius: 'inherit',
                  }} />
                  {children}
                </div>
              )}
              renderThumb={({ props }) => (
                <div {...props} className="h-5 w-5 bg-green-500 rounded-full shadow-md border border-gray-400 focus:outline-none" />
              )}
            />
            <div className="flex justify-between text-sm font-medium text-black mt-4">
              <span>${priceRange.min}</span>
              <span>${priceRange.max}</span>
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-4 mt-6 text-black">Categories</h2>
          <div className="flex flex-col space-y-2">
            {['Succulents', 'Ferns', 'Flowers', 'Cacti', 'Indoor Plants'].map((item) => (
              <div className="flex items-center" key={item}>
                <input
                  type="checkbox"
                  id={item.toLowerCase().replace(/\s+/g, '-')}
                  checked={selectedItems.includes(item)}
                  onChange={() => handleCheckboxChange(item)}
                  className="mr-2 rounded border-black accent-black"
                />
                <label htmlFor={item.toLowerCase().replace(/\s+/g, '-')} className="text-sm text-black">{item}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="flex justify-between mb-4">
          <input
            type="text"
            placeholder="Search products..."
            onChange={(e) => setKeywordInput(e.target.value)}
            className="p-2 border border-gray-300 rounded-2xl w-full md:w-1/3"
          />
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((type) => (
              <button
                key={type}
                onClick={() => handleTypeSelect(type)}
                className={`py-2 px-4 rounded ${selectedType === type ? 'bg-black text-white' : 'bg-slate-200 text-gray-500'}`}
              >
                Type {type}
              </button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
          <ProductList selectedItems={selectedItems} priceRange={priceRange} keywords={keywords} />
        </div>
      </div>
    </div>
  );
};

const ProductList: React.FC<{ selectedItems: string[]; priceRange: { min: number; max: number; }; keywords: string[]; }> = ({ selectedItems, priceRange, keywords }) => {
  const dummyProducts = [
    { id: '1', name: 'Aloe Vera', description: 'A popular succulent.', price: 20, category: 'Succulents', img: '/1.jpg' },
    { id: '2', name: 'Boston Fern', description: 'A lovely indoor plant.', price: 15, category: 'Ferns', img: '/2.jpg' },
    { id: '3', name: 'Sunflower', description: 'Bright and cheerful flowers.', price: 10, category: 'Flowers', img: '/3.jpg' },
    { id: '4', name: 'Saguaro Cactus', description: 'An iconic cactus.', price: 30, category: 'Cacti', img: '/4.jpg' },
    { id: '5', name: 'Spider Plant', description: 'Great for indoor air quality.', price: 25, category: 'Indoor Plants', img: '/5.jpg' },
  ];
  

  const filteredProducts = dummyProducts.filter(product =>
    product.price >= priceRange.min &&
    product.price <= priceRange.max &&
    (selectedItems.length === 0 || selectedItems.includes(product.category)) &&
    (keywords.length === 0 || keywords.some(keyword => product.name.toLowerCase().includes(keyword.toLowerCase())))
  );

  return (
    <>
      {filteredProducts.length > 0 ? (
        filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p className="text-center text-gray-600">No products available.</p>
      )}
    </>
  );
};
const ProductCard: React.FC<{ product: { id: string; name: string; description: string; price: number; img: string; } }> = ({ product }) => {
  return (
    <div className="relative group border border-brown rounded-lg overflow-hidden shadow-lg transition-transform duration-300 hover:bg-brown-light m-2 bg-earth transform hover:-translate-y-1 hover:bg-brown-light">
      <div className="w-full h-[250px] bg-gray-200">
        <img
          src={product.img} 
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h4 className="text-lg font-bold text-brown">{product.name}</h4>
        <p className="text-sm text-gray-600">{product.description}</p>
        <span className="text-md font-bold text-brown">${product.price}</span>
      </div>
    </div>
  );
};


export default Body;
