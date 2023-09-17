import "./styles.css";
import { useState, useEffect } from "react";

export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const fetchfunction = async () => {
    const res = await fetch("https://dummyjson.com/products");

    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchfunction();
  }, []);

  const selectHandler = (count) => {
    if (count > 0 && count <= products.length / 10 && count !== page) {
      setPage(count);
    }
  };

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="product__single" key={prod.id}>
                <img src={prod.thumbnail} alt={prod.title} />
                <span>{prod.title}</span>
              </span>
            );
          })}
        </div>
      )}
      {products.length > 0 && (
        <div className="page">
          <span onClick={() => selectHandler(page - 1)}>⬅️</span>
          {Array.from({ length: Math.ceil(products.length / 10) }, (_, i) => (
            <span
              className={page === i + 1 ? "page_selected" : ""}
              onClick={() => selectHandler(i + 1)}
              key={i}
            >
              {i + 1}
            </span>
          ))}
          <span onClick={() => selectHandler(page + 1)}>➡️</span>
        </div>
      )}
    </div>
  );
}
