import { useEffect, useState } from "react";
import { ProductCategory } from "../utils/ProductCategory";
import { useNavigate } from "react-router";
import useFetch from "../api/useDataFetching";
import { Item } from "../api/apiModel";
import { useCart } from "../utils/CartContext";

export default function ProductsLayout() {
  const [selectedCategory, setselectedCategory] =
    useState<ProductCategory | null>(null);
  const [filteredItems, setFilteredItems] = useState<Item[] | null>([]);
  const navigate = useNavigate();

  const { addToCart } = useCart();
  const items = useFetch<Item[]>("Item");

  useEffect(() => {
    if (!items) {
      setFilteredItems(null);
      return;
    }

    setFilteredItems(
      selectedCategory
        ? items.filter(
            (product) => product.category.trim() === selectedCategory
          )
        : items
    );
  }, [items, selectedCategory]);

  return (
    <div>
      <div className="container">
        <div className="row" style={{ margin: "3.2rem 1.6rem 2.4rem" }}>
          <button
            className="btn-large"
            style={{ margin: "0 0.4rem" }}
            onClick={() => setselectedCategory(null)}
          >
            All
          </button>
          {Object.values(ProductCategory).map((category) => (
            <button
              key={category}
              className="btn-large"
              style={{ margin: "0 0.4rem" }}
              onClick={() => setselectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="row">
          {filteredItems &&
            filteredItems.map((product) => (
              <div key={product.id} className="col s12 m6 l4">
                <div className="card">
                  <div className="card-image ">
                    <img
                      src={`${window.location.origin}/src/assets/images/items/${product.img}`}
                      alt={product.name}
                    />
                  </div>
                  <div className="card-content">
                    <span className="card-title">{product.name}</span>
                    <p>Price: ${product.price.toFixed(2)}</p>
                  </div>
                  <div className="card-action">
                    <button
                      className="btn-flat"
                      style={{ margin: "0 0.4rem" }}
                      onClick={() =>
                        navigate(`/product/${product.id}`, {
                          state: { product },
                        })
                      }
                    >
                      View more
                    </button>
                    <button
                      className="btn-small  teal lighten-2"
                      disabled={product.itemCount <= 0}
                      onClick={() => addToCart(product)}
                    >
                      <i className="material-icons right">shopping_cart</i>Add
                      to cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          {!filteredItems ||
            (filteredItems.length == 0 && (
              <div>
                <h5 style={{ margin: "6.4rem 0 1.6rem" }}>
                  No products found :(
                </h5>
                <button
                  className="btn-flat"
                  onClick={() => setselectedCategory(null)}
                >
                  View All
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
