import React, { useState, useEffect } from "react";
import M from "materialize-css";
import { Item } from "../api/apiModel";
import { ProductCategory } from "../utils/ProductCategory";

interface ItemDialogProps {
  item?: Item | null;
  onSave: (item: Item) => void;
  isOpen: boolean;
  onClose: () => void;
}

const ItemDialog: React.FC<ItemDialogProps> = ({
  item,
  onSave,
  isOpen,
  onClose,
}) => {
  const [name, setName] = useState<string>(item?.name || "");
  const [category, setCategory] = useState<string>(item?.category || "Sticker");
  const [img, setImg] = useState<string>(item?.img || "");
  const [descr, setDescr] = useState<string>(item?.descr || "");
  const [price, setPrice] = useState<number | string>(item?.price || "");
  const [itemCount, setItemCount] = useState<number | string>(
    item?.itemCount || ""
  );

  useEffect(() => {
    if (item) {
      setName(item.name);
      setCategory(item.category);
      setImg(item.img);
      setDescr(item.descr);
      setPrice(item.price);
      setItemCount(item.itemCount);
    }
  }, [item]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newItem: Item = {
      name,
      category: category.trim() as ProductCategory,
      img,
      descr,
      price: parseFloat(price.toString()),
      itemCount: parseInt(itemCount.toString()),
    };
    onSave(newItem);
  };

  useEffect(() => {
    const modalElement = document.querySelector(".modal");
    if (modalElement) {
      const modalInstance = M.Modal.init(modalElement, {
        onCloseEnd: onClose,
      });

      if (isOpen) {
        modalInstance.open();
        const elems = document.querySelectorAll("select");
        M.FormSelect.init(elems);
        M.updateTextFields();
      } else {
        modalInstance.close();
      }

      return () => {
        modalInstance.destroy();
      };
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    const textarea = document.querySelector(".materialize-textarea");
    if (textarea) M.textareaAutoResize(textarea);
  }, [descr]);

  return (
    <div id="item-dialog" className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h5>{item ? "Edit Item" : "Add New Item"}</h5>
        <form onSubmit={handleSubmit}>
          <div className="input-field">
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <label htmlFor="name" className={item ? "active" : ""}>
              Name
            </label>
          </div>

          <div className="input-field">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {Object.values(ProductCategory).map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <label htmlFor="category">Product type</label>
          </div>

          <div className="input-field">
            <input
              type="text"
              id="img"
              value={img}
              onChange={(e) => setImg(e.target.value)}
              required
            />
            <label htmlFor="img" className={item ? "active" : ""}>
              Image URL
            </label>
          </div>

          <div className="input-field">
            <textarea
              id="descr"
              value={descr}
              onChange={(e) => setDescr(e.target.value)}
              className="materialize-textarea"
              required
            />
            <label htmlFor="descr" className={item ? "active" : ""}>
              Description
            </label>
          </div>

          <div className="input-field">
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) =>
                setPrice(
                  parseFloat(e.target.value) >= 0
                    ? parseFloat(e.target.value)
                    : ""
                )
              }
              required
            />
            <label htmlFor="price" className={item ? "active" : ""}>
              Price
            </label>
          </div>

          <div className="input-field">
            <input
              type="number"
              id="itemCount"
              value={itemCount}
              onChange={(e) =>
                setItemCount(
                  e.target.value === "" ? "" : parseInt(e.target.value)
                )
              }
              required
            />
            <label htmlFor="itemCount" className={item ? "active" : ""}>
              Item Count
            </label>
          </div>

          <button
            type="submit"
            className="modal-close btn"
            style={{ marginRight: "1rem" }}
            disabled={itemCount === "" || price === "" || !name || !descr}
          >
            Save
          </button>
          <button
            type="button"
            className="modal-close btn-flat"
            onClick={onClose}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ItemDialog;
