import { useEffect, useState } from "react";
import { ProductCategory } from "../utils/ProductCategory";
import { useNavigate } from "react-router";
import useFetch from "../api/useDataFetching";
import { Item } from "../api/apiModel";
import { useCart } from "../utils/CartContext";
import ItemDialog from "../components/ItemDialog";
import { FALLBACK_IMAGE } from "../utils/imageUtils";
import { toastError, toastSuccess } from "../utils/toastUtils";
import usePost from "../api/useDataPosting";
import useUpdate from "../api/useDataUpdating";
import useDelete from "../api/useDataDeleting";

export default function ProductsLayout() {
  const [selectedCategory, setselectedCategory] =
    useState<ProductCategory | null>(null);
  const [filteredItems, setFilteredItems] = useState<Item[] | null>([]);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [items, setItems] = useState<Item[]>([]);
  const [toDeleteId, setToDeleteId] = useState<number | undefined>(undefined);

  const navigate = useNavigate();
  const {
    responseData: postResponse,
    error: postError,
    postData,
  } = usePost<Item>("Item");
  const {
    responseData: updateResponse,
    error: updateError,
    updateData,
  } = useUpdate<Item>();

  const { addToCart } = useCart();
  const fetchedItems = useFetch<Item[]>("Item");
  const { deleteData, deleted } = useDelete<Item>();

  const handleAddNew = () => {
    setOpen(true);
  };

  const handleEdit = (item: Item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleSave = (newItemData: Omit<Item, "id">) => {
    if (selectedItem) {
      const updatedItem: Item = {
        ...newItemData,
        price: Math.round(newItemData.price * 100) / 100,
      };
      updateData(updatedItem, `Item/${selectedItem.id}`);
    } else {
      const newItem: Item = {
        ...newItemData,
        price: Math.round(newItemData.price * 100) / 100,
      };
      postData(newItem);
    }
    setOpen(false);
  };

  const handleItemDelete = async (id: number) => {
    setToDeleteId(id);
    if (!window.confirm("Are you sure you want to delete?")) {
      return;
    }

    deleteData(`Item/${id}`);
  };

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

  useEffect(() => {
    if (fetchedItems) {
      setItems(fetchedItems);
    }
  }, [fetchedItems]);

  useEffect(() => {
    if (deleted) {
      setItems((prevItems) =>
        prevItems.filter((product) => product.id !== toDeleteId)
      );
    }
  }, [deleted]);

  useEffect(() => {
    if (postResponse) {
      toastSuccess("Item added!");
      setItems([...items, postResponse]);
    }
  }, [postResponse]);

  useEffect(() => {
    if (updateResponse) {
      toastSuccess("Item updated!");
      setItems((prevItems) => {
        return prevItems.map((item) =>
          item.id === updateResponse.id ? updateResponse : item
        );
      });
    }
  }, [updateResponse]);

  useEffect(() => {
    if (postError || updateError) {
      toastError();
    }
  }, [postError, updateError]);

  return (
    <div>
      <div className="container">
        <div className="row" style={{ margin: "3.2rem 1.6rem 2.4rem" }}>
          <button
            className="btn-large blue darken-3"
            style={{ margin: "0 2rem 0 0" }}
            onClick={() => handleAddNew()}
          >
            <div className="valign-wrapper">
              <span>Create New Item&nbsp;</span>
              <i className="material-icons">add</i>
            </div>
          </button>
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
                      src={product.img}
                      onError={(e) => {
                        e.currentTarget.src = FALLBACK_IMAGE;
                      }}
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
                      onClick={() => addToCart(product, true)}
                    >
                      <i className="material-icons right">shopping_cart</i>Add
                      to cart
                    </button>
                    <button
                      className="btn teal lighten-2"
                      onClick={() => handleEdit(product)}
                    >
                      <i className="material-icons right">edit</i>Edit
                    </button>
                    <button
                      className="btn red darken-4"
                      onClick={() => handleItemDelete(product.id!)}
                      style={{ marginLeft: "1rem" }}
                    >
                      <i className="material-icons">delete_forever</i>
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
      <ItemDialog
        isOpen={isOpen}
        item={selectedItem}
        onSave={handleSave}
        onClose={() => {
          setSelectedItem(null);
          setOpen(false);
        }}
      />
    </div>
  );
}
