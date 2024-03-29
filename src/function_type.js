import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import "./styles.css";
//functiontype
export default function App() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchFunction = async () => {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    if (data && data.products) {
      setProducts(data.products);
    }
  };

  useEffect(() => {
    fetchFunction();
  }, []);

  const selectHandler = (count) => {
    if (count > 0 && count <= products.length / 10 && count !== page) {
      setPage(count);
    }
  };

  const openWindow = (prod) => {
    setSelectedProduct(prod);
  };

  return (
    <div className="App">
      {products.length > 0 && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((prod) => {
            return (
              <span className="product__single" key={prod.id}>
                <img
                  src={prod.thumbnail}
                  alt={prod.title}
                  onClick={() => openWindow(prod)}
                />
                <span>{prod.title}</span>
                {selectedProduct && selectedProduct.id === prod.id && (
                  <div className="open_table">
                    <img src={prod.thumbnail} alt={prod.title} />
                    <Table>
                      <thead>
                        <tr>
                          <th>Brand</th>
                          <th>Category</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{prod.brand}</td>
                          <td>{prod.category}</td>
                          <td>{prod.price}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                )}
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
